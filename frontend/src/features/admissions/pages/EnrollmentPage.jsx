import React, { useState, useEffect } from 'react';
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
import { useAcademyProgramsQuery, useProgramCoursesQuery } from '../../curriculum/useProgramsQuery';
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  Calendar,
  Laptop,
  Upload,
  AlertCircle,
  BookOpen,
} from 'lucide-react';

const STEP_TITLES_AR = [
  'اختيار المسار والدورة',
  'بيانات الطالب',
  'المعلومات التعليمية',
  'الخبرة البرمجية',
  'بيانات ولي الأمر',
  'رفع إيصال الدفع',
  'مراجعة وإرسال الطلب',
];

const STEP_TITLES_EN = [
  'Track & Course Selection',
  'Student Information',
  'Educational Background',
  'Programming Experience',
  'Parent Information',
  'Payment & Hardware',
  'Review & Submit Application',
];

const STEP_SUBTITLES_AR = [
  'ابدأ باختيار البرنامج والأكاديمية والدورة المناسبة لأهداف الطالب.',
  'البيانات الأساسية لتخصيص رحلة التعلم.',
  'معلومات المدرسة أو الكلية الحالية للطالب.',
  'مستوى الخبرة والأهداف — لا يشترط وجود خبرة سابقة.',
  'بيانات التواصل مع ولي الأمر للتحديثات والمتابعة.',
  'تأكيد توفر اللابتوب ورفع صورة إيصال الدفع.',
  'مراجعة كافة البيانات المدخلة قبل تأكيد وإرسال طلب الالتحاق.',
];

const STEP_SUBTITLES_EN = [
  'Select the academy program and course best suited for the student.',
  'Basic information to personalize the learning journey.',
  'Current school, college, or academic level details.',
  'Prior coding experience and learning goals — no experience required.',
  'Parent contact details for progress tracking and updates.',
  'Confirm laptop availability and upload payment screenshot.',
  'Review all entered details before confirming application submission.',
];

const DEFAULT_PROGRAMS = [
  { id: 1, name: 'Professional Career Program', ageFrom: 18, ageTo: 40 },
  { id: 2, name: 'Secondary Schools Program', ageFrom: 15, ageTo: 18 },
  { id: 3, name: 'Programming for Kids', ageFrom: 8, ageTo: 15 },
];

const COURSES_MAP = {
  1: [
    {
      id: 1,
      title: 'Backend Diploma',
      description: 'Comprehensive backend development using C#, ASP.NET Core, SQL Server, Entity Framework, APIs, and clean architecture.',
      durationInWeeks: 16,
      sessionsCount: 48,
      minimumAge: 18,
      maximumAge: 40,
      requiresLaptop: true,
      finalPrice: 10800,
    },
    {
      id: 2,
      title: 'Frontend Diploma',
      description: 'Learn HTML, CSS, JavaScript, TypeScript, Angular, responsive design, and frontend best practices.',
      durationInWeeks: 16,
      sessionsCount: 48,
      minimumAge: 18,
      maximumAge: 40,
      requiresLaptop: true,
      finalPrice: 9900,
    },
    {
      id: 3,
      title: 'Full Stack .NET Diploma',
      description: 'Complete full stack development covering backend APIs, Angular frontend, databases, authentication, and deployment.',
      durationInWeeks: 24,
      sessionsCount: 72,
      minimumAge: 18,
      maximumAge: 40,
      requiresLaptop: true,
      finalPrice: 15300,
    },
  ],
  2: [
    {
      id: 4,
      title: 'Computer Science for Secondary Students',
      description: 'Covers algorithms, programming fundamentals, and problem solving aligned with secondary school curriculum.',
      durationInWeeks: 10,
      sessionsCount: 20,
      minimumAge: 15,
      maximumAge: 18,
      requiresLaptop: true,
      finalPrice: 3500,
    },
    {
      id: 5,
      title: 'ICT & Office Applications',
      description: 'Learn Microsoft Office, networking basics, internet technologies, cybersecurity, and digital literacy.',
      durationInWeeks: 8,
      sessionsCount: 16,
      minimumAge: 15,
      maximumAge: 18,
      requiresLaptop: false,
      finalPrice: 2500,
    },
  ],
  3: [
    {
      id: 6,
      title: 'Scratch',
      description: 'An engaging introduction to programming through block-based coding and game development.',
      durationInWeeks: 8,
      sessionsCount: 16,
      minimumAge: 8,
      maximumAge: 11,
      requiresLaptop: false,
      finalPrice: 2200,
    },
    {
      id: 7,
      title: 'Intro to C++',
      description: 'Learn programming fundamentals using C++ through interactive projects and problem solving.',
      durationInWeeks: 10,
      sessionsCount: 20,
      minimumAge: 11,
      maximumAge: 15,
      requiresLaptop: true,
      finalPrice: 3200,
    },
    {
      id: 8,
      title: 'Robotics',
      description: 'Build and program robots while learning electronics, sensors, motors, and logical thinking.',
      durationInWeeks: 12,
      sessionsCount: 24,
      minimumAge: 10,
      maximumAge: 15,
      requiresLaptop: false,
      finalPrice: 4050,
    },
  ],
};

export default function EnrollmentPage() {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === 'en';
  const location = useLocation();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [screenshotFile, setScreenshotFile] = useState(null);

  const STEP_TITLES = isEn ? STEP_TITLES_EN : STEP_TITLES_AR;
  const STEP_SUBTITLES = isEn ? STEP_SUBTITLES_EN : STEP_SUBTITLES_AR;

  const passedProgram = location.state?.program;
  const passedCourse = location.state?.course;

  const { data: apiPrograms = [] } = useAcademyProgramsQuery();
  const programsToUse = apiPrograms.length > 0 ? apiPrograms : DEFAULT_PROGRAMS;

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
      programId: passedProgram?.id || '',
      courseId: passedCourse?.id || '',
      hasLaptopConfirmation: false,
      parent: { name: '', phone: '', email: '' },
      student: {
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        city: '',
        educationLevel: 0,
        institutionName: '',
        currentLevel: '',
        faculty: '',
        graduationStatus: 0,
        studentPhone: '',
        studentEmail: '',
      },
      assessment: {
        hasProgrammingExperience: false,
        programmingExperienceLevel: 'Beginner',
        participatedInCompetitions: false,
        programmingTools: '',
        primaryGoal: '',
      },
    },
  });

  const selectedProgramId = watch('programId');
  const selectedCourseId = watch('courseId');
  const watchHasExperience = watch('assessment.hasProgrammingExperience');
  const watchParentPhone = watch('parent.phone') || '';
  const watchParentEmail = watch('parent.email') || '';
  const watchStudentPhone = watch('student.studentPhone') || '';
  const watchStudentEmail = watch('student.studentEmail') || '';

  const { data: apiCourses = [] } = useProgramCoursesQuery(selectedProgramId ? Number(selectedProgramId) : null);
  const coursesToUse = apiCourses.length > 0
    ? apiCourses
    : (COURSES_MAP[Number(selectedProgramId)] || []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep]);

  const submitMutation = useSubmitEnrollmentMutation();

  const handleStepClick = async (stepNum) => {
    if (stepNum < currentStep) {
      setCurrentStep(stepNum);
    } else if (stepNum > currentStep) {
      const isValid = await nextStep();
      if (isValid && stepNum === currentStep + 1) {
        setCurrentStep(stepNum);
      }
    }
  };

  const nextStep = async () => {
    let fieldsToValidate = [];
    if (currentStep === 1) {
      fieldsToValidate = ['programId', 'courseId'];
    } else if (currentStep === 2) {
      fieldsToValidate = ['student.firstName', 'student.lastName', 'student.dateOfBirth', 'student.city'];
    } else if (currentStep === 3) {
      fieldsToValidate = ['student.institutionName', 'student.currentLevel'];
    } else if (currentStep === 4) {
      fieldsToValidate = ['assessment.primaryGoal'];
    } else if (currentStep === 5) {
      fieldsToValidate = ['parent.name', 'parent.phone', 'parent.email'];
    }

    const isValid = await trigger(fieldsToValidate);
    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, 7));
      return true;
    } else {
      toast.error(isEn ? 'Please fill required fields correctly' : 'يرجى استكمال البيانات المطلوبة بشكل صحيح قبل الانتقال للخطوة التالية');
      return false;
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const onSubmit = (data) => {
    submitMutation.mutate(
      { payloadData: data, file: screenshotFile },
      {
        onSuccess: () => {
          toast.success(isEn ? 'Enrollment Application Submitted Successfully! 🎉' : 'تم إرسال طلب الالتحاق والتسجيل بنجاح! 🎉', {
            description: isEn ? 'Our engineering team will contact you within 24 hours.' : 'سيتواصل معكم فريق صانع خلال 24 ساعة لتأكيد موعد الدورة والتفاصيل.',
          });
          reset();
          setCurrentStep(1);
          setScreenshotFile(null);
          navigate('/');
        },
        onError: (err) => {
          toast.error(isEn ? 'Application Submission Failed' : 'تعذر تقديم الطلب', {
            description: err.message,
          });
        },
      }
    );
  };

  const currentProgObj = programsToUse.find((p) => Number(p.id) === Number(selectedProgramId));
  const currentCourseObj = coursesToUse.find((c) => Number(c.id) === Number(selectedCourseId));
  const percentComplete = Math.round((currentStep / 7) * 100);

  const renderEmailValidationBadge = (emailStr) => {
    if (!emailStr) return null;
    const isEmailValid = z.string().email().safeParse(emailStr).success;
    if (isEmailValid) {
      return <span className="text-xs font-bold text-green-600 mt-1 block">{isEn ? '✓ Valid Email Address' : '✓ بريد إلكتروني صحيح ومكتمل الصيغة'}</span>;
    } else {
      return (
        <span className="text-xs text-orange-600 mt-1 block font-semibold">
          {isEn ? '(Include @ and domain like .com)' : '(يرجى إضافة @ وتكملة النطاق مثل .com)'}
        </span>
      );
    }
  };

  const renderPhoneValidationBadge = (phoneStr) => {
    const len = phoneStr.length;
    if (len === 0) return null;

    if (len < 11) {
      return (
        <span className="text-xs font-semibold text-orange-600 mt-1 block">
          {isEn ? `Entered ${len} of 11 digits — ${11 - len} digits remaining` : `تم إدخال ${len} من 11 رقم — متبقي ${11 - len} أرقام لتأكيد الرقم`}
        </span>
      );
    }

    if (len === 11) {
      if (phoneStr.startsWith('01')) {
        return <span className="text-xs font-bold text-green-600 mt-1 block">{isEn ? '✓ Valid Egyptian Mobile Number (11/11)' : '✓ رقم هاتف صحيح ومكتمل (11/11 رقم)'}</span>;
      } else {
        return <span className="text-xs font-bold text-red-500 mt-1 block">{isEn ? '⚠️ Must start with 01 (010, 011, 012, 015)' : '⚠️ رقم الهاتف يجب أن يبدأ بـ 01 (مثل 010, 011, 012, 015)'}</span>;
      }
    }

    return null;
  };

  const NextArrow = isEn ? ChevronRight : ChevronLeft;
  const PrevArrow = isEn ? ChevronLeft : ChevronRight;

  return (
    <div className="py-12 sm:py-16 px-4 sm:px-6 max-w-4xl mx-auto relative z-10">
      
      {/* Container Card */}
      <div className="bg-[var(--card-bg)]/95 backdrop-blur-xl rounded-3xl p-6 sm:p-12 shadow-xl border border-[var(--line)]">
        
        {/* Header Title Info */}
        <div className="text-center space-y-2 mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[var(--orange-light)] text-[var(--orange)] text-xs font-bold font-en uppercase tracking-widest border border-[var(--orange)]/30">
            {t('enrollment.badge')}
          </div>
          <h1 className="text-3xl sm:text-4xl font-rakkas text-[var(--ink)]">
            {STEP_TITLES[currentStep - 1]}
          </h1>
          <p className="text-sm sm:text-base text-[var(--ink-soft)] max-w-lg mx-auto leading-relaxed">
            {STEP_SUBTITLES[currentStep - 1]}
          </p>
        </div>

        {/* Progress Bar & Clickable Stepper Indicator */}
        <div className="space-y-4 mb-10">
          <div className="flex items-center justify-between text-xs sm:text-sm text-[var(--ink-faint)] font-bold">
            <span>{isEn ? `Step ${currentStep} of 7` : `الخطوة ${currentStep} من ٧`}</span>
            <span className="en font-mono text-[var(--orange)]">{percentComplete}% {t('enrollment.completed')}</span>
          </div>

          <div className="w-full h-2.5 bg-[var(--paper-2)] rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[var(--orange)] to-[var(--orange-dark)]"
              animate={{ width: `${percentComplete}%` }}
              transition={{ duration: 0.35 }}
            />
          </div>

          {/* Stepper circles 1 -> 7 (CLICKABLE & MOBILE RESPONSIVE!) */}
          <div className="flex items-center justify-between gap-1.5 overflow-x-auto pb-2 pt-2 scrollbar-none">
            {STEP_TITLES.map((title, idx) => {
              const stepNum = idx + 1;
              const isCompleted = stepNum < currentStep;
              const isCurrent = stepNum === currentStep;

              return (
                <div key={idx} className="flex flex-col items-center gap-1.5 shrink-0 sm:flex-1 relative">
                  <button
                    type="button"
                    onClick={() => handleStepClick(stepNum)}
                    className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm transition-all cursor-pointer ${
                      isCompleted
                        ? 'bg-[var(--orange)] text-white shadow-sm hover:scale-110'
                        : isCurrent
                        ? 'border-2 border-[var(--orange)] bg-[var(--card-bg)] text-[var(--orange)] font-bold shadow-md scale-105 ring-2 ring-[var(--orange)]/30'
                        : 'bg-[var(--paper-2)] text-[var(--ink-faint)] hover:bg-[var(--line)]'
                    }`}
                    title={title}
                  >
                    {isCompleted ? <Check className="w-4 h-4 stroke-[3]" /> : stepNum}
                  </button>
                  <span
                    onClick={() => handleStepClick(stepNum)}
                    className={`text-[10px] sm:text-[11px] text-center line-clamp-1 max-w-[70px] sm:max-w-[85px] cursor-pointer ${
                      isCurrent ? 'font-bold text-[var(--ink)]' : 'text-[var(--ink-faint)] hover:text-[var(--ink)]'
                    }`}
                  >
                    {title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Form Body Steps */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
            >
              {/* STEP 1: Course Selection */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div>
                    <Label>{isEn ? 'Academy Program *' : 'البرنامج الأكاديمي (Academy Program) *'}</Label>
                    <Select
                      {...register('programId')}
                      onChange={(e) => {
                        const newProgId = e.target.value ? Number(e.target.value) : '';
                        setValue('programId', newProgId, { shouldValidate: true });
                        setValue('courseId', '', { shouldValidate: true });
                        if (newProgId) clearErrors('programId');
                      }}
                    >
                      <option value="">{t('enrollment.selectProgramPrompt')}</option>
                      {programsToUse.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.name} ({p.ageFrom}-{p.ageTo} {t('enrollment.years')})
                        </option>
                      ))}
                    </Select>
                    {errors.programId && (
                      <p className="text-xs text-red-500 font-semibold mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" /> {errors.programId.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label className="mb-3">{t('enrollment.availableCourses')}</Label>
                    {!selectedProgramId ? (
                      <div className="p-6 rounded-2xl bg-[var(--paper-2)] border border-[var(--line)] text-center text-sm font-semibold text-[var(--ink-faint)]">
                        {t('enrollment.selectProgramFirst')}
                      </div>
                    ) : coursesToUse.length === 0 ? (
                      <div className="p-6 rounded-2xl bg-[var(--paper-2)] border border-[var(--line)] text-center text-sm text-[var(--ink-faint)]">
                        {t('enrollment.loadingCourses')}
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {coursesToUse.map((course) => {
                          const isSelected = Number(selectedCourseId) === Number(course.id);
                          return (
                            <div
                              key={course.id}
                              onClick={() => {
                                setValue('courseId', course.id, { shouldValidate: true });
                                clearErrors('courseId');
                              }}
                              className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                                isSelected
                                  ? 'border-[var(--orange)] bg-[var(--orange-light)]/20 shadow-md ring-2 ring-[var(--orange)]'
                                  : 'border-[var(--line)] bg-[var(--card-bg)] hover:border-[var(--orange)]/50'
                              }`}
                            >
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="font-bold text-[var(--ink)] text-base sm:text-lg en">{course.title}</h4>
                                {isSelected && (
                                  <span className="px-3 py-1 rounded-full bg-[var(--orange)] text-white text-xs font-bold">
                                    {t('enrollment.selectedBadge')}
                                  </span>
                                )}
                              </div>
                              <p className="text-xs sm:text-sm text-[var(--ink-soft)] mb-4 leading-relaxed en">{course.description}</p>
                              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[var(--line)] text-xs sm:text-sm">
                                <div className="flex items-center gap-4 text-[var(--ink-faint)]">
                                  <span className="flex items-center gap-1.5 font-medium">
                                    <Clock className="w-4 h-4 text-[var(--orange)]" /> {course.durationInWeeks} {t('enrollment.weeks')} ({course.sessionsCount} {t('enrollment.sessions')})
                                  </span>
                                  <span className="flex items-center gap-1.5 font-medium">
                                    <Calendar className="w-4 h-4 text-[var(--blue-accent)]" /> {t('enrollment.age')} {course.minimumAge}-{course.maximumAge} {t('enrollment.years')}
                                  </span>
                                  {course.requiresLaptop && (
                                    <span className="flex items-center gap-1.5 text-[var(--orange-dark)] font-bold">
                                      <Laptop className="w-4 h-4" /> {t('enrollment.laptopRequired')}
                                    </span>
                                  )}
                                </div>
                                <span className="font-bold text-[var(--ink)] text-base sm:text-lg en">
                                  EGP {course.finalPrice.toLocaleString()}
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                    {errors.courseId && (
                      <p className="text-xs text-red-500 font-semibold mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" /> {errors.courseId.message}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* STEP 2: Student Information */}
              {currentStep === 2 && (
                <div className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <Label>{isEn ? 'Student First Name *' : 'الاسم الأول للطالب *'}</Label>
                      <Input
                        placeholder={isEn ? 'Enter first name' : 'أدخل الاسم الأول'}
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
                        placeholder={isEn ? 'Enter family name' : 'أدخل اسم العائلة'}
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

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <Label>{isEn ? 'Date of Birth *' : 'تاريخ الميلاد *'}</Label>
                      <Input
                        type="date"
                        {...register('student.dateOfBirth')}
                        onChange={(e) => {
                          setValue('student.dateOfBirth', e.target.value, { shouldValidate: true });
                          if (e.target.value) clearErrors('student.dateOfBirth');
                        }}
                      />
                      {errors.student?.dateOfBirth && (
                        <p className="text-xs text-red-500 font-semibold mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" /> {errors.student.dateOfBirth.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label>{isEn ? 'City / Governorate *' : 'المدينة / المحافظة *'}</Label>
                      <Input
                        placeholder={isEn ? 'e.g. Cairo, Alexandria...' : 'مثال: القاهرة، الإسكندرية...'}
                        {...register('student.city')}
                        onChange={(e) => {
                          setValue('student.city', e.target.value, { shouldValidate: true });
                          if (e.target.value.trim().length >= 2) clearErrors('student.city');
                        }}
                      />
                      {errors.student?.city && (
                        <p className="text-xs text-red-500 font-semibold mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" /> {errors.student.city.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <Label>{isEn ? 'Student Phone Number (Optional)' : 'رقم هاتف الطالب (اختياري - 11 رقم)'}</Label>
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
              )}

              {/* STEP 3: Educational Information */}
              {currentStep === 3 && (
                <div className="space-y-5">
                  <div>
                    <Label>{isEn ? 'Education Level *' : 'المرحلة التعليمية *'}</Label>
                    <Select {...register('student.educationLevel', { valueAsNumber: true })}>
                      <option value={0}>{isEn ? 'Primary School Student' : 'المرحلة الابتدائية (School Student)'}</option>
                      <option value={1}>{isEn ? 'Secondary / High School' : 'المرحلة الإعدادية / الثانوية (Secondary School)'}</option>
                      <option value={2}>{isEn ? 'University Student' : 'المرحلة الجامعية (University)'}</option>
                      <option value={3}>{isEn ? 'Graduate' : 'خريج (Graduate)'}</option>
                    </Select>
                  </div>

                  <div>
                    <Label>{isEn ? 'School / College / University Name *' : 'اسم المدرسة / الكلية / الجامعة *'}</Label>
                    <Input
                      placeholder={isEn ? 'Enter school or university name' : 'أدخل اسم المدرسة أو الكلية بالكامل'}
                      {...register('student.institutionName')}
                      onChange={(e) => {
                        setValue('student.institutionName', e.target.value, { shouldValidate: true });
                        if (e.target.value.trim().length >= 2) clearErrors('student.institutionName');
                      }}
                    />
                    {errors.student?.institutionName && (
                      <p className="text-xs text-red-500 font-semibold mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" /> {errors.student.institutionName.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label>{isEn ? 'Current Grade / Academic Level *' : 'الصف الدراسي / السنة الدراسية *'}</Label>
                    <Input
                      placeholder={isEn ? 'e.g. Grade 10 / Year 2' : 'مثال: الصف الثاني الثانوي / السنة الثانية'}
                      {...register('student.currentLevel')}
                      onChange={(e) => {
                        setValue('student.currentLevel', e.target.value, { shouldValidate: true });
                        if (e.target.value.trim().length >= 1) clearErrors('student.currentLevel');
                      }}
                    />
                    {errors.student?.currentLevel && (
                      <p className="text-xs text-red-500 font-semibold mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" /> {errors.student.currentLevel.message}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* STEP 4: Programming Background */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <div>
                    <Label>{isEn ? 'Has the student studied programming before? *' : 'هل درّس الطالب البرمجة سابقاً؟ *'}</Label>
                    <div className="space-y-3 mt-3">
                      <label className="flex items-center gap-4 p-4 rounded-2xl border border-[var(--line)] bg-[var(--card-bg)] cursor-pointer hover:border-[var(--orange)] transition-colors">
                        <input
                          type="radio"
                          name="hasProg"
                          checked={!watchHasExperience}
                          onChange={() => setValue('assessment.hasProgrammingExperience', false)}
                          className="w-5 h-5 accent-[var(--orange)]"
                        />
                        <div>
                          <div className="text-sm font-bold text-[var(--ink)]">{isEn ? 'No, starting fresh as beginner' : 'لا، بداية جديدة تماماً (No, starting fresh)'}</div>
                          <div className="text-xs text-[var(--ink-faint)]">{isEn ? 'Complete beginner entering tech' : 'مبتدئ في عالم البرمجة والصنعة'}</div>
                        </div>
                      </label>

                      <label className="flex items-center gap-4 p-4 rounded-2xl border border-[var(--line)] bg-[var(--card-bg)] cursor-pointer hover:border-[var(--orange)] transition-colors">
                        <input
                          type="radio"
                          name="hasProg"
                          checked={watchHasExperience}
                          onChange={() => setValue('assessment.hasProgrammingExperience', true)}
                          className="w-5 h-5 accent-[var(--orange)]"
                        />
                        <div>
                          <div className="text-sm font-bold text-[var(--ink)]">{isEn ? 'Yes, has prior coding experience' : 'نعم، لديه خبرة سابقة (Yes, some experience)'}</div>
                          <div className="text-xs text-[var(--ink-faint)]">{isEn ? 'Has written code or built small projects before' : 'استخدم لغات أو أدوات برمجة وبنى مشاريع صغيرة من قبل'}</div>
                        </div>
                      </label>
                    </div>
                  </div>

                  <div>
                    <Label>{isEn ? 'Primary Learning Goal *' : 'الهدف الأساسي من الانضمام *'}</Label>
                    <textarea
                      rows={4}
                      className="flex w-full rounded-xl border border-[var(--line)] bg-[var(--card-bg)] p-4 text-sm text-[var(--ink)] placeholder:text-[var(--ink-faint)] focus:border-[var(--blue-accent)] focus:ring-2 focus:ring-[var(--blue-accent)]/20 outline-none shadow-xs"
                      placeholder={isEn ? 'Explain student goals e.g. game dev, robotics, web apps...' : 'أدخل هدف الطالب من الدورة (مثال: بناء ألعاب وتطبيقات، تعلم الروبوتيكس)'}
                      {...register('assessment.primaryGoal')}
                      onChange={(e) => {
                        setValue('assessment.primaryGoal', e.target.value, { shouldValidate: true });
                        if (e.target.value.trim().length >= 5) clearErrors('assessment.primaryGoal');
                      }}
                    />
                    {errors.assessment?.primaryGoal && (
                      <p className="text-xs text-red-500 font-semibold mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" /> {errors.assessment.primaryGoal.message}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* STEP 5: Parent Information */}
              {currentStep === 5 && (
                <div className="space-y-5">
                  <div>
                    <Label>{isEn ? 'Parent Full Name *' : 'اسم ولي الأمر الثلاثي *'}</Label>
                    <Input
                      placeholder={isEn ? 'Enter parent full name' : 'أدخل اسم ولي الأمر الثلاثي بالكامل'}
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
                      <Label>{isEn ? 'Parent Email Address *' : 'البريد الإلكتروني لولي الأمر (name@domain.com) *'}</Label>
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
              )}

              {/* STEP 6: Payment Upload */}
              {currentStep === 6 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3 p-5 rounded-2xl border border-[var(--line)] bg-[var(--paper-2)]">
                    <input
                      type="checkbox"
                      id="hasLaptopPageCheck"
                      className="w-5 h-5 accent-[var(--orange)] rounded cursor-pointer"
                      {...register('hasLaptopConfirmation')}
                    />
                    <label htmlFor="hasLaptopPageCheck" className="text-sm font-bold text-[var(--ink)] cursor-pointer flex items-center gap-2">
                      <Laptop className="w-5 h-5 text-[var(--blue-accent)]" />
                      {isEn ? 'Student has a personal laptop for training and sessions' : 'يتوفر لدى الطالب جهاز لابتوب خاص للتدريب والجلسات (Laptop Required)'}
                    </label>
                  </div>

                  <div>
                    <Label className="mb-2">{isEn ? 'Upload Payment Receipt / Screenshot (Optional)' : 'رفع صورة إيصال الدفع / لقطة الشاشة (Payment Upload - اختياري)'}</Label>
                    <div className="border-2 border-dashed border-[var(--line)] rounded-3xl p-8 text-center bg-[var(--paper-2)] hover:border-[var(--orange)] transition-colors cursor-pointer relative">
                      <input
                        type="file"
                        accept="image/*"
                        id="fileUploadPageStep"
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        onChange={(e) => setScreenshotFile(e.target.files[0])}
                      />
                      <Upload className="w-10 h-10 text-[var(--orange)] mx-auto mb-3" />
                      <div className="text-sm font-bold text-[var(--ink)]">
                        {screenshotFile ? screenshotFile.name : (isEn ? 'Click here to upload receipt image' : 'اضغط هنا لرفع صورة الإيصال')}
                      </div>
                      <div className="text-xs text-[var(--ink-faint)] mt-1.5">PNG, JPG up to 5 MB</div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 7: Review & Submit */}
              {currentStep === 7 && (
                <div className="space-y-5">
                  <div className="p-6 rounded-3xl border border-[var(--line)] bg-[var(--paper-2)] space-y-4 text-sm">
                    <h4 className="font-bold text-[var(--ink)] text-base border-b border-[var(--line)] pb-3 flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-[var(--orange)]" /> {isEn ? 'Application Summary' : 'ملخص تفاصيل طلب الالتحاق'}
                    </h4>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[var(--ink-soft)]">
                      <div><strong>{isEn ? 'Academic Program:' : 'البرنامج الأكاديمي:'}</strong> <span className="en font-semibold">{currentProgObj?.name || (isEn ? 'Not specified' : 'غير محدد')}</span></div>
                      <div><strong>{isEn ? 'Selected Course:' : 'الدورة / الكورس:'}</strong> <span className="en font-semibold">{currentCourseObj?.title || (isEn ? 'Not specified' : 'غير محدد')}</span></div>
                      <div><strong>{isEn ? 'Tuition Fee:' : 'رسوم الدورة:'}</strong> <span className="en font-bold text-[var(--ink)]">{currentCourseObj ? `EGP ${currentCourseObj.finalPrice.toLocaleString()}` : '—'}</span></div>
                      <div><strong>{isEn ? 'Student Name:' : 'اسم الطالب:'}</strong> {watch('student.firstName')} {watch('student.lastName')}</div>
                      <div><strong>{isEn ? 'Educational Level:' : 'المرحلة التعليمية:'}</strong> {watch('student.currentLevel')}</div>
                      <div><strong>{isEn ? 'Parent Name:' : 'اسم ولي الأمر:'}</strong> {watch('parent.name')}</div>
                      <div><strong>{isEn ? 'Parent Phone:' : 'هاتف ولي الأمر:'}</strong> <span className="en font-mono">{watch('parent.phone')}</span></div>
                      <div><strong>{isEn ? 'Parent Email:' : 'البريد الإلكتروني:'}</strong> <span className="en font-mono">{watch('parent.email')}</span></div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Wizard Controls */}
          <div className="flex items-center justify-between pt-6 border-t border-[var(--line)] mt-8">
            {currentStep > 1 ? (
              <Button type="button" variant="outline" onClick={prevStep}>
                <PrevArrow className="w-5 h-5" /> {t('enrollment.prev')}
              </Button>
            ) : (
              <div />
            )}

            {currentStep < 7 ? (
              <Button type="button" onClick={nextStep}>
                {t('enrollment.next')} <NextArrow className="w-5 h-5" />
              </Button>
            ) : (
              <Button type="submit" disabled={submitMutation.isPending} className="px-8">
                {submitMutation.isPending ? t('enrollment.submitting') : t('enrollment.submit')}
              </Button>
            )}
          </div>
        </form>

      </div>
    </div>
  );
}
