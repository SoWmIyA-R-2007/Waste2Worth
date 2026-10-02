import client from './client';

export const rewardApi = {
  getUserRewards: async (userId) => {
    const res = await client.get(`/rewards/user/${userId}`);
    return res.data;
  },
  getLeaderboard: async () => {
    const res = await client.get('/rewards/leaderboard');
    return res.data;
  }
};
