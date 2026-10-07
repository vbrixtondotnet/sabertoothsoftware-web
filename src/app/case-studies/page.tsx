import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/container";
import { PageHero } from "@/components/page-hero";
import { caseStudies } from "@/lib/content";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "In-depth case studies on construction project management and mid-market ERP delivery for US clients.",
};

export default function CaseStudiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Case Studies"
        title="Problem, approach, and measurable results"
        description="Each engagement below reflects how we work with US stakeholders—documented scope, iterative delivery, and metrics your leadership can trust."
      />
      <section className="py-16 md:py-20">
        <Container>
          <div className="space-y-8">
            {caseStudies.map((cs, index) => (
              <article
                key={cs.slug}
                className="card-hover glass-panel grid gap-8 rounded-2xl p-8 lg:grid-cols-[1fr_auto]"
              >
                <div>
                  <p className="text-sm font-medium text-muted">
                    {String(index + 1).padStart(2, "0")} · {cs.industry} · {cs.duration}
                  </p>
                  <h2 className="font-display mt-2 text-2xl font-medium md:text-3xl">
                    {cs.title}
                  </h2>
                  <p className="mt-3 text-sm text-muted">{cs.client}</p>
                  <p className="mt-4 max-w-2xl text-muted leading-relaxed">{cs.challenge}</p>
                  <ul className="mt-5 space-y-2">
                    {cs.results.map((r) => (
                      <li key={r} className="flex gap-2 text-sm">
                        <span className="font-bold text-cyan">↑</span>
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-col justify-between lg:min-w-[200px] lg:text-right">
                  <div className="flex flex-wrap gap-2 lg:justify-end">
                    {cs.stack.map((t) => (
                      <span
                        key={t}
                        className="rounded-full bg-surface-muted px-2.5 py-0.5 text-xs font-medium text-muted"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={`/case-studies/${cs.slug}`}
                    className="link-glow mt-6 text-sm font-semibold lg:mt-0"
                  >
                    Read full case study →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
