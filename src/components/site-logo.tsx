import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

const LOGO_ICON = "/logos/logo-only-v2.png";
const LOGO_ICON_WIDTH = 1254;
const LOGO_ICON_HEIGHT = 1254;
/** Matches previous header mark (`h-9` / 36px) so the bar stays `h-16` */
const DISPLAY_HEIGHT = 36;

type SiteLogoProps = {
  className?: string;
  priority?: boolean;
  /** Show “SABERTOOTH SOFTWARE LABS” beside the mark */
  showWordmark?: boolean;
};

export function SiteLogo({
  className,
  priority,
  showWordmark = true,
}: SiteLogoProps) {
  const displayWidth = Math.round(
    (DISPLAY_HEIGHT * LOGO_ICON_WIDTH) / LOGO_ICON_HEIGHT,
  );

  return (
    <Link
      href="/"
      className={cn("inline-flex max-w-full shrink-0 items-center gap-2.5", className)}
    >
      <Image
        src={LOGO_ICON}
        alt=""
        aria-hidden
        width={displayWidth}
        height={DISPLAY_HEIGHT}
        priority={priority}
        className="h-9 w-auto max-w-none shrink-0 object-contain object-left"
        style={{ width: "auto", height: DISPLAY_HEIGHT }}
      />
      {showWordmark && (
        <span className="hidden font-sans text-sm font-semibold tracking-tight text-foreground sm:inline">
          SABERTOOTH SOFTWARE LABS
        </span>
      )}
    </Link>
  );
}
