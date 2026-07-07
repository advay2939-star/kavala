/**
 * Ingredient monographs — sensory and traditional language only.
 * No functional health claims; the claims linter scans this file.
 */
export interface Monograph {
  name: string;
  sanskrit: string;
  latin: string;
  role: string;      // traditional role in the classical formula
  sensory: string;   // what it contributes to the experience
}

export const monographs: Monograph[] = [
  { name: "Sesame", sanskrit: "Tila taila", latin: "Sesamum indicum", role: "The classical carrier oil of Ayurvedic oral rituals — the base into which every other botanical is prepared.", sensory: "Warm, silky, quietly nutty. The texture that defines the ritual." },
  { name: "Irimeda", sanskrit: "Irimeda / Arimeda", latin: "Vachellia farnesiana", role: "The formula's namesake bark, from which Irimedadi taila takes its name in the classical texts.", sensory: "Softly woody and green, felt more than tasted." },
  { name: "Khadira", sanskrit: "Khadira", latin: "Acacia catechu", role: "A heartwood long paired with oral preparations in the tradition.", sensory: "Faintly astringent on the palate — the 'clean sweep' note." },
  { name: "Manjishtha", sanskrit: "Manjishtha", latin: "Rubia cordifolia", role: "A classical root that lends the oil its deep amber-red cast.", sensory: "Earthy and mineral; the colour of the oil itself." },
  { name: "Clove", sanskrit: "Lavanga", latin: "Syzygium aromaticum", role: "The most recognisable note in the formula, used across centuries of oral traditions. Contains natural eugenol.", sensory: "Unmistakable warmth that blooms and settles." },
  { name: "Cardamom", sanskrit: "Ela", latin: "Elettaria cardamomum", role: "A classical aromatic companion to clove in the formula.", sensory: "Bright, resinous lift at the top of the profile." },
  { name: "Liquorice", sanskrit: "Yashtimadhu", latin: "Glycyrrhiza glabra", role: "A traditional root included across many classical taila preparations.", sensory: "A soft, rounded sweetness that closes the finish." },
  { name: "Sandalwood", sanskrit: "Chandana", latin: "Santalum album", role: "The quiet luxury of the classical pharmacopoeia.", sensory: "A calm, creamy woodiness beneath everything else." },
  { name: "Nutmeg", sanskrit: "Jatiphala", latin: "Myristica fragrans", role: "A warming spice noted in classical renderings of the formula.", sensory: "Dry warmth in the mid-profile." },
  { name: "Agarwood", sanskrit: "Agaru", latin: "Aquilaria agallocha", role: "The rarest note in the formula, shared with the incense tradition.", sensory: "A trace of smoke and resin, barely there." },
];

export const allergenNotice =
  "Kavala is prepared on a base of sesame oil and contains clove (natural eugenol). If you have a sesame or spice sensitivity, do not use it. Patch-test on the inner arm before first use, and discontinue if you notice irritation. This is a cosmetic product for adults.";
