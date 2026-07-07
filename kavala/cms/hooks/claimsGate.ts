import { PROHIBITED_PATTERNS } from "../../lib/compliance/claims";

/**
 * CHUNK 4 — The claims publish gate.
 * Payload beforeChange hook: recursively scans every string field of a
 * document about to be published against the prohibited-pattern
 * registry. Drafts may contain anything (writers need room to work);
 * PUBLISHING a violation is impossible for any role. There is no
 * override — if a restricted claim is genuinely needed, it belongs in
 * the Evidence collection with a limitations field, not in marketing
 * copy. This protects the brand from its own future marketers.
 */

const SANCTIONED_NEGATIONS: RegExp[] = [
  /not intended to diagnose,? treat,? cure(,| or)? (mitigate or )?prevent[^.]*\./gi,
  /not a treatment for[^.]*\./gi,
];

function collectStrings(value: unknown, out: string[]): void {
  if (typeof value === "string") out.push(value);
  else if (Array.isArray(value)) value.forEach((v) => collectStrings(v, out));
  else if (value && typeof value === "object")
    Object.values(value).forEach((v) => collectStrings(v, out));
}

export function assertNoProhibitedClaims(data: Record<string, unknown>, docLabel: string): void {
  const strings: string[] = [];
  collectStrings(data, strings);
  const violations: string[] = [];

  for (const raw of strings) {
    let text = raw;
    for (const rx of SANCTIONED_NEGATIONS) text = text.replace(rx, "");
    for (const { pattern, note } of PROHIBITED_PATTERNS) {
      const match = text.match(pattern);
      if (match) violations.push(`"${match[0]}" — ${note}`);
    }
  }

  if (violations.length > 0) {
    throw new Error(
      `Cannot publish ${docLabel}: prohibited claim language found.\n` +
        violations.map((v) => `  ✖ ${v}`).join("\n") +
        `\nRewrite using approved territory (see the Claims collection), or move qualified wording to the Evidence library.`,
    );
  }
}

/** Payload collection hook factory. */
export const claimsGate =
  (label: string) =>
  ({ data, operation }: { data: Record<string, unknown>; operation: string }) => {
    const publishing = data?._status === "published" || operation === "create";
    if (publishing && data?._status !== "draft") assertNoProhibitedClaims(data, label);
    return data;
  };
