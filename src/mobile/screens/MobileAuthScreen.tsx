import React, { useState } from 'react';
import {
  User,
  Lock,
  Eye,
  EyeOff,
  Smartphone,
  Sparkles,
  HelpCircle,
  QrCode,
  CheckCircle2,
  AlertCircle,
  X,
  Sprout,
} from 'lucide-react';

interface MobileAuthScreenProps {
  onAuthSuccess: (userData: { name: string; email: string; phone: string }) => void;
  onSkipGuest: () => void;
}

export const MobileAuthScreen: React.FC<MobileAuthScreenProps> = ({
  onAuthSuccess,
  onSkipGuest,
}) => {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [loginMethod, setLoginMethod] = useState<'password' | 'otp' | 'qr'>('password');

  // Login form state
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [otpPhone, setOtpPhone] = useState('');
  const [otpInput, setOtpInput] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Register form state
  const [regStep, setRegStep] = useState<1 | 2 | 3>(1);
  const [regPhone, setRegPhone] = useState('');
  const [regOtp, setRegOtp] = useState(['', '', '', '', '', '']);
  const [regName, setRegName] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [showRegPassword, setShowRegPassword] = useState(false);
  const [countdown, setCountdown] = useState(60);

  // Modals
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotInput, setForgotInput] = useState('');
  const [forgotSent, setForgotSent] = useState(false);

  // Quick 1-Click Demo Login
  const handleQuickDemo = () => {
    setIdentifier('budi.santoso@nusantaraagri.com');
    setPassword('Terniva123!');
    setErrorMessage('');
  };

  // Submit Login
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (loginMethod === 'password') {
      if (!identifier.trim()) {
        setErrorMessage('Silakan masukkan No. Handphone/Username/Email.');
        return;
      }
      if (!password) {
        setErrorMessage('Silakan masukkan kata sandi Anda.');
        return;
      }
    } else if (loginMethod === 'otp') {
      if (!otpPhone.trim()) {
        setErrorMessage('Silakan masukkan nomor handphone Anda.');
        return;
      }
      if (!isOtpSent) {
        setIsOtpSent(true);
        setOtpInput('882190');
        return;
      }
      if (otpInput.length < 6) {
        setErrorMessage('Kode verifikasi OTP harus 6 digit.');
        return;
      }
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onAuthSuccess({
        name: identifier ? identifier.split('@')[0] : 'Budi Santoso',
        email: identifier.includes('@') ? identifier : 'budi.santoso@nusantaraagri.com',
        phone: otpPhone || '081234567890',
      });
    }, 700);
  };

  // Step 1 Register Submit
  const handleRegStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regPhone.trim() || regPhone.length < 9) {
      setErrorMessage('Nomor handphone tidak valid (minimal 9 digit).');
      return;
    }
    setErrorMessage('');
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setRegStep(2);
      setCountdown(60);
    }, 500);
  };

  // Step 2 Register OTP
  const handleRegStep2 = (e: React.FormEvent) => {
    e.preventDefault();
    if (regOtp.join('').length < 6) {
      setErrorMessage('Lengkapi 6 digit kode OTP verifikasi.');
      return;
    }
    setErrorMessage('');
    setRegStep(3);
  };

  // Step 3 Register Finish
  const handleRegStep3 = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName.trim()) {
      setErrorMessage('Silakan masukkan nama lengkap.');
      return;
    }
    if (regPassword.length < 8) {
      setErrorMessage('Kata sandi minimal 8 karakter.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onAuthSuccess({
        name: regName.trim(),
        email: `${regName.toLowerCase().replace(/\s+/g, '')}@nusantaraagri.com`,
        phone: '0' + regPhone,
      });
    }, 800);
  };

  return (
    <div className="w-full min-h-full bg-stone-50 flex flex-col justify-between select-none">
      {/* Top Header */}
      <div className="bg-emerald-900 text-white px-4 py-3 flex items-center justify-between shadow-md sticky top-0 z-30 border-b border-emerald-800">
        <div className="flex items-center gap-2">
          {/* Logo Bag */}
          <div className="w-7 h-7 bg-white flex items-center justify-center p-1 shadow-xs">
            <svg viewBox="0 0 100 110" className="w-5 h-5" fill="none">
              <path d="M32 34V24C32 14.0589 40.0589 6 50 6C59.9411 6 68 14.0589 68 24V34" stroke="#065f46" strokeWidth="8" strokeLinecap="round" />
              <path d="M14 34H86L80 102H20L14 34Z" fill="#047857" />
              <path d="M58 50C58 45.5817 54.4183 42 50 42C44.4772 42 41 45.5 41 49C41 55 60 57 60 69C60 76.5 54 81 48 81C41.5 81 38 75.5 38 71" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" />
            </svg>
          </div>
          <span className="font-extrabold text-base tracking-tight text-white flex items-center gap-1">
            <span>Terniva</span>
            <Sprout className="w-3.5 h-3.5 text-emerald-400" />
          </span>
          <span className="text-emerald-400/60 text-xs">|</span>
          <span className="text-xs font-semibold text-emerald-200">
            {activeTab === 'login' ? 'Masuk' : 'Daftar Akun'}
          </span>
        </div>

        <button
          onClick={() => setShowHelpModal(true)}
          className="text-xs font-semibold text-emerald-200 hover:text-white flex items-center gap-1 cursor-pointer"
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Bantuan</span>
        </button>
      </div>

      {/* Main Form Content */}
      <div className="p-4 flex-1">
        {/* Tab Toggle: Masuk vs Daftar */}
        <div className="grid grid-cols-2 bg-stone-200 p-1 mb-5">
          <button
            onClick={() => {
              setActiveTab('login');
              setErrorMessage('');
            }}
            className={`py-2 text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'login'
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            LOG IN
          </button>
          <button
            onClick={() => {
              setActiveTab('register');
              setErrorMessage('');
            }}
            className={`py-2 text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'register'
                ? 'bg-emerald-800 text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            DAFTAR SEKARANG
          </button>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="mb-4 p-2.5 bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* -------------------- TAB: LOGIN -------------------- */}
        {activeTab === 'login' && (
          <div className="space-y-4">
            {/* Quick Demo Fill Bar */}
            <div className="flex items-center justify-between pb-1">
              <span className="text-[11px] text-stone-500 font-medium">
                Punya akun Terniva?
              </span>
              <button
                type="button"
                onClick={handleQuickDemo}
                className="text-[11px] text-emerald-800 hover:text-emerald-950 hover:underline font-bold flex items-center gap-1 cursor-pointer bg-emerald-50 border border-emerald-200 px-2 py-0.5"
              >
                <Sparkles className="w-3 h-3 text-amber-500" />
                1-Click Isi Akun Demo Budi Santoso
              </button>
            </div>

            {/* QR Mode */}
            {loginMethod === 'qr' ? (
              <div className="py-6 flex flex-col items-center text-center bg-white border border-stone-200 p-4">
                <div className="p-3 border-2 border-dashed border-emerald-600 mb-3">
                  <QrCode className="w-36 h-36 text-stone-800" />
                </div>
                <p className="text-xs font-bold text-stone-800">
                  Scan QR dengan Aplikasi Terniva
                </p>
                <p className="text-[11px] text-stone-500 mt-1 max-w-xs">
                  Buka tab Akun di ponsel Anda, lalu arahkan kamera ke barcode QR ini.
                </p>
                <button
                  onClick={() => {
                    handleQuickDemo();
                    setLoginMethod('password');
                  }}
                  className="mt-3 py-1.5 px-3 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold"
                >
                  Simulasikan Scan Berhasil
                </button>
              </div>
            ) : (
              <form onSubmit={handleLoginSubmit} className="space-y-3.5 bg-white p-4 border border-stone-200 shadow-xs">
                {loginMethod === 'password' ? (
                  <>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-stone-700">
                        No. Handphone / Email / Username
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-stone-400 absolute left-3 top-3 pointer-events-none" />
                        <input
                          type="text"
                          value={identifier}
                          onChange={(e) => setIdentifier(e.target.value)}
                          placeholder="budi.santoso@nusantaraagri.com"
                          className="w-full pl-9 pr-3 py-2 bg-stone-50 border border-stone-300 text-xs font-medium text-stone-800 focus:bg-white focus:border-emerald-600 focus:outline-hidden"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-bold text-stone-700">
                          Kata Sandi
                        </label>
                        <button
                          type="button"
                          onClick={() => setShowForgotModal(true)}
                          className="text-[11px] text-emerald-700 hover:underline font-semibold cursor-pointer"
                        >
                          Lupa Password?
                        </button>
                      </div>
                      <div className="relative">
                        <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-3 pointer-events-none" />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Masukkan kata sandi"
                          className="w-full pl-9 pr-9 py-2 bg-stone-50 border border-stone-300 text-xs font-medium text-stone-800 focus:bg-white focus:border-emerald-600 focus:outline-hidden"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-3 text-stone-400 hover:text-stone-600 cursor-pointer"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  /* OTP Phone */
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-stone-700">
                        Nomor Handphone Terdaftar
                      </label>
                      <div className="relative">
                        <Smartphone className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                        <input
                          type="tel"
                          value={otpPhone}
                          onChange={(e) => setOtpPhone(e.target.value)}
                          placeholder="081234567890"
                          className="w-full pl-9 pr-3 py-2 bg-stone-50 border border-stone-300 text-xs font-medium text-stone-800 focus:bg-white focus:border-emerald-600 focus:outline-hidden"
                        />
                      </div>
                    </div>

                    {isOtpSent && (
                      <div className="space-y-1 animate-in fade-in">
                        <div className="flex items-center justify-between">
                          <label className="text-xs font-bold text-stone-700">
                            Kode Verifikasi (OTP) 6 Digit
                          </label>
                          <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" /> SMS Terkirim
                          </span>
                        </div>
                        <input
                          type="text"
                          maxLength={6}
                          value={otpInput}
                          onChange={(e) => setOtpInput(e.target.value)}
                          className="w-full px-3 py-2 text-center text-sm font-bold tracking-widest font-mono bg-stone-50 border border-stone-300 focus:border-emerald-600 focus:outline-hidden"
                        />
                      </div>
                    )}
                  </div>
                )}

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer disabled:opacity-75"
                >
                  {isLoading ? 'Memverifikasi...' : loginMethod === 'otp' && !isOtpSent ? 'KIRIM KODE OTP' : 'LOG IN'}
                </button>

                {/* Method switcher */}
                <div className="flex items-center justify-between pt-1 text-[11px]">
                  <button
                    type="button"
                    onClick={() => {
                      setLoginMethod(loginMethod === 'password' ? 'otp' : 'password');
                      setErrorMessage('');
                    }}
                    className="text-emerald-800 hover:underline font-semibold cursor-pointer"
                  >
                    {loginMethod === 'password' ? 'Log in dengan No. HP (SMS)' : 'Log in dengan Kata Sandi'}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setLoginMethod('qr');
                    }}
                    className="text-stone-600 hover:text-stone-900 font-medium flex items-center gap-1 cursor-pointer"
                  >
                    <QrCode className="w-3 h-3 text-emerald-700" />
                    <span>Scan QR</span>
                  </button>
                </div>
              </form>
            )}

            {/* Social Logins */}
            <div className="pt-2">
              <div className="relative my-3">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-stone-300" />
                </div>
                <div className="relative flex justify-center text-[10px] uppercase">
                  <span className="bg-stone-50 px-2 text-stone-400 font-bold">atau masuk dengan</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    handleQuickDemo();
                    onAuthSuccess({
                      name: 'Budi Santoso (Google)',
                      email: 'budi.santoso@nusantaraagri.com',
                      phone: '081234567890',
                    });
                  }}
                  className="py-2 px-3 bg-white border border-stone-300 hover:bg-stone-100 flex items-center justify-center gap-1.5 text-xs font-bold text-stone-700 cursor-pointer"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                  </svg>
                  <span>Google</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    handleQuickDemo();
                    onAuthSuccess({
                      name: 'Budi Santoso (Facebook)',
                      email: 'budi.santoso@nusantaraagri.com',
                      phone: '081234567890',
                    });
                  }}
                  className="py-2 px-3 bg-white border border-stone-300 hover:bg-stone-100 flex items-center justify-center gap-1.5 text-xs font-bold text-stone-700 cursor-pointer"
                >
                  <svg className="w-4 h-4 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  <span>Facebook</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* -------------------- TAB: REGISTER -------------------- */}
        {activeTab === 'register' && (
          <div className="bg-white p-4 border border-stone-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-stone-100 text-xs">
              <span className="font-bold text-stone-800">
                {regStep === 1 && 'Langkah 1: No. Handphone'}
                {regStep === 2 && 'Langkah 2: Verifikasi OTP'}
                {regStep === 3 && 'Langkah 3: Atur Profil'}
              </span>
              <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5">
                {regStep}/3
              </span>
            </div>

            {/* Step 1: Input Phone */}
            {regStep === 1 && (
              <form onSubmit={handleRegStep1} className="space-y-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-700">
                    Nomor Handphone
                  </label>
                  <div className="flex">
                    <span className="px-2.5 py-2 bg-stone-100 border border-r-0 border-stone-300 text-xs font-bold text-stone-700 flex items-center">
                      🇮🇩 +62
                    </span>
                    <input
                      type="tel"
                      value={regPhone}
                      onChange={(e) => setRegPhone(e.target.value.replace(/\D/g, ''))}
                      placeholder="81234567890"
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-300 text-xs font-medium text-stone-800 focus:bg-white focus:border-emerald-600 focus:outline-hidden"
                    />
                  </div>
                  <p className="text-[10px] text-stone-500">
                    Kode verifikasi SMS OTP akan dikirimkan ke nomor ini.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-2.5 bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider hover:bg-emerald-800 transition-colors cursor-pointer"
                >
                  {isLoading ? 'Memeriksa...' : 'BERIKUTNYA'}
                </button>
              </form>
            )}

            {/* Step 2: OTP Verification */}
            {regStep === 2 && (
              <form onSubmit={handleRegStep2} className="space-y-3">
                <div className="text-center text-xs text-stone-600">
                  <p>Masukkan 6 digit kode OTP yang dikirimkan ke:</p>
                  <p className="font-bold text-stone-900">+62 {regPhone}</p>
                </div>

                <div className="flex justify-center gap-1.5 py-1">
                  {regOtp.map((digit, i) => (
                    <input
                      key={i}
                      id={`otp-${i}`}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, '');
                        const newOtp = [...regOtp];
                        newOtp[i] = val.slice(-1);
                        setRegOtp(newOtp);
                        if (val && i < 5) {
                          document.getElementById(`otp-${i + 1}`)?.focus();
                        }
                      }}
                      className="w-10 h-10 text-center font-mono font-bold text-base border-2 border-stone-300 focus:border-emerald-600 bg-stone-50 focus:bg-white focus:outline-hidden"
                    />
                  ))}
                </div>

                <div className="flex justify-center">
                  <button
                    type="button"
                    onClick={() => setRegOtp(['8', '8', '2', '1', '9', '0'])}
                    className="text-[11px] text-emerald-800 font-bold hover:underline bg-emerald-50 border border-emerald-200 px-2 py-1 cursor-pointer"
                  >
                    Simulasikan Isi OTP (882190)
                  </button>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider hover:bg-emerald-800 transition-colors cursor-pointer"
                >
                  VERIFIKASI OTP
                </button>
              </form>
            )}

            {/* Step 3: Name & Password */}
            {regStep === 3 && (
              <form onSubmit={handleRegStep3} className="space-y-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-700">
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    placeholder="Contoh: Budi Santoso"
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 text-xs font-medium text-stone-800 focus:bg-white focus:border-emerald-600 focus:outline-hidden"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-700">
                    Atur Kata Sandi
                  </label>
                  <div className="relative">
                    <input
                      type={showRegPassword ? 'text' : 'password'}
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      placeholder="Minimal 8 karakter"
                      className="w-full pl-3 pr-8 py-2 bg-stone-50 border border-stone-300 text-xs font-medium text-stone-800 focus:bg-white focus:border-emerald-600 focus:outline-hidden"
                    />
                    <button
                      type="button"
                      onClick={() => setShowRegPassword(!showRegPassword)}
                      className="absolute right-2.5 top-2.5 text-stone-400 hover:text-stone-600"
                    >
                      {showRegPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-2.5 bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider hover:bg-emerald-800 transition-colors cursor-pointer"
                >
                  {isLoading ? 'Mendaftarkan Akun...' : 'SELESAIKAN PENDAFTARAN'}
                </button>
              </form>
            )}
          </div>
        )}
      </div>

      {/* Bottom Guest Mode / Skip */}
      <div className="p-4 border-t border-stone-200 bg-white text-center space-y-2">
        <button
          onClick={onSkipGuest}
          className="text-xs font-bold text-emerald-700 hover:text-emerald-800 hover:underline cursor-pointer flex items-center justify-center gap-1 mx-auto"
        >
          <span>Masuk sebagai Tamu / Langsung Jelajahi Pasar</span>
          <span>→</span>
        </button>
        <p className="text-[10px] text-stone-400">
          Dengan masuk atau mendaftar, Anda menyetujui Ketentuan Layanan & Kebijakan Privasi Terniva.
        </p>
      </div>

      {/* HELP MODAL */}
      {showHelpModal && (
        <div className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-4">
          <div className="bg-white max-w-xs w-full p-4 shadow-2xl border border-stone-300 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-stone-200">
              <h3 className="font-bold text-xs text-stone-900">Bantuan Masuk & Akun</h3>
              <button onClick={() => setShowHelpModal(false)} className="text-stone-500 hover:text-stone-800">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-2 text-xs text-stone-600">
              <p>• <strong>Lupa Password:</strong> Ketuk "Lupa Password" pada layar login untuk meminta tautan reset via SMS atau email.</p>
              <p>• <strong>Tidak menerima OTP:</strong> Tunggu 60 detik lalu ketuk kirim ulang kode.</p>
              <p>• <strong>Akun Demo Cepat:</strong> Gunakan tombol "1-Click Isi Akun Demo" untuk langsung mencoba tanpa mendaftar.</p>
            </div>
            <button
              onClick={() => setShowHelpModal(false)}
              className="w-full py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs"
            >
              Tutup
            </button>
          </div>
        </div>
      )}

      {/* FORGOT PASSWORD MODAL */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-4">
          <div className="bg-white max-w-xs w-full p-4 shadow-2xl border border-stone-300 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-stone-200">
              <h3 className="font-bold text-xs text-stone-900">Atur Ulang Kata Sandi</h3>
              <button onClick={() => { setShowForgotModal(false); setForgotSent(false); }} className="text-stone-500 hover:text-stone-800">
                <X className="w-4 h-4" />
              </button>
            </div>

            {forgotSent ? (
              <div className="text-center py-2 space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                <p className="text-xs font-bold text-stone-800">Instruksi Terkirim!</p>
                <p className="text-[11px] text-stone-600">
                  Tautan pemulihan telah dikirim ke nomor/email Anda.
                </p>
                <button
                  onClick={() => { setShowForgotModal(false); setForgotSent(false); }}
                  className="w-full py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs mt-2"
                >
                  Kembali ke Log In
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-xs text-stone-600">
                  Masukkan No. Handphone atau Email terdaftar untuk menerima kode verifikasi pemulihan:
                </p>
                <input
                  type="text"
                  value={forgotInput}
                  onChange={(e) => setForgotInput(e.target.value)}
                  placeholder="0812xxxx atau email@domain.com"
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 text-xs font-medium"
                />
                <button
                  onClick={() => setForgotSent(true)}
                  disabled={!forgotInput.trim()}
                  className="w-full py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs disabled:opacity-50"
                >
                  Kirim Tautan Verifikasi
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
