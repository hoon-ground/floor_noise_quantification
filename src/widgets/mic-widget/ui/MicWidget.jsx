import styled from 'styled-components';
import { Disc2 } from 'lucide-react';

const MicWrapper = styled.button`
  width: 72px;
  height: 72px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: #fff;
  border: 3px solid #74b0ff;
  cursor: pointer;
`;

const MicWidget = () => (
  <MicWrapper>
    <Disc2 size={42} color="#74B0FFC4" strokeWidth={2.5} />
  </MicWrapper>
);

export default MicWidget;
