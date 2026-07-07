import { subscriptions } from "@/lib/admin/queries";

export const dynamic = "force-dynamic";

export default async function SubscriptionsPage() {
  const subs = await subscriptions();
  return (
    <>
      <h1 className="type-display text-3xl text-bone">Subscriptions</h1>
      <div className="hairline mt-10 overflow-x-auto">
        <table className="w-full text-left text-[14px]">
          <thead>
            <tr className="border-b border-bone/10">
              {["Customer", "SKU", "Status", "Cadence", "Next charge"].map((h) => (
                <th key={h} className="type-label px-5 py-4 font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {subs.length === 0 && (
              <tr><td colSpan={5} className="px-5 py-10 text-bone-dim">No subscriptions yet. The refill engine starts with the first Duo.</td></tr>
            )}
            {subs.map((s) => (
              <tr key={s.id} className="border-b border-bone/5">
                <td className="px-5 py-4 text-bone">{s.email}</td>
                <td className="px-5 py-4 text-bone-dim">{s.sku}</td>
                <td className="px-5 py-4"><span className="type-label">{s.status}</span></td>
                <td className="px-5 py-4 text-bone-dim">Every {s.cadence_days} days</td>
                <td className="px-5 py-4 text-bone-dim">
                  {s.next_charge_at ? new Date(s.next_charge_at).toLocaleDateString("en-US") : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
