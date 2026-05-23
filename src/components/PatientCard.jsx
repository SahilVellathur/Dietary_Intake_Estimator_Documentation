import React from 'react';
import { calculateBMI, getBMICategory, getRiskBadge } from '../utils/helpers';
import { Activity, ShieldAlert, Thermometer, Weight } from 'lucide-react';

export default function PatientCard({ patient }) {
  if (!patient) return null;

  const bmi = calculateBMI(patient.weight, patient.height);
  const bmiCat = getBMICategory(bmi);
  const riskBadge = getRiskBadge(patient.riskLevel);

  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm flex flex-col gap-6">
      {/* Header Info */}
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-bold text-slate-800">{patient.name}</h3>
            <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md border uppercase tracking-wider ${riskBadge.color}`}>
              {riskBadge.label}
            </span>
          </div>
          <p className="text-xs text-slate-400 font-medium tracking-wide">ID: {patient.id} • {patient.gender}, {patient.age} yrs</p>
        </div>

        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-extrabold text-sm text-slate-600 shadow-sm border border-white">
          {patient.name.split(' ').map(n => n[0]).join('')}
        </div>
      </div>

      {/* Vitals Summary Grid */}
      <div className="grid grid-cols-3 gap-3">
        {/* Vital 1: BP */}
        <div className="bg-slate-50/70 border border-slate-100 rounded-xl p-3 flex flex-col items-center justify-center text-center">
          <Activity className="w-4 h-4 text-indigo-500 mb-1" />
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Blood Press.</span>
          <span className="text-xs font-extrabold text-slate-700 mt-0.5">{patient.vitals.bp}</span>
        </div>

        {/* Vital 2: Heart Rate */}
        <div className="bg-slate-50/70 border border-slate-100 rounded-xl p-3 flex flex-col items-center justify-center text-center">
          <Thermometer className="w-4 h-4 text-emerald-500 mb-1" />
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Heart Rate</span>
          <span className="text-xs font-extrabold text-slate-700 mt-0.5">{patient.vitals.heartRate}</span>
        </div>

        {/* Vital 3: Glucose */}
        <div className="bg-slate-50/70 border border-slate-100 rounded-xl p-3 flex flex-col items-center justify-center text-center">
          <ShieldAlert className="w-4 h-4 text-amber-500 mb-1" />
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Glucose</span>
          <span className="text-xs font-extrabold text-slate-700 mt-0.5">{patient.vitals.glucose}</span>
        </div>
      </div>

      {/* Physical Indicators & BMI Card */}
      <div className="bg-indigo-50/20 border border-indigo-100/30 rounded-xl p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 shadow-sm border border-indigo-100/30">
            <Weight className="w-4 h-4 stroke-[2.2]" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Body Mass Index</span>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-base font-extrabold text-slate-800">{bmi} BMI</span>
              <span className={`text-[9px] font-bold px-2 py-0.5 rounded-md ${bmiCat.color}`}>
                {bmiCat.label}
              </span>
            </div>
          </div>
        </div>
        <div className="text-right">
          <span className="text-[10px] font-semibold text-slate-400 block leading-tight">Ht: {patient.height} cm</span>
          <span className="text-[10px] font-semibold text-slate-400 block leading-tight mt-0.5">Wt: {patient.weight} kg</span>
        </div>
      </div>
    </div>
  );
}
