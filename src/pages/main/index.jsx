import styled from 'styled-components';
import NoiseChart from '@widgets/noise-chart/ui/NoiseChart';
import StressIndex from '@widgets/stress-index/ui/StressIndex';
import PeakTimes from '@widgets/peak-times/ui/PeakTimes';
import AIFeedback from '@widgets/ai-feedback/ui/AIFeedback';
import MicWidget from '@widgets/mic-widget/ui/MicWidget';

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

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
`;

const MainPage = () => (
  <div>
    <Title>층간소음</Title>
    <NoiseChart />
    <Grid>
      <StressIndex />
      <PeakTimes />
      <AIFeedback />
      <MicWidget />
    </Grid>
  </div>
);

export default MainPage;
