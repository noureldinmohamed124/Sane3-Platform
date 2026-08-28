export const NAV_LINKS = [
  { label: 'احنا مين', labelEn: 'Who We Are', href: '#about' },
  { label: 'بنعمل إيه', labelEn: 'What We Do', href: '#method' },
  { label: 'برامجنا', labelEn: 'Programs', href: '#programs' },
  { label: 'إنجازات الطلاب', labelEn: 'Showcase', href: '#showcase' },
];

export const MARQUEE_ITEMS = ['Software Engineering', 'Embedded Systems', 'IoT Hardware', 'Maker Robotics', 'AI & Intelligence', 'Need-First Learning'];

// 4 Pillars of a Sanea Graduate
export const GRADUATE_PILLARS = [
  {
    num: '01',
    title: 'الفهم والتحليل',
    titleEn: 'Understand & Analyze',
    sub: 'تحويل المشكلة والتحدي إلى متطلبات برمجية وهندسية محددة',
    subEn: 'Transforming real-world challenges into well-defined software & technical requirements',
    icon: '🔍',
  },
  {
    num: '02',
    title: 'التصميم البرمجي وهيكلة السوفت وير',
    titleEn: 'Software & UI/UX Design',
    sub: 'تصميم واجهات وتجربة المستخدم، وهيكلة كود السوفت وير والأدوات البرمجية',
    subEn: 'Designing intuitive user interfaces, UI/UX flows, and structuring clean software code',
    icon: '💻',
  },
  {
    num: '03',
    title: 'البناء والتكامل',
    titleEn: 'Build & Integrate',
    sub: 'كتابة الكود وربط الحساسات والخدمات وتجميع منتج شغال ومختبر',
    subEn: 'Writing robust code, wiring circuits, and assembling working, tested prototypes',
    icon: '⚡',
  },
  {
    num: '04',
    title: 'الإطلاق والعرض',
    titleEn: 'Launch & Ship',
    sub: 'نشر المشروع وتقديمه والدفاع عن كل قرار هندسي وبرمجي فيه',
    subEn: 'Deploying the product, presenting to peers, and defending technical decisions',
    icon: '🚀',
  },
];

// The 7 Identity Path Stages
export const IDENTITY_ARC_STAGES = [
  { id: 1, name: 'متابع', nameEn: 'Follower', desc: 'يلاحظ ويقلد الخطوات الأولى باهتمام' },
  { id: 2, name: 'مستكشف', nameEn: 'Explorer', desc: 'يجرب ويكتشف ويطرح الأسئلة' },
  { id: 3, name: 'حلّال مشاكل', nameEn: 'Problem Solver', desc: 'يحل التحديات المنطقية والأخطاء' },
  { id: 4, name: 'بنّاء', nameEn: 'Builder', desc: 'يبني مشاريع وميزات كاملة بتوجيه' },
  { id: 5, name: 'بنّاء مستقل', nameEn: 'Independent Builder', desc: 'يبني نماذج وتطبيقات بمفرده' },
  { id: 6, name: 'مهندس', nameEn: 'Engineer', desc: 'يصمم معماريات برمجية وإلكترونية متكاملة' },
  { id: 7, name: 'مبتكر', nameEn: 'Creator', desc: 'يطلق منتجات تكنولوجية من الصفر للواقع' },
];

// 8-Stage Learning Cycle
export const LEARNING_CYCLE_STAGES = [
  { step: 'SEE', title: 'شاهد', titleEn: 'SEE', desc: 'مشاهدة مشكلة حقيقية أو تحدي ناقص' },
  { step: 'THINK', title: 'فكر', titleEn: 'THINK', desc: 'تفكيك المشكلة وتحديد الفجوة المعرفية' },
  { step: 'LEARN', title: 'تعلم', titleEn: 'LEARN', desc: 'اكتساب المفهوم البرمجي/الهندسي المطلوب' },
  { step: 'BUILD', title: 'ابنِ', titleEn: 'BUILD', desc: 'تطبيق وبناء الميزة فوراً بالأيدي' },
  { step: 'TEST', title: 'اختبر', titleEn: 'TEST', desc: 'تجربة الكود واكتشاف الثغرات' },
  { step: 'IMPROVE', title: 'طور', titleEn: 'IMPROVE', desc: 'تحسين الأداء وإصلاح الأخطاء' },
  { step: 'REFLECT', title: 'تأمل', titleEn: 'REFLECT', desc: 'استخلاص الدروس وربط المهارة بالسياق' },
  { step: 'SHIP', title: 'أطلق', titleEn: 'SHIP', desc: 'إخراج منتج نهائي وتوثيق الدليل (Evidence)' },
];

// Real Showcases accurately matched with their respective images
export const SHOWCASE_PROJECTS = [
  {
    id: 1,
    image: '/images/showcases/showcase-1.webp',
    fallbackImage: '/images/showcases/showcase-1.jpeg',
    track: 'Robotics & Hardware',
    title: 'إشارة مرور تفاعلية باستخدام الأردوينو',
    titleEn: 'Interactive Arduino Traffic Light System',
    studentName: 'مريم طارق (13 سنة)',
    studentNameEn: 'Mariam Tarek (13 yrs)',
    problem: 'برمجة وتوصيل دائرة إلكترونية متكاملة تحاكي نظام إشارات المرور الذكية باستخدام متحكم Arduino C++ ومؤقتات زمنية.',
    problemEn: 'Building and programming an electronic circuit simulating smart traffic systems using Arduino C++ and timing states.',
    tools: ['Arduino C++', 'LED Circuits', 'Breadboard Wiring', 'Logic Timers'],
    evidenceBadge: 'مشروع سمستر مكتمل',
    evidenceBadgeEn: 'Completed Semester Project',
  },
  {
    id: 2,
    image: '/images/showcases/showcase-2.webp',
    fallbackImage: '/images/showcases/showcase-2.jpeg',
    track: 'Visual Programming & Scratch',
    title: 'لعبة تفاعلية على سكراتش',
    titleEn: 'Interactive Scratch Game',
    studentName: 'أحمد محمود (11 سنة)',
    studentNameEn: 'Ahmed Mahmoud (11 yrs)',
    problem: 'بناء وتصميم لعبة تفاعلية كاملة تعتمد على المنطق البرمجي، تصادم الكائنات، والتحكم بالحركة والنقاط.',
    problemEn: 'Designing a fully interactive game with sprite collision physics, game loops, and scoring logic.',
    tools: ['Scratch 3.0', 'Visual Logic', 'Game Design', 'Algorithms'],
    evidenceBadge: 'دليل مهارة موثق في الجواز',
    evidenceBadgeEn: 'Verified Passport Evidence',
  },
  {
    id: 3,
    image: '/images/showcases/showcase-3.webp',
    fallbackImage: '/images/showcases/showcase-3.jpeg',
    track: 'Electronics & Simulation',
    title: 'محاكاة الدوائر الإلكترونية والأنظمة المدمجة',
    titleEn: 'Electronic Circuits & Simulation',
    studentName: 'عمر إبراهيم (16 سنة)',
    studentNameEn: 'Omar Ibrahim (16 yrs)',
    problem: 'تصميم ومحاكاة الدوائر الإلكترونية واختبار تدفق التيار وعمل الحساسات والمفاتيح قبل التنفيذ العملي.',
    problemEn: 'Simulating electronic circuits, current flows, sensors behavior, and logic gates before physical build.',
    tools: ['Circuit Simulation', 'Sensors Suite', 'Breadboard', 'Logic Gates'],
    evidenceBadge: 'مشروع هندسي متقدم',
    evidenceBadgeEn: 'Advanced Engineering Build',
  },
  {
    id: 4,
    image: '/images/showcases/showcase-4.webp',
    fallbackImage: '/images/showcases/showcase-4.jpeg',
    track: 'Creative Logic & Scratch',
    title: 'مشروع لعبة تفاعلية على سكراتش',
    titleEn: 'Interactive Scratch Maze Game',
    studentName: 'يوسف حسام (12 سنة)',
    studentNameEn: 'Youssef Hossam (12 yrs)',
    problem: 'تطوير لعبة متاهة تفاعلية متعددة المستويات مع تسجيل النقاط وتفاعل المستخدم والأصوات التفاعلية.',
    problemEn: 'Developing a multi-level maze game with user scoring state, interactive audio, and collision detection.',
    tools: ['Scratch 3.0', 'Maze Logic', 'Event Handling', 'Physics Logic'],
    evidenceBadge: 'إنجاز مرحلي متميز',
    evidenceBadgeEn: 'Distinct Milestone Build',
  },
];
