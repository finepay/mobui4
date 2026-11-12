import { MapPin, Search, ShoppingCart, MessageSquare, Sprout } from 'lucide-react';

interface MobileTopBarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  cartCount: number;
  onCartClick: () => void;
  onChatClick: () => void;
  currentLocation?: string;
  onOpenSearchListing?: () => void;
}

export default function MobileTopBar({
  searchQuery,
  onSearchChange,
  cartCount,
  onCartClick,
  onChatClick,
  currentLocation = 'DKI Jakarta & Sekitarnya',
  onOpenSearchListing,
}: MobileTopBarProps) {
  return (
    <div className="bg-emerald-800 text-white shadow-md sticky top-0 z-30">
      {/* Location row */}
      <div className="px-3 pt-2 pb-1.5 flex items-center justify-between text-[11px] text-emerald-100 border-b border-emerald-700/50">
        <div className="flex items-center gap-1 truncate max-w-[280px]">
          <MapPin className="w-3 h-3 text-emerald-300 shrink-0" />
          <span className="truncate">Kirim ke: <strong className="font-semibold text-white">{currentLocation}</strong></span>
        </div>
        <span className="text-[10px] text-emerald-200 shrink-0 font-medium">ID ▾</span>
      </div>

      {/* Main search and action row */}
      <div className="px-3 py-2 flex items-center gap-2.5">
        {/* Brand Mark */}
        <div className="flex items-center gap-1.5 shrink-0">
          <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center shadow-xs">
            <Sprout className="w-4 h-4 text-emerald-800" />
          </div>
          <span className="text-sm font-bold tracking-tight text-white hidden xs:inline">Terniva</span>
        </div>

        {/* Search Input (Clicking navigates to full listing/search screen) */}
        <div
          onClick={onOpenSearchListing}
          className="flex-1 relative cursor-pointer"
        >
          <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            readOnly={!!onOpenSearchListing}
            placeholder="Cari bibit, pakan, sapi, kopi..."
            value={searchQuery}
            onClick={onOpenSearchListing}
            onFocus={(e) => {
              if (onOpenSearchListing) {
                e.target.blur();
                onOpenSearchListing();
              }
            }}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-white text-stone-900 rounded-lg placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-emerald-400 shadow-inner cursor-pointer"
          />
        </div>

        {/* Cart Button with badge */}
        <button
          onClick={onCartClick}
          className="relative p-1.5 text-white hover:text-emerald-200 transition-colors shrink-0"
          title="Keranjang Belanja"
        >
          <ShoppingCart className="w-5 h-5" />
          {cartCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 bg-rose-500 text-white font-mono text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-white">
              {cartCount > 9 ? '9+' : cartCount}
            </span>
          )}
        </button>

        {/* Chat Button */}
        <button
          onClick={onChatClick}
          className="relative p-1.5 text-white hover:text-emerald-200 transition-colors shrink-0"
          title="Pesan & Tanya Dokter"
        >
          <MessageSquare className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-amber-400 border border-emerald-800" />
        </button>
      </div>
    </div>
  );
}
