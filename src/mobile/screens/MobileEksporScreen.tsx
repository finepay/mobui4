import { useState } from 'react';
import { ArrowLeft, Globe2, ShieldCheck, CheckCircle2, Send } from 'lucide-react';
import { COMMODITIES_DATA } from '../../data/ternivaData';

interface MobileEksporScreenProps {
  onBack: () => void;
}

export default function MobileEksporScreen({ onBack }: MobileEksporScreenProps) {
  const [rfqSuccess, setRfqSuccess] = useState<string | null>(null);
  const [buyerCompany, setBuyerCompany] = useState('');
  const [buyerEmail, setBuyerEmail] = useState('');
  const [selectedCommodity, setSelectedCommodity] = useState(COMMODITIES_DATA[0].name);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!buyerCompany || !buyerEmail) return;
    const code = Math.floor(10000 + Math.random() * 90000);
    setRfqSuccess(`RFQ-${code}`);
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
            <h3 className="text-sm font-bold text-stone-900 leading-tight">Peluang Ekspor Global</h3>
            <span className="text-[10px] text-teal-700 font-medium">Komoditas Nusantara ke Pasar Dunia</span>
          </div>
        </div>
      </div>

      <div className="p-3 space-y-3">
        {/* Banner */}
        <div className="bg-gradient-to-r from-teal-900 to-emerald-900 text-white rounded-2xl p-4 shadow-sm">
          <span className="text-[10px] font-semibold text-teal-300 uppercase tracking-wide">
            Jaringan Ekspor 18 Negara
          </span>
          <h4 className="text-base font-bold text-white mt-1">
            Standarisasi Mutu & Sertifikasi Lengkap
          </h4>
          <p className="text-xs text-stone-200 mt-1 leading-relaxed">
            Phytosanitary Certificate, Halal BPJPH, HACCP, dan US FDA Registered dengan pengapalan FOB/CIF.
          </p>
        </div>

        {/* Commodity Showcase List */}
        <div className="space-y-2">
          <div className="text-xs font-bold text-stone-900 uppercase tracking-wide">
            Katalog Komoditas Siap Ekspor
          </div>

          {COMMODITIES_DATA.map((com) => (
            <div key={com.id} className="bg-white rounded-xl p-3 border border-stone-200 shadow-xs space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-teal-800 uppercase tracking-wider">{com.category}</span>
                <span className="text-[10px] font-mono text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded">
                  {com.status}
                </span>
              </div>
              <h5 className="text-xs font-bold text-stone-900">{com.name}</h5>
              <div className="text-[10px] text-stone-500 italic">{com.origin}</div>
              <p className="text-[11px] text-stone-600 line-clamp-2">{com.description}</p>
              <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-[10px] text-stone-600 font-mono">
                <span>Grade: {com.specifications.grade}</span>
                <span className="font-semibold text-teal-800">MOQ: {com.specifications.minOrder}</span>
              </div>
            </div>
          ))}
        </div>

        {/* RFQ Box */}
        <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-xs space-y-3">
          <div className="flex items-center gap-2">
            <Globe2 className="w-4 h-4 text-teal-800" />
            <h5 className="text-xs font-bold text-stone-900">Request for Quotation (RFQ)</h5>
          </div>

          {rfqSuccess ? (
            <div className="p-3 bg-teal-50 border border-teal-300 rounded-xl text-center space-y-1.5">
              <CheckCircle2 className="w-7 h-7 text-teal-700 mx-auto" />
              <div className="text-xs font-bold text-stone-900">RFQ Berhasil Dikirim!</div>
              <div className="p-1.5 bg-white rounded font-mono font-bold text-teal-800 text-xs">
                {rfqSuccess}
              </div>
              <p className="text-[10px] text-stone-600">
                Dokumen penawaran resmi akan dikirimkan ke email {buyerEmail}.
              </p>
              <button onClick={() => setRfqSuccess(null)} className="text-xs font-semibold text-teal-800 underline">
                Kirim Baru
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-2">
              <div>
                <label className="text-[10px] font-semibold text-stone-700 block mb-0.5">Nama Perusahaan / Buyer:</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Global Coffee Trading Ltd"
                  value={buyerCompany}
                  onChange={(e) => setBuyerCompany(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs bg-stone-50 border border-stone-200 rounded-lg"
                />
              </div>

              <div>
                <label className="text-[10px] font-semibold text-stone-700 block mb-0.5">Email Resmi:</label>
                <input
                  type="email"
                  required
                  placeholder="buyer@domain.com"
                  value={buyerEmail}
                  onChange={(e) => setBuyerEmail(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs bg-stone-50 border border-stone-200 rounded-lg"
                />
              </div>

              <div>
                <label className="text-[10px] font-semibold text-stone-700 block mb-0.5">Pilihan Komoditas:</label>
                <select
                  value={selectedCommodity}
                  onChange={(e) => setSelectedCommodity(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs bg-stone-50 border border-stone-200 rounded-lg"
                >
                  {COMMODITIES_DATA.map((c) => (
                    <option key={c.id} value={c.name}>{c.name}</option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-teal-800 text-white font-bold rounded-lg text-xs flex items-center justify-center gap-1.5 shadow-xs"
              >
                <span>Kirim Permintaan Kuotasi</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
