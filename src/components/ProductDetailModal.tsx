import React, { useState } from 'react';
import { X, Check, ShieldCheck, Truck, RefreshCw, Ruler } from 'lucide-react';
import { Size } from '../types/store';
import { useStore } from '../context/StoreContext';

export const ProductDetailModal: React.FC = () => {
  const {
    selectedProduct,
    setSelectedProduct,
    formatPrice,
    addToCart,
    setIsSizeGuideOpen,
    setIsCheckoutOpen,
    getLocalizedName,
    getLocalizedTagline,
    getLocalizedDescription,
    getLocalizedComposition,
    getLocalizedDetails,
    t
  } = useStore();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<Size>('M');
  const [quantity, setQuantity] = useState(1);
  const [addedNotice, setAddedNotice] = useState(false);

  if (!selectedProduct) return null;

  const productName = getLocalizedName(selectedProduct);
  const productTagline = getLocalizedTagline(selectedProduct);
  const productDescription = getLocalizedDescription(selectedProduct);
  const productComposition = getLocalizedComposition(selectedProduct);
  const productDetails = getLocalizedDetails(selectedProduct);

  const handleAddToCart = () => {
    addToCart(selectedProduct, selectedSize, quantity);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(selectedProduct, selectedSize, quantity);
    setSelectedProduct(null);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-[#FAF9F6] border border-black/10 shadow-2xl my-auto overflow-hidden">
        {/* Close Button */}
        <button
          onClick={() => setSelectedProduct(null)}
          className="absolute top-4 right-4 z-10 p-2 text-neutral-500 hover:text-neutral-900 bg-white/80 backdrop-blur-sm border border-black/5 rounded-full transition-colors cursor-pointer"
          aria-label="Fermer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 max-h-[90vh] overflow-y-auto">
          {/* Gallery Column */}
          <div className="p-6 sm:p-8 bg-[#F4F1EA] flex flex-col justify-between">
            <div className="aspect-[3/4] w-full overflow-hidden bg-white/40 border border-black/5 relative">
              <img
                src={selectedProduct.images[activeImageIndex] || selectedProduct.images[0]}
                alt={productName}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute bottom-3 left-3 text-[11px] font-medium tracking-wider uppercase text-neutral-700 bg-white/90 px-2 py-0.5 border border-black/5">
                {selectedProduct.inStock
                  ? `${t('inAtelier')} (${selectedProduct.stock} ex.)`
                  : t('madeToOrder')}
              </div>
            </div>

            {/* Thumbnail switcher if multiple images */}
            {selectedProduct.images.length > 1 && (
              <div className="flex items-center gap-2 mt-4">
                {selectedProduct.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-14 h-16 border overflow-hidden transition-all ${
                      activeImageIndex === idx ? 'border-neutral-900 ring-1 ring-neutral-900' : 'border-neutral-300 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="Aperçu" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Contiguous Purchase Module */}
          <div className="p-6 sm:p-10 flex flex-col justify-between">
            <div>
              {/* Category & Collection Tagline */}
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-neutral-500 font-medium mb-2">
                <span>{selectedProduct.category}</span>
                <span aria-hidden="true">·</span>
                <span>Atelier Paris</span>
              </div>

              {/* Product Title */}
              <h1
                className="text-2xl sm:text-3xl font-normal text-neutral-900 tracking-tight mb-2"
                style={{ fontFamily: 'Cormorant Garamond, serif' }}
              >
                {productName}
              </h1>

              <p className="text-xs text-neutral-500 font-light mb-4 italic">
                {productTagline}
              </p>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-6 pb-6 border-b border-black/10">
                <span className="text-2xl font-semibold tracking-tight text-neutral-900 font-mono tabular-nums">
                  {formatPrice(selectedProduct.price)}
                </span>
                {selectedProduct.originalPrice && selectedProduct.originalPrice > selectedProduct.price && (
                  <span className="text-sm text-neutral-400 line-through font-mono tabular-nums">
                    {formatPrice(selectedProduct.originalPrice)}
                  </span>
                )}
                <span className="text-[11px] text-neutral-500">{t('taxesIncluded')}</span>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-neutral-700 font-light leading-relaxed mb-6">
                {productDescription}
              </p>

              {/* Size Selection */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs uppercase tracking-wider font-semibold text-neutral-900">
                    {t('selectSize')}
                  </span>
                  <button
                    onClick={() => setIsSizeGuideOpen(true)}
                    className="flex items-center gap-1 text-xs text-neutral-600 hover:text-neutral-900 underline underline-offset-2 cursor-pointer"
                  >
                    <Ruler className="w-3.5 h-3.5" />
                    <span>{t('sizeGuide')}</span>
                  </button>
                </div>

                <div className="grid grid-cols-5 gap-2">
                  {selectedProduct.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-2 text-xs font-medium uppercase tracking-wider border transition-all cursor-pointer ${
                        selectedSize === size
                          ? 'border-neutral-900 bg-neutral-900 text-white shadow-xs'
                          : 'border-neutral-300 text-neutral-700 hover:border-neutral-600 bg-white'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-xs uppercase tracking-wider font-semibold text-neutral-900">
                  {t('quantity')}
                </span>
                <div className="flex items-center border border-neutral-300 bg-white">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-8 h-8 flex items-center justify-center text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 transition-colors"
                  >
                    -
                  </button>
                  <span className="w-10 text-center text-xs font-mono tabular-nums font-semibold">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(selectedProduct.stock || 10, q + 1))}
                    className="w-8 h-8 flex items-center justify-center text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Buy Actions */}
              <div className="space-y-2 mb-6">
                <button
                  onClick={handleAddToCart}
                  disabled={!selectedProduct.inStock}
                  className={`w-full py-3.5 px-6 text-xs uppercase tracking-widest font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    !selectedProduct.inStock
                      ? 'bg-neutral-300 text-neutral-500 cursor-not-allowed'
                      : addedNotice
                      ? 'bg-emerald-800 text-white'
                      : 'bg-neutral-900 hover:bg-neutral-800 text-white'
                  }`}
                >
                  {addedNotice ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>{t('addedToBag')}</span>
                    </>
                  ) : (
                    <span>{t('addToBag')} — {formatPrice(selectedProduct.price * quantity)}</span>
                  )}
                </button>

                <button
                  onClick={handleBuyNow}
                  disabled={!selectedProduct.inStock}
                  className="w-full py-3 px-6 text-xs uppercase tracking-widest font-medium border border-neutral-900 text-neutral-900 hover:bg-neutral-900 hover:text-white transition-colors cursor-pointer"
                >
                  {t('instantCheckout')}
                </button>
              </div>

              {/* Composition & Craft details */}
              <div className="pt-4 border-t border-black/10 space-y-3 text-xs text-neutral-600 font-light">
                <div>
                  <span className="font-semibold text-neutral-900">Composition : </span>
                  <span>{productComposition}</span>
                </div>

                <div>
                  <span className="font-semibold text-neutral-900 block mb-1">Détails d'Atelier :</span>
                  <ul className="list-disc pl-4 space-y-1">
                    {productDetails.map((d, i) => (
                      <li key={i}>{d}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Trust Markers */}
            <div className="grid grid-cols-3 gap-2 pt-6 border-t border-black/10 text-center text-[10px] text-neutral-500 font-medium">
              <div className="flex flex-col items-center gap-1">
                <Truck className="w-4 h-4 text-neutral-700" />
                <span>{t('expressCourier')}</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-neutral-700" />
                <span>{t('fullOwnership')}</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <RefreshCw className="w-4 h-4 text-neutral-700" />
                <span>{t('atelierReturns')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
