import type { Metadata } from "next";
import { ButtonLink } from "@/components/button-link";
import { CareersJobBoard } from "@/components/careers-job-board";
import { Container } from "@/components/container";
import { PageHero } from "@/components/page-hero";
import { jobListings } from "@/lib/careers";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Fifteen remote engineering roles at Sabertooth Software Labs—.NET, TypeScript, React, Angular, and Node.js for US construction and ERP software.",
};

export default function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow="Careers"
        title="Join us and be part of our exciting team"
        description="We hire remote engineers who overlap US hours, communicate clearly, and care about shipping dependable products. Explore open roles below and help us build software for US construction and ERP clients."
      />
      <section className="py-16 md:py-20">
        <Container>
          <CareersJobBoard jobs={jobListings} />

          <div className="cta-glow-box mt-16 rounded-2xl p-8 text-center md:p-10">
            <h2 className="font-display text-2xl font-medium text-foreground">
              Don&apos;t see your stack?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-muted">
              Send your résumé and the kind of work you want to do—we often hire
              ahead of formal postings for strong .NET and web engineers.
            </p>
            <ButtonLink
              href={`mailto:${site.email}?subject=${encodeURIComponent("General application — Sabertooth Software Labs")}`}
              className="mt-6"
              variant="secondary"
            >
              Email {site.email}
            </ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
