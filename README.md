# Pizza Delivery Web

Initial frontend foundation for the Pizza Delivery Platform administration application. The customer application is separate, and business rules remain owned by the backend REST API.

## Stack

Next.js App Router, TypeScript, Tailwind CSS, shadcn/ui primitives, TanStack Query, Axios, React Hook Form, Zod, ESLint, Prettier, and Vitest.

## Setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Set `NEXT_PUBLIC_API_URL` to the backend API base URL. The default is `http://localhost:4000/api/v1`.

## Commands

```bash
npm run dev
npm run lint
npm run test
npm run build
```

## Structure

- `src/app`: routes, route layouts, loading, error, and not-found boundaries
- `src/components`: reusable UI and application shell components
- `src/providers`: query, auth, theme, and restaurant-context providers
- `src/lib/api`: Axios client and typed auth API functions
- `src/lib/auth`: memory-only access-token manager
- `src/lib/permissions`: UI visibility helpers; the backend remains authoritative

## Authentication architecture

The web client expects a short-lived access token in application memory only. It never reads or stores the rotating refresh token; the browser sends that token as an HttpOnly cookie via Axios `withCredentials`. A `TOKEN_EXPIRED` response triggers one shared refresh request, waits concurrent requests, and retries each original request at most once. Refresh failure clears auth memory and returns the user to `/login`. The `/auth/refresh` request itself is never intercepted for refresh.

The frontend is prepared for `POST /auth/login`, `POST /auth/refresh`, `POST /auth/logout`, and `GET /auth/me`. Backend authentication, authorization, roles, permissions, restaurant membership, and business logic remain the source of truth.

## Scope

This phase intentionally contains only the dashboard foundation, login and password-recovery placeholders, protected routes, navigation, shared states, and architecture needed for later modules. Restaurant, menu, order, customer, coupon, reporting, staff, payment, and delivery functionality are not implemented.
