import type { Claim, EvidenceEntry } from "@/lib/types";

/**
 * CLAIMS REGISTRY — the compliance moat.
 * Every consumer-facing marketing string must be composed from
 * approved territory. Restricted claims may only render inside the
 * Evidence & Tradition page, wrapped in <EvidenceCard> which forces a
 * limitations section. Prohibited patterns fail the build
 * (scripts/claims-lint.ts).
 */

export const APPROVED_TERRITORY: Claim[] = [
  { text: "freshens breath", status: "approved" },
  { text: "clean-mouth feel", status: "approved" },
  { text: "supports your daily oral-care routine", status: "approved" },
  { text: "traditionally used in Ayurvedic oral care", status: "approved" },
  { text: "part of an oral-care routine", status: "approved" },
];

/** Regex patterns that must never appear in consumer copy. */
export const PROHIBITED_PATTERNS: { pattern: RegExp; note: string }[] = [
  { pattern: /\bcures?\b|\bcuring\b/i, note: "disease claim → drug territory (FDA intended use)" },
  { pattern: /\btreats?\b|(?<!not a )\btreatment for\b/i, note: "disease claim (negations like \"not a treatment for\" are permitted)" },
  { pattern: /\bheals?\b|\brepairs?\b|\bregenerat/i, note: "disease/structure claim" },
  { pattern: /\bprevents? (disease|cavities|decay|gingivitis|gum disease)\b/i, note: "prevention claim" },
  { pattern: /\b(stops?|relieves?|kills?) (tooth ?)?pain\b/i, note: "analgesic claim" },
  { pattern: /\bwhiten(s|ing)?\b/i, note: "unsupported whitening claim (ADA: no reliable evidence)" },
  { pattern: /\banti-?(gingivitis|caries|inflammatory|bacterial|microbial|plaque)\b/i, note: "OTC drug monograph claim" },
  { pattern: /\bclinical[- ]grade\b|\bmedical[- ]grade\b/i, note: "quasi-medical status" },
  { pattern: /\bFDA[- ](approved|registered|certified|cleared)\b/i, note: "implied FDA endorsement" },
  { pattern: /\bdentist[- ](approved|recommended)\b/i, note: "unsubstantiated endorsement" },
  { pattern: /\b(replaces?|instead of|skip) (brushing|flossing|your dentist|dental visits?)\b/i, note: "replacement-of-care claim" },
  { pattern: /\bemergency relief\b/i, note: "acute-care claim" },
];

/** Line that must render on every route. Referenced by <Disclaimer>. */
export const GLOBAL_DISCLAIMER =
  "Kavala is a cosmetic oral-care product. It is not intended to diagnose, treat, cure or prevent any disease. It is not a substitute for brushing, flossing or professional dental care. If you have tooth pain or bleeding gums, see a dentist promptly.";

/**
 * Evidence entries — restricted territory. Rendered only by the
 * Evidence & Tradition page. `limitations` is required by type and
 * enforced again at render time.
 */
export const EVIDENCE: EvidenceEntry[] = [
  {
    id: "arimedadi-chx-rct",
    citation:
      "Randomized clinical trial, 45 patients, 21 days: Arimedadi oil mouthwash vs 0.2% chlorhexidine as adjuncts to mechanical oral hygiene (PMC5020187).",
    sourceClass: "rct",
    population: "45 adults with mild-to-moderate gingivitis",
    duration: "21 days",
    findings:
      "Plaque and gingival index improvements were similar between the Arimedadi and chlorhexidine groups from day 14 to day 21, used alongside normal brushing.",
    limitations:
      "Small sample, short duration, single study. Measured alongside mechanical hygiene — it says nothing about the oil used on its own, and nothing about cavities, pain or whitening.",
    confidence: "promising_but_limited",
  },
  {
    id: "irimedadi-scaling-adjunct",
    citation:
      "Clinical study, 100 patients: Irimedadi taila as an adjunct to scaling in plaque-induced gingivitis (PubMed 29031949).",
    sourceClass: "clinical_comparative",
    population: "100 adults with plaque-induced gingivitis",
    duration: "Study period following professional scaling",
    findings:
      "Gingival and bleeding indices improved more with Irimedadi taila plus scaling than with scaling alone; authors describe it as an adjunct to mechanical therapy.",
    limitations:
      "Adjunct means in addition to professional cleaning, not instead of it. One study, one population; results have not been replicated at scale.",
    confidence: "promising_but_limited",
  },
  {
    id: "recession-vs-surgery",
    citation:
      "Six-month clinical study: gum massage with Irimedadi taila vs semilunar coronally repositioned flap in Class-I gingival recession (PMC4198406).",
    sourceClass: "clinical_comparative",
    population: "Adults with Class-I gingival recession",
    duration: "6 months",
    findings:
      "Massage with the oil improved several clinical parameters, but the surgical option performed better overall.",
    limitations:
      "The headline of this study is that surgery won. It shows supportive value at best — and shows why conditions like recession belong with a dental professional.",
    confidence: "mixed",
  },
  {
    id: "oil-pulling-ada",
    citation:
      "Oil-pulling evidence reviews (e.g. PMC9602184) and the American Dental Association's consumer guidance on oil pulling.",
    sourceClass: "review",
    population: "Various small studies",
    duration: "Various",
    findings:
      "Some small studies report reduced bacterial counts or improved plaque scores. The ADA does not recommend oil pulling as a dental hygiene practice and states there are no reliable studies showing it reduces cavities, whitens teeth, or improves oral health and well-being.",
    limitations:
      "The evidence base is mixed and limited, and mainstream dentistry does not endorse the practice. We state this because you deserve to hear it from us.",
    confidence: "mixed",
  },
];
