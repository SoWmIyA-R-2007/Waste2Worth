import client from './client';

export const userApi = {
  getUser: async (id) => {
    const res = await client.get(`/users/${id}`);
    return res.data;
  },
  updateUser: async (id, data) => {
    const res = await client.put(`/users/${id}`, data);
    return res.data;
  },
  getUserHistory: async (id) => {
    const res = await client.get(`/users/${id}/history`);
    return res.data;
  },
  getUserRewards: async (id) => {
    const res = await client.get(`/users/${id}/rewards`);
    return res.data;
  }
};
