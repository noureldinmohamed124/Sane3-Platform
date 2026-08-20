import { create } from 'zustand';
import i18n from '../locales/i18n';

const initialTheme = typeof window !== 'undefined'
  ? localStorage.getItem('sanea_theme') || 'dark'
  : 'dark';

const initialLang = typeof window !== 'undefined'
  ? localStorage.getItem('sanea_lang') || 'ar'
  : 'ar';

if (typeof window !== 'undefined') {
  document.documentElement.setAttribute('data-theme', initialTheme);
  document.documentElement.setAttribute('lang', initialLang);
  document.documentElement.setAttribute('dir', initialLang === 'ar' ? 'rtl' : 'ltr');
}

export const useAppStore = create((set, get) => ({
  theme: initialTheme,
  lang: initialLang,
  isTrialModalOpen: false,
  selectedProgram: null,
  selectedCourse: null,
  isCourseModalOpen: false,
  courseModalProgram: null,

  toggleTheme: () => {
    const currentTheme = get().theme;
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    if (typeof window !== 'undefined') {
      localStorage.setItem('sanea_theme', nextTheme);
      document.documentElement.setAttribute('data-theme', nextTheme);
    }
    set({ theme: nextTheme });
  },

  toggleLang: () => {
    const currentLang = get().lang;
    const nextLang = currentLang === 'ar' ? 'en' : 'ar';
    if (typeof window !== 'undefined') {
      localStorage.setItem('sanea_lang', nextLang);
      document.documentElement.setAttribute('lang', nextLang);
      document.documentElement.setAttribute('dir', nextLang === 'ar' ? 'rtl' : 'ltr');
    }
    i18n.changeLanguage(nextLang);
    set({ lang: nextLang });
  },

  openTrialModal: (program = null, course = null) =>
    set({
      isTrialModalOpen: true,
      selectedProgram: program,
      selectedCourse: course,
    }),

  closeTrialModal: () =>
    set({
      isTrialModalOpen: false,
      selectedProgram: null,
      selectedCourse: null,
    }),

  openCourseModal: (program) =>
    set({
      isCourseModalOpen: true,
      courseModalProgram: program,
    }),

  closeCourseModal: () =>
    set({
      isCourseModalOpen: false,
      courseModalProgram: null,
    }),
}));
