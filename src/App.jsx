import React, { useState } from 'react';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Analytics from './pages/Analytics';
import Reports from './pages/Reports';
import Sidebar from './components/Sidebar';

function App() {
  const [isLogin, setIsLogin] = useState(true);
  const [activePage, setActivePage] = useState('dashboard');

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

  const renderPage = () => {
    switch (activePage) {
      case 'analytics':
        return <Analytics metrics={personalMetrics} />;
      case 'reports':
        return (
          <Reports
            metrics={personalMetrics}
            setMetrics={setPersonalMetrics}
            setIsLogin={setIsLogin}
          />
        );
      case 'dashboard':
      default:
        return (
          <Dashboard
            metrics={personalMetrics}
            onAddMeal={handleAddMeal}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {!isLogin ? (
        <div className="w-full flex items-center justify-center p-4">
          <Login setIsLogin={setIsLogin} />
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