import React from 'react';
import { useTranslation } from 'react-i18next';
import { Mail, Phone, MapPin, Globe, Share2, MessageSquare } from 'lucide-react';
import { NAV_LINKS } from '../constants/landingData';

export default function Footer() {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === 'en';

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#001845] dark:bg-[#070C16] text-white pt-16 pb-12 relative z-10 border-t border-[#013584] dark:border-[#232E45]">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
        
        {/* Col 1: Brand Info */}
        <div className="space-y-4">
          <div
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-3 cursor-pointer group w-fit"
            title="الانتقال لأعلى الصفحة"
          >
            <div className="p-1.5 rounded-xl bg-white/10 border border-white/20 group-hover:scale-105 transition-transform flex items-center justify-center">
              <img src="/sanea-mark.png" alt={t('brand')} className="h-8 w-auto brand-logo-img" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-2xl text-white tracking-tight">{t('brand')}</span>
              <span className="text-[10px] text-[#8290AC] font-mono tracking-wider">{t('subBrand')}</span>
            </div>
          </div>

          <p className="text-xs text-[#C9D4EE] leading-relaxed">
            {t('footer.brandDesc')}
          </p>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F58220]/20 text-[#FF9F45] border border-[#F58220]/30 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-[#F58220] animate-pulse" />
            {t('tagline')}
          </div>
        </div>

        {/* Col 2: Navigation Links */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#8290AC] font-en">NAVIGATION</h4>
          <ul className="space-y-2 text-sm text-[#C9D4EE] font-semibold">
            {NAV_LINKS.map((link, idx) => (
              <li key={idx}>
                <a
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="hover:text-[#F58220] transition-colors"
                >
                  {isEn ? link.labelEn : link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3: Programs */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#8290AC] font-en">PROGRAMS</h4>
          <ul className="space-y-2 text-sm text-[#C9D4EE] font-semibold">
            <li><a href="#programs" onClick={(e) => handleNavClick(e, '#programs')} className="hover:text-[#F58220] transition-colors">{isEn ? 'Young Makers Track (8-12)' : 'المبدعون الصغار (٨-١٢ سنة)'}</a></li>
            <li><a href="#programs" onClick={(e) => handleNavClick(e, '#programs')} className="hover:text-[#F58220] transition-colors">{isEn ? 'Web Wizards Track (12-18)' : 'سحرة الويب (١٢-١٨ سنة)'}</a></li>
            <li><a href="#programs" onClick={(e) => handleNavClick(e, '#programs')} className="hover:text-[#F58220] transition-colors">{isEn ? 'Tech Makers Track (14-18)' : 'صُنّاع التكنولوجيا (١٤-١٨ سنة)'}</a></li>
            <li><a href="#programs" onClick={(e) => handleNavClick(e, '#programs')} className="hover:text-[#F58220] transition-colors">{isEn ? 'AI Builders Track (12-18)' : 'بُناة الذكاء الاصطناعي (١٢-١٨ سنة)'}</a></li>
          </ul>
        </div>

        {/* Col 4: Contact & Social */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#8290AC] font-en">GET IN TOUCH</h4>
          <ul className="space-y-2.5 text-xs text-[#C9D4EE]">
            <li className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-[#F58220]" />
              <span className="en font-mono">contact@sanea.edu.eg</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-[#3B6FD1]" />
              <span className="en font-mono">+20 (100) 000-0000</span>
            </li>
            <li className="flex items-center gap-2.5">
              <MapPin className="w-4 h-4 text-[#F58220]" />
              <span>{isEn ? 'Cairo, Egypt' : 'القاهرة، مصر'}</span>
            </li>
          </ul>

          <div className="flex items-center gap-3 pt-2">
            <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[#F58220] transition-colors" title="Website">
              <Globe className="w-4 h-4" />
            </a>
            <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[#F58220] transition-colors" title="Social">
              <Share2 className="w-4 h-4" />
            </a>
            <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[#F58220] transition-colors" title="Community">
              <MessageSquare className="w-4 h-4" />
            </a>
          </div>
        </div>

      </div>

      {/* Bottom Legal Bar */}
      <div className="max-w-6xl mx-auto px-6 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8290AC]">
        <div>{t('footer.rights')}</div>
        <div className="flex items-center gap-6">
          <a href="#" className="hover:text-white transition-colors">{t('footer.privacy')}</a>
          <a href="#" className="hover:text-white transition-colors">{t('footer.terms')}</a>
          <a href="#" className="hover:text-white transition-colors">{t('footer.cookies')}</a>
        </div>
      </div>
    </footer>
  );
}
