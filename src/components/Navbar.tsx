import React, { useState } from 'react';
import { ShoppingBag, Sliders, BookOpen, Globe, X } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { CurrencyCode, Language } from '../types/store';

interface NavbarProps {
  onNavigateSection?: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigateSection }) => {
  const {
    currentTheme,
    cartTotalCount,
    setIsCartOpen,
    setIsAdminOpen,
    setIsFounderGuideOpen,
    currency,
    setCurrency,
    language,
    setLanguage,
    detectedLocation,
    t
  } = useStore();

  const [dismissAnnouncement, setDismissAnnouncement] = useState(false);
  const [showLocationToast, setShowLocationToast] = useState(true);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    if (onNavigateSection) {
      onNavigateSection(id);
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const announcement =
    language === 'fr' && currentTheme.announcementTextFr
      ? currentTheme.announcementTextFr
      : currentTheme.announcementText;

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md transition-colors duration-300 border-b border-black/5 bg-[#FAF9F6]/90">
      {/* Optional Slim Announcement Bar */}
      {currentTheme.showAnnouncement && !dismissAnnouncement && (
        <div
          className="relative px-4 py-2 text-center text-xs tracking-wider font-light flex items-center justify-center transition-colors duration-300"
          style={{
            backgroundColor: currentTheme.primaryColor,
            color: '#FAF9F6'
          }}
        >
          <span>{announcement}</span>
          <button
            onClick={() => setDismissAnnouncement(true)}
            className="absolute right-3 p-1 opacity-70 hover:opacity-100 transition-opacity"
            aria-label="Dismiss banner"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Top Bar 3-Zone Contract */}
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="/"
          className="text-2xl sm:text-3xl font-normal tracking-wide text-neutral-900 select-none whitespace-nowrap hover:opacity-85 transition-opacity"
          style={{ fontFamily: 'Cormorant Garamond, serif' }}
        >
          HOMEDESIGN OF DJADOU
        </a>

        {/* Zone 2: 4-5 nav links */}
        <nav className="hidden md:flex items-center gap-8 text-xs uppercase tracking-widest font-medium text-neutral-600">
          <a
            href="#collections"
            onClick={(e) => handleNavClick(e, 'collections')}
            className="hover:text-neutral-900 transition-colors"
          >
            {t('navCollections')}
          </a>
          <a
            href="#featured"
            onClick={(e) => handleNavClick(e, 'featured')}
            className="hover:text-neutral-900 transition-colors"
          >
            {t('navPieces')}
          </a>
          <a
            href="#lookbook"
            onClick={(e) => handleNavClick(e, 'lookbook')}
            className="hover:text-neutral-900 transition-colors"
          >
            {t('navLookbook')}
          </a>
          <a
            href="#craft"
            onClick={(e) => handleNavClick(e, 'craft')}
            className="hover:text-neutral-900 transition-colors"
          >
            {t('navCraft')}
          </a>
          <button
            onClick={() => setIsFounderGuideOpen(true)}
            className="flex items-center gap-1.5 text-neutral-500 hover:text-neutral-900 transition-colors cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5 text-neutral-400" />
            <span>{t('navRoadmap')}</span>
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Location & Language Switcher (FR / EN) */}
          <div className="flex items-center text-xs font-medium border border-neutral-300 bg-white">
            <button
              onClick={() => setLanguage('fr')}
              className={`px-2 py-1 text-xs transition-colors ${
                language === 'fr'
                  ? 'bg-neutral-900 text-white font-semibold'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
              title="Passer la boutique en Français (Recommandé pour la France)"
            >
              FR 🇫🇷
            </button>
            <span className="text-neutral-300">|</span>
            <button
              onClick={() => setLanguage('en')}
              className={`px-2 py-1 text-xs transition-colors ${
                language === 'en'
                  ? 'bg-neutral-900 text-white font-semibold'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
              title="Switch store to English"
            >
              EN 🇬🇧
            </button>
          </div>

          {/* Currency Switcher */}
          <div className="relative hidden sm:flex items-center text-xs font-medium text-neutral-600">
            <Globe className="w-3.5 h-3.5 mr-1 text-neutral-400" />
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
              className="bg-transparent text-xs font-medium text-neutral-700 focus:outline-none cursor-pointer pr-1"
              aria-label="Currency"
            >
              <option value="EUR">EUR (€)</option>
              <option value="USD">USD ($)</option>
              <option value="GBP">GBP (£)</option>
            </select>
          </div>

          {/* Admin Suite Button */}
          <button
            onClick={() => setIsAdminOpen(true)}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-neutral-700 bg-neutral-100 hover:bg-neutral-200 border border-neutral-200 rounded-md transition-colors"
            title={language === 'fr' ? 'Ouvrir l’administration atelier' : 'Open Store Management & Theme Studio'}
          >
            <Sliders className="w-3.5 h-3.5 text-neutral-500" />
            <span>{t('adminPortal')}</span>
          </button>

          {/* Cart Bag trigger */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 text-neutral-800 hover:text-neutral-950 transition-colors flex items-center gap-1 cursor-pointer"
            aria-label={t('shoppingBag')}
          >
            <ShoppingBag className="w-5 h-5 stroke-[1.5]" />
            {cartTotalCount > 0 && (
              <span
                className="absolute top-1 right-0.5 min-w-[18px] h-[18px] text-[10px] font-semibold text-white rounded-full flex items-center justify-center px-1"
                style={{ backgroundColor: currentTheme.primaryColor }}
              >
                {cartTotalCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Subtle Location Detection Indicator */}
      {showLocationToast && detectedLocation.isFrance && language === 'fr' && (
        <div className="bg-[#EAE6DF] px-4 py-1 text-[11px] text-neutral-700 flex items-center justify-between border-t border-black/5">
          <div className="max-w-7xl mx-auto w-full flex items-center justify-between px-2">
            <span>{t('locationDetectedFr')}</span>
            <button
              onClick={() => setShowLocationToast(false)}
              className="text-neutral-500 hover:text-neutral-900 text-[10px] ml-4 cursor-pointer"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
