import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const initialLng = typeof window !== 'undefined'
  ? localStorage.getItem('sanea_lang') || 'ar'
  : 'ar';

if (typeof window !== 'undefined') {
  document.documentElement.setAttribute('lang', initialLng);
  document.documentElement.setAttribute('dir', initialLng === 'ar' ? 'rtl' : 'ltr');
}

const resources = {
  ar: {
    translation: {
      brand: 'صانع',
      subBrand: 'SANE3 PLATFORM',
      tagline: 'من الاحتياج... للصنعة',
      slogan: 'Learn by Building',
      bookTrial: 'احجز حصة تجريبية',
      bookFreeTrial: 'احجز حصة تجريبية مجانية',
      howItWorks: 'إزاي بنشتغل ↓',
      heroEyebrow: 'منهجية قائمة على المشاريع — من سن ٦ إلى ١٨',
      heroTitle1: 'الاحتياج بييجي الأول',
      heroTitleHighlight: 'والمعرفة',
      heroTitle2: 'بعده.',
      heroDesc: 'في صانع، كل طالب بيبدأ بمشروع حقيقي مش بمنهج جامد. بيتعلم البرمجة، الإلكترونيات، والذكاء الاصطناعي لأنه محتاجها فعلاً — وبيخلص مش بشهادة، لكن بحاجة عملها بإيده.',
      microcopy: 'لا يوجد التزام مسبق · الحصة الأولى مجانية',
      needJourney: 'رحلة الاحتياج',
      needJourneyCaption: 'مشروع ← تحليل ← فجوة معرفية ← شرارة حماس ← صنعة',
      robotics: 'روبوتيكس',
      ai: 'ذكاء اصطناعي',
      nav: {
        method: 'طريقتنا',
        tracks: 'البرامج',
        showcase: 'معرض الإنجازات',
        students: 'من الورش',
        parents: 'لأولياء الأمور',
      },
      method: {
        kicker: 'طريقتنا',
        title: 'مش بنشرح المفهوم الأول. بنخلق الاحتياج له.',
        desc: 'كل حصة بتتبني على نفس الدورة: نحط الطالب قدام مشكلة حقيقية، وهو بنفسه بيوصل للحاجة اللي محتاج يتعلمها عشان يحلها.',
      },
      tracks: {
        kicker: 'البرامج',
        title: 'خمس مسارات، منهجية واحدة',
        desc: 'البرمجة، الأنظمة المدمجة، إنترنت الأشياء، الروبوتيكس، والذكاء الاصطناعي — كلها بتتعلّم بنفس طريقة "الاحتياج يولّد المعرفة".',
        ageLabel: 'الفئة العمرية',
      },
      showcase: {
        kicker: 'معرض الإنجازات',
        title: 'مش أفكار على الورق. منتجات شغالة فعلاً.',
        desc: 'عينة من المشاريع اللي بيوصلها الطالب — كل واحد منها بدأ بسؤال "أنا محتاج أعمل إيه؟" وخلص بحاجة بتشتغل.',
        completed: 'مكتمل',
        makerStarted: 'صانع بدأ بمشروع',
      },
      students: {
        kicker: 'من الورش',
        title: 'مش شرح على السبورة. ده أطفال بيبنوا فعلاً.',
        desc: 'المكان ده جاهز لصور حقيقية من كل ورشة — استبدل أي إطار بصورة فعلية من الجلسات أول ما تتصور.',
      },
      parents: {
        kicker: 'لأولياء الأمور',
        title: 'مش عايزين شهادة تانية. عايزين حاجة يبنوها بإيدهم.',
        follower: 'متابع',
        maker: 'صانع',
      },
      trial: {
        title: 'جاهز تشوف الفرق بنفسك؟',
        desc: 'الحصة الأولى مجانية بالكامل. اختر المسار المناسب وسجّل بياناتك في دقيقة واحدة.',
        cta: 'احجز مكانك دلوقتي',
      },
      enrollment: {
        badge: 'ENROLLMENT APPLICATION',
        stepOf: 'الخطوة {{current}} من {{total}}',
        completed: 'مكتمل',
        next: 'التالي',
        prev: 'السابق',
        submit: 'تأكيد وإرسال طلب الالتحاق',
        submitting: 'جاري الإرسال...',
        selectProgramPrompt: '-- اختر البرنامج الأكاديمي --',
        availableCourses: 'الدورات المتاحة (Available Courses) *',
        selectProgramFirst: 'يرجى اختيار البرنامج الأكاديمي أولاً لعرض الدورات المتاحة',
        loadingCourses: 'جاري تحميل الدورات المتاحة...',
        selectedBadge: 'مختار (Selected)',
        weeks: 'أسابيع',
        sessions: 'سيشن',
        age: 'السن',
        years: 'سنة',
        laptopRequired: 'يتطلب لابتوب',
      },
      footer: {
        brandDesc: 'تحويل الطلاب من مستهلكين للتكنولوجيا إلى صناع ومبتكرين عبر التعلم القائم على المشاريع والتوجيه الهندسي المستمر.',
        rights: '© 2026 صانع | Sane3 Platform. جميع الحقوق محفوظة.',
        privacy: 'سياسة الخصوصية',
        terms: 'الشروط والأحكام',
        cookies: 'سياسة ملفات الكوكيز',
      },
    },
  },
  en: {
    translation: {
      brand: 'Sanea',
      subBrand: 'SANEA PLATFORM',
      tagline: 'From Need... to Craft',
      slogan: 'Learn by Building',
      bookTrial: 'Book a Trial Class',
      bookFreeTrial: 'Book a Free Trial Class',
      howItWorks: 'How It Works ↓',
      heroEyebrow: 'Project-based learning — Ages 6 to 18',
      heroTitle1: 'Need comes first.',
      heroTitleHighlight: 'Knowledge',
      heroTitle2: 'follows.',
      heroDesc: 'At Sanea, every student starts with a real project, not a rigid curriculum. They learn programming, electronics, and AI because they truly need them — finishing not with just a certificate, but a product built by their own hands.',
      microcopy: 'No commitment required · First class is free',
      needJourney: 'The Need Journey',
      needJourneyCaption: 'Project → Analysis → Knowledge Gap → Spark → Craft',
      robotics: 'Robotics',
      ai: 'AI',
      nav: {
        method: 'Method',
        tracks: 'Programs',
        showcase: 'Showcase',
        students: 'From Workshops',
        parents: 'For Parents',
      },
      method: {
        kicker: 'Our Method',
        title: "We don't teach the concept first. We create the need for it.",
        desc: 'Every session follows the same cycle: we present students with a real challenge, and they discover the exact knowledge required to solve it.',
      },
      tracks: {
        kicker: 'Programs',
        title: 'Five Tracks, One Methodology',
        desc: 'Software, Embedded Systems, IoT, Robotics, and AI — all taught through the same "Need-First Learning" methodology.',
        ageLabel: 'Age Group',
      },
      showcase: {
        kicker: 'Showcase',
        title: 'Not ideas on paper. Products that actually work.',
        desc: 'A sample of student achievements — each project started with "What do I need to build?" and ended with a fully functional product.',
        completed: 'Completed',
        makerStarted: 'makers started with project',
      },
      students: {
        kicker: 'From the Workshops',
        title: 'Not whiteboard lectures. Real kids building real things.',
        desc: 'A showcase of genuine moments from our hands-on engineering workshops.',
      },
      parents: {
        kicker: 'For Parents',
        title: "They don't need another certificate. They need something they built themselves.",
        follower: 'Follower',
        maker: 'Maker',
      },
      trial: {
        title: 'Ready to see the difference from the first class?',
        desc: 'The first trial session is 100% free with no commitment. Choose your track and enroll in under 1 minute.',
        cta: 'Reserve Your Spot Now',
      },
      enrollment: {
        badge: 'ENROLLMENT APPLICATION',
        stepOf: 'Step {{current}} of {{total}}',
        completed: 'completed',
        next: 'Next',
        prev: 'Previous',
        submit: 'Confirm & Submit Application',
        submitting: 'Submitting...',
        selectProgramPrompt: '-- Select Academy Program --',
        availableCourses: 'Available Courses *',
        selectProgramFirst: 'Please select an academy program first to view available courses',
        loadingCourses: 'Loading available courses...',
        selectedBadge: 'Selected',
        weeks: 'weeks',
        sessions: 'sessions',
        age: 'Age',
        years: 'years',
        laptopRequired: 'Laptop Required',
      },
      footer: {
        brandDesc: 'Transforming students from passive tech consumers into active makers and innovators through project-first learning and engineering mentorship.',
        rights: '© 2026 Sanea | Sane3 Platform. All rights reserved.',
        privacy: 'Privacy Policy',
        terms: 'Terms of Service',
        cookies: 'Cookie Policy',
      },
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: initialLng,
    fallbackLng: 'ar',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
