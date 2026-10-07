import type { Metadata } from "next";
import { ButtonLink } from "@/components/button-link";
import { Container } from "@/components/container";
import { PageHero } from "@/components/page-hero";
import { PageVisualHero } from "@/components/page-visual-hero";
import { pageImages } from "@/lib/images";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Sabertooth Software Labs—a custom software agency focused on US clients and senior-led delivery.",
};

const values = [
  {
    title: "Clarity over noise",
    text: "Written estimates, weekly status, and demos your product and legal teams can follow without translation.",
  },
  {
    title: "Senior by default",
    text: "The engineers on your call are the engineers shipping your code—no bait-and-switch staffing model.",
  },
  {
    title: "Outcomes you own",
    text: "IP assignment, NDAs, and documentation designed for US procurement and long-term internal handoff.",
  },
];

const process = [
  "Discovery & success criteria",
  "Architecture & UX alignment",
  "Iterative build with staging",
  "Launch, docs & optional retainer",
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="A focused studio for serious software"
        description={`${site.name} helps US organizations turn complex requirements into reliable products—without the overhead of a large consultancy or the opacity of a low-cost offshore shop.`}
      />
      <PageVisualHero
        src={pageImages.aboutHero}
        alt="Five software developers in a modern office with laptops and monitors in the background"
      />
      <section className="py-16 md:py-20">
        <Container className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="font-display text-2xl font-medium">Who we are</h2>
            <p className="mt-4 rounded-xl border border-accent-bright/25 bg-accent/10 px-4 py-3 text-sm font-semibold leading-relaxed text-foreground">
              We mainly focus on{" "}
              <span className="text-cyan">construction management software</span> and{" "}
              <span className="text-cyan">ERP systems</span>—job costing, field ops,
              preconstruction, and integrated finance, inventory, and operations for
              mid-sized US businesses.
            </p>
            <p className="mt-4 leading-relaxed text-muted">
              We are a remote-first engineering studio that builds those products with
              modern web front ends, robust backends (including .NET and SQL Server for
              many ERP and construction platforms), and cloud infrastructure. Our clients
              are US contractors, builders, distributors, and mid-market operators who
              need a partner who can sit in sprint planning, explain tradeoffs to
              leadership, and still commit to sprint goals.
            </p>
            <p className="mt-4 leading-relaxed text-muted">
              We built this practice around the gaps we saw in traditional outsourcing:
              inconsistent talent, vague timelines, and codebases that couldn&apos;t survive
              the first internal hire. Sabertooth exists to be the team you recommend
              when the stakes are high.
            </p>
          </div>
          <div className="glass-panel rounded-2xl p-8">
            <h2 className="font-display text-2xl font-medium">How we engage</h2>
            <ol className="mt-6 space-y-4">
              {process.map((step, i) => (
                <li key={step} className="flex gap-4 text-sm">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/20 text-xs font-bold text-cyan">
                    {i + 1}
                  </span>
                  <span className="pt-1 font-medium">{step}</span>
                </li>
              ))}
            </ol>
            <p className="mt-8 text-sm leading-relaxed text-muted">
              Every engagement pairs a senior lead with engineers who have shipped in
              regulated and high-traffic environments—so you get both velocity and
              judgment.
            </p>
          </div>
        </Container>
      </section>

      <section className="border-y border-border bg-surface-muted/25 py-16 md:py-20">
        <Container>
          <h2 className="font-display text-3xl font-medium">Principles</h2>
          <p className="mt-3 max-w-2xl text-muted">
            How we show up for US clients—from the first scoping call to handoff.
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {values.map((v) => (
              <article key={v.title} className="glass-panel rounded-2xl p-6">
                <h3 className="font-semibold">{v.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{v.text}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container className="text-center">
          <h2 className="font-display text-3xl font-medium">Work with us</h2>
          <p className="mx-auto mt-4 max-w-lg text-muted">
            Explore our services and portfolio, or reach out directly to discuss your
            roadmap.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <ButtonLink href="/contact">Get in touch</ButtonLink>
            <ButtonLink href="/projects" variant="secondary">
              See projects
            </ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
