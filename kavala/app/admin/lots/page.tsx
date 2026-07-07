import { lots } from "@/lib/admin/queries";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function LotsPage() {
  const rows = await lots();
  return (
    <>
      <h1 className="type-display text-3xl text-bone">Lots &amp; batches</h1>
      <p className="mt-3 max-w-xl text-[14px] text-bone-dim">
        Every unit shipped is allocated to a lot at fulfilment, so a recall is one click: the
        affected-customers list is generated from order allocations, never reconstructed by hand.
      </p>
      <div className="hairline mt-10 overflow-x-auto">
        <table className="w-full text-left text-[14px]">
          <thead>
            <tr className="border-b border-bone/10">
              {["Batch", "SKU", "Manufactured", "Expires", "On hand", "Orders shipped", ""].map((h, i) => (
                <th key={i} className="type-label px-5 py-4 font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 && (
              <tr><td colSpan={7} className="px-5 py-10 text-bone-dim">No lots registered. Add the first production batch with its COA before launch.</td></tr>
            )}
            {rows.map((l) => (
              <tr key={l.id} className="border-b border-bone/5">
                <td className="px-5 py-4 font-mono text-[12px] text-bone">
                  {l.batch_number}
                  {l.quarantined && <span className="type-label ml-3 text-oil-bright">Quarantined</span>}
                </td>
                <td className="px-5 py-4 text-bone-dim">{l.sku}</td>
                <td className="px-5 py-4 text-bone-dim">{l.manufactured_on}</td>
                <td className="px-5 py-4 text-bone-dim">{l.expires_on}</td>
                <td className="px-5 py-4 text-bone">{l.on_hand}</td>
                <td className="px-5 py-4 text-bone">{l.shipped_orders}</td>
                <td className="px-5 py-4">
                  <Link href={`/admin/lots/${l.id}/recall`} className="meniscus-underline text-[13px] text-bone-dim hover:text-bone">
                    Recall list
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
