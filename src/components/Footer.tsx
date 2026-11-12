import { Sprout, Phone, Mail, MapPin } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-stone-900 text-stone-300 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
          {/* Brand info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-emerald-800 text-emerald-100 flex items-center justify-center font-bold">
                <Sprout className="w-5 h-5 text-emerald-300" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">Terniva</span>
            </div>

            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              Platform ekosistem agribisnis dan peternakan modern Indonesia. Menghadirkan solusi terpadu bagi
              kemitraan peternak dan petani, standardisasi komoditas ekspor dunia, serta layanan klinis dokter hewan dan tanaman.
            </p>

            <div className="pt-2 text-xs text-stone-400 space-y-1.5">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Gedung Agribisnis Nusantara, Jl. TB Simatupang No. 18, Jakarta Selatan</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Hotline Mitra & Telekonsultasi: +62 811-9874-200</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>info@terniva.id · export@terniva.id</span>
              </div>
            </div>
          </div>

          {/* Core Navigation (strictly the requested 3 pillars) */}
          <div className="md:col-span-4 space-y-3">
            <div className="text-xs font-semibold text-white uppercase tracking-wider">
              Layanan Utama Terniva
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('gabung-mitra')}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  Gabung Mitra (Peternak, Petani & Supplier)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('ekspor')}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  Ekspor (Kopi, Rempah, Biomassa & Produk Ternak)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('konsultasi')}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  Konsultasi (Dok Hewan/Tanaman)
                </button>
              </li>
            </ul>

            <div className="pt-3 text-[11px] text-stone-500 leading-relaxed">
              Stasiun Riset Lapangan & Lab Kultur: Subang (Jawa Barat) & Malang (Jawa Timur)
            </div>
          </div>

          {/* Legal & Standards */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs font-semibold text-white uppercase tracking-wider">
              Kepatuhan & Sertifikasi
            </div>
            <div className="text-xs text-stone-400 space-y-1.5 leading-relaxed">
              <div>Karantina Pertanian & Hewan RI</div>
              <div>Badan Penyelenggara Jaminan Produk Halal (BPJPH)</div>
              <div>HACCP & ISO 22000 Food Safety</div>
              <div>US FDA Food Facility Registered</div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <div>© {new Date().getFullYear()} Terniva Indonesia. Seluruh hak cipta dilindungi undang-undang.</div>
          <div className="flex items-center gap-4 text-xs">
            <span>Ketentuan Kemitraan</span>
            <span aria-hidden="true">·</span>
            <span>Standar Ekspor</span>
            <span aria-hidden="true">·</span>
            <span>Kode Etik Medis Veteriner & Fitopatologi</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
