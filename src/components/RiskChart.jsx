import React from 'react';
import { Activity } from 'lucide-react';

export default function RiskChart({ score = 45 }) {
  // Determine risk category details
  const getRiskDetails = (val) => {
    if (val < 40) return { label: 'Low Chronic Risk', color: 'text-emerald-500', bg: 'bg-emerald-500', info: 'Intake and physical markers match optimal metabolic guidelines.' };
    if (val < 70) return { label: 'Moderate Chronic Risk', color: 'text-amber-500', bg: 'bg-amber-500', info: 'Slight deviations detected. Dietary modifications recommended.' };
    return { label: 'High Chronic Risk', color: 'text-rose-500', bg: 'bg-rose-500', info: 'Biometric values exceed threshold. Clinical guidance advised.' };
  };

  const details = getRiskDetails(score);

  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm flex flex-col items-center justify-center text-center gap-5">
      <div className="w-full text-left border-b border-slate-50 pb-3 flex justify-between items-center">
        <div>
          <h3 className="font-bold text-slate-800">Cardio-Metabolic Risk Index</h3>
          <p className="text-[10px] text-slate-400 font-medium">Estimated probability score of metabolic syndrome.</p>
        </div>
        <Activity className={`w-4 h-4 ${details.color}`} />
      </div>

      {/* Circular Progress Gauge */}
      <div className="relative w-36 h-36 flex items-center justify-center">
        {/* Progress Circle SVGs */}
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="72"
            cy="72"
            r="60"
            className="stroke-slate-100"
            strokeWidth="10"
            fill="transparent"
          />
          <circle
            cx="72"
            cy="72"
            r="60"
            className={`transition-all duration-1000 ease-out`}
            strokeWidth="10"
            fill="transparent"
            strokeDasharray={2 * Math.PI * 60}
            strokeDashoffset={2 * Math.PI * 60 * (1 - score / 100)}
            strokeLinecap="round"
            style={{
              stroke: score < 40 ? '#10B981' : score < 70 ? '#F59E0B' : '#EF4444'
            }}
          />
        </svg>

        {/* Value Label inside */}
        <div className="absolute flex flex-col items-center">
          <span className="text-3xl font-black text-slate-800">{score}%</span>
          <span className="text-[9px] font-bold uppercase text-slate-400 tracking-wider">Risk Ratio</span>
        </div>
      </div>

      <div className="space-y-1.5 w-full">
        <h4 className={`text-sm font-bold ${details.color}`}>{details.label}</h4>
        <p className="text-xs text-slate-400 font-medium leading-relaxed px-4">{details.info}</p>
      </div>

      {/* Linear indicator blocks */}
      <div className="w-full grid grid-cols-3 gap-2 text-[10px] font-bold text-slate-400 mt-2">
        <div className="space-y-1">
          <div className="h-1.5 rounded-full bg-emerald-500/20 overflow-hidden">
            <div className={`h-full bg-emerald-500 ${score < 40 ? 'w-full' : 'w-full'}`} />
          </div>
          <span>0 - 39% Low</span>
        </div>
        <div className="space-y-1">
          <div className="h-1.5 rounded-full bg-amber-500/20 overflow-hidden">
            <div className={`h-full bg-amber-500 ${score >= 40 ? (score < 70 ? 'w-full' : 'w-full') : 'w-0'}`} />
          </div>
          <span>40 - 69% Mod</span>
        </div>
        <div className="space-y-1">
          <div className="h-1.5 rounded-full bg-rose-500/20 overflow-hidden">
            <div className={`h-full bg-rose-500 ${score >= 70 ? 'w-full' : 'w-0'}`} />
          </div>
          <span>70%+ High</span>
        </div>
      </div>
    </div>
  );
}
