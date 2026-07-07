/** Signature divider — the oil meniscus. Purely decorative. */
export function Meniscus({ className = "" }: { className?: string }) {
  return <div aria-hidden="true" className={`meniscus w-full ${className}`} />;
}
