"use client";

import Link from "next/link";
import { useCart } from "@/lib/store/cart";

const nav = [
  { label: "The Ritual", href: "/ritual" },
  { label: "Ingredients", href: "/ingredients" },
  { label: "Evidence", href: "/evidence" },
  { label: "Shop", href: "/shop" },
];

export function Header() {
  const { lines, setOpen } = useCart();
  const count = lines.reduce((n, l) => n + l.qty, 0);

  return (
    <header className="sticky top-0 z-40 border-b border-bone/10 bg-lacquer/90 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="type-display text-xl tracking-[0.32em] text-bone" aria-label="Kavala — home">
          KAVALA
        </Link>
        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="meniscus-underline text-[13px] tracking-[0.06em] text-bone-dim hover:text-bone">
              {item.label}
            </Link>
          ))}
        </nav>
        <button
          onClick={() => setOpen(true)}
          className="meniscus-underline text-[13px] tracking-[0.06em] text-bone"
          aria-label={`Open cart, ${count} item${count === 1 ? "" : "s"}`}
        >
          Cart{count > 0 ? ` (${count})` : ""}
        </button>
      </div>
    </header>
  );
}
