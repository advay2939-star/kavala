import type { Metadata } from "next";
import { EVIDENCE, GLOBAL_DISCLAIMER } from "@/lib/compliance/claims";
import { EvidenceCard } from "@/components/marketing/EvidenceCard";
import { Meniscus } from "@/components/ui/Meniscus";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Evidence & Tradition",
  description:
    "The published research on Irimedadi and Arimedadi taila, summarised plainly — findings and limitations together. Kavala is not intended to diagnose, treat, cure or prevent any disease.",
};

export default function EvidencePage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-20 md:py-28">
      <p className="type-label mb-6">Evidence &amp; Tradition</p>
      <h1 className="type-display text-4xl text-bone md:text-6xl">
        The full picture, findings and limitations together.
      </h1>
      <p className="mt-8 max-w-2xl text-[16px] leading-relaxed text-bone-dim">
        Most brands in this category show you the flattering half of the research. We publish
        all of it — the studies, their size, their duration, and exactly what they do and do
        not show. This page is written to be checked, not believed.
      </p>

      <Meniscus className="my-14 opacity-60" />

      <section aria-labelledby="tradition">
        <h2 id="tradition" className="type-display text-3xl text-bone">The tradition</h2>
        <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-bone-dim">
          Kavala takes its name from <em>kavala graha</em> — the classical Ayurvedic practice of
          holding and moving oil in the mouth, described alongside its companion practice{" "}
          <em>gandusha</em> in the traditional texts. The formula we prepare, Irimedadi taila
          (also spelled Arimedadi in the literature), is a classical preparation on a sesame
          base, named for the irimeda bark. Tradition tells you why the ritual exists and how
          it feels. It is not, on its own, evidence of effect — which is why the studies below
          matter, limitations included.
        </p>
      </section>

      <section aria-labelledby="studies" className="mt-16">
        <h2 id="studies" className="type-display text-3xl text-bone">The modern studies</h2>
        <div className="mt-8 space-y-6">
          {EVIDENCE.map((entry, i) => (
            <Reveal key={entry.id} delay={i * 0.05}>
              <EvidenceCard entry={entry} />
            </Reveal>
          ))}
        </div>
      </section>

      <section aria-labelledby="means" className="mt-16">
        <h2 id="means" className="type-display text-3xl text-bone">What this means for you</h2>
        <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-bone-dim">
          Taken together: a small number of short studies suggest this class of oil can be a
          worthwhile <em>addition</em> to normal brushing, flossing and professional cleaning.
          None of it supports using the oil <em>instead</em> of any of those things, and
          mainstream dental bodies do not endorse oil practices. Kavala is a ritual and a
          cosmetic — if you have tooth pain or bleeding gums, the right response is a dentist,
          promptly.
        </p>
        <p className="mt-6 text-[13px] leading-relaxed text-bone-dim/80">{GLOBAL_DISCLAIMER}</p>
      </section>
    </div>
  );
}
