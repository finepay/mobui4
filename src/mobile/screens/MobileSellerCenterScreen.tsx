import { useState } from 'react';
import {
  ArrowLeft,
  Store,
  Plus,
  Package,
  Layers,
  RotateCcw,
  Search,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Tag,
  MapPin,
  TrendingUp,
  Image as ImageIcon,
  Edit3,
  Trash2,
  Sparkles,
  Check,
  X,
  Boxes,
  Eye,
  DollarSign,
  Clock,
  ChevronRight,
  Info,
} from 'lucide-react';
import { MobileProduct, RestockLogItem } from '../types';

interface MobileSellerCenterScreenProps {
  onBack: () => void;
  products: MobileProduct[];
  onAddProduct: (product: MobileProduct) => void;
  onUpdateProduct: (product: MobileProduct) => void;
  onDeleteProduct: (productId: string) => void;
  onRestockProduct: (productId: string, addedStock: number) => void;
  etalases: string[];
  onAddEtalase: (name: string) => void;
  onDeleteEtalase: (name: string) => void;
  restockLogs: RestockLogItem[];
  onSelectProductPreview?: (product: MobileProduct) => void;
}

const PRESET_IMAGES = [
  {
    id: 'img-ternak',
    label: 'Peternakan / Sapi',
    url: '/src/assets/images/terniva_mitra_farmer_1794449097085.jpg',
  },
  {
    id: 'img-kopi',
    label: 'Kopi & Rempah Ekspor',
    url: '/src/assets/images/terniva_ekspor_commodities_1794449097514.jpg',
  },
  {
    id: 'img-pakan',
    label: 'Pakan Konsentrat Nutrisi',
    url: '/src/assets/images/terniva_hero_landscape_1794449096818.jpg',
  },
  {
    id: 'img-pupuk',
    label: 'Pupuk Hayati / Bio-Organik',
    url: '/src/assets/images/terniva_dok_konsultasi_1794449097905.jpg',
  },
  {
    id: 'img-panen',
    label: 'Lahan Hortikultura / Panen',
    url: '/src/assets/images/banner_pantau_panen_1794441162382.jpg',
  },
  {
    id: 'img-gudang',
    label: 'Gudang & Logistik Agri',
    url: '/src/assets/images/banner_hero_agritech_1794441148053.jpg',
  },
];

export default function MobileSellerCenterScreen({
  onBack,
  products,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  onRestockProduct,
  etalases,
  onAddEtalase,
  onDeleteEtalase,
  restockLogs,
  onSelectProductPreview,
}: MobileSellerCenterScreenProps) {
  // Navigation tabs in Seller Center
  type SellerTab = 'products' | 'add_product' | 'etalase' | 'restock_logs';
  const [activeTab, setActiveTab] = useState<SellerTab>('products');

  // Filter & Search in 'products' tab
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEtalaseFilter, setSelectedEtalaseFilter] = useState('Semua Etalase');
  const [selectedStockFilter, setSelectedStockFilter] = useState<'all' | 'low' | 'out'>('all');

  // Quick Restock Modal State
  const [restockTargetProduct, setRestockTargetProduct] = useState<MobileProduct | null>(null);
  const [restockAmount, setRestockAmount] = useState<number>(20);

  // Edit Price Modal State
  const [editPriceProduct, setEditPriceProduct] = useState<MobileProduct | null>(null);
  const [newPrice, setNewPrice] = useState<string>('');

  // Delete Confirm Modal State
  const [deleteConfirmProduct, setDeleteConfirmProduct] = useState<MobileProduct | null>(null);

  // Add Etalase Inline Form State
  const [newEtalaseName, setNewEtalaseName] = useState('');
  const [isAddEtalaseModalOpen, setIsAddEtalaseModalOpen] = useState(false);

  // Add Product Form State
  const [newProductName, setNewProductName] = useState('');
  const [newProductCategory, setNewProductCategory] = useState('Pertanian');
  const [newProductEtalase, setNewProductEtalase] = useState(
    etalases.find((e) => e !== 'Semua Etalase') || 'Hasil Ternak'
  );
  const [newProductPrice, setNewProductPrice] = useState('');
  const [newProductOriginalPrice, setNewProductOriginalPrice] = useState('');
  const [newProductStock, setNewProductStock] = useState('50');
  const [newProductMinOrder, setNewProductMinOrder] = useState('1 Kg');
  const [newProductLocation, setNewProductLocation] = useState('Kab. Boyolali, Jawa Tengah');
  const [newProductDescription, setNewProductDescription] = useState('');
  const [selectedImageUrl, setSelectedImageUrl] = useState(PRESET_IMAGES[0].url);
  const [customImageUrl, setCustomImageUrl] = useState('');
  const [isCustomImage, setIsCustomImage] = useState(false);

  // Store active/holiday toggle
  const [isStoreOpen, setIsStoreOpen] = useState(true);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Quick stats
  const totalProducts = products.length;
  const totalStock = products.reduce((acc, p) => acc + (p.stock || 0), 0);
  const lowStockCount = products.filter((p) => (p.stock || 0) <= 10 && (p.stock || 0) > 0).length;
  const outOfStockCount = products.filter((p) => (p.stock || 0) === 0).length;

  // Filtered products list
  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      !searchQuery ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.etalase && p.etalase.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesEtalase =
      selectedEtalaseFilter === 'Semua Etalase' || p.etalase === selectedEtalaseFilter;

    const matchesStock =
      selectedStockFilter === 'all'
        ? true
        : selectedStockFilter === 'low'
        ? (p.stock || 0) <= 10 && (p.stock || 0) > 0
        : (p.stock || 0) === 0;

    return matchesSearch && matchesEtalase && matchesStock;
  });

  // Handle Quick Restock Submission
  const handleConfirmRestock = () => {
    if (!restockTargetProduct) return;
    const added = Number(restockAmount) || 0;
    if (added <= 0) {
      showToast('Masukkan jumlah restok yang valid (minimal 1)');
      return;
    }
    onRestockProduct(restockTargetProduct.id, added);
    showToast(
      `Berhasil restok +${added} ${restockTargetProduct.name.slice(0, 24)}... (Stok baru: ${
        restockTargetProduct.stock + added
      })`
    );
    setRestockTargetProduct(null);
  };

  // Handle Edit Price Submission
  const handleConfirmEditPrice = () => {
    if (!editPriceProduct) return;
    const priceVal = parseInt(newPrice.replace(/[^0-9]/g, ''), 10);
    if (!priceVal || priceVal <= 0) {
      showToast('Masukkan nominal harga yang valid');
      return;
    }
    const updated: MobileProduct = {
      ...editPriceProduct,
      price: priceVal,
    };
    onUpdateProduct(updated);
    showToast(`Harga berhasil diubah menjadi Rp ${priceVal.toLocaleString('id-ID')}`);
    setEditPriceProduct(null);
  };

  // Handle Add Product Submission
  const handleCreateProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProductName.trim()) {
      showToast('Silakan isi nama produk');
      return;
    }
    const priceNum = parseInt(newProductPrice.replace(/[^0-9]/g, ''), 10);
    if (!priceNum || priceNum <= 0) {
      showToast('Masukkan harga jual yang valid');
      return;
    }
    const stockNum = parseInt(newProductStock, 10);
    if (isNaN(stockNum) || stockNum < 0) {
      showToast('Masukkan jumlah stok awal yang valid');
      return;
    }

    const finalImageUrl = isCustomImage && customImageUrl.trim()
      ? customImageUrl.trim()
      : selectedImageUrl;

    const origPrice = newProductOriginalPrice
      ? parseInt(newProductOriginalPrice.replace(/[^0-9]/g, ''), 10)
      : undefined;

    const discount =
      origPrice && origPrice > priceNum
        ? Math.round(((origPrice - priceNum) / origPrice) * 100)
        : undefined;

    const newProd: MobileProduct = {
      id: `prod-custom-${Date.now()}`,
      name: newProductName.trim(),
      category: newProductCategory,
      etalase: newProductEtalase,
      price: priceNum,
      originalPrice: origPrice,
      discountPercent: discount,
      rating: 5.0,
      soldCount: 0,
      location: newProductLocation || 'Kab. Boyolali, Jawa Tengah',
      supplier: 'Tani Berkah Sejahtera (Toko Saya)',
      stock: stockNum,
      minOrder: newProductMinOrder.trim() || '1 Kg',
      description:
        newProductDescription.trim() ||
        'Komoditas agribisnis berkualitas pilihan dari kebun/kandang mitra petani langsung.',
      imageUrl: finalImageUrl,
      isVerified: true,
      isActive: true,
    };

    onAddProduct(newProd);
    showToast(`Produk "${newProd.name}" berhasil ditambahkan & mulai dijual!`);

    // Reset Form
    setNewProductName('');
    setNewProductPrice('');
    setNewProductOriginalPrice('');
    setNewProductStock('50');
    setNewProductDescription('');
    setIsCustomImage(false);
    setCustomImageUrl('');

    // Switch to products list to view newly added item
    setActiveTab('products');
  };

  // Handle Add Etalase
  const handleCreateEtalase = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = newEtalaseName.trim();
    if (!trimmed) {
      showToast('Masukkan nama etalase');
      return;
    }
    if (etalases.some((et) => et.toLowerCase() === trimmed.toLowerCase())) {
      showToast('Etalase dengan nama tersebut sudah ada');
      return;
    }
    onAddEtalase(trimmed);
    showToast(`Etalase "${trimmed}" berhasil dibuat!`);
    setNewEtalaseName('');
    setIsAddEtalaseModalOpen(false);
  };

  return (
    <div className="bg-stone-100 min-h-full flex flex-col pb-10 select-none">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-12 left-1/2 -translate-x-1/2 z-50 bg-stone-900 text-white text-xs px-4 py-2 border border-emerald-500 shadow-xl flex items-center gap-2 max-w-[90%] text-center">
          <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header Bar */}
      <div className="bg-emerald-900 text-white px-3.5 py-3 flex items-center justify-between shadow-md shrink-0 border-b border-emerald-950">
        <div className="flex items-center gap-2.5">
          <button
            onClick={onBack}
            className="p-1 hover:bg-emerald-800 transition-colors text-white cursor-pointer"
            title="Kembali"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-1.5">
              <Store className="w-4 h-4 text-emerald-300" />
              <h2 className="text-sm font-bold tracking-tight">Toko Saya (Pusat Penjual)</h2>
            </div>
            <p className="text-[10px] text-emerald-200">Kelola Produk, Etalase & Restok Pasokan</p>
          </div>
        </div>

        {/* Store Status Toggle */}
        <button
          onClick={() => {
            setIsStoreOpen(!isStoreOpen);
            showToast(
              isStoreOpen
                ? 'Status toko diubah ke Libur (Produk sementara tidak tampil)'
                : 'Status toko diubah ke Buka & Siap melayani pesanan'
            );
          }}
          className={`flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold border transition-colors cursor-pointer ${
            isStoreOpen
              ? 'bg-emerald-600 border-emerald-400 text-white'
              : 'bg-stone-800 border-stone-600 text-stone-300'
          }`}
        >
          <span
            className={`w-2 h-2 rounded-full ${isStoreOpen ? 'bg-emerald-300 animate-pulse' : 'bg-rose-400'}`}
          />
          <span>{isStoreOpen ? 'Toko Buka' : 'Libur'}</span>
        </button>
      </div>

      {/* Store Identity & Stats Card */}
      <div className="bg-white p-3.5 border-b border-stone-200 shadow-xs">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-800 shrink-0 font-bold text-lg">
              TB
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-sm font-bold text-stone-900 leading-tight">
                  Tani Berkah Sejahtera
                </h3>
                <span className="bg-emerald-100 text-emerald-800 text-[9px] font-bold px-1.5 py-0.2">
                  Official Seller
                </span>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-stone-500 mt-0.5">
                <span className="flex items-center gap-0.5">
                  <MapPin className="w-3 h-3 text-stone-400" /> Boyolali, Jawa Tengah
                </span>
                <span>•</span>
                <span className="text-amber-600 font-bold">4.9 ★ (1.2k Ulasan)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick 4 Stats Grid */}
        <div className="grid grid-cols-4 gap-2 mt-3 pt-3 border-t border-stone-100 text-center">
          <div className="bg-stone-50 p-2 border border-stone-200">
            <div className="text-[10px] text-stone-500 leading-tight">Total Produk</div>
            <div className="text-sm font-black text-emerald-900 font-mono mt-0.5">
              {totalProducts}
            </div>
          </div>
          <div className="bg-stone-50 p-2 border border-stone-200">
            <div className="text-[10px] text-stone-500 leading-tight">Total Stok</div>
            <div className="text-sm font-black text-stone-800 font-mono mt-0.5">
              {totalStock.toLocaleString('id-ID')}
            </div>
          </div>
          <div
            onClick={() => {
              setActiveTab('products');
              setSelectedStockFilter('low');
            }}
            className={`p-2 border cursor-pointer transition-colors ${
              lowStockCount > 0
                ? 'bg-amber-50 border-amber-300 text-amber-900'
                : 'bg-stone-50 border-stone-200 text-stone-700'
            }`}
          >
            <div className="text-[10px] text-stone-500 leading-tight">Perlu Restok</div>
            <div
              className={`text-sm font-black font-mono mt-0.5 ${
                lowStockCount > 0 ? 'text-amber-700' : 'text-stone-700'
              }`}
            >
              {lowStockCount}
            </div>
          </div>
          <div
            onClick={() => {
              setActiveTab('products');
              setSelectedStockFilter('out');
            }}
            className={`p-2 border cursor-pointer transition-colors ${
              outOfStockCount > 0
                ? 'bg-rose-50 border-rose-300 text-rose-900'
                : 'bg-stone-50 border-stone-200 text-stone-700'
            }`}
          >
            <div className="text-[10px] text-stone-500 leading-tight">Stok Habis</div>
            <div
              className={`text-sm font-black font-mono mt-0.5 ${
                outOfStockCount > 0 ? 'text-rose-600' : 'text-stone-700'
              }`}
            >
              {outOfStockCount}
            </div>
          </div>
        </div>
      </div>

      {/* Seller Tab Navigation (Shopee/Tokopedia Seller Standard) */}
      <div className="bg-white border-b border-stone-200 flex items-center justify-between px-2 text-xs font-semibold sticky top-0 z-20 shadow-xs">
        <button
          onClick={() => setActiveTab('products')}
          className={`flex-1 py-3 text-center border-b-2 transition-colors cursor-pointer flex items-center justify-center gap-1 ${
            activeTab === 'products'
              ? 'border-emerald-700 text-emerald-800 font-bold'
              : 'border-transparent text-stone-500 hover:text-stone-800'
          }`}
        >
          <Package className="w-3.5 h-3.5" />
          <span>Produk Saya</span>
        </button>

        <button
          onClick={() => setActiveTab('add_product')}
          className={`flex-1 py-3 text-center border-b-2 transition-colors cursor-pointer flex items-center justify-center gap-1 ${
            activeTab === 'add_product'
              ? 'border-emerald-700 text-emerald-800 font-bold'
              : 'border-transparent text-stone-500 hover:text-stone-800'
          }`}
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Tambah Produk</span>
        </button>

        <button
          onClick={() => setActiveTab('etalase')}
          className={`flex-1 py-3 text-center border-b-2 transition-colors cursor-pointer flex items-center justify-center gap-1 ${
            activeTab === 'etalase'
              ? 'border-emerald-700 text-emerald-800 font-bold'
              : 'border-transparent text-stone-500 hover:text-stone-800'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Etalase ({etalases.length - 1})</span>
        </button>

        <button
          onClick={() => setActiveTab('restock_logs')}
          className={`flex-1 py-3 text-center border-b-2 transition-colors cursor-pointer flex items-center justify-center gap-1 ${
            activeTab === 'restock_logs'
              ? 'border-emerald-700 text-emerald-800 font-bold'
              : 'border-transparent text-stone-500 hover:text-stone-800'
          }`}
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Riwayat ({restockLogs.length})</span>
        </button>
      </div>

      {/* TAB 1: PRODUK SAYA */}
      {activeTab === 'products' && (
        <div className="p-3 space-y-3">
          {/* Action Row: Quick Add Button & Search */}
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-stone-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Cari komoditas toko..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-stone-300 pl-8 pr-3 py-1.5 text-xs text-stone-800 focus:outline-none focus:border-emerald-700"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <button
              onClick={() => setActiveTab('add_product')}
              className="bg-emerald-800 hover:bg-emerald-900 text-white px-3 py-1.5 text-xs font-bold flex items-center gap-1 shrink-0 border border-emerald-950 transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+ Jual Produk</span>
            </button>
          </div>

          {/* Etalase Horizontal Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 text-xs">
            {etalases.map((et) => {
              const countInEt =
                et === 'Semua Etalase'
                  ? products.length
                  : products.filter((p) => p.etalase === et).length;
              const isSelected = selectedEtalaseFilter === et;
              return (
                <button
                  key={et}
                  onClick={() => setSelectedEtalaseFilter(et)}
                  className={`px-2.5 py-1 text-[11px] whitespace-nowrap font-medium border transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-900 text-white border-emerald-950 font-bold'
                      : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-50'
                  }`}
                >
                  {et} <span className="opacity-75">({countInEt})</span>
                </button>
              );
            })}
          </div>

          {/* Stock Condition Quick Filter Pills */}
          <div className="flex items-center justify-between text-xs bg-white px-3 py-2 border border-stone-200">
            <span className="text-stone-500 text-[11px]">Filter Stok:</span>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setSelectedStockFilter('all')}
                className={`px-2 py-0.5 text-[10px] font-semibold border ${
                  selectedStockFilter === 'all'
                    ? 'bg-stone-800 text-white border-stone-900'
                    : 'bg-stone-100 text-stone-600 border-stone-200'
                }`}
              >
                Semua ({products.length})
              </button>
              <button
                onClick={() => setSelectedStockFilter('low')}
                className={`px-2 py-0.5 text-[10px] font-semibold border ${
                  selectedStockFilter === 'low'
                    ? 'bg-amber-600 text-white border-amber-700'
                    : 'bg-stone-100 text-amber-700 border-stone-200'
                }`}
              >
                Menipis (≤10)
              </button>
              <button
                onClick={() => setSelectedStockFilter('out')}
                className={`px-2 py-0.5 text-[10px] font-semibold border ${
                  selectedStockFilter === 'out'
                    ? 'bg-rose-600 text-white border-rose-700'
                    : 'bg-stone-100 text-rose-700 border-stone-200'
                }`}
              >
                Habis (0)
              </button>
            </div>
          </div>

          {/* Product Items List */}
          {filteredProducts.length === 0 ? (
            <div className="bg-white p-8 text-center border border-stone-200 space-y-2">
              <Boxes className="w-10 h-10 text-stone-300 mx-auto" />
              <div className="text-xs font-bold text-stone-700">Tidak ada produk ditemukan</div>
              <p className="text-[11px] text-stone-400">
                Coba ganti filter etalase atau tambahkan komoditas baru untuk mulai berjualan.
              </p>
              <button
                onClick={() => setActiveTab('add_product')}
                className="mt-2 inline-flex items-center gap-1 bg-emerald-800 text-white text-xs font-bold px-3 py-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                Tambah Produk Sekarang
              </button>
            </div>
          ) : (
            <div className="space-y-2.5">
              {filteredProducts.map((prod) => {
                const isOutOfStock = (prod.stock || 0) === 0;
                const isLowStock = (prod.stock || 0) > 0 && (prod.stock || 0) <= 10;

                return (
                  <div
                    key={prod.id}
                    className={`bg-white border p-3 shadow-xs space-y-2.5 transition-all ${
                      prod.isActive === false
                        ? 'border-stone-300 opacity-60 bg-stone-50'
                        : isOutOfStock
                        ? 'border-rose-300 bg-rose-50/20'
                        : isLowStock
                        ? 'border-amber-300 bg-amber-50/20'
                        : 'border-stone-200'
                    }`}
                  >
                    {/* Header: Image + Name + Category + Price */}
                    <div className="flex items-start gap-3">
                      <div className="relative w-16 h-16 bg-stone-100 border border-stone-200 shrink-0 overflow-hidden">
                        <img
                          src={prod.imageUrl}
                          alt={prod.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = PRESET_IMAGES[0].url;
                          }}
                        />
                        {prod.id.startsWith('prod-custom-') && (
                          <span className="absolute top-0 left-0 bg-emerald-800 text-white text-[8px] font-bold px-1 py-0.2">
                            BARU
                          </span>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-1">
                          <h4 className="text-xs font-bold text-stone-900 leading-tight line-clamp-2">
                            {prod.name}
                          </h4>
                          {/* Active / Inactive Status Toggle */}
                          <button
                            onClick={() => {
                              const toggled = { ...prod, isActive: prod.isActive === false };
                              onUpdateProduct(toggled);
                              showToast(
                                toggled.isActive
                                  ? `Produk "${prod.name.slice(0, 20)}..." diaktifkan`
                                  : `Produk "${prod.name.slice(0, 20)}..." dinonaktifkan`
                              );
                            }}
                            title="Aktifkan / Nonaktifkan produk"
                            className={`px-1.5 py-0.5 text-[9px] font-bold shrink-0 border cursor-pointer ${
                              prod.isActive !== false
                                ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                                : 'bg-stone-200 text-stone-600 border-stone-300'
                            }`}
                          >
                            {prod.isActive !== false ? 'Aktif' : 'Nonaktif'}
                          </button>
                        </div>

                        {/* Etalase & Category tag */}
                        <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                          <span className="bg-stone-100 text-stone-700 text-[9px] font-medium px-1.5 py-0.2 border border-stone-200">
                            {prod.etalase || 'Umum'}
                          </span>
                          <span className="text-[10px] text-stone-400">•</span>
                          <span className="text-[10px] text-stone-500">{prod.category}</span>
                          <span className="text-[10px] text-stone-400">•</span>
                          <span className="text-[10px] text-stone-500 font-mono">Min {prod.minOrder}</span>
                        </div>

                        {/* Price & Stock Display */}
                        <div className="flex items-baseline justify-between mt-1.5">
                          <div className="flex items-baseline gap-1.5">
                            <span className="text-xs font-extrabold text-emerald-900 font-mono">
                              Rp {prod.price.toLocaleString('id-ID')}
                            </span>
                            {prod.originalPrice && (
                              <span className="text-[10px] text-stone-400 line-through font-mono">
                                Rp {prod.originalPrice.toLocaleString('id-ID')}
                              </span>
                            )}
                          </div>

                          {/* Stock badge */}
                          <div className="text-right">
                            {isOutOfStock ? (
                              <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-rose-600 bg-rose-100 px-1.5 py-0.5 border border-rose-200">
                                <AlertTriangle className="w-3 h-3" /> Stok Habis (0)
                              </span>
                            ) : isLowStock ? (
                              <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-amber-700 bg-amber-100 px-1.5 py-0.5 border border-amber-200">
                                Sisa {prod.stock}
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-1.5 py-0.5 border border-emerald-200">
                                Stok: <strong className="font-mono">{prod.stock}</strong>
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Standard Seller Action Toolbar (Restok, Ubah Harga, Lihat Produk, Hapus) */}
                    <div className="pt-2 border-t border-stone-100 flex items-center justify-between gap-1.5 text-xs">
                      <div className="flex items-center gap-1.5">
                        {/* 1. Quick Restock Button (Primary Action) */}
                        <button
                          onClick={() => {
                            setRestockTargetProduct(prod);
                            setRestockAmount(20);
                          }}
                          className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-2.5 py-1 text-[11px] flex items-center gap-1 border border-emerald-900 transition-colors cursor-pointer"
                        >
                          <Boxes className="w-3 h-3 text-emerald-200" />
                          <span>Restok +</span>
                        </button>

                        {/* 2. Ubah Harga */}
                        <button
                          onClick={() => {
                            setEditPriceProduct(prod);
                            setNewPrice(prod.price.toString());
                          }}
                          className="bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold px-2 py-1 text-[11px] flex items-center gap-1 border border-stone-300 transition-colors cursor-pointer"
                        >
                          <DollarSign className="w-3 h-3 text-stone-600" />
                          <span>Ubah Harga</span>
                        </button>

                        {/* 3. Preview di Marketplace */}
                        {onSelectProductPreview && (
                          <button
                            onClick={() => onSelectProductPreview(prod)}
                            className="bg-white hover:bg-stone-50 text-stone-600 px-2 py-1 text-[11px] border border-stone-200 transition-colors cursor-pointer"
                            title="Lihat tampilan produk di marketplace"
                          >
                            <Eye className="w-3 h-3" />
                          </button>
                        )}
                      </div>

                      {/* 4. Delete Action */}
                      <button
                        onClick={() => setDeleteConfirmProduct(prod)}
                        className="text-stone-400 hover:text-rose-600 p-1 transition-colors cursor-pointer"
                        title="Hapus Produk"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: TAMBAH PRODUK BARU */}
      {activeTab === 'add_product' && (
        <div className="p-3 space-y-3">
          <div className="bg-emerald-50 border border-emerald-200 p-3 text-xs text-emerald-900 flex items-start gap-2">
            <Info className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
            <div>
              <strong className="block font-bold">Form Jual Komoditas Terniva</strong>
              <span>
                Tambahkan produk hasil ternak, pertanian, pakan, atau bibit Anda. Produk akan langsung
                tampil di etalase toko dan katalog beranda pembeli.
              </span>
            </div>
          </div>

          <form onSubmit={handleCreateProductSubmit} className="bg-white border border-stone-200 p-4 space-y-3.5 shadow-xs">
            {/* 1. Nama Produk */}
            <div>
              <label className="block text-xs font-bold text-stone-800 mb-1">
                Nama Produk / Komoditas <span className="text-rose-600">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="Contoh: Kopi Arabika Robusta Gayo Blend 1 Kg"
                value={newProductName}
                onChange={(e) => setNewProductName(e.target.value)}
                className="w-full bg-stone-50 border border-stone-300 p-2 text-xs text-stone-900 focus:outline-none focus:border-emerald-700"
              />
            </div>

            {/* 2. Etalase & Kategori */}
            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-stone-800">
                    Etalase Toko <span className="text-rose-600">*</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => setIsAddEtalaseModalOpen(true)}
                    className="text-[10px] text-emerald-700 font-bold hover:underline"
                  >
                    + Buat Baru
                  </button>
                </div>
                <select
                  value={newProductEtalase}
                  onChange={(e) => setNewProductEtalase(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-300 p-2 text-xs text-stone-900 focus:outline-none focus:border-emerald-700"
                >
                  {etalases
                    .filter((e) => e !== 'Semua Etalase')
                    .map((et) => (
                      <option key={et} value={et}>
                        {et}
                      </option>
                    ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-800 mb-1">
                  Kategori Pasar <span className="text-rose-600">*</span>
                </label>
                <select
                  value={newProductCategory}
                  onChange={(e) => setNewProductCategory(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-300 p-2 text-xs text-stone-900 focus:outline-none focus:border-emerald-700"
                >
                  <option value="Peternakan">Peternakan</option>
                  <option value="Pertanian">Pertanian</option>
                  <option value="Pakan">Pakan Nutrisi</option>
                  <option value="Pupuk">Pupuk Hayati</option>
                  <option value="Bibit">Bibit Unggul</option>
                </select>
              </div>
            </div>

            {/* 3. Harga Jual & Harga Coret/Diskon */}
            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="block text-xs font-bold text-stone-800 mb-1">
                  Harga Jual (Rp) <span className="text-rose-600">*</span>
                </label>
                <input
                  type="number"
                  required
                  placeholder="Contoh: 125000"
                  value={newProductPrice}
                  onChange={(e) => setNewProductPrice(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-300 p-2 text-xs text-stone-900 font-mono focus:outline-none focus:border-emerald-700"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-800 mb-1">
                  Harga Coret (Opsional)
                </label>
                <input
                  type="number"
                  placeholder="Contoh: 150000"
                  value={newProductOriginalPrice}
                  onChange={(e) => setNewProductOriginalPrice(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-300 p-2 text-xs text-stone-900 font-mono focus:outline-none focus:border-emerald-700"
                />
              </div>
            </div>

            {/* 4. Stok Awal & Satuan/Min Order */}
            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="block text-xs font-bold text-stone-800 mb-1">
                  Jumlah Stok Awal <span className="text-rose-600">*</span>
                </label>
                <input
                  type="number"
                  required
                  min="0"
                  placeholder="50"
                  value={newProductStock}
                  onChange={(e) => setNewProductStock(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-300 p-2 text-xs text-stone-900 font-mono focus:outline-none focus:border-emerald-700"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-800 mb-1">
                  Satuan / Min. Beli <span className="text-rose-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Cth: 1 Kg / 1 Ekor / 1 Sak"
                  value={newProductMinOrder}
                  onChange={(e) => setNewProductMinOrder(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-300 p-2 text-xs text-stone-900 focus:outline-none focus:border-emerald-700"
                />
              </div>
            </div>

            {/* 5. Lokasi Asal Kirim */}
            <div>
              <label className="block text-xs font-bold text-stone-800 mb-1">
                Lokasi Asal Pengiriman <span className="text-rose-600">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="Kabupaten / Kota Asal"
                value={newProductLocation}
                onChange={(e) => setNewProductLocation(e.target.value)}
                className="w-full bg-stone-50 border border-stone-300 p-2 text-xs text-stone-900 focus:outline-none focus:border-emerald-700"
              />
            </div>

            {/* 6. Deskripsi Produk */}
            <div>
              <label className="block text-xs font-bold text-stone-800 mb-1">
                Deskripsi Produk & Kualitas
              </label>
              <textarea
                rows={3}
                placeholder="Jelaskan kualitas, masa panen, sertifikasi atau saran penyimpanan komoditas..."
                value={newProductDescription}
                onChange={(e) => setNewProductDescription(e.target.value)}
                className="w-full bg-stone-50 border border-stone-300 p-2 text-xs text-stone-900 focus:outline-none focus:border-emerald-700"
              />
            </div>

            {/* 7. Foto Produk (Pilihan Preset Cepat atau Custom URL) */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-stone-800">
                  Foto Produk <span className="text-rose-600">*</span>
                </label>
                <button
                  type="button"
                  onClick={() => setIsCustomImage(!isCustomImage)}
                  className="text-[10px] text-emerald-800 font-semibold hover:underline"
                >
                  {isCustomImage ? '← Pilih dari Koleksi Preset' : '+ Masukkan URL Gambar Sendiri'}
                </button>
              </div>

              {isCustomImage ? (
                <div className="space-y-1.5">
                  <input
                    type="url"
                    placeholder="https://images.unsplash.com/..."
                    value={customImageUrl}
                    onChange={(e) => setCustomImageUrl(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-300 p-2 text-xs text-stone-900 focus:outline-none focus:border-emerald-700"
                  />
                  <p className="text-[10px] text-stone-400">
                    Masukkan URL gambar langsung (HTTPS). Gambar akan otomatis teroptimasi.
                  </p>
                </div>
              ) : (
                <div>
                  <div className="grid grid-cols-3 gap-2">
                    {PRESET_IMAGES.map((img) => {
                      const isSelected = selectedImageUrl === img.url;
                      return (
                        <div
                          key={img.id}
                          onClick={() => setSelectedImageUrl(img.url)}
                          className={`relative border cursor-pointer group overflow-hidden transition-all ${
                            isSelected
                              ? 'border-emerald-700 ring-2 ring-emerald-600'
                              : 'border-stone-200 hover:border-stone-400 opacity-80 hover:opacity-100'
                          }`}
                        >
                          <img
                            src={img.url}
                            alt={img.label}
                            className="w-full h-16 object-cover"
                          />
                          <div className="bg-stone-900/80 text-white text-[9px] p-1 truncate text-center">
                            {img.label}
                          </div>
                          {isSelected && (
                            <div className="absolute top-1 right-1 bg-emerald-700 text-white p-0.5">
                              <Check className="w-3 h-3" />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Submit Action */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full bg-emerald-800 hover:bg-emerald-900 text-white py-2.5 px-4 text-xs font-bold flex items-center justify-center gap-1.5 border border-emerald-950 transition-colors shadow-sm cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                <span>Terbitkan & Jual Produk Sekarang</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* TAB 3: KELOLA ETALASE */}
      {activeTab === 'etalase' && (
        <div className="p-3 space-y-3">
          {/* Header Etalase Explanation */}
          <div className="bg-white border border-stone-200 p-3.5 shadow-xs flex items-start justify-between gap-3">
            <div>
              <h4 className="text-xs font-bold text-stone-900">Etalase Toko Saya</h4>
              <p className="text-[11px] text-stone-500 mt-0.5">
                Etalase memudahkan pembeli melihat kelompok komoditas spesifik di toko Anda (seperti
                Kategori Produk di Shopee/Tokopedia).
              </p>
            </div>
            <button
              onClick={() => setIsAddEtalaseModalOpen(true)}
              className="bg-emerald-800 text-white text-xs font-bold px-3 py-1.5 shrink-0 flex items-center gap-1 border border-emerald-950 hover:bg-emerald-900 transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+ Etalase Baru</span>
            </button>
          </div>

          {/* List of Etalases */}
          <div className="bg-white border border-stone-200 divide-y divide-stone-100 shadow-xs">
            {etalases.map((et, idx) => {
              const countInEt =
                et === 'Semua Etalase'
                  ? products.length
                  : products.filter((p) => p.etalase === et).length;
              const isDefault = et === 'Semua Etalase';

              return (
                <div key={et} className="p-3 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 bg-stone-100 border border-stone-200 flex items-center justify-center text-stone-600 font-mono text-xs">
                      {idx === 0 ? '★' : idx}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                        <span>{et}</span>
                        {isDefault && (
                          <span className="bg-stone-100 text-stone-600 text-[9px] font-medium px-1.5 py-0.2">
                            Bawaan
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-stone-500 font-mono">
                        {countInEt} produk terhubung
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setSelectedEtalaseFilter(et);
                        setActiveTab('products');
                      }}
                      className="text-[11px] text-emerald-800 font-bold hover:underline"
                    >
                      Lihat Produk →
                    </button>
                    {!isDefault && (
                      <button
                        onClick={() => {
                          if (
                            window.confirm(
                              `Apakah Anda yakin ingin menghapus etalase "${et}"? Produk di dalamnya tidak akan terhapus.`
                            )
                          ) {
                            onDeleteEtalase(et);
                            showToast(`Etalase "${et}" telah dihapus`);
                          }
                        }}
                        className="text-stone-400 hover:text-rose-600 p-1"
                        title="Hapus Etalase"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 4: RIWAYAT RESTOK */}
      {activeTab === 'restock_logs' && (
        <div className="p-3 space-y-3">
          <div className="bg-white border border-stone-200 p-3.5 shadow-xs">
            <h4 className="text-xs font-bold text-stone-900">Catatan Restok Komoditas</h4>
            <p className="text-[11px] text-stone-500 mt-0.5">
              Riwayat penambahan stok yang telah Anda lakukan untuk memantau perputaran pasokan.
            </p>
          </div>

          {restockLogs.length === 0 ? (
            <div className="bg-white border border-stone-200 p-6 text-center space-y-2">
              <RotateCcw className="w-8 h-8 text-stone-300 mx-auto" />
              <div className="text-xs font-bold text-stone-700">Belum Ada Riwayat Restok</div>
              <p className="text-[11px] text-stone-400">
                Gunakan tombol "Restok +" di tab Produk Saya untuk menambah stok barang.
              </p>
            </div>
          ) : (
            <div className="bg-white border border-stone-200 divide-y divide-stone-100 shadow-xs">
              {restockLogs.map((log) => (
                <div key={log.id} className="p-3 flex items-start justify-between gap-3 text-xs">
                  <div>
                    <h5 className="font-bold text-stone-900 leading-tight">{log.productName}</h5>
                    <div className="flex items-center gap-1.5 text-[10px] text-stone-500 mt-1">
                      <Clock className="w-3 h-3 text-stone-400" />
                      <span>{log.date}</span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="inline-block bg-emerald-100 text-emerald-800 text-xs font-extrabold font-mono px-2 py-0.5 border border-emerald-300">
                      +{log.addedStock}
                    </span>
                    <div className="text-[10px] text-stone-500 font-mono mt-0.5">
                      Total: {log.newStock} pcs
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* MODAL 1: QUICK RESTOCK POPUP */}
      {restockTargetProduct && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-[360px] border border-stone-300 shadow-2xl p-4 space-y-3.5 animate-scale-up">
            <div className="flex items-center justify-between pb-2 border-b border-stone-100">
              <div className="flex items-center gap-2">
                <Boxes className="w-4 h-4 text-emerald-800" />
                <h4 className="text-xs font-bold text-stone-900">Restok Cepat Komoditas</h4>
              </div>
              <button
                onClick={() => setRestockTargetProduct(null)}
                className="text-stone-400 hover:text-stone-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div>
              <div className="text-xs font-bold text-stone-800 line-clamp-1">
                {restockTargetProduct.name}
              </div>
              <div className="flex items-center justify-between mt-1 text-[11px] text-stone-500">
                <span>Stok saat ini:</span>
                <strong className="font-mono text-stone-900">
                  {restockTargetProduct.stock} {restockTargetProduct.minOrder.split(' ')[1] || 'Unit'}
                </strong>
              </div>
            </div>

            {/* Quick Increment Preset Buttons */}
            <div>
              <label className="block text-[11px] font-bold text-stone-700 mb-1.5">
                Pilih Jumlah Tambahan:
              </label>
              <div className="grid grid-cols-4 gap-1.5">
                {[10, 25, 50, 100].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setRestockAmount(preset)}
                    className={`py-1 text-xs font-mono font-bold border transition-colors cursor-pointer ${
                      restockAmount === preset
                        ? 'bg-emerald-800 text-white border-emerald-950'
                        : 'bg-stone-50 text-stone-700 border-stone-300 hover:bg-stone-100'
                    }`}
                  >
                    +{preset}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Input */}
            <div>
              <label className="block text-[11px] font-bold text-stone-700 mb-1">
                Atau Ketik Jumlah Manual:
              </label>
              <input
                type="number"
                min="1"
                value={restockAmount}
                onChange={(e) => setRestockAmount(Math.max(1, parseInt(e.target.value, 10) || 0))}
                className="w-full bg-stone-50 border border-stone-300 p-2 text-xs font-mono font-bold text-stone-900 focus:outline-none focus:border-emerald-700"
              />
            </div>

            {/* Real-time Calculation Preview */}
            <div className="bg-emerald-50 border border-emerald-200 p-2.5 flex items-center justify-between text-xs">
              <span className="text-emerald-900 font-medium">Stok Baru Setelah Restok:</span>
              <strong className="text-emerald-900 font-black font-mono text-sm">
                {restockTargetProduct.stock + (Number(restockAmount) || 0)}
              </strong>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 pt-1">
              <button
                type="button"
                onClick={() => setRestockTargetProduct(null)}
                className="flex-1 py-2 text-xs font-semibold text-stone-600 bg-stone-100 hover:bg-stone-200 border border-stone-300"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleConfirmRestock}
                className="flex-1 py-2 text-xs font-bold text-white bg-emerald-800 hover:bg-emerald-900 border border-emerald-950 flex items-center justify-center gap-1"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Simpan Stok</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: UBAH HARGA POPUP */}
      {editPriceProduct && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-[360px] border border-stone-300 shadow-2xl p-4 space-y-3.5 animate-scale-up">
            <div className="flex items-center justify-between pb-2 border-b border-stone-100">
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-emerald-800" />
                <h4 className="text-xs font-bold text-stone-900">Ubah Harga Jual</h4>
              </div>
              <button
                onClick={() => setEditPriceProduct(null)}
                className="text-stone-400 hover:text-stone-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div>
              <div className="text-xs font-bold text-stone-800 line-clamp-1">
                {editPriceProduct.name}
              </div>
              <div className="text-[11px] text-stone-500 mt-1">
                Harga saat ini:{' '}
                <strong className="font-mono text-emerald-800">
                  Rp {editPriceProduct.price.toLocaleString('id-ID')}
                </strong>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-stone-700 mb-1">
                Harga Jual Baru (Rp):
              </label>
              <input
                type="number"
                min="1000"
                step="1000"
                value={newPrice}
                onChange={(e) => setNewPrice(e.target.value)}
                className="w-full bg-stone-50 border border-stone-300 p-2 text-xs font-mono font-bold text-stone-900 focus:outline-none focus:border-emerald-700"
              />
            </div>

            <div className="flex items-center gap-2 pt-1">
              <button
                type="button"
                onClick={() => setEditPriceProduct(null)}
                className="flex-1 py-2 text-xs font-semibold text-stone-600 bg-stone-100 hover:bg-stone-200 border border-stone-300"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleConfirmEditPrice}
                className="flex-1 py-2 text-xs font-bold text-white bg-emerald-800 hover:bg-emerald-900 border border-emerald-950 flex items-center justify-center gap-1"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Simpan Harga</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: TAMBAH ETALASE POPUP */}
      {isAddEtalaseModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <form
            onSubmit={handleCreateEtalase}
            className="bg-white w-full max-w-[340px] border border-stone-300 shadow-2xl p-4 space-y-3 animate-scale-up"
          >
            <div className="flex items-center justify-between pb-2 border-b border-stone-100">
              <div className="flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-emerald-800" />
                <h4 className="text-xs font-bold text-stone-900">Tambah Etalase Baru</h4>
              </div>
              <button
                type="button"
                onClick={() => setIsAddEtalaseModalOpen(false)}
                className="text-stone-400 hover:text-stone-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-stone-700 mb-1">
                Nama Etalase Toko:
              </label>
              <input
                type="text"
                required
                placeholder="Cth: Bibit Buah Unggul / Pakan Segar"
                value={newEtalaseName}
                onChange={(e) => setNewEtalaseName(e.target.value)}
                className="w-full bg-stone-50 border border-stone-300 p-2 text-xs text-stone-900 focus:outline-none focus:border-emerald-700"
              />
              <p className="text-[10px] text-stone-400 mt-1">
                Etalase akan langsung dapat dipilih saat menerbitkan produk.
              </p>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <button
                type="button"
                onClick={() => setIsAddEtalaseModalOpen(false)}
                className="flex-1 py-1.5 text-xs text-stone-600 bg-stone-100 border border-stone-300"
              >
                Batal
              </button>
              <button
                type="submit"
                className="flex-1 py-1.5 text-xs font-bold text-white bg-emerald-800 border border-emerald-950"
              >
                Simpan
              </button>
            </div>
          </form>
        </div>
      )}

      {/* MODAL 4: DELETE CONFIRMATION POPUP */}
      {deleteConfirmProduct && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-[340px] border border-stone-300 shadow-2xl p-4 space-y-3 animate-scale-up">
            <div className="flex items-center gap-2 text-rose-600">
              <Trash2 className="w-5 h-5" />
              <h4 className="text-xs font-bold text-stone-900">Hapus Produk Ini?</h4>
            </div>

            <p className="text-xs text-stone-600">
              Apakah Anda yakin ingin menghapus komoditas{' '}
              <strong>"{deleteConfirmProduct.name}"</strong> dari toko? Tindakan ini tidak dapat
              dibatalkan.
            </p>

            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => setDeleteConfirmProduct(null)}
                className="flex-1 py-1.5 text-xs text-stone-600 bg-stone-100 border border-stone-300 font-semibold"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={() => {
                  onDeleteProduct(deleteConfirmProduct.id);
                  showToast(`Produk "${deleteConfirmProduct.name.slice(0, 20)}..." telah dihapus`);
                  setDeleteConfirmProduct(null);
                }}
                className="flex-1 py-1.5 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 border border-rose-800"
              >
                Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
