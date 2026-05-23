import React, { useState } from 'react';
import { Camera, Search, Upload, Plus, Flame, Sparkles, Apple, Pizza } from 'lucide-react';

export default function FoodScanner({ onLogCalories }) {
  const [scannedFood, setScannedFood] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [successMessage, setSuccessMessage] = useState('');

  // Premium structured dictionary for fruits, vegetables, and dishes
  const foodDatabase = [
    { name: 'Apple (Medium)', calories: 95, protein: '0.5g', carbs: '25g', fats: '0.3g', category: 'Fruits' },
    { name: 'Banana (Large)', calories: 105, protein: '1.3g', carbs: '27g', fats: '0.4g', category: 'Fruits' },
    { name: 'Fresh Strawberries (1 Cup)', calories: 49, protein: '1.0g', carbs: '12g', fats: '0.4g', category: 'Fruits' },
    { name: 'Avocado (Whole)', calories: 240, protein: '3.0g', carbs: '12g', fats: '22g', category: 'Fruits' },
    { name: 'Mango Slices (1 Cup)', calories: 99, protein: '1.4g', carbs: '25g', fats: '0.6g', category: 'Fruits' },
    { name: 'Grilled Chicken Breast', calories: 165, protein: '31g', carbs: '0g', fats: '3.6g', category: 'Meals' },
    { name: 'Brown Rice (1 Cup)', calories: 215, protein: '5.0g', carbs: '45g', fats: '1.6g', category: 'Meals' },
    { name: 'Boiled Egg (Large)', calories: 78, protein: '6.3g', carbs: '0.6g', fats: '5.3g', category: 'Meals' },
    { name: 'Mixed Green Salad', calories: 45, protein: '2.0g', carbs: '9g', fats: '0.2g', category: 'Meals' },
  ];

  const filteredFood = foodDatabase.filter(food => {
    const matchesSearch = food.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || food.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleActionLog = (name, calories) => {
    if (onLogCalories) {
      onLogCalories(calories);
    }
    setSuccessMessage(`Successfully added ${name} (${calories} kcal)!`);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleImageUploadSimulation = (e) => {
    if (e.target.files && e.target.files[0]) {
      setScannedFood({
        name: "Premium Avocado Berry Toast Mix",
        confidence: "98.4%",
        calories: 340,
        protein: "11g",
        carbs: "42g"
      });
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Top Heading */}
      <div className="border-b border-slate-100 pb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 block">AI Recognition Module</span>
          <h1 className="text-xl font-black text-slate-900 tracking-tight">Smart Vision & Food Repository</h1>
          <p className="text-xs text-slate-400 mt-1">Identify nutrient splits instantly via uploaded imagery or quick-search indexes.</p>
        </div>

        {/* Success Alert Floating Badge */}
        {successMessage && (
          <div className="bg-emerald-50 text-emerald-700 text-xs font-bold px-4 py-2 rounded-xl border border-emerald-100 shadow-sm animate-bounce">
            {successMessage}
          </div>
        )}
      </div>

      {/* Main Core Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* LEFT COMPONENT: Interactive Live Search Panel */}
        <div className="bg-white border border-slate-100 rounded-2xl shadow-sm p-6 space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-amber-50 text-amber-600 rounded-lg">
                <Apple className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-black text-slate-800 tracking-tight">Search Directory</h3>
            </div>

            {/* Premium Text Filter Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Type to search fruits or dishes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50/60 border border-slate-200 text-xs pl-10 pr-4 py-2.5 rounded-xl focus:outline-none focus:border-indigo-500 text-slate-700 font-medium"
              />
            </div>

            {/* Pill Filters Selector */}
            <div className="flex gap-2 pt-1">
              {['All', 'Fruits', 'Meals'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 rounded-full text-[10px] font-extrabold tracking-wider uppercase border transition-all cursor-pointer ${selectedCategory === cat
                    ? 'bg-indigo-600 border-indigo-600 text-white shadow-sm'
                    : 'bg-white border-slate-100 text-slate-400 hover:text-slate-600'
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Results Grid Box */}
          <div className="divide-y divide-slate-50 overflow-y-auto max-h-[280px] border border-slate-100 rounded-xl mt-2">
            {filteredFood.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-400">No items match your active parameters.</div>
            ) : (
              filteredFood.map((food, index) => (
                <div key={index} className="p-3.5 flex items-center justify-between bg-white hover:bg-slate-50/40 transition-all">
                  <div>
                    <h4 className="text-xs font-bold text-slate-800">{food.name}</h4>
                    <span className="text-[9px] text-slate-400 font-mono">P: {food.protein} | C: {food.carbs} | F: {food.fats}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-black text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md">{food.calories} kcal</span>
                    <button
                      onClick={() => handleActionLog(food.name, food.calories)}
                      className="p-1.5 bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white rounded-lg transition-colors cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5 stroke-[3]" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* RIGHT COMPONENT: Immediate AI Vision Upload Box Container */}
        <div className="bg-white border border-slate-100 rounded-2xl shadow-sm p-6 flex flex-col justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-indigo-50 text-indigo-600 rounded-lg">
                <Pizza className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-black text-slate-800 tracking-tight">AI Plate Snapshot Scan</h3>
            </div>
            <p className="text-[11px] text-slate-400">Drop a snapshot image to estimate composition layouts seamlessly.</p>
          </div>

          {/* Core Hidden Input File Area Section */}
          <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center bg-slate-50/40 flex flex-col items-center justify-center my-4 relative group hover:border-indigo-400 transition-colors">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUploadSimulation}
              className="absolute inset-0 opacity-0 cursor-pointer z-10"
            />
            <div className="bg-white p-3 rounded-xl border border-slate-100 text-indigo-600 shadow-sm mb-3 group-hover:scale-105 transition-transform">
              <Camera className="w-5 h-5" />
            </div>
            <p className="text-xs font-bold text-slate-700">Add meal photograph for diagnostic scanning</p>
            <p className="text-[10px] text-slate-400 mt-1 max-w-xs">Click here to select a camera image file format.</p>
            <div className="flex gap-2 mt-4">
              <button type="button" className="bg-white border border-slate-200 text-slate-600 font-bold text-[11px] px-3 py-1.5 rounded-lg shadow-sm">Browse Files</button>
              <button type="button" className="bg-indigo-600 text-white font-bold text-[11px] px-3 py-1.5 rounded-lg shadow-sm flex items-center gap-1.5">
                <Upload className="w-3 h-3" /> Use Camera
              </button>
            </div>
          </div>

          {/* AI Result Presentation Drawer Box */}
          {scannedFood ? (
            <div className="bg-gradient-to-r from-indigo-50/60 to-purple-50/40 border border-indigo-100/40 p-3.5 rounded-xl flex items-center justify-between animate-fade-in">
              <div>
                <span className="text-[8px] font-black tracking-widest text-indigo-600 uppercase block flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5" /> AI Match Evaluation ({scannedFood.confidence})
                </span>
                <h4 className="text-xs font-black text-slate-800 mt-0.5">{scannedFood.name}</h4>
                <p className="text-[10px] text-slate-400 font-mono mt-0.5">P: {scannedFood.protein} | C: {scannedFood.carbs}</p>
              </div>
              <button
                onClick={() => {
                  handleActionLog(scannedFood.name, scannedFood.calories);
                  setScannedFood(null);
                }}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-[11px] px-3 py-2 rounded-lg shadow-sm transition-all cursor-pointer"
              >
                Log {scannedFood.calories} kcal
              </button>
            </div>
          ) : (
            <div className="text-center py-2 text-[10px] text-slate-400 bg-slate-50 border border-slate-100/80 rounded-xl">
              Awaiting plate diagnostic input streams...
            </div>
          )}
        </div>

      </div>
    </div>
  );
}