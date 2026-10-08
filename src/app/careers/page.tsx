import type { Metadata } from "next";
import { ButtonLink } from "@/components/button-link";
import { Container } from "@/components/container";
import { PageHero } from "@/components/page-hero";
import { jobListings } from "@/lib/careers";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Open roles at Sabertooth Software Labs—remote full-stack and backend developers working on US construction and ERP software.",
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
          <div className="space-y-10">
            {jobListings.map((job) => (
              <article
                key={job.slug}
                id={job.slug}
                className="glass-panel scroll-mt-24 rounded-2xl p-8 md:p-10"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <h2 className="text-xl font-semibold tracking-tight text-foreground md:text-2xl">
                    {job.title}
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {job.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-border bg-surface-muted px-2.5 py-0.5 text-xs font-medium text-muted"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-8">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-cyan">
                    Job description
                  </h3>
                  <div className="mt-4 space-y-3 text-sm leading-relaxed text-muted md:text-base">
                    {job.description.map((paragraph) => (
                      <p key={paragraph.slice(0, 48)}>{paragraph}</p>
                    ))}
                  </div>
                </div>

                <div className="mt-8 border-t border-border pt-8">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-cyan">
                    Qualifications
                  </h3>
                  <ul className="mt-4 space-y-2.5 text-sm text-foreground md:text-base">
                    {job.qualifications.map((item) => (
                      <li key={item} className="flex gap-2.5 leading-relaxed">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-bright" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8">
                  <ButtonLink
                    href={`mailto:${site.email}?subject=${encodeURIComponent(`Application: ${job.title}`)}`}
                    variant="primary"
                  >
                    Apply for this role
                  </ButtonLink>
                </div>
              </article>
            ))}
          </div>

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
