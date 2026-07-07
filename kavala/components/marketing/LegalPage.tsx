import { notFound } from "next/navigation";
import { bySlug } from "@/lib/compliance/legal";
import { Meniscus } from "@/components/ui/Meniscus";

export function LegalPage({ slug }: { slug: string }) {
  const doc = bySlug(slug);
  if (!doc) notFound();
  return (
    <div className="mx-auto max-w-3xl px-6 py-20 md:py-28">
      <p className="type-label mb-6">Legal</p>
      <h1 className="type-display text-4xl text-bone md:text-5xl">{doc.title}</h1>
      <p className="mt-4 text-[13px] text-bone-dim">Effective {doc.effective}</p>
      <Meniscus className="my-12 opacity-60" />
      <div className="space-y-10">
        {doc.sections.map((s) => (
          <section key={s.heading}>
            <h2 className="type-display text-2xl text-bone">{s.heading}</h2>
            <p className="mt-4 text-[15px] leading-relaxed text-bone-dim">{s.body}</p>
          </section>
        ))}
      </div>
    </div>
  );
}
