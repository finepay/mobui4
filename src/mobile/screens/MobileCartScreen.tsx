import { useState } from 'react';
import { ArrowLeft, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { MobileCartItem } from '../types';

interface MobileCartScreenProps {
  cartItems: MobileCartItem[];
  onBack: () => void;
  onUpdateQty: (productId: string, delta: number) => void;
  onToggleSelect: (productId: string) => void;
  onToggleSelectAll: (selected: boolean) => void;
  onCheckout: (selectedItems: MobileCartItem[]) => void;
  onContinueShopping: () => void;
}

export default function MobileCartScreen({
  cartItems,
  onBack,
  onUpdateQty,
  onToggleSelect,
  onToggleSelectAll,
  onCheckout,
  onContinueShopping,
}: MobileCartScreenProps) {
  const selectedItems = cartItems.filter((i) => i.isSelected);
  const totalAmount = selectedItems.reduce((acc, i) => acc + i.product.price * i.quantity, 0);
  const isAllSelected = cartItems.length > 0 && cartItems.every((i) => i.isSelected);

  return (
    <div className="bg-stone-100 min-h-full flex flex-col justify-between pb-4">
      {/* Top Bar */}
      <div className="bg-white border-b border-stone-200 px-3 py-2.5 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-2">
          <button onClick={onBack} className="p-1 rounded-lg hover:bg-stone-100 text-stone-700">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h3 className="text-sm font-bold text-stone-900 leading-tight">
            Keranjang Belanja ({cartItems.length})
          </h3>
        </div>
      </div>

      {/* Main Cart Items */}
      <div className="p-3 space-y-3 flex-1 overflow-y-auto">
        {cartItems.length === 0 ? (
          <div className="text-center py-16 space-y-3">
            <ShoppingBag className="w-12 h-12 text-stone-300 mx-auto" />
            <h4 className="text-sm font-bold text-stone-700">Keranjang Anda masih kosong</h4>
            <p className="text-xs text-stone-500 max-w-xs mx-auto">
              Temukan bibit berkualitas, pupuk hayati, pakan konsentrat, atau hasil panen segar di beranda.
            </p>
            <button
              onClick={onContinueShopping}
              className="mt-2 px-4 py-2 bg-emerald-800 text-white rounded-xl text-xs font-bold shadow-xs"
            >
              Mulai Belanja Komoditas
            </button>
          </div>
        ) : (
          <div className="space-y-2.5">
            {cartItems.map((item) => (
              <div
                key={item.product.id}
                className="bg-white rounded-2xl p-3 border border-stone-200 shadow-xs flex items-center gap-2.5"
              >
                {/* Selection Checkbox */}
                <input
                  type="checkbox"
                  checked={item.isSelected}
                  onChange={() => onToggleSelect(item.product.id)}
                  className="w-4 h-4 rounded text-emerald-800 accent-emerald-800 cursor-pointer"
                />

                {/* Product Thumbnail */}
                <img
                  src={item.product.imageUrl}
                  alt={item.product.name}
                  referrerPolicy="no-referrer"
                  className="w-16 h-16 rounded-xl object-cover bg-stone-100 shrink-0"
                />

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] font-bold text-stone-500 uppercase truncate">
                    {item.product.supplier}
                  </div>
                  <h5 className="text-xs font-bold text-stone-900 truncate">{item.product.name}</h5>
                  <div className="text-xs font-bold text-emerald-800 font-mono mt-0.5">
                    Rp {item.product.price.toLocaleString('id-ID')}
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-1.5 border border-stone-200 rounded-lg p-0.5 bg-stone-50 shrink-0">
                  <button
                    onClick={() => onUpdateQty(item.product.id, -1)}
                    className="p-1 text-stone-600 hover:bg-stone-200 rounded"
                    title="Kurangi"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="text-xs font-bold font-mono px-1 min-w-[16px] text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => onUpdateQty(item.product.id, 1)}
                    className="p-1 text-stone-600 hover:bg-stone-200 rounded"
                    title="Tambah"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Checkout Bar */}
      {cartItems.length > 0 && (
        <div className="bg-white border-t border-stone-200 p-3 shadow-lg flex items-center justify-between sticky bottom-0 z-20">
          <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-stone-700">
            <input
              type="checkbox"
              checked={isAllSelected}
              onChange={(e) => onToggleSelectAll(e.target.checked)}
              className="w-4 h-4 rounded text-emerald-800 accent-emerald-800"
            />
            <span>Semua</span>
          </label>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <span className="text-[10px] text-stone-500 block leading-tight">Total Pembayaran:</span>
              <span className="text-sm font-bold text-amber-600 font-mono">
                Rp {totalAmount.toLocaleString('id-ID')}
              </span>
            </div>

            <button
              onClick={() => onCheckout(selectedItems)}
              disabled={selectedItems.length === 0}
              className="py-2.5 px-4 bg-amber-600 hover:bg-amber-700 disabled:opacity-50 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs"
            >
              <span>Checkout ({selectedItems.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
