import React, { useState } from 'react';
import { X, CheckCircle, CreditCard, ShieldCheck, Truck, Lock, ArrowLeft, Printer } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useStore } from '../context/StoreContext';
import { Order, OrderItem } from '../types/store';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    cartSubtotal,
    clearCart,
    createOrder,
    formatPrice,
    settings,
    setIsAdminOpen,
    language,
    getLocalizedName,
    t
  } = useStore();

  const [step, setStep] = useState<'details' | 'payment' | 'confirmed'>('details');
  const [createdOrder, setCreatedOrder] = useState<Order | null>(null);

  // Form Fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [addressLine1, setAddressLine1] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState(language === 'fr' ? 'France' : 'United States');
  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express'>('standard');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'apple_pay' | 'paypal' | 'cod'>('card');
  const [notes, setNotes] = useState('');

  // Payment mock inputs
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('888');
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isCheckoutOpen) return null;

  const shippingCost = shippingMethod === 'express' ? 35 : cartSubtotal >= settings.freeShippingThreshold ? 0 : 25;
  const taxCost = cartSubtotal * (settings.taxRatePercent / 100);
  const totalCost = cartSubtotal + shippingCost + taxCost;

  const handlePrefillDemo = () => {
    if (language === 'fr') {
      setFullName('Madame Camille Laurent');
      setEmail('c.laurent@paris-studio.fr');
      setPhone('+33 6 42 19 88 01');
      setAddressLine1('14 Rue du Faubourg Saint-Honoré');
      setCity('Paris');
      setPostalCode('75008');
      setCountry('France');
      setNotes('Emballage soigné sous papier de soie et ruban gros-grain atelier.');
    } else {
      setFullName('Madame Sophie de Saint-Germain');
      setEmail('sophie.saintgermain@atelier-vip.com');
      setPhone('+1 (555) 234-8901');
      setAddressLine1('1040 Fifth Avenue, Residence 8A');
      setCity('New York');
      setPostalCode('10028');
      setCountry('United States');
      setNotes('Please pack in bespoke ribboned linen garment box.');
    }
  };

  const handleNextToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !addressLine1 || !city || !postalCode) {
      setErrorMsg(
        language === 'fr'
          ? 'Veuillez renseigner tous les champs obligatoires.'
          : 'Please complete all mandatory delivery fields.'
      );
      return;
    }
    setErrorMsg('');
    setStep('payment');
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setErrorMsg('');

    setTimeout(() => {
      const orderItems: OrderItem[] = cart.map((item) => ({
        productId: item.product.id,
        productName: getLocalizedName(item.product),
        productImage: item.product.images[0],
        size: item.size,
        quantity: item.quantity,
        unitPrice: item.product.price,
        totalPrice: item.product.price * item.quantity
      }));

      const newOrder = createOrder({
        customer: {
          fullName,
          email,
          phone,
          addressLine1,
          city,
          postalCode,
          country
        },
        items: orderItems,
        subtotal: cartSubtotal,
        discount: 0,
        shipping: shippingCost,
        tax: taxCost,
        total: totalCost,
        currency: 'EUR',
        paymentMethod,
        paymentStatus: 'paid',
        orderStatus: 'processing',
        notes
      });

      setCreatedOrder(newOrder);
      setIsProcessing(false);
      setStep('confirmed');
      clearCart();

      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {
        // Safe fallback
      }
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative w-full max-w-4xl bg-[#FAF9F6] border border-black/10 shadow-2xl overflow-hidden my-6">
        {/* Top Header */}
        <div className="p-6 border-b border-black/10 flex items-center justify-between bg-white">
          <div>
            <span className="text-[11px] uppercase tracking-widest text-neutral-400 font-medium block">
              {t('checkoutSub')}
            </span>
            <h2
              className="text-2xl font-normal text-neutral-900 tracking-tight"
              style={{ fontFamily: 'Cormorant Garamond, serif' }}
            >
              {t('checkoutTitle')}
            </h2>
          </div>

          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="p-2 text-neutral-400 hover:text-neutral-900 transition-colors cursor-pointer"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Confirmation State */}
        {step === 'confirmed' && createdOrder ? (
          <div className="p-8 sm:p-12 text-center max-w-2xl mx-auto space-y-6">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs uppercase tracking-widest text-neutral-500 font-semibold block mb-1">
                {t('orderConfirmed', { ref: createdOrder.orderNumber })}
              </span>
              <h3
                className="text-3xl font-normal text-neutral-900 tracking-tight"
                style={{ fontFamily: 'Cormorant Garamond, serif' }}
              >
                {t('orderThankYou', { name: createdOrder.customer.fullName })}
              </h3>
              <p className="text-xs text-neutral-600 font-light mt-2 max-w-md mx-auto">
                {t('orderDispatchedEmail', { email: createdOrder.customer.email })}
              </p>
            </div>

            {/* Receipt Summary Box */}
            <div className="bg-white border border-neutral-200 p-6 text-left space-y-3 text-xs">
              <div className="flex justify-between border-b border-neutral-100 pb-2">
                <span className="text-neutral-500">
                  {language === 'fr' ? 'Adresse de Livraison :' : 'Delivery Address:'}
                </span>
                <span className="text-neutral-900 text-right font-medium">
                  {createdOrder.customer.addressLine1}, {createdOrder.customer.city}
                </span>
              </div>
              <div className="flex justify-between border-b border-neutral-100 pb-2">
                <span className="text-neutral-500">
                  {language === 'fr' ? 'Statut du Paiement :' : 'Payment Status:'}
                </span>
                <span className="text-emerald-700 font-semibold uppercase">
                  {language === 'fr' ? 'Autorisé & Réglé' : 'Authorized & Paid'}
                </span>
              </div>
              <div className="flex justify-between border-b border-neutral-100 pb-2">
                <span className="text-neutral-500">
                  {language === 'fr' ? 'Pièces Commandées :' : 'Items:'}
                </span>
                <span className="text-neutral-900">
                  {createdOrder.items.map((i) => `${i.productName} (${i.size}) x${i.quantity}`).join(', ')}
                </span>
              </div>
              <div className="flex justify-between pt-1 text-sm font-semibold">
                <span>{language === 'fr' ? 'Montant Total Réglé :' : 'Total Amount Charged:'}</span>
                <span className="font-mono tabular-nums text-neutral-900">{formatPrice(createdOrder.total)}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={() => window.print()}
                className="w-full sm:w-auto px-6 py-3 border border-neutral-300 text-neutral-800 text-xs uppercase tracking-wider font-semibold hover:bg-neutral-100 transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>{t('printReceipt')}</span>
              </button>
              <button
                onClick={() => {
                  setIsCheckoutOpen(false);
                  setIsAdminOpen(true);
                }}
                className="w-full sm:w-auto px-6 py-3 bg-neutral-900 text-white text-xs uppercase tracking-wider font-semibold hover:bg-neutral-800 transition-colors cursor-pointer"
              >
                {t('viewInAdmin')}
              </button>
              <button
                onClick={() => setIsCheckoutOpen(false)}
                className="w-full sm:w-auto px-6 py-3 bg-neutral-200 text-neutral-800 text-xs uppercase tracking-wider font-semibold hover:bg-neutral-300 transition-colors cursor-pointer"
              >
                {t('returnToStore')}
              </button>
            </div>
          </div>
        ) : (
          /* Checkout Steps Form */
          <div className="grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-neutral-200">
            {/* Left: Form Fields (7 cols) */}
            <div className="md:col-span-7 p-6 sm:p-8 space-y-6">
              {/* Step indicator */}
              <div className="flex items-center gap-4 text-xs font-semibold uppercase tracking-wider pb-2 border-b border-neutral-200">
                <span className={step === 'details' ? 'text-neutral-900 underline underline-offset-4' : 'text-neutral-400'}>
                  {t('stepDelivery')}
                </span>
                <span className="text-neutral-300">/</span>
                <span className={step === 'payment' ? 'text-neutral-900 underline underline-offset-4' : 'text-neutral-400'}>
                  {t('stepPayment')}
                </span>
              </div>

              {errorMsg && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs">
                  {errorMsg}
                </div>
              )}

              {step === 'details' ? (
                <form onSubmit={handleNextToPayment} className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase font-semibold text-neutral-800">
                      {t('clientContact')}
                    </span>
                    <button
                      type="button"
                      onClick={handlePrefillDemo}
                      className="text-xs text-neutral-600 hover:text-neutral-950 underline underline-offset-2 cursor-pointer font-medium"
                    >
                      {t('prefillDemo')}
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-neutral-500 mb-1">
                        {t('fullName')}
                      </label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Camille Laurent"
                        className="w-full p-2.5 text-xs bg-white border border-neutral-300 focus:outline-none focus:border-neutral-900"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-neutral-500 mb-1">
                        {t('email')}
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="c.laurent@paris-studio.fr"
                        className="w-full p-2.5 text-xs bg-white border border-neutral-300 focus:outline-none focus:border-neutral-900"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-neutral-500 mb-1">
                        {t('phone')}
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+33 6 42 19 88 01"
                        className="w-full p-2.5 text-xs bg-white border border-neutral-300 focus:outline-none focus:border-neutral-900"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-neutral-500 mb-1">
                        {t('country')}
                      </label>
                      <select
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        className="w-full p-2.5 text-xs bg-white border border-neutral-300 focus:outline-none focus:border-neutral-900 cursor-pointer"
                      >
                        <option value="France">France 🇫🇷</option>
                        <option value="Monaco">Monaco 🇲🇨</option>
                        <option value="Belgium">Belgique 🇧🇪</option>
                        <option value="Switzerland">Suisse 🇨🇭</option>
                        <option value="United States">United States 🇺🇸</option>
                        <option value="United Kingdom">United Kingdom 🇬🇧</option>
                        <option value="Italy">Italie 🇮🇹</option>
                        <option value="Canada">Canada 🇨🇦</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-neutral-500 mb-1">
                      {t('address')}
                    </label>
                    <input
                      type="text"
                      required
                      value={addressLine1}
                      onChange={(e) => setAddressLine1(e.target.value)}
                      placeholder="14 Rue du Faubourg Saint-Honoré"
                      className="w-full p-2.5 text-xs bg-white border border-neutral-300 focus:outline-none focus:border-neutral-900"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-neutral-500 mb-1">
                        {t('city')}
                      </label>
                      <input
                        type="text"
                        required
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="Paris / Lyon"
                        className="w-full p-2.5 text-xs bg-white border border-neutral-300 focus:outline-none focus:border-neutral-900"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-neutral-500 mb-1">
                        {t('postalCode')}
                      </label>
                      <input
                        type="text"
                        required
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        placeholder="75008"
                        className="w-full p-2.5 text-xs bg-white border border-neutral-300 focus:outline-none focus:border-neutral-900 font-mono tabular-nums"
                      />
                    </div>
                  </div>

                  {/* Delivery method options */}
                  <div className="pt-2">
                    <label className="block text-[11px] uppercase tracking-wider text-neutral-500 mb-2">
                      {t('deliveryCourier')}
                    </label>
                    <div className="space-y-2">
                      <label
                        className={`flex items-center justify-between p-3 border cursor-pointer text-xs ${
                          shippingMethod === 'standard' ? 'border-neutral-900 bg-white' : 'border-neutral-200 bg-neutral-50'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="shippingMethod"
                            checked={shippingMethod === 'standard'}
                            onChange={() => setShippingMethod('standard')}
                            className="accent-neutral-900"
                          />
                          <div>
                            <span className="font-semibold text-neutral-900">{t('whiteGloveDelivery')}</span>
                            <p className="text-[11px] text-neutral-500">{t('whiteGloveDesc')}</p>
                          </div>
                        </div>
                        <span className="font-mono tabular-nums font-medium">
                          {cartSubtotal >= settings.freeShippingThreshold ? t('complimentary') : formatPrice(25)}
                        </span>
                      </label>

                      <label
                        className={`flex items-center justify-between p-3 border cursor-pointer text-xs ${
                          shippingMethod === 'express' ? 'border-neutral-900 bg-white' : 'border-neutral-200 bg-neutral-50'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="shippingMethod"
                            checked={shippingMethod === 'express'}
                            onChange={() => setShippingMethod('express')}
                            className="accent-neutral-900"
                          />
                          <div>
                            <span className="font-semibold text-neutral-900">{t('expressAirDelivery')}</span>
                            <p className="text-[11px] text-neutral-500">{t('expressAirDesc')}</p>
                          </div>
                        </div>
                        <span className="font-mono tabular-nums font-medium">{formatPrice(35)}</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-neutral-500 mb-1">
                      {t('fittingNotes')}
                    </label>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      rows={2}
                      placeholder={language === 'fr' ? 'Ajustement d’ourlet, emballage rubané, code d’interphone...' : 'Hem adjustment, discreet gift packaging, buzzer code...'}
                      className="w-full p-2 text-xs bg-white border border-neutral-300 focus:outline-none focus:border-neutral-900"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-neutral-900 text-white text-xs uppercase tracking-widest font-semibold hover:bg-neutral-800 transition-colors cursor-pointer"
                  >
                    {t('continueToPayment')}
                  </button>
                </form>
              ) : (
                /* Payment Step */
                <form onSubmit={handlePlaceOrder} className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase font-semibold text-neutral-800">
                      {t('selectPaymentGateway')}
                    </span>
                    <button
                      type="button"
                      onClick={() => setStep('details')}
                      className="flex items-center gap-1 text-xs text-neutral-500 hover:text-neutral-900 cursor-pointer"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>{t('editShipping')}</span>
                    </button>
                  </div>

                  {/* Payment Methods */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('card')}
                      className={`p-3 text-center border text-xs font-medium transition-all cursor-pointer ${
                        paymentMethod === 'card'
                          ? 'border-neutral-900 bg-neutral-900 text-white'
                          : 'border-neutral-300 bg-white text-neutral-700 hover:border-neutral-500'
                      }`}
                    >
                      {t('creditCard')}
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('apple_pay')}
                      className={`p-3 text-center border text-xs font-medium transition-all cursor-pointer ${
                        paymentMethod === 'apple_pay'
                          ? 'border-neutral-900 bg-neutral-900 text-white'
                          : 'border-neutral-300 bg-white text-neutral-700 hover:border-neutral-500'
                      }`}
                    >
                      Apple Pay
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('paypal')}
                      className={`p-3 text-center border text-xs font-medium transition-all cursor-pointer ${
                        paymentMethod === 'paypal'
                          ? 'border-neutral-900 bg-neutral-900 text-white'
                          : 'border-neutral-300 bg-white text-neutral-700 hover:border-neutral-500'
                      }`}
                    >
                      PayPal
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('cod')}
                      className={`p-3 text-center border text-xs font-medium transition-all cursor-pointer ${
                        paymentMethod === 'cod'
                          ? 'border-neutral-900 bg-neutral-900 text-white'
                          : 'border-neutral-300 bg-white text-neutral-700 hover:border-neutral-500'
                      }`}
                    >
                      Virement / COD
                    </button>
                  </div>

                  {/* Card fields */}
                  {paymentMethod === 'card' && (
                    <div className="p-4 bg-white border border-neutral-300 space-y-3">
                      <div className="flex items-center justify-between text-xs text-neutral-500 pb-2 border-b border-neutral-100">
                        <span className="flex items-center gap-1.5">
                          <CreditCard className="w-4 h-4 text-neutral-700" />
                          <span>{t('directCardProcessing')}</span>
                        </span>
                        <Lock className="w-3.5 h-3.5" />
                      </div>

                      <div>
                        <label className="block text-[11px] uppercase tracking-wider text-neutral-500 mb-1">
                          {t('cardNumber')}
                        </label>
                        <input
                          type="text"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          className="w-full p-2 text-xs font-mono tabular-nums border border-neutral-300 focus:outline-none focus:border-neutral-900"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] uppercase tracking-wider text-neutral-500 mb-1">
                            {t('expiry')}
                          </label>
                          <input
                            type="text"
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(e.target.value)}
                            className="w-full p-2 text-xs font-mono tabular-nums border border-neutral-300 focus:outline-none focus:border-neutral-900"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] uppercase tracking-wider text-neutral-500 mb-1">
                            {t('cvc')}
                          </label>
                          <input
                            type="text"
                            value={cardCvc}
                            onChange={(e) => setCardCvc(e.target.value)}
                            className="w-full p-2 text-xs font-mono tabular-nums border border-neutral-300 focus:outline-none focus:border-neutral-900"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'apple_pay' && (
                    <div className="p-4 bg-neutral-100 border border-neutral-300 text-center text-xs text-neutral-700">
                      <p className="font-semibold mb-1">{t('applePayAvailable')}</p>
                      <p className="text-neutral-500">{t('applePayDesc')}</p>
                    </div>
                  )}

                  {paymentMethod === 'paypal' && (
                    <div className="p-4 bg-amber-50/60 border border-amber-200 text-center text-xs text-neutral-700">
                      <p className="font-semibold mb-1">{t('paypalAvailable')}</p>
                      <p className="text-neutral-500">{t('paypalDesc')}</p>
                    </div>
                  )}

                  {paymentMethod === 'cod' && (
                    <div className="p-4 bg-stone-100 border border-stone-200 text-xs text-neutral-700 space-y-1">
                      <p className="font-semibold text-neutral-900">{t('bankWireAvailable')}</p>
                      <p className="text-neutral-500">{t('bankWireDesc')}</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full py-4 bg-neutral-900 text-white text-xs uppercase tracking-widest font-semibold hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg disabled:opacity-50"
                  >
                    {isProcessing ? (
                      <span>{t('authorizingOrder')}</span>
                    ) : (
                      <span>{t('confirmOrder', { total: formatPrice(totalCost) })}</span>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Right: Order Summary (5 cols) */}
            <div className="md:col-span-5 p-6 sm:p-8 bg-[#F4F1EA] flex flex-col justify-between">
              <div>
                <h3
                  className="text-lg font-normal text-neutral-900 mb-4"
                  style={{ fontFamily: 'Cormorant Garamond, serif' }}
                >
                  {t('orderSummary')} ({cart.length})
                </h3>

                <div className="space-y-3 max-h-64 overflow-y-auto pr-1 mb-6">
                  {cart.map((item) => (
                    <div key={`${item.product.id}-${item.size}`} className="flex gap-3 text-xs">
                      <img
                        src={item.product.images[0]}
                        alt={getLocalizedName(item.product)}
                        referrerPolicy="no-referrer"
                        className="w-14 h-16 object-cover bg-white border border-neutral-200"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-neutral-900 line-clamp-1">{getLocalizedName(item.product)}</h4>
                        <p className="text-neutral-500 text-[11px]">Taille : {item.size} · Qté : {item.quantity}</p>
                        <p className="font-mono tabular-nums font-semibold mt-1">
                          {formatPrice(item.product.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-2 text-xs text-neutral-600 border-t border-black/10 pt-4">
                  <div className="flex justify-between">
                    <span>{t('subtotal')}</span>
                    <span className="font-mono tabular-nums text-neutral-900">{formatPrice(cartSubtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t('delivery')}</span>
                    <span className="font-mono tabular-nums text-neutral-900">
                      {shippingCost === 0 ? t('complimentary') : formatPrice(shippingCost)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t('tax')} ({settings.taxRatePercent}%)</span>
                    <span className="font-mono tabular-nums text-neutral-900">{formatPrice(taxCost)}</span>
                  </div>
                  <div className="pt-2 border-t border-black/10 flex justify-between text-base font-semibold text-neutral-900">
                    <span>{t('total')}</span>
                    <span className="font-mono tabular-nums text-lg">{formatPrice(totalCost)}</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-black/10 text-[11px] text-neutral-500 space-y-2">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-neutral-700" />
                  <span>{t('securedBadge')}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-neutral-700" />
                  <span>{t('atelierReturns')}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
