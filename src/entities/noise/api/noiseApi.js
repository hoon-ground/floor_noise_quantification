import { api } from '@shared/api/axiosInstance';

// NoiseData 생성 (파일 업로드 포함)
export const uploadNoiseData = (file, data) => {
  const form = new FormData();
  form.append('file', file);
  form.append('data', new Blob([JSON.stringify(data)], { type: 'application/json' }));
  return api.post('/api/noiseData/upload', form).then((res) => res.data);
};

// 전체 NoiseData 목록조회
export const getNoiseDataList = () => api.get('/api/noiseData').then((res) => res.data);

// 특정 NoiseData 조회
export const getNoiseData = (id) => api.get(`/api/noiseData/${id}`).then((res) => res.data);

// 특정 고객의 NoiseData 조회
export const getNoiseDataByCustomer = (customerId) =>
  api.get(`/api/noiseData/customer/${customerId}`).then((res) => res.data);

// NoiseData 정보 수정
export const updateNoiseData = ({ id, memo }) =>
  api.put('/api/noiseData', { id, memo }).then((res) => res.data);

// NoiseData 파일 포함 삭제
export const deleteNoiseDataWithFile = (id) =>
  api.delete(`/api/noiseData/file/${id}`).then((res) => res.data);
