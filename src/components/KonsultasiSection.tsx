import { useState } from 'react';
import { DOCTORS_DATA, SYMPTOM_TRIAGE_DB } from '../data/ternivaData';
import { Doctor, DoctorType } from '../types';
import {
  Stethoscope,
  Sprout,
  MessageSquare,
  AlertTriangle,
  Calendar,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Search,
  Upload,
  ArrowRight,
} from 'lucide-react';

interface KonsultasiSectionProps {
  onOpenDoctorChat: (doctor: Doctor, prefilledTopic?: string) => void;
}

export default function KonsultasiSection({ onOpenDoctorChat }: KonsultasiSectionProps) {
  const [activeTab, setActiveTab] = useState<DoctorType>('hewan');

  // Symptom Triage Tool States
  const [symptomSubject, setSymptomSubject] = useState<string>('sapi');
  const [selectedPresetSymptomIndex, setSelectedPresetSymptomIndex] = useState<number>(0);
  const [customSymptomText, setCustomSymptomText] = useState<string>('');
  const [simulatedPhotoAttached, setSimulatedPhotoAttached] = useState<boolean>(false);
  const [triageReport, setTriageReport] = useState<{
    suspected: string;
    severity: string;
    firstAid: string;
  } | null>(null);

  // Field visit booking state
  const [bookingData, setBookingData] = useState({
    farmerName: '',
    phone: '',
    serviceType: 'Telekonsultasi Darurat (WhatsApp / Video)',
    location: '',
    preferredDate: '2026-11-15',
    problemSummary: '',
  });
  const [bookingConfirmedCode, setBookingConfirmedCode] = useState<string | null>(null);

  const filteredDoctors = DOCTORS_DATA.filter((d) => d.type === activeTab);
  const currentPresetSymptoms = activeTab === 'hewan' ? SYMPTOM_TRIAGE_DB.hewan : SYMPTOM_TRIAGE_DB.tanaman;

  const handleRunTriage = () => {
    const currentPreset = currentPresetSymptoms[selectedPresetSymptomIndex];
    if (customSymptomText.trim()) {
      // Custom triage result with smart keyword matching
      const lower = customSymptomText.toLowerCase();
      let customSuspected = 'Memerlukan Konfirmasi Klinis Langsung dari Dokter';
      let severity = 'Sedang';
      let firstAid =
        'Jaga isolasi subjek dari kelompok, amati suhu/perubahan fisik berkala, dan siapkan riwayat pakan/perawatan untuk ditinjau dokter.';

      if (lower.includes('mulut') || lower.includes('liur') || lower.includes('kuku') || lower.includes('pincang')) {
        customSuspected = 'Indikasi Gejala Penyakit Mulut dan Kuku (PMK) / Luka Eksudatif';
        severity = 'Tinggi (Darurat)';
        firstAid = 'Segera isolasi kandang. Berikan semprotan antiseptik/asam sitrat pada rongga mulut dan luka kuku. Hubungi dokter siaga.';
      } else if (lower.includes('kembung') || lower.includes('begah') || lower.includes('perut')) {
        customSuspected = 'Indikasi Kembung Rumen Akut (Bloat)';
        severity = 'Darurat Kritis';
        firstAid = 'Bantu posisi berdiri dengan dada lebih tinggi. Berikan minyak nabati oral dan pijat perlahan perut kiri.';
      } else if (lower.includes('kuning') || lower.includes('bercak') || lower.includes('daun') || lower.includes('layu')) {
        customSuspected = 'Indikasi Infeksi Fungi / Bakteri Vaskular Tanaman';
        severity = 'Sedang - Tinggi';
        firstAid = 'Pangkas daun yang bergejala parah. Jangan biarkan air siraman memercik tanah ke tajuk atas. Gunakan fungisida/bakterisida hayati.';
      }

      setTriageReport({
        suspected: customSuspected,
        severity,
        firstAid,
      });
    } else {
      setTriageReport({
        suspected: currentPreset.suspected,
        severity: currentPreset.severity,
        firstAid: currentPreset.firstAid,
      });
    }
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingData.farmerName || !bookingData.phone) return;
    const code = Math.floor(1000 + Math.random() * 9000);
    setBookingConfirmedCode(`KONSUL-${code}`);
  };

  return (
    <section id="konsultasi" className="py-20 lg:py-24 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header (Anti-slop: clean editorial title, no pills) */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold tracking-wider text-emerald-800 uppercase mb-2">
            Pilar 03 · Pelayanan Kesehatan Ternak & Diagnosis Tanaman
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-stone-900 text-balance">
            Konsultasi (Dok Hewan / Tanaman)
          </h2>
          <p className="mt-3 text-base text-stone-600 leading-relaxed">
            Tangani wabah dan kegagalan panen sedini mungkin. Terniva menyediakan akses langsung ke dokter hewan
            dan agronom ahli fitopatologi berlisensi melalui telekonsultasi digital, skrining gejala cepat,
            maupun jadwal kunjungan langsung ke kandang dan kebun Anda.
          </p>
        </div>

        {/* Featured Consultation Visual Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16">
          <div className="lg:col-span-5 relative rounded-2xl overflow-hidden border border-stone-200 shadow-sm min-h-[340px]">
            <img
              src="/src/assets/images/terniva_dok_konsultasi_1794449097905.jpg"
              alt="Dokter Hewan dan Dokter Tanaman Terniva melakukan pemeriksaan lapangan"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
              <div className="text-xs font-medium text-emerald-300">Tenaga Medis & Agronom Ahli</div>
              <div className="text-lg font-semibold mt-1">Dokter Hewan & Dokter Tanaman Siaga</div>
              <p className="text-xs text-stone-300 mt-1 leading-relaxed">
                Semua praktisi terdaftar dengan Surat Izin Praktik (SIP/STR) aktif dari Perhimpunan Dokter Hewan Indonesia (PBID)
                dan Perhimpunan Fitopatologi Indonesia (PFI).
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col justify-between">
            <div className="bg-stone-50 p-6 rounded-2xl border border-stone-200 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-stone-900">
                  Pilih Layanan Dokter yang Anda Butuhkan
                </h3>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                Tentukan kategori konsultasi Anda untuk mendapatkan diagnosa yang spesifik sesuai bidang kepakaran:
              </p>

              {/* Doctor Type Switcher Tabs */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('hewan');
                    setTriageReport(null);
                  }}
                  className={`p-4 rounded-xl text-left border transition-all ${
                    activeTab === 'hewan'
                      ? 'border-emerald-700 bg-white ring-1 ring-emerald-700 shadow-sm'
                      : 'border-stone-200 bg-stone-100 hover:bg-white'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Stethoscope className="w-5 h-5 text-emerald-700" />
                    <span className="text-sm font-bold text-stone-900">Dokter Hewan (Veteriner)</span>
                  </div>
                  <p className="text-xs text-stone-600">
                    Sapi Potong & Perah, Domba/Kambing, Ayam Broiler & Layer, Pencegahan PMK & Mastitis.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('tanaman');
                    setTriageReport(null);
                  }}
                  className={`p-4 rounded-xl text-left border transition-all ${
                    activeTab === 'tanaman'
                      ? 'border-emerald-700 bg-white ring-1 ring-emerald-700 shadow-sm'
                      : 'border-stone-200 bg-stone-100 hover:bg-white'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Sprout className="w-5 h-5 text-emerald-700" />
                    <span className="text-sm font-bold text-stone-900">Dokter Tanaman (Agronom)</span>
                  </div>
                  <p className="text-xs text-stone-600">
                    Kopi, Vanili, Hortikultura (Cabai, Sayur), Penyakit Hawar Daun, Antraknosa & Uji Tanah.
                  </p>
                </button>
              </div>

              <div className="pt-2 text-xs text-stone-500 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Konsultasi online pertama gratis untuk seluruh mitra binaan Terniva di seluruh Indonesia.</span>
              </div>
            </div>

            {/* Quick Consultation Banner */}
            <div className="mt-4 p-5 bg-emerald-800 text-white rounded-2xl flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="text-sm font-bold">Butuh Penanganan Cepat Hari Ini?</div>
                <div className="text-xs text-emerald-100 mt-0.5">
                  Dokter jaga sedang online dan siap merespons pertanyaan Anda dalam hitungan menit.
                </div>
              </div>
              <button
                onClick={() => onOpenDoctorChat(filteredDoctors[0])}
                className="px-4 py-2.5 text-xs font-bold text-emerald-950 bg-emerald-200 hover:bg-white rounded-lg transition-colors whitespace-nowrap"
              >
                Chat Dokter {activeTab === 'hewan' ? 'Hewan' : 'Tanaman'} Sekarang
              </button>
            </div>
          </div>
        </div>

        {/* Doctor Directory Grid */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-stone-900">
                Direktori Dokter {activeTab === 'hewan' ? 'Hewan' : 'Tanaman'} Siaga Terniva
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">
                Praktisi klinis bersertifikat dengan pengalaman luas menangani peternakan dan perkebunan rakyat.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredDoctors.map((doc) => (
              <div
                key={doc.id}
                className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm flex flex-col justify-between hover:border-emerald-700/50 transition-all"
              >
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-xs font-semibold text-emerald-800 tracking-wide uppercase">
                        {doc.title}
                      </div>
                      <h4 className="text-base font-bold text-stone-900 mt-0.5">{doc.name}</h4>
                      <div className="flex items-center gap-2 text-xs text-stone-500 mt-1">
                        <span>{doc.institution}</span>
                        <span aria-hidden="true">·</span>
                        <span className="font-mono">{doc.sipNumber}</span>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="text-xs font-bold text-stone-900 font-mono">
                        ★ {doc.rating.toFixed(1)}
                      </div>
                      <div className="text-[11px] text-stone-400">({doc.reviewsCount} review)</div>
                    </div>
                  </div>

                  <div className="mt-4 p-3 bg-stone-50 rounded-xl">
                    <div className="text-xs font-semibold text-stone-700 mb-1.5">Keahlian & Fokus Penanganan:</div>
                    <div className="flex flex-wrap gap-1.5">
                      {doc.focusAreas.map((area, aIdx) => (
                        <span
                          key={aIdx}
                          className="text-xs text-stone-700 bg-white border border-stone-200 px-2 py-0.5 rounded"
                        >
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-between text-xs text-stone-500">
                    <span>Pengalaman Praktik: {doc.experienceYears} Tahun</span>
                    <span className="font-medium text-emerald-800">{doc.fee}</span>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-stone-100 flex items-center justify-between gap-3">
                  <div className="text-xs text-emerald-700 font-medium flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                    <span>Sedang Siap Konsultasi</span>
                  </div>

                  <button
                    onClick={() => onOpenDoctorChat(doc)}
                    className="px-4 py-2 text-xs font-bold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg transition-colors inline-flex items-center gap-1.5 shadow-sm"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Mulai Chat Konsultasi</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Feature: Digital Symptom Triage Tool & Visit Booking */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Skrining Gejala Digital (Tanya Dokter Cepat) */}
          <div className="lg:col-span-6 bg-stone-50 p-6 sm:p-8 rounded-2xl border border-stone-200">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              <h3 className="text-lg font-bold text-stone-900">
                Skrining Gejala & Pertolongan Pertama
              </h3>
            </div>
            <p className="text-xs text-stone-600 mb-5 leading-relaxed">
              Pilih gejala klinis yang Anda amati pada {activeTab === 'hewan' ? 'hewan ternak' : 'tanaman'} Anda
              untuk mendapatkan indikasi awal dan panduan pertolongan pertama sebelum dokter tiba di lokasi.
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                  Daftar Gejala Umum yang Sering Ditemui:
                </label>
                <div className="space-y-2">
                  {currentPresetSymptoms.map((item, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setSelectedPresetSymptomIndex(idx);
                        setCustomSymptomText('');
                        setTriageReport(null);
                      }}
                      className={`w-full text-left p-3 rounded-xl border text-xs transition-colors ${
                        selectedPresetSymptomIndex === idx && !customSymptomText
                          ? 'border-emerald-700 bg-white ring-1 ring-emerald-700 font-medium text-stone-900'
                          : 'border-stone-200 bg-stone-100/60 text-stone-700 hover:bg-white'
                      }`}
                    >
                      {item.symptom}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Atau Ketik Gejala Spesifik yang Anda Lihat:
                </label>
                <textarea
                  rows={2}
                  placeholder={`Contoh: ${
                    activeTab === 'hewan'
                      ? 'Sapi terlihat lesu, tidak mau makan sejak pagi, hidung kering'
                      : 'Daun cabai bagian bawah menguning berbintik hitam basah'
                  }`}
                  value={customSymptomText}
                  onChange={(e) => setCustomSymptomText(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-stone-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-700"
                />
              </div>

              {/* Photo Simulation Upload */}
              <div className="flex items-center justify-between p-3 bg-white border border-dashed border-stone-300 rounded-xl text-xs">
                <div className="flex items-center gap-2 text-stone-600">
                  <Upload className="w-4 h-4 text-emerald-800" />
                  <span>
                    {simulatedPhotoAttached
                      ? 'Foto gejala terlampir (1 file)'
                      : 'Lampirkan foto luka/daun sakit (opsional)'}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setSimulatedPhotoAttached(!simulatedPhotoAttached)}
                  className="text-xs font-semibold text-emerald-800 hover:underline"
                >
                  {simulatedPhotoAttached ? 'Hapus' : 'Pilih Foto'}
                </button>
              </div>

              <button
                type="button"
                onClick={handleRunTriage}
                className="w-full py-2.5 px-4 text-xs font-bold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Analisis & Tampilkan Pertolongan Pertama</span>
              </button>

              {/* Triage Output Card */}
              {triageReport && (
                <div className="p-5 bg-white rounded-xl border border-stone-200 space-y-3 mt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-stone-500 uppercase">Hasil Skrining Awal:</span>
                    <span
                      className={`text-xs font-bold px-2 py-0.5 rounded ${
                        triageReport.severity.includes('Darurat') || triageReport.severity.includes('Tinggi')
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      Tingkat Bahaya: {triageReport.severity}
                    </span>
                  </div>

                  <div className="text-sm font-bold text-stone-900">{triageReport.suspected}</div>

                  <div className="p-3 bg-stone-50 rounded-lg text-xs text-stone-700 leading-relaxed border border-stone-100">
                    <span className="font-semibold text-stone-900 block mb-1">
                      Instruksi Pertolongan Pertama Segera:
                    </span>
                    {triageReport.firstAid}
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <div className="text-xs text-stone-500">Butuh konfirmasi obat & resep?</div>
                    <button
                      type="button"
                      onClick={() =>
                        onOpenDoctorChat(
                          filteredDoctors[0],
                          `Halo Dok, saya melakukan skrining untuk: ${triageReport.suspected}. Mohon saran penanganan lanjutan.`
                        )
                      }
                      className="px-3 py-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-lg"
                    >
                      Konsultasikan Hasil Ini ke Dokter
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Form Reservasi Kunjungan Lapangan / Telemedisin */}
          <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-5 h-5 text-emerald-800" />
              <h3 className="text-lg font-bold text-stone-900">
                Reservasi Jadwal Kunjungan & Telemedisin
              </h3>
            </div>
            <p className="text-xs text-stone-600 mb-5 leading-relaxed">
              Jadwalkan dokter hewan atau agronom lapangan untuk visit langsung ke kandang atau kebun Anda.
            </p>

            {bookingConfirmedCode ? (
              <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-700 mx-auto" />
                <h4 className="text-base font-bold text-stone-900">Jadwal Konsultasi Terdaftar!</h4>
                <p className="text-xs text-stone-600 max-w-md mx-auto">
                  Dokter Terniva telah menerima permintaan visit/telekonsultasi Anda.
                </p>
                <div className="p-3 bg-white rounded-lg border border-emerald-300 font-mono font-bold text-emerald-800 text-sm tracking-wider">
                  Kode Booking: {bookingConfirmedCode}
                </div>
                <div className="text-xs text-stone-500 pt-1">
                  Konfirmasi waktu temu dan link room video/arahan tim lapangan akan dikirimkan ke WhatsApp{' '}
                  <span className="font-semibold text-stone-800">{bookingData.phone}</span>.
                </div>
                <button
                  type="button"
                  onClick={() => setBookingConfirmedCode(null)}
                  className="mt-3 px-4 py-2 text-xs font-semibold text-emerald-800 bg-white border border-emerald-300 rounded-lg hover:bg-stone-50"
                >
                  Jadwalkan Kasus Lain
                </button>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Nama Peternak / Petani:
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Pak Suwarno"
                      value={bookingData.farmerName}
                      onChange={(e) => setBookingData({ ...bookingData, farmerName: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-700"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      No. WhatsApp Aktif:
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="0812xxxxxxxx"
                      value={bookingData.phone}
                      onChange={(e) => setBookingData({ ...bookingData, phone: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-700"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Jenis Layanan Konsultasi:
                    </label>
                    <select
                      value={bookingData.serviceType}
                      onChange={(e) => setBookingData({ ...bookingData, serviceType: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-700"
                    >
                      <option value="Telekonsultasi Darurat (WhatsApp / Video)">
                        Telekonsultasi Darurat (Video Call)
                      </option>
                      <option value="Kunjungan Dokter Hewan ke Kandang">
                        Kunjungan Dokter Hewan ke Kandang
                      </option>
                      <option value="Kunjungan Dokter Tanaman ke Lahan">
                        Kunjungan Dokter Tanaman ke Lahan
                      </option>
                      <option value="Uji Lab Sampel Darah / Jaringan / Tanah">
                        Uji Lab Sampel Darah / Tanah
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Rencana Tanggal:
                    </label>
                    <input
                      type="date"
                      value={bookingData.preferredDate}
                      onChange={(e) => setBookingData({ ...bookingData, preferredDate: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-700"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Lokasi Kandang / Lahan (Kecamatan, Kabupaten):
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Kec. Pagaden, Kab. Subang"
                    value={bookingData.location}
                    onChange={(e) => setBookingData({ ...bookingData, location: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-700"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Ringkasan Kasus / Kondisi Ternak & Tanaman:
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Tuliskan jumlah ternak/tanaman yang sakit, sudah berapa hari, dan penanganan apa yang pernah diberikan..."
                    value={bookingData.problemSummary}
                    onChange={(e) => setBookingData({ ...bookingData, problemSummary: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-700"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-4 text-xs font-bold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg transition-colors shadow-sm inline-flex items-center justify-center gap-2"
                >
                  <span>Konfirmasi Reservasi Jadwal</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
