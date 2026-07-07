import { query } from "./db";

/** CHUNK 5 — Admin data layer. Every dashboard view reads through here. */

export interface OrderRow {
  id: string; email: string; status: string; total_cents: number; placed_at: string;
}
export const recentOrders = async (limit = 50) =>
  (await query<OrderRow>(
    `SELECT o.id, c.email, o.status, o.total_cents, o.placed_at
       FROM orders o JOIN customers c ON c.id = o.customer_id
      ORDER BY o.placed_at DESC LIMIT $1`, [limit],
  )).rows;

export interface ReviewRow {
  id: string; email: string; product: string; rating: number; body: string;
  status: string; incentivised: boolean; submitted_at: string;
}
export const pendingReviews = async () =>
  (await query<ReviewRow>(
    `SELECT r.id, c.email, p.name AS product, r.rating, r.body, r.status,
            r.incentivised, r.submitted_at
       FROM reviews r
       JOIN customers c ON c.id = r.customer_id
       JOIN variants v ON v.id = r.variant_id
       JOIN products p ON p.id = v.product_id
      WHERE r.status = 'pending' ORDER BY r.submitted_at ASC`,
  )).rows;

export async function moderateReview(id: string, approve: boolean, moderatorId: string, reason?: string) {
  if (!approve && !reason?.trim()) throw new Error("A rejection reason is required and is logged.");
  await query(
    `UPDATE reviews SET status = $1, moderated_by = $2, rejection_reason = $3 WHERE id = $4`,
    [approve ? "approved" : "rejected", moderatorId, approve ? null : reason, id],
  );
}

export interface AeRow {
  id: string; severity: string; mocra_serious: boolean; description: string;
  batch_number: string | null; reported_at: string;
}
export const adverseEvents = async () =>
  (await query<AeRow>(
    `SELECT ae.id, ae.severity, ae.mocra_serious, ae.description,
            l.batch_number, ae.reported_at
       FROM adverse_events ae LEFT JOIN lots l ON l.id = ae.lot_id
      ORDER BY ae.mocra_serious DESC, ae.reported_at DESC`,
  )).rows;

export interface LotRow {
  id: string; batch_number: string; sku: string; manufactured_on: string;
  expires_on: string; quarantined: boolean; on_hand: number; shipped_orders: number;
}
export const lots = async () =>
  (await query<LotRow>(
    `SELECT l.id, l.batch_number, v.sku, l.manufactured_on, l.expires_on, l.quarantined,
            COALESCE(SUM(il.quantity), 0)::int AS on_hand,
            (SELECT COUNT(DISTINCT oi.order_id) FROM order_items oi WHERE oi.lot_id = l.id)::int AS shipped_orders
       FROM lots l
       JOIN variants v ON v.id = l.variant_id
       LEFT JOIN inventory_levels il ON il.lot_id = l.id
      GROUP BY l.id, v.sku ORDER BY l.manufactured_on DESC`,
  )).rows;

/** The recall drill: every customer who received a given lot. */
export const recallList = async (lotId: string) =>
  (await query<{ email: string; order_id: string; placed_at: string }>(
    `SELECT DISTINCT c.email, o.id AS order_id, o.placed_at
       FROM order_items oi
       JOIN orders o ON o.id = oi.order_id
       JOIN customers c ON c.id = o.customer_id
      WHERE oi.lot_id = $1 ORDER BY o.placed_at DESC`, [lotId],
  )).rows;

export interface SubRow {
  id: string; email: string; sku: string; status: string;
  cadence_days: number; next_charge_at: string | null;
}
export const subscriptions = async () =>
  (await query<SubRow>(
    `SELECT s.id, c.email, v.sku, s.status, s.cadence_days, s.next_charge_at
       FROM subscriptions s
       JOIN customers c ON c.id = s.customer_id
       JOIN variants v ON v.id = s.variant_id
      ORDER BY s.created_at DESC`,
  )).rows;

export const kpis = async () => {
  const [{ rows: [orders] }, { rows: [subs] }, { rows: [reviews] }, { rows: [ae] }] = await Promise.all([
    query<{ n: string; revenue: string }>(`SELECT COUNT(*) n, COALESCE(SUM(total_cents),0) revenue FROM orders WHERE status IN ('paid','fulfilled')`),
    query<{ n: string }>(`SELECT COUNT(*) n FROM subscriptions WHERE status = 'active'`),
    query<{ n: string }>(`SELECT COUNT(*) n FROM reviews WHERE status = 'pending'`),
    query<{ n: string }>(`SELECT COUNT(*) n FROM adverse_events WHERE mocra_serious`),
  ]);
  return {
    orders: Number(orders.n), revenueCents: Number(orders.revenue),
    activeSubs: Number(subs.n), pendingReviews: Number(reviews.n), seriousAe: Number(ae.n),
  };
};
