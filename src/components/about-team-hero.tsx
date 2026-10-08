import { Container } from "@/components/container";
import { pageImages } from "@/lib/images";

type AboutTeamHeroProps = {
  alt: string;
};

/**
 * Static <img> with inline dimensions so production (Cloudflare) matches localhost.
 * Next/Image width/height attrs were overriding Tailwind on the live site.
 */
export function AboutTeamHero({ alt }: AboutTeamHeroProps) {
  return (
    <section className="border-b border-border pb-4 md:pb-6">
      <Container className="pt-2">
        <div className="flex justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={pageImages.aboutHero}
            alt={alt}
            width={1024}
            height={1024}
            decoding="async"
            fetchPriority="high"
            className="about-team-photo rounded-xl border border-border bg-surface-muted"
          />
        </div>
      </Container>
    </section>
  );
}
