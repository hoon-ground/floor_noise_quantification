import styled from 'styled-components';
import WeeklyActivity from '@widgets/weekly-activity/ui/WeeklyActivity';
import MetricTiles from '@widgets/metric-tiles/ui/MetricTiles';
import NoiseChart from '@widgets/noise-chart/ui/NoiseChart';
import DateRangeBar from '@widgets/date-range-bar/ui/DateRangeBar';
import AIAdvise from '@widgets/ai-advise/ui/AIAdvise';
import Spinner from '@shared/ui/Spinner';
import { useReportPage } from './model/useReportPage';

const Title = styled.h1`
  color: #4c4c4c;
  text-align: center;
  font-family: Inter;
  font-size: 1.25rem;
  font-weight: 600;
  line-height: 140%;
  letter-spacing: -0.025rem;
`;

const EmptySpace = styled.div`
  height: 1rem;
`;

const Center = styled.div`
  display: flex;
  justify-content: center;
  padding: 24px 0;
`;

const ReportPage = () => {
  const view = useReportPage();

  return (
    <div>
      <Title>층간소음</Title>
      <WeeklyActivity />
      <EmptySpace />

      <DateRangeBar value={view.range} onChange={view.setRange} />

      {view.loading ? (
        <Center>
          <Spinner />
        </Center>
      ) : (
        <>
          <NoiseChart
            startDate={view.range.startDate}
            endDate={view.range.endDate}
            list={view.list}
            start={view.start}
            end={view.end}
            singleDay={view.singleDay}
          />
          <EmptySpace />
          <MetricTiles
            startDate={view.range.startDate}
            endDate={view.range.endDate}
            report={view.report}
          />
          <EmptySpace />
          <AIAdvise
            startDate={view.range.startDate}
            endDate={view.range.endDate}
            report={view.report}
          />
        </>
      )}
    </div>
  );
};

export default ReportPage;
