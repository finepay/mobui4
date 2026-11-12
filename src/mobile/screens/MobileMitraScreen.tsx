import { useState } from 'react';
import { ArrowLeft, CheckCircle2, Calculator, Users, ArrowRight } from 'lucide-react';

interface MobileMitraScreenProps {
  onBack: () => void;
}

export default function MobileMitraScreen({ onBack }: MobileMitraScreenProps) {
  const [calcScale, setCalcScale] = useState(10);
  const [formCategory, setFormCategory] = useState<'peternak' | 'petani'>('peternak');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [submittedCode, setSubmittedCode] = useState<string | null>(null);

  const estRevenue = calcScale * (formCategory === 'peternak' ? 23500000 : 75000000);
  const estProfit = calcScale * (formCategory === 'peternak' ? 5500000 : 38000000);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone) return;
    const code = Math.floor(1000 + Math.random() * 9000);
    setSubmittedCode(`MITRA-${code}`);
  };

  return (
    <div className="bg-stone-100 min-h-full pb-8">
      {/* Header */}
      <div className="bg-white border-b border-stone-200 px-3 py-2.5 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-2">
          <button onClick={onBack} className="p-1 rounded-lg hover:bg-stone-100 text-stone-700">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h3 className="text-sm font-bold text-stone-900 leading-tight">Gabung Mitra Terniva</h3>
            <span className="text-[10px] text-emerald-700 font-medium">Peternakan & Pertanian Berkelanjutan</span>
          </div>
        </div>
      </div>

      <div className="p-3 space-y-3">
        {/* Banner */}
        <div className="bg-emerald-900 text-white rounded-2xl p-4 shadow-sm">
          <span className="text-[10px] font-semibold text-emerald-300 uppercase tracking-wide">
            Kemitraan Terpercaya 2026
          </span>
          <h4 className="text-base font-bold text-white mt-1">
            Dampingan Dokter & Jaminan Serap Panen
          </h4>
          <p className="text-xs text-stone-200 mt-1 leading-relaxed">
            Dapatkan bibit unggul, pakan konsentrat subsidi, dan kontrak pembelian resmi dengan harga adil.
          </p>
        </div>

        {/* Kalkulator Sederhana */}
        <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-xs space-y-3">
          <div className="flex items-center gap-2">
            <Calculator className="w-4 h-4 text-emerald-800" />
            <h5 className="text-xs font-bold text-stone-900">Simulasi Hasil Kemitraan</h5>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setFormCategory('peternak')}
              className={`py-1.5 text-xs font-semibold rounded-lg border transition-colors ${
                formCategory === 'peternak'
                  ? 'bg-emerald-800 text-white border-emerald-800'
                  : 'bg-stone-50 text-stone-700 border-stone-200'
              }`}
            >
              Sapi Potong (Ekor)
            </button>
            <button
              onClick={() => setFormCategory('petani')}
              className={`py-1.5 text-xs font-semibold rounded-lg border transition-colors ${
                formCategory === 'petani'
                  ? 'bg-emerald-800 text-white border-emerald-800'
                  : 'bg-stone-50 text-stone-700 border-stone-200'
              }`}
            >
              Kopi Arabika (Ha)
            </button>
          </div>

          <div>
            <div className="flex justify-between text-[11px] text-stone-600 mb-1">
              <span>Skala: {calcScale} {formCategory === 'peternak' ? 'Ekor Sapi' : 'Hektar Lahan'}</span>
            </div>
            <input
              type="range"
              min={2}
              max={30}
              value={calcScale}
              onChange={(e) => setCalcScale(Number(e.target.value))}
              className="w-full accent-emerald-800"
            />
          </div>

          <div className="p-3 bg-stone-50 rounded-xl grid grid-cols-2 gap-2 text-xs">
            <div>
              <span className="text-[10px] text-stone-500 block">Estimasi Omzet:</span>
              <span className="font-bold text-stone-900 font-mono">
                Rp {estRevenue.toLocaleString('id-ID')}
              </span>
            </div>
            <div>
              <span className="text-[10px] text-stone-500 block">Proyeksi Bersih:</span>
              <span className="font-bold text-emerald-800 font-mono">
                Rp {estProfit.toLocaleString('id-ID')}
              </span>
            </div>
          </div>
        </div>

        {/* Form Pendaftaran */}
        <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-xs space-y-3">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-emerald-800" />
            <h5 className="text-xs font-bold text-stone-900">Formulir Pendaftaran Mitra</h5>
          </div>

          {submittedCode ? (
            <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-xl text-center space-y-2">
              <CheckCircle2 className="w-7 h-7 text-emerald-700 mx-auto" />
              <div className="text-xs font-bold text-stone-900">Pendaftaran Berhasil!</div>
              <div className="p-2 bg-white rounded font-mono font-bold text-emerald-800 text-xs">
                {submittedCode}
              </div>
              <p className="text-[10px] text-stone-600">
                Koordinator Terniva wilayah Anda akan menghubungi nomor WhatsApp {phone}.
              </p>
              <button
                onClick={() => setSubmittedCode(null)}
                className="text-xs font-semibold text-emerald-800 underline"
              >
                Daftar Ulang
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-2.5">
              <div>
                <label className="text-[10px] font-semibold text-stone-700 block mb-1">Nama Lengkap:</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Pak Budi"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-700"
                />
              </div>

              <div>
                <label className="text-[10px] font-semibold text-stone-700 block mb-1">No. WhatsApp:</label>
                <input
                  type="tel"
                  required
                  placeholder="0812xxxxxxxx"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-700"
                />
              </div>

              <div>
                <label className="text-[10px] font-semibold text-stone-700 block mb-1">Kabupaten/Kota Domisili:</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Subang / Malang"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-700"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-emerald-800 text-white font-bold rounded-lg text-xs flex items-center justify-center gap-1.5 shadow-xs"
              >
                <span>Daftar Menjadi Mitra</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
