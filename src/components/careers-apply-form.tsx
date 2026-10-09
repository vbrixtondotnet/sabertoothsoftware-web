"use client";

import { useId, useState } from "react";
import { CAREERS_APPLY_LIMITS } from "@shared/careers-apply-limits";
import type { JobListing } from "@/lib/careers";
import { COUNTRIES } from "@/lib/countries";

type FormState = "idle" | "submitting" | "success" | "error";

type CareersApplyFormProps = {
  job: JobListing;
  onBack: () => void;
};

export function CareersApplyForm({ job, onBack }: CareersApplyFormProps) {
  const formId = useId();
  const [state, setState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [resumeLabel, setResumeLabel] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state === "submitting") return;

    setErrorMessage(null);
    const form = e.currentTarget;
    const fd = new FormData(form);

    const firstName = String(fd.get("firstName") ?? "").trim();
    const lastName = String(fd.get("lastName") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();
    const country = String(fd.get("country") ?? "").trim();
    const coverLetter = String(fd.get("coverLetter") ?? "").trim();
    const resume = fd.get("resume");

    if (!firstName || !lastName || !email || !country || !coverLetter) {
      setState("error");
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    if (
      firstName.length > CAREERS_APPLY_LIMITS.firstName ||
      lastName.length > CAREERS_APPLY_LIMITS.lastName ||
      email.length > CAREERS_APPLY_LIMITS.email ||
      country.length > CAREERS_APPLY_LIMITS.country ||
      coverLetter.length > CAREERS_APPLY_LIMITS.coverLetter
    ) {
      setState("error");
      setErrorMessage("One or more fields are too long. Please shorten your answers.");
      return;
    }

    if (!(resume instanceof File) || resume.size === 0) {
      setState("error");
      setErrorMessage("Please attach your resume as a PDF file.");
      return;
    }

    if (
      resume.size > CAREERS_APPLY_LIMITS.maxResumeBytes ||
      (resume.type !== "application/pdf" && !resume.name.toLowerCase().endsWith(".pdf"))
    ) {
      setState("error");
      setErrorMessage("Resume must be a PDF file no larger than 4 MB.");
      return;
    }

    setState("submitting");

    try {
      const res = await fetch("/api/careers/apply", {
        method: "POST",
        body: fd,
      });

      let data: { ok?: boolean; error?: string; message?: string };
      try {
        data = (await res.json()) as typeof data;
      } catch {
        setState("error");
        setErrorMessage(
          res.status === 404
            ? "Application API is unavailable. Run npm run dev (not dev:web) and ensure npm run build has been run once."
            : "Something went wrong. Please try again or email us directly.",
        );
        return;
      }

      if (!res.ok || !data.ok) {
        setState("error");
        setErrorMessage(
          data.error ?? "Something went wrong. Please try again or email us directly.",
        );
        return;
      }

      setState("success");
      form.reset();
      setResumeLabel(null);
    } catch {
      setState("error");
      setErrorMessage("Network error. Please check your connection and try again.");
    }
  }

  const isSubmitting = state === "submitting";
  const isSuccess = state === "success";

  return (
    <form
      className="space-y-4"
      onSubmit={handleSubmit}
      encType="multipart/form-data"
      noValidate
      aria-busy={isSubmitting}
    >
      <div className="sr-only" aria-hidden>
        <label htmlFor={`${formId}-website`}>Website</label>
        <input
          id={`${formId}-website`}
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <input type="hidden" name="jobSlug" value={job.slug} />

      <div>
        <label htmlFor={`${formId}-position`} className="text-sm font-medium">
          Position applied for
        </label>
        <input
          id={`${formId}-position`}
          name="position"
          type="text"
          readOnly
          value={job.title}
          className="input-dark mt-1.5 w-full rounded-lg px-3 py-2.5 text-sm opacity-90"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={`${formId}-firstName`} className="text-sm font-medium">
            First name
          </label>
          <input
            id={`${formId}-firstName`}
            name="firstName"
            type="text"
            required
            autoComplete="given-name"
            maxLength={CAREERS_APPLY_LIMITS.firstName}
            disabled={isSubmitting || isSuccess}
            className="input-dark mt-1.5 w-full rounded-lg px-3 py-2.5 text-sm disabled:opacity-60"
          />
        </div>
        <div>
          <label htmlFor={`${formId}-lastName`} className="text-sm font-medium">
            Last name
          </label>
          <input
            id={`${formId}-lastName`}
            name="lastName"
            type="text"
            required
            autoComplete="family-name"
            maxLength={CAREERS_APPLY_LIMITS.lastName}
            disabled={isSubmitting || isSuccess}
            className="input-dark mt-1.5 w-full rounded-lg px-3 py-2.5 text-sm disabled:opacity-60"
          />
        </div>
      </div>

      <div>
        <label htmlFor={`${formId}-email`} className="text-sm font-medium">
          Email address
        </label>
        <input
          id={`${formId}-email`}
          name="email"
          type="email"
          required
          autoComplete="email"
          maxLength={CAREERS_APPLY_LIMITS.email}
          disabled={isSubmitting || isSuccess}
          className="input-dark mt-1.5 w-full rounded-lg px-3 py-2.5 text-sm disabled:opacity-60"
        />
      </div>

      <div>
        <label htmlFor={`${formId}-country`} className="text-sm font-medium">
          Country
        </label>
        <select
          id={`${formId}-country`}
          name="country"
          required
          defaultValue=""
          disabled={isSubmitting || isSuccess}
          className="input-dark mt-1.5 w-full rounded-lg px-3 py-2.5 text-sm disabled:opacity-60"
        >
          <option value="" disabled>
            Select your country
          </option>
          {COUNTRIES.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor={`${formId}-coverLetter`} className="text-sm font-medium">
          Cover letter
        </label>
        <textarea
          id={`${formId}-coverLetter`}
          name="coverLetter"
          rows={6}
          required
          maxLength={CAREERS_APPLY_LIMITS.coverLetter}
          disabled={isSubmitting || isSuccess}
          className="input-dark mt-1.5 w-full resize-y rounded-lg px-3 py-2.5 text-sm disabled:opacity-60"
          placeholder="Tell us why you are interested in this role and what you would bring to the team…"
        />
      </div>

      <div>
        <span className="text-sm font-medium">Resume (PDF only)</span>
        <div className="mt-1.5 flex flex-wrap items-center gap-3">
          <label
            htmlFor={`${formId}-resume`}
            className="cursor-pointer rounded-lg border border-border bg-surface-muted px-4 py-2.5 text-sm font-semibold text-foreground transition hover:border-accent-bright/40 hover:bg-surface-elevated disabled:pointer-events-none disabled:opacity-60"
          >
            Attach resume
          </label>
          <input
            id={`${formId}-resume`}
            name="resume"
            type="file"
            accept="application/pdf,.pdf"
            required
            disabled={isSubmitting || isSuccess}
            className="sr-only"
            onChange={(e) => {
              const file = e.target.files?.[0];
              setResumeLabel(file?.name ?? null);
            }}
          />
          {resumeLabel && (
            <span className="max-w-[min(100%,16rem)] truncate text-sm text-muted">
              {resumeLabel}
            </span>
          )}
        </div>
      </div>

      {state === "success" && (
        <p
          className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-100"
          role="status"
        >
          Your application was submitted. Our team will review it and reach out if there
          is a fit.
        </p>
      )}
      {state === "error" && errorMessage && (
        <p
          className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-100"
          role="alert"
        >
          {errorMessage}
        </p>
      )}

      <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={isSubmitting || isSuccess}
          className="rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground shadow-[0_0_24px_rgba(37,99,235,0.45)] transition hover:bg-accent-bright disabled:cursor-not-allowed disabled:opacity-60 sm:min-w-[10rem]"
        >
          {isSubmitting ? "Submitting…" : isSuccess ? "Application sent" : "Submit application"}
        </button>
        <button
          type="button"
          onClick={onBack}
          disabled={isSubmitting}
          className="text-sm font-medium text-muted underline-offset-2 hover:text-foreground hover:underline disabled:opacity-60"
        >
          Back to job details
        </button>
      </div>
    </form>
  );
}
