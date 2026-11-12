import { Store, TrendingUp, PlayCircle, Bell, User } from 'lucide-react';
import { MobileTab } from './types';

interface MobileBottomNavProps {
  selectedTab: MobileTab;
  onTabSelect: (tab: MobileTab) => void;
  unreadCount?: number;
}

export default function MobileBottomNav({
  selectedTab,
  onTabSelect,
  unreadCount = 2,
}: MobileBottomNavProps) {
  const tabs: { id: MobileTab; label: string; icon: any }[] = [
    { id: 'home', label: 'Untuk Kamu', icon: Store },
    { id: 'peluang', label: 'Peluang', icon: TrendingUp },
    { id: 'live', label: 'Live & Video', icon: PlayCircle },
    { id: 'notif', label: 'Notifikasi', icon: Bell },
    { id: 'akun', label: 'Akun Saya', icon: User },
  ];

  return (
    <nav className="bg-white border-t border-stone-200 py-1.5 px-2 flex items-center justify-around z-30 shrink-0">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = selectedTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onTabSelect(tab.id)}
            className={`flex flex-col items-center justify-center flex-1 py-1 transition-colors relative ${
              isActive ? 'text-emerald-800 font-bold' : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            <div className="relative">
              <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
              {tab.id === 'notif' && unreadCount > 0 && (
                <span className="absolute -top-1 -right-2 bg-rose-500 text-white font-mono text-[9px] font-bold px-1 rounded-full border border-white">
                  {unreadCount}
                </span>
              )}
            </div>
            <span className="text-[10px] mt-0.5 leading-none whitespace-nowrap">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
