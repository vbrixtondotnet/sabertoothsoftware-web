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

## Develop

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

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
