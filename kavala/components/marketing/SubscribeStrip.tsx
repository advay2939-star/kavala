import { home } from "@/lib/content/home";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function SubscribeStrip() {
  const { subscribe } = home;
  return (
    <section className="mx-auto max-w-6xl px-6 py-24 md:py-32">
      <Reveal className="flex flex-col items-start gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="type-label mb-6">{subscribe.eyebrow}</p>
          <h2 className="type-display max-w-xl text-4xl text-bone">{subscribe.headline}</h2>
          <p className="mt-4 max-w-md text-[15px] leading-relaxed text-bone-dim">{subscribe.body}</p>
        </div>
        <Button href={subscribe.cta.href}>{subscribe.cta.label}</Button>
      </Reveal>
    </section>
  );
}
