import { useState, useRef, useEffect } from 'react';
import {
  ArrowLeft,
  Stethoscope,
  Sprout,
  AlertTriangle,
  MessageSquare,
  CheckCircle2,
  Search,
  Sparkles,
  Camera,
  Upload,
  Coins,
  CreditCard,
  Wallet,
  ShieldCheck,
  Star,
  ChevronRight,
  Send,
  X,
  Phone,
  Clock,
  ShoppingBag,
  Plus,
  FileText,
  Info,
  Check,
  RotateCcw,
} from 'lucide-react';
import { DOCTORS_DATA, SYMPTOM_TRIAGE_DB } from '../../data/ternivaData';
import { Doctor } from '../../types';
import { MobileProduct } from '../types';

interface MobileKonsultasiScreenProps {
  onBack: () => void;
  onOpenLiveChat?: (doctor: Doctor) => void;
  onAddToCart?: (product: MobileProduct, quantity?: number) => void;
  userWalletBalance?: number;
}

// Resep Digital Item
export interface PrescriptionItem {
  id: string;
  category: 'Pupuk' | 'Obat' | 'Vaksin' | 'Pakan';
  name: string;
  dosage: string;
  instructions: string;
  price: number;
  marketProductId?: string;
}

export interface ConsultationRecord {
  id: string;
  doctorName: string;
  doctorType: 'hewan' | 'tanaman' | 'ai';
  patientType: string;
  diagnosis: string;
  date: string;
  status: 'Aktif' | 'Selesai';
  prescriptions: PrescriptionItem[];
}

// Preset Sampel Kasus untuk Orang Awam (Sekali Klik)
const SAMPLE_CASES = [
  {
    id: 'case-1',
    label: 'Cabai: Patek & Antraknosa',
    category: 'tanaman',
    symptom: 'Buah cabai membusuk dengan bercak hitam melingkar kebasahan',
    image: '/src/assets/images/terniva_ekspor_commodities_1794449097514.jpg',
    diagnosis: 'Penyakit Antraknosa / Patek (Jamur Colletotrichum capsici)',
    accuracy: '98% Sangat Akurat',
    severity: 'Tinggi (Menular Cepat via Air Hujan)',
    explanation: 'Jamur antraknosa menyerang saat kelembapan udara tinggi dan curah hujan meningkat. Spora jamur menembus kulit buah cabai sehingga timbul bercak cekung menghitam.',
    firstAid: [
      'Petik segera semua buah cabai yang bergejala busuk dan kumpulkan di kantong terpisah lalu kubur/bakar.',
      'Lakukan perompesan daun-daun bagian bawah dekat permukaan tanah agar sirkulasi udara lebih lancar.',
      'Semprotkan fungisida kontak saat pagi hari setelah embun kering.',
    ],
    prescriptions: [
      {
        id: 'rx-p-1',
        category: 'Obat',
        name: 'Fungisida Mankozeb 80WP Kontak Protektif (1 Kg)',
        dosage: '2 - 2.5 gram per Liter air bersih',
        instructions: 'Semprot merata ke seluruh daun dan buah cabai setiap 5 hari sekali saat cuaca berawan/pagi.',
        price: 85000,
      },
      {
        id: 'rx-p-2',
        category: 'Pupuk',
        name: 'Pupuk Hayati Majemuk Organik Bio-Trichoderma (5 Liter)',
        dosage: '10 ml per Liter air (Kocor)',
        instructions: 'Kocorkan pada lubang tanam/perakaran 200 ml per pohon untuk menekan spora jamur dalam tanah.',
        price: 95000,
      },
      {
        id: 'rx-p-3',
        category: 'Pupuk',
        name: 'Kalsium Boron Organik Pengeras Kulit Buah (1 Kg)',
        dosage: '2 gram per Liter air',
        instructions: 'Campurkan saat penyemprotan untuk mempertebal lapisan kutikula buah agar tidak mudah ditembus spora.',
        price: 45000,
      },
      {
        id: 'rx-p-4',
        category: 'Pakan',
        name: 'Biostimulan Asam Amino Pemulih Stres Tanaman (500 ml)',
        dosage: '1.5 ml per Liter air',
        instructions: 'Bantu memulihkan fotosintesis tanaman setelah infeksi jamur.',
        price: 55000,
      },
    ] as PrescriptionItem[],
  },
  {
    id: 'case-2',
    label: 'Sapi: Gejala PMK (Liur Berbusa)',
    category: 'hewan',
    symptom: 'Air liur menetes berbusa, lepuh pada lidah & gusi, kaki pincang gemetar',
    image: '/src/assets/images/terniva_mitra_farmer_1794449097085.jpg',
    diagnosis: 'Suspek Penyakit Mulut dan Kuku (Aphtae Epizooticae - FMD)',
    accuracy: '96% Indikasi Kuat',
    severity: 'Darurat Kritis (Sangat Menular)',
    explanation: 'Virus PMK menyerang epitel mulut dan celah kuku hewan berkuku belah (sapi, domba, kambing). Menyebabkan rasa nyeri hebat saat mengunyah dan berjalan.',
    firstAid: [
      'Isolasi sapi dari kawanan kandang lain dalam radius minimal 10 meter.',
      'Semprot/olesi rongga mulut dengan larutan asam sitrat 2% atau cuka makan encer untuk meredakan nyeri.',
      'Bersihkan sela-sela kuku dengan povidone iodine dan berikan alas kandang jerami kering.',
    ],
    prescriptions: [
      {
        id: 'rx-h-1',
        category: 'Obat',
        name: 'Salep Antiseptik & Spray Oxytetracycline Hewan (200 ml)',
        dosage: 'Semprot 2x sehari pada luka kuku dan moncong',
        instructions: 'Cegah infeksi bakteri sekunder (myiasis/belatung) pada luka terbuka celah kuku.',
        price: 65000,
      },
      {
        id: 'rx-h-2',
        category: 'Vaksin',
        name: 'Vaksin Aftosa PMK Inaktif Rekomendasi Kementan',
        dosage: '2 ml injeksi intramuskular (Oleh Paramedis)',
        instructions: 'Diberikan pada hewan sehat di sekitar radius kandang sebagai sabuk proteksi penularan.',
        price: 120000,
      },
      {
        id: 'rx-h-3',
        category: 'Pakan',
        name: 'Konsentrat Pakan Sapi Lembut Bubur Energi Tinggi (50 Kg)',
        dosage: '3 - 4 kg per hari diseduh air hangat',
        instructions: 'Karena mulut sapi perih, berikan pakan lunak dan air gula merah agar tidak lemas kekurangan nutrisi.',
        price: 265000,
      },
      {
        id: 'rx-h-4',
        category: 'Pakan',
        name: 'Premix Multivitamin & Mineral Elektrolit Sapi (1 Kg)',
        dosage: '2 sendok makan per wadah minum',
        instructions: 'Mempercepat regenerasi jaringan mukosa mulut dan meningkatkan nafsu makan.',
        price: 50000,
      },
    ] as PrescriptionItem[],
  },
  {
    id: 'case-3',
    label: 'Padi: Daun Mengering (Blas)',
    category: 'tanaman',
    symptom: 'Bercak belah ketupat warna cokelat keabuan pada helai daun padi',
    image: '/src/assets/images/banner_hero_agritech_1794441148053.jpg',
    diagnosis: 'Penyakit Blas Daun / Patah Leher (Pyricularia oryzae)',
    accuracy: '95% Akurat',
    severity: 'Sedang - Tinggi (Penyusutan Bobot Gabah)',
    explanation: 'Jamur Pyricularia berkembang pesat bila pemupukan Urea (Nitrogen) terlalu berlebihan tanpa diimbangi Kalium dan Silika.',
    firstAid: [
      'Hentikan sementara aplikasi pupuk Urea / Nitrogen.',
      'Jaga ketinggian air sawah pada kondisi macak-macak (tidak terlalu tergenang dalam).',
      'Lakukan penyemprotan fungisida sistemik berbahan aktif Trisiklazol.',
    ],
    prescriptions: [
      {
        id: 'rx-b-1',
        category: 'Obat',
        name: 'Fungisida Sistemik Trisiklazol 75WP Khusus Blas Padi (500g)',
        dosage: '1 - 1.5 gram per Liter air',
        instructions: 'Semprotkan merata pada umur 25 HST dan 45 HST menjelang keluar malai.',
        price: 92000,
      },
      {
        id: 'rx-b-2',
        category: 'Pupuk',
        name: 'Pupuk Silika Cair Penguat Batang & Daun Padi (1 Liter)',
        dosage: '2 ml per Liter air',
        instructions: 'Membuat dinding sel daun padi menjadi keras seperti kaca sehingga hifa jamur tidak bisa menembus.',
        price: 78000,
      },
      {
        id: 'rx-b-3',
        category: 'Pupuk',
        name: 'Pupuk Kalium Murni KCL Hayati (1 Kg)',
        dosage: '3 gram per Liter kocor',
        instructions: 'Bantu pengisian bulir gabah padat bernas tanpa malai hampa.',
        price: 48000,
      },
    ] as PrescriptionItem[],
  },
  {
    id: 'case-4',
    label: 'Sapi: Ambing Mastitis Bengkak',
    category: 'hewan',
    symptom: 'Ambing susu sapi perah mengeras panas kemerahan, susu menggumpal berlendir',
    image: '/src/assets/images/terniva_dok_konsultasi_1794449097905.jpg',
    diagnosis: 'Mastitis Klinis Akut (Infeksi Streptococcus / E. coli)',
    accuracy: '97% Akurat',
    severity: 'Tinggi (Kerusakan Kelenjar Ambing)',
    explanation: 'Bakteri masuk melalui lubang puting sapi pasca pemerahan saat sfingter puting masih terbuka.',
    firstAid: [
      'Perah susu yang rusak secara tuntas ke wadah terpisah (jangan dicampur ke tangki penampung).',
      'Kompres ambing dengan air hangat selama 10-15 menit untuk melancarkan sirkulasi.',
      'Lakukan dipping puting dengan povidone iodine 0.5% setiap selesai perah.',
    ],
    prescriptions: [
      {
        id: 'rx-m-1',
        category: 'Obat',
        name: 'Antibiotik Intramamari Khusus Mastitis Tabung Suntik Puting',
        dosage: '1 syringe per puting terinfeksi setelah dikosongkan',
        instructions: 'Masukkan perlahan melalui lubang puting dan urut pangkal ambing ke arah atas.',
        price: 85000,
      },
      {
        id: 'rx-m-2',
        category: 'Obat',
        name: 'Larutan Teat Dip Antiseptik Puting Sapi Perah (1 Liter)',
        dosage: 'Celupkan 3/4 panjang puting',
        instructions: 'Gunakan cangkir celup segera setelah selesai pemerahan pagi dan sore.',
        price: 60000,
      },
      {
        id: 'rx-m-3',
        category: 'Pakan',
        name: 'Premix Vitamin E & Selenium Peningkat Imunitas Ambing (1 Kg)',
        dosage: '50 gram per ekor per hari dicampur pakan',
        instructions: 'Menurunkan jumlah Somatic Cell Count (SCC) pada susu perah.',
        price: 90000,
      },
    ] as PrescriptionItem[],
  },
];

export default function MobileKonsultasiScreen({
  onBack,
  onAddToCart,
  userWalletBalance = 4850000,
}: MobileKonsultasiScreenProps) {
  // Main Tab: 'spesialis' (Halodoc Paid), 'ai_gratis' (Free AI), 'riwayat' (Prescriptions & Records)
  const [activeMainTab, setActiveMainTab] = useState<'spesialis' | 'ai_gratis' | 'riwayat'>('spesialis');

  // Filter Sub-category for Specialist Doctors
  const [doctorCategoryFilter, setDoctorCategoryFilter] = useState<'semua' | 'sapi' | 'unggas' | 'pangan' | 'hortikultura' | 'perkebunan'>('semua');

  // Payment / Booking Sheet State
  const [selectedDoctorForBooking, setSelectedDoctorForBooking] = useState<Doctor | null>(null);
  const [bookingPatientType, setBookingPatientType] = useState('Sapi Potong / Perah');
  const [bookingComplaint, setBookingComplaint] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'wallet' | 'qris' | 'va'>('wallet');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [activeLiveConsultationDoctor, setActiveLiveConsultationDoctor] = useState<Doctor | null>(null);

  // Live Chat States
  const [chatMessages, setChatMessages] = useState<{ id: string; sender: 'doctor' | 'user' | 'system'; text: string; time: string }[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [isDoctorTyping, setIsDoctorTyping] = useState(false);
  const [hasIssuedPrescription, setHasIssuedPrescription] = useState(false);
  const [activePrescriptionList, setActivePrescriptionList] = useState<PrescriptionItem[]>([]);
  const [remainingSessionSeconds, setRemainingSessionSeconds] = useState(1790); // ~30 minutes
  const chatScrollRef = useRef<HTMLDivElement>(null);

  // AI Diagnostic States
  const [aiUploadedPhoto, setAiUploadedPhoto] = useState<string | null>(null);
  const [aiSelectedCase, setAiSelectedCase] = useState<(typeof SAMPLE_CASES)[0] | null>(null);
  const [aiCustomDescription, setAiCustomDescription] = useState('');
  const [aiSelectedSymptomTags, setAiSelectedSymptomTags] = useState<string[]>([]);
  const [isAiScanning, setIsAiScanning] = useState(false);
  const [aiDiagnosticResult, setAiDiagnosticResult] = useState<(typeof SAMPLE_CASES)[0] | null>(null);

  // Toast Notification
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  // Saved Prescriptions History
  const [savedPrescriptions, setSavedPrescriptions] = useState<ConsultationRecord[]>([
    {
      id: 'REC-2025-01',
      doctorName: 'drh. Aryo Wibisono, M.Si',
      doctorType: 'hewan',
      patientType: 'Sapi Limousin Kandang Subang',
      diagnosis: 'Indikasi Kembung Rumen Akut (Bloat)',
      date: '08 Maret 2025',
      status: 'Selesai',
      prescriptions: [
        {
          id: 'rx-old-1',
          category: 'Obat',
          name: 'Larutan Antibloat Oral Karminatif (500 ml)',
          dosage: '250 ml sekali minum via botol drench',
          instructions: 'Posisikan kepala sapi tegak, berikan perlahan.',
          price: 55000,
        },
        {
          id: 'rx-old-2',
          category: 'Pakan',
          name: 'Konsentrat Pakan Sapi Penggemukan High Protein (50kg)',
          dosage: '3 kg / hari',
          instructions: 'Kurangi pakan hijauan basah/segar selama 3 hari.',
          price: 265000,
        },
      ],
    },
    {
      id: 'REC-2025-02',
      doctorName: 'AI AgroDokter Terniva',
      doctorType: 'ai',
      patientType: 'Kebun Cabai Rawit Blok B',
      diagnosis: 'Penyakit Antraknosa / Patek Buah Cabai',
      date: '05 Maret 2025',
      status: 'Selesai',
      prescriptions: SAMPLE_CASES[0].prescriptions,
    },
  ]);

  // Session timer countdown during active consultation
  useEffect(() => {
    if (!activeLiveConsultationDoctor) return;
    const timer = setInterval(() => {
      setRemainingSessionSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [activeLiveConsultationDoctor]);

  useEffect(() => {
    chatScrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isDoctorTyping]);

  // Filter doctors
  const filteredDoctors = DOCTORS_DATA.filter((doc) => {
    if (doctorCategoryFilter === 'semua') return true;
    if (doctorCategoryFilter === 'sapi') return doc.type === 'hewan' && doc.specialty.toLowerCase().includes('sapi');
    if (doctorCategoryFilter === 'unggas') return doc.type === 'hewan' && doc.specialty.toLowerCase().includes('unggas');
    if (doctorCategoryFilter === 'pangan') return doc.type === 'tanaman' && doc.specialty.toLowerCase().includes('pangan');
    if (doctorCategoryFilter === 'hortikultura') return doc.type === 'tanaman' && (doc.specialty.toLowerCase().includes('hortikultura') || doc.specialty.toLowerCase().includes('cabai'));
    if (doctorCategoryFilter === 'perkebunan') return doc.type === 'tanaman' && doc.specialty.toLowerCase().includes('kopi');
    return true;
  });

  // Start booking Halodoc consultation
  const handleOpenBooking = (doc: Doctor) => {
    setSelectedDoctorForBooking(doc);
    setBookingPatientType(doc.type === 'hewan' ? 'Sapi Potong / Kambing' : 'Tanaman Cabai / Padi');
    setBookingComplaint('');
  };

  // Confirm Halodoc payment
  const handleConfirmPaymentAndStartConsultation = () => {
    if (!selectedDoctorForBooking) return;
    setIsProcessingPayment(true);

    setTimeout(() => {
      setIsProcessingPayment(false);
      const doc = selectedDoctorForBooking;
      setSelectedDoctorForBooking(null);
      setActiveLiveConsultationDoctor(doc);
      setRemainingSessionSeconds(1800); // 30 minutes

      // Initial messages from doctor
      const greetingText =
        doc.type === 'hewan'
          ? `Halo Pak Budi, saya ${doc.name}. Saya telah menerima data keluhan Anda terkait ${bookingPatientType}: "${bookingComplaint || 'Pemeriksaan rutin kesehatan'}". Silakan ceritakan gejala apa saja yang tampak pada ternak, dan jika ada, mohon lampirkan foto kondisi ternak Anda.`
          : `Halo Pak Budi, saya ${doc.name}. Saya telah membaca laporan Anda untuk ${bookingPatientType}: "${bookingComplaint || 'Konsultasi hama/penyakit tanaman'}". Bagian tanaman mana yang tampak sakit (daun, batang, akar, atau buah) dan sudah berapa hari?`;

      setChatMessages([
        {
          id: 'sys-1',
          sender: 'system',
          text: `Pembayaran sesi telekonsultasi berhasil. Anda terhubung langsung dengan ${doc.name} (SIP: ${doc.sipNumber}). Sesi aktif selama 30 menit.`,
          time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
        },
        {
          id: 'doc-1',
          sender: 'doctor',
          text: greetingText,
          time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
        },
      ]);

      // Set realistic default prescription for this consultation
      const defaultRx: PrescriptionItem[] =
        doc.type === 'hewan' ? SAMPLE_CASES[1].prescriptions : SAMPLE_CASES[0].prescriptions;
      setActivePrescriptionList(defaultRx);
      setHasIssuedPrescription(false);
    }, 1200);
  };

  // Send message in doctor consultation
  const handleSendChatMessage = (textToSend?: string) => {
    const text = textToSend || chatInput;
    if (!text.trim() || !activeLiveConsultationDoctor) return;

    const userMsg = {
      id: `msg-${Date.now()}`,
      sender: 'user' as const,
      text: text.trim(),
      time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
    };

    setChatMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setChatInput('');

    // Doctor response simulation
    setIsDoctorTyping(true);
    setTimeout(() => {
      setIsDoctorTyping(false);
      let reply = '';
      const doc = activeLiveConsultationDoctor;

      if (doc.type === 'hewan') {
        reply = `Baik Pak Budi, dari ciri-ciri yang Anda sebutkan, ada indikasi peradangan/stres pencernaan. Segera berikan cairan penambah energi dan obat antiseptik. Saya telah menerbitkan Resep Digital Resmi Terniva di bawah yang mencakup: Obat Antiseptik, Vaksin Pencegahan, dan Konsentrat Pakan Lunak untuk mempercepat penyembuhan.`;
      } else {
        reply = `Catatan saya: gejala ini mengarah pada infeksi jamur patogen tajuk. Hindari penggunaan pupuk Nitrogen berlebih dan lakukan isolasi daun yang sakit. Saya telah menerbitkan Resep Digital Resmi Terniva di bawah yang mencakup: Fungisida Pelindung, Pupuk Hayati Trichoderma, dan Biostimulan Pemulih Tanaman.`;
      }

      setChatMessages((prev) => [
        ...prev,
        {
          id: `doc-reply-${Date.now()}`,
          sender: 'doctor',
          text: reply,
          time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
      setHasIssuedPrescription(true);
    }, 1400);
  };

  // AI Diagnostic Run
  const handleRunAiDiagnosis = () => {
    if (!aiUploadedPhoto && !aiSelectedCase && !aiCustomDescription.trim() && aiSelectedSymptomTags.length === 0) {
      showToast('Silakan pilih salah satu contoh gejala atau ketik deskripsi masalah!');
      return;
    }

    setIsAiScanning(true);
    setTimeout(() => {
      setIsAiScanning(false);
      const chosen = aiSelectedCase || SAMPLE_CASES[0];
      setAiDiagnosticResult(chosen);
      showToast('Hasil analisis AI AgroDokter Terniva telah terbit!');
    }, 1800);
  };

  // Add all prescriptions to cart
  const handleAddAllPrescriptionsToCart = (items: PrescriptionItem[]) => {
    let count = 0;
    items.forEach((item) => {
      if (onAddToCart) {
        onAddToCart(
          {
            id: `prod-${item.id}`,
            name: item.name,
            category: item.category === 'Pupuk' ? 'Pupuk' : item.category === 'Pakan' ? 'Pakan' : 'Pertanian',
            price: item.price,
            stock: 99,
            rating: 4.9,
            soldCount: 350,
            imageUrl:
              item.category === 'Pupuk'
                ? '/src/assets/images/terniva_dok_konsultasi_1794449097905.jpg'
                : item.category === 'Pakan'
                ? '/src/assets/images/terniva_hero_landscape_1794449096818.jpg'
                : '/src/assets/images/terniva_ekspor_commodities_1794449097514.jpg',
            supplier: 'Depo Resmi Farmasi Terniva',
            location: 'Subang, Jawa Barat',
            minOrder: '1 Unit',
            description: `${item.name}. Dosis anjuran dokter: ${item.dosage}. Aturan pakai: ${item.instructions}`,
            isVerified: true,
          },
          1
        );
        count++;
      }
    });
    showToast(`Berhasil menambahkan ${items.length} produk resep resmi ke keranjang belanja!`);
  };

  // Format seconds to mm:ss
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-stone-100 min-h-full pb-10 text-stone-900">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed top-14 left-1/2 -translate-x-1/2 z-50 bg-stone-900 text-white px-3 py-2 text-xs font-bold shadow-2xl flex items-center gap-2 border border-emerald-500 animate-in fade-in duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Top Header */}
      <div className="bg-white border-b border-stone-200 px-3 py-2.5 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-2.5">
          <button
            onClick={onBack}
            className="p-1 hover:bg-stone-100 text-stone-700 transition-colors"
            title="Kembali"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h3 className="text-xs font-bold text-stone-900 leading-tight">
              Konsultasi Dokter & AgroAI
            </h3>
            <span className="text-[10px] text-emerald-800 font-semibold">
              Telemedisin Ahli Pertanian & AI AgroDokter Gratis 24 Jam
            </span>
          </div>
        </div>
      </div>

      {/* 3 Main Tabs: Halodoc Specialists, Free AI Doctor, Prescriptions/History */}
      <div className="bg-white border-b border-stone-200 grid grid-cols-3 text-center text-xs font-bold shrink-0">
        <button
          onClick={() => setActiveMainTab('spesialis')}
          className={`py-3 border-b-2 flex flex-col sm:flex-row items-center justify-center gap-1 transition-colors ${
            activeMainTab === 'spesialis'
              ? 'border-emerald-800 text-emerald-900 bg-emerald-50/50'
              : 'border-transparent text-stone-500 hover:text-stone-800'
          }`}
        >
          <Stethoscope className="w-4 h-4 text-emerald-700" />
          <span>Dokter Spesialis</span>
        </button>

        <button
          onClick={() => setActiveMainTab('ai_gratis')}
          className={`py-3 border-b-2 flex flex-col sm:flex-row items-center justify-center gap-1 transition-colors relative ${
            activeMainTab === 'ai_gratis'
              ? 'border-emerald-800 text-emerald-900 bg-emerald-50/50'
              : 'border-transparent text-stone-500 hover:text-stone-800'
          }`}
        >
          <span className="absolute top-1 right-2 bg-amber-500 text-white text-[8px] font-bold px-1 rounded-none leading-tight">
            GRATIS
          </span>
          <Sparkles className="w-4 h-4 text-amber-600" />
          <span>Dokter AI (Foto)</span>
        </button>

        <button
          onClick={() => setActiveMainTab('riwayat')}
          className={`py-3 border-b-2 flex flex-col sm:flex-row items-center justify-center gap-1 transition-colors ${
            activeMainTab === 'riwayat'
              ? 'border-emerald-800 text-emerald-900 bg-emerald-50/50'
              : 'border-transparent text-stone-500 hover:text-stone-800'
          }`}
        >
          <FileText className="w-4 h-4 text-stone-600" />
          <span>Resep Saya</span>
        </button>
      </div>

      {/* ==================================================================== */}
      {/* TAB 1: DOKTER SPESIALIS (HALODOC MODEL - BERBAYAR & RESEP DIGITAL)   */}
      {/* ==================================================================== */}
      {activeMainTab === 'spesialis' && (
        <div className="p-3 space-y-3">
          {/* Halodoc Trust Banner */}
          <div className="p-3 bg-gradient-to-r from-emerald-900 to-emerald-800 text-white flex items-center justify-between border border-emerald-700">
            <div className="space-y-0.5">
              <span className="text-[9px] uppercase tracking-wider font-bold text-emerald-300">
                Layanan Telemedisin Halodoc Agribisnis
              </span>
              <h4 className="text-xs font-bold leading-snug">Pilih Dokter Spesialis Berlisensi</h4>
              <p className="text-[10px] text-emerald-100 leading-tight">
                Konsultasi privat 30 menit via chat, video & terbit resep resmi pupuk, obat, vaksin & pakan.
              </p>
            </div>
            <ShieldCheck className="w-10 h-10 text-emerald-300 shrink-0 opacity-80" />
          </div>

          {/* Category Filter Pills (Mudah untuk Orang Awam) */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
            {[
              { id: 'semua', label: 'Semua Dokter' },
              { id: 'sapi', label: '🐮 Sapi & Kambing' },
              { id: 'unggas', label: '🐔 Unggas & Ayam' },
              { id: 'pangan', label: '🌾 Padi & Jagung' },
              { id: 'hortikultura', label: '🌶️ Cabai & Sayur' },
              { id: 'perkebunan', label: '☕ Kopi & Rempah' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setDoctorCategoryFilter(f.id as any)}
                className={`px-3 py-1.5 text-xs font-bold whitespace-nowrap border transition-colors ${
                  doctorCategoryFilter === f.id
                    ? 'bg-emerald-800 text-white border-emerald-800'
                    : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-50'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Doctor Cards List (Halodoc Style) */}
          <div className="space-y-3">
            {filteredDoctors.map((doc) => {
              const feeAmount = doc.feeAmount || 35000;
              const originalFee = doc.originalFeeAmount || 50000;

              return (
                <div
                  key={doc.id}
                  className="bg-white border border-stone-200 p-3.5 space-y-3 shadow-2xs hover:border-emerald-700 transition-colors"
                >
                  {/* Top Doctor Info */}
                  <div className="flex gap-3 items-start">
                    {/* Doctor Avatar with Online Badge */}
                    <div className="relative shrink-0">
                      <div className="w-14 h-14 bg-emerald-100 border border-emerald-300 overflow-hidden flex items-center justify-center">
                        <img
                          src="/src/assets/images/terniva_dok_konsultasi_1794449097905.jpg"
                          alt={doc.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span
                        className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full"
                        title="Online Siaga"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider">
                          {doc.type === 'hewan' ? 'Dokter Hewan Ternak' : 'Dokter Tanaman & Pangan'}
                        </span>
                        <div className="flex items-center gap-1 text-[11px] font-bold text-amber-600 bg-amber-50 px-1.5 py-0.5 border border-amber-200">
                          <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                          <span>{doc.rating}</span>
                          <span className="text-[9px] text-stone-400">({doc.reviewsCount})</span>
                        </div>
                      </div>

                      <h4 className="text-xs font-bold text-stone-900 leading-snug truncate mt-0.5">
                        {doc.name}
                      </h4>
                      <p className="text-[11px] text-stone-600 font-medium leading-tight">
                        {doc.specialty}
                      </p>

                      <div className="flex items-center gap-2 text-[10px] text-stone-500 mt-1 font-mono">
                        <span>{doc.experienceYears} Thn Pengalaman</span>
                        <span>•</span>
                        <span>{doc.sipNumber}</span>
                      </div>
                    </div>
                  </div>

                  {/* Focus Areas Tag Pills */}
                  <div className="flex flex-wrap gap-1">
                    {doc.focusAreas.slice(0, 3).map((area, idx) => (
                      <span
                        key={idx}
                        className="text-[9px] font-medium bg-stone-100 text-stone-700 px-2 py-0.5 border border-stone-200"
                      >
                        {area}
                      </span>
                    ))}
                  </div>

                  {/* Pricing & Booking Footer */}
                  <div className="pt-2.5 border-t border-stone-100 flex items-center justify-between">
                    <div>
                      <div className="text-[9px] text-stone-400 line-through">
                        Rp {originalFee.toLocaleString('id-ID')}
                      </div>
                      <div className="text-xs font-bold text-emerald-800 font-mono">
                        Rp {feeAmount.toLocaleString('id-ID')}{' '}
                        <span className="text-[10px] font-normal text-stone-500">/ 30 mnt</span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleOpenBooking(doc)}
                      className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Konsultasi Sekarang</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* TAB 2: DOKTER AI GRATIS (FOTO & GEJALA INSTAN DALAM 3 DETIK)         */}
      {/* ==================================================================== */}
      {activeMainTab === 'ai_gratis' && (
        <div className="p-3 space-y-3.5">
          {/* AI Banner */}
          <div className="p-3 bg-gradient-to-r from-amber-700 to-amber-600 text-white border border-amber-500 flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="text-[9px] uppercase tracking-wider font-bold bg-white text-amber-800 px-1.5 py-0.2">
                100% GRATIS TANPA BIAYA
              </span>
              <h4 className="text-xs font-bold leading-snug mt-1">AgroDokter AI Cerdas Terniva</h4>
              <p className="text-[10px] text-amber-100 leading-tight">
                Cukup foto tanaman/hewan yang sakit, AI langsung mendeteksi penyakit dan memberikan rekomendasi pupuk, obat, vaksin, dan pakan dalam 3 detik!
              </p>
            </div>
            <Sparkles className="w-10 h-10 text-amber-200 shrink-0 opacity-90" />
          </div>

          {/* Form Step-by-Step Mudah untuk Orang Awam */}
          <div className="bg-white border border-stone-200 p-3.5 space-y-3">
            <div className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
              <span className="w-5 h-5 bg-emerald-800 text-white flex items-center justify-center text-[10px] font-mono">
                1
              </span>
              <span>Pilih atau Ambil Foto Kondisi yang Sakit:</span>
            </div>

            {/* Upload or Quick Case Selector */}
            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setAiUploadedPhoto('/src/assets/images/terniva_ekspor_commodities_1794449097514.jpg');
                    setAiSelectedCase(SAMPLE_CASES[0]);
                    showToast('Foto daun cabai berhasil diunggah!');
                  }}
                  className="py-2.5 px-3 bg-stone-50 border border-stone-300 hover:border-emerald-700 text-stone-800 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Camera className="w-4 h-4 text-emerald-700" />
                  <span>Ambil Foto Kamera</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setAiUploadedPhoto('/src/assets/images/terniva_mitra_farmer_1794449097085.jpg');
                    setAiSelectedCase(SAMPLE_CASES[1]);
                    showToast('Foto dari galeri berhasil diunggah!');
                  }}
                  className="py-2.5 px-3 bg-stone-50 border border-stone-300 hover:border-emerald-700 text-stone-800 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Upload className="w-4 h-4 text-emerald-700" />
                  <span>Unggah Galeri HP</span>
                </button>
              </div>

              {/* Atau Coba Contoh Cepat (Sangat Mudah untuk Orang Awam) */}
              <div className="pt-2">
                <span className="text-[10px] text-stone-500 font-bold block mb-1.5">
                  Atau Coba Langsung Contoh Kasus Populer (Sekali Klik):
                </span>
                <div className="grid grid-cols-2 gap-1.5">
                  {SAMPLE_CASES.map((sc) => (
                    <button
                      key={sc.id}
                      type="button"
                      onClick={() => {
                        setAiSelectedCase(sc);
                        setAiUploadedPhoto(sc.image);
                        setAiDiagnosticResult(null);
                        showToast(`Kasus "${sc.label}" dipilih!`);
                      }}
                      className={`p-2 text-left text-[11px] font-bold border transition-colors flex items-center gap-2 ${
                        aiSelectedCase?.id === sc.id
                          ? 'bg-emerald-50 text-emerald-900 border-emerald-700'
                          : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                      }`}
                    >
                      <div className="w-7 h-7 bg-stone-200 border border-stone-300 shrink-0 overflow-hidden">
                        <img src={sc.image} alt={sc.label} className="w-full h-full object-cover" />
                      </div>
                      <span className="truncate">{sc.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Photo Preview if Selected */}
              {aiUploadedPhoto && (
                <div className="relative p-2 bg-stone-50 border border-stone-300 flex items-center gap-3 mt-2">
                  <img
                    src={aiUploadedPhoto}
                    alt="Preview Gejala"
                    className="w-16 h-16 object-cover border border-stone-300 shrink-0"
                  />
                  <div className="flex-1 min-w-0 text-xs">
                    <span className="text-[10px] text-emerald-800 font-bold">Foto Siap Dianalisis AI:</span>
                    <div className="font-bold text-stone-900 truncate">
                      {aiSelectedCase?.label || 'Foto Masalah Lapangan'}
                    </div>
                    <span className="text-[10px] text-stone-500">Resolusi HD · Terbaca Jelas</span>
                  </div>
                  <button
                    onClick={() => {
                      setAiUploadedPhoto(null);
                      setAiSelectedCase(null);
                    }}
                    className="p-1 text-stone-400 hover:text-stone-700"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Step 2: Deskripsi Singkat atau Tag Gejala */}
            <div className="pt-2 border-t border-stone-100 space-y-2">
              <div className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                <span className="w-5 h-5 bg-emerald-800 text-white flex items-center justify-center text-[10px] font-mono">
                  2
                </span>
                <span>Pilih Gejala yang Terlihat:</span>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {[
                  'Bercak Hitam Melingkar',
                  'Daun Menguning Layu',
                  'Air Liur Berbusa Menetes',
                  'Ternak Tidak Mau Makan',
                  'Kaki Pincang Lepuh',
                  'Ambing Susu Keras Panas',
                  'Daun Kerdil Keriting',
                ].map((tag) => {
                  const isSelected = aiSelectedSymptomTags.includes(tag);
                  return (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => {
                        if (isSelected) {
                          setAiSelectedSymptomTags(aiSelectedSymptomTags.filter((t) => t !== tag));
                        } else {
                          setAiSelectedSymptomTags([...aiSelectedSymptomTags, tag]);
                        }
                      }}
                      className={`px-2.5 py-1 text-[10px] font-bold border transition-colors ${
                        isSelected
                          ? 'bg-emerald-800 text-white border-emerald-800'
                          : 'bg-stone-50 text-stone-700 border-stone-300 hover:bg-stone-100'
                      }`}
                    >
                      {isSelected ? '✓ ' : '+ '}
                      {tag}
                    </button>
                  );
                })}
              </div>

              <div>
                <label className="text-[10px] font-bold text-stone-600 block mb-1">
                  Atau Tuliskan Keluhan Tambahan (Bahasa Sehari-hari):
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Daun cabai rontok parah setelah hujan lebat 3 hari..."
                  value={aiCustomDescription}
                  onChange={(e) => setAiCustomDescription(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 text-xs font-medium focus:outline-none focus:border-emerald-700"
                />
              </div>
            </div>

            {/* Action Button */}
            <button
              onClick={handleRunAiDiagnosis}
              disabled={isAiScanning}
              className="w-full py-3 bg-amber-600 hover:bg-amber-700 disabled:opacity-50 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-xs transition-colors"
            >
              {isAiScanning ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent animate-spin" />
                  <span>AI Sedang Memindai & Mendiagnosa Morfologi...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Periksa Sekarang dengan AI (100% Gratis)</span>
                </>
              )}
            </button>
          </div>

          {/* AI DIAGNOSTIC RESULT CARD */}
          {aiDiagnosticResult && (
            <div className="bg-white border-2 border-emerald-700 p-4 space-y-4 shadow-md animate-in fade-in duration-300">
              {/* Result Header */}
              <div className="flex items-start justify-between border-b border-stone-100 pb-3">
                <div className="space-y-0.5">
                  <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Hasil Diagnosa AI AgroDokter Terniva</span>
                  </span>
                  <h3 className="text-sm font-bold text-stone-900 leading-tight">
                    {aiDiagnosticResult.diagnosis}
                  </h3>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 border border-emerald-300">
                    {aiDiagnosticResult.accuracy}
                  </span>
                </div>
              </div>

              {/* Tingkat Bahaya & Penjelasan Sederhana untuk Orang Awam */}
              <div className="p-3 bg-stone-50 border border-stone-200 space-y-1.5">
                <div className="flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                  <span className="text-xs font-bold text-stone-900">
                    Tingkat Bahaya: <span className="text-rose-700">{aiDiagnosticResult.severity}</span>
                  </span>
                </div>
                <p className="text-[11px] text-stone-700 leading-relaxed">
                  {aiDiagnosticResult.explanation}
                </p>
              </div>

              {/* Pertolongan Pertama Segera (Langkah 1, 2, 3) */}
              <div className="space-y-1.5">
                <div className="text-xs font-bold text-stone-900 uppercase">
                  Tindakan Pertolongan Pertama Hari Ini:
                </div>
                <div className="space-y-1.5">
                  {aiDiagnosticResult.firstAid.map((step, idx) => (
                    <div key={idx} className="flex gap-2 text-xs bg-stone-50 p-2 border border-stone-200">
                      <span className="w-5 h-5 bg-emerald-800 text-white flex items-center justify-center text-[10px] font-bold shrink-0">
                        {idx + 1}
                      </span>
                      <span className="text-stone-800 leading-tight">{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* REKOMENDASI 4 PILAR: PUPUK, OBAT, VAKSIN, PAKAN */}
              <div className="space-y-2 pt-2 border-t border-stone-100">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-bold text-emerald-900 uppercase">
                    Rekomendasi Terstruktur (Obat, Pupuk, Vaksin & Pakan):
                  </div>
                  <span className="text-[10px] text-stone-500 font-mono">
                    {aiDiagnosticResult.prescriptions.length} Produk Sesuai
                  </span>
                </div>

                <div className="space-y-2">
                  {aiDiagnosticResult.prescriptions.map((rx) => (
                    <div
                      key={rx.id}
                      className="p-3 bg-stone-50 border border-stone-200 space-y-1.5 hover:border-emerald-600 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <span
                          className={`text-[9px] font-bold px-2 py-0.5 uppercase ${
                            rx.category === 'Obat'
                              ? 'bg-rose-100 text-rose-800 border border-rose-300'
                              : rx.category === 'Pupuk'
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                              : rx.category === 'Vaksin'
                              ? 'bg-blue-100 text-blue-800 border border-blue-300'
                              : 'bg-amber-100 text-amber-800 border border-amber-300'
                          }`}
                        >
                          {rx.category}
                        </span>
                        <span className="font-mono font-bold text-emerald-800 text-xs">
                          Rp {rx.price.toLocaleString('id-ID')}
                        </span>
                      </div>

                      <div className="font-bold text-xs text-stone-900 leading-snug">{rx.name}</div>
                      <div className="text-[10px] text-stone-600">
                        <strong>Dosis:</strong> {rx.dosage}
                      </div>
                      <p className="text-[10px] text-stone-500 leading-tight">
                        <strong>Aturan:</strong> {rx.instructions}
                      </p>

                      <div className="pt-1.5 flex justify-end">
                        <button
                          onClick={() => {
                            if (onAddToCart) {
                              onAddToCart(
                                {
                                  id: `prod-${rx.id}`,
                                  name: rx.name,
                                  category: rx.category === 'Pupuk' ? 'Pupuk' : rx.category === 'Pakan' ? 'Pakan' : 'Pertanian',
                                  price: rx.price,
                                  stock: 50,
                                  rating: 4.9,
                                  soldCount: 120,
                                  imageUrl: '/src/assets/images/terniva_dok_konsultasi_1794449097905.jpg',
                                  supplier: 'Depo Farmasi Pertanian Terniva',
                                  location: 'Subang, Jawa Barat',
                                  minOrder: '1 Unit',
                                  description: rx.name,
                                  isVerified: true,
                                },
                                1
                              );
                            }
                            showToast(`${rx.name} ditambahkan ke keranjang!`);
                          }}
                          className="px-2.5 py-1 bg-white border border-stone-300 hover:border-emerald-700 text-emerald-800 font-bold text-[10px] flex items-center gap-1"
                        >
                          <Plus className="w-3 h-3" />
                          <span>Beli Produk Ini</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Tombol Beli Semua Sekaligus */}
                <div className="pt-2 space-y-2">
                  <button
                    onClick={() => handleAddAllPrescriptionsToCart(aiDiagnosticResult.prescriptions)}
                    className="w-full py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Beli Semua Produk Rekomendasi AI (Tambah ke Keranjang)</span>
                  </button>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => {
                        const newRec: ConsultationRecord = {
                          id: `REC-AI-${Date.now()}`,
                          doctorName: 'AI AgroDokter Terniva',
                          doctorType: 'ai',
                          patientType: aiDiagnosticResult.label,
                          diagnosis: aiDiagnosticResult.diagnosis,
                          date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }),
                          status: 'Selesai',
                          prescriptions: aiDiagnosticResult.prescriptions,
                        };
                        setSavedPrescriptions((prev) => [newRec, ...prev]);
                        showToast('Hasil diagnosa & resep berhasil disimpan ke tab "Resep Saya"!');
                      }}
                      className="py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs border border-stone-300"
                    >
                      Simpan ke Resep Saya
                    </button>
                    <button
                      onClick={() => {
                        setActiveMainTab('spesialis');
                        showToast('Pilih dokter spesialis untuk konsultasi lanjutan');
                      }}
                      className="py-2 bg-sky-700 hover:bg-sky-800 text-white font-bold text-xs flex items-center justify-center gap-1"
                    >
                      <Stethoscope className="w-3.5 h-3.5" />
                      <span>Tanya Dokter Ahli</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ==================================================================== */}
      {/* TAB 3: RESEP & RIWAYAT SAYA (PUPUK, OBAT, VAKSIN, PAKAN TERSIMPAN)   */}
      {/* ==================================================================== */}
      {activeMainTab === 'riwayat' && (
        <div className="p-3 space-y-3">
          <div className="text-xs font-bold text-stone-900 flex items-center justify-between">
            <span>Daftar Resep & Rekomendasi Tersimpan:</span>
            <span className="text-[10px] text-stone-500 font-mono">
              {savedPrescriptions.length} Resep Terbit
            </span>
          </div>

          <div className="space-y-3">
            {savedPrescriptions.map((rec) => (
              <div key={rec.id} className="bg-white border border-stone-200 p-3.5 space-y-3 shadow-2xs">
                {/* Header Resep */}
                <div className="flex items-start justify-between border-b border-stone-100 pb-2">
                  <div>
                    <span className="text-[10px] font-mono text-emerald-800 font-bold block">{rec.id}</span>
                    <h4 className="text-xs font-bold text-stone-900">{rec.diagnosis}</h4>
                    <span className="text-[11px] text-stone-500">{rec.patientType}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 border border-emerald-300">
                      {rec.status}
                    </span>
                    <span className="text-[10px] text-stone-400 block font-mono mt-0.5">{rec.date}</span>
                  </div>
                </div>

                {/* Dokter Penerbit */}
                <div className="text-[11px] text-stone-600 bg-stone-50 p-2 border border-stone-200 flex items-center justify-between">
                  <span>Dokter Pemeriksa: <strong>{rec.doctorName}</strong></span>
                  <span className="text-[10px] font-bold text-emerald-800">Resep Digital Resmi</span>
                </div>

                {/* Prescriptions List */}
                <div className="space-y-1.5">
                  <div className="text-[10px] font-bold text-stone-700 uppercase">Obat & Pupuk Diresepkan:</div>
                  {rec.prescriptions.map((p) => (
                    <div key={p.id} className="p-2 bg-stone-50 border border-stone-200 text-xs flex items-center justify-between">
                      <div>
                        <div className="font-bold text-stone-900 text-[11px]">{p.name}</div>
                        <div className="text-[10px] text-stone-500">Dosis: {p.dosage}</div>
                      </div>
                      <span className="font-mono font-bold text-emerald-800 text-[11px]">
                        Rp {p.price.toLocaleString('id-ID')}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Beli Ulang Button */}
                <button
                  onClick={() => handleAddAllPrescriptionsToCart(rec.prescriptions)}
                  className="w-full py-2 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs flex items-center justify-center gap-1.5"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Beli Ulang Semua Obat & Pupuk Resep Ini</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* MODAL CHECKOUT & PEMBAYARAN KONSULTASI (HALODOC STYLE)                */}
      {/* ==================================================================== */}
      {selectedDoctorForBooking && (
        <div className="fixed inset-0 z-50 bg-black/75 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="w-full max-w-[420px] bg-white text-stone-900 max-h-[92vh] flex flex-col shadow-2xl border border-stone-300">
            {/* Header */}
            <div className="p-3 bg-emerald-900 text-white flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-emerald-300" />
                <h4 className="text-xs font-bold">Lembar Pembayaran Konsultasi Dokter</h4>
              </div>
              <button
                onClick={() => setSelectedDoctorForBooking(null)}
                className="p-1 text-white/80 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-4 space-y-3.5 flex-1 overflow-y-auto text-xs">
              {/* Doctor Summary */}
              <div className="p-3 bg-stone-50 border border-stone-200 flex items-center gap-3">
                <div className="w-12 h-12 bg-emerald-100 border border-emerald-300 overflow-hidden shrink-0">
                  <img
                    src="/src/assets/images/terniva_dok_konsultasi_1794449097905.jpg"
                    alt={selectedDoctorForBooking.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-[9px] font-bold text-emerald-800 uppercase">
                    {selectedDoctorForBooking.title}
                  </span>
                  <div className="font-bold text-stone-900 text-xs truncate">
                    {selectedDoctorForBooking.name}
                  </div>
                  <div className="text-[10px] text-stone-500 font-mono">
                    SIP: {selectedDoctorForBooking.sipNumber}
                  </div>
                </div>
              </div>

              {/* Data Pasien Hewan / Tanaman */}
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-stone-800 block">
                  Pilih Pasien yang Akan Dikonsultasikan:
                </label>
                <select
                  value={bookingPatientType}
                  onChange={(e) => setBookingPatientType(e.target.value)}
                  className="w-full px-2.5 py-2 bg-stone-50 border border-stone-300 text-xs font-medium"
                >
                  {selectedDoctorForBooking.type === 'hewan' ? (
                    <>
                      <option value="Sapi Potong (Limousin / Simental)">Sapi Potong (Limousin / Simental)</option>
                      <option value="Sapi Perah FH">Sapi Perah FH</option>
                      <option value="Kambing & Domba Garut">Kambing & Domba Garut</option>
                      <option value="Ayam Broiler / Petelur">Ayam Broiler / Petelur</option>
                    </>
                  ) : (
                    <>
                      <option value="Tanaman Cabai Rawit / Merah">Tanaman Cabai Rawit / Merah</option>
                      <option value="Padi Sawah">Padi Sawah</option>
                      <option value="Kopi Arabika / Robusta">Kopi Arabika / Robusta</option>
                      <option value="Bawang Merah / Sayuran Daun">Bawang Merah / Sayuran Daun</option>
                    </>
                  )}
                </select>

                <div>
                  <label className="text-[11px] font-bold text-stone-800 block mb-1">
                    Keluhan Utama Singkat:
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Daun menguning bercak basah / nafsu makan turun..."
                    value={bookingComplaint}
                    onChange={(e) => setBookingComplaint(e.target.value)}
                    className="w-full px-2.5 py-2 bg-stone-50 border border-stone-300 text-xs font-medium"
                  />
                </div>
              </div>

              {/* Pilihan Metode Bayar */}
              <div className="space-y-1.5 pt-2 border-t border-stone-100">
                <label className="text-[11px] font-bold text-stone-800 block">
                  Pilih Metode Pembayaran:
                </label>
                <div className="space-y-1.5">
                  <label
                    onClick={() => setPaymentMethod('wallet')}
                    className={`flex items-center justify-between p-2.5 border cursor-pointer ${
                      paymentMethod === 'wallet'
                        ? 'bg-emerald-50 border-emerald-700'
                        : 'bg-stone-50 border-stone-200'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Wallet className="w-4 h-4 text-emerald-800" />
                      <div>
                        <div className="font-bold text-stone-900 text-xs">Saldo Dompet TernivaPay</div>
                        <div className="text-[10px] text-stone-500 font-mono">
                          Saldo: Rp {userWalletBalance.toLocaleString('id-ID')} (Instan 1-Klik)
                        </div>
                      </div>
                    </div>
                    <input
                      type="radio"
                      name="payMethod"
                      checked={paymentMethod === 'wallet'}
                      onChange={() => setPaymentMethod('wallet')}
                      className="accent-emerald-800"
                    />
                  </label>

                  <label
                    onClick={() => setPaymentMethod('qris')}
                    className={`flex items-center justify-between p-2.5 border cursor-pointer ${
                      paymentMethod === 'qris'
                        ? 'bg-emerald-50 border-emerald-700'
                        : 'bg-stone-50 border-stone-200'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-stone-700" />
                      <div>
                        <div className="font-bold text-stone-900 text-xs">QRIS (Semua E-Wallet & M-Banking)</div>
                        <div className="text-[10px] text-stone-500">GoPay, OVO, ShopeePay, BCA, Mandiri</div>
                      </div>
                    </div>
                    <input
                      type="radio"
                      name="payMethod"
                      checked={paymentMethod === 'qris'}
                      onChange={() => setPaymentMethod('qris')}
                      className="accent-emerald-800"
                    />
                  </label>

                  <label
                    onClick={() => setPaymentMethod('va')}
                    className={`flex items-center justify-between p-2.5 border cursor-pointer ${
                      paymentMethod === 'va'
                        ? 'bg-emerald-50 border-emerald-700'
                        : 'bg-stone-50 border-stone-200'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-stone-700" />
                      <div>
                        <div className="font-bold text-stone-900 text-xs">Virtual Account Bank (BCA / BRI / Mandiri)</div>
                        <div className="text-[10px] text-stone-500">Otomatis terverifikasi 24 jam</div>
                      </div>
                    </div>
                    <input
                      type="radio"
                      name="payMethod"
                      checked={paymentMethod === 'va'}
                      onChange={() => setPaymentMethod('va')}
                      className="accent-emerald-800"
                    />
                  </label>
                </div>
              </div>

              {/* Rincian Biaya */}
              <div className="p-3 bg-stone-50 border border-stone-200 space-y-1 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-stone-600">Jasa Konsultasi 30 Menit:</span>
                  <span className="font-mono font-bold">
                    Rp {(selectedDoctorForBooking.feeAmount || 35000).toLocaleString('id-ID')}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-stone-600">Biaya Platform:</span>
                  <span className="text-emerald-800 font-bold">GRATIS</span>
                </div>
                <div className="pt-2 border-t border-stone-200 flex items-center justify-between text-xs font-bold">
                  <span>Total Tagihan:</span>
                  <span className="font-mono text-emerald-800 text-sm">
                    Rp {(selectedDoctorForBooking.feeAmount || 35000).toLocaleString('id-ID')}
                  </span>
                </div>
              </div>

              {/* Tombol Konfirmasi Bayar */}
              <button
                onClick={handleConfirmPaymentAndStartConsultation}
                disabled={isProcessingPayment}
                className="w-full py-3 bg-emerald-800 hover:bg-emerald-900 disabled:opacity-50 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                {isProcessingPayment ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent animate-spin" />
                    <span>Memproses Pembayaran & Menghubungkan Dokter...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>
                      Konfirmasi & Bayar Rp{' '}
                      {(selectedDoctorForBooking.feeAmount || 35000).toLocaleString('id-ID')}
                    </span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* RUANG KONSULTASI LIVE CHAT DOKTER AKTIF (HALODOC TELEMEDICINE)       */}
      {/* ==================================================================== */}
      {activeLiveConsultationDoctor && (
        <div className="fixed inset-0 z-50 bg-black/75 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="w-full max-w-[440px] bg-white text-stone-900 h-[95vh] max-h-[750px] flex flex-col shadow-2xl border border-stone-300">
            {/* Header Ruang Konsultasi */}
            <div className="p-3 bg-emerald-900 text-white flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 bg-emerald-800 border border-emerald-600 overflow-hidden shrink-0">
                  <img
                    src="/src/assets/images/terniva_dok_konsultasi_1794449097905.jpg"
                    alt={activeLiveConsultationDoctor.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-xs font-bold leading-tight">{activeLiveConsultationDoctor.name}</h4>
                  <div className="flex items-center gap-1.5 text-[10px] text-emerald-200 font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Sesi Aktif · Sisa Waktu: {formatTime(remainingSessionSeconds)}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  if (confirm('Apakah Anda ingin menyelesaikan sesi konsultasi ini? Seluruh resep akan tersimpan di akun Anda.')) {
                    setActiveLiveConsultationDoctor(null);
                    showToast('Sesi konsultasi selesai. Resep resmi tersimpan di "Resep Saya"!');
                  }
                }}
                className="px-2 py-1 bg-emerald-800 hover:bg-emerald-700 text-emerald-100 hover:text-white text-[10px] font-bold border border-emerald-700"
              >
                Akhiri Sesi
              </button>
            </div>

            {/* Chat Body */}
            <div className="flex-1 overflow-y-auto p-3.5 space-y-3 bg-stone-100">
              {chatMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${
                    msg.sender === 'user'
                      ? 'items-end'
                      : msg.sender === 'system'
                      ? 'items-center'
                      : 'items-start'
                  }`}
                >
                  {msg.sender === 'system' ? (
                    <div className="p-2 bg-emerald-50 border border-emerald-300 text-emerald-950 text-[10px] text-center max-w-[90%] leading-snug">
                      {msg.text}
                    </div>
                  ) : (
                    <>
                      <div
                        className={`max-w-[85%] p-3 text-xs leading-relaxed ${
                          msg.sender === 'user'
                            ? 'bg-emerald-800 text-white font-medium'
                            : 'bg-white text-stone-800 border border-stone-200 shadow-2xs'
                        }`}
                      >
                        {msg.text}
                      </div>
                      <span className="text-[9px] text-stone-400 mt-0.5 px-1 font-mono">{msg.time}</span>
                    </>
                  )}
                </div>
              ))}

              {/* Typing indicator */}
              {isDoctorTyping && (
                <div className="flex items-center gap-2 p-2 bg-white border border-stone-200 text-xs text-stone-500 max-w-fit">
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 bg-emerald-700 rounded-full animate-bounce" />
                    <span className="w-1.5 h-1.5 bg-emerald-700 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 bg-emerald-700 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                  <span className="text-[10px]">{activeLiveConsultationDoctor.name} sedang menulis diagnosa...</span>
                </div>
              )}

              {/* RESEP RESMI DITERBITKAN DOKTER (HALODOC PRESCRIPTION CARD) */}
              {hasIssuedPrescription && activePrescriptionList.length > 0 && (
                <div className="p-3.5 bg-white border-2 border-emerald-800 space-y-2.5 shadow-md">
                  <div className="flex items-center justify-between border-b border-stone-100 pb-2">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-emerald-800" />
                      <div>
                        <span className="text-[9px] uppercase font-bold text-emerald-800 tracking-wider block">
                          RESEP DIGITAL RESMI TERNIVA
                        </span>
                        <h5 className="text-xs font-bold text-stone-900">
                          Resep Obat, Pupuk & Pakan dari {activeLiveConsultationDoctor.name}
                        </h5>
                      </div>
                    </div>
                    <span className="text-[9px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 border border-emerald-300">
                      TERVERIFIKASI
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    {activePrescriptionList.map((item) => (
                      <div
                        key={item.id}
                        className="p-2 bg-stone-50 border border-stone-200 text-xs flex items-center justify-between"
                      >
                        <div className="min-w-0 flex-1 pr-2">
                          <div className="flex items-center gap-1.5">
                            <span className="text-[8px] font-bold px-1 bg-stone-200 text-stone-800 uppercase">
                              {item.category}
                            </span>
                            <span className="font-bold text-stone-900 text-[11px] truncate">{item.name}</span>
                          </div>
                          <div className="text-[10px] text-stone-600 mt-0.5">Dosis: {item.dosage}</div>
                        </div>
                        <span className="font-mono font-bold text-emerald-800 text-xs shrink-0">
                          Rp {item.price.toLocaleString('id-ID')}
                        </span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => handleAddAllPrescriptionsToCart(activePrescriptionList)}
                    className="w-full py-2 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs flex items-center justify-center gap-1.5"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Tebus & Beli Semua Resep Sekaligus (Ke Keranjang)</span>
                  </button>
                </div>
              )}

              <div ref={chatScrollRef} />
            </div>

            {/* Quick Complaints for Farmers */}
            <div className="p-2 bg-white border-t border-stone-200 flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0">
              <span className="text-[10px] text-stone-400 font-bold shrink-0 ml-1">Ketik Cepat:</span>
              {[
                'Sudah 3 hari nafsu makan turun',
                'Muncul bercak hitam melingkar',
                'Air liur berbusa dan kuku luka',
                'Mohon rekomendasi pupuk pemulih',
                'Berapa dosis aman penyemprotan?',
              ].map((quick, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSendChatMessage(quick)}
                  className="px-2.5 py-1 bg-stone-50 hover:bg-stone-100 text-stone-700 text-[10px] font-medium border border-stone-200 whitespace-nowrap"
                >
                  {quick}
                </button>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-3 bg-white border-t border-stone-200 shrink-0">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendChatMessage();
                }}
                className="flex items-center gap-2"
              >
                <button
                  type="button"
                  onClick={() => {
                    handleSendChatMessage('[Melampirkan Foto Kondisi Lapangan]');
                    showToast('Foto kondisi lapangan dikirim ke dokter!');
                  }}
                  className="p-2 text-stone-600 hover:text-emerald-800 bg-stone-100 border border-stone-300"
                  title="Kirim Foto"
                >
                  <Camera className="w-4 h-4" />
                </button>

                <input
                  type="text"
                  placeholder={`Ketik pesan untuk ${activeLiveConsultationDoctor.name}...`}
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  className="flex-1 px-3 py-2 text-xs bg-stone-50 border border-stone-300 focus:outline-none focus:border-emerald-700 font-medium"
                />

                <button
                  type="submit"
                  disabled={!chatInput.trim()}
                  className="p-2 bg-emerald-800 hover:bg-emerald-900 disabled:opacity-40 text-white font-bold"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
