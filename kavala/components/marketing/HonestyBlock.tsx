import Link from "next/link";
import { home } from "@/lib/content/home";
import { Reveal } from "@/components/ui/Reveal";
import { Meniscus } from "@/components/ui/Meniscus";

/**
 * The honesty block is a conversion asset, not a legal apology.
 * Its copy is deliberately balanced; do not "optimise" it toward
 * stronger benefit language — the claims linter will catch most
 * attempts, and the compliance role owns this section.
 */
export function HonestyBlock() {
  const { honesty } = home;
  return (
    <section className="mx-auto max-w-6xl px-6 py-24 md:py-32">
      <div className="hairline bg-lacquer-soft p-10 md:p-16">
        <p className="type-label mb-6">{honesty.eyebrow}</p>
        <Reveal>
          <h2 className="type-display max-w-2xl text-4xl text-bone md:text-5xl">{honesty.headline}</h2>
        </Reveal>
        <div className="mt-12 grid gap-10 md:grid-cols-2">
          <Reveal>
            <h3 className="type-label mb-4 text-oil-bright">What small studies suggest</h3>
            <p className="text-[15px] leading-relaxed text-bone-dim">{honesty.says}</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h3 className="type-label mb-4 text-oil-bright">What remains unproven</h3>
            <p className="text-[15px] leading-relaxed text-bone-dim">{honesty.doesnt}</p>
          </Reveal>
        </div>
        <Meniscus className="my-10 opacity-60" />
        <div className="flex flex-wrap items-center justify-between gap-6">
          <p className="type-display text-xl text-bone">{honesty.close}</p>
          <Link href={honesty.link.href} className="meniscus-underline text-[14px] text-bone">
            {honesty.link.label} →
          </Link>
        </div>
      </div>
    </section>
  );
}
