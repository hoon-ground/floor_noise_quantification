import styled from 'styled-components';
import WeeklyActivity from '@widgets/weekly-activity/ui/WeeklyActivity';
import PeakTimes from '@widgets/peak-times/ui/PeakTimes';
import AIFeedback from '@widgets/ai-feedback/ui/AIFeedback';
import UploadFile from '@widgets/file-upload/ui/UploadFile';
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
  grid-template-columns: 1fr;
  gap: 12px;
`;

const MicWrap = styled.div`
  position: fixed;
  bottom: 50px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 50;
`;

const MainPage = () => (
  <div>
    <Title>층간소음</Title>
    <WeeklyActivity />

    <Grid>
      <PeakTimes />
      <AIFeedback />
      <UploadFile />
    </Grid>

    <MicWrap>
      <MicWidget />
    </MicWrap>
  </div>
);

export default MainPage;
