import React, { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from './ProductCard';

export const ProductGrid: React.FC = () => {
  const {
    products,
    activeCollection,
    setSelectedProduct,
    language,
    getLocalizedName,
    getLocalizedDescription,
    getLocalizedCollectionName,
    getLocalizedCollectionDescription,
    t
  } = useStore();

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'newest'>('featured');

  const categories = useMemo(() => {
    const list = Array.from(new Set(products.map((p) => p.category)));
    return ['All', ...list];
  }, [products]);

  const getCategoryLabel = (cat: string) => {
    if (cat === 'All') return t('allCategories');
    if (language === 'fr') {
      switch (cat) {
        case 'Outerwear': return 'Manteaux & Vestes';
        case 'Blouses & Tops': return 'Blouses & Soie';
        case 'Trousers': return 'Pantalons Tailleur';
        case 'Knitwear': return 'Mailles & Cachemire';
        case 'Dresses': return 'Robes';
        case 'Accessories': return 'Accessoires';
        default: return cat;
      }
    }
    return cat;
  };

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
        const localizedName = getLocalizedName(p).toLowerCase();
        const localizedDesc = getLocalizedDescription(p).toLowerCase();
        const query = searchQuery.toLowerCase();
        const matchesSearch =
          p.name.toLowerCase().includes(query) ||
          localizedName.includes(query) ||
          p.description.toLowerCase().includes(query) ||
          localizedDesc.includes(query);
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      });
  }, [products, selectedCategory, searchQuery, sortBy, language]);

  return (
    <section id="featured" className="py-20 max-w-7xl mx-auto px-6">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-black/10 gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-neutral-500 font-medium mb-2">
            <span>{t('catalogKicker')}</span>
            <span aria-hidden="true">·</span>
            <span>{t('catalogSeason')}</span>
          </div>
          <h2
            className="text-3xl sm:text-4xl font-normal text-neutral-900 tracking-tight"
            style={{ fontFamily: 'Cormorant Garamond, serif' }}
          >
            {activeCollection ? getLocalizedCollectionName(activeCollection) : t('navPieces')}
          </h2>
          <p className="text-sm text-neutral-600 font-light mt-1 max-w-xl">
            {activeCollection
              ? getLocalizedCollectionDescription(activeCollection)
              : 'Confection artisanale dans des matières nobles et silhouettes intemporelles.'}
          </p>
        </div>

        {/* Search & Sort Controls */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              placeholder={t('searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-3 py-2 text-xs bg-white border border-neutral-300 focus:outline-none focus:border-neutral-900 w-48 sm:w-56 text-neutral-800 placeholder:text-neutral-400"
            />
          </div>

          <div className="flex items-center gap-1.5 text-xs text-neutral-600 bg-white border border-neutral-300 px-3 py-2">
            <span className="text-neutral-400">{t('sortBy')}</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent focus:outline-none font-medium cursor-pointer"
            >
              <option value="featured">{t('sortFeatured')}</option>
              <option value="price-asc">{t('sortPriceAsc')}</option>
              <option value="price-desc">{t('sortPriceDesc')}</option>
              <option value="newest">{t('sortNewest')}</option>
            </select>
          </div>
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 text-xs uppercase tracking-wider font-medium whitespace-nowrap transition-colors border cursor-pointer ${
              selectedCategory === cat
                ? 'bg-neutral-900 text-white border-neutral-900'
                : 'bg-white text-neutral-600 border-neutral-200 hover:border-neutral-400'
            }`}
          >
            {getCategoryLabel(cat)}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={(p) => setSelectedProduct(p)}
            />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center border border-dashed border-neutral-300 bg-white/50">
          <p className="text-base text-neutral-600 font-light mb-2">{t('noPiecesFound')}</p>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSearchQuery('');
            }}
            className="text-xs font-semibold uppercase tracking-wider text-neutral-900 underline underline-offset-4 hover:opacity-75 cursor-pointer"
          >
            {t('resetFilters')}
          </button>
        </div>
      )}
    </section>
  );
};
