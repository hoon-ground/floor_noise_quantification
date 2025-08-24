import styled from 'styled-components';
import Card from '@shared/ui/Card';
import { Speech } from 'lucide-react';
import Spinner from '@shared/ui/Spinner';
import { useEffect, useMemo, useState } from 'react';
import { getNoiseReport } from '@entities/noise/api/noiseApi';

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

  const [loading, setLoading] = useState(false);
  const [advise, setAdvise] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const run = async () => {
      try {
        setLoading(true);
        setError('');
        setAdvise('');

        const res = await getNoiseReport({ startDate, endDate });
        if (!res?.data?.success) {
          throw new Error('리포트 조회 실패');
        }

        const r = res.data.data || {};
        const text = r.aiadvise || r.advise || r.caution || r.message || '';

        setAdvise(text);
      } catch (e) {
        console.error(e);
        setError('데이터 없음');
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [startDate, endDate]);

  return (
    <Card>
      <Title>
        <Speech size={22} />
        AI 분석 · 피드백
      </Title>

      {loading ? (
        <Spinner />
      ) : error ? (
        <Description style={{ color: '#9aa5b1', textAlign: 'center' }}>{error}</Description>
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
