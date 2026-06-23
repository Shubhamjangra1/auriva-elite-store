CREATE TABLE IF NOT EXISTS product_reviews (
  id TEXT PRIMARY KEY,
  product_id TEXT NOT NULL,
  author TEXT NOT NULL,
  comment TEXT NOT NULL,
  created_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_product_reviews_product_created
  ON product_reviews(product_id, created_at DESC);
