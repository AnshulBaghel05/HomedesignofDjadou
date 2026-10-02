import React, { useState, useEffect } from 'react';
import { X, Image as ImageIcon, Plus, Trash2 } from 'lucide-react';
import { Product, Size } from '../../types/store';
import { useStore } from '../../context/StoreContext';
import { HERO_IMAGE, TRENCH_IMAGE, BLOUSE_IMAGE, TROUSERS_IMAGE, KNIT_IMAGE } from '../../data/initialData';

interface ProductEditModalProps {
  product: Product | null; // null means create new
  onClose: () => void;
}

const PRESET_IMAGES = [
  { label: 'Camel Wool Trench', url: TRENCH_IMAGE },
  { label: 'Mulberry Silk Blouse', url: BLOUSE_IMAGE },
  { label: 'Pleated Serge Trousers', url: TROUSERS_IMAGE },
  { label: 'Cashmere Knit', url: KNIT_IMAGE },
  { label: 'Editorial Campaign', url: HERO_IMAGE }
];

export const ProductEditModal: React.FC<ProductEditModalProps> = ({ product, onClose }) => {
  const { addProduct, updateProduct, collections } = useStore();

  const [name, setName] = useState('');
  const [tagline, setTagline] = useState('');
  const [price, setPrice] = useState('320');
  const [originalPrice, setOriginalPrice] = useState('');
  const [collectionId, setCollectionId] = useState(collections[0]?.id || '');
  const [category, setCategory] = useState<Product['category']>('Outerwear');
  const [imageUrl, setImageUrl] = useState(TRENCH_IMAGE);
  const [description, setDescription] = useState('');
  const [composition, setComposition] = useState('');
  const [details, setDetails] = useState<string[]>(['French seams throughout', 'Natural horn button closures']);
  const [detailInput, setDetailInput] = useState('');
  const [sizes, setSizes] = useState<Size[]>(['XS', 'S', 'M', 'L', 'XL']);
  const [stock, setStock] = useState('15');
  const [inStock, setInStock] = useState(true);
  const [featured, setFeatured] = useState(false);

  useEffect(() => {
    if (product) {
      setName(product.name);
      setTagline(product.tagline);
      setPrice(product.price.toString());
      setOriginalPrice(product.originalPrice ? product.originalPrice.toString() : '');
      setCollectionId(product.collectionId);
      setCategory(product.category);
      setImageUrl(product.images[0] || TRENCH_IMAGE);
      setDescription(product.description);
      setComposition(product.composition);
      setDetails(product.details);
      setSizes(product.sizes);
      setStock(product.stock.toString());
      setInStock(product.inStock);
      setFeatured(product.featured);
    }
  }, [product]);

  const handleToggleSize = (size: Size) => {
    setSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const handleAddDetail = () => {
    if (detailInput.trim()) {
      setDetails((prev) => [...prev, detailInput.trim()]);
      setDetailInput('');
    }
  };

  const handleRemoveDetail = (index: number) => {
    setDetails((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !price) return;

    const parsedPrice = parseFloat(price);
    const parsedOriginalPrice = originalPrice ? parseFloat(originalPrice) : undefined;
    const parsedStock = parseInt(stock, 10) || 0;

    if (product) {
      updateProduct(product.id, {
        name,
        tagline,
        price: parsedPrice,
        originalPrice: parsedOriginalPrice,
        collectionId,
        category,
        images: [imageUrl],
        description,
        composition,
        details,
        sizes,
        stock: parsedStock,
        inStock: parsedStock > 0 && inStock,
        featured
      });
    } else {
      addProduct({
        name,
        tagline,
        price: parsedPrice,
        originalPrice: parsedOriginalPrice,
        collectionId,
        category,
        images: [imageUrl],
        description,
        composition,
        details,
        sizes,
        stock: parsedStock,
        inStock: parsedStock > 0 && inStock,
        featured
      });
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-[#FAF9F6] border border-black/10 shadow-2xl p-6 sm:p-8 my-6 max-h-[92vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-4 border-b border-neutral-200 mb-6">
          <h3
            className="text-2xl font-normal text-neutral-900 tracking-tight"
            style={{ fontFamily: 'Cormorant Garamond, serif' }}
          >
            {product ? 'Edit Atelier Garment' : 'Create New Atelier Garment'}
          </h3>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-neutral-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Garment Title & Tagline */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-neutral-600 font-medium mb-1">
                Garment Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Sculpted Silk Kimono Coat"
                className="w-full p-2.5 text-xs bg-white border border-neutral-300 focus:outline-none focus:border-neutral-900"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-neutral-600 font-medium mb-1">
                Tagline / Subtitle
              </label>
              <input
                type="text"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                placeholder="e.g. Pure 22-momme silk with French seams"
                className="w-full p-2.5 text-xs bg-white border border-neutral-300 focus:outline-none focus:border-neutral-900"
              />
            </div>
          </div>

          {/* Pricing, Category, Collection */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-neutral-600 font-medium mb-1">
                Price ($ USD) *
              </label>
              <input
                type="number"
                required
                min="0"
                step="1"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full p-2.5 text-xs bg-white border border-neutral-300 focus:outline-none focus:border-neutral-900 font-mono tabular-nums"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-neutral-600 font-medium mb-1">
                Original Price ($)
              </label>
              <input
                type="number"
                min="0"
                step="1"
                placeholder="Optional"
                value={originalPrice}
                onChange={(e) => setOriginalPrice(e.target.value)}
                className="w-full p-2.5 text-xs bg-white border border-neutral-300 focus:outline-none focus:border-neutral-900 font-mono tabular-nums"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-neutral-600 font-medium mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full p-2.5 text-xs bg-white border border-neutral-300 focus:outline-none focus:border-neutral-900 cursor-pointer"
              >
                <option value="Outerwear">Outerwear</option>
                <option value="Blouses & Tops">Blouses & Tops</option>
                <option value="Trousers">Trousers</option>
                <option value="Knitwear">Knitwear</option>
                <option value="Dresses">Dresses</option>
                <option value="Accessories">Accessories</option>
              </select>
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-neutral-600 font-medium mb-1">
                Collection
              </label>
              <select
                value={collectionId}
                onChange={(e) => setCollectionId(e.target.value)}
                className="w-full p-2.5 text-xs bg-white border border-neutral-300 focus:outline-none focus:border-neutral-900 cursor-pointer"
              >
                {collections.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Image Selection with Preview */}
          <div>
            <label className="block text-xs uppercase tracking-wider text-neutral-600 font-medium mb-2">
              Primary Garment Image
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-3">
              {PRESET_IMAGES.map((preset) => (
                <button
                  type="button"
                  key={preset.url}
                  onClick={() => setImageUrl(preset.url)}
                  className={`relative aspect-[3/4] border overflow-hidden transition-all ${
                    imageUrl === preset.url
                      ? 'ring-2 ring-neutral-900 border-transparent'
                      : 'border-neutral-200 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={preset.url} alt={preset.label} className="w-full h-full object-cover" />
                  <span className="absolute inset-x-0 bottom-0 bg-black/60 text-white text-[9px] py-0.5 text-center truncate px-1">
                    {preset.label}
                  </span>
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Or paste custom image URL"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="w-full p-2 text-xs bg-white border border-neutral-300 focus:outline-none focus:border-neutral-900"
              />
            </div>
          </div>

          {/* Description & Composition */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-neutral-600 font-medium mb-1">
                Editorial Description
              </label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Sensual cut, French seams, noble weight..."
                className="w-full p-2.5 text-xs bg-white border border-neutral-300 focus:outline-none focus:border-neutral-900"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-neutral-600 font-medium mb-1">
                Fabric Composition
              </label>
              <textarea
                rows={3}
                value={composition}
                onChange={(e) => setComposition(e.target.value)}
                placeholder="e.g. 100% Mongolian Cashmere (7-gauge rib)"
                className="w-full p-2.5 text-xs bg-white border border-neutral-300 focus:outline-none focus:border-neutral-900"
              />
            </div>
          </div>

          {/* Sizes and Stock */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-4 bg-white border border-neutral-200">
            <div>
              <span className="block text-xs uppercase tracking-wider text-neutral-600 font-semibold mb-2">
                Available Sizes
              </span>
              <div className="flex items-center gap-2">
                {(['XS', 'S', 'M', 'L', 'XL'] as Size[]).map((sz) => (
                  <button
                    type="button"
                    key={sz}
                    onClick={() => handleToggleSize(sz)}
                    className={`w-9 h-8 text-xs font-semibold border transition-all ${
                      sizes.includes(sz)
                        ? 'border-neutral-900 bg-neutral-900 text-white'
                        : 'border-neutral-300 text-neutral-400 bg-neutral-50'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div>
                <label className="block text-xs uppercase tracking-wider text-neutral-600 font-semibold mb-1">
                  Atelier Stock Units
                </label>
                <input
                  type="number"
                  min="0"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  className="w-24 p-2 text-xs bg-white border border-neutral-300 font-mono tabular-nums"
                />
              </div>

              <div className="flex flex-col gap-2 pt-3">
                <label className="flex items-center gap-2 text-xs text-neutral-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={inStock}
                    onChange={(e) => setInStock(e.target.checked)}
                    className="accent-neutral-900"
                  />
                  <span>Active in Storefront</span>
                </label>

                <label className="flex items-center gap-2 text-xs text-neutral-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={featured}
                    onChange={(e) => setFeatured(e.target.checked)}
                    className="accent-neutral-900"
                  />
                  <span>Featured Piece</span>
                </label>
              </div>
            </div>
          </div>

          {/* Details list */}
          <div>
            <label className="block text-xs uppercase tracking-wider text-neutral-600 font-medium mb-1">
              Atelier Craftsmanship Bullet Points
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={detailInput}
                onChange={(e) => setDetailInput(e.target.value)}
                placeholder="e.g. Hand-rolled hems and mother-of-pearl buttons"
                className="flex-1 p-2 text-xs bg-white border border-neutral-300 focus:outline-none focus:border-neutral-900"
              />
              <button
                type="button"
                onClick={handleAddDetail}
                className="px-3 py-2 text-xs bg-neutral-200 hover:bg-neutral-300 text-neutral-900 font-semibold flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </button>
            </div>

            <ul className="space-y-1">
              {details.map((d, idx) => (
                <li key={idx} className="flex items-center justify-between text-xs bg-neutral-100 px-3 py-1.5 border border-neutral-200">
                  <span>{d}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveDetail(idx)}
                    className="text-neutral-400 hover:text-red-600"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-neutral-200">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 text-xs uppercase tracking-wider font-semibold text-neutral-600 hover:text-neutral-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-neutral-900 text-white text-xs uppercase tracking-wider font-semibold hover:bg-neutral-800 transition-colors cursor-pointer shadow-md"
            >
              {product ? 'Save Changes' : 'Publish Garment'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
