# Dirty South Bar website

Marketing site for [Dirty South Bar](https://www.dirtysouthbar.com), a cocktail bar in downtown Stuart, FL.
Built with Next.js (App Router), React and Tailwind CSS. The menu and events are managed in
[Sanity](https://www.sanity.io) and go live the moment they're published, with no rebuild needed.

```
/            Next.js website (deployed on Netlify)
/studio      Sanity Studio (hosted at https://dirtysouthbar.sanity.studio)
```

## Local development

Requires Node.js 20.9 or newer (see `.nvmrc`).

```bash
npm install
npm run dev        # website on http://localhost:3000
npm run build      # production build
npm run check      # type-check

cd studio && npm install
npm run dev        # Studio on http://localhost:3333 (or `npm run studio` from the root)
```

## Content in Sanity

| In the Studio | On the website |
| --- | --- |
| **Menu → Cocktails** | Signature, seasonal and limited-time drinks, plus zero-proof. Seasonal and limited-time drinks appear in the “Seasonal Sips” spotlight and disappear after their “available until” date. “Feature on the homepage” picks the homepage favorites. |
| **Menu → Beer** | Draft and bottles & cans lists. |
| **Menu → Wine** | Grouped by type with glass and bottle prices. |
| **Menu → Food** | Grouped by category (Personal Pizzas, Bites, Sweets) with dietary tags. |
| **Menu → Menu notes & beer list** | Optional notes under Beer/Wine/Food, and an optional beer-list photo for long or rotating lists. |
| **Events → Weekly events** | Recurring nights; pause one with “Show on the website”. |
| **Events → Special events** | One-off nights; they disappear once they're over. |

Menu sections with no items don't appear on the site. Events with an RSVP/ticket link get a button; without one, there's no button. Drag items in a list to change their order on the site.

Everything else (business info, hours, homepage copy, images, merch) lives in code: `src/lib/site.ts` and `src/lib/content.ts`.

### How live updates work

Pages are cached and served fast. `sanityFetch` tags each cached query, and `<SanityLive />` (in the root layout) listens to Sanity's Live Content API and refreshes those tags the moment content is published. Pages also refresh hourly so dates (next events, expiring seasonal drinks) stay current. See `src/sanity/`.

## Deploying

**Website (Netlify, from GitHub):** settings come from `netlify.toml` (build `npm run build`, publish `.next`, Node 22). Netlify runs it with its Next.js runtime. Every push to `main` redeploys.

- **Forms:** the contact (`contact`) and email club (`born-dirty-club`) forms use Netlify Forms, registered from `public/__forms.html`. Enable form detection under **Forms** in Netlify.
- **Domain:** add `www.dirtysouthbar.com` under **Domain management**.

**Studio (Sanity-hosted):**

```bash
cd studio
npx sanity login
npm run deploy        # publishes to https://dirtysouthbar.sanity.studio
```

**Sanity CORS origins:** live updates are fetched from the visitor's browser, so in [sanity.io/manage](https://www.sanity.io/manage) → project → **API → CORS origins**, add (without credentials): `https://www.dirtysouthbar.com`, the Netlify site URL, and `http://localhost:3000`.

**Starter content:** `studio/seed/initial-content.ndjson` holds the original cocktails and weekly events. Import once with `cd studio && npm run import-seed` (skips anything that already exists).

## SEO

Per-page metadata and canonical URLs (`src/lib/metadata.ts`); structured data for the bar, menu, breadcrumbs and events (`src/lib/structured-data.tsx`), built from the Sanity content; generated `sitemap.xml`, `robots.txt`, web manifest and icons. After launch, submit `https://www.dirtysouthbar.com/sitemap.xml` in Google Search Console.
