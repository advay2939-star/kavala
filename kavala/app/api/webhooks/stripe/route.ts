import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/commerce/stripe";
import { query } from "@/lib/admin/db";
import type Stripe from "stripe";

/**
 * POST /api/webhooks/stripe
 * Signature-verified, idempotent webhook handler. Mirrors Stripe
 * events into the operational Postgres (orders, subscriptions) so the
 * admin dashboard, lot allocation and recall queries have a local
 * source of truth.
 */
export async function POST(req: NextRequest) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) return NextResponse.json({ error: "Webhook not configured." }, { status: 503 });

  const signature = req.headers.get("stripe-signature");
  if (!signature) return NextResponse.json({ error: "Missing signature." }, { status: 400 });

  let event: Stripe.Event;
  try {
    const payload = await req.text();
    event = getStripe().webhooks.constructEvent(payload, signature, secret);
  } catch {
    return NextResponse.json({ error: "Signature verification failed." }, { status: 400 });
  }

  // Idempotency: record the event id first; a conflict means we've
  // already processed it and can acknowledge immediately.
  const inserted = await query(
    `INSERT INTO webhook_events (stripe_event_id, type)
     VALUES ($1, $2) ON CONFLICT (stripe_event_id) DO NOTHING RETURNING id`,
    [event.id, event.type],
  );
  if (inserted.rowCount === 0) return NextResponse.json({ received: true, duplicate: true });

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      await query(
        `WITH c AS (
           INSERT INTO customers (email, name)
           VALUES ($1, $2)
           ON CONFLICT (email) DO UPDATE SET name = COALESCE(customers.name, EXCLUDED.name)
           RETURNING id
         )
         INSERT INTO orders (medusa_order_id, customer_id, status, total_cents)
         SELECT $3, c.id, 'paid', $4 FROM c
         ON CONFLICT (medusa_order_id) DO NOTHING`,
        [
          session.customer_details?.email ?? "unknown@unknown.invalid",
          session.customer_details?.name ?? null,
          session.id,
          session.amount_total ?? 0,
        ],
      );
      break;
    }
    case "customer.subscription.created":
    case "customer.subscription.updated":
    case "customer.subscription.deleted": {
      const sub = event.data.object as Stripe.Subscription;
      const status =
        event.type === "customer.subscription.deleted"
          ? "cancelled"
          : sub.pause_collection
            ? "paused"
            : sub.status === "past_due"
              ? "past_due"
              : "active";
      await query(
        `UPDATE subscriptions SET status = $1 WHERE stripe_sub_id = $2`,
        [status, sub.id],
      );
      break;
    }
    case "invoice.payment_failed": {
      const invoice = event.data.object as Stripe.Invoice;
      const subId = typeof invoice.parent?.subscription_details?.subscription === "string"
        ? invoice.parent.subscription_details.subscription : null;
      if (subId) {
        await query(`UPDATE subscriptions SET status = 'past_due' WHERE stripe_sub_id = $1`, [subId]);
      }
      break;
    }
  }

  return NextResponse.json({ received: true });
}
