import Link from "next/link";
import type { ReactNode } from "react";

/**
 * CHUNK 5 — Admin shell. Session auth arrives with Payload admin-users
 * (Chunk 4 collection): this layout must be wrapped by the auth
 * middleware before deployment — middleware.ts enforces that in
 * production builds by refusing /admin without a session cookie.
 */
const rail = [
  { label: "Overview", href: "/admin" },
  { label: "Orders", href: "/admin/orders" },
  { label: "Subscriptions", href: "/admin/subscriptions" },
  { label: "Reviews", href: "/admin/reviews" },
  { label: "Adverse events", href: "/admin/adverse-events" },
  { label: "Lots", href: "/admin/lots" },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto flex min-h-screen max-w-7xl">
      <aside className="w-56 shrink-0 border-r border-bone/10 px-6 py-10">
        <p className="type-display text-lg tracking-[0.32em] text-bone">KAVALA</p>
        <p className="type-label mt-1">Operations</p>
        <nav aria-label="Admin" className="mt-10 flex flex-col gap-4">
          {rail.map((item) => (
            <Link key={item.href} href={item.href} className="meniscus-underline w-fit text-[14px] text-bone-dim hover:text-bone">
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="flex-1 px-10 py-10">{children}</main>
    </div>
  );
}
