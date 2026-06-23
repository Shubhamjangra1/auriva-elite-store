const JSON_HEADERS = {
  "Content-Type": "application/json; charset=utf-8",
};

function corsHeaders(origin = "*") {
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "GET,POST,PUT,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  };
}

function jsonResponse(body, status = 200, origin = "*") {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      ...JSON_HEADERS,
      ...corsHeaders(origin),
    },
  });
}

function textResponse(body, status = 200, origin = "*") {
  return new Response(body, {
    status,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      ...corsHeaders(origin),
    },
  });
}

function normalizeEmail(email) {
  return String(email || "").trim().toLowerCase();
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function randomDigits(length = 6) {
  const bytes = new Uint32Array(length);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (value) => String(value % 10)).join("");
}

function randomHex(bytes = 32) {
  const buffer = new Uint8Array(bytes);
  crypto.getRandomValues(buffer);
  return Array.from(buffer, (value) => value.toString(16).padStart(2, "0")).join("");
}

async function sha256Hex(text) {
  const data = new TextEncoder().encode(text);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash), (value) => value.toString(16).padStart(2, "0")).join("");
}

function getBearerToken(request) {
  const header = request.headers.get("Authorization") || "";
  const match = header.match(/^Bearer\s+(.+)$/i);
  return match ? match[1].trim() : "";
}

async function readJson(request) {
  try {
    return await request.json();
  } catch {
    return null;
  }
}

async function sendLoginEmail(env, email, code) {
  const from = env.AUTH_EMAIL_FROM;
  const resendKey = env.RESEND_API_KEY;

  if (!from || !resendKey) {
    throw new Error("Email service is not configured yet.");
  }

  const subject = "Your Auriva Elite login code";
  const text = [
    "Your Auriva Elite login code is:",
    "",
    code,
    "",
    "This code expires in 10 minutes.",
    "If you did not request this code, you can ignore this email.",
  ].join("\n");

  const html = `
    <div style="font-family:Arial,sans-serif;line-height:1.6;color:#1f1a17">
      <h2 style="margin:0 0 16px">Your Auriva Elite login code</h2>
      <p style="margin:0 0 12px">Use this 6-digit code to sign in:</p>
      <div style="font-size:32px;letter-spacing:8px;font-weight:700;padding:16px 20px;background:#f5efe7;border-radius:14px;display:inline-block">${code}</div>
      <p style="margin:16px 0 0">This code expires in 10 minutes.</p>
      <p style="margin:8px 0 0;color:#6f5b48">If you did not request this code, you can ignore this email.</p>
    </div>
  `;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [email],
      subject,
      text,
      html,
    }),
  });

  if (!response.ok) {
    const details = await response.text().catch(() => "");
    throw new Error(`Email provider error: ${details || response.statusText}`);
  }
}

async function loadProfile(env, email) {
  const profileKey = `profile:${email}`;
  const stored = await env.PROFILES.get(profileKey, { type: "json" });
  return stored || null;
}

async function storeProfile(env, email, profile) {
  const profileKey = `profile:${email}`;
  const payload = {
    email,
    profile,
    updatedAt: new Date().toISOString(),
  };

  await env.PROFILES.put(profileKey, JSON.stringify(payload));
  return payload;
}

async function getSession(env, token) {
  if (!token) return null;
  const stored = await env.SESSIONS.get(`session:${token}`, { type: "json" });
  return stored || null;
}

async function requireAuth(request, env) {
  const token = getBearerToken(request);
  const session = await getSession(env, token);
  if (!session?.email) {
    return null;
  }

  return { token, session };
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const origin = request.headers.get("Origin") || "*";

    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: corsHeaders(origin),
      });
    }

    if (url.pathname === "/api/health") {
      return textResponse("ok", 200, origin);
    }

    if (url.pathname === "/api/auth/request-code" && request.method === "POST") {
      const body = await readJson(request);
      const email = normalizeEmail(body?.email);

      if (!isValidEmail(email)) {
        return jsonResponse({ error: "Please provide a valid email address." }, 400, origin);
      }

      const code = randomDigits(6);
      const salt = randomHex(16);
      const hash = await sha256Hex(`${salt}:${code}`);
      const ttl = Number(env.OTP_TTL_SECONDS || 600);

      await env.OTP_CODES.put(
        `otp:${email}`,
        JSON.stringify({
          email,
          salt,
          hash,
          attempts: 0,
          createdAt: new Date().toISOString(),
        }),
        { expirationTtl: ttl }
      );

      try {
        await sendLoginEmail(env, email, code);
      } catch (error) {
        return jsonResponse(
          { error: error?.message || "We could not send the code right now." },
          500,
          origin
        );
      }

      return jsonResponse({ ok: true }, 200, origin);
    }

    if (url.pathname === "/api/auth/verify-code" && request.method === "POST") {
      const body = await readJson(request);
      const email = normalizeEmail(body?.email);
      const code = String(body?.code || "").trim();

      if (!isValidEmail(email)) {
        return jsonResponse({ error: "Please provide a valid email address." }, 400, origin);
      }

      if (!/^\d{6}$/.test(code)) {
        return jsonResponse({ error: "The login code must be exactly 6 digits." }, 400, origin);
      }

      const otp = await env.OTP_CODES.get(`otp:${email}`, { type: "json" });
      if (!otp) {
        return jsonResponse({ error: "That code has expired. Please request a new one." }, 400, origin);
      }

      if ((otp.attempts || 0) >= 5) {
        await env.OTP_CODES.delete(`otp:${email}`);
        return jsonResponse({ error: "Too many attempts. Please request a new code." }, 429, origin);
      }

      const candidateHash = await sha256Hex(`${otp.salt}:${code}`);
      if (candidateHash !== otp.hash) {
        await env.OTP_CODES.put(
          `otp:${email}`,
          JSON.stringify({
            ...otp,
            attempts: (otp.attempts || 0) + 1,
          }),
          { expirationTtl: Number(env.OTP_TTL_SECONDS || 600) }
        );
        return jsonResponse({ error: "Invalid code. Please try again." }, 400, origin);
      }

      await env.OTP_CODES.delete(`otp:${email}`);

      const sessionToken = randomHex(32);
      const ttl = Number(env.SESSION_TTL_SECONDS || 2592000);

      await env.SESSIONS.put(
        `session:${sessionToken}`,
        JSON.stringify({
          email,
          createdAt: new Date().toISOString(),
        }),
        { expirationTtl: ttl }
      );

      const profile = await loadProfile(env, email);

      return jsonResponse(
        {
          ok: true,
          email,
          sessionToken,
          profile: profile?.profile || null,
        },
        200,
        origin
      );
    }

    if (url.pathname === "/api/auth/me" && request.method === "GET") {
      const auth = await requireAuth(request, env);
      if (!auth) {
        return jsonResponse({ error: "Not signed in." }, 401, origin);
      }

      const profile = await loadProfile(env, auth.session.email);
      return jsonResponse(
        {
          ok: true,
          email: auth.session.email,
          profile: profile?.profile || null,
        },
        200,
        origin
      );
    }

    if (url.pathname === "/api/profile" && request.method === "PUT") {
      const auth = await requireAuth(request, env);
      if (!auth) {
        return jsonResponse({ error: "Not signed in." }, 401, origin);
      }

      const body = await readJson(request);
      const email = normalizeEmail(body?.email);
      const profile = body?.profile || null;

      if (email !== auth.session.email) {
        return jsonResponse({ error: "Email mismatch." }, 400, origin);
      }

      if (!profile || typeof profile !== "object") {
        return jsonResponse({ error: "Invalid profile data." }, 400, origin);
      }

      await storeProfile(env, email, profile);
      return jsonResponse({ ok: true }, 200, origin);
    }

    if (url.pathname === "/api/auth/logout" && request.method === "POST") {
      const auth = await requireAuth(request, env);
      if (!auth) {
        return jsonResponse({ error: "Not signed in." }, 401, origin);
      }

      await env.SESSIONS.delete(`session:${auth.token}`);
      return jsonResponse({ ok: true }, 200, origin);
    }

    return jsonResponse({ error: "Not found." }, 404, origin);
  },
};
