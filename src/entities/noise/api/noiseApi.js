import api from '@shared/api/axiosInstance';

const CUSTOMER_ID = 1;

export const getNoiseDataList = () => api.get('/api/noiseData');

export const getCustomerNoiseData = () => api.get(`/api/noiseData/customer/${CUSTOMER_ID}`);

export const uploadNoiseData = async ({ customerId, decibelLevel, file }) => {
  const formData = new FormData();
  formData.append('file', file);

  return api.post(`/api/noiseData/upload`, formData, {
    params: { customerId, decibelLevel },
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const getNoiseDataByDate = ({ customerId = CUSTOMER_ID, startDate, endDate }) => {
  return api.post('/api/noiseData/date', {
    customerId,
    startDate, // 'YYYY-MM-DD'
    endDate, // 'YYYY-MM-DD'
  });
};

export const getNoiseReport = ({ customerId = CUSTOMER_ID, startDate, endDate }) => {
  return api.post('/api/noiseReport', {
    customerId,
    startDate, // 'YYYY-MM-DD'
    endDate, // 'YYYY-MM-DD'
  });
};
