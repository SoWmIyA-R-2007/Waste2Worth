import client, { API_BASE_URL } from './client';

export const ewasteApi = {
  getEstimate: async (params) => {
    const res = await client.get('/ewaste/estimate', { params });
    return res.data;
  },
  submitWaste: async (data) => {
    const res = await client.post('/ewaste', data);
    return res.data;
  },
  getItem: async (id) => {
    const res = await client.get(`/ewaste/${id}`);
    return res.data;
  },
  getUserRequests: async (userId) => {
    const res = await client.get(`/ewaste/user/${userId}`);
    return res.data;
  },
  getAllRequests: async () => {
    const res = await client.get('/ewaste');
    return res.data;
  },
  updateStatus: async (id, status) => {
    const res = await client.put(`/ewaste/${id}/status`, { status });
    return res.data;
  },
  getQRCodeUrl: (id) => {
    return `${API_BASE_URL}/ewaste/${id}/qr`;
  },
  getVerificationData: async (id) => {
    const res = await client.get(`/ewaste/${id}/verify`);
    return res.data;
  }
};
