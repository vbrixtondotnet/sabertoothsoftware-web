import type { Metadata } from "next";
import Link from "next/link";
import { ContentImage } from "@/components/content-image";
import { Container } from "@/components/container";
import { PageHero } from "@/components/page-hero";
import { projects } from "@/lib/content";
import { pageImages, projectImages } from "@/lib/images";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Portfolio of custom software projects for US construction, distribution, and ERP modernization clients.",
};

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        eyebrow="Projects"
        title="Work we’re proud to put our name on"
        description="A sample of product builds, platforms, and internal tools. Client names are anonymized where required; outcomes are real."
      />
      <section className="py-16 md:py-20">
        <Container>
          <ul className="grid gap-8 md:grid-cols-2">
            {projects.map((project) => (
              <li
                key={project.slug}
                className="card-hover glass-panel flex flex-col overflow-hidden rounded-2xl"
              >
                <ContentImage
                  src={projectImages[project.slug] ?? pageImages.projectsHero}
                  alt={`${project.title} — ${project.industry} software project`}
                  className="rounded-none rounded-t-2xl border-0"
                />
                <div className="flex flex-1 flex-col p-8">
                  <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted">
                    <span className="text-violet">{project.industry}</span>
                    <span aria-hidden="true">·</span>
                    <span>{project.clientType}</span>
                  </div>
                  <h2 className="mt-3 text-xl font-semibold">{project.title}</h2>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                    {project.summary}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-border bg-surface-muted px-2.5 py-0.5 text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  {project.caseStudySlug ? (
                    <Link
                      href={`/case-studies/${project.caseStudySlug}`}
                      className="link-glow mt-6 text-sm font-semibold"
                    >
                      View case study →
                    </Link>
                  ) : (
                    <p className="mt-6 text-sm text-muted">Case study available on request</p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
