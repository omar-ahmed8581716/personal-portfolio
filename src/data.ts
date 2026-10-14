// ALL editable content lives here, in English (en) and Arabic (ar).
// To add a project, copy one object in `projects` and fill both languages.
export type L<T = string> = { en: T; ar: T };
export const profile = {
  name: { en: "Omar Ahmed", ar: "عمر أحمد" } as L,
  headline: { en: "Computer Science Student | Aspiring Full-Stack Developer", ar: "طالب علوم حاسب | مطوّر Full-Stack طموح" } as L,
  intro: { en: "Second-year student at Al-Azhar University building a strong foundation in C++, problem solving, and software development.", ar: "طالب في السنة الثانية بجامعة الأزهر، أبني أساسًا قويًا في لغة C++ وحل المشكلات وتطوير البرمجيات." } as L,
  email: "o8581716@gmail.com",
  whatsapp: "https://wa.me/201012975889", whatsappLabel: "+20 101 297 5889",
  telegram: "https://t.me/+201036612436",
  phone: "+201036612436", phoneLabel: "+20 103 661 2436",
  linkedin: "https://www.linkedin.com/in/omar-ahmed-ghazi",
  github: "https://github.com/omar-ahmed8581716",
  facebook: "https://www.facebook.com/omar.ahmed.432729?locale=ar_AR",
};
export type Project = { slug: string; title: L; summary: L; purpose: L; features: L<string[]>; tech: string[]; learned: L; duration?: L; repo: string; demo?: string };
export const projects: Project[] = [
  { slug: "expense-tracker", title: { en: "Expense Tracker", ar: "متتبع المصروفات" },
    summary: { en: "A console app for tracking income and expenses with financial summaries.", ar: "تطبيق متكامل لإدارة وتتبع المعاملات المالية والمصروفات مع حفظ البيانات محلياً." },
    purpose: { en: "Manage personal finances from the terminal while practicing validation and data persistence.", ar: "إدارة المالية الشخصية من الطرفية مع التدرّب على التحقق من المدخلات وحفظ البيانات." },
    features: { en: ["Add income and expense transactions with unique IDs", "Overdraft protection when an expense exceeds the balance", "Search by ID and delete with confirmation", "All-time, monthly, and yearly statistics", "Date validation including leap years"],
      ar: ["إضافة معاملات الدخل والمصروفات بمعرّفات فريدة", "حماية من السحب الزائد عندما يتجاوز المصروف الرصيد", "البحث بالمعرّف والحذف بعد التأكيد", "إحصائيات شاملة وشهرية وسنوية", "التحقق من التواريخ مع مراعاة السنوات الكبيسة"] },
    tech: ["C++", "File handling"],
    learned: { en: "I practiced input validation, transaction IDs, file handling, and building financial summaries.", ar: "تدرّبت على التحقق من المدخلات ومعرّفات المعاملات والتعامل مع الملفات وبناء الملخصات المالية." },
    repo: "https://github.com/omar-ahmed8581716/Expense-Tracker-CPP" },
  { slug: "bank-system", title: { en: "Bank System", ar: "النظام البنكي" },
    summary: { en: "A console app for managing client accounts and transactions, saved to a local file.", ar: "نظام برمجي لإدارة حسابات العملاء والعمليات المصرفية بالاعتماد على البرمجة الإجرائية والملفات." },
    purpose: { en: "Practice file handling and record management while keeping stored data consistent between runs.", ar: "التدرّب على التعامل مع الملفات وإدارة السجلات مع الحفاظ على اتساق البيانات المخزّنة بين مرات التشغيل." },
    features: { en: ["Show, add, search, update, and delete clients", "Deposit and withdraw with balance validation", "Display total balances", "Client data saved to and loaded from a text file"],
      ar: ["عرض العملاء وإضافتهم والبحث عنهم وتعديلهم وحذفهم", "الإيداع والسحب مع التحقق من الرصيد", "عرض إجمالي الأرصدة", "حفظ بيانات العملاء وتحميلها من ملف نصي"] },
    tech: ["C++", "std::vector", "fstream"],
    learned: { en: "I practiced file handling, record management, string parsing, and connecting many functions while preserving stored data.", ar: "تدرّبت على التعامل مع الملفات وإدارة السجلات وتحليل النصوص وربط عدة دوال معًا مع الحفاظ على البيانات المخزّنة." },
    duration: { en: "About 7 days", ar: "حوالي 7 أيام" }, repo: "https://github.com/omar-ahmed8581716/Bank-System-Project" },
  { slug: "math-quiz", title: { en: "Math Quiz", ar: "اختبار الرياضيات" },
    summary: { en: "A console quiz that generates arithmetic questions across difficulty levels.", ar: "تطبيق تفاعلي لتوليد واختبار العمليات الرياضية بمستويات صعوبة متعددة." },
    purpose: { en: "Practice modular design by generating problems dynamically and giving clear feedback to the player.", ar: "التدرّب على التصميم المقسّم إلى وحدات عبر توليد المسائل ديناميكيًا وتقديم ملاحظات واضحة للاعب." },
    features: { en: ["Dynamically generated arithmetic problems", "Difficulty levels and several arithmetic operations", "Colored feedback on answers", "Modular functions with structs and enums"],
      ar: ["مسائل حسابية تُولَّد ديناميكيًا", "مستويات صعوبة وعدة عمليات حسابية", "ملاحظات ملوّنة على الإجابات", "دوال معيارية مع structs وenums"] },
    tech: ["C++", "VS Code"],
    learned: { en: "I practiced generating questions, handling different operations and levels, and splitting logic into reusable functions.", ar: "تدرّبت على توليد الأسئلة والتعامل مع العمليات والمستويات المختلفة وتقسيم المنطق إلى دوال قابلة لإعادة الاستخدام." },
    duration: { en: "About 7 days", ar: "حوالي 7 أيام" }, repo: "https://github.com/omar-ahmed8581716/Project-Math-Quiz-" },
  { slug: "rock-paper-scissors", title: { en: "Rock Paper Scissors", ar: "حجر ورقة مقص" },
    summary: { en: "A console game played against the computer, built from small, connected functions.", ar: "لعبة تفاعلية على الطرفية ضد الحاسوب، مبنية من دوال صغيرة مترابطة." },
    purpose: { en: "One of my first independent C++ projects, written to practice organizing a full program from start to finish.", ar: "من أولى مشاريعي المستقلة بلغة C++، كتبته للتدرّب على تنظيم برنامج كامل من البداية إلى النهاية." },
    features: { en: ["Play against the computer in the terminal", "Code organized with functions, structs, and enums", "Input validation that rejects invalid choices", "Terminal colors change for a win, loss, or draw"],
      ar: ["اللعب ضد الحاسوب في الطرفية", "تنظيم الكود بالدوال وstructs وenums", "التحقق من المدخلات ورفض الاختيارات غير الصالحة", "تتغيّر ألوان الطرفية عند الفوز أو الخسارة أو التعادل"] },
    tech: ["C++", "VS Code"],
    learned: { en: "I learned to connect functions, manage the game flow, and keep the program's logic organized.", ar: "تعلّمت ربط الدوال وإدارة تدفق اللعبة وتنظيم منطق البرنامج." },
    duration: { en: "About 4 days", ar: "حوالي 4 أيام" }, repo: "https://github.com/omar-ahmed8581716/project-Stone-paper-and-Scissores-" },
];
export const strengths: L<string[]> = {
  en: ["Procedural Architecture & Modular Design", "Data Structures & Algorithms (STL)", "File Handling & Data Persistence", "Robust Input Validation & Edge-Case Handling", "Algorithmic Problem Solving", "Console Application Development"],
  ar: ["البرمجة الإجرائية والتصميم المعياري", "هياكل البيانات والخوارزميات (STL)", "التعامل مع الملفات وحفظ البيانات", "تحقق قوي من المدخلات ومعالجة الحالات الحدّية", "حل المشكلات الخوارزمية", "تطوير تطبيقات سطر الأوامر"] };
export const aboutSkills: L<string[]> = {
  en: ["Core C++ & Procedural Programming", "Data Structures & Algorithms (STL)", "File Handling & Persistence (fstream)", "Input Validation & Error Handling", "Problem Solving (Codeforces / Online Judges)", "Git & Version Control"],
  ar: ["أساسيات C++ والبرمجة الإجرائية", "هياكل البيانات والخوارزميات (STL)", "التعامل مع الملفات وحفظ البيانات (fstream)", "التحقق من المدخلات ومعالجة الأخطاء", "حل المشكلات (Codeforces / منصات الحل)", "Git والتحكم في الإصدارات"] };
