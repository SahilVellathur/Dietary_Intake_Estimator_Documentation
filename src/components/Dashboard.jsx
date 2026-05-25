import React, { useState } from 'react';
import { Flame, Activity, Award, Coffee, Utensils, Cookie, Moon, Plus, RotateCcw, Camera, Search, Upload, Sparkles, Apple, Pizza } from 'lucide-react';

export default function Dashboard({ currentPatient, onAddMeal, onResetMeals }) {
  // Extract daily goals and logs
  const dailyCalorieGoal = currentPatient?.dailyCalorieGoal || 2000;
  const mealLogs = currentPatient?.mealLogs || [];

  // Local state for interactive features
  const [scannedFood, setScannedFood] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [successMessage, setSuccessMessage] = useState('');

  // Calculate high-level metrics
  const totalConsumed = mealLogs.reduce((sum, log) => sum + Number(log.calories || 0), 0);
  const remainingBudget = Math.max(dailyCalorieGoal - totalConsumed, 0);
  const completionPercentage = Math.min(Math.round((totalConsumed / dailyCalorieGoal) * 100), 100);

  // Dictionary database of foods
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

  // Filtering search database
  const filteredFood = foodDatabase.filter(food => {
    const matchesSearch = food.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || food.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Action: Log items from directory or scan
  const handleActionLog = (name, calories, protein = '0g', carbs = '0g', fats = '0g') => {
    if (onAddMeal) {
      onAddMeal({
        foodItems: name,
        calories: Number(calories),
        category: selectedCategory === 'All' ? 'Lunch' : (selectedCategory === 'Fruits' ? 'Snack' : 'Lunch'),
        macros: {
          carbs: parseInt(carbs) || 0,
          protein: parseInt(protein) || 0,
          fat: parseInt(fats) || 0
        }
      });
    }
    setSuccessMessage(`Successfully added ${name} (${calories} kcal)!`);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  // Action: Quick Calibration Increments
  const handleQuickAdd = (calories) => {
    if (onAddMeal) {
      onAddMeal({
        foodItems: `Quick Calibration (+${calories} kcal)`,
        calories: calories,
        category: 'Snack',
        macros: { carbs: 0, protein: 0, fat: 0 }
      });
    }
    setSuccessMessage(`Added ${calories} kcal successfully!`);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  // Action: Simulated Vision uploads
  const handleImageUploadSimulation = (e) => {
    if (e.target.files && e.target.files[0]) {
      setScannedFood({
        name: "Premium Avocado Berry Toast Mix",
        confidence: "98.4%",
        calories: 340,
        protein: "11g",
        carbs: "42g",
        fats: "16g"
      });
    }
  };

  const handleUseCameraSimulation = () => {
    setScannedFood({
      name: "Smart Grilled Salmon Quinoa Combo",
      confidence: "95.6%",
      calories: 510,
      protein: "38g",
      carbs: "28g",
      fats: "22g"
    });
  };

  const getMealIcon = (category) => {
    switch (category?.toLowerCase()) {
      case 'breakfast':
        return Coffee;
      case 'lunch':
        return Utensils;
      case 'snack':
      case 'snacks':
        return Cookie;
      case 'dinner':
        return Moon;
      default:
        return Utensils;
    }
  };

  return (
    <div className="space-y-8 animate-fade-up">
      {/* Dynamic Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 block">Personal Tracking Dashboard</span>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Personal Health & Calorie <span className="text-indigo-600">Workspace</span></h1>
          <p className="text-slate-500 mt-1 font-medium">Consolidated monitoring hub for food directory logging, AI snapshots, and timeline audits.</p>
        </div>
        {successMessage && (
          <div className="bg-emerald-50 text-emerald-700 text-xs font-bold px-4 py-2 rounded-xl border border-emerald-100 shadow-sm animate-bounce">
            {successMessage}
          </div>
        )}
      </div>

      {/* 2. Middle Section: 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left Column: Immediate AI Plate Scanner */}
        <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm flex flex-col justify-between space-y-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-indigo-50 text-indigo-600 rounded-lg">
                <Pizza className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-slate-800 text-base">Immediate AI Plate Scanner</h3>
            </div>
            <p className="text-xs text-slate-400 font-medium">Instantly analyze meal snaps via simulated cameras or drop targets.</p>
          </div>

          {/* Interactive Drag & Drop Box */}
          <div className="border-2 border-dashed border-slate-200 rounded-2xl p-6 text-center bg-slate-50/40 flex flex-col items-center justify-center relative group hover:border-indigo-400 transition-colors cursor-pointer min-h-[160px]">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUploadSimulation}
              className="absolute inset-0 opacity-0 cursor-pointer z-10"
            />
            <div className="bg-white p-3 rounded-xl border border-slate-100 text-indigo-600 shadow-sm mb-3 group-hover:scale-105 transition-transform">
              <Camera className="w-5 h-5" />
            </div>
            <p className="text-xs font-bold text-slate-700">Drag & drop or click to add meal photo</p>
            <p className="text-[10px] text-slate-400 mt-1">Accepts any food snap image file to simulate scan results</p>
            <div className="flex gap-2 mt-4 z-20">
              <button type="button" className="bg-white border border-slate-200 text-slate-600 font-bold text-[10px] px-3 py-1.5 rounded-lg shadow-sm hover:bg-slate-50">Browse Files</button>
              <button 
                type="button" 
                onClick={(e) => {
                  e.stopPropagation();
                  handleUseCameraSimulation();
                }}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-[10px] px-3 py-1.5 rounded-lg shadow-sm flex items-center gap-1.5 cursor-pointer transition-all active:scale-95"
              >
                <Upload className="w-3 h-3" /> Use Camera
              </button>
            </div>
          </div>

          {/* Scanned Presentation Drawer Box */}
          {scannedFood ? (
            <div className="bg-gradient-to-r from-indigo-50/60 to-purple-50/40 border border-indigo-100/40 p-4 rounded-xl flex items-center justify-between animate-fade-in">
              <div>
                <span className="text-[8px] font-black tracking-widest text-indigo-600 uppercase block flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5" /> AI Scan Analysis ({scannedFood.confidence})
                </span>
                <h4 className="text-xs font-black text-slate-800 mt-0.5">{scannedFood.name}</h4>
                <p className="text-[10px] text-slate-400 font-mono mt-0.5 font-semibold">P: {scannedFood.protein} | C: {scannedFood.carbs} | F: {scannedFood.fats}</p>
              </div>
              <button
                onClick={() => {
                  handleActionLog(scannedFood.name, scannedFood.calories, scannedFood.protein, scannedFood.carbs, scannedFood.fats);
                  setScannedFood(null);
                }}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-[10px] px-3.5 py-2 rounded-lg shadow-sm transition-all cursor-pointer"
                type="button"
              >
                Log {scannedFood.calories} kcal
              </button>
            </div>
          ) : (
            <div className="text-center py-2.5 text-[10px] text-slate-400 bg-slate-50 border border-slate-100/80 rounded-xl font-medium">
              Awaiting plate snaps upload or camera streams...
            </div>
          )}
        </div>

        {/* Right Column: Fruits & Food Directory Repository */}
        <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-amber-50 text-amber-600 rounded-lg">
                <Apple className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-slate-800 text-base">Fruits & Food Directory Repository</h3>
            </div>
            
            {/* Live Search Box */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search food database (e.g. apple, salad, egg)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50/60 border border-slate-200 text-xs pl-10 pr-4 py-2.5 rounded-xl focus:outline-none focus:border-indigo-500 text-slate-700 font-medium transition-colors"
              />
            </div>

            {/* Pill Filters */}
            <div className="flex gap-2">
              {['All', 'Fruits', 'Meals'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  type="button"
                  className={`px-3 py-1 rounded-full text-[10px] font-extrabold tracking-wider uppercase border transition-all cursor-pointer ${selectedCategory === cat
                    ? 'bg-indigo-600 border-indigo-600 text-white shadow-sm'
                    : 'bg-white border-slate-100 text-slate-400 hover:text-slate-600 hover:bg-slate-50'
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Results List */}
          <div className="divide-y divide-slate-50 overflow-y-auto max-h-[220px] border border-slate-100 rounded-xl bg-slate-50/20">
            {filteredFood.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-400 font-medium">No ingredients match your query.</div>
            ) : (
              filteredFood.map((food, index) => (
                <div key={index} className="p-3 flex items-center justify-between bg-white hover:bg-slate-50/50 transition-all">
                  <div>
                    <h5 className="text-xs font-bold text-slate-800">{food.name}</h5>
                    <span className="text-[9px] text-slate-400 font-mono font-semibold">P: {food.protein} | C: {food.carbs} | F: {food.fats}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-black text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md">{food.calories} kcal</span>
                    <button
                      onClick={() => handleActionLog(food.name, food.calories, food.protein, food.carbs, food.fats)}
                      className="p-1.5 bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white rounded-lg transition-colors cursor-pointer"
                      title="Log this item"
                      type="button"
                    >
                      <Plus className="w-3.5 h-3.5 stroke-[3]" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>


    </div>
  );
}
