import { useState } from 'react';
import { TrendingUp, Play, Bell, User, CheckCircle2, ShoppingBag, ShieldCheck, Phone, MapPin, Store } from 'lucide-react';

export function MobilePeluangScreen() {
  const buyerRequests = [
    { id: 'br-1', title: 'Dibutuhkan 50 Ton Jagung Pipil Kadar Air < 14%', buyer: 'PT Pakan Ternak Sentosa', budget: 'Rp 5.200 / kg', deadline: '3 Hari Lagi' },
    { id: 'br-2', title: 'Permintaan 200 Ekor Sapi Limousin / Simmental', buyer: 'RPH & Suplier Qurban Jabodetabek', budget: 'Rp 65.000 / kg hidup', deadline: '5 Hari Lagi' },
    { id: 'br-3', title: 'Kebutuhan Ekspor 5 Ton Jahe Gajah Kering', buyer: 'Global Spice Trading Dubai', budget: 'USD $3.8 / kg FOB', deadline: '1 Minggu' },
  ];

  return (
    <div className="p-3 space-y-3 bg-stone-100 min-h-full pb-8">
      <div className="bg-emerald-900 text-white rounded-2xl p-4 shadow-sm">
        <span className="text-[10px] font-semibold text-emerald-300 uppercase">Peluang Bisnis Agribisnis</span>
        <h4 className="text-sm font-bold mt-0.5">Permintaan Pasokan Buyer & Tender Ekspor</h4>
        <p className="text-[11px] text-stone-300 mt-1">
          Hubungkan hasil panen dan ternak Anda langsung ke pembeli korporasi tanpa perantara tengkulak.
        </p>
      </div>

      <div className="space-y-2">
        <div className="text-xs font-bold text-stone-900">Tender Permintaan Aktif Hari Ini</div>
        {buyerRequests.map((req) => (
          <div key={req.id} className="bg-white rounded-xl p-3 border border-stone-200 shadow-xs space-y-1.5">
            <span className="text-[9px] font-bold text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded">
              Batas: {req.deadline}
            </span>
            <h5 className="text-xs font-bold text-stone-900">{req.title}</h5>
            <div className="text-[10px] text-stone-500">{req.buyer}</div>
            <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs">
              <span className="font-bold text-emerald-800 font-mono">{req.budget}</span>
              <button className="px-2.5 py-1 bg-emerald-800 text-white rounded-lg text-[10px] font-bold">
                Ajukan Pasokan
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function MobileLiveScreen() {
  return (
    <div className="p-3 space-y-3 bg-stone-100 min-h-full pb-8">
      <div className="relative rounded-2xl overflow-hidden aspect-video bg-black shadow-sm">
        <img
          src="/src/assets/images/terniva_mitra_farmer_1794449097085.jpg"
          alt="Live Terniva"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute top-2 left-2 flex items-center gap-1.5 bg-rose-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
          <span>LIVE SEKARANG</span>
        </div>
        <div className="absolute bottom-2 left-2 right-2 text-white bg-black/60 backdrop-blur-xs p-2 rounded-xl">
          <div className="text-xs font-bold">Lelang Sapi Pejantan & Panen Raya Kopi Gayo</div>
          <div className="text-[10px] text-stone-300">Dipandu drh. Aryo & Tim Field Officer</div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-3 border border-stone-200 space-y-2">
        <div className="text-xs font-bold text-stone-900">Jadwal Live Stream Mendatang</div>
        <div className="p-2.5 bg-stone-50 rounded-xl space-y-1 text-xs">
          <div className="font-semibold text-stone-900">14:00 WIB · Bedah Penyakit Tanaman Cabai Musim Hujan</div>
          <div className="text-[10px] text-stone-500">Bersama Dr. Ir. Hendra Saputra (Dokter Tanaman)</div>
        </div>
        <div className="p-2.5 bg-stone-50 rounded-xl space-y-1 text-xs">
          <div className="font-semibold text-stone-900">19:30 WIB · Lelang Sapi Limousin Bobot 600kg Siap Potong</div>
          <div className="text-[10px] text-stone-500">Cluster Subang Jaya</div>
        </div>
      </div>
    </div>
  );
}

export function MobileNotificationScreen() {
  const notifs = [
    { title: 'Konsultasi Dokter Hewan Diterima', text: 'drh. Aryo telah membalas catatan gejala sapi kembung Anda.', time: '10 menit lalu' },
    { title: 'Program Pantau Panen Berjalan', text: 'Sensor suhu kandang Subang tercatat stabil di 24.8°C.', time: '1 jam lalu' },
    { title: 'Katalog Ekspor Diperbarui', text: 'Kuota ekspor Vanili Gourmet Alor untuk buyer Dubai telah dibuka.', time: 'Kemarin' },
  ];

  return (
    <div className="p-3 space-y-2 bg-stone-100 min-h-full pb-8">
      <div className="text-xs font-bold text-stone-900 px-1 py-1">Pemberitahuan & Chat Dokter</div>
      {notifs.map((n, idx) => (
        <div key={idx} className="bg-white p-3 rounded-xl border border-stone-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-stone-900">{n.title}</span>
            <span className="text-[9px] text-stone-400 font-mono">{n.time}</span>
          </div>
          <p className="text-[11px] text-stone-600 leading-tight">{n.text}</p>
        </div>
      ))}
    </div>
  );
}

export function MobileAccountScreen() {
  return (
    <div className="p-3 space-y-3 bg-stone-100 min-h-full pb-8">
      <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-xs flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-emerald-800 text-white font-bold flex items-center justify-center text-lg">
          BS
        </div>
        <div>
          <div className="text-sm font-bold text-stone-900">Budi Santoso</div>
          <div className="text-[10px] text-emerald-800 font-semibold bg-emerald-50 px-2 py-0.5 rounded max-w-fit mt-0.5">
            Mitra Peternak & Petani Terverifikasi
          </div>
          <div className="text-[10px] text-stone-500 mt-0.5">Subang, Jawa Barat · ID: TRN-8819</div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-3 border border-stone-200 shadow-xs grid grid-cols-2 gap-2 text-center">
        <div className="p-2.5 bg-stone-50 rounded-xl">
          <span className="text-[10px] text-stone-500 block">Saldo Hasil Panen</span>
          <span className="text-sm font-bold text-emerald-800 font-mono">Rp 48.500.000</span>
        </div>
        <div className="p-2.5 bg-stone-50 rounded-xl">
          <span className="text-[10px] text-stone-500 block">Slot Pantau Panen</span>
          <span className="text-sm font-bold text-stone-900 font-mono">4 Ternak Aktif</span>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-2 border border-stone-200 shadow-xs divide-y divide-stone-100 text-xs">
        <div className="p-2.5 flex items-center justify-between text-stone-800 font-medium">
          <span>Riwayat Pesanan Sapronak / Pupuk</span>
          <span className="text-stone-400">&gt;</span>
        </div>
        <div className="p-2.5 flex items-center justify-between text-stone-800 font-medium">
          <span>Rekam Medis Dokter Hewan & Tanaman</span>
          <span className="text-stone-400">&gt;</span>
        </div>
        <div className="p-2.5 flex items-center justify-between text-stone-800 font-medium">
          <span>Kontrak Akad Kemitraan & Ekspor</span>
          <span className="text-stone-400">&gt;</span>
        </div>
      </div>
    </div>
  );
}
