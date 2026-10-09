import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
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
              Tell us about your project and we&apos;ll route your inquiry to our team.
            </p>
            <ContactForm />
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
