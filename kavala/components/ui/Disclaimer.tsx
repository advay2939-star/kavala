import { GLOBAL_DISCLAIMER } from "@/lib/compliance/claims";

/**
 * Rendered on every route via the footer, and above the buy box on
 * PDPs. Removing this component from the layout should fail review —
 * it is referenced in the QA checklist.
 */
export function Disclaimer({ className = "" }: { className?: string }) {
  return (
    <p className={`text-[12px] leading-relaxed text-bone-dim ${className}`}>
      {GLOBAL_DISCLAIMER}
    </p>
  );
}
