export const NAV_LINKS = [
  { label: 'احنا مين', labelEn: 'Who We Are', href: '#about' },
  { label: 'بنعمل إيه', labelEn: 'What We Do', href: '#method' },
  { label: 'برامجنا', labelEn: 'Programs', href: '#programs' },
  { label: 'إنجازات الطلاب', labelEn: 'Showcase', href: '#showcase' },
  { label: 'فريق العمل', labelEn: 'Our Team', href: '#team' },
];

export const MARQUEE_ITEMS = ['Software Engineering', 'Embedded Systems', 'IoT Hardware', 'Maker Robotics', 'AI & Intelligence', 'Need-First Learning'];

// 4 Pillars of a Sanea Graduate
export const GRADUATE_PILLARS = [
  {
    num: '01',
    title: 'الفهم والتحليل',
    titleEn: 'Understand',
    sub: 'تحويل المشكلة المبهمة إلى متطلبات هندسية محددة',
    subEn: 'Transforming ambiguous challenges into well-defined engineering requirements',
    icon: '🔍',
  },
  {
    num: '02',
    title: 'التصميم والمعمارية',
    titleEn: 'Design',
    sub: 'اقتراح معمارية الحل واختيار الأدوات وتبرير القرارات',
    subEn: 'Proposing system architecture, selecting tools, and justifying technical trade-offs',
    icon: '📐',
  },
  {
    num: '03',
    title: 'البناء والتكامل',
    titleEn: 'Build',
    sub: 'كتابة الكود وربط الحساسات وتجميع منتج شغال ومختبر',
    subEn: 'Writing robust code, wiring circuits, and assembling working, tested prototypes',
    icon: '⚡',
  },
  {
    num: '04',
    title: 'الإطلاق والعرض',
    titleEn: 'Launch',
    sub: 'نشر المشروع وتقديمه والدفاع عن كل قرار هندسي فيه',
    subEn: 'Deploying the product, presenting to peers, and competing in tech events',
    icon: '🚀',
  },
];

// The 7 Identity Arc Stages
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

// Real Showcases with Assets
export const SHOWCASE_PROJECTS = [
  {
    id: 1,
    image: '/images/showcases/showcase-1.jpeg',
    track: 'Robotics & Hardware',
    title: 'روبوت ذكي ذاتي القيادة والتتبع',
    titleEn: 'Autonomous Smart Line-Tracker Robot',
    studentName: 'أحمد محمود (13 سنة)',
    studentNameEn: 'Ahmed Mahmoud (13 yrs)',
    problem: 'تصميم روبوت يستشعر المسار ويتفادى العوائق تلقائياً للمشاركة في مسابقات الروبوتيكس.',
    problemEn: 'Designing a robot that tracks tracks and autonomously avoids obstacles for robotics competitions.',
    tools: ['Arduino C++', 'IR Sensors', 'Motor Drivers', 'Chassis Design'],
    evidenceBadge: 'دليل مهارة موثق في الجواز',
    evidenceBadgeEn: 'Verified Passport Evidence',
  },
  {
    id: 2,
    image: '/images/showcases/showcase-2.jpeg',
    track: 'Embedded & IoT',
    title: 'نظام إنذار ومراقبة ذكي بالحساسات',
    titleEn: 'Smart IoT Environmental Alarm System',
    studentName: 'مريم طارق (15 سنة)',
    studentNameEn: 'Mariam Tarek (15 yrs)',
    problem: 'بناء دائرة متصلة بالإنترنت تقيس المتغيرات البيئية وترسل تنبيهات فورية للهاتف.',
    problemEn: 'Building an IoT circuit measuring environmental factors and dispatching live mobile alerts.',
    tools: ['ESP32', 'Sensors Suite', 'MQTT Protocol', 'C++'],
    evidenceBadge: 'مشروع سمستر مكتمل',
    evidenceBadgeEn: 'Completed Semester Project',
  },
  {
    id: 3,
    image: '/images/showcases/showcase-3.jpeg',
    track: 'Software Engineering',
    title: 'لعبة تفاعلية متعددة المراحل',
    titleEn: 'Multi-Level 2D Physics Game Engine',
    studentName: 'يوسف حسام (11 سنة)',
    studentNameEn: 'Youssef Hossam (11 yrs)',
    problem: 'بناء منطق ألعاب ديناميكي يتضمن حسابات الحركة وتخزين النقاط المستمر.',
    problemEn: 'Crafting game dynamics with velocity physics, collision detection, and persistent state storage.',
    tools: ['Visual Logic', 'Algorithms', 'Sprite Physics', 'Variables State'],
    evidenceBadge: 'إنجاز مرحلي متميز',
    evidenceBadgeEn: 'Distinct Milestone Build',
  },
  {
    id: 4,
    image: '/images/showcases/showcase-4.jpeg',
    track: 'Full Stack & APIs',
    title: 'منظومة حجز وإدارة المهام الموزعة',
    titleEn: 'Distributed Task & Booking Management Platform',
    studentName: 'عمر إبراهيم (19 سنة)',
    studentNameEn: 'Omar Ibrahim (19 yrs)',
    problem: 'تطوير نظام Backend كامل بالمعمارية النظيفة Clean Architecture وقواعد البيانات العلائقية.',
    problemEn: 'Developing a complete Backend system adhering to Clean Architecture and SQL relational data models.',
    tools: ['C# .NET Core', 'SQL Server', 'Entity Framework', 'RESTful APIs'],
    evidenceBadge: 'مشروع تخرج احترافي',
    evidenceBadgeEn: 'Professional Diploma Capstone',
  },
];

// Team Members and Expertise (Learning Engineers & Pedagogy)
export const TEAM_MEMBERS = [
  {
    id: 1,
    name: 'م. حسام علام',
    nameEn: 'Eng. Hossam Allam',
    role: 'رئيس المناهج وهندسة التعلم',
    roleEn: 'Head of Curriculum & Learning Engineering',
    bio: 'خبير هندسة برمجيات وبناء مناهج، قاد تصميم شجرة المعرفة ودورة التعلم القائمة على الاحتياج أولاً.',
    bioEn: 'Software engineering specialist and curriculum architect leading Sanea Knowledge Graph and Need-First cycles.',
    domain: 'Software Architecture & Pedagogy',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
  },
  {
    id: 2,
    name: 'م. نور الدين محمد',
    nameEn: 'Eng. Noureldin Mohamed',
    role: 'مهندس نظم مدمجة وروبوتيكس',
    roleEn: 'Lead Embedded Systems & Robotics Mentor',
    bio: 'متخصص في تصميم الأنظمة المدمجة والروبوتات المتقدمة، ومدرب فرق للمسابقات الإقليمية والدولية.',
    bioEn: 'Expert in embedded hardware, smart robotics, and mentoring award-winning competition teams.',
    domain: 'Embedded Systems, IoT & Robotics',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
  },
  {
    id: 3,
    name: 'م. سارة المهدي',
    nameEn: 'Eng. Sara El-Mahdy',
    role: 'مهندسة برمجيات وتوجيه ناشئين',
    roleEn: 'Youth Software Mentor & Learning Engineer',
    bio: 'شغوفة بتبسيط المفاهيم الخوارزمية وتمكين الناشئين من تحويل الأفكار إلى ألعاب وتطبيقات حية.',
    bioEn: 'Dedicated to simplifying algorithmic logic and guiding junior builders to build real applications.',
    domain: 'Creative Coding & Logic Architecture',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
  },
  {
    id: 4,
    name: 'م. أحمد الشناوي',
    nameEn: 'Eng. Ahmed El-Shennawy',
    role: 'قائد جودة الورش والتقييم',
    roleEn: 'Workshop Quality & Student Experience Lead',
    bio: 'مهندس عمليات تعليمية يضمن معايير التوجيه التدريجي وجودة أدلة جواز سفر الطالب في كل ورشة.',
    bioEn: 'Operations and quality lead ensuring gradual release standards and Student Passport authenticity.',
    domain: 'Quality Audit & Operations',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
  },
];
