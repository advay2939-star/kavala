/** Core domain types — kept in one file until the schema grows. */

export type SkuCode = "K-01" | "K-RF" | "K-DUO" | "K-SET" | "K-RSV";

export interface Product {
  sku: SkuCode;
  slug: string;
  name: string;
  descriptor: string;
  /** Whole-dollar USD. Luxury code: no .99 endings. */
  priceUsd: number;
  subscriptionPriceUsd?: number;
  contents: string[];
  /** Consumer copy must come from the approved claims set only. */
  shortCopy: string;
  badge?: "Signature" | "Numbered edition";
}

export interface CartLine {
  sku: SkuCode;
  name: string;
  priceUsd: number;
  qty: number;
}

export interface EvidenceEntry {
  id: string;
  citation: string;
  sourceClass: "rct" | "clinical_comparative" | "review" | "tradition";
  population: string;
  duration: string;
  findings: string;
  /** Mandatory. Evidence UI refuses to render without it. */
  limitations: string;
  confidence: "promising_but_limited" | "mixed" | "insufficient";
}

export type ClaimStatus = "approved" | "restricted" | "prohibited";

export interface Claim {
  text: string;
  status: ClaimStatus;
  /** restricted claims must link at least one evidence entry */
  evidenceIds?: string[];
  note?: string;
}
