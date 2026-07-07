import type { Metadata } from "next";
import Link from "next/link";
import { Meniscus } from "@/components/ui/Meniscus";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "The Ritual",
  description: "Why a thousand-year-old oral ritual deserves a minute of your day — the Kavala story.",
};

/**
 * Founder-story framework: memory and craft, never a health
 * transformation narrative. Final founder copy is supplied by the
 * founder and reviewed by the compliance role before publish.
 */
export default function RitualPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-20 md:py-28">
      <p className="type-label mb-6">The Ritual</p>
      <h1 className="type-display text-4xl text-bone md:text-6xl">
        Some routines are chores. This one is a minute you keep for yourself.
      </h1>

      <Reveal>
        <section className="mt-16 max-w-2xl space-y-6 text-[16px] leading-relaxed text-bone-dim">
          <p>
            In houses across India, there is often a bottle like this one — unlabelled brass or
            repurposed glass, kept near the basin, warm oil inside. The practice it belongs to is
            older than toothpaste by centuries: <em>kavala graha</em>, the held-oil ritual of the
            classical Ayurvedic texts.
          </p>
          <p>
            Kavala began with one of those bottles, and with a gap that seemed absurd once noticed:
            the ritual felt considered, sensory, almost ceremonial — and the packaging it came in
            looked like cough medicine. The formula deserved an edition made with the same care the
            ritual asks of you.
          </p>
          <p>
            So that is what this is. The classical Irimedadi composition, prepared faithfully,
            presented properly: amber glass, a weighted cap, a pipette that doses a half-teaspoon, a
            batch number printed where you can see it. No reinvention, no improvement claims — the
            formula was never the problem.
          </p>
        </section>
      </Reveal>

      <Meniscus className="my-16 opacity-50" />

      <Reveal>
        <section className="grid gap-10 md:grid-cols-3">
          {[
            { title: "The feel", body: "Warm sesame, slow clove, a faint astringent grip. It reads as care, not medicine." },
            { title: "The minute", body: "Morning or night, before or after brushing. Long enough to notice; short enough to keep." },
            { title: "The place", body: "Alongside your brush, your floss and your dentist. Never in their place." },
          ].map((item) => (
            <div key={item.title}>
              <h2 className="type-display text-2xl text-bone">{item.title}</h2>
              <p className="mt-4 text-[15px] leading-relaxed text-bone-dim">{item.body}</p>
            </div>
          ))}
        </section>
      </Reveal>

      <div className="mt-16 flex flex-wrap gap-4">
        <Button href="/how-to-use">Learn the method</Button>
        <Button href="/evidence" variant="outline">Read the evidence</Button>
      </div>
      <p className="mt-10 text-[13px] text-bone-dim/70">
        Curious what the research does and doesn't show?{" "}
        <Link href="/evidence" className="meniscus-underline text-bone-dim">We publish both.</Link>
      </p>
    </div>
  );
}
