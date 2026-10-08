import Image from "next/image";
import { Container } from "@/components/container";
import { ContentImage } from "@/components/content-image";
import { cn } from "@/lib/utils";

type PageVisualHeroProps = {
  src: string;
  alt: string;
  aspect?: "video" | "wide" | "square";
  fit?: "cover" | "contain";
  overlay?: boolean;
  size?: "default" | "compact";
};

export function PageVisualHero({
  src,
  alt,
  aspect = "wide",
  fit = "cover",
  overlay = true,
  size = "default",
}: PageVisualHeroProps) {
  const compact = size === "compact";

  return (
    <section
      className={cn(
        "border-b border-border",
        compact ? "pb-4 md:pb-6" : "pb-16 md:pb-20",
      )}
    >
      <Container className={cn(compact ? "pt-2" : "-mt-4 md:-mt-6")}>
        {compact ? (
          <div className="flex justify-center">
            <Image
              src={src}
              alt={alt}
              width={1024}
              height={1024}
              priority
              className="h-36 w-auto max-w-[min(100%,9rem)] object-contain sm:h-44 sm:max-w-[11rem] md:h-52 md:max-w-[13rem] lg:h-56 lg:max-w-[14rem] rounded-xl border border-border bg-surface-muted"
            />
          </div>
        ) : (
          <ContentImage
            src={src}
            alt={alt}
            aspect={aspect}
            fit={fit}
            overlay={overlay}
            priority
            className="rounded-2xl"
          />
        )}
      </Container>
    </section>
  );
}
