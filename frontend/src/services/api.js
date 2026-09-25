import axios from 'axios';
import { API_BASE_URL } from '../utils/constants';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const ewasteService = {
  getEstimate: async (params) => {
    try {
      const response = await api.get('/ewaste/estimate', { params });
      return response.data;
    } catch (error) {
      console.warn('Backend offline, using fallback valuation calculation:', error);
      // Seamless local calculation fallback
      const baseRates = { smartphones: 350, laptops: 420, desktops: 280, batteries: 180, appliances: 120, accessories: 80 };
      const multi = params.condition === 'working' ? 1.4 : params.condition === 'broken' ? 0.65 : 1.0;
      const rate = baseRates[params.category] || 100;
      const val = Math.round(rate * (params.weightKg || 1) * multi * (params.quantity || 1) * 100) / 100;
      return { estimatedValue: val, currency: 'INR' };
    }
  },

  submitWaste: async (data) => {
    try {
      const response = await api.post('/ewaste/submit', data);
      return response.data;
    } catch (error) {
      console.warn('Backend offline, creating local simulated entry:', error);
      const randomId = 'W2W-EW-' + Math.floor(1000 + Math.random() * 9000);
      const points = Math.max(10, Math.round((data.weightKg || 1) * 10 + (data.estimatedValue || 100) / 10));
      const newItem = {
        id: 'local-' + Date.now(),
        wasteId: randomId,
        ...data,
        ecoPointsEarned: points,
        matchedRecyclerName: data.matchedRecyclerName || 'GreenCycle EcoHub',
        distanceKm: 4.2,
        status: 'REQUESTED',
        qrCodeData: `https://waste2worth.org/verify/${randomId}`,
        sha256VerificationHash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
        createdAt: new Date().toISOString()
      };
      
      const existing = JSON.parse(localStorage.getItem('w2w_requests') || '[]');
      localStorage.setItem('w2w_requests', JSON.stringify([newItem, ...existing]));
      return newItem;
    }
  },

  getUserRequests: async (userId) => {
    try {
      const response = await api.get(`/ewaste/user/${userId}`);
      return response.data;
    } catch (error) {
      const existing = JSON.parse(localStorage.getItem('w2w_requests') || '[]');
      return existing;
    }
  },

  getAllRequests: async () => {
    try {
      const response = await api.get('/ewaste/all');
      return response.data;
    } catch (error) {
      return JSON.parse(localStorage.getItem('w2w_requests') || '[]');
    }
  },

  updateStatus: async (id, status) => {
    try {
      const response = await api.patch(`/ewaste/${id}/status`, { status });
      return response.data;
    } catch (error) {
      const existing = JSON.parse(localStorage.getItem('w2w_requests') || '[]');
      const updated = existing.map(item => item.id === id ? { ...item, status } : item);
      localStorage.setItem('w2w_requests', JSON.stringify(updated));
      return { id, status };
    }
  }
};

export const recyclerService = {
  getAllRecyclers: async () => {
    try {
      const response = await api.get('/recyclers');
      return response.data;
    } catch (error) {
      return [
        {
          id: 'r1',
          name: 'GreenCycle EcoHub',
          phone: '+91 9876543210',
          address: 'Plot 42, Tech Corridor Industrial Area, Chennai',
          acceptedCategories: ['smartphones', 'laptops', 'desktops', 'accessories'],
          dailyCapacityKg: 500,
          currentLoadKg: 145,
          efficiencyRating: 94.5,
          recoveredInventory: { 'Gold (g)': 14.5, 'Copper (kg)': 280, 'Aluminium (kg)': 450 }
        },
        {
          id: 'r2',
          name: 'EcoTech Lithium & Battery Recyclers',
          phone: '+91 9845123456',
          address: 'Sector 9, Clean Energy Zone, Chennai',
          acceptedCategories: ['batteries', 'appliances', 'smartphones'],
          dailyCapacityKg: 800,
          currentLoadKg: 280,
          efficiencyRating: 89.0,
          recoveredInventory: { 'Lithium (kg)': 65, 'Cobalt (kg)': 22, 'Copper (kg)': 190 }
        }
      ];
    }
  }
};

export default api;
