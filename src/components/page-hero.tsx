import { Container } from "@/components/container";

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  description: string;
};

export function PageHero({ eyebrow, title, description }: PageHeroProps) {
  return (
    <section className="midnight-glow border-b border-border">
      <Container className="py-16 text-center md:py-20">
        {eyebrow && (
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan">
            {eyebrow}
          </p>
        )}
        <h1 className="font-display mx-auto mt-3 max-w-3xl text-4xl font-medium tracking-tight text-foreground md:text-5xl">
          {title}
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted">
          {description}
        </p>
      </Container>
    </section>
  );
}
