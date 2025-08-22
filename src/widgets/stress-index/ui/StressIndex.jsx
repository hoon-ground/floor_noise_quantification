import styled from 'styled-components';
import Card from '@shared/ui/Card';

const Title = styled.div`
  color: #4c4c4c;
  font-family: 'Inter-SemiBold', Helvetica;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0;
  line-height: 19.6px;
  margin-top: -1px;
  position: relative;
  white-space: nowrap;
  width: fit-content;
`;

const Value = styled.div`
  color: #4c4c4c;
  font-family: 'Inter-SemiBold', Helvetica;
  font-size: 28px;
  font-weight: 600;
  letter-spacing: -0.56px;
  line-height: 33.6px;
  position: relative;
  white-space: nowrap;
  width: fit-content;
`;

const Description = styled.div`
  color: #828282;
  font-family: 'Inter-Medium', Helvetica;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0;
  line-height: 18px;
  position: relative;
  white-space: nowrap;
  width: fit-content;
`;

const StressIndex = () => {
  return (
    <Card>
      <Title>체감 스트레스 지수</Title>
      <Value>55</Value>
      <Description>전일 대비 -5%</Description>
    </Card>
  );
};

export default StressIndex;
