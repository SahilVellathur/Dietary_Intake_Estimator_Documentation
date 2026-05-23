import React, { useState, useRef, useEffect } from 'react';
import { Upload, Camera, Sparkles, Plus, Check, X, Trash2, ShieldAlert, Heart, Activity, Flame, Salad } from 'lucide-react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import StatCard from '../components/StatCard';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Dashboard({ currentPatient, onAddMeal }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);

  // Camera States
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [streamActive, setStreamActive] = useState(false);
  const [cameraError, setCameraError] = useState(null);
  const [showFlash, setShowFlash] = useState(false);

  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  // Cleanup camera stream on unmount
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  // Handle Drag Events
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  // Handle Drop Event
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedImage(URL.createObjectURL(e.dataTransfer.files[0]));
      setAnalysisResult(null);
    }
  };

  // Handle File Input Selection
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(URL.createObjectURL(e.target.files[0]));
      setAnalysisResult(null);
    }
  };

  const triggerFileInput = () => fileInputRef.current.click();

  // Camera Open Logic
  const handleOpenCamera = async () => {
    setIsCameraOpen(true);
    setCameraError(null);
    setStreamActive(false);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1024 }, height: { ideal: 1024 } },
        audio: false,
      });
      streamRef.current = stream;
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setStreamActive(true);
        }
      }, 150);
    } catch {
      try {
        const fallback = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
        streamRef.current = fallback;
        setTimeout(() => {
          if (videoRef.current) {
            videoRef.current.srcObject = fallback;
            setStreamActive(true);
          }
        }, 150);
      } catch {
        setCameraError('Camera access denied or unavailable. Please enable device permissions.');
      }
    }
  };

  // Camera Close Logic
  const handleCloseCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
      streamRef.current = null;
    }
    setIsCameraOpen(false);
    setStreamActive(false);
    setCameraError(null);
  };

  // Canvas snapping logic
  const handleCapturePhoto = () => {
    if (!videoRef.current) return;
    setShowFlash(true);
    setTimeout(() => setShowFlash(false), 150);
    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    const size = Math.min(video.videoWidth, video.videoHeight);
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
    const sx = (video.videoWidth - size) / 2;
    const sy = (video.videoHeight - size) / 2;
    ctx.drawImage(video, sx, sy, size, size, 0, 0, size, size);
    setSelectedImage(canvas.toDataURL('image/jpeg', 0.9));
    setAnalysisResult(null);
    setTimeout(() => handleCloseCamera(), 200);
  };

  // Simulated AI Dietary Analysis
  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setAnalysisResult({
        mealName: 'Avocado Sourdough Toast with Poached Egg',
        calories: 385,
        macros: {
          carbs:   { value: 42, percentage: 45, label: 'Carbohydrates', color: '#6366F1' },
          protein: { value: 16, percentage: 20, label: 'Protein',       color: '#10B981' },
          fat:     { value: 17, percentage: 35, label: 'Fats',          color: '#F59E0B' },
        },
        ingredients: ['Sourdough Bread (80g)', 'Avocado (100g)', 'Poached Egg (50g)', 'Microgreens & Olive Oil'],
        saved: false,
      });
      setIsAnalyzing(false);
    }, 2200);
  };

  const handleSaveToHistory = () => {
    if (!analysisResult) return;
    onAddMeal({
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      foodItems: analysisResult.mealName,
      calories: analysisResult.calories,
      macros: {
        carbs:   analysisResult.macros.carbs.value,
        protein: analysisResult.macros.protein.value,
        fat:     analysisResult.macros.fat.value,
      },
    });
    setAnalysisResult(prev => ({ ...prev, saved: true }));
  };

  // ChartJS Data
  const chartData = analysisResult
    ? {
        labels: ['Carbs', 'Protein', 'Fats'],
        datasets: [{
          data: [
            analysisResult.macros.carbs.percentage,
            analysisResult.macros.protein.percentage,
            analysisResult.macros.fat.percentage,
          ],
          backgroundColor: [
            analysisResult.macros.carbs.color,
            analysisResult.macros.protein.color,
            analysisResult.macros.fat.color,
          ],
          borderWidth: 0,
          hoverOffset: 6,
        }],
      }
    : null;

  const chartOptions = {
    cutout: '80%',
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: { label: ctx => ` ${ctx.label}: ${ctx.raw}%` },
        backgroundColor: '#0F172A',
        titleFont: { family: 'Outfit', size: 12 },
        bodyFont:  { family: 'Inter',  size: 12 },
        padding: 12,
        cornerRadius: 12,
        displayColors: false,
      },
    },
  };

  const rightState = analysisResult ? 'result' : isAnalyzing ? 'analyzing' : 'awaiting';

  // Calculate high-level vitals
  const totalCalsToday = currentPatient?.mealLogs?.reduce((sum, log) => sum + log.calories, 0) || 0;
  const targetCals = currentPatient?.dailyCalorieGoal || 2000;
  const remainingCals = Math.max(targetCals - totalCalsToday, 0);

  return (
    <div className="space-y-8 animate-fade-up">
      {/* ── Key Metrics Cards Section ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Daily Calorie Intake"
          value={`${totalCalsToday} kcal`}
          subtext={`Goal: ${targetCals} kcal`}
          icon={Flame}
          colorClass="indigo"
          percentage={totalCalsToday > targetCals ? "Over Target" : "Optimal"}
        />
        <StatCard
          title="Remaining Budget"
          value={`${remainingCals} kcal`}
          subtext="Calorie pool balance"
          icon={Activity}
          colorClass="emerald"
        />
        <StatCard
          title="Risk Level Assessment"
          value={currentPatient?.riskLevel || 'Low'}
          subtext="Clinical risk coefficient"
          icon={ShieldAlert}
          colorClass={currentPatient?.riskLevel === 'High' ? 'rose' : currentPatient?.riskLevel === 'Moderate' ? 'amber' : 'emerald'}
        />
        <StatCard
          title="Patient Compliance"
          value="85%"
          subtext="Dietary guidelines adherence"
          icon={Salad}
          colorClass="emerald"
        />
      </div>

      <div className="w-full space-y-6">
        <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Immediate AI Plate Scanner</h3>
          <div
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
            className={`drop-zone p-8 flex flex-col items-center justify-center min-h-[340px] relative overflow-hidden border-2 rounded-2xl ${
              dragActive ? 'drag-active border-indigo-500 bg-indigo-50/20' : 'border-dashed border-slate-200 hover:border-indigo-400 transition-colors'
            }`}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />

            {/* Empty / Awaiting image */}
            {!selectedImage && (
              <div className="text-center flex flex-col items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 shadow-sm border border-indigo-100/50">
                  <Camera className="w-6 h-6 stroke-[2.2] animate-bounce" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">Add meal photograph for diagnostic scanning</h4>
                  <p className="text-xs text-slate-400 max-w-xs mt-1 font-medium leading-relaxed">
                    Upload or capture a photo of the patient's dish to index calories and macronutrients immediately.
                  </p>
                </div>
                <div className="flex gap-3 mt-2">
                  <button
                    type="button"
                    onClick={triggerFileInput}
                    className="bg-white border border-slate-200 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-700 shadow-sm hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    Browse Files
                  </button>
                  <button
                    type="button"
                    onClick={handleOpenCamera}
                    className="bg-indigo-600 text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow-sm hover:bg-indigo-700 transition-colors cursor-pointer"
                  >
                    Use Camera
                  </button>
                </div>
              </div>
            )}

            {/* Preview image */}
            {selectedImage && (
              <div className="w-full flex flex-col items-center gap-5">
                <div className="w-full h-56 rounded-xl overflow-hidden relative group border border-slate-100">
                  <img
                    src={selectedImage}
                    alt="Plate Preview"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                    <button
                      onClick={handleOpenCamera}
                      className="bg-white text-slate-800 px-3.5 py-2 rounded-xl text-xs font-bold shadow-sm hover:bg-slate-50 transition-all cursor-pointer"
                    >
                      Retake
                    </button>
                    <button
                      onClick={() => { setSelectedImage(null); setAnalysisResult(null); }}
                      className="bg-rose-600 text-white px-3.5 py-2 rounded-xl text-xs font-bold shadow-sm hover:bg-rose-700 transition-all cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                </div>

                {!analysisResult && !isAnalyzing && (
                  <button
                    onClick={handleAnalyze}
                    className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-sm shadow-indigo-100 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Estimate Dietary Properties</span>
                  </button>
                )}

                {isAnalyzing && (
                  <div className="flex flex-col items-center gap-2.5 py-3">
                    <div className="w-8 h-8 border-[3px] border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
                    <span className="text-xs font-bold text-slate-700">Synthesizing Plate Estimations...</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Plate scan results layout section (conditionally rendered) */}
      {rightState === 'result' && analysisResult && (
        <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-8 items-start animate-fade-up">
          <div className="space-y-5">
            <div>
              <span className="text-[9px] font-extrabold uppercase tracking-widest bg-indigo-50 border border-indigo-100 text-indigo-600 px-2.5 py-1 rounded-md">
                Computer Vision Analysis
              </span>
              <h4 className="text-2xl font-bold text-slate-800 mt-3">{analysisResult.mealName}</h4>
            </div>

            {/* Micro progress bars */}
            <div className="space-y-3.5">
              {Object.entries(analysisResult.macros).map(([key, macro]) => (
                <div key={key} className="space-y-1">
                  <div className="flex justify-between text-xs font-bold text-slate-600">
                    <span>{macro.label}</span>
                    <span>{macro.value}g ({macro.percentage}%)</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${macro.percentage}%`, backgroundColor: macro.color }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={handleSaveToHistory}
                disabled={analysisResult.saved}
                className={`flex-1 py-3 font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer ${
                  analysisResult.saved
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                    : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-100'
                }`}
              >
                {analysisResult.saved ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Logged in Journal</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    <span>Log to Active Patient</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center border-t md:border-t-0 md:border-l border-slate-100 pt-6 md:pt-0 md:pl-8">
            <div className="relative w-40 h-40 flex items-center justify-center">
              <Doughnut data={chartData} options={chartOptions} />
              <div className="absolute flex flex-col items-center">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Estimated</span>
                <span className="text-3xl font-black text-slate-800">{analysisResult.calories}</span>
                <span className="text-[9px] font-bold text-indigo-600">kcal</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ══ Camera Modal ══ */}
      {isCameraOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
          <div className="bg-white rounded-3xl p-6 shadow-xl max-w-md w-full border border-slate-100 flex flex-col gap-5 relative animate-fade-up">
            <div className="flex justify-between items-center">
              <h3 className="text-base font-bold text-slate-800">Scan Meal Plate</h3>
              <button
                onClick={handleCloseCamera}
                className="text-slate-400 hover:text-slate-600 p-1.5 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="aspect-square w-full rounded-2xl overflow-hidden bg-slate-950 relative flex items-center justify-center border border-slate-100">
              {cameraError ? (
                <div className="p-6 text-center text-xs font-bold text-slate-400">{cameraError}</div>
              ) : (
                <>
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover scale-x-[-1]"
                  />
                  {!streamActive && (
                    <div className="absolute inset-0 bg-slate-950 flex items-center justify-center text-xs text-slate-500">
                      Initializing camera stream...
                    </div>
                  )}
                </>
              )}
              <div className={`absolute inset-0 bg-white z-20 pointer-events-none transition-opacity duration-150 ${showFlash ? 'opacity-100' : 'opacity-0'}`} />
            </div>

            {!cameraError && streamActive && (
              <div className="flex items-center justify-center pt-2">
                <button
                  type="button"
                  onClick={handleCapturePhoto}
                  className="w-16 h-16 rounded-full border-4 border-slate-100 flex items-center justify-center bg-white shadow-md hover:scale-105 active:scale-95 transition-all duration-200"
                >
                  <div className="w-11 h-11 rounded-full bg-indigo-600 flex items-center justify-center shadow-inner" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
