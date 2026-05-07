# Architecture Foundation (Production-Scale)

This document captures **non-negotiable engineering rules** for evolving this repository into a production-grade international platform.

## 1) Maintainability first
- Keep business logic centralized in shared modules.
- Avoid duplicating domain logic across delivery channels.
- Organize shared logic under explicit package boundaries as the monorepo grows.

## 2) Design system and tokens
- No hardcoded visual primitives inside feature components.
- Colors, spacing, typography, radius, and elevation must come from shared tokens.
- Keep token naming semantic to allow future rebranding.

## 3) Shared authentication model
- Use one Supabase auth/session architecture across clients.
- Persist sessions across restarts.
- Handle refresh token lifecycle and renewal failures explicitly.

## 4) Feature flags
- Gate all premium/pro functionality behind feature flags.
- Design flag resolution for:
  - A/B experiments
  - region-level gating
  - future enterprise controls

## 5) Internationalization (i18n)
- No hardcoded UI copy in components.
- Use translation keys and locale dictionaries.
- Support locale fallback and runtime language switch.

## 6) Scalability targets
- Design for millions of users.
- Prepare modular domains for AI assistants, marketplace flows, enterprise dashboards, and white-labeling.

## 7) Cross-platform consistency
- Preserve shared business logic, profile state model, subscription model, and onboarding flows.

## 8) Performance baseline
- Optimize for mobile-first rendering.
- Prevent unnecessary re-renders.
- Lazy load heavy modules.
- Add caching layers for API and AI-heavy routes.

## 9) Folder structure
- Prefer domain-driven organization.
- Avoid catch-all utility dumping.
- Group code by feature/module ownership.

## 10) Backend safety
- Enforce Supabase Row Level Security by default.
- Never expose service role keys in client environments.
- Use typed database models and validated input/output contracts.

## 11) Future AI infrastructure
Prepare contracts and boundaries for:
- AI nutrition coach
- AI transformation assistant
- AI grocery optimization
- AI onboarding assistant
- AI recipe generation
- AI support agent

## 12) Ads architecture
- Ads/sponsored content must be modular and removable.
- Never show ads to premium users.
- Render ads only in approved public/free surfaces.

## 13) Analytics
Standardize event schemas for:
- onboarding funnel
- subscription conversion
- recipe engagement
- grocery interactions
- AI usage
- feature adoption

## 14) Offline-ready mobile patterns
- Cache meal plans and recipes.
- Persist offline grocery lists.
- Implement conflict-safe sync after reconnect.

## 15) Deployment model
- Web deployment on Vercel.
- Mobile builds via Expo EAS.
- Supabase environment separation for local/staging/production.

## 16) Code quality guardrails
- Strict TypeScript.
- ESLint + Prettier.
- Husky pre-commit hooks.
- Type-safe APIs.
- Avoid `any` unless unavoidable and documented.

## 17) Documentation requirements
Document and keep current:
- architecture decisions
- shared package purpose
- environment variables
- deployment flow
- feature flag system
- auth flow
- design token system

## 18) Decision policy
When there is ambiguity, prioritize:
1. Scalability
2. Maintainability
3. Extensibility
4. Delivery speed
