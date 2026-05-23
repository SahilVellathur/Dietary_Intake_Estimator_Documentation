import React, { useState } from 'react';
import { getRiskBadge } from '../utils/helpers';
import { ChevronRight, Search, ShieldAlert } from 'lucide-react';

export default function PatientTable({ patientsList = [], onSelectPatient, activePatientId }) {
  const [search, setSearch] = useState('');

  const filtered = patientsList.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden flex flex-col">
      {/* Search Header Bar */}
      <div className="p-4 border-b border-slate-50 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h3 className="font-bold text-slate-800 text-sm">Clinical Roster ({filtered.length})</h3>
        <div className="relative w-full sm:max-w-xs">
          <input
            type="text"
            placeholder="Search patient, ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs font-semibold text-slate-700 placeholder-slate-400 focus:outline-none focus:border-indigo-500 transition-all"
          />
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      {/* Roster Data List */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/30 border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              <th className="py-4 px-6">Patient Name</th>
              <th className="py-4 px-4">Risk Profile</th>
              <th className="py-4 px-4">Target Cal.</th>
              <th className="py-4 px-4">Avg Cal.</th>
              <th className="py-4 px-4">Latest Glucose</th>
              <th className="py-4 px-6 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {filtered.map((patient) => {
              const isSelected = patient.id === activePatientId;
              const badge = getRiskBadge(patient.riskLevel);
              return (
                <tr
                  key={patient.id}
                  onClick={() => onSelectPatient(patient)}
                  className={`hover:bg-slate-50/80 transition-colors cursor-pointer text-xs ${isSelected ? 'bg-indigo-50/20' : ''}`}
                >
                  <td className="py-4 px-6 font-bold text-slate-800">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-indigo-50/60 flex items-center justify-center text-[10px] text-indigo-600 font-extrabold">
                        {patient.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <span>{patient.name}</span>
                        <span className="block text-[9px] text-slate-400 font-semibold mt-0.5">{patient.id} • {patient.age} yrs</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded-md border uppercase ${badge.color}`}>
                      {badge.label}
                    </span>
                  </td>
                  <td className="py-4 px-4 font-bold text-slate-600">{patient.dailyCalorieGoal} kcal</td>
                  <td className="py-4 px-4 font-bold text-slate-700">{patient.dailyCalorieAvg} kcal</td>
                  <td className="py-4 px-4 font-bold text-slate-600">
                    <div className="flex items-center gap-1.5">
                      <ShieldAlert className={`w-3.5 h-3.5 ${patient.riskLevel === 'High' ? 'text-rose-500' : 'text-slate-400'}`} />
                      <span>{patient.vitals.glucose}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectPatient(patient);
                      }}
                      className="inline-flex items-center gap-1 bg-slate-50 hover:bg-indigo-50 border border-slate-200/60 hover:border-indigo-100 text-slate-500 hover:text-indigo-600 px-3 py-1.5 rounded-xl font-bold text-[10px] transition-all"
                    >
                      <span>Intake Logs</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </td>
                </tr>
              );
            })}

            {filtered.length === 0 && (
              <tr>
                <td colSpan="6" className="p-10 text-center text-slate-400 text-xs font-semibold">
                  No matching patients found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
