import React from 'react';
import { X, Printer, Download, CheckCircle2 } from 'lucide-react';
import { Order } from '../../types/store';
import { useStore } from '../../context/StoreContext';

interface OrderInvoiceModalProps {
  order: Order | null;
  onClose: () => void;
}

export const OrderInvoiceModal: React.FC<OrderInvoiceModalProps> = ({ order, onClose }) => {
  const { formatPrice } = useStore();

  if (!order) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white border border-black/10 shadow-2xl p-8 sm:p-10 my-6">
        {/* Top actions (hidden when printing) */}
        <div className="no-print flex items-center justify-between pb-6 border-b border-neutral-200 mb-6">
          <span className="text-xs uppercase tracking-widest text-neutral-400 font-semibold">
            Official Atelier Receipt
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="px-4 py-1.5 text-xs font-semibold bg-neutral-900 text-white hover:bg-neutral-800 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Invoice</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-neutral-400 hover:text-neutral-900 transition-colors cursor-pointer"
              aria-label="Close invoice"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Invoice Header */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-4 pb-8 border-b border-neutral-200">
          <div>
            <h1
              className="text-2xl font-normal text-neutral-900 tracking-wide"
              style={{ fontFamily: 'Cormorant Garamond, serif' }}
            >
              HOMEDESIGN OF DJADOU
            </h1>
            <p className="text-xs text-neutral-500 font-light mt-1">
              Bespoke Apparel & Haute Couture Wardrobe<br />
              14 Rue du Faubourg Saint-Honoré, Paris<br />
              concierge@homedesignofdjadou.com
            </p>
          </div>
          <div className="text-left sm:text-right text-xs">
            <div className="text-sm font-semibold text-neutral-900 font-mono">
              INVOICE #{order.orderNumber}
            </div>
            <p className="text-neutral-500 font-mono tabular-nums mt-0.5">
              Date: {new Date(order.createdAt).toLocaleDateString()}
            </p>
            <p className="text-emerald-700 font-semibold uppercase text-[11px] mt-1 flex items-center sm:justify-end gap-1">
              <CheckCircle2 className="w-3 h-3" />
              <span>Paid in Full ({order.paymentMethod.replace('_', ' ')})</span>
            </p>
          </div>
        </div>

        {/* Client & Shipping info */}
        <div className="grid grid-cols-2 gap-8 py-6 border-b border-neutral-200 text-xs">
          <div>
            <span className="text-neutral-400 uppercase tracking-wider font-semibold block mb-1">
              Billed To:
            </span>
            <p className="font-semibold text-neutral-900">{order.customer.fullName}</p>
            <p className="text-neutral-600 font-light">{order.customer.email}</p>
            <p className="text-neutral-600 font-light">{order.customer.phone}</p>
          </div>
          <div>
            <span className="text-neutral-400 uppercase tracking-wider font-semibold block mb-1">
              Shipped To:
            </span>
            <p className="text-neutral-900 font-medium">{order.customer.addressLine1}</p>
            <p className="text-neutral-600 font-light">
              {order.customer.city}, {order.customer.postalCode}
            </p>
            <p className="text-neutral-600 font-light">{order.customer.country}</p>
          </div>
        </div>

        {/* Line Items Table */}
        <div className="py-6 border-b border-neutral-200">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-neutral-200 text-neutral-400 uppercase tracking-wider">
                <th className="pb-2 font-medium">Garment Description</th>
                <th className="pb-2 font-medium text-center">Size</th>
                <th className="pb-2 font-medium text-center">Qty</th>
                <th className="pb-2 font-medium text-right">Price</th>
                <th className="pb-2 font-medium text-right">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 text-neutral-800">
              {order.items.map((item, idx) => (
                <tr key={idx} className="py-3">
                  <td className="py-2.5 font-medium text-neutral-900">{item.productName}</td>
                  <td className="py-2.5 text-center font-mono">{item.size}</td>
                  <td className="py-2.5 text-center font-mono tabular-nums">{item.quantity}</td>
                  <td className="py-2.5 text-right font-mono tabular-nums">{formatPrice(item.unitPrice)}</td>
                  <td className="py-2.5 text-right font-mono tabular-nums font-semibold">
                    {formatPrice(item.totalPrice)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totals */}
        <div className="pt-4 flex justify-end text-xs">
          <div className="w-64 space-y-2 text-neutral-600">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-mono tabular-nums text-neutral-900">{formatPrice(order.subtotal)}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-emerald-700">
                <span>VIP Courtesy Discount</span>
                <span className="font-mono tabular-nums">-{formatPrice(order.discount)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Atelier Shipping</span>
              <span className="font-mono tabular-nums text-neutral-900">
                {order.shipping === 0 ? 'Complimentary' : formatPrice(order.shipping)}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Tax</span>
              <span className="font-mono tabular-nums text-neutral-900">{formatPrice(order.tax)}</span>
            </div>
            <div className="pt-2 border-t border-neutral-300 flex justify-between text-sm font-semibold text-neutral-900">
              <span>Total Paid</span>
              <span className="font-mono tabular-nums text-base">{formatPrice(order.total)}</span>
            </div>
          </div>
        </div>

        {/* Order Notes / Tailoring instructions if present */}
        {order.notes && (
          <div className="mt-6 p-3 bg-neutral-50 border border-neutral-200 text-xs text-neutral-600">
            <span className="font-semibold text-neutral-900 block mb-0.5">Atelier Fitting / Delivery Notes:</span>
            <p className="italic">{order.notes}</p>
          </div>
        )}

        <div className="mt-8 pt-6 border-t border-neutral-200 text-center text-[11px] text-neutral-400">
          Thank you for trusting HomedesignofDjadou. Every piece is crafted with pride and permanent sovereignty.
        </div>
      </div>
    </div>
  );
};
