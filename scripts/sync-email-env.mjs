/**
 * Writes Cloudflare Email REST credentials into .dev.vars from wrangler login + .env.local.
 * Does not print secrets.
 */
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ACCOUNT_ID = "1f44bd2e5ddd226d63c3476956403288";
const CONTACT_INBOX = "marketing@sabertoothsoftwarelabs.net";
const CAREERS_INBOX = "admin@sabertoothsoftwarelabs.net";
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function wranglerConfigPath() {
  const base =
    process.env.WRANGLER_HOME ||
    path.join(os.homedir(), "AppData", "Roaming", "xdg.config", ".wrangler");
  return path.join(base, "config", "default.toml");
}

function readOAuthToken() {
  const configPath = wranglerConfigPath();
  if (!fs.existsSync(configPath)) {
    throw new Error("Run: npx wrangler login");
  }
  const text = fs.readFileSync(configPath, "utf8");
  const match = text.match(/^oauth_token\s*=\s*"([^"]+)"/m);
  if (!match) throw new Error("No oauth_token in wrangler config.");
  return match[1];
}

function parseEnv(content) {
  const vars = {};
  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    vars[trimmed.slice(0, eq).trim()] = value;
  }
  return vars;
}

const localPath = path.join(root, ".env.local");
const devVarsPath = path.join(root, ".dev.vars");
const local = fs.existsSync(localPath)
  ? parseEnv(fs.readFileSync(localPath, "utf8"))
  : {};
const existing = fs.existsSync(devVarsPath)
  ? parseEnv(fs.readFileSync(devVarsPath, "utf8"))
  : {};

const merged = { ...existing, ...local };
merged.CLOUDFLARE_ACCOUNT_ID = ACCOUNT_ID;

if (!merged.CLOUDFLARE_EMAIL_API_TOKEN?.trim()) {
  merged.CLOUDFLARE_EMAIL_API_TOKEN = readOAuthToken();
}

merged.FROM_EMAIL = CONTACT_INBOX;
merged.CONTACT_EMAIL = CONTACT_INBOX;
merged.CAREERS_EMAIL = CAREERS_INBOX;

const body =
  Object.entries(merged)
    .map(([k, v]) => `${k}=${v}`)
    .join("\n") + "\n";

fs.writeFileSync(devVarsPath, body, "utf8");

if (fs.existsSync(localPath)) {
  local.CLOUDFLARE_ACCOUNT_ID = ACCOUNT_ID;
  local.FROM_EMAIL = CONTACT_INBOX;
  local.CONTACT_EMAIL = CONTACT_INBOX;
  local.CAREERS_EMAIL = CAREERS_INBOX;
  const localBody =
    Object.entries(local)
      .filter(([k]) => k !== "CLOUDFLARE_EMAIL_API_TOKEN")
      .map(([k, v]) => `${k}=${v}`)
      .join("\n") + "\n";
  fs.writeFileSync(localPath, localBody, "utf8");
}

console.log("[sync-email-env] Updated .dev.vars (secrets not printed).");
console.log(
  "[sync-email-env] Production: npx wrangler pages secret bulk .dev.vars --project-name=sabertooth-software-labs",
);
