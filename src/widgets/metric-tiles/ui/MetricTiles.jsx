import styled from 'styled-components';

const Grid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
  margin-bottom: 1rem;
  justify-items: stretch;
  align-items: stretch;
`;

const Tile = styled.div`
  width: 100%;
  height: 5.125rem;
  flex-shrink: 0;
  border-radius: 0.5rem;
  border: 2px solid rgba(116, 176, 255, 0.77);
  background: #fff;
`;

const Title = styled.div`
  color: #828282;
  font-family: Inter;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 600;
  line-height: 140%;
`;

const Value = styled.div`
  color: #828282;
  font-family: Inter;
  font-size: 1.75rem;
  font-style: normal;
  font-weight: 600;
  line-height: 120%;
  letter-spacing: -0.035rem;
`;

const Description = styled.div`
  color: #828282;
  font-family: Inter;
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
`;

const MetricTiles = () => {
  const type = '음악';
  const duration = '2시간';
  const stress = 55;

  return (
    <Grid>
      <Tile>
        <Title>소음 유형</Title>
        <Value>{type}</Value>
        <Description>소음크기 · 170dB</Description>
      </Tile>
      <Tile>
        <Title>지속시간</Title>
        <Value>{duration}</Value>
        <Description>장시간 지속</Description>
      </Tile>
      <Tile>
        <Title>스트레스 지수</Title>
        <Value>{stress}</Value>
        <Description>높은 스트레스</Description>
      </Tile>
    </Grid>
  );
};

export default MetricTiles;
