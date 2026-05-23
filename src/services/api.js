import { patients, statistics } from '../data/dummyData';

// Simulated latency utility
const sleep = (ms = 400) => new Promise(resolve => setTimeout(resolve, ms));

export const patientService = {
  /**
   * Retrieves all patient profiles
   */
  getAllPatients: async () => {
    await sleep(250);
    return [...patients];
  },

  /**
   * Retrieves a single patient by ID
   */
  getPatientById: async (id) => {
    await sleep(150);
    return patients.find(p => p.id === id) || null;
  },

  /**
   * Adds a meal log to a specific patient
   */
  addPatientMealLog: async (patientId, meal) => {
    await sleep(300);
    const patient = patients.find(p => p.id === patientId);
    if (patient) {
      const newMeal = {
        id: Date.now(),
        ...meal
      };
      patient.mealLogs = [newMeal, ...patient.mealLogs];
      return { success: true, meal: newMeal };
    }
    return { success: false, error: 'Patient not found' };
  },

  /**
   * Retrieves high-level dashboard statistics
   */
  getStatistics: async () => {
    await sleep(200);
    return { ...statistics };
  }
};
