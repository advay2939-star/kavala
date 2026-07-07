/**
 * Homepage copy — single source of truth. British English, restrained.
 * Every string here is scanned by scripts/claims-lint.ts on build.
 */
export const home = {
  hero: {
    eyebrow: "Botanical oral ritual oil",
    headline: "Ancient oral ritual. Modern restraint.",
    sub: "A botanical oral-care concentrate, made after a classical Ayurvedic formula. One quiet minute, morning or night.",
    ctaPrimary: { label: "Discover the Ritual", href: "/ritual" },
    ctaSecondary: { label: "Shop No. 01", href: "/shop/no-01-ritual-oil" },
  },
  minute: {
    eyebrow: "The minute",
    steps: [
      { title: "Dispense.", body: "A half-teaspoon, warmed on the tongue." },
      { title: "Massage.", body: "Worked gently along the gumline, or held and swished." },
      { title: "Rinse.", body: "Spit, rinse, and carry on with your usual brushing and flossing." },
    ],
  },
  formula: {
    eyebrow: "The formula",
    headline: "Twelve botanicals. One base of cold-pressed sesame.",
    body: "The formula is not ours — it belongs to the classical Ayurvedic pharmacopoeia, where it is known as Irimedadi taila. Ours is simply a faithful, beautiful edition of it.",
    ingredients: [
      { name: "Sesame", latin: "Sesamum indicum", role: "The traditional carrier — warm, silky, quietly nutty." },
      { name: "Irimeda", latin: "Vachellia farnesiana", role: "The formula's namesake bark — softly woody, felt more than tasted." },
      { name: "Clove", latin: "Syzygium aromaticum", role: "The unmistakable warmth. Contains natural eugenol." },
    ],
    link: { label: "Every ingredient, named and explained", href: "/ingredients" },
  },
  honesty: {
    eyebrow: "Honest evidence",
    headline: "What the research says — and what it doesn't.",
    says: "A handful of small clinical studies suggest oils like this one can support gum health when used alongside brushing and professional cleaning.",
    doesnt: "The studies are small and short. Oil rituals are not recognised by the American Dental Association as a hygiene practice, and Kavala is not a treatment for anything.",
    close: "We'd rather you knew all of that from us.",
    link: { label: "Read the evidence", href: "/evidence" },
  },
  objects: {
    eyebrow: "The objects",
    headline: "Made to be kept, refilled, and passed across a bathroom shelf for years.",
  },
  ritualNotReplacement:
    "Kavala sits alongside your brush, your floss and your dentist. Never in their place.",
  reviews: {
    eyebrow: "From our customers",
    emptyState:
      "Reviews open after our first customers have lived with the ritual. Every review here will come from a verified purchase — nothing seeded, nothing paid for.",
  },
  subscribe: {
    eyebrow: "The refill",
    headline: "The oil returns every eight weeks. The glass stays with you.",
    body: "Member pricing on every refill. Pause, skip or cancel in one click — no calls, no guilt.",
    cta: { label: "Start with the Duo", href: "/shop/the-duo" },
  },
} as const;
