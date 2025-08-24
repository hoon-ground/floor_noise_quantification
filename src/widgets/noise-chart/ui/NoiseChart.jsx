import styled from 'styled-components';
import Card from '@shared/ui/Card';
import Spinner from '@shared/ui/Spinner';
import { useEffect, useMemo, useState } from 'react';
import { getNoiseDataByDate } from '@entities/noise/api/noiseApi';
import { bucketize, pickBucketMs, yTicks10 } from '@entities/noise/model/timeBuckets';

const Title = styled.h3`
  color: #4c4c4c;
  font-weight: 700;
  margin-bottom: 8px;
`;

const ChartContainer = styled.div`
  height: 220px;
  padding: 8px;
  background: #fff;
  border-radius: 12px;
  display: flex;
  align-items: center;
`;

const sameDate = (a, b) => {
  if (!a || !b) {
    return false;
  }
  return String(a).slice(0, 10) === String(b).slice(0, 10);
};

const fallbackRange = () => {
  const ds = new Date().toISOString().slice(0, 10);
  return {
    startIso: ds,
    endIso: ds,
    start: new Date(`${ds}T00:01:00`),
    end: new Date(`${ds}T23:59:00`),
    singleDay: true,
  };
};

const NoiseChart = ({ startDate, endDate }) => {
  const [loading, setLoading] = useState(false);
  const [series, setSeries] = useState([]);
  const [bucketMs, setBucketMs] = useState(60 * 1000);
  const [error, setError] = useState('');

  const { start, end, singleDay, startIso, endIso } = useMemo(() => {
    if (!startDate || !endDate) {
      return fallbackRange();
    }

    if (sameDate(startDate, endDate)) {
      return {
        startIso: startDate,
        endIso: endDate,
        start: new Date(`${startDate}T00:01:00`),
        end: new Date(`${endDate}T23:59:00`),
        singleDay: true,
      };
    }
    return {
      startIso: startDate,
      endIso: endDate,
      start: new Date(`${startDate}T00:00:00`),
      end: new Date(`${endDate}T23:59:59`),
      singleDay: false,
    };
  }, [startDate, endDate]);

  useEffect(() => {
    if (!start || !end) {
      return;
    }

    const fetchRange = async () => {
      try {
        setLoading(true);
        setError('');

        const res = await getNoiseDataByDate({ startDate: startIso, endDate: endIso });
        if (!res.data?.success) {
          throw new Error('소음 데이터 조회 실패');
        }
        const list = res.data.data || [];

        const dur = end - start;
        const bm = pickBucketMs(dur, { singleDay });
        setBucketMs(bm);

        const buckets = bucketize({ points: list, start, end, bucketMs: bm });
        setSeries(buckets);
      } catch (e) {
        console.error(e);
        setError('데이터 없음');
        setSeries([]);
      } finally {
        setLoading(false);
      }
    };
    fetchRange();
  }, [start, end, singleDay, startIso, endIso]);

  const W = 680,
    H = 200,
    P = 28;
  const innerW = W - P * 2,
    innerH = H - P * 2;

  const yMax = Math.max(...series.map((s) => s.v), 1);
  const yTicks = yTicks10(yMax);
  const yMaxTick = (yTicks[yTicks.length - 1] ?? 10) || 10;

  const xScale = (i) => P + (innerW * i) / Math.max(1, (series.length || 1) - 1);
  const yScale = (v) => P + innerH - (innerH * v) / yMaxTick;

  const points =
    series.length > 0 ? series.map((s, i) => `${xScale(i)},${yScale(s.v)}`).join(' ') : '';

  const areaPath =
    series.length > 0
      ? `M ${xScale(0)} ${yScale(0)} L ${points} L ${xScale(series.length - 1)} ${yScale(0)} Z`
      : '';

  const fmtX = (t) => {
    const d = new Date(t);
    return singleDay ? d.toTimeString().slice(0, 5) : `${d.getMonth() + 1}/${d.getDate()}`;
  };

  const xLabelIdx = useMemo(() => {
    const n = series.length;

    if (n <= 1) {
      return [0];
    }

    const want = Math.min(8, Math.max(3, Math.floor(n / 6)));
    const step = Math.max(1, Math.floor(n / want));
    const arr = [];

    for (let i = 0; i < n; i += step) {
      arr.push(i);
    }
    if (arr[arr.length - 1] !== n - 1) {
      arr.push(n - 1);
    }
    return arr;
  }, [series.length]);

  return (
    <Card>
      <Title>시간대별 소음 수치</Title>
      <ChartContainer>
        {loading ? (
          <Spinner />
        ) : (
          <svg
            width="100%"
            height="100%"
            viewBox={`0 0 ${W} ${H}`}
            preserveAspectRatio="none"
            role="img"
            aria-label="시간대별 소음 차트"
          >
            <defs>
              <linearGradient id="rangeArea" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#5ca4ff" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#5ca4ff" stopOpacity="0.05" />
              </linearGradient>
            </defs>

            <rect x="0" y="0" width={W} height={H} rx="12" fill="#fff" />

            {/* y축 */}
            <g stroke="#e9edf5">
              {yTicks.map((t) => (
                <line key={t} x1={P} x2={P + innerW} y1={yScale(t)} y2={yScale(t)} />
              ))}
            </g>
            <g fontSize="12" fill="#77838f" textAnchor="end">
              {yTicks.map((t) => (
                <text key={t} x={P - 8} y={yScale(t) + 4}>
                  {t}
                </text>
              ))}
            </g>

            {/* 영역 */}
            {series.length ? (
              <>
                <path d={areaPath} fill="url(#rangeArea)" />
                <polyline
                  points={points}
                  fill="none"
                  stroke="#5ca4ff"
                  strokeWidth="3"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
              </>
            ) : (
              <text x={W / 2} y={H / 2} textAnchor="middle" fill="#9aa5b1">
                {error || '데이터 없음'}
              </text>
            )}

            {/* x축 */}
            <g fontSize="12" fill="#908f8f" textAnchor="middle">
              {xLabelIdx.map((i) => (
                <text key={i} x={xScale(i)} y={P + innerH + 16}>
                  {series[i] ? fmtX(series[i].t) : ''}
                </text>
              ))}
            </g>

            {/* 버킷 */}
            <g fontSize="11" fill="#9aa5b1">
              <text x={W - P} y={H - 8} textAnchor="end">
                bucket: {Math.round(bucketMs / 60000)}m
              </text>
            </g>
          </svg>
        )}
      </ChartContainer>
    </Card>
  );
};

export default NoiseChart;
