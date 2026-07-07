import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "solid" | "outline" | "quiet";

const styles: Record<Variant, string> = {
  solid:
    "bg-oil text-lacquer hover:bg-oil-bright active:bg-oil transition-colors duration-[80ms]",
  outline:
    "hairline text-bone hover:border-oil-bright hover:text-oil-bright transition-colors duration-[80ms]",
  quiet: "text-bone-dim hover:text-bone transition-colors duration-[80ms]",
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-[2px] px-7 py-3.5 text-[13px] tracking-[0.14em] uppercase font-medium disabled:opacity-40 disabled:cursor-not-allowed";

export function Button({
  href,
  onClick,
  children,
  variant = "solid",
  disabled,
  loading,
  className = "",
  type = "button",
}: {
  href?: string;
  onClick?: () => void;
  children: ReactNode;
  variant?: Variant;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  type?: "button" | "submit";
}) {
  const cls = `${base} ${styles[variant]} ${className}`;
  if (href) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }
  return (
    <button type={type} onClick={onClick} disabled={disabled || loading} className={cls} aria-busy={loading}>
      {loading ? <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" aria-label="Loading" /> : children}
    </button>
  );
}
