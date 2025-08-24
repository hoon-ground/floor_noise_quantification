import styled from 'styled-components';
import Card from '@shared/ui/Card';
import Spinner from '@shared/ui/Spinner';
import { useMemo } from 'react';
import { yTicks10 } from '@entities/noise/model/timeBuckets';
import { useNoiseByDate } from '@entities/noise/model/noiseQueries';

const Title = styled.h3`
  color: #4c4c4c;
  font-weight: 700;
  margin-bottom: 8px;
`;

const ChartContainer = styled.div`
  height: 200px;
  padding: 8px;
  background: #fff;
  border-radius: 12px;
  display: flex;
  align-items: center;
`;

const ErrorText = styled.div`
  color: #9aa5b1;
  text-align: center;
  width: 100%;
`;

const fmtYmd = (d) => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
};

const WEEKDAY = ['일', '월', '화', '수', '목', '금', '토'];

const WeeklyActivity = () => {
  const today = useMemo(() => new Date(), []);
  const endDate = useMemo(() => fmtYmd(today), [today]);

  const startDate = useMemo(() => {
    const d = new Date(today);
    d.setDate(d.getDate() - 6);
    return fmtYmd(d);
  }, [today]);

  const days = useMemo(() => {
    const arr = [];
    const start = new Date(startDate);
    for (let i = 0; i < 7; i++) {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      arr.push(new Date(d));
    }
    return arr;
  }, [startDate]);

  const { data: list = [], isLoading, isError } = useNoiseByDate(startDate, endDate);

  const points = useMemo(() => {
    const byDay = new Map();
    list.forEach((row) => {
      const d = new Date(row.uploadTime);
      const key = fmtYmd(d);
      const cur = byDay.get(key) || { sum: 0, cnt: 0 };
      cur.sum += Number(row.decibelLevel || 0);
      cur.cnt += 1;
      byDay.set(key, cur);
    });

    return days.map((d) => {
      const key = fmtYmd(d);
      const rec = byDay.get(key);
      const avg = rec ? Math.round(rec.sum / Math.max(1, rec.cnt)) : 0;
      return { t: d, v: avg };
    });
  }, [list, days]);

  const W = 680,
    H = 180,
    P = 28;
  const innerW = W - P * 2;
  const innerH = H - P * 2;

  const yMax = Math.max(...points.map((p) => p.v), 1);
  const yTicks = yTicks10(yMax);
  const yTop = yTicks.at(-1) || 10;

  const xScale = (i) => P + (innerW * i) / Math.max(1, points.length - 1 || 1);
  const yScale = (v) => P + innerH - (innerH * v) / yTop;

  const poly = points.map((p, i) => `${xScale(i)},${yScale(p.v)}`).join(' ');
  const areaPath = points.length
    ? `M ${xScale(0)} ${yScale(0)} L ${poly} L ${xScale(points.length - 1)} ${yScale(0)} Z`
    : '';

  return (
    <Card>
      <Title>주간 소음 수치</Title>
      <ChartContainer>
        {isLoading ? (
          <Spinner />
        ) : !points.length ? (
          <ErrorText>{isError ? '데이터 없음' : '데이터 없음'}</ErrorText>
        ) : (
          <svg
            width="100%"
            height="100%"
            viewBox={`0 0 ${W} ${H}`}
            preserveAspectRatio="none"
            role="img"
            aria-label="주간 소음 활동 그래프"
          >
            <defs>
              <linearGradient id="weeklyArea" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#5ca4ff" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#5ca4ff" stopOpacity="0.05" />
              </linearGradient>
            </defs>

            <rect x="0" y="0" width={W} height={H} rx="12" fill="#fff" />

            {/* y간격 */}
            <g stroke="#e9edf5">
              {yTicks.map((t) => (
                <line key={t} x1={P} x2={P + innerW} y1={yScale(t)} y2={yScale(t)} />
              ))}
            </g>

            {/* y축 */}
            <g fontSize="12" fill="#77838f" textAnchor="end">
              {yTicks.map((t) => (
                <text key={t} x={P - 8} y={yScale(t) + 4}>
                  {t}
                </text>
              ))}
            </g>

            {/* 영역 */}
            {points.length ? (
              <>
                <path d={areaPath} fill="url(#weeklyArea)" />
                <polyline
                  points={poly}
                  fill="none"
                  stroke="#5ca4ff"
                  strokeWidth="3"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
              </>
            ) : null}

            {/* x축 */}
            <g fontSize="12" fill="#908f8f" textAnchor="middle">
              {points.map((p, i) => {
                const month = p.t.getMonth() + 1;
                const date = p.t.getDate();
                const weekday = WEEKDAY[p.t.getDay()];
                return (
                  <text key={i} x={xScale(i)} y={P + innerH + 16}>
                    {`${month}/${date} (${weekday})`}
                  </text>
                );
              })}
            </g>
          </svg>
        )}
      </ChartContainer>
    </Card>
  );
};

export default WeeklyActivity;
