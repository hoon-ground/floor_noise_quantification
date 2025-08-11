import { axiosInstance } from './axiosInstance';

// 2.2 NoiseData 생성(파일 업로드 포함)
export const uploadNoiseData = (file, data) => {
  const form = new FormData();
  form.append('file', file);
  form.append('data', new Blob([JSON.stringify(data)], { type: 'application/json' }));

  return axiosInstance.post('/api/noiseData/upload', form).then((res) => res.data);
};

// 2.3 전체 NoiseData 목록조회
export const getNoiseDataList = () => axiosInstance.get('/api/noiseData').then((res) => res.data);

// 2.4 특정 NoiseData 조회
export const getNoiseData = (id) =>
  axiosInstance.get(`/api/noiseData/${id}`).then((res) => res.data);

// 2.5 특정 고객의 NoiseData 조회
export const getNoiseDataByCustomer = (customerId) =>
  axiosInstance.get(`/api/noiseData/customer/${customerId}`).then((res) => res.data);

// 2.6 NoiseData 정보 수정
export const updateNoiseData = ({ id, memo }) =>
  axiosInstance.put('/api/noiseData', { id, memo }).then((res) => res.data);

// 2.7 NoiseData File 포함 삭제
export const deleteNoiseDataWithFile = (id) =>
  axiosInstance.delete(`/api/noiseData/file/${id}`).then((res) => res.data);
