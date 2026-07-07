import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Reach Kavala for orders, subscriptions, press — or to report a product reaction, which we log and act on.",
};

/**
 * Static contact routes for launch. The support-ticket form (with the
 * adverse-reaction category feeding the AE intake queue) ships with
 * the backend in Chunk 5 — until then, addresses route to a monitored
 * inbox. No fake form.
 */
const routes = [
  { label: "Orders & shipping", email: "care@kavala.example.com", note: "Include your order number for the fastest reply." },
  { label: "Subscriptions", email: "care@kavala.example.com", note: "Pausing and skipping can also be done from your account." },
  { label: "Product reaction", email: "safety@kavala.example.com", note: "Tell us what happened, the batch number on the base of your bottle, and how to reach you. Every report is logged, reviewed, and acted on — and if a reaction is serious, please see a medical professional first." },
  { label: "Press & partnerships", email: "studio@kavala.example.com", note: "" },
];

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20 md:py-28">
      <p className="type-label mb-6">Contact</p>
      <h1 className="type-display text-4xl text-bone md:text-5xl">A person reads every message.</h1>
      <p className="mt-6 max-w-xl text-[16px] leading-relaxed text-bone-dim">
        We answer within one business day. Choose the address that fits so the right person sees it first.
      </p>
      <div className="mt-12 space-y-6">
        {routes.map((r) => (
          <section key={r.label} className="hairline bg-lacquer-soft p-8">
            <h2 className="type-display text-xl text-bone">{r.label}</h2>
            <a href={`mailto:${r.email}`} className="meniscus-underline mt-2 inline-block text-[14px] text-oil-bright">
              {r.email}
            </a>
            {r.note && <p className="mt-3 text-[14px] leading-relaxed text-bone-dim">{r.note}</p>}
          </section>
        ))}
      </div>
    </div>
  );
}
