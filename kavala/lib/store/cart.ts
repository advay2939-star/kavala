"use client";

import { create } from "zustand";
import type { CartLine, SkuCode } from "@/lib/types";
import { bySku } from "@/lib/commerce/products";

interface CartState {
  open: boolean;
  lines: CartLine[];
  add: (sku: SkuCode) => void;
  remove: (sku: SkuCode) => void;
  setQty: (sku: SkuCode, qty: number) => void;
  setOpen: (open: boolean) => void;
  subtotal: () => number;
}

/**
 * Client cart state. Persistence to a signed server-side cart (Medusa)
 * arrives in Chunk 3; until then this is clearly a client-only cart —
 * checkout is intentionally disabled rather than stubbed.
 */
export const useCart = create<CartState>((set, get) => ({
  open: false,
  lines: [],
  add: (sku) => {
    const product = bySku(sku);
    if (!product) return;
    set((s) => {
      const existing = s.lines.find((l) => l.sku === sku);
      const lines = existing
        ? s.lines.map((l) => (l.sku === sku ? { ...l, qty: l.qty + 1 } : l))
        : [...s.lines, { sku, name: product.name, priceUsd: product.priceUsd, qty: 1 }];
      return { lines, open: true };
    });
  },
  remove: (sku) => set((s) => ({ lines: s.lines.filter((l) => l.sku !== sku) })),
  setQty: (sku, qty) =>
    set((s) => ({
      lines:
        qty <= 0
          ? s.lines.filter((l) => l.sku !== sku)
          : s.lines.map((l) => (l.sku === sku ? { ...l, qty } : l)),
    })),
  setOpen: (open) => set({ open }),
  subtotal: () => get().lines.reduce((sum, l) => sum + l.priceUsd * l.qty, 0),
}));
