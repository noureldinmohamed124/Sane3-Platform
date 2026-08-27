import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { TEAM_MEMBERS } from '../../constants/landingData';
import { Sparkles, Users, Award, Shield, Compass } from 'lucide-react';

export default function TeamSection() {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === 'en';

  return (
    <section id="team" className="py-20 sm:py-28 px-4 sm:px-6 relative z-10">
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* Header Title */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--orange-light)] text-[var(--orange)] text-xs font-bold font-en uppercase tracking-wider border border-[var(--orange)]/30">
            <Users className="w-3.5 h-3.5" />
            <span>{isEn ? 'OUR TEAM & MENTORS' : 'فريق العمل والخبرات'}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-rakkas text-[var(--ink)] leading-tight">
            {isEn ? (
              <>
                Learning Engineers, <br />
                <span className="text-[var(--orange)]">Not Traditional Lecturers.</span>
              </>
            ) : (
              <>
                مهندسو تعلّم وتوجيه، <br />
                <span className="text-[var(--orange)]">مش مجرد ملقني كود ومحاضرين.</span>
              </>
            )}
          </h2>

          <p className="text-base sm:text-lg text-[var(--ink-soft)] leading-relaxed">
            {isEn
              ? 'Our mentors guide real builds, diagnose knowledge gaps, and uphold the gradual release of responsibility so students gain independent capability.'
              : 'فريق صانع من المهندسين يقود جلسات البناء العملي، يحدد الفجوات المعرفية، ويطبق مبدأ التوجيه التدريجي لبناء قدرة الطالب واستقلاليته.'}
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TEAM_MEMBERS.map((member) => (
            <motion.div
              key={member.id}
              whileHover={{ y: -6 }}
              className="p-6 rounded-3xl bg-[var(--card-bg)] border border-[var(--line)] shadow-xl flex flex-col justify-between space-y-5 relative group hover:border-[var(--orange)]/60 transition-all text-center"
            >
              <div className="space-y-4">
                {/* Avatar */}
                <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-2 border-[var(--orange)]/40 p-1 shadow-md bg-[var(--paper-2)]">
                  <img
                    src={member.avatar}
                    alt={isEn ? member.nameEn : member.name}
                    className="w-full h-full object-cover rounded-full group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Name & Role */}
                <div className="space-y-1">
                  <h3 className="font-bold text-lg text-[var(--ink)]">
                    {isEn ? member.nameEn : member.name}
                  </h3>
                  <div className="text-xs font-bold text-[var(--orange)]">
                    {isEn ? member.roleEn : member.role}
                  </div>
                </div>

                {/* Bio */}
                <p className="text-xs text-[var(--ink-soft)] leading-relaxed">
                  {isEn ? member.bioEn : member.bio}
                </p>
              </div>

              {/* Specialization Tag */}
              <div className="pt-3 border-t border-[var(--line)]">
                <span className="text-[11px] font-mono font-semibold text-[var(--ink-faint)] bg-[var(--paper-2)] px-2.5 py-1 rounded-lg inline-block">
                  {member.domain}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
