import client from './client';

export const recyclerApi = {
  getAllRecyclers: async () => {
    const res = await client.get('/recyclers');
    return res.data;
  },
  getRecyclerById: async (id) => {
    const res = await client.get(`/recyclers/${id}`);
    return res.data;
  }
};
