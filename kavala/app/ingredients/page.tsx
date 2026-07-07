import type { Metadata } from "next";
import { monographs, allergenNotice } from "@/lib/content/ingredients";
import { Meniscus } from "@/components/ui/Meniscus";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Ingredients",
  description: "Every botanical in Kavala No. 01, named, sourced and explained — with the allergen notice where you can see it.",
};

export default function IngredientsPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-20 md:py-28">
      <p className="type-label mb-6">The formula</p>
      <h1 className="type-display text-4xl text-bone md:text-6xl">Named, sourced, explained.</h1>
      <p className="mt-8 max-w-2xl text-[16px] leading-relaxed text-bone-dim">
        The formula belongs to the classical Ayurvedic pharmacopoeia, where it is recorded as
        Irimedadi taila. Each botanical below is listed with its Sanskrit and Latin names, its
        traditional place in the preparation, and what it actually contributes to the way the
        oil feels and tastes. Nothing hidden, nothing renamed.
      </p>

      <Meniscus className="my-14 opacity-60" />

      <div className="grid gap-px overflow-hidden rounded-[2px] border border-bone/10 bg-bone/10 md:grid-cols-2">
        {monographs.map((m, i) => (
          <Reveal key={m.name} delay={(i % 2) * 0.06} className="bg-lacquer p-8">
            <h2 className="type-display text-2xl text-bone">{m.name}</h2>
            <p className="mt-1 text-[13px] text-bone-dim">
              {m.sanskrit} · <span className="italic text-oil-bright">{m.latin}</span>
            </p>
            <dl className="mt-5 space-y-4">
              <div>
                <dt className="type-label mb-1.5">In the tradition</dt>
                <dd className="text-[14px] leading-relaxed text-bone-dim">{m.role}</dd>
              </div>
              <div>
                <dt className="type-label mb-1.5">In the mouth</dt>
                <dd className="text-[14px] leading-relaxed text-bone-dim">{m.sensory}</dd>
              </div>
            </dl>
          </Reveal>
        ))}
      </div>

      <aside aria-label="Allergen notice" className="mt-14 border-l-2 border-oil pl-6">
        <h2 className="type-label mb-3 text-oil-bright">Allergen notice</h2>
        <p className="max-w-2xl text-[14px] leading-relaxed text-bone-dim">{allergenNotice}</p>
      </aside>
    </div>
  );
}
