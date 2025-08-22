import styled from 'styled-components';
import Card from '@shared/ui/Card';

const Title = styled.h2`
  color: #4c4c4c;
  font-family: Inter;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 600;
  line-height: 140%;
`;

const ChartWrap = styled.div`
  height: 200px;
  border-radius: 12px;
  background: #fff;
  padding: 8px;
  display: flex;
  align-items: center;
`;

const createScale = (domainMin, domainMax, rangeMin, rangeMax) => {
  const d = domainMax - domainMin || 1;
  const r = rangeMax - rangeMin;
  return (v) => rangeMin + ((v - domainMin) / d) * r;
};

// TODO : 전부 임시 데이터. 갈아엎을 예정
const NoiseChart = () => {
  const data = [3, 5, 4, 6, 7, 8, 7, 9, 6, 8, 10, 6, 7, 8, 11, 9, 8, 7];

  const W = 680;
  const H = 160;
  const P = 24;
  const innerW = W - P * 2;
  const innerH = H - P * 2;

  const yMax = Math.max(...data, 1);
  const xScale = createScale(0, data.length - 1, P, P + innerW);
  const yScale = createScale(0, yMax, P + innerH, P);

  const points = data.map((v, i) => `${xScale(i)},${yScale(v)}`).join(' ');

  const areaPath = `
    M ${xScale(0)} ${yScale(0)}
    L ${points}
    L ${xScale(data.length - 1)} ${yScale(0)}
    Z
  `;

  const yTicks = [0, 60, 80, 100, 120, 140].filter((t) => t <= Math.max(140, yMax));
  const xLabels = [
    { idx: 0, label: '00:00' },
    { idx: 2, label: '02:00' },
    { idx: 4, label: '04:00' },
    { idx: 6, label: '06:00' },
  ].filter(({ idx }) => idx < data.length);

  return (
    <Card>
      <Title>시간대별 소음 수치</Title>
      <ChartWrap>
        <svg
          width="100%"
          height="100%"
          viewBox={`0 0 ${W} ${H}`}
          preserveAspectRatio="none"
          role="img"
          aria-label="시간대별 소음 차트"
        >
          <defs>
            <linearGradient id="noiseArea" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#5ca4ff" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#5ca4ff" stopOpacity="0.05" />
            </linearGradient>
          </defs>

          <rect x="0" y="0" width={W} height={H} rx="12" fill="#fff" />

          <g fontSize="12" fill="#77838f" textAnchor="middle">
            {yTicks.map((t) => (
              <text
                key={`ylab-${t}`}
                x={P - 10}
                y={yScale(t) + 4}
                style={{ pointerEvents: 'none' }}
              >
                {t}
              </text>
            ))}
          </g>

          <g stroke="#e9edf5" strokeWidth="1">
            {yTicks.map((t) => (
              <line key={`ygrid-${t}`} x1={P} x2={P + innerW} y1={yScale(t)} y2={yScale(t)} />
            ))}
          </g>

          <g stroke="#e9edf5" strokeWidth="1">
            {[0, 1, 2, 3].map((k) => {
              const x = P + (innerW / 3) * k;
              return <line key={`xgrid-${k}`} x1={x} x2={x} y1={P} y2={P + innerH} />;
            })}
          </g>

          <path d={areaPath} fill="url(#noiseArea)" />
          <polyline
            points={points}
            fill="none"
            stroke="#5ca4ff"
            strokeWidth="3"
            strokeLinejoin="round"
            strokeLinecap="round"
          />

          <g fontSize="12" fill="#908f8f" textAnchor="middle">
            {xLabels.map(({ idx, label }) => (
              <text
                key={`xlab-${idx}`}
                x={xScale(idx)}
                y={P + innerH + 18}
                style={{ pointerEvents: 'none' }}
              >
                {label}
              </text>
            ))}
          </g>
        </svg>
      </ChartWrap>
    </Card>
  );
};

export default NoiseChart;
