import client from './client';

export const pickupApi = {
  createPickup: async (data) => {
    const res = await client.post('/pickups', data);
    return res.data;
  },
  getPickupById: async (id) => {
    const res = await client.get(`/pickups/${id}`);
    return res.data;
  },
  getUserPickups: async (userId) => {
    const res = await client.get(`/pickups/user/${userId}`);
    return res.data;
  },
  getRecyclerPickups: async (recyclerId) => {
    const res = await client.get(`/pickups/recycler/${recyclerId}`);
    return res.data;
  },
  updateStatus: async (id, status, notes) => {
    const res = await client.put(`/pickups/${id}/status`, { status, notes });
    return res.data;
  },
  assignCollector: async (id, collectorId, scheduledDate, scheduledTime) => {
    const res = await client.post(`/pickups/${id}/assign`, { collectorId, scheduledDate, scheduledTime });
    return res.data;
  }
};
