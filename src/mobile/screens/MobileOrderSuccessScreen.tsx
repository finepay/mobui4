import { useState } from 'react';
import {
  Hourglass,
  CheckCircle2,
  Copy,
  Check,
  ArrowRight,
  ShieldCheck,
  Receipt,
  Home,
  ShoppingBag,
} from 'lucide-react';

interface MobileOrderSuccessScreenProps {
  orderData: {
    orderNumber: string;
    subtotal: number;
    shippingFee: number;
    totalPayment: number;
    courier: string;
    paymentMethod: string;
    recipientName: string;
    recipientPhone: string;
    recipientAddress: string;
  };
  onGoHome: () => void;
  onViewMyOrders: () => void;
}

export default function MobileOrderSuccessScreen({
  orderData,
  onGoHome,
  onViewMyOrders,
}: MobileOrderSuccessScreenProps) {
  const [isPaid, setIsPaid] = useState(false);
  const [copied, setCopied] = useState(false);

  // Generate virtual account number based on bank
  const vaNumber = orderData.paymentMethod.includes('BCA')
    ? '8801 2345 6789 012'
    : orderData.paymentMethod.includes('Mandiri')
    ? '8902 3456 7890 123'
    : orderData.paymentMethod.includes('BRI')
    ? '8003 4567 8901 234'
    : '0002 0101 0211 265';

  const handleCopy = () => {
    navigator.clipboard?.writeText(vaNumber.replace(/\s+/g, ''));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-stone-100 min-h-full flex flex-col justify-between pb-4">
      <div className="p-4 space-y-3 flex-1 overflow-y-auto">
        {/* Status Header */}
        <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-xs text-center space-y-2">
          <div
            className={`w-14 h-14 rounded-full mx-auto flex items-center justify-center transition-colors ${
              isPaid ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-600'
            }`}
          >
            {isPaid ? (
              <CheckCircle2 className="w-8 h-8" />
            ) : (
              <Hourglass className="w-7 h-7 animate-pulse" />
            )}
          </div>

          <h3
            className={`text-base font-black ${
              isPaid ? 'text-emerald-800' : 'text-amber-600'
            }`}
          >
            {isPaid ? 'Pembayaran Terverifikasi!' : 'Menunggu Pembayaran'}
          </h3>

          <div className="text-xs text-stone-500 font-mono">
            Nomor Pesanan: <strong className="text-stone-800">{orderData.orderNumber}</strong>
          </div>

          <div className="text-[11px] text-stone-600 max-w-xs mx-auto">
            {isPaid
              ? 'Terima kasih, pembayaran telah berhasil diterima secara otomatis oleh sistem gateway Terniva.'
              : 'Selesaikan transfer sebelum batas waktu berakhir agar pesanan segera diproses oleh mitra.'}
          </div>
        </div>

        {/* VA Card & Instructions */}
        {!isPaid ? (
          <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-xs space-y-3">
            <div className="text-xs font-bold text-stone-900">
              Instruksi Pembayaran Gateway
            </div>

            <div className="text-[11px] text-stone-500">
              Metode: <strong className="text-stone-800">{orderData.paymentMethod}</strong>
            </div>

            {/* Virtual Account Box */}
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 space-y-1">
              <span className="text-[10px] text-stone-500 block">Nomor Virtual Account:</span>
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold font-mono text-stone-900 tracking-wider">
                  {vaNumber}
                </span>
                <button
                  onClick={handleCopy}
                  className="px-2.5 py-1 text-xs font-bold text-emerald-800 bg-white border border-stone-200 rounded-lg hover:bg-emerald-50 flex items-center gap-1 shadow-xs"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-700" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Disalin' : 'Salin'}</span>
                </button>
              </div>
            </div>

            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 flex items-center justify-between text-xs">
              <span className="text-stone-500">Total Nominal Transfer:</span>
              <span className="text-base font-bold font-mono text-amber-600">
                Rp {orderData.totalPayment.toLocaleString('id-ID')}
              </span>
            </div>

            <div className="pt-2 border-t border-stone-100 text-[11px] text-stone-500 space-y-1">
              <div className="font-semibold text-stone-800">Petunjuk Pembayaran:</div>
              <ol className="list-decimal list-inside space-y-0.5 text-stone-600">
                <li>Buka aplikasi m-Banking atau kunjungi ATM terdekat</li>
                <li>Pilih menu <strong>Transfer &gt; Virtual Account</strong></li>
                <li>Masukkan nomor VA di atas dan pastikan nominal sesuai</li>
              </ol>
            </div>

            {/* Interactive Simulate Payment Button */}
            <button
              onClick={() => setIsPaid(true)}
              className="w-full py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Saya Sudah Bayar (Cek Status Otomatis)</span>
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-4 border border-emerald-300 shadow-xs space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-800">
              <CheckCircle2 className="w-4 h-4" />
              <span>Status Pesanan: Sedang Dikemas Mitra</span>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              Pesanan Anda telah diteruskan ke mitra petani/peternak di daerah asal. Kurir{' '}
              <strong className="text-stone-800">{orderData.courier}</strong> akan mengambil komoditas
              dan mengirimkan langsung ke alamat Anda.
            </p>
            <div className="p-2.5 bg-stone-50 rounded-xl text-xs text-stone-600 space-y-1 font-mono">
              <div className="flex justify-between">
                <span>Total Terbayar:</span>
                <span className="font-bold text-emerald-800">
                  Rp {orderData.totalPayment.toLocaleString('id-ID')}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Penerima:</span>
                <span>{orderData.recipientName}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Buttons */}
      <div className="p-3 bg-white border-t border-stone-200 grid grid-cols-2 gap-2 shrink-0">
        <button
          onClick={onGoHome}
          className="py-2.5 px-3 bg-white border border-stone-300 text-stone-800 hover:bg-stone-50 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5"
        >
          <Home className="w-3.5 h-3.5" />
          <span>Kembali ke Beranda</span>
        </button>

        <button
          onClick={onViewMyOrders}
          className="py-2.5 px-3 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs"
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>Lihat Pesanan Saya</span>
        </button>
      </div>
    </div>
  );
}
