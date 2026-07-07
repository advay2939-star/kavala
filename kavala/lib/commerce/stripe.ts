import Stripe from "stripe";

/**
 * CHUNK 3 — Commerce engine.
 *
 * Stack decision (deviation from the original Medusa plan, justified):
 * with a five-SKU catalogue and one subscription cadence, a dedicated
 * Medusa server adds an entire service to host, patch and monitor for
 * capabilities Stripe already provides natively (Checkout, Billing,
 * customer portal, tax). Commerce therefore runs on Stripe directly;
 * Postgres (db/schema.sql) mirrors orders for support, lot allocation
 * and recalls. If the catalogue ever outgrows this, the order mirror
 * is the stable interface a future Medusa migration would slot behind.
 */
let stripe: Stripe | null = null;

export function getStripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY is not set. See .env.example.");
  if (!stripe) stripe = new Stripe(key, { apiVersion: "2025-06-30.basil" });
  return stripe;
}

/**
 * Server-side price map: SKU → Stripe Price ID. Prices live in Stripe
 * (source of truth for money); this map is the only bridge. Client
 * never sends amounts — only SKUs and quantities.
 */
export const PRICE_IDS: Record<string, { oneTime: string; subscription?: string }> = {
  "K-01": { oneTime: env("STRIPE_PRICE_K01") },
  "K-RF": { oneTime: env("STRIPE_PRICE_KRF"), subscription: env("STRIPE_PRICE_KRF_SUB") },
  "K-DUO": { oneTime: env("STRIPE_PRICE_KDUO") },
  "K-SET": { oneTime: env("STRIPE_PRICE_KSET") },
  "K-RSV": { oneTime: env("STRIPE_PRICE_KRSV") },
};

function env(name: string): string {
  // Resolved lazily at request time in production; empty string lets
  // the app boot in preview environments without commerce enabled.
  return process.env[name] ?? "";
}

export const commerceEnabled = () =>
  Boolean(process.env.STRIPE_SECRET_KEY && process.env.STRIPE_PRICE_K01);
