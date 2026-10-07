"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navLinks, site } from "@/lib/site";
import { ButtonLink } from "@/components/button-link";
import { Container } from "@/components/container";
import { cn } from "@/lib/utils";

function LogoMark() {
  return (
    <span
      className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-lg border border-border bg-surface-muted"
      aria-hidden
    >
      <span className="absolute inset-0 bg-gradient-to-br from-accent-bright/40 via-violet/30 to-cyan/20" />
      <svg className="relative z-10" width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path
          d="M6 18L12 4l6 14H6z"
          stroke="#e2e8f0"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path d="M9 14h6" stroke="#22d3ee" strokeWidth="1.5" />
      </svg>
    </span>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <Container>
        <div className="flex h-16 items-center justify-between gap-4 lg:grid lg:grid-cols-[1fr_auto_1fr]">
          <Link
            href="/"
            className="flex items-center gap-2.5 font-semibold tracking-tight text-foreground"
          >
            <LogoMark />
            <span className="hidden sm:inline">{site.name}</span>
          </Link>

          <nav
            className="hidden items-center justify-center gap-8 lg:flex"
            aria-label="Primary"
          >
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  "text-sm font-medium transition-colors",
                  pathname === href
                    ? "text-foreground"
                    : "text-muted hover:text-foreground",
                )}
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center justify-end gap-3">
            <span className="hidden items-center gap-2 text-xs font-medium text-muted md:inline-flex">
              <span className="online-dot h-2 w-2 rounded-full bg-emerald-400" />
              Online now
            </span>
            <ButtonLink href="/contact" className="hidden sm:inline-flex">
              Contact us
            </ButtonLink>
            <button
              type="button"
              className="inline-flex rounded-lg border border-border bg-surface-muted px-3 py-2 text-sm font-medium text-foreground lg:hidden"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? "Close" : "Menu"}
            </button>
          </div>
        </div>

        {open && (
          <nav className="border-t border-border pb-4 pt-3 lg:hidden" aria-label="Mobile">
            <ul className="flex flex-col gap-1">
              {navLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="block rounded-lg px-2 py-2.5 text-sm font-medium text-muted hover:bg-surface-muted hover:text-foreground"
                    onClick={() => setOpen(false)}
                  >
                    {label}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <ButtonLink href="/contact" className="w-full">
                  Contact us
                </ButtonLink>
              </li>
            </ul>
          </nav>
        )}
      </Container>
    </header>
  );
}
