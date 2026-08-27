import React, { useState, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';
import { Button } from '../../../components/ui/button';
import { Input, Select, Label } from '../../../components/ui/input';
import { enrollmentSchema } from '../schemas/enrollmentSchema';
import { useSubmitEnrollmentMutation } from '../useEnrollment';
import { useAcademyProgramsQuery, useProgramSemestersQuery } from '../../curriculum/useProgramsQuery';
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  Calendar,
  Layers,
  AlertCircle,
  Sparkles,
  BookOpen,
  User,
  GraduationCap,
  Building,
  Phone,
  Mail,
  MapPin,
  CheckCircle2,
} from 'lucide-react';

export default function EnrollmentPage() {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === 'en';
  const location = useLocation();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);

  const passedProgram = location.state?.program;

  const { data: apiPrograms = [] } = useAcademyProgramsQuery();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    trigger,
    clearErrors,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    resolver: zodResolver(enrollmentSchema),
    defaultValues: {
      programId: '',
      programSemsterId: '',
      student: {
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        grade: '',
        governorate: '',
        school: '',
        studentPhone: '',
        studentEmail: '',
      },
      parent: {
        name: '',
        phone: '',
        email: '',
      },
    },
  });

  const selectedProgramId = watch('programId');
  const selectedSemesterId = watch('programSemsterId');
  const watchDob = watch('student.dateOfBirth');
  const watchParentPhone = watch('parent.phone') || '';
  const watchParentEmail = watch('parent.email') || '';
  const watchStudentPhone = watch('student.studentPhone') || '';
  const watchStudentEmail = watch('student.studentEmail') || '';

  // Semesters query based on selected program
  const {
    data: programSemesters = [],
    isLoading: isLoadingSemesters,
  } = useProgramSemestersQuery(selectedProgramId ? Number(selectedProgramId) : null);

  // Dynamic Age Calculation
  const calculatedAge = useMemo(() => {
    if (!watchDob) return null;
    const birthDate = new Date(watchDob);
    if (isNaN(birthDate.getTime())) return null;

    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age >= 0 ? age : null;
  }, [watchDob]);

  const isOver18 = calculatedAge !== null && calculatedAge > 18;

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [currentStep]);

  const submitMutation = useSubmitEnrollmentMutation();

  const nextStep = async () => {
    // Validate Step 1 fields
    const fieldsToValidate = [
      'student.firstName',
      'student.lastName',
      'student.dateOfBirth',
      'student.grade',
      'student.governorate',
      'parent.name',
      'parent.phone',
      'parent.email',
    ];

    if (watchStudentPhone) fieldsToValidate.push('student.studentPhone');
    if (watchStudentEmail) fieldsToValidate.push('student.studentEmail');

    const isValid = await trigger(fieldsToValidate);
    if (isValid) {
      setCurrentStep(2);
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      setTimeout(() => {
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      }, 50);
      return true;
    } else {
      toast.error(
        isEn
          ? 'Please complete all required fields correctly.'
          : 'يرجى استكمال الحقول المطلوبة بشكل صحيح قبل المتابعة.'
      );
      return false;
    }
  };

  const prevStep = () => {
    setCurrentStep(1);
  };

  const onSubmit = (data) => {
    submitMutation.mutate(data, {
      onSuccess: () => {
        toast.success(
          isEn
            ? 'Enrollment Application Submitted Successfully! 🎉'
            : 'تم إرسال طلب الالتحاق بنجاح! 🎉',
          {
            description: isEn
              ? 'Our academic advisors will contact you within 24 hours to confirm semester details.'
              : 'سيتواصل معكم فريق صانع خلال 24 ساعة لتأكيد موعد السمستر وتفاصيل الحضور.',
          }
        );
        reset();
        setCurrentStep(1);
        navigate('/');
      },
      onError: (err) => {
        toast.error(isEn ? 'Application Submission Failed' : 'تعذر إرسال الطلب', {
          description: err.message,
        });
      },
    });
  };

  const renderEmailValidationBadge = (emailStr) => {
    if (!emailStr) return null;
    const isEmailValid = z.string().email().safeParse(emailStr).success;
    if (isEmailValid) {
      return (
        <span className="text-xs font-bold text-green-600 dark:text-green-400 mt-1 flex items-center gap-1">
          <CheckCircle2 className="w-3.5 h-3.5" />
          {isEn ? 'Valid Email' : 'صيغة البريد الإلكتروني صحيحة'}
        </span>
      );
    } else {
      return (
        <span className="text-xs text-orange-500 mt-1 block font-semibold">
          {isEn ? '(Must include @ and valid domain)' : '(يرجى كتابة البريد بصيغة صحيحة مثل name@domain.com)'}
        </span>
      );
    }
  };

  const renderPhoneValidationBadge = (phoneStr) => {
    const len = phoneStr.length;
    if (len === 0) return null;

    if (len < 11) {
      return (
        <span className="text-xs font-semibold text-orange-500 mt-1 block">
          {isEn
            ? `Entered ${len}/11 digits (${11 - len} remaining)`
            : `تم إدخال ${len} من 11 رقم — متبقي ${11 - len} أرقام`}
        </span>
      );
    }

    if (len === 11) {
      if (phoneStr.startsWith('01')) {
        return (
          <span className="text-xs font-bold text-green-600 dark:text-green-400 mt-1 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            {isEn ? 'Valid Egyptian Mobile (11/11)' : 'رقم هاتف صحيح ومكتمل (11/11)'}
          </span>
        );
      } else {
        return (
          <span className="text-xs font-bold text-red-500 mt-1 block">
            {isEn ? '⚠️ Must start with 01 (e.g. 010, 011, 012, 015)' : '⚠️ رقم الهاتف يجب أن يبدأ بـ 01 (مثل 010 أو 011 أو 012 أو 015)'}
          </span>
        );
      }
    }

    return null;
  };

  const NextArrow = isEn ? ChevronRight : ChevronLeft;
  const PrevArrow = isEn ? ChevronLeft : ChevronRight;

  const currentProgObj = apiPrograms.find((p) => Number(p.id) === Number(selectedProgramId));

  return (
    <div className="py-10 sm:py-16 px-4 sm:px-6 max-w-4xl mx-auto relative z-10">
      {/* Container Card */}
      <div className="bg-[var(--card-bg)]/95 backdrop-blur-xl rounded-3xl p-6 sm:p-12 shadow-2xl border border-[var(--line)]">
        
        {/* Header Title Info */}
        <div className="text-center space-y-3 mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--orange-light)] text-[var(--orange)] text-xs font-bold font-en uppercase tracking-widest border border-[var(--orange)]/30">
            <Sparkles className="w-3.5 h-3.5" />
            {isEn ? 'NEW ENROLLMENT' : 'طلب التحاق جديد'}
          </div>
          <h1 className="text-3xl sm:text-4xl font-rakkas text-[var(--ink)]">
            {currentStep === 1
              ? isEn ? 'Student & Parent Information' : 'بيانات الطالب وولي الأمر'
              : isEn ? 'Program & Semester Selection' : 'اختيار البرنامج والسمستر'}
          </h1>
          <p className="text-sm sm:text-base text-[var(--ink-soft)] max-w-xl mx-auto leading-relaxed">
            {currentStep === 1
              ? isEn
                ? 'Fill in student and parent contact details to personalize the learning path.'
                : 'أدخل البيانات الأساسية للطالب وولي الأمر لتخصيص رحلة التعلم والتواصل المباشر.'
              : isEn
                ? 'Choose your desired academic program and select the target semester to enroll.'
                : 'اختر البرنامج الأكاديمي المناسب والسمستر المطلوب لبدء رحلة الصناعة والابتكار.'}
          </p>
        </div>

        {/* 2-Step Progress Indicator */}
        <div className="space-y-3 mb-10 max-w-md mx-auto">
          <div className="flex items-center justify-between text-xs sm:text-sm text-[var(--ink-faint)] font-bold">
            <span>{isEn ? `Step ${currentStep} of 2` : `الخطوة ${currentStep} من ٢`}</span>
            <span className="en font-mono text-[var(--orange)]">
              {currentStep === 1 ? '50%' : '100%'} {isEn ? 'Completed' : 'مكتمل'}
            </span>
          </div>

          <div className="w-full h-2.5 bg-[var(--paper-2)] rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[var(--orange)] to-[var(--orange-dark)]"
              animate={{ width: currentStep === 1 ? '50%' : '100%' }}
              transition={{ duration: 0.35 }}
            />
          </div>

          {/* 2 Interactive Step Buttons */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => setCurrentStep(1)}
              className={`p-3 rounded-2xl flex items-center justify-center gap-2 text-xs font-bold border transition-all cursor-pointer ${
                currentStep === 1
                  ? 'border-[var(--orange)] bg-[var(--orange-light)]/20 text-[var(--orange)] shadow-xs'
                  : 'border-[var(--line)] bg-[var(--paper-2)] text-[var(--ink-soft)] hover:border-[var(--orange)]/40'
              }`}
            >
              <User className="w-4 h-4" />
              <span>{isEn ? '1. Student & Parent' : '١. بيانات الطالب والأسرة'}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                if (currentStep === 1) nextStep();
              }}
              className={`p-3 rounded-2xl flex items-center justify-center gap-2 text-xs font-bold border transition-all cursor-pointer ${
                currentStep === 2
                  ? 'border-[var(--orange)] bg-[var(--orange-light)]/20 text-[var(--orange)] shadow-xs'
                  : 'border-[var(--line)] bg-[var(--paper-2)] text-[var(--ink-soft)] hover:border-[var(--orange)]/40'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>{isEn ? '2. Program & Semester' : '٢. البرنامج والسمستر'}</span>
            </button>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <AnimatePresence mode="wait">
            {/* STEP 1: Student and Parent Information */}
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                className="space-y-8"
              >
                {/* Section A: Student Information */}
                <div className="space-y-5">
                  <div className="flex items-center gap-2 pb-2 border-b border-[var(--line)]">
                    <GraduationCap className="w-5 h-5 text-[var(--orange)]" />
                    <h3 className="font-bold text-base sm:text-lg text-[var(--ink)]">
                      {isEn ? 'Student Information' : 'بيانات الطالب الأساسية'}
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <Label>{isEn ? 'Student First Name *' : 'الاسم الأول للطالب *'}</Label>
                      <Input
                        placeholder={isEn ? 'e.g. Omar' : 'أدخل الاسم الأول (مثال: عمر)'}
                        {...register('student.firstName')}
                        onChange={(e) => {
                          setValue('student.firstName', e.target.value, { shouldValidate: true });
                          if (e.target.value.trim().length >= 2) clearErrors('student.firstName');
                        }}
                      />
                      {errors.student?.firstName && (
                        <p className="text-xs text-red-500 font-semibold mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" /> {errors.student.firstName.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label>{isEn ? 'Student Family Name *' : 'اسم العائلة للطالب *'}</Label>
                      <Input
                        placeholder={isEn ? 'e.g. Mahmoud' : 'أدخل اسم العائلة (مثال: الشناوي)'}
                        {...register('student.lastName')}
                        onChange={(e) => {
                          setValue('student.lastName', e.target.value, { shouldValidate: true });
                          if (e.target.value.trim().length >= 2) clearErrors('student.lastName');
                        }}
                      />
                      {errors.student?.lastName && (
                        <p className="text-xs text-red-500 font-semibold mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" /> {errors.student.lastName.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Date of Birth & Dynamic Age Display */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <Label>{isEn ? 'Date of Birth (DateOnly) *' : 'تاريخ ميلاد الطالب *'}</Label>
                      <Input
                        type="date"
                        {...register('student.dateOfBirth')}
                        onChange={(e) => {
                          setValue('student.dateOfBirth', e.target.value, { shouldValidate: true });
                          if (e.target.value) clearErrors('student.dateOfBirth');
                        }}
                      />
                      {/* Dynamic Age Badge */}
                      {calculatedAge !== null && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[var(--orange-light)]/40 border border-[var(--orange)]/30 text-[var(--orange)] text-xs font-bold"
                        >
                          <Calendar className="w-3.5 h-3.5" />
                          <span>
                            {isEn
                              ? `Current Age: ${calculatedAge} years old`
                              : `العمر المحسوب: ${calculatedAge} سنة`}
                          </span>
                        </motion.div>
                      )}
                      {errors.student?.dateOfBirth && (
                        <p className="text-xs text-red-500 font-semibold mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" /> {errors.student.dateOfBirth.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label>{isEn ? 'Current Grade / Academic Level *' : 'الصف الدراسي / السنة الدراسية *'}</Label>
                      <Input
                        placeholder={isEn ? 'e.g. Grade 10 / Year 2' : 'مثال: الصف الثاني الإعدادي / سنة ثانية'}
                        {...register('student.grade')}
                        onChange={(e) => {
                          setValue('student.grade', e.target.value, { shouldValidate: true });
                          if (e.target.value.trim().length >= 1) clearErrors('student.grade');
                        }}
                      />
                      {errors.student?.grade && (
                        <p className="text-xs text-red-500 font-semibold mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" /> {errors.student.grade.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Governorate and Conditional School Field */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <Label>{isEn ? 'Governorate / City *' : 'المحافظة / المدينة *'}</Label>
                      <Input
                        placeholder={isEn ? 'e.g. Menoufia, Cairo...' : 'مثال: المنوفية، القاهرة، الجيزة...'}
                        {...register('student.governorate')}
                        onChange={(e) => {
                          setValue('student.governorate', e.target.value, { shouldValidate: true });
                          if (e.target.value.trim().length >= 2) clearErrors('student.governorate');
                        }}
                      />
                      {errors.student?.governorate && (
                        <p className="text-xs text-red-500 font-semibold mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" /> {errors.student.governorate.message}
                        </p>
                      )}
                    </div>

                    {/* School Field: Disappears if age > 18 */}
                    {!isOver18 && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                      >
                        <Label>{isEn ? 'School Name (Optional)' : 'اسم المدرسة (اختياري)'}</Label>
                        <Input
                          placeholder={isEn ? 'e.g. Pioneers Language School' : 'أدخل اسم مدرسة الطالب'}
                          {...register('student.school')}
                        />
                      </motion.div>
                    )}
                  </div>

                  {/* Student Phone and Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <Label>{isEn ? 'Student Phone Number (Optional)' : 'رقم هاتف الطالب (اختياري)'}</Label>
                      <Input
                        maxLength={11}
                        placeholder="01xxxxxxxxx"
                        {...register('student.studentPhone')}
                        onChange={(e) => {
                          const digitsOnly = e.target.value.replace(/\D/g, '').slice(0, 11);
                          setValue('student.studentPhone', digitsOnly, { shouldValidate: true });
                          if (!digitsOnly || /^01[0-2,5]\d{8}$/.test(digitsOnly)) clearErrors('student.studentPhone');
                        }}
                      />
                      {renderPhoneValidationBadge(watchStudentPhone)}
                      {errors.student?.studentPhone && (
                        <p className="text-xs text-red-500 font-semibold mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" /> {errors.student.studentPhone.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label>{isEn ? 'Student Email Address (Optional)' : 'البريد الإلكتروني للطالب (اختياري)'}</Label>
                      <Input
                        type="email"
                        placeholder="student@example.com"
                        {...register('student.studentEmail')}
                        onChange={(e) => {
                          setValue('student.studentEmail', e.target.value, { shouldValidate: true });
                          if (!e.target.value || z.string().email().safeParse(e.target.value).success) clearErrors('student.studentEmail');
                        }}
                      />
                      {renderEmailValidationBadge(watchStudentEmail)}
                      {errors.student?.studentEmail && (
                        <p className="text-xs text-red-500 font-semibold mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" /> {errors.student.studentEmail.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Section B: Parent Information */}
                <div className="space-y-5 pt-4">
                  <div className="flex items-center gap-2 pb-2 border-b border-[var(--line)]">
                    <User className="w-5 h-5 text-[var(--blue-accent)]" />
                    <h3 className="font-bold text-base sm:text-lg text-[var(--ink)]">
                      {isEn ? 'Parent / Guardian Contact Information' : 'بيانات ولي الأمر والتواصل'}
                    </h3>
                  </div>

                  <div>
                    <Label>{isEn ? 'Parent Full Name *' : 'اسم ولي الأمر الثلاثي *'}</Label>
                    <Input
                      placeholder={isEn ? 'e.g. Mahmoud Ibrahim Mohamed' : 'أدخل اسم ولي الأمر الثلاثي بالكامل'}
                      {...register('parent.name')}
                      onChange={(e) => {
                        setValue('parent.name', e.target.value, { shouldValidate: true });
                        if (e.target.value.trim().length >= 3) clearErrors('parent.name');
                      }}
                    />
                    {errors.parent?.name && (
                      <p className="text-xs text-red-500 font-semibold mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" /> {errors.parent.name.message}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <Label>{isEn ? 'Parent Mobile Number (11 digits) *' : 'رقم هاتف ولي الأمر (11 رقم يبدأ بـ 01) *'}</Label>
                      <Input
                        maxLength={11}
                        placeholder="01xxxxxxxxx"
                        {...register('parent.phone')}
                        onChange={(e) => {
                          const digitsOnly = e.target.value.replace(/\D/g, '').slice(0, 11);
                          setValue('parent.phone', digitsOnly, { shouldValidate: true });
                          if (/^01[0-2,5]\d{8}$/.test(digitsOnly)) clearErrors('parent.phone');
                        }}
                      />
                      {renderPhoneValidationBadge(watchParentPhone)}
                      {errors.parent?.phone && (
                        <p className="text-xs text-red-500 font-semibold mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" /> {errors.parent.phone.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label>{isEn ? 'Parent Email Address *' : 'البريد الإلكتروني لولي الأمر *'}</Label>
                      <Input
                        type="email"
                        placeholder="parent@example.com"
                        {...register('parent.email')}
                        onChange={(e) => {
                          setValue('parent.email', e.target.value, { shouldValidate: true });
                          if (z.string().email().safeParse(e.target.value).success) clearErrors('parent.email');
                        }}
                      />
                      {renderEmailValidationBadge(watchParentEmail)}
                      {errors.parent?.email && (
                        <p className="text-xs text-red-500 font-semibold mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" /> {errors.parent.email.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Next Step Button */}
                <div className="flex justify-end pt-6 border-t border-[var(--line)]">
                  <Button type="button" onClick={nextStep} className="px-8 text-base">
                    <span>{isEn ? 'Next: Program & Semester' : 'التالي: اختيار البرنامج والسمستر'}</span>
                    <NextArrow className="w-5 h-5" />
                  </Button>
                </div>
              </motion.div>
            )}

            {/* STEP 2: Program and Semester Selection */}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                className="space-y-8"
              >
                {/* Academy Program Selector */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 pb-2 border-b border-[var(--line)]">
                    <BookOpen className="w-5 h-5 text-[var(--orange)]" />
                    <h3 className="font-bold text-base sm:text-lg text-[var(--ink)]">
                      {isEn ? '1. Select Academy Program' : '١. اختر البرنامج الأكاديمي المطلوب'}
                    </h3>
                  </div>

                  <div>
                    <Label>{isEn ? 'Academy Program *' : 'البرنامج الأكاديمي *'}</Label>
                    <Select
                      value={selectedProgramId || ''}
                      onChange={(e) => {
                        const newProgId = e.target.value ? Number(e.target.value) : '';
                        setValue('programId', newProgId, { shouldValidate: true });
                        setValue('programSemsterId', '', { shouldValidate: true });
                        if (newProgId) clearErrors('programId');
                      }}
                    >
                      <option value="">{isEn ? '-- Select Academy Program --' : '-- اختر البرنامج الأكاديمي --'}</option>
                      {apiPrograms.map((p) => (
                        <option key={p.id} value={p.id}>
                          {isEn ? p.name : (p.nameAr || p.name)} ({p.ageMin || p.ageFrom || 8} - {p.ageMax || p.ageTo || 40} {isEn ? 'years' : 'سنة'})
                        </option>
                      ))}
                    </Select>
                    {errors.programId && (
                      <p className="text-xs text-red-500 font-semibold mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" /> {errors.programId.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Semesters Cards Container */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-[var(--line)]">
                    <div className="flex items-center gap-2">
                      <Layers className="w-5 h-5 text-[var(--blue-accent)]" />
                      <h3 className="font-bold text-base sm:text-lg text-[var(--ink)]">
                        {isEn ? '2. Select Semester' : '٢. حدد السمستر الأكاديمي المراد الالتحاق به'}
                      </h3>
                    </div>
                    {programSemesters.length > 0 && (
                      <span className="text-xs font-bold text-[var(--orange)] bg-[var(--orange-light)]/30 px-3 py-1 rounded-full">
                        {programSemesters.length} {isEn ? 'Semesters Available' : 'سمسترز متوفرة'}
                      </span>
                    )}
                  </div>

                  {!selectedProgramId ? (
                    <div className="p-8 rounded-3xl bg-[var(--paper-2)] border border-[var(--line)] text-center text-sm font-semibold text-[var(--ink-faint)] space-y-2">
                      <BookOpen className="w-8 h-8 mx-auto text-[var(--orange)] opacity-60" />
                      <p>{isEn ? 'Please select an academy program above to load available semesters.' : 'يرجى اختيار البرنامج الأكاديمي أولاً لعرض السمسترز المتاحة.'}</p>
                    </div>
                  ) : isLoadingSemesters ? (
                    <div className="p-8 rounded-3xl bg-[var(--paper-2)] border border-[var(--line)] text-center text-sm text-[var(--ink-faint)] space-y-2">
                      <div className="w-6 h-6 border-2 border-[var(--orange)] border-t-transparent rounded-full animate-spin mx-auto" />
                      <p>{isEn ? 'Loading available semesters...' : 'جاري تحميل السمسترز المتاحة...'}</p>
                    </div>
                  ) : programSemesters.length === 0 ? (
                    <div className="p-8 rounded-3xl bg-[var(--paper-2)] border border-[var(--line)] text-center text-sm text-[var(--ink-faint)]">
                      {isEn ? 'No semesters available currently for this program.' : 'لا توجد سمسترز متوفرة حالياً لهذا البرنامج.'}
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-4">
                      {programSemesters.map((sem) => {
                        const isSelected = Number(selectedSemesterId) === Number(sem.id);
                        return (
                          <div
                            key={sem.id}
                            onClick={() => {
                              setValue('programSemsterId', sem.id, { shouldValidate: true });
                              clearErrors('programSemsterId');
                            }}
                            className={`p-6 rounded-3xl border transition-all cursor-pointer relative ${
                              isSelected
                                ? 'border-[var(--orange)] bg-[var(--orange-light)]/20 shadow-lg ring-2 ring-[var(--orange)]'
                                : 'border-[var(--line)] bg-[var(--card-bg)] hover:border-[var(--orange)]/60 hover:shadow-md'
                            }`}
                          >
                            <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                              <div className="flex items-center gap-3">
                                <span className="w-8 h-8 rounded-full bg-[var(--orange)] text-white font-bold flex items-center justify-center text-sm shrink-0">
                                  {sem.semesterNumber || 1}
                                </span>
                                <h4 className="font-bold text-[var(--ink)] text-base sm:text-lg">
                                  {isEn ? sem.name : (sem.nameAr || sem.name)}
                                </h4>
                              </div>

                              {isSelected ? (
                                <span className="px-3.5 py-1.5 rounded-full bg-[var(--orange)] text-white text-xs font-bold flex items-center gap-1.5 shadow-xs">
                                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                                  {isEn ? 'Selected Semester' : 'السمستر المختار'}
                                </span>
                              ) : (
                                <span className="text-xs text-[var(--ink-faint)] font-bold">
                                  {isEn ? 'Click to select' : 'اضغط للاختيار'}
                                </span>
                              )}
                            </div>

                            <p className="text-xs sm:text-sm text-[var(--ink-soft)] mb-4 leading-relaxed">
                              {isEn ? sem.description : (sem.descriptionAr || sem.description)}
                            </p>

                            {/* Dates info if available */}
                            {(sem.startDate || sem.endDate) && (
                              <div className="flex flex-wrap items-center gap-4 pt-3 border-t border-[var(--line)] text-xs text-[var(--ink-faint)]">
                                {sem.startDate && (
                                  <span className="flex items-center gap-1.5 font-medium">
                                    <Calendar className="w-3.5 h-3.5 text-[var(--orange)]" />
                                    {isEn ? 'Starts:' : 'تاريخ البدء:'} {new Date(sem.startDate).toLocaleDateString(isEn ? 'en-US' : 'ar-EG')}
                                  </span>
                                )}
                                {sem.endDate && (
                                  <span className="flex items-center gap-1.5 font-medium">
                                    <Clock className="w-3.5 h-3.5 text-[var(--blue-accent)]" />
                                    {isEn ? 'Ends:' : 'تاريخ الانتهاء:'} {new Date(sem.endDate).toLocaleDateString(isEn ? 'en-US' : 'ar-EG')}
                                  </span>
                                )}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {errors.programSemsterId && (
                    <p className="text-xs text-red-500 font-semibold mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" /> {errors.programSemsterId.message}
                    </p>
                  )}
                </div>

                {/* Application Summary Box */}
                <div className="p-6 rounded-3xl border border-[var(--line)] bg-[var(--paper-2)] text-xs sm:text-sm space-y-3">
                  <div className="font-bold text-[var(--ink)] text-sm sm:text-base border-b border-[var(--line)] pb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[var(--orange)]" />
                    {isEn ? 'Ready to Submit Summary' : 'ملخص الطلب قبل الإرسال'}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[var(--ink-soft)]">
                    <div><strong>{isEn ? 'Student:' : 'اسم الطالب:'}</strong> {watch('student.firstName')} {watch('student.lastName')} ({calculatedAge ? `${calculatedAge} ${isEn ? 'years' : 'سنة'}` : '—'})</div>
                    <div><strong>{isEn ? 'Parent Phone:' : 'هاتف ولي الأمر:'}</strong> <span className="en font-mono">{watch('parent.phone')}</span></div>
                    <div><strong>{isEn ? 'Program:' : 'البرنامج:'}</strong> {currentProgObj?.name || '—'}</div>
                    <div><strong>{isEn ? 'Governorate:' : 'المحافظة:'}</strong> {watch('student.governorate') || '—'}</div>
                  </div>
                </div>

                {/* Form Navigation Controls */}
                <div className="flex items-center justify-between pt-6 border-t border-[var(--line)]">
                  <Button type="button" variant="outline" onClick={prevStep} className="px-6">
                    <PrevArrow className="w-5 h-5" />
                    <span>{isEn ? 'Back to Student Info' : 'السابق: تعديل البيانات'}</span>
                  </Button>

                  <Button
                    type="submit"
                    disabled={submitMutation.isPending || !selectedSemesterId}
                    className="px-8 text-base shadow-lg"
                  >
                    {submitMutation.isPending ? (
                      <span>{isEn ? 'Submitting Application...' : 'جاري إرسال الطلب...'}</span>
                    ) : (
                      <>
                        <span>{isEn ? 'Confirm & Submit Application' : 'تأكيد وإرسال طلب الالتحاق'}</span>
                        <Sparkles className="w-4 h-4 animate-spin-slow" />
                      </>
                    )}
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </div>
    </div>
  );
}
