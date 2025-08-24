import {
  getNoiseDataList,
  getCustomerNoiseData,
  uploadNoiseData,
} from '@entities/noise/api/noiseApi';

export const getRecentNoiseChartData = async () => {
  const res = await getNoiseDataList();
  console.log(res.data);
  if (!res.data.success) {
    throw new Error('소음 데이터 조회 실패');
  }

  const list = res.data.data;

  // 시간순 정렬
  const sorted = [...list].sort((a, b) => new Date(a.uploadTime) - new Date(b.uploadTime));

  // 최근 18개만 사용
  const trimmed = sorted.slice(-18);

  return trimmed.map((item) => item.decibelLevel);
};

export const getNoiseIndex = async () => {
  const res = await getCustomerNoiseData();
  if (!res.data.success) {
    throw new Error('소음 데이터 조회 실패');
  }

  const list = res.data.data;
  if (!list.length) {
    return 0;
  }

  const decibelAvg = list.reduce((acc, v) => acc + v.decibelLevel, 0) / list.length;
  return Math.round(decibelAvg);
};

export const sendNoiseData = async ({ customerId, decibelLevel, file }) => {
  try {
    const res = await uploadNoiseData({ customerId, decibelLevel, file });

    if (!res.data.success) {
      throw new Error('소음 업로드 실패');
    }

    return res.data.data;
  } catch (err) {
    console.error('[sendNoiseData]', err);
    throw err;
  }
};
