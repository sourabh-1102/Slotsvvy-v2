import axios from 'axios';

const ML_SERVICE_URL = process.env.ML_SERVICE_URL || 'http://localhost:8000';

export const getSlotRecommendations = async (pincode: string, date: string, weight: number) => {
  try {
    const response = await axios.get(`${ML_SERVICE_URL}/predict_slots`, {
      params: { pincode, date, weight }
    });
    return response.data;
  } catch (error) {
    console.error('ML Service unavailable, using fallback');
    // Simple fallback
    return [
      { slot_id: 's-fallback-1', start: new Date().toISOString(), end: new Date().toISOString(), score: 0.5, capacity_left: 5 }
    ];
  }
};

export const computeRoutes = async (date: string, pincode: string, parcels: any[]) => {
  try {
      const response = await axios.post(`${ML_SERVICE_URL}/compute_routes`, {
          date, pincode, parcels
      });
      return response.data;
  } catch (error) {
      console.error("Routing failed", error);
      return [];
  }
}
