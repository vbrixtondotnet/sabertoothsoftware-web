import Link from "next/link";
import { Container } from "@/components/container";
import { SiteLogo } from "@/components/site-logo";
import { navLinks, site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border bg-surface-muted/30 backdrop-blur-sm">
      <Container className="py-12">
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr]">
          <div>
            <SiteLogo showWordmark={false} />
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">
              {site.description}
            </p>
            <p className="mt-3 text-sm text-muted">{site.location}</p>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                Company
              </p>
              <ul className="mt-3 space-y-2 text-sm">
                <li>
                  <Link href="/about" className="text-muted hover:text-cyan">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-muted hover:text-cyan">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                Work
              </p>
              <ul className="mt-3 space-y-2 text-sm">
                <li>
                  <Link href="/projects" className="text-muted hover:text-cyan">
                    Projects
                  </Link>
                </li>
                <li>
                  <Link
                    href="/case-studies"
                    className="text-muted hover:text-cyan"
                  >
                    Case Studies
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                Services
              </p>
              <ul className="mt-3 space-y-2 text-sm">
                <li>
                  <Link href="/services" className="text-muted hover:text-cyan">
                    All services
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-2 border-t border-border pt-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-4">
            {navLinks.map(({ href, label }) => (
              <Link key={href} href={href} className="hover:text-foreground">
                {label}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
