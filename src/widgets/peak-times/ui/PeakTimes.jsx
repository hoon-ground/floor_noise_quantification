import styled from 'styled-components';
import Card from '@shared/ui/Card';

const Title = styled.h3`
  margin: 0 0 8px;
  font-size: 14px;
  font-weight: 700;
  color: #4c4c4c;
`;

const TimeList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 8px;
`;

const TimeItem = styled.li`
  color: #4c4c4c;
  font-family: Inter;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 600;
  line-height: 120%;
  letter-spacing: -0.025rem;
`;

const PeakTimes = () => {
  const times = ['18:00 ~ 19:00', '18:00 ~ 19:00', '18:00 ~ 19:00'];

  return (
    <Card>
      <Title>주의시간대</Title>
      <TimeList>
        {times.map((t, i) => (
          <TimeItem key={i}>{t}</TimeItem>
        ))}
      </TimeList>
    </Card>
  );
};

export default PeakTimes;
