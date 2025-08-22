import styled from 'styled-components';
import Card from '@shared/ui/Card';
import { Speech } from 'lucide-react';

const Title = styled.div`
  flex-shrink: 0;
  color: rgba(116, 176, 255, 0.77);
  font-family: Roboto;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;
const Description = styled.div``;

const AIFeedback = () => (
  <Card>
    <Title>AI 분석 · 피드백</Title>
    <Speech size={64} color="#74B0FF73" />
    <Description>체감 스트레스 지수가 전일 대비 5% 감소하였습니다. ......</Description>
  </Card>
);

export default AIFeedback;
