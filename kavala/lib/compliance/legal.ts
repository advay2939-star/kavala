/**
 * Legal page content. Lives in lib/compliance (exempt from the claims
 * linter) because disclaimers legitimately use words like "treat" in
 * their negated legal form. Consumer marketing copy may NOT live here.
 */
export interface LegalDoc {
  slug: string;
  title: string;
  effective: string;
  sections: { heading: string; body: string }[];
}

export const legalDocs: LegalDoc[] = [
  {
    slug: "medical-disclaimer",
    title: "Medical Disclaimer",
    effective: "2026-07-01",
    sections: [
      { heading: "What Kavala is", body: "Kavala No. 01 Ritual Oil is a cosmetic oral-care product: a botanical oil used to freshen breath and provide a clean-mouth feel as part of a daily oral-care routine. It is inspired by the classical Ayurvedic preparation known as Irimedadi (or Arimedadi) taila." },
      { heading: "What Kavala is not", body: "Kavala is not a drug or medical device. It is not intended to diagnose, treat, cure, mitigate or prevent any disease or condition, including toothache, gingivitis, gum disease, cavities, infection or inflammation. No statement on this site has been evaluated by the Food and Drug Administration." },
      { heading: "It does not replace care", body: "Kavala is not a substitute for brushing, flossing, professional cleaning, or examination by a dentist. If you have tooth pain, bleeding gums, swelling, sensitivity or any oral symptom, see a dentist promptly. Dental symptoms can signal conditions that need professional diagnosis, and delaying that visit can make them worse." },
      { heading: "About the research we cite", body: "Our Evidence & Tradition page summarises a small number of published studies. Those studies are limited in size and duration, examine the oil as an addition to normal oral hygiene, and do not establish the product as a therapy for any condition. We present them with their limitations because we believe you deserve the full picture." },
      { heading: "Allergens and sensitivities", body: "The formula is prepared on a sesame oil base and contains clove (natural eugenol) and other botanicals. Do not use it if you have a sesame or spice allergy. Patch-test before first use. Discontinue on irritation and contact us — and contact your doctor if a reaction is significant." },
    ],
  },
  {
    slug: "privacy",
    title: "Privacy Policy",
    effective: "2026-07-01",
    sections: [
      { heading: "What we collect", body: "Account details you give us (name, email, shipping address), order and payment metadata (payments are processed by Stripe; we never see your full card number), and site analytics collected through PostHog with IP masking enabled." },
      { heading: "How we use it", body: "To fulfil orders, manage subscriptions, answer support requests, and — only if you opt in — send our emails. We do not sell personal data, and we do not share it with third parties beyond the processors named here (Stripe, our fulfilment partner, Resend for email, PostHog for analytics)." },
      { heading: "Your choices", body: "You can request a copy or deletion of your data at any time from the contact page. Marketing emails carry a one-click unsubscribe. Analytics can be declined via the cookie notice." },
      { heading: "Retention", body: "Order records are kept as long as law and accounting require. Support and adverse-event records are retained so we can meet our product-safety obligations." },
    ],
  },
  {
    slug: "terms",
    title: "Terms of Service",
    effective: "2026-07-01",
    sections: [
      { heading: "The agreement", body: "By purchasing from Kavala you agree to these terms, our policies, and the medical disclaimer. Products are for personal use by adults and must be used as directed on the How to Use page." },
      { heading: "Orders and pricing", body: "All prices are in US dollars. We may decline or cancel orders where we suspect fraud or resale at scale. Subscription terms — cadence, member pricing, pausing and cancellation — are stated at the point of subscription and can be managed from your account without contacting support." },
      { heading: "Intellectual property", body: "The Kavala name, mark, packaging, photography and site content are our property. The underlying traditional formula belongs to the classical Ayurvedic pharmacopoeia and to no one." },
      { heading: "Liability", body: "To the extent permitted by law, our liability is limited to the price of the products purchased. Nothing in these terms limits liability that cannot lawfully be limited." },
    ],
  },
  {
    slug: "shipping",
    title: "Shipping Policy",
    effective: "2026-07-01",
    sections: [
      { heading: "Where and when", body: "We ship within the United States. Orders placed before 12:00 ET on a business day dispatch the same day; otherwise the next business day. Standard delivery takes 3–5 business days; expedited options are shown at checkout." },
      { heading: "Free shipping", body: "Orders of $100 or more ship free by the standard service." },
      { heading: "Tracking and problems", body: "Every order receives tracking by email. If a parcel arrives damaged, photograph the box and contents and contact us within 7 days — we will replace it." },
    ],
  },
  {
    slug: "returns",
    title: "Returns Policy",
    effective: "2026-07-01",
    sections: [
      { heading: "The 30-day promise", body: "Return anything within 30 days of delivery for a full refund. Unopened items are refunded in full on receipt." },
      { heading: "Opened bottles", body: "We accept one opened bottle per order for refund — we would rather you tried the ritual honestly than hesitated. Opened returns are destroyed, never restocked." },
      { heading: "How", body: "Start a return from the contact page with your order number. We provide a prepaid label for defective or incorrect items; standard returns are at your postage cost. Refunds land within 5–7 business days of our receiving the parcel." },
      { heading: "Subscriptions", body: "Cancelling a subscription stops future charges immediately. An already-dispatched refill can be returned under the same 30-day terms." },
    ],
  },
  {
    slug: "accessibility",
    title: "Accessibility Statement",
    effective: "2026-07-01",
    sections: [
      { heading: "Our standard", body: "Kavala aims to conform to WCAG 2.2 Level AA. The site is built keyboard-first, with visible focus states, semantic landmarks, sufficient colour contrast (body text on our dark surfaces measures above 10:1), and full support for reduced-motion preferences." },
      { heading: "Known limitations", body: "Some decorative animations and product imagery are ornamental and marked as such for assistive technology. If any content is not accessible to you, we consider that a defect." },
      { heading: "Tell us", body: "Report accessibility issues from the contact page or by email. We respond within two business days and prioritise fixes in the next release." },
    ],
  },
];

export const bySlug = (slug: string) => legalDocs.find((d) => d.slug === slug);
