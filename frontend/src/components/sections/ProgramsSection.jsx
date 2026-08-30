import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import { useAcademyProgramsQuery } from '../../features/curriculum/useProgramsQuery';
import { Button } from '../ui/button';
import { Calendar, Layers, CheckCircle2, ArrowRight, ArrowLeft, BookOpen } from 'lucide-react';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1.0] },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export default function ProgramsSection() {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === 'en';
  const navigate = useNavigate();
  const Arrow = isEn ? ArrowRight : ArrowLeft;

  const { data: programs = [] } = useAcademyProgramsQuery();

  return (
    <section id="programs" className="py-10 sm:py-24 px-4 sm:px-6 relative z-10 overflow-hidden">
      <div className="max-w-6xl mx-auto space-y-10 sm:space-y-16">
        
        {/* Header Title */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={fadeInUp}
          className="text-center space-y-3 sm:space-y-4 max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[var(--orange-light)] text-[var(--orange)] text-xs font-bold font-en uppercase tracking-wider border border-[var(--orange)]/30">
            <BookOpen className="w-3.5 h-3.5" />
            <span>{isEn ? 'ACADEMY PROGRAMS' : 'البرامج الأكاديمية'}</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[var(--ink)] leading-tight tracking-tight">
            {isEn ? (
              <>
                Programs Built for Capability, <br />
                <span className="text-[var(--orange)]">Tailored for Ages 8 to 18.</span>
              </>
            ) : (
              <>
                برامج مبنية على القدرة الحقيقية، <br />
                <span className="text-[var(--orange)]">ومصممة للناشئين والشباب من ٨ إلى ١٨ سنة.</span>
              </>
            )}
          </h2>

          <p className="text-xs sm:text-base text-[var(--ink-soft)] leading-relaxed">
            {isEn
              ? 'From junior makers to advanced software & IoT builders, explore our structured semester pathways and enroll today.'
              : 'من سن ٨ إلى ١٨ سنة، استكشف البرامج والسمسترز الأكاديمية المصممة لنقلك إلى مستوى الصانع المحترف.'}
          </p>
        </motion.div>

        {/* Programs Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8"
        >
          {programs.map((prog) => {
            const ageMin = prog.ageMin || prog.ageFrom || 8;
            const ageMax = prog.ageMax || prog.ageTo || 18;

            return (
              <motion.div
                key={prog.id}
                variants={fadeInUp}
                className="rounded-3xl bg-[var(--card-bg)] border border-[var(--line)] p-5 sm:p-8 shadow-lg flex flex-col justify-between space-y-4 sm:space-y-6 relative overflow-hidden group hover:border-[var(--orange)]/60 transition-all hover:shadow-xl"
              >
                <div className="space-y-3 sm:space-y-4">
                  {/* Top Badges */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-xl bg-[var(--orange-light)]/40 text-[var(--orange)] text-xs font-bold font-en">
                      <Calendar className="w-3.5 h-3.5" />
                      {ageMin} – {ageMax} {isEn ? 'Years' : 'سنة'}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-[var(--ink-faint)]">
                      <Layers className="w-3.5 h-3.5" />
                      {prog.semestersCount || prog.SemestersCount || prog.coursesCount || 3} {isEn ? 'Semesters' : 'سمسترز'}
                    </span>
                  </div>

                  {/* Title and Description */}
                  <div className="space-y-1.5 sm:space-y-2">
                    <h3 className="text-lg sm:text-2xl font-extrabold text-[var(--ink)] tracking-tight">
                      {isEn ? prog.name : (prog.nameAr || prog.name)}
                    </h3>
                    <p className="text-xs sm:text-sm text-[var(--ink-soft)] leading-relaxed line-clamp-3 sm:line-clamp-none">
                      {prog.description || (isEn ? 'Hands-on practical academy curriculum designed to build technical capability through real project builds.' : 'منهج تطبيقي عملي يهدف إلى بناء القدرة الهندسية والبرمجية وصناعة مشاريع متكاملة.')}
                    </p>
                  </div>

                  {/* Feature Highlights */}
                  <div className="space-y-2 pt-3 border-t border-[var(--line)] text-xs text-[var(--ink)]">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[var(--orange)] shrink-0" />
                      <span>{isEn ? 'Need-First Learning Cycle per Session' : 'دورة تعلم قائمة على حل المشكلات'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[var(--orange)] shrink-0" />
                      <span>{isEn ? 'Live Student Passport with Verified Evidence' : 'توثيق المشاريع في جواز سفر الطالب'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[var(--orange)] shrink-0" />
                      <span>{isEn ? 'Mentorship from Learning Engineers' : 'إشراف هندسي وتوجيه مستمر'}</span>
                    </div>
                  </div>
                </div>

                {/* CTA Enroll Button */}
                <div className="pt-3 sm:pt-4 border-t border-[var(--line)]">
                  <Button
                    onClick={() => navigate('/enrollment', { state: { program: prog } })}
                    className="w-full justify-center text-xs sm:text-sm py-2.5 font-bold shadow-md"
                  >
                    <span>{isEn ? 'Enroll in Program' : 'سجّل في البرنامج'}</span>
                    <Arrow className="w-4 h-4" />
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
