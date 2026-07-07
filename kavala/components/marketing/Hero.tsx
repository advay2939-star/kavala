import { home } from "@/lib/content/home";
import { Button } from "@/components/ui/Button";

/**
 * Hero: near-black field, bottle silhouette rendered in CSS until the
 * macro photography shoot delivers final assets (see launch roadmap).
 * One light sweep on load, then stillness.
 */
export function Hero() {
  const { hero } = home;
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid max-w-6xl gap-16 px-6 pb-24 pt-20 md:grid-cols-2 md:items-center md:pb-32 md:pt-28">
        <div>
          <p className="type-label mb-6">{hero.eyebrow}</p>
          <h1 className="type-display text-5xl text-bone md:text-7xl">{hero.headline}</h1>
          <p className="mt-6 max-w-md text-[17px] leading-relaxed text-bone-dim">{hero.sub}</p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button href={hero.ctaPrimary.href}>{hero.ctaPrimary.label}</Button>
            <Button href={hero.ctaSecondary.href} variant="outline">
              {hero.ctaSecondary.label}
            </Button>
          </div>
        </div>

        {/* Bottle placeholder object — replaced by photography, kept as art direction reference */}
        <div className="relative mx-auto flex h-[420px] w-[220px] items-end justify-center" aria-hidden="true">
          <div className="relative h-[360px] w-[150px] overflow-hidden rounded-[6px] bg-gradient-to-b from-[#3a2417] via-[#241509] to-[#120a05] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)]">
            {/* oil level */}
            <div className="absolute inset-x-0 bottom-0 h-[72%] bg-gradient-to-b from-oil/70 to-[#3f2410]" />
            <div className="meniscus absolute inset-x-0 top-[28%]" />
            {/* label */}
            <div className="absolute inset-x-[14%] top-[38%] flex h-[34%] flex-col items-center justify-center gap-2 rounded-[2px] bg-bone px-2 text-center">
              <span className="type-display text-[15px] tracking-[0.3em] text-ink">KAVALA</span>
              <span className="text-[7px] uppercase tracking-[0.22em] text-ink/70">No. 01 Ritual Oil · 100 ml</span>
              <span className="text-[6px] tracking-[0.12em] text-ink/50">Lot printed on base</span>
            </div>
            {/* light sweep */}
            <div className="light-sweep pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-transparent via-bone/25 to-transparent" />
          </div>
          {/* cap */}
          <div className="absolute -top-2 h-16 w-12 rounded-[3px] bg-gradient-to-b from-[#2d2620] to-[#161210] shadow-inner" />
        </div>
      </div>
    </section>
  );
}
