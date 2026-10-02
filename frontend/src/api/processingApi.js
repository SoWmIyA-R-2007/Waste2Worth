import client from './client';

export const processingApi = {
  startProcessing: async (payload) => {
    const res = await client.post('/processing/start', payload);
    return res.data;
  },
  completeProcessing: async (id, recoveredMaterials) => {
    const res = await client.put(`/processing/${id}/complete`, recoveredMaterials);
    return res.data;
  },
  getRecyclerProcessing: async (recyclerId) => {
    const res = await client.get(`/processing/recycler/${recyclerId}`);
    return res.data;
  },
  getByEwasteId: async (ewasteId) => {
    const res = await client.get(`/processing/ewaste/${ewasteId}`);
    return res.data;
  }
};
