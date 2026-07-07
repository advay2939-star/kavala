import { home } from "@/lib/content/home";
import { Reveal } from "@/components/ui/Reveal";

export function RitualNotReplacement() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24 text-center md:py-32">
      <Reveal>
        <p className="type-display mx-auto max-w-3xl text-3xl leading-snug text-bone md:text-4xl">
          {home.ritualNotReplacement}
        </p>
      </Reveal>
    </section>
  );
}
