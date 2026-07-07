import { home } from "@/lib/content/home";
import { Reveal } from "@/components/ui/Reveal";

export function TheMinute() {
  const { minute } = home;
  return (
    <section className="mx-auto max-w-6xl px-6 py-24 md:py-32">
      <p className="type-label mb-12">{minute.eyebrow}</p>
      <div className="grid gap-12 md:grid-cols-3">
        {minute.steps.map((step, i) => (
          <Reveal key={step.title} delay={i * 0.08}>
            <h3 className="type-display text-3xl text-bone">{step.title}</h3>
            <p className="mt-4 max-w-xs text-[15px] leading-relaxed text-bone-dim">{step.body}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
