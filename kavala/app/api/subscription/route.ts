import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/commerce/stripe";

type Action = "pause" | "resume" | "cancel" | "skip";

/**
 * POST /api/subscription — pause / resume / cancel / skip.
 * "One click, no calls, no guilt" from the marketing copy is enforced
 * here: every action is a single authenticated request.
 *
 * AUTH NOTE: customer identity must come from the session (magic-link
 * auth, Chunk 6). Until that ships, this route requires an internal
 * service token and is not exposed to browsers — no unauthenticated
 * path exists, and there is no fake auth stub.
 */
export async function POST(req: NextRequest) {
  const token = req.headers.get("x-internal-token");
  if (!token || token !== process.env.INTERNAL_SERVICE_TOKEN) {
    return NextResponse.json({ error: "Unauthorised." }, { status: 401 });
  }

  const { action, subscriptionId } = (await req.json()) as {
    action: Action;
    subscriptionId: string;
  };
  if (!subscriptionId?.startsWith("sub_")) {
    return NextResponse.json({ error: "Invalid subscription id." }, { status: 400 });
  }

  const stripe = getStripe();
  switch (action) {
    case "pause":
      await stripe.subscriptions.update(subscriptionId, {
        pause_collection: { behavior: "mark_uncollectible" },
      });
      break;
    case "resume":
      await stripe.subscriptions.update(subscriptionId, { pause_collection: null });
      break;
    case "cancel":
      await stripe.subscriptions.cancel(subscriptionId, { prorate: false });
      break;
    case "skip": {
      // Skip = push the next charge one full cadence (56 days) out.
      const sub = await stripe.subscriptions.retrieve(subscriptionId);
      const currentEnd = sub.items.data[0]?.current_period_end ?? Math.floor(Date.now() / 1000);
      await stripe.subscriptions.update(subscriptionId, {
        trial_end: currentEnd + 56 * 24 * 60 * 60,
        proration_behavior: "none",
      });
      break;
    }
    default:
      return NextResponse.json({ error: "Unknown action." }, { status: 400 });
  }

  return NextResponse.json({ ok: true });
}
