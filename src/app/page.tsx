import Link from "next/link";
import { ButtonLink } from "@/components/button-link";
import { ContentImage } from "@/components/content-image";
import { Container } from "@/components/container";
import { TrustBar } from "@/components/trust-bar";
import { caseStudies, projects, services } from "@/lib/content";
import { caseStudyImages, pageImages, projectImages } from "@/lib/images";
export default function HomePage() {
  const featuredProjects = projects.slice(0, 3);
  const featuredCaseStudies = caseStudies.slice(0, 2);

  return (
    <>
      <section className="gradient-mesh midnight-glow border-b border-border">
        <Container className="py-16 text-center md:py-24 lg:py-28">
          <div className="mx-auto flex max-w-3xl flex-col items-center">
            <Link
              href="/case-studies/contractorsbook-platform"
              className="inline-flex flex-wrap items-center justify-center gap-2 rounded-full border border-border bg-surface-muted/90 px-2 py-1.5 text-sm text-muted backdrop-blur-sm transition hover:border-accent-bright/30"
            >
              <span className="badge-new rounded-md px-2 py-0.5 text-xs font-bold text-white">
                Proven
              </span>
              <span>
                From the team behind{" "}
                <span className="font-semibold text-foreground">ContractorsBook</span>
                —construction &amp; ERP expertise
              </span>
              <span className="text-cyan" aria-hidden>
                →
              </span>
            </Link>

            <h1 className="mt-8 text-4xl font-bold leading-[1.1] tracking-tight text-foreground md:text-5xl lg:text-[3.25rem]">
              Automate Your Business With{" "}
              <span className="font-display-italic block sm:inline">
                Software Built Around You
              </span>
            </h1>

            <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted md:text-lg">
              Every business has unique processes, challenges, and opportunities.
              Sabertooth Software Labs builds custom software that fits the way
              your business actually works—helping you automate repetitive
              processes, connect your systems, and work smarter. Our AI-assisted
              development approach helps us deliver production-ready solutions with
              greater speed and efficiency.
            </p>

            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <ButtonLink href="/contact" variant="light">
                Get started
              </ButtonLink>
              <ButtonLink href="/case-studies" variant="ghost">
                View case studies →
              </ButtonLink>
            </div>

            <TrustBar />
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <div className="glass-panel card-hover overflow-hidden rounded-2xl p-6 md:p-8">
            <p className="text-xs font-semibold uppercase tracking-wider text-cyan">
              Core capabilities
            </p>
            <ul className="mt-6 grid gap-4 md:grid-cols-2">
              {services.slice(0, 4).map((s) => (
                <li
                  key={s.slug}
                  className="rounded-xl border border-border bg-surface-muted/60 px-4 py-4"
                >
                  <p className="font-semibold text-foreground">{s.title}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">
                    {s.summary}
                  </p>
                </li>
              ))}
            </ul>
            <Link href="/services" className="link-glow mt-6 inline-block text-sm font-semibold">
              Explore all services →
            </Link>
          </div>
        </Container>
      </section>

      <section className="border-y border-border bg-surface-muted/20 py-20">
        <Container>
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <h2 className="font-display text-3xl font-medium tracking-tight text-foreground md:text-4xl">
                Selected projects
              </h2>
              <p className="mt-3 max-w-xl text-muted">
                Construction operations, field-ready job costing, and mid-market
                ERP—built for teams that outgrow spreadsheets and disconnected tools.
              </p>
            </div>
            <ButtonLink href="/projects" variant="secondary">
              All projects
            </ButtonLink>
          </div>
          <ul className="mt-10 grid gap-5 md:grid-cols-3">
            {featuredProjects.map((p) => (
              <li
                key={p.slug}
                className="card-hover glass-panel flex flex-col overflow-hidden rounded-2xl"
              >
                <ContentImage
                  src={projectImages[p.slug] ?? pageImages.projectsHero}
                  alt={`${p.title} — ${p.industry}`}
                  className="rounded-none rounded-t-2xl border-0"
                />
                <div className="flex flex-1 flex-col p-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-violet">
                  {p.industry}
                </p>
                <h3 className="mt-2 text-lg font-semibold text-foreground">{p.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                  {p.summary}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.stack.slice(0, 3).map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-border bg-background/50 px-2.5 py-0.5 text-xs font-medium text-muted"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                {p.caseStudySlug && (
                  <Link
                    href={`/case-studies/${p.caseStudySlug}`}
                    className="link-glow mt-5 text-sm font-semibold"
                  >
                    Read case study →
                  </Link>
                )}
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <h2 className="font-display text-3xl font-medium tracking-tight text-foreground md:text-4xl">
            Case study highlights
          </h2>
          <p className="mt-3 max-w-2xl text-muted">
            Construction job costing, preconstruction workflows, and mid-market
            ERP—outcomes documented for owners, ops leaders, and finance teams.
          </p>
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {featuredCaseStudies.map((cs) => (
              <article
                key={cs.slug}
                className="card-hover glass-panel overflow-hidden rounded-2xl"
              >
                <ContentImage
                  src={caseStudyImages[cs.slug] ?? pageImages.homeErp}
                  alt={`${cs.title} — ${cs.industry} case study`}
                  aspect="video"
                  className="rounded-none rounded-t-2xl border-0"
                />
                <div className="p-8">
                  <p className="text-sm text-muted">
                    {cs.industry} · {cs.duration}
                  </p>
                  <h3 className="font-display mt-2 text-2xl font-medium text-foreground">
                    {cs.title}
                  </h3>
                  <ul className="mt-4 space-y-2 text-sm text-muted">
                    {cs.results.slice(0, 2).map((r) => (
                      <li key={r} className="flex gap-2">
                        <span className="text-cyan">✓</span>
                        {r}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/case-studies/${cs.slug}`}
                    className="link-glow mt-6 inline-block text-sm font-semibold"
                  >
                    Full story →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="pb-24 pt-4">
        <Container>
          <div className="cta-glow-box rounded-2xl px-8 py-12 text-center md:px-16">
            <h2 className="font-display text-3xl font-medium text-foreground md:text-4xl">
              Ready to scope your next build?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted">
              Tell us about your timeline, team, and success criteria. We respond
              within one US business day.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <ButtonLink href="/contact" variant="light">
                Get started
              </ButtonLink>
              <ButtonLink href="/contact" variant="primary">
                Contact us
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
