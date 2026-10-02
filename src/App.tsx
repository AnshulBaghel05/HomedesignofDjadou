/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef } from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductGrid } from './components/ProductGrid';
import { BrandStory } from './components/BrandStory';
import { Footer } from './components/Footer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { SizeGuideModal } from './components/SizeGuideModal';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { FounderGuideModal } from './components/FounderGuideModal';

const StorefrontContent: React.FC = () => {
  const { currentTheme } = useStore();

  const handleExploreClick = () => {
    const el = document.getElementById('featured');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavigateSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      className="min-h-screen transition-colors duration-500 flex flex-col justify-between"
      style={{
        backgroundColor: currentTheme.backgroundColor,
        color: currentTheme.primaryColor
      }}
    >
      <div>
        {/* Top Bar Contract (3 Zones) */}
        <Navbar onNavigateSection={handleNavigateSection} />

        {/* Editorial Hero Banner */}
        <Hero onExploreClick={handleExploreClick} />

        {/* Curated Product Catalog Grid */}
        <ProductGrid />

        {/* Brand Narrative, Lookbook & Social Proof */}
        <BrandStory />
      </div>

      {/* Luxury Footer */}
      <Footer />

      {/* Global Interactive Overlays */}
      <ProductDetailModal />
      <CartDrawer />
      <CheckoutModal />
      <SizeGuideModal />
      <AdminDashboard />
      <FounderGuideModal />
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <StorefrontContent />
    </StoreProvider>
  );
}
