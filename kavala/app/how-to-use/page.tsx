import type { Metadata } from "next";
import { howto } from "@/lib/content/howto";
import { Meniscus } from "@/components/ui/Meniscus";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "How to Use",
  description: "The Kavala ritual in six steps — one quiet minute, morning or night, alongside your normal oral-care routine.",
};

export default function HowToUsePage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-20 md:py-28">
      <p className="type-label mb-6">How to use</p>
      <h1 className="type-display text-4xl text-bone md:text-6xl">{howto.intro.headline}</h1>
      <p className="mt-8 max-w-2xl text-[16px] leading-relaxed text-bone-dim">{howto.intro.body}</p>

      <Meniscus className="my-14 opacity-60" />

      {/* The six steps — a real sequence, so numbering carries meaning */}
      <ol className="space-y-10">
        {howto.steps.map((s, i) => (
          <Reveal key={s.n} delay={i * 0.04}>
            <li className="grid gap-4 md:grid-cols-[80px_1fr] md:gap-8">
              <span aria-hidden="true" className="type-display text-3xl text-oil-bright">{s.n}</span>
              <div>
                <h2 className="type-display text-2xl text-bone">{s.title}</h2>
                <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-bone-dim">{s.body}</p>
              </div>
            </li>
          </Reveal>
        ))}
      </ol>

      <section aria-labelledby="when" className="mt-16">
        <h2 id="when" className="type-label mb-3 text-oil-bright">When</h2>
        <p className="max-w-2xl text-[15px] leading-relaxed text-bone-dim">{howto.when}</p>
      </section>

      <section aria-labelledby="who" className="mt-12">
        <h2 id="who" className="type-label mb-4 text-oil-bright">Who should not use Kavala</h2>
        <ul className="max-w-2xl space-y-3">
          {howto.whoShouldNot.map((w) => (
            <li key={w} className="text-[15px] leading-relaxed text-bone-dim">— {w}</li>
          ))}
        </ul>
      </section>

      <p className="mt-14 border-l-2 border-oil pl-6 text-[15px] leading-relaxed text-bone">
        {howto.mandatory}
      </p>
    </div>
  );
}
