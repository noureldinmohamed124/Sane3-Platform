import { z } from 'zod';

const phoneRegex = /^01[0-2,5]\d{8}$/;

export const enrollmentSchema = z.object({
  programId: z.coerce.number().min(1, 'يرجى اختيار البرنامج الأكاديمي'),
  courseId: z.coerce.number().min(1, 'يرجى اختيار الدورة/الكورس'),
  hasLaptopConfirmation: z.boolean().default(true),

  parent: z.object({
    name: z
      .string()
      .min(3, 'اسم ولي الأمر يجب أن يحتوي على 3 أحرف على الأقل')
      .max(100, 'الاسم طويل جداً'),
    phone: z
      .string()
      .regex(phoneRegex, 'يرجى إدخال رقم هاتف مصري صحيح يتكون من 11 رقم ويبدأ بـ 01'),
    email: z
      .string()
      .email('يرجى إدخال بريد إلكتروني صحيح يحتوي على @ وسيرفر صحيح مثل example@domain.com'),
  }),

  student: z.object({
    firstName: z
      .string()
      .min(2, 'الاسم الأول يجب أن يحتوي على حرفين على الأقل')
      .max(50, 'الاسم طويل جداً'),
    lastName: z
      .string()
      .min(2, 'اسم العائلة يجب أن يحتوي على حرفين على الأقل')
      .max(50, 'الاسم طويل جداً'),
    dateOfBirth: z
      .string()
      .min(1, 'يرجى تحديد تاريخ الميلاد'),
    city: z
      .string()
      .min(2, 'يرجى إدخال المدينة / المحافظة بشكل صحيح'),
    educationLevel: z.coerce.number().default(0),
    institutionName: z
      .string()
      .min(2, 'يرجى إدخال اسم المدرسة أو الكلية أو الجامعة بشكل صحيح'),
    currentLevel: z
      .string()
      .min(1, 'يرجى إدخال الصف أو السنة الدراسية'),
    faculty: z.string().default('عام'),
    graduationStatus: z.coerce.number().default(0),
    studentPhone: z
      .string()
      .optional()
      .refine((val) => !val || phoneRegex.test(val), {
        message: 'رقم هاتف الطالب يجب أن يتكون من 11 رقم ويبدأ بـ 01',
      }),
    studentEmail: z
      .string()
      .optional()
      .refine((val) => !val || z.string().email().safeParse(val).success, {
        message: 'بريد الطالب غير صحيح (يجب أن يحتوي على @ و domain.com)',
      }),
  }),

  assessment: z.object({
    hasProgrammingExperience: z.boolean().default(false),
    programmingExperienceLevel: z.string().default('Beginner'),
    participatedInCompetitions: z.boolean().default(false),
    programmingTools: z.string().default('Scratch'),
    primaryGoal: z
      .string()
      .min(5, 'يرجى كتابة الهدف من الانضمام (5 أحرف على الأقل)'),
  }),
});
