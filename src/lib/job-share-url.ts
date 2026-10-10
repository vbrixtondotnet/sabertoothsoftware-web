import { site } from "@/lib/site";

/** Canonical public URL for social crawlers and share dialogs (always production domain). */
export function jobShareUrl(slug: string): string {
  return `${site.url}/careers/${slug}`;
}
