import type { Metadata } from "next";
import { ButtonLink } from "@/components/button-link";
import { ContentImage } from "@/components/content-image";
import { Container } from "@/components/container";
import { PageHero } from "@/components/page-hero";
import { PageVisualHero } from "@/components/page-visual-hero";
import { services } from "@/lib/content";
import { pageImages, serviceImages } from "@/lib/images";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Custom software development services for US clients—product engineering, APIs, cloud, modernization, and dedicated squads.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="End-to-end development, aligned to how US teams buy and ship"
        description="From first prototype to production hardening, we offer modular engagements that map to your procurement process, security reviews, and internal stakeholders."
      />
      <PageVisualHero
        src={pageImages.servicesHero}
        alt="Developer workspace with laptop showing application code in a modern office"
      />
      <section className="py-16 md:py-20">
        <Container>
          <div className="grid gap-8 md:grid-cols-2">
            {services.map((service) => (
              <article
                key={service.slug}
                id={service.slug}
                className="card-hover glass-panel overflow-hidden rounded-2xl"
              >
                <ContentImage
                  src={serviceImages[service.slug] ?? pageImages.servicesHero}
                  alt={`Illustrating ${service.title} — professional software development`}
                  className="rounded-none rounded-t-2xl border-0"
                />
                <div className="p-8">
                  <h2 className="text-xl font-semibold tracking-tight">{service.title}</h2>
                  <p className="mt-3 leading-relaxed text-muted">{service.summary}</p>
                  <p className="mt-6 text-xs font-semibold uppercase tracking-wider text-muted">
                    Typical deliverables
                  </p>
                  <ul className="mt-3 space-y-2 text-sm text-foreground">
                    {service.deliverables.map((d) => (
                      <li key={d} className="flex gap-2">
                        <span className="text-cyan">—</span>
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
          <div className="cta-glow-box mt-16 rounded-2xl p-8 md:flex md:items-center md:justify-between md:gap-8">
            <div>
              <h2 className="font-display text-2xl font-medium">Not sure where to start?</h2>
              <p className="mt-2 max-w-xl text-muted">
                We&apos;ll recommend a phased plan—discovery, build, or embedded squad—based
                on your runway and risk tolerance.
              </p>
            </div>
            <ButtonLink href="/contact" className="mt-6 shrink-0 md:mt-0">
              Request a consultation
            </ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
