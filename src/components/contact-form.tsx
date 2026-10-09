"use client";

import Script from "next/script";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { CONTACT_LIMITS } from "@shared/contact-limits";

type FormState = "idle" | "submitting" | "success" | "error";

const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim();

type TurnstileApi = {
  render: (
    el: HTMLElement,
    opts: {
      sitekey: string;
      callback: (token: string) => void;
      "expired-callback": () => void;
      "error-callback": () => void;
    },
  ) => string;
  reset: (id: string) => void;
};

export function ContactForm() {
  const formId = useId();
  const [state, setState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [turnstileReady, setTurnstileReady] = useState(false);
  const turnstileWidgetId = useRef<string | null>(null);
  const turnstileContainerRef = useRef<HTMLDivElement>(null);

  const loadTurnstile = useCallback(() => {
    if (!turnstileSiteKey || turnstileWidgetId.current) return;
    const api = (window as Window & { turnstile?: TurnstileApi }).turnstile;
    if (!api || !turnstileContainerRef.current) return;
    turnstileWidgetId.current = api.render(turnstileContainerRef.current, {
      sitekey: turnstileSiteKey,
      callback: (token) => setTurnstileToken(token),
      "expired-callback": () => setTurnstileToken(null),
      "error-callback": () => setTurnstileToken(null),
    });
  }, []);

  useEffect(() => {
    if (turnstileReady) loadTurnstile();
  }, [turnstileReady, loadTurnstile]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state === "submitting") return;

    setErrorMessage(null);
    const form = e.currentTarget;
    const fd = new FormData(form);

    const name = String(fd.get("name") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();
    const company = String(fd.get("company") ?? "").trim();
    const body = String(fd.get("body") ?? "").trim();
    const website = String(fd.get("website") ?? "").trim();

    if (!name || !email || !body) {
      setState("error");
      setErrorMessage("Please fill in all required fields.");
      return;
    }
    if (
      name.length > CONTACT_LIMITS.name ||
      email.length > CONTACT_LIMITS.email ||
      company.length > CONTACT_LIMITS.company ||
      body.length > CONTACT_LIMITS.body
    ) {
      setState("error");
      setErrorMessage("One or more fields are too long. Please shorten your message.");
      return;
    }

    if (turnstileSiteKey && !turnstileToken) {
      setState("error");
      setErrorMessage("Please complete the verification check.");
      return;
    }

    setState("submitting");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          company,
          body,
          website,
          turnstileToken: turnstileToken ?? undefined,
        }),
      });

      let data: { ok?: boolean; error?: string; message?: string };
      try {
        data = (await res.json()) as typeof data;
      } catch {
        setState("error");
        setErrorMessage(
          res.status === 404
            ? "Contact API is unavailable. Run npm run dev (not dev:web) and ensure npm run build has been run once."
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
      setTurnstileToken(null);
      const api = (window as Window & { turnstile?: TurnstileApi }).turnstile;
      if (api && turnstileWidgetId.current) {
        api.reset(turnstileWidgetId.current);
      }
    } catch {
      setState("error");
      setErrorMessage("Network error. Please check your connection and try again.");
    }
  }

  const isSubmitting = state === "submitting";
  const isSuccess = state === "success";

  return (
    <>
      {turnstileSiteKey && (
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js"
          strategy="lazyOnload"
          onLoad={() => setTurnstileReady(true)}
        />
      )}

      <form
        className="mt-8 space-y-5"
        onSubmit={handleSubmit}
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

        <div>
          <label htmlFor={`${formId}-name`} className="text-sm font-medium">
            Name
          </label>
          <input
            id={`${formId}-name`}
            name="name"
            type="text"
            required
            maxLength={CONTACT_LIMITS.name}
            disabled={isSubmitting || isSuccess}
            className="input-dark mt-1.5 w-full rounded-lg px-3 py-2.5 text-sm disabled:opacity-60"
            placeholder="Jane Smith"
          />
        </div>
        <div>
          <label htmlFor={`${formId}-email`} className="text-sm font-medium">
            Work email
          </label>
          <input
            id={`${formId}-email`}
            name="email"
            type="email"
            required
            maxLength={CONTACT_LIMITS.email}
            disabled={isSubmitting || isSuccess}
            className="input-dark mt-1.5 w-full rounded-lg px-3 py-2.5 text-sm disabled:opacity-60"
            placeholder="jane@company.com"
          />
        </div>
        <div>
          <label htmlFor={`${formId}-company`} className="text-sm font-medium">
            Company
          </label>
          <input
            id={`${formId}-company`}
            name="company"
            type="text"
            maxLength={CONTACT_LIMITS.company}
            disabled={isSubmitting || isSuccess}
            className="input-dark mt-1.5 w-full rounded-lg px-3 py-2.5 text-sm disabled:opacity-60"
            placeholder="Acme Inc."
          />
        </div>
        <div>
          <label htmlFor={`${formId}-body`} className="text-sm font-medium">
            Message
          </label>
          <textarea
            id={`${formId}-body`}
            name="body"
            rows={5}
            required
            maxLength={CONTACT_LIMITS.body}
            disabled={isSubmitting || isSuccess}
            className="input-dark mt-1.5 w-full resize-y rounded-lg px-3 py-2.5 text-sm disabled:opacity-60"
            placeholder="Goals, timeline, and any technical context..."
          />
        </div>

        {turnstileSiteKey && (
          <div ref={turnstileContainerRef} className="min-h-[65px]" />
        )}

        {state === "success" && (
          <p
            className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-100"
            role="status"
          >
            Your message was accepted for delivery. We typically reply within one US
            business day.
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

        <button
          type="submit"
          disabled={isSubmitting || isSuccess}
          className="w-full rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground shadow-[0_0_24px_rgba(37,99,235,0.45)] transition hover:bg-accent-bright disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Sending…" : isSuccess ? "Message sent" : "Send"}
        </button>

        {isSuccess && (
          <button
            type="button"
            className="w-full text-sm text-muted underline-offset-2 hover:text-foreground hover:underline"
            onClick={() => {
              setState("idle");
              setErrorMessage(null);
            }}
          >
            Send another message
          </button>
        )}
      </form>
    </>
  );
}
