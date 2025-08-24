import { useEffect, useMemo, useState } from 'react';
import { useNoiseByDate, useNoiseReport } from '@entities/noise/model/noiseQueries';

export const RANGE_KEY = 'report:dateRange';

const loadInitialRange = () => {
  const today = new Date().toISOString().slice(0, 10);
  try {
    const raw = sessionStorage.getItem(RANGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed?.startDate && parsed?.endDate) {
        return parsed;
      }
    }
  } catch {}
  return { startDate: today, endDate: today };
};

export const useReportPage = () => {
  const [range, setRange] = useState(loadInitialRange);
  useEffect(() => {
    try {
      sessionStorage.setItem(RANGE_KEY, JSON.stringify(range));
    } catch {}
  }, [range.startDate, range.endDate]);

  const listQuery = useNoiseByDate(range.startDate, range.endDate);
  const reportQuery = useNoiseReport(range.startDate, range.endDate);
  const loading = listQuery.isLoading || reportQuery.isLoading;

  const { start, end, singleDay } = useMemo(() => {
    const same = range.startDate === range.endDate;
    return {
      start: new Date(`${range.startDate}T${same ? '00:01:00' : '00:00:00'}`),
      end: new Date(`${range.endDate}T23:59:59`),
      singleDay: same,
    };
  }, [range.startDate, range.endDate]);

  return {
    range,
    setRange,

    list: listQuery.data || [],
    report: reportQuery.data || null,
    loading,

    start,
    end,
    singleDay,
  };
};
