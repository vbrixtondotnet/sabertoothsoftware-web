import type { Metadata } from "next";
import { Container } from "@/components/container";
import { PageHero } from "@/components/page-hero";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Sabertooth Software Labs for custom software development inquiries.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let’s talk about your product"
        description="Share your timeline, budget range, and what success looks like. We’ll reply within one US business day with next steps—or an honest note if we’re not the right fit."
      />
      <section className="py-16 md:py-20">
        <Container className="grid gap-12 lg:grid-cols-2">
          <div className="glass-panel rounded-2xl p-8 md:p-10">
            <h2 className="text-lg font-semibold">Send a message</h2>
            <p className="mt-2 text-sm text-muted">
              This form is a layout placeholder—wire it to your email provider or CRM
              when you&apos;re ready to go live.
            </p>
            <form className="mt-8 space-y-5" action={`mailto:${site.email}`} method="get">
              <div>
                <label htmlFor="name" className="text-sm font-medium">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="input-dark mt-1.5 w-full rounded-lg px-3 py-2.5 text-sm"
                  placeholder="Jane Smith"
                />
              </div>
              <div>
                <label htmlFor="email" className="text-sm font-medium">
                  Work email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="input-dark mt-1.5 w-full rounded-lg px-3 py-2.5 text-sm"
                  placeholder="jane@company.com"
                />
              </div>
              <div>
                <label htmlFor="company" className="text-sm font-medium">
                  Company
                </label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  className="input-dark mt-1.5 w-full rounded-lg px-3 py-2.5 text-sm"
                  placeholder="Acme Inc."
                />
              </div>
              <div>
                <label htmlFor="body" className="text-sm font-medium">
                  Project overview
                </label>
                <textarea
                  id="body"
                  name="body"
                  rows={5}
                  required
                  className="input-dark mt-1.5 w-full resize-y rounded-lg px-3 py-2.5 text-sm"
                  placeholder="Goals, timeline, and any technical context..."
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground shadow-[0_0_24px_rgba(37,99,235,0.45)] transition hover:bg-accent-bright"
              >
                Open email draft
              </button>
            </form>
          </div>

          <div className="space-y-8">
            <div>
              <h2 className="font-display text-2xl font-medium">Direct contact</h2>
              <p className="mt-4 text-muted leading-relaxed">
                Prefer email? Reach us at{" "}
                <a
                  href={`mailto:${site.email}`}
                  className="link-glow font-semibold"
                >
                  {site.email}
                </a>
                . For RFPs and security questionnaires, mention &quot;enterprise&quot; in
                the subject line so we route you to the right lead.
              </p>
            </div>
            <div className="glass-panel rounded-2xl p-6">
              <h3 className="font-semibold">What to include</h3>
              <ul className="mt-4 space-y-2 text-sm text-muted">
                <li>— Target launch window and must-have scope</li>
                <li>— Existing stack or greenfield</li>
                <li>— Compliance needs (HIPAA, SOC 2, etc.) if any</li>
                <li>— Team structure on your side (PM, design, eng)</li>
              </ul>
            </div>
            <p className="text-sm text-muted">{site.location}</p>
          </div>
        </Container>
      </section>
    </>
  );
}
