/**
 * Build-time compliance gate.
 * Scans all consumer-facing content and component files for prohibited
 * claim patterns from the claims registry. Fails the build on a hit.
 * Run: npm run lint:claims (wired into `npm run build`).
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { PROHIBITED_PATTERNS } from "../lib/compliance/claims.ts";

const SCAN_DIRS = ["lib/content", "components", "app"];
// The registry itself and the evidence module legitimately contain the words.
const EXEMPT = [/lib\/compliance\//, /scripts\//];

function* walk(dir: string): Generator<string> {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) yield* walk(full);
    else if (/\.(ts|tsx|md|mdx)$/.test(entry)) yield full;
  }
}

/**
 * Sanctioned negations: the standard legal disclaimer phrasing is
 * stripped before scanning, so "not intended to diagnose, treat, cure
 * or prevent any disease" never trips the disease-claim patterns.
 * Only exact negated boilerplate is stripped — never benefit copy.
 */
const SANCTIONED_NEGATIONS: RegExp[] = [
  /not intended to diagnose,? treat,? cure(,| or)? (mitigate or )?prevent[^.]*\./gi,
  /not a treatment for[^.]*\./gi,
];

let violations = 0;
for (const dir of SCAN_DIRS) {
  for (const file of walk(dir)) {
    const rel = relative(process.cwd(), file);
    if (EXEMPT.some((rx) => rx.test(rel))) continue;
    let text = readFileSync(file, "utf8");
    for (const rx of SANCTIONED_NEGATIONS) text = text.replace(rx, "");
    for (const { pattern, note } of PROHIBITED_PATTERNS) {
      const match = text.match(pattern);
      if (match) {
        violations++;
        console.error(`✖ ${rel} — prohibited claim "${match[0]}" (${note})`);
      }
    }
  }
}

if (violations > 0) {
  console.error(`\nClaims lint failed: ${violations} violation(s). Consumer copy may not ship with prohibited claims.`);
  process.exit(1);
}
console.log("✓ Claims lint passed — no prohibited claims in consumer copy.");
