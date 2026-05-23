import React from 'react';
import { Home, LineChart, UserCheck } from 'lucide-react';

export default function Sidebar({ activePage, setActivePage }) {
  // Navigation elements - Re-branded for personal dietary tracking
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'analytics', label: 'Intake Analytics', icon: LineChart },
    { id: 'reports', label: 'Personal Profile', icon: UserCheck },
  ];

  return (
    <aside className="w-20 h-screen bg-white border-r border-slate-100 flex flex-col justify-between items-center py-6 shrink-0 relative z-30">
      {/* Top Branding App Badge */}
      <div className="flex flex-col items-center gap-10 w-full">
        <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex flex-col items-center justify-center font-black text-sm shadow-md shadow-indigo-200 cursor-pointer hover:scale-105 active:scale-95 transition-all">
          <span>NF</span>
        </div>

        {/* Navigation Deck */}
        <nav className="flex flex-col items-center gap-4 w-full">
          {navItems.map((item) => {
            const isSelected = activePage === item.id;
            const Icon = item.icon;
            return (
              <div key={item.id} className="w-full flex items-center relative group">
                {/* Visual Accent Bar */}
                <div className={`absolute left-0 w-1 h-8 bg-indigo-600 rounded-r-md transition-all duration-300 ${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-40'
                  }`} />

                {/* Tooltip Overlay */}
                <span className="absolute left-24 bg-slate-900 text-white text-[10px] font-bold px-2.5 py-1.5 rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 shadow-md whitespace-nowrap z-40">
                  {item.label}
                </span>

                <button
                  onClick={() => setActivePage(item.id)}
                  className={`mx-auto p-3.5 rounded-xl transition-all duration-300 relative cursor-pointer active:scale-95 ${isSelected
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
                      : 'text-slate-400 hover:text-slate-700 hover:bg-slate-50 border border-transparent hover:border-slate-100'
                    }`}
                  aria-label={item.label}
                >
                  <Icon className="w-5 h-5 stroke-[2]" />
                </button>
              </div>
            );
          })}
        </nav>
      </div>

      {/* Footer System Version */}
      <div className="text-[9px] font-black text-slate-300 tracking-widest select-none uppercase">
        v1.2
      </div>
    </aside>
  );
}