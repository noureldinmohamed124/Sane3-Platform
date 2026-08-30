import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router';
import { Mail, Phone, MapPin } from 'lucide-react';
import { NAV_LINKS } from '../constants/landingData';

function FacebookIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function WhatsAppIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="currentColor"
      {...props}
    >
      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
    </svg>
  );
}

export default function Footer() {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === 'en';
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (e, href) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/' + href);
    } else {
      const targetId = href.replace('#', '');
      const targetElement = document.getElementById(targetId) || document.querySelector(href);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const handleProgramClick = (e) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/#programs');
    } else {
      const targetElement = document.getElementById('programs') || document.querySelector('#programs');
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      } else {
        navigate('/enrollment');
      }
    }
  };

  return (
    <footer className="bg-[#001845] dark:bg-[#070C16] text-white pt-10 sm:pt-16 pb-8 sm:pb-12 relative z-10 border-t border-[#013584] dark:border-[#232E45]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-10 pb-6 sm:pb-10 border-b border-white/10">
          
          {/* Col 1: Brand Logo & Mission */}
          <div className="space-y-3 sm:space-y-4">
            <div
              onClick={(e) => handleNavClick(e, '#')}
              className="flex items-center cursor-pointer group w-fit active:scale-95 transition-transform"
              title="صانع | Sanea"
            >
              <div className="p-1.5 sm:p-2 rounded-2xl bg-white/10 border border-white/20 group-hover:scale-105 transition-transform flex items-center justify-center shadow-md">
                <img src="/sanea-mark.png" alt="صانع" className="h-8 sm:h-10 w-auto brand-logo-img object-contain" />
              </div>
            </div>

            <p className="text-xs text-[#C9D4EE] leading-relaxed">
              {t('footer.brandDesc')}
            </p>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F58220]/20 text-[#FF9F45] border border-[#F58220]/30 text-[11px] font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F58220] animate-pulse" />
              <span>{t('tagline')}</span>
            </div>
          </div>

          {/* Quick Links & Programs side-by-side on mobile */}
          <div className="grid grid-cols-2 gap-4 sm:contents">
            
            {/* Col 2: Navigation Links */}
            <div className="space-y-2.5 sm:space-y-3">
              <h4 className="text-[11px] sm:text-xs font-extrabold uppercase tracking-wider text-[#8290AC] font-en">
                {isEn ? 'NAVIGATION' : 'روابط سريعة'}
              </h4>
              <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-[#C9D4EE] font-semibold">
                {NAV_LINKS.map((link, idx) => (
                  <li key={idx}>
                    <a
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className="hover:text-[#F58220] active:text-[#FF9F45] transition-colors block cursor-pointer"
                    >
                      {isEn ? link.labelEn : link.label}
                    </a>
                  </li>
                ))}
                <li>
                  <button
                    onClick={() => navigate('/enrollment')}
                    className="hover:text-[#F58220] active:text-[#FF9F45] transition-colors block text-left rtl:text-right cursor-pointer"
                  >
                    {isEn ? 'Enrollment' : 'التسجيل'}
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 3: All 5 Programs */}
            <div className="space-y-2.5 sm:space-y-3">
              <h4 className="text-[11px] sm:text-xs font-extrabold uppercase tracking-wider text-[#8290AC] font-en">
                {isEn ? 'PROGRAMS' : 'البرامج الأكاديمية'}
              </h4>
              <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-[#C9D4EE] font-semibold">
                <li>
                  <a href="#programs" onClick={handleProgramClick} className="hover:text-[#F58220] transition-colors block">
                    {isEn ? 'Young Makers (8-12)' : '١. المبدعون الصغار'}
                  </a>
                </li>
                <li>
                  <a href="#programs" onClick={handleProgramClick} className="hover:text-[#F58220] transition-colors block">
                    {isEn ? 'Web Wizards (12-18)' : '٢. سحرة الويب'}
                  </a>
                </li>
                <li>
                  <a href="#programs" onClick={handleProgramClick} className="hover:text-[#F58220] transition-colors block">
                    {isEn ? 'Tech Makers (14-18)' : '٣. صُنّاع التكنولوجيا'}
                  </a>
                </li>
                <li>
                  <a href="#programs" onClick={handleProgramClick} className="hover:text-[#F58220] transition-colors block">
                    {isEn ? 'AI Builders (12-18)' : '٤. بُناة الذكاء الاصطناعي'}
                  </a>
                </li>
                <li>
                  <a href="#programs" onClick={handleProgramClick} className="hover:text-[#F58220] transition-colors block">
                    {isEn ? 'High School (16-20)' : '٥. المرحلة الثانوية'}
                  </a>
                </li>
              </ul>
            </div>

          </div>

          {/* Col 4: Contact, WhatsApp & Facebook */}
          <div className="space-y-3">
            <h4 className="text-[11px] sm:text-xs font-extrabold uppercase tracking-wider text-[#8290AC] font-en">
              {isEn ? 'GET IN TOUCH' : 'تواصل معنا'}
            </h4>
            
            <div className="grid grid-cols-1 gap-2 text-xs text-[#C9D4EE]">
              {/* Phone & Email */}
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="tel:01039248148"
                  className="flex items-center gap-1.5 hover:text-[#F58220] active:scale-95 transition-all group font-mono font-bold"
                  title="اتصل بنا هاتفياً"
                >
                  <Phone className="w-3.5 h-3.5 text-[#F58220]" />
                  <span dir="ltr">01039248148</span>
                </a>

                <a
                  href="mailto:san3.business@gmail.com"
                  className="flex items-center gap-1.5 hover:text-[#F58220] active:scale-95 transition-all group font-mono text-[11px]"
                  title="راسلنا عبر البريد"
                >
                  <Mail className="w-3.5 h-3.5 text-[#3B6FD1]" />
                  <span dir="ltr">san3.business@gmail.com</span>
                </a>
              </div>

              {/* Branches */}
              <div className="flex items-start gap-1.5 pt-1 text-[11px] text-[#C9D4EE] leading-relaxed">
                <MapPin className="w-3.5 h-3.5 text-[#F58220] shrink-0 mt-0.5" />
                <span>الجيزة (أكتوبر) — المنوفية (شبين الكوم)</span>
              </div>

              {/* Social & Chat Buttons (WhatsApp & Facebook) */}
              <div className="flex items-center gap-2 pt-1">
                {/* WhatsApp Button */}
                <a
                  href="https://wa.me/201039248148"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-[#25D366]/20 hover:bg-[#25D366] text-[#25D366] hover:text-white border border-[#25D366]/40 active:scale-95 transition-all inline-flex items-center gap-1.5 text-xs font-bold shadow-xs cursor-pointer"
                  title="تواصل معنا عبر واتساب"
                >
                  <WhatsAppIcon className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>

                {/* Facebook Button */}
                <a
                  href="https://www.facebook.com/share/18WH2g4XWK/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-[#1877F2]/20 hover:bg-[#1877F2] text-[#4A99FF] hover:text-white border border-[#1877F2]/40 active:scale-95 transition-all inline-flex items-center gap-1.5 text-xs font-bold shadow-xs cursor-pointer"
                  title="صفحتنا على فيسبوك"
                >
                  <FacebookIcon className="w-3.5 h-3.5" />
                  <span>Facebook</span>
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Legal Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#8290AC]">
          <div>{t('footer.rights')}</div>
          <div className="flex items-center gap-4 font-medium">
            <a href="#" className="hover:text-white transition-colors">{t('footer.privacy')}</a>
            <a href="#" className="hover:text-white transition-colors">{t('footer.terms')}</a>
            <a href="#" className="hover:text-white transition-colors">{t('footer.cookies')}</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
