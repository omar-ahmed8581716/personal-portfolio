// SEO single source of truth, shared by the app (runtime) and by `scripts/seo-build.mjs` (build time).
// Keep this file free of React and of any top-level DOM access: the build script loads it under Node.
import type { L } from "./data";

export type Lang = "en" | "ar";
export type PageSeo = { title: L; desc: L };

/**
 * Canonical origin used when the build is NOT run on Vercel and no `SITE_URL` is set.
 * This is the production URL the owner mentioned earlier (recorded in PORTFOLIO_HANDOFF.md). It was NOT verified.
 * On Vercel the real origin is taken from `VERCEL_PROJECT_PRODUCTION_URL` automatically (it also switches to a custom domain once one is added).
 * To force a value, set the `SITE_URL` environment variable (for example `https://example.com`) or edit this constant.
 */
export const FALLBACK_SITE_URL = "https://omar-ahmed-portfolio-pi.vercel.app";

export function resolveOrigin(env: Record<string, string | undefined> = {}): string {
  const raw = env.SITE_URL?.trim() || (env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${env.VERCEL_PROJECT_PRODUCTION_URL.trim()}` : "") || FALLBACK_SITE_URL;
  const url = new URL(/^https?:\/\//i.test(raw) ? raw : `https://${raw}`);
  return url.origin; // no path, no trailing slash
}

export const SITE_NAME = "Omar Ahmed | مُخْتَلِف";
export const OG_IMAGE = { path: "/og-image.jpg", width: 1200, height: 630, type: "image/jpeg", alt: { en: "Omar Ahmed, computer science student and aspiring full-stack developer. Brand: مُخْتَلِف | Different", ar: "عمر أحمد، طالب علوم حاسب يطمح ليصبح مطور Full Stack. العلامة: مُخْتَلِف | Different" } as L };

// One entry per indexable URL. The key is the canonical path (no trailing slash, no query string).
export const pageSeo: Record<string, PageSeo> = {
  "/": {
    title: { en: "Omar Ahmed | Aspiring Full-Stack Developer Portfolio", ar: "عمر أحمد | بورتفوليو مبرمج ومطور Full Stack طموح" },
    desc: { en: "Portfolio of Omar Ahmed, a computer science student in Cairo, Egypt and aspiring full-stack developer. See C++ projects, certificates and problem solving.", ar: "بورتفوليو عمر أحمد، طالب علوم حاسب في القاهرة يطمح لأن يصبح مطور ويب Full Stack. استعرض مشاريع C++ والشهادات وأعمال حل المشكلات." },
  },
  "/about": {
    title: { en: "About Omar Ahmed | CS Student & Aspiring Full-Stack Developer", ar: "عن عمر أحمد | طالب علوم حاسب ومطور Full Stack طموح" },
    desc: { en: "Omar Ahmed is a second-year computer science student at Al-Azhar University, Cairo, focused on C++, data structures, algorithms and problem solving.", ar: "عمر أحمد طالب علوم حاسب في السنة الثانية بجامعة الأزهر بالقاهرة، يركّز على C++ وهياكل البيانات والخوارزميات وحل المشكلات." },
  },
  "/projects": {
    title: { en: "C++ Projects by Omar Ahmed | Bank System & Expense Tracker", ar: "مشاريع برمجة C++ لعمر أحمد | نظام بنك ومتتبع مصروفات" },
    desc: { en: "C++ console projects by Omar Ahmed: a bank management system, expense tracker, math quiz and rock paper scissors game, built with file handling and functions.", ar: "مشاريع سطر أوامر بلغة سي بلس بلس (C++) لعمر أحمد: نظام إدارة بنك ومتتبع مصروفات واختبار رياضيات ولعبة حجر ورقة مقص، باستخدام الملفات والدوال." },
  },
  "/projects/bank-system": {
    title: { en: "C++ Bank Management System (2 Versions) | Omar Ahmed", ar: "نظام إدارة بنك بلغة C++ (نسختان) | عمر أحمد" },
    desc: { en: "C++ console bank management system in two versions: a client manager and an advanced one with client/staff portals, permissions and registration approval.", ar: "نظام بنكي بلغة C++ على سطر الأوامر بنسختين: إدارة سجلات العملاء، ونسخة متقدمة ببوابتين للعملاء والموظفين وصلاحيات وموافقة على طلبات التسجيل." },
  },
  "/projects/expense-tracker": {
    title: { en: "C++ Expense Tracker Project | Omar Ahmed", ar: "مشروع متتبع المصروفات بلغة C++ | عمر أحمد" },
    desc: { en: "C++ console expense tracker for personal expense management: income and expense transactions, overdraft protection, search and monthly and yearly statistics.", ar: "متتبع مصروفات بلغة C++ على سطر الأوامر: معاملات الدخل والمصروفات وحماية من السحب الزائد والبحث والحذف وإحصاءات شهرية وسنوية." },
  },
  "/projects/math-quiz": {
    title: { en: "C++ Math Quiz Project (Console App) | Omar Ahmed", ar: "مشروع اختبار الرياضيات بلغة C++ | عمر أحمد" },
    desc: { en: "C++ console math quiz that generates arithmetic questions across difficulty levels with colored feedback, built with modular functions, structs and enums.", ar: "اختبار رياضيات بلغة C++ على سطر الأوامر يولّد أسئلة حسابية بمستويات صعوبة مختلفة مع تغذية راجعة ملوّنة، باستخدام الدوال وstructs وenums." },
  },
  "/projects/rock-paper-scissors": {
    title: { en: "C++ Rock Paper Scissors Game | Omar Ahmed", ar: "لعبة حجر ورقة مقص بلغة C++ | عمر أحمد" },
    desc: { en: "C++ rock paper scissors console game played against the computer, with input validation and colored results, built from small connected functions.", ar: "لعبة حجر ورقة مقص بلغة C++ على سطر الأوامر ضد الحاسوب، مع التحقق من المدخلات ونتائج ملوّنة، مبنية من دوال صغيرة مترابطة." },
  },
  "/certificates": {
    title: { en: "Programming & AI Certificates | Omar Ahmed", ar: "شهادات البرمجة والذكاء الاصطناعي | عمر أحمد" },
    desc: { en: "Certificates and technical training completed by Omar Ahmed in programming and problem solving, artificial intelligence, personal development and other fields.", ar: "شهادات وتدريبات أنجزها عمر أحمد في البرمجة وحل المشكلات والذكاء الاصطناعي وتطوير الذات ومجالات أخرى." },
  },
  "/contact": {
    title: { en: "Contact Omar Ahmed | Email, WhatsApp & Telegram", ar: "تواصل مع عمر أحمد | واتساب وبريد وتيليجرام" },
    desc: { en: "Contact Omar Ahmed through WhatsApp, email, phone, Telegram, LinkedIn, GitHub, or Facebook.", ar: "تواصل مع عمر أحمد عبر واتساب أو البريد أو الهاتف أو تيليجرام أو لينكدإن أو جيت هاب أو فيسبوك." },
  },
};

/** Indexable canonical paths, in sitemap order. */
export const indexablePaths = Object.keys(pageSeo);

/** "/projects/" -> "/projects"; the query string and hash are never part of the canonical path. */
export const normalizePath = (pathname: string) => { const p = pathname.split(/[?#]/)[0].replace(/\/+$/, ""); return p === "" ? "/" : p; };
export const seoFor = (pathname: string): PageSeo | null => pageSeo[normalizePath(pathname)] ?? null;
export const canonicalUrl = (origin: string, path: string) => (path === "/" ? `${origin}/` : `${origin}${path}`);

// ---------------------------------------------------------------------------------------------
// Runtime: keep the <head> in sync during client-side navigation / language switches.
// The static HTML for each route (generated at build time) already carries the same tags for crawlers that don't run JavaScript.
// ---------------------------------------------------------------------------------------------
let knownOrigin: string | null | undefined;
function head<K extends keyof HTMLElementTagNameMap>(tag: K, attrs: Record<string, string>, set: Record<string, string>) {
  const sel = `${tag}${Object.entries(attrs).map(([k, v]) => `[${k}="${v}"]`).join("")}`;
  let el = document.head.querySelector<HTMLElement>(sel);
  if (!el) { el = document.createElement(tag); Object.entries(attrs).forEach(([k, v]) => el!.setAttribute(k, v)); document.head.appendChild(el); }
  Object.entries(set).forEach(([k, v]) => el!.setAttribute(k, v));
}

/**
 * Returns false when the route has no SEO entry (404 or an unknown project): the page is then marked `noindex`.
 * `tabTitle` only changes the browser-tab title (used for the certificate category views, which share one canonical URL).
 */
export function applySeo(pathname: string, lang: Lang, tabTitle?: string): boolean {
  const meta = seoFor(pathname);
  if (knownOrigin === undefined) { const c = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]'); knownOrigin = c ? new URL(c.href).origin : null; }
  const set = (name: string, content: string, prop = false) => head("meta", { [prop ? "property" : "name"]: name }, { content });
  const canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!meta) { // soft-404 protection: unknown URLs must not be indexed or canonicalised to the homepage
    set("robots", "noindex, follow"); canonical?.remove(); document.head.querySelector('meta[property="og:url"]')?.remove();
    return false;
  }
  const title = tabTitle ? `${tabTitle} | Omar Ahmed` : meta.title[lang], desc = meta.desc[lang];
  document.title = title;
  set("description", desc); set("robots", "index, follow, max-image-preview:large, max-snippet:-1");
  set("og:title", title, true); set("og:description", desc, true); set("og:locale", lang === "ar" ? "ar_AR" : "en_US", true);
  set("twitter:title", title); set("twitter:description", desc);
  if (knownOrigin) { // the canonical origin is only known when the page came from a generated shell (not in `npm run dev`)
    const url = canonicalUrl(knownOrigin, normalizePath(pathname));
    head("link", { rel: "canonical" }, { href: url }); set("og:url", url, true);
  }
  return true;
}
