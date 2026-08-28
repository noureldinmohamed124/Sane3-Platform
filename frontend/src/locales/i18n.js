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
      heroEyebrow: 'منهجية قائمة على المشاريع — من سن ٨ إلى ١٨ سنة',
      heroTitle1: 'الاحتياج بييجي الأول',
      heroTitleHighlight: 'والمعرفة',
      heroTitle2: 'بعده.',
      heroDesc: 'في صانع، كل طالب بيبدأ بمشروع حقيقي مش بمنهج جامد. بيتعلم البرمجة، الإلكترونيات، الروبوتكس، والذكاء الاصطناعي لأنه محتاجها فعلاً — وبيخلص مش بشهادة، لكن بمنتج عمله بإيده.',
      microcopy: 'لا يوجد التزام مسبق · الحصة الأولى مجانية',
      nav: {
        about: 'احنا مين',
        method: 'بنعمل إيه',
        programs: 'برامجنا',
        showcase: 'إنجازات الطلاب',
      },
      trial: {
        title: 'جاهز تشوف الفرق بنفسك؟',
        desc: 'الحصة الأولى مجانية بالكامل. اختر البرنامج الأكاديمي المناسب وسجّل بياناتك في دقيقة واحدة.',
        cta: 'احجز مكانك دلوقتي',
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
      heroEyebrow: 'Project-based learning — Ages 8 to 18',
      heroTitle1: 'Need comes first.',
      heroTitleHighlight: 'Knowledge',
      heroTitle2: 'follows.',
      heroDesc: 'At Sanea, every student starts with a real project, not a rigid curriculum. They learn programming, electronics, robotics, and AI because they truly need them — finishing not with just a certificate, but a product built by their own hands.',
      microcopy: 'No commitment required · First class is free',
      nav: {
        about: 'Who We Are',
        method: 'What We Do',
        programs: 'Programs',
        showcase: 'Showcase',
      },
      trial: {
        title: 'Ready to see the difference from the first class?',
        desc: 'The first trial session is 100% free with no commitment. Choose your academy program and enroll in under 1 minute.',
        cta: 'Reserve Your Spot Now',
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
