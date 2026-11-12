import { useState } from 'react';
import {
  Receipt,
  Sprout,
  Globe2,
  Stethoscope,
  Bell,
  CheckCheck,
  Circle,
  Inbox,
  AlertTriangle,
  AlertCircle,
  Thermometer,
  Video,
  Radio,
  Calendar,
  Clock,
  Sparkles,
  ChevronRight,
  ExternalLink,
  X,
  Check,
  Eye,
  Activity,
  Phone,
  MessageCircle,
  ShieldAlert,
  Flame,
  ArrowRight,
} from 'lucide-react';
import { HarvestNotificationItem, AlertSeverity, HarvestAlertData } from '../types';

interface MobileNotificationScreenProps {
  onNavigateToPantauPanen?: () => void;
  onNavigateToKonsultasi?: () => void;
  onNavigateToOrders?: () => void;
  onUnreadChange?: (unreadCount: number) => void;
}

const INITIAL_NOTIFICATIONS: HarvestNotificationItem[] = [
  {
    id: 'NOTIF-ALERT-01',
    category: 'Peringatan Panen',
    severity: 'critical',
    title: '⚠️ Peringatan Suhu Tinggi: Kandang Koloni Subang (31.4°C)',
    message:
      'Sensor kandang mendeteksi suhu melebihi ambang batas aman 28.0°C pada Sapi Potong Limousin Siklus 12. Diperlukan aktivasi kipas pendingin & pengecekan bak air minum.',
    timeAgo: '12 menit lalu',
    isRead: false,
    harvestData: {
      programTitle: 'Kemitraan Penggemukan Sapi Potong Siklus 12',
      location: 'Kandang Koloni Subang, Blok B-4, Jawa Barat',
      commodityType: 'Sapi Potong Limousin Cross',
      metricLabel: 'Suhu Lingkungan Kandang',
      metricValue: '31.4°C',
      normalThreshold: '22.0°C - 27.5°C',
      recommendation:
        'Segera aktifkan misting sprayer otomatis lorong 2 dan tambahkan elektrolit pakan untuk mencegah heat stress ternak.',
      actionRequired: 'Aktifkan Kipas Kabut & Periksa Air Minum',
      cctvCameraId: 'CAM-KANDANG-SUBANG-02',
    },
  },
  {
    id: 'NOTIF-ALERT-02',
    category: 'Peringatan Panen',
    severity: 'warning',
    title: '🌾 Estimasi Waktu Panen H-5: Kopi Arabika Gayo Specialty',
    message:
      'Tingkat kemanisan buah (Brix) telah mencapai 21.8% dengan warna merah marun 85%. Panen raya siap dijadwalkan bersama kelompok tani binaan.',
    timeAgo: '45 menit lalu',
    isRead: false,
    harvestData: {
      programTitle: 'Kebun Kopi Arabika Specialty Gayo Ekspor',
      location: 'Cluster Bener Meriah, Aceh Tengah (1.500 mdpl)',
      commodityType: 'Kopi Arabika Green Beans Grade 1',
      metricLabel: 'Kadar Gula Buah (Brix Index)',
      metricValue: '21.8% Brix',
      normalThreshold: '19.0% - 22.0% Brix (Siap Panen)',
      recommendation:
        'Lakukan pemetikan selektif hanya buah merah sempurna (red cherry) untuk menjaga cup score di atas 85. Siapkan bak fermentasi anaerobik.',
      actionRequired: 'Jadwalkan Tim Petik & Kontainer Serap',
      daysToHarvest: 5,
      cctvCameraId: 'CAM-KEBUN-GAYO-01',
    },
  },
  {
    id: 'NOTIF-ALERT-03',
    category: 'Peringatan Panen',
    severity: 'info',
    title: '⚖️ Pembaruan Bobot Mingguan: Domba Garut Super (+290 g/hari)',
    message:
      'Timbang timbang digital IoT mencatat ADG rata-rata +290 gram/hari. Pertumbuhan 14% di atas proyeksi awal siklus.',
    timeAgo: '3 jam lalu',
    isRead: false,
    harvestData: {
      programTitle: 'Breeding Domba Dorper & Garut Super',
      location: 'Sentra Domba Malang, Jawa Timur',
      commodityType: 'Domba Garut & Dorper Bibit Super',
      metricLabel: 'Pertambahan Bobot Harian (ADG)',
      metricValue: '+290 g / hari (Rata-rata 48.5 kg)',
      normalThreshold: '+250 g / hari',
      recommendation:
        'Formulasi konsentrat pakan dan silase jagung fermentasi menunjukkan penyerapan optimal. Lanjutkan ransum pakan saat ini.',
      actionRequired: 'Evaluasi Nutrisi Pekan 8',
      daysToHarvest: 28,
      cctvCameraId: 'CAM-DOMBA-MALANG-03',
    },
  },
  {
    id: 'NOTIF-ALERT-04',
    category: 'Peringatan Panen',
    severity: 'warning',
    title: '💧 Peringatan Kelembapan Rendah: Kebun Vanili Alor (48%)',
    message:
      'Sensor kelembapan tanah mendeteksi penurunan kelembapan di bawah batas minimum 60% menjelang polong menguning.',
    timeAgo: '6 jam lalu',
    isRead: true,
    harvestData: {
      programTitle: 'Kebun Vanili Organik Alor Gourmet',
      location: 'Kab. Alor, Nusa Tenggara Timur',
      commodityType: 'Vanili Gourmet Planifolia Alor',
      metricLabel: 'Kelembapan Relatif & Tanah',
      metricValue: '48% RH (Defisit 12%)',
      normalThreshold: '65% - 80% RH',
      recommendation:
        'Nyalakan sprinkler mikroselama 25 menit sore ini untuk menjaga kelembapan mikro polong vanili agar tidak pecah.',
      actionRequired: 'Siram Sprinkler Mikro 25 Menit',
      daysToHarvest: 18,
    },
  },
  {
    id: 'NOTIF-TRX-01',
    category: 'Transaksi',
    severity: 'success',
    title: '📦 Pesanan Diproses Kurir Dingin: #TRN-881209',
    message:
      'Komoditas pesanan Anda (Kopi Arabika Gayo & Pupuk Bio-Trichoderma) sedang dalam perjalanan JNE Agri Cargo Suhu Terjaga. Estimasi tiba besok sore.',
    timeAgo: '1 hari lalu',
    isRead: true,
  },
  {
    id: 'NOTIF-DOC-01',
    category: 'Konsultasi',
    severity: 'info',
    title: '🩺 Resep & Hasil Evaluasi Medis Ternak dari drh. Aryo Wibisono',
    message:
      'Dokter hewan telah mengirimkan rekomendasi multivitamin B-Complex & protokol penanganan sanitasi lantai kandang untuk mencegah infeksi kuku.',
    timeAgo: '2 hari lalu',
    isRead: true,
  },
  {
    id: 'NOTIF-EXP-01',
    category: 'Ekspor',
    severity: 'info',
    title: '🌍 Peluang Kontrak Baru: Permintaan 25 Ton Green Beans ke Jerman',
    message:
      'Buyer Hamburg telah membuka purchase order tender komoditas kopi arabika organik. Mitra petani terdaftar dapat mengajukan alokasi kuota panen.',
    timeAgo: '3 hari lalu',
    isRead: true,
  },
];

export default function MobileNotificationScreen({
  onNavigateToPantauPanen,
  onNavigateToKonsultasi,
  onNavigateToOrders,
  onUnreadChange,
}: MobileNotificationScreenProps) {
  const [notifications, setNotifications] = useState<HarvestNotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('all');
  const [activeAlertDetail, setActiveAlertDetail] = useState<HarvestNotificationItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Active CCTV Preview Modal
  const [activeCctvModal, setActiveCctvModal] = useState<{
    title: string;
    location: string;
    camName: string;
    temperature: string;
  } | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    onUnreadChange?.(0);
    showToast('Semua notifikasi telah ditandai dibaca');
  };

  const handleNotificationClick = (item: HarvestNotificationItem) => {
    // Mark as read
    setNotifications((prev) =>
      prev.map((n) => (n.id === item.id ? { ...n, isRead: true } : n))
    );
    // If it has harvest alert data, open the detailed modal
    if (item.harvestData) {
      setActiveAlertDetail(item);
    }
  };

  // Quick Action: Simulate a new emergency harvest alert in real-time
  const handleSimulateNewAlert = () => {
    const randomTypes = [
      {
        title: '⚠️ Peringatan Dini: Lonjakan Suhu Kandang 32.1°C',
        severity: 'critical' as AlertSeverity,
        category: 'Peringatan Panen' as const,
        metric: '32.1°C',
        location: 'Kandang Koloni Boyolali Blok A-1',
      },
      {
        title: '🌾 Countdown Panen Raya Kopi H-3 Hari!',
        severity: 'warning' as AlertSeverity,
        category: 'Peringatan Panen' as const,
        metric: 'Brix 22.1% (Kematangan 92%)',
        location: 'Kebun Kopi Bener Meriah Aceh',
      },
      {
        title: '⚖️ Peringatan Timbang Akhir Sapi Potong Siklus 12',
        severity: 'info' as AlertSeverity,
        category: 'Peringatan Panen' as const,
        metric: 'Bobot 421.5 kg (Target Tercapai)',
        location: 'Kandang Subang Jawa Barat',
      },
    ];

    const pick = randomTypes[Math.floor(Math.random() * randomTypes.length)];
    const newAlert: HarvestNotificationItem = {
      id: `ALERT-SIM-${Date.now()}`,
      category: pick.category,
      severity: pick.severity,
      title: pick.title,
      message: `Telemetri sensor mendeteksi ${pick.metric} pada ${pick.location}. Segera periksa parameter pemantauan dan laporan dokter.`,
      timeAgo: 'Baru saja',
      isRead: false,
      harvestData: {
        programTitle: 'Program Kemitraan Unggulan Terniva',
        location: pick.location,
        commodityType: 'Komoditas Unggulan Terverifikasi',
        metricLabel: 'Indikator Sensor Real-Time',
        metricValue: pick.metric,
        normalThreshold: 'Dalam parameter standar pengawasan',
        recommendation:
          'Data telemetri langsung terhubung dengan tim lapangan dan dokter hewan Terniva.',
        actionRequired: 'Tinjau CCTV & Rekomendasi Dokter',
        cctvCameraId: 'CAM-LIVE-SIMULASI',
      },
    };

    setNotifications((prev) => [newAlert, ...prev]);
    showToast(`Peringatan panen baru diterima: "${pick.title.slice(0, 28)}..."`);
  };

  // Filter Categories
  const categories = [
    { id: 'Semua', label: 'Semua', count: notifications.length },
    {
      id: 'Peringatan Panen',
      label: '🌾 Peringatan Panen',
      count: notifications.filter((n) => n.category === 'Peringatan Panen').length,
    },
    {
      id: 'Transaksi',
      label: '📦 Pesanan',
      count: notifications.filter((n) => n.category === 'Transaksi').length,
    },
    {
      id: 'Konsultasi',
      label: '🩺 Dokter',
      count: notifications.filter((n) => n.category === 'Konsultasi').length,
    },
    {
      id: 'Ekspor',
      label: '🌍 Ekspor',
      count: notifications.filter((n) => n.category === 'Ekspor').length,
    },
  ];

  // Filtered List
  const filteredNotifications = notifications.filter((n) => {
    const matchesCategory =
      selectedCategory === 'Semua' ||
      n.category.toLowerCase() === selectedCategory.toLowerCase();

    const matchesSeverity =
      selectedSeverity === 'all' ? true : n.severity === selectedSeverity;

    return matchesCategory && matchesSeverity;
  });

  // Find top critical harvest alert to feature at the top
  const topCriticalAlert = notifications.find(
    (n) => n.category === 'Peringatan Panen' && (n.severity === 'critical' || n.severity === 'warning') && !n.isRead
  ) || notifications.find((n) => n.category === 'Peringatan Panen' && n.severity === 'critical');

  const getSeverityBadge = (severity: AlertSeverity) => {
    switch (severity) {
      case 'critical':
        return (
          <span className="bg-rose-600 text-white text-[9px] font-black px-1.5 py-0.2 uppercase tracking-wide flex items-center gap-0.5">
            <Flame className="w-2.5 h-2.5 animate-pulse" />
            DARURAT
          </span>
        );
      case 'warning':
        return (
          <span className="bg-amber-600 text-white text-[9px] font-bold px-1.5 py-0.2 uppercase tracking-wide flex items-center gap-0.5">
            <AlertTriangle className="w-2.5 h-2.5" />
            PERHATIAN
          </span>
        );
      case 'info':
        return (
          <span className="bg-emerald-700 text-white text-[9px] font-bold px-1.5 py-0.2 uppercase tracking-wide flex items-center gap-0.5">
            <Sprout className="w-2.5 h-2.5" />
            PANEN
          </span>
        );
      case 'success':
        return (
          <span className="bg-sky-700 text-white text-[9px] font-bold px-1.5 py-0.2 uppercase tracking-wide flex items-center gap-0.5">
            <Check className="w-2.5 h-2.5" />
            SUKSES
          </span>
        );
    }
  };

  const getCategoryIcon = (category: string, severity: AlertSeverity) => {
    if (category === 'Peringatan Panen') {
      if (severity === 'critical') return <Flame className="w-4 h-4 text-rose-600" />;
      if (severity === 'warning') return <AlertTriangle className="w-4 h-4 text-amber-600" />;
      return <Sprout className="w-4 h-4 text-emerald-700" />;
    }
    switch (category) {
      case 'Transaksi':
        return <Receipt className="w-4 h-4 text-amber-700" />;
      case 'Konsultasi':
        return <Stethoscope className="w-4 h-4 text-purple-700" />;
      case 'Ekspor':
        return <Globe2 className="w-4 h-4 text-sky-700" />;
      default:
        return <Bell className="w-4 h-4 text-emerald-800" />;
    }
  };

  return (
    <div className="bg-stone-100 min-h-full flex flex-col pb-10 select-none">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed top-14 left-1/2 -translate-x-1/2 z-50 bg-stone-900 text-white text-xs px-3.5 py-1.5 border border-emerald-500 shadow-xl flex items-center gap-2 animate-fade-in pointer-events-none">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Bar */}
      <div className="bg-emerald-900 text-white px-3.5 py-3 shadow-md sticky top-0 z-30 border-b border-emerald-950">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-white/10 flex items-center justify-center text-amber-300">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-sm font-bold tracking-tight">Pusat Peringatan & Notifikasi</h3>
                {unreadCount > 0 && (
                  <span className="bg-rose-500 text-white text-[9px] font-mono font-bold px-1.5 py-0.2">
                    {unreadCount} Baru
                  </span>
                )}
              </div>
              <p className="text-[10px] text-emerald-200">
                Peringatan Panen, Sensor IoT & Laporan Kemitraan
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handleSimulateNewAlert}
              className="text-[10px] font-bold text-amber-300 hover:text-white bg-white/10 hover:bg-white/20 px-2 py-1 border border-white/20 transition-colors cursor-pointer flex items-center gap-1"
              title="Simulasi memicu peringatan panen baru"
            >
              <Sparkles className="w-3 h-3 text-amber-300" />
              <span>+ Uji Alert</span>
            </button>
            <button
              onClick={markAllAsRead}
              className="p-1.5 text-white/80 hover:text-white transition-colors cursor-pointer"
              title="Tandai semua dibaca"
            >
              <CheckCheck className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-2.5">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-2.5 py-1 text-[11px] font-semibold whitespace-nowrap transition-colors border cursor-pointer ${
                  isSelected
                    ? 'bg-white text-emerald-950 border-white font-bold shadow-xs'
                    : 'bg-emerald-800/80 text-emerald-100 hover:bg-emerald-800 border-emerald-700/60'
                }`}
              >
                <span>{cat.label}</span>
                <span className="ml-1 opacity-75 font-mono text-[10px]">({cat.count})</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="p-3 space-y-3 flex-1">
        {/* 1. TOP CRITICAL HARVEST ALERT BANNER (High-Visibility UI) */}
        {topCriticalAlert && topCriticalAlert.harvestData && (
          <div
            onClick={() => setActiveAlertDetail(topCriticalAlert)}
            className={`border p-3 shadow-md cursor-pointer transition-all hover:shadow-lg relative overflow-hidden group ${
              topCriticalAlert.severity === 'critical'
                ? 'bg-gradient-to-r from-rose-950 via-rose-900 to-rose-950 text-white border-rose-700'
                : 'bg-gradient-to-r from-amber-950 via-amber-900 to-amber-950 text-white border-amber-700'
            }`}
          >
            {/* Blinking Live indicator */}
            <div className="flex items-center justify-between pb-2 border-b border-white/15">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-rose-400 animate-ping" />
                <span className="text-[10px] font-black uppercase tracking-wider text-rose-300">
                  {topCriticalAlert.severity === 'critical'
                    ? 'PERINGATAN SENSOR DARURAT PANEN'
                    : 'PERHATIAN PANEN SEGERA'}
                </span>
              </div>
              <span className="text-[10px] font-mono text-white/70">
                {topCriticalAlert.timeAgo}
              </span>
            </div>

            <div className="mt-2 space-y-1">
              <h4 className="text-xs font-bold leading-tight group-hover:text-amber-200 transition-colors">
                {topCriticalAlert.title}
              </h4>
              <p className="text-[11px] text-white/80 line-clamp-2">
                {topCriticalAlert.message}
              </p>
            </div>

            {/* Live Telemetry Preview in Banner */}
            <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="bg-white/15 px-2 py-0.5 text-[10px] font-mono font-bold text-amber-300">
                  {topCriticalAlert.harvestData.metricLabel}: {topCriticalAlert.harvestData.metricValue}
                </span>
                <span className="text-[10px] text-white/70 truncate max-w-[130px]">
                  {topCriticalAlert.harvestData.location.split(',')[0]}
                </span>
              </div>

              <div className="flex items-center gap-1 text-[11px] font-bold text-amber-300 group-hover:translate-x-0.5 transition-transform">
                <span>Rincian & Aksi</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        )}

        {/* 2. Urgency Filter Toolbar (Semua, Darurat, Perhatian, Panen) */}
        <div className="bg-white px-3 py-2 border border-stone-200 flex items-center justify-between text-xs shadow-xs">
          <span className="text-stone-500 text-[11px] font-medium">Tingkat Alert:</span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setSelectedSeverity('all')}
              className={`px-2 py-0.5 text-[10px] font-semibold border ${
                selectedSeverity === 'all'
                  ? 'bg-stone-800 text-white border-stone-900'
                  : 'bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100'
              }`}
            >
              Semua ({notifications.length})
            </button>
            <button
              onClick={() => setSelectedSeverity('critical')}
              className={`px-2 py-0.5 text-[10px] font-semibold border ${
                selectedSeverity === 'critical'
                  ? 'bg-rose-600 text-white border-rose-700'
                  : 'bg-stone-50 text-rose-700 border-stone-200 hover:bg-rose-50'
              }`}
            >
              🔴 Kritis
            </button>
            <button
              onClick={() => setSelectedSeverity('warning')}
              className={`px-2 py-0.5 text-[10px] font-semibold border ${
                selectedSeverity === 'warning'
                  ? 'bg-amber-600 text-white border-amber-700'
                  : 'bg-stone-50 text-amber-700 border-stone-200 hover:bg-amber-50'
              }`}
            >
              🟡 Perhatian
            </button>
            <button
              onClick={() => setSelectedSeverity('info')}
              className={`px-2 py-0.5 text-[10px] font-semibold border ${
                selectedSeverity === 'info'
                  ? 'bg-emerald-700 text-white border-emerald-800'
                  : 'bg-stone-50 text-emerald-800 border-stone-200 hover:bg-emerald-50'
              }`}
            >
              🟢 Panen
            </button>
          </div>
        </div>

        {/* 3. Notifications List */}
        <div className="space-y-2">
          {filteredNotifications.length === 0 ? (
            <div className="bg-white p-8 text-center border border-stone-200 space-y-2">
              <Inbox className="w-10 h-10 text-stone-300 mx-auto" />
              <div className="text-xs font-bold text-stone-700">
                Tidak ada notifikasi dalam filter ini
              </div>
              <p className="text-[11px] text-stone-400">
                Pilih filter "Semua" atau picu simulasi alert panen dengan tombol "+ Uji Alert".
              </p>
            </div>
          ) : (
            filteredNotifications.map((item) => {
              const isHarvest = item.category === 'Peringatan Panen';
              const isCritical = item.severity === 'critical';
              const isWarning = item.severity === 'warning';

              return (
                <div
                  key={item.id}
                  onClick={() => handleNotificationClick(item)}
                  className={`bg-white border p-3.5 shadow-xs transition-all cursor-pointer relative overflow-hidden group ${
                    !item.isRead
                      ? isCritical
                        ? 'border-rose-400 bg-rose-50/25 ring-1 ring-rose-200'
                        : isWarning
                        ? 'border-amber-400 bg-amber-50/25 ring-1 ring-amber-200'
                        : 'border-emerald-400 bg-emerald-50/20 ring-1 ring-emerald-200'
                      : 'border-stone-200 hover:border-stone-300'
                  }`}
                >
                  {/* Left severity indicator stripe */}
                  <div
                    className={`absolute top-0 left-0 bottom-0 w-1 ${
                      isCritical
                        ? 'bg-rose-600'
                        : isWarning
                        ? 'bg-amber-500'
                        : item.category === 'Peringatan Panen'
                        ? 'bg-emerald-600'
                        : item.category === 'Transaksi'
                        ? 'bg-amber-600'
                        : 'bg-sky-600'
                    }`}
                  />

                  <div className="pl-1 space-y-2">
                    {/* Header: Category Badge + Severity Badge + Timestamp */}
                    <div className="flex items-center justify-between gap-1">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <div
                          className={`w-6 h-6 border flex items-center justify-center shrink-0 ${
                            isCritical
                              ? 'bg-rose-100 border-rose-300'
                              : isWarning
                              ? 'bg-amber-100 border-amber-300'
                              : 'bg-emerald-100 border-emerald-300'
                          }`}
                        >
                          {getCategoryIcon(item.category, item.severity)}
                        </div>

                        <span className="text-[10px] font-bold text-stone-600 uppercase tracking-wider">
                          {item.category}
                        </span>

                        {getSeverityBadge(item.severity)}

                        {!item.isRead && (
                          <span className="w-2 h-2 rounded-full bg-emerald-600 shrink-0" />
                        )}
                      </div>

                      <span className="text-[10px] font-mono text-stone-400 shrink-0">
                        {item.timeAgo}
                      </span>
                    </div>

                    {/* Title & Body */}
                    <div>
                      <h4
                        className={`text-xs font-bold leading-snug group-hover:text-emerald-900 transition-colors ${
                          !item.isRead ? 'text-stone-900 font-extrabold' : 'text-stone-800'
                        }`}
                      >
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-stone-600 leading-relaxed mt-1">
                        {item.message}
                      </p>
                    </div>

                    {/* Specific Harvest Alert Telemetry Box */}
                    {item.harvestData && (
                      <div className="bg-stone-50 border border-stone-200 p-2 space-y-1.5 text-xs">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="text-stone-500">Program / Lokasi:</span>
                          <span className="font-semibold text-stone-800 text-right truncate max-w-[210px]">
                            {item.harvestData.programTitle}
                          </span>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-[11px] text-stone-500">
                            {item.harvestData.metricLabel}:
                          </span>
                          <span
                            className={`font-mono font-bold text-xs ${
                              isCritical
                                ? 'text-rose-700 bg-rose-100 px-1.5 py-0.2 border border-rose-200'
                                : isWarning
                                ? 'text-amber-800 bg-amber-100 px-1.5 py-0.2 border border-amber-200'
                                : 'text-emerald-800 bg-emerald-100 px-1.5 py-0.2 border border-emerald-200'
                            }`}
                          >
                            {item.harvestData.metricValue}
                          </span>
                        </div>

                        {item.harvestData.daysToHarvest !== undefined && (
                          <div className="flex items-center justify-between text-[11px] pt-1 border-t border-stone-200">
                            <span className="text-stone-500">Target Panen Raya:</span>
                            <span className="font-bold text-emerald-800 flex items-center gap-1 font-mono">
                              <Calendar className="w-3 h-3 text-emerald-600" />
                              H-{item.harvestData.daysToHarvest} Hari Lagi
                            </span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Quick Action Row */}
                    <div className="pt-1.5 border-t border-stone-100 flex items-center justify-between text-xs">
                      {item.harvestData ? (
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveAlertDetail(item);
                            }}
                            className="bg-emerald-800 hover:bg-emerald-900 text-white font-bold px-2.5 py-1 text-[10px] flex items-center gap-1 border border-emerald-950 transition-colors cursor-pointer"
                          >
                            <Activity className="w-3 h-3" />
                            <span>Tindakan & CCTV</span>
                          </button>

                          {item.harvestData.cctvCameraId && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveCctvModal({
                                  title: item.harvestData?.programTitle || 'Pantau Panen',
                                  location: item.harvestData?.location || 'Kandang Mitra',
                                  camName: item.harvestData?.cctvCameraId || 'CAM-01',
                                  temperature: item.harvestData?.metricValue || '28.5°C',
                                });
                              }}
                              className="bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold px-2 py-1 text-[10px] flex items-center gap-1 border border-stone-300 transition-colors cursor-pointer"
                            >
                              <Video className="w-3 h-3 text-rose-600" />
                              <span>Live CCTV</span>
                            </button>
                          )}
                        </div>
                      ) : (
                        <div className="text-[10px] text-stone-500">
                          {item.category === 'Transaksi'
                            ? '📦 Pengiriman JNE Agri Cargo'
                            : item.category === 'Konsultasi'
                            ? '🩺 Ditangani Dokter SIP'
                            : '🌍 Informasi Pasar Ekspor'}
                        </div>
                      )}

                      <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-800 hover:underline">
                        <span>Lihat Rincian</span>
                        <ChevronRight className="w-3 h-3" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* MODAL 1: HARVEST ALERT DETAIL & ACTION SHEET */}
      {activeAlertDetail && activeAlertDetail.harvestData && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-white w-full max-w-[412px] max-h-[85vh] overflow-y-auto no-scrollbar border border-stone-300 shadow-2xl p-4 space-y-3.5 animate-slide-up">
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-2 border-b border-stone-200">
              <div className="flex items-start gap-2.5">
                <div
                  className={`w-9 h-9 border flex items-center justify-center shrink-0 ${
                    activeAlertDetail.severity === 'critical'
                      ? 'bg-rose-100 text-rose-700 border-rose-300'
                      : activeAlertDetail.severity === 'warning'
                      ? 'bg-amber-100 text-amber-800 border-amber-300'
                      : 'bg-emerald-100 text-emerald-800 border-emerald-300'
                  }`}
                >
                  <AlertCircle className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    {getSeverityBadge(activeAlertDetail.severity)}
                    <span className="text-[10px] font-mono text-stone-500">
                      ID: {activeAlertDetail.id}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-stone-900 leading-snug mt-1">
                    {activeAlertDetail.title}
                  </h4>
                </div>
              </div>

              <button
                onClick={() => setActiveAlertDetail(null)}
                className="text-stone-400 hover:text-stone-700 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Farm & Commodity Data */}
            <div className="bg-stone-50 p-3 border border-stone-200 space-y-2 text-xs">
              <div className="flex items-start justify-between gap-2">
                <span className="text-stone-500">Program / Unit:</span>
                <span className="font-bold text-stone-900 text-right">
                  {activeAlertDetail.harvestData.programTitle}
                </span>
              </div>
              <div className="flex items-start justify-between gap-2">
                <span className="text-stone-500">Lokasi Lahan:</span>
                <span className="font-medium text-stone-800 text-right">
                  {activeAlertDetail.harvestData.location}
                </span>
              </div>
              <div className="flex items-start justify-between gap-2">
                <span className="text-stone-500">Komoditas:</span>
                <span className="font-semibold text-emerald-900 text-right">
                  {activeAlertDetail.harvestData.commodityType}
                </span>
              </div>
            </div>

            {/* Live Sensor Metrics Comparison */}
            <div className="border border-stone-200 p-3 space-y-2">
              <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider block">
                Parameter Telemetri Sensor IoT
              </span>
              <div className="grid grid-cols-2 gap-2 text-center">
                <div
                  className={`p-2 border ${
                    activeAlertDetail.severity === 'critical'
                      ? 'bg-rose-50 border-rose-300'
                      : 'bg-amber-50 border-amber-300'
                  }`}
                >
                  <span className="text-[10px] text-stone-600 block">Nilai Sensor Terdeteksi</span>
                  <strong className="text-base font-black font-mono mt-0.5 block text-stone-900">
                    {activeAlertDetail.harvestData.metricValue}
                  </strong>
                </div>

                <div className="p-2 border bg-stone-50 border-stone-200">
                  <span className="text-[10px] text-stone-600 block">Ambang Batas Normal</span>
                  <strong className="text-xs font-bold font-mono mt-0.5 block text-stone-700">
                    {activeAlertDetail.harvestData.normalThreshold || 'Optimal'}
                  </strong>
                </div>
              </div>
            </div>

            {/* AI Agronomist & Vet Recommendation */}
            <div className="bg-emerald-50 border border-emerald-300 p-3 space-y-1.5 text-xs text-emerald-950">
              <div className="flex items-center gap-1.5 font-bold text-emerald-900">
                <Stethoscope className="w-4 h-4 text-emerald-700" />
                <span>Rekomendasi Tindakan Dokter & Ahli Agritech:</span>
              </div>
              <p className="text-[11px] leading-relaxed text-emerald-900">
                {activeAlertDetail.harvestData.recommendation}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-1">
              {/* Button 1: Live CCTV Camera */}
              {activeAlertDetail.harvestData.cctvCameraId && (
                <button
                  onClick={() => {
                    setActiveCctvModal({
                      title: activeAlertDetail.harvestData?.programTitle || 'Pantau Panen',
                      location: activeAlertDetail.harvestData?.location || 'Kandang Subang',
                      camName: activeAlertDetail.harvestData?.cctvCameraId || 'CAM-01',
                      temperature: activeAlertDetail.harvestData?.metricValue || '28.5°C',
                    });
                    setActiveAlertDetail(null);
                  }}
                  className="w-full bg-stone-900 hover:bg-stone-800 text-white py-2 px-3 text-xs font-bold flex items-center justify-center gap-2 border border-stone-950 cursor-pointer"
                >
                  <Video className="w-4 h-4 text-rose-500 animate-pulse" />
                  <span>Buka Live CCTV Kamera Monitoring (24/7)</span>
                </button>
              )}

              {/* Button 2: Go to Pantau Panen Screen */}
              {onNavigateToPantauPanen && (
                <button
                  onClick={() => {
                    setActiveAlertDetail(null);
                    onNavigateToPantauPanen();
                  }}
                  className="w-full bg-emerald-800 hover:bg-emerald-900 text-white py-2 px-3 text-xs font-bold flex items-center justify-center gap-2 border border-emerald-950 cursor-pointer"
                >
                  <Sprout className="w-4 h-4 text-emerald-300" />
                  <span>Buka Layar Pantau Panen & Titip Tani</span>
                </button>
              )}

              {/* Button 3: Consult Doctor */}
              {onNavigateToKonsultasi && (
                <button
                  onClick={() => {
                    setActiveAlertDetail(null);
                    onNavigateToKonsultasi();
                  }}
                  className="w-full bg-sky-700 hover:bg-sky-800 text-white py-2 px-3 text-xs font-bold flex items-center justify-center gap-2 border border-sky-900 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 text-sky-200" />
                  <span>Konsultasi Dokter Hewan / Tanaman Terkait</span>
                </button>
              )}

              {/* Button 4: Mark action completed */}
              <button
                onClick={() => {
                  showToast('Tindakan penanganan peringatan panen berhasil dikonfirmasi!');
                  setActiveAlertDetail(null);
                }}
                className="w-full bg-stone-100 hover:bg-stone-200 text-stone-800 py-1.5 px-3 text-xs font-semibold border border-stone-300 cursor-pointer flex items-center justify-center gap-1"
              >
                <Check className="w-3.5 h-3.5 text-emerald-700" />
                <span>Tandai Peringatan Telah Ditindaklanjuti</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: LIVE CCTV PREVIEW POPUP */}
      {activeCctvModal && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-3">
          <div className="bg-stone-900 w-full max-w-[390px] border border-stone-700 shadow-2xl overflow-hidden animate-scale-up text-white">
            {/* CCTV Top Header */}
            <div className="px-3 py-2.5 bg-stone-950 border-b border-stone-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-600 animate-ping" />
                <div>
                  <div className="text-xs font-bold flex items-center gap-1.5">
                    <span>LIVE CCTV MONITORING</span>
                    <span className="text-[9px] font-mono bg-rose-950 text-rose-300 px-1 border border-rose-800">
                      {activeCctvModal.camName}
                    </span>
                  </div>
                  <span className="text-[10px] text-stone-400">{activeCctvModal.location}</span>
                </div>
              </div>
              <button
                onClick={() => setActiveCctvModal(null)}
                className="text-stone-400 hover:text-white p-1 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Viewport Simulated Feed */}
            <div className="relative aspect-[16/10] bg-black overflow-hidden flex items-center justify-center">
              <img
                src="/src/assets/images/banner_pantau_panen_1794441162382.jpg"
                alt="Live CCTV Feed"
                className="w-full h-full object-cover opacity-80"
              />

              {/* Telemetry Overlays on CCTV feed */}
              <div className="absolute top-2 left-2 flex items-center gap-1 bg-black/80 px-2 py-0.5 text-[9px] font-mono text-emerald-400 border border-emerald-500/30">
                <Radio className="w-2.5 h-2.5 animate-pulse text-rose-500" />
                <span>STREAM: 1080p · 30 FPS</span>
              </div>

              <div className="absolute top-2 right-2 bg-black/80 px-2 py-0.5 text-[9px] font-mono text-amber-300 border border-amber-500/30">
                <span>SENSOR: {activeCctvModal.temperature}</span>
              </div>

              <div className="absolute bottom-2 left-2 right-2 bg-black/75 backdrop-blur-xs p-1.5 border border-stone-800 flex items-center justify-between text-[10px]">
                <span className="text-stone-300 truncate">{activeCctvModal.title}</span>
                <span className="font-mono text-emerald-400 font-bold">TERKONEKSI</span>
              </div>
            </div>

            {/* CCTV Action Footer */}
            <div className="p-3 bg-stone-950 border-t border-stone-800 flex items-center justify-between">
              <div className="text-[10px] text-stone-400">
                Peringatan sensor terintegrasi dengan IoT Gate 4.
              </div>
              <button
                onClick={() => setActiveCctvModal(null)}
                className="bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-bold px-3 py-1.5 transition-colors cursor-pointer"
              >
                Tutup Monitor
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
