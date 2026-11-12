import { useState } from 'react';
import { MITRA_PACKAGES } from '../data/ternivaData';
import { CheckCircle2, Calculator, Users, ArrowRight, Sparkles, Building2, PhoneCall } from 'lucide-react';

export default function GabungMitraSection() {
  const [selectedTrack, setSelectedTrack] = useState<string>('mitra-peternak');

  // Calculator states
  const [calcSector, setCalcSector] = useState<'sapi' | 'domba' | 'kopi' | 'vanili'>('sapi');
  const [calcScale, setCalcScale] = useState<number>(10);

  // Form states
  const [formCategory, setFormCategory] = useState<'peternak' | 'petani' | 'supplier'>('peternak');
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    province: 'Jawa Barat',
    city: 'Subang',
    commodityDetail: 'Sapi Penggemukan (Simmental / Limousin)',
    landAreaOrCapacity: '15 Ekor',
    experienceYears: '3 Tahun',
    notes: '',
  });
  const [submittedCode, setSubmittedCode] = useState<string | null>(null);

  // Dynamic calculations
  const calculateEstimate = () => {
    switch (calcSector) {
      case 'sapi': {
        const costPerHead = 18000000;
        const revenuePerHead = 23500000;
        const netProfitPerHead = revenuePerHead - costPerHead;
        return {
          unitLabel: 'Ekor Sapi Potong',
          cycle: '90 - 110 Hari (Penggemukan)',
          estimatedRevenue: calcScale * revenuePerHead,
          estimatedProfit: calcScale * netProfitPerHead,
          adgTarget: '1.2 - 1.5 kg / hari',
          benefitsSummary: 'Vaksinasi PMK lengkap, pakan konsentrat subsidi, jaminan timbang hidup.',
        };
      }
      case 'domba': {
        const costPerHead = 1600000;
        const revenuePerHead = 2400000;
        const netProfitPerHead = revenuePerHead - costPerHead;
        return {
          unitLabel: 'Ekor Domba / Kambing',
          cycle: '75 - 90 Hari',
          estimatedRevenue: calcScale * revenuePerHead,
          estimatedProfit: calcScale * netProfitPerHead,
          adgTarget: '200 - 300 gram / hari',
          benefitsSummary: 'Pakan fermentasi silase, monitoring dokter hewan Terniva, serap Idul Adha & aqiqah.',
        };
      }
      case 'kopi': {
        const revenuePerHa = 75000000;
        const profitPerHa = 38000000;
        return {
          unitLabel: 'Hektar Lahan Kopi Arabika',
          cycle: 'Siklus Panen Raya Tahunan',
          estimatedRevenue: calcScale * revenuePerHa,
          estimatedProfit: calcScale * profitPerHa,
          adgTarget: 'Kualitas SCA 84+ Green Beans',
          benefitsSummary: 'Drying dome solar dryer, bimbingan GAP organik, akses kuota ekspor Terniva.',
        };
      }
      case 'vanili': {
        const revenuePerHundredPoles = 24000000;
        const profitPerHundredPoles = 14500000;
        return {
          unitLabel: 'Ratus Pohon Vanili Planifolia',
          cycle: '9 Bulan Penyerbukan hingga Panen',
          estimatedRevenue: calcScale * revenuePerHundredPoles,
          estimatedProfit: calcScale * profitPerHundredPoles,
          adgTarget: 'Kadar Vanillin Alami > 2.0%',
          benefitsSummary: 'Bibit bersertifikat, pendampingan penyerbukan manual, uji lab residu ekspor.',
        };
      }
    }
  };

  const currentCalc = calculateEstimate();

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone) return;
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    setSubmittedCode(`TRN-MITRA-${randomSuffix}`);
  };

  return (
    <section id="gabung-mitra" className="py-20 lg:py-24 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header (Anti-slop: clean editorial title, no pills) */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold tracking-wider text-emerald-800 uppercase mb-2">
            Pilar 01 · Kemitraan Agribisnis Berkelanjutan
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-stone-900 text-balance">
            Gabung Mitra Peternak & Petani Terniva
          </h2>
          <p className="mt-3 text-base text-stone-600 leading-relaxed">
            Bangun usaha peternakan dan perkebunan berdaya saing tinggi dengan ekosistem lengkap:
            pendampingan dokter hewan dan agronom, sarana produksi berkualitas, serta kepastian harga serap panen yang transparan.
          </p>
        </div>

        {/* Featured Showcase Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16">
          <div className="lg:col-span-5 relative rounded-2xl overflow-hidden border border-stone-200 shadow-sm min-h-[340px]">
            <img
              src="/src/assets/images/terniva_mitra_farmer_1794449097085.jpg"
              alt="Mitra Peternak dan Petani Terniva Indonesia"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
              <div className="text-xs font-medium text-emerald-300">Kisah Sukses Mitra</div>
              <div className="text-lg font-semibold mt-1">Pak Nyoman & Ibu Ketut · Bali Farm Cluster</div>
              <p className="text-xs text-stone-300 mt-1 leading-relaxed">
                "Bergabung sejak 2024, mortalitas sapi turun drastis di bawah 0.5% berkat kunjungan rutin dokter hewan Terniva dan harga jual sudah dikontrak pasti sejak awal."
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {MITRA_PACKAGES.map((pkg) => (
                <button
                  key={pkg.id}
                  onClick={() => setSelectedTrack(pkg.id)}
                  className={`p-4 rounded-xl text-left border transition-all ${
                    selectedTrack === pkg.id
                      ? 'border-emerald-700 bg-emerald-50/60 shadow-sm ring-1 ring-emerald-700'
                      : 'border-stone-200 bg-white hover:border-stone-300'
                  }`}
                >
                  <div className="text-xs font-semibold text-emerald-800 uppercase tracking-wide">
                    {pkg.sector}
                  </div>
                  <div className="text-sm font-bold text-stone-900 mt-1">{pkg.title}</div>
                  <div className="text-xs text-stone-500 mt-2">{pkg.cycleTime}</div>
                </button>
              ))}
            </div>

            {/* Selected Track Details */}
            {(() => {
              const active = MITRA_PACKAGES.find((p) => p.id === selectedTrack) || MITRA_PACKAGES[0];
              return (
                <div className="p-6 bg-stone-50 rounded-2xl border border-stone-200">
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-stone-900">{active.title}</h3>
                      <div className="text-xs text-stone-500 mt-0.5">{active.supportLevel}</div>
                    </div>
                    <span className="text-xs font-medium text-emerald-800 bg-emerald-100/70 px-2.5 py-1 rounded">
                      Kontrak Terbuka 2026
                    </span>
                  </div>

                  <div className="mb-4">
                    <div className="text-xs font-semibold text-stone-700 mb-2">Fasilitas & Jaminan Kemitraan:</div>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-stone-700">
                      {active.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-3 border-t border-stone-200 flex flex-wrap items-center justify-between gap-3 text-xs text-stone-600">
                    <div>
                      <span className="font-semibold text-stone-800">Komoditas yang Didukung: </span>
                      {active.commodities.join(', ')}
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>

        {/* Interactive Calculator & Registration Side-by-Side */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Kalkulator Kemitraan */}
          <div className="lg:col-span-6 bg-stone-50 p-6 sm:p-8 rounded-2xl border border-stone-200">
            <div className="flex items-center gap-2 mb-2">
              <Calculator className="w-5 h-5 text-emerald-800" />
              <h3 className="text-lg font-bold text-stone-900">
                Simulasi Hasil Usaha Kemitraan
              </h3>
            </div>
            <p className="text-xs text-stone-600 mb-6">
              Hitung estimasi perputaran omzet dan proyeksi margin bersih mitra berdasarkan skala komoditas Anda.
            </p>

            <div className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-2">
                  Pilih Sektor / Komoditas:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setCalcSector('sapi');
                      setCalcScale(10);
                    }}
                    className={`px-3 py-2 text-xs font-medium rounded-lg border transition-colors ${
                      calcSector === 'sapi'
                        ? 'bg-emerald-800 text-white border-emerald-800'
                        : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-100'
                    }`}
                  >
                    Sapi Potong
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setCalcSector('domba');
                      setCalcScale(30);
                    }}
                    className={`px-3 py-2 text-xs font-medium rounded-lg border transition-colors ${
                      calcSector === 'domba'
                        ? 'bg-emerald-800 text-white border-emerald-800'
                        : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-100'
                    }`}
                  >
                    Domba / Kambing
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setCalcSector('kopi');
                      setCalcScale(2);
                    }}
                    className={`px-3 py-2 text-xs font-medium rounded-lg border transition-colors ${
                      calcSector === 'kopi'
                        ? 'bg-emerald-800 text-white border-emerald-800'
                        : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-100'
                    }`}
                  >
                    Kopi Arabika
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setCalcSector('vanili');
                      setCalcScale(3);
                    }}
                    className={`px-3 py-2 text-xs font-medium rounded-lg border transition-colors ${
                      calcSector === 'vanili'
                        ? 'bg-emerald-800 text-white border-emerald-800'
                        : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-100'
                    }`}
                  >
                    Vanili Organik
                  </button>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center text-xs font-semibold text-stone-700 mb-2">
                  <span>Kapasitas / Skala Usaha:</span>
                  <span className="font-mono text-emerald-800 text-sm">
                    {calcScale} {currentCalc.unitLabel}
                  </span>
                </div>
                <input
                  type="range"
                  min={calcSector === 'sapi' ? 5 : calcSector === 'domba' ? 10 : 1}
                  max={calcSector === 'sapi' ? 50 : calcSector === 'domba' ? 200 : 10}
                  step={1}
                  value={calcScale}
                  onChange={(e) => setCalcScale(Number(e.target.value))}
                  className="w-full accent-emerald-800 cursor-pointer"
                />
              </div>

              {/* Calculation Output Box */}
              <div className="p-5 bg-white rounded-xl border border-stone-200 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs text-stone-500">Estimasi Omzet Panen:</div>
                    <div className="text-lg sm:text-xl font-bold text-stone-900 font-mono tabular-nums">
                      Rp {currentCalc.estimatedRevenue.toLocaleString('id-ID')}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-stone-500">Proyeksi Margin Bersih:</div>
                    <div className="text-lg sm:text-xl font-bold text-emerald-700 font-mono tabular-nums">
                      Rp {currentCalc.estimatedProfit.toLocaleString('id-ID')}
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-stone-100 text-xs text-stone-600 space-y-1">
                  <div>
                    <span className="font-semibold text-stone-800">Durasi Siklus: </span>
                    {currentCalc.cycle}
                  </div>
                  <div>
                    <span className="font-semibold text-stone-800">Target Kualitas: </span>
                    {currentCalc.adgTarget}
                  </div>
                  <div className="text-stone-500 italic mt-1">{currentCalc.benefitsSummary}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Registration Form */}
          <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-5 h-5 text-emerald-800" />
              <h3 className="text-lg font-bold text-stone-900">
                Formulir Pendaftaran Mitra
              </h3>
            </div>
            <p className="text-xs text-stone-600 mb-5">
              Isi formulir singkat di bawah untuk diverifikasi oleh koordinator wilayah Terniva.
            </p>

            {submittedCode ? (
              <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-700 mx-auto" />
                <h4 className="text-base font-bold text-stone-900">Pendaftaran Mitra Berhasil!</h4>
                <p className="text-xs text-stone-600 max-w-md mx-auto">
                  Terima kasih, data calon mitra Anda telah tercatat dalam sistem kami.
                </p>
                <div className="p-3 bg-white rounded-lg border border-emerald-300 font-mono font-bold text-emerald-800 text-sm tracking-wider">
                  No. Registrasi: {submittedCode}
                </div>
                <div className="text-xs text-stone-500 pt-1">
                  Tim Field Coordinator Terniva wilayah {formData.province} akan menghubungi Anda via WhatsApp di{' '}
                  <span className="font-semibold text-stone-800">{formData.phone}</span> dalam 1x24 jam kerja.
                </div>
                <button
                  type="button"
                  onClick={() => setSubmittedCode(null)}
                  className="mt-3 px-4 py-2 text-xs font-semibold text-emerald-800 bg-white border border-emerald-300 rounded-lg hover:bg-stone-50"
                >
                  Daftarkan Komoditas Lain
                </button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                    Kategori Kemitraan:
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'peternak', label: 'Peternakan' },
                      { id: 'petani', label: 'Pertanian' },
                      { id: 'supplier', label: 'Supplier/Pakan' },
                    ].map((cat) => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setFormCategory(cat.id as any)}
                        className={`py-2 text-xs font-medium rounded-lg border transition-colors ${
                          formCategory === cat.id
                            ? 'bg-emerald-800 text-white border-emerald-800'
                            : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                        }`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Nama Lengkap:
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Hendro Prasetyo"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-700"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      No. WhatsApp / HP Aktif:
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="Contoh: 08123456789"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-700"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Provinsi Domisili Lahan:
                    </label>
                    <select
                      value={formData.province}
                      onChange={(e) => setFormData({ ...formData, province: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-700"
                    >
                      <option value="Jawa Barat">Jawa Barat</option>
                      <option value="Jawa Tengah">Jawa Tengah</option>
                      <option value="Jawa Timur">Jawa Timur</option>
                      <option value="Sumatera Utara">Sumatera Utara</option>
                      <option value="Aceh">Aceh</option>
                      <option value="Sulawesi Selatan">Sulawesi Selatan</option>
                      <option value="Bali">Bali</option>
                      <option value="Nusa Tenggara Timur">Nusa Tenggara Timur</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Kabupaten / Kota:
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Subang / Malang"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-700"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Komoditas Utama:
                    </label>
                    <input
                      type="text"
                      placeholder="Contoh: Sapi potong, Kopi Arabika, dll"
                      value={formData.commodityDetail}
                      onChange={(e) => setFormData({ ...formData, commodityDetail: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-700"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Kapasitas Kandang / Luas Lahan:
                    </label>
                    <input
                      type="text"
                      placeholder="Contoh: 15 Ekor / 1.5 Hektar"
                      value={formData.landAreaOrCapacity}
                      onChange={(e) => setFormData({ ...formData, landAreaOrCapacity: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-700"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-4 text-xs font-bold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg transition-colors shadow-sm inline-flex items-center justify-center gap-2"
                >
                  <span>Kirim Formulir Pendaftaran Mitra</span>
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
