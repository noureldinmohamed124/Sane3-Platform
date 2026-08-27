import { z } from 'zod';

export const enrollmentSchema = z.object({
  programId: z.coerce.number().min(1, 'يرجى اختيار البرنامج الأكاديمي'),
  programSemsterId: z.coerce.number().min(1, 'يرجى اختيار السمستر الأكاديمي المطلوب'),
  student: z.object({
    firstName: z.string().min(2, 'الاسم الأول يجب ألا يقل عن حرفين'),
    lastName: z.string().min(2, 'اسم العائلة يجب ألا يقل عن حرفين'),
    dateOfBirth: z.string().min(1, 'يرجى تحديد تاريخ ميلاد الطالب'),
    grade: z.string().min(1, 'يرجى إدخال الصف الدراسي أو السنة الدراسية'),
    governorate: z.string().min(2, 'يرجى إدخال المحافظة أو المدينة'),
    school: z.string().optional().default(''),
    studentPhone: z
      .string()
      .regex(/^$|^01[0-2,5]\d{8}$/, 'رقم الهاتف يجب أن يتكون من 11 رقماً ويبدأ بـ 01')
      .optional()
      .default(''),
    studentEmail: z
      .string()
      .regex(/^$|^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'يرجى إدخال بريد إلكتروني صحيح')
      .optional()
      .default(''),
  }),
  parent: z.object({
    name: z.string().min(3, 'يرجى إدخال اسم ولي الأمر الثلاثي بالكامل'),
    phone: z.string().regex(/^01[0-2,5]\d{8}$/, 'رقم هاتف ولي الأمر يجب أن يتكون من 11 رقماً ويبدأ بـ 01'),
    email: z.string().email('يرجى إدخال بريد إلكتروني صحيح لولي الأمر (مثال: name@domain.com)'),
  }),
});
