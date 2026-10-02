import client from './client';

export const authApi = {
  login: async (credentials) => {
    const res = await client.post('/auth/login', credentials);
    return res.data;
  },
  register: async (userData) => {
    const res = await client.post('/auth/register', userData);
    return res.data;
  },
  getCurrentUser: async () => {
    const res = await client.get('/auth/me');
    return res.data;
  }
};
