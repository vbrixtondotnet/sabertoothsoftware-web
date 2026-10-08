import { Container } from "@/components/container";

import { cn } from "@/lib/utils";

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  description: string;
  compact?: boolean;
};

export function PageHero({ eyebrow, title, description, compact }: PageHeroProps) {
  return (
    <section className="midnight-glow border-b border-border">
      <Container
        className={cn(
          "text-center",
          compact ? "py-8 md:py-10" : "py-16 md:py-20",
        )}
      >
        {eyebrow && (
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan">
            {eyebrow}
          </p>
        )}
        <h1
          className={cn(
            "font-display mx-auto mt-3 max-w-3xl font-medium tracking-tight text-foreground",
            compact ? "text-3xl md:text-4xl" : "text-4xl md:text-5xl",
          )}
        >
          {title}
        </h1>
        <p
          className={cn(
            "mx-auto max-w-2xl leading-relaxed text-muted",
            compact ? "mt-3 text-base md:text-lg" : "mt-5 text-lg",
          )}
        >
          {description}
        </p>
      </Container>
    </section>
  );
}
