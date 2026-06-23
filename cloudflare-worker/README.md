# Auriva Élite passwordless auth worker

This Worker powers the custom email-code login flow for the storefront.

## What it does

- generates a 6-digit code
- sends the code by email through Resend
- verifies the code
- creates a session token
- stores the signed-in user's profile/address by email

## Free-stack pieces

- Frontend: GitHub Pages storefront
- Backend: Cloudflare Worker
- Storage: Cloudflare KV
- Email: Resend free plan

## Required setup

1. Create three Cloudflare KV namespaces:
   - `OTP_CODES`
   - `SESSIONS`
   - `PROFILES`

2. Put their namespace IDs into `wrangler.toml`.

3. Create a Resend account and verify your sender domain or sender email.

4. Add these secrets to the Worker:
   - `RESEND_API_KEY`
   - `AUTH_EMAIL_FROM`

5. Deploy the Worker and copy its public URL.

6. Update `script.js` in the storefront:
   - replace `AUTH_API_BASE_URL` with your Worker URL

## Endpoints

- `POST /api/auth/request-code`
- `POST /api/auth/verify-code`
- `GET /api/auth/me`
- `PUT /api/profile`

## Notes

- This first pass uses KV only. You do not need D1 for the basic OTP/session/profile flow.
- This is a free-tier friendly setup, but it still depends on the free limits of Cloudflare and Resend.
- Address/profile data is saved per email address.
- The storefront blocks checkout until the user is signed in.
