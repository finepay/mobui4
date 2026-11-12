import React, { useState } from 'react';
import {
  X,
  Lock,
  KeyRound,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  Eye,
  EyeOff,
  Smartphone,
  Mail,
  FileText,
  Clock,
  Sparkles,
  Camera,
  ArrowRight,
  RefreshCw,
  Info,
} from 'lucide-react';

// =========================================================================
// 1. UBAH PIN TERNIVAPAY (CHANGE PIN MODAL)
// =========================================================================
interface ChangePinModalProps {
  currentPin: string;
  onClose: () => void;
  onSuccess: (newPin: string) => void;
  onShowToast: (msg: string) => void;
}

export const ChangePinModal: React.FC<ChangePinModalProps> = ({
  currentPin,
  onClose,
  onSuccess,
  onShowToast,
}) => {
  // Step 1: Input Old PIN -> Step 2: Input New PIN -> Step 3: Confirm New PIN
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [oldPin, setOldPin] = useState(['', '', '', '', '', '']);
  const [newPin, setNewPin] = useState(['', '', '', '', '', '']);
  const [confirmPin, setConfirmPin] = useState(['', '', '', '', '', '']);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isForgotPinOpen, setIsForgotPinOpen] = useState(false);

  const handlePinInput = (
    val: string,
    index: number,
    pinArr: string[],
    setPinArr: React.Dispatch<React.SetStateAction<string[]>>,
    inputPrefix: string
  ) => {
    if (!/^\d*$/.test(val)) return;
    const updated = [...pinArr];
    updated[index] = val.slice(-1);
    setPinArr(updated);
    setErrorMsg('');

    if (val && index < 5) {
      document.getElementById(`${inputPrefix}-${index + 1}`)?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
    pinArr: string[],
    inputPrefix: string
  ) => {
    if (e.key === 'Backspace' && !pinArr[index] && index > 0) {
      document.getElementById(`${inputPrefix}-${index - 1}`)?.focus();
    }
  };

  // Step 1: Validate Old PIN
  const handleVerifyOldPin = (e: React.FormEvent) => {
    e.preventDefault();
    const entered = oldPin.join('');
    if (entered.length < 6) {
      setErrorMsg('PIN harus terdiri dari 6 digit angka.');
      return;
    }
    // Verify against currentPin (default "123456" if not set)
    if (entered !== currentPin && entered !== '123456') {
      setErrorMsg('PIN lama yang Anda masukkan tidak sesuai. Coba lagi.');
      return;
    }

    setStep(2);
    setErrorMsg('');
  };

  // Step 2: Validate New PIN rules
  const handleValidateNewPin = (e: React.FormEvent) => {
    e.preventDefault();
    const entered = newPin.join('');
    if (entered.length < 6) {
      setErrorMsg('PIN baru harus 6 digit angka.');
      return;
    }

    // Anti-fraud checks: block sequential or repeated pins
    if (/^(\d)\1{5}$/.test(entered)) {
      setErrorMsg('PIN terlalu mudah ditebak! Jangan gunakan angka berulang (misal: 111111).');
      return;
    }
    if (entered === '123456' || entered === '654321' || entered === '012345') {
      setErrorMsg('PIN terlalu mudah ditebak! Jangan gunakan angka berurutan.');
      return;
    }

    setStep(3);
    setErrorMsg('');
  };

  // Step 3: Confirm & Save
  const handleConfirmNewPin = (e: React.FormEvent) => {
    e.preventDefault();
    const enteredConfirm = confirmPin.join('');
    const enteredNew = newPin.join('');

    if (enteredConfirm !== enteredNew) {
      setErrorMsg('Konfirmasi PIN tidak cocok dengan PIN baru.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onSuccess(enteredNew);
      onShowToast('PIN TernivaPay 6-digit berhasil diperbarui!');
      onClose();
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 flex items-end sm:items-center justify-center p-0 sm:p-4 select-none">
      <div className="w-full max-w-[412px] bg-white text-stone-900 max-h-[90vh] flex flex-col shadow-2xl border border-stone-300 animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-3.5 bg-emerald-900 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <KeyRound className="w-4 h-4 text-emerald-300" />
            <h4 className="text-xs font-bold uppercase tracking-wider">Ubah PIN TernivaPay</h4>
          </div>
          <button onClick={onClose} className="p-1 text-white/80 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 flex-1 overflow-y-auto space-y-4 text-xs bg-stone-50">
          {/* Step Indicator */}
          <div className="flex items-center justify-between text-[11px] pb-2 border-b border-stone-200">
            <span className="font-bold text-stone-800">
              {step === 1 && 'Langkah 1: Verifikasi PIN Lama'}
              {step === 2 && 'Langkah 2: Buat PIN Baru'}
              {step === 3 && 'Langkah 3: Konfirmasi Ulang PIN'}
            </span>
            <span className="font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5">
              {step} dari 3
            </span>
          </div>

          {/* Security Alert Banner */}
          <div className="p-2.5 bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
            <p className="text-[11px] leading-snug">
              PIN 6 digit melindungi seluruh transaksi belanja, pembayaran pesanan kargo, dan penarikan saldo TernivaPay.
            </p>
          </div>

          {/* Error Message */}
          {errorMsg && (
            <div className="p-2.5 bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* STEP 1: Old PIN */}
          {step === 1 && (
            <form onSubmit={handleVerifyOldPin} className="space-y-4 pt-1">
              <div className="text-center space-y-1">
                <p className="font-bold text-stone-800 text-sm">Masukkan PIN TernivaPay Saat Ini</p>
                <p className="text-[11px] text-stone-500">
                  Untuk keamanan akun, silakan verifikasi PIN Anda terlebih dahulu.
                </p>
              </div>

              {/* 6 Digit Input Boxes */}
              <div className="flex justify-center gap-2 py-2">
                {oldPin.map((digit, idx) => (
                  <input
                    key={idx}
                    id={`oldpin-${idx}`}
                    type="password"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handlePinInput(e.target.value, idx, oldPin, setOldPin, 'oldpin')}
                    onKeyDown={(e) => handleKeyDown(e, idx, oldPin, 'oldpin')}
                    className="w-10 h-11 text-center font-mono text-lg font-bold border-2 border-stone-300 focus:border-emerald-700 bg-white focus:outline-hidden"
                  />
                ))}
              </div>

              <div className="flex justify-between items-center text-[11px]">
                <button
                  type="button"
                  onClick={() => setOldPin(['1', '2', '3', '4', '5', '6'])}
                  className="text-emerald-800 font-bold hover:underline"
                >
                  (Demo: Isi PIN Lama 123456)
                </button>
                <button
                  type="button"
                  onClick={() => setIsForgotPinOpen(true)}
                  className="text-rose-700 font-semibold hover:underline"
                >
                  Lupa PIN?
                </button>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs uppercase tracking-wider"
              >
                Lanjutkan
              </button>
            </form>
          )}

          {/* STEP 2: New PIN */}
          {step === 2 && (
            <form onSubmit={handleValidateNewPin} className="space-y-4 pt-1">
              <div className="text-center space-y-1">
                <p className="font-bold text-stone-800 text-sm">Masukkan 6 Digit PIN Baru</p>
                <p className="text-[11px] text-stone-500">
                  Hindari kombinasi tanggal lahir, angka kembar (111111), atau berurutan (123456).
                </p>
              </div>

              <div className="flex justify-center gap-2 py-2">
                {newPin.map((digit, idx) => (
                  <input
                    key={idx}
                    id={`newpin-${idx}`}
                    type="password"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handlePinInput(e.target.value, idx, newPin, setNewPin, 'newpin')}
                    onKeyDown={(e) => handleKeyDown(e, idx, newPin, 'newpin')}
                    className="w-10 h-11 text-center font-mono text-lg font-bold border-2 border-stone-300 focus:border-emerald-700 bg-white focus:outline-hidden"
                  />
                ))}
              </div>

              <div className="p-2.5 bg-stone-100 border border-stone-200 text-[10px] space-y-1 text-stone-600">
                <p className="font-bold text-stone-700">Tips Keamanan PIN:</p>
                <p>• Jangan bagikan PIN kepada siapapun, termasuk staf resmi Terniva.</p>
                <p>• Gunakan kombinasi angka acak yang mudah Anda ingat sendiri.</p>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-1/3 py-2.5 border border-stone-300 text-stone-700 font-bold text-xs"
                >
                  Kembali
                </button>
                <button
                  type="submit"
                  className="w-2/3 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs uppercase tracking-wider"
                >
                  Konfirmasi PIN
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: Confirm PIN */}
          {step === 3 && (
            <form onSubmit={handleConfirmNewPin} className="space-y-4 pt-1">
              <div className="text-center space-y-1">
                <p className="font-bold text-stone-800 text-sm">Masukkan Sekali Lagi PIN Baru</p>
                <p className="text-[11px] text-stone-500">
                  Ketik ulang 6 digit PIN baru untuk memastikan tidak ada kesalahan input.
                </p>
              </div>

              <div className="flex justify-center gap-2 py-2">
                {confirmPin.map((digit, idx) => (
                  <input
                    key={idx}
                    id={`confirmpin-${idx}`}
                    type="password"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handlePinInput(e.target.value, idx, confirmPin, setConfirmPin, 'confirmpin')}
                    onKeyDown={(e) => handleKeyDown(e, idx, confirmPin, 'confirmpin')}
                    className="w-10 h-11 text-center font-mono text-lg font-bold border-2 border-stone-300 focus:border-emerald-700 bg-white focus:outline-hidden"
                  />
                ))}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs uppercase tracking-wider disabled:opacity-75 flex items-center justify-center gap-1.5"
              >
                {isSubmitting ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Menyimpan PIN Baru...</span>
                  </>
                ) : (
                  'Simpan & Aktifkan PIN Baru'
                )}
              </button>
            </form>
          )}
        </div>

        {/* FORGOT PIN MODAL DIALOG */}
        {isForgotPinOpen && (
          <div className="fixed inset-0 z-60 bg-black/80 flex items-center justify-center p-4">
            <div className="bg-white p-4 max-w-xs w-full shadow-2xl border border-stone-300 space-y-3 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-stone-200">
                <span className="font-bold text-stone-900">Pemulihan Lupa PIN</span>
                <button onClick={() => setIsForgotPinOpen(false)} className="text-stone-500 hover:text-stone-800">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <p className="text-stone-600 leading-snug">
                Kode pemulihan OTP 6-digit akan dikirimkan melalui SMS ke nomor handphone terdaftar Anda:
                <strong className="block text-stone-900 mt-1">+62 812-3456-7890</strong>
              </p>
              <div className="flex gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setIsForgotPinOpen(false)}
                  className="w-1/2 py-2 border border-stone-300 text-stone-700 font-bold"
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsForgotPinOpen(false);
                    onShowToast('Kode OTP pemulihan PIN dikirim ke 081234567890 (Gunakan demo: 123456)');
                    setStep(2);
                  }}
                  className="w-1/2 py-2 bg-emerald-800 text-white font-bold"
                >
                  Kirim OTP SMS
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// =========================================================================
// 2. UBAH KATA SANDI (CHANGE PASSWORD MODAL)
// =========================================================================
interface ChangePasswordModalProps {
  onClose: () => void;
  onSuccess: () => void;
  onShowToast: (msg: string) => void;
}

export const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({
  onClose,
  onSuccess,
  onShowToast,
}) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [logoutOtherDevices, setLogoutOtherDevices] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Criteria validation
  const hasMinLength = newPassword.length >= 8 && newPassword.length <= 20;
  const hasUpper = /[A-Z]/.test(newPassword);
  const hasLower = /[a-z]/.test(newPassword);
  const hasNumber = /[0-9]/.test(newPassword);
  const isMatch = newPassword === confirmPassword && newPassword.length > 0;
  const isAllValid = hasMinLength && hasUpper && hasLower && hasNumber && isMatch;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!oldPassword) {
      setErrorMsg('Silakan masukkan kata sandi Anda saat ini.');
      return;
    }
    if (!isAllValid) {
      setErrorMsg('Kata sandi baru belum memenuhi kriteria keamanan atau konfirmasi tidak cocok.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onSuccess();
      onShowToast(
        logoutOtherDevices
          ? 'Kata sandi berhasil diperbarui & sesi perangkat lain telah dikeluarkan!'
          : 'Kata sandi berhasil diperbarui!'
      );
      onClose();
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 flex items-end sm:items-center justify-center p-0 sm:p-4 select-none">
      <div className="w-full max-w-[412px] bg-white text-stone-900 max-h-[90vh] flex flex-col shadow-2xl border border-stone-300 animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-3.5 bg-emerald-900 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-emerald-300" />
            <h4 className="text-xs font-bold uppercase tracking-wider">Ubah Kata Sandi Akun</h4>
          </div>
          <button onClick={onClose} className="p-1 text-white/80 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Form */}
        <form onSubmit={handleSubmit} className="p-4 flex-1 overflow-y-auto space-y-3.5 text-xs bg-stone-50">
          {/* Security Alert Banner */}
          <div className="p-2.5 bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
            <p className="text-[11px] leading-snug">
              Buat kata sandi yang unik dan kuat untuk melindungi akun peternak/pembeli Anda dari percobaan akses tidak sah.
            </p>
          </div>

          {errorMsg && (
            <div className="p-2.5 bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Current Password */}
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="text-[11px] font-bold text-stone-800">
                Kata Sandi Saat Ini
              </label>
              <button
                type="button"
                onClick={() => setOldPassword('Terniva123!')}
                className="text-[10px] text-emerald-800 font-bold hover:underline"
              >
                (Demo: Isi Sandi Saat Ini)
              </button>
            </div>
            <div className="relative">
              <input
                type={showOld ? 'text' : 'password'}
                required
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                placeholder="Masukkan kata sandi lama"
                className="w-full pl-3 pr-9 py-2 bg-white border border-stone-300 text-xs font-medium focus:border-emerald-700 focus:outline-hidden"
              />
              <button
                type="button"
                onClick={() => setShowOld(!showOld)}
                className="absolute right-2.5 top-2.5 text-stone-400 hover:text-stone-600"
              >
                {showOld ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-stone-800">
              Kata Sandi Baru
            </label>
            <div className="relative">
              <input
                type={showNew ? 'text' : 'password'}
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Minimal 8 karakter kombinasi"
                className="w-full pl-3 pr-9 py-2 bg-white border border-stone-300 text-xs font-medium focus:border-emerald-700 focus:outline-hidden"
              />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute right-2.5 top-2.5 text-stone-400 hover:text-stone-600"
              >
                {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Password Strength Checklist */}
          <div className="p-3 bg-white border border-stone-200 text-[11px] space-y-1.5 text-stone-600">
            <p className="font-bold text-stone-800 text-[10px] uppercase tracking-wide">
              Kriteria Keamanan Kata Sandi:
            </p>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className={`w-3.5 h-3.5 ${hasMinLength ? 'text-emerald-600' : 'text-stone-300'}`} />
              <span className={hasMinLength ? 'text-emerald-700 font-bold' : ''}>
                Panjang 8 - 20 karakter
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className={`w-3.5 h-3.5 ${hasUpper && hasLower ? 'text-emerald-600' : 'text-stone-300'}`} />
              <span className={hasUpper && hasLower ? 'text-emerald-700 font-bold' : ''}>
                Kombinasi huruf besar (A-Z) dan huruf kecil (a-z)
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className={`w-3.5 h-3.5 ${hasNumber ? 'text-emerald-600' : 'text-stone-300'}`} />
              <span className={hasNumber ? 'text-emerald-700 font-bold' : ''}>
                Mengandung setidaknya 1 angka (0-9)
              </span>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-stone-800">
              Konfirmasi Kata Sandi Baru
            </label>
            <div className="relative">
              <input
                type={showConfirm ? 'text' : 'password'}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Ulangi kata sandi baru"
                className="w-full pl-3 pr-9 py-2 bg-white border border-stone-300 text-xs font-medium focus:border-emerald-700 focus:outline-hidden"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-2.5 top-2.5 text-stone-400 hover:text-stone-600"
              >
                {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Security checkbox */}
          <label className="flex items-start gap-2 pt-1 cursor-pointer">
            <input
              type="checkbox"
              checked={logoutOtherDevices}
              onChange={(e) => setLogoutOtherDevices(e.target.checked)}
              className="mt-0.5 accent-emerald-800"
            />
            <span className="text-[11px] text-stone-600 leading-tight">
              Keluarkan akun secara otomatis dari semua perangkat dan peramban web lain demi mencegah akses ilegal.
            </span>
          </label>

          <button
            type="submit"
            disabled={isSubmitting || !isAllValid}
            className="w-full py-2.5 bg-emerald-800 hover:bg-emerald-900 active:scale-[0.99] text-white font-bold text-xs uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed mt-2"
          >
            {isSubmitting ? 'Memperbarui Kata Sandi...' : 'SIMPAN KATA SANDI BARU'}
          </button>
        </form>
      </div>
    </div>
  );
};

// =========================================================================
// 3. EDIT PENGGUNA AMAN & ANTI-KECURANGAN (SECURE PROFILE EDIT MODAL)
// =========================================================================
interface SecureEditProfileModalProps {
  profileData: {
    name: string;
    businessName: string;
    phone: string;
    email: string;
    memberId: string;
    joinDate: string;
  };
  onClose: () => void;
  onSaveProfile: (updated: { businessName: string; phone: string; email: string }) => void;
  onShowToast: (msg: string) => void;
}

export const SecureEditProfileModal: React.FC<SecureEditProfileModalProps> = ({
  profileData,
  onClose,
  onSaveProfile,
  onShowToast,
}) => {
  // Form fields
  const [businessName, setBusinessName] = useState(profileData.businessName);
  const [phone, setPhone] = useState(profileData.phone);
  const [email, setEmail] = useState(profileData.email);

  // Security Verification State
  const [isVerifyingPin, setIsVerifyingPin] = useState(false);
  const [pinInput, setPinInput] = useState(['', '', '', '', '', '']);
  const [pinError, setPinError] = useState('');
  const [isKycModalOpen, setIsKycModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Check if sensitive fields changed
  const isPhoneChanged = phone !== profileData.phone;
  const isEmailChanged = email !== profileData.email;
  const isBusinessChanged = businessName !== profileData.businessName;
  const hasAnyChanges = isPhoneChanged || isEmailChanged || isBusinessChanged;

  const handleInitialSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!hasAnyChanges) {
      onShowToast('Tidak ada perubahan data profil.');
      onClose();
      return;
    }

    // Require PIN Verification before saving sensitive changes!
    setIsVerifyingPin(true);
    setPinError('');
  };

  const handleConfirmPin = (e: React.FormEvent) => {
    e.preventDefault();
    const entered = pinInput.join('');
    if (entered.length < 6) {
      setPinError('Masukkan 6 digit PIN Keamanan.');
      return;
    }

    // Validate PIN (accepts 123456 or any 6 digits for demo)
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsVerifyingPin(false);
      onSaveProfile({ businessName, phone, email });
      onShowToast(
        isPhoneChanged
          ? 'Profil diperbarui! Penarikan dana dibekukan 24 jam demi keamanan akun.'
          : 'Profil usaha & kontak berhasil diperbarui dengan aman!'
      );
      onClose();
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 flex items-end sm:items-center justify-center p-0 sm:p-4 select-none">
      <div className="w-full max-w-[412px] bg-white text-stone-900 max-h-[90vh] flex flex-col shadow-2xl border border-stone-300 animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-3.5 bg-emerald-900 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-300" />
            <h4 className="text-xs font-bold uppercase tracking-wider">Edit Profil Terverifikasi</h4>
          </div>
          <button onClick={onClose} className="p-1 text-white/80 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 flex-1 overflow-y-auto space-y-4 text-xs bg-stone-50">
          {/* KYC Status Badge */}
          <div className="p-3 bg-white border border-emerald-300 shadow-2xs space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-stone-500 uppercase tracking-wider font-bold">Status Verifikasi Legal:</span>
              <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 border border-emerald-300 px-2 py-0.5 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-700" />
                KYC Terverifikasi KTP (Dukcapil)
              </span>
            </div>
            <div className="text-[11px] text-stone-600">
              Identitas hukum akun ini telah divalidasi resmi. Nama hukum tidak dapat diubah sembarangan demi mencegah akun fiktif & penipuan transaksi.
            </div>
          </div>

          <form onSubmit={handleInitialSave} className="space-y-3.5">
            {/* LOCKED FIELD 1: Legal Name (KTP Verified) */}
            <div className="bg-white p-3 border border-stone-200 space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-bold text-stone-800 flex items-center gap-1">
                  <Lock className="w-3.5 h-3.5 text-stone-400" />
                  <span>Nama Lengkap (Sesuai E-KTP)</span>
                </label>
                <span className="text-[10px] text-stone-400 font-semibold bg-stone-100 px-1.5 py-0.2">
                  Terkunci
                </span>
              </div>
              <input
                type="text"
                disabled
                value={profileData.name}
                className="w-full px-3 py-2 bg-stone-100 text-stone-600 border border-stone-200 font-bold cursor-not-allowed select-none"
              />
              <div className="flex justify-between items-center pt-1 text-[10px]">
                <span className="text-stone-500">ID Member: {profileData.memberId}</span>
                <button
                  type="button"
                  onClick={() => setIsKycModalOpen(true)}
                  className="text-emerald-800 font-bold hover:underline flex items-center gap-0.5"
                >
                  <span>Ajukan Ganti Nama KTP</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* RESTRICTED FIELD 2: Business / Farm Name */}
            <div className="bg-white p-3 border border-stone-200 space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-bold text-stone-800">
                  Nama Usaha / Peternakan / Restoran:
                </label>
                <span className="text-[9px] text-amber-800 bg-amber-50 border border-amber-200 px-1.5 py-0.2 font-semibold">
                  Maks. 1x / 30 Hari
                </span>
              </div>
              <input
                type="text"
                required
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                placeholder="Nama unit bisnis Anda"
                className="w-full px-3 py-2 bg-stone-50 border border-stone-300 font-medium focus:bg-white focus:border-emerald-700 focus:outline-hidden"
              />
              <p className="text-[10px] text-stone-500">
                Nama ini akan tertera pada faktur transaksi kargo dan nota kemitraan panen.
              </p>
            </div>

            {/* SENSITIVE FIELD 3: Phone Number */}
            <div className="bg-white p-3 border border-stone-200 space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-bold text-stone-800 flex items-center gap-1">
                  <Smartphone className="w-3.5 h-3.5 text-stone-500" />
                  <span>Nomor WhatsApp / HP Terdaftar:</span>
                </label>
                {isPhoneChanged && (
                  <span className="text-[9px] text-rose-700 bg-rose-50 border border-rose-200 px-1.5 py-0.2 font-bold animate-pulse">
                    Verifikasi PIN Wajib
                  </span>
                )}
              </div>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-300 font-mono font-medium focus:bg-white focus:border-emerald-700 focus:outline-hidden"
              />
              {isPhoneChanged && (
                <div className="p-2 bg-rose-50 border border-rose-200 text-rose-800 text-[10px] leading-snug">
                  ⚠️ <strong>Kebijakan Anti-Fraud:</strong> Penggantian nomor HP akan memicu pembekuan penarikan saldo TernivaPay selama 24 jam untuk mencegah pencurian dana oleh pihak ketiga.
                </div>
              )}
            </div>

            {/* SENSITIVE FIELD 4: Email */}
            <div className="bg-white p-3 border border-stone-200 space-y-1.5">
              <label className="text-[11px] font-bold text-stone-800 flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-stone-500" />
                <span>Email Resmi Akun:</span>
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-300 font-medium focus:bg-white focus:border-emerald-700 focus:outline-hidden"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-sm cursor-pointer mt-2"
            >
              Simpan & Verifikasi PIN Keamanan
            </button>
          </form>
        </div>

        {/* SECURITY PIN VERIFICATION OVERLAY GATE */}
        {isVerifyingPin && (
          <div className="fixed inset-0 z-60 bg-black/80 flex items-center justify-center p-4">
            <div className="bg-white p-4 max-w-xs w-full shadow-2xl border border-stone-300 space-y-3.5 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-stone-200">
                <div className="flex items-center gap-1.5 font-bold text-stone-900">
                  <KeyRound className="w-4 h-4 text-emerald-800" />
                  <span>Otorisasi PIN Keamanan</span>
                </div>
                <button onClick={() => setIsVerifyingPin(false)} className="text-stone-500 hover:text-stone-800">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <p className="text-[11px] text-stone-600 leading-snug">
                Konfirmasi perubahan profil Anda dengan memasukkan 6 digit PIN TernivaPay:
              </p>

              {pinError && (
                <div className="p-2 bg-rose-50 border border-rose-200 text-rose-700 text-[10px]">
                  {pinError}
                </div>
              )}

              {/* 6 Digit Input */}
              <div className="flex justify-center gap-1.5 py-1">
                {pinInput.map((digit, idx) => (
                  <input
                    key={idx}
                    id={`authpin-${idx}`}
                    type="password"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, '');
                      const updated = [...pinInput];
                      updated[idx] = val.slice(-1);
                      setPinInput(updated);
                      if (val && idx < 5) {
                        document.getElementById(`authpin-${idx + 1}`)?.focus();
                      }
                    }}
                    className="w-9 h-10 text-center font-mono text-base font-bold border-2 border-stone-300 focus:border-emerald-700 bg-stone-50 focus:bg-white focus:outline-hidden"
                  />
                ))}
              </div>

              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={() => setPinInput(['1', '2', '3', '4', '5', '6'])}
                  className="text-[10px] text-emerald-800 font-bold hover:underline"
                >
                  (Demo: Auto-Fill PIN 123456)
                </button>
              </div>

              <div className="flex gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setIsVerifyingPin(false)}
                  className="w-1/3 py-2 border border-stone-300 text-stone-700 font-bold text-xs"
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={handleConfirmPin}
                  disabled={isSubmitting}
                  className="w-2/3 py-2 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs uppercase"
                >
                  {isSubmitting ? 'Memverifikasi...' : 'Verifikasi & Simpan'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* KYC DOCUMENT REQUEST MODAL (FOR LEGAL NAME CHANGE) */}
        {isKycModalOpen && (
          <div className="fixed inset-0 z-60 bg-black/80 flex items-center justify-center p-4">
            <div className="bg-white p-4 max-w-sm w-full shadow-2xl border border-stone-300 space-y-3 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-stone-200">
                <div className="flex items-center gap-1.5 font-bold text-stone-900">
                  <FileText className="w-4 h-4 text-emerald-800" />
                  <span>Permohonan Perubahan Nama Legal</span>
                </div>
                <button onClick={() => setIsKycModalOpen(false)} className="text-stone-500 hover:text-stone-800">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <p className="text-stone-600 leading-snug">
                Sesuai regulasi OJK & Kebijakan Anti-Pencucian Uang Terniva, nama resmi terdaftar hanya dapat diubah melalui verifikasi dokumen identitas resmi:
              </p>

              <div className="space-y-2 bg-stone-50 p-2.5 border border-stone-200 text-[11px] text-stone-700">
                <p>1. <strong>Foto Asli E-KTP / Paspor</strong> (Jelas, tidak buram)</p>
                <p>2. <strong>Foto Selfie Memegang E-KTP</strong></p>
                <p>3. <strong>Surat Penetapan Pengadilan / Akta Nikah</strong> (Jika terjadi perubahan nama resmi)</p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setIsKycModalOpen(false);
                  onShowToast('Tiket permohonan #KYC-9982 telah diajukan ke Tim Verifikasi Kepatuhan.');
                }}
                className="w-full py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs flex items-center justify-center gap-1.5"
              >
                <Camera className="w-3.5 h-3.5" />
                <span>Upload Dokumen Legal & Ajukan</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
