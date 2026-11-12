import { useState } from 'react';
import {
  Globe2,
  ArrowLeft,
  Building2,
  Calendar,
  CheckCircle2,
  Send,
  X,
  Sparkles,
  Search,
  Filter,
  DollarSign,
  Package,
  Layers,
  MapPin,
  Clock,
  ShieldCheck,
  UtensilsCrossed,
  Store,
  Users,
  Hotel,
  Truck,
  CreditCard,
  ChevronRight,
  FileCheck,
  Award,
  Phone,
  Check,
  CheckCheck,
} from 'lucide-react';

export type OpportunityScope = 'lokal' | 'ekspor';
export type LocalSector = 'Semua' | 'Hotel' | 'Restoran' | 'Pasar' | 'Umum';

interface ExportOpportunity {
  id: string;
  commodityName: string;
  category: string;
  buyerName: string;
  destinationCountry: string;
  destinationFlag: string;
  imageUrl: string;
  description: string;
  specifications: {
    grade: string;
    moistureOrQuality: string;
    packaging: string;
    certificationsRequired: string;
  };
  quantityRequired: string;
  targetPrice: string;
  targetPriceIdrEquivalent: string;
  incoterm: string;
  deadlineDays: number;
}

interface LocalOpportunity {
  id: string;
  sector: 'Hotel' | 'Restoran' | 'Pasar' | 'Umum';
  sectorLabel: string;
  commodityName: string;
  category: string;
  buyerName: string;
  buyerType: string;
  location: string;
  region: string;
  imageUrl: string;
  description: string;
  quantityRequired: string;
  deliveryFrequency: string;
  targetPrice: string;
  targetPriceNumber: number;
  paymentTerms: string;
  qualityRequirements: string;
  minSupplyVolume: string;
  deadlineDays: number;
  isVerifiedBuyer: boolean;
}

interface MobilePeluangEksporScreenProps {
  onBack?: () => void;
  isSubScreen?: boolean;
}

const LOCAL_OPPORTUNITIES: LocalOpportunity[] = [
  {
    id: 'LOK-01',
    sector: 'Hotel',
    sectorLabel: 'Hotel & Resort',
    commodityName: 'Daging Sapi Prime Chilled Cuts (Sirloin & Tenderloin)',
    category: 'Peternakan',
    buyerName: 'The Mulia & Ayana Luxury Resort Network',
    buyerType: 'Jaringan Hotel Bintang 5',
    location: 'Kawasan Pariwisata Nusa Dua & Jimbaran, Bali',
    region: 'Bali & Nusa Tenggara',
    imageUrl: '/src/assets/images/terniva_mitra_farmer_1794449097085.jpg',
    description:
      'Kebutuhan pasokan rutin daging sapi karkas dingin berkualitas prima (marbling score 4+) bersertifikat Halal & SKKH untuk 7 restoran fine dining hotel bintang lima.',
    quantityRequired: '1.500 Kg / Bulan',
    deliveryFrequency: 'Rutin 2x Seminggu (Selasa & Jumat Subuh)',
    targetPrice: 'Rp 165.000 / Kg',
    targetPriceNumber: 165000,
    paymentTerms: 'TOP 14 Hari via Terniva B2B Escrow',
    qualityRequirements: 'Sertifikat Halal MUI/BPJPH, Rantai Dingin Cold Chain < 4°C, Vacuum Pack higienis',
    minSupplyVolume: 'Minimal pasok 150 Kg per kirim',
    deadlineDays: 4,
    isVerifiedBuyer: true,
  },
  {
    id: 'LOK-02',
    sector: 'Restoran',
    sectorLabel: 'Restoran & Kafe',
    commodityName: 'Biji Kopi Arabika Gayo & Java Preanger House Blend',
    category: 'Pertanian & Kopi',
    buyerName: 'Jaringan Kafe & Roastery Kopi Selaras (32 Outlet)',
    buyerType: 'Jaringan Roastery & Kafe Nasional',
    location: 'Jakarta Selatan, BSD Tangerang & Bandung',
    region: 'Jabodetabek',
    imageUrl: '/src/assets/images/terniva_ekspor_commodities_1794449097514.jpg',
    description:
      'Pengadaan green beans kopi arabika proses semi-washed dan natural untuk kebutuhan espresso blend harian 32 gerai. Kontrak suplai berkala 12 bulan.',
    quantityRequired: '1.200 Kg / Bulan',
    deliveryFrequency: '2x Pengiriman per Bulan (Tiap tgl 5 & 20)',
    targetPrice: 'Rp 135.000 / Kg',
    targetPriceNumber: 135000,
    paymentTerms: 'DP 30% Dimuka + Pelunasan Timbang Terima Gudang',
    qualityRequirements: 'Kadar air 11-12%, Defect < 4%, Cupping Score minimal 83.5, kemasan GrainPro',
    minSupplyVolume: 'Minimal 100 Kg per pengiriman',
    deadlineDays: 7,
    isVerifiedBuyer: true,
  },
  {
    id: 'LOK-03',
    sector: 'Pasar',
    sectorLabel: 'Pasar Induk & Grosir',
    commodityName: 'Bawang Merah Brebes Super & Cabai Merah Keriting',
    category: 'Pertanian',
    buyerName: 'Paguyuban Pedagang Grosir Pasar Induk Kramat Jati',
    buyerType: 'Sentra Distribusi Pangan Nasional',
    location: 'Pasar Induk Kramat Jati, Jakarta Timur',
    region: 'Jabodetabek',
    imageUrl: '/src/assets/images/banner_pantau_panen_1794441162382.jpg',
    description:
      'Pasokan harian hortikultura segar grade pasar induk untuk memenuhi distribusi pedagang pasar retail se-Jabodetabek. Timbangan timbang bayar langsung di lapak induk.',
    quantityRequired: '8 Ton / Pekan',
    deliveryFrequency: 'Setiap Malam (Pukul 21:00 - 02:00 WIB)',
    targetPrice: 'Rp 34.000 / Kg (Bawang) · Rp 38.000 / Kg (Cabai)',
    targetPriceNumber: 36000,
    paymentTerms: 'Cash on Delivery (Timbang - Bongkar - Bayar Tunai/VA)',
    qualityRequirements: 'Bawang kering jemur rogol tanpa daun basah. Cabai petik segar tangkai hijau.',
    minSupplyVolume: 'Minimal 1 Ton per truk/armada',
    deadlineDays: 2,
    isVerifiedBuyer: true,
  },
  {
    id: 'LOK-04',
    sector: 'Restoran',
    sectorLabel: 'Restoran & Kafe',
    commodityName: 'Daging Domba Garut Karkas Muda & Paha Potong Segar',
    category: 'Peternakan',
    buyerName: 'Restoran Sate Khas Solo & Nusantara Grill Group',
    buyerType: 'Grup Restoran Tradisional & Sate (18 Cabang)',
    location: 'Surakarta, Yogyakarta & Semarang',
    region: 'Jawa Tengah & DIY',
    imageUrl: '/src/assets/images/terniva_mitra_farmer_1794449097085.jpg',
    description:
      'Pengadaan domba jantan muda usia 8-12 bulan karkas bersih tanpa bau prengus untuk menu sate klathak dan tengkleng premium bergaransi empuk.',
    quantityRequired: '60 Ekor / Pekan (atau karkas 750 Kg/pekan)',
    deliveryFrequency: 'Rutin Hari Senin & Kamis Subuh',
    targetPrice: 'Rp 118.000 / Kg Karkas Bersih',
    targetPriceNumber: 118000,
    paymentTerms: 'TOP 7 Hari Transfer Bank Resmi',
    qualityRequirements: 'Juru Sembelih Halal (Juleha) bersertifikat, SKKH Dinas Peternakan aktif',
    minSupplyVolume: 'Minimal 10 ekor / 120 kg per pengiriman',
    deadlineDays: 5,
    isVerifiedBuyer: true,
  },
  {
    id: 'LOK-05',
    sector: 'Umum',
    sectorLabel: 'Umum & Konsumen UMKM',
    commodityName: 'Telur Ayam Omega-3 & Sayuran Daun Segar Bebas Residu',
    category: 'Peternakan & Horti',
    buyerName: 'Konsorsium Katering Sehat Dapur Bunda & UMKM Bento',
    buyerType: 'Asosiasi Usaha Katering & Dapur Bersama',
    location: 'Surabaya, Sidoarjo & Malang, Jawa Timur',
    region: 'Jawa Timur',
    imageUrl: '/src/assets/images/terniva_dok_konsultasi_1794449097905.jpg',
    description:
      'Pasokan rutin telur ayam omega-3 bebas salmonella dan sayuran daun selada, brokoli, serta tomat ceri segar untuk 4.200 porsi paket katering sehat harian.',
    quantityRequired: '500 Tray Telur / Pekan + 600 Kg Sayuran / Pekan',
    deliveryFrequency: 'Setiap Hari Kerja (Pukul 04:30 - 06:00 WIB)',
    targetPrice: 'Rp 65.000 / Tray & Rp 18.500 / Kg Sayur',
    targetPriceNumber: 65000,
    paymentTerms: 'Sistem Saldo B2B Mingguan via TernivaPay',
    qualityRequirements: 'Telur bersih stempel tanggal panen, sayur dipacking rapi lubang ventilasi',
    minSupplyVolume: 'Minimal 50 tray / 50 kg',
    deadlineDays: 8,
    isVerifiedBuyer: true,
  },
  {
    id: 'LOK-06',
    sector: 'Hotel',
    sectorLabel: 'Hotel & Resort',
    commodityName: 'Beras Organik Aromatik (Mentik Wangi & Pandan Wangi)',
    category: 'Pertanian',
    buyerName: 'The Dharmawangsa Hotel & Hospitality Network Jakarta',
    buyerType: 'Hotel Bintang 5 Berlian & Tamu VIP Kenegaraan',
    location: 'Kebayoran Baru, Jakarta Selatan',
    region: 'Jabodetabek',
    imageUrl: '/src/assets/images/terniva_hero_landscape_1794449096818.jpg',
    description:
      'Beras putih organik sertifikasi LeSOS/SNI tanpa bahan pemutih dan tanpa pengawet sintetis untuk jamuan makan resmi tamu kenegaraan dan restoran hotel.',
    quantityRequired: '3.5 Ton / Bulan',
    deliveryFrequency: 'Pengiriman Awal Pekan per 1.5 - 2 Ton',
    targetPrice: 'Rp 19.000 / Kg',
    targetPriceNumber: 19000,
    paymentTerms: 'TOP 14 Hari Invoice & Faktur Pajak Resmi',
    qualityRequirements: 'Sertifikat SNI Organik, Kadar Air < 13%, Kemasan Vakum 5 Kg & 25 Kg',
    minSupplyVolume: 'Minimal 1 Ton per pengiriman',
    deadlineDays: 9,
    isVerifiedBuyer: true,
  },
];

const EXPORT_OPPORTUNITIES: ExportOpportunity[] = [
  {
    id: 'EXP-01',
    commodityName: 'Kopi Arabika Gayo Specialty Grade 1',
    category: 'Pertanian & Kopi',
    buyerName: 'Hanseatic Coffee Roasters GmbH',
    destinationCountry: 'Hamburg, Jerman',
    destinationFlag: '🇩🇪',
    imageUrl: '/src/assets/images/terniva_ekspor_commodities_1794449097514.jpg',
    description:
      'Kebutuhan pasokan green beans Arabika single-origin Gayo untuk roastery di Jerman. Kualitas rasa konsisten, petik merah 100%, dan cupping score terverifikasi.',
    specifications: {
      grade: 'Specialty Grade 1 (Double Picked)',
      moistureOrQuality: 'Kadar Air Maksimal 12% · Defect < 4%',
      packaging: 'Karung Goni 60 kg + inner GrainPro Bag',
      certificationsRequired: 'Phytosanitary Certificate, Fairtrade / Organic, COO Form A',
    },
    quantityRequired: '20 Ton (1 Kontainer FCL 20ft)',
    targetPrice: 'USD $8.50 / Kg FOB',
    targetPriceIdrEquivalent: '± Rp 138.000 / Kg',
    incoterm: 'FOB Pelabuhan Belawan Medan',
    deadlineDays: 4,
  },
  {
    id: 'EXP-02',
    commodityName: 'Vanili Kering Gourmet Planifolia Alor Grade A',
    category: 'Rempah & Herbal',
    buyerName: 'Al-Madina Gourmet Spices LLC',
    destinationCountry: 'Dubai, UAE',
    destinationFlag: '🇦🇪',
    imageUrl: '/src/assets/images/terniva_ekspor_commodities_1794449097514.jpg',
    description:
      'Vanili polong basah berminyak panjang 18-22 cm tanpa belah, aroma wangi vanillin murni untuk jaringan bakery mewah dan hotel di Uni Emirat Arab.',
    specifications: {
      grade: 'Gourmet Grade A (Panjang 18-22 cm)',
      moistureOrQuality: 'Kadar Vanillin > 2.2% · Kadar Air 30-33%',
      packaging: 'Vacuum Pack 5 Kg dalam Master Carton Box',
      certificationsRequired: 'Sertifikat Halal BPJPH, Phytosanitary, Lab Analysis',
    },
    quantityRequired: '3 Ton',
    targetPrice: 'USD $180.00 / Kg CIF',
    targetPriceIdrEquivalent: '± Rp 2.920.000 / Kg',
    incoterm: 'CIF Jebel Ali Port Dubai',
    deadlineDays: 6,
  },
  {
    id: 'EXP-03',
    commodityName: 'Jahe Gajah Segar & Kunyit Kuning Organik',
    category: 'Rempah & Herbal',
    buyerName: 'Nippon Agro Health Co., Ltd',
    destinationCountry: 'Kobe, Jepang',
    destinationFlag: '🇯🇵',
    imageUrl: '/src/assets/images/terniva_hero_landscape_1794449096818.jpg',
    description:
      'Rimpang jahe gajah segar dicuci bersih tanpa tanah untuk bahan baku industri farmasi herbal Jepang. Wajib bebas dari residu pestisida kimia.',
    specifications: {
      grade: 'Fresh Export Grade (Bobot rimpang ≥ 250 gram)',
      moistureOrQuality: 'Bebas Jamur & Bebas Residu Pestisida Kimia',
      packaging: 'Plastic Crates 20 Kg berventilasi (Air Cargo / Reefer)',
      certificationsRequired: 'MAFF Japan Quarantine Standards & Lab Test Non-GMO',
    },
    quantityRequired: '40 Ton (2 Kontainer Reefer 40ft)',
    targetPrice: 'USD $2.20 / Kg FOB',
    targetPriceIdrEquivalent: '± Rp 35.500 / Kg',
    incoterm: 'FOB Pelabuhan Tanjung Priok Jakarta',
    deadlineDays: 9,
  },
  {
    id: 'EXP-04',
    commodityName: 'Domba & Kambing Potong Hidup Standar Halal',
    category: 'Peternakan',
    buyerName: 'Singa Halal Meats Pte Ltd',
    destinationCountry: 'Jurong Port, Singapura',
    destinationFlag: '🇸🇬',
    imageUrl: '/src/assets/images/terniva_mitra_farmer_1794449097085.jpg',
    description:
      'Pengadaan ternak domba/kambing jantan sehat hidup untuk pasar pemotongan halal Singapura. Menjalani masa karantina 14 hari resmi di sentra karantina.',
    specifications: {
      grade: 'Jantan Sehat (Bobot Timbang Hidup 35-45 Kg)',
      moistureOrQuality: 'Bebas PMK, Antraks, & Brucellosis (Vaksin Lengkap)',
      packaging: 'Livestock Vessel Transport berstandar kesejahteraan hewan',
      certificationsRequired: 'SKKH Karantina RI & Singapore SFA Import Permit',
    },
    quantityRequired: '600 Ekor',
    targetPrice: 'SGD $320 / Ekor CIF',
    targetPriceIdrEquivalent: '± Rp 3.800.000 / Ekor',
    incoterm: 'CIF Jurong Port Singapore',
    deadlineDays: 3,
  },
  {
    id: 'EXP-05',
    commodityName: 'Briket Arang Tempurung Kelapa (Shisha Cube)',
    category: 'Olahan Kelapa',
    buyerName: 'Sultan Hookah Trading Group',
    destinationCountry: 'Riyadh, Arab Saudi',
    destinationFlag: '🇸🇦',
    imageUrl: '/src/assets/images/banner_hero_agritech_1794441148053.jpg',
    description:
      'Briket arang batok kelapa 100% alami tanpa bau kimia, tidak berasap, abu putih bersih, khusus untuk kafe dan lounge shisha di Timur Tengah.',
    specifications: {
      grade: 'Cube Premium 25 x 25 x 25 mm',
      moistureOrQuality: 'Abu Putih < 2.5% · Kalori 7.200 Kcal · Bakar > 2 Jam',
      packaging: 'Inner Plastic 1 Kg + Inner Box + Master Box 10 Kg',
      certificationsRequired: 'Self Heating Certificate (SHT) & MSDS Kontainer',
    },
    quantityRequired: '50 Ton (2 Kontainer 40ft)',
    targetPrice: 'USD $1.350 / Ton FOB',
    targetPriceIdrEquivalent: '± Rp 21.800 / Kg',
    incoterm: 'FOB Tanjung Perak Surabaya',
    deadlineDays: 12,
  },
];

export default function MobilePeluangEksporScreen({
  onBack,
  isSubScreen = false,
}: MobilePeluangEksporScreenProps) {
  // 1. Dual Mode State: 'lokal' vs 'ekspor'
  const [activeScope, setActiveScope] = useState<OpportunityScope>('lokal');

  // Local Filter States
  const [selectedLocalSector, setSelectedLocalSector] = useState<LocalSector>('Semua');
  const [selectedLocalRegion, setSelectedLocalRegion] = useState<string>('Semua');
  const [selectedLocalOpp, setSelectedLocalOpp] = useState<LocalOpportunity | null>(null);

  // Export Filter States
  const [selectedExportCategory, setSelectedExportCategory] = useState<string>('Semua');
  const [selectedExportOpp, setSelectedExportOpp] = useState<ExportOpportunity | null>(null);

  // Search
  const [searchQuery, setSearchQuery] = useState('');

  // Form submission state for both Local & Export
  const [offerFarmName, setOfferFarmName] = useState('Kelompok Tani Berkah Sejahtera');
  const [offerVolume, setOfferVolume] = useState('');
  const [offerPrice, setOfferPrice] = useState('');
  const [originLocation, setOriginLocation] = useState('Kab. Boyolali, Jawa Tengah');
  const [readinessTime, setReadinessTime] = useState('Siap Kirim Terjadwal Pekan Ini');
  const [sampleAvailable, setSampleAvailable] = useState('Ya, Sampel Mutu Siap Dikirim (1-2 Hari)');
  const [contactPhone, setContactPhone] = useState('081234567890');
  const [submissionSuccessId, setSubmissionSuccessId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Filter Local Opportunities
  const filteredLocal = LOCAL_OPPORTUNITIES.filter((item) => {
    const matchesSector =
      selectedLocalSector === 'Semua' || item.sector === selectedLocalSector;
    const matchesRegion =
      selectedLocalRegion === 'Semua' || item.region === selectedLocalRegion;
    const matchesSearch =
      !searchQuery ||
      item.commodityName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.buyerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.sector.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesSector && matchesRegion && matchesSearch;
  });

  // Filter Export Opportunities
  const filteredExport = EXPORT_OPPORTUNITIES.filter((item) => {
    const matchesCategory =
      selectedExportCategory === 'Semua' || item.category === selectedExportCategory;
    const matchesSearch =
      !searchQuery ||
      item.commodityName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.buyerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.destinationCountry.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const handleLocalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `TRN-LOKAL-${Math.floor(10000 + Math.random() * 90000)}`;
    setSubmissionSuccessId(id);
    showToast(`Pengajuan pasokan lokal berhasil didaftarkan: ${id}`);
  };

  const handleExportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `TRN-EKSPOR-${Math.floor(10000 + Math.random() * 90000)}`;
    setSubmissionSuccessId(id);
    showToast(`Pengajuan pasokan ekspor berhasil didaftarkan: ${id}`);
  };

  const getSectorIcon = (sector: 'Hotel' | 'Restoran' | 'Pasar' | 'Umum') => {
    switch (sector) {
      case 'Hotel':
        return <Hotel className="w-4 h-4 text-sky-700" />;
      case 'Restoran':
        return <UtensilsCrossed className="w-4 h-4 text-amber-700" />;
      case 'Pasar':
        return <Store className="w-4 h-4 text-emerald-700" />;
      case 'Umum':
        return <Users className="w-4 h-4 text-purple-700" />;
    }
  };

  const getSectorBadge = (sector: 'Hotel' | 'Restoran' | 'Pasar' | 'Umum') => {
    switch (sector) {
      case 'Hotel':
        return (
          <span className="bg-sky-100 text-sky-800 text-[9px] font-bold px-1.5 py-0.2 border border-sky-300">
            HOTEL & RESORT
          </span>
        );
      case 'Restoran':
        return (
          <span className="bg-amber-100 text-amber-900 text-[9px] font-bold px-1.5 py-0.2 border border-amber-300">
            RESTORAN & KAFE
          </span>
        );
      case 'Pasar':
        return (
          <span className="bg-emerald-100 text-emerald-900 text-[9px] font-bold px-1.5 py-0.2 border border-emerald-300">
            PASAR INDUK
          </span>
        );
      case 'Umum':
        return (
          <span className="bg-purple-100 text-purple-900 text-[9px] font-bold px-1.5 py-0.2 border border-purple-300">
            UMUM & UMKM
          </span>
        );
    }
  };

  return (
    <div className="bg-stone-100 min-h-full flex flex-col pb-10 select-none">
      {/* Toast Feedback */}
      {toastMessage && (
        <div className="fixed top-14 left-1/2 -translate-x-1/2 z-50 bg-stone-900 text-white text-xs px-3.5 py-1.5 border border-emerald-500 shadow-xl flex items-center gap-2 animate-fade-in pointer-events-none">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. Header with Dual Mode Toggle (Lokal vs Ekspor) */}
      <div className="bg-emerald-900 text-white px-3.5 py-3 shadow-md sticky top-0 z-30 border-b border-emerald-950">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {isSubScreen && onBack && (
              <button
                onClick={onBack}
                className="p-1 hover:bg-emerald-800 text-white transition-colors cursor-pointer"
                title="Kembali"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}
            <div>
              <div className="flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-emerald-300" />
                <h3 className="text-sm font-bold tracking-tight">Pusat Peluang Pasar Terniva</h3>
              </div>
              <p className="text-[10px] text-emerald-200">
                Peluang Pasokan Pasar Lokal & Ekspor Kontrak B2B
              </p>
            </div>
          </div>
        </div>

        {/* PRIMARY SEGMENT CONTROL: PASAR LOKAL VS EKSPOR GLOBAL */}
        <div className="grid grid-cols-2 gap-1.5 mt-2.5 p-1 bg-emerald-950/70 border border-emerald-800">
          <button
            onClick={() => {
              setActiveScope('lokal');
              setSearchQuery('');
            }}
            className={`py-1.5 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeScope === 'lokal'
                ? 'bg-white text-emerald-950 shadow-xs'
                : 'text-emerald-200 hover:text-white'
            }`}
          >
            <span>🇮🇩 Pasar Lokal</span>
            <span
              className={`text-[9px] px-1.5 py-0.2 font-mono ${
                activeScope === 'lokal'
                  ? 'bg-emerald-100 text-emerald-900 font-bold'
                  : 'bg-emerald-800 text-white'
              }`}
            >
              {LOCAL_OPPORTUNITIES.length} Tender
            </span>
          </button>

          <button
            onClick={() => {
              setActiveScope('ekspor');
              setSearchQuery('');
            }}
            className={`py-1.5 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeScope === 'ekspor'
                ? 'bg-white text-emerald-950 shadow-xs'
                : 'text-emerald-200 hover:text-white'
            }`}
          >
            <span>🌍 Ekspor Global</span>
            <span
              className={`text-[9px] px-1.5 py-0.2 font-mono ${
                activeScope === 'ekspor'
                  ? 'bg-emerald-100 text-emerald-900 font-bold'
                  : 'bg-emerald-800 text-white'
              }`}
            >
              {EXPORT_OPPORTUNITIES.length} Negara
            </span>
          </button>
        </div>
      </div>

      {/* 2. Search & Filter Bar */}
      <div className="bg-white px-3 py-2 border-b border-stone-200 shadow-xs space-y-2">
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder={
              activeScope === 'lokal'
                ? 'Cari komoditas hotel, resto, pasar, katering...'
                : 'Cari komoditas ekspor atau negara buyer...'
            }
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-7 py-1.5 text-xs bg-stone-50 border border-stone-300 text-stone-900 focus:outline-none focus:border-emerald-700"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* MODE A: PASAR LOKAL FILTERS (Hotel, Resto, Pasar, Umum) */}
        {activeScope === 'lokal' && (
          <div className="space-y-1.5">
            {/* Sektor Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-0.5 text-xs">
              {(['Semua', 'Hotel', 'Restoran', 'Pasar', 'Umum'] as LocalSector[]).map((sec) => {
                const isSelected = selectedLocalSector === sec;
                const count =
                  sec === 'Semua'
                    ? LOCAL_OPPORTUNITIES.length
                    : LOCAL_OPPORTUNITIES.filter((i) => i.sector === sec).length;

                return (
                  <button
                    key={sec}
                    onClick={() => setSelectedLocalSector(sec)}
                    className={`px-2.5 py-1 text-[11px] font-bold border whitespace-nowrap transition-colors cursor-pointer flex items-center gap-1 ${
                      isSelected
                        ? 'bg-emerald-900 text-white border-emerald-950 shadow-xs'
                        : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                    }`}
                  >
                    <span>
                      {sec === 'Semua'
                        ? 'Semua Sektor'
                        : sec === 'Hotel'
                        ? '🏨 Hotel'
                        : sec === 'Restoran'
                        ? '🍽️ Restoran'
                        : sec === 'Pasar'
                        ? '🏪 Pasar Induk'
                        : '👥 Umum & UMKM'}
                    </span>
                    <span className="opacity-75 font-mono text-[10px]">({count})</span>
                  </button>
                );
              })}
            </div>

            {/* Region Dropdown Filter */}
            <div className="flex items-center justify-between text-[11px] text-stone-500 pt-1 border-t border-stone-100">
              <span className="font-medium">Filter Wilayah Pengiriman:</span>
              <select
                value={selectedLocalRegion}
                onChange={(e) => setSelectedLocalRegion(e.target.value)}
                className="bg-stone-50 border border-stone-300 px-2 py-0.5 text-[11px] text-stone-800 font-semibold focus:outline-none"
              >
                <option value="Semua">Semua Wilayah Indonesia</option>
                <option value="Jabodetabek">Jabodetabek</option>
                <option value="Jawa Tengah & DIY">Jawa Tengah & DIY</option>
                <option value="Jawa Timur">Jawa Timur</option>
                <option value="Bali & Nusa Tenggara">Bali & Nusa Tenggara</option>
              </select>
            </div>
          </div>
        )}

        {/* MODE B: EKSPOR GLOBAL FILTERS */}
        {activeScope === 'ekspor' && (
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-0.5 text-xs">
            {['Semua', 'Pertanian & Kopi', 'Rempah & Herbal', 'Peternakan', 'Olahan Kelapa'].map(
              (cat) => {
                const isSelected = selectedExportCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedExportCategory(cat)}
                    className={`px-2.5 py-1 text-[11px] font-bold border whitespace-nowrap transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-emerald-900 text-white border-emerald-950 shadow-xs'
                        : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                    }`}
                  >
                    {cat}
                  </button>
                );
              }
            )}
          </div>
        )}
      </div>

      {/* 3. Main Content List */}
      <div className="p-3 space-y-3 flex-1">
        {/* ============================================================== */}
        {/* TAB PASAR LOKAL CONTENT (Hotel, Restaurant, Pasar, Umum)       */}
        {/* ============================================================== */}
        {activeScope === 'lokal' && (
          <div className="space-y-3">
            {/* Info Box Pasar Lokal */}
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 p-3 shadow-2xs">
              <div className="flex items-center justify-between text-xs font-bold text-emerald-950 mb-1">
                <span className="flex items-center gap-1.5">
                  <Store className="w-4 h-4 text-emerald-800" />
                  Kemitraan Pasokan Pasar Domestik
                </span>
                <span className="bg-emerald-700 text-white text-[9px] font-mono px-1.5 py-0.2">
                  B2B Terverifikasi
                </span>
              </div>
              <p className="text-[11px] text-emerald-900 leading-relaxed">
                Tender kebutuhan rutin pasokan pangan segar & ternak untuk jaringan Hotel Bintang 5,
                Restoran, Pasar Induk Tradisional, dan UMKM Katering dengan jaminan pembayaran tepat waktu
                via Terniva Escrow.
              </p>
            </div>

            {/* List of Local Opportunities */}
            {filteredLocal.length === 0 ? (
              <div className="bg-white p-8 text-center border border-stone-200 space-y-2">
                <Store className="w-10 h-10 text-stone-300 mx-auto" />
                <div className="text-xs font-bold text-stone-700">
                  Tidak ada peluang lokal ditemukan
                </div>
                <p className="text-[11px] text-stone-400">
                  Coba ganti filter sektor atau gunakan kata kunci lain.
                </p>
              </div>
            ) : (
              filteredLocal.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    setSelectedLocalOpp(item);
                    setSubmissionSuccessId(null);
                    setOfferVolume(item.quantityRequired.split(' ')[0] || '');
                    setOfferPrice(item.targetPrice.split(' ')[1] || '');
                  }}
                  className="bg-white border border-stone-200 p-3.5 shadow-xs hover:border-emerald-700 transition-all cursor-pointer group space-y-3 relative overflow-hidden"
                >
                  {/* Top Header: Sector Badge + Verified + Deadline */}
                  <div className="flex items-center justify-between gap-2 pb-2 border-b border-stone-100">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-stone-50 border border-stone-200 flex items-center justify-center">
                        {getSectorIcon(item.sector)}
                      </div>
                      {getSectorBadge(item.sector)}
                      <span className="text-[10px] text-stone-400">•</span>
                      <span className="text-[10px] font-bold text-stone-600">{item.buyerType}</span>
                    </div>

                    <div className="flex items-center gap-1 bg-amber-50 text-amber-800 text-[10px] font-mono font-bold px-1.5 py-0.5 border border-amber-200">
                      <Clock className="w-3 h-3 text-amber-600" />
                      <span>{item.deadlineDays} hari lagi</span>
                    </div>
                  </div>

                  {/* Body: Image + Title + Buyer Name */}
                  <div className="flex items-start gap-3">
                    <div className="w-20 h-20 bg-stone-100 border border-stone-200 shrink-0 overflow-hidden relative">
                      <img
                        src={item.imageUrl}
                        alt={item.commodityName}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-stone-900 group-hover:text-emerald-900 transition-colors leading-snug">
                        {item.commodityName}
                      </h4>
                      <p className="text-[11px] font-semibold text-emerald-800 mt-0.5 truncate">
                        {item.buyerName}
                      </p>
                      <div className="flex items-center gap-1 text-[10px] text-stone-500 mt-1">
                        <MapPin className="w-3 h-3 text-stone-400 shrink-0" />
                        <span className="truncate">{item.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Highlights Grid: Target Price + Quantity + Frequency */}
                  <div className="grid grid-cols-2 gap-2 bg-stone-50 border border-stone-200 p-2.5 text-xs">
                    <div>
                      <span className="text-[10px] text-stone-500 block">Target Harga Pembelian:</span>
                      <strong className="text-xs font-black text-emerald-900 font-mono mt-0.5 block">
                        {item.targetPrice}
                      </strong>
                    </div>

                    <div>
                      <span className="text-[10px] text-stone-500 block">Kebutuhan Rutin:</span>
                      <strong className="text-xs font-bold text-stone-800 font-mono mt-0.5 block truncate">
                        {item.quantityRequired}
                      </strong>
                    </div>

                    <div className="col-span-2 pt-1 border-t border-stone-200 flex items-center justify-between text-[10px]">
                      <span className="text-stone-500 flex items-center gap-1">
                        <Truck className="w-3 h-3 text-stone-400" />
                        <span>{item.deliveryFrequency}</span>
                      </span>
                      <span className="font-bold text-stone-700 font-mono">
                        {item.paymentTerms}
                      </span>
                    </div>
                  </div>

                  {/* Footer: Quality requirements + Button */}
                  <div className="flex items-center justify-between pt-1 text-xs">
                    <span className="text-[10px] text-stone-500 truncate max-w-[200px]">
                      🛡️ {item.qualityRequirements.split(',')[0]}
                    </span>

                    <button
                      type="button"
                      className="bg-emerald-800 group-hover:bg-emerald-900 text-white font-bold px-3 py-1.5 text-xs flex items-center gap-1 border border-emerald-950 transition-colors cursor-pointer shrink-0"
                    >
                      <span>Ajukan Pasokan</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB EKSPOR GLOBAL CONTENT (Internasional)                       */}
        {/* ============================================================== */}
        {activeScope === 'ekspor' && (
          <div className="space-y-3">
            <div className="bg-gradient-to-r from-sky-50 to-indigo-50 border border-sky-200 p-3 shadow-2xs">
              <div className="flex items-center justify-between text-xs font-bold text-sky-950 mb-1">
                <span className="flex items-center gap-1.5">
                  <Globe2 className="w-4 h-4 text-sky-800" />
                  Peluang Ekspor Pasar Internasional
                </span>
                <span className="bg-sky-700 text-white text-[9px] font-mono px-1.5 py-0.2">
                  FOB / CIF Escrow
                </span>
              </div>
              <p className="text-[11px] text-sky-900 leading-relaxed">
                Tender komoditas kopi, vanili, rempah, dan olahan agrikultur dengan kontrak buyer luar
                negeri difasilitasi Letter of Credit (L/C) dan standar sertifikasi resmi.
              </p>
            </div>

            {filteredExport.length === 0 ? (
              <div className="bg-white p-8 text-center border border-stone-200 space-y-2">
                <Globe2 className="w-10 h-10 text-stone-300 mx-auto" />
                <div className="text-xs font-bold text-stone-700">
                  Tidak ada peluang ekspor ditemukan
                </div>
              </div>
            ) : (
              filteredExport.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    setSelectedExportOpp(item);
                    setSubmissionSuccessId(null);
                    setOfferVolume(item.quantityRequired.split(' ')[0] || '');
                    setOfferPrice(item.targetPrice.split(' ')[1] || '');
                  }}
                  className="bg-white border border-stone-200 p-3.5 shadow-xs hover:border-sky-700 transition-all cursor-pointer group space-y-3"
                >
                  <div className="flex items-center justify-between pb-2 border-b border-stone-100">
                    <div className="flex items-center gap-1.5">
                      <span className="text-base">{item.destinationFlag}</span>
                      <span className="text-xs font-bold text-stone-800">
                        {item.destinationCountry}
                      </span>
                      <span className="text-[10px] text-stone-400">•</span>
                      <span className="text-[10px] text-stone-500 font-medium">{item.category}</span>
                    </div>
                    <span className="bg-amber-50 text-amber-800 text-[10px] font-mono font-bold px-1.5 py-0.5 border border-amber-200">
                      {item.deadlineDays} hari lagi
                    </span>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-20 h-20 bg-stone-100 border border-stone-200 shrink-0 overflow-hidden">
                      <img
                        src={item.imageUrl}
                        alt={item.commodityName}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-stone-900 group-hover:text-sky-900 transition-colors leading-snug">
                        {item.commodityName}
                      </h4>
                      <p className="text-[11px] font-semibold text-sky-800 mt-0.5 truncate">
                        {item.buyerName}
                      </p>
                      <div className="text-[10px] text-stone-500 mt-1 font-mono">
                        Incoterm: {item.incoterm}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 bg-stone-50 border border-stone-200 p-2.5 text-xs">
                    <div>
                      <span className="text-[10px] text-stone-500 block">Target Harga Buyer:</span>
                      <strong className="text-xs font-black text-emerald-900 font-mono mt-0.5 block">
                        {item.targetPrice}
                      </strong>
                      <span className="text-[9px] text-stone-400 font-mono">
                        {item.targetPriceIdrEquivalent}
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] text-stone-500 block">Kebutuhan Kontrak:</span>
                      <strong className="text-xs font-bold text-stone-800 font-mono mt-0.5 block truncate">
                        {item.quantityRequired}
                      </strong>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1 text-xs">
                    <span className="text-[10px] text-stone-500 truncate max-w-[200px]">
                      📋 {item.specifications.grade}
                    </span>
                    <button
                      type="button"
                      className="bg-sky-800 group-hover:bg-sky-900 text-white font-bold px-3 py-1.5 text-xs flex items-center gap-1 border border-sky-950 transition-colors"
                    >
                      <span>Ajukan Pasokan Ekspor</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* ============================================================== */}
      {/* MODAL 1: FORM PENGAJUAN PASOKAN LOKAL (Hotel, Resto, Pasar)    */}
      {/* ============================================================== */}
      {selectedLocalOpp && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-white w-full max-w-[412px] max-h-[90vh] overflow-y-auto no-scrollbar border border-stone-300 shadow-2xl p-4 space-y-3.5 animate-slide-up">
            <div className="flex items-start justify-between pb-2 border-b border-stone-200">
              <div>
                <div className="flex items-center gap-1.5 mb-1">
                  {getSectorBadge(selectedLocalOpp.sector)}
                  <span className="text-[10px] font-mono text-stone-500">
                    ID: {selectedLocalOpp.id}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-stone-900 leading-snug">
                  {selectedLocalOpp.commodityName}
                </h4>
                <p className="text-xs text-emerald-800 font-semibold mt-0.5">
                  {selectedLocalOpp.buyerName} ({selectedLocalOpp.buyerType})
                </p>
              </div>

              <button
                onClick={() => setSelectedLocalOpp(null)}
                className="text-stone-400 hover:text-stone-700 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {submissionSuccessId ? (
              <div className="bg-emerald-50 border border-emerald-300 p-4 text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-700 mx-auto" />
                <h4 className="text-sm font-bold text-emerald-950">
                  Pengajuan Pasokan Lokal Terkirim!
                </h4>
                <p className="text-xs text-emerald-900 leading-relaxed">
                  Penawaran Anda telah diteruskan ke tim pengadaan{' '}
                  <strong>{selectedLocalOpp.buyerName}</strong>.
                </p>
                <div className="bg-white border border-emerald-200 p-2 text-xs font-mono font-bold text-emerald-900">
                  Nomor Registrasi: {submissionSuccessId}
                </div>
                <p className="text-[11px] text-stone-600">
                  Koordinator pasokan lokal Terniva akan menghubungi kontak WhatsApp {contactPhone}{' '}
                  untuk verifikasi mutu sampel dan jadwal pengiriman perdana.
                </p>
                <button
                  onClick={() => setSelectedLocalOpp(null)}
                  className="w-full mt-2 py-2 bg-emerald-800 text-white font-bold text-xs cursor-pointer"
                >
                  Tutup & Lihat Peluang Lain
                </button>
              </div>
            ) : (
              <form onSubmit={handleLocalSubmit} className="space-y-3 text-xs">
                {/* Specification Box */}
                <div className="bg-stone-50 p-2.5 border border-stone-200 space-y-1.5">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-stone-500">Target Kebutuhan:</span>
                    <strong className="font-mono text-stone-900">
                      {selectedLocalOpp.quantityRequired}
                    </strong>
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-stone-500">Patokan Harga Pembelian:</span>
                    <strong className="font-mono text-emerald-900">
                      {selectedLocalOpp.targetPrice}
                    </strong>
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-stone-500">Siklus Pembayaran:</span>
                    <strong className="text-stone-800 font-mono">
                      {selectedLocalOpp.paymentTerms}
                    </strong>
                  </div>
                  <div className="pt-1 border-t border-stone-200 text-[10px] text-stone-600">
                    <strong>Syarat Mutu:</strong> {selectedLocalOpp.qualityRequirements}
                  </div>
                </div>

                {/* Form Inputs */}
                <div>
                  <label className="block text-[11px] font-bold text-stone-800 mb-1">
                    Nama Usaha / Kelompok Tani / Peternak:
                  </label>
                  <input
                    type="text"
                    required
                    value={offerFarmName}
                    onChange={(e) => setOfferFarmName(e.target.value)}
                    className="w-full px-2.5 py-1.5 bg-stone-50 border border-stone-300 focus:outline-none focus:border-emerald-800 text-xs"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-bold text-stone-800 mb-1">
                      Kapasitas Pasok:
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Cth: 500 Kg / Pekan"
                      value={offerVolume}
                      onChange={(e) => setOfferVolume(e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-stone-50 border border-stone-300 focus:outline-none focus:border-emerald-800 text-xs font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-stone-800 mb-1">
                      Harga Penawaran (Rp):
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Cth: 160.000 / Kg"
                      value={offerPrice}
                      onChange={(e) => setOfferPrice(e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-stone-50 border border-stone-300 focus:outline-none focus:border-emerald-800 text-xs font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-stone-800 mb-1">
                    Lokasi Kandang / Kebun Asal:
                  </label>
                  <input
                    type="text"
                    required
                    value={originLocation}
                    onChange={(e) => setOriginLocation(e.target.value)}
                    className="w-full px-2.5 py-1.5 bg-stone-50 border border-stone-300 focus:outline-none focus:border-emerald-800 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-stone-800 mb-1">
                    Kesiapan Pengiriman Perdana:
                  </label>
                  <select
                    value={readinessTime}
                    onChange={(e) => setReadinessTime(e.target.value)}
                    className="w-full px-2.5 py-1.5 bg-stone-50 border border-stone-300 focus:outline-none focus:border-emerald-800 text-xs"
                  >
                    <option value="Siap Kirim Terjadwal Pekan Ini">
                      Siap Kirim Terjadwal Pekan Ini
                    </option>
                    <option value="Siap Pasok Rutin Mulai Pekan Depan">
                      Siap Pasok Rutin Mulai Pekan Depan
                    </option>
                    <option value="Siap Kirim Sesuai Tanggal Panen (H+7 Hari)">
                      Siap Kirim Sesuai Tanggal Panen (H+7 Hari)
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-stone-800 mb-1">
                    Kesiapan Uji Sampel Mutu:
                  </label>
                  <select
                    value={sampleAvailable}
                    onChange={(e) => setSampleAvailable(e.target.value)}
                    className="w-full px-2.5 py-1.5 bg-stone-50 border border-stone-300 focus:outline-none focus:border-emerald-800 text-xs"
                  >
                    <option value="Ya, Sampel Mutu Siap Dikirim (1-2 Hari)">
                      Ya, Sampel Mutu Siap Dikirim (1-2 Hari)
                    </option>
                    <option value="Sampel Dapat Ditinjau Langsung di Kandang/Kebun">
                      Sampel Dapat Ditinjau Langsung di Kandang/Kebun
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-stone-800 mb-1">
                    Nomor WhatsApp Penanggung Jawab:
                  </label>
                  <input
                    type="tel"
                    required
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    className="w-full px-2.5 py-1.5 bg-stone-50 border border-stone-300 focus:outline-none focus:border-emerald-800 text-xs font-mono"
                  />
                </div>

                <div className="bg-emerald-50 p-2 border border-emerald-200 text-[10px] text-emerald-950 leading-tight">
                  🛡️ <strong>Jaminan Pembayaran Aman Terniva:</strong> Transaksi B2B lokal
                  terlindungi dengan sistem faktur resmi & escrow perbankan nasional.
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs flex items-center justify-center gap-1.5 border border-emerald-950 transition-colors shadow-xs cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Kirim Penawaran Pasokan Lokal</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL 2: FORM PENGAJUAN PASOKAN EKSPOR                         */}
      {/* ============================================================== */}
      {selectedExportOpp && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-white w-full max-w-[412px] max-h-[90vh] overflow-y-auto no-scrollbar border border-stone-300 shadow-2xl p-4 space-y-3.5 animate-slide-up">
            <div className="flex items-start justify-between pb-2 border-b border-stone-200">
              <div>
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="text-base">{selectedExportOpp.destinationFlag}</span>
                  <span className="bg-sky-100 text-sky-800 text-[9px] font-bold px-1.5 py-0.2">
                    EKSPOR GLOBAL
                  </span>
                  <span className="text-[10px] font-mono text-stone-500">
                    ID: {selectedExportOpp.id}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-stone-900 leading-snug">
                  {selectedExportOpp.commodityName}
                </h4>
                <p className="text-xs text-sky-800 font-semibold mt-0.5">
                  {selectedExportOpp.buyerName} ({selectedExportOpp.destinationCountry})
                </p>
              </div>

              <button
                onClick={() => setSelectedExportOpp(null)}
                className="text-stone-400 hover:text-stone-700 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {submissionSuccessId ? (
              <div className="bg-sky-50 border border-sky-300 p-4 text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-sky-700 mx-auto" />
                <h4 className="text-sm font-bold text-sky-950">
                  Pengajuan Ekspor Terkirim!
                </h4>
                <div className="bg-white border border-sky-200 p-2 text-xs font-mono font-bold text-sky-900">
                  Nomor Registrasi: {submissionSuccessId}
                </div>
                <p className="text-[11px] text-stone-600">
                  Tim Terniva Trade Desk akan memverifikasi dokumen ekspor dan menghubungi nomor{' '}
                  {contactPhone}.
                </p>
                <button
                  onClick={() => setSelectedExportOpp(null)}
                  className="w-full mt-2 py-2 bg-sky-800 text-white font-bold text-xs"
                >
                  Tutup & Lihat Peluang Lain
                </button>
              </div>
            ) : (
              <form onSubmit={handleExportSubmit} className="space-y-3 text-xs">
                <div className="bg-stone-50 p-2.5 border border-stone-200 space-y-1.5">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-stone-500">Target Volume Buyer:</span>
                    <strong className="font-mono text-stone-900">
                      {selectedExportOpp.quantityRequired}
                    </strong>
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-stone-500">Target Harga:</span>
                    <strong className="font-mono text-sky-900">
                      {selectedExportOpp.targetPrice}
                    </strong>
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-stone-500">Incoterm Pelabuhan:</span>
                    <strong className="text-stone-800 font-mono">
                      {selectedExportOpp.incoterm}
                    </strong>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-stone-800 mb-1">
                    Volume Penawaran Ekspor:
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: 10 Ton atau 1 Kontainer 20ft"
                    value={offerVolume}
                    onChange={(e) => setOfferVolume(e.target.value)}
                    className="w-full px-2.5 py-1.5 bg-stone-50 border border-stone-300 focus:outline-none focus:border-sky-800 text-xs font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-stone-800 mb-1">
                    Harga Penawaran Anda:
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: USD $8.40 / Kg FOB"
                    value={offerPrice}
                    onChange={(e) => setOfferPrice(e.target.value)}
                    className="w-full px-2.5 py-1.5 bg-stone-50 border border-stone-300 focus:outline-none focus:border-sky-800 text-xs font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-stone-800 mb-1">
                    Lokasi Kebun / Gudang Pasokan:
                  </label>
                  <input
                    type="text"
                    required
                    value={originLocation}
                    onChange={(e) => setOriginLocation(e.target.value)}
                    className="w-full px-2.5 py-1.5 bg-stone-50 border border-stone-300 focus:outline-none focus:border-sky-800 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-stone-800 mb-1">
                    Nomor WhatsApp Kontak:
                  </label>
                  <input
                    type="tel"
                    required
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    className="w-full px-2.5 py-1.5 bg-stone-50 border border-stone-300 focus:outline-none focus:border-sky-800 text-xs font-mono"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-sky-800 hover:bg-sky-900 text-white font-bold text-xs flex items-center justify-center gap-1.5 border border-sky-950 transition-colors shadow-xs cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Kirim Penawaran ke Buyer Ekspor</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
