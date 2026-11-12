import { useState } from 'react';
import {
  User,
  Settings,
  Receipt,
  Package,
  Truck,
  Star,
  RotateCcw,
  Eye,
  Sprout,
  MapPin,
  HelpCircle,
  ChevronRight,
  LogOut,
  CreditCard,
  ShieldCheck,
  Heart,
  Bell,
  CheckCircle2,
  X,
  Plus,
  ArrowRight,
  Copy,
  ExternalLink,
  MessageCircle,
  Phone,
  Ticket,
  Coins,
  Wallet,
  Clock,
  Sparkles,
  Camera,
  Check,
  AlertCircle,
  ShoppingBag,
  Globe,
  Building2,
  Trash2,
  Store,
} from 'lucide-react';
import { MOBILE_PRODUCTS } from '../mobileData';
import { MobileProduct } from '../types';
import {
  OrderDetailModal,
  OrderTrackingModal,
  OrderRatingModal,
  OrderItem,
} from './MobileOrderModals';
import {
  ChangePinModal,
  ChangePasswordModal,
  SecureEditProfileModal,
} from './MobileSecurityModals';
import {
  AddAddressModal,
  AddBankAccountModal,
  AddressItem,
  BankAccountItem,
  ExportSubmissionItem,
  ExportSubmissionDetailModal,
  NewExportSubmissionModal,
  INITIAL_EXPORT_SUBMISSIONS,
} from './MobileAddressBankModals';
import {
  MobileTitipTaniMonitoringModal,
  SAMPLE_TITIP_PROGRAM,
} from './MobileTitipTaniMonitoringModal';

interface MobileAccountScreenProps {
  onNavigateToOrders?: (status: string) => void;
  onSelectProduct?: (product: MobileProduct) => void;
  onLogout?: () => void;
  onOpenSellerCenter?: () => void;
  sellerProductsCount?: number;
}

export default function MobileAccountScreen({
  onNavigateToOrders,
  onSelectProduct,
  onLogout,
  onOpenSellerCenter,
  sellerProductsCount,
}: MobileAccountScreenProps) {
  // Modal states
  type ModalType =
    | null
    | 'orders'
    | 'wallet'
    | 'coins'
    | 'vouchers'
    | 'pantau_panen'
    | 'konsultasi'
    | 'wishlist'
    | 'address'
    | 'bank'
    | 'security'
    | 'notif_settings'
    | 'help'
    | 'edit_profile'
    | 'logout';

  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [selectedOrderStatusTab, setSelectedOrderStatusTab] = useState('Semua');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Security PIN and Password States
  const [userPin, setUserPin] = useState('123456');
  const [isChangePinOpen, setIsChangePinOpen] = useState(false);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);

  // Address & Bank Add Modals State
  const [isAddAddressOpen, setIsAddAddressOpen] = useState(false);
  const [isAddBankAccountOpen, setIsAddBankAccountOpen] = useState(false);

  // Export Submissions to Exporters State
  const [activeOrderCategory, setActiveOrderCategory] = useState<'marketplace' | 'ekspor'>('marketplace');
  const [exportSubmissions, setExportSubmissions] = useState<ExportSubmissionItem[]>(INITIAL_EXPORT_SUBMISSIONS);
  const [selectedExportDetail, setSelectedExportDetail] = useState<ExportSubmissionItem | null>(null);
  const [isNewExportSubmissionOpen, setIsNewExportSubmissionOpen] = useState(false);
  const [selectedExportStatusTab, setSelectedExportStatusTab] = useState('Semua');

  // Titip Tani IoT & CCTV Monitoring State
  const [isTitipMonitoringOpen, setIsTitipMonitoringOpen] = useState(false);

  // User Profile State
  const [profileData, setProfileData] = useState({
    name: 'Budi Santoso',
    businessName: 'Nusantara Agri & Resto',
    phone: '081234567890',
    email: 'budi.santoso@nusantaraagri.com',
    memberId: 'TRN-ID-882190',
    joinDate: 'Maret 2025',
  });

  // Wallet & Koin State
  const [balance, setBalance] = useState(4250000);
  const [coins, setCoins] = useState(1450);
  const [hasClaimedDaily, setHasClaimedDaily] = useState(false);
  const [topUpAmount, setTopUpAmount] = useState('500000');

  // Address State
  const [addresses, setAddresses] = useState<AddressItem[]>([
    {
      id: 'addr-1',
      label: 'Alamat Utama (Restoran & Kantor)',
      recipient: 'Budi Santoso',
      phone: '081234567890',
      address: 'Jl. M.H. Thamrin No. 45, Menteng, Jakarta Pusat, DKI Jakarta (10350)',
      isDefault: true,
    },
    {
      id: 'addr-2',
      label: 'Gudang Logistik Subang',
      recipient: 'H. Sudirman (Kepala Gudang)',
      phone: '081398765432',
      address: 'Jl. Raya Pamanukan Km 12, Pabuaran, Kab. Subang, Jawa Barat (41261)',
      isDefault: false,
    },
  ]);

  // Bank Accounts State
  const [bankAccounts, setBankAccounts] = useState<BankAccountItem[]>([
    { id: 'bca-1', bank: 'Bank BCA', number: '8820-192-819', holder: 'BUDI SANTOSO', type: 'bank', isPrimary: true },
    { id: 'mandiri-1', bank: 'Bank Mandiri', number: '137-00-19283-91', holder: 'BUDI SANTOSO', type: 'bank', isPrimary: false },
  ]);

  // Notification Settings State
  const [notifSettings, setNotifSettings] = useState({
    iotAlert: true,
    transaksi: true,
    promoKilas: true,
    chatDokter: true,
    waUpdates: true,
  });

  // Security PIN State
  const [isPinActive, setIsPinActive] = useState(true);
  const [isBiometricActive, setIsBiometricActive] = useState(true);

  // Vouchers list
  const [vouchersList, setVouchersList] = useState([
    { id: 'v-1', code: 'ONGKIRFREE', title: 'Gratis Ongkir Kargo Dingin', desc: 'Min. Belanja Rp 200rb se-Pulau Jawa', exp: '31 Mei 2026' },
    { id: 'v-2', code: 'MITRAPANEN15', title: 'Diskon Panen Raya 15%', desc: 'Potongan hingga Rp 100.000 untuk komoditas segar', exp: '24 Mei 2026' },
    { id: 'v-3', code: 'PAKANHEMAT', title: 'Cashback 10% Koin Panen', desc: 'Khusus pembelian Pakan Sapi & Domba', exp: '15 Juni 2026' },
    { id: 'v-4', code: 'DOKTERFREE', title: 'Konsultasi Dokter Gratis', desc: 'Konsultasi dokter hewan/tanaman ber-SIP 100% gratis', exp: '30 Juni 2026' },
    { id: 'v-5', code: 'QURBANSUPER', title: 'Potongan Rp 500.000 Ternak Qurban', desc: 'Minimal pembelian 1 ekor sapi limousin', exp: '10 Juli 2026' },
  ]);

  // Order Modals selection states
  const [selectedOrderDetail, setSelectedOrderDetail] = useState<OrderItem | null>(null);
  const [selectedTrackingOrder, setSelectedTrackingOrder] = useState<OrderItem | null>(null);
  const [selectedRatingOrder, setSelectedRatingOrder] = useState<OrderItem | null>(null);

  // Orders list
  const [ordersList, setOrdersList] = useState<OrderItem[]>([
    {
      id: 'TRN-ORD-881902',
      status: 'Belum Bayar',
      date: 'Hari ini, 10:15 WIB',
      item: 'Sapi Potong Bakalan Limousin Cross (350-400 kg)',
      quantity: 1,
      total: 19525000,
      imageUrl: '/src/assets/images/terniva_mitra_farmer_1794449097085.jpg',
      supplier: 'Koperasi Ternak Mandiri Berkah (Boyolali)',
      vaNumber: '88029182910291',
      vaBank: 'BCA Virtual Account',
      deadline: '23 jam lagi',
    },
    {
      id: 'TRN-ORD-881745',
      status: 'Dikemas',
      date: 'Kemarin, 14:30 WIB',
      item: 'Konsentrat Pakan Sapi Penggemukan High Protein (50kg)',
      quantity: 2,
      total: 555000,
      imageUrl: '/src/assets/images/banner_hero_agritech_1794441148053.jpg',
      supplier: 'PT Agro Pakan Nutrisi (Pasuruan)',
      courier: 'JNE Agri Cargo Dingin',
    },
    {
      id: 'TRN-ORD-881209',
      status: 'Dikirim',
      date: '9 Mei 2026, 09:00 WIB',
      item: 'Kopi Arabika Gayo Green Beans Specialty (Grade 1)',
      quantity: 5,
      total: 700000,
      imageUrl: '/src/assets/images/terniva_ekspor_commodities_1794449097514.jpg',
      supplier: 'Koperasi Kopi Gayo Berseri (Aceh)',
      courier: 'JNE Agri Cargo Dingin',
      resi: 'JNE-AGRI-8829104',
      estArrival: 'Besok Sore, 16:30 WIB',
    },
    {
      id: 'TRN-ORD-880912',
      status: 'Beri Nilai',
      date: '5 Mei 2026',
      item: 'Pupuk Hayati Majemuk Organik Bio-Trichoderma (5 Liter)',
      quantity: 2,
      total: 215000,
      imageUrl: '/src/assets/images/banner_pantau_panen_1794441162382.jpg',
      supplier: 'Mitra Tani Organik Nusantara',
      courier: 'JNE Agri Cargo Dingin',
      resi: 'JNE-AGRI-8811209',
      rated: false,
    },
  ]);

  const handleRatingSubmit = (orderId: string, rating: number, review: string) => {
    setOrdersList((prev) =>
      prev.map((o) =>
        o.id === orderId
          ? { ...o, status: 'Beri Nilai', rated: true, userRating: rating, userReview: review }
          : o
      )
    );
    setCoins((c) => c + 25);
    setSelectedRatingOrder(null);
    showToast('Terima kasih! Ulasan bintang berhasil disimpan & +25 Koin Panen telah diklaim!');
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleClaimDailyCoins = () => {
    if (hasClaimedDaily) {
      showToast('Koin harian sudah Anda klaim hari ini!');
      return;
    }
    setCoins((c) => c + 50);
    setHasClaimedDaily(true);
    showToast('+50 Koin Panen berhasil diklaim ke akun Anda!');
  };

  const handleTopUpBalance = () => {
    const val = parseInt(topUpAmount, 10) || 500000;
    setBalance((b) => b + val);
    showToast(`Top up TernivaPay Rp ${val.toLocaleString('id-ID')} berhasil!`);
    setActiveModal(null);
  };

  const filteredOrders = ordersList.filter(
    (o) => selectedOrderStatusTab === 'Semua' || o.status === selectedOrderStatusTab
  );

  return (
    <div className="bg-stone-100 min-h-full flex flex-col pb-8 select-none">
      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed top-14 left-1/2 -translate-x-1/2 z-50 bg-stone-900 text-white text-xs px-3.5 py-1.5 border border-stone-700 shadow-xl flex items-center gap-1.5 animate-fade-in pointer-events-none">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. Profile Header in Terniva Green with Single Role: PENGGUNA */}
      <div className="bg-emerald-800 text-white p-4 pt-3 space-y-3 shadow-xs border-b border-emerald-900">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 bg-white flex items-center justify-center text-emerald-800 border border-emerald-700 shrink-0">
              <User className="w-8 h-8 stroke-[2.2]" />
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <h3 className="text-base font-bold text-white leading-tight truncate">
                  {profileData.name}
                </h3>
                <button
                  onClick={() => setActiveModal('edit_profile')}
                  className="text-[10px] text-emerald-200 underline hover:text-white"
                >
                  Edit
                </button>
              </div>
              <div className="text-[11px] text-emerald-100 font-mono mt-0.5">
                {profileData.memberId} · {profileData.businessName}
              </div>
              {/* Single Role: Pengguna Terverifikasi */}
              <div className="inline-flex items-center gap-1 mt-1 bg-white/20 px-2 py-0.5 text-[10px] font-bold text-white">
                <CheckCircle2 className="w-3 h-3 text-emerald-300" />
                <span>Pengguna Terverifikasi</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setActiveModal('edit_profile')}
            className="p-2 text-white/80 hover:text-white"
            title="Pengaturan Profil"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>

        {/* Saldo, Koin & Voucher Strip (All clickable & fully functional) */}
        <div className="bg-white p-3 shadow-xs flex items-center justify-around text-center text-stone-900 border border-stone-200">
          {/* TernivaPay Wallet Button */}
          <button
            onClick={() => setActiveModal('wallet')}
            className="flex-1 text-center hover:opacity-80 transition-opacity"
          >
            <div className="flex items-center justify-center gap-1 text-[10px] text-stone-500">
              <Wallet className="w-3 h-3 text-emerald-800" />
              <span>TernivaPay</span>
            </div>
            <span className="text-xs font-black text-emerald-800 font-mono mt-0.5 block truncate">
              Rp {balance.toLocaleString('id-ID')}
            </span>
            <span className="text-[9px] text-emerald-700 font-bold block mt-0.5">+ Top Up</span>
          </button>

          <div className="w-[1px] h-8 bg-stone-200" />

          {/* Koin Panen Button */}
          <button
            onClick={() => setActiveModal('coins')}
            className="flex-1 text-center hover:opacity-80 transition-opacity"
          >
            <div className="flex items-center justify-center gap-1 text-[10px] text-stone-500">
              <Coins className="w-3 h-3 text-amber-600" />
              <span>Koin Panen</span>
            </div>
            <span className="text-xs font-bold text-amber-600 font-mono mt-0.5 block truncate">
              {coins.toLocaleString('id-ID')} Koin
            </span>
            <span className="text-[9px] text-amber-700 font-bold block mt-0.5">Klaim Harian</span>
          </button>

          <div className="w-[1px] h-8 bg-stone-200" />

          {/* Voucher Saya Button */}
          <button
            onClick={() => setActiveModal('vouchers')}
            className="flex-1 text-center hover:opacity-80 transition-opacity"
          >
            <div className="flex items-center justify-center gap-1 text-[10px] text-stone-500">
              <Ticket className="w-3 h-3 text-rose-600" />
              <span>Voucher Saya</span>
            </div>
            <span className="text-xs font-bold text-stone-800 mt-0.5 block truncate">
              {vouchersList.length} Voucher
            </span>
            <span className="text-[9px] text-rose-700 font-bold block mt-0.5">Gunakan</span>
          </button>
        </div>
      </div>

      <div className="p-3 space-y-3">
        {/* TOKO SAYA (PUSAT PENJUAL) BANNER */}
        <div
          onClick={onOpenSellerCenter}
          className="bg-gradient-to-r from-emerald-900 to-emerald-800 text-white p-3.5 border border-emerald-950 shadow-xs cursor-pointer hover:from-emerald-800 hover:to-emerald-700 transition-all flex items-center justify-between group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/10 border border-white/20 flex items-center justify-center text-amber-300 shrink-0">
              <Store className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-white">Toko Saya (Pusat Penjual)</span>
                <span className="bg-amber-400 text-emerald-950 text-[9px] font-extrabold px-1.5 py-0.2">
                  Official Seller
                </span>
              </div>
              <p className="text-[10px] text-emerald-100 mt-0.5">
                {sellerProductsCount || 6} Produk Dijual · Tambah Etalase & Restok Cepat
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1 text-[11px] font-bold text-amber-300 group-hover:text-white transition-colors shrink-0">
            <span>Buka Toko</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>

        {/* 2. Status Pesanan Saya (Fully Functional Shopee order tracking bar) */}
        <div className="bg-white p-3.5 border border-stone-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between pb-1 border-b border-stone-100">
            <span className="text-xs font-bold text-stone-900">Pesanan Saya</span>
            <button
              onClick={() => {
                setSelectedOrderStatusTab('Semua');
                setActiveModal('orders');
              }}
              className="text-[11px] font-semibold text-emerald-800 flex items-center gap-0.5 hover:underline"
            >
              <span>Riwayat Transaksi</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-5 gap-1 text-center text-stone-700">
            <button
              onClick={() => {
                setSelectedOrderStatusTab('Belum Bayar');
                setActiveModal('orders');
              }}
              className="flex flex-col items-center group relative p-1 hover:bg-stone-50"
            >
              <div className="w-10 h-10 bg-stone-50 border border-stone-200 flex items-center justify-center text-stone-700 group-hover:text-emerald-800 transition-colors">
                <Receipt className="w-5 h-5" />
              </div>
              <span className="text-[10px] mt-1 font-medium leading-tight">Belum Bayar</span>
              <span className="absolute 0 top-0.5 right-1.5 bg-rose-600 text-white text-[9px] font-bold px-1 font-mono">
                1
              </span>
            </button>

            <button
              onClick={() => {
                setSelectedOrderStatusTab('Dikemas');
                setActiveModal('orders');
              }}
              className="flex flex-col items-center group p-1 hover:bg-stone-50"
            >
              <div className="w-10 h-10 bg-stone-50 border border-stone-200 flex items-center justify-center text-stone-700 group-hover:text-emerald-800 transition-colors">
                <Package className="w-5 h-5" />
              </div>
              <span className="text-[10px] mt-1 font-medium leading-tight">Dikemas</span>
            </button>

            <button
              onClick={() => {
                setSelectedOrderStatusTab('Dikirim');
                setActiveModal('orders');
              }}
              className="flex flex-col items-center group relative p-1 hover:bg-stone-50"
            >
              <div className="w-10 h-10 bg-stone-50 border border-stone-200 flex items-center justify-center text-stone-700 group-hover:text-emerald-800 transition-colors">
                <Truck className="w-5 h-5" />
              </div>
              <span className="text-[10px] mt-1 font-medium leading-tight">Dikirim</span>
              <span className="absolute 0 top-0.5 right-1.5 bg-emerald-700 text-white text-[9px] font-bold px-1 font-mono">
                1
              </span>
            </button>

            <button
              onClick={() => {
                setSelectedOrderStatusTab('Beri Nilai');
                setActiveModal('orders');
              }}
              className="flex flex-col items-center group p-1 hover:bg-stone-50"
            >
              <div className="w-10 h-10 bg-stone-50 border border-stone-200 flex items-center justify-center text-stone-700 group-hover:text-emerald-800 transition-colors">
                <Star className="w-5 h-5" />
              </div>
              <span className="text-[10px] mt-1 font-medium leading-tight">Beri Nilai</span>
            </button>

            <button
              onClick={() => {
                setSelectedOrderStatusTab('Semua');
                setActiveModal('orders');
              }}
              className="flex flex-col items-center group p-1 hover:bg-stone-50"
            >
              <div className="w-10 h-10 bg-stone-50 border border-stone-200 flex items-center justify-center text-stone-700 group-hover:text-emerald-800 transition-colors">
                <RotateCcw className="w-5 h-5" />
              </div>
              <span className="text-[10px] mt-1 font-medium leading-tight">Komplain</span>
            </button>
          </div>
        </div>

        {/* 3. Menu Aktivitas & Layanan Pengguna (All Fully Functional) */}
        <div className="bg-white p-3.5 border border-stone-200 shadow-xs space-y-1">
          <div className="text-xs font-bold text-stone-900 uppercase tracking-wide pb-1 border-b border-stone-100">
            Aktivitas & Layanan Saya
          </div>

          <div className="divide-y divide-stone-100 text-xs">
            {/* Toko Saya & Etalase */}
            <div
              onClick={onOpenSellerCenter}
              className="py-2.5 flex items-center justify-between text-stone-800 hover:text-emerald-800 cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <Store className="w-4 h-4 text-emerald-800" />
                <span className="font-semibold">Toko Saya (Kelola Produk & Etalase)</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="bg-emerald-100 text-emerald-900 text-[10px] font-bold px-1.5 py-0.5">
                  {sellerProductsCount || 6} Produk
                </span>
                <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
              </div>
            </div>

            {/* Pantau Panen Aktif */}
            <div
              onClick={() => setActiveModal('pantau_panen')}
              className="py-2.5 flex items-center justify-between text-stone-800 hover:text-emerald-800 cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <Eye className="w-4 h-4 text-emerald-800" />
                <span className="font-semibold">Titip Tani & Ternak Saya (Pantau Panen)</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-1.5 py-0.5">
                  2 Aktif
                </span>
                <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
              </div>
            </div>

            {/* Konsultasi Dokter Hewan & Tanaman */}
            <div
              onClick={() => setActiveModal('konsultasi')}
              className="py-2.5 flex items-center justify-between text-stone-800 hover:text-emerald-800 cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <Sprout className="w-4 h-4 text-emerald-800" />
                <span className="font-semibold">Konsultasi Dokter Hewan & Tanaman Saya</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-[10px] text-stone-400">2 Riwayat</span>
                <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
              </div>
            </div>

            {/* Wishlist / Favorit */}
            <div
              onClick={() => setActiveModal('wishlist')}
              className="py-2.5 flex items-center justify-between text-stone-800 hover:text-emerald-800 cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <Heart className="w-4 h-4 text-emerald-800" />
                <span className="font-semibold">Favorit & Wishlist Komoditas</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-stone-400 font-mono text-[11px]">3 Produk</span>
                <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
              </div>
            </div>

            {/* Daftar Alamat Pengiriman */}
            <div
              onClick={() => setActiveModal('address')}
              className="py-2.5 flex items-center justify-between text-stone-800 hover:text-emerald-800 cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-800" />
                <span className="font-semibold">Daftar Alamat Pengiriman</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-[10px] text-stone-400 font-mono">{addresses.length} Alamat</span>
                <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
              </div>
            </div>

            {/* Rekening Bank & Pembayaran */}
            <div
              onClick={() => setActiveModal('bank')}
              className="py-2.5 flex items-center justify-between text-stone-800 hover:text-emerald-800 cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <CreditCard className="w-4 h-4 text-emerald-800" />
                <span className="font-semibold">Rekening Bank & Pembayaran Instan</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-[10px] text-stone-400 font-mono">{bankAccounts.length} Rekening</span>
                <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
              </div>
            </div>
          </div>
        </div>

        {/* 4. Pengaturan Akun, Keamanan & Bantuan */}
        <div className="bg-white p-3.5 border border-stone-200 shadow-xs space-y-1">
          <div className="text-xs font-bold text-stone-900 uppercase tracking-wide pb-1 border-b border-stone-100">
            Pengaturan & Bantuan
          </div>

          <div className="divide-y divide-stone-100 text-xs">
            {/* Keamanan & PIN */}
            <div
              onClick={() => setActiveModal('security')}
              className="py-2.5 flex items-center justify-between text-stone-800 hover:text-emerald-800 cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-emerald-800" />
                <span className="font-semibold">Keamanan Akun & PIN TernivaPay</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-[10px] text-emerald-700 font-bold">Aman</span>
                <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
              </div>
            </div>

            {/* Notifikasi & Peringatan */}
            <div
              onClick={() => setActiveModal('notif_settings')}
              className="py-2.5 flex items-center justify-between text-stone-800 hover:text-emerald-800 cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <Bell className="w-4 h-4 text-emerald-800" />
                <span className="font-semibold">Notifikasi & Peringatan Panen</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
            </div>

            {/* Pusat Bantuan 24/7 */}
            <div
              onClick={() => setActiveModal('help')}
              className="py-2.5 flex items-center justify-between text-stone-800 hover:text-emerald-800 cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <HelpCircle className="w-4 h-4 text-emerald-800" />
                <span className="font-semibold">Pusat Bantuan & Layanan Pelanggan 24/7</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
            </div>

            {/* Keluar Akun */}
            <div
              onClick={() => setActiveModal('logout')}
              className="py-2.5 flex items-center justify-between text-rose-600 hover:text-rose-700 cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <LogOut className="w-4 h-4 text-rose-600" />
                <span className="font-semibold">Keluar Akun</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* MODAL 1: PESANAN SAYA & PENGAJUAN EKSPOR                        */}
      {/* ============================================================== */}
      {activeModal === 'orders' && (
        <div className="fixed inset-0 z-50 bg-black/75 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="w-full max-w-[420px] bg-white text-stone-900 max-h-[92vh] flex flex-col shadow-2xl border border-stone-300">
            <div className="p-3 bg-emerald-900 text-white flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <Package className="w-4 h-4 text-emerald-300" />
                <h4 className="text-xs font-bold">Riwayat Transaksi & Pengajuan</h4>
              </div>
              <button onClick={() => setActiveModal(null)} className="p-1 text-white/80 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Dua Tab Utama: Belanja Marketplace vs Pengajuan Ekspor */}
            <div className="grid grid-cols-2 bg-stone-100 border-b border-stone-200 text-xs font-bold shrink-0">
              <button
                onClick={() => setActiveOrderCategory('marketplace')}
                className={`py-2.5 text-center flex items-center justify-center gap-1.5 border-b-2 transition-colors ${
                  activeOrderCategory === 'marketplace'
                    ? 'border-emerald-800 text-emerald-900 bg-white'
                    : 'border-transparent text-stone-500 hover:text-stone-800'
                }`}
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Belanja Marketplace</span>
              </button>

              <button
                onClick={() => setActiveOrderCategory('ekspor')}
                className={`py-2.5 text-center flex items-center justify-center gap-1.5 border-b-2 transition-colors ${
                  activeOrderCategory === 'ekspor'
                    ? 'border-emerald-800 text-emerald-900 bg-white'
                    : 'border-transparent text-stone-500 hover:text-stone-800'
                }`}
              >
                <Globe className="w-3.5 h-3.5 text-emerald-700" />
                <span>Pengajuan Ekspor ({exportSubmissions.length})</span>
              </button>
            </div>

            {activeOrderCategory === 'marketplace' ? (
              <>
                {/* Status Tabs Marketplace */}
                <div className="p-2 bg-stone-50 border-b border-stone-200 flex items-center gap-1 overflow-x-auto no-scrollbar shrink-0">
                  {['Semua', 'Belum Bayar', 'Dikemas', 'Dikirim', 'Beri Nilai'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setSelectedOrderStatusTab(tab)}
                      className={`px-2.5 py-1 text-[11px] font-semibold border whitespace-nowrap ${
                        selectedOrderStatusTab === tab
                          ? 'bg-emerald-800 text-white border-emerald-800'
                          : 'bg-white text-stone-700 border-stone-300'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                {/* Orders List */}
                <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-stone-100">
                  {filteredOrders.length === 0 ? (
                    <div className="p-8 text-center text-stone-500 space-y-2 bg-white border border-stone-200">
                      <Package className="w-10 h-10 mx-auto text-stone-300" />
                      <p className="text-xs">Tidak ada pesanan pada status {selectedOrderStatusTab}.</p>
                    </div>
                  ) : (
                    filteredOrders.map((ord) => (
                      <div
                        key={ord.id}
                        className="bg-white border border-stone-200 p-3 space-y-2.5 shadow-2xs hover:border-emerald-700 transition-colors"
                      >
                        {/* Order Card Header */}
                        <div
                          onClick={() => setSelectedOrderDetail(ord)}
                          className="flex items-center justify-between text-xs pb-1.5 border-b border-stone-100 cursor-pointer"
                        >
                          <span className="font-mono font-bold text-stone-800 flex items-center gap-1">
                            <span>{ord.id}</span>
                            <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
                          </span>
                          <span
                            className={`px-2 py-0.5 text-[10px] font-bold border ${
                              ord.status === 'Belum Bayar'
                                ? 'bg-rose-50 text-rose-800 border-rose-200'
                                : ord.status === 'Dikirim'
                                ? 'bg-blue-50 text-blue-800 border-blue-200'
                                : ord.status === 'Beri Nilai'
                                ? 'bg-amber-50 text-amber-800 border-amber-200'
                                : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                            }`}
                          >
                            {ord.status}
                          </span>
                        </div>

                        {/* Order Item with Thumbnail Image */}
                        <div
                          onClick={() => setSelectedOrderDetail(ord)}
                          className="flex gap-2.5 cursor-pointer group"
                        >
                          <div className="w-14 h-14 bg-stone-100 border border-stone-200 shrink-0 overflow-hidden flex items-center justify-center">
                            {ord.imageUrl ? (
                              <img
                                src={ord.imageUrl}
                                alt={ord.item}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                              />
                            ) : (
                              <Package className="w-6 h-6 text-stone-400" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-xs font-bold text-stone-900 leading-snug line-clamp-2 group-hover:text-emerald-800 transition-colors">
                              {ord.item}
                            </div>
                            <div className="text-[10px] text-stone-500 mt-1 flex items-center justify-between">
                              <span>Qty: {ord.quantity} item</span>
                              <span>{ord.date}</span>
                            </div>
                          </div>
                        </div>

                        {/* Order Card Footer Actions */}
                        <div className="pt-2 border-t border-stone-100 flex items-center justify-between gap-1 flex-wrap">
                          <div>
                            <span className="text-[10px] text-stone-500 block">Total Tagihan:</span>
                            <span className="font-mono font-bold text-emerald-800 text-xs">
                              Rp {ord.total.toLocaleString('id-ID')}
                            </span>
                          </div>

                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => setSelectedOrderDetail(ord)}
                              className="px-2.5 py-1.5 border border-stone-300 hover:bg-stone-50 text-stone-700 font-bold text-xs cursor-pointer"
                            >
                              Rincian Pesanan
                            </button>

                            {ord.status === 'Belum Bayar' && (
                              <button
                                onClick={() => {
                                  navigator.clipboard?.writeText(ord.vaNumber || '');
                                  showToast(`Nomor ${ord.vaBank}: ${ord.vaNumber} berhasil disalin!`);
                                }}
                                className="px-3 py-1.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs cursor-pointer"
                              >
                                Bayar
                              </button>
                            )}

                            {ord.status === 'Dikirim' && (
                              <button
                                onClick={() => setSelectedTrackingOrder(ord)}
                                className="px-3 py-1.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs flex items-center gap-1 cursor-pointer"
                              >
                                <Truck className="w-3.5 h-3.5" />
                                <span>Lacak</span>
                              </button>
                            )}

                            {ord.status === 'Beri Nilai' && (
                              <button
                                onClick={() => setSelectedRatingOrder(ord)}
                                className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs flex items-center gap-1 cursor-pointer"
                              >
                                <Star className="w-3.5 h-3.5 fill-white" />
                                <span>Beri Bintang</span>
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </>
            ) : (
              /* TAB 2: RIWAYAT PENGAJUAN KOMODITI EKSPOR */
              <div className="flex-1 overflow-y-auto flex flex-col bg-stone-100">
                {/* Tombol Ajukan Komoditas Baru */}
                <div className="p-3 bg-white border-b border-stone-200 shrink-0">
                  <button
                    onClick={() => setIsNewExportSubmissionOpen(true)}
                    className="w-full py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs"
                  >
                    <Plus className="w-4 h-4" />
                    <span>+ Ajukan Komoditas Baru ke Eksportir Internasional</span>
                  </button>
                </div>

                {/* Status Filter Tabs Ekspor */}
                <div className="p-2 bg-stone-50 border-b border-stone-200 flex items-center gap-1 overflow-x-auto no-scrollbar shrink-0">
                  {['Semua', 'Menunggu Kurasi', 'Uji Lab & Phyto', 'LOI Diterbitkan', 'Disetujui Ekspor'].map(
                    (tab) => (
                      <button
                        key={tab}
                        onClick={() => setSelectedExportStatusTab(tab)}
                        className={`px-2.5 py-1 text-[11px] font-semibold border whitespace-nowrap ${
                          selectedExportStatusTab === tab
                            ? 'bg-emerald-800 text-white border-emerald-800'
                            : 'bg-white text-stone-700 border-stone-300'
                        }`}
                      >
                        {tab}
                      </button>
                    )
                  )}
                </div>

                {/* Export Submissions List */}
                <div className="p-3 space-y-3 flex-1 overflow-y-auto">
                  {exportSubmissions
                    .filter((s) => selectedExportStatusTab === 'Semua' || s.status === selectedExportStatusTab)
                    .map((sub) => (
                      <div
                        key={sub.id}
                        className="bg-white border border-stone-200 p-3 space-y-2.5 shadow-2xs hover:border-emerald-700 transition-colors"
                      >
                        {/* Header ID & Status */}
                        <div className="flex items-center justify-between pb-1.5 border-b border-stone-100">
                          <span className="font-mono font-bold text-emerald-800 text-xs">{sub.id}</span>
                          <span
                            className={`px-2 py-0.5 text-[10px] font-bold border ${
                              sub.status === 'Disetujui Ekspor'
                                ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                                : sub.status === 'LOI Diterbitkan'
                                ? 'bg-blue-100 text-blue-800 border-blue-300'
                                : sub.status === 'Uji Lab & Phyto'
                                ? 'bg-amber-100 text-amber-800 border-amber-300'
                                : 'bg-stone-100 text-stone-700 border-stone-300'
                            }`}
                          >
                            {sub.status}
                          </span>
                        </div>

                        {/* Commodity Details */}
                        <div>
                          <div className="text-xs font-bold text-stone-900">{sub.commodityName}</div>
                          <div className="text-[11px] text-stone-500 font-mono mt-0.5">
                            Volume: <strong>{sub.volume}</strong> · Diajukan: {sub.submissionDate}
                          </div>
                        </div>

                        <div className="p-2 bg-stone-50 border border-stone-200 text-[11px] space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-stone-500">Mitra Eksportir:</span>
                            <span className="font-bold text-stone-800 truncate max-w-[200px]">
                              {sub.targetBuyer}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-stone-500">Negara Buyer:</span>
                            <span className="font-semibold text-emerald-800">{sub.destinationCountry}</span>
                          </div>
                        </div>

                        {/* Card Footer */}
                        <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
                          <div>
                            <span className="text-[10px] text-stone-500 block">Estimasi Nilai Kontrak:</span>
                            <span className="font-mono font-bold text-emerald-800 text-xs">
                              Rp {sub.totalValue.toLocaleString('id-ID')}
                            </span>
                          </div>

                          <button
                            onClick={() => setSelectedExportDetail(sub)}
                            className="px-3 py-1.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs flex items-center gap-1"
                          >
                            <span>Lihat Detail & Sertifikat</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL 2: TERNIVAPAY WALLET (TOP UP & TRANSAKSI)                 */}
      {/* ============================================================== */}
      {activeModal === 'wallet' && (
        <div className="fixed inset-0 z-50 bg-black/75 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="w-full max-w-[412px] bg-white text-stone-900 max-h-[90vh] flex flex-col shadow-2xl border border-stone-300">
            <div className="p-3 bg-emerald-900 text-white flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <Wallet className="w-4 h-4 text-emerald-300" />
                <h4 className="text-xs font-bold">Dompet Digital TernivaPay</h4>
              </div>
              <button onClick={() => setActiveModal(null)} className="p-1 text-white/80 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 space-y-3.5 flex-1 overflow-y-auto">
              <div className="p-3.5 bg-emerald-800 text-white">
                <span className="text-[10px] text-emerald-200 block">Saldo Aktif Saat Ini:</span>
                <span className="text-xl font-black font-mono block mt-0.5">
                  Rp {balance.toLocaleString('id-ID')}
                </span>
                <span className="text-[10px] text-emerald-300 mt-1 block">
                  Bisa digunakan langsung untuk checkout hasil panen, bibit & pakan.
                </span>
              </div>

              <div>
                <label className="text-xs font-bold text-stone-900 block mb-1">
                  Pilih Nominal Top Up Saldo:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['100000', '250000', '500000', '1000000', '2000000', '5000000'].map((amt) => (
                    <button
                      key={amt}
                      onClick={() => setTopUpAmount(amt)}
                      className={`p-2 text-xs font-mono font-bold border ${
                        topUpAmount === amt
                          ? 'bg-emerald-800 text-white border-emerald-800'
                          : 'bg-stone-50 text-stone-800 border-stone-300'
                      }`}
                    >
                      Rp {parseInt(amt, 10).toLocaleString('id-ID')}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-stone-900 block mb-1">Metode Top Up:</label>
                <div className="p-2.5 bg-stone-50 border border-stone-200 space-y-1 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-stone-800">BCA Virtual Account</span>
                    <span className="text-[10px] font-bold text-emerald-800">Bebas Biaya Admin</span>
                  </div>
                  <div className="text-[10px] text-stone-500 font-mono">Kode VA: 8802-0812-3456-7890</div>
                </div>
              </div>

              <button
                onClick={handleTopUpBalance}
                className="w-full py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs"
              >
                Konfirmasi Top Up Rp {parseInt(topUpAmount, 10).toLocaleString('id-ID')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL 3: KOIN PANEN & KLAIM HARIAN                             */}
      {/* ============================================================== */}
      {activeModal === 'coins' && (
        <div className="fixed inset-0 z-50 bg-black/75 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="w-full max-w-[412px] bg-white text-stone-900 max-h-[90vh] flex flex-col shadow-2xl border border-stone-300">
            <div className="p-3 bg-amber-600 text-white flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <Coins className="w-4 h-4 text-amber-200" />
                <h4 className="text-xs font-bold">Koin Panen Terniva</h4>
              </div>
              <button onClick={() => setActiveModal(null)} className="p-1 text-white/80 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 space-y-3.5 flex-1 overflow-y-auto">
              <div className="p-3.5 bg-amber-50 border border-amber-200 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-stone-500 block">Total Koin Anda:</span>
                  <span className="text-xl font-bold font-mono text-amber-700">
                    {coins.toLocaleString('id-ID')} Koin
                  </span>
                  <span className="text-[10px] text-stone-500 block mt-0.5">
                    1 Koin = Rp 1 (Dapat ditukarkan saat checkout)
                  </span>
                </div>
                <button
                  onClick={handleClaimDailyCoins}
                  disabled={hasClaimedDaily}
                  className="px-3 py-2 bg-amber-600 text-white font-bold text-xs disabled:opacity-40"
                >
                  {hasClaimedDaily ? 'Sudah Diklaim' : 'Klaim +50 Koin'}
                </button>
              </div>

              <div>
                <h5 className="text-xs font-bold text-stone-900 mb-1.5">Tukar Koin dengan Hadiah Panen</h5>
                <div className="space-y-2 text-xs">
                  <div className="p-2.5 bg-stone-50 border border-stone-200 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-stone-900">Voucher Ongkir Kargo Dingin</div>
                      <div className="text-[10px] text-stone-500">Tukar 500 Koin</div>
                    </div>
                    <button
                      onClick={() => showToast('Berhasil menukar 500 koin!')}
                      className="px-2.5 py-1 bg-emerald-800 text-white font-bold text-[10px]"
                    >
                      Tukar
                    </button>
                  </div>
                  <div className="p-2.5 bg-stone-50 border border-stone-200 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-stone-900">Sample Pupuk Hayati 500ml</div>
                      <div className="text-[10px] text-stone-500">Tukar 1.000 Koin</div>
                    </div>
                    <button
                      onClick={() => showToast('Berhasil menukar 1.000 koin!')}
                      className="px-2.5 py-1 bg-emerald-800 text-white font-bold text-[10px]"
                    >
                      Tukar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL 4: VOUCHER SAYA                                          */}
      {/* ============================================================== */}
      {activeModal === 'vouchers' && (
        <div className="fixed inset-0 z-50 bg-black/75 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="w-full max-w-[412px] bg-white text-stone-900 max-h-[90vh] flex flex-col shadow-2xl border border-stone-300">
            <div className="p-3 bg-emerald-900 text-white flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <Ticket className="w-4 h-4 text-emerald-300" />
                <h4 className="text-xs font-bold">Voucher & Promo Panen Saya</h4>
              </div>
              <button onClick={() => setActiveModal(null)} className="p-1 text-white/80 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-3 space-y-2.5 flex-1 overflow-y-auto bg-stone-100">
              {vouchersList.map((v) => (
                <div key={v.id} className="bg-white border border-stone-200 p-3 space-y-1 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-emerald-800 text-xs">{v.title}</span>
                    <span className="text-[9px] font-mono bg-stone-100 border border-stone-300 px-1.5 py-0.5 font-bold">
                      {v.code}
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-600 leading-snug">{v.desc}</p>
                  <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-[10px] text-stone-400">
                    <span>Berlaku s.d. {v.exp}</span>
                    <button
                      onClick={() => {
                        showToast(`Voucher ${v.code} siap digunakan di keranjang belanja!`);
                        setActiveModal(null);
                      }}
                      className="px-2.5 py-1 bg-emerald-800 text-white font-bold text-[10px]"
                    >
                      Gunakan
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL 5: TITIP TANI & TERNAK SAYA (PANTAU PANEN AKTIF)         */}
      {/* ============================================================== */}
      {activeModal === 'pantau_panen' && (
        <div className="fixed inset-0 z-50 bg-black/75 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="w-full max-w-[412px] bg-white text-stone-900 max-h-[90vh] flex flex-col shadow-2xl border border-stone-300">
            <div className="p-3 bg-emerald-900 text-white flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-emerald-300" />
                <h4 className="text-xs font-bold">Titip Tani & Ternak Saya (Pantau Panen)</h4>
              </div>
              <button onClick={() => setActiveModal(null)} className="p-1 text-white/80 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-3 space-y-3 flex-1 overflow-y-auto bg-stone-100">
              {/* Program 1 */}
              <div className="bg-white border border-stone-200 p-3 space-y-2">
                <div className="flex items-center justify-between pb-1 border-b border-stone-100 text-xs">
                  <span className="font-bold text-stone-900">Sapi Limousin #SL-08 (Kandang Subang)</span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5">
                    Hari ke-42 / 90
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs bg-stone-50 p-2 border border-stone-200 font-mono">
                  <div>
                    <span className="text-[10px] text-stone-500 block font-sans">Bobot Sekarang:</span>
                    <span className="font-bold text-stone-900">462 kg (+1.38 kg/hari)</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-stone-500 block font-sans">Suhu Kandang:</span>
                    <span className="font-bold text-emerald-800">24.8°C (Normal)</span>
                  </div>
                </div>
                <button
                  onClick={() => setIsTitipMonitoringOpen(true)}
                  className="w-full py-2 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Buka CCTV, Sensor IoT, Log & Foto Fisik Live</span>
                </button>
              </div>

              {/* Program 2 */}
              <div className="bg-white border border-stone-200 p-3 space-y-2">
                <div className="flex items-center justify-between pb-1 border-b border-stone-100 text-xs">
                  <span className="font-bold text-stone-900">Kebun Kopi Gayo #KP-14 (Takengon)</span>
                  <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-1.5 py-0.5">
                    Pemasakan Buah
                  </span>
                </div>
                <p className="text-[11px] text-stone-600 leading-snug">
                  Ceri kopi mulai memerah (Brix 19%). Pemupukan organik tahap akhir telah selesai. Estimasi panen
                  raya 3 minggu lagi.
                </p>
                <button
                  onClick={() => setIsTitipMonitoringOpen(true)}
                  className="w-full py-2 border border-emerald-800 text-emerald-800 hover:bg-emerald-50 font-bold text-xs flex items-center justify-center gap-1.5"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Lihat CCTV Solar Dome & Log Agronomis</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL 6: KONSULTASI DOKTER HEWAN & TANAMAN SAYA                 */}
      {/* ============================================================== */}
      {activeModal === 'konsultasi' && (
        <div className="fixed inset-0 z-50 bg-black/75 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="w-full max-w-[412px] bg-white text-stone-900 max-h-[90vh] flex flex-col shadow-2xl border border-stone-300">
            <div className="p-3 bg-emerald-900 text-white flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <Sprout className="w-4 h-4 text-emerald-300" />
                <h4 className="text-xs font-bold">Konsultasi Dokter Hewan & Tanaman</h4>
              </div>
              <button onClick={() => setActiveModal(null)} className="p-1 text-white/80 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-3 space-y-2.5 flex-1 overflow-y-auto bg-stone-100">
              <div className="bg-white border border-stone-200 p-3 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-stone-900">drh. Aryo Wibowo, M.Si</span>
                  <span className="text-[10px] text-emerald-800 font-bold">Selesai</span>
                </div>
                <div className="text-[11px] text-stone-600">Topik: Sapi nafsu makan turun & kembung</div>
                <div className="p-2 bg-stone-50 border border-stone-200 text-[10px] text-stone-600">
                  Resep: Berikan probiotik fermentasi ragi 200ml dan kurangi pakan hijau basah selama 2 hari.
                </div>
              </div>

              <div className="bg-white border border-stone-200 p-3 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-stone-900">Dr. Ir. Hendra Saputra</span>
                  <span className="text-[10px] text-emerald-800 font-bold">Selesai</span>
                </div>
                <div className="text-[11px] text-stone-600">Topik: Daun cabai menguning & layu fusarium</div>
                <div className="p-2 bg-stone-50 border border-stone-200 text-[10px] text-stone-600">
                  Resep: Kocor mikroba Trichoderma cair pada pangkal batang seminggu 2x.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL 7: FAVORIT & WISHLIST                                     */}
      {/* ============================================================== */}
      {activeModal === 'wishlist' && (
        <div className="fixed inset-0 z-50 bg-black/75 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="w-full max-w-[412px] bg-white text-stone-900 max-h-[90vh] flex flex-col shadow-2xl border border-stone-300">
            <div className="p-3 bg-emerald-900 text-white flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-emerald-300" />
                <h4 className="text-xs font-bold">Favorit & Wishlist Komoditas</h4>
              </div>
              <button onClick={() => setActiveModal(null)} className="p-1 text-white/80 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-3 space-y-2 flex-1 overflow-y-auto bg-stone-100">
              {MOBILE_PRODUCTS.slice(0, 3).map((prod) => (
                <div key={prod.id} className="bg-white border border-stone-200 p-2.5 flex items-center gap-2.5">
                  <img src={prod.imageUrl} alt={prod.name} className="w-14 h-14 object-cover border border-stone-200 shrink-0" />
                  <div className="min-w-0 flex-1 text-xs">
                    <div className="font-bold text-stone-900 truncate">{prod.name}</div>
                    <div className="text-emerald-800 font-mono font-bold mt-0.5">
                      Rp {prod.price.toLocaleString('id-ID')}
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      showToast(`${prod.name} berhasil ditambahkan ke keranjang!`);
                    }}
                    className="px-2.5 py-1.5 bg-emerald-800 text-white font-bold text-[10px] shrink-0"
                  >
                    + Keranjang
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL 8: DAFTAR ALAMAT PENGIRIMAN (LENGKAP DENGAN TAMBAH/HAPUS) */}
      {/* ============================================================== */}
      {activeModal === 'address' && (
        <div className="fixed inset-0 z-50 bg-black/75 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="w-full max-w-[412px] bg-white text-stone-900 max-h-[90vh] flex flex-col shadow-2xl border border-stone-300">
            <div className="p-3 bg-emerald-900 text-white flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-300" />
                <h4 className="text-xs font-bold">Daftar Alamat Pengiriman</h4>
              </div>
              <button onClick={() => setActiveModal(null)} className="p-1 text-white/80 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-3 space-y-2.5 flex-1 overflow-y-auto bg-stone-100">
              {addresses.map((addr) => (
                <div key={addr.id} className="bg-white border border-stone-200 p-3 space-y-1.5 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-stone-900 text-xs">{addr.label}</span>
                    {addr.isDefault ? (
                      <span className="text-[9px] font-bold bg-emerald-100 text-emerald-800 px-1.5 py-0.5 border border-emerald-300">
                        Alamat Utama
                      </span>
                    ) : (
                      <button
                        onClick={() => {
                          setAddresses(addresses.map((a) => ({ ...a, isDefault: a.id === addr.id })));
                          showToast(`Alamat "${addr.label}" diatur sebagai alamat utama!`);
                        }}
                        className="text-[9px] font-bold text-emerald-800 hover:underline"
                      >
                        Atur Sebagai Utama
                      </button>
                    )}
                  </div>
                  <div className="text-xs font-semibold text-stone-800">{addr.recipient} ({addr.phone})</div>
                  <p className="text-[11px] text-stone-600 leading-snug">{addr.address}</p>

                  <div className="pt-2 border-t border-stone-100 flex items-center justify-end gap-2 text-[10px]">
                    {addresses.length > 1 && (
                      <button
                        onClick={() => {
                          if (confirm(`Hapus alamat "${addr.label}"?`)) {
                            setAddresses(addresses.filter((a) => a.id !== addr.id));
                            showToast('Alamat berhasil dihapus.');
                          }
                        }}
                        className="text-rose-600 hover:text-rose-800 font-bold flex items-center gap-1"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>Hapus</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}

              <button
                onClick={() => setIsAddAddressOpen(true)}
                className="w-full py-2.5 bg-white border border-dashed border-emerald-800 text-emerald-800 hover:bg-emerald-50 font-bold text-xs flex items-center justify-center gap-1 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ Tambah Alamat Pengiriman Baru</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL 9: REKENING BANK & E-WALLET PENARIKAN (VERIFIKASI NAMA)   */}
      {/* ============================================================== */}
      {activeModal === 'bank' && (
        <div className="fixed inset-0 z-50 bg-black/75 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="w-full max-w-[412px] bg-white text-stone-900 max-h-[90vh] flex flex-col shadow-2xl border border-stone-300">
            <div className="p-3 bg-emerald-900 text-white flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-emerald-300" />
                <h4 className="text-xs font-bold">Rekening Bank Penarikan & Pembayaran</h4>
              </div>
              <button onClick={() => setActiveModal(null)} className="p-1 text-white/80 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-3 space-y-2.5 flex-1 overflow-y-auto bg-stone-100">
              {bankAccounts.map((acc) => (
                <div key={acc.id} className="bg-white border border-stone-200 p-3 space-y-1.5 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-stone-900 text-xs">{acc.bank}</span>
                    {acc.isPrimary ? (
                      <span className="text-[9px] font-bold bg-emerald-100 text-emerald-800 px-1.5 py-0.5 border border-emerald-300">
                        Rekening Utama
                      </span>
                    ) : (
                      <button
                        onClick={() => {
                          setBankAccounts(bankAccounts.map((b) => ({ ...b, isPrimary: b.id === acc.id })));
                          showToast(`Rekening "${acc.bank}" diatur sebagai rekening utama penarikan!`);
                        }}
                        className="text-[9px] font-bold text-emerald-800 hover:underline"
                      >
                        Atur Sebagai Utama
                      </button>
                    )}
                  </div>
                  <div className="font-mono text-xs font-bold text-emerald-800">{acc.number}</div>
                  <div className="text-[10px] text-stone-500">Atas Nama: <strong>{acc.holder}</strong></div>

                  <div className="pt-2 border-t border-stone-100 flex items-center justify-end text-[10px]">
                    {bankAccounts.length > 1 && (
                      <button
                        onClick={() => {
                          if (confirm(`Putuskan rekening "${acc.bank}"?`)) {
                            setBankAccounts(bankAccounts.filter((b) => b.id !== acc.id));
                            showToast('Rekening berhasil dihapus.');
                          }
                        }}
                        className="text-rose-600 hover:text-rose-800 font-bold flex items-center gap-1"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>Putuskan</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}

              <button
                onClick={() => setIsAddBankAccountOpen(true)}
                className="w-full py-2.5 bg-white border border-dashed border-emerald-800 text-emerald-800 hover:bg-emerald-50 font-bold text-xs flex items-center justify-center gap-1 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ Hubungkan Rekening Bank / E-Wallet Baru</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL 10: KEAMANAN AKUN & PIN                                  */}
      {/* ============================================================== */}
      {activeModal === 'security' && (
        <div className="fixed inset-0 z-50 bg-black/75 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="w-full max-w-[412px] bg-white text-stone-900 max-h-[90vh] flex flex-col shadow-2xl border border-stone-300">
            <div className="p-3 bg-emerald-900 text-white flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-300" />
                <h4 className="text-xs font-bold">Keamanan Akun & PIN TernivaPay</h4>
              </div>
              <button onClick={() => setActiveModal(null)} className="p-1 text-white/80 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 space-y-3 flex-1 overflow-y-auto text-xs">
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-900 space-y-1">
                <div className="font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  <span>Akun Anda Berstatus Sangat Aman</span>
                </div>
                <p className="text-[10px] leading-tight text-emerald-800">
                  PIN 6 digit aktif dan melindungi seluruh transaksi dompet digital & pencairan dana.
                </p>
              </div>

              <div className="space-y-2 divide-y divide-stone-100">
                <div className="pt-2 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-stone-900 block">PIN TernivaPay</span>
                    <span className="text-[10px] text-stone-500">6 digit kode keamanan</span>
                  </div>
                  <button
                    onClick={() => setIsChangePinOpen(true)}
                    className="px-2.5 py-1 text-xs font-bold text-emerald-800 border border-emerald-800 hover:bg-emerald-50 cursor-pointer"
                  >
                    Ubah PIN
                  </button>
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-stone-900 block">Verifikasi Biometrik (Fingerprint / Face ID)</span>
                    <span className="text-[10px] text-stone-500">Login dan bayar cepat</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={isBiometricActive}
                    onChange={(e) => {
                      setIsBiometricActive(e.target.checked);
                      showToast(e.target.checked ? 'Biometrik diaktifkan!' : 'Biometrik dinonaktifkan.');
                    }}
                    className="w-4 h-4 accent-emerald-800"
                  />
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-stone-900 block">Kata Sandi Akun</span>
                    <span className="text-[10px] text-stone-500">Terakhir diubah 30 hari lalu</span>
                  </div>
                  <button
                    onClick={() => setIsChangePasswordOpen(true)}
                    className="px-2.5 py-1 text-xs font-bold text-emerald-800 border border-emerald-800 hover:bg-emerald-50 cursor-pointer"
                  >
                    Ubah Sandi
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL 11: PUSAT BANTUAN & CS 24/7                              */}
      {/* ============================================================== */}
      {activeModal === 'help' && (
        <div className="fixed inset-0 z-50 bg-black/75 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="w-full max-w-[412px] bg-white text-stone-900 max-h-[90vh] flex flex-col shadow-2xl border border-stone-300">
            <div className="p-3 bg-emerald-900 text-white flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-emerald-300" />
                <h4 className="text-xs font-bold">Pusat Bantuan & Layanan Pelanggan</h4>
              </div>
              <button onClick={() => setActiveModal(null)} className="p-1 text-white/80 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 space-y-3 flex-1 overflow-y-auto text-xs">
              <div className="p-3 bg-stone-50 border border-stone-200 space-y-2">
                <div className="font-bold text-stone-900">Hubungi Langsung Tim CS Terniva:</div>
                <button
                  onClick={() => showToast('Membuka chat WhatsApp Layanan Pelanggan Terniva...')}
                  className="w-full py-2 bg-emerald-800 text-white font-bold flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp CS 24 Jam (+62 811-9821-990)</span>
                </button>
              </div>

              <div className="space-y-2">
                <span className="font-bold text-stone-900 block">Pertanyaan Sering Diajukan (FAQ):</span>
                <div className="p-2.5 bg-stone-50 border border-stone-200 space-y-1">
                  <div className="font-bold text-stone-900">Bagaimana proses pengiriman ternak hidup?</div>
                  <p className="text-[11px] text-stone-600 leading-tight">
                    Pengiriman ternak sapi dan domba dilengkapi armada kargo khusus, surat jalan karantina (SKKH), dan
                    didampingi perawat ternak berstandar kesejahteraan hewan.
                  </p>
                </div>

                <div className="p-2.5 bg-stone-50 border border-stone-200 space-y-1">
                  <div className="font-bold text-stone-900">Apakah ada garansi komoditas rusak saat tiba?</div>
                  <p className="text-[11px] text-stone-600 leading-tight">
                    Ya, Terniva memberikan garansi proteksi panen 100% uang kembali atau pengiriman komoditas pengganti
                    jika barang rusak/busuk saat diterima.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL 12: EDIT PROFIL PENGGUNA (SECURE & ANTI-FRAUD)           */}
      {/* ============================================================== */}
      {activeModal === 'edit_profile' && (
        <SecureEditProfileModal
          profileData={profileData}
          onClose={() => setActiveModal(null)}
          onSaveProfile={(updated) => {
            setProfileData((prev) => ({ ...prev, ...updated }));
          }}
          onShowToast={showToast}
        />
      )}

      {/* ============================================================== */}
      {/* MODAL 13: KONFIRMASI LOGOUT                                    */}
      {/* ============================================================== */}
      {activeModal === 'logout' && (
        <div className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-4">
          <div className="w-full max-w-xs bg-white text-stone-900 p-4 shadow-2xl border border-stone-300 space-y-3">
            <div className="flex items-center gap-2 text-rose-600">
              <AlertCircle className="w-5 h-5" />
              <h4 className="text-xs font-bold text-stone-900">Konfirmasi Keluar Akun</h4>
            </div>
            <p className="text-xs text-stone-600 leading-snug">
              Apakah Anda yakin ingin keluar dari akun Terniva? Seluruh data sesi dan saldo Anda tetap aman tersimpan.
            </p>
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={() => setActiveModal(null)}
                className="py-2 border border-stone-300 text-stone-700 font-bold text-xs"
              >
                Batal
              </button>
              <button
                onClick={() => {
                  showToast('Anda telah keluar dari akun. Silakan login kembali.');
                  setActiveModal(null);
                  if (onLogout) {
                    setTimeout(onLogout, 500);
                  }
                }}
                className="py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs"
              >
                Ya, Keluar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL 14: RINCIAN PESANAN (ORDER DETAIL MODAL)                  */}
      {/* ============================================================== */}
      {selectedOrderDetail && (
        <OrderDetailModal
          order={selectedOrderDetail}
          onClose={() => setSelectedOrderDetail(null)}
          onTrackOrder={(o) => {
            setSelectedOrderDetail(null);
            setSelectedTrackingOrder(o);
          }}
          onRateOrder={(o) => {
            setSelectedOrderDetail(null);
            setSelectedRatingOrder(o);
          }}
          onShowToast={showToast}
        />
      )}

      {/* ============================================================== */}
      {/* MODAL 15: LACAK PENGIRIMAN (LIVE COURIER TRACKING)              */}
      {/* ============================================================== */}
      {selectedTrackingOrder && (
        <OrderTrackingModal
          order={selectedTrackingOrder}
          onClose={() => setSelectedTrackingOrder(null)}
          onShowToast={showToast}
        />
      )}

      {/* ============================================================== */}
      {/* MODAL 16: BERI BINTANG & ULASAN (ORDER RATING)                  */}
      {/* ============================================================== */}
      {selectedRatingOrder && (
        <OrderRatingModal
          order={selectedRatingOrder}
          onClose={() => setSelectedRatingOrder(null)}
          onSubmitRating={handleRatingSubmit}
        />
      )}

      {/* ============================================================== */}
      {/* MODAL 17: UBAH PIN TRANSAKSI (ANTI-FRAUD 6-DIGIT PIN)          */}
      {/* ============================================================== */}
      {isChangePinOpen && (
        <ChangePinModal
          currentPin={userPin}
          onClose={() => setIsChangePinOpen(false)}
          onSuccess={(newPin) => setUserPin(newPin)}
          onShowToast={showToast}
        />
      )}

      {/* ============================================================== */}
      {/* MODAL 18: UBAH KATA SANDI (STRENGTH CHECK & ANTI-TAKEOVER)      */}
      {/* ============================================================== */}
      {isChangePasswordOpen && (
        <ChangePasswordModal
          onClose={() => setIsChangePasswordOpen(false)}
          onSuccess={() => {}}
          onShowToast={showToast}
        />
      )}

      {/* ============================================================== */}
      {/* MODAL 19: TAMBAH ALAMAT PENGIRIMAN BARU                        */}
      {/* ============================================================== */}
      {isAddAddressOpen && (
        <AddAddressModal
          onClose={() => setIsAddAddressOpen(false)}
          onSaveAddress={(newAddr) => {
            if (newAddr.isDefault) {
              setAddresses((prev) => [newAddr, ...prev.map((a) => ({ ...a, isDefault: false }))]);
            } else {
              setAddresses((prev) => [...prev, newAddr]);
            }
          }}
          onShowToast={showToast}
        />
      )}

      {/* ============================================================== */}
      {/* MODAL 20: HUBUNGKAN REKENING BANK & E-WALLET                   */}
      {/* ============================================================== */}
      {isAddBankAccountOpen && (
        <AddBankAccountModal
          currentPin={userPin}
          verifiedKycName={profileData.name}
          onClose={() => setIsAddBankAccountOpen(false)}
          onSaveAccount={(newAcc) => {
            if (newAcc.isPrimary) {
              setBankAccounts((prev) => [newAcc, ...prev.map((b) => ({ ...b, isPrimary: false }))]);
            } else {
              setBankAccounts((prev) => [...prev, newAcc]);
            }
          }}
          onShowToast={showToast}
        />
      )}

      {/* ============================================================== */}
      {/* MODAL 21: RINCIAN PENGAJUAN KOMODITAS EKSPOR                    */}
      {/* ============================================================== */}
      {selectedExportDetail && (
        <ExportSubmissionDetailModal
          submission={selectedExportDetail}
          onClose={() => setSelectedExportDetail(null)}
          onShowToast={showToast}
        />
      )}

      {/* ============================================================== */}
      {/* MODAL 22: AJUKAN KOMODITAS BARU KE EKSPORTIR                    */}
      {/* ============================================================== */}
      {isNewExportSubmissionOpen && (
        <NewExportSubmissionModal
          onClose={() => setIsNewExportSubmissionOpen(false)}
          onSubmitNew={(newItem) => {
            setExportSubmissions((prev) => [newItem, ...prev]);
          }}
          onShowToast={showToast}
        />
      )}

      {/* ============================================================== */}
      {/* MODAL 23: MONITORING CCTV, SENSOR, LOG & FOTO TITIP TANI TERNAK */}
      {/* ============================================================== */}
      {isTitipMonitoringOpen && (
        <MobileTitipTaniMonitoringModal
          program={SAMPLE_TITIP_PROGRAM}
          onClose={() => setIsTitipMonitoringOpen(false)}
          onShowToast={showToast}
        />
      )}
    </div>
  );
}
