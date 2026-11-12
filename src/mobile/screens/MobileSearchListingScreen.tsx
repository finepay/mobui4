import { useState, useMemo, useRef, useEffect } from 'react';
import {
  ArrowLeft,
  Search,
  X,
  ShoppingCart,
  SlidersHorizontal,
  ChevronDown,
  Tag,
  Truck,
  MapPin,
  Star,
  Plus,
  ArrowUpDown,
  Check,
  RotateCcw,
  Sparkles,
  Layers,
  Leaf,
  Store,
  Grid,
  List,
} from 'lucide-react';
import { MobileProduct } from '../types';

interface MobileSearchListingScreenProps {
  onBack: () => void;
  products: MobileProduct[];
  initialQuery?: string;
  onSelectProduct: (product: MobileProduct) => void;
  onAddToCart: (product: MobileProduct) => void;
  cartCount: number;
  onGoToCart: () => void;
}

export type SortOption = 'relevance' | 'price_asc' | 'price_desc' | 'sales_desc' | 'rating_desc';

const POPULAR_SEARCHES = [
  'Kopi Gayo',
  'Sapi Limousin',
  'Pakan Sapi',
  'Pupuk Organik',
  'Vanili',
  'Domba Garut',
  'Bibit Cabai',
];

const CATEGORIES = [
  'Semua Kategori',
  'Peternakan',
  'Pertanian',
  'Pakan',
  'Pupuk',
  'Bibit',
];

export default function MobileSearchListingScreen({
  onBack,
  products,
  initialQuery = '',
  onSelectProduct,
  onAddToCart,
  cartCount,
  onGoToCart,
}: MobileSearchListingScreenProps) {
  const [query, setQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState('Semua Kategori');
  const [sortOption, setSortOption] = useState<SortOption>('relevance');

  // Standard filter toggles requested by user:
  // - Harga termurah (sort: price_asc)
  // - Promo (only discounted)
  // - Gratis Ongkir (only free shipping)
  // - Terdekat (sorted by distance or nearby location)
  const [filterPromoOnly, setFilterPromoOnly] = useState(false);
  const [filterFreeShippingOnly, setFilterFreeShippingOnly] = useState(false);
  const [filterNearbyOnly, setFilterNearbyOnly] = useState(false);

  // View Layout: Grid (2 cols) or List
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Focus search input on mount if empty query
    if (!initialQuery) {
      inputRef.current?.focus();
    }
  }, [initialQuery]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  // Filter & Sort Logic
  const filteredAndSortedProducts = useMemo(() => {
    let result = products.filter((p) => p.isActive !== false);

    // 1. Keyword search (by name, description, supplier, location, etalase)
    if (query.trim()) {
      const q = query.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.location.toLowerCase().includes(q) ||
          p.supplier.toLowerCase().includes(q) ||
          (p.etalase && p.etalase.toLowerCase().includes(q)) ||
          p.description.toLowerCase().includes(q)
      );
    }

    // 2. Category filter
    if (selectedCategory !== 'Semua Kategori') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // 3. Filter Promo / Diskon
    if (filterPromoOnly) {
      result = result.filter((p) => (p.discountPercent && p.discountPercent > 0) || (p.originalPrice && p.originalPrice > p.price));
    }

    // 4. Filter Gratis Ongkir
    if (filterFreeShippingOnly) {
      result = result.filter((p) => p.isFreeShipping === true);
    }

    // 5. Filter Terdekat (< 300 km or prioritize location)
    if (filterNearbyOnly) {
      result = result.filter((p) => (p.distanceKm !== undefined ? p.distanceKm <= 300 : true));
    }

    // Sorting
    return result.sort((a, b) => {
      if (filterNearbyOnly && sortOption === 'relevance') {
        const distA = a.distanceKm ?? 9999;
        const distB = b.distanceKm ?? 9999;
        return distA - distB;
      }

      switch (sortOption) {
        case 'price_asc':
          return a.price - b.price;
        case 'price_desc':
          return b.price - a.price;
        case 'sales_desc':
          return (b.soldCount || 0) - (a.soldCount || 0);
        case 'rating_desc':
          return (b.rating || 0) - (a.rating || 0);
        case 'relevance':
        default:
          return 0;
      }
    });
  }, [
    products,
    query,
    selectedCategory,
    filterPromoOnly,
    filterFreeShippingOnly,
    filterNearbyOnly,
    sortOption,
  ]);

  const activeFiltersCount =
    (selectedCategory !== 'Semua Kategori' ? 1 : 0) +
    (filterPromoOnly ? 1 : 0) +
    (filterFreeShippingOnly ? 1 : 0) +
    (filterNearbyOnly ? 1 : 0) +
    (sortOption !== 'relevance' ? 1 : 0);

  const handleResetFilters = () => {
    setSelectedCategory('Semua Kategori');
    setFilterPromoOnly(false);
    setFilterFreeShippingOnly(false);
    setFilterNearbyOnly(false);
    setSortOption('relevance');
    setQuery('');
  };

  return (
    <div className="bg-stone-100 min-h-full flex flex-col pb-12 select-none">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed top-14 left-1/2 -translate-x-1/2 z-50 bg-stone-900 text-white text-xs px-3.5 py-1.5 border border-emerald-500 shadow-xl flex items-center gap-1.5 animate-fade-in pointer-events-none">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. Top Search Bar Header */}
      <div className="bg-emerald-900 text-white px-3 py-2.5 flex items-center gap-2 sticky top-0 z-30 shadow-md border-b border-emerald-950">
        <button
          onClick={onBack}
          className="p-1 hover:bg-emerald-800 transition-colors text-white cursor-pointer shrink-0"
          title="Kembali"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        {/* Input box */}
        <div className="flex-1 relative">
          <Search className="w-4 h-4 text-stone-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Cari komoditas, bibit, pakan, ternak..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-white text-stone-900 pl-8.5 pr-8 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-400 placeholder:text-stone-400"
          />
          {query && (
            <button
              onClick={() => {
                setQuery('');
                inputRef.current?.focus();
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Cart Icon */}
        <button
          onClick={onGoToCart}
          className="relative p-1.5 text-white hover:text-emerald-200 transition-colors shrink-0"
          title="Keranjang"
        >
          <ShoppingCart className="w-5 h-5" />
          {cartCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 bg-rose-500 text-white font-mono text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-white">
              {cartCount > 9 ? '9+' : cartCount}
            </span>
          )}
        </button>
      </div>

      {/* 2. Popular Search Chips (Quick suggestions) */}
      {!query && (
        <div className="bg-white px-3 py-2 border-b border-stone-200">
          <div className="flex items-center justify-between text-[11px] text-stone-500 mb-1.5">
            <span className="font-semibold text-stone-700">Pencarian Populer:</span>
            <span className="text-[10px] text-emerald-800">Terniva Agritech</span>
          </div>
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-0.5">
            {POPULAR_SEARCHES.map((term) => (
              <button
                key={term}
                onClick={() => setQuery(term)}
                className="bg-stone-50 hover:bg-emerald-50 hover:text-emerald-800 text-stone-700 text-[11px] px-2.5 py-1 border border-stone-200 transition-colors shrink-0 whitespace-nowrap cursor-pointer"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 3. Filter Bar Utama (Standard Shopee / Marketplace Quick Filter Pills) */}
      <div className="bg-white border-b border-stone-200 px-3 py-2 shadow-xs sticky top-[49px] z-20 space-y-2">
        {/* Horizontal Quick Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar text-xs">
          {/* A. Harga Termurah (Quick Sort toggle) */}
          <button
            onClick={() => {
              if (sortOption === 'price_asc') {
                setSortOption('relevance');
              } else {
                setSortOption('price_asc');
              }
            }}
            className={`px-2.5 py-1 text-[11px] font-bold border transition-colors shrink-0 flex items-center gap-1 cursor-pointer ${
              sortOption === 'price_asc'
                ? 'bg-emerald-800 text-white border-emerald-950'
                : 'bg-stone-50 text-stone-700 border-stone-300 hover:bg-stone-100'
            }`}
          >
            <span>Harga Termurah</span>
            {sortOption === 'price_asc' && <Check className="w-3 h-3 text-emerald-300" />}
          </button>

          {/* B. Promo / Diskon */}
          <button
            onClick={() => setFilterPromoOnly(!filterPromoOnly)}
            className={`px-2.5 py-1 text-[11px] font-bold border transition-colors shrink-0 flex items-center gap-1 cursor-pointer ${
              filterPromoOnly
                ? 'bg-amber-600 text-white border-amber-700'
                : 'bg-stone-50 text-stone-700 border-stone-300 hover:bg-stone-100'
            }`}
          >
            <Tag className="w-3 h-3" />
            <span>Promo & Diskon</span>
            {filterPromoOnly && <Check className="w-3 h-3 text-amber-200" />}
          </button>

          {/* C. Gratis Ongkir */}
          <button
            onClick={() => setFilterFreeShippingOnly(!filterFreeShippingOnly)}
            className={`px-2.5 py-1 text-[11px] font-bold border transition-colors shrink-0 flex items-center gap-1 cursor-pointer ${
              filterFreeShippingOnly
                ? 'bg-emerald-700 text-white border-emerald-900'
                : 'bg-stone-50 text-stone-700 border-stone-300 hover:bg-stone-100'
            }`}
          >
            <Truck className="w-3 h-3" />
            <span>Gratis Ongkir</span>
            {filterFreeShippingOnly && <Check className="w-3 h-3 text-emerald-200" />}
          </button>

          {/* D. Terdekat */}
          <button
            onClick={() => setFilterNearbyOnly(!filterNearbyOnly)}
            className={`px-2.5 py-1 text-[11px] font-bold border transition-colors shrink-0 flex items-center gap-1 cursor-pointer ${
              filterNearbyOnly
                ? 'bg-teal-700 text-white border-teal-900'
                : 'bg-stone-50 text-stone-700 border-stone-300 hover:bg-stone-100'
            }`}
          >
            <MapPin className="w-3 h-3" />
            <span>Terdekat (Lokasi)</span>
            {filterNearbyOnly && <Check className="w-3 h-3 text-teal-200" />}
          </button>
        </div>

        {/* Row 2: Category Selector + Sort Dropdown + View Mode */}
        <div className="flex items-center justify-between gap-2 pt-1 border-t border-stone-100 text-xs">
          {/* Category Dropdown */}
          <div className="flex-1 max-w-[170px]">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-stone-50 border border-stone-300 px-2 py-1 text-[11px] text-stone-800 font-semibold focus:outline-none focus:border-emerald-700"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Sort Dropdown */}
          <div className="flex-1 max-w-[130px]">
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value as SortOption)}
              className="w-full bg-stone-50 border border-stone-300 px-2 py-1 text-[11px] text-stone-800 font-semibold focus:outline-none focus:border-emerald-700"
            >
              <option value="relevance">Terkait</option>
              <option value="price_asc">Harga: Termurah</option>
              <option value="price_desc">Harga: Termahal</option>
              <option value="sales_desc">Terlaris</option>
              <option value="rating_desc">Rating Tertinggi</option>
            </select>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center border border-stone-300 bg-stone-50 p-0.5 shrink-0">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1 cursor-pointer ${
                viewMode === 'grid' ? 'bg-white shadow-xs text-emerald-800' : 'text-stone-400'
              }`}
              title="Tampilan Grid 2 Kolom"
            >
              <Grid className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1 cursor-pointer ${
                viewMode === 'list' ? 'bg-white shadow-xs text-emerald-800' : 'text-stone-400'
              }`}
              title="Tampilan List"
            >
              <List className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 4. Results Info Bar */}
      <div className="px-3 py-2 flex items-center justify-between text-xs text-stone-600">
        <div>
          <span>Menemukan </span>
          <strong className="text-stone-900 font-mono">{filteredAndSortedProducts.length}</strong>
          <span> komoditas</span>
          {query && (
            <span>
              {' '}
              untuk "<strong>{query}</strong>"
            </span>
          )}
        </div>

        {activeFiltersCount > 0 && (
          <button
            onClick={handleResetFilters}
            className="text-[11px] text-rose-600 font-bold flex items-center gap-0.5 hover:underline"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset Filter ({activeFiltersCount})</span>
          </button>
        )}
      </div>

      {/* 5. Products List / Grid */}
      <div className="px-2.5">
        {filteredAndSortedProducts.length === 0 ? (
          <div className="bg-white p-8 border border-stone-200 text-center space-y-3 mt-2 shadow-xs">
            <Search className="w-10 h-10 text-stone-300 mx-auto" />
            <div>
              <h4 className="text-xs font-bold text-stone-800">
                Tidak ada komoditas yang cocok
              </h4>
              <p className="text-[11px] text-stone-500 mt-1 max-w-[260px] mx-auto">
                Coba gunakan kata kunci lain atau nonaktifkan filter seperti Promo, Gratis Ongkir, atau
                pilih "Semua Kategori".
              </p>
            </div>
            <button
              onClick={handleResetFilters}
              className="bg-emerald-800 hover:bg-emerald-900 text-white px-4 py-1.5 text-xs font-bold inline-flex items-center gap-1.5 border border-emerald-950 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Semua Filter</span>
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          /* GRID VIEW (2 COLUMNS - Shopee Style) */
          <div className="grid grid-cols-2 gap-2">
            {filteredAndSortedProducts.map((item) => (
              <div
                key={item.id}
                onClick={() => onSelectProduct(item)}
                className="bg-white border border-stone-200 shadow-xs flex flex-col justify-between hover:border-emerald-600 transition-all cursor-pointer group relative overflow-hidden"
              >
                {/* Image & Badges */}
                <div className="relative aspect-square w-full bg-stone-100 overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        '/src/assets/images/banner_hero_agritech_1794441148053.jpg';
                    }}
                  />

                  {/* Promo Badge */}
                  {item.discountPercent && item.discountPercent > 0 && (
                    <div className="absolute top-1.5 left-1.5 bg-rose-600 text-white font-mono text-[9px] font-bold px-1.5 py-0.5 shadow-sm">
                      -{item.discountPercent}%
                    </div>
                  )}

                  {/* Free Shipping Badge */}
                  {item.isFreeShipping && (
                    <div className="absolute bottom-1.5 left-1.5 bg-emerald-800/90 backdrop-blur-xs text-white text-[8px] font-bold px-1.5 py-0.5 flex items-center gap-0.5 shadow-xs">
                      <Truck className="w-2.5 h-2.5" /> Gratis Ongkir
                    </div>
                  )}

                  {/* Distance badge if nearby */}
                  {item.distanceKm !== undefined && item.distanceKm <= 300 && (
                    <div className="absolute top-1.5 right-1.5 bg-stone-900/80 text-white text-[8px] font-mono font-medium px-1.5 py-0.5">
                      {item.distanceKm < 10 ? `${item.distanceKm} km` : `${Math.round(item.distanceKm)} km`}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-2.5 flex-1 flex flex-col justify-between space-y-1.5">
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-emerald-800 font-bold block">
                      {item.category}
                    </span>
                    <h4 className="text-xs font-bold text-stone-900 line-clamp-2 leading-tight group-hover:text-emerald-800 transition-colors mt-0.5">
                      {item.name}
                    </h4>
                  </div>

                  <div>
                    {/* Price and Original */}
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className="text-xs font-black text-emerald-900 font-mono">
                        Rp {item.price.toLocaleString('id-ID')}
                      </span>
                    </div>
                    {item.originalPrice && (
                      <span className="text-[10px] text-stone-400 line-through font-mono block">
                        Rp {item.originalPrice.toLocaleString('id-ID')}
                      </span>
                    )}

                    {/* Location & Rating */}
                    <div className="flex items-center justify-between text-[10px] text-stone-500 mt-1 pt-1 border-t border-stone-100">
                      <div className="flex items-center gap-0.5 truncate max-w-[95px]">
                        <MapPin className="w-2.5 h-2.5 text-stone-400 shrink-0" />
                        <span className="truncate">{item.location.split(',')[0]}</span>
                      </div>
                      <div className="flex items-center gap-0.5 font-bold text-amber-600 shrink-0">
                        <Star className="w-2.5 h-2.5 fill-amber-500 text-amber-500" />
                        <span>{item.rating}</span>
                      </div>
                    </div>

                    {/* Quick Add to Cart button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddToCart(item);
                        showToast(`Ditambahkan ke keranjang: ${item.name.slice(0, 18)}...`);
                      }}
                      className="w-full mt-2 bg-stone-100 hover:bg-emerald-800 hover:text-white text-stone-800 text-[10px] font-bold py-1 border border-stone-200 transition-colors flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3 h-3" />
                      <span>+ Keranjang</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* LIST VIEW (1 COLUMN) */
          <div className="space-y-2">
            {filteredAndSortedProducts.map((item) => (
              <div
                key={item.id}
                onClick={() => onSelectProduct(item)}
                className="bg-white border border-stone-200 p-2.5 shadow-xs flex items-start gap-3 hover:border-emerald-600 transition-all cursor-pointer group"
              >
                <div className="relative w-20 h-20 bg-stone-100 shrink-0 overflow-hidden border border-stone-200">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        '/src/assets/images/banner_hero_agritech_1794441148053.jpg';
                    }}
                  />
                  {item.discountPercent && item.discountPercent > 0 && (
                    <div className="absolute top-0 left-0 bg-rose-600 text-white font-mono text-[8px] font-bold px-1">
                      -{item.discountPercent}%
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1.5 text-[9px] text-emerald-800 font-bold uppercase">
                      <span>{item.category}</span>
                      {item.etalase && (
                        <span className="text-stone-400 font-normal">({item.etalase})</span>
                      )}
                    </div>
                    <h4 className="text-xs font-bold text-stone-900 line-clamp-1 leading-tight group-hover:text-emerald-800 mt-0.5">
                      {item.name}
                    </h4>
                    <p className="text-[10px] text-stone-500 line-clamp-1 mt-0.5">
                      {item.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-2 pt-1 border-t border-stone-100">
                    <div>
                      <div className="text-xs font-black text-emerald-900 font-mono">
                        Rp {item.price.toLocaleString('id-ID')}
                      </div>
                      <div className="flex items-center gap-2 text-[10px] text-stone-400 mt-0.5">
                        <span className="flex items-center gap-0.5">
                          <MapPin className="w-2.5 h-2.5" /> {item.location.split(',')[0]}
                        </span>
                        <span>•</span>
                        <span>{item.soldCount} terjual</span>
                      </div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddToCart(item);
                        showToast(`Ditambahkan ke keranjang: ${item.name.slice(0, 18)}...`);
                      }}
                      className="bg-emerald-800 hover:bg-emerald-900 text-white text-[11px] font-bold px-3 py-1 flex items-center gap-1 cursor-pointer shrink-0"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Beli</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
