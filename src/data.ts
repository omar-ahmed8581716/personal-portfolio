// ALL editable content lives here, in English (en) and Arabic (ar).
// To add a project, copy one object in `projects` and fill both languages.
export type L<T = string> = { en: T; ar: T };
export const profile = {
  name: { en: "Omar Ahmed", ar: "عمر أحمد" } as L,
  headline: { en: "Computer Science Student | Aspiring Full-Stack Developer", ar: "طالب علوم حاسب | أطمح لأكون مطوّر برمجيات متكاملًا" } as L,
  intro: { en: "Second-year student at Al-Azhar University building a strong foundation in C++, problem solving, and software development.", ar: "طالب في السنة الثانية بجامعة الأزهر، أبني أساسًا قويًا في لغة C++ وحل المشكلات وتطوير البرمجيات." } as L,
  email: "o8581716@gmail.com",
  whatsapp: "https://wa.me/201012975889", whatsappLabel: "+20 101 297 5889",
  telegram: "https://t.me/+201036612436",
  phone: "+201036612436", phoneLabel: "+20 103 661 2436",
  linkedin: "https://www.linkedin.com/in/omar-ahmed-ghazi",
  github: "https://github.com/omar-ahmed8581716",
  facebook: "https://www.facebook.com/omar.ahmed.432729?locale=ar_AR",
};
// A project may have several development stages ("versions"), each with its own repo. In that case the project itself has no single `repo`.
export type ProjectVersion = { id: string; label: L; title: L; summary: L; features: L<string[]>; tech: string[]; duration?: L; repo: string };
export type Project = { slug: string; title: L; summary: L; purpose: L; features: L<string[]>; tech: string[]; learned: L; duration?: L; repo?: string; demo?: string; versions?: ProjectVersion[]; evolution?: L<string[]> };
export const projects: Project[] = [
  { slug: "bank-system", title: { en: "Bank Management System", ar: "نظام إدارة البنك" },
    summary: { en: "A C++ console banking system in two versions: from a client-records manager to client and staff portals with permissions and registration approval.", ar: "نظام بنكي بلغة C++ على سطر الأوامر بنسختين: من إدارة سجلات العملاء إلى بوابتين للعملاء والموظفين مع صلاحيات وموافقة على طلبات التسجيل." },
    purpose: { en: "Practice file handling and record management while keeping stored data consistent between runs, then extend the same system with client and staff logins, permissions, and a registration workflow.", ar: "التدرّب على التعامل مع الملفات وإدارة السجلات مع الحفاظ على اتساق البيانات المخزّنة بين مرات التشغيل، ثم توسيع النظام نفسه بتسجيل دخول للعملاء والموظفين وصلاحيات ومسار لتسجيل العملاء الجدد." },
    features: { en: ["Manage client accounts: show, add, search, update, and delete", "Deposit and withdraw with balance validation", "Client data saved to and loaded from text files"],
      ar: ["إدارة حسابات العملاء: العرض والإضافة والبحث والتعديل والحذف", "الإيداع والسحب مع التحقق من الرصيد", "حفظ بيانات العملاء وتحميلها من ملفات نصية"] },
    tech: ["C++", "fstream", "Bitwise permissions", "Visual Studio"],
    learned: { en: "I practiced file handling, record management, string parsing, and connecting many functions while preserving stored data.", ar: "تدرّبت على التعامل مع الملفات وإدارة السجلات وتحليل النصوص وربط عدة دوال معًا مع الحفاظ على البيانات المخزّنة." },
    versions: [
      { id: "original", label: { en: "Original Version", ar: "النسخة الأصلية" },
        title: { en: "Original Bank Management System", ar: "نظام إدارة البنك — النسخة الأصلية" },
        summary: { en: "A console app for managing client accounts and transactions, saved to a local file.", ar: "نظام برمجي لإدارة حسابات العملاء والعمليات المصرفية بالاعتماد على البرمجة الإجرائية والملفات." },
        features: { en: ["Show, add, search, update, and delete clients", "Deposit and withdraw with balance validation", "Display total balances", "Client data saved to and loaded from a text file"],
          ar: ["عرض العملاء وإضافتهم والبحث عنهم وتعديلهم وحذفهم", "الإيداع والسحب مع التحقق من الرصيد", "عرض إجمالي الأرصدة", "حفظ بيانات العملاء وتحميلها من ملف نصي"] },
        tech: ["C++", "std::vector", "fstream", "Visual Studio"],
        duration: { en: "Approximately 7 days", ar: "حوالي 7 أيام" }, repo: "https://github.com/omar-ahmed8581716/Bank-System-Project" },
      { id: "advanced", label: { en: "Advanced Version", ar: "النسخة المتقدمة" },
        title: { en: "Advanced Bank & Client Management System", ar: "نظام إدارة البنك والعملاء المتقدم" },
        summary: { en: "An extended version with separate client and staff logins, per-user permissions, and a registration workflow where new clients apply and staff approve or reject.", ar: "نسخة موسّعة بتسجيل دخول منفصل للعملاء والموظفين، وصلاحيات لكل مستخدم، ومسار تسجيل يتقدّم فيه العميل الجديد بطلب ويوافق عليه الموظفون أو يرفضونه." },
        features: { en: ["Two sign-in paths: clients use an account number and PIN, staff use a username and password", "Client portal: view account details and balance, deposit, withdraw within the balance, and change a 6-digit PIN", "Staff portal: list, add, find, update, and delete clients, make deposits and withdrawals, and view total balances", "User management: staff accounts with per-user permissions stored as bitwise flags, or full access", "Safeguards: the root admin account and the currently signed-in user cannot be deleted", "Registration requests: new clients apply with a name, account number, PIN, and phone number, and duplicate account numbers are rejected", "Applicants can check whether their request is still under review or the account is active, and staff approve or reject each pending request", "Data saved in three text files: clients, staff users, and pending registration requests"],
          ar: ["مساران لتسجيل الدخول: العملاء برقم الحساب والرقم السري (PIN)، والموظفون باسم المستخدم وكلمة المرور", "بوابة العميل: عرض بيانات الحساب والرصيد، والإيداع، والسحب في حدود الرصيد، وتغيير الرقم السري المكوّن من 6 أرقام", "بوابة الموظفين: عرض العملاء وإضافتهم والبحث عنهم وتعديلهم وحذفهم، وتنفيذ الإيداع والسحب، وعرض إجمالي الأرصدة", "إدارة المستخدمين: حسابات موظفين بصلاحيات لكل مستخدم مخزّنة كأعلام بتّية (bitwise)، أو صلاحية كاملة", "ضمانات: لا يمكن حذف حساب admin الرئيسي ولا المستخدم المسجّل دخوله حاليًا", "طلبات التسجيل: يتقدّم العميل الجديد بالاسم ورقم الحساب والرقم السري ورقم الهاتف، ويُرفض رقم الحساب المكرّر", "يستطيع المتقدّم التحقق مما إذا كان طلبه قيد المراجعة أو أن الحساب أصبح فعّالًا، ويوافق الموظفون على كل طلب معلّق أو يرفضونه", "حفظ البيانات في ثلاثة ملفات نصية: العملاء، ومستخدمو النظام، وطلبات التسجيل المعلّقة"] },
        tech: ["C++", "std::vector", "fstream", "Bitwise flags", "Visual Studio"],
        duration: { en: "Approximately 12 days", ar: "حوالي 12 يومًا" }, repo: "https://github.com/omar-ahmed8581716/Advanced-Bank-System" },
    ],
    evolution: { en: ["Access: the original opens straight into a management menu with no sign-in. The advanced version adds separate client and staff logins.", "Permissions: staff accounts carry per-user permissions stored as bitwise flags, so each user reaches only the parts of the system they are allowed to use.", "Clients: customers can now view their own account, deposit, withdraw, and change their 6-digit PIN themselves.", "Onboarding: new clients can submit a registration request that staff approve or reject, instead of every account being added directly by the operator.", "Storage: the data grows from one clients file to three text files for clients, staff users, and pending registration requests."],
      ar: ["الوصول: النسخة الأصلية تفتح مباشرة على قائمة إدارة بدون تسجيل دخول، أما المتقدمة فتضيف تسجيل دخول منفصلًا للعملاء والموظفين.", "الصلاحيات: حسابات الموظفين تحمل صلاحيات لكل مستخدم مخزّنة كأعلام بتّية (bitwise)، فيصل كل مستخدم إلى الأجزاء المسموح له بها فقط.", "العملاء: صار بإمكان العميل عرض حسابه بنفسه والإيداع والسحب وتغيير رقمه السري المكوّن من 6 أرقام.", "التسجيل: يمكن للعميل الجديد تقديم طلب تسجيل يوافق عليه الموظفون أو يرفضونه، بدل أن يُضاف كل حساب مباشرة من المشغّل.", "التخزين: تنمو البيانات من ملف عملاء واحد إلى ثلاثة ملفات نصية للعملاء ومستخدمي النظام وطلبات التسجيل المعلّقة."] } },
  { slug: "expense-tracker", title: { en: "Expense Tracker", ar: "متتبع المصروفات" },
    summary: { en: "A console app for tracking income and expenses with financial summaries.", ar: "تطبيق متكامل لإدارة وتتبع المعاملات المالية والمصروفات مع حفظ البيانات محلياً." },
    purpose: { en: "Manage personal finances from the terminal while practicing validation and data persistence.", ar: "إدارة المالية الشخصية من الطرفية مع التدرّب على التحقق من المدخلات وحفظ البيانات." },
    features: { en: ["Add income and expense transactions with unique IDs", "Overdraft protection when an expense exceeds the balance", "Search by ID and delete with confirmation", "All-time, monthly, and yearly statistics", "Date validation including leap years"],
      ar: ["إضافة معاملات الدخل والمصروفات بمعرّفات فريدة", "حماية من السحب الزائد عندما يتجاوز المصروف الرصيد", "البحث بالمعرّف والحذف بعد التأكيد", "إحصائيات شاملة وشهرية وسنوية", "التحقق من التواريخ مع مراعاة السنوات الكبيسة"] },
    tech: ["C++", "File handling", "Visual Studio"],
    learned: { en: "I practiced input validation, transaction IDs, file handling, and building financial summaries.", ar: "تدرّبت على التحقق من المدخلات ومعرّفات المعاملات والتعامل مع الملفات وبناء الملخصات المالية." },
    repo: "https://github.com/omar-ahmed8581716/Expense-Tracker-CPP" },
  { slug: "math-quiz", title: { en: "Math Quiz", ar: "اختبار الرياضيات" },
    summary: { en: "A console quiz that generates arithmetic questions across difficulty levels.", ar: "تطبيق تفاعلي لتوليد واختبار العمليات الرياضية بمستويات صعوبة متعددة." },
    purpose: { en: "Practice modular design by generating problems dynamically and giving clear feedback to the player.", ar: "التدرّب على التصميم المقسّم إلى وحدات عبر توليد المسائل ديناميكيًا وتقديم ملاحظات واضحة للاعب." },
    features: { en: ["Dynamically generated arithmetic problems", "Difficulty levels and several arithmetic operations", "Colored feedback on answers", "Modular functions with structs and enums"],
      ar: ["مسائل حسابية تُولَّد ديناميكيًا", "مستويات صعوبة وعدة عمليات حسابية", "ملاحظات ملوّنة على الإجابات", "دوال معيارية مع structs وenums"] },
    tech: ["C++", "Code::Blocks"],
    learned: { en: "I practiced generating questions, handling different operations and levels, and splitting logic into reusable functions.", ar: "تدرّبت على توليد الأسئلة والتعامل مع العمليات والمستويات المختلفة وتقسيم المنطق إلى دوال قابلة لإعادة الاستخدام." },
    duration: { en: "About 7 days", ar: "حوالي 7 أيام" }, repo: "https://github.com/omar-ahmed8581716/Project-Math-Quiz-" },
  { slug: "rock-paper-scissors", title: { en: "Rock Paper Scissors", ar: "حجر ورقة مقص" },
    summary: { en: "A console game played against the computer, built from small, connected functions.", ar: "لعبة تفاعلية على الطرفية ضد الحاسوب، مبنية من دوال صغيرة مترابطة." },
    purpose: { en: "One of my first independent C++ projects, written to practice organizing a full program from start to finish.", ar: "من أولى مشاريعي المستقلة بلغة C++، كتبته للتدرّب على تنظيم برنامج كامل من البداية إلى النهاية." },
    features: { en: ["Play against the computer in the terminal", "Code organized with functions, structs, and enums", "Input validation that rejects invalid choices", "Terminal colors change for a win, loss, or draw"],
      ar: ["اللعب ضد الحاسوب في الطرفية", "تنظيم الكود بالدوال وstructs وenums", "التحقق من المدخلات ورفض الاختيارات غير الصالحة", "تتغيّر ألوان الطرفية عند الفوز أو الخسارة أو التعادل"] },
    tech: ["C++", "Code::Blocks"],
    learned: { en: "I learned to connect functions, manage the game flow, and keep the program's logic organized.", ar: "تعلّمت ربط الدوال وإدارة تدفق اللعبة وتنظيم منطق البرنامج." },
    duration: { en: "About 4 days", ar: "حوالي 4 أيام" }, repo: "https://github.com/omar-ahmed8581716/project-Stone-paper-and-Scissores-" },
];
// Newest to oldest: the `projects` array order is the All Projects page order. Homepage featured projects, in display order:
export const featuredSlugs = ["bank-system", "expense-tracker", "math-quiz"];
export const strengths: L<string[]> = {
  en: ["Procedural Architecture & Modular Design", "Data Structures & Algorithms (STL)", "File Handling & Data Persistence", "Robust Input Validation & Edge-Case Handling", "Algorithmic Problem Solving", "Console Application Development"],
  ar: ["البرمجة الإجرائية والتصميم المعياري", "هياكل البيانات والخوارزميات (STL)", "التعامل مع الملفات وحفظ البيانات", "تحقق قوي من المدخلات ومعالجة الحالات الحدّية", "حل المشكلات الخوارزمية", "تطوير تطبيقات سطر الأوامر"] };
export const aboutSkills: L<string[]> = {
  en: ["Core C++ & Procedural Programming", "Data Structures & Algorithms (STL)", "File Handling & Persistence (fstream)", "Input Validation & Error Handling", "Problem Solving (Codeforces / Online Judges)", "Git & Version Control"],
  ar: ["أساسيات C++ والبرمجة الإجرائية", "هياكل البيانات والخوارزميات (STL)", "التعامل مع الملفات وحفظ البيانات (fstream)", "التحقق من المدخلات ومعالجة الأخطاء", "حل المشكلات (Codeforces / منصات الحل)", "Git والتحكم في الإصدارات"] };

// ---------------------------------------------------------------------------------------------------------
// CERTIFICATES
// To add a certificate: 1) put two images in public/certificates/  ->  <id>.webp (full size, ~1600px wide)
//                          and <id>-thumb.webp (thumbnail, ~640px wide);  2) add ONE object to `certificates` below.
// Titles are copied exactly as printed on each certificate and are NOT translated (use same("...") for them).
// `review: true` keeps a certificate off the website until it is approved (remove the flag to publish it).
// ---------------------------------------------------------------------------------------------------------
export type CertCategory = "programming" | "ai" | "personal" | "other";
export type CertKind = "completion" | "graduation" | "attendance" | "achievement" | "participation" | "appreciation" | "acknowledgement"; // wording printed on the certificate
export type Certificate = { id: string; category: CertCategory; title: L; issuer: L; kind: CertKind; date?: string | L; hours?: number; review?: boolean; pdf?: boolean }; // pdf: an untouched original PDF sits next to the webp as /certificates/<id>.pdf
export const certCategories: CertCategory[] = ["programming", "ai", "personal", "other"];
const same = (s: string): L => ({ en: s, ar: s });
const PA = same("ProgrammingAdvices");
export const certificates: Certificate[] = [
  // ---- Programming & Problem Solving: ProgrammingAdvices courses 01-09, in course order (titles exactly as printed).
  { id: "pa-01-programming-foundations-l1", category: "programming", title: same("01 - Programming Foundations - Level 1"), issuer: PA, kind: "completion", date: "2026-05-02" },
  { id: "pa-02-algorithms-problem-solving-l1", category: "programming", title: same("02 - Algorithms & Problem-Solving Level 1"), issuer: PA, kind: "completion", date: "2026-05-02" },
  { id: "pa-03-intro-cpp-l1", category: "programming", title: same("03 - Introduction to Programming with C++ \u2013 Level 1"), issuer: PA, kind: "completion", date: "2026-05-22" },
  { id: "pa-04-algorithms-problem-solving-l1-solutions", category: "programming", title: same("04 - Algorithms & Problem-Solving \u2013 Level 1 (Solutions)"), issuer: PA, kind: "completion", date: "2026-06-17" },
  { id: "pa-05-algorithms-problem-solving-l2", category: "programming", title: same("05 - Algorithms & Problem-Solving \u2013 Level 2"), issuer: PA, kind: "graduation", date: "2026-07-23" },
  { id: "pa-06-intro-cpp-l2", category: "programming", title: same("06 - Introduction to Programming Using C++ Level 2"), issuer: PA, kind: "attendance", date: "2026-07-31" },
  { id: "pa-07-algorithms-problem-solving-l3", category: "programming", title: same("07 - Algorithms & Problem Solving Level 3"), issuer: PA, kind: "attendance", date: "2026-09-18" },
  { id: "pa-08-algorithms-problem-solving-l4", category: "programming", title: same("08 - Algorithms & Problem Solving Level 4"), issuer: PA, kind: "completion", date: "2026-10-26", pdf: true },
  { id: "pa-09-foundations-l2", category: "programming", title: same("09 - Foundations Level 2"), issuer: PA, kind: "attendance", date: "2026-11-01", pdf: true },
  // ---- Artificial Intelligence
  { id: "ai-ambassadors", category: "ai", title: same("Artificial Intelligence Ambassadors Program"), kind: "completion", date: "05-09-2026",
    issuer: { en: "Ministry of Communications and Information Technology (NTI)", ar: "وزارة الاتصالات وتكنولوجيا المعلومات (المعهد القومي للاتصالات)" } },
  { id: "ai-iao-training", category: "ai", title: same("Artificial Intelligence"), issuer: same("International Accredited Institution (IAO)"), kind: "achievement", date: { en: "Feb 2026", ar: "فبراير 2026" }, hours: 15 },
  { id: "ai-bue-fundamentals", category: "ai", title: same("Fundamentals and Applications in Artificial Intelligence"), kind: "attendance", date: "24/1/2026 \u2013 26/1/2026", hours: 12,
    issuer: { en: "The British University in Egypt (School of Continuing Education)", ar: "الجامعة البريطانية في مصر" } },
  { id: "ai-system-analysis", category: "ai", title: same("system analysis using Ai csw"), kind: "completion", date: "4/12/2025 \u2013 8/12/2025",
    issuer: { en: "Microsoft Egypt \u00b7 CARE Egypt \u00b7 Ministry of Youth and Sports", ar: "مايكروسوفت مصر \u00b7 كير مصر \u00b7 وزارة الشباب والرياضة" } },
  { id: "ai-genai-tools", category: "ai", title: same("Generative Ai Tools CSW"), kind: "completion", date: "1/12/2025 \u2013 3/12/2025",
    issuer: { en: "Microsoft Egypt \u00b7 CARE Egypt \u00b7 Ministry of Youth and Sports", ar: "مايكروسوفت مصر \u00b7 كير مصر \u00b7 وزارة الشباب والرياضة" } },
  { id: "ai-million-prompters", category: "ai", title: { en: "One Million Prompters", ar: "مليون خبير لأوامر الذكاء الاصطناعي" }, kind: "completion",
    issuer: { en: "Dubai Future Foundation \u2013 Dubai Centre for Artificial Intelligence", ar: "مؤسسة دبي للمستقبل \u2013 مركز دبي لاستخدامات الذكاء الاصطناعي" } },
  // ---- Personal Development
  { id: "pd-communication-skills", category: "personal", title: { en: "Communication Skills", ar: "كورس مهارات التواصل" }, issuer: same("STJEGYPT"), kind: "achievement", date: "2026-01-12" },
  { id: "pd-soft-skills-teaching", category: "personal", title: same("Soft Skills - Teaching skills"), issuer: { en: "M3aarf Platform", ar: "منصة معارف" }, kind: "achievement", date: "2026-01-10" },
  // REVIEW (display title): the certificate names the session "THIS IS MY YEAR" (a Life Reshaping Coach session).
  { id: "pd-this-is-my-year", category: "personal", title: same("This Is My Year"), issuer: { en: "Mohamed El-Tayeb (Life Reshaping Coach)", ar: "محمد الطيب (Life Reshaping Coach)" }, kind: "participation", date: { en: "3 January 2026", ar: "3 يناير 2026" } },
  { id: "pd-time-management", category: "personal", title: same("Time management"), issuer: { en: "M3aarf Platform", ar: "منصة معارف" }, kind: "achievement", date: "2025-12-28" },
  // REVIEW (display title): built from the text "Career X Camp ... LinkedIn Optimization and Employability skills". No date is printed.
  { id: "pd-career-x-camp", category: "personal", title: same("Career X Camp: LinkedIn Optimization and Employability skills"), issuer: same("CourCV Academy"), kind: "participation" },
  // ---- Other Fields
  // The volunteering certificate (issued by Youth Development Pioneers, YDP). It is also shown as an image in the About page. No date is printed on it.
  { id: "ydp-ctrl-your-future", category: "other", title: same("CTRL YOUR FUTURE"), kind: "appreciation",
    issuer: { en: "Youth Development Pioneers (YDP) \u00b7 Ministry of Youth and Sports", ar: "رواد التطوير والتنمية الشبابية (YDP) \u00b7 وزارة الشباب والرياضة" } },
  // REVIEW (display title): the certificate does not name the programme beyond "innovegypt program"; it states a 45-hour training course with a final project for a potential startup. No date is printed.
  { id: "other-innovegypt-program", category: "other", title: same("InnovEgypt Program"), kind: "acknowledgement", hours: 45,
    issuer: { en: "IT Industry Development Agency (ITIDA) \u00b7 TIEC", ar: "هيئة تنمية صناعة تكنولوجيا المعلومات (إيتيدا) \u00b7 TIEC" } },
  // ---- Held back until approved: subject of the course is not stated on the certificate (two files carry the same certificate number).
  { id: "coursat-adrik-omrak", category: "personal", review: true, title: same("كورس أدرك عمرك"), issuer: same("Coursat Plus"), kind: "completion", date: { en: "6 October 2026", ar: "6 أكتوبر 2026" } },
];
