import React, { useState } from 'react';
import { Sliders, BookOpen, ShieldCheck, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const Footer: React.FC = () => {
  const { setIsAdminOpen, setIsFounderGuideOpen, setIsSizeGuideOpen, t, language } = useStore();
  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setEmailInput('');
    }
  };

  return (
    <footer className="bg-[#1A1918] text-[#E8E6E1] border-t border-white/10 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          {/* Brand Info (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <span
              className="text-2xl font-normal tracking-wide text-white block"
              style={{ fontFamily: 'Cormorant Garamond, serif' }}
            >
              HOMEDESIGN OF DJADOU
            </span>
            <p className="text-xs text-neutral-400 font-light leading-relaxed max-w-sm">
              {t('footerDesc')}
            </p>
            <div className="pt-2 flex items-center gap-4 text-xs text-neutral-400">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-neutral-300" />
                <span>{t('sovereignStorefront')}</span>
              </span>
            </div>
          </div>

          {/* Quick Links (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-neutral-300 font-semibold mb-3">
              {t('atelierConcierge')}
            </h4>
            <ul className="space-y-2 text-xs text-neutral-400 font-light">
              <li>
                <button
                  onClick={() => setIsSizeGuideOpen(true)}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {t('sizeGuide')}
                </button>
              </li>
              <li>
                <a href="#featured" className="hover:text-white transition-colors">
                  {t('navPieces')}
                </a>
              </li>
              <li>
                <a href="#lookbook" className="hover:text-white transition-colors">
                  {t('lookbookKicker')}
                </a>
              </li>
              <li>
                <button
                  onClick={() => setIsFounderGuideOpen(true)}
                  className="hover:text-white transition-colors flex items-center gap-1 text-amber-300/90 cursor-pointer"
                >
                  <BookOpen className="w-3 h-3" />
                  <span>{t('navRoadmap')}</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Private Salon / Newsletter (4 cols) */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-neutral-300 font-semibold mb-3">
              {t('salonTitle')}
            </h4>
            <p className="text-xs text-neutral-400 font-light leading-relaxed">
              {t('salonDesc')}
            </p>

            <form onSubmit={handleSubscribe} className="flex gap-2 pt-2">
              <input
                type="email"
                required
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder={t('salonPlaceholder')}
                className="flex-1 px-3 py-2 text-xs bg-neutral-900 border border-neutral-700 text-white placeholder:text-neutral-500 focus:outline-none focus:border-neutral-400"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-neutral-200 text-neutral-950 text-xs uppercase font-semibold hover:bg-white transition-colors flex items-center gap-1 cursor-pointer"
              >
                <span>{t('salonJoin')}</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </form>
            {subscribed && (
              <p className="text-[11px] text-emerald-400">
                {t('salonSuccess')}
              </p>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 gap-4">
          <p>© {new Date().getFullYear()} HomedesignofDjadou Paris. {t('allRightsReserved')}</p>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsAdminOpen(true)}
              className="flex items-center gap-1.5 text-neutral-400 hover:text-white transition-colors underline underline-offset-4 cursor-pointer"
            >
              <Sliders className="w-3 h-3" />
              <span>{t('adminPortal')}</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
