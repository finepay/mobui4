import { ArrowRight, ShieldCheck, TrendingUp, Stethoscope, Globe2 } from 'lucide-react';

interface HeroProps {
  onSelectSection: (sectionId: string) => void;
}

export default function Hero({ onSelectSection }: HeroProps) {
  return (
    <section id="hero" className="relative bg-stone-900 text-white overflow-hidden">
      {/* Background Hero Image with measured contrast scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/terniva_hero_landscape_1794449096818.jpg"
          alt="Lanskap Pertanian dan Peternakan Terintegrasi Terniva Indonesia"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center brightness-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-900/60 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 lg:pt-28 lg:pb-24">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-emerald-300 uppercase mb-4">
            <span>Ekosistem Agribisnis Terintegrasi</span>
            <span aria-hidden="true">·</span>
            <span>Indonesia Modern</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white text-balance leading-tight mb-6">
            Menghubungkan Peternak, Petani, dan Pasar Dunia dengan Pendampingan Ahli
          </h1>

          <p className="text-base sm:text-lg text-stone-200 leading-relaxed max-w-2xl mb-8">
            Terniva hadir membangun kedaulatan pangan berkelanjutan melalui tiga pilar utama:
            kemitraan produksi hulu-hilir, fasilitasi ekspor komoditas bersertifikasi global,
            serta layanan klinis dokter hewan dan tanaman langsung di lahan Anda.
          </p>

          {/* Quick Pillar Action Buttons */}
          <div className="flex flex-wrap gap-3 sm:gap-4 items-center">
            <button
              onClick={() => onSelectSection('gabung-mitra')}
              className="px-5 py-3 text-sm font-semibold text-stone-900 bg-white hover:bg-stone-100 rounded-lg transition-colors inline-flex items-center gap-2 shadow-sm whitespace-nowrap"
            >
              <span>Gabung Mitra</span>
              <ArrowRight className="w-4 h-4 text-emerald-800" />
            </button>

            <button
              onClick={() => onSelectSection('ekspor')}
              className="px-5 py-3 text-sm font-semibold text-white bg-emerald-800 hover:bg-emerald-700 rounded-lg transition-colors inline-flex items-center gap-2 shadow-sm whitespace-nowrap"
            >
              <Globe2 className="w-4 h-4 text-emerald-300" />
              <span>Layanan Ekspor</span>
            </button>

            <button
              onClick={() => onSelectSection('konsultasi')}
              className="px-5 py-3 text-sm font-semibold text-stone-100 bg-stone-800/90 hover:bg-stone-800 border border-stone-700 rounded-lg transition-colors inline-flex items-center gap-2 whitespace-nowrap"
            >
              <Stethoscope className="w-4 h-4 text-emerald-400" />
              <span>Konsultasi Dok Hewan & Tanaman</span>
            </button>
          </div>
        </div>

        {/* 4-Column KPI strip in full-width row below hero content */}
        <div className="mt-16 pt-8 border-t border-stone-800 grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
          <div>
            <div className="text-2xl sm:text-3xl font-bold text-white tabular-nums tracking-tight">
              4.850+
            </div>
            <div className="text-xs sm:text-sm text-stone-300 mt-1">
              Mitra Peternak & Petani Aktif
            </div>
            <div className="text-xs text-stone-400 mt-0.5">Jawa, Sumatra & Sulawesi</div>
          </div>

          <div>
            <div className="text-2xl sm:text-3xl font-bold text-emerald-400 tabular-nums tracking-tight">
              18 Negara
            </div>
            <div className="text-xs sm:text-sm text-stone-300 mt-1">
              Tujuan Ekspor Komoditas
            </div>
            <div className="text-xs text-stone-400 mt-0.5">Timur Tengah, Asia & Eropa</div>
          </div>

          <div>
            <div className="text-2xl sm:text-3xl font-bold text-white tabular-nums tracking-tight">
              120+ Dokter
            </div>
            <div className="text-xs sm:text-sm text-stone-300 mt-1">
              Dokter Hewan & Tanaman Siaga
            </div>
            <div className="text-xs text-stone-400 mt-0.5">Terverifikasi SIP & Asosiasi</div>
          </div>

          <div>
            <div className="text-2xl sm:text-3xl font-bold text-amber-300 tabular-nums tracking-tight">
              100%
            </div>
            <div className="text-xs sm:text-sm text-stone-300 mt-1">
              Jaminan Serap Panen Mitra
            </div>
            <div className="text-xs text-stone-400 mt-0.5">Sesuai kontrak harga wajar</div>
          </div>
        </div>
      </div>
    </section>
  );
}
