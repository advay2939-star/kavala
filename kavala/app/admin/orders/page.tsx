import { recentOrders } from "@/lib/admin/queries";

export const dynamic = "force-dynamic";

export default async function OrdersPage() {
  const orders = await recentOrders();
  return (
    <>
      <h1 className="type-display text-3xl text-bone">Orders</h1>
      <div className="hairline mt-10 overflow-x-auto">
        <table className="w-full text-left text-[14px]">
          <thead>
            <tr className="border-b border-bone/10">
              {["Order", "Customer", "Status", "Total", "Placed"].map((h) => (
                <th key={h} className="type-label px-5 py-4 font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 && (
              <tr><td colSpan={5} className="px-5 py-10 text-bone-dim">No orders yet. They will appear the moment Stripe confirms the first checkout.</td></tr>
            )}
            {orders.map((o) => (
              <tr key={o.id} className="border-b border-bone/5">
                <td className="px-5 py-4 font-mono text-[12px] text-bone-dim">{o.id.slice(0, 8)}</td>
                <td className="px-5 py-4 text-bone">{o.email}</td>
                <td className="px-5 py-4"><span className="type-label">{o.status}</span></td>
                <td className="px-5 py-4 text-bone">${(o.total_cents / 100).toFixed(2)}</td>
                <td className="px-5 py-4 text-bone-dim">{new Date(o.placed_at).toLocaleString("en-US")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
