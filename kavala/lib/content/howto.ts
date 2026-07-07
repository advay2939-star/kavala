/** How to Use — the full ritual, plus who should not use it. */
export const howto = {
  intro: {
    headline: "One quiet minute.",
    body: "The ritual asks for very little: a half-teaspoon of oil, sixty seconds of attention, and your usual oral-care routine on either side of it.",
  },
  steps: [
    { n: "01", title: "Warm", body: "Dispense a half-teaspoon into the ceramic cup or directly onto a spoon. Let it sit on the tongue for a moment to warm." },
    { n: "02", title: "Massage", body: "With a clean fingertip, work the oil gently along the gumline — upper, then lower. Slow, small circles." },
    { n: "03", title: "Hold", body: "Alternatively, hold the oil in the mouth and swish gently. One minute is enough; there is no benefit in endurance." },
    { n: "04", title: "Release", body: "Spit into a tissue or bin, not the basin — oils and plumbing disagree. Rinse with warm water if you prefer." },
    { n: "05", title: "Continue", body: "Brush and floss as you always do. Kavala is a step in your routine, never a substitute for any part of it." },
    { n: "06", title: "Keep", body: "Store the bottle away from direct sunlight, cap tightened. Use within six months of opening. The lot number is printed on the base." },
  ],
  when: "Morning or night, whichever your routine can honestly keep. Most people fold it into the evening, before brushing.",
  whoShouldNot: [
    "Anyone with a sesame allergy or sensitivity to clove or other spices.",
    "Children — this is a product for adults.",
    "If you are pregnant or nursing, ask your doctor or dentist before adding anything to your routine.",
    "If you notice irritation, tingling that doesn't fade, or any reaction — stop, and tell us via the contact page.",
  ],
  mandatory:
    "Kavala is not a substitute for professional dental diagnosis or treatment. Tooth pain, bleeding gums, swelling or sensitivity need a dentist, promptly — not more oil.",
} as const;
