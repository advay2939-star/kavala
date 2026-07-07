import Link from "next/link";
import { home } from "@/lib/content/home";
import { Reveal } from "@/components/ui/Reveal";

export function FormulaTriptych() {
  const { formula } = home;
  return (
    <section className="border-y border-bone/10 bg-lacquer-soft">
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <p className="type-label mb-6">{formula.eyebrow}</p>
        <Reveal>
          <h2 className="type-display max-w-2xl text-4xl text-bone md:text-5xl">{formula.headline}</h2>
          <p className="mt-6 max-w-xl text-[16px] leading-relaxed text-bone-dim">{formula.body}</p>
        </Reveal>
        <div className="mt-16 grid gap-px overflow-hidden rounded-[2px] border border-bone/10 bg-bone/10 md:grid-cols-3">
          {formula.ingredients.map((ing, i) => (
            <Reveal key={ing.name} delay={i * 0.08} className="bg-lacquer p-8">
              <h3 className="type-display text-2xl text-bone">{ing.name}</h3>
              <p className="mt-1 text-[13px] italic text-oil-bright">{ing.latin}</p>
              <p className="mt-4 text-[14px] leading-relaxed text-bone-dim">{ing.role}</p>
            </Reveal>
          ))}
        </div>
        <Link href={formula.link.href} className="meniscus-underline mt-10 inline-block text-[14px] text-bone">
          {formula.link.label} →
        </Link>
      </div>
    </section>
  );
}
