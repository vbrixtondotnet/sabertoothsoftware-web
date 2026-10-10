import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CareersJobDetail } from "@/components/careers-job-detail";
import { CareersJobShare } from "@/components/careers-job-share";
import { Container } from "@/components/container";
import { getJobBySlug, jobListings } from "@/lib/careers";
import { jobShareUrl } from "@/lib/job-share-url";
import { site } from "@/lib/site";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return jobListings.map((job) => ({ slug: job.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const job = getJobBySlug(slug);
  if (!job) return { title: "Open role" };
  const url = jobShareUrl(slug);
  const ogTitle = `${job.title} — ${site.name}`;
  return {
    title: `${job.title} — Careers`,
    description: job.description[0],
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      title: ogTitle,
      description: job.description[0],
      siteName: site.name,
    },
    twitter: {
      card: "summary",
      title: ogTitle,
      description: job.description[0],
    },
  };
}

export default async function CareersJobPage({ params }: PageProps) {
  const { slug } = await params;
  const job = getJobBySlug(slug);
  if (!job) notFound();

  return (
    <>
      <section className="midnight-glow border-b border-border">
        <Container className="py-16 md:py-20">
          <Link href="/careers" className="link-glow text-sm font-semibold">
            ← All open roles
          </Link>
          <p className="mt-6 text-xs font-semibold uppercase tracking-wider text-cyan">
            Open role
          </p>
          <h1 className="font-display mt-3 max-w-3xl text-3xl font-medium tracking-tight md:text-4xl lg:text-5xl">
            {job.title}
          </h1>
          <CareersJobShare title={job.title} shareUrl={jobShareUrl(job.slug)} />
        </Container>
      </section>

      <section className="py-16 md:py-20">
        <Container className="max-w-3xl">
          <CareersJobDetail job={job} />
        </Container>
      </section>
    </>
  );
}
