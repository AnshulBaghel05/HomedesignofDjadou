import React from 'react';
import { X, Ruler } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const SizeGuideModal: React.FC = () => {
  const { isSizeGuideOpen, setIsSizeGuideOpen, t, language } = useStore();

  if (!isSizeGuideOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="relative w-full max-w-2xl bg-[#FAF9F6] border border-black/10 shadow-2xl p-6 sm:p-8 overflow-y-auto max-h-[90vh]">
        <div className="flex items-center justify-between pb-4 border-b border-black/10 mb-6">
          <div className="flex items-center gap-2">
            <Ruler className="w-5 h-5 text-neutral-700" />
            <h3
              className="text-2xl font-normal text-neutral-900 tracking-tight"
              style={{ fontFamily: 'Cormorant Garamond, serif' }}
            >
              {t('sizeGuideTitle')}
            </h3>
          </div>
          <button
            onClick={() => setIsSizeGuideOpen(false)}
            className="p-1.5 text-neutral-400 hover:text-neutral-900 transition-colors cursor-pointer"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-neutral-600 font-light mb-6 leading-relaxed">
          {t('sizeGuideDesc')}
        </p>

        {/* Measurement Table */}
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-neutral-300 text-neutral-500 uppercase tracking-wider font-medium">
                <th className="py-2.5 px-3">{language === 'fr' ? 'Taille' : 'Size'}</th>
                <th className="py-2.5 px-3">{language === 'fr' ? 'Tour de Poitrine' : 'Bust (cm / in)'}</th>
                <th className="py-2.5 px-3">{language === 'fr' ? 'Tour de Taille' : 'Waist (cm / in)'}</th>
                <th className="py-2.5 px-3">{language === 'fr' ? 'Tour de Bassin' : 'Hips (cm / in)'}</th>
                <th className="py-2.5 px-3">FR / EU / US</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200 font-mono text-neutral-800 tabular-nums">
              <tr>
                <td className="py-2.5 px-3 font-semibold font-sans">XS</td>
                <td className="py-2.5 px-3">80-84 cm / 31-33"</td>
                <td className="py-2.5 px-3">60-64 cm / 24-25"</td>
                <td className="py-2.5 px-3">86-90 cm / 34-35"</td>
                <td className="py-2.5 px-3 font-sans">34 / 2</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-semibold font-sans">S</td>
                <td className="py-2.5 px-3">85-89 cm / 33-35"</td>
                <td className="py-2.5 px-3">65-69 cm / 26-27"</td>
                <td className="py-2.5 px-3">91-95 cm / 36-37"</td>
                <td className="py-2.5 px-3 font-sans">36 / 4</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-semibold font-sans">M</td>
                <td className="py-2.5 px-3">90-94 cm / 35-37"</td>
                <td className="py-2.5 px-3">70-74 cm / 28-29"</td>
                <td className="py-2.5 px-3">96-100 cm / 38-39"</td>
                <td className="py-2.5 px-3 font-sans">38 / 6</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-semibold font-sans">L</td>
                <td className="py-2.5 px-3">95-100 cm / 37-39"</td>
                <td className="py-2.5 px-3">75-80 cm / 30-31"</td>
                <td className="py-2.5 px-3">101-106 cm / 40-42"</td>
                <td className="py-2.5 px-3 font-sans">40 / 8</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-semibold font-sans">XL</td>
                <td className="py-2.5 px-3">101-107 cm / 40-42"</td>
                <td className="py-2.5 px-3">81-87 cm / 32-34"</td>
                <td className="py-2.5 px-3">107-113 cm / 42-44"</td>
                <td className="py-2.5 px-3 font-sans">42 / 10</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="bg-white p-4 border border-neutral-200 text-xs text-neutral-600 space-y-2">
          <p className="font-semibold text-neutral-900">
            {language === 'fr' ? 'Service Sur-Mesure Atelier :' : 'Bespoke Atelier Tailoring Service:'}
          </p>
          <p>{t('customFittingNote')}</p>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={() => setIsSizeGuideOpen(false)}
            className="px-6 py-2.5 bg-neutral-900 text-white text-xs uppercase tracking-wider font-semibold hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            {t('closeGuide')}
          </button>
        </div>
      </div>
    </div>
  );
};
