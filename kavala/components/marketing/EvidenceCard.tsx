import type { EvidenceEntry } from "@/lib/types";

const confidenceLabel: Record<EvidenceEntry["confidence"], string> = {
  promising_but_limited: "Promising, but limited",
  mixed: "Mixed",
  insufficient: "Insufficient",
};

const sourceLabel: Record<EvidenceEntry["sourceClass"], string> = {
  rct: "Randomised clinical trial",
  clinical_comparative: "Comparative clinical study",
  review: "Evidence review",
  tradition: "Traditional source",
};

/**
 * The only component permitted to render restricted evidence claims.
 * It refuses to render an entry without a limitations section —
 * limitations are a first-class part of the design, not a footnote.
 */
export function EvidenceCard({ entry }: { entry: EvidenceEntry }) {
  if (!entry.limitations?.trim()) {
    throw new Error(`Evidence entry ${entry.id} has no limitations section and may not render.`);
  }
  return (
    <article className="hairline bg-lacquer-soft p-8 md:p-10">
      <div className="flex flex-wrap items-center gap-3">
        <span className="type-label text-oil-bright">{sourceLabel[entry.sourceClass]}</span>
        <span aria-hidden="true" className="h-1 w-1 rounded-full bg-bone-dim/40" />
        <span className="type-label">{confidenceLabel[entry.confidence]}</span>
      </div>
      <p className="mt-5 text-[14px] leading-relaxed text-bone-dim">{entry.citation}</p>
      <dl className="mt-6 grid gap-6 md:grid-cols-2">
        <div>
          <dt className="type-label mb-2">Who and how long</dt>
          <dd className="text-[14px] leading-relaxed text-bone">{entry.population} · {entry.duration}</dd>
        </div>
        <div>
          <dt className="type-label mb-2">What it found</dt>
          <dd className="text-[14px] leading-relaxed text-bone">{entry.findings}</dd>
        </div>
      </dl>
      <div className="mt-8 border-l-2 border-oil pl-5">
        <h4 className="type-label mb-2 text-oil-bright">Limitations — read this part</h4>
        <p className="text-[14px] leading-relaxed text-bone-dim">{entry.limitations}</p>
      </div>
    </article>
  );
}
