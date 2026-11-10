// SEO build step. Runs after `vite build` (see the "build" script in package.json). No extra dependencies.
//
// What it generates (all from src/seo.ts, src/data.ts and src/i18n.tsx, so nothing is duplicated by hand):
//   - dist/<route>/index.html  one static HTML file per route, with its own <title>, description, canonical, Open Graph / Twitter tags,
//                              JSON-LD and a <noscript> text version. The React app still boots from the same file as before.
//                              (Crawlers and link-preview bots that do not run JavaScript read these tags directly.)
//   - dist/sitemap.xml, dist/robots.txt
//
// `node scripts/seo-build.mjs --public` only (re)writes public/sitemap.xml and public/robots.txt.
// Origin: SITE_URL env var, else VERCEL_PROJECT_PRODUCTION_URL (set by Vercel), else FALLBACK_SITE_URL in src/seo.ts.
import { createServer } from "vite";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist"), pub = path.join(root, "public");
const publicOnly = process.argv.includes("--public");

async function load() {
  // Vite's own module loader transpiles the TypeScript sources for us (no ts-node / tsx needed).
  const vite = await createServer({ root, configFile: false, appType: "custom", logLevel: "error", server: { middlewareMode: true, hmr: false, watch: null }, optimizeDeps: { noDiscovery: true, include: [] } });
  try {
    return { seo: await vite.ssrLoadModule("/src/seo.ts"), data: await vite.ssrLoadModule("/src/data.ts"), i18n: await vite.ssrLoadModule("/src/i18n.tsx") };
  } finally { await vite.close(); }
}

const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const jsonForHtml = o => JSON.stringify(o).replace(/</g, "\\u003c").replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");

async function main() {
  const { seo, data, i18n } = await load();
  const { profile, projects, featuredSlugs, aboutSkills, strengths } = data;
  const ui = i18n.ui;
  const origin = seo.resolveOrigin(process.env);
  const url = p => seo.canonicalUrl(origin, p);
  const paths = seo.indexablePaths;

  // ---- sitemap.xml / robots.txt -------------------------------------------------------------------------------
  // No <lastmod>: the project has no reliable per-page modification dates, and a wrong lastmod is worse than none.
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${paths.map(p => `  <url><loc>${esc(url(p))}</loc></url>`).join("\n")}\n</urlset>\n`;
  const robots = `User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n`;
  if (publicOnly) {
    fs.writeFileSync(path.join(pub, "sitemap.xml"), sitemap); fs.writeFileSync(path.join(pub, "robots.txt"), robots);
    console.log(`[seo] wrote public/sitemap.xml (${paths.length} URLs) and public/robots.txt for ${origin}`); return;
  }

  // ---- structured data (JSON-LD) -------------------------------------------------------------------------------
  const PERSON = `${origin}/#person`, SITE = `${origin}/#website`;
  const person = {
    "@type": "Person", "@id": PERSON, name: profile.name.en, alternateName: [profile.name.ar, "مُخْتَلِف"], url: url("/"), image: `${origin}/omar.jpg`,
    description: profile.intro.en, sameAs: [profile.github, profile.linkedin], knowsAbout: aboutSkills.en, knowsLanguage: ["ar", "en"],
  };
  const website = { "@type": "WebSite", "@id": SITE, url: url("/"), name: "Omar Ahmed | Portfolio", alternateName: "مُخْتَلِف | Different", description: seo.pageSeo["/"].desc.en, inLanguage: ["en", "ar"], publisher: { "@id": PERSON } };
  const crumb = (p, items) => ({ "@type": "BreadcrumbList", "@id": `${url(p)}#breadcrumb`, itemListElement: items.map(([name, path], i) => ({ "@type": "ListItem", position: i + 1, name, item: url(path) })) });
  const projectBySlug = s => projects.find(x => x.slug === s);
  const code = (id, x, repo) => ({ "@type": "SoftwareSourceCode", "@id": id, name: x.title.en, description: x.summary.en, programmingLanguage: { "@type": "ComputerLanguage", name: "C++" }, ...(repo ? { codeRepository: repo } : {}), keywords: x.tech.join(", "), author: { "@id": PERSON } });

  function jsonLd(p) {
    const m = seo.pageSeo[p], pageUrl = url(p);
    const page = { "@id": `${pageUrl}#webpage`, url: pageUrl, name: m.title.en, description: m.desc.en, inLanguage: ["en", "ar"], isPartOf: { "@id": SITE }, breadcrumb: { "@id": `${pageUrl}#breadcrumb` }, primaryImageOfPage: { "@type": "ImageObject", url: `${origin}${seo.OG_IMAGE.path}`, width: seo.OG_IMAGE.width, height: seo.OG_IMAGE.height } };
    const graph = [website, person];
    const home = ["Home", "/"];
    if (p === "/") graph.push({ "@type": "WebPage", ...page, about: { "@id": PERSON } }, crumb(p, [home]));
    else if (p === "/about") graph.push({ "@type": "ProfilePage", ...page, mainEntity: { "@id": PERSON } }, crumb(p, [home, ["About", p]]));
    else if (p === "/projects") graph.push({ "@type": "CollectionPage", ...page, mainEntity: { "@type": "ItemList", itemListElement: projects.map((x, i) => ({ "@type": "ListItem", position: i + 1, name: x.title.en, url: url(`/projects/${x.slug}`) })) } }, crumb(p, [home, ["Projects", "/projects"]]));
    else if (p === "/certificates") graph.push({ "@type": "CollectionPage", ...page }, crumb(p, [home, ["Certificates", p]]));
    else if (p === "/contact") graph.push({ "@type": "ContactPage", ...page }, crumb(p, [home, ["Contact", p]]));
    else { // project detail pages: SoftwareSourceCode built only from data.ts (title, summary, tech, repository links)
      const x = projectBySlug(p.split("/").pop()), id = `${pageUrl}#software`;
      const sw = code(id, x, x.repo);
      if (x.versions) sw.hasPart = x.versions.map(v => code(`${pageUrl}#${v.id}`, v, v.repo));
      graph.push({ "@type": "WebPage", ...page, mainEntity: { "@id": id } }, sw, crumb(p, [home, ["Projects", "/projects"], [x.title.en, p]]));
    }
    return { "@context": "https://schema.org", "@graph": graph };
  }

  // ---- <noscript> text version of each page (bilingual: the site switches language on the client, on the same URL) -----
  const A = (href, text) => `<a href="${esc(href)}">${esc(text)}</a>`;
  const ul = items => `<ul>${items.map(i => `<li>${i}</li>`).join("")}</ul>`;
  const projectLine = (x, lang) => `${A(`/projects/${x.slug}`, x.title[lang])} — ${esc(x.summary[lang])} (${esc(x.tech.join(", "))})`;
  function section(p, lang) {
    const t = l => l[lang], m = seo.pageSeo[p];
    const dir = lang === "ar" ? "rtl" : "ltr";
    let h = "";
    if (p === "/") h = `<h1>${esc(t(profile.name))}</h1><p>${esc(t(profile.headline))}</p><p>${esc(t(profile.intro))}</p><h2>${esc(t(ui.projects))}</h2>${ul(featuredSlugs.map(s => projectLine(projectBySlug(s), lang)))}<h2>${esc(t(ui.strengths))}</h2>${ul(strengths[lang].map(esc))}`;
    else if (p === "/about") h = `<h1>${esc(t(ui.aboutH))}</h1><p>${esc(t(ui.bio))}</p><h2>${esc(t(ui.edu))}</h2><p>${esc(t(ui.uni))} — ${esc(t(ui.faculty))}</p><h2>${esc(t(ui.skills))}</h2>${ul(aboutSkills[lang].map(esc))}<h2>${esc(t(ui.ps))}</h2><p>${esc(t(ui.psText))}</p><h2>${esc(t(ui.cl))}</h2><p>${esc(t(ui.clText))}</p><h2>${esc(t(ui.vol))}</h2><p>${esc(t(ui.volText))}</p>`;
    else if (p === "/projects") h = `<h1>${esc(t(ui.projectsH1))}</h1><p>${esc(t(m.desc))}</p>${ul(projects.map(x => projectLine(x, lang)))}`;
    else if (p === "/certificates") h = `<h1>${esc(t(ui.certificates))}</h1><p>${esc(t(m.desc))}</p>${ul([ui.catProgramming, ui.catAi, ui.catPersonal, ui.catOther].map(l => esc(t(l))))}`;
    else if (p === "/contact") h = `<h1>${esc(t(ui.contact))}</h1><p>${esc(t(m.desc))}</p>${ul([A(profile.github, "GitHub"), A(profile.linkedin, "LinkedIn")])}`;
    else {
      const x = projectBySlug(p.split("/").pop());
      h = `<h1>${esc(t(x.title))}</h1><p>${esc(t(x.summary))}</p><h2>${esc(t(ui.purpose))}</h2><p>${esc(t(x.purpose))}</p>`;
      if (x.versions) h += `<h2>${esc(t(ui.versions))}</h2>${x.versions.map(v => `<h3>${esc(t(v.title))}</h3><p>${esc(t(v.summary))}</p>${ul(t(v.features).map(esc))}<p>${esc(t(ui.tech))}: ${esc(v.tech.join(", "))}</p>${v.duration ? `<p>${esc(t(ui.time))}: ${esc(t(v.duration))}</p>` : ""}<p>${A(v.repo, `${t(ui.repo)} — ${t(v.title)}`)}</p>`).join("")}` + (x.evolution ? `<h2>${esc(t(ui.evolution))}</h2>${ul(t(x.evolution).map(esc))}` : "");
      else h += `<h2>${esc(t(ui.features))}</h2>${ul(t(x.features).map(esc))}<h2>${esc(t(ui.tech))}</h2><p>${esc(x.tech.join(", "))}</p><p>${A(x.repo, `${t(ui.repo)} — ${t(x.title)}`)}</p>`;
      h += `<h2>${esc(t(ui.learned))}</h2><p>${esc(t(x.learned))}</p>${x.duration ? `<p>${esc(t(ui.time))}: ${esc(t(x.duration))}</p>` : ""}<p>${A("/projects", t(ui.projectsH1))}</p>`;
    }
    return `<section lang="${lang}" dir="${dir}">${h}</section>`;
  }
  const navLinks = lang => ul([["/", ui.home], ["/projects", ui.projects], ["/certificates", ui.certificates], ["/about", ui.about], ["/contact", ui.contact]].map(([href, l]) => A(href, l[lang])));
  const noscript = p => `<noscript><div style="max-width:760px;margin:0 auto;padding:24px;font:16px/1.6 system-ui,sans-serif"><p>This portfolio is an interactive app. A plain-text version of this page follows. · هذه الصفحة تفاعلية، وفيما يلي نسخة نصية منها.</p><nav aria-label="Main">${navLinks("en")}</nav>${section(p, "en")}${section(p, "ar")}</div></noscript>`;

  // ---- per-route static HTML ---------------------------------------------------------------------------------------
  const indexFile = path.join(dist, "index.html");
  if (!fs.existsSync(indexFile)) throw new Error("dist/index.html not found: run `vite build` first");
  // Idempotent: drop anything a previous run injected (marked with seo comments) so the step can be re-run on the same dist/.
  const template = fs.readFileSync(indexFile, "utf8").replace(/<!--seo:head-->[\s\S]*?<!--\/seo:head-->\n?/g, "").replace(/<!--seo:noscript-->[\s\S]*?<!--\/seo:noscript-->\n?/g, "");
  const img = `${origin}${seo.OG_IMAGE.path}`;
  const meta = (k, v, prop) => `<meta ${prop ? "property" : "name"}="${k}" content="${esc(v)}"/>`;
  let count = 0;
  for (const p of paths) {
    const m = seo.pageSeo[p], title = m.title.en, desc = m.desc.en, pageUrl = url(p);
    const headBlock = [
      `<link rel="canonical" href="${esc(pageUrl)}"/>`,
      meta("robots", "index, follow, max-image-preview:large, max-snippet:-1"),
      meta("author", "Omar Ahmed"),
      meta("og:type", "website", 1), meta("og:site_name", seo.SITE_NAME, 1), meta("og:locale", "en_US", 1), meta("og:locale:alternate", "ar_AR", 1),
      meta("og:url", pageUrl, 1), meta("og:title", title, 1), meta("og:description", desc, 1),
      meta("og:image", img, 1), meta("og:image:type", seo.OG_IMAGE.type, 1), meta("og:image:width", String(seo.OG_IMAGE.width), 1), meta("og:image:height", String(seo.OG_IMAGE.height), 1), meta("og:image:alt", seo.OG_IMAGE.alt.en, 1),
      meta("twitter:card", "summary_large_image"), meta("twitter:title", title), meta("twitter:description", desc), meta("twitter:image", img), meta("twitter:image:alt", seo.OG_IMAGE.alt.en),
      ...(p === "/" ? [`<link rel="preload" as="image" href="/omar.jpg" fetchpriority="high"/>`] : []), // the hero portrait is the largest element on the home page
      `<script type="application/ld+json">${jsonForHtml(jsonLd(p))}</script>`,
    ].join("\n");
    let html = template
      .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(title)}</title>`)
      .replace(/<meta name="description"[^>]*>/, meta("description", desc))
      .replace(/<meta property="og:[^>]*>/g, "")                      // replaced by the complete block below
      .replace("</head>", `<!--seo:head-->\n${headBlock}\n<!--/seo:head-->\n</head>`)
      .replace('<div id="root"></div>', `<div id="root"></div>\n<!--seo:noscript-->${noscript(p)}<!--/seo:noscript-->`);
    if (!html.includes(`href="${pageUrl}"`) || !html.includes("<noscript>")) throw new Error(`shell for ${p} was not generated correctly`);
    const file = p === "/" ? indexFile : path.join(dist, p.slice(1), "index.html");
    fs.mkdirSync(path.dirname(file), { recursive: true }); fs.writeFileSync(file, html); count++;
  }
  fs.writeFileSync(path.join(dist, "sitemap.xml"), sitemap); fs.writeFileSync(path.join(dist, "robots.txt"), robots);
  console.log(`[seo] origin ${origin}${process.env.SITE_URL ? " (SITE_URL)" : process.env.VERCEL_PROJECT_PRODUCTION_URL ? " (Vercel production URL)" : " (FALLBACK_SITE_URL in src/seo.ts, unverified)"}`);
  console.log(`[seo] generated ${count} route pages + sitemap.xml + robots.txt in dist/`);
}

main().catch(err => {
  console.error("[seo] FAILED:", err);
  if (process.env.SEO_STRICT === "1") process.exit(1);
  console.error("[seo] The site itself still builds and works, but the per-route SEO pages/sitemap were NOT generated. Set SEO_STRICT=1 to make this a build error.");
});
