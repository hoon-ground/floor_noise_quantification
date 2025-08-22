import styled from 'styled-components';
import WeeklyActivity from '@widgets/weekly-activity/ui/WeeklyActivity';
import NoiseChart from '@widgets/noise-chart/ui/NoiseChart';
import MetricTiles from '@widgets/metric-tiles/ui/MetricTiles';
import AIAnalysis from '@widgets/ai-analysis/ui/AIAnalysis';

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

const SectionTitle = styled.h2`
  color: #4c4c4c;
  font-family: Inter;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 600;
  line-height: 140%;
`;

const ReportPage = () => (
  <div>
    <Title>층간소음</Title>

    <WeeklyActivity />

    <div style={{ height: 10 }} />

    <NoiseChart />

    <MetricTiles />

    <AIAnalysis />
  </div>
);

export default ReportPage;
