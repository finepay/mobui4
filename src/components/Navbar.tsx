import { useState } from 'react';
import { Menu, X, ArrowUpRight, Sprout } from 'lucide-react';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
  activeSection?: string;
  onOpenConsultationChat: () => void;
}

export default function Navbar({ onNavigate, activeSection, onOpenConsultationChat }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'gabung-mitra', label: 'Gabung Mitra' },
    { id: 'ekspor', label: 'Ekspor' },
    { id: 'konsultasi', label: 'Konsultasi (Dok Hewan/Tanaman)' },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-20">
          {/* Zone 1: Brand Wordmark (Single clean element) */}
          <button
            onClick={() => handleNavClick('hero')}
            className="flex items-center gap-2.5 text-left group shrink-0 focus:outline-none"
          >
            <div className="w-10 h-10 rounded-lg bg-emerald-800 text-emerald-100 flex items-center justify-center font-bold tracking-tight shadow-sm group-hover:bg-emerald-700 transition-colors">
              <Sprout className="w-5 h-5 text-emerald-300" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-stone-900 whitespace-nowrap">
              Terniva
            </span>
          </button>

          {/* Zone 2: Navigation Links (Strictly the 3 requested: Gabung Mitra, Ekspor, Konsultasi) */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-700">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`whitespace-nowrap transition-colors py-1 relative hover:text-emerald-800 focus:outline-none ${
                    isActive ? 'text-emerald-800 font-semibold' : 'text-stone-700'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-700 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Primary Action CTA */}
          <div className="hidden md:flex items-center gap-4 shrink-0">
            <button
              onClick={onOpenConsultationChat}
              className="px-5 py-2.5 text-xs font-semibold tracking-wide text-white bg-emerald-800 rounded-lg hover:bg-emerald-900 transition-colors shadow-sm inline-flex items-center gap-2 whitespace-nowrap shrink-0"
            >
              <span>Tanya Dokter Siaga</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-stone-700 hover:text-stone-900 hover:bg-stone-100 focus:outline-none"
              aria-label="Buka menu navigasi"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-stone-200 bg-white px-4 pt-3 pb-6 space-y-3">
          <div className="flex flex-col space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-left px-3 py-3 rounded-lg text-base font-medium transition-colors ${
                  activeSection === item.id
                    ? 'bg-emerald-50 text-emerald-900 font-semibold'
                    : 'text-stone-800 hover:bg-stone-100'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
          <div className="pt-2 border-t border-stone-100">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenConsultationChat();
              }}
              className="w-full py-3 px-4 text-center text-sm font-semibold text-white bg-emerald-800 rounded-lg hover:bg-emerald-900 transition-colors flex items-center justify-center gap-2"
            >
              <span>Tanya Dokter Siaga</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
