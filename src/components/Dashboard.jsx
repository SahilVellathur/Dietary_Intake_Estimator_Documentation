import React from 'react';
import { Flame, Activity, Award, Coffee, Utensils, Cookie, Moon, Plus, RotateCcw } from 'lucide-react';
import StatCard from './StatCard';

export default function Dashboard({ currentPatient, onAddMeal, onResetMeals }) {
  // If currentPatient is undefined, use fallback values
  const dailyCalorieGoal = currentPatient?.dailyCalorieGoal || 2000;
  const mealLogs = currentPatient?.mealLogs || [];

  // Calculate high-level stats
  const totalConsumed = mealLogs.reduce((sum, log) => sum + Number(log.calories || 0), 0);
  const remainingBudget = Math.max(dailyCalorieGoal - totalConsumed, 0);
  const completionPercentage = Math.min(Math.round((totalConsumed / dailyCalorieGoal) * 100), 100);

  // Quick Calibration Handler
  const handleQuickAdd = (calories) => {
    if (onAddMeal) {
      onAddMeal({
        foodItems: `Quick Calibration (+${calories} kcal)`,
        calories: calories,
        category: 'Snack',
        macros: { carbs: 0, protein: 0, fat: 0 }
      });
    }
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
      {/* Header */}
      <div>
        <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 block">Personal Health Hub</span>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Personal Calorie <span className="text-indigo-600">Workspace</span></h1>
        <p className="text-slate-500 mt-1 font-medium">Keep track of your daily consumed calories, logs, and pools.</p>
      </div>

      {/* Metric Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <StatCard
          title="Total Consumed"
          value={`${totalConsumed} kcal`}
          subtext={`Limit: ${dailyCalorieGoal} kcal`}
          icon={Flame}
          colorClass="indigo"
        />
        <StatCard
          title="Remaining Budget"
          value={`${remainingBudget} kcal`}
          subtext="Calorie pool balance"
          icon={Activity}
          colorClass="emerald"
        />
        <StatCard
          title="Goal Completion"
          value={`${completionPercentage}%`}
          subtext="Daily target completion"
          icon={Award}
          colorClass={completionPercentage >= 100 ? "emerald" : "amber"}
          percentage={completionPercentage >= 100 ? "Goal Met" : "In Progress"}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left 2 Cols: Today's Continuous Log */}
        <div className="lg:col-span-2 bg-white border border-slate-100 rounded-3xl p-6 shadow-sm space-y-6">
          <div className="border-b border-slate-50 pb-4">
            <h3 className="font-bold text-slate-800 text-base">Today's Continuous Log</h3>
            <p className="text-xs text-slate-400 font-medium mt-0.5">A timeline journal of nutrition entries consumed today.</p>
          </div>

          <div className="relative border-l border-slate-100 pl-6 ml-3 space-y-6">
            {mealLogs.length > 0 ? (
              mealLogs.map((log) => {
                const Icon = getMealIcon(log.category);
                return (
                  <div key={log.id} className="relative flex items-center justify-between gap-4 group">
                    {/* Timeline Node Point Icon */}
                    <div className="absolute -left-[35px] w-6 h-6 rounded-full border border-slate-100 bg-white flex items-center justify-center text-slate-500 shadow-sm z-10 group-hover:border-indigo-200 group-hover:text-indigo-600 transition-colors">
                      <Icon className="w-3.5 h-3.5" />
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-800 text-sm">{log.name || log.foodItems}</span>
                        <span className="text-[9px] font-extrabold tracking-wider bg-slate-50 text-slate-400 border border-slate-100 px-2 py-0.5 rounded uppercase">
                          {log.category || 'Lunch'}
                        </span>
                      </div>
                      <span className="block text-[10px] text-slate-400 font-semibold">{log.time || '12:00 PM'}</span>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <span className="font-extrabold text-slate-800 text-sm">{log.calories} kcal</span>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-10 text-slate-400 text-xs font-semibold">
                No logs recorded yet. Use the quick calibration or vision scanner to log food.
              </div>
            )}
          </div>
        </div>

        {/* Right 1 Col: Quick Calibration Action Box */}
        <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm space-y-6">
          <div className="border-b border-slate-50 pb-4">
            <h3 className="font-bold text-slate-800 text-base">Quick Calibration</h3>
            <p className="text-xs text-slate-400 font-medium mt-0.5">Quickly adjust or reset active calorie logs instantly.</p>
          </div>

          <div className="flex flex-col gap-3">
            <button
              onClick={() => handleQuickAdd(100)}
              className="w-full bg-slate-50 hover:bg-indigo-50 border border-slate-100 text-slate-700 hover:text-indigo-600 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>Add 100 kcal</span>
            </button>

            <button
              onClick={() => handleQuickAdd(250)}
              className="w-full bg-slate-50 hover:bg-indigo-50 border border-slate-100 text-slate-700 hover:text-indigo-600 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>Add 250 kcal</span>
            </button>

            <button
              onClick={() => handleQuickAdd(500)}
              className="w-full bg-slate-50 hover:bg-indigo-50 border border-slate-100 text-slate-700 hover:text-indigo-600 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>Add 500 kcal</span>
            </button>

            <div className="w-full border-t border-slate-100 my-2" />

            <button
              onClick={onResetMeals}
              className="w-full bg-rose-50 hover:bg-rose-100 border border-rose-100 text-rose-600 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset Daily Journal</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
