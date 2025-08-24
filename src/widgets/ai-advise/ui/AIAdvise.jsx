import styled from 'styled-components';
import Card from '@shared/ui/Card';
import Spinner from '@shared/ui/Spinner';
import { useEffect, useState } from 'react';
import { getNoiseReport } from '@entities/noise/api/noiseApi';

const Title = styled.h2`
  color: #4c4c4c;
  font-size: 0.95rem;
  font-weight: 700;
  margin: 0 0 8px;
`;

const Wrap = styled.div`
  background: #fff;
  border-radius: 12px;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  &:not(:last-child) {
    border-bottom: 1px solid #eef2f7;
  }
`;

const Key = styled.div`
  color: #6b7280;
  font-size: 13px;
  font-weight: 600;
`;

const Val = styled.div`
  color: #111827;
  font-size: 14px;
  font-weight: 700;
`;

const Section = styled.div`
  margin-top: 12px;
  padding: 12px;
  border-radius: 12px;
  background: #f8fbff;
`;

const SectionTitle = styled.div`
  color: #2563eb;
  font-weight: 800;
  margin-bottom: 6px;
  font-size: 13px;
`;

const SectionBody = styled.div`
  color: #334155;
  line-height: 1.55;
  white-space: pre-wrap;
  font-size: 14px;
`;

const TagList = styled.div`
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

const TagItem = styled.span`
  font-size: 12px;
  padding: 6px 10px;
  border-radius: 999px;
  background: #eef3ff;
  color: #3352ff;
  font-weight: 700;
`;

const FootNote = styled.div`
  margin-top: 10px;
  color: #9aa5b1;
  font-size: 12px;
  text-align: right;
`;

const ErrorText = styled.div`
  color: #9aa5b1;
  text-align: center;
  padding: 24px 0;
`;

const AIAdvise = ({ startDate, endDate }) => {
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchReport = async () => {
      try {
        setLoading(true);
        setError('');
        setReport(null);

        const res = await getNoiseReport({ startDate, endDate });
        if (!res.data?.success) throw new Error('리포트 조회 실패');

        setReport(res.data.data);
      } catch (e) {
        console.error(e);
        setError('데이터 없음');
      } finally {
        setLoading(false);
      }
    };
    fetchReport();
  }, [startDate, endDate]);

  const fmtDateTime = (s) => (s ? s.replace('T', ' ').slice(0, 16) : '');

  return (
    <Card>
      <Title>AI 분석 리포트</Title>
      <Wrap>
        {loading && <Spinner />}

        {!loading && error && <ErrorText>{error}</ErrorText>}

        {!loading && !error && report && (
          <>
            <Row>
              <Key>기간</Key>
              <Val>
                {report.startDate?.slice(0, 10)} ~ {report.endDate?.slice(0, 10)}
              </Val>
            </Row>
            <Row>
              <Key>평균 소음(dB)</Key>
              <Val>{report.averageNoiseDecibel ?? '-'}</Val>
            </Row>
            <Row>
              <Key>최대 소음(dB)</Key>
              <Val>{report.maxNoiseDecibel ?? '-'}</Val>
            </Row>
            <Row>
              <Key>최대 소음 유형</Key>
              <Val>{report.maxNoiseType || '-'}</Val>
            </Row>
            <Row>
              <Key>추정 스트레스</Key>
              <Val>{report.assumedStress ?? '-'}</Val>
            </Row>

            {report.hashtag && (
              <TagList>
                {report.hashtag.split(',').map((tag, idx) => (
                  <TagItem key={idx}>#{tag.trim()}</TagItem>
                ))}
              </TagList>
            )}

            {/* 텍스트 분석 섹션들 */}
            {(report.staticalAnalyze || report.noiseFeature) && (
              <Section>
                <SectionTitle>통계/특징</SectionTitle>
                {report.staticalAnalyze && <SectionBody>{report.staticalAnalyze}</SectionBody>}
                {report.noiseFeature && (
                  <SectionBody style={{ marginTop: 8 }}>{report.noiseFeature}</SectionBody>
                )}
              </Section>
            )}

            {report.caution && (
              <Section>
                <SectionTitle>주의 사항</SectionTitle>
                <SectionBody>{report.caution}</SectionBody>
              </Section>
            )}

            {report.recommendedAction && (
              <Section>
                <SectionTitle>권장 조치</SectionTitle>
                <SectionBody>{report.recommendedAction}</SectionBody>
              </Section>
            )}

            <FootNote>
              생성시각: {fmtDateTime(report.createAt)}
              {Array.isArray(report.reportNoiseDataIds) &&
                ` · 근거 데이터 ${report.reportNoiseDataIds.length}건`}
            </FootNote>
          </>
        )}
      </Wrap>
    </Card>
  );
};

export default AIAdvise;
