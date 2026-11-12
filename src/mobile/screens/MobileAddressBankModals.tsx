import { useState } from 'react';
import {
  X,
  MapPin,
  CreditCard,
  Building2,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Globe,
  FileText,
  Upload,
  ArrowRight,
  ExternalLink,
  Phone,
  Search,
} from 'lucide-react';

// ============================================================================
// 1. MODAL TAMBAH ALAMAT PENGIRIMAN LENGKAP
// ============================================================================
export interface AddressItem {
  id: string;
  label: string;
  recipient: string;
  phone: string;
  address: string;
  city?: string;
  province?: string;
  postalCode?: string;
  isDefault: boolean;
}

interface AddAddressModalProps {
  onClose: () => void;
  onSaveAddress: (newAddr: AddressItem) => void;
  onShowToast: (msg: string) => void;
}

export function AddAddressModal({ onClose, onSaveAddress, onShowToast }: AddAddressModalProps) {
  const [label, setLabel] = useState<'Rumah' | 'Kandang' | 'Kebun' | 'Gudang' | 'Kantor'>('Kandang');
  const [recipient, setRecipient] = useState('');
  const [phone, setPhone] = useState('');
  const [province, setProvince] = useState('Jawa Barat');
  const [city, setCity] = useState('Kab. Subang');
  const [district, setDistrict] = useState('Kec. Cipunagara');
  const [postalCode, setPostalCode] = useState('41257');
  const [fullAddress, setFullAddress] = useState('');
  const [landmark, setLandmark] = useState('');
  const [isDefault, setIsDefault] = useState(false);
  const [isPinningGps, setIsPinningGps] = useState(false);
  const [gpsCoordinates, setGpsCoordinates] = useState<string | null>(null);

  const handleGetGps = () => {
    setIsPinningGps(true);
    setTimeout(() => {
      setIsPinningGps(false);
      setGpsCoordinates('-6.5714, 107.7592 (Akurasi ± 5m)');
      onShowToast('Titik koordinat GPS berhasil dikunci!');
    }, 700);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipient.trim() || !phone.trim() || !fullAddress.trim()) {
      onShowToast('Mohon lengkapi nama penerima, nomor HP, dan alamat lengkap.');
      return;
    }

    const compiledAddress = `${fullAddress.trim()}${landmark ? ` (Patokan: ${landmark.trim()})` : ''}, ${district}, ${city}, ${province} ${postalCode}`;

    const newAddress: AddressItem = {
      id: `addr-${Date.now()}`,
      label: `${label} - ${recipient.trim()}`,
      recipient: recipient.trim(),
      phone: phone.trim(),
      address: compiledAddress,
      city,
      province,
      postalCode,
      isDefault,
    };

    onSaveAddress(newAddress);
    onShowToast('Alamat baru berhasil disimpan ke akun Terniva!');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="w-full max-w-[420px] bg-white text-stone-900 max-h-[92vh] flex flex-col shadow-2xl border border-stone-300">
        {/* Header */}
        <div className="p-3 bg-emerald-900 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-emerald-300" />
            <h4 className="text-xs font-bold">Tambah Alamat Pengiriman Baru</h4>
          </div>
          <button onClick={onClose} className="p-1 text-white/80 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-4 space-y-3 flex-1 overflow-y-auto text-xs">
          {/* Label Jenis Lokasi */}
          <div>
            <label className="text-[11px] font-bold text-stone-800 block mb-1">
              Label Alamat / Jenis Lokasi:
            </label>
            <div className="grid grid-cols-5 gap-1.5">
              {(['Kandang', 'Kebun', 'Gudang', 'Rumah', 'Kantor'] as const).map((lbl) => (
                <button
                  type="button"
                  key={lbl}
                  onClick={() => setLabel(lbl)}
                  className={`py-1.5 text-center text-[10px] font-bold border transition-colors ${
                    label === lbl
                      ? 'bg-emerald-800 text-white border-emerald-800'
                      : 'bg-stone-50 text-stone-700 border-stone-300 hover:bg-stone-100'
                  }`}
                >
                  {lbl}
                </button>
              ))}
            </div>
          </div>

          {/* Nama Penerima & No HP */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[11px] font-bold text-stone-800 block mb-1">Nama Penerima / PIC:</label>
              <input
                type="text"
                required
                placeholder="Contoh: Budi Santoso"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                className="w-full px-2.5 py-2 bg-stone-50 border border-stone-300 font-medium text-xs focus:outline-none focus:border-emerald-700"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-stone-800 block mb-1">Nomor WhatsApp / HP:</label>
              <input
                type="tel"
                required
                placeholder="0812xxxxxxx"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-2.5 py-2 bg-stone-50 border border-stone-300 font-mono font-medium text-xs focus:outline-none focus:border-emerald-700"
              />
            </div>
          </div>

          {/* Wilayah Administrasi */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[11px] font-bold text-stone-800 block mb-1">Provinsi:</label>
              <select
                value={province}
                onChange={(e) => setProvince(e.target.value)}
                className="w-full px-2 py-2 bg-stone-50 border border-stone-300 text-xs font-medium"
              >
                <option value="Jawa Barat">Jawa Barat</option>
                <option value="Jawa Tengah">Jawa Tengah</option>
                <option value="Jawa Timur">Jawa Timur</option>
                <option value="DI Yogyakarta">DI Yogyakarta</option>
                <option value="DKI Jakarta">DKI Jakarta</option>
                <option value="Banten">Banten</option>
                <option value="Sumatera Utara">Sumatera Utara</option>
                <option value="Aceh">Aceh</option>
              </select>
            </div>
            <div>
              <label className="text-[11px] font-bold text-stone-800 block mb-1">Kota / Kabupaten:</label>
              <input
                type="text"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-2.5 py-2 bg-stone-50 border border-stone-300 text-xs font-medium"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[11px] font-bold text-stone-800 block mb-1">Kecamatan:</label>
              <input
                type="text"
                required
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full px-2.5 py-2 bg-stone-50 border border-stone-300 text-xs font-medium"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-stone-800 block mb-1">Kode Pos:</label>
              <input
                type="text"
                required
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                className="w-full px-2.5 py-2 bg-stone-50 border border-stone-300 font-mono text-xs font-medium"
              />
            </div>
          </div>

          {/* Alamat Lengkap */}
          <div>
            <label className="text-[11px] font-bold text-stone-800 block mb-1">
              Alamat Lengkap (Jalan, RT/RW, Dusun):
            </label>
            <textarea
              required
              rows={2}
              placeholder="Contoh: Jl. Raya Pantura No. 45, Dusun Sukamulya RT 03 / RW 02"
              value={fullAddress}
              onChange={(e) => setFullAddress(e.target.value)}
              className="w-full px-2.5 py-2 bg-stone-50 border border-stone-300 text-xs font-medium"
            />
          </div>

          {/* Patokan Tambahan */}
          <div>
            <label className="text-[11px] font-bold text-stone-800 block mb-1">
              Patokan Kurir Kargo (Opsional):
            </label>
            <input
              type="text"
              placeholder="Contoh: Gerbang hijau sebelah KUD Tani Makmur"
              value={landmark}
              onChange={(e) => setLandmark(e.target.value)}
              className="w-full px-2.5 py-2 bg-stone-50 border border-stone-300 text-xs font-medium"
            />
          </div>

          {/* Kunci Titik GPS */}
          <div className="p-2.5 bg-stone-50 border border-stone-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-emerald-700" />
              <div>
                <div className="text-[11px] font-bold text-stone-900">Pin Peta & Titik GPS Kargo</div>
                <div className="text-[10px] text-stone-500 font-mono">
                  {gpsCoordinates || 'Belum dikunci (Gunakan lokasi saat ini)'}
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={handleGetGps}
              disabled={isPinningGps}
              className="px-2.5 py-1 bg-white border border-stone-300 hover:border-emerald-700 text-emerald-800 font-bold text-[10px]"
            >
              {isPinningGps ? 'Mengunci...' : 'Kunci GPS'}
            </button>
          </div>

          {/* Jadikan Alamat Utama */}
          <label className="flex items-center gap-2 p-2 bg-stone-50 border border-stone-200 cursor-pointer">
            <input
              type="checkbox"
              checked={isDefault}
              onChange={(e) => setIsDefault(e.target.checked)}
              className="w-4 h-4 text-emerald-800 rounded-none accent-emerald-800"
            />
            <span className="text-[11px] font-bold text-stone-800">
              Jadikan sebagai alamat pengiriman utama kargo
            </span>
          </label>

          {/* Tombol Simpan */}
          <button
            type="submit"
            className="w-full py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs mt-1"
          >
            Simpan Alamat Pengiriman
          </button>
        </form>
      </div>
    </div>
  );
}

// ============================================================================
// 2. MODAL TAMBAH REKENING BANK & E-WALLET (DENGAN VERIFIKASI NAMA & PIN)
// ============================================================================
export interface BankAccountItem {
  id: string;
  bank: string;
  number: string;
  holder: string;
  type: 'bank' | 'ewallet';
  isPrimary: boolean;
}

interface AddBankAccountModalProps {
  currentPin: string;
  verifiedKycName: string;
  onClose: () => void;
  onSaveAccount: (acc: BankAccountItem) => void;
  onShowToast: (msg: string) => void;
}

export function AddBankAccountModal({
  currentPin,
  verifiedKycName,
  onClose,
  onSaveAccount,
  onShowToast,
}: AddBankAccountModalProps) {
  const [accountCategory, setAccountCategory] = useState<'bank' | 'ewallet'>('bank');
  const [selectedBank, setSelectedBank] = useState('Bank Central Asia (BCA)');
  const [selectedEwallet, setSelectedEwallet] = useState('GoPay');
  const [accountNumber, setAccountNumber] = useState('');
  const [isVerifyingName, setIsVerifyingName] = useState(false);
  const [nameVerified, setNameVerified] = useState(false);
  const [isPrimary, setIsPrimary] = useState(false);
  const [inputPin, setInputPin] = useState('');
  const [pinError, setPinError] = useState('');

  const bankOptions = [
    'Bank Central Asia (BCA)',
    'Bank Rakyat Indonesia (BRI)',
    'Bank Mandiri',
    'Bank Negara Indonesia (BNI)',
    'Bank Syariah Indonesia (BSI)',
    'Bank Jago',
    'CIMB Niaga',
  ];

  const ewalletOptions = ['GoPay', 'OVO', 'ShopeePay', 'DANA', 'LinkAja'];

  const handleVerifyName = () => {
    if (!accountNumber || accountNumber.length < 8) {
      onShowToast('Masukkan nomor rekening / nomor HP minimal 8 digit!');
      return;
    }
    setIsVerifyingName(true);
    setTimeout(() => {
      setIsVerifyingName(false);
      setNameVerified(true);
      onShowToast(`Nomor valid! Pemilik terdaftar: ${verifiedKycName}`);
    }, 700);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameVerified) {
      onShowToast('Silakan klik "Cek Nama" terlebih dahulu untuk validasi nomor!');
      return;
    }

    if (inputPin !== currentPin) {
      setPinError('PIN transaksi salah! Hubungi bantuan jika lupa PIN.');
      return;
    }

    const bankName = accountCategory === 'bank' ? selectedBank : selectedEwallet;

    const newAcc: BankAccountItem = {
      id: `acc-${Date.now()}`,
      bank: bankName,
      number: accountNumber.trim(),
      holder: verifiedKycName,
      type: accountCategory,
      isPrimary,
    };

    onSaveAccount(newAcc);
    onShowToast(`Rekening ${bankName} berhasil dihubungkan ke TernivaPay!`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="w-full max-w-[420px] bg-white text-stone-900 max-h-[92vh] flex flex-col shadow-2xl border border-stone-300">
        {/* Header */}
        <div className="p-3 bg-emerald-900 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-emerald-300" />
            <h4 className="text-xs font-bold">Hubungkan Rekening Penarikan Hasil Panen</h4>
          </div>
          <button onClick={onClose} className="p-1 text-white/80 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Security Alert Note */}
        <div className="p-2.5 bg-amber-50 border-b border-amber-200 flex items-start gap-2 text-[11px] text-amber-900 leading-tight">
          <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">Ketentuan Anti-Pencucian Uang & Penipuan:</span>
            <p className="text-[10px] text-amber-800 mt-0.5">
              Nama pemilik rekening bank <strong>WAJIB SESUAI</strong> dengan nama identitas KYC yang terdaftar ({verifiedKycName}). Rekening atas nama pihak ketiga akan otomatis ditolak sistem.
            </p>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-4 space-y-3 flex-1 overflow-y-auto text-xs">
          {/* Switch Bank vs E-Wallet */}
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => {
                setAccountCategory('bank');
                setNameVerified(false);
              }}
              className={`py-2 text-center text-xs font-bold border transition-colors flex items-center justify-center gap-1.5 ${
                accountCategory === 'bank'
                  ? 'bg-emerald-800 text-white border-emerald-800'
                  : 'bg-stone-50 text-stone-700 border-stone-300'
              }`}
            >
              <CreditCard className="w-3.5 h-3.5" />
              <span>Rekening Bank</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setAccountCategory('ewallet');
                setNameVerified(false);
              }}
              className={`py-2 text-center text-xs font-bold border transition-colors flex items-center justify-center gap-1.5 ${
                accountCategory === 'ewallet'
                  ? 'bg-emerald-800 text-white border-emerald-800'
                  : 'bg-stone-50 text-stone-700 border-stone-300'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>E-Wallet Digital</span>
            </button>
          </div>

          {/* Pilihan Bank / E-Wallet */}
          <div>
            <label className="text-[11px] font-bold text-stone-800 block mb-1">
              {accountCategory === 'bank' ? 'Pilih Bank Tujuan:' : 'Pilih Layanan E-Wallet:'}
            </label>
            {accountCategory === 'bank' ? (
              <select
                value={selectedBank}
                onChange={(e) => {
                  setSelectedBank(e.target.value);
                  setNameVerified(false);
                }}
                className="w-full px-2.5 py-2 bg-stone-50 border border-stone-300 text-xs font-medium"
              >
                {bankOptions.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            ) : (
              <select
                value={selectedEwallet}
                onChange={(e) => {
                  setSelectedEwallet(e.target.value);
                  setNameVerified(false);
                }}
                className="w-full px-2.5 py-2 bg-stone-50 border border-stone-300 text-xs font-medium"
              >
                {ewalletOptions.map((w) => (
                  <option key={w} value={w}>
                    {w}
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* Nomor Rekening / No HP */}
          <div>
            <label className="text-[11px] font-bold text-stone-800 block mb-1">
              {accountCategory === 'bank' ? 'Nomor Rekening Bank:' : 'Nomor HP Terdaftar E-Wallet:'}
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                required
                placeholder={accountCategory === 'bank' ? 'Contoh: 8821092819' : '0812xxxxxxx'}
                value={accountNumber}
                onChange={(e) => {
                  setAccountNumber(e.target.value);
                  setNameVerified(false);
                }}
                className="flex-1 px-3 py-2 bg-stone-50 border border-stone-300 font-mono text-xs font-bold"
              />
              <button
                type="button"
                onClick={handleVerifyName}
                disabled={isVerifyingName}
                className="px-3 py-2 bg-stone-800 hover:bg-stone-900 text-white font-bold text-xs whitespace-nowrap"
              >
                {isVerifyingName ? 'Mengecek...' : 'Cek Nama'}
              </button>
            </div>
          </div>

          {/* Hasil Cek Nama */}
          {nameVerified && (
            <div className="p-2.5 bg-emerald-50 border border-emerald-300 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                <div>
                  <span className="text-[10px] text-emerald-800 block">Nama Pemilik Valid (Terniva KYC):</span>
                  <span className="font-bold text-stone-900 font-mono">{verifiedKycName}</span>
                </div>
              </div>
              <span className="text-[9px] font-bold bg-emerald-700 text-white px-2 py-0.5">TERVERIFIKASI</span>
            </div>
          )}

          {/* Jadikan Rekening Utama */}
          <label className="flex items-center gap-2 p-2 bg-stone-50 border border-stone-200 cursor-pointer">
            <input
              type="checkbox"
              checked={isPrimary}
              onChange={(e) => setIsPrimary(e.target.checked)}
              className="w-4 h-4 text-emerald-800 rounded-none accent-emerald-800"
            />
            <span className="text-[11px] font-bold text-stone-800">
              Jadikan sebagai rekening utama penarikan saldo penjualan
            </span>
          </label>

          {/* Konfirmasi PIN Keamanan */}
          <div className="pt-2 border-t border-stone-200 space-y-1">
            <label className="text-[11px] font-bold text-stone-800 block">
              Masukkan 6-Digit PIN Transaksi Anda:
            </label>
            <input
              type="password"
              maxLength={6}
              required
              placeholder="••••••"
              value={inputPin}
              onChange={(e) => {
                setInputPin(e.target.value);
                setPinError('');
              }}
              className="w-full px-3 py-2 bg-stone-50 border border-stone-300 font-mono text-center tracking-widest text-sm font-bold"
            />
            {pinError && <p className="text-[10px] text-rose-600 font-bold">{pinError}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs mt-2"
          >
            Hubungkan Rekening Sekarang
          </button>
        </form>
      </div>
    </div>
  );
}

// ============================================================================
// 3. DATA & MODAL DETAIL PENGAJUAN KOMODITAS KE EKSPORTIR
// ============================================================================
export interface ExportSubmissionItem {
  id: string;
  commodityName: string;
  volume: string;
  grade: string;
  targetBuyer: string;
  destinationCountry: string;
  proposedPrice: number;
  totalValue: number;
  submissionDate: string;
  status: 'Menunggu Kurasi' | 'Uji Lab & Phyto' | 'LOI Diterbitkan' | 'Disetujui Ekspor' | 'Pengapalan';
  curatorNotes: string;
  labCertificate?: string;
  contactPerson: string;
}

export const INITIAL_EXPORT_SUBMISSIONS: ExportSubmissionItem[] = [
  {
    id: 'EXP-2025-0089',
    commodityName: 'Kopi Arabika Gayo Green Beans Specialty',
    volume: '1.200 Kg (1.2 Ton)',
    grade: 'Grade 1 Double Picked SCA Score 85.5',
    targetBuyer: 'PT Nusantara Global Exporters (Partner Hamburg)',
    destinationCountry: 'Jerman & Uni Emirat Arab',
    proposedPrice: 135000,
    totalValue: 162000000,
    submissionDate: '10 Maret 2025',
    status: 'LOI Diterbitkan',
    curatorNotes: 'Kadar air lolos 11.8%, aroma fruity konsisten. Draft LOI telah dikirimkan ke eksportir Hamburg, menunggu tanda tangan kontrak final.',
    labCertificate: 'CERT-PHYTO-IPB-88219/2025',
    contactPerson: 'Pak Dimas (Kurator Ekspor Kopi Terniva)',
  },
  {
    id: 'EXP-2025-0072',
    commodityName: 'Vanili Kering Planifolia Gourmet Alor',
    volume: '80 Kg',
    grade: 'Gourmet Grade A (Panjang 18-20cm, Vanillin 2.4%)',
    targetBuyer: 'Rotterdam Spice & Vanilla Trading BV',
    destinationCountry: 'Belanda & Prancis',
    proposedPrice: 3200000,
    totalValue: 256000000,
    submissionDate: '28 Februari 2025',
    status: 'Disetujui Ekspor',
    curatorNotes: 'Lolos uji bebas residu pestisida & jamur aflatoksin. Jadwal muat container berpendingin tanggal 20 Maret 2025 di Pelabuhan Tanjung Priok.',
    labCertificate: 'CERT-ORGANIC-EU-10928/2025',
    contactPerson: 'Ibu Sarah (Spesialis Rempah Ekspor)',
  },
  {
    id: 'EXP-2025-0061',
    commodityName: 'Sarang Burung Walet Bersih (Clean Swiftlet Nest)',
    volume: '5 Kg',
    grade: 'Mangkok Super Clean Grade A (Purity 98%+)',
    targetBuyer: 'China Silk Road Agri Hub & Trading Ltd',
    destinationCountry: 'Tiongkok (Guangzhou)',
    proposedPrice: 22000000,
    totalValue: 110000000,
    submissionDate: '18 Februari 2025',
    status: 'Uji Lab & Phyto',
    curatorNotes: 'Sedang dalam pengujian nitrit di Laboratorium Karantina Pertanian RI untuk memenuhi regulasi GACC China.',
    labCertificate: 'LAB-KARANTINA-RI-77312',
    contactPerson: 'drh. Aryo (Koordinator Sertifikasi Karantina)',
  },
  {
    id: 'EXP-2025-0044',
    commodityName: 'Jahe Gajah Basah Cuci Super',
    volume: '5.000 Kg (5 Ton)',
    grade: 'Grade Export (Bebas Tanah, Rimpang > 150g)',
    targetBuyer: 'Singapore Fresh Produce Pte Ltd',
    destinationCountry: 'Singapura & Malaysia',
    proposedPrice: 15000,
    totalValue: 75000000,
    submissionDate: '02 Februari 2025',
    status: 'Menunggu Kurasi',
    curatorNotes: 'Sampel rimpang dalam proses pengiriman ke Hub Terniva Subang untuk uji sortasi fisik dan kadar pati.',
    contactPerson: 'Tim Kurasi Hortikultura',
  },
];

interface ExportSubmissionDetailModalProps {
  submission: ExportSubmissionItem;
  onClose: () => void;
  onShowToast: (msg: string) => void;
}

export function ExportSubmissionDetailModal({
  submission,
  onClose,
  onShowToast,
}: ExportSubmissionDetailModalProps) {
  const getStatusBadge = (st: ExportSubmissionItem['status']) => {
    switch (st) {
      case 'Disetujui Ekspor':
      case 'Pengapalan':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'LOI Diterbitkan':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'Uji Lab & Phyto':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      default:
        return 'bg-stone-100 text-stone-700 border-stone-300';
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="w-full max-w-[420px] bg-white text-stone-900 max-h-[92vh] flex flex-col shadow-2xl border border-stone-300">
        {/* Header */}
        <div className="p-3 bg-emerald-900 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-emerald-300" />
            <div>
              <h4 className="text-xs font-bold">Rincian Pengajuan Komoditas Ekspor</h4>
              <span className="text-[10px] text-emerald-200 font-mono">{submission.id}</span>
            </div>
          </div>
          <button onClick={onClose} className="p-1 text-white/80 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-3.5 flex-1 overflow-y-auto text-xs">
          {/* Status Banner */}
          <div className="p-3 bg-stone-50 border border-stone-200 flex items-center justify-between">
            <div>
              <span className="text-[10px] text-stone-500 block">Status Tahapan Ekspor:</span>
              <span className="font-bold text-stone-900">{submission.status}</span>
            </div>
            <span className={`px-2 py-0.5 text-[10px] font-bold border ${getStatusBadge(submission.status)}`}>
              {submission.status}
            </span>
          </div>

          {/* Stepper Progress */}
          <div className="p-3 bg-stone-50 border border-stone-200 space-y-2">
            <div className="text-[10px] font-bold text-stone-700 uppercase">Progres Alur Ekspor:</div>
            <div className="grid grid-cols-4 gap-1 text-[9px] text-center font-bold">
              <div className="p-1 bg-emerald-800 text-white">1. Kurasi</div>
              <div
                className={`p-1 ${
                  submission.status !== 'Menunggu Kurasi' ? 'bg-emerald-800 text-white' : 'bg-stone-200 text-stone-500'
                }`}
              >
                2. Uji Lab
              </div>
              <div
                className={`p-1 ${
                  submission.status === 'LOI Diterbitkan' || submission.status === 'Disetujui Ekspor' || submission.status === 'Pengapalan'
                    ? 'bg-emerald-800 text-white'
                    : 'bg-stone-200 text-stone-500'
                }`}
              >
                3. LOI / Kontrak
              </div>
              <div
                className={`p-1 ${
                  submission.status === 'Disetujui Ekspor' || submission.status === 'Pengapalan'
                    ? 'bg-emerald-800 text-white'
                    : 'bg-stone-200 text-stone-500'
                }`}
              >
                4. Kapal
              </div>
            </div>
          </div>

          {/* Detail Komoditas */}
          <div className="p-3 bg-white border border-stone-200 space-y-2">
            <div className="text-[10px] font-bold text-emerald-800 uppercase">Spesifikasi Komoditas:</div>
            <div className="font-bold text-sm text-stone-900">{submission.commodityName}</div>
            <div className="grid grid-cols-2 gap-2 text-[11px] pt-1 border-t border-stone-100">
              <div>
                <span className="text-stone-500 block">Volume Diajukan:</span>
                <span className="font-bold text-stone-900 font-mono">{submission.volume}</span>
              </div>
              <div>
                <span className="text-stone-500 block">Estimasi Nilai Kontrak:</span>
                <span className="font-bold text-emerald-800 font-mono">
                  Rp {submission.totalValue.toLocaleString('id-ID')}
                </span>
              </div>
            </div>
            <div className="pt-1 border-t border-stone-100 text-[11px]">
              <span className="text-stone-500 block">Grade Kualitas:</span>
              <span className="font-medium text-stone-800">{submission.grade}</span>
            </div>
          </div>

          {/* Buyer & Eksportir */}
          <div className="p-3 bg-white border border-stone-200 space-y-1.5">
            <div className="text-[10px] font-bold text-emerald-800 uppercase">Mitra Eksportir & Negara Tujuan:</div>
            <div className="font-bold text-stone-900">{submission.targetBuyer}</div>
            <div className="text-stone-600 flex items-center gap-1.5 text-[11px]">
              <Globe className="w-3.5 h-3.5 text-stone-400" />
              <span>Negara Buyer: {submission.destinationCountry}</span>
            </div>
            <div className="text-stone-600 text-[11px] font-mono">
              Diajukan pada: {submission.submissionDate}
            </div>
          </div>

          {/* Catatan Kurator Ekspor */}
          <div className="p-3 bg-emerald-50 border border-emerald-200 space-y-1">
            <div className="text-[10px] font-bold text-emerald-900 uppercase">Notulen Tim Kurator Ekspor:</div>
            <p className="text-[11px] text-emerald-950 leading-relaxed">{submission.curatorNotes}</p>
            {submission.labCertificate && (
              <div className="text-[10px] text-emerald-800 font-mono mt-1">
                No. Sertifikat Lab: <strong>{submission.labCertificate}</strong>
              </div>
            )}
          </div>

          {/* Hubungi Kurator PIC */}
          <div className="p-2.5 bg-stone-50 border border-stone-200 flex items-center justify-between">
            <div>
              <span className="text-[10px] text-stone-500 block">PIC Pendamping Ekspor:</span>
              <span className="font-bold text-stone-900">{submission.contactPerson}</span>
            </div>
            <button
              onClick={() => onShowToast(`Menghubungi ${submission.contactPerson} via WhatsApp Ekspor...`)}
              className="px-2.5 py-1.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-[10px] flex items-center gap-1"
            >
              <Phone className="w-3 h-3" />
              <span>Chat PIC</span>
            </button>
          </div>
        </div>

        {/* Action Bottom */}
        <div className="p-3 bg-stone-50 border-t border-stone-200 flex gap-2">
          <button
            onClick={() => {
              onShowToast(`Draft Kontrak Ekspor ${submission.id} berhasil diunduh (PDF)!`);
            }}
            className="flex-1 py-2 bg-white border border-stone-300 hover:bg-stone-100 text-stone-800 font-bold text-xs flex items-center justify-center gap-1"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Unduh Dokumen Ekspor</span>
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 4. MODAL AJUKAN KOMODITAS BARU KE EKSPORTIR
// ============================================================================
interface NewExportSubmissionModalProps {
  onClose: () => void;
  onSubmitNew: (newItem: ExportSubmissionItem) => void;
  onShowToast: (msg: string) => void;
}

export function NewExportSubmissionModal({
  onClose,
  onSubmitNew,
  onShowToast,
}: NewExportSubmissionModalProps) {
  const [commodity, setCommodity] = useState('Kopi Arabika Gayo Specialty');
  const [volumeKg, setVolumeKg] = useState('1000');
  const [grade, setGrade] = useState('Grade 1 Double Picked');
  const [expectedPricePerKg, setExpectedPricePerKg] = useState('135000');
  const [targetDestination, setTargetDestination] = useState('Eropa / Jerman');
  const [notes, setNotes] = useState('');
  const [hasPhoto, setHasPhoto] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const volNum = parseInt(volumeKg, 10) || 500;
    const priceNum = parseInt(expectedPricePerKg, 10) || 100000;
    const totalVal = volNum * priceNum;

    const newItem: ExportSubmissionItem = {
      id: `EXP-2025-${Math.floor(1000 + Math.random() * 9000)}`,
      commodityName: commodity,
      volume: `${volNum.toLocaleString('id-ID')} Kg (${(volNum / 1000).toFixed(1)} Ton)`,
      grade,
      targetBuyer: `Mitra Eksportir Internasional (${targetDestination})`,
      destinationCountry: targetDestination,
      proposedPrice: priceNum,
      totalValue: totalVal,
      submissionDate: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
      status: 'Menunggu Kurasi',
      curatorNotes: 'Komoditas baru diajukan oleh mitra petani. Tim kurasi Terniva akan menghubungi dalam 1x24 jam untuk pengambilan sampel mutu.',
      contactPerson: 'Tim Kurasi Ekspor Terniva Hub',
    };

    onSubmitNew(newItem);
    onShowToast(`Pengajuan ${commodity} senilai Rp ${totalVal.toLocaleString('id-ID')} berhasil diajukan!`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="w-full max-w-[420px] bg-white text-stone-900 max-h-[92vh] flex flex-col shadow-2xl border border-stone-300">
        {/* Header */}
        <div className="p-3 bg-emerald-900 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-emerald-300" />
            <h4 className="text-xs font-bold">Ajukan Komoditas Panen ke Eksportir</h4>
          </div>
          <button onClick={onClose} className="p-1 text-white/80 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-4 space-y-3 flex-1 overflow-y-auto text-xs">
          <div>
            <label className="text-[11px] font-bold text-stone-800 block mb-1">Pilih Komoditas Unggulan:</label>
            <select
              value={commodity}
              onChange={(e) => setCommodity(e.target.value)}
              className="w-full px-2.5 py-2 bg-stone-50 border border-stone-300 text-xs font-medium"
            >
              <option value="Kopi Arabika Gayo Specialty">Kopi Arabika Gayo Specialty</option>
              <option value="Vanili Kering Planifolia Gourmet">Vanili Kering Planifolia Gourmet</option>
              <option value="Sarang Burung Walet Super Clean">Sarang Burung Walet Super Clean</option>
              <option value="Jahe Gajah Basah Cuci Super">Jahe Gajah Basah Cuci Super</option>
              <option value="Kunyit Organik Kadar Kurkumin Tinggi">Kunyit Organik Kadar Kurkumin Tinggi</option>
              <option value="Cengkeh Abimanyu Super Kering">Cengkeh Abimanyu Super Kering</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[11px] font-bold text-stone-800 block mb-1">Volume Panen (Kg):</label>
              <input
                type="number"
                required
                min={50}
                value={volumeKg}
                onChange={(e) => setVolumeKg(e.target.value)}
                className="w-full px-2.5 py-2 bg-stone-50 border border-stone-300 font-mono text-xs font-bold"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-stone-800 block mb-1">Ekspektasi Harga/Kg (Rp):</label>
              <input
                type="number"
                required
                min={1000}
                value={expectedPricePerKg}
                onChange={(e) => setExpectedPricePerKg(e.target.value)}
                className="w-full px-2.5 py-2 bg-stone-50 border border-stone-300 font-mono text-xs font-bold text-emerald-800"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[11px] font-bold text-stone-800 block mb-1">Grade Kualitas:</label>
              <input
                type="text"
                required
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                className="w-full px-2.5 py-2 bg-stone-50 border border-stone-300 text-xs font-medium"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-stone-800 block mb-1">Target Pasar Buyer:</label>
              <select
                value={targetDestination}
                onChange={(e) => setTargetDestination(e.target.value)}
                className="w-full px-2 py-2 bg-stone-50 border border-stone-300 text-xs font-medium"
              >
                <option value="Eropa (Jerman / Belanda)">Eropa (Jerman / Belanda)</option>
                <option value="Tiongkok & Hong Kong">Tiongkok & Hong Kong</option>
                <option value="Singapura & Malaysia">Singapura & Malaysia</option>
                <option value="Timur Tengah (Dubai / Arab Saudi)">Timur Tengah (Dubai / Arab Saudi)</option>
                <option value="Amerika Serikat">Amerika Serikat</option>
              </select>
            </div>
          </div>

          {/* Upload Foto Sampel Panen */}
          <div>
            <label className="text-[11px] font-bold text-stone-800 block mb-1">Foto Sampel Fisik Komoditas:</label>
            <div
              onClick={() => {
                setHasPhoto(!hasPhoto);
                onShowToast(hasPhoto ? 'Foto dihapus' : 'Foto sampel komoditas berhasil diunggah!');
              }}
              className="p-3 border border-dashed border-stone-300 hover:border-emerald-700 bg-stone-50 text-center cursor-pointer transition-colors"
            >
              {hasPhoto ? (
                <div className="flex items-center justify-center gap-2 text-emerald-800 font-bold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  <span>Foto Sampel Lolos Verifikasi Awal (Klik untuk ganti)</span>
                </div>
              ) : (
                <div className="space-y-1">
                  <Upload className="w-5 h-5 mx-auto text-stone-400" />
                  <span className="text-[11px] text-stone-600 block">
                    Klik untuk upload foto sampel rimpang/biji/sarang
                  </span>
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="text-[11px] font-bold text-stone-800 block mb-1">Catatan Tambahan (Kadar Air/Proses):</label>
            <textarea
              rows={2}
              placeholder="Contoh: Proses full wash, kadar air 12%, dipanen pada ketinggian 1.500 mdpl."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-2.5 py-2 bg-stone-50 border border-stone-300 text-xs font-medium"
            />
          </div>

          <div className="p-2.5 bg-emerald-50 border border-emerald-200 text-[11px] text-emerald-900 leading-snug">
            Estimasi Nilai Total Pengajuan:{' '}
            <strong className="font-mono text-emerald-800 text-xs">
              Rp {((parseInt(volumeKg, 10) || 0) * (parseInt(expectedPricePerKg, 10) || 0)).toLocaleString('id-ID')}
            </strong>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs"
          >
            Kirimkan Pengajuan ke Eksportir
          </button>
        </form>
      </div>
    </div>
  );
}
