-- KAVALA operational schema (Postgres 16)
-- Commerce source of truth lives in Medusa; these tables mirror what
-- the admin, compliance, and support layers need. All timestamps UTC.

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ── Catalogue ────────────────────────────────────────────────────────
CREATE TABLE products (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug          text UNIQUE NOT NULL,
  name          text NOT NULL,
  descriptor    text NOT NULL,
  active        boolean NOT NULL DEFAULT true,
  created_at    timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE variants (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id    uuid NOT NULL REFERENCES products(id),
  sku           text UNIQUE NOT NULL,
  price_cents   integer NOT NULL CHECK (price_cents > 0),
  sub_price_cents integer CHECK (sub_price_cents IS NULL OR sub_price_cents > 0),
  weight_grams  integer NOT NULL,
  created_at    timestamptz NOT NULL DEFAULT now()
);

-- ── Lots & inventory (recall-ready) ─────────────────────────────────
CREATE TABLE lots (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  batch_number  text UNIQUE NOT NULL,
  variant_id    uuid NOT NULL REFERENCES variants(id),
  manufactured_on date NOT NULL,
  expires_on    date NOT NULL,
  supplier      text NOT NULL,
  coa_url       text,               -- certificate of analysis
  quarantined   boolean NOT NULL DEFAULT false,
  created_at    timestamptz NOT NULL DEFAULT now(),
  CHECK (expires_on > manufactured_on)
);

CREATE TABLE inventory_levels (
  variant_id    uuid NOT NULL REFERENCES variants(id),
  lot_id        uuid NOT NULL REFERENCES lots(id),
  quantity      integer NOT NULL CHECK (quantity >= 0),
  low_stock_at  integer NOT NULL DEFAULT 50,
  PRIMARY KEY (variant_id, lot_id)
);

-- ── Customers & orders ───────────────────────────────────────────────
CREATE TABLE customers (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email         citext UNIQUE NOT NULL,
  name          text,
  marketing_opt_in boolean NOT NULL DEFAULT false,
  created_at    timestamptz NOT NULL DEFAULT now()
);

CREATE TYPE order_status AS ENUM ('pending','paid','fulfilled','refunded','cancelled');

CREATE TABLE orders (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  medusa_order_id text UNIQUE,
  customer_id   uuid NOT NULL REFERENCES customers(id),
  status        order_status NOT NULL DEFAULT 'pending',
  total_cents   integer NOT NULL,
  placed_at     timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE order_items (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id      uuid NOT NULL REFERENCES orders(id),
  variant_id    uuid NOT NULL REFERENCES variants(id),
  lot_id        uuid REFERENCES lots(id),   -- allocated at fulfilment; powers recall queries
  quantity      integer NOT NULL CHECK (quantity > 0),
  unit_cents    integer NOT NULL
);
CREATE INDEX idx_order_items_lot ON order_items(lot_id);

-- ── Subscriptions ────────────────────────────────────────────────────
CREATE TYPE sub_status AS ENUM ('active','paused','cancelled','past_due');

CREATE TABLE subscriptions (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id   uuid NOT NULL REFERENCES customers(id),
  variant_id    uuid NOT NULL REFERENCES variants(id),
  stripe_sub_id text UNIQUE NOT NULL,
  status        sub_status NOT NULL DEFAULT 'active',
  cadence_days  integer NOT NULL DEFAULT 56,
  next_charge_at timestamptz,
  created_at    timestamptz NOT NULL DEFAULT now()
);

-- ── Reviews (verified-only by construction) ─────────────────────────
CREATE TYPE review_status AS ENUM ('pending','approved','rejected');

CREATE TABLE reviews (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id      uuid NOT NULL REFERENCES orders(id),  -- FK proves verified purchase
  customer_id   uuid NOT NULL REFERENCES customers(id),
  variant_id    uuid NOT NULL REFERENCES variants(id),
  rating        integer NOT NULL CHECK (rating BETWEEN 1 AND 5),
  body          text NOT NULL,
  status        review_status NOT NULL DEFAULT 'pending',
  incentivised  boolean NOT NULL DEFAULT false,       -- must render disclosure badge if true
  rejection_reason text,
  moderated_by  uuid,
  submitted_at  timestamptz NOT NULL DEFAULT now(),
  UNIQUE (order_id, variant_id)                       -- one review per item per order
);

-- ── Evidence library & claims registry ──────────────────────────────
CREATE TYPE source_class AS ENUM ('rct','clinical_comparative','review','tradition');
CREATE TYPE confidence AS ENUM ('promising_but_limited','mixed','insufficient');

CREATE TABLE evidence_entries (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  citation      text NOT NULL,
  source_class  source_class NOT NULL,
  population    text NOT NULL,
  duration      text NOT NULL,
  findings      text NOT NULL,
  limitations   text NOT NULL,        -- NOT NULL: limitations are mandatory
  confidence    confidence NOT NULL,
  created_at    timestamptz NOT NULL DEFAULT now()
);

CREATE TYPE claim_status AS ENUM ('approved','restricted','prohibited');

CREATE TABLE claims (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  claim_text    text NOT NULL,
  channel       text NOT NULL DEFAULT 'site',   -- site | email | ads | packaging
  status        claim_status NOT NULL,
  note          text,
  approved_by   uuid,                            -- compliance role user
  created_at    timestamptz NOT NULL DEFAULT now(),
  updated_at    timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE claim_evidence (
  claim_id      uuid NOT NULL REFERENCES claims(id),
  evidence_id   uuid NOT NULL REFERENCES evidence_entries(id),
  PRIMARY KEY (claim_id, evidence_id)
);

-- ── Legal documents (versioned) ──────────────────────────────────────
CREATE TABLE legal_documents (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  doc_type      text NOT NULL,        -- privacy | terms | shipping | returns | medical_disclaimer | accessibility
  version       integer NOT NULL,
  body_md       text NOT NULL,
  effective_from timestamptz NOT NULL,
  UNIQUE (doc_type, version)
);

-- ── Support & adverse events ─────────────────────────────────────────
CREATE TYPE ticket_status AS ENUM ('open','waiting','resolved');

CREATE TABLE support_tickets (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id   uuid REFERENCES customers(id),
  order_id      uuid REFERENCES orders(id),
  category      text NOT NULL,        -- shipping | product | subscription | adverse_reaction | other
  subject       text NOT NULL,
  status        ticket_status NOT NULL DEFAULT 'open',
  created_at    timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE support_notes (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_id     uuid NOT NULL REFERENCES support_tickets(id),
  author_id     uuid NOT NULL,
  body          text NOT NULL,
  created_at    timestamptz NOT NULL DEFAULT now()
);

CREATE TYPE ae_severity AS ENUM ('mild','moderate','serious');

CREATE TABLE adverse_events (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_id     uuid REFERENCES support_tickets(id),
  variant_id    uuid REFERENCES variants(id),
  lot_id        uuid REFERENCES lots(id),
  description   text NOT NULL,
  severity      ae_severity NOT NULL,
  mocra_serious boolean NOT NULL DEFAULT false,  -- flags reporting obligations
  reported_at   timestamptz NOT NULL DEFAULT now(),
  actions_taken text,
  reporter_contact text
);
CREATE INDEX idx_ae_lot ON adverse_events(lot_id);

-- ── Admin RBAC ────────────────────────────────────────────────────────
CREATE TYPE admin_role AS ENUM ('owner','ops','content','compliance','support');

CREATE TABLE admin_users (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email         citext UNIQUE NOT NULL,
  name          text NOT NULL,
  role          admin_role NOT NULL,
  active        boolean NOT NULL DEFAULT true,
  created_at    timestamptz NOT NULL DEFAULT now()
);

-- Recall drill: all customers who received a given lot
-- SELECT DISTINCT c.email FROM order_items oi
--   JOIN orders o ON o.id = oi.order_id
--   JOIN customers c ON c.id = o.customer_id
--  WHERE oi.lot_id = $1;

-- ── Webhook idempotency (Chunk 3) ────────────────────────────────────
CREATE TABLE webhook_events (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  stripe_event_id text UNIQUE NOT NULL,
  type            text NOT NULL,
  received_at     timestamptz NOT NULL DEFAULT now()
);
