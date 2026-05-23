import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile'; // This contains our analytics trends
import Settings from './components/Settings'; // Our personal settings/details view
import FoodScanner from './components/FoodScanner';
import DietaryHistory from './components/DietaryHistory';
import AuthPage from './components/AuthPage';
import Sidebar from './components/Sidebar';
import { patients as initialPatients } from './data/dummyData';

function App() {
  const [isLogin, setIsLogin] = useState(true);
  const [activePage, setActivePage] = useState('dashboard');
  const [patientsList, setPatientsList] = useState(initialPatients);
  const [selectedPatientId, setSelectedPatientId] = useState(initialPatients[0]?.id || null);

  const selectedPatient = patientsList.find(p => p.id === selectedPatientId) || patientsList[0];

  // Hardcoded personal metrics profile for single-user context state tracking
  const [personalMetrics, setPersonalMetrics] = useState({
    name: 'Alex Miller',
    email: 'alex.miller@nutriflow.com',
    age: 26,
    height: 178,
    weight: 72,
    dailyCalorieTarget: 2200,
    dailyCalorieIntake: 1440,
    remainingBudget: 3600,
    complianceScore: 85
  });

  // Simple handler to mock macro updates or tracking submissions from dashboard widgets
  const handleAddMeal = (mealCalories) => {
    setPersonalMetrics(prev => {
      const newIntake = prev.dailyCalorieIntake + Number(mealCalories);
      return {
        ...prev,
        dailyCalorieIntake: newIntake,
        remainingBudget: Math.max(0, prev.dailyCalorieTarget - newIntake)
      };
    });
  };

  // Handler to log calories from scanner
  const handleLogCalories = (calories) => {
    handleAddMeal(calories);
    handleAddMealForPatient({
      foodItems: 'AI Scanned Plate Meal',
      calories: Number(calories),
      macros: { carbs: 0, protein: 0, fat: 0 }
    });
  };

  // Handler to add a meal to the selected patient's meal logs
  const handleAddMealForPatient = (meal) => {
    setPatientsList(prevList => {
      return prevList.map(p => {
        if (p.id === selectedPatientId) {
          const newMealLog = {
            id: Date.now(),
            name: meal.foodItems,
            category: meal.category || 'Lunch',
            calories: meal.calories,
            protein: `${meal.macros?.protein || 0}g`,
            carbs: `${meal.macros?.carbs || 0}g`,
            fats: `${meal.macros?.fat || 0}g`,
            time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
          };
          return {
            ...p,
            mealLogs: [...(p.mealLogs || []), newMealLog]
          };
        }
        return p;
      });
    });
  };

  const handleResetMeals = () => {
    setPatientsList(prevList => {
      return prevList.map(p => {
        if (p.id === selectedPatientId) {
          return {
            ...p,
            mealLogs: []
          };
        }
        return p;
      });
    });
  };

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':
        return (
          <Dashboard
            currentPatient={selectedPatient}
            onAddMeal={handleAddMealForPatient}
            onResetMeals={handleResetMeals}
          />
        );
      case 'scanner':
        return (
          <FoodScanner
            onLogCalories={handleLogCalories}
          />
        );
      case 'history':
        return <DietaryHistory />;
      case 'analytics':
        return <Profile />;
      case 'reports':
      case 'profile':
        return (
          <Settings
            setIsLogin={setIsLogin}
          />
        );
      default:
        return (
          <Dashboard
            currentPatient={selectedPatient}
            onAddMeal={handleAddMealForPatient}
            onResetMeals={handleResetMeals}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {!isLogin ? (
        <div className="w-full flex items-center justify-center p-4">
          <AuthPage setIsLogin={setIsLogin} />
        </div>
      ) : (
        <>
          {/* Main navigation dock */}
          <Sidebar activePage={activePage} setActivePage={setActivePage} />

          <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
            <main className="flex-1 overflow-y-auto p-8 lg:p-10">
              <div className="max-w-6xl mx-auto">
                {renderPage()}
              </div>
            </main>
          </div>
        </>
      )}
    </div>
  );
}

export default App;