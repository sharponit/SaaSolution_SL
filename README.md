# df_mobile_app (MVP)

Production-ready MVP repository for a GDPR-focused compliance platform for SMEs.

## Canonical repository identity
- Product: `df_mobile_app`
- Repository: `df_mobile_app`
- Package: `df_mobile_app`

## Tech stack
- Next.js (App Router) + TypeScript + TailwindCSS
- Supabase (Postgres + Auth + RLS)
- Stripe subscriptions
- PDFKit for server-side PDF exports

## Features in this repo
- Company profile management
- ROPA register scaffold
- Vendor register scaffold
- Incident log scaffold
- Rule-based compliance risk scoring
- Stripe billing routes (checkout, portal, webhook)
- PDF export endpoints for ROPA, vendors, incidents

## Quick start
1. `npm install`
2. Copy `.env.example` to `.env.local`
3. Fill all Supabase and Stripe env vars
4. Run SQL migration: `db/migrations/001_init.sql`
5. `npm run dev`

## Create and publish as a brand-new repo
See `REPO_SETUP.md`.

## Deployment
- Frontend: Vercel
- Backend: Supabase hosted project
- Billing: Stripe products/prices + webhook endpoint `/api/stripe/webhook`

## Engineering foundation
- Architecture guardrails: `docs/ARCHITECTURE_FOUNDATION.md`
- Use this as the default decision baseline for all new features and refactors.

## Licensing and IP
- License model: commercial/proprietary.
- Software developed by **SaaSolution SL**.
- Intellectual property owned by **Paradox FZCO (Dubai)**.
- Policy reference: `docs/LICENSING_AND_IP.md`.
