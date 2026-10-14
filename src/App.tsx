import { useEffect, useLayoutEffect, useRef, useState, type ChangeEvent, type FormEvent, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { Link, NavLink, Route, Routes, useParams, useLocation } from "react-router-dom";
import { FaWhatsapp, FaLinkedinIn, FaGithub, FaTelegramPlane, FaFacebookF, FaPhoneAlt, FaEnvelope, FaSun, FaMoon, FaSearchPlus, FaTimes } from "react-icons/fa";
import { profile as p, projects, strengths, aboutSkills, type Project, type L } from "./data";
import { useT, ui } from "./i18n";
import { useTheme } from "./theme";

function Page({ title, desc, children }: { title: L; desc: L; children: ReactNode }) {
  const { pathname } = useLocation();
  const { t } = useT();
  useEffect(() => {
    document.title = `${t(title)} | ${t(p.name)}`;
    document.querySelector('meta[name="description"]')?.setAttribute("content", t(desc));
  }, [title, desc, t]);
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
const Tags = ({ items, big }: { items: string[]; big?: boolean }) => <ul className={big ? "tags big" : "tags"}>{items.map(i => <li key={i}>{i}</li>)}</ul>;

function Card({ x }: { x: Project }) {
  const { t } = useT();
  return <article className="card"><h3>{t(x.title)}</h3><p>{t(x.summary)}</p><Tags items={x.tech} />
    <div className="row"><Link className="btn" to={`/projects/${x.slug}`}>{t(ui.details)}</Link><Ext href={x.repo}>{t(ui.repo)}</Ext></div></article>;
}
const Grid = ({ items, three }: { items: Project[]; three?: boolean }) => <div className={three ? "grid three" : "grid"}>{items.map(x => <Card key={x.slug} x={x} />)}</div>;

function Home() {
  const { t, lang } = useT();
  return <Page title={ui.home} desc={{ en: "Omar Ahmed, computer science student and aspiring full-stack developer. Explore my four C++ projects.", ar: "عمر أحمد، طالب علوم حاسب ومطوّر Full-Stack طموح. استكشف مشاريعي الأربعة بلغة C++." }}>
    <section className="hero"><div><h1>{t(p.name)}</h1><p className="lead">{t(p.headline)}</p><p>{t(p.intro)}</p>
      <div className="row"><Link className="btn" to="/projects">{t(ui.explore)}</Link><Link className="btn ghost" to="/contact">{t(ui.contactMe)}</Link></div></div>
      <img className="portrait" src="/omar.jpg" alt={t(ui.portraitAlt)} width="320" height="320" /></section>
    <section><h2>{t(ui.projects)}</h2><Grid three items={projects.slice(0, 3)} /><div className="center"><Link className="btn ghost" to="/projects">{t(ui.viewAll)}</Link></div></section>
    <section><h2>{t(ui.strengths)}</h2><Tags big items={t(strengths)} /><p><Link to="/about">{t(ui.moreAbout)} {lang === "ar" ? "←" : "→"}</Link></p></section>
  </Page>;
}
function Projects() { const { t } = useT(); return <Page title={ui.projects} desc={{ en: "Four C++ console projects by Omar Ahmed.", ar: "أربعة مشاريع سطر أوامر بلغة C++ من تنفيذ عمر أحمد." }}><h1>{t(ui.projects)}</h1><Grid items={projects} /></Page>; }

function Detail() {
  const { t, lang } = useT();
  const x = projects.find(q => q.slug === useParams().slug);
  if (!x) return <NotFound />;
  return <Page title={x.title} desc={x.summary}>
    <p><Link to="/projects">{lang === "ar" ? "→" : "←"} {t(ui.back)}</Link></p><h1>{t(x.title)}</h1><p className="lead">{t(x.summary)}</p>
    <h2>{t(ui.purpose)}</h2><p>{t(x.purpose)}</p>
    <h2>{t(ui.features)}</h2><ul>{t(x.features).map(f => <li key={f}>{f}</li>)}</ul>
    <h2>{t(ui.tech)}</h2><Tags items={x.tech} />
    <h2>{t(ui.learned)}</h2><p>{t(x.learned)}</p>{x.duration && <p><strong>{t(ui.time)}:</strong> {t(x.duration)}</p>}
    <div className="row"><a className="btn" href={x.repo} target="_blank" rel="noopener noreferrer">{t(ui.source)}</a>{x.demo && <Ext href={x.demo}>Live demo</Ext>}</div>
  </Page>;
}

function About() {
  const { t } = useT();
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null), closeBtn = useRef<HTMLButtonElement>(null);
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
    <h2>{t(ui.vol)}</h2>
    <div className="split"><p>{t(ui.volText)}</p>
      <figure className="award"><button type="button" ref={trigger} className="zoom" onClick={() => setOpen(true)} aria-label={t(ui.enlarge)}>
        <img src="/best-members.jpg" loading="lazy" width="300" height="300" alt={t(ui.awardAlt)} /><FaSearchPlus aria-hidden /></button>
        <figcaption><strong>{t(ui.award)}</strong></figcaption></figure></div>
    {open && createPortal(<div className="lb" role="dialog" aria-modal="true" aria-label={t(ui.award)} onClick={() => setOpen(false)} onKeyDown={e => { if (e.key === "Tab") e.preventDefault(); }}>
      <button ref={closeBtn} type="button" className="x" aria-label={t(ui.close)} onClick={() => setOpen(false)}><FaTimes aria-hidden /></button>
      <figure onClick={e => e.stopPropagation()}><img src="/best-members.jpg" alt={t(ui.awardAlt)} /><figcaption>{t(ui.award)}</figcaption></figure></div>, document.body)}
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
const rePhone = /^\+?[\d\s()-]{8,}$/, reMail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
function Field(props: { id: string; label: string; err?: string; area?: boolean; value: string; onChange: (v: string) => void; onBlur: () => void; placeholder: string; type?: string; ltr?: boolean }) {
  const { id, label, err, area, value, onChange, onBlur, placeholder, type = "text", ltr } = props;
  const c = { id, value, placeholder, onBlur, "aria-invalid": !!err, "aria-describedby": err ? `${id}-e` : undefined, dir: ltr ? "ltr" : undefined,
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange(e.target.value) };
  return <div className={err ? "field bad" : "field"}><label htmlFor={id}>{label}</label>{area ? <textarea rows={5} {...c} /> : <input type={type} {...c} />}
    {err && <small id={`${id}-e`} role="alert">{err}</small>}</div>;
}

function Contact() {
  const { t, lang } = useT();
  const [ch, setCh] = useState<Ch>("wa");
  const [v, setV] = useState({ name: "", phone: "", email: "", msg: "" });
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const key = ch === "wa" ? "phone" : "email";
  // Validation: each field is checked, errors show after the field is touched or on submit
  const errs: Record<string, string> = {};
  if (!v.name.trim()) errs.name = t(ui.errName);
  if (ch === "wa" ? !rePhone.test(v.phone.trim()) : !reMail.test(v.email.trim())) errs[key] = t(ch === "wa" ? ui.errPhone : ui.errEmail);
  if (!v.msg.trim()) errs.msg = t(ui.errMsg);
  const set = (k: string) => (val: string) => setV(s => ({ ...s, [k]: val }));
  const blur = (k: string) => () => setTouched(s => ({ ...s, [k]: true }));
  const show = (k: string) => (touched[k] ? errs[k] : undefined);
  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (Object.keys(errs).length) { setTouched({ name: true, [key]: true, msg: true }); return; }
    // One template, written entirely in the detected language, used for both WhatsApp and email
    const name = v.name.trim(), msg = v.msg.trim();
    const L = detectLang(`${name} ${msg}`, lang);
    const text = L === "ar" ? `أنا ${name}\n${msg}\n\nمن خلال موقعك الشخصي` : `I am ${name}\n${msg}\n\nSent via your portfolio website`;
    const subject = L === "ar" ? "رسالة من موقعك الشخصي" : "Message from your portfolio website";
    if (ch === "wa") window.open(`${p.whatsapp}?text=${encodeURIComponent(text)}`, "_blank", "noopener");
    else window.location.href = `mailto:${p.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`;
  };
  const icons: [ReactNode, string, string, string, boolean][] = [
    [<FaWhatsapp />, "#25D366", t(ui.waLabel), p.whatsapp, true], [<FaEnvelope />, "#059669", t(ui.emailLabel), `mailto:${p.email}`, false],
    [<FaPhoneAlt />, "#059669", t(ui.phoneLabel), `tel:${p.phone}`, false], [<FaLinkedinIn />, "#0A66C2", "LinkedIn", p.linkedin, true],
    [<FaGithub />, "#24292f", "GitHub", p.github, true], [<FaTelegramPlane />, "#26A5E4", t(ui.telegramLabel), p.telegram, true], [<FaFacebookF />, "#1877F2", "Facebook", p.facebook, true]];
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
          {ch === "wa" ? <Field id="f-phone" type="tel" ltr label={t(ui.formPhone)} placeholder={t(ui.phPhone)} value={v.phone} onChange={set("phone")} onBlur={blur("phone")} err={show("phone")} />
            : <Field id="f-email" type="email" ltr label={t(ui.formEmail)} placeholder={t(ui.phEmail)} value={v.email} onChange={set("email")} onBlur={blur("email")} err={show("email")} />}
          <Field id="f-msg" area label={t(ui.formMsg)} placeholder={t(ui.phMsg)} value={v.msg} onChange={set("msg")} onBlur={blur("msg")} err={show("msg")} />
        </div>
        <button type="submit" className={ch === "wa" ? "btn wa" : "btn"}>{ch === "wa" ? <FaWhatsapp aria-hidden /> : <FaEnvelope aria-hidden />} {t(ch === "wa" ? ui.sendWa : ui.sendMail)}</button>
      </form>
      <div className="clist">
        <div className="dockcard"><div className="dock">
          {icons.map(([ic, c, tip, href, ext], i) => <a key={i} className="ic" style={{ "--c": c } as React.CSSProperties} data-tip={tip} aria-label={tip} href={href} {...(ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{ic}</a>)}
        </div></div>
        <p className="badge">{t(ui.resp)}</p>
      </div>
    </div>
  </Page>;
}
function NotFound() { const { t } = useT(); return <Page title={ui.nf} desc={ui.nf}><h1>{t(ui.nf)}</h1><p><Link to="/">{t(ui.home2)}</Link></p></Page>; }

const dots = Array.from({ length: 22 }, (_, i) => ({ left: (i * 53 + 7) % 100, size: 3 + (i % 4) * 2, dur: 11 + (i % 5) * 3, delay: -i * 1.9 }));
export default function App() {
  const { t, toggle, lang } = useT();
  const { theme, toggle: toggleTheme } = useTheme();
  // Subtle mouse parallax: updates two CSS variables (--mx, --my) that the background layers use
  useEffect(() => {
    if (!matchMedia("(pointer: fine)").matches || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const move = (e: MouseEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const s = document.documentElement.style;
        s.setProperty("--mx", String((e.clientX / innerWidth) * 2 - 1)); s.setProperty("--my", String((e.clientY / innerHeight) * 2 - 1));
      });
    };
    addEventListener("mousemove", move, { passive: true });
    return () => { removeEventListener("mousemove", move); cancelAnimationFrame(raf); };
  }, []);
  return <>
    <div className="blobs" aria-hidden="true"><i /><i /><i /><span className="sph" /><span className="sph" /><span className="sph" />{dots.map((d, i) => <b key={i} style={{ left: `${d.left}%`, width: d.size, height: d.size, animationDuration: `${d.dur}s`, animationDelay: `${d.delay}s` }} />)}</div>
    <a className="skip" href="#main">{t(ui.skip)}</a>
    <header className="bar"><div className="wrap nav"><Link to="/" className="brand"><img src="/logo.png" alt="Omar Ahmed logo" height="40" /></Link>
      <nav aria-label="Main">{([["/", ui.home], ["/projects", ui.projects], ["/about", ui.about], ["/contact", ui.contact]] as [string, L][]).map(([to, l]) => <NavLink key={to} to={to} end={to === "/"}>{t(l)}</NavLink>)}
        <button type="button" className="theme" onClick={toggleTheme} aria-label={t(theme === "dark" ? ui.lightLabel : ui.darkLabel)}>{theme === "dark" ? <FaSun aria-hidden /> : <FaMoon aria-hidden />}</button>
        <button type="button" className="lang" onClick={toggle} aria-label={t(ui.toggleLabel)}>🌐 <span className={lang === "en" ? "on" : ""}>EN</span><span className={lang === "ar" ? "on" : ""}>AR</span></button></nav></div></header>
    <Routes><Route path="/" element={<Home />} /><Route path="/projects" element={<Projects />} /><Route path="/projects/:slug" element={<Detail />} />
      <Route path="/about" element={<About />} /><Route path="/contact" element={<Contact />} /><Route path="*" element={<NotFound />} /></Routes>
    <footer className="wrap foot">© {new Date().getFullYear()} {t(p.name)} · <Ext href={p.github}>GitHub</Ext> · <Ext href={p.linkedin}>LinkedIn</Ext></footer>
  </>;
}
