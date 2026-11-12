import { useState } from 'react';
import {
  ArrowLeft,
  Share2,
  ShoppingCart,
  Star,
  MapPin,
  ShieldCheck,
  Truck,
  MessageCircle,
  Store,
  ChevronRight,
  Plus,
  Minus,
  Check,
  Send,
  X,
  Sparkles,
  ThumbsUp,
  Package,
  Calendar,
  Award,
} from 'lucide-react';
import { MobileProduct } from '../types';
import { MOBILE_PRODUCTS } from '../mobileData';

interface MobileProductDetailScreenProps {
  product: MobileProduct;
  onBack: () => void;
  onAddToCart: (product: MobileProduct, qty: number) => void;
  onBuyNow: (product: MobileProduct, qty: number) => void;
  onSelectOtherProduct: (product: MobileProduct) => void;
  cartCount: number;
  onGoToCart: () => void;
  allProducts?: MobileProduct[];
}

export default function MobileProductDetailScreen({
  product,
  onBack,
  onAddToCart,
  onBuyNow,
  onSelectOtherProduct,
  cartCount,
  onGoToCart,
  allProducts,
}: MobileProductDetailScreenProps) {
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState('Standard Grade');
  const [activeReviewFilter, setActiveReviewFilter] = useState('Semua');
  const [showChatModal, setShowChatModal] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'user' | 'seller'; text: string; time: string }>>([
    {
      sender: 'seller',
      text: `Halo kak! Selamat datang di ${product.supplier}. Ada yang bisa kami bantu mengenai ${product.name}? Stok panen hari ini segar dan bersertifikat.`,
      time: 'Baru saja',
    },
  ]);
  const [inputChat, setInputChat] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [helpfulReviews, setHelpfulReviews] = useState<Record<string, number>>({
    'rev-1': 14,
    'rev-2': 8,
    'rev-3': 21,
  });

  // Multiple high quality gallery images for the product
  const galleryImages = [
    product.imageUrl,
    '/src/assets/images/terniva_hero_landscape_1794449096818.jpg',
    '/src/assets/images/terniva_mitra_farmer_1794449097085.jpg',
    '/src/assets/images/terniva_ekspor_commodities_1794449097514.jpg',
  ];

  // Variants based on product category
  const variants = product.category === 'Peternakan'
    ? ['Bakalan Super (350-400 kg)', 'Siap Qurban / Potong (420-480 kg)', 'Jumbo Premium (500+ kg)']
    : product.category === 'Pakan'
    ? ['Kemasan 25 Kg', 'Kemasan 50 Kg (Sak)', 'Pallet 500 Kg']
    : ['Grade A Pilihan', 'Grade Ekspor Super', 'Kemasan Sample'];

  const catalogList = allProducts && allProducts.length > 0 ? allProducts : MOBILE_PRODUCTS;

  // Other products from same store
  const sameStoreProducts = catalogList.filter((p) => p.id !== product.id).slice(0, 3);

  // Relevant products from other stores
  const otherStoreProducts = catalogList.filter(
    (p) => p.id !== product.id && p.category === product.category
  ).concat(catalogList.filter((p) => p.id !== product.id && p.category !== product.category)).slice(0, 4);

  // Next product in list for continuous scrolling
  const currentIndex = catalogList.findIndex((p) => p.id === product.id);
  const nextProduct = catalogList[(currentIndex + 1) % catalogList.length];
  const prevProduct = catalogList[(currentIndex - 1 + catalogList.length) % catalogList.length];

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleSendChat = (text: string) => {
    if (!text.trim()) return;
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setChatMessages((prev) => [...prev, { sender: 'user', text, time: now }]);
    setInputChat('');

    // Simulated responsive seller reply after 800ms
    setTimeout(() => {
      let reply = `Siap kak, ${product.name} saat ini ready stok ${product.stock} unit. Pengiriman menggunakan cold storage langsung dari ${product.location}. Silakan langsung order!`;
      if (text.toLowerCase().includes('diskon') || text.toLowerCase().includes('grosir')) {
        reply = `Untuk pembelian di atas 5 unit ada potongan harga khusus mitra sebesar 5% kak, langsung otomatis terpotong di keranjang.`;
      } else if (text.toLowerCase().includes('video') || text.toLowerCase().includes('foto')) {
        reply = `Bisa kak, tim lapangan kami siap kirimkan foto dan video penimbangan timbang hidup sebelum dikirim.`;
      }
      setChatMessages((prev) => [...prev, { sender: 'seller', text: reply, time: 'Baru saja' }]);
    }, 800);
  };

  const reviewsData = [
    {
      id: 'rev-1',
      author: 'H. Sudirman (Restoran Daging Subang)',
      rating: 5,
      date: 'Kemarin, 14:20',
      variant: variants[0],
      comment:
        'Kualitas komoditas sangat bagus sesuai deskripsi. Tiba dalam kondisi segar, surat SKKH dan karantina lengkap. Bobot riil sesuai dengan data sensor timbangan.',
      avatarBg: 'bg-emerald-800',
    },
    {
      id: 'rev-2',
      author: 'Kelompok Tani Sejahtera',
      rating: 5,
      date: '3 hari yang lalu',
      variant: variants[1] || variants[0],
      comment:
        'Pelayanan seller sangat ramah lewat chat. Nanya-nanya dulu sebelum beli dibalas cepat dalam 2 menit. Packing aman dan kurir pendingin profesional.',
      avatarBg: 'bg-amber-700',
    },
    {
      id: 'rev-3',
      author: 'Agro Makmur Perkasa',
      rating: 4,
      date: '1 minggu yang lalu',
      variant: variants[0],
      comment:
        'Barang sampai tepat waktu di lokasi gudang. Kualitas komoditas grade A, wangi dan bersih. Akan reorder lagi untuk kebutuhan pasokan bulanan.',
      avatarBg: 'bg-teal-800',
    },
  ];

  const handleThumbsUp = (revId: string) => {
    setHelpfulReviews((prev) => ({
      ...prev,
      [revId]: (prev[revId] || 0) + 1,
    }));
    showToast('Terima kasih atas tanggapan Anda!');
  };

  return (
    <div className="bg-stone-100 min-h-full flex flex-col pb-20 select-none">
      {/* 1. Sticky Navigation Header (No rounded) */}
      <div className="sticky top-0 z-30 bg-white border-b border-stone-200 px-3 py-2.5 flex items-center justify-between shadow-xs">
        <button
          onClick={onBack}
          className="p-1 text-stone-800 hover:text-emerald-800 transition-colors"
          title="Kembali"
        >
          <ArrowLeft className="w-5 h-5 stroke-[2.2]" />
        </button>

        <div className="min-w-0 flex-1 px-3">
          <h2 className="text-xs font-bold text-stone-900 truncate">{product.name}</h2>
          <span className="text-[10px] text-stone-500 font-mono">ID: {product.id}</span>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => showToast('Tautan produk berhasil disalin!')}
            className="p-1.5 text-stone-600 hover:text-stone-900"
            title="Bagikan"
          >
            <Share2 className="w-4 h-4" />
          </button>

          <button
            onClick={onGoToCart}
            className="p-1.5 text-stone-600 hover:text-emerald-800 relative"
            title="Keranjang Belanja"
          >
            <ShoppingCart className="w-4 h-4" />
            {cartCount > 0 && (
              <span className="absolute 0 top-0.5 right-0.5 bg-rose-600 text-white text-[9px] font-bold px-1 font-mono leading-tight">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed top-14 left-1/2 -translate-x-1/2 z-50 bg-stone-900 text-white text-xs px-3.5 py-1.5 border border-stone-700 shadow-xl flex items-center gap-1.5 animate-fade-in pointer-events-none">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 2. Gallery Photos with Thumbnails (No rounded) */}
      <div className="bg-white border-b border-stone-200">
        {/* Main Photo Display */}
        <div className="relative aspect-[4/3] bg-stone-900 overflow-hidden">
          <img
            src={galleryImages[selectedImageIdx]}
            alt={product.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />

          {/* Photo Count Pill */}
          <div className="absolute bottom-3 right-3 bg-stone-950/80 text-white text-[10px] font-mono font-bold px-2 py-0.5 border border-stone-700">
            {selectedImageIdx + 1} / {galleryImages.length} Foto
          </div>

          {/* Provenance Badge */}
          <div className="absolute top-3 left-3 bg-emerald-800 text-white text-[9px] font-bold px-2 py-0.5 shadow-sm">
            {product.isVerified ? 'Terniva Verified · Siap Panen' : 'Mitra Terverifikasi'}
          </div>
        </div>

        {/* Thumbnail Selector Row */}
        <div className="flex items-center gap-2 p-2.5 overflow-x-auto no-scrollbar bg-stone-50 border-t border-stone-200">
          {galleryImages.map((imgUrl, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedImageIdx(idx)}
              className={`w-14 h-14 shrink-0 bg-stone-200 overflow-hidden border-2 transition-all ${
                selectedImageIdx === idx ? 'border-emerald-800' : 'border-stone-300 opacity-60'
              }`}
            >
              <img
                src={imgUrl}
                alt={`Thumbnail ${idx + 1}`}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {/* 3. Pricing, Title, Rating, & Location */}
      <div className="bg-white p-3.5 border-b border-stone-200 space-y-2">
        <div className="flex items-baseline gap-2">
          <span className="text-lg font-black text-emerald-800 font-mono">
            Rp {product.price.toLocaleString('id-ID')}
          </span>
          {product.originalPrice && (
            <span className="text-xs text-stone-400 line-through font-mono">
              Rp {product.originalPrice.toLocaleString('id-ID')}
            </span>
          )}
          {product.discountPercent && (
            <span className="bg-rose-600 text-white text-[9px] font-bold px-1.5 py-0.5">
              -{product.discountPercent}%
            </span>
          )}
        </div>

        <h1 className="text-sm font-bold text-stone-900 leading-snug">{product.name}</h1>

        <div className="flex items-center gap-3 text-xs text-stone-600 pt-0.5">
          <div className="flex items-center gap-1 font-mono">
            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span className="font-bold text-stone-900">{product.rating}</span>
            <span className="text-stone-400">({product.soldCount * 2} ulasan)</span>
          </div>
          <span className="text-stone-300">|</span>
          <span className="font-mono text-stone-700">Terjual {product.soldCount}</span>
          <span className="text-stone-300">|</span>
          <div className="flex items-center gap-1 text-[11px] text-stone-500">
            <MapPin className="w-3 h-3 text-stone-400 shrink-0" />
            <span className="truncate">{product.location}</span>
          </div>
        </div>
      </div>

      {/* 4. Variant Selection & Quantity Stepper */}
      <div className="bg-white p-3.5 border-b border-stone-200 space-y-3">
        <div>
          <span className="text-xs font-bold text-stone-900 block mb-1.5">Pilihan Varian / Ukuran</span>
          <div className="flex flex-wrap gap-2">
            {variants.map((v) => (
              <button
                key={v}
                onClick={() => setSelectedVariant(v)}
                className={`px-3 py-1.5 text-xs font-semibold border transition-colors ${
                  selectedVariant === v
                    ? 'bg-emerald-800 text-white border-emerald-800'
                    : 'bg-stone-50 text-stone-700 border-stone-300 hover:border-emerald-800'
                }`}
              >
                {v}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between pt-1">
          <div>
            <span className="text-xs font-bold text-stone-900 block">Jumlah Pemesanan</span>
            <span className="text-[10px] text-stone-500">
              Min. Order: <strong className="text-stone-800">{product.minOrder}</strong> · Stok:{' '}
              <strong className="text-stone-800">{product.stock}</strong>
            </span>
          </div>

          <div className="flex items-center border border-stone-300 bg-stone-50">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              disabled={quantity <= 1}
              className="p-1.5 text-stone-600 hover:text-stone-900 disabled:opacity-30"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="px-3 py-1 font-mono font-bold text-xs text-stone-900 min-w-[32px] text-center">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
              disabled={quantity >= product.stock}
              className="p-1.5 text-stone-600 hover:text-stone-900 disabled:opacity-30"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="bg-stone-50 p-2.5 border border-stone-200 flex items-center justify-between text-xs">
          <span className="text-stone-600">Subtotal Item:</span>
          <span className="font-mono font-bold text-emerald-800">
            Rp {(product.price * quantity).toLocaleString('id-ID')}
          </span>
        </div>
      </div>

      {/* 5. Trust & Shipping Assurances */}
      <div className="bg-white p-3.5 border-b border-stone-200 space-y-2 text-xs">
        <div className="flex items-start gap-2.5">
          <ShieldCheck className="w-4 h-4 text-emerald-800 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-stone-900">Garansi Proteksi Panen Terniva</span>
            <p className="text-[10px] text-stone-500 leading-tight mt-0.5">
              Jaminan 100% uang kembali jika komoditas cacat, susut berlebih, atau tidak sesuai uji laboratorium.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-2.5 pt-1 border-t border-stone-100">
          <Truck className="w-4 h-4 text-emerald-800 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-stone-900">Pengiriman Kargo Dingin (Cold Chain)</span>
            <p className="text-[10px] text-stone-500 leading-tight mt-0.5">
              Armada armada berpendingin suhu terjaga, estimasi 1-2 hari langsung sampai di lokasi Anda.
            </p>
          </div>
        </div>
      </div>

      {/* 6. Spesifikasi & Detail Produk */}
      <div className="bg-white p-3.5 border-b border-stone-200 space-y-3">
        <h3 className="text-xs font-bold text-stone-900 uppercase tracking-wide">Spesifikasi Komoditas</h3>
        <div className="grid grid-cols-2 gap-2 text-xs border border-stone-200 bg-stone-50 p-2.5">
          <div>
            <span className="text-stone-400 text-[10px] block">Kategori</span>
            <span className="font-semibold text-stone-800">{product.category}</span>
          </div>
          <div>
            <span className="text-stone-400 text-[10px] block">Asal Daerah</span>
            <span className="font-semibold text-stone-800">{product.location}</span>
          </div>
          <div>
            <span className="text-stone-400 text-[10px] block">Sertifikasi</span>
            <span className="font-semibold text-emerald-800">SKKH & Karantina Pertanian</span>
          </div>
          <div>
            <span className="text-stone-400 text-[10px] block">Kondisi</span>
            <span className="font-semibold text-stone-800">Panen Segar Terverifikasi</span>
          </div>
        </div>

        <div>
          <h4 className="text-xs font-bold text-stone-900 mb-1">Deskripsi Lengkap</h4>
          <p className="text-xs text-stone-700 leading-relaxed whitespace-pre-line">
            {product.description}
          </p>
          <div className="mt-2 text-[11px] text-stone-500 bg-stone-50 p-2 border border-stone-200 leading-tight">
            💡 <strong>Catatan Peternak / Petani:</strong> Pembelian grosir untuk horeka atau kemitraan ekspor dapat
            menggunakan fitur <em>Tanya Penjual</em> untuk koordinasi jadwal panen dan pengiriman khusus.
          </div>
        </div>
      </div>

      {/* 7. Toko / Penjual Card (Shopee Style) */}
      <div className="bg-white p-3.5 border-b border-stone-200 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-12 h-12 bg-emerald-900 text-white flex items-center justify-center font-bold text-sm">
              {product.supplier.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-stone-900">{product.supplier}</span>
                <span className="bg-emerald-800 text-white text-[8px] font-bold px-1">MITRA RESMI</span>
              </div>
              <span className="text-[10px] text-stone-500 block">{product.location}</span>
              <span className="text-[9px] text-emerald-700 font-medium">● Online 3 menit lalu</span>
            </div>
          </div>

          <button
            onClick={() => showToast(`Membuka profil toko ${product.supplier}...`)}
            className="px-2.5 py-1 text-xs font-semibold text-emerald-800 border border-emerald-800 hover:bg-emerald-50"
          >
            Kunjungi Toko
          </button>
        </div>

        <div className="grid grid-cols-3 gap-2 text-center text-xs pt-1 border-t border-stone-100">
          <div>
            <span className="text-[10px] text-stone-400 block">Rating Toko</span>
            <span className="font-mono font-bold text-stone-800">4.9 / 5.0</span>
          </div>
          <div>
            <span className="text-[10px] text-stone-400 block">Performa Chat</span>
            <span className="font-mono font-bold text-emerald-800">99% (Cepat)</span>
          </div>
          <div>
            <span className="text-[10px] text-stone-400 block">Total Produk</span>
            <span className="font-mono font-bold text-stone-800">24 Komoditas</span>
          </div>
        </div>
      </div>

      {/* 8. Penilaian & Review Pembeli (Komentar Orang, Rating, Review) */}
      <div className="bg-white p-3.5 border-b border-stone-200 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xs font-bold text-stone-900 uppercase tracking-wide">
              Penilaian Produk ({product.soldCount * 2})
            </h3>
            <div className="flex items-center gap-1.5 mt-0.5">
              <div className="flex text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-500" />
                ))}
              </div>
              <span className="font-bold text-xs text-stone-900 font-mono">{product.rating}</span>
              <span className="text-[10px] text-stone-400">dari 5.0</span>
            </div>
          </div>
          <button
            onClick={() => showToast('Memuat semua ulasan pembeli...')}
            className="text-[11px] font-semibold text-emerald-800"
          >
            Lihat Semua &gt;
          </button>
        </div>

        {/* Filter Chips for Reviews */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {['Semua', 'Dengan Foto (45)', 'Bintang 5 (112)', 'Bintang 4 (14)'].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveReviewFilter(filter)}
              className={`px-2.5 py-1 text-[11px] font-medium border whitespace-nowrap ${
                activeReviewFilter === filter
                  ? 'bg-emerald-800 text-white border-emerald-800 font-bold'
                  : 'bg-stone-50 text-stone-700 border-stone-200'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Review Cards List */}
        <div className="space-y-3 divide-y divide-stone-100">
          {reviewsData.map((rev) => (
            <div key={rev.id} className="pt-2.5 first:pt-0 space-y-1.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-7 h-7 ${rev.avatarBg} text-white font-bold flex items-center justify-center text-[10px]`}
                  >
                    {rev.author.slice(0, 1)}
                  </div>
                  <div>
                    <span className="text-xs font-bold text-stone-900 block leading-tight">{rev.author}</span>
                    <span className="text-[9px] text-stone-400">{rev.date} · Variasi: {rev.variant}</span>
                  </div>
                </div>

                <div className="flex text-amber-500">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-amber-500" />
                  ))}
                </div>
              </div>

              <p className="text-xs text-stone-700 leading-snug">{rev.comment}</p>

              <div className="flex items-center justify-between pt-1 text-[10px] text-stone-500">
                <span className="text-emerald-700 font-semibold">✓ Pembelian Terverifikasi</span>
                <button
                  onClick={() => handleThumbsUp(rev.id)}
                  className="flex items-center gap-1 text-stone-500 hover:text-emerald-800"
                >
                  <ThumbsUp className="w-3 h-3" />
                  <span>Membantu ({helpfulReviews[rev.id] || 0})</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 9. Produk Serupa dari Toko Sendiri (Same Store Recommendations) */}
      <div className="bg-white p-3.5 border-b border-stone-200 space-y-2.5">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wide">
              Produk Serupa dari Toko Ini
            </h4>
            <span className="text-[10px] text-stone-500">Pasokan lain dari {product.supplier}</span>
          </div>
          <span className="text-[11px] font-semibold text-emerald-800">Semua &gt;</span>
        </div>

        <div className="flex items-center gap-2.5 overflow-x-auto no-scrollbar pb-1">
          {sameStoreProducts.map((p) => (
            <div
              key={`same-${p.id}`}
              onClick={() => onSelectOtherProduct(p)}
              className="w-36 shrink-0 bg-stone-50 border border-stone-200 cursor-pointer hover:border-emerald-800 transition-colors p-2"
            >
              <div className="aspect-square bg-stone-200 mb-1.5 overflow-hidden">
                <img
                  src={p.imageUrl}
                  alt={p.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-[10px] font-bold text-stone-900 line-clamp-1">{p.name}</div>
              <div className="text-xs font-bold text-emerald-800 font-mono mt-0.5">
                Rp {p.price.toLocaleString('id-ID')}
              </div>
              <span className="text-[9px] text-stone-400 block mt-0.5">Min {p.minOrder}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 10. Rekomendasi Serupa dari Toko Lain yang Relevan */}
      <div className="bg-white p-3.5 border-b border-stone-200 space-y-2.5">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wide">
              Rekomendasi Serupa dari Toko Lain
            </h4>
            <span className="text-[10px] text-stone-500">Komoditas sejenis dengan harga kompetitif</span>
          </div>
          <span className="text-[11px] font-semibold text-emerald-800">Bandingkan &gt;</span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {otherStoreProducts.map((p) => (
            <div
              key={`other-${p.id}`}
              onClick={() => onSelectOtherProduct(p)}
              className="bg-stone-50 border border-stone-200 p-2 cursor-pointer hover:border-emerald-800 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="aspect-square bg-stone-200 mb-1.5 overflow-hidden">
                  <img
                    src={p.imageUrl}
                    alt={p.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-[10px] font-bold text-stone-900 line-clamp-2 leading-tight">
                  {p.name}
                </div>
              </div>
              <div className="mt-1.5">
                <div className="text-xs font-bold text-emerald-800 font-mono">
                  Rp {p.price.toLocaleString('id-ID')}
                </div>
                <div className="text-[9px] text-stone-500 truncate mt-0.5">{p.supplier}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 11. Quick Switch / Scroll ke Detail Produk Lainnya */}
      <div className="p-3.5 bg-stone-50 border-b border-stone-200 flex items-center justify-between">
        <button
          onClick={() => onSelectOtherProduct(prevProduct)}
          className="px-2.5 py-1.5 text-xs font-semibold text-stone-700 border border-stone-300 hover:border-emerald-800 bg-white"
        >
          &larr; Produk Sebelumnya
        </button>

        <span className="text-[10px] font-mono text-stone-500">
          {currentIndex + 1} dari {MOBILE_PRODUCTS.length}
        </span>

        <button
          onClick={() => onSelectOtherProduct(nextProduct)}
          className="px-2.5 py-1.5 text-xs font-semibold text-emerald-800 border border-emerald-800 hover:bg-emerald-50 bg-white"
        >
          Produk Berikutnya &rarr;
        </button>
      </div>

      {/* 12. Pinned Bottom Action Bar (Shopee Style: Chat Penjual, Keranjang, Beli Sekarang) */}
      <div className="fixed bottom-0 inset-x-0 z-40 bg-white border-t border-stone-200 flex items-stretch h-14 max-w-[412px] mx-auto shadow-xl">
        {/* Chat / Tanya Penjual Button */}
        <button
          onClick={() => setShowChatModal(true)}
          className="w-20 flex flex-col items-center justify-center border-r border-stone-200 text-stone-700 hover:text-emerald-800 bg-stone-50"
          title="Tanya Penjual Sebelum Beli"
        >
          <MessageCircle className="w-4 h-4 text-emerald-800" />
          <span className="text-[9px] font-bold mt-0.5">Chat Penjual</span>
        </button>

        {/* Add to Cart Button */}
        <button
          onClick={() => {
            onAddToCart(product, quantity);
            showToast(`+${quantity} ${product.name} masuk ke keranjang!`);
          }}
          className="flex-1 flex items-center justify-center gap-1.5 bg-amber-50 hover:bg-amber-100 text-amber-900 border-r border-stone-200 font-bold text-xs"
        >
          <ShoppingCart className="w-4 h-4 text-amber-700" />
          <span>+ Keranjang</span>
        </button>

        {/* Buy Now Direct Button */}
        <button
          onClick={() => onBuyNow(product, quantity)}
          className="flex-1 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs flex items-center justify-center transition-colors"
        >
          Beli Sekarang
        </button>
      </div>

      {/* 13. Interactive "Tanya-tanya Dulu Sebelum Beli" Chat Drawer (Shopee Style) */}
      {showChatModal && (
        <div className="fixed inset-0 z-50 bg-black/75 flex items-end">
          <div className="w-full max-w-[412px] mx-auto bg-white text-stone-900 h-[80vh] flex flex-col shadow-2xl border-t border-stone-200">
            {/* Chat Drawer Header */}
            <div className="p-3 bg-emerald-900 text-white flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <Store className="w-4 h-4 text-emerald-300" />
                <div>
                  <h4 className="text-xs font-bold leading-tight">{product.supplier}</h4>
                  <span className="text-[10px] text-emerald-200">● Online (Dibalas dalam beberapa menit)</span>
                </div>
              </div>
              <button
                onClick={() => setShowChatModal(false)}
                className="p-1 text-white/80 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Pinned Product Card in Chat */}
            <div className="p-2.5 bg-stone-50 border-b border-stone-200 flex items-center gap-2 shrink-0">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-11 h-11 object-cover bg-stone-200 shrink-0 border border-stone-300"
              />
              <div className="min-w-0 flex-1">
                <div className="text-[11px] font-bold text-stone-900 truncate">{product.name}</div>
                <div className="text-xs font-mono font-bold text-emerald-800 mt-0.5">
                  Rp {product.price.toLocaleString('id-ID')}
                </div>
              </div>
              <button
                onClick={() => handleSendChat(`Halo kak, saya mau tanya ketersediaan stok untuk ${product.name}`)}
                className="px-2 py-1 bg-emerald-800 text-white text-[10px] font-bold shrink-0"
              >
                Tanyakan Produk
              </button>
            </div>

            {/* Quick Inquiry Suggestion Chips */}
            <div className="p-2 bg-stone-100 border-b border-stone-200 flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0">
              {[
                'Apakah barang ready?',
                'Bisa minta foto/video stok real-time?',
                'Kapan estimasi panen & kirim?',
                'Ada potongan harga grosir?',
              ].map((q) => (
                <button
                  key={q}
                  onClick={() => handleSendChat(q)}
                  className="px-2.5 py-1 text-[10px] bg-white border border-stone-300 hover:border-emerald-800 whitespace-nowrap text-stone-700"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Chat Messages Body */}
            <div className="flex-1 overflow-y-auto p-3 space-y-2.5 bg-stone-100">
              {chatMessages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-2.5 text-xs ${
                      msg.sender === 'user'
                        ? 'bg-emerald-800 text-white'
                        : 'bg-white text-stone-900 border border-stone-200 shadow-xs'
                    }`}
                  >
                    <p className="leading-snug">{msg.text}</p>
                    <span
                      className={`text-[9px] font-mono block mt-1 text-right ${
                        msg.sender === 'user' ? 'text-emerald-200' : 'text-stone-400'
                      }`}
                    >
                      {msg.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendChat(inputChat);
              }}
              className="p-2.5 bg-white border-t border-stone-200 flex items-center gap-2 shrink-0"
            >
              <input
                type="text"
                placeholder="Tulis pertanyaan sebelum beli..."
                value={inputChat}
                onChange={(e) => setInputChat(e.target.value)}
                className="flex-1 px-3 py-2 text-xs bg-stone-50 border border-stone-300 focus:outline-none focus:border-emerald-800"
              />
              <button
                type="submit"
                disabled={!inputChat.trim()}
                className="p-2 bg-emerald-800 text-white disabled:opacity-40"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
