"use client";

import type { Product } from "@/lib/types";
import { useCart } from "@/lib/store/cart";
import { Button } from "@/components/ui/Button";

export function ProductCard({ product }: { product: Product }) {
  const add = useCart((s) => s.add);
  return (
    <article className="hairline group flex flex-col bg-lacquer-soft p-8 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5">
      {product.badge && <p className="type-label mb-4 text-oil-bright">{product.badge}</p>}
      <h3 className="type-display text-2xl text-bone">{product.name}</h3>
      <p className="mt-1 text-[13px] text-bone-dim">{product.descriptor}</p>
      <p className="mt-4 flex-1 text-[14px] leading-relaxed text-bone-dim">{product.shortCopy}</p>
      <ul className="mt-6 space-y-1.5">
        {product.contents.map((c) => (
          <li key={c} className="text-[13px] text-bone-dim/80">
            — {c}
          </li>
        ))}
      </ul>
      <div className="mt-8 flex items-center justify-between gap-4">
        <div>
          <p className="type-display text-xl text-bone">${product.priceUsd}</p>
          {product.subscriptionPriceUsd && (
            <p className="text-[12px] text-oil-bright">${product.subscriptionPriceUsd} member price</p>
          )}
        </div>
        <Button variant="outline" onClick={() => add(product.sku)} className="px-5 py-2.5">
          Add to cart
        </Button>
      </div>
    </article>
  );
}
