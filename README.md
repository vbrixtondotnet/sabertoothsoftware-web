# Sabertooth Software Labs — Next.js Site

Professional portfolio and marketing site for **Sabertooth Software Labs**, built with **Next.js 16** and **React 19**.

## Pages

- `/` — Home
- `/services` — Services
- `/projects` — Projects portfolio
- `/case-studies` — Case study index
- `/case-studies/[slug]` — Individual case studies
- `/about` — About
- `/contact` — Contact

## Environment variables

The site is a **static export** on **Cloudflare Pages**. Contact email uses a **Pages Function** (`functions/api/contact.ts`) and the **Cloudflare Email REST API** (Pages does **not** support `send_email` in `wrangler.toml`).

| Variable | Local | Production (Pages secrets) |
| -------- | ----- | -------------------------- |
| `FROM_EMAIL` | `.env.local` / `.dev.vars` | secret |
| `CONTACT_EMAIL` | `.env.local` / `.dev.vars` | secret |
| `CLOUDFLARE_ACCOUNT_ID` | `.dev.vars` (via setup) | secret |
| `CLOUDFLARE_EMAIL_API_TOKEN` | `.dev.vars` (via setup) | secret |

### Setup (once)

```bash
npx wrangler login
cp .env.example .env.local   # set CONTACT_EMAIL to your Gmail
npm run setup:email          # writes .dev.vars (uses wrangler session)
npm run build
npx wrangler pages secret bulk .dev.vars --project-name=sabertooth-software-labs
```

### Local test

```bash
npm run dev
```

Open [http://localhost:3000/contact](http://localhost:3000/contact). The **`api`** terminal should log `contact_email_rest_response` with `success: true` and `queued` or `delivered` ≥ 1.

**Production note:** Prefer a **long-lived API token** (Email Sending → Send) in the dashboard over the wrangler OAuth token (expires). Update `.dev.vars` and re-run `wrangler pages secret bulk`.

### Switch recipient to sales@

Update **`CONTACT_EMAIL`** to `sales@sabertoothsoftwarelabs.net` in the Cloudflare Production environment (and in `.dev.vars` if you use it), then redeploy.

## Develop

```bash
npm install
cp .env.example .env.local
cp .dev.vars.example .dev.vars
npm run build    # once — creates out/ for Pages Functions
npm run dev      # Next.js :3000 + contact API via Wrangler :8788
```

Open [http://localhost:3000](http://localhost:3000). Use **`npm run dev`** (not `dev:web`) so `/api/contact` is proxied to the local Pages Function.

## Build

```bash
npm run build
npm start
```

## Deploy to Cloudflare Pages

Production deploys to the `sabertooth-software-labs` Pages project (production branch: `main`).

```bash
npm run deploy
```

Requires `npx wrangler login` once per machine.

## Content

Edit copy and listings in `src/lib/content.ts` and `src/lib/site.ts`.

## Note

The previous Vite + React app lives in `../sabertooth-web` (deprecated; do not deploy). This Next.js app is the live site on Cloudflare Pages.
