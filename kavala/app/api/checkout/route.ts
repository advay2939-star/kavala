import { NextRequest, NextResponse } from "next/server";
import { getStripe, PRICE_IDS, commerceEnabled } from "@/lib/commerce/stripe";
import { bySku } from "@/lib/commerce/products";

interface CheckoutBody {
  lines: { sku: string; qty: number; subscription?: boolean }[];
}

/**
 * POST /api/checkout
 * Creates a Stripe Checkout Session from SKUs + quantities.
 * Amounts are resolved server-side from Stripe Price IDs — the client
 * cannot influence pricing. Mixed carts (one-time + subscription) are
 * split per Stripe's rules: subscription mode wins if present.
 */
export async function POST(req: NextRequest) {
  if (!commerceEnabled()) {
    return NextResponse.json(
      { error: "Commerce is not enabled in this environment." },
      { status: 503 },
    );
  }

  let body: CheckoutBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  if (!Array.isArray(body.lines) || body.lines.length === 0 || body.lines.length > 20) {
    return NextResponse.json({ error: "Cart must contain 1–20 lines." }, { status: 400 });
  }

  const hasSubscription = body.lines.some((l) => l.subscription);
  const lineItems: { price: string; quantity: number }[] = [];

  for (const line of body.lines) {
    const product = bySku(line.sku);
    const prices = PRICE_IDS[line.sku];
    const qty = Math.floor(line.qty);
    if (!product || !prices || qty < 1 || qty > 10) {
      return NextResponse.json({ error: `Invalid line: ${line.sku}` }, { status: 400 });
    }
    const price = line.subscription ? prices.subscription : prices.oneTime;
    if (!price) {
      return NextResponse.json(
        { error: `${product.name} is not available on subscription.` },
        { status: 400 },
      );
    }
    lineItems.push({ price, quantity: qty });
  }

  const origin = req.nextUrl.origin;
  const session = await getStripe().checkout.sessions.create({
    mode: hasSubscription ? "subscription" : "payment",
    line_items: lineItems,
    success_url: `${origin}/order/confirmed?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/shop`,
    shipping_address_collection: { allowed_countries: ["US"] },
    automatic_tax: { enabled: true },
    allow_promotion_codes: false, // luxury code: no coupon-box begging
  });

  return NextResponse.json({ url: session.url });
}
