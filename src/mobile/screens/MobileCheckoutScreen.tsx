import { useState } from 'react';
import {
  ArrowLeft,
  MapPin,
  Truck,
  CreditCard,
  Receipt,
  CheckCircle2,
  ShieldCheck,
  ChevronRight,
  ArrowRight,
} from 'lucide-react';
import { MobileCartItem } from '../types';

interface MobileCheckoutScreenProps {
  items: MobileCartItem[];
  onBack: () => void;
  onProceedPayment: (orderData: {
    orderNumber: string;
    items: MobileCartItem[];
    subtotal: number;
    shippingFee: number;
    totalPayment: number;
    courier: string;
    paymentMethod: string;
    recipientName: string;
    recipientPhone: string;
    recipientAddress: string;
  }) => void;
}

export default function MobileCheckoutScreen({
  items,
  onBack,
  onProceedPayment,
}: MobileCheckoutScreenProps) {
  const subtotal = items.reduce((acc, i) => acc + i.product.price * i.quantity, 0);

  // Form states matching CheckoutScreen.kt
  const [recipientName, setRecipientName] = useState('Restoran Nusantara Rasa (Budi Santoso)');
  const [recipientPhone, setRecipientPhone] = useState('081234567890');
  const [recipientAddress, setRecipientAddress] = useState(
    'Jl. Thamrin No. 45, Menteng, Jakarta Pusat (10350)'
  );

  const couriers = [
    { id: 'jne', name: 'JNE Agri Cargo Dingin (Est. 1-2 hari)', fee: 25000 },
    { id: 'direct', name: 'Pengiriman Langsung Petani/Supplier (Hari ini)', fee: 40000 },
    { id: 'sicepat', name: 'SiCepat Kargo Komoditas (Est. 2-3 hari)', fee: 20000 },
  ];
  const [selectedCourierId, setSelectedCourierId] = useState('jne');

  const paymentMethods = [
    { id: 'bca', name: 'BCA Virtual Account', icon: '🏦' },
    { id: 'mandiri', name: 'Mandiri Virtual Account', icon: '🏛️' },
    { id: 'bri', name: 'BRI Virtual Account', icon: '🏢' },
    { id: 'qris', name: 'QRIS Nasional (Instant Pay)', icon: '📱' },
  ];
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('BCA Virtual Account');

  const activeCourier = couriers.find((c) => c.id === selectedCourierId) || couriers[0];
  const totalPayment = subtotal + activeCourier.fee;

  const handlePay = () => {
    const orderNumber = `TRN-${Math.floor(10000000 + Math.random() * 90000000)}`;
    onProceedPayment({
      orderNumber,
      items,
      subtotal,
      shippingFee: activeCourier.fee,
      totalPayment,
      courier: activeCourier.name,
      paymentMethod: selectedPaymentMethod,
      recipientName,
      recipientPhone,
      recipientAddress,
    });
  };

  return (
    <div className="bg-stone-100 min-h-full flex flex-col justify-between pb-4">
      {/* Top Header */}
      <div className="bg-white border-b border-stone-200 px-3 py-2.5 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-2">
          <button onClick={onBack} className="p-1 rounded-lg hover:bg-stone-100 text-stone-700">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h3 className="text-sm font-bold text-stone-900 leading-tight">Pengiriman & Pembayaran</h3>
            <span className="text-[10px] text-emerald-800 font-medium">Checkout Resmi Terniva</span>
          </div>
        </div>
      </div>

      <div className="p-3 space-y-3 flex-1 overflow-y-auto">
        {/* 1. Alamat Pengiriman Penerima */}
        <div className="bg-white rounded-2xl p-3.5 border border-stone-200 shadow-xs space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-stone-900">
            <MapPin className="w-4 h-4 text-emerald-800" />
            <span>Alamat Pengiriman Penerima</span>
          </div>
          <div className="text-xs text-stone-800">
            <div className="font-semibold">{recipientName} · {recipientPhone}</div>
            <div className="text-stone-600 mt-0.5 leading-relaxed">{recipientAddress}</div>
          </div>
        </div>

        {/* 2. Rincian Produk Pesanan */}
        <div className="bg-white rounded-2xl p-3.5 border border-stone-200 shadow-xs space-y-2.5">
          <div className="text-xs font-bold text-stone-900">Rincian Komoditas Pesanan</div>
          <div className="divide-y divide-stone-100">
            {items.map((item) => (
              <div key={item.product.id} className="py-2 flex items-center justify-between text-xs">
                <div className="min-w-0 flex-1 pr-2">
                  <div className="font-semibold text-stone-900 truncate">{item.product.name}</div>
                  <div className="text-[11px] text-stone-500">
                    {item.quantity} x Rp {item.product.price.toLocaleString('id-ID')}
                  </div>
                </div>
                <div className="font-mono font-bold text-stone-900 shrink-0">
                  Rp {(item.product.price * item.quantity).toLocaleString('id-ID')}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Metode Pengiriman Komoditas */}
        <div className="bg-white rounded-2xl p-3.5 border border-stone-200 shadow-xs space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-stone-900">
            <Truck className="w-4 h-4 text-emerald-800" />
            <span>Metode Pengiriman Komoditas</span>
          </div>

          <div className="space-y-1.5">
            {couriers.map((c) => (
              <label
                key={c.id}
                onClick={() => setSelectedCourierId(c.id)}
                className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer transition-colors ${
                  selectedCourierId === c.id
                    ? 'border-emerald-700 bg-emerald-50/60 ring-1 ring-emerald-700'
                    : 'border-stone-200 bg-stone-50 hover:bg-white'
                }`}
              >
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="courier"
                    checked={selectedCourierId === c.id}
                    onChange={() => setSelectedCourierId(c.id)}
                    className="accent-emerald-800"
                  />
                  <span className="text-xs font-semibold text-stone-800">{c.name}</span>
                </div>
                <span className="text-xs font-mono font-bold text-stone-900">
                  Rp {c.fee.toLocaleString('id-ID')}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* 4. Pilihan Metode Pembayaran */}
        <div className="bg-white rounded-2xl p-3.5 border border-stone-200 shadow-xs space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-stone-900">
            <CreditCard className="w-4 h-4 text-emerald-800" />
            <span>Pilihan Metode Pembayaran</span>
          </div>

          <div className="space-y-1.5">
            {paymentMethods.map((m) => (
              <label
                key={m.id}
                onClick={() => setSelectedPaymentMethod(m.name)}
                className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer transition-colors ${
                  selectedPaymentMethod === m.name
                    ? 'border-emerald-700 bg-emerald-50/60 ring-1 ring-emerald-700'
                    : 'border-stone-200 bg-stone-50 hover:bg-white'
                }`}
              >
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="payment"
                    checked={selectedPaymentMethod === m.name}
                    onChange={() => setSelectedPaymentMethod(m.name)}
                    className="accent-emerald-800"
                  />
                  <span className="text-sm">{m.icon}</span>
                  <span className="text-xs font-semibold text-stone-800">{m.name}</span>
                </div>
                {selectedPaymentMethod === m.name && (
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                )}
              </label>
            ))}
          </div>
        </div>

        {/* 5. Ringkasan Pembayaran */}
        <div className="bg-white rounded-2xl p-3.5 border border-stone-200 shadow-xs space-y-2 text-xs">
          <div className="font-bold text-stone-900">Ringkasan Pembayaran</div>
          <div className="flex justify-between text-stone-600">
            <span>Subtotal Produk:</span>
            <span className="font-mono">Rp {subtotal.toLocaleString('id-ID')}</span>
          </div>
          <div className="flex justify-between text-stone-600">
            <span>Biaya Pengiriman Kargo:</span>
            <span className="font-mono">Rp {activeCourier.fee.toLocaleString('id-ID')}</span>
          </div>
          <div className="pt-2 border-t border-stone-100 flex justify-between font-bold text-stone-900">
            <span>Total Tagihan:</span>
            <span className="font-mono text-emerald-800 text-sm">
              Rp {totalPayment.toLocaleString('id-ID')}
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Bayar Sekarang */}
      <div className="bg-white border-t border-stone-200 p-3 shadow-lg flex items-center justify-between sticky bottom-0 z-20">
        <div>
          <span className="text-[10px] text-stone-500 block leading-tight">Total Tagihan:</span>
          <span className="text-base font-bold text-emerald-800 font-mono">
            Rp {totalPayment.toLocaleString('id-ID')}
          </span>
        </div>

        <button
          onClick={handlePay}
          className="py-2.5 px-5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm"
        >
          <span>Bayar Sekarang</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
