import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { qk } from '@shared/lib/queryKeys';
import { getNoiseDataByDate, getNoiseReport, uploadNoiseData } from '@entities/noise/api/noiseApi';

export const useNoiseByDate = (startDate, endDate, options = {}) =>
  useQuery({
    queryKey: qk.noiseByDate(startDate, endDate),
    queryFn: async () => {
      const r = await getNoiseDataByDate({ startDate, endDate });
      return r?.data?.data ?? [];
    },
    enabled: Boolean(startDate && endDate),
    ...options,
  });

export const useNoiseReport = (startDate, endDate, options = {}) =>
  useQuery({
    queryKey: qk.noiseReport(startDate, endDate),
    queryFn: async () => {
      const r = await getNoiseReport({ startDate, endDate });
      return r?.data?.data ?? null;
    },
    enabled: Boolean(startDate && endDate),
    ...options,
  });

export const useUploadNoiseData = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ customerId, decibelLevel, file }) =>
      uploadNoiseData({ customerId, decibelLevel, file }),
    onSuccess: (_res, variables) => {
      const today = new Date().toISOString().slice(0, 10);
      qc.invalidateQueries({ queryKey: qk.noiseByDate(today, today) });
      qc.invalidateQueries({ queryKey: qk.noiseReport(today, today) });
    },
  });
};
