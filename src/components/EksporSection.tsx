import { useState } from 'react';
import { COMMODITIES_DATA } from '../data/ternivaData';
import { Commodity } from '../types';
import { Globe, FileCheck, Anchor, Send, CheckCircle2, ChevronRight, X, Shield } from 'lucide-react';

export default function EksporSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeCommodityModal, setActiveCommodityModal] = useState<Commodity | null>(null);

  // RFQ form state
  const [rfqData, setRfqData] = useState({
    companyName: '',
    buyerName: '',
    email: '',
    country: 'Uni Emirat Arab',
    commodityId: 'kopi-gayo',
    volume: '1 FCL (20ft Container)',
    incoterm: 'FOB Tanjung Priok, Jakarta',
    destinationPort: 'Jebel Ali Port, Dubai',
    targetDate: '30 - 45 Hari Kerja',
  });
  const [rfqSubmitted, setRfqSubmitted] = useState<string | null>(null);

  const filteredCommodities =
    selectedCategory === 'all'
      ? COMMODITIES_DATA
      : COMMODITIES_DATA.filter((c) => c.category === selectedCategory);

  const handleRfqSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rfqData.companyName || !rfqData.email) return;
    const rfqNumber = Math.floor(10000 + Math.random() * 90000);
    setRfqSubmitted(`RFQ-GLOBAL-${rfqNumber}`);
  };

  return (
    <section id="ekspor" className="py-20 lg:py-24 bg-stone-100 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header (Anti-slop: clean editorial title, no pills) */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold tracking-wider text-emerald-800 uppercase mb-2">
            Pilar 02 · Rantai Pasok Pasar Global
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-stone-900 text-balance">
            Layanan Ekspor Komoditas Nusantara
          </h2>
          <p className="mt-3 text-base text-stone-600 leading-relaxed">
            Menghubungkan komoditas pertanian dan peternakan berkualitas tinggi langsung dari petani dan peternak Indonesia
            ke pembeli internasional (B2B Importer, Roasteries, Food Industry) dengan dokumen ekspor lengkap dan kepatuhan standar phytosanitary dunia.
          </p>
        </div>

        {/* Featured Export Visual & Trust Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16">
          <div className="lg:col-span-5 relative rounded-2xl overflow-hidden border border-stone-200 shadow-sm min-h-[340px]">
            <img
              src="/src/assets/images/terniva_ekspor_commodities_1794449097514.jpg"
              alt="Komoditas Ekspor Terniva: Kopi, Vanili, Kayu Manis dan Jahe Indonesia"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
              <div className="text-xs font-medium text-amber-300">Standar Mutu Internasional</div>
              <div className="text-lg font-semibold mt-1">Sertifikasi & Karantina Lengkap</div>
              <div className="flex items-center gap-2 text-xs text-stone-300 mt-2">
                <span>HACCP</span>
                <span aria-hidden="true">·</span>
                <span>Phytosanitary Kementan</span>
                <span aria-hidden="true">·</span>
                <span>Halal BPJPH</span>
                <span aria-hidden="true">·</span>
                <span>FDA Registered</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col justify-between">
            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-4">
              <h3 className="text-lg font-bold text-stone-900">
                Alur & Kemudahan Ekspor Bersama Terniva
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Terniva menangani standarisasi mutu di warehouse konsolidasi, pengujian laboratorium independen (SGS / Sucofindo),
                hingga kepengurusan dokumen kepabeanan dan sertifikat karantina ekspor:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-100">
                  <div className="text-xs font-bold text-stone-900">01. QC & Lab Test</div>
                  <div className="text-xs text-stone-500 mt-1">
                    Uji kadar air, kemurnian, dan residu kimia bebas kontaminan di laboratorium bersertifikasi.
                  </div>
                </div>
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-100">
                  <div className="text-xs font-bold text-stone-900">02. Dokumen Lengkap</div>
                  <div className="text-xs text-stone-500 mt-1">
                    COO (Form AK / Form D), Phytosanitary, Health Certificate, MSDS, dan Bill of Lading (BL).
                  </div>
                </div>
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-100">
                  <div className="text-xs font-bold text-stone-900">03. Kontrak Fleksibel</div>
                  <div className="text-xs text-stone-500 mt-1">
                    Dukungan Incoterms FOB, CIF, atau CFR dengan pembayaran LC (Letter of Credit) atau TT aman.
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                <span>Pelabuhan Muat Utama: Tanjung Priok (Jakarta), Tanjung Perak (Surabaya), Belawan (Medan)</span>
              </div>
            </div>

            {/* Filter segmented buttons */}
            <div className="mt-4 flex items-center gap-1.5 p-1.5 bg-stone-200/70 rounded-xl max-w-fit overflow-x-auto">
              {[
                { id: 'all', label: 'Semua Komoditas' },
                { id: 'kopi', label: 'Kopi Spesialti' },
                { id: 'rempah', label: 'Rempah Organik' },
                { id: 'biomassa', label: 'Biomassa Kelapa' },
                { id: 'peternakan', label: 'Sarang Walet & Ternak' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedCategory(tab.id)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                    selectedCategory === tab.id
                      ? 'bg-white text-stone-900 shadow-sm font-semibold'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Commodity Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filteredCommodities.map((item) => (
            <div
              key={item.id}
              className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm flex flex-col justify-between hover:border-emerald-700/50 transition-all group"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
                  <span className="font-semibold text-emerald-800 uppercase tracking-wider">{item.category}</span>
                  <span className="font-mono text-stone-600">{item.status}</span>
                </div>

                <h3 className="text-base font-bold text-stone-900 group-hover:text-emerald-800 transition-colors">
                  {item.name}
                </h3>
                <p className="text-xs text-stone-500 italic mt-0.5">{item.englishName}</p>

                <p className="text-xs text-stone-600 mt-3 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>

                {/* Specs snapshot */}
                <div className="mt-4 p-3 bg-stone-50 rounded-xl space-y-1.5 text-xs text-stone-700 font-mono">
                  <div className="flex justify-between">
                    <span className="text-stone-500 font-sans">Grade Mutu:</span>
                    <span className="font-semibold text-right">{item.specifications.grade}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500 font-sans">Kadar Air:</span>
                    <span>{item.specifications.moisture}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500 font-sans">Minimal Order:</span>
                    <span className="text-emerald-800 font-semibold">{item.specifications.minOrder}</span>
                  </div>
                </div>

                {/* Unboxed certifications */}
                <div className="mt-3 flex flex-wrap items-center gap-1.5 text-[11px] text-stone-500">
                  {item.certifications.map((cert, cIdx) => (
                    <span key={cIdx} className="inline-flex items-center">
                      <span>{cert}</span>
                      {cIdx < item.certifications.length - 1 && (
                        <span className="mx-1 text-stone-300" aria-hidden="true">·</span>
                      )}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-stone-100 flex items-center justify-between">
                <button
                  onClick={() => setActiveCommodityModal(item)}
                  className="text-xs font-semibold text-stone-700 hover:text-stone-900 inline-flex items-center gap-1"
                >
                  <span>Spesifikasi Lengkap</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => {
                    setRfqData((prev) => ({ ...prev, commodityId: item.id }));
                    const rfqElement = document.getElementById('rfq-form-container');
                    rfqElement?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-3 py-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors"
                >
                  Minta Penawaran (RFQ)
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive RFQ (Request for Quotation) Tool */}
        <div id="rfq-form-container" className="bg-white p-6 sm:p-8 lg:p-10 rounded-2xl border border-stone-200 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center gap-2">
                <Anchor className="w-5 h-5 text-emerald-800" />
                <h3 className="text-lg font-bold text-stone-900">
                  Request for Quotation (RFQ) Ekspor
                </h3>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                Khusus untuk pembeli internasional, trading house, dan importir komoditas.
                Dapatkan penawaran harga FOB/CIF resmi, spesifikasi teknis (COA), dan jadwal pengapalan terbaru dari Terniva Export Desk.
              </p>

              <div className="p-4 bg-stone-50 rounded-xl space-y-2 text-xs text-stone-700">
                <div className="font-semibold text-stone-900">Jaminan Layanan Ekspor Terniva:</div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  <span>Sampel produk dapat dikirim via DHL/FedEx Express</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  <span>Inspeksi pra-pengapalan oleh surveyor internasional</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  <span>Respon penawaran formal dalam 1x24 jam kerja</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              {rfqSubmitted ? (
                <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-3">
                  <CheckCircle2 className="w-10 h-10 text-emerald-700 mx-auto" />
                  <h4 className="text-base font-bold text-stone-900">Permintaan Penawaran Diterima!</h4>
                  <p className="text-xs text-stone-600 max-w-md mx-auto">
                    Export Desk Terniva telah menerima spesifikasi pesanan Anda.
                  </p>
                  <div className="p-3 bg-white rounded-lg border border-emerald-300 font-mono font-bold text-emerald-800 text-sm tracking-wider">
                    No. Dokumen: {rfqSubmitted}
                  </div>
                  <div className="text-xs text-stone-500 pt-1">
                    Formal Quotation Sheet & Proforma Invoice akan dikirimkan ke{' '}
                    <span className="font-semibold text-stone-800">{rfqData.email}</span>.
                  </div>
                  <button
                    type="button"
                    onClick={() => setRfqSubmitted(null)}
                    className="mt-3 px-4 py-2 text-xs font-semibold text-emerald-800 bg-white border border-emerald-300 rounded-lg hover:bg-stone-50"
                  >
                    Buat RFQ Baru
                  </button>
                </div>
              ) : (
                <form onSubmit={handleRfqSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Nama Perusahaan / Buyer:
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Contoh: Global Coffee Roasters Ltd"
                        value={rfqData.companyName}
                        onChange={(e) => setRfqData({ ...rfqData, companyName: e.target.value })}
                        className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-700"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Email Resmi:
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="buyer@company.com"
                        value={rfqData.email}
                        onChange={(e) => setRfqData({ ...rfqData, email: e.target.value })}
                        className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-700"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Komoditas yang Diminta:
                      </label>
                      <select
                        value={rfqData.commodityId}
                        onChange={(e) => setRfqData({ ...rfqData, commodityId: e.target.value })}
                        className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-700"
                      >
                        {COMMODITIES_DATA.map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.name} ({c.origin})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Target Volume Pengiriman:
                      </label>
                      <select
                        value={rfqData.volume}
                        onChange={(e) => setRfqData({ ...rfqData, volume: e.target.value })}
                        className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-700"
                      >
                        <option value="1 FCL (20ft Container)">1 FCL (20ft Container - Sea Freight)</option>
                        <option value="1 FCL (40ft Container)">1 FCL (40ft Container - Sea Freight)</option>
                        <option value="LCL (Less Container Load)">LCL (1 - 5 Metric Tons)</option>
                        <option value="Air Freight Trial (100 - 500 kg)">Air Freight Trial (100 - 500 kg)</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Ketentuan Incoterm:
                      </label>
                      <select
                        value={rfqData.incoterm}
                        onChange={(e) => setRfqData({ ...rfqData, incoterm: e.target.value })}
                        className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-700"
                      >
                        <option value="FOB Tanjung Priok, Jakarta">FOB Tanjung Priok, Jakarta</option>
                        <option value="FOB Belawan, Medan">FOB Belawan, Medan</option>
                        <option value="CIF Destination Port">CIF Pelabuhan Tujuan</option>
                        <option value="CFR Destination Port">CFR Pelabuhan Tujuan</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Pelabuhan Tujuan (Port of Discharge):
                      </label>
                      <input
                        type="text"
                        placeholder="Contoh: Jebel Ali (Dubai) / Rotterdam"
                        value={rfqData.destinationPort}
                        onChange={(e) => setRfqData({ ...rfqData, destinationPort: e.target.value })}
                        className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-700"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 px-4 text-xs font-bold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg transition-colors shadow-sm inline-flex items-center justify-center gap-2"
                  >
                    <span>Kirim Permintaan Kuotasi Ekspor</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      {activeCommodityModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 relative shadow-xl border border-stone-200">
            <button
              onClick={() => setActiveCommodityModal(null)}
              className="absolute top-4 right-4 p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-xs font-semibold text-emerald-800 uppercase tracking-wide">
              Spesifikasi Ekspor
            </div>
            <h3 className="text-lg font-bold text-stone-900 mt-1">{activeCommodityModal.name}</h3>
            <p className="text-xs text-stone-500 italic mb-4">{activeCommodityModal.englishName}</p>

            <p className="text-xs text-stone-700 mb-4 leading-relaxed">
              {activeCommodityModal.description}
            </p>

            <div className="space-y-2.5 p-4 bg-stone-50 rounded-xl text-xs font-mono">
              <div className="flex justify-between border-b border-stone-200 pb-1.5">
                <span className="text-stone-500 font-sans">Asal Komoditas:</span>
                <span className="font-semibold text-stone-900">{activeCommodityModal.origin}</span>
              </div>
              <div className="flex justify-between border-b border-stone-200 pb-1.5">
                <span className="text-stone-500 font-sans">Grade / Standar Mutu:</span>
                <span className="font-semibold text-stone-900">{activeCommodityModal.specifications.grade}</span>
              </div>
              <div className="flex justify-between border-b border-stone-200 pb-1.5">
                <span className="text-stone-500 font-sans">Kadar Air (Moisture):</span>
                <span className="text-stone-900">{activeCommodityModal.specifications.moisture}</span>
              </div>
              <div className="flex justify-between border-b border-stone-200 pb-1.5">
                <span className="text-stone-500 font-sans">Pengemasan Ekspor:</span>
                <span className="text-stone-900">{activeCommodityModal.specifications.packaging}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500 font-sans">Minimum Order (MOQ):</span>
                <span className="font-semibold text-emerald-800">{activeCommodityModal.specifications.minOrder}</span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
              <div className="text-xs text-stone-500">Karantina & Kepatuhan: Terpenuhi</div>
              <button
                onClick={() => {
                  setRfqData((prev) => ({ ...prev, commodityId: activeCommodityModal.id }));
                  setActiveCommodityModal(null);
                  const rfqElement = document.getElementById('rfq-form-container');
                  rfqElement?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-4 py-2 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg"
              >
                Minta RFQ Komoditas Ini
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
