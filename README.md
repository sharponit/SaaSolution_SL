# SaaSolutions Compliance OS (MVP)

This repository is now aligned to the product name **SaaSolutions Compliance OS**.

## Canonical naming
- Product name: `SaaSolutions Compliance OS`
- Suggested git repository name: `saasolutions-compliance-os`
- NPM package name: `saasolutions-compliance-os`

## Stack
- Next.js App Router + TypeScript + TailwindCSS
- Supabase Postgres/Auth with RLS
- Stripe subscriptions
- PDFKit server-side PDF export

## Setup
1. `npm install`
2. Copy `.env.example` to `.env.local` and fill variables.
3. Apply SQL migration from `db/migrations/001_init.sql` in Supabase SQL editor.
4. `npm run dev`

## Stripe
- Create product prices for Starter (€29) and Pro (€79).
- Put price IDs in env.
- Configure webhook endpoint: `/api/stripe/webhook`.
- Listen for `customer.subscription.created`, `updated`, `deleted`.

## MVP Features
- Auth pages scaffolding
- Company profile, ROPA, Vendors, Incidents, Risk, Billing pages
- Risk scoring rule engine in `lib/risk.ts`
- PDF export APIs:
  - `POST /api/pdf/ropa`
  - `POST /api/pdf/vendors`
  - `POST /api/pdf/incidents`
- Stripe checkout, portal, webhook APIs

## Deployment
- Frontend: Vercel
- Backend: Supabase hosted
- Set all env vars in Vercel project settings

## New repository quick start
If you want to publish this project into a fresh repository, follow `REPO_SETUP.md` for exact commands and naming.

