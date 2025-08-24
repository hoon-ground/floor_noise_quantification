import styled from 'styled-components';
import Card from '@shared/ui/Card';
import { Speech } from 'lucide-react';
import Spinner from '@shared/ui/Spinner';
import { useMemo } from 'react';
import { useNoiseReport } from '@entities/noise/model/noiseQueries';

const Title = styled.div`
  flex-shrink: 0;
  margin: 0 auto;
  color: rgba(116, 176, 255, 0.77);
  font-family: Roboto;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const Description = styled.div`
  color: #4c4c4c;
  margin: 0 auto;
  font-family: Roboto;
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const DateLine = styled.div`
  color: #9aa5b1;
  font-size: 12px;
  margin: 0 auto;
`;

const AIFeedback = ({ startDate: _start, endDate: _end }) => {
  const today = useMemo(() => new Date().toISOString().slice(0, 10), []);
  const startDate = _start || today;
  const endDate = _end || today;

  const { data: r, isLoading, isError } = useNoiseReport(startDate, endDate);

  const advise = r?.aiadvise || r?.advise || r?.caution || r?.message || '';

  return (
    <Card>
      <Title>
        <Speech size={22} />
        AI 분석 · 피드백
      </Title>
      {isLoading ? (
        <Spinner />
      ) : isError ? (
        <Description style={{ color: '#9aa5b1', textAlign: 'center' }}>데이터 없음</Description>
      ) : (
        <>
          <Description>{advise || '주의사항 없음'}</Description>
          <DateLine>
            데이터 수집일자: {startDate} ~ {endDate}
          </DateLine>
        </>
      )}
    </Card>
  );
};
export default AIFeedback;
