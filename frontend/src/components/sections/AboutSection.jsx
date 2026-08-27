import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { GRADUATE_PILLARS, IDENTITY_ARC_STAGES } from '../../constants/landingData';
import { Sparkles, ArrowRight, ArrowLeft, ShieldCheck, Target, Award, Compass, Users } from 'lucide-react';

export default function AboutSection() {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === 'en';
  const Arrow = isEn ? ArrowRight : ArrowLeft;

  return (
    <section id="about" className="py-20 sm:py-28 px-4 sm:px-6 relative z-10 overflow-hidden">
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* Header Title */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--orange-light)] text-[var(--orange)] text-xs font-bold font-en uppercase tracking-wider border border-[var(--orange)]/30">
            <Compass className="w-3.5 h-3.5" />
            <span>{isEn ? 'WHO WE ARE' : 'احنا مين؟'}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-rakkas text-[var(--ink)] leading-tight">
            {isEn ? (
              <>
                Not just another coding academy. <br />
                <span className="text-[var(--orange)]">A Building & Empowerment Platform.</span>
              </>
            ) : (
              <>
                مش مجرد أكاديمية برمجة للأطفال. <br />
                <span className="text-[var(--orange)]">منصة لبناء وتمكين جيل من الصنّاع.</span>
              </>
            )}
          </h2>

          <p className="text-base sm:text-lg text-[var(--ink-soft)] leading-relaxed">
            {isEn
              ? 'At Sanea, our mission is to transform young people from passive technology consumers into active, capable creators who can take an idea from napkin sketch to a working, shippable product.'
              : 'في صانع، هدفنا تحويل الطلاب من مستهلكين سلبيين للتكنولوجيا إلى صناع قادرين على أخذ الفكرة من مجرد رسم على ورقة إلى منتج تكنولوجي شغال ومختبر.'}
          </p>
        </div>

        {/* Visual Lab Showcase Split (Optimized WebP images with lazy loading) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Main Lab Image */}
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="lg:col-span-7 rounded-3xl overflow-hidden shadow-2xl border border-[var(--line)] relative group h-[340px] sm:h-[420px] bg-[var(--paper-2)]"
          >
            <picture>
              <source srcSet="/images/IMG_9925.webp" type="image/webp" />
              <img
                src="/images/IMG_9925.jpg"
                alt="Sanea Lab Activity"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                onError={(e) => {
                  e.currentTarget.src = '/images/workshops/workshop-1.webp';
                }}
              />
            </picture>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />
            <div className="absolute bottom-6 left-6 right-6 text-white space-y-1 pointer-events-none">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--orange)] text-xs font-bold text-white mb-1">
                <Users className="w-3.5 h-3.5" />
                {isEn ? 'Collaborative Engineering' : 'بناء جماعي وتعاون هندسي'}
              </div>
              <h4 className="text-lg sm:text-xl font-bold">
                {isEn ? 'Mentored Sessions on Real Hardware & Code' : 'توجيه هندسي وتطبيق مباشر على الأجهزة والكود'}
              </h4>
            </div>
          </motion.div>

          {/* Secondary Stack of Workshop Moments */}
          <div className="lg:col-span-5 space-y-4">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="h-[195px] rounded-3xl overflow-hidden shadow-lg border border-[var(--line)] relative group bg-[var(--paper-2)]"
            >
              <picture>
                <source srcSet="/images/workshops/workshop-3.webp" type="image/webp" />
                <img
                  src="/images/workshops/workshop-3.jpeg"
                  alt="Workshop moment"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </picture>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-4 right-4 text-white text-xs font-bold pointer-events-none">
                {isEn ? 'Hardware Circuits & Sensor Wiring' : 'توصيل الحساسات وبرمجة الدوائر الإلكترونية'}
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="h-[195px] rounded-3xl overflow-hidden shadow-lg border border-[var(--line)] relative group bg-[var(--paper-2)]"
            >
              <picture>
                <source srcSet="/images/workshops/workshop-4.webp" type="image/webp" />
                <img
                  src="/images/workshops/workshop-4.jpeg"
                  alt="Workshop moment"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </picture>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-4 right-4 text-white text-xs font-bold pointer-events-none">
                {isEn ? 'Problem Solving & Algorithmic Challenges' : 'تحديات التفكير الخوارزمي وحل المشكلات'}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Core Philosophy Banner: Capability Over Completion */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[var(--card-bg)]/90 backdrop-blur-xl border border-[var(--line)] shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-[var(--orange)]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[var(--orange-light)]/40 text-[var(--orange)] text-xs font-bold font-en">
                <Target className="w-3.5 h-3.5" />
                <span>{isEn ? 'CORE PRINCIPLE' : 'جوهر فلسفة صانع'}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-[var(--ink)]">
                {isEn ? 'Capability Over Completion' : 'القدرة قبل الإكمال'}
              </h3>
              <p className="text-sm sm:text-base text-[var(--ink-soft)] leading-relaxed">
                {isEn
                  ? 'Traditional academies measure success by course completion certificates. We measure success by what the student can actually build, troubleshoot, explain, and defend.'
                  : 'الأكاديميات التقليدية بتقيس النجاح بشهادة إكمال الكورس. إحنا بنقيس النجاح باللي الطالب بيقدر يبنيه بإيده، يحل مشاكله، ويشرحه ويدافع عن كل قرار هندسي فيه.'}
              </p>
            </div>

            <div className="lg:col-span-5 grid grid-cols-2 gap-3 sm:gap-4">
              <div className="p-4 sm:p-5 rounded-2xl bg-[var(--paper-2)] border border-[var(--line)] space-y-1 text-center">
                <div className="text-2xl sm:text-3xl font-bold font-en text-[var(--orange)]">100%</div>
                <div className="text-xs font-bold text-[var(--ink)]">{isEn ? 'Hands-on Builds' : 'بناء عملي ومشاريع'}</div>
              </div>
              <div className="p-4 sm:p-5 rounded-2xl bg-[var(--paper-2)] border border-[var(--line)] space-y-1 text-center">
                <div className="text-2xl sm:text-3xl font-bold font-en text-[var(--blue-accent)]">7</div>
                <div className="text-xs font-bold text-[var(--ink)]">{isEn ? 'Identity Stages' : 'مراحل في قوس الهوية'}</div>
              </div>
              <div className="p-4 sm:p-5 rounded-2xl bg-[var(--paper-2)] border border-[var(--line)] space-y-1 text-center">
                <div className="text-2xl sm:text-3xl font-bold font-en text-[var(--orange-dark)]">4</div>
                <div className="text-xs font-bold text-[var(--ink)]">{isEn ? 'Graduate Pillars' : 'أركان تخريج الصانع'}</div>
              </div>
              <div className="p-4 sm:p-5 rounded-2xl bg-[var(--paper-2)] border border-[var(--line)] space-y-1 text-center">
                <div className="text-2xl sm:text-3xl font-bold font-en text-green-600">0%</div>
                <div className="text-xs font-bold text-[var(--ink)]">{isEn ? 'Passive Watching' : 'تلقين نظري بحت'}</div>
              </div>
            </div>

          </div>
        </div>

        {/* 4 Pillars of a Sanea Graduate */}
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h3 className="text-2xl sm:text-3xl font-bold text-[var(--ink)]">
              {isEn ? 'The 4 Pillars of Every Sanea Graduate' : 'الأركان الأربعة لخريج صانع'}
            </h3>
            <p className="text-xs sm:text-sm text-[var(--ink-faint)]">
              {isEn
                ? 'Every student must demonstrate all four components together to graduate.'
                : 'كل طالب لازم يمتلك الأركان الأربعة دي معاً ليصبح صانعاً حقيقياً.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {GRADUATE_PILLARS.map((pillar, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -5 }}
                className="p-6 rounded-3xl bg-[var(--card-bg)] border border-[var(--line)] shadow-lg space-y-4 relative group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-3xl">{pillar.icon}</span>
                  <span className="text-xs font-mono font-bold text-[var(--orange)] bg-[var(--orange-light)]/40 px-2.5 py-1 rounded-lg">
                    {pillar.num}
                  </span>
                </div>
                <div className="space-y-1.5">
                  <h4 className="font-bold text-lg text-[var(--ink)]">
                    {isEn ? pillar.titleEn : pillar.title}
                  </h4>
                  <p className="text-xs text-[var(--ink-soft)] leading-relaxed">
                    {isEn ? pillar.subEn : pillar.sub}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* The 7 Identity Arc Stages */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[var(--paper-2)] border border-[var(--line)] space-y-6">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--blue-accent)]">
              <Award className="w-4 h-4" />
              <span>{isEn ? 'THE IDENTITY ARC' : 'قوس الهوية الهندسية'}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-[var(--ink)]">
              {isEn ? 'How a Student Evolves at Sanea' : 'تطور هوية وشخصية الطالب في صانع'}
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 pt-2">
            {IDENTITY_ARC_STAGES.map((stg) => (
              <div
                key={stg.id}
                className="p-3.5 rounded-2xl bg-[var(--card-bg)] border border-[var(--line)] text-center space-y-1.5 hover:border-[var(--orange)] transition-colors shadow-xs"
              >
                <div className="w-6 h-6 rounded-full bg-[var(--orange-light)]/50 text-[var(--orange)] font-mono text-xs font-bold flex items-center justify-center mx-auto">
                  {stg.id}
                </div>
                <div className="font-bold text-xs sm:text-sm text-[var(--ink)]">
                  {isEn ? stg.nameEn : stg.name}
                </div>
                <div className="text-[10px] text-[var(--ink-faint)] line-clamp-2 leading-tight">
                  {stg.desc}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
