import styled from 'styled-components';
import Card from '@shared/ui/Card';

const Header = styled.div`
  width: 100%;
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  font-weight: 800;
  color: #1f2937;
  margin-bottom: 8px;
`;

const Title = styled.h2`
  color: #4c4c4c;
  font-family: Inter;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 600;
  line-height: 140%;
`;

const SubTitle = styled.h3`
  font-size: 12px;
  color: #9aa5b1;
  font-weight: 700;
`;

const Chart = styled.div`
  background: #f2f5fb;
  border-radius: 12px;
  padding: 10px 8px 6px;
`;

const Days = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  margin-top: 6px;
  font-size: 11px;
  color: #8e9aae;
  font-weight: 700;
  text-align: center;
`;

const dot = (x, y) => `${x},${y}`;

// TODO : 전부 임시 데이터. 갈아엎을 예정
const WeeklyActivity = () => {
  const points = [7, 6, 7.5, 10, 7.2, 7.4, 7.6];
  const selected = 3;

  const W = 640,
    H = 120,
    P = 10;
  const innerW = W - P * 2,
    innerH = H - P * 2;
  const max = Math.max(...points),
    min = Math.min(...points);
  const x = (i) => P + (innerW / 6) * i;
  const y = (v) => P + innerH - ((v - min) / (max - min || 1)) * innerH;

  const line = points.map((v, i) => dot(x(i), y(v))).join(' ');
  const area = `M ${x(0)} ${y(min)} L ${line} L ${x(6)} ${y(min)} Z`;

  return (
    <Card>
      <Header>
        <Title>Your Activity</Title>
        <SubTitle>Weekly</SubTitle>
      </Header>
      <Chart>
        <svg width="100%" height="120" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
          <defs>
            <linearGradient id="wa" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#5ca4ff" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#5ca4ff" stopOpacity="0.05" />
            </linearGradient>
          </defs>

          <path d={area} fill="url(#wa)" />
          <polyline
            points={line}
            fill="none"
            stroke="#5ca4ff"
            strokeWidth="3"
            strokeLinejoin="round"
            strokeLinecap="round"
          />

          <line
            x1={x(selected)}
            x2={x(selected)}
            y1={P}
            y2={P + innerH}
            stroke="#9cc2ff"
            strokeWidth="3"
            opacity="0.35"
          />
          <circle
            cx={x(selected)}
            cy={y(points[selected])}
            r="6"
            fill="#fff"
            stroke="#5ca4ff"
            strokeWidth="3"
          />
        </svg>

        <Days>
          {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map((d, i) => (
            <div key={d} style={{ color: i === selected ? '#336dff' : undefined }}>
              {d}
            </div>
          ))}
        </Days>
      </Chart>
    </Card>
  );
};

export default WeeklyActivity;
