import Image from "next/image";
import { cn } from "@/lib/utils";

type ContentImageProps = {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  aspect?: "video" | "wide" | "square";
};

const aspectClass = {
  video: "aspect-video",
  wide: "aspect-[21/9]",
  square: "aspect-square",
};

export function ContentImage({
  src,
  alt,
  className,
  priority,
  aspect = "video",
}: ContentImageProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl border border-border bg-surface-muted",
        aspectClass[aspect],
        className,
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/80 via-background/10 to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-violet/10 mix-blend-soft-light"
        aria-hidden
      />
    </div>
  );
}
