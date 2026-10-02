import React, { useState } from 'react';
import { Eye, Plus, Check } from 'lucide-react';
import { Product, Size } from '../types/store';
import { useStore } from '../context/StoreContext';

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
  const {
    formatPrice,
    addToCart,
    getLocalizedName,
    getLocalizedComposition,
    t
  } = useStore();
  const [selectedSize, setSelectedSize] = useState<Size>(product.sizes[0] || 'M');
  const [isAdding, setIsAdding] = useState(false);
  const [imgError, setImgError] = useState(false);

  const productName = getLocalizedName(product);
  const composition = getLocalizedComposition(product);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!product.inStock) return;
    setIsAdding(true);
    addToCart(product, selectedSize, 1);
    setTimeout(() => setIsAdding(false), 1200);
  };

  return (
    <div
      onClick={() => onQuickView(product)}
      className="group relative flex flex-col cursor-pointer transition-all duration-300"
    >
      {/* Product Image Stage */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#F2EFE9] border border-black/5">
        {!imgError ? (
          <img
            src={product.images[0]}
            alt={productName}
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
            className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="h-full w-full flex flex-col items-center justify-center p-6 text-center bg-stone-100 text-stone-500">
            <span className="font-display text-lg italic">{productName}</span>
            <span className="text-xs uppercase tracking-wider text-stone-400 mt-2">
              HomedesignofDjadou
            </span>
          </div>
        )}

        {/* Quiet subtle tag */}
        <div className="absolute top-3 left-3 text-[11px] font-medium tracking-wider uppercase text-neutral-800 bg-[#FAF9F6]/85 backdrop-blur-xs px-2 py-0.5 border border-black/5">
          {!product.inStock
            ? t('madeToOrder')
            : product.stock <= 5
            ? t('onlyXLeft', { x: product.stock })
            : t('inAtelier')}
        </div>

        {/* Hover Quick Actions */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col gap-2">
          {/* Quick Size Bar */}
          {product.inStock && (
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-white/95 backdrop-blur-sm p-1.5 flex items-center justify-between border border-black/10 shadow-sm"
            >
              <span className="text-[10px] uppercase font-medium text-neutral-500 pl-1">
                Taille:
              </span>
              <div className="flex items-center gap-1">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-6 h-6 text-[11px] font-medium transition-colors ${
                      selectedSize === size
                        ? 'bg-neutral-900 text-white'
                        : 'text-neutral-700 hover:bg-neutral-200'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center gap-2">
            <button
              onClick={handleQuickAdd}
              disabled={!product.inStock}
              className={`flex-1 py-2.5 px-3 text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 shadow-md ${
                !product.inStock
                  ? 'bg-neutral-400 text-white cursor-not-allowed'
                  : isAdding
                  ? 'bg-emerald-800 text-white'
                  : 'bg-neutral-900 hover:bg-neutral-800 text-white'
              }`}
            >
              {isAdding ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>{t('addedToBag')}</span>
                </>
              ) : (
                <>
                  <Plus className="w-3.5 h-3.5" />
                  <span>{product.inStock ? `${t('addToBag')} (${selectedSize})` : t('soldOut')}</span>
                </>
              )}
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onQuickView(product);
              }}
              className="p-2.5 bg-white hover:bg-neutral-100 text-neutral-800 border border-black/10 transition-colors shadow-md"
              title={t('quickView')}
              aria-label={t('quickView')}
            >
              <Eye className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Product Metadata */}
      <div className="pt-4 flex flex-col gap-1">
        <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-neutral-500 font-medium">
          <span>{product.category}</span>
          <span aria-hidden="true" className="text-neutral-300">·</span>
          <span className="truncate max-w-[160px]">{composition.split(',')[0]}</span>
        </div>

        <h3 className="text-base font-normal text-neutral-900 group-hover:text-neutral-700 transition-colors line-clamp-1">
          {productName}
        </h3>

        <div className="flex items-baseline gap-2.5 mt-0.5">
          <span className="text-sm font-semibold tracking-tight text-neutral-900 font-mono tabular-nums">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-xs text-neutral-400 line-through font-mono tabular-nums">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
