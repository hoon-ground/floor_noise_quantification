import styled from 'styled-components';
import NoiseChart from '@widgets/noise-chart/ui/NoiseChart';
import NoiseIndex from '@widgets/noise-index/ui/NoiseIndex';
import PeakTimes from '@widgets/peak-times/ui/PeakTimes';
import AIFeedback from '@widgets/ai-feedback/ui/AIFeedback';
import UploadFile from '@widgets/file-upload/ui/UploadFile';

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
      <NoiseIndex />
      <PeakTimes />
      <AIFeedback />
      <UploadFile />
    </Grid>
  </div>
);

export default MainPage;
