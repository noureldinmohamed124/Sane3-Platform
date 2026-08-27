import { useQuery } from '@tanstack/react-query';
import { axiosClient } from '../../api/axiosClient';
import { ENDPOINTS } from '../../api/endpoints';

export const FALLBACK_PROGRAMS = [
  {
    id: 1,
    name: 'المبدعون الصغار',
    nameAr: 'المبدعون الصغار',
    description: 'رحلة عملية لتنمية التفكير المنطقي، الروبوتيكس، وصناعة الألعاب والابتكارات التفاعلية.',
    descriptionAr: 'رحلة عملية لتنمية التفكير المنطقي، الروبوتيكس، وصناعة الألعاب والابتكارات التفاعلية.',
    ageMin: 8,
    ageMax: 12,
    semestersCount: 3,
  },
  {
    id: 2,
    name: 'سحرة الويب',
    nameAr: 'سحرة الويب',
    description: 'بناء وتطوير تطبيقات وصفحات الويب الحية التفاعلية من الصفر وحتى الإطلاق.',
    descriptionAr: 'بناء وتطوير تطبيقات وصفحات الويب الحية التفاعلية من الصفر وحتى الإطلاق.',
    ageMin: 12,
    ageMax: 18,
    semestersCount: 3,
  },
  {
    id: 3,
    name: 'صُنّاع التكنولوجيا',
    nameAr: 'صُنّاع التكنولوجيا',
    description: 'تصميم وبناء الدوائر الإلكترونية، الأنظمة المدمجة، وبرمجة الهاردوير.',
    descriptionAr: 'تصميم وبناء الدوائر الإلكترونية، الأنظمة المدمجة، وبرمجة الهاردوير.',
    ageMin: 14,
    ageMax: 18,
    semestersCount: 3,
  },
  {
    id: 4,
    name: 'بُناة الذكاء الاصطناعي',
    nameAr: 'بُناة الذكاء الاصطناعي',
    description: 'تطوير وتدريب نماذج الذكاء الاصطناعي وتطبيقها على حل المشكلات الهندسية.',
    descriptionAr: 'تطوير وتدريب نماذج الذكاء الاصطناعي وتطبيقها على حل المشكلات الهندسية.',
    ageMin: 12,
    ageMax: 18,
    semestersCount: 3,
  },
  {
    id: 5,
    name: 'برنامج المرحله الثانوية',
    nameAr: 'برنامج المرحله الثانوية',
    description: 'منهج تطبيقي عملي مكثف لطلاب المرحلة الثانوية لتأسيسهم هندسياً وبرمجياً.',
    descriptionAr: 'منهج تطبيقي عملي مكثف لطلاب المرحلة الثانوية لتأسيسهم هندسياً وبرمجياً.',
    ageMin: 16,
    ageMax: 20,
    semestersCount: 2,
  },
];

export const FALLBACK_SEMESTERS_MAP = {
  1: [
    {
      id: 8,
      academyProgramId: 1,
      name: 'صانع الويب',
      semesterNumber: 1,
      description: 'رحلة عملية في أساسيات الويب والبرمجة المرئية، يتعلم فيها الطالب بناء صفحات وتجارب تفاعلية بسيطة من خلال المشاريع والتحديات.',
    },
    {
      id: 9,
      academyProgramId: 1,
      name: 'صانع التطبيقات',
      semesterNumber: 2,
      description: 'ينتقل الطالب من صفحات الويب إلى بناء تطبيقات محمولة بسيطة، ويتعلم من خلال مشروعات عملية مفاهيم الواجهات والتفاعل والمنطق البرمجي.',
    },
    {
      id: 10,
      academyProgramId: 1,
      name: 'صانع الروبوتات',
      semesterNumber: 3,
      description: 'تجربة عملية في الروبوتات والإلكترونيات المبسطة، يبني خلالها الطالب روبوتات وأجهزة تتفاعل مع البيئة باستخدام الحساسات والحركة.',
    },
  ],
  2: [
    {
      id: 1,
      academyProgramId: 2,
      name: 'صانع الويب',
      semesterNumber: 1,
      description: 'يبني الطالب أساسًا قويًا في HTML وCSS وJavaScript من خلال صناعة صفحات وتجارب ويب حقيقية.',
    },
    {
      id: 3,
      academyProgramId: 2,
      name: 'مهندس الواجهات الأمامية',
      semesterNumber: 2,
      description: 'ينتقل الطالب إلى بناء واجهات ويب تفاعلية أكثر احترافية، مع التركيز على تنظيم الواجهة، التفاعل، وتصميم التجربة.',
    },
    {
      id: 4,
      academyProgramId: 2,
      name: 'مطور منتجات الويب المتكاملة',
      semesterNumber: 3,
      description: 'يتعلم الطالب بناء منتج ويب متكامل من الواجهة إلى الخلفية، وربط التطبيق بالبيانات والمستخدمين ونشر منتجه.',
    },
  ],
  3: [
    {
      id: 5,
      academyProgramId: 3,
      name: 'صانع الروبوتات',
      semesterNumber: 1,
      description: 'يبدأ الطالب ببناء الروبوتات والأجهزة التفاعلية من خلال سلسلة من التحديات العملية التي تعلّمه الإلكترونيات والحساسات والمحركات.',
    },
    {
      id: 6,
      academyProgramId: 3,
      name: 'المهندس المضمن',
      semesterNumber: 2,
      description: 'ينتقل الطالب من بناء النماذج إلى تصميم أنظمة مدمجة أكثر اعتمادية، فيتعامل مع الحساسات والبروتوكولات والدوائر وتصحيح الأخطاء.',
    },
    {
      id: 7,
      academyProgramId: 3,
      name: 'مطوّر منتجات إنترنت الأشياء',
      semesterNumber: 3,
      description: 'تحويل الأجهزة إلى منتجات متصلة بالإنترنت عبر Wi-Fi وMQTT وقواعد البيانات السحابية ولوحات المتابعة.',
    },
  ],
  4: [
    {
      id: 11,
      academyProgramId: 4,
      name: 'مستكشف البيانات',
      semesterNumber: 1,
      description: 'يتعلم الطالب كيف يجد البيانات الحقيقية ويفهمها وينظفها ويستكشف الأنماط الموجودة فيها وبناء تحليلات ونماذج أولية.',
    },
    {
      id: 12,
      academyProgramId: 4,
      name: 'صانع حلول الذكاء الاصطناعي',
      semesterNumber: 2,
      description: 'بناء نماذج ذكاء اصطناعي فعلية وتقييمها وتحسينها، مع فهم عملي للدقة والاستدعاء وتحويل النموذج لتجربة تفاعلية.',
    },
    {
      id: 13,
      academyProgramId: 4,
      name: 'مطوّر منتجات الذكاء الاصطناعي',
      semesterNumber: 3,
      description: 'يجمع الطالب بين البيانات والنموذج والمنتج ليطور حلًا متكاملًا لمشكلة حقيقية مع التركيز على النشر وتجربة المستخدم.',
    },
  ],
  5: [
    {
      id: 14,
      academyProgramId: 5,
      name: 'المرحلة الثانوية الاولي',
      semesterNumber: 1,
      description: 'منهج متكامل لطلاب المرحلة الاولي الثانوية يركز على الخوارزميات والتفكير البرمجي.',
    },
    {
      id: 15,
      academyProgramId: 5,
      name: 'المرحلة الثانوية الثانية',
      semesterNumber: 2,
      description: 'منهج متكامل لطلاب المرحلة الثانوية الثانية لبناء مشاريع برمجية متقدمة وتطبيقات عملية.',
    },
  ],
};

export function useAcademyProgramsQuery() {
  return useQuery({
    queryKey: ['academyPrograms'],
    queryFn: async () => {
      try {
        const res = await axiosClient.get(ENDPOINTS.ACADEMY_PROGRAMS);
        const list = res?.academyPrograms || res?.data?.academyPrograms || (Array.isArray(res) ? res : []);
        return Array.isArray(list) && list.length > 0 ? list : FALLBACK_PROGRAMS;
      } catch (err) {
        console.warn('Backend programs endpoint error, using fallback:', err.message);
        return FALLBACK_PROGRAMS;
      }
    },
    staleTime: 1000 * 60 * 5,
  });
}

export function useProgramSemestersQuery(programId) {
  return useQuery({
    queryKey: ['programSemesters', programId],
    queryFn: async () => {
      if (!programId) return [];
      try {
        const res = await axiosClient.get(ENDPOINTS.PROGRAM_SEMESTERS(programId));
        const list = res?.academyProgramSemsters || res?.data?.academyProgramSemsters || res?.semesters || (Array.isArray(res) ? res : []);
        return Array.isArray(list) && list.length > 0
          ? list
          : (FALLBACK_SEMESTERS_MAP[Number(programId)] || []);
      } catch (err) {
        console.warn(`Backend semesters endpoint error for program ${programId}, using fallback:`, err.message);
        return FALLBACK_SEMESTERS_MAP[Number(programId)] || [];
      }
    },
    enabled: Boolean(programId),
  });
}
