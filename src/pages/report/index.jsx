import styled from 'styled-components';
import WeeklyActivity from '@widgets/weekly-activity/ui/WeeklyActivity';
import MetricTiles from '@widgets/metric-tiles/ui/MetricTiles';
import NoiseChart from '@widgets/noise-chart/ui/NoiseChart';
import DateRangeBar from '@widgets/date-range-bar/ui/DateRangeBar';
import AIAdvise from '@widgets/ai-advise/ui/AIAdvise';
import { useState } from 'react';

const Title = styled.h1`
  color: #4c4c4c;
  text-align: center;
  font-family: Inter;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 600;
  line-height: 140%;
  letter-spacing: -0.025rem;
`;

const EmptySpace = styled.div`
  height: 1rem;
`;

const ReportPage = () => {
  const today = new Date().toISOString().slice(0, 10);
  const [range, setRange] = useState({ startDate: today, endDate: today });

  return (
    <div>
      <Title>층간소음</Title>
      <WeeklyActivity />
      <EmptySpace />

      <DateRangeBar value={range} onChange={setRange} />

      <NoiseChart startDate={range.startDate} endDate={range.endDate} />
      <EmptySpace />

      <MetricTiles startDate={range.startDate} endDate={range.endDate} />
      <EmptySpace />

      <AIAdvise startDate={range.startDate} endDate={range.endDate} />
    </div>
  );
};

export default ReportPage;
