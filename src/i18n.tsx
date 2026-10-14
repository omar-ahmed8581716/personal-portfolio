import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { L } from "./data";
export type Lang = "en" | "ar";
const Ctx = createContext<{ lang: Lang; toggle: () => void }>({ lang: "en", toggle: () => {} });
export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => { try { return localStorage.getItem("lang") === "ar" ? "ar" : "en"; } catch { return "en"; } });
  useEffect(() => { // switch direction + language for the whole page
    document.documentElement.lang = lang; document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    try { localStorage.setItem("lang", lang); } catch { /* storage unavailable */ }
  }, [lang]);
  return <Ctx.Provider value={{ lang, toggle: () => setLang(l => (l === "en" ? "ar" : "en")) }}>{children}</Ctx.Provider>;
}
export function useT() { const { lang, toggle } = useContext(Ctx); return { lang, toggle, t: <T,>(x: L<T>): T => x[lang] }; }
const l = (en: string, ar: string): L => ({ en, ar });
// Interface text in both languages
export const ui = {
  home: l("Home", "الرئيسية"), projects: l("Projects", "المشاريع"), about: l("About", "عن عمر"), contact: l("Contact", "تواصل معي"),
  skip: l("Skip to content", "انتقل إلى المحتوى"), explore: l("Explore projects", "استكشف المشاريع"), contactMe: l("Contact me", "تواصل معي"),
  strengths: l("Strengths", "نقاط القوة"), moreAbout: l("More about my background", "المزيد عن خلفيتي"),
  details: l("View details", "عرض التفاصيل"), repo: l("GitHub repository", "مستودع GitHub"), source: l("View source on GitHub", "عرض الكود على GitHub"),
  back: l("All projects", "كل المشاريع"), purpose: l("Purpose", "الهدف"), features: l("Features", "المزايا"), tech: l("Technology", "التقنيات"),
  learned: l("What I learned", "ما تعلمته"), time: l("Development time", "مدة التطوير"),
  aboutH: l("About me", "عن عمر"),
  bio: l("Computer Science student at Al-Azhar University with a solid foundation in procedural programming, algorithms, and software design using C++. Actively expanding into modern software engineering, web technologies, and AI workflows, with a strong focus on building practical, well-structured systems.",
    "طالب علوم حاسب بجامعة الأزهر لديه أساس متين في البرمجة الإجرائية والخوارزميات وتصميم البرمجيات باستخدام C++. أتوسّع حاليًا في هندسة البرمجيات الحديثة وتقنيات الويب وأدوات الذكاء الاصطناعي، مع تركيز كبير على بناء أنظمة عملية ومنظمة جيدًا."),
  edu: l("Education", "التعليم"), uni: l("Al-Azhar University, Cairo", "جامعة الأزهر، القاهرة"),
  faculty: l("Faculty of Computers and Artificial Intelligence, second-year student.", "كلية الحاسبات والذكاء الاصطناعي، طالب في السنة الثانية."),
  skills: l("Skills", "المهارات"), ps: l("Problem-solving practice", "التدرّب على حل المشكلات"),
  psText: l("Consistently sharpening my analytical thinking and algorithmic skills, having solved 450+ programming problems with an ongoing focus on edge-case handling and optimal solutions. Alongside problem solving, I actively apply these concepts by building end-to-end practical projects to bridge theory with real-world implementation.",
    "أصقل تفكيري التحليلي ومهاراتي الخوارزمية باستمرار، بعد حل أكثر من 450 مسألة برمجية مع تركيز دائم على معالجة الحالات الحدّية والوصول إلى الحلول المثلى. وإلى جانب حل المشكلات، أطبّق هذه المفاهيم ببناء مشاريع عملية متكاملة تربط النظرية بالتطبيق الفعلي."),
  vol: l("Volunteering & Leadership", "العمل التطوعي والقيادة"),
  volText: l("Active member at Youth Development Pioneers (YDP), affiliated with Egypt's Ministry of Youth and Sports. Contributing to the organization, event coordination, and on-ground management of youth empowerment initiatives and major conferences.",
    "عضو نشط في رواد التطوير والتنمية الشبابية (YDP) التابعة لوزارة الشباب والرياضة المصرية. أساهم في عمل المؤسسة وتنسيق الفعاليات والإدارة الميدانية لمبادرات تمكين الشباب والمؤتمرات الكبرى."),
  award: l('"Best Member" Award — Youth Development Pioneers (YDP)', 'جائزة «أفضل عضو» — رواد التطوير والتنمية الشبابية (YDP)'),
  awardAlt: l("Best Members recognition graphic for Omar Ahmed, Training and Development Committee, Giza Governorate, March 2026", "تصميم تكريم أفضل الأعضاء لعمر أحمد، لجنة التدريب والتطوير، محافظة الجيزة، مارس 2026"),
  portraitAlt: l("Portrait of Omar Ahmed in a navy suit", "صورة شخصية لعمر أحمد ببدلة كحلية"),
  // Contact page
  formName: l("Full Name", "الاسم الكامل"), formEmail: l("Email Address", "البريد الإلكتروني"), formSubject: l("Subject", "الموضوع"), formMsg: l("Message", "الرسالة"),
  phName: l("Your full name", "اكتب اسمك الكامل"), phEmail: l("you@example.com", "you@example.com"), phSubject: l("What is this about?", "ما موضوع رسالتك؟"), phMsg: l("Write your message here...", "اكتب رسالتك هنا..."),
  viaEmail: l("Send via Email", "إرسال عبر البريد"), viaWa: l("Send via WhatsApp", "إرسال عبر واتساب"),
  needMsg: l("Please write a message first.", "من فضلك اكتب رسالة أولًا."),
  waLabel: l("WhatsApp", "واتساب"), phoneLabel: l("Phone", "الهاتف"), emailLabel: l("Email", "البريد الإلكتروني"),
  copy: l("Copy Email", "نسخ البريد"), copied: l("Copied!", "تم النسخ!"),
  resp: l("⚡ Typical response time: Within 24 hours", "⚡ متوسط وقت الرد: خلال 24 ساعة"),
  mail: l("Email", "البريد الإلكتروني"), sentBy: l("From", "من"),
  channel: l("Preferred channel", "قناة التواصل المفضلة"), chWa: l("WhatsApp", "واتساب"), chMail: l("Email", "البريد"),
  formPhone: l("Phone Number", "رقم الهاتف"), phPhone: l("+20 1XX XXX XXXX", "+20 1XX XXX XXXX"),
  errName: l("Please enter your name.", "من فضلك اكتب اسمك."), errPhone: l("Enter a valid phone number.", "اكتب رقم هاتف صحيحًا."),
  errEmail: l("Enter a valid email address.", "اكتب بريدًا إلكترونيًا صحيحًا."), errMsg: l("Please write a message.", "من فضلك اكتب رسالتك."),
  sendWa: l("Send via WhatsApp", "إرسال عبر واتساب"), sendMail: l("Send via Email", "إرسال عبر البريد"), telegramLabel: l("Telegram", "تيليجرام"),
  viewAll: l("View All Projects →", "عرض جميع المشاريع ←"),
  darkLabel: l("Switch to dark mode", "التبديل إلى الوضع الداكن"), lightLabel: l("Switch to light mode", "التبديل إلى الوضع الفاتح"),
  enlarge: l("Enlarge award image", "تكبير صورة التكريم"), close: l("Close preview", "إغلاق المعاينة"),
  nf: l("Page not found", "الصفحة غير موجودة"), home2: l("Back to home", "العودة إلى الرئيسية"), toggleLabel: l("Switch language to Arabic", "التبديل إلى الإنجليزية"),
};
