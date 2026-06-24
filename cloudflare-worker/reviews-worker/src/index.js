const JSON_HEADERS = {
  "Content-Type": "application/json; charset=utf-8",
};

function corsHeaders(origin = "*") {
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
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

function normalizeProductId(productId) {
  return String(productId || "").trim().toLowerCase();
}

function isValidProductId(productId) {
  return /^[a-z0-9][a-z0-9-]{1,79}$/.test(productId);
}

async function readJson(request) {
  try {
    return await request.json();
  } catch {
    return null;
  }
}

let reviewsSchemaReady = null;
let reviewsRatingColumnReady = null;

async function ensureReviewsSchema(env) {
  if (!env.REVIEWS_DB) {
    throw new Error("Reviews database is not configured.");
  }

  if (!reviewsSchemaReady) {
    reviewsSchemaReady = env.REVIEWS_DB.exec(
      [
        "CREATE TABLE IF NOT EXISTS product_reviews (",
        "  id TEXT PRIMARY KEY,",
        "  product_id TEXT NOT NULL,",
        "  author TEXT NOT NULL,",
        "  comment TEXT NOT NULL,",
        "  created_at TEXT NOT NULL",
        ");",
        "CREATE INDEX IF NOT EXISTS idx_product_reviews_product_created",
        "  ON product_reviews(product_id, created_at DESC);",
      ].join("\n")
    );
  }

  await reviewsSchemaReady;
}

async function ensureReviewsRatingColumn(env) {
  if (reviewsRatingColumnReady) {
    await reviewsRatingColumnReady;
    return;
  }

  reviewsRatingColumnReady = (async () => {
    const result = await env.REVIEWS_DB.prepare(
      "SELECT name FROM pragma_table_info('product_reviews') WHERE name = ?"
    )
      .bind("rating")
      .all();

    if (!Array.isArray(result?.results) || result.results.length === 0) {
      await env.REVIEWS_DB.exec(
        "ALTER TABLE product_reviews ADD COLUMN rating INTEGER NOT NULL DEFAULT 5;"
      );
    }
  })();

  await reviewsRatingColumnReady;
}

async function listProductReviews(env, productId) {
  await ensureReviewsSchema(env);
  await ensureReviewsRatingColumn(env);

  const result = await env.REVIEWS_DB.prepare(
    [
      "SELECT id, product_id AS productId, author, comment, rating, created_at AS timestamp",
      "FROM product_reviews",
      "WHERE product_id = ?",
      "ORDER BY created_at DESC, rowid DESC",
    ].join("\n")
  )
    .bind(productId)
    .all();

  return result.results || [];
}

async function createProductReview(env, review) {
  await ensureReviewsSchema(env);
  await ensureReviewsRatingColumn(env);

  const id = crypto.randomUUID();
  const createdAt = new Date().toISOString();

  await env.REVIEWS_DB.prepare(
    [
      "INSERT INTO product_reviews (id, product_id, author, comment, rating, created_at)",
      "VALUES (?, ?, ?, ?, ?, ?)",
    ].join("\n")
  )
    .bind(id, review.productId, review.author, review.comment, review.rating, createdAt)
    .run();

  return {
    id,
    productId: review.productId,
    author: review.author,
    comment: review.comment,
    rating: review.rating,
    timestamp: createdAt,
  };
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
      return jsonResponse({ ok: true }, 200, origin);
    }

    if (url.pathname === "/api/reviews" && request.method === "GET") {
      const productId = normalizeProductId(url.searchParams.get("productId"));

      if (!isValidProductId(productId)) {
        return jsonResponse({ error: "Please provide a valid product." }, 400, origin);
      }

      try {
        const reviews = await listProductReviews(env, productId);
        return jsonResponse({ ok: true, reviews }, 200, origin);
      } catch (error) {
        return jsonResponse(
          { error: error?.message || "We could not load reviews right now." },
          500,
          origin
        );
      }
    }

    if (url.pathname === "/api/reviews" && request.method === "POST") {
      const body = await readJson(request);
      const productId = normalizeProductId(body?.productId);
      const author = String(body?.author || "").trim().slice(0, 60);
      const comment = String(body?.comment || "").trim().slice(0, 800);
      const rating = Number(body?.rating || 5);

      if (!isValidProductId(productId)) {
        return jsonResponse({ error: "Please provide a valid product." }, 400, origin);
      }

      if (author.length < 2) {
        return jsonResponse({ error: "Please enter your name." }, 400, origin);
      }

      if (comment.length < 8) {
        return jsonResponse({ error: "Please write a slightly longer review." }, 400, origin);
      }

      if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
        return jsonResponse({ error: "Please select a star rating from 1 to 5." }, 400, origin);
      }

      try {
        const created = await createProductReview(env, {
          productId,
          author,
          comment,
          rating,
        });

        return jsonResponse({ ok: true, review: created }, 200, origin);
      } catch (error) {
        return jsonResponse(
          { error: error?.message || "We could not save your review right now." },
          500,
          origin
        );
      }
    }

    return jsonResponse({ error: "Not found." }, 404, origin);
  },
};
