import { HashRouter as BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainPage from '@pages/main/index';
import ReportPage from '@pages/report/index';
import CommunityPage from '@pages/community/index';
import StatusBar from '@widgets/status-bar/ui/StatusBar';
import BottomNav from '@widgets/bottom-nav/ui/BottomNav';
import styled from 'styled-components';

const AppLayout = styled.div`
  min-height: 100dvh;
  background-color: #ffffff;
`;
const Content = styled.main`
  max-width: 720px;
  margin: 0 auto;
  padding: 16px 16px 96px;
  min-height: 100vh;
`;

const App = () => (
  <BrowserRouter>
    <AppLayout>
      <StatusBar />
      <Content>
        <Routes>
          <Route path="/" element={<Navigate to="/main" replace />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/report" element={<ReportPage />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="*" element={<div>Not Found</div>} />
        </Routes>
      </Content>
      <BottomNav />
    </AppLayout>
  </BrowserRouter>
);

export default App;
