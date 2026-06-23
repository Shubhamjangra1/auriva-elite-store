# Auriva Élite public reviews worker

This Worker stores and serves product reviews so every visitor can see the same comments.

## What it does

- saves public reviews to Cloudflare D1
- lists reviews by product
- supports CORS for the storefront

## Setup

1. Create or reuse the `auriva-elite-reviews` D1 database.
2. Put its database ID into `wrangler.toml`.
3. Deploy the Worker.
4. Update the storefront review API base URL to point at this Worker.

## Endpoints

- `GET /api/health`
- `GET /api/reviews?productId=...`
- `POST /api/reviews`
