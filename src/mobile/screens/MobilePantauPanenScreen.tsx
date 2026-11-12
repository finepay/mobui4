import { useState } from 'react';
import { ArrowLeft, CheckCircle2, TrendingUp, Radio, AlertCircle, Video, Activity, FileText, Camera } from 'lucide-react';
import { PANTAU_PANEN_PROGRAMS } from '../mobileData';
import { MobileTitipTaniMonitoringModal, SAMPLE_TITIP_PROGRAM } from './MobileTitipTaniMonitoringModal';

interface MobilePantauPanenScreenProps {
  onBack: () => void;
  onNavigateToMitra: () => void;
}

export default function MobilePantauPanenScreen({
  onBack,
  onNavigateToMitra,
}: MobilePantauPanenScreenProps) {
  const [selectedProgramId, setSelectedProgramId] = useState<string>(PANTAU_PANEN_PROGRAMS[0].id);
  const [bookedSuccess, setBookedSuccess] = useState<string | null>(null);
  const [isMonitoringModalOpen, setIsMonitoringModalOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const activeProgram =
    PANTAU_PANEN_PROGRAMS.find((p) => p.id === selectedProgramId) || PANTAU_PANEN_PROGRAMS[0];

  const handleBookSlot = (title: string) => {
    const code = Math.floor(1000 + Math.random() * 9000);
    setBookedSuccess(`TITIP-${code}`);
  };

  return (
    <div className="bg-stone-100 min-h-full pb-8">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed top-14 left-1/2 -translate-x-1/2 z-50 bg-stone-900 text-white px-3 py-2 text-xs font-bold shadow-2xl flex items-center gap-2 border border-emerald-500 animate-in fade-in duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Sub-screen Header */}
      <div className="bg-white border-b border-stone-200 px-3 py-2.5 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-2">
          <button
            onClick={onBack}
            className="p-1 hover:bg-stone-100 text-stone-700 transition-colors"
            title="Kembali ke Beranda"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h3 className="text-sm font-bold text-stone-900 leading-tight">Pantau Panen Terniva</h3>
            <span className="text-[10px] text-emerald-800 font-semibold">CCTV Live, Sensor IoT & Titip Tani-Ternak</span>
          </div>
        </div>
        <button
          onClick={onNavigateToMitra}
          className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 border border-emerald-300"
        >
          Form Mitra
        </button>
      </div>

      <div className="p-3 space-y-3">
        {/* Banner with Live IoT Status and Direct CCTV Shortcut */}
        <div className="bg-stone-900 text-white p-4 shadow-sm relative overflow-hidden border border-stone-800">
          <div className="flex items-center justify-between text-xs text-emerald-300 font-medium mb-1">
            <span className="flex items-center gap-1.5 font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>CCTV LIVE & SENSOR IOT AKTIF 24 JAM</span>
            </span>
            <span className="font-mono text-[10px] text-stone-400">Cluster Subang & Takengon</span>
          </div>

          <h4 className="text-sm font-bold text-white mt-1">
            Transparansi Real-Time Kondisi Titip Tani-Ternak
          </h4>
          <p className="text-xs text-stone-300 mt-1 leading-relaxed">
            Pantau pertumbuhan bobot harian ternak (ADG), suhu, amonia, log makan, dan foto fisik terkini secara live dari ponsel Anda.
          </p>

          <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-stone-800 text-xs">
            <div className="bg-stone-800/90 p-2 border border-stone-700">
              <span className="text-[10px] text-stone-400 block">Suhu Rata-rata:</span>
              <span className="font-bold font-mono text-emerald-400">{activeProgram.sensorMetrics.temperature} (Normal)</span>
            </div>
            <div className="bg-stone-800/90 p-2 border border-stone-700">
              <span className="text-[10px] text-stone-400 block">Pertumbuhan ADG:</span>
              <span className="font-bold font-mono text-amber-300">{activeProgram.sensorMetrics.adgAverage}</span>
            </div>
          </div>

          {/* Tombol Utama Buka Pemantau CCTV & Sensor */}
          <button
            onClick={() => setIsMonitoringModalOpen(true)}
            className="w-full mt-3 py-2.5 bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-2 border border-emerald-500 shadow-md transition-colors"
          >
            <Video className="w-4 h-4 text-emerald-200" />
            <span>Lihat CCTV Live, Sensor IoT, Log & Foto Kondisi Terkini</span>
          </button>
        </div>

        {/* 4 Feature Cards (CCTV, Sensor, Log, Foto) Shortcut */}
        <div className="grid grid-cols-4 gap-1.5">
          <button
            onClick={() => setIsMonitoringModalOpen(true)}
            className="p-2 bg-white border border-stone-200 hover:border-emerald-700 text-center space-y-1 shadow-2xs transition-colors"
          >
            <Video className="w-4 h-4 mx-auto text-emerald-700" />
            <span className="text-[10px] font-bold text-stone-800 block">4 Kamera CCTV</span>
          </button>
          <button
            onClick={() => setIsMonitoringModalOpen(true)}
            className="p-2 bg-white border border-stone-200 hover:border-emerald-700 text-center space-y-1 shadow-2xs transition-colors"
          >
            <Activity className="w-4 h-4 mx-auto text-blue-600" />
            <span className="text-[10px] font-bold text-stone-800 block">Sensor Suhu/NH3</span>
          </button>
          <button
            onClick={() => setIsMonitoringModalOpen(true)}
            className="p-2 bg-white border border-stone-200 hover:border-emerald-700 text-center space-y-1 shadow-2xs transition-colors"
          >
            <FileText className="w-4 h-4 mx-auto text-amber-600" />
            <span className="text-[10px] font-bold text-stone-800 block">Log Pakan Harian</span>
          </button>
          <button
            onClick={() => setIsMonitoringModalOpen(true)}
            className="p-2 bg-white border border-stone-200 hover:border-emerald-700 text-center space-y-1 shadow-2xs transition-colors"
          >
            <Camera className="w-4 h-4 mx-auto text-purple-600" />
            <span className="text-[10px] font-bold text-stone-800 block">Foto Fisik Sapi</span>
          </button>
        </div>

        {/* Success Modal */}
        {bookedSuccess && (
          <div className="p-4 bg-emerald-50 border border-emerald-300 text-center space-y-2">
            <CheckCircle2 className="w-8 h-8 text-emerald-700 mx-auto" />
            <h5 className="text-xs font-bold text-stone-900">Reservasi Slot Berhasil Terdaftar!</h5>
            <div className="p-2 bg-white border border-emerald-200 font-mono font-bold text-emerald-800 text-xs">
              ID Kontrak: {bookedSuccess}
            </div>
            <p className="text-[11px] text-stone-600">
              Tim field officer Terniva akan mengirimkan dokumen akad kemitraan ke WhatsApp Anda.
            </p>
            <button
              onClick={() => setBookedSuccess(null)}
              className="text-xs font-bold text-emerald-800 underline pt-1"
            >
              Tutup
            </button>
          </div>
        )}

        {/* Program Cards */}
        <div className="space-y-2.5">
          <div className="text-xs font-bold text-stone-900 uppercase tracking-wide">
            Pilihan Program Pantau Panen & Titip Ternak Aktif
          </div>

          {PANTAU_PANEN_PROGRAMS.map((prog) => (
            <div
              key={prog.id}
              className={`bg-white p-4 border transition-all ${
                selectedProgramId === prog.id
                  ? 'border-emerald-700 shadow-sm ring-1 ring-emerald-700'
                  : 'border-stone-200'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 border border-emerald-200">
                    {prog.category}
                  </span>
                  <h5 className="text-sm font-bold text-stone-900 mt-1">{prog.title}</h5>
                  <span className="text-[11px] text-stone-500 block mt-0.5">{prog.location}</span>
                </div>

                <div className="text-right shrink-0">
                  <div className="text-xs font-bold text-emerald-800 font-mono">{prog.roiEstimate}</div>
                  <div className="text-[10px] text-stone-400">Estimasi Bagi Hasil</div>
                </div>
              </div>

              <p className="text-xs text-stone-600 mt-2.5 leading-relaxed">{prog.description}</p>

              <div className="mt-3 p-2.5 bg-stone-50 border border-stone-200 grid grid-cols-2 gap-2 text-[11px] text-stone-700">
                <div>
                  <span className="text-stone-400 block text-[10px]">Durasi Siklus:</span>
                  <span className="font-semibold">{prog.cycleDuration}</span>
                </div>
                <div>
                  <span className="text-stone-400 block text-[10px]">Sisa Slot:</span>
                  <span className="font-semibold text-rose-600">{prog.slotAvailable} dari {prog.totalSlot} Slot</span>
                </div>
              </div>

              {/* Action Buttons: Live Monitoring & Ikuti Program */}
              <div className="mt-3 pt-2.5 border-t border-stone-100 flex items-center justify-between gap-2">
                <div>
                  <span className="text-[10px] text-stone-400 block">Biaya / Slot:</span>
                  <span className="text-xs font-bold text-stone-900 font-mono">
                    Rp {prog.pricePerSlot.toLocaleString('id-ID')}
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setIsMonitoringModalOpen(true)}
                    className="px-2.5 py-1.5 border border-stone-300 hover:border-emerald-700 text-stone-800 text-xs font-bold flex items-center gap-1 transition-colors"
                  >
                    <Video className="w-3.5 h-3.5 text-emerald-700" />
                    <span>CCTV & Sensor</span>
                  </button>

                  <button
                    onClick={() => {
                      setSelectedProgramId(prog.id);
                      handleBookSlot(prog.title);
                    }}
                    className="px-3 py-1.5 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold shadow-xs"
                  >
                    Ikuti Program
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Monitoring CCTV, Sensor, Log & Foto */}
      {isMonitoringModalOpen && (
        <MobileTitipTaniMonitoringModal
          program={SAMPLE_TITIP_PROGRAM}
          onClose={() => setIsMonitoringModalOpen(false)}
          onShowToast={showToast}
        />
      )}
    </div>
  );
}
