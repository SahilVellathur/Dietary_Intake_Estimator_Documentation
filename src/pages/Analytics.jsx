import React from 'react';
import { TrendingUp, Flame, Heart, ClipboardCheck } from 'lucide-react';
import StatCard from '../components/StatCard';

export default function Analytics() {
  return (
    <div className="space-y-8 animate-fade-up">
      {/* Page Header */}
      <div>
        <span className="text-[10px] font-extrabold uppercase tracking-widest text-indigo-600">
          Personal Calorie Workspace
        </span>
        <h1 className="text-3xl font-black tracking-tight text-slate-900 mt-1">
          Advanced <span className="text-indigo-600">Dietary & Intake Analytics</span>
        </h1>
        <p className="text-slate-500 mt-1 font-medium">
          Monitor personal calorie compliance metrics, macro target vectors, and systemic intake trends over time.
        </p>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="TOTAL TRACKED DAYS"
          value="14 Days"
          subtext="Consecutive logging streak"
          icon={Flame}
          colorClass="indigo"
        />
        <StatCard
          title="AVG DIETARY COMPLIANCE"
          value="82.4%"
          subtext="Adherence to calculated calorie budget"
          icon={ClipboardCheck}
          colorClass="emerald"
        />
        <StatCard
          title="METABOLIC METRIC INDEX"
          value="45.2%"
          subtext="Overall macronutrient efficiency index"
          icon={Heart}
          colorClass="amber"
        />
        <StatCard
          title="WEIGHT TREND MOMENTUM"
          value="-1.2%"
          subtext="Maintenance and body composition vector"
          icon={TrendingUp}
          colorClass="indigo"
        />
      </div>

      {/* Visual analytics dashboards placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Compliance trends */}
        <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm flex flex-col gap-6">
          <div className="border-b border-slate-50 pb-3">
            <h3 className="font-bold text-slate-800 text-sm">14-Day Caloric Intake History</h3>
            <p className="text-[10px] text-slate-400 font-medium">Daily consumed calories relative to baseline goals.</p>
          </div>
          <div className="h-48 flex items-end justify-between px-4 pt-4 border-b border-l border-slate-100/60 relative">
            {/* Mock chart grid lines */}
            <div className="absolute left-0 right-0 top-1/4 border-t border-slate-50 border-dashed" />
            <div className="absolute left-0 right-0 top-2/4 border-t border-slate-50 border-dashed" />
            <div className="absolute left-0 right-0 top-3/4 border-t border-slate-50 border-dashed" />

            {/* Bars */}
            {[65, 72, 78, 80, 85, 82, 88, 90, 84, 86, 92, 89, 94, 91].map((val, i) => (
              <div key={i} className="flex flex-col items-center gap-2 group w-full">
                <div
                  className="w-4 bg-indigo-500 hover:bg-indigo-600 rounded-t-sm transition-all relative cursor-pointer"
                  style={{ height: `${val * 1.3}px` }}
                >
                  <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[9px] font-bold px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow z-10">
                    {val}%
                  </span>
                </div>
                <span className="text-[8px] text-slate-400 font-bold">D{i+1}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Nutritional Distribution */}
        <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm flex flex-col gap-6">
          <div className="border-b border-slate-50 pb-3">
            <h3 className="font-bold text-slate-800 text-sm">Target Macronutrient Distributions</h3>
            <p className="text-[10px] text-slate-400 font-medium">Actual vs calculated targets for proteins, carbs, and fats.</p>
          </div>

          <div className="space-y-4 pt-2">
            {/* Protein bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold text-slate-600">
                <span>Daily Proteins</span>
                <span>28.5% (Target: 25-30%)</span>
              </div>
              <div className="h-2 w-full bg-slate-50 border border-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: '28.5%' }} />
              </div>
            </div>

            {/* Carbohydrates bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold text-slate-600">
                <span>Daily Carbohydrates</span>
                <span>45.2% (Target: 40-50%)</span>
              </div>
              <div className="h-2 w-full bg-slate-50 border border-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-500 rounded-full" style={{ width: '45.2%' }} />
              </div>
            </div>

            {/* Fats bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold text-slate-600">
                <span>Dietary Fats</span>
                <span>26.3% (Target: 25-35%)</span>
              </div>
              <div className="h-2 w-full bg-slate-50 border border-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full" style={{ width: '26.3%' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
