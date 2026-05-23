import React, { useState } from 'react';
import { Calendar, Search, X } from 'lucide-react';

// Sample dummy data – in a real app this would come from the backend
const dummyHistory = [
  { id: 1, period: 'Breakfast', time: '08:15 AM', name: 'Egg White Omelet & Avocado Toast', calories: 340, macros: { carbs: 24, protein: 22, fat: 16 } },
  { id: 2, period: 'Lunch', time: '01:00 PM', name: 'Quinoa Grilled Salmon Salad', calories: 510, macros: { carbs: 28, protein: 38, fat: 22 } },
  { id: 3, period: 'Snack', time: '04:30 PM', name: 'Mixed Berries & Greek Yogurt', calories: 180, macros: { carbs: 18, protein: 15, fat: 2 } },
  { id: 4, period: 'Dinner', time: '07:15 PM', name: 'Steamed Broccoli & Baked Cod', calories: 410, macros: { carbs: 15, protein: 35, fat: 10 } },
];

export default function DietaryHistory() {
  const [filter, setFilter] = useState('All'); // All, Today, Yesterday, Older
  const [search, setSearch] = useState('');

  const filtered = dummyHistory
    .filter((item) => {
      // Date filter placeholder – all dummy data is "today"
      if (filter === 'Today') return true;
      if (filter === 'Yesterday') return false;
      if (filter === 'Older') return false;
      return true; // All
    })
    .filter((item) => item.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6 animate-fade-up">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h2 className="text-2xl font-black text-slate-800 tracking-tight">Intake History Journal</h2>
        {/* Date Tabs */}
        <div className="flex gap-2">
          {['All', 'Today', 'Yesterday', 'Older'].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-3 py-1 rounded-full text-xs font-semibold ${filter === tab ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative w-full max-w-md">
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search meals..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50/60 border border-slate-200 text-sm text-slate-800 focus:outline-none focus:border-indigo-500"
        />
        {search && (
          <button
            onClick={() => setSearch('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-800"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Timeline Cards */}
      <div className="space-y-4">
        {filtered.map((item, idx) => (
          <div
            key={item.id}
            className="bg-white border border-slate-100 rounded-2xl shadow-sm p-4 flex flex-col sm:flex-row justify-between items-start gap-4 animate-fade-up"
            style={{ animationDelay: `${idx * 70}ms` }}
          >
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-indigo-600" />
              <div>
                <span className="text-sm font-bold text-slate-800">{item.name}</span>
                <div className="text-xs text-slate-500">{item.period} • {item.time}</div>
              </div>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded">{item.calories} kcal</span>
              <span className="text-slate-600">{item.macros.carbs}g C</span>
              <span className="text-slate-600">{item.macros.protein}g P</span>
              <span className="text-slate-600">{item.macros.fat}g F</span>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="text-center text-slate-400 py-8">No matching meals found.</div>
        )}
      </div>
    </div>
  );
}
