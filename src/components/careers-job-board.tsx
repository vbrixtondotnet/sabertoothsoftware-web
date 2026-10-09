"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { JobListing } from "@/lib/careers";

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
  "mt-3 flex w-full items-center justify-center rounded-lg border border-border bg-surface-muted py-2 text-xs font-semibold text-foreground transition-all hover:border-accent-bright/40 hover:bg-surface-elevated focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

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
    </>
  );
}
