import { recallList } from "@/lib/admin/queries";

export const dynamic = "force-dynamic";

/** The recall drill made real: every customer who received this lot. */
export default async function RecallPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const rows = await recallList(id);
  return (
    <>
      <h1 className="type-display text-3xl text-bone">Recall list</h1>
      <p className="mt-3 max-w-xl text-[14px] text-bone-dim">
        {rows.length} order{rows.length === 1 ? "" : "s"} received units from this lot. Export
        this list to the notification template before quarantining remaining stock.
      </p>
      <div className="hairline mt-10 overflow-x-auto">
        <table className="w-full text-left text-[14px]">
          <thead>
            <tr className="border-b border-bone/10">
              {["Customer", "Order", "Placed"].map((h) => (
                <th key={h} className="type-label px-5 py-4 font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.order_id} className="border-b border-bone/5">
                <td className="px-5 py-4 text-bone">{r.email}</td>
                <td className="px-5 py-4 font-mono text-[12px] text-bone-dim">{r.order_id.slice(0, 8)}</td>
                <td className="px-5 py-4 text-bone-dim">{new Date(r.placed_at).toLocaleDateString("en-US")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
