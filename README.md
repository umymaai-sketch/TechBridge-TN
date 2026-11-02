# TechBridge Tn — Student × SME platform

A responsive Next.js MVP with a deep navy / aqua visual identity, motion effects, SQLite persistence, role-based workspaces, student applications, SME project drafts, and database-backed admin counts.

## Important status

This is a **starter MVP**, not a production-ready commercial marketplace. Authentication and core project flows are implemented in source, but the payment provider, escrow, payouts, email verification, file uploads, moderation, and dispute workflows are not implemented. No payment is collected. New SME projects remain drafts because publishing requires a real, server-verified payment workflow.

## Requirements

- Node.js 20+
- npm

## Setup

1. Extract the ZIP and open the `campusbridge` folder in a terminal.
2. Install dependencies:

   ```bash
   npm install
   ```

3. Copy `.env.example` to `.env` and set a strong random `JWT_SECRET` (at least 32 characters). Set your own `INITIAL_ADMIN_EMAIL` and `INITIAL_ADMIN_PASSWORD` (12+ characters). Do not use example secrets in production.

4. Generate Prisma client and create the local SQLite schema:

   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. Create the first administrator account:

   ```bash
   npm run db:seed
   ```

6. Start the development server:

   ```bash
   npm run dev
   ```

7. Open http://localhost:3000.

## Main routes

- `/` — animated public landing page
- `/projects` — published project listings
- `/projects/[id]` — project details and student application form
- `/register/student` — student registration
- `/register/sme` — SME registration
- `/login` — sign in
- `/student` — student workspace
- `/sme` — SME workspace
- `/sme/projects/new` — create a project draft
- `/admin` — administrator metrics
- `/terms`, `/privacy`, `/contact`
- `/api/health` — database health check

## Commission model

Fee calculation target: 10% of the original budget at publication and 5% at completion. This build only documents the intended model; it does not charge either fee or calculate real revenue.

## Production checklist

Before launch: use a managed database such as PostgreSQL, enable HTTPS and secure cookies, configure rate limiting and email verification, add CSRF protections as appropriate, add audit coverage and backups, implement and verify a real payment provider/webhooks/idempotency, build authorization checks for every mutation, test with `npm run build`, and get local legal/privacy review.


## Electronic payment page
The `/payment` route includes a checkout UI with selectable Visa, international card, and D17 (Poste Tunisienne) methods. It is currently a **front-end integration scaffold only**: no live payment is initiated and no card details are collected. Before production, choose a payment provider that supports your merchant account and each required method, configure server-side credentials, create a payment-intent endpoint, verify signed callbacks/webhooks, and persist verified transactions in the database. Never trust a browser-only success state.
