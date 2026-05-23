import React, { useState } from 'react';
import PatientTable from '../components/PatientTable';
import { Apple, Activity, Flame, Salad, Search, Plus, Trash2 } from 'lucide-react';

export default function Patients({ patientsList = [], currentPatient, onSelectPatient, onAddMeal }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newMeal, setNewMeal] = useState({
    name: '',
    category: 'Breakfast',
    calories: '',
    protein: '',
    carbs: '',
    fats: '',
  });

  const handleAddMealSubmit = (e) => {
    e.preventDefault();
    if (!newMeal.name || !newMeal.calories) return;

    onAddMeal({
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      foodItems: newMeal.name,
      calories: parseInt(newMeal.calories),
      macros: {
        carbs: parseInt(newMeal.carbs) || 0,
        protein: parseInt(newMeal.protein) || 0,
        fat: parseInt(newMeal.fats) || 0,
      },
      category: newMeal.category
    });

    setNewMeal({
      name: '',
      category: 'Breakfast',
      calories: '',
      protein: '',
      carbs: '',
      fats: '',
    });
    setShowAddModal(false);
  };

  // Filter logs dynamically based on search bar input
  const filteredMeals = currentPatient?.mealLogs?.filter(meal =>
    meal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    meal.category.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  // Calculate stats for current patient's meals
  const totalCals = currentPatient?.mealLogs?.reduce((sum, m) => sum + m.calories, 0) || 0;
  const avgCals = currentPatient?.dailyCalorieGoal || 2000;

  return (
    <div className="space-y-8 animate-fade-up">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-black tracking-tight text-slate-900">
          Clinical Roster & <span className="text-indigo-600">Nutrition Journals</span>
        </h1>
        <p className="text-slate-500 mt-1 font-medium">
          Select patient profiles, review historical daily intake logs, and manage custom servings.
        </p>
      </div>

      {/* Patient selector grid */}
      <PatientTable
        patientsList={patientsList}
        activePatientId={currentPatient?.id}
        onSelectPatient={onSelectPatient}
      />

      {currentPatient && (
        <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm space-y-6">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-50 pb-4">
            <div>
              <h3 className="text-base font-bold text-slate-800">
                Nutritional Journal: <span className="text-indigo-600">{currentPatient.name}</span>
              </h3>
              <p className="text-xs text-slate-400 font-medium">Daily Target: {currentPatient.dailyCalorieGoal} kcal • Current: {totalCals} kcal</p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setShowAddModal(true)}
                className="bg-indigo-600 text-white font-bold text-xs uppercase tracking-wider px-4 py-2.5 rounded-xl hover:bg-indigo-700 transition-colors shadow-sm cursor-pointer flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Log Servings</span>
              </button>
            </div>
          </div>

          {/* Search bar inside logs */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search active patient's food items or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200/80 rounded-2xl pl-10 pr-4 py-3 text-xs font-semibold text-slate-700 placeholder-slate-400 focus:outline-none focus:border-indigo-500 transition-all"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          </div>

          {/* Table display */}
          <div className="divide-y divide-slate-50 border border-slate-100 rounded-2xl overflow-hidden">
            {filteredMeals.length > 0 ? (
              filteredMeals.map((meal) => (
                <div key={meal.id} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/40 transition-colors">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-800 text-sm">{meal.name}</span>
                      <span className="text-[9px] font-extrabold tracking-wider bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-md uppercase">
                        {meal.category || 'Lunch'}
                      </span>
                    </div>
                    <span className="block text-[10px] text-slate-400 font-semibold">{meal.time || '12:00 PM'}</span>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                    <div className="text-right min-w-[70px]">
                      <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-tight">Calories</span>
                      <span className="font-extrabold text-slate-800 text-sm">{meal.calories} kcal</span>
                    </div>
                    <div className="bg-slate-100 w-px h-8 hidden sm:block" />
                    <div className="bg-slate-50 border border-slate-100 px-2.5 py-1 rounded-xl text-center min-w-[50px]">
                      <span className="block text-[9px] font-bold text-slate-400 uppercase">Prot</span>
                      <span className="font-bold text-slate-700 text-xs">{meal.protein}</span>
                    </div>
                    <div className="bg-slate-50 border border-slate-100 px-2.5 py-1 rounded-xl text-center min-w-[50px]">
                      <span className="block text-[9px] font-bold text-slate-400 uppercase">Carb</span>
                      <span className="font-bold text-slate-700 text-xs">{meal.carbs}</span>
                    </div>
                    <div className="bg-slate-50 border border-slate-100 px-2.5 py-1 rounded-xl text-center min-w-[50px]">
                      <span className="block text-[9px] font-bold text-slate-400 uppercase">Fat</span>
                      <span className="font-bold text-slate-700 text-xs">{meal.fats}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-12 text-center text-slate-400 text-xs font-semibold">
                No matching servings logged for today.
              </div>
            )}
          </div>
        </div>
      )}

      {/* Manual Serve Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
          <form onSubmit={handleAddMealSubmit} className="bg-white rounded-3xl p-6 shadow-xl max-w-md w-full border border-slate-100 flex flex-col gap-4 relative animate-fade-up">
            <div className="flex justify-between items-center border-b border-slate-50 pb-2">
              <h3 className="text-base font-bold text-slate-800">Manual Dietary Intake Serving</h3>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-xl cursor-pointer"
              >
                <Plus className="w-5 h-5 rotate-45" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Food Item / Serving Details</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Mixed Fruit Oatmeal Bowl"
                  value={newMeal.name}
                  onChange={(e) => setNewMeal(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 font-semibold focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Calories (kcal)</label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 350"
                    value={newMeal.calories}
                    onChange={(e) => setNewMeal(prev => ({ ...prev, calories: e.target.value }))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 font-semibold focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Meal Slot</label>
                  <select
                    value={newMeal.category}
                    onChange={(e) => setNewMeal(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 font-semibold focus:outline-none cursor-pointer"
                  >
                    <option>Breakfast</option>
                    <option>Lunch</option>
                    <option>Snack</option>
                    <option>Dinner</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 bg-slate-50/50 p-3 rounded-xl border border-slate-100">
                <div className="space-y-1 text-center">
                  <label className="text-[9px] font-bold text-slate-400 uppercase">Protein (g)</label>
                  <input
                    type="number"
                    placeholder="0"
                    value={newMeal.protein}
                    onChange={(e) => setNewMeal(prev => ({ ...prev, protein: e.target.value }))}
                    className="w-full bg-white border border-slate-200 text-center rounded-lg py-1 text-xs font-semibold focus:outline-none"
                  />
                </div>
                <div className="space-y-1 text-center">
                  <label className="text-[9px] font-bold text-slate-400 uppercase">Carbs (g)</label>
                  <input
                    type="number"
                    placeholder="0"
                    value={newMeal.carbs}
                    onChange={(e) => setNewMeal(prev => ({ ...prev, carbs: e.target.value }))}
                    className="w-full bg-white border border-slate-200 text-center rounded-lg py-1 text-xs font-semibold focus:outline-none"
                  />
                </div>
                <div className="space-y-1 text-center">
                  <label className="text-[9px] font-bold text-slate-400 uppercase">Fats (g)</label>
                  <input
                    type="number"
                    placeholder="0"
                    value={newMeal.fats}
                    onChange={(e) => setNewMeal(prev => ({ ...prev, fats: e.target.value }))}
                    className="w-full bg-white border border-slate-200 text-center rounded-lg py-1 text-xs font-semibold focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-sm shadow-indigo-100"
            >
              Confirm Log serving
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
