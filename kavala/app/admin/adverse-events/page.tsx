import { adverseEvents } from "@/lib/admin/queries";

export const dynamic = "force-dynamic";

export default async function AdverseEventsPage() {
  const events = await adverseEvents();
  return (
    <>
      <h1 className="type-display text-3xl text-bone">Adverse events</h1>
      <p className="mt-3 max-w-xl text-[14px] text-bone-dim">
        Intake from the contact form's product-reaction category. Serious events are flagged for
        MoCRA reporting obligations and sort to the top. Export before any regulatory deadline.
      </p>
      {events.length === 0 ? (
        <p className="mt-12 text-[14px] text-bone-dim">No adverse events recorded. May it stay that way.</p>
      ) : (
        <ul className="mt-10 space-y-4">
          {events.map((e) => (
            <li key={e.id} className={`hairline p-6 ${e.mocra_serious ? "border-oil-bright" : ""}`}>
              <div className="flex flex-wrap items-center gap-3">
                <span className={`type-label ${e.mocra_serious ? "text-oil-bright" : ""}`}>
                  {e.mocra_serious ? "Serious — MoCRA reportable" : `Severity: ${e.severity}`}
                </span>
                {e.batch_number && <span className="type-label">Lot {e.batch_number}</span>}
                <span className="type-label">{new Date(e.reported_at).toLocaleDateString("en-US")}</span>
              </div>
              <p className="mt-4 text-[14px] leading-relaxed text-bone">{e.description}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
