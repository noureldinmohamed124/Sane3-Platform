import React from 'react';
import { Dialog } from '../../../components/ui/dialog';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { useProgramCoursesQuery } from '../../curriculum/useProgramsQuery';
import { useAppStore } from '../../../store/useAppStore';
import { Clock, Calendar, Laptop } from 'lucide-react';
import { useNavigate } from 'react-router';

export default function CourseDetailsModal() {
  const navigate = useNavigate();
  const isCourseModalOpen = useAppStore((state) => state.isCourseModalOpen);
  const courseModalProgram = useAppStore((state) => state.courseModalProgram);
  const closeCourseModal = useAppStore((state) => state.closeCourseModal);

  const { data: courses = [], isLoading, isError } = useProgramCoursesQuery(courseModalProgram?.id);

  if (!courseModalProgram) return null;

  return (
    <Dialog
      isOpen={isCourseModalOpen}
      onClose={closeCourseModal}
      title={`دورات مسار: ${courseModalProgram.name || courseModalProgram.title}`}
    >
      <p className="text-sm text-[var(--ink-soft)] mb-6">
        {courseModalProgram.description || courseModalProgram.desc}
      </p>

      {isLoading ? (
        <div className="py-12 text-center text-sm text-[var(--ink-faint)]">
          جاري تحميل الكورسات والدورات... ⏳
        </div>
      ) : isError ? (
        <div className="p-4 rounded-xl bg-red-50 text-red-600 border border-red-200 text-sm">
          تعذر تحميل كورسات هذا المسار من الخادم.
        </div>
      ) : courses.length === 0 ? (
        <div className="py-8 text-center text-sm text-[var(--ink-faint)]">
          لا توجد كورسات متاحة حالياً لهذا المسار.
        </div>
      ) : (
        <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
          {courses.map((course) => (
            <div
              key={course.id}
              className="p-5 rounded-2xl border border-[var(--line)] bg-[var(--paper-2)] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-[var(--ink)] text-base">{course.title}</h4>
                  <Badge variant="orange">{course.finalPrice} ج.م</Badge>
                </div>
                <p className="text-xs text-[var(--ink-soft)] leading-relaxed">{course.description}</p>
                <div className="flex flex-wrap gap-4 text-xs text-[var(--ink-faint)] pt-1">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[var(--orange)]" />
                    {course.durationInWeeks} أسابيع ({course.sessionsCount} سيشن)
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[var(--blue-accent)]" />
                    {course.minimumAge} - {course.maximumAge} سنة
                  </span>
                  {course.requiresLaptop && (
                    <span className="flex items-center gap-1 text-[var(--orange-dark)]">
                      <Laptop className="w-3.5 h-3.5" /> يتطلب لابتوب
                    </span>
                  )}
                </div>
              </div>

              <Button
                size="sm"
                className="shrink-0"
                onClick={() => {
                  closeCourseModal();
                  navigate('/enrollment', { state: { program: courseModalProgram, course } });
                }}
              >
                احجز هذا الكورس
              </Button>
            </div>
          ))}
        </div>
      )}
    </Dialog>
  );
}
