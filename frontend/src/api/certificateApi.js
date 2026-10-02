import client, { API_BASE_URL } from './client';

export const certificateApi = {
  generateCertificate: async (ewasteId) => {
    const res = await client.post(`/certificates/${ewasteId}`);
    return res.data;
  },
  getCertificateById: async (id) => {
    const res = await client.get(`/certificates/${id}`);
    return res.data;
  },
  getUserCertificates: async (userId) => {
    const res = await client.get(`/certificates/user/${userId}`);
    return res.data;
  },
  verifyCertificate: async (certNumber) => {
    const res = await client.get(`/certificates/verify/${certNumber}`);
    return res.data;
  },
  getPdfDownloadUrl: (id) => {
    return `${API_BASE_URL}/certificates/${id}/pdf`;
  }
};
