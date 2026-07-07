import { kpis } from "@/lib/admin/queries";

export const dynamic = "force-dynamic";

export default async function AdminOverview() {
  const k = await kpis();
  const cards = [
    { label: "Paid orders", value: k.orders.toLocaleString() },
    { label: "Revenue", value: `$${(k.revenueCents / 100).toLocaleString()}` },
    { label: "Active subscriptions", value: k.activeSubs.toLocaleString() },
    { label: "Reviews awaiting moderation", value: k.pendingReviews.toLocaleString() },
    { label: "Serious adverse events", value: k.seriousAe.toLocaleString(), alert: k.seriousAe > 0 },
  ];
  return (
    <>
      <h1 className="type-display text-3xl text-bone">Overview</h1>
      <div className="mt-10 grid gap-4 md:grid-cols-3 lg:grid-cols-5">
        {cards.map((c) => (
          <div key={c.label} className={`hairline p-6 ${c.alert ? "border-oil-bright" : ""}`}>
            <p className="type-label">{c.label}</p>
            <p className={`type-display mt-3 text-3xl ${c.alert ? "text-oil-bright" : "text-bone"}`}>{c.value}</p>
          </div>
        ))}
      </div>
    </>
  );
}
