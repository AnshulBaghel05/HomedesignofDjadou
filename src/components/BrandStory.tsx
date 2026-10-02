import React from 'react';
import { Scissors, Feather } from 'lucide-react';
import { TRENCH_IMAGE, BLOUSE_IMAGE, KNIT_IMAGE, TROUSERS_IMAGE } from '../data/initialData';
import { useStore } from '../context/StoreContext';

export const BrandStory: React.FC = () => {
  const { t, language } = useStore();

  return (
    <div id="craft" className="bg-[#FAF9F6] border-t border-black/10">
      {/* Brand Narrative Section */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-neutral-500 font-medium">
              <span>{t('manifestoKicker')}</span>
            </div>

            <h2
              className="text-3xl sm:text-5xl font-normal text-neutral-900 leading-tight"
              style={{ fontFamily: 'Cormorant Garamond, serif' }}
            >
              {t('storyTitle')}
            </h2>

            <p className="text-sm sm:text-base text-neutral-600 font-light leading-relaxed">
              {t('storyP1')}
            </p>

            <p className="text-sm sm:text-base text-neutral-600 font-light leading-relaxed">
              {t('storyP2')}
            </p>

            {/* Proof Points */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-black/10">
              <div>
                <span className="block text-2xl font-normal text-neutral-900 font-mono tabular-nums">100%</span>
                <span className="text-[11px] uppercase tracking-wider text-neutral-500 font-medium">
                  {t('statFibers')}
                </span>
              </div>
              <div>
                <span className="block text-2xl font-normal text-neutral-900 font-mono tabular-nums">≤ 40</span>
                <span className="text-[11px] uppercase tracking-wider text-neutral-500 font-medium">
                  {t('statRuns')}
                </span>
              </div>
              <div>
                <span className="block text-2xl font-normal text-neutral-900 font-mono tabular-nums">0%</span>
                <span className="text-[11px] uppercase tracking-wider text-neutral-500 font-medium">
                  {t('statWaste')}
                </span>
              </div>
            </div>
          </div>

          {/* Right Image Composition */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="aspect-[3/4] overflow-hidden bg-neutral-200 border border-black/5">
                <img
                  src={TRENCH_IMAGE}
                  alt="Manteau Trench Tailleur"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 bg-white border border-neutral-200">
                <Scissors className="w-4 h-4 text-neutral-700 mb-2" />
                <h4 className="text-xs font-semibold text-neutral-900 mb-1">{t('archDrafting')}</h4>
                <p className="text-[11px] text-neutral-500 font-light">
                  {t('archDraftingDesc')}
                </p>
              </div>
            </div>

            <div className="space-y-4 pt-8">
              <div className="p-4 bg-white border border-neutral-200">
                <Feather className="w-4 h-4 text-neutral-700 mb-2" />
                <h4 className="text-xs font-semibold text-neutral-900 mb-1">{t('sensoryTextiles')}</h4>
                <p className="text-[11px] text-neutral-500 font-light">
                  {t('sensoryTextilesDesc')}
                </p>
              </div>
              <div className="aspect-[3/4] overflow-hidden bg-neutral-200 border border-black/5">
                <img
                  src={BLOUSE_IMAGE}
                  alt="Blouse Soie Drapée"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lookbook Gallery Strip */}
      <section id="lookbook" className="py-20 bg-[#F4F1EA] border-y border-black/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4 border-b border-black/10">
            <div>
              <span className="text-xs uppercase tracking-widest text-neutral-500 font-medium block mb-1">
                {t('lookbookKicker')}
              </span>
              <h3
                className="text-2xl sm:text-3xl font-normal text-neutral-900 tracking-tight"
                style={{ fontFamily: 'Cormorant Garamond, serif' }}
              >
                {t('lookbookTitle')}
              </h3>
            </div>
            <p className="text-xs text-neutral-600 font-light max-w-sm mt-2 sm:mt-0">
              {t('lookbookDesc')}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="group relative aspect-[3/4] overflow-hidden bg-white border border-black/5">
              <img
                src={TRENCH_IMAGE}
                alt="Look 01"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/70 to-transparent text-white text-xs">
                <span className="block font-medium">
                  {language === 'fr' ? 'Silhouette 01 : Le Trench Structuré' : 'Look 01: The Structured Trench'}
                </span>
                <span className="text-[10px] text-neutral-300">
                  {language === 'fr' ? 'Laine Vierge de Chameau' : 'Virgin Camel Wool'}
                </span>
              </div>
            </div>

            <div className="group relative aspect-[3/4] overflow-hidden bg-white border border-black/5">
              <img
                src={BLOUSE_IMAGE}
                alt="Look 02"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/70 to-transparent text-white text-xs">
                <span className="block font-medium">
                  {language === 'fr' ? 'Silhouette 02 : Blouse Bénitier Aura' : 'Look 02: Aura Cowl Blouse'}
                </span>
                <span className="text-[10px] text-neutral-300">
                  {language === 'fr' ? 'Pure Soie Lavée au Sable' : 'Sandwashed Silk'}
                </span>
              </div>
            </div>

            <div className="group relative aspect-[3/4] overflow-hidden bg-white border border-black/5">
              <img
                src={TROUSERS_IMAGE}
                alt="Look 03"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/70 to-transparent text-white text-xs">
                <span className="block font-medium">
                  {language === 'fr' ? 'Silhouette 03 : Palazzo Tailleur' : 'Look 03: Sartorial Palazzo'}
                </span>
                <span className="text-[10px] text-neutral-300">
                  {language === 'fr' ? 'Sergé de Laine Double Pli' : 'Double-Pleated Serge'}
                </span>
              </div>
            </div>

            <div className="group relative aspect-[3/4] overflow-hidden bg-white border border-black/5">
              <img
                src={KNIT_IMAGE}
                alt="Look 04"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/70 to-transparent text-white text-xs">
                <span className="block font-medium">
                  {language === 'fr' ? 'Silhouette 04 : Col Roulé Cachemire' : 'Look 04: Cashmere Turtleneck'}
                </span>
                <span className="text-[10px] text-neutral-300">
                  {language === 'fr' ? 'Côtes Jauge 7 Mongol' : '7-Gauge Mongolian Rib'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Attributable Client Testimonial */}
      <section className="py-20 max-w-4xl mx-auto px-6 text-center">
        <blockquote
          className="text-2xl sm:text-3xl font-light text-neutral-900 leading-snug mb-6"
          style={{ fontFamily: 'Cormorant Garamond, serif' }}
        >
          {t('testimonialQuote')}
        </blockquote>
        <div className="text-xs uppercase tracking-widest text-neutral-500 font-medium">
          <span>{t('testimonialAuthor')}</span>
        </div>
      </section>
    </div>
  );
};
