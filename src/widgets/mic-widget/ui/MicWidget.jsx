import styled from 'styled-components';
import Card from '@shared/ui/Card';
import { Disc2 } from 'lucide-react';

const MicWrapper = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  margin: 4px auto 0;
  font-size: 28px;
`;

const MicWidget = () => (
  <Card style={{ textAlign: 'center' }}>
    <div style={{ fontWeight: 700, marginBottom: 6 }}>측정</div>
    <MicWrapper>
      <Disc2 size={64} color="#74B0FFC4" strokeWidth={2} />
    </MicWrapper>
  </Card>
);

export default MicWidget;
