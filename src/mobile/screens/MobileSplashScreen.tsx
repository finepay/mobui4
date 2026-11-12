import React, { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';

interface MobileSplashScreenProps {
  onComplete: () => void;
}

const logoImg = '/src/assets/images/ic_terniva_logo_1794441134547.jpg';

export const MobileSplashScreen: React.FC<MobileSplashScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 2000; // 2 seconds
    const intervalTime = 25;
    const step = 100 / (duration / intervalTime);

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 150);
          return 100;
        }
        return Math.min(100, prev + step);
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="relative w-full h-full min-h-[680px] bg-white text-stone-900 flex flex-col justify-between p-6 select-none">
      {/* Top Bar with Minimal Skip */}
      <div className="flex justify-end pt-2">
        <button
          onClick={onComplete}
          className="text-xs font-semibold text-stone-400 hover:text-stone-700 px-2.5 py-1 transition-colors cursor-pointer flex items-center gap-1"
        >
          <span>Lewati</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Center: Clean Logo Only */}
      <div className="flex flex-col items-center justify-center my-auto">
        <div className="w-24 h-24 mb-4 flex items-center justify-center">
          <img
            src={logoImg}
            alt="Terniva"
            className="w-full h-full object-contain"
            onError={(e) => {
              // Elegant SVG fallback if image fails to render
              const target = e.currentTarget;
              target.style.display = 'none';
              const parent = target.parentElement;
              if (parent) {
                const fallback = document.createElement('div');
                fallback.className = 'w-20 h-20 bg-emerald-800 flex items-center justify-center shadow-sm';
                fallback.innerHTML = `<span style="color:white;font-weight:900;font-size:32px;">T</span>`;
                parent.appendChild(fallback);
              }
            }}
          />
        </div>

        <h1 className="text-2xl font-extrabold tracking-tight text-stone-900">
          Terniva
        </h1>
      </div>

      {/* Bottom: Minimalist Thin Loading Bar */}
      <div className="w-full max-w-[140px] mx-auto pb-6 flex flex-col items-center">
        <div className="w-full bg-stone-100 h-1 overflow-hidden">
          <div
            className="h-full bg-emerald-600 transition-all duration-75"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};
