import { useState } from 'react';
import { X, Star, MapPin, Plus, Minus, ShoppingCart, CheckCircle2, ArrowRight } from 'lucide-react';
import { MobileProduct, MobileCartItem } from '../types';

interface ProductDetailModalProps {
  product: MobileProduct;
  onClose: () => void;
  onAddToCart: (product: MobileProduct, qty: number) => void;
  onBuyNow: (product: MobileProduct) => void;
}

export function ProductDetailModal({
  product,
  onClose,
  onAddToCart,
  onBuyNow,
}: ProductDetailModalProps) {
  const [qty, setQty] = useState(1);

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-t-3xl sm:rounded-2xl max-w-sm w-full max-h-[85vh] flex flex-col overflow-hidden shadow-2xl">
        <div className="relative aspect-video bg-stone-100 overflow-hidden shrink-0">
          <img
            src={product.imageUrl}
            alt={product.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-1.5 rounded-full bg-black/50 text-white hover:bg-black/80"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-4 flex-1 overflow-y-auto space-y-3 text-xs">
          <div>
            <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wide">
              {product.category} · {product.supplier}
            </span>
            <h4 className="text-sm font-bold text-stone-900 mt-0.5 leading-tight">{product.name}</h4>
            <div className="text-base font-bold text-emerald-800 font-mono mt-1">
              Rp {product.price.toLocaleString('id-ID')}
            </div>
          </div>

          <div className="flex items-center gap-3 text-[11px] text-stone-600 border-y border-stone-100 py-2">
            <span className="flex items-center gap-1 font-mono">
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <strong>{product.rating}</strong> (Review)
            </span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-stone-400" />
              {product.location}
            </span>
          </div>

          <div>
            <div className="font-semibold text-stone-800 mb-1">Deskripsi & Spesifikasi Produk:</div>
            <p className="text-stone-600 leading-relaxed">{product.description}</p>
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="font-semibold text-stone-800">Jumlah Pembelian:</span>
            <div className="flex items-center gap-2 border border-stone-200 rounded-lg p-1">
              <button
                onClick={() => setQty(Math.max(1, qty - 1))}
                className="p-1 text-stone-600 hover:bg-stone-100 rounded"
              >
                <Minus className="w-3 h-3" />
              </button>
              <span className="w-6 text-center font-bold font-mono">{qty}</span>
              <button
                onClick={() => setQty(qty + 1)}
                className="p-1 text-stone-600 hover:bg-stone-100 rounded"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

        <div className="p-3 bg-stone-50 border-t border-stone-200 grid grid-cols-2 gap-2 shrink-0">
          <button
            onClick={() => {
              onAddToCart(product, qty);
              onClose();
            }}
            className="py-2.5 px-3 bg-white border border-emerald-800 text-emerald-800 rounded-xl font-bold text-xs hover:bg-emerald-50"
          >
            + Keranjang
          </button>
          <button
            onClick={() => {
              onAddToCart(product, qty);
              onClose();
              onBuyNow(product);
            }}
            className="py-2.5 px-3 bg-emerald-800 text-white rounded-xl font-bold text-xs hover:bg-emerald-900"
          >
            Beli Sekarang
          </button>
        </div>
      </div>
    </div>
  );
}

interface CartModalProps {
  cartItems: MobileCartItem[];
  onClose: () => void;
  onUpdateQty: (productId: string, delta: number) => void;
  onCheckout: () => void;
}

export function CartModal({ cartItems, onClose, onUpdateQty, onCheckout }: CartModalProps) {
  const totalAmount = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-t-3xl sm:rounded-2xl max-w-sm w-full max-h-[85vh] flex flex-col overflow-hidden shadow-2xl">
        <div className="p-3 bg-white border-b border-stone-200 flex items-center justify-between shrink-0">
          <h4 className="text-xs font-bold text-stone-900">Keranjang Belanja Terniva ({cartItems.length})</h4>
          <button onClick={onClose} className="p-1 rounded-lg text-stone-400 hover:text-stone-700">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-3 flex-1 overflow-y-auto space-y-2.5">
          {cartItems.length === 0 ? (
            <div className="text-center py-8 text-xs text-stone-500">
              <ShoppingCart className="w-8 h-8 text-stone-300 mx-auto mb-2" />
              Keranjang masih kosong. Pilih komoditas dari beranda!
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={item.product.id} className="p-2.5 bg-stone-50 rounded-xl border border-stone-200 flex gap-2.5 items-center">
                <img
                  src={item.product.imageUrl}
                  alt={item.product.name}
                  referrerPolicy="no-referrer"
                  className="w-12 h-12 rounded-lg object-cover bg-stone-200 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-bold text-stone-900 truncate">{item.product.name}</div>
                  <div className="text-[11px] font-mono font-semibold text-emerald-800">
                    Rp {item.product.price.toLocaleString('id-ID')}
                  </div>
                </div>
                <div className="flex items-center gap-1.5 border border-stone-300 bg-white rounded-md p-0.5 shrink-0">
                  <button onClick={() => onUpdateQty(item.product.id, -1)} className="p-1 text-stone-600">
                    <Minus className="w-2.5 h-2.5" />
                  </button>
                  <span className="text-xs font-bold font-mono px-1">{item.quantity}</span>
                  <button onClick={() => onUpdateQty(item.product.id, 1)} className="p-1 text-stone-600">
                    <Plus className="w-2.5 h-2.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="p-3 bg-white border-t border-stone-200 shrink-0 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-stone-500">Total Tagihan:</span>
              <span className="text-sm font-bold text-emerald-800 font-mono">
                Rp {totalAmount.toLocaleString('id-ID')}
              </span>
            </div>
            <button
              onClick={onCheckout}
              className="w-full py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5"
            >
              <span>Checkout Sekarang</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
