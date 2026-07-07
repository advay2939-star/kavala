"use client";

import type { CartLine } from "@/lib/types";

export const commerceEnabledClient = () =>
  process.env.NEXT_PUBLIC_COMMERCE_ENABLED === "true";

/** Calls /api/checkout and redirects to Stripe. Throws on failure. */
export async function startCheckout(lines: CartLine[]): Promise<void> {
  const res = await fetch("/api/checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ lines: lines.map((l) => ({ sku: l.sku, qty: l.qty })) }),
  });
  const data = (await res.json()) as { url?: string; error?: string };
  if (!res.ok || !data.url) throw new Error(data.error ?? "Checkout could not be started.");
  window.location.assign(data.url);
}
