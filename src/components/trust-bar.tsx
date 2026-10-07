import { cn } from "@/lib/utils";

const items = [
  {
    label: "4–6 week delivery",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M13 2L4.5 13.5H11L10 22L19.5 10.5H13L13 2Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: "Transparent scoping",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M8 4h8l4 4v12a1 1 0 01-1 1H5a1 1 0 01-1-1V5a1 1 0 011-1h3z"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path d="M16 4v4h4M8 13h8M8 17h5" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    label: "US-aligned collaboration",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M12 3l2.4 4.9 5.4.8-3.9 3.8.9 5.3L12 15.8 7.2 17.8l.9-5.3L4.2 8.7l5.4-.8L12 3z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
] as const;

type TrustBarProps = {
  className?: string;
};

export function TrustBar({ className }: TrustBarProps) {
  return (
    <ul
      className={cn(
        "mt-14 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-4",
        className,
      )}
    >
      {items.map(({ label, icon }) => (
        <li
          key={label}
          className="flex items-center gap-3 rounded-xl border border-border bg-surface-muted/80 px-4 py-3 text-sm text-muted backdrop-blur-sm sm:rounded-full sm:py-2.5"
        >
          <span className="text-cyan">{icon}</span>
          <span className="font-medium text-foreground/90">{label}</span>
        </li>
      ))}
    </ul>
  );
}
