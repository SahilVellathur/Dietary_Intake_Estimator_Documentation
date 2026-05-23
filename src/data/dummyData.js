// Premium Medical-Grade Dummy Data for Patient Dietary Intake Assessment

export const patients = [
  {
    id: 'PT-9402',
    name: 'Eleanor Vance',
    age: 42,
    gender: 'Female',
    weight: 68.5, // kg
    height: 165, // cm
    bmi: 25.2,
    riskLevel: 'Moderate', // Chronic cardiovascular risk
    vitals: {
      bp: '128/82 mmHg',
      heartRate: '72 bpm',
      glucose: '104 mg/dL'
    },
    dailyCalorieGoal: 1800,
    dailyCalorieAvg: 1845,
    mealLogs: [
      { id: 101, name: 'Egg White Omelet & Avocado Toast', category: 'Breakfast', calories: 340, protein: '22g', carbs: '24g', fats: '16g', time: '08:15 AM' },
      { id: 102, name: 'Quinoa Grilled Salmon Salad', category: 'Lunch', calories: 510, protein: '38g', carbs: '28g', fats: '22g', time: '01:00 PM' },
      { id: 103, name: 'Mixed Berries & Greek Yogurt', category: 'Snack', calories: 180, protein: '15g', carbs: '18g', fats: '2g', time: '04:30 PM' },
      { id: 104, name: 'Steamed Broccoli & Baked Cod', category: 'Dinner', calories: 410, protein: '35g', carbs: '15g', fats: '10g', time: '07:15 PM' }
    ]
  },
  {
    id: 'PT-3910',
    name: 'Marcus Sterling',
    age: 58,
    gender: 'Male',
    weight: 94.2, // kg
    height: 182, // cm
    bmi: 28.4,
    riskLevel: 'High', // High metabolic / pre-diabetic risk
    vitals: {
      bp: '138/89 mmHg',
      heartRate: '78 bpm',
      glucose: '136 mg/dL'
    },
    dailyCalorieGoal: 2000,
    dailyCalorieAvg: 2210,
    mealLogs: [
      { id: 201, name: 'Oatmeal with Blueberries & Chia', category: 'Breakfast', calories: 410, protein: '12g', carbs: '64g', fats: '8g', time: '07:45 AM' },
      { id: 202, name: 'Brown Rice with Lean Chicken Breast', category: 'Lunch', calories: 580, protein: '44g', carbs: '52g', fats: '10g', time: '12:45 PM' },
      { id: 203, name: 'Protein Shake & Raw Almonds', category: 'Snack', calories: 320, protein: '28g', carbs: '14g', fats: '15g', time: '05:00 PM' },
      { id: 204, name: 'Baked Salmon with Sweet Potato', category: 'Dinner', calories: 650, protein: '42g', carbs: '45g', fats: '24g', time: '07:45 PM' }
    ]
  },
  {
    id: 'PT-2849',
    name: 'Clara Oswald',
    age: 29,
    gender: 'Female',
    weight: 56.0,
    height: 168,
    bmi: 19.8,
    riskLevel: 'Low',
    vitals: {
      bp: '115/74 mmHg',
      heartRate: '68 bpm',
      glucose: '88 mg/dL'
    },
    dailyCalorieGoal: 2100,
    dailyCalorieAvg: 2050,
    mealLogs: [
      { id: 301, name: 'Peanut Butter Banana Toast', category: 'Breakfast', calories: 380, protein: '14g', carbs: '42g', fats: '18g', time: '08:30 AM' },
      { id: 302, name: 'Grilled Chicken Caesar Salad', category: 'Lunch', calories: 520, protein: '42g', carbs: '12g', fats: '24g', time: '01:15 PM' },
      { id: 303, name: 'Protein Shake & Banana', category: 'Snack', calories: 290, protein: '26g', carbs: '35g', fats: '3g', time: '04:45 PM' },
      { id: 304, name: 'Baked Salmon with Quinoa & Broccoli', category: 'Dinner', calories: 610, protein: '45g', carbs: '42g', fats: '22g', time: '07:30 PM' }
    ]
  },
  {
    id: 'PT-1048',
    name: 'Jonathan Vance',
    age: 63,
    gender: 'Male',
    weight: 88.9,
    height: 176,
    bmi: 28.7,
    riskLevel: 'High',
    vitals: {
      bp: '142/92 mmHg',
      heartRate: '82 bpm',
      glucose: '148 mg/dL'
    },
    dailyCalorieGoal: 1900,
    dailyCalorieAvg: 2150,
    mealLogs: [
      { id: 401, name: 'Greek Yogurt with Granola & Honey', category: 'Breakfast', calories: 320, protein: '18g', carbs: '44g', fats: '6g', time: '08:00 AM' },
      { id: 402, name: 'Turkey Club Sandwich on Whole Wheat', category: 'Lunch', calories: 490, protein: '32g', carbs: '38g', fats: '18g', time: '01:30 PM' },
      { id: 403, name: 'Apple Slices with Peanut Butter', category: 'Snack', calories: 240, protein: '7g', carbs: '25g', fats: '16g', time: '04:15 PM' },
      { id: 404, name: 'Grilled Salmon & Asparagus Medley', category: 'Dinner', calories: 560, protein: '38g', carbs: '10g', fats: '32g', time: '07:00 PM' }
    ]
  }
];

export const statistics = {
  totalPatients: 4,
  criticalPatients: 2,
  averageCaloriesIntake: 2063,
  optimalAdherenceRate: 75 // Percentage
};
