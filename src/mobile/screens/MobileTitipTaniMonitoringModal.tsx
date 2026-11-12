import { useState, useEffect } from 'react';
import {
  X,
  Video,
  Activity,
  FileText,
  Camera,
  Maximize2,
  Volume2,
  VolumeX,
  Radio,
  ChevronRight,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Calendar,
  Clock,
  Thermometer,
  Droplets,
  Wind,
  Scale,
  Sparkles,
  Download,
} from 'lucide-react';

export interface TitipTaniProgram {
  id: string;
  code: string;
  title: string;
  category: 'Peternakan' | 'Pertanian';
  location: string;
  dayCount: string;
  currentWeight: string;
  adgGain: string;
  temperature: string;
  humidity: string;
  ammonia: string;
  waterIntake: string;
  cctvCameras: {
    id: string;
    name: string;
    description: string;
    streamUrl: string;
  }[];
  recentPhotos: {
    id: string;
    title: string;
    angle: string;
    takenAt: string;
    nurseName: string;
    notes: string;
    imageUrl: string;
  }[];
  careLogs: {
    id: string;
    time: string;
    date: string;
    category: 'Pakan' | 'Medis' | 'Sanitasi' | 'Timbang';
    nurseName: string;
    title: string;
    description: string;
  }[];
  weightHistory: {
    week: string;
    weight: number;
    gain: string;
  }[];
}

export const SAMPLE_TITIP_PROGRAM: TitipTaniProgram = {
  id: 'titip-subang-08',
  code: 'SL-SUBANG-08',
  title: 'Sapi Limousin Cross Jantan #SL-08 (Kandang Subang)',
  category: 'Peternakan',
  location: 'Kandang Koloni Alpha-01, Subang, Jawa Barat',
  dayCount: 'Hari ke-42 dari 90 Hari Siklus',
  currentWeight: '462.5 kg',
  adgGain: '+1.38 kg / hari',
  temperature: '24.8°C',
  humidity: '68%',
  ammonia: '8.2 ppm',
  waterIntake: '42.5 L / hari',
  cctvCameras: [
    {
      id: 'cam-1',
      name: 'Kamera 1: Palungan Pakan & Timbangan',
      description: 'Menyorot area makan konsentrat dan pijakan sensor timbangan digital.',
      streamUrl: '/src/assets/images/terniva_hero_landscape_1794449096818.jpg',
    },
    {
      id: 'cam-2',
      name: 'Kamera 2: Koloni Penggemukan Blok A',
      description: 'Menyorot ruang gerak dan perilaku sapi limousin koloni 08.',
      streamUrl: '/src/assets/images/terniva_mitra_farmer_1794449097085.jpg',
    },
    {
      id: 'cam-3',
      name: 'Kamera 3: Saluran Air Minum Nipple Otomatis',
      description: 'Pemantauan konsumsi air minum dan kebersihan lantai.',
      streamUrl: '/src/assets/images/banner_hero_agritech_1794441148053.jpg',
    },
    {
      id: 'cam-4',
      name: 'Kamera 4: Koridor Biosekuriti & Disinfektan',
      description: 'Gerbang masuk steril perawat ternak dan dokter hewan.',
      streamUrl: '/src/assets/images/terniva_dok_konsultasi_1794449097905.jpg',
    },
  ],
  recentPhotos: [
    {
      id: 'photo-1',
      title: 'Tampak Depan (Moncong & Mata Bersinar)',
      angle: 'Tampak Muka',
      takenAt: 'Hari ini, 08:30 WIB',
      nurseName: 'Slamet (Perawat Kandang Subang)',
      notes: 'Moncong basah segar alami, mata jernih tanpa kotoran, nafsu makan sangat tinggi saat pemberian konsentrat pagi.',
      imageUrl: '/src/assets/images/terniva_mitra_farmer_1794449097085.jpg',
    },
    {
      id: 'photo-2',
      title: 'Tampak Samping (Perkembangan Otot Punggung)',
      angle: 'Tampak Samping Kiri',
      takenAt: 'Kemarin, 16:15 WIB',
      nurseName: 'Dimas (Agronom Terniva)',
      notes: 'Garis punggung mulai tebal merata, panggul padat berisi. Kenaikan bobot melampaui target harian.',
      imageUrl: '/src/assets/images/terniva_hero_landscape_1794449096818.jpg',
    },
    {
      id: 'photo-3',
      title: 'Celah Kuku Kering Bebas Luka & PMK',
      angle: 'Detail Kuku Belakang',
      takenAt: '09 Maret 2025',
      nurseName: 'drh. Aryo Wibisono',
      notes: 'Inspeksi kuku berkala. Tidak ada lepuh atau kemerahan. Alas jerami kering diganti tepat waktu.',
      imageUrl: '/src/assets/images/terniva_dok_konsultasi_1794449097905.jpg',
    },
    {
      id: 'photo-4',
      title: 'Tampilan Display Timbangan Digital Load Cell',
      angle: 'Layar Timbangan Digital',
      takenAt: '08 Maret 2025',
      nurseName: 'Slamet (Perawat)',
      notes: 'Bobot hidup tercatat 462.5 kg pada timbangan digital terkalibrasi Kementan.',
      imageUrl: '/src/assets/images/banner_pantau_panen_1794441162382.jpg',
    },
  ],
  careLogs: [
    {
      id: 'log-1',
      date: '11 Maret 2025',
      time: '10:30 WIB',
      category: 'Sanitasi',
      nurseName: 'Slamet (Perawat Kandang)',
      title: 'Pembersihan Lantai & Pengaliran Saluran Biogas',
      description: 'Pembersihan kotoran feses harian, penaburan serbuk kapur desinfektan dan alas jerami baru agar kaki sapi tetap kering.',
    },
    {
      id: 'log-2',
      date: '11 Maret 2025',
      time: '07:00 WIB',
      category: 'Pakan',
      nurseName: 'Slamet (Perawat Kandang)',
      title: 'Pemberian Konsentrat Fermentasi Pagi (4.0 Kg)',
      description: 'Konsentrat protein 16% + premix mineral 100g habis dikonsumsi tuntas dalam 25 menit. Air minum ditambah probiotik EM4.',
    },
    {
      id: 'log-3',
      date: '10 Maret 2025',
      time: '16:00 WIB',
      category: 'Pakan',
      nurseName: 'Slamet (Perawat Kandang)',
      title: 'Pemberian Hijauan Sore Silase Jagung (15.0 Kg)',
      description: 'Silase tebon jagung fermentasi wangi asam segar dimakan lahap. Rumen normal tidak ada tanda kembung.',
    },
    {
      id: 'log-4',
      date: '09 Maret 2025',
      time: '09:00 WIB',
      category: 'Medis',
      nurseName: 'drh. Aryo Wibisono, M.Si',
      title: 'Inspeksi Kesehatan Mingguan & Auskultasi Jantung',
      description: 'Suhu tubuh 38.6°C (normal), denyut jantung teratur, mata cerah, nafsu makan baik. Diberikan suntik multivitamin B-Complex 10ml.',
    },
    {
      id: 'log-5',
      date: '08 Maret 2025',
      time: '07:30 WIB',
      category: 'Timbang',
      nurseName: 'Tim Monitoring Terniva',
      title: 'Timbang Bobot Mingguan (Hasil: 462.5 Kg)',
      description: 'Kenaikan bobot 7 hari sebesar 9.7 kg (ADG +1.38 kg/hari). Sesuai kurva pertumbuhan target panen 90 hari.',
    },
  ],
  weightHistory: [
    { week: 'Awal Tebar', weight: 405.0, gain: '+0.0 kg' },
    { week: 'Minggu 1', weight: 414.5, gain: '+9.5 kg' },
    { week: 'Minggu 2', weight: 424.0, gain: '+9.5 kg' },
    { week: 'Minggu 3', weight: 433.8, gain: '+9.8 kg' },
    { week: 'Minggu 4', weight: 443.2, gain: '+9.4 kg' },
    { week: 'Minggu 5', weight: 452.8, gain: '+9.6 kg' },
    { week: 'Minggu 6 (Kini)', weight: 462.5, gain: '+9.7 kg' },
  ],
};

interface MobileTitipTaniMonitoringModalProps {
  program?: TitipTaniProgram;
  onClose: () => void;
  onShowToast: (msg: string) => void;
}

export function MobileTitipTaniMonitoringModal({
  program = SAMPLE_TITIP_PROGRAM,
  onClose,
  onShowToast,
}: MobileTitipTaniMonitoringModalProps) {
  // Tabs: 'cctv' | 'sensor' | 'log' | 'foto'
  const [activeTab, setActiveTab] = useState<'cctv' | 'sensor' | 'log' | 'foto'>('cctv');

  // CCTV State
  const [selectedCameraId, setSelectedCameraId] = useState(program.cctvCameras[0].id);
  const [isAudioMuted, setIsAudioMuted] = useState(true);
  const [currentTimeStr, setCurrentTimeStr] = useState('');
  const [selectedPhotoDetail, setSelectedPhotoDetail] = useState<(typeof program.recentPhotos)[0] | null>(null);

  // Moving Live Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTimeStr(
        now.toLocaleDateString('id-ID', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        }) +
          ' ' +
          now.toLocaleTimeString('id-ID', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          }) +
          ' WIB'
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const activeCamera =
    program.cctvCameras.find((c) => c.id === selectedCameraId) || program.cctvCameras[0];

  const handleCaptureSnapshot = () => {
    onShowToast(`Tangkapan layar CCTV (${activeCamera.name}) berhasil disimpan ke galeri ponsel!`);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="w-full max-w-[430px] bg-white text-stone-900 h-[95vh] max-h-[820px] flex flex-col shadow-2xl border border-stone-300 overflow-hidden">
        {/* Header */}
        <div className="p-3 bg-emerald-900 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-emerald-300 animate-pulse" />
            <div>
              <h4 className="text-xs font-bold leading-tight">{program.title}</h4>
              <span className="text-[10px] text-emerald-200 font-mono">
                {program.code} · {program.dayCount}
              </span>
            </div>
          </div>
          <button onClick={onClose} className="p-1 text-white/80 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 4 Main Tabs: CCTV, Sensor, Log, Foto */}
        <div className="grid grid-cols-4 bg-stone-100 border-b border-stone-200 text-xs font-bold text-center shrink-0">
          <button
            onClick={() => setActiveTab('cctv')}
            className={`py-2.5 flex flex-col sm:flex-row items-center justify-center gap-1 border-b-2 transition-colors ${
              activeTab === 'cctv'
                ? 'border-emerald-800 text-emerald-900 bg-white'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <Video className="w-3.5 h-3.5 text-emerald-700" />
            <span>CCTV Live</span>
          </button>

          <button
            onClick={() => setActiveTab('sensor')}
            className={`py-2.5 flex flex-col sm:flex-row items-center justify-center gap-1 border-b-2 transition-colors ${
              activeTab === 'sensor'
                ? 'border-emerald-800 text-emerald-900 bg-white'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <Activity className="w-3.5 h-3.5 text-emerald-700" />
            <span>Sensor IoT</span>
          </button>

          <button
            onClick={() => setActiveTab('log')}
            className={`py-2.5 flex flex-col sm:flex-row items-center justify-center gap-1 border-b-2 transition-colors ${
              activeTab === 'log'
                ? 'border-emerald-800 text-emerald-900 bg-white'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-emerald-700" />
            <span>Log Harian</span>
          </button>

          <button
            onClick={() => setActiveTab('foto')}
            className={`py-2.5 flex flex-col sm:flex-row items-center justify-center gap-1 border-b-2 transition-colors ${
              activeTab === 'foto'
                ? 'border-emerald-800 text-emerald-900 bg-white'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <Camera className="w-3.5 h-3.5 text-emerald-700" />
            <span>Foto Fisik</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto bg-stone-100">
          {/* ============================================================== */}
          {/* TAB 1: CCTV LIVE STREAMING                                     */}
          {/* ============================================================== */}
          {activeTab === 'cctv' && (
            <div className="space-y-3 p-3">
              {/* CCTV Live Viewport */}
              <div className="relative bg-black aspect-video border border-stone-800 overflow-hidden shadow-inner group">
                <img
                  src={activeCamera.streamUrl}
                  alt={activeCamera.name}
                  className="w-full h-full object-cover opacity-90 group-hover:scale-102 transition-transform duration-300"
                />

                {/* CCTV HUD Top Overlay */}
                <div className="absolute top-2 left-2 right-2 flex items-center justify-between text-[10px] font-mono text-white bg-black/60 px-2 py-1 backdrop-blur-xs">
                  <div className="flex items-center gap-1.5 font-bold">
                    <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                    <span className="text-rose-400">REC ● LIVE</span>
                    <span className="text-stone-300">| 1080p 60fps</span>
                  </div>
                  <div className="text-emerald-400">{currentTimeStr}</div>
                </div>

                {/* CCTV HUD Bottom Overlay */}
                <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[10px] font-mono text-white bg-black/60 px-2 py-1 backdrop-blur-xs">
                  <span className="font-bold text-stone-200 truncate">{activeCamera.name}</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsAudioMuted(!isAudioMuted)}
                      className="p-1 text-stone-300 hover:text-white"
                      title={isAudioMuted ? 'Nyalakan Audio' : 'Matikan Audio'}
                    >
                      {isAudioMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-emerald-400" />}
                    </button>
                    <button
                      onClick={handleCaptureSnapshot}
                      className="p-1 text-stone-300 hover:text-emerald-400"
                      title="Ambil Foto CCTV"
                    >
                      <Camera className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Multi-Camera Selector */}
              <div className="space-y-1.5">
                <div className="text-xs font-bold text-stone-900 flex items-center justify-between">
                  <span>Pilih Saluran Kamera Kandang:</span>
                  <span className="text-[10px] text-emerald-800 font-mono">4 Kamera Online</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {program.cctvCameras.map((cam) => (
                    <button
                      key={cam.id}
                      onClick={() => setSelectedCameraId(cam.id)}
                      className={`p-2 text-left text-xs border transition-colors ${
                        selectedCameraId === cam.id
                          ? 'bg-emerald-800 text-white border-emerald-800'
                          : 'bg-white text-stone-800 border-stone-300 hover:bg-stone-50'
                      }`}
                    >
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            selectedCameraId === cam.id ? 'bg-emerald-300 animate-pulse' : 'bg-emerald-600'
                          }`}
                        />
                        <span className="font-bold truncate text-[11px]">{cam.name}</span>
                      </div>
                      <p
                        className={`text-[9px] mt-1 line-clamp-1 ${
                          selectedCameraId === cam.id ? 'text-emerald-100' : 'text-stone-500'
                        }`}
                      >
                        {cam.description}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Metrics Bar Under CCTV */}
              <div className="bg-white border border-stone-200 p-3 grid grid-cols-3 gap-2 text-center text-xs">
                <div>
                  <span className="text-[10px] text-stone-500 block">Bobot Sapi Saat Ini:</span>
                  <span className="font-bold font-mono text-stone-900 text-xs">{program.currentWeight}</span>
                </div>
                <div>
                  <span className="text-[10px] text-stone-500 block">Kenaikan ADG:</span>
                  <span className="font-bold font-mono text-emerald-800 text-xs">{program.adgGain}</span>
                </div>
                <div>
                  <span className="text-[10px] text-stone-500 block">Suhu Kandang:</span>
                  <span className="font-bold font-mono text-stone-900 text-xs">{program.temperature}</span>
                </div>
              </div>

              {/* Tombol Ambil Snapshot & Fullscreen */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={handleCaptureSnapshot}
                  className="py-2.5 bg-white border border-stone-300 hover:border-emerald-700 text-stone-800 font-bold text-xs flex items-center justify-center gap-1.5"
                >
                  <Camera className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Ambil Foto Tangkapan Layar</span>
                </button>
                <button
                  onClick={() => onShowToast('Mode Layar Penuh CCTV Aktif!')}
                  className="py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs flex items-center justify-center gap-1.5"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Perbesar Layar Penuh</span>
                </button>
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 2: METRIK SENSOR IOT LENGKAP                               */}
          {/* ============================================================== */}
          {activeTab === 'sensor' && (
            <div className="p-3 space-y-3 text-xs">
              {/* Header Status Sensor */}
              <div className="p-3 bg-emerald-50 border border-emerald-300 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                  <div>
                    <span className="font-bold text-emerald-900 block">Semua Sensor IoT Berfungsi Normal</span>
                    <span className="text-[10px] text-emerald-700 font-mono">Pembaruan data: Tiap 15 detik</span>
                  </div>
                </div>
                <span className="text-[9px] font-bold bg-emerald-700 text-white px-2 py-0.5">ONLINE</span>
              </div>

              {/* 4 Sensor Cards Grid */}
              <div className="grid grid-cols-2 gap-2">
                {/* 1. Suhu Kandang */}
                <div className="bg-white border border-stone-200 p-3 space-y-1">
                  <div className="flex items-center justify-between text-stone-500">
                    <span className="text-[10px] font-bold">SUHU KANDANG</span>
                    <Thermometer className="w-4 h-4 text-emerald-700" />
                  </div>
                  <div className="text-base font-bold font-mono text-stone-900">{program.temperature}</div>
                  <div className="text-[10px] text-emerald-800 font-bold">Normal (Ideal 22 - 27°C)</div>
                </div>

                {/* 2. Kelembapan */}
                <div className="bg-white border border-stone-200 p-3 space-y-1">
                  <div className="flex items-center justify-between text-stone-500">
                    <span className="text-[10px] font-bold">KELEMBAPAN UDARA</span>
                    <Droplets className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="text-base font-bold font-mono text-stone-900">{program.humidity}</div>
                  <div className="text-[10px] text-emerald-800 font-bold">Optimal (Ideal 60 - 75%)</div>
                </div>

                {/* 3. Gas Amonia */}
                <div className="bg-white border border-stone-200 p-3 space-y-1">
                  <div className="flex items-center justify-between text-stone-500">
                    <span className="text-[10px] font-bold">GAS AMONIA (NH3)</span>
                    <Wind className="w-4 h-4 text-amber-600" />
                  </div>
                  <div className="text-base font-bold font-mono text-stone-900">{program.ammonia}</div>
                  <div className="text-[10px] text-emerald-800 font-bold">Aman Bersih (Batas &lt; 15 ppm)</div>
                </div>

                {/* 4. Konsumsi Air */}
                <div className="bg-white border border-stone-200 p-3 space-y-1">
                  <div className="flex items-center justify-between text-stone-500">
                    <span className="text-[10px] font-bold">DEBIT AIR MINUM</span>
                    <Droplets className="w-4 h-4 text-cyan-600" />
                  </div>
                  <div className="text-base font-bold font-mono text-stone-900">{program.waterIntake}</div>
                  <div className="text-[10px] text-stone-600">Aliran Nipple Otomatis</div>
                </div>
              </div>

              {/* Grafik Pertumbuhan Bobot Mingguan (Load Cell Digital) */}
              <div className="bg-white border border-stone-200 p-3.5 space-y-2.5">
                <div className="flex items-center justify-between pb-1.5 border-b border-stone-100">
                  <div className="flex items-center gap-1.5">
                    <Scale className="w-4 h-4 text-emerald-800" />
                    <span className="text-xs font-bold text-stone-900">
                      Riwayat Timbangan Bobot Digital (Load Cell)
                    </span>
                  </div>
                  <span className="text-[10px] text-emerald-800 font-mono font-bold">
                    {program.adgGain}
                  </span>
                </div>

                {/* Bar chart representation */}
                <div className="space-y-1.5 pt-1">
                  {program.weightHistory.map((item, idx) => {
                    const percent = Math.min(100, Math.max(20, ((item.weight - 390) / 90) * 100));
                    return (
                      <div key={idx} className="space-y-0.5 text-[11px]">
                        <div className="flex items-center justify-between text-stone-700">
                          <span className="font-semibold">{item.week}</span>
                          <span className="font-mono font-bold text-stone-900">
                            {item.weight} kg <span className="text-emerald-800 text-[10px]">({item.gain})</span>
                          </span>
                        </div>
                        <div className="w-full bg-stone-100 h-2 border border-stone-200 overflow-hidden">
                          <div
                            className="bg-emerald-800 h-full transition-all duration-500"
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 3: LOG & CATATAN PERAWATAN HARIAN                          */}
          {/* ============================================================== */}
          {activeTab === 'log' && (
            <div className="p-3 space-y-3 text-xs">
              <div className="text-xs font-bold text-stone-900 flex items-center justify-between">
                <span>Catatan Perawatan & Medis Lapangan:</span>
                <span className="text-[10px] text-stone-500 font-mono">
                  {program.careLogs.length} Catatan Terverifikasi
                </span>
              </div>

              {/* Log Timeline */}
              <div className="space-y-2.5">
                {program.careLogs.map((log) => (
                  <div
                    key={log.id}
                    className="bg-white border border-stone-200 p-3 space-y-1.5 shadow-2xs hover:border-emerald-700 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-[9px] font-bold px-2 py-0.5 uppercase ${
                          log.category === 'Pakan'
                            ? 'bg-amber-100 text-amber-800 border border-amber-300'
                            : log.category === 'Medis'
                            ? 'bg-blue-100 text-blue-800 border border-blue-300'
                            : log.category === 'Sanitasi'
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                            : 'bg-purple-100 text-purple-800 border border-purple-300'
                        }`}
                      >
                        {log.category}
                      </span>
                      <span className="text-[10px] text-stone-400 font-mono">
                        {log.date} · {log.time}
                      </span>
                    </div>

                    <h5 className="font-bold text-xs text-stone-900 leading-snug">{log.title}</h5>
                    <p className="text-[11px] text-stone-600 leading-relaxed">{log.description}</p>

                    <div className="pt-1.5 border-t border-stone-100 flex items-center justify-between text-[10px] text-stone-500">
                      <span>Petugas: <strong>{log.nurseName}</strong></span>
                      <span className="text-emerald-800 font-bold">Terverifikasi Digital</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 4: FOTO UPDATE KONDISI TERAKHIR (GALERI DOKUMENTASI)        */}
          {/* ============================================================== */}
          {activeTab === 'foto' && (
            <div className="p-3 space-y-3 text-xs">
              <div className="text-xs font-bold text-stone-900 flex items-center justify-between">
                <span>Dokumentasi Fisik Berkala (Foto Terakhir):</span>
                <span className="text-[10px] text-emerald-800 font-mono">Diperbarui Mingguan</span>
              </div>

              {/* Photo Cards Grid */}
              <div className="grid grid-cols-2 gap-2.5">
                {program.recentPhotos.map((photo) => (
                  <div
                    key={photo.id}
                    onClick={() => setSelectedPhotoDetail(photo)}
                    className="bg-white border border-stone-200 overflow-hidden shadow-2xs hover:border-emerald-700 cursor-pointer group"
                  >
                    <div className="relative aspect-4/3 bg-stone-200 overflow-hidden">
                      <img
                        src={photo.imageUrl}
                        alt={photo.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                      />
                      <span className="absolute bottom-1 right-1 bg-black/70 text-white text-[9px] font-mono px-1">
                        {photo.takenAt.split(',')[0]}
                      </span>
                    </div>
                    <div className="p-2 space-y-0.5">
                      <div className="font-bold text-[11px] text-stone-900 truncate group-hover:text-emerald-800">
                        {photo.title}
                      </div>
                      <div className="text-[9px] text-stone-500">{photo.angle}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Lightbox Preview Foto */}
        {selectedPhotoDetail && (
          <div className="fixed inset-0 z-60 bg-black/90 flex items-center justify-center p-3">
            <div className="w-full max-w-sm bg-white text-stone-900 p-4 space-y-3 border border-stone-300">
              <div className="flex items-center justify-between pb-2 border-b border-stone-200">
                <div>
                  <h4 className="text-xs font-bold text-stone-900">{selectedPhotoDetail.title}</h4>
                  <span className="text-[10px] text-stone-500">{selectedPhotoDetail.takenAt}</span>
                </div>
                <button
                  onClick={() => setSelectedPhotoDetail(null)}
                  className="p-1 text-stone-500 hover:text-stone-900"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="aspect-4/3 bg-black overflow-hidden border border-stone-200">
                <img
                  src={selectedPhotoDetail.imageUrl}
                  alt={selectedPhotoDetail.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-2.5 bg-stone-50 border border-stone-200 text-xs space-y-1">
                <div className="text-[10px] font-bold text-emerald-800">Catatan Perawat Ternak / Agronom:</div>
                <p className="text-[11px] text-stone-700 leading-snug">{selectedPhotoDetail.notes}</p>
                <div className="text-[10px] text-stone-500 mt-1">
                  Petugas: <strong>{selectedPhotoDetail.nurseName}</strong>
                </div>
              </div>

              <button
                onClick={() => {
                  onShowToast('Foto berhasil diunduh ke galeri ponsel!');
                  setSelectedPhotoDetail(null);
                }}
                className="w-full py-2 bg-emerald-800 text-white font-bold text-xs flex items-center justify-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Unduh Foto Dokumentasi</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
