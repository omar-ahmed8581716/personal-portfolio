# Omar Ahmed Portfolio (React + Vite + TypeScript)

Run these commands inside this folder (install Node.js LTS from nodejs.org first):
- `npm install` : download dependencies (once)
- `npm run dev` : run locally, open the address it prints
- `npm run build` : create the production site in `dist/`

Deploy: push this folder to GitHub, then import it on vercel.com or netlify.com (build command `npm run build`, output folder `dist`). Routing files are already included.

Edit content only in `src/data.ts` (contact links, projects, skills). To add a fifth project, copy one object in `projects`.
Replace images in `public/` (`omar.jpg`, `best-members.jpg`) keeping the same names. The personal brand «مُخْتَلِف | Different» is outlined vector artwork in `src/brand.tsx` (navbar and footer; it shows one word, Arabic or English, following the site language via `ui.brand` in `src/i18n.tsx`); the favicons (`favicon.svg`, `.ico`, `.png`, `apple-touch-icon.png`) are the letter م on the navy tile. The old `logo-*.png` files are no longer used.

After you have a domain: add it in Vercel and redeploy. Canonical URLs, Open Graph URLs, the sitemap and `robots.txt` follow it automatically (see the SEO section below).
Not yet included: certificates, Atlantis experience, Codeforces, screenshots (by your choice or missing files).

Theme: light/dark toggle in the navbar (saved in the browser; first visit follows the system setting). Colors are CSS variables at the top of `src/styles.css`.
Fonts: Cairo (Arabic) is bundled through `@fontsource/cairo`, no external font requests.

## SEO

`npm run build` also runs `scripts/seo-build.mjs`: it writes one static HTML page per route (own title, description, canonical, Open Graph / Twitter tags, JSON-LD and a `<noscript>` text version) plus `sitemap.xml` and `robots.txt` into `dist/`. Page titles and descriptions (English and Arabic) live in `src/seo.ts`. The site origin comes from `SITE_URL`, else Vercel's `VERCEL_PROJECT_PRODUCTION_URL`, else `FALLBACK_SITE_URL` in `src/seo.ts` (unverified). Read `SEO_GUIDE.md` for the Google Search Console steps, keyword strategy, limitations and recommendations.
