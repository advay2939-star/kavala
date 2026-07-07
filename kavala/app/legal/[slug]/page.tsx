import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { legalDocs, getLegalDoc } from "@/lib/compliance/legal";

export function generateStaticParams() {
  return legalDocs.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const doc = getLegalDoc(slug);
  return { title: doc?.title ?? "Legal" };
}

export default async function LegalPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const doc = getLegalDoc(slug);
  if (!doc) notFound();

  return (
    <div className="mx-auto max-w-3xl px-6 py-20 md:py-28">
      <p className="type-label mb-6">Legal</p>
      <h1 className="type-display text-4xl text-bone md:text-5xl">{doc.title}</h1>
      <p className="mt-4 text-[13px] text-bone-dim">Effective {doc.effective}</p>
      <div className="mt-12 space-y-10">
        {doc.sections.map((s) => (
          <section key={s.heading}>
            <h2 className="type-display text-xl text-bone">{s.heading}</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-bone-dim">{s.body}</p>
          </section>
        ))}
      </div>
    </div>
  );
}
