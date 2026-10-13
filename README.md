# Dirty South Bar website

Marketing site for [Dirty South Bar](https://www.dirtysouthbar.com), a cocktail bar in downtown Stuart, FL.
Built with Next.js (App Router), React and Tailwind CSS, and exported as a fully static site.

## Local development

Requires Node.js 20.9 or newer (see `.nvmrc`).

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static site in out/
npm run preview    # serve out/ locally
npm run check      # type-check
```

## Deploying on Netlify (from GitHub)

1. In Netlify: **Add new site → Import an existing project → GitHub**, and pick this repo.
2. Build settings come from `netlify.toml` (build command `npm run build`, publish directory `out`, Node 22). Leave the UI fields as detected.
3. Deploy. Every push to the production branch redeploys the site.
4. **Forms:** go to **Forms → Enable form detection**, then trigger a redeploy. The contact (`contact`) and email club (`born-dirty-club`) forms are registered from `public/__forms.html`; submissions appear under **Forms** in Netlify.
5. **Domain:** add `www.dirtysouthbar.com` under **Domain management** and set it as the primary domain.

Security and cache headers live in `public/_headers`.

## Editing content

| What | Where |
| --- | --- |
| Address, phone, email, hours, links (ordering, maps, social, shop) | `src/lib/site.ts` |
| Menu and seasonal drinks | `src/data/menu.json` |
| Weekly events | `src/data/events.json` |
| Merch and Instagram grid | `src/lib/content.ts` |
| Images | `public/images/` (pre-sized WebP) |

- **Seasonal drinks:** add `"seasonal": true` to a menu item. Optional `"availableUntil": "YYYY-MM-DD"` hides it after that date.
- **Hours:** keep `hoursDisplay` and `hours` in `site.ts` in sync with the Google Business Profile.
- **Events in Google results:** once the lineup is confirmed, set `eventsVerified = true` in `src/lib/events.ts`. Event data covers the next four weeks from the build date, so redeploy at least monthly (any push, or **Deploys → Trigger deploy** in Netlify).

## SEO

Per-page metadata and canonical URLs (`src/lib/metadata.ts`), structured data for the bar, menu, breadcrumbs and events (`src/lib/structured-data.tsx`), plus a generated `sitemap.xml`, `robots.txt`, web manifest and icons. After launch, submit `https://www.dirtysouthbar.com/sitemap.xml` in Google Search Console.
