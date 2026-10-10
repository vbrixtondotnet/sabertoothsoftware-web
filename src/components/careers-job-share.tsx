"use client";

import { useCallback, useState } from "react";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

type CareersJobShareProps = {
  title: string;
  shareUrl: string;
};

const shareBtnClass =
  "inline-flex h-10 items-center gap-2 rounded-lg border border-border bg-surface-muted px-3 text-sm font-semibold text-foreground transition hover:border-accent-bright/40 hover:bg-surface-elevated focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.062 2.062 0 114.126 0 2.062 2.062 0 01-2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function openFacebookShare(url: string) {
  const shareHref = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
  window.open(shareHref, "_blank", "noopener,noreferrer,width=580,height=680");
}

export function CareersJobShare({ title, shareUrl }: CareersJobShareProps) {
  const [linkCopied, setLinkCopied] = useState(false);

  const shareMessage = `${site.name} is hiring: ${title}`;
  const xHref = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareMessage)}`;
  const linkedInHref = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;

  const copyJobLink = useCallback(async () => {
    const text = `${shareMessage}\n${shareUrl}`;
    try {
      await navigator.clipboard.writeText(text);
      setLinkCopied(true);
      window.setTimeout(() => setLinkCopied(false), 2500);
    } catch {
      window.prompt("Copy this link to share:", text);
    }
  }, [shareMessage, shareUrl]);

  return (
    <div className="mt-8">
      <p className="text-xs font-semibold uppercase tracking-wider text-muted">
        Share this role
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => openFacebookShare(shareUrl)}
          className={shareBtnClass}
        >
          <FacebookIcon className="h-4 w-4 text-[#1877F2]" />
          Facebook
        </button>
        <a href={xHref} target="_blank" rel="noopener noreferrer" className={shareBtnClass}>
          <XIcon className="h-4 w-4" />
          X
        </a>
        <a
          href={linkedInHref}
          target="_blank"
          rel="noopener noreferrer"
          className={shareBtnClass}
        >
          <LinkedInIcon className="h-4 w-4 text-[#0A66C2]" />
          LinkedIn
        </a>
        <button
          type="button"
          onClick={copyJobLink}
          className={cn(shareBtnClass, linkCopied && "border-emerald-500/40")}
        >
          {linkCopied ? "Link copied" : "Copy link"}
        </button>
      </div>
      <p className="mt-2 max-w-xl text-xs text-muted">
        Facebook blocked the share dialog? Use <span className="text-foreground">Copy link</span>,
        or in Facebook enable apps under Settings → Privacy → Apps and websites.
      </p>
    </div>
  );
}
