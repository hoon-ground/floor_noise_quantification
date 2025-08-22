import styled from 'styled-components';
import { BatteryLow, Wifi, Signal } from 'lucide-react';

const Bar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: transparent;
  z-index: 100;
  display: flex;
  justify-content: center;
`;

const StatusContainer = styled.div`
  width: 100%;
  max-width: 720px;
  margin: 0 auto;
  background-color: #ffffff;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 12px;
`;

const RightContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;

  svg {
    width: 18px;
    height: 18px;
    stroke-width: 2;
  }
`;

const Spacer = styled.div`
  height: 28px;
`;

const StatusBar = () => (
  <>
    <Bar>
      <StatusContainer>
        <div>9:41</div>
        <RightContainer>
          <Signal size={18} />
          <Wifi size={18} />
          <BatteryLow size={18} />
        </RightContainer>
      </StatusContainer>
    </Bar>
    <Spacer />
  </>
);

export default StatusBar;
