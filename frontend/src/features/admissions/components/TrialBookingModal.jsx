import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog } from '../../../components/ui/dialog';
import { Button } from '../../../components/ui/button';
import { Input, Select, Label } from '../../../components/ui/input';
import { useAppStore } from '../../../store/useAppStore';
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
} from 'lucide-react';

const STEP_TITLES = [
  'اختيار الدورة والمسار',
  'بيانات الطالب',
  'المعلومات التعليمية',
  'الخبرة البرمجية',
  'بيانات ولي الأمر',
  'رفع إيصال الدفع',
  'مراجعة وإرسال الطلب',
];

const STEP_SUBTITLES = [
  'ابدأ باختيار البرنامج والأكاديمية والدورة المناسبة لأهداف الطالب.',
  'البيانات الأساسية لتخصيص رحلة التعلم.',
  'مستوى ومؤسسة التعلم الحالية للطالب.',
  'مستوى الخبرة والأهداف — لا يشترط وجود خبرة سابقة.',
  'بيانات التواصل مع ولي الأمر للتحديثات والمتابعة.',
  'تأكيد توفر اللابتوب ورفع صورة إيصال الدفع.',
  'مراجعة كافة البيانات المدخلة قبل تأكيد وإرسال طلب الالتحاق.',
];

const DEFAULT_PROGRAMS = [
  { id: 1, name: 'Professional Career Program', ageFrom: 18, ageTo: 40 },
  { id: 2, name: 'Secondary Schools Program', ageFrom: 15, ageTo: 18 },
  { id: 3, name: 'Programming for Kids', ageFrom: 8, ageTo: 15 },
];

const COURSES_MAP = {
  1: [
    {
      id: 101,
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
      id: 102,
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
      id: 103,
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
      id: 201,
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
      id: 202,
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

export default function TrialBookingModal() {
  const isTrialModalOpen = useAppStore((state) => state.isTrialModalOpen);
  const selectedProgramCtx = useAppStore((state) => state.selectedProgram);
  const selectedCourseCtx = useAppStore((state) => state.selectedCourse);
  const closeTrialModal = useAppStore((state) => state.closeTrialModal);

  const [currentStep, setCurrentStep] = useState(1);
  const [screenshotFile, setScreenshotFile] = useState(null);

  const { data: apiPrograms = [] } = useAcademyProgramsQuery();
  const programsToUse = apiPrograms.length > 0 ? apiPrograms : DEFAULT_PROGRAMS;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(enrollmentSchema),
    defaultValues: {
      programId: 3,
      courseId: 6,
      hasLaptopConfirmation: true,
      parent: { name: '', phone: '', email: '' },
      student: {
        firstName: '',
        lastName: '',
        dateOfBirth: '2012-05-15',
        city: 'القاهرة',
        educationLevel: 0,
        institutionName: 'مدرسة صانع',
        currentLevel: 'الصف السادس',
        faculty: 'عام',
        graduationStatus: 0,
        studentPhone: '01000000000',
        studentEmail: '',
      },
      assessment: {
        hasProgrammingExperience: false,
        programmingExperienceLevel: 'Beginner',
        participatedInCompetitions: false,
        programmingTools: 'Scratch',
        primaryGoal: 'تعلم بناء المشاريع والبرمجة بالبناء الحقيقي',
      },
    },
  });

  const selectedProgramId = watch('programId');
  const selectedCourseId = watch('courseId');
  const watchHasExperience = watch('assessment.hasProgrammingExperience');

  const { data: apiCourses = [] } = useProgramCoursesQuery(selectedProgramId ? Number(selectedProgramId) : null);
  
  // Resolve courses fallback dynamically based on selected program ID
  const coursesToUse = apiCourses.length > 0
    ? apiCourses
    : (COURSES_MAP[Number(selectedProgramId)] || COURSES_MAP[3]);

  useEffect(() => {
    if (selectedProgramCtx?.id) {
      setValue('programId', selectedProgramCtx.id);
    } else if (programsToUse.length > 0) {
      setValue('programId', programsToUse[0].id);
    }
  }, [selectedProgramCtx, programsToUse, setValue]);

  useEffect(() => {
    if (selectedCourseCtx?.id) {
      setValue('courseId', selectedCourseCtx.id);
    } else if (coursesToUse.length > 0) {
      setValue('courseId', coursesToUse[0].id);
    }
  }, [selectedCourseCtx, coursesToUse, setValue]);

  const submitMutation = useSubmitEnrollmentMutation();

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
          toast.success('تم إرسال طلب الالتحاق بنجاح!', {
            description: 'سيتواصل معكم فريق صانع خلال 24 ساعة لتأكيد التفاصيل.',
          });
          reset();
          setCurrentStep(1);
          setScreenshotFile(null);
          closeTrialModal();
        },
        onError: (err) => {
          toast.error('حدث خطأ أثناء تقديم الطلب', {
            description: err.message,
          });
        },
      }
    );
  };

  const currentProgObj = programsToUse.find((p) => Number(p.id) === Number(selectedProgramId));
  const currentCourseObj = coursesToUse.find((c) => Number(c.id) === Number(selectedCourseId));
  const percentComplete = Math.round((currentStep / 7) * 100);

  if (!isTrialModalOpen) return null;

  return (
    <Dialog isOpen={isTrialModalOpen} onClose={closeTrialModal} className="max-w-3xl">
      <div className="space-y-6 text-right">
        
        {/* Header Title Info */}
        <div className="text-center space-y-1">
          <div className="text-[11px] font-bold text-[#F58220] uppercase tracking-widest font-en">
            ENROLLMENT APPLICATION
          </div>
          <h2 className="text-2xl sm:text-3xl font-rakkas text-[#002561]">
            {STEP_TITLES[currentStep - 1]}
          </h2>
          <p className="text-xs sm:text-sm text-[#3A4E7A] max-w-md mx-auto">
            {STEP_SUBTITLES[currentStep - 1]}
          </p>
        </div>

        {/* Progress Bar & Stepper Indicator */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs text-[#8290AC] font-semibold">
            <span>الخطوة {currentStep} من ٧</span>
            <span className="en font-mono">{percentComplete}% مكتمل</span>
          </div>

          <div className="w-full h-1.5 bg-[#E9EDF6] rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[#F58220] to-[#FF9F45]"
              animate={{ width: `${percentComplete}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Stepper circles 1 -> 7 */}
          <div className="hidden sm:flex items-center justify-between text-[11px] pt-1">
            {STEP_TITLES.map((title, idx) => {
              const stepNum = idx + 1;
              const isCompleted = stepNum < currentStep;
              const isCurrent = stepNum === currentStep;

              return (
                <div key={idx} className="flex flex-col items-center gap-1.5 flex-1 relative">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center font-semibold transition-all ${
                      isCompleted
                        ? 'bg-[#F58220] text-white shadow-sm'
                        : isCurrent
                        ? 'border-2 border-[#F58220] bg-white text-[#F58220] font-bold shadow-md'
                        : 'bg-[#E9EDF6] text-[#8290AC]'
                    }`}
                  >
                    {isCompleted ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : stepNum}
                  </div>
                  <span
                    className={`text-[10px] text-center line-clamp-1 max-w-[75px] ${
                      isCurrent ? 'font-bold text-[#002561]' : 'text-[#8290AC]'
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
        <form onSubmit={handleSubmit(onSubmit)} className="pt-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {/* STEP 1: Course Selection */}
              {currentStep === 1 && (
                <div className="space-y-5">
                  <div>
                    <Label className="text-xs font-bold text-[#002561]">البرنامج الأكاديمي (Academy Program) *</Label>
                    <Select
                      {...register('programId')}
                      onChange={(e) => {
                        const newProgId = Number(e.target.value);
                        setValue('programId', newProgId);
                        const firstCourse = (COURSES_MAP[newProgId] || COURSES_MAP[3])[0];
                        if (firstCourse) setValue('courseId', firstCourse.id);
                      }}
                      className="h-11 bg-white border-[#DCE3F1]"
                    >
                      {programsToUse.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.name} ({p.ageFrom}-{p.ageTo} سنة)
                        </option>
                      ))}
                    </Select>
                  </div>

                  <div>
                    <Label className="text-xs font-bold text-[#002561] mb-2">الدورات المتاحة (Available Courses) *</Label>
                    <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
                      {coursesToUse.map((course) => {
                        const isSelected = Number(selectedCourseId) === Number(course.id);
                        return (
                          <div
                            key={course.id}
                            onClick={() => setValue('courseId', course.id)}
                            className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                              isSelected
                                ? 'border-[#F58220] bg-[#FFE4C7]/20 shadow-md ring-1 ring-[#F58220]'
                                : 'border-[#DCE3F1] bg-white hover:border-[#F58220]/50'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-1.5">
                              <h4 className="font-bold text-[#002561] text-sm sm:text-base en">{course.title}</h4>
                              {isSelected && (
                                <span className="px-2.5 py-0.5 rounded-full bg-[#F58220] text-white text-[11px] font-bold">
                                  مختار
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-[#3A4E7A] mb-3 leading-relaxed en">{course.description}</p>
                            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#DCE3F1]/60 text-xs">
                              <div className="flex items-center gap-3 text-[#8290AC]">
                                <span className="flex items-center gap-1">
                                  <Clock className="w-3.5 h-3.5 text-[#F58220]" /> {course.durationInWeeks} أسابيع ({course.sessionsCount} سيشن)
                                </span>
                                <span className="flex items-center gap-1">
                                  <Calendar className="w-3.5 h-3.5 text-[#3B6FD1]" /> السن {course.minimumAge}-{course.maximumAge}
                                </span>
                                {course.requiresLaptop && (
                                  <span className="flex items-center gap-1 text-[#C0620F] font-semibold">
                                    <Laptop className="w-3.5 h-3.5" /> يتطلب لابتوب
                                  </span>
                                )}
                              </div>
                              <span className="font-bold text-[#002561] text-sm en">
                                EGP {course.finalPrice.toLocaleString()}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: Student Information */}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label>الاسم الأول للطالب *</Label>
                      <Input placeholder="مثال: يوسف" {...register('student.firstName')} />
                      {errors.student?.firstName && (
                        <p className="text-xs text-red-500 mt-1">{errors.student.firstName.message}</p>
                      )}
                    </div>
                    <div>
                      <Label>اسم العائلة *</Label>
                      <Input placeholder="مثال: أحمد" {...register('student.lastName')} />
                      {errors.student?.lastName && (
                        <p className="text-xs text-red-500 mt-1">{errors.student.lastName.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label>تاريخ الميلاد *</Label>
                      <Input type="date" {...register('student.dateOfBirth')} />
                    </div>
                    <div>
                      <Label>المدينة / المحافظة *</Label>
                      <Input placeholder="مثال: القاهرة" {...register('student.city')} />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label>رقم هاتف الطالب (اختياري)</Label>
                      <Input placeholder="01xxxxxxxxx" {...register('student.studentPhone')} />
                    </div>
                    <div>
                      <Label>البريد الإلكتروني للطالب (اختياري)</Label>
                      <Input type="email" placeholder="student@example.com" {...register('student.studentEmail')} />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: Educational Information */}
              {currentStep === 3 && (
                <div className="space-y-4">
                  <div>
                    <Label>المرحلة التعليمية *</Label>
                    <Select {...register('student.educationLevel', { valueAsNumber: true })} className="h-11">
                      <option value={0}>المرحلة الابتدائية (School Student)</option>
                      <option value={1}>المرحلة الإعدادية / الثانوية (Secondary School)</option>
                      <option value={2}>المرحلة الجامعية (University)</option>
                      <option value={3}>خريج (Graduate)</option>
                    </Select>
                  </div>

                  <div>
                    <Label>اسم المدرسة / الجامعة *</Label>
                    <Input placeholder="أدخل اسم المدرسة أو الكلية" {...register('student.institutionName')} />
                  </div>

                  <div>
                    <Label>الصف الدراسي / السنة الدراسية *</Label>
                    <Input placeholder="مثال: الصف الثاني الثانوي / السنة الثانية" {...register('student.currentLevel')} />
                  </div>
                </div>
              )}

              {/* STEP 4: Programming Background */}
              {currentStep === 4 && (
                <div className="space-y-5">
                  <div>
                    <Label>هل درّس الطالب البرمجة سابقاً؟ *</Label>
                    <div className="space-y-2.5 mt-2">
                      <label className="flex items-center gap-3 p-3.5 rounded-xl border border-[#DCE3F1] bg-white cursor-pointer hover:border-[#F58220]">
                        <input
                          type="radio"
                          name="hasProg"
                          checked={!watchHasExperience}
                          onChange={() => setValue('assessment.hasProgrammingExperience', false)}
                          className="w-4 h-4 accent-[#F58220]"
                        />
                        <div>
                          <div className="text-xs font-bold text-[#002561]">لا، بداية جديدة تماماً</div>
                          <div className="text-[11px] text-[#8290AC]">مبتدئ في عالم البرمجة والصنعة</div>
                        </div>
                      </label>

                      <label className="flex items-center gap-3 p-3.5 rounded-xl border border-[#DCE3F1] bg-white cursor-pointer hover:border-[#F58220]">
                        <input
                          type="radio"
                          name="hasProg"
                          checked={watchHasExperience}
                          onChange={() => setValue('assessment.hasProgrammingExperience', true)}
                          className="w-4 h-4 accent-[#F58220]"
                        />
                        <div>
                          <div className="text-xs font-bold text-[#002561]">نعم، لديه خبرة سابقة</div>
                          <div className="text-[11px] text-[#8290AC]">استخدم لغات أو أدوات برمجة وبنى مشاريع صغيرة</div>
                        </div>
                      </label>
                    </div>
                  </div>

                  <div>
                    <Label>الهدف الأساسي من الانضمام *</Label>
                    <textarea
                      rows={3}
                      className="flex w-full rounded-xl border border-[#DCE3F1] bg-white px-4 py-2.5 text-xs text-[#002561] placeholder:text-[#8290AC] focus:border-[#3B6FD1] outline-none"
                      placeholder="مثال: بناء ألعاب وتطبيقات حقيقية، التجهز للمسابقات، أو احتراف الروبوتيكس"
                      {...register('assessment.primaryGoal')}
                    />
                  </div>
                </div>
              )}

              {/* STEP 5: Parent Information */}
              {currentStep === 5 && (
                <div className="space-y-4">
                  <div>
                    <Label>اسم ولي الأمر الثلاثي *</Label>
                    <Input placeholder="أدخل الاسم الثلاثي لولي الأمر" {...register('parent.name')} />
                    {errors.parent?.name && (
                      <p className="text-xs text-red-500 mt-1">{errors.parent.name.message}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label>رقم هاتف ولي الأمر *</Label>
                      <Input placeholder="01xxxxxxxxx" {...register('parent.phone')} />
                      {errors.parent?.phone && (
                        <p className="text-xs text-red-500 mt-1">{errors.parent.phone.message}</p>
                      )}
                    </div>

                    <div>
                      <Label>البريد الإلكتروني لولي الأمر *</Label>
                      <Input type="email" placeholder="parent@example.com" {...register('parent.email')} />
                      {errors.parent?.email && (
                        <p className="text-xs text-red-500 mt-1">{errors.parent.email.message}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 6: Payment Upload */}
              {currentStep === 6 && (
                <div className="space-y-5">
                  <div className="flex items-center gap-3 p-4 rounded-xl border border-[#DCE3F1] bg-[#F5F7FB]">
                    <input
                      type="checkbox"
                      id="hasLaptopCheck"
                      className="w-4 h-4 accent-[#F58220] rounded cursor-pointer"
                      {...register('hasLaptopConfirmation')}
                    />
                    <label htmlFor="hasLaptopCheck" className="text-xs font-semibold text-[#002561] cursor-pointer flex items-center gap-2">
                      <Laptop className="w-4 h-4 text-[#3B6FD1]" />
                      يتوفر لدى الطالب جهاز لابتوب خاص لاستخدام الجلسات والورش
                    </label>
                  </div>

                  <div>
                    <Label>رفع إيصال الدفع / لقطة الشاشة (Payment Upload)</Label>
                    <div className="border-2 border-dashed border-[#DCE3F1] rounded-2xl p-6 text-center bg-[#F5F7FB] hover:border-[#F58220] transition-colors cursor-pointer relative">
                      <input
                        type="file"
                        accept="image/*"
                        id="fileUploadStep"
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        onChange={(e) => setScreenshotFile(e.target.files[0])}
                      />
                      <Upload className="w-8 h-8 text-[#F58220] mx-auto mb-2" />
                      <div className="text-xs font-bold text-[#002561]">
                        {screenshotFile ? screenshotFile.name : 'اضغط هنا لرفع صورة الإيصال'}
                      </div>
                      <div className="text-[11px] text-[#8290AC] mt-1">PNG, JPG حتى 5 ميجابايت</div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 7: Review & Submit */}
              {currentStep === 7 && (
                <div className="space-y-4">
                  <div className="p-5 rounded-2xl border border-[#DCE3F1] bg-[#F5F7FB] space-y-3 text-xs">
                    <h4 className="font-bold text-[#002561] text-sm border-b border-[#DCE3F1] pb-2">
                      ملخص تفاصيل الطلب
                    </h4>
                    
                    <div className="grid grid-cols-2 gap-3 text-[#3A4E7A]">
                      <div><strong>البرنامج:</strong> <span className="en">{currentProgObj?.name || 'Sane3 Program'}</span></div>
                      <div><strong>الكورس:</strong> <span className="en">{currentCourseObj?.title || 'Selected Course'}</span></div>
                      <div><strong>رسوم الدورة:</strong> <span className="en font-bold text-[#002561]">EGP {currentCourseObj?.finalPrice?.toLocaleString() || '—'}</span></div>
                      <div><strong>اسم الطالب:</strong> {watch('student.firstName')} {watch('student.lastName')}</div>
                      <div><strong>ولي الأمر:</strong> {watch('parent.name')}</div>
                      <div><strong>هاتف ولي الأمر:</strong> <span className="en">{watch('parent.phone')}</span></div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Wizard Footer Controls */}
          <div className="flex items-center justify-between pt-6 border-t border-[#DCE3F1] mt-6">
            {currentStep > 1 ? (
              <Button type="button" variant="outline" size="sm" onClick={prevStep}>
                <ChevronRight className="w-4 h-4" /> السابق
              </Button>
            ) : (
              <div />
            )}

            {currentStep < 7 ? (
              <Button type="button" size="sm" onClick={nextStep}>
                التالي <ChevronLeft className="w-4 h-4" />
              </Button>
            ) : (
              <Button type="submit" size="sm" disabled={submitMutation.isPending}>
                {submitMutation.isPending ? 'جاري الإرسال...' : 'تأكيد وإرسال الطلب'}
              </Button>
            )}
          </div>
        </form>

      </div>
    </Dialog>
  );
}
