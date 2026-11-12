import React, { useState } from 'react';
import {
  X,
  Package,
  Truck,
  Star,
  MapPin,
  Copy,
  CheckCircle2,
  Phone,
  MessageCircle,
  Clock,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  Sparkles,
  RefreshCw,
  Camera,
  AlertCircle,
  Receipt,
  Download,
  Share2,
} from 'lucide-react';

export interface OrderItem {
  id: string;
  status: string;
  date: string;
  item: string;
  quantity: number;
  total: number;
  imageUrl?: string;
  supplier?: string;
  courier?: string;
  resi?: string;
  estArrival?: string;
  vaNumber?: string;
  vaBank?: string;
  deadline?: string;
  rated?: boolean;
  userRating?: number;
  userReview?: string;
}

// -------------------------------------------------------------
// 1. RINCIAN PESANAN (ORDER DETAIL MODAL)
// -------------------------------------------------------------
interface OrderDetailModalProps {
  order: OrderItem;
  onClose: () => void;
  onTrackOrder: (order: OrderItem) => void;
  onRateOrder: (order: OrderItem) => void;
  onShowToast: (msg: string) => void;
}

export const OrderDetailModal: React.FC<OrderDetailModalProps> = ({
  order,
  onClose,
  onTrackOrder,
  onRateOrder,
  onShowToast,
}) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Belum Bayar':
        return {
          bg: 'bg-rose-50 text-rose-800 border-rose-200',
          title: 'Menunggu Pembayaran',
          desc: `Selesaikan pembayaran sebelum ${order.deadline || '24 jam'}`,
        };
      case 'Dikemas':
        return {
          bg: 'bg-amber-50 text-amber-800 border-amber-200',
          title: 'Sedang Dikemas Penjual',
          desc: 'Penjual sedang menyiapkan barang dengan kemasan cold chain aman.',
        };
      case 'Dikirim':
        return {
          bg: 'bg-blue-50 text-blue-800 border-blue-200',
          title: 'Sedang Dalam Pengiriman',
          desc: `Estimasi tiba: ${order.estArrival || 'Besok sore'}`,
        };
      case 'Beri Nilai':
        return {
          bg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
          title: 'Pesanan Telah Diterima',
          desc: 'Beri ulasan dan dapatkan +25 Koin Panen!',
        };
      default:
        return {
          bg: 'bg-stone-50 text-stone-800 border-stone-200',
          title: status,
          desc: 'Transaksi Terniva',
        };
    }
  };

  const statusInfo = getStatusBadge(order.status);
  const subtotal = order.total - 25000;
  const shippingFee = 25000;

  return (
    <div className="fixed inset-0 z-50 bg-black/75 flex items-end sm:items-center justify-center p-0 sm:p-4 select-none">
      <div className="w-full max-w-[412px] bg-white text-stone-900 max-h-[90vh] flex flex-col shadow-2xl border border-stone-300 animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-3.5 bg-emerald-900 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <Receipt className="w-4 h-4 text-emerald-300" />
            <h4 className="text-xs font-bold uppercase tracking-wider">Rincian Pesanan</h4>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                navigator.clipboard?.writeText(order.id);
                onShowToast(`No. Pesanan ${order.id} berhasil disalin!`);
              }}
              title="Salin No. Pesanan"
              className="p-1 text-white/80 hover:text-white"
            >
              <Copy className="w-4 h-4" />
            </button>
            <button onClick={onClose} className="p-1 text-white/80 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-3.5 space-y-3 bg-stone-100 text-xs">
          {/* Status Banner */}
          <div className={`p-3 border ${statusInfo.bg}`}>
            <div className="flex items-center gap-2 font-bold text-xs mb-1">
              <Clock className="w-4 h-4" />
              <span>{statusInfo.title}</span>
            </div>
            <p className="text-[11px] leading-snug">{statusInfo.desc}</p>
          </div>

          {/* Courier & Tracking Shortcut (If Dikirim or Dikemas) */}
          {(order.status === 'Dikirim' || order.resi) && (
            <div className="bg-white p-3 border border-stone-200 shadow-2xs space-y-2">
              <div className="flex items-center justify-between pb-1.5 border-b border-stone-100">
                <div className="flex items-center gap-1.5 text-stone-700 font-bold">
                  <Truck className="w-4 h-4 text-emerald-700" />
                  <span>Informasi Pengiriman</span>
                </div>
                <button
                  onClick={() => onTrackOrder(order)}
                  className="text-[11px] font-bold text-emerald-800 hover:underline flex items-center gap-0.5"
                >
                  <span>Lacak Paket</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="text-[11px] space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-stone-500">Kurir:</span>
                  <span className="font-semibold text-stone-800">{order.courier || 'JNE Agri Cargo Dingin'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-stone-500">Nomor Resi:</span>
                  <div className="flex items-center gap-1">
                    <span className="font-mono font-bold text-stone-900">{order.resi || 'JNE-AGRI-8829104'}</span>
                    <button
                      onClick={() => {
                        navigator.clipboard?.writeText(order.resi || 'JNE-AGRI-8829104');
                        onShowToast('Nomor resi berhasil disalin!');
                      }}
                      className="text-emerald-700 hover:text-emerald-900 p-0.5"
                    >
                      <Copy className="w-3 h-3" />
                    </button>
                  </div>
                </div>
                <div className="text-[10px] text-stone-600 bg-stone-50 p-2 border border-stone-200 mt-1">
                  📍 Posisi: Paket sedang diantar oleh kurir menuju alamat Anda.
                </div>
              </div>
            </div>
          )}

          {/* Shipping Address */}
          <div className="bg-white p-3 border border-stone-200 shadow-2xs space-y-1.5">
            <div className="flex items-center gap-1.5 text-stone-700 font-bold pb-1 border-b border-stone-100">
              <MapPin className="w-4 h-4 text-rose-600" />
              <span>Alamat Pengiriman</span>
            </div>
            <div className="text-[11px] text-stone-700 space-y-0.5 pt-0.5">
              <div className="font-bold text-stone-900">Budi Santoso · 081234567890</div>
              <div className="text-stone-600 leading-relaxed">
                Jl. M.H. Thamrin No. 45, Menteng, Jakarta Pusat, DKI Jakarta (10350)
              </div>
              <span className="inline-block text-[9px] bg-stone-100 text-stone-600 font-semibold px-1.5 py-0.2 mt-1">
                Alamat Utama (Restoran & Kantor)
              </span>
            </div>
          </div>

          {/* Product Items Card */}
          <div className="bg-white p-3 border border-stone-200 shadow-2xs space-y-2">
            <div className="flex items-center justify-between pb-1.5 border-b border-stone-100">
              <div className="flex items-center gap-1 text-stone-700 font-bold">
                <Package className="w-4 h-4 text-emerald-800" />
                <span>{order.supplier || 'Mitra Petani & Peternak Terniva'}</span>
              </div>
              <span className="text-[10px] text-stone-400 font-mono">{order.id}</span>
            </div>

            <div className="flex gap-2.5 pt-1">
              <div className="w-16 h-16 bg-stone-100 border border-stone-200 shrink-0 overflow-hidden flex items-center justify-center">
                {order.imageUrl ? (
                  <img src={order.imageUrl} alt={order.item} className="w-full h-full object-cover" />
                ) : (
                  <Package className="w-7 h-7 text-stone-400" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h5 className="font-bold text-stone-900 text-xs leading-snug line-clamp-2">
                  {order.item}
                </h5>
                <div className="text-[10px] text-stone-500 mt-1 flex items-center justify-between">
                  <span>Jumlah: {order.quantity} item</span>
                  <span className="font-mono font-bold text-stone-900 text-xs">
                    Rp {subtotal.toLocaleString('id-ID')}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Summary */}
          <div className="bg-white p-3 border border-stone-200 shadow-2xs space-y-2">
            <div className="flex items-center justify-between pb-1 border-b border-stone-100">
              <span className="font-bold text-stone-800">Rincian Pembayaran</span>
              <span className="text-[10px] text-emerald-700 font-bold">
                {order.vaBank || 'TernivaPay Saldo'}
              </span>
            </div>

            <div className="text-[11px] space-y-1.5 text-stone-600">
              <div className="flex justify-between">
                <span>Subtotal Produk:</span>
                <span className="font-mono font-medium text-stone-900">
                  Rp {subtotal.toLocaleString('id-ID')}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Total Ongkos Kirim:</span>
                <span className="font-mono font-medium text-stone-900">
                  Rp {shippingFee.toLocaleString('id-ID')}
                </span>
              </div>
              <div className="flex justify-between text-emerald-700">
                <span>Diskon Voucher Mitra:</span>
                <span className="font-mono font-medium">-Rp 0</span>
              </div>
              <div className="pt-1.5 border-t border-stone-200 flex justify-between font-bold text-stone-900 text-xs">
                <span>Total Pembayaran:</span>
                <span className="font-mono text-emerald-800 text-sm">
                  Rp {order.total.toLocaleString('id-ID')}
                </span>
              </div>
            </div>
          </div>

          {/* Order Metadata */}
          <div className="bg-white p-3 border border-stone-200 text-[10px] text-stone-500 space-y-1">
            <div className="flex justify-between">
              <span>Waktu Pemesanan:</span>
              <span>{order.date}</span>
            </div>
            <div className="flex justify-between">
              <span>No. Transaksi:</span>
              <span className="font-mono text-stone-700">{order.id}</span>
            </div>
            <div className="flex justify-between">
              <span>Garansi Proteksi:</span>
              <span className="text-emerald-700 font-bold">100% Bebas Risiko & Segar</span>
            </div>
          </div>
        </div>

        {/* Action Bottom Bar */}
        <div className="p-3 bg-white border-t border-stone-200 flex items-center justify-end gap-2 shrink-0">
          <button
            onClick={() => {
              onShowToast('Invoice PDF pesanan telah diunduh ke perangkat Anda.');
            }}
            className="py-2 px-3 border border-stone-300 text-stone-700 font-bold text-xs flex items-center gap-1 hover:bg-stone-50"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Invoice</span>
          </button>

          {order.status === 'Dikirim' && (
            <button
              onClick={() => onTrackOrder(order)}
              className="py-2 px-4 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs flex items-center gap-1.5"
            >
              <Truck className="w-3.5 h-3.5" />
              <span>Lacak Paket</span>
            </button>
          )}

          {order.status === 'Beri Nilai' && (
            <button
              onClick={() => onRateOrder(order)}
              className="py-2 px-4 bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs flex items-center gap-1.5"
            >
              <Star className="w-3.5 h-3.5 fill-white" />
              <span>Beri Nilai & Bintang</span>
            </button>
          )}

          {order.status === 'Belum Bayar' && (
            <button
              onClick={() => {
                navigator.clipboard?.writeText(order.vaNumber || '88029182910291');
                onShowToast(`Nomor Virtual Account ${order.vaNumber || '88029182910291'} berhasil disalin!`);
              }}
              className="py-2 px-4 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs"
            >
              Bayar Sekarang
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// 2. LACAK PENGIRIMAN (LIVE TRACKING MODAL)
// -------------------------------------------------------------
interface OrderTrackingModalProps {
  order: OrderItem;
  onClose: () => void;
  onShowToast: (msg: string) => void;
}

export const OrderTrackingModal: React.FC<OrderTrackingModalProps> = ({
  order,
  onClose,
  onShowToast,
}) => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const trackingTimeline = [
    {
      time: 'Hari ini, 13:45 WIB',
      title: 'Paket Sedang Diantar ke Alamat Tujuan',
      desc: 'Kurir Pak Slamet Riyadi (JNE Cargo Dingin) sedang menuju ke Jl. M.H. Thamrin No. 45, Menteng.',
      isCurrent: true,
    },
    {
      time: 'Hari ini, 08:30 WIB',
      title: 'Tiba di Hub Transit Jakarta Pusat (DC Menteng)',
      desc: 'Paket masuk ke fasilitas pendingin cold-chain transit hub.',
      isCurrent: false,
    },
    {
      time: 'Kemarin, 21:00 WIB',
      title: 'Berangkat dari Pusat Distribusi Pasuruan / Boyolali',
      desc: 'Paket dalam perjalanan darat via truk refrigerated cargo.',
      isCurrent: false,
    },
    {
      time: 'Kemarin, 15:20 WIB',
      title: 'Diserahkan oleh Penjual ke Drop Point JNE Agri Cargo',
      desc: 'Pengecekan temperatur produk cold-chain: OK (4°C).',
      isCurrent: false,
    },
    {
      time: '9 Mei 2026, 11:00 WIB',
      title: 'Pesanan Selesai Dikemas oleh Petani / Peternak Mitra',
      desc: 'Kemasan vakum & styrofoam box ber-icepack siap dikirim.',
      isCurrent: false,
    },
    {
      time: '9 Mei 2026, 09:15 WIB',
      title: 'Pembayaran Diverifikasi & Pesanan Diterima',
      desc: 'Pembayaran diverifikasi secara otomatis oleh sistem Terniva.',
      isCurrent: false,
    },
  ];

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      onShowToast('Status pengiriman telah diperbarui (Realtime GPS OK)');
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 flex items-end sm:items-center justify-center p-0 sm:p-4 select-none">
      <div className="w-full max-w-[412px] bg-white text-stone-900 max-h-[90vh] flex flex-col shadow-2xl border border-stone-300 animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-3.5 bg-emerald-900 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <Truck className="w-4 h-4 text-emerald-300" />
            <h4 className="text-xs font-bold uppercase tracking-wider">Lacak Pengiriman Paket</h4>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              title="Segarkan Tracking"
              className="p-1 text-white/80 hover:text-white"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-amber-300' : ''}`} />
            </button>
            <button onClick={onClose} className="p-1 text-white/80 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-3.5 space-y-3 bg-stone-100 text-xs">
          {/* Waybill / Courier Header */}
          <div className="bg-white p-3 border border-stone-200 shadow-2xs space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] text-stone-500 uppercase tracking-wider block">Ekspedisi:</span>
                <span className="font-bold text-stone-900 text-xs">JNE Agri Cargo Dingin (Cold-Chain)</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-stone-500 uppercase tracking-wider block">No. Resi:</span>
                <div className="flex items-center gap-1 font-mono font-bold text-emerald-800">
                  <span>{order.resi || 'JNE-AGRI-8829104'}</span>
                  <button
                    onClick={() => {
                      navigator.clipboard?.writeText(order.resi || 'JNE-AGRI-8829104');
                      onShowToast('Nomor resi berhasil disalin!');
                    }}
                    className="p-0.5 text-stone-500 hover:text-stone-900"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Courier Driver Contact Box */}
            <div className="p-2.5 bg-emerald-50 border border-emerald-200 flex items-center justify-between mt-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-emerald-800 text-white flex items-center justify-center font-bold text-xs">
                  S
                </div>
                <div>
                  <div className="font-bold text-stone-900 text-xs">Slamet Riyadi</div>
                  <span className="text-[10px] text-emerald-700">Kurir Pengantar · Dedicated Driver</span>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => onShowToast('Menghubungkan telepon ke Kurir Pak Slamet (0812-3499-8811)...')}
                  className="p-1.5 bg-white border border-emerald-300 text-emerald-800 hover:bg-emerald-100"
                  title="Telepon Kurir"
                >
                  <Phone className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => onShowToast('Membuka chat WhatsApp dengan Kurir Pak Slamet...')}
                  className="p-1.5 bg-emerald-800 text-white hover:bg-emerald-900"
                  title="Chat Kurir"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Real-time Status Card */}
          <div className="bg-emerald-900 text-white p-3 space-y-1 shadow-xs">
            <span className="text-[10px] text-emerald-300 uppercase tracking-wider font-bold">Status Terkini:</span>
            <div className="font-bold text-sm">Paket Sedang Diantar ke Alamat Anda</div>
            <p className="text-[11px] text-emerald-100 leading-snug">
              Estimasi tiba hari ini sekitar pukul <span className="font-bold text-amber-300">16:30 WIB</span>. Pastikan penerima siap di lokasi.
            </p>
          </div>

          {/* Timeline Checkpoints */}
          <div className="bg-white p-3.5 border border-stone-200 shadow-2xs space-y-4">
            <h5 className="font-bold text-stone-900 text-xs pb-1.5 border-b border-stone-100">
              Riwayat Perjalanan Paket
            </h5>

            <div className="relative pl-6 space-y-4 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-stone-200">
              {trackingTimeline.map((item, idx) => (
                <div key={idx} className="relative">
                  {/* Timeline Dot */}
                  <div
                    className={`absolute -left-6 top-1 w-4 h-4 rounded-full flex items-center justify-center border-2 ${
                      item.isCurrent
                        ? 'bg-emerald-600 border-white ring-4 ring-emerald-100'
                        : 'bg-stone-300 border-white'
                    }`}
                  >
                    {item.isCurrent && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                  </div>

                  {/* Text Item */}
                  <div>
                    <span className="text-[10px] text-stone-400 font-mono block">{item.time}</span>
                    <h6 className={`font-bold text-xs mt-0.5 ${item.isCurrent ? 'text-emerald-800' : 'text-stone-800'}`}>
                      {item.title}
                    </h6>
                    <p className="text-[11px] text-stone-600 leading-relaxed mt-0.5">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 bg-white border-t border-stone-200 flex justify-between items-center shrink-0">
          <span className="text-[10px] text-stone-500">Live GPS Update · Terverifikasi</span>
          <button
            onClick={onClose}
            className="py-2 px-5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// 3. BERI BINTANG & ULASAN (ORDER RATING MODAL)
// -------------------------------------------------------------
interface OrderRatingModalProps {
  order: OrderItem;
  onClose: () => void;
  onSubmitRating: (orderId: string, rating: number, review: string) => void;
}

export const OrderRatingModal: React.FC<OrderRatingModalProps> = ({
  order,
  onClose,
  onSubmitRating,
}) => {
  const [productRating, setProductRating] = useState(5);
  const [courierRating, setCourierRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>(['Kualitas Segar', 'Packing Rapi & Dingin']);
  const [hasPhoto, setHasPhoto] = useState(false);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const quickTags = [
    'Kualitas Segar',
    'Packing Rapi & Dingin',
    'Pengiriman Cepat',
    'Sesuai Deskripsi',
    'Respon Penjual Ramah',
    'Harga Bersahabat',
  ];

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const getRatingLabel = (score: number) => {
    switch (score) {
      case 5:
        return 'Sangat Puas ⭐⭐⭐⭐⭐';
      case 4:
        return 'Puas ⭐⭐⭐⭐';
      case 3:
        return 'Cukup ⭐⭐⭐';
      case 2:
        return 'Kurang Puas ⭐⭐';
      case 1:
        return 'Sangat Kecewa ⭐';
      default:
        return '';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      const fullReview = reviewText
        ? `${reviewText} (${selectedTags.join(', ')})`
        : `Ulasan Bintang 5: ${selectedTags.join(', ')}`;
      onSubmitRating(order.id, productRating, fullReview);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 flex items-end sm:items-center justify-center p-0 sm:p-4 select-none">
      <div className="w-full max-w-[412px] bg-white text-stone-900 max-h-[90vh] flex flex-col shadow-2xl border border-stone-300 animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-3.5 bg-emerald-900 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-amber-300 fill-amber-300" />
            <h4 className="text-xs font-bold uppercase tracking-wider">Beri Nilai & Bintang</h4>
          </div>
          <button onClick={onClose} className="p-1 text-white/80 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-3.5 space-y-3.5 bg-stone-100 text-xs">
          {/* Product Summary */}
          <div className="bg-white p-3 border border-stone-200 shadow-2xs flex items-center gap-3">
            <div className="w-14 h-14 bg-stone-100 border border-stone-200 shrink-0 overflow-hidden flex items-center justify-center">
              {order.imageUrl ? (
                <img src={order.imageUrl} alt={order.item} className="w-full h-full object-cover" />
              ) : (
                <Package className="w-6 h-6 text-stone-400" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h5 className="font-bold text-stone-900 text-xs leading-snug line-clamp-2">
                {order.item}
              </h5>
              <span className="text-[10px] text-stone-500 block mt-0.5 font-mono">
                No: {order.id}
              </span>
            </div>
          </div>

          {/* Reward Prompt */}
          <div className="p-2.5 bg-amber-50 border border-amber-200 text-amber-900 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
            <p className="text-[11px] leading-snug">
              Beri ulasan dan dapatkan <strong className="font-bold text-amber-900">+25 Koin Panen</strong> gratis!
            </p>
          </div>

          {/* Star Rating Section: Kualitas Produk */}
          <div className="bg-white p-3.5 border border-stone-200 shadow-2xs space-y-2 text-center">
            <span className="text-xs font-bold text-stone-800 block">Kualitas Produk</span>
            
            {/* 5 Star Buttons */}
            <div className="flex justify-center gap-2 py-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setProductRating(star)}
                  className="p-1 transition-transform hover:scale-110 active:scale-95 cursor-pointer"
                >
                  <Star
                    className={`w-7 h-7 ${
                      star <= productRating
                        ? 'text-amber-400 fill-amber-400'
                        : 'text-stone-300'
                    }`}
                  />
                </button>
              ))}
            </div>

            <span className="text-xs font-bold text-amber-800 block">
              {getRatingLabel(productRating)}
            </span>
          </div>

          {/* Courier Service Rating */}
          <div className="bg-white p-3 border border-stone-200 shadow-2xs flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-stone-800 block">Pelayanan Kurir & Pengiriman</span>
              <span className="text-[10px] text-stone-500">Ketepatan waktu dan kondisi kemasan</span>
            </div>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setCourierRating(star)}
                  className="p-0.5 hover:scale-110 transition-transform cursor-pointer"
                >
                  <Star
                    className={`w-4 h-4 ${
                      star <= courierRating ? 'text-amber-400 fill-amber-400' : 'text-stone-300'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Quick Review Tags */}
          <div className="bg-white p-3.5 border border-stone-200 shadow-2xs space-y-2">
            <span className="text-xs font-bold text-stone-800 block">Pilih Deskripsi Cepat:</span>
            <div className="flex flex-wrap gap-1.5">
              {quickTags.map((tag) => {
                const isSelected = selectedTags.includes(tag);
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleTag(tag)}
                    className={`px-2.5 py-1 text-[11px] font-semibold transition-colors cursor-pointer border ${
                      isSelected
                        ? 'bg-emerald-800 text-white border-emerald-800'
                        : 'bg-stone-50 text-stone-700 border-stone-200 hover:border-emerald-600'
                    }`}
                  >
                    {isSelected ? '✓ ' : '+ '} {tag}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Review Textarea */}
          <div className="bg-white p-3.5 border border-stone-200 shadow-2xs space-y-1.5">
            <label className="text-xs font-bold text-stone-800 block">
              Tulis Ulasan Anda (Opsional):
            </label>
            <textarea
              rows={3}
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Ceritakan pengalaman Anda, kualitas hasil panen/pakan, ketepatan cold chain..."
              className="w-full p-2.5 bg-stone-50 border border-stone-300 text-xs font-medium focus:bg-white focus:border-emerald-600 focus:outline-hidden resize-none"
            />

            {/* Photo Attachment Simulation */}
            <div className="pt-1 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setHasPhoto(!hasPhoto)}
                className={`py-1.5 px-3 border text-[11px] font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                  hasPhoto
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                    : 'bg-stone-50 text-stone-700 border-stone-300 hover:bg-stone-100'
                }`}
              >
                <Camera className="w-3.5 h-3.5" />
                <span>{hasPhoto ? '✓ 1 Foto Terlampir' : '+ Lampirkan Foto Produk'}</span>
              </button>

              <label className="flex items-center gap-1.5 cursor-pointer text-[10px] text-stone-600">
                <input
                  type="checkbox"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                  className="rounded text-emerald-800"
                />
                <span>Kirim secara Anonim</span>
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-1">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-emerald-800 hover:bg-emerald-900 active:scale-[0.99] text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-75"
            >
              {isSubmitting ? (
                'Mengirim Ulasan...'
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Kirim Penilaian & Klaim 25 Koin</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
