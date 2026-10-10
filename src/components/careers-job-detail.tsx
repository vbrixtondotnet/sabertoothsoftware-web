"use client";

import { useState } from "react";
import { CareersApplyForm } from "@/components/careers-apply-form";
import type { JobListing } from "@/lib/careers";

type CareersJobDetailProps = {
  job: JobListing;
};

export function CareersJobDetail({ job }: CareersJobDetailProps) {
  const [showApply, setShowApply] = useState(false);

  return (
    <div className="glass-panel rounded-2xl p-6 md:p-8">
      {!showApply && (
        <div className="flex flex-wrap gap-2">
          {job.stack.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-border bg-surface-muted px-2.5 py-0.5 text-xs font-medium text-muted"
            >
              {tech}
            </span>
          ))}
        </div>
      )}

      <div className="mt-8">
        {showApply ? (
          <CareersApplyForm job={job} onBack={() => setShowApply(false)} />
        ) : (
          <>
            <section>
              <h2 className="text-sm font-semibold uppercase tracking-wider text-cyan">
                Job description
              </h2>
              <div className="mt-4 space-y-3 text-sm leading-relaxed text-muted md:text-base">
                {job.description.map((paragraph) => (
                  <p key={paragraph.slice(0, 48)}>{paragraph}</p>
                ))}
              </div>
            </section>

            <section className="mt-10 border-t border-border pt-10">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-cyan">
                Roles and responsibilities
              </h2>
              <ul className="mt-4 space-y-2.5 text-sm text-foreground md:text-base">
                {job.responsibilities.map((item) => (
                  <li key={item} className="flex gap-2.5 leading-relaxed">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-bright" />
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <section className="mt-10 border-t border-border pt-10">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-cyan">
                Qualifications
              </h2>
              <ul className="mt-4 space-y-2.5 text-sm text-foreground md:text-base">
                {job.qualifications.map((item) => (
                  <li key={item} className="flex gap-2.5 leading-relaxed">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-bright" />
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <div className="mt-10 border-t border-border pt-8">
              <button
                type="button"
                onClick={() => setShowApply(true)}
                className="rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground shadow-[0_0_24px_rgba(37,99,235,0.45)] transition hover:bg-accent-bright"
              >
                Apply for this role
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
