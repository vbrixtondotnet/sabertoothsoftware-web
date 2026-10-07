import { Container } from "@/components/container";
import { ContentImage } from "@/components/content-image";

type PageVisualHeroProps = {
  src: string;
  alt: string;
};

export function PageVisualHero({ src, alt }: PageVisualHeroProps) {
  return (
    <section className="border-b border-border pb-16 md:pb-20">
      <Container className="-mt-4 md:-mt-6">
        <ContentImage src={src} alt={alt} aspect="wide" priority className="rounded-2xl" />
      </Container>
    </section>
  );
}
