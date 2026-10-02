import client from './client';

export const adminApi = {
  getDashboard: async () => {
    const res = await client.get('/admin/dashboard');
    return res.data;
  },
  getAnalytics: async () => {
    const res = await client.get('/admin/analytics');
    return res.data;
  },
  getUsers: async () => {
    const res = await client.get('/admin/users');
    return res.data;
  },
  getRequests: async () => {
    const res = await client.get('/admin/requests');
    return res.data;
  },
  getRecyclers: async () => {
    const res = await client.get('/admin/recyclers');
    return res.data;
  },
  getAlerts: async () => {
    const res = await client.get('/admin/alerts');
    return res.data;
  },
  resolveAlert: async (id) => {
    const res = await client.put(`/admin/alerts/${id}/resolve`);
    return res.data;
  }
};
