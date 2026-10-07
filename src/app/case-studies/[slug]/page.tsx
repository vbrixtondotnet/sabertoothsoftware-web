import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ButtonLink } from "@/components/button-link";
import { Container } from "@/components/container";
import { caseStudies } from "@/lib/content";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = caseStudies.find((cs) => cs.slug === slug);
  if (!study) return { title: "Case Study" };
  return {
    title: study.title,
    description: study.challenge,
  };
}

export default async function CaseStudyDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const study = caseStudies.find((cs) => cs.slug === slug);
  if (!study) notFound();

  return (
    <>
      <section className="midnight-glow border-b border-border">
        <Container className="py-16 md:py-20">
          <Link
            href="/case-studies"
            className="link-glow text-sm font-semibold"
          >
            ← All case studies
          </Link>
          <p className="mt-6 text-sm font-semibold uppercase tracking-wider text-muted">
            {study.industry} · {study.duration}
          </p>
          <h1 className="font-display mt-3 max-w-3xl text-4xl font-medium tracking-tight md:text-5xl">
            {study.title}
          </h1>
          <p className="mt-4 text-muted">{study.client}</p>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <div className="prose-block grid gap-12 lg:grid-cols-[1fr_280px]">
            <div className="space-y-10">
              <div>
                <h2>Challenge</h2>
                <p className="mt-3 leading-relaxed text-muted">{study.challenge}</p>
              </div>
              <div>
                <h2>Approach</h2>
                <p className="mt-3 leading-relaxed text-muted">{study.approach}</p>
              </div>
              <div>
                <h2>Results</h2>
                <ul className="mt-4 space-y-3">
                  {study.results.map((r) => (
                    <li
                      key={r}
                      className="glass-panel flex gap-3 rounded-xl px-4 py-3 text-sm"
                    >
                      <span className="font-bold text-cyan">✓</span>
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <aside className="glass-panel h-fit rounded-2xl p-6 lg:sticky lg:top-24">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                Technology
              </p>
              <ul className="mt-3 space-y-2 text-sm">
                {study.stack.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
              <ButtonLink href="/contact" className="mt-8 w-full">
                Discuss a similar project
              </ButtonLink>
            </aside>
          </div>
        </Container>
      </section>
    </>
  );
}
