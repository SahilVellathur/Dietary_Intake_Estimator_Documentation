import React, { useState, useRef } from 'react';
import { calculateBMI, getBMICategory } from '../utils/helpers';
import { User, LogOut, Check, Sliders, Shield } from 'lucide-react';

export default function Reports({ setIsLogin }) {
  const fileInputRef = useRef(null);

  const [profileData, setProfileData] = useState({
    fullName: 'Alex Miller',
    email: 'alex.miller@nutriflow.com',
    age: '26',
    weight: '72',
    height: '178',
    dailyCalorieGoal: '2200',
    avatar: null,
  });

  const [isSaved, setIsSaved] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
    if (isSaved) setIsSaved(false);
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData((prev) => ({
          ...prev,
          avatar: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileBrowser = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const bmi = calculateBMI(profileData.weight, profileData.height);
  const bmiCat = getBMICategory(bmi);

  return (
    <div className="space-y-8 animate-fade-up">
      {/* Title Header */}
      <div>
        <h1 className="text-3xl font-black tracking-tight text-slate-900">
          Clinical Settings & <span className="text-indigo-600">Profiles</span>
        </h1>
        <p className="text-slate-500 mt-1 font-medium">
          Manage system configurations, clinician profile parameters, and session tokens.
        </p>
      </div>

      {isSaved && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-xl flex items-center gap-3 shadow-sm transition-all animate-slide-up">
          <Check className="w-5 h-5 text-emerald-600" />
          <span className="text-sm font-semibold">Clinician configurations saved successfully!</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Card: Summary overview */}
        <div className="bg-white border border-slate-100 rounded-3xl p-6 flex flex-col items-center text-center shadow-sm h-fit">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleAvatarChange}
            accept="image/*"
            className="hidden"
          />

          <div
            onClick={triggerFileBrowser}
            className="w-24 h-24 rounded-full relative group cursor-pointer border-4 border-white shadow-md shadow-indigo-50 mb-4 overflow-hidden bg-indigo-50 flex items-center justify-center text-indigo-600 font-black text-2xl transition-all"
          >
            {profileData.avatar ? (
              <img
                src={profileData.avatar}
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            ) : (
              <span>{profileData.fullName.split(' ').map(n => n[0]).join('')}</span>
            )}
            <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-[9px] text-white font-bold uppercase tracking-wider">Change</span>
            </div>
          </div>

          <h2 className="text-xl font-bold text-slate-800">{profileData.fullName}</h2>
          <p className="text-xs font-semibold text-indigo-600 mt-1 bg-indigo-50/60 px-2.5 py-1 rounded-full">Lead Dietitian</p>

          <div className="w-full border-t border-slate-100 mt-6 pt-4 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-slate-400 font-medium">Daily Calorie Target</span>
              <span className="font-bold text-slate-700">{profileData.dailyCalorieGoal} kcal</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-400 font-medium">Physician BMI Ratio</span>
              <span className="font-bold text-slate-700">{bmi} ({bmiCat.label})</span>
            </div>
          </div>
        </div>

        {/* Right 2 Cols: Profile Form & Session Settings */}
        <div className="lg:col-span-2 space-y-6">
          <form onSubmit={handleSubmit} className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm space-y-6">
            <div className="border-b border-slate-50 pb-3">
              <h3 className="text-base font-bold text-slate-800">Clinician Physical Parameters</h3>
              <p className="text-xs text-slate-400 font-medium mt-0.5">Customize daily nutrition goals and personal body index settings.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={profileData.fullName}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 font-semibold focus:outline-none"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Email</label>
                <input
                  type="email"
                  name="email"
                  value={profileData.email}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 font-semibold focus:outline-none"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Age</label>
                <input
                  type="number"
                  name="age"
                  value={profileData.age}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 font-semibold focus:outline-none"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Height (cm)</label>
                <input
                  type="number"
                  name="height"
                  value={profileData.height}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 font-semibold focus:outline-none"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Weight (kg)</label>
                <input
                  type="number"
                  name="weight"
                  value={profileData.weight}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 font-semibold focus:outline-none"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Daily Calorie Target (kcal)</label>
                <input
                  type="number"
                  name="dailyCalorieGoal"
                  value={profileData.dailyCalorieGoal}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 font-semibold focus:outline-none"
                  required
                />
              </div>
            </div>

            <div className="flex justify-end pt-3 border-t border-slate-50">
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs uppercase tracking-wider px-5 py-3 rounded-xl transition-all shadow-sm shadow-indigo-100 cursor-pointer"
              >
                Save Settings
              </button>
            </div>
          </form>

          {/* Session Settings Card */}
          <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm space-y-4">
            <div className="border-b border-slate-50 pb-3 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-800 text-sm">System Security & Workspace Session</h3>
                <p className="text-[10px] text-slate-400 font-medium">Manage access credentials and exit the active session.</p>
              </div>
              <Shield className="w-4 h-4 text-slate-400" />
            </div>

            <div className="flex items-center justify-between bg-slate-50 p-4 rounded-xl border border-slate-100">
              <div>
                <span className="block text-xs font-bold text-slate-700">Clinician session terminal</span>
                <span className="text-[10px] text-slate-400 font-semibold">Active development token verified</span>
              </div>
              <button
                onClick={() => setIsLogin(false)}
                className="bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-100 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>End Session</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
