import styled from 'styled-components';
import Card from '@shared/ui/Card';
import Spinner from '@shared/ui/Spinner';
import { useEffect, useState } from 'react';
import { getNoiseIndex } from '@entities/noise/model/noiseService';

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

const NoiseIndex = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getNoiseIndex();
        setData(result);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  if (!data) {
    return (
      <Card>
        <div>데이터 없음</div>
      </Card>
    );
  }

  return (
    <Card>
      <Title>소음 인덱스</Title>
      <Value>{data.decibelAvg} dB</Value>
      <Description>
        {data.noiseType} · {data.memo} <br />
        {new Date(data.uploadTime).toLocaleString()}
      </Description>
    </Card>
  );
};

export default NoiseIndex;
