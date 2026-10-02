import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, Tag, ShieldCheck } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    removeFromCart,
    updateCartQuantity,
    cartSubtotal,
    formatPrice,
    settings,
    setIsCheckoutOpen,
    getLocalizedName,
    t
  } = useStore();

  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState('');

  if (!isCartOpen) return null;

  const freeShippingThreshold = settings.freeShippingThreshold;
  const progressPercent = Math.min(100, Math.round((cartSubtotal / freeShippingThreshold) * 100));
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);

  const discountAmount = promoApplied ? cartSubtotal * 0.1 : 0;
  const shippingFee = cartSubtotal >= freeShippingThreshold || cartSubtotal === 0 ? 0 : 25;
  const estimatedTax = (cartSubtotal - discountAmount) * (settings.taxRatePercent / 100);
  const finalTotal = Math.max(0, cartSubtotal - discountAmount + shippingFee + estimatedTax);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'DJADOU10') {
      setPromoApplied(true);
      setPromoError('');
    } else {
      setPromoError(t('invalidPromo'));
    }
  };

  const handleProceedCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF9F6] border-l border-black/10 shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-6 border-b border-black/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-neutral-800" />
              <h2
                className="text-xl font-normal text-neutral-900 tracking-tight"
                style={{ fontFamily: 'Cormorant Garamond, serif' }}
              >
                {t('cartTitle')} ({cart.length})
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-neutral-400 hover:text-neutral-900 transition-colors cursor-pointer"
              aria-label="Fermer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free shipping progress */}
          <div className="px-6 py-3 bg-[#F4F1EA] border-b border-black/5 text-xs text-neutral-700">
            {remainingForFreeShipping > 0 ? (
              <p className="font-light">
                {t('freeShippingNotice', { x: formatPrice(remainingForFreeShipping) })}
              </p>
            ) : (
              <p className="font-semibold text-neutral-900 flex items-center gap-1.5">
                <span>{t('freeShippingUnlocked')}</span>
              </p>
            )}
            <div className="w-full bg-neutral-200 h-1 mt-2 overflow-hidden">
              <div
                className="bg-neutral-900 h-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16 text-neutral-400">
                <ShoppingBag className="w-12 h-12 stroke-[1] mb-3 text-neutral-300" />
                <p className="text-base text-neutral-700 font-light mb-1">{t('emptyBag')}</p>
                <p className="text-xs text-neutral-500 mb-6">{t('emptyBagSub')}</p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-6 py-2.5 bg-neutral-900 text-white text-xs uppercase tracking-wider font-semibold hover:bg-neutral-800 transition-colors cursor-pointer"
                >
                  {t('discoverPieces')}
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={`${item.product.id}-${item.size}`}
                  className="flex gap-4 p-3 bg-white border border-neutral-200"
                >
                  <img
                    src={item.product.images[0]}
                    alt={getLocalizedName(item.product)}
                    referrerPolicy="no-referrer"
                    className="w-20 h-24 object-cover bg-neutral-100 flex-shrink-0"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between">
                        <h4 className="text-xs font-semibold text-neutral-900 line-clamp-1">
                          {getLocalizedName(item.product)}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.product.id, item.size)}
                          className="text-neutral-400 hover:text-red-600 transition-colors p-1 cursor-pointer"
                          aria-label="Supprimer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="flex items-center gap-2 text-[11px] text-neutral-500 mt-0.5">
                        <span>Taille : <strong className="text-neutral-800">{item.size}</strong></span>
                        <span>·</span>
                        <span>{item.product.category}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      {/* Quantity stepper */}
                      <div className="flex items-center border border-neutral-200">
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.size, item.quantity - 1)}
                          className="w-6 h-6 flex items-center justify-center text-xs text-neutral-600 hover:bg-neutral-100 cursor-pointer"
                        >
                          -
                        </button>
                        <span className="w-7 text-center text-xs font-mono tabular-nums font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.size, item.quantity + 1)}
                          className="w-6 h-6 flex items-center justify-center text-xs text-neutral-600 hover:bg-neutral-100 cursor-pointer"
                        >
                          +
                        </button>
                      </div>

                      <span className="text-xs font-semibold font-mono tabular-nums text-neutral-900">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout button */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-black/10 bg-white space-y-4">
              {/* Promo Code Box */}
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                  <input
                    type="text"
                    placeholder={t('promoPlaceholder')}
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    disabled={promoApplied}
                    className="w-full pl-8 pr-3 py-2 text-xs border border-neutral-300 focus:outline-none focus:border-neutral-900 uppercase disabled:bg-neutral-100"
                  />
                </div>
                <button
                  type="submit"
                  disabled={promoApplied || !promoCode}
                  className="px-3 py-2 text-xs uppercase tracking-wider font-semibold border border-neutral-900 bg-neutral-900 text-white disabled:opacity-40 cursor-pointer"
                >
                  {promoApplied ? 'Actif' : t('applyPromo')}
                </button>
              </form>
              {promoError && <p className="text-[11px] text-red-600">{promoError}</p>}
              {promoApplied && <p className="text-[11px] text-emerald-700">{t('promoApplied')}</p>}

              {/* Calculations */}
              <div className="space-y-1.5 text-xs text-neutral-600">
                <div className="flex justify-between">
                  <span>{t('subtotal')}</span>
                  <span className="font-mono tabular-nums text-neutral-900">{formatPrice(cartSubtotal)}</span>
                </div>
                {promoApplied && (
                  <div className="flex justify-between text-emerald-700">
                    <span>{t('discount')} (10%)</span>
                    <span className="font-mono tabular-nums">-{formatPrice(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>{t('delivery')}</span>
                  <span className="font-mono tabular-nums text-neutral-900">
                    {shippingFee === 0 ? t('complimentary') : formatPrice(shippingFee)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>{t('tax')} ({settings.taxRatePercent}%)</span>
                  <span className="font-mono tabular-nums text-neutral-900">{formatPrice(estimatedTax)}</span>
                </div>
                <div className="pt-2 border-t border-neutral-200 flex justify-between text-sm font-semibold text-neutral-900">
                  <span>{t('total')}</span>
                  <span className="font-mono tabular-nums text-base">{formatPrice(finalTotal)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleProceedCheckout}
                className="w-full py-4 px-6 bg-neutral-900 text-white text-xs uppercase tracking-widest font-semibold hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg"
              >
                <span>{t('proceedCheckout')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-neutral-500">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{t('securedBadge')}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
