import styled from 'styled-components';
import Spinner from '@shared/ui/Spinner';
import { useEffect, useMemo, useState } from 'react';
import { getNoiseReport } from '@entities/noise/api/noiseApi';

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

const ErrorText = styled.div`
  color: #9aa5b1;
  font-size: 0.875rem;
  grid-column: 1 / -1;
  text-align: center;
`;

const SpinnerWrap = styled.div`
  grid-column: 1 / -1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
  background: #fff;
  border-radius: 0.5rem;
`;

const MetricTiles = ({ startDate: _start, endDate: _end }) => {
  const today = useMemo(() => new Date().toISOString().slice(0, 10), []);
  const startDate = _start || today;
  const endDate = _end || today;

  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState(null);
  const [error, setError] = useState('');

  const fmtDate = (s) => (s ? s.replace('T', ' ').slice(0, 16) : '');
  const safeNum = (v, fallback = 0) => (typeof v === 'number' && !Number.isNaN(v) ? v : fallback);

  useEffect(() => {
    const run = async () => {
      try {
        setLoading(true);
        setError('');
        setReport(null);

        const res = await getNoiseReport({ startDate, endDate });
        if (!res?.data?.success) throw new Error('리포트 조회 실패');

        setReport(res.data.data || null);
      } catch (e) {
        console.error(e);
        setError('데이터 없음');
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [startDate, endDate]);

  if (loading) {
    return (
      <SpinnerWrap>
        <Spinner />
      </SpinnerWrap>
    );
  }
  if (error || !report) {
    return <ErrorText>{error || '데이터 없음'}</ErrorText>;
  }

  const avg = safeNum(report.averageNoiseDecibel);
  const max = safeNum(report.maxNoiseDecibel);
  const type = report.maxNoiseType || '-';
  const stress = safeNum(report.assumedStress);
  const createdAt = fmtDate(report.createAt);

  return (
    <Grid>
      <Tile>
        <Title>평균 소음 수치(dB)</Title>
        <Value>{avg}</Value>
        <Description>
          {createdAt ? `생성시각 ${createdAt}` : `${startDate} ~ ${endDate}`}
        </Description>
      </Tile>

      <Tile>
        <Title>최대 소음 수치(dB)</Title>
        <Value>{max}</Value>
        <Description>{type !== '-' ? `유형 : ${type}` : '유형 데이터 없음'}</Description>
      </Tile>

      <Tile>
        <Title>스트레스 지수</Title>
        <Value>{stress}</Value>
        <Description>
          기간 : {startDate} ~ {endDate}
        </Description>
      </Tile>
    </Grid>
  );
};

export default MetricTiles;
