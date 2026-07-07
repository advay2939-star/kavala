# Kavala — Storefront (Chunk 1)

Premium DTC storefront for **Kavala**, a botanical oral ritual oil made
after the classical Irimedadi formula. See
`docs/BRAND_AND_BUILD_STRATEGY.md` for the full brand, compliance, and
systems strategy (deliverables 1–22).

## What's in this chunk
- Design system (Tailwind v4 tokens, Bodoni Moda / Instrument Sans, the
  oil-meniscus signature element) — `app/globals.css`
- Full homepage: hero, ritual steps, formula triptych, honesty block,
  product ladder, verified-reviews empty state, subscribe strip
- Typed content layer (`lib/content/home.ts`) — single source of truth
- Cart store + drawer (checkout deliberately disabled until the Medusa
  + Stripe integration in Chunk 3 — no fake stubs)
- **Compliance module**: claims registry, prohibited-pattern build gate
  (`npm run lint:claims`, wired into `npm run build`), mandatory
  global disclaimer component
- Full operational Postgres schema — `db/schema.sql`

## Run
```bash
npm install
npm run dev
```

## Compliance gate
`npm run build` fails if any consumer-facing file contains a prohibited
claim pattern (cure/treat/whiten/anti-gingivitis/FDA-approved/etc.).
Evidence-page copy lives in `lib/compliance/claims.ts` (exempt from the
scan, rendered only with mandatory limitations).

## Next chunks
2. ✅ Evidence & Tradition, Ingredients, How to Use, legal pages (this chunk)
3. ✅ Commerce — Stripe Checkout + Billing, signature-verified idempotent webhooks, subscription pause/skip/cancel (Medusa dropped: overkill for 5 SKUs; Postgres order mirror is the future migration seam)
4. ✅ Payload 3 CMS — collections for ingredients, evidence, claims registry, legal docs; claims publish gate makes prohibited claims unpublishable at the CMS layer
5. ✅ Admin dashboard — KPI overview, orders, subscriptions, review moderation (logged rejection reasons), adverse events with MoCRA flags, lot tracking with one-click recall lists; /admin 404s in production without a Payload session
6. Emails, analytics events, QA automation
