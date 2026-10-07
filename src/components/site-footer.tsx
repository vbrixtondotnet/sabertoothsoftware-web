import Link from "next/link";
import { navLinks, site } from "@/lib/site";
import { Container } from "@/components/container";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border bg-surface-muted/30 backdrop-blur-sm">
      <Container className="py-12">
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5 font-semibold text-foreground">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-gradient-to-br from-accent/30 to-violet/20 text-sm font-bold">
                ST
              </span>
              {site.name}
            </div>
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
