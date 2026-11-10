# SEO guide: Omar Ahmed portfolio

This document explains what the SEO layer does, how to publish it, how to register the site with Google Search Console, and what to improve next.
It makes **no promise of rankings**: search positions depend on content quality, competition and time.

## 1. How it works

| Piece | File | What it does |
|---|---|---|
| Page metadata (EN + AR) | `src/seo.ts` | One table with a unique title and description for every indexable URL. Used by the app and by the build. |
| Static page per route | `scripts/seo-build.mjs` (runs inside `npm run build`) | Generates `dist/<route>/index.html` with that route's own `<title>`, description, canonical, Open Graph / Twitter tags, JSON-LD and a `<noscript>` text version. The React app boots from the same file as before. |
| Head sync while browsing | `applySeo()` in `src/seo.ts`, called from `Page` | Updates title, description, canonical, `og:*`, `robots` on client-side navigation and when the language is switched. Unknown URLs get `noindex`. |
| Sitemap / robots | generated into `dist/` (copies kept in `public/`) | `sitemap.xml` lists 9 URLs. `robots.txt` allows everything and points to the sitemap. |
| Social image | `public/og-image.jpg` (1200x630, 86 KB) | Branded preview (مُخْتَلِف | Different, name, headline, portrait). |
| Favicons | `public/favicon.svg`, `.ico`, `.png` | From the branding update. |

Run `npm run build` as usual. The last line of the output tells you which origin was used.

## 2. The canonical URL (please verify)

The build chooses the site origin in this order:

1. `SITE_URL` environment variable, if set (for example `https://www.your-domain.com`).
2. `VERCEL_PROJECT_PRODUCTION_URL`, which Vercel sets during its builds. It is the project's real production domain and **switches to a custom domain automatically** if you add one later.
3. `FALLBACK_SITE_URL` in `src/seo.ts`: `https://omar-ahmed-portfolio-pi.vercel.app`.

Item 3 is the only production URL found in the project documents (it was mentioned in an earlier brief and recorded in `PORTFOLIO_HANDOFF.md`). **It could not be verified from the build environment.** If your real Vercel URL is different:

* On Vercel, nothing needs doing as long as "Automatically expose System Environment Variables" is enabled for the project (it is by default). Item 2 supplies the real domain.
* To be certain, add `SITE_URL` in Vercel, Project, Settings, Environment Variables, then redeploy.
* For the committed copies, run `SITE_URL=https://your-real-url npm run seo:public` (it rewrites `public/sitemap.xml` and `public/robots.txt`).

Expected values (with the fallback origin):

* Homepage canonical: `https://omar-ahmed-portfolio-pi.vercel.app/`
* Sitemap: `https://omar-ahmed-portfolio-pi.vercel.app/sitemap.xml`

**Check after deploying:** open the live site, press "View page source" on `/projects/bank-system` (not "Inspect") and confirm that the `<title>` is "C++ Bank Management System (2 Versions) | Omar Ahmed" and the canonical is the live URL.

## 3. Keyword strategy (honest version)

Targets come from your real profile: a second-year computer science student in Cairo, strong in C++, algorithms and problem solving, expanding into web development, with four C++ console projects. Nothing below claims experience you do not have.

| Your keyword group | How it is used | Where |
|---|---|---|
| Omar Ahmed / عمر أحمد | Name in every title; Arabic name in titles, Person schema (`alternateName`) | all pages |
| Full-Stack Developer (aspiring) | "Aspiring Full-Stack Developer" (matches your own headline) | Home, About titles/descriptions |
| Portfolio / بورتفوليو مبرمج | "Portfolio" in the home title, Arabic "بورتفوليو مبرمج" | Home |
| Cairo / Egypt / القاهرة / مصر | "student in Cairo, Egypt" (true: Al-Azhar University, Cairo) | Home, About |
| C++ projects / مشاريع C++ / سي بلس بلس | Exact phrases in Projects title, H1 and description | Projects and each project page |
| C++ Bank Management System | Bank page title, H1 area, schema | `/projects/bank-system` |
| C++ Expense Tracker, "expense management" | Expense page title and description | `/projects/expense-tracker` |
| C++ Math Quiz, quiz application | Math Quiz page | `/projects/math-quiz` |
| C++ Rock Paper Scissors game | RPS page | `/projects/rock-paper-scissors` |
| C++ problem solving | About and descriptions (450+ solved problems is already on the site) | About, Home |
| Certificates / technical training | Certificates title and description | `/certificates` |

**Deliberately not targeted**, because the site and profile do not support the claim today:

* **Junior Full Stack Developer, Junior Web Developer, Web Developer Egypt/Cairo, مطور ويب في مصر, مطور مواقع القاهرة** as statements of fact. The site says "aspiring" and shows no web-development client work. "Aspiring full-stack developer" is used instead; the Arabic uses "يطمح لأن يصبح".
* **Front End Developer, Back End Developer, Website Developer, Responsive Web Design.** No web projects or web technologies are listed in your profile or projects.
* **Object Oriented Programming Projects.** The projects are procedural (functions, structs, enums), and the site itself says so.

If you build and publish real web projects (even small ones), add them to `src/data.ts` with their technologies. The SEO layer will pick them up (sitemap, schema, noscript text), and these keywords become honest to target.

These are starting ideas, not verified search volumes. Use the Search Console "Performance" report (section 6) to see which queries really bring impressions.

## 4. Multilingual SEO: the limitation

Arabic and English share the **same URLs**. The language is a client-side switch (stored in the browser), not a separate URL.

* Therefore **hreflang is deliberately NOT added**. It would be incorrect: hreflang needs a separate URL per language.
* Crawlers load every URL in the default language (English). They see the Arabic text only as part of the `<noscript>` text version and the structured data (`alternateName`). Arabic-language searches will therefore be harder to rank for than English ones.
* The metadata does switch to Arabic when a visitor (or a renderer with Arabic preferences) uses the Arabic mode, but that is not a crawlable URL.

**Recommended fix (needs your approval, medium-sized change):** add parallel `/ar/...` routes where the URL decides the language, generate a static page for each, add reciprocal `hreflang` (`en`, `ar`, `x-default`) and list both versions in the sitemap. It keeps the design, components and content as they are.

## 5. Other limitations of the current architecture

* **Client-rendered content.** The page body is rendered by JavaScript. Google renders JavaScript and indexes such pages, but it can take longer than static HTML. The generated `<noscript>` text version and per-route metadata reduce the risk for crawlers and link-preview bots that do not run scripts. Full prerendering of the React tree would be a bigger architectural change (not done).
* **Unknown URLs return HTTP 200.** `vercel.json` rewrites every path to `/index.html` (needed so client-side routes work). Unknown URLs get `noindex` at runtime, but the server still answers 200. Once you have confirmed on the live site that each route serves its own page (section 2 check), the catch-all rewrite can be removed so unknown URLs return a real 404. I did not change this because it cannot be verified from here.
* **Free `vercel.app` domain.** It cannot be verified as a Search Console *Domain* property (no DNS access), and a custom domain is a stronger brand signal. A domain is a paid external service, so nothing was changed. Recommendation: a short domain with your name. The build adapts automatically.
* **Sitemap has no `<lastmod>`.** The project has no reliable per-page modification dates, and a wrong date is worse than none.
* **Certificates are `?cat=` views of one URL.** They canonicalise to `/certificates` to avoid duplicate indexing.

## 6. Google Search Console: step by step

You do this yourself; nothing was submitted or verified for you, and no tracking was added.

1. Deploy the updated site (your own process) and confirm section 2's check.
2. Open <https://search.google.com/search-console> and sign in with your Google account.
3. **Add property**, choose **URL prefix** (the right choice for a `vercel.app` address), paste the exact canonical homepage URL (including `https://` and the trailing `/`), and continue.
4. **Verify with the "HTML tag" method:** copy the `<meta name="google-site-verification" content="...">` tag Google shows. Open `index.html`, replace the commented placeholder in `<head>` with that tag (every generated page inherits it), redeploy, then click **Verify**. (Alternative: "HTML file", then put the downloaded file in `public/`.) With a custom domain you can use the **Domain** property and a DNS record instead.
5. **Submit the sitemap:** left menu, **Sitemaps**, type `sitemap.xml`, **Submit**. Status should become "Success" with 9 discovered URLs.
6. **URL Inspection:** paste a page URL (start with the homepage) in the top bar. Read "Page indexing". Use **Test live URL**, then **View tested page** (HTML and screenshot) to confirm that Google renders the content, and check "User-declared canonical". If it is not indexed, use **Request indexing** (limited daily quota). Repeat for the project pages and `/certificates`.
7. **Monitor:**
   * **Indexing, Pages:** which URLs are indexed and the reason for any that are not.
   * **Performance, Search results:** impressions, clicks, queries, pages; filter by country (Egypt, Saudi Arabia, and so on) and by device.
   * **Experience:** Core Web Vitals, Page experience.
   * **Enhancements:** the Breadcrumbs report should list the breadcrumb markup.
   * Give it days to weeks; new sites on free domains start with few impressions.
8. Optional checks: <https://search.google.com/test/rich-results> and <https://validator.schema.org/> for the structured data; Facebook Sharing Debugger and LinkedIn Post Inspector for the social preview (they also refresh cached previews).

## 7. Structured data included (only facts from the site)

`WebSite` and `Person` (name, Arabic name, brand "مُخْتَلِف", portrait, GitHub and LinkedIn, skills from About, languages) on every page; `ProfilePage` on `/about`; `CollectionPage` + `ItemList` on `/projects`; `SoftwareSourceCode` (C++, GitHub repository, tech keywords; Bank has two versions with their own repositories) on project pages; `BreadcrumbList` on every page. **Not included on purpose:** reviews, ratings, awards, jobs, addresses, email or phone number.

## 8. Content recommendations (ideas only; nothing added without your approval)

Search engines reward pages that are genuinely useful. In priority order:

1. **Richer project pages.** For each project add: what problem it solves, a short "how it works" (main functions, data flow, file format used), a screenshot or short demo clip, and how to build and run it. The Bank Management System already has the best structure (two versions plus an evolution section) and can be the model.
2. **Link each repository clearly** (already present) and keep each GitHub README in sync with the site; GitHub pages often rank for "C++ bank management system".
3. **Case studies / development notes** per project: design decisions, bugs you hit, what you would change. They show real experience without exaggeration.
4. **A few short articles** on things you genuinely know, for example: file handling with `fstream` for saving records, validating console input, bitwise permission flags (from your Advanced Bank System), designing menu-driven console programs, how you approach Codeforces problems. This would be a new section (a "Notes" page); I will only add it if you approve.
5. **Real web projects** to support "full-stack / web developer" searches honestly.
6. **A custom domain** and, later, `/ar/` URLs (section 4).
7. Keep certificate and project pages updated; add `lastmod` to the sitemap once you track real dates.
8. **Optional analytics.** None was added. If you want visit statistics, tell me which tool, and I will explain the privacy implications and consent options first.
