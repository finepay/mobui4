import { useState } from 'react';
import MobileShell from './mobile/MobileShell';
import { MobileSplashScreen } from './mobile/screens/MobileSplashScreen';
import { MobileAuthScreen } from './mobile/screens/MobileAuthScreen';
import { Signal, Wifi, Battery, Smartphone, Maximize2, RotateCcw } from 'lucide-react';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    try {
      return localStorage.getItem('terniva_logged_in') === 'true';
    } catch {
      return false;
    }
  });
  const [user, setUser] = useState<{ name: string; email: string; phone: string } | null>(() => {
    try {
      const saved = localStorage.getItem('terniva_user_profile');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [isFrameMode, setIsFrameMode] = useState(true);

  const handleAuthSuccess = (userData: { name: string; email: string; phone: string }) => {
    setUser(userData);
    setIsAuthenticated(true);
    try {
      localStorage.setItem('terniva_logged_in', 'true');
      localStorage.setItem('terniva_user_profile', JSON.stringify(userData));
    } catch {
      // ignore
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    try {
      localStorage.removeItem('terniva_logged_in');
    } catch {
      // ignore
    }
  };

  const handleReplaySplash = () => {
    setShowSplash(true);
  };

  // 1. Splash Screen Mode
  if (showSplash) {
    return (
      <div className="min-h-screen bg-stone-900 flex flex-col items-center justify-start sm:py-6 sm:px-4 font-sans select-none">
        <div className="w-full max-w-[412px] mb-3 flex items-center justify-between px-3 text-xs text-stone-400">
          <div className="flex items-center gap-1.5 font-medium">
            <Smartphone className="w-4 h-4 text-emerald-400" />
            <span className="text-stone-200">Terniva Android App · Splash</span>
          </div>
          <button
            onClick={() => setShowSplash(false)}
            className="text-[11px] font-bold text-amber-300 hover:text-white bg-stone-800 px-2.5 py-1 border border-stone-700 cursor-pointer"
          >
            Lewati Splash →
          </button>
        </div>

        <div
          className={`w-full max-w-[412px] bg-white overflow-hidden flex flex-col shadow-2xl ${
            isFrameMode
              ? 'h-[860px] max-h-[92vh] sm:rounded-[44px] ring-12 ring-stone-800/90 border border-stone-700'
              : 'h-screen max-h-screen rounded-none'
          }`}
        >
          {/* Status Bar */}
          <div className="px-5 pt-3 pb-1 flex items-center justify-between text-[11px] font-mono tracking-wider shrink-0 bg-white text-stone-700">
            <span className="font-bold">09:41</span>
            <div className="flex items-center gap-2 text-stone-500">
              <Signal className="w-3.5 h-3.5" />
              <Wifi className="w-3.5 h-3.5" />
              <div className="flex items-center gap-0.5">
                <span className="text-[10px]">98%</span>
                <Battery className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-hidden bg-white">
            <MobileSplashScreen onComplete={() => setShowSplash(false)} />
          </div>

          {/* Android Gesture Bar */}
          <div className="bg-white py-2 flex justify-center shrink-0">
            <div className="w-32 h-1 bg-stone-200 rounded-full" />
          </div>
        </div>
      </div>
    );
  }

  // 2. Authentication Screen (Login / Register)
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-stone-900 flex flex-col items-center justify-start sm:py-6 sm:px-4 font-sans select-none">
        <div className="w-full max-w-[412px] mb-3 flex items-center justify-between px-3 text-xs text-stone-400">
          <div className="flex items-center gap-1.5 font-medium">
            <Smartphone className="w-4 h-4 text-emerald-400" />
            <span className="text-stone-200">Terniva · Masuk & Daftar</span>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              onClick={handleReplaySplash}
              className="flex items-center gap-1 text-[11px] font-semibold text-amber-300 hover:text-white bg-stone-800 px-2 py-1 border border-stone-700 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Splash</span>
            </button>
            <button
              onClick={() => setIsFrameMode(!isFrameMode)}
              className="flex items-center gap-1 bg-stone-800 hover:bg-stone-700 text-stone-300 px-2 py-1 border border-stone-700 cursor-pointer"
            >
              <Maximize2 className="w-3 h-3 text-emerald-400" />
              <span>{isFrameMode ? 'Layar Penuh' : 'Bingkai'}</span>
            </button>
          </div>
        </div>

        <div
          className={`w-full max-w-[412px] bg-white overflow-hidden flex flex-col shadow-2xl ${
            isFrameMode
              ? 'h-[860px] max-h-[92vh] sm:rounded-[44px] ring-12 ring-stone-800/90 border border-stone-700'
              : 'h-screen max-h-screen rounded-none'
          }`}
        >
          {/* Status Bar */}
          <div className="px-5 pt-3 pb-1 flex items-center justify-between text-[11px] font-mono tracking-wider shrink-0 bg-emerald-900 text-white">
            <span className="font-bold">09:41</span>
            <div className="flex items-center gap-2 text-white/90">
              <Signal className="w-3.5 h-3.5" />
              <Wifi className="w-3.5 h-3.5" />
              <div className="flex items-center gap-0.5">
                <span className="text-[10px]">98%</span>
                <Battery className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto no-scrollbar">
            <MobileAuthScreen
              onAuthSuccess={handleAuthSuccess}
              onSkipGuest={() => setIsAuthenticated(true)}
            />
          </div>

          {/* Android Gesture Bar */}
          <div className="bg-white py-1.5 flex justify-center shrink-0 border-t border-stone-200">
            <div className="w-32 h-1 bg-stone-300 rounded-full" />
          </div>
        </div>
      </div>
    );
  }

  // 3. Authenticated: Full MobileShell App
  return (
    <MobileShell
      onLogout={handleLogout}
      onReplaySplash={handleReplaySplash}
      user={user}
    />
  );
}
