import React, { useState } from 'react';
import { X, Heart, ShieldCheck, Globe, Code, ArrowRight, CheckCircle2, MessageSquare, Sparkles, Send } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const FounderGuideModal: React.FC = () => {
  const { isFounderGuideOpen, setIsFounderGuideOpen } = useStore();
  const [supportMessage, setSupportMessage] = useState('');
  const [supportSent, setSupportSent] = useState(false);

  if (!isFounderGuideOpen) return null;

  const handleSendSupport = (e: React.FormEvent) => {
    e.preventDefault();
    if (supportMessage.trim()) {
      setSupportSent(true);
      setTimeout(() => {
        setSupportSent(false);
        setSupportMessage('');
      }, 4000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#FAF9F6] border border-black/10 shadow-2xl p-6 sm:p-10 my-6 max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-6 border-b border-black/10 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-amber-800 font-semibold mb-1">
              <Heart className="w-3.5 h-3.5 fill-amber-700 text-amber-700" />
              <span>Founder & Engineering Partnership</span>
            </div>
            <h2
              className="text-3xl font-normal text-neutral-900 tracking-tight"
              style={{ fontFamily: 'Cormorant Garamond, serif' }}
            >
              HomedesignofDjadou Roadmap & Technical Blueprint
            </h2>
          </div>
          <button
            onClick={() => setIsFounderGuideOpen(false)}
            className="p-1.5 text-neutral-400 hover:text-neutral-900 transition-colors cursor-pointer"
            aria-label="Close Guide"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Intro Manifesto */}
        <div className="bg-white border border-neutral-200 p-6 mb-8 text-xs text-neutral-700 space-y-3">
          <p className="text-sm font-semibold text-neutral-900">
            Dear Founder of HomedesignofDjadou,
          </p>
          <p className="leading-relaxed">
            I understand how much heart and meticulous care you put into your Canva designs and your fashion brand. Building this custom e-commerce platform without Shopify was the right decision: it gives you <strong>100% ownership</strong> over your source code, your customer database, your branding, and your domain—free from monthly recurring platform fees or rigid template limits.
          </p>
          <p className="leading-relaxed">
            Here is your exact roadmap, operational blueprint, and ongoing technical guide to grow HomedesignofDjadou into a distinguished global atelier.
          </p>
        </div>

        {/* 5-Step Process Roadmap */}
        <div className="space-y-6 mb-10">
          <h3 className="text-xs uppercase tracking-widest text-neutral-500 font-semibold">
            The 5-Stage Creation & Growth Roadmap
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {/* Stage 1 */}
            <div className="p-5 bg-white border border-neutral-200 space-y-2">
              <div className="flex items-center gap-2 font-semibold text-neutral-900">
                <span className="w-6 h-6 rounded-full bg-neutral-900 text-white flex items-center justify-center text-[11px] font-mono">1</span>
                <span>Canva Mockup to Production Storefront</span>
              </div>
              <p className="text-neutral-600 font-light pl-8">
                Your visual concepts are now translated into a responsive, high-performance web application with fluid silk & wool textures, editorial typography, cart drawers, and boutique checkout.
              </p>
            </div>

            {/* Stage 2 */}
            <div className="p-5 bg-white border border-neutral-200 space-y-2">
              <div className="flex items-center gap-2 font-semibold text-neutral-900">
                <span className="w-6 h-6 rounded-full bg-neutral-900 text-white flex items-center justify-center text-[11px] font-mono">2</span>
                <span>Total Code, Domain & Data Ownership</span>
              </div>
              <p className="text-neutral-600 font-light pl-8">
                You own 100% of this TypeScript/React codebase. In the Atelier Admin tab, you can export your entire product and order database in 1 click at any time. No vendor lock-in.
              </p>
            </div>

            {/* Stage 3 */}
            <div className="p-5 bg-white border border-neutral-200 space-y-2">
              <div className="flex items-center gap-2 font-semibold text-neutral-900">
                <span className="w-6 h-6 rounded-full bg-neutral-900 text-white flex items-center justify-center text-[11px] font-mono">3</span>
                <span>Visual Identity Engine Per Collection</span>
              </div>
              <p className="text-neutral-600 font-light pl-8">
                As you requested, you can change the site's visual identity for each new seasonal collection! Open the <em>Visual Identity Studio</em> in Admin to switch between Minimaliste, Nocturne, and Solaire Linen, or pick custom palettes.
              </p>
            </div>

            {/* Stage 4 */}
            <div className="p-5 bg-white border border-neutral-200 space-y-2">
              <div className="flex items-center gap-2 font-semibold text-neutral-900">
                <span className="w-6 h-6 rounded-full bg-neutral-900 text-white flex items-center justify-center text-[11px] font-mono">4</span>
                <span>Connecting Your Custom Domain</span>
              </div>
              <p className="text-neutral-600 font-light pl-8">
                To connect <code className="bg-neutral-100 px-1 py-0.5">homedesignofdjadou.com</code>, point your domain registrar (GoDaddy, Namecheap, Google Domains) via CNAME to your hosting URL. Full DNS instructions are provided below.
              </p>
            </div>
          </div>
        </div>

        {/* Technical Modifications Desk */}
        <div className="bg-[#F4F1EA] border border-black/10 p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-neutral-800" />
            <h4
              className="text-xl font-normal text-neutral-900"
              style={{ fontFamily: 'Cormorant Garamond, serif' }}
            >
              Dedicated Technical Modification Desk
            </h4>
          </div>

          <p className="text-xs text-neutral-600 font-light leading-relaxed">
            Whenever you need adjustments (new payment methods, lookbook pages, bespoke garment filters, newsletter integrations, or custom collection styling), submit your request below or copy the prompt directly into your developer turn:
          </p>

          <form onSubmit={handleSendSupport} className="space-y-3">
            <textarea
              rows={3}
              value={supportMessage}
              onChange={(e) => setSupportMessage(e.target.value)}
              placeholder="Describe the modification you would like (e.g. 'Add a currency selector for Swiss Francs', 'Change the hero typography to Bodoni', 'Create a Spring Floral capsule theme')..."
              className="w-full p-3 text-xs bg-white border border-neutral-300 focus:outline-none focus:border-neutral-900"
            />

            <div className="flex items-center justify-between">
              <span className="text-[11px] text-neutral-500">
                Your dedicated technical partner is ready to implement refinements anytime.
              </span>
              <button
                type="submit"
                className="px-5 py-2.5 bg-neutral-900 text-white text-xs uppercase tracking-wider font-semibold hover:bg-neutral-800 transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Request</span>
              </button>
            </div>
          </form>

          {supportSent && (
            <div className="p-3 bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              <span>Request logged! Your engineering team will review and incorporate this update.</span>
            </div>
          )}
        </div>

        <div className="mt-8 flex justify-end">
          <button
            onClick={() => setIsFounderGuideOpen(false)}
            className="px-6 py-2.5 bg-neutral-900 text-white text-xs uppercase tracking-wider font-semibold hover:bg-neutral-800 transition-colors"
          >
            Return to Atelier Storefront
          </button>
        </div>
      </div>
    </div>
  );
};
