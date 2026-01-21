
import React from 'react';
import { Home, BookOpen, Activity, Settings } from 'lucide-react';
import { View } from '../types';

interface NavigationProps {
  currentView: View;
  setView: (view: View) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentView, setView }) => {
  const navItems = [
    { id: View.HOME, label: 'Início', icon: Home },
    { id: View.LIBRARY, label: 'Biblioteca', icon: BookOpen },
    { id: View.EXERCISES, label: 'Práticas', icon: Activity },
    { id: View.SETTINGS, label: 'Ajustes', icon: Settings },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white/95 backdrop-blur-md border-t border-slate-100 flex justify-center items-center pt-3 pb-8 safe-area-bottom z-50 shadow-[0_-4px_12px_rgba(0,0,0,0.03)]">
      <div className="max-w-5xl w-full flex justify-around items-center px-4">
        {navItems.map((item) => {
          const isActive = currentView === item.id || (currentView === View.CONTENT_DETAIL && item.id === View.LIBRARY);
          return (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              className={`flex flex-col items-center p-3 min-w-[80px] transition-all relative ${
                isActive ? 'text-teal-600 scale-105' : 'text-slate-400 hover:text-slate-600 hover:scale-105'
              }`}
            >
              <item.icon size={26} strokeWidth={isActive ? 2.5 : 2} />
              <span className={`text-[11px] mt-2 font-bold uppercase tracking-[0.15em] ${isActive ? 'opacity-100' : 'opacity-60'}`}>
                {item.label}
              </span>
              {isActive && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-10 h-1.5 bg-teal-600 rounded-full shadow-[0_2px_4px_rgba(13,148,136,0.3)]" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default Navigation;
