import { useCallback, useEffect, useLayoutEffect, useRef, useState, type ChangeEvent, type FormEvent, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { Link, NavLink, Route, Routes, useParams, useLocation, useSearchParams } from "react-router-dom";
import { FaWhatsapp, FaLinkedinIn, FaGithub, FaTelegramPlane, FaFacebookF, FaPhoneAlt, FaEnvelope, FaSun, FaMoon, FaSearchPlus, FaTimes, FaGlobe, FaCopy, FaCheck } from "react-icons/fa";
import { Brand } from "./brand";
import { applySeo } from "./seo";
import { profile as p, projects, featuredSlugs, strengths, aboutSkills, certificates, certCategories, type Project, type L, type Certificate, type CertCategory } from "./data";
import { useT, ui } from "./i18n";
import { useTheme } from "./theme";

function Page({ title, desc, tabTitle, children }: { title: L; desc: L; tabTitle?: L; children: ReactNode }) {
  const { pathname } = useLocation();
  const { t, lang } = useT();
  useEffect(() => {
    // Titles, descriptions, canonical, Open Graph and robots come from src/seo.ts (the same data the build uses for the static HTML of each route).
    // Unknown routes (404, unknown project slug) have no SEO entry: they are marked noindex and keep a plain title.
    if (!applySeo(pathname, lang, tabTitle ? t(tabTitle) : undefined)) {
      document.title = `${t(title)} | ${t(p.name)}`;
      document.querySelector('meta[name="description"]')?.setAttribute("content", t(desc));
    }
  }, [pathname, lang, title, desc, tabTitle, t]);
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]); // block body: effects must not return a value
  // Staggered fade + slide-up entrance as elements scroll into view
  useLayoutEffect(() => {
    const els = document.querySelectorAll("main > *:not(.hero), .hero > div > *, .grid > *, .cgrid > *, .dock > *");
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: 0.1 });
    els.forEach(el => { el.classList.add("reveal"); (el as HTMLElement).style.setProperty("--d", `${Math.min(Array.from(el.parentElement!.children).indexOf(el), 6) * 90}ms`); io.observe(el); });
    return () => io.disconnect();
  }, [pathname]);
  return <main id="main" className="wrap">{children}</main>;
}
const Ext = ({ href, children }: { href: string; children: ReactNode }) => <a href={href} target="_blank" rel="noopener noreferrer">{children}</a>;
function RepoLink({ href, ghost, name }: { href: string; ghost?: boolean; name?: L }) {
  const { t } = useT();
  return <a className={ghost ? "btn ghost" : "btn"} href={href} target="_blank" rel="noopener noreferrer"><FaGithub aria-hidden />{t(ui.repo)}{name && <span className="vh"> — {t(name)}</span>}</a>;
}
const Tags = ({ items, big }: { items: string[]; big?: boolean }) => <ul className={big ? "tags big" : "tags"}>{items.map(i => <li key={i}>{i}</li>)}</ul>;

function Card({ x }: { x: Project }) {
  const { t } = useT();
  return <article className="card"><h3>{t(x.title)}</h3><p>{t(x.summary)}</p><Tags items={x.tech} />
    <div className="row"><Link className="btn" to={`/projects/${x.slug}`}>{t(ui.details)}<span className="vh"> — {t(x.title)}</span></Link>{x.repo && <RepoLink href={x.repo} ghost name={x.title} />}</div></article>;
}
const featured = featuredSlugs.map(s => projects.find(q => q.slug === s)).filter((q): q is Project => !!q);
const Grid = ({ items, three }: { items: Project[]; three?: boolean }) => <div className={three ? "grid three" : "grid"}>{items.map(x => <Card key={x.slug} x={x} />)}</div>;

function Home() {
  const { t, lang } = useT();
  return <Page title={ui.home} desc={{ en: "Omar Ahmed, computer science student and aspiring full-stack developer. Explore my four C++ projects.", ar: "عمر أحمد، طالب علوم حاسب يطمح ليصبح مطوّر برمجيات متكاملًا. استكشف مشاريعي الأربعة بلغة C++." }}>
    <section className="hero"><div><h1>{t(p.name)}</h1><p className="lead">{t(p.headline)}</p><p>{t(p.intro)}</p>
      <div className="row"><Link className="btn" to="/projects">{t(ui.explore)}</Link><Link className="btn ghost" to="/contact">{t(ui.contactMe)}</Link></div></div>
      <img className="portrait" src="/omar.jpg" alt={t(ui.portraitAlt)} width="320" height="320" /></section>
    <section><h2>{t(ui.projects)}</h2><Grid three items={featured} /><div className="center"><Link className="btn ghost" to="/projects">{t(ui.viewAll)}</Link></div></section>
    <section><h2>{t(ui.strengths)}</h2><Tags big items={t(strengths)} /><p><Link className="tlink" to="/about">{t(ui.moreAbout)} {lang === "ar" ? "←" : "→"}</Link></p></section>
  </Page>;
}
function Projects() { const { t } = useT(); return <Page title={ui.projects} desc={{ en: "Four C++ console projects by Omar Ahmed.", ar: "أربعة مشاريع سطر أوامر بلغة C++ من تنفيذ عمر أحمد." }}><h1>{t(ui.projectsH1)}</h1><h2 className="vh">{t(ui.projectsList)}</h2><Grid items={projects} /></Page>; }

function Detail() {
  const { t, lang } = useT();
  const x = projects.find(q => q.slug === useParams().slug);
  if (!x) return <NotFound />;
  return <Page title={x.title} desc={x.summary}>
    <p><Link className="tlink" to="/projects">{lang === "ar" ? "→" : "←"} {t(ui.back)}</Link></p><h1>{t(x.title)}</h1><p className="lead">{t(x.summary)}</p>
    <h2>{t(ui.purpose)}</h2><p>{t(x.purpose)}</p>
    {x.versions ? <>
      <h2>{t(ui.versions)}</h2><p>{t(ui.versionsIntro)}</p>
      <div className="grid vers">{x.versions.map(v => <article key={v.id} className="card ver">
        <span className="chip">{t(v.label)}</span><h3>{t(v.title)}</h3><p>{t(v.summary)}</p>
        <h4>{t(ui.features)}</h4><ul>{t(v.features).map(f => <li key={f}>{f}</li>)}</ul>
        <h4>{t(ui.tech)}</h4><Tags items={v.tech} />
        {v.duration && <p><strong>{t(ui.time)}:</strong> {t(v.duration)}</p>}
        <div className="row"><RepoLink href={v.repo} name={v.title} /></div></article>)}</div>
      {x.evolution && <><h2>{t(ui.evolution)}</h2><ul>{t(x.evolution).map(f => <li key={f}>{f}</li>)}</ul></>}
    </> : <>
      <h2>{t(ui.features)}</h2><ul>{t(x.features).map(f => <li key={f}>{f}</li>)}</ul>
      <h2>{t(ui.tech)}</h2><Tags items={x.tech} />
    </>}
    <h2>{t(ui.learned)}</h2><p>{t(x.learned)}</p>{x.duration && <p><strong>{t(ui.time)}:</strong> {t(x.duration)}</p>}
    {(x.repo || x.demo) && <div className="row">{x.repo && <RepoLink href={x.repo} name={x.title} />}{x.demo && <Ext href={x.demo}>Live demo</Ext>}</div>}
  </Page>;
}

// ---- Certificates page: category filter, certificate cards and a readable full-size viewer ----
const catLabel: Record<CertCategory, L> = { programming: ui.catProgramming, ai: ui.catAi, personal: ui.catPersonal, other: ui.catOther };
const catEmoji: Record<CertCategory, string> = { programming: "💻", ai: "🤖", personal: "🌱", other: "🌍" };
function CertViewer({ c, onClose, returnTo }: { c: Certificate; onClose: () => void; returnTo: { current: HTMLElement | null } }) {
  const { t } = useT();
  const box = useRef<HTMLDivElement>(null), closeBtn = useRef<HTMLButtonElement>(null);
  // Lock page scroll, focus the close button, close with Escape, keep Tab inside the dialog, restore focus afterwards
  useEffect(() => {
    const prev = document.body.style.overflow; document.body.style.overflow = "hidden"; closeBtn.current?.focus();
    const back = returnTo.current;
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") { onClose(); return; }
      if (e.key !== "Tab" || !box.current) return;
      const f = Array.from(box.current.querySelectorAll<HTMLElement>("button, a[href]")), first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    addEventListener("keydown", key);
    return () => { document.body.style.overflow = prev; removeEventListener("keydown", key); back?.focus(); };
  }, [onClose, returnTo]);
  const src = `/certificates/${c.id}.webp`, full = c.pdf ? `/certificates/${c.id}.pdf` : src;
  return createPortal(<div className="lb cert-view" onClick={onClose}>
    <div ref={box} role="dialog" aria-modal="true" aria-label={t(c.title)} className="cv" onClick={e => e.stopPropagation()}>
      <button ref={closeBtn} type="button" className="x" aria-label={t(ui.closeDialog)} onClick={onClose}><FaTimes aria-hidden /></button>
      <figure><img src={src} alt={`${t(c.title)} - ${t(c.issuer)}`} />
        <figcaption><span dir="auto">{t(c.title)}</span><a href={full} target="_blank" rel="noopener noreferrer">{t(c.pdf ? ui.certOpenPdf : ui.certOpenFull)}</a></figcaption></figure>
    </div></div>, document.body);
}
function Certificates() {
  const { t, lang } = useT();
  const [params] = useSearchParams();
  const raw = params.get("cat") === "volunteering" ? "other" : params.get("cat"); // old links to the removed volunteering category land on Other Fields
  const active = certCategories.find(k => k === raw) ?? null;
  const [open, setOpen] = useState<Certificate | null>(null);
  const trigger = useRef<HTMLElement | null>(null);
  const closeViewer = useCallback(() => setOpen(null), []);
  const list = active ? certificates.filter(c => !c.review && c.category === active) : []; // `review: true` entries stay hidden until approved
  return <Page key={active ?? "all"} title={ui.certificates} tabTitle={active ? catLabel[active] : undefined} desc={{ en: "Certificates and completed courses of Omar Ahmed in programming, artificial intelligence, and personal development.", ar: "شهادات ودورات أنجزها عمر أحمد في البرمجة والذكاء الاصطناعي وتطوير الذات." }}>
    {active ? <>
      <p><Link className="tlink" to="/certificates">{lang === "ar" ? "→" : "←"} {t(ui.certBack)}</Link></p>
      <h1><span className="emo" aria-hidden="true">{catEmoji[active]}</span> {t(catLabel[active])}</h1>
      <div className="grid certnames">{list.map(c =>
        <button key={c.id} type="button" className="cname" aria-label={`${t(ui.certView)}: ${t(c.title)}`} onClick={e => { trigger.current = e.currentTarget; setOpen(c); }}><span dir="auto">{t(c.title)}</span></button>)}</div>
    </> : <>
      <h1 className="ctr">{t(ui.certificates)}</h1>
      <div className="grid cats">{certCategories.map(k =>
        <Link key={k} to={`/certificates?cat=${k}`} className="catcard"><span className="emo" aria-hidden="true">{catEmoji[k]}</span><span className="nm">{t(catLabel[k])}</span></Link>)}</div>
    </>}
    {open && <CertViewer c={open} onClose={closeViewer} returnTo={trigger} />}
  </Page>;
}
function About() {
  const { t, lang } = useT();
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null), closeBtn = useRef<HTMLButtonElement>(null);
  const [certOpen, setCertOpen] = useState(false), certTrigger = useRef<HTMLElement | null>(null);
  const volCert = certificates.find(c => c.id === "ydp-ctrl-your-future")!; // same asset as the Other Fields certificate
  // Lightbox: lock page scroll, focus the close button, close with Escape, return focus afterwards
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow; document.body.style.overflow = "hidden"; closeBtn.current?.focus();
    const key = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    addEventListener("keydown", key);
    return () => { document.body.style.overflow = prev; removeEventListener("keydown", key); trigger.current?.focus(); };
  }, [open]);
  return <Page title={ui.about} desc={{ en: "Education, skills, volunteering, and recognition of Omar Ahmed.", ar: "التعليم والمهارات والعمل التطوعي والتكريم لعمر أحمد." }}>
    <h1>{t(ui.aboutH)}</h1><p>{t(ui.bio)}</p>
    <h2>{t(ui.edu)}</h2><p><strong>{t(ui.uni)}</strong><br />{t(ui.faculty)}</p>
    <h2>{t(ui.skills)}</h2><Tags big items={t(aboutSkills)} />
    <h2>{t(ui.ps)}</h2><p>{t(ui.psText)}</p>
    <h2>{t(ui.cl)}</h2><p>{t(ui.clText)}</p>
    <h2>{t(ui.vol)}</h2>
    <p>{t(ui.volText)}</p>
    <div className="vmedia">
      <figure className="award"><button type="button" ref={trigger} className="zoom" onClick={() => setOpen(true)} aria-label={t(ui.enlarge)}>
        <img src="/best-members.jpg" loading="lazy" width="300" height="300" alt={t(ui.awardAlt)} /><FaSearchPlus aria-hidden /></button>
        <figcaption><strong>{t(ui.award)}</strong></figcaption></figure>
      <figure className="award"><button type="button" className="zoom" onClick={e => { certTrigger.current = e.currentTarget; setCertOpen(true); }} aria-label={`${t(ui.certView)}: ${t(volCert.title)}`}>
        <img src={`/certificates/${volCert.id}.webp`} loading="lazy" width="1600" height="1164" alt={`${t(volCert.title)} - ${t(volCert.issuer)}`} /><FaSearchPlus aria-hidden /></button>
        <figcaption><strong dir="auto">{t(volCert.title)}</strong></figcaption></figure></div>
    <p><Link className="tlink" to="/certificates?cat=other">{t(ui.volCert)} {lang === "ar" ? "←" : "→"}</Link></p>
    {open && createPortal(<div className="lb" role="dialog" aria-modal="true" aria-label={t(ui.award)} onClick={() => setOpen(false)} onKeyDown={e => { if (e.key === "Tab") e.preventDefault(); }}>
      <button ref={closeBtn} type="button" className="x" aria-label={t(ui.close)} onClick={() => setOpen(false)}><FaTimes aria-hidden /></button>
      <figure onClick={e => e.stopPropagation()}><img src="/best-members.jpg" alt={t(ui.awardAlt)} /><figcaption>{t(ui.award)}</figcaption></figure></div>, document.body)}
    {certOpen && <CertViewer c={volCert} onClose={() => setCertOpen(false)} returnTo={certTrigger} />}
  </Page>;
}

type Ch = "wa" | "mail";
// Detect the language of what the visitor typed: more Arabic letters than Latin letters means Arabic.
// If there are no letters at all, fall back to the language the website is showing.
function detectLang(text: string, fallback: "en" | "ar"): "en" | "ar" {
  const ar = (text.match(/[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/g) || []).length;
  const en = (text.match(/[A-Za-z]/g) || []).length;
  return ar === en ? fallback : ar > en ? "ar" : "en";
}
function Field(props: { id: string; label: string; err?: string; area?: boolean; value: string; onChange: (v: string) => void; onBlur: () => void; placeholder: string; type?: string; ltr?: boolean }) {
  const { id, label, err, area, value, onChange, onBlur, placeholder, type = "text", ltr } = props;
  const c = { id, value, placeholder, onBlur, "aria-invalid": !!err, "aria-describedby": err ? `${id}-e` : undefined, dir: ltr ? "ltr" : undefined,
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange(e.target.value) };
  return <div className={err ? "field bad" : "field"}><label htmlFor={id}>{label}</label>{area ? <textarea rows={5} {...c} /> : <input type={type} {...c} />}
    {err && <small id={`${id}-e`} role="alert">{err}</small>}</div>;
}

// Small accessible dialog that shows the email address with a Copy button
function EmailDialog({ onClose, returnTo }: { onClose: () => void; returnTo: { current: HTMLElement | null } }) {
  const { t } = useT();
  const [status, setStatus] = useState<"idle" | "ok" | "fail">("idle");
  const box = useRef<HTMLDivElement>(null), copyBtn = useRef<HTMLButtonElement>(null);
  // Lock page scroll, focus the Copy button, close with Escape, keep Tab inside the dialog, restore focus on close
  useEffect(() => {
    const prev = document.body.style.overflow; document.body.style.overflow = "hidden"; copyBtn.current?.focus();
    const back = returnTo.current;
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") { onClose(); return; }
      if (e.key !== "Tab" || !box.current) return;
      const f = Array.from(box.current.querySelectorAll<HTMLElement>("button, a[href]")), first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    addEventListener("keydown", key);
    return () => { document.body.style.overflow = prev; removeEventListener("keydown", key); back?.focus(); };
  }, [onClose, returnTo]);
  useEffect(() => {
    if (status === "idle") return;
    const id = setTimeout(() => setStatus("idle"), 3500);
    return () => clearTimeout(id);
  }, [status]);
  const copy = async () => {
    try { await navigator.clipboard.writeText(p.email); setStatus("ok"); }
    catch { // clipboard API unavailable (older browser or insecure page): try the legacy way
      try {
        const ta = document.createElement("textarea"); ta.value = p.email; ta.readOnly = true; ta.style.cssText = "position:fixed;opacity:0";
        document.body.appendChild(ta); ta.select(); const ok = document.execCommand("copy"); document.body.removeChild(ta); setStatus(ok ? "ok" : "fail");
      } catch { setStatus("fail"); }
    }
  };
  return createPortal(<div className="lb" onClick={onClose}>
    <div ref={box} className="dlg" role="dialog" aria-modal="true" aria-labelledby="mail-t" onClick={e => e.stopPropagation()}>
      <button type="button" className="x" aria-label={t(ui.closeDialog)} onClick={onClose}><FaTimes aria-hidden /></button>
      <h2 id="mail-t" className="dlg-t">{t(ui.emailTitle)}</h2>
      <a className="addr" dir="ltr" href={`mailto:${p.email}`}>{p.email}</a>
      <button ref={copyBtn} type="button" className="btn" onClick={copy}>{status === "ok" ? <FaCheck aria-hidden /> : <FaCopy aria-hidden />} {t(status === "ok" ? ui.copied : ui.copy)}</button>
      <p className={status === "fail" ? "toast fail" : "toast"} role="status" aria-live="polite">{status === "ok" ? t(ui.copied) : status === "fail" ? t(ui.copyFailed) : ""}</p>
    </div></div>, document.body);
}

function Contact() {
  const { t, lang } = useT();
  const [ch, setCh] = useState<Ch>("wa");
  const [v, setV] = useState({ name: "", msg: "" });
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [mailOpen, setMailOpen] = useState(false);
  const mailBtn = useRef<HTMLButtonElement>(null);
  const closeMail = useCallback(() => setMailOpen(false), []);
  const [send, setSend] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [honey, setHoney] = useState(""); // hidden spam trap: people never see or fill it
  // Validation: name and message are required; errors show after the field is touched or on submit
  const errs: Record<string, string> = {};
  if (!v.name.trim()) errs.name = t(ui.errName);
  if (!v.msg.trim()) errs.msg = t(ui.errMsg);
  const set = (k: string) => (val: string) => setV(s => ({ ...s, [k]: val }));
  const blur = (k: string) => () => setTouched(s => ({ ...s, [k]: true }));
  const show = (k: string) => (touched[k] ? errs[k] : undefined);
  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (Object.keys(errs).length) { setTouched({ name: true, msg: true }); return; }
    // One template, written entirely in the detected language, used for both WhatsApp and email
    const name = v.name.trim(), msg = v.msg.trim();
    const L = detectLang(`${name} ${msg}`, lang);
    const text = L === "ar" ? `أنا ${name}\n${msg}\n\nمن خلال موقعك الشخصي` : `I am ${name}\n${msg}\n\nSent via your portfolio website`;
    const subject = L === "ar" ? "رسالة من موقعك الشخصي" : "Message from your portfolio website";
    if (ch === "wa") { window.open(`${p.whatsapp}?text=${encodeURIComponent(text)}`, "_blank", "noopener"); return; }
    if (honey) { setSend("sent"); return; } // a bot filled the hidden field: pretend success, send nothing
    // Email: the message is delivered to p.email by the FormSubmit service (no mail app needed on the visitor's device)
    setSend("sending");
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${p.email}`, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ name, message: msg, _subject: subject, _template: "table", _captcha: "false" }) });
      const data = await res.json().catch(() => ({}));
      if (res.ok && (data.success === true || data.success === "true")) { setSend("sent"); setV({ name: "", msg: "" }); setTouched({}); } else setSend("error");
    } catch { setSend("error"); }
  };
  // Each contact action: icon, brand colour, label, link (links open in a new tab when `ext`); Email opens a small dialog with the address and a Copy button
  type Act = { icon: ReactNode; c: string; tip: string; href?: string; ext?: boolean; email?: boolean };
  const icons: Act[] = [
    { icon: <FaWhatsapp />, c: "#25D366", tip: t(ui.waLabel), href: p.whatsapp, ext: true }, { icon: <FaEnvelope />, c: "#0F766E", tip: t(ui.emailLabel), email: true },
    { icon: <FaPhoneAlt />, c: "#0F766E", tip: t(ui.phoneLabel), href: `tel:${p.phone}` }, { icon: <FaLinkedinIn />, c: "#0A66C2", tip: "LinkedIn", href: p.linkedin, ext: true },
    { icon: <FaGithub />, c: "#24292f", tip: "GitHub", href: p.github, ext: true }, { icon: <FaTelegramPlane />, c: "#26A5E4", tip: t(ui.telegramLabel), href: p.telegram, ext: true },
    { icon: <FaFacebookF />, c: "#1877F2", tip: "Facebook", href: p.facebook, ext: true }];
  return <Page title={ui.contact} desc={{ en: "Contact Omar Ahmed through WhatsApp, email, phone, Telegram, LinkedIn, GitHub, or Facebook.", ar: "تواصل مع عمر أحمد عبر واتساب أو البريد أو الهاتف أو تيليجرام أو لينكدإن أو جيت هاب أو فيسبوك." }}>
    <h1>{t(ui.contact)}</h1>
    <div className="cgrid">
      <form className="formcard" onSubmit={submit} noValidate>
        <div className="seg" role="radiogroup" aria-label={t(ui.channel)}>
          {([["wa", <FaWhatsapp />, ui.chWa], ["mail", <FaEnvelope />, ui.chMail]] as [Ch, ReactNode, L][]).map(([k, ic, lb]) =>
            <label key={k} className={ch === k ? "on" : ""}><input type="radio" name="channel" className="sr" checked={ch === k} onChange={() => setCh(k)} />{ic} {t(lb)}</label>)}
        </div>
        <div key={ch} className="swap">
          <Field id="f-name" label={t(ui.formName)} placeholder={t(ui.phName)} value={v.name} onChange={set("name")} onBlur={blur("name")} err={show("name")} />
          <Field id="f-msg" area label={t(ui.formMsg)} placeholder={t(ui.phMsg)} value={v.msg} onChange={set("msg")} onBlur={blur("msg")} err={show("msg")} />
        </div>
        <input type="text" name="_honey" className="hp" tabIndex={-1} autoComplete="off" aria-hidden="true" value={honey} onChange={e => setHoney(e.target.value)} />
        <button type="submit" disabled={send === "sending"} className={ch === "wa" ? "btn wa" : "btn"}>{ch === "wa" ? <FaWhatsapp aria-hidden /> : <FaEnvelope aria-hidden />} {ch === "mail" && send === "sending" ? t(ui.sending) : t(ch === "wa" ? ui.sendWa : ui.sendMail)}</button>
        <p className={send === "error" ? "note bad" : "note"} role="status" aria-live="polite">{ch === "mail" && send === "sent" ? t(ui.sentOk) : ch === "mail" && send === "error" ? t(ui.sendFail) : ""}</p>
      </form>
      <div className="clist">
        <div className="dockcard"><div className="dock">
          {icons.map(a => a.email
            ? <button key="email" ref={mailBtn} type="button" className="ic" style={{ "--c": a.c } as React.CSSProperties} data-tip={a.tip} aria-label={a.tip} aria-haspopup="dialog" onClick={() => setMailOpen(true)}>{a.icon}</button>
            : <a key={a.tip} className="ic" style={{ "--c": a.c } as React.CSSProperties} data-tip={a.tip} aria-label={a.tip} href={a.href} {...(a.ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{a.icon}</a>)}
        </div></div>
      </div>
    </div>
    {mailOpen && <EmailDialog onClose={closeMail} returnTo={mailBtn} />}
  </Page>;
}
function NotFound() { const { t } = useT(); return <Page title={ui.nf} desc={ui.nf}><h1>{t(ui.nf)}</h1><p><Link to="/">{t(ui.home2)}</Link></p></Page>; }

// Decorative background: a faint node network (with moving "data" dashes) and floating code symbols.
// Network nodes use percentage coordinates (left cluster; the right cluster is its point-mirror) so it adapts to any screen size.
const NODES: [number, number][] = [[4, 12], [13, 7], [9, 27], [17, 22], [5, 45], [14, 52], [8, 72], [16, 80], [4, 92]];
const LEFT = NODES.map(([x, y]): [number, number] => [x * 0.85, y]); // keep the clusters in the side gutters
const ALL_NODES = [...LEFT, ...LEFT.map(([x, y]): [number, number] => [100 - x, 100 - y])];
const EDGE: [number, number][] = [[0, 1], [0, 2], [1, 3], [2, 3], [2, 4], [3, 5], [4, 5], [4, 6], [5, 7], [6, 7], [6, 8], [7, 8]];
const ALL_EDGES = [...EDGE, ...EDGE.map(([a, b]): [number, number] => [a + 9, b + 9])];
const FLOW = new Set([3, 6, 9, 13, 17, 20]), PULSE = new Set([3, 5, 7, 12, 14, 16]);
const GLYPHS: [string, number, number, number, number, number][] = [ // [text, left %, top %, size px, seconds, delay]
  ["</>", 6, 18, 30, 19, 0], ["{ }", 90, 14, 28, 23, -6], ["=>", 9, 50, 24, 17, -3], ["[ ]", 91, 46, 30, 21, -9], ["( )", 5, 78, 26, 25, -12], ["#", 88, 76, 30, 20, -5],
  ["&&", 15, 92, 22, 18, -8], ["01", 93, 92, 24, 22, -2], ["fn", 47, 5, 20, 24, -10], ["//", 52, 95, 24, 19, -4]];
const Backdrop = () => <div className="bg" aria-hidden="true">
  <svg className="net" focusable="false" width="100%" height="100%">
    <g className="net-lines">{ALL_EDGES.map(([a, b], i) => <line key={i} x1={`${ALL_NODES[a][0]}%`} y1={`${ALL_NODES[a][1]}%`} x2={`${ALL_NODES[b][0]}%`} y2={`${ALL_NODES[b][1]}%`} />)}</g>
    <g className="net-flow">{ALL_EDGES.map(([a, b], i) => FLOW.has(i) && <line key={i} x1={`${ALL_NODES[a][0]}%`} y1={`${ALL_NODES[a][1]}%`} x2={`${ALL_NODES[b][0]}%`} y2={`${ALL_NODES[b][1]}%`} style={{ animationDelay: `${-i * 1.7}s` }} />)}</g>
    <g className="net-nodes">{ALL_NODES.map(([x, y], i) => <circle key={i} cx={`${x}%`} cy={`${y}%`} r={PULSE.has(i) ? 4.5 : 3} className={PULSE.has(i) ? "pulse" : undefined} style={PULSE.has(i) ? { animationDelay: `${-i * 1.3}s` } : undefined} />)}</g>
  </svg>
  {GLYPHS.map(([g, l, t, sz, d, dl]) => <span key={g} className="glyph" style={{ "--l": `${l}%`, top: `${t}%`, fontSize: sz, animationDuration: `${d}s`, animationDelay: `${dl}s` } as React.CSSProperties}>{g}</span>)}
</div>;
export default function App() {
  const { t, toggle, lang } = useT();
  const { theme, toggle: toggleTheme } = useTheme();
  const { pathname } = useLocation();
  useEffect(() => { document.querySelector<HTMLElement>("header nav a.active")?.scrollIntoView({ inline: "center", block: "nearest" }); }, [pathname, lang]);
  return <>
    <Backdrop />
    <a className="skip" href="#main">{t(ui.skip)}</a>
    <header className="bar"><div className="wrap nav"><Link to="/" className="brand" aria-label={`${t(p.name)} — ${t(ui.brand)}`}><Brand decorative /></Link>
      <nav aria-label="Main">{([["/", ui.home], ["/projects", ui.projects], ["/certificates", ui.certificates], ["/about", ui.about], ["/contact", ui.contact]] as [string, L][]).map(([to, l]) => <NavLink key={to} to={to} end={to === "/"}>{t(l)}</NavLink>)}</nav>
      <div className="tools">
        <button type="button" className="lang" onClick={toggle} aria-label={t(ui.toggleLabel)} title={t(ui.toggleLabel)}><FaGlobe aria-hidden />
          <span className="opts" dir="ltr" aria-hidden="true"><span lang="en" className={lang === "en" ? "on" : ""}>EN</span><span lang="ar" className={lang === "ar" ? "on" : ""}>عربي</span></span></button>
        <button type="button" className="theme" onClick={toggleTheme} aria-label={t(theme === "dark" ? ui.lightLabel : ui.darkLabel)} title={t(theme === "dark" ? ui.lightLabel : ui.darkLabel)}>
          <span className="opts" aria-hidden="true"><span className={theme === "light" ? "on" : ""}><FaSun /></span><span className={theme === "dark" ? "on" : ""}><FaMoon /></span></span></button>
      </div></div></header>
    <Routes><Route path="/" element={<Home />} /><Route path="/projects" element={<Projects />} /><Route path="/projects/:slug" element={<Detail />} />
      <Route path="/certificates" element={<Certificates />} />
      <Route path="/about" element={<About />} /><Route path="/contact" element={<Contact />} /><Route path="*" element={<NotFound />} /></Routes>
    <footer className="wrap foot"><div className="foot-brand"><Brand /></div><span>© {new Date().getFullYear()} {t(p.name)}</span><Ext href={p.github}>GitHub</Ext><Ext href={p.linkedin}>LinkedIn</Ext></footer>
  </>;
}
