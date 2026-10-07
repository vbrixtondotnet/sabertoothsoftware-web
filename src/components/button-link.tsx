import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "light" | "secondary" | "ghost";
  className?: string;
  external?: boolean;
};

const variants = {
  primary:
    "rounded-full bg-accent text-accent-foreground shadow-[0_0_24px_rgba(37,99,235,0.45)] hover:bg-accent-bright",
  light:
    "rounded-lg bg-foreground text-background hover:bg-slate-200 shadow-sm",
  secondary:
    "rounded-lg border border-border bg-surface-muted text-foreground hover:border-accent-bright/40 hover:bg-surface-elevated",
  ghost:
    "rounded-lg text-foreground/90 hover:text-foreground gap-1.5 px-3",
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className,
  external,
}: ButtonLinkProps) {
  const classes = cn(
    "inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold transition-all duration-200",
    variants[variant],
    className,
  );

  if (external || href.startsWith("mailto:")) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
