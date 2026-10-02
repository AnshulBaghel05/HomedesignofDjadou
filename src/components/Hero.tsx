import React from 'react';
import { ArrowDown, SlidersHorizontal } from 'lucide-react';
import { useStore } from '../context/StoreContext';

interface HeroProps {
  onExploreClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick }) => {
  const {
    currentTheme,
    collections,
    activeCollection,
    setActiveCollectionId,
    setIsAdminOpen,
    language,
    getLocalizedCollectionName,
    t
  } = useStore();

  const heroBadge =
    language === 'fr' && currentTheme.heroBadgeFr ? currentTheme.heroBadgeFr : currentTheme.heroBadge;
  const heroTitle =
    language === 'fr' && currentTheme.heroTitleFr ? currentTheme.heroTitleFr : currentTheme.heroTitle;
  const heroSubtitle =
    language === 'fr' && currentTheme.heroSubtitleFr
      ? currentTheme.heroSubtitleFr
      : currentTheme.heroSubtitle;

  return (
    <section className="relative w-full overflow-hidden bg-neutral-950 text-white min-h-[85vh] flex items-center">
      {/* Background Image with Cinematic Scrim */}
      <div className="absolute inset-0">
        <img
          src={currentTheme.heroBanner}
          alt={heroTitle}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center filter brightness-90 transform scale-105 transition-all duration-1000 ease-out"
        />
        {/* Measured dark gradient scrim for contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-24 sm:py-32 w-full flex flex-col justify-between min-h-[85vh]">
        {/* Top subtle season tag */}
        <div className="pt-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-neutral-300 font-medium">
            <span>{heroBadge}</span>
            <span aria-hidden="true" className="text-neutral-500">·</span>
            <span>{t('heroMadeToOrder')}</span>
          </div>

          {/* Quick theme visual switcher hint */}
          <button
            onClick={() => setIsAdminOpen(true)}
            className="hidden lg:flex items-center gap-1.5 px-3 py-1 text-xs text-neutral-300 hover:text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full transition-colors"
          >
            <SlidersHorizontal className="w-3 h-3 text-amber-300" />
            <span>{t('customizeVisualIdentity')}</span>
          </button>
        </div>

        {/* Main Editorial Text */}
        <div className="max-w-3xl my-auto py-12">
          <h1
            className="text-4xl sm:text-6xl lg:text-7xl font-light tracking-tight leading-[1.08] mb-6 text-white"
            style={{ fontFamily: 'Cormorant Garamond, serif' }}
          >
            {heroTitle}
          </h1>

          <p className="text-base sm:text-lg text-neutral-300 font-light leading-relaxed max-w-xl mb-10">
            {heroSubtitle}
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={onExploreClick}
              className="px-8 py-4 text-xs font-semibold uppercase tracking-widest bg-white text-neutral-950 hover:bg-neutral-200 transition-all duration-200 shadow-lg cursor-pointer"
            >
              {t('heroExploreCta')}
            </button>
            <a
              href="#craft"
              className="px-6 py-4 text-xs font-medium uppercase tracking-widest text-white border border-white/40 hover:border-white hover:bg-white/5 transition-all duration-200 cursor-pointer"
            >
              {t('heroCraftCta')}
            </a>
          </div>
        </div>

        {/* Bottom Season Selector & Scroll indicator */}
        <div className="border-t border-white/15 pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-neutral-400">
            <span className="uppercase tracking-widest text-neutral-300">
              {t('heroActiveCollection')}
            </span>
            <div className="flex items-center gap-1.5">
              {collections.map((col) => (
                <button
                  key={col.id}
                  onClick={() => setActiveCollectionId(col.id)}
                  className={`px-3 py-1 text-xs font-medium rounded transition-colors cursor-pointer ${
                    activeCollection?.id === col.id
                      ? 'bg-white/25 text-white font-semibold'
                      : 'text-neutral-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {getLocalizedCollectionName(col)}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={onExploreClick}
            className="hidden sm:flex items-center gap-2 text-xs uppercase tracking-widest text-neutral-400 hover:text-white transition-colors cursor-pointer"
          >
            <span>{t('heroScrollToPieces')}</span>
            <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
          </button>
        </div>
      </div>
    </section>
  );
};
