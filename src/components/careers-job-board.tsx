"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { JobListing } from "@/lib/careers";
import { cn } from "@/lib/utils";

function jobSearchText(job: JobListing): string {
  return [
    job.title,
    ...job.stack,
    ...job.description,
    ...job.responsibilities,
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
  "mt-3 flex w-full items-center justify-center rounded-lg border border-border bg-surface-muted py-2 text-xs font-semibold text-foreground transition-all hover:border-accent-bright/40 hover:bg-surface-elevated focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

const pagerBtnClass =
  "inline-flex h-9 min-w-9 items-center justify-center rounded-lg border border-border bg-surface-muted text-sm font-semibold text-foreground transition hover:border-accent-bright/40 hover:bg-surface-elevated focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-40";

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
  const [page, setPage] = useState(1);
  const columns = useGridColumns();

  const filtered = useMemo(
    () => jobs.filter((job) => matchesQuery(job, query)),
    [jobs, query],
  );

  const totalPages =
    filtered.length === 0 ? 0 : Math.ceil(filtered.length / columns);

  useEffect(() => {
    if (totalPages === 0) return;
    setPage((current) => Math.min(current, totalPages));
  }, [totalPages]);

  const safePage = totalPages === 0 ? 1 : Math.min(page, totalPages);
  const pageStart = (safePage - 1) * columns;
  const visibleJobs = filtered.slice(pageStart, pageStart + columns);

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
            setPage(1);
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
              <Link
                href={`/careers/${job.slug}`}
                className="hover:text-accent-bright focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                {job.title}
              </Link>
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
            <Link href={`/careers/${job.slug}`} className={tileButtonClass}>
              View Details
            </Link>
          </article>
        ))}
      </div>

      {totalPages > 1 && (
        <nav
          className="mt-8 flex flex-wrap items-center justify-center gap-2"
          aria-label="Job listings pages"
        >
          <button
            type="button"
            className={cn(pagerBtnClass, "px-3")}
            aria-label="Previous page"
            disabled={safePage <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          >
            ←
          </button>

          <div className="flex flex-wrap items-center justify-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                type="button"
                className={cn(
                  pagerBtnClass,
                  "min-w-[2.25rem] px-2",
                  n === safePage &&
                    "border-accent-bright/50 bg-accent/20 text-accent-bright shadow-[0_0_16px_rgba(37,99,235,0.25)]",
                )}
                aria-label={`Page ${n}`}
                aria-current={n === safePage ? "page" : undefined}
                onClick={() => setPage(n)}
              >
                {n}
              </button>
            ))}
          </div>

          <button
            type="button"
            className={cn(pagerBtnClass, "px-3")}
            aria-label="Next page"
            disabled={safePage >= totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          >
            →
          </button>
        </nav>
      )}
    </>
  );
}
