/**
 * Syncs mail-related keys from .env.local → .dev.vars for Wrangler Pages Functions.
 * Does not print secret values.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const localPath = path.join(root, ".env.local");
const devVarsPath = path.join(root, ".dev.vars");

const KEYS = [
  "FROM_EMAIL",
  "CONTACT_EMAIL",
  "TURNSTILE_SECRET_KEY",
  "CLOUDFLARE_ACCOUNT_ID",
  "CLOUDFLARE_EMAIL_API_TOKEN",
];

function parseEnv(content) {
  /** @type {Record<string, string>} */
  const vars = {};
  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    vars[key] = value;
  }
  return vars;
}

if (!fs.existsSync(localPath)) {
  console.warn(
    "[prepare-dev-vars] .env.local not found — create it from .env.example for contact email.",
  );
  process.exit(0);
}

const local = parseEnv(fs.readFileSync(localPath, "utf8"));
const existing = fs.existsSync(devVarsPath)
  ? parseEnv(fs.readFileSync(devVarsPath, "utf8"))
  : {};

const merged = { ...existing };
let updated = 0;
for (const key of KEYS) {
  if (local[key] !== undefined && local[key] !== "") {
    if (merged[key] !== local[key]) updated += 1;
    merged[key] = local[key];
  }
}

if (!merged.CLOUDFLARE_ACCOUNT_ID && local.CLOUDFLARE_ACCOUNT_ID) {
  merged.CLOUDFLARE_ACCOUNT_ID = local.CLOUDFLARE_ACCOUNT_ID;
}

const body =
  Object.entries(merged)
    .map(([k, v]) => `${k}=${v}`)
    .join("\n") + "\n";

fs.writeFileSync(devVarsPath, body, "utf8");
console.log(
  `[prepare-dev-vars] Wrote .dev.vars (${updated} key(s) updated from .env.local). Restart npm run dev if it is already running.`,
);
