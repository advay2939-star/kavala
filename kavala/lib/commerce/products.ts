import type { Product } from "@/lib/types";

/**
 * Product ladder. Prices are whole-dollar by design; the $228 Reserve
 * exists partly to anchor the $148 Set. All shortCopy strings are
 * checked against the claims registry by `npm run lint:claims`.
 */
export const products: Product[] = [
  {
    sku: "K-01",
    slug: "no-01-ritual-oil",
    name: "No. 01 Ritual Oil",
    descriptor: "Botanical oral ritual oil · 100 ml",
    priceUsd: 68,
    contents: ["Amber glass bottle, 100 ml", "Weighted cap with dosing pipette", "Linen-textured carton", "Ritual card"],
    shortCopy: "The classical Irimedadi formula in a faithful, beautiful edition. One quiet minute, morning or night.",
  },
  {
    sku: "K-RF",
    slug: "refill",
    name: "The Refill",
    descriptor: "Recyclable aluminium · 100 ml",
    priceUsd: 52,
    subscriptionPriceUsd: 46,
    contents: ["Aluminium refill bottle, 100 ml", "Paperboard sleeve"],
    shortCopy: "The same oil, in lighter clothing. Made to refill your glass bottle, not replace it.",
  },
  {
    sku: "K-DUO",
    slug: "the-duo",
    name: "The Duo",
    descriptor: "No. 01 + one Refill",
    priceUsd: 108,
    contents: ["No. 01 Ritual Oil", "One Refill"],
    shortCopy: "A season of the ritual. Begin with the glass, continue with the refill.",
  },
  {
    sku: "K-SET",
    slug: "the-ritual-set",
    name: "The Ritual Set",
    descriptor: "The complete ceremony",
    priceUsd: 148,
    badge: "Signature",
    contents: ["No. 01 Ritual Oil", "Copper tongue cleaner", "Ceramic dosing cup", "Linen ritual booklet", "Magnetic rigid box"],
    shortCopy: "Every object the ritual asks for, in a box worth keeping.",
  },
  {
    sku: "K-RSV",
    slug: "the-reserve-set",
    name: "The Reserve Set",
    descriptor: "Numbered edition",
    priceUsd: 228,
    badge: "Numbered edition",
    contents: ["The Ritual Set", "Two Refills", "Engraved brass tray", "Numbered edition card"],
    shortCopy: "A numbered run, produced in small batches. Real scarcity — we print the batch on the box.",
  },
];

export const bySku = (sku: string) => products.find((p) => p.sku === sku);
