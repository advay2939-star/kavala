import Link from "next/link";
import { Disclaimer } from "@/components/ui/Disclaimer";
import { Meniscus } from "@/components/ui/Meniscus";

const legal = [
  { label: "Privacy", href: "/legal/privacy" },
  { label: "Terms", href: "/legal/terms" },
  { label: "Shipping", href: "/legal/shipping" },
  { label: "Returns", href: "/legal/returns" },
  { label: "Medical Disclaimer", href: "/legal/medical-disclaimer" },
  { label: "Accessibility", href: "/legal/accessibility" },
];

export function Footer() {
  return (
    <footer className="border-t border-bone/10">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <Meniscus className="mb-12 opacity-50" />
        <div className="flex flex-col gap-10 md:flex-row md:justify-between">
          <div>
            <p className="type-display text-2xl tracking-[0.32em] text-bone">KAVALA</p>
            <p className="mt-3 max-w-xs text-[13px] leading-relaxed text-bone-dim">
              Botanical oral ritual oil, made after the classical Irimedadi formula.
            </p>
          </div>
          <nav aria-label="Legal" className="grid grid-cols-2 gap-x-12 gap-y-3 md:grid-cols-3">
            {legal.map((item) => (
              <Link key={item.href} href={item.href} className="meniscus-underline text-[13px] text-bone-dim hover:text-bone">
                {item.label}
              </Link>
            ))}
            <Link href="/contact" className="meniscus-underline text-[13px] text-bone-dim hover:text-bone">
              Contact
            </Link>
          </nav>
        </div>
        <Disclaimer className="mt-12 max-w-3xl" />
        <p className="mt-6 text-[12px] text-bone-dim/60">© {new Date().getFullYear()} Kavala. All rights reserved.</p>
      </div>
    </footer>
  );
}
