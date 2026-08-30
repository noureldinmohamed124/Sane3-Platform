import React from 'react';
import { useTranslation } from 'react-i18next';
import { GRADUATE_PILLARS, IDENTITY_ARC_STAGES } from '../../constants/landingData';
import { Compass, Users, Target, Award, ArrowRight, ArrowLeft } from 'lucide-react';

export default function AboutSection() {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === 'en';
  const Arrow = isEn ? ArrowRight : ArrowLeft;

  return (
    <section id="about" className="py-10 sm:py-24 px-4 sm:px-6 relative z-10 overflow-hidden">
      <div className="max-w-6xl mx-auto space-y-10 sm:space-y-16">
        
        {/* Header Title */}
        <div className="text-center space-y-3 sm:space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[var(--orange-light)] text-[var(--orange)] text-xs font-bold font-en uppercase tracking-wider border border-[var(--orange)]/30">
            <Compass className="w-3.5 h-3.5" />
            <span>{isEn ? 'WHO WE ARE' : 'احنا مين؟'}</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[var(--ink)] leading-tight tracking-tight">
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

          <p className="text-xs sm:text-base text-[var(--ink-soft)] leading-relaxed">
            {isEn
              ? 'At Sanea, our mission is to transform young people from passive technology consumers into active, capable creators who can take an idea from napkin sketch to a working, shippable product.'
              : 'في صانع، هدفنا تحويل الطلاب من مستهلكين سلبيين للتكنولوجيا إلى صناع قادرين على أخذ الفكرة من مجرد رسم على ورقة إلى منتج تكنولوجي شغال ومختبر.'}
          </p>
        </div>

        {/* Visual Lab Showcase Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 items-center">
          {/* Main Lab Image */}
          <div
            className="lg:col-span-7 rounded-3xl overflow-hidden shadow-xl border border-[var(--line)] relative group h-[300px] sm:h-[460px] bg-[var(--paper-2)]"
          >
            <picture>
              <source srcSet="/images/IMG_9925.webp" type="image/webp" />
              <img
                src="/images/IMG_9925.jpg"
                alt="Sanea Collaborative Engineering Lab"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                onError={(e) => {
                  e.currentTarget.src = '/images/workshops/workshop-1.webp';
                }}
              />
            </picture>
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent pointer-events-none" />
            <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 text-white space-y-1.5 pointer-events-none">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--orange)] text-xs font-extrabold text-white shadow-md">
                <Users className="w-3.5 h-3.5" />
                {isEn ? 'Collaborative Engineering' : 'بناء جماعي وتعاون هندسي'}
              </div>
              <h4 className="text-sm sm:text-xl font-extrabold text-white drop-shadow-md">
                {isEn ? 'Mentored Sessions on Real Hardware & Code' : 'توجيه هندسي وتطبيق مباشر على الأجهزة والكود'}
              </h4>
            </div>
          </div>

          {/* Secondary Stack of Workshop Moments */}
          <div className="lg:col-span-5 grid grid-cols-2 lg:grid-cols-1 gap-3 sm:gap-4">
            <div
              className="h-[140px] sm:h-[215px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-md border border-[var(--line)] relative group bg-[var(--paper-2)]"
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
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />
              <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 right-2 sm:right-4 text-white pointer-events-none">
                <div className="text-[11px] sm:text-sm font-bold text-white drop-shadow-md line-clamp-2">
                  {isEn ? 'Hardware Circuits & Sensor Wiring' : 'توصيل الحساسات وبرمجة الدوائر'}
                </div>
              </div>
            </div>

            <div
              className="h-[140px] sm:h-[215px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-md border border-[var(--line)] relative group bg-[var(--paper-2)]"
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
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />
              <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 right-2 sm:right-4 text-white pointer-events-none">
                <div className="text-[11px] sm:text-sm font-bold text-white drop-shadow-md line-clamp-2">
                  {isEn ? 'Problem Solving & Algorithmic Challenges' : 'تحديات التفكير الخوارزمي وحل المشكلات'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Core Philosophy Banner */}
        <div className="p-5 sm:p-10 rounded-3xl bg-[var(--card-bg)]/90 backdrop-blur-xl border border-[var(--line)] shadow-lg relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-2.5 sm:space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[var(--orange-light)]/40 text-[var(--orange)] text-xs font-bold font-en">
                <Target className="w-3.5 h-3.5" />
                <span>{isEn ? 'CORE PRINCIPLE' : 'جوهر فلسفة صانع'}</span>
              </div>
              <h3 className="text-xl sm:text-3xl font-extrabold text-[var(--ink)]">
                {isEn ? 'Capability Over Completion' : 'القدرة قبل الإكمال'}
              </h3>
              <p className="text-xs sm:text-base text-[var(--ink-soft)] leading-relaxed">
                {isEn
                  ? 'Traditional academies measure success by course completion certificates. We measure success by what the student can actually build, troubleshoot, explain, and defend.'
                  : 'الأكاديميات التقليدية بتقيس النجاح بشهادة إكمال الكورس. إحنا بنقيس النجاح باللي الطالب بيقدر يبنيه بإيده، يحل مشاكله، ويشرحه ويدافع عن كل قرار هندسي فيه.'}
              </p>
            </div>

            <div className="lg:col-span-5 grid grid-cols-2 gap-2.5 sm:gap-4">
              <div className="p-3 sm:p-5 rounded-2xl bg-[var(--paper-2)] border border-[var(--line)] text-center space-y-0.5">
                <div className="text-xl sm:text-3xl font-extrabold font-en text-[var(--orange)]">100%</div>
                <div className="text-[11px] sm:text-xs font-bold text-[var(--ink)]">{isEn ? 'Hands-on Builds' : 'بناء عملي ومشاريع'}</div>
              </div>
              <div className="p-3 sm:p-5 rounded-2xl bg-[var(--paper-2)] border border-[var(--line)] text-center space-y-0.5">
                <div className="text-xl sm:text-3xl font-extrabold font-en text-[var(--blue-accent)]">7</div>
                <div className="text-[11px] sm:text-xs font-bold text-[var(--ink)]">{isEn ? 'Identity Stages' : 'مراحل في مسار الهوية'}</div>
              </div>
              <div className="p-3 sm:p-5 rounded-2xl bg-[var(--paper-2)] border border-[var(--line)] text-center space-y-0.5">
                <div className="text-xl sm:text-3xl font-extrabold font-en text-[var(--orange-dark)]">4</div>
                <div className="text-[11px] sm:text-xs font-bold text-[var(--ink)]">{isEn ? 'Graduate Pillars' : 'أركان تخريج الصانع'}</div>
              </div>
              <div className="p-3 sm:p-5 rounded-2xl bg-[var(--paper-2)] border border-[var(--line)] text-center space-y-0.5">
                <div className="text-xl sm:text-3xl font-extrabold font-en text-green-600">0%</div>
                <div className="text-[11px] sm:text-xs font-bold text-[var(--ink)]">{isEn ? 'Passive Watching' : 'تلقين نظري بحت'}</div>
              </div>
            </div>

          </div>
        </div>

        {/* 4 Pillars of a Sanea Graduate (2-column on mobile) */}
        <div className="space-y-4 sm:space-y-6">
          <div className="text-center space-y-1.5">
            <h3 className="text-xl sm:text-3xl font-extrabold text-[var(--ink)]">
              {isEn ? 'The 4 Pillars of Every Sanea Graduate' : 'الأركان الأربعة لخريج صانع'}
            </h3>
            <p className="text-xs sm:text-sm text-[var(--ink-faint)]">
              {isEn
                ? 'Every student must demonstrate all four components together to graduate.'
                : 'كل طالب لازم يمتلك الأركان الأربعة دي معاً ليصبح صانعاً حقيقياً.'}
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
            {GRADUATE_PILLARS.map((pillar, idx) => (
              <div
                key={idx}
                className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-[var(--card-bg)] border border-[var(--line)] shadow-sm space-y-2 sm:space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl sm:text-3xl">{pillar.icon}</span>
                  <span className="text-[11px] sm:text-xs font-mono font-bold text-[var(--orange)] bg-[var(--orange-light)]/40 px-2 py-0.5 rounded-md">
                    {pillar.num}
                  </span>
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-sm sm:text-base text-[var(--ink)]">
                    {isEn ? pillar.titleEn : pillar.title}
                  </h4>
                  <p className="text-[11px] sm:text-xs text-[var(--ink-soft)] leading-snug line-clamp-3 sm:line-clamp-none">
                    {isEn ? pillar.subEn : pillar.sub}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* The 7 Identity Path Stages */}
        <div className="p-5 sm:p-8 rounded-3xl bg-[var(--paper-2)] border border-[var(--line)] space-y-4">
          <div className="text-center space-y-1 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--blue-accent)]">
              <Award className="w-4 h-4" />
              <span>{isEn ? 'THE IDENTITY PATH' : 'مسار بناء وتطور الهوية الهندسية'}</span>
            </div>
            <h3 className="text-lg sm:text-2xl font-extrabold text-[var(--ink)]">
              {isEn ? 'How a Student Evolves at Sanea' : 'تطور هوية وشخصية الطالب في صانع'}
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5 sm:gap-3 pt-1">
            {IDENTITY_ARC_STAGES.map((stg) => (
              <div
                key={stg.id}
                className="p-3 rounded-2xl bg-[var(--card-bg)] border border-[var(--line)] text-center space-y-1 shadow-2xs"
              >
                <div className="w-5 h-5 rounded-full bg-[var(--orange-light)]/60 text-[var(--orange)] font-mono text-[11px] font-bold flex items-center justify-center mx-auto">
                  {stg.id}
                </div>
                <div className="font-bold text-xs text-[var(--ink)]">
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
