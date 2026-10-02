import client from './client';

export const notificationApi = {
  getUserNotifications: async (userId) => {
    const res = await client.get(`/notifications/user/${userId}`);
    return res.data;
  },
  getUnreadCount: async (userId) => {
    const res = await client.get(`/notifications/user/${userId}/unread-count`);
    return res.data;
  },
  markAsRead: async (id) => {
    const res = await client.put(`/notifications/${id}/read`);
    return res.data;
  },
  markAllAsRead: async (userId) => {
    const res = await client.put(`/notifications/user/${userId}/read-all`);
    return res.data;
  }
};
