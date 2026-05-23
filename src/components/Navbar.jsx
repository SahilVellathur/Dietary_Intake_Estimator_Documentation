import React from 'react';
import { Bell, HeartPulse, Search, User } from 'lucide-react';

export default function Navbar({ currentPatient, onSelectPatient, patientsList = [] }) {
  return (
    <header className="h-20 bg-white border-b border-slate-100 px-8 flex items-center justify-between shrink-0">
      {/* Brand & Section Indicator */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
          <HeartPulse className="w-5 h-5 stroke-[2.2]" />
        </div>
        <div>
          <span className="text-[10px] uppercase tracking-widest text-indigo-600 font-extrabold">Clinical Intake Workspace</span>
          <h2 className="text-base font-bold text-slate-800 leading-tight">Patient Diagnostics & Nutrition</h2>
        </div>
      </div>

      {/* Center Patient Selector */}
      <div className="hidden md:flex items-center gap-2">
        <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">Active Roster:</label>
        <select
          value={currentPatient?.id || ''}
          onChange={(e) => {
            const found = patientsList.find(p => p.id === e.target.value);
            if (found) onSelectPatient(found);
          }}
          className="bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 px-3 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 cursor-pointer"
        >
          {patientsList.map(p => (
            <option key={p.id} value={p.id}>
              {p.name} ({p.id})
            </option>
          ))}
        </select>
      </div>

      {/* Right Side Icons & Profile Info */}
      <div className="flex items-center gap-5">
        {/* Quick Vitals Monitor Badge */}
        <div className="hidden lg:flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3.5 py-2 rounded-xl border border-emerald-100/50">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] font-extrabold uppercase tracking-wide">Vitals Server Live</span>
        </div>

        {/* Action Notifications */}
        <button className="p-2.5 rounded-xl hover:bg-slate-50 text-slate-400 hover:text-slate-600 transition-colors border border-transparent hover:border-slate-100 relative cursor-pointer">
          <Bell className="w-4 h-4" />
          <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-indigo-600" />
        </button>

        {/* Profile Avatar Trigger */}
        <div className="flex items-center gap-3 pl-3 border-l border-slate-100">
          <div className="text-right">
            <span className="block text-xs font-bold text-slate-800">Dr. Alex Miller</span>
            <span className="text-[10px] text-slate-400 font-semibold tracking-wide">Lead Dietitian</span>
          </div>
          <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 font-extrabold text-xs shadow-sm">
            AM
          </div>
        </div>
      </div>
    </header>
  );
}
