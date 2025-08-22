import styled from 'styled-components';
import Card from '@shared/ui/Card';
import { AlertTriangle, Clock, Volume2, Lightbulb, Download, Share2 } from 'lucide-react';

const CardLayout = styled(Card)`
  padding: 16px;
`;

const Section = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
`;

const SectionTitle = styled.h3`
  color: #4c4c4c;
  font-family: Inter;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 600;
  line-height: 140%;
`;

const SectionText = styled.p`
  margin: 0;
  font-size: 14px;
  color: #374151;
  line-height: 1.5;
`;

const ItemList = styled.ul`
  margin: 4px 0 0;
  padding-left: 18px;
  color: #374151;
  font-size: 14px;
  li {
    margin: 4px 0;
  }
`;

const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 8px;
`;

const TagItem = styled.span`
  font-size: 12px;
  padding: 6px 10px;
  border-radius: 999px;
  background: #eef3ff;
  color: #3352ff;
  font-weight: 700;
`;

const Divider = styled.hr`
  border: 0;
  height: 1px;
  background: #e5e7eb;
  margin: 8px 0 4px;
`;

const Footer = styled.div`
  display: flex;
  gap: 8px;
  justify-content: flex-end;
  margin-top: 8px;
`;

const ActionButton = styled.button`
  display: inline-flex;
  gap: 6px;
  align-items: center;
  background-color: #f3f4f6;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  padding: 8px 10px;
  cursor: pointer;
  font-weight: 700;
  color: #374151;
`;

const AIAnalysis = () => {
  //임시
  const summary =
    '저녁 시간대에 음악성 소음이 길게 유지되면서 스트레스 지수가 상승했습니다. ' +
    '특히 18:30~19:00 사이에 10dB 이상 급등 구간이 여러 차례 관측되었습니다.';
  const risks = [
    '장시간(> 2h) 70dB 이상의 노출',
    '18:30~19:00 급상승 구간 반복',
    '취침 직전 노출로 회복 지연 가능성',
  ];
  const actions = [
    '18~19시에 창문 닫기 및 이어플러그 사용',
    'TV/스피커 음량을 10~20% 감소',
    '측정 간격을 1분 → 30초로 세분화하여 피크 탐지 강화',
  ];

  return (
    <CardLayout>
      <Section>
        <div>
          <SectionTitle>
            <AlertTriangle size={16} /> AI 분석 · 피드백 (상세)
          </SectionTitle>
          <SectionText>{summary}</SectionText>
          <TagList>
            <TagItem>#음악</TagItem>
            <TagItem>#저녁피크</TagItem>
            <TagItem>#장시간노출</TagItem>
          </TagList>
        </div>

        <Divider />

        <div>
          <SectionTitle>
            <Clock size={16} /> 위험 요소
          </SectionTitle>
          <ItemList>
            {risks.map((r, i) => (
              <li key={i}>{r}</li>
            ))}
          </ItemList>
        </div>

        <div>
          <SectionTitle>
            <Volume2 size={16} /> 소음 특징
          </SectionTitle>
          <ItemList>
            <li>평균 7.2dB, 피크 12.3dB</li>
            <li>주파수 대역: 200~800Hz 중심 (음악/음성 유사)</li>
            <li>피크 발생 간격: 3~5분</li>
          </ItemList>
        </div>

        <div>
          <SectionTitle>
            <Lightbulb size={16} /> 권장 행동
          </SectionTitle>
          <ItemList>
            {actions.map((a, i) => (
              <li key={i}>{a}</li>
            ))}
          </ItemList>
        </div>

        <Footer>
          <ActionButton onClick={() => alert('PDF 내보내기(임시)')}>
            <Download size={16} /> 내보내기
          </ActionButton>
          <ActionButton onClick={() => alert('공유 링크 생성(임시)')}>
            <Share2 size={16} /> 공유
          </ActionButton>
        </Footer>
      </Section>
    </CardLayout>
  );
};

export default AIAnalysis;
