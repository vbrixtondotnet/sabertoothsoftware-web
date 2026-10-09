"use client";

import { useEffect, useMemo, useState } from "react";
import { ButtonLink } from "@/components/button-link";
import type { JobListing } from "@/lib/careers";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

function jobSearchText(job: JobListing): string {
  return [
    job.title,
    ...job.stack,
    ...job.description,
    ...job.qualifications,
  ]
    .join(" ")
    .toLowerCase();
}

function matchesQuery(job: JobListing, query: string): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  const haystack = jobSearchText(job);
  return q.split(/\s+/).every((term) => haystack.includes(term));
}

const tileButtonClass =
  "mt-3 w-full rounded-lg border border-border bg-surface-muted py-2 text-xs font-semibold text-foreground transition-all hover:border-accent-bright/40 hover:bg-surface-elevated focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

const INITIAL_ROW_COUNT = 2;
const ROWS_PER_LOAD = 2;

function gridColumnsForWidth(width: number): number {
  if (width >= 1024) return 4;
  if (width >= 640) return 2;
  return 1;
}

function useGridColumns(): number {
  const [columns, setColumns] = useState(4);

  useEffect(() => {
    const update = () => setColumns(gridColumnsForWidth(window.innerWidth));
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return columns;
}

type CareersJobBoardProps = {
  jobs: JobListing[];
};

export function CareersJobBoard({ jobs }: CareersJobBoardProps) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<JobListing | null>(null);
  const [visibleRows, setVisibleRows] = useState(INITIAL_ROW_COUNT);
  const columns = useGridColumns();

  const filtered = useMemo(
    () => jobs.filter((job) => matchesQuery(job, query)),
    [jobs, query],
  );

  const visibleLimit = columns * visibleRows;
  const visibleJobs = filtered.slice(0, visibleLimit);
  const hasMore = visibleLimit < filtered.length;

  return (
    <>
      <div className="mb-8">
        <label htmlFor="careers-search" className="sr-only">
          Search open roles
        </label>
        <input
          id="careers-search"
          type="search"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setVisibleRows(INITIAL_ROW_COUNT);
          }}
          placeholder="Search by title, technology, or keywords…"
          className="input-dark w-full rounded-lg px-4 py-3 text-sm md:max-w-xl"
          autoComplete="off"
        />
        {query.trim() && (
          <p className="mt-2 text-sm text-muted">
            {filtered.length === 0
              ? "No roles match your search."
              : `${filtered.length} role${filtered.length === 1 ? "" : "s"} found`}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {visibleJobs.map((job) => (
          <article
            key={job.slug}
            className="glass-panel card-hover flex aspect-square flex-col rounded-xl p-4"
          >
            <h2 className="line-clamp-3 text-sm font-semibold leading-snug text-foreground">
              {job.title}
            </h2>
            <div className="mt-2 flex flex-wrap gap-1 overflow-hidden">
              {job.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-md border border-border bg-surface-muted px-1.5 py-0.5 text-[10px] font-medium leading-tight text-muted"
                >
                  {tech}
                </span>
              ))}
            </div>
            <p className="mt-2 line-clamp-4 flex-1 text-xs leading-relaxed text-muted">
              {job.description[0]}
            </p>
            <button
              type="button"
              onClick={() => setSelected(job)}
              className={tileButtonClass}
            >
              View Details
            </button>
          </article>
        ))}
      </div>

      {hasMore && (
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => setVisibleRows((rows) => rows + ROWS_PER_LOAD)}
            className="rounded-lg border border-border bg-surface-muted px-6 py-2.5 text-sm font-semibold text-foreground transition-all hover:border-accent-bright/40 hover:bg-surface-elevated focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            View More Jobs
          </button>
        </div>
      )}

      {selected && (
        <JobDetailModal job={selected} onClose={() => setSelected(null)} />
      )}
    </>
  );
}

function JobDetailModal({
  job,
  onClose,
}: {
  job: JobListing;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center p-0 sm:items-center sm:p-4"
      role="presentation"
      onClick={onClose}
    >
      <div
        className="absolute inset-0 bg-black/75 backdrop-blur-sm"
        aria-hidden
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="job-detail-title"
        className={cn(
          "glass-panel relative z-10 flex max-h-[min(90vh,720px)] w-full max-w-2xl flex-col overflow-hidden rounded-t-2xl sm:rounded-2xl",
          "shadow-[0_0_0_1px_rgba(59,130,246,0.12),0_24px_64px_rgba(0,0,0,0.55),0_0_48px_rgba(37,99,235,0.12)]",
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-border px-6 py-5">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-wider text-cyan">
              Open role
            </p>
            <h2
              id="job-detail-title"
              className="mt-1 font-display text-xl font-medium text-foreground md:text-2xl"
            >
              {job.title}
            </h2>
            <div className="mt-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-cyan">
                Typical technical skills
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
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
          </div>
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 rounded-lg border border-border bg-surface-muted px-3 py-1.5 text-sm font-medium text-muted transition hover:border-accent-bright/40 hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            aria-label="Close job details"
          >
            Close
          </button>
        </div>

        <div className="overflow-y-auto px-6 py-6">
          <section>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-cyan">
              Job description
            </h3>
            <div className="mt-4 space-y-3 text-sm leading-relaxed text-muted md:text-base">
              {job.description.map((paragraph) => (
                <p key={paragraph.slice(0, 48)}>{paragraph}</p>
              ))}
            </div>
          </section>

          <section className="mt-8 border-t border-border pt-8">
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
          </section>
        </div>

        <div className="border-t border-border px-6 py-4">
          <ButtonLink
            href={`mailto:${site.email}?subject=${encodeURIComponent(`Application: ${job.title}`)}`}
            variant="primary"
            className="w-full sm:w-auto"
          >
            Apply for this role
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}
