import { useMemo, useState } from 'react';
import styled from 'styled-components';

const BarContainer = styled.form`
  gap: 8px;
  align-items: center;
  justify-content: center;
  margin: 8px 0 12px;
  display: flex;
  flex-wrap: wrap;
  margin-left: auto;
  margin-right: auto;
`;

const DateInput = styled.input`
  height: 36px;
  padding: 0 10px;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  background: #fff;
  color: #111827;
  min-width: 9.5rem;
  flex: 0 1 auto;
`;

const InquiryButton = styled.button`
  height: 36px;
  padding: 0 12px;
  border: 0;
  border-radius: 10px;
  cursor: pointer;
  background: #eef3ff;
  color: #336dff;
  font-weight: 700;
`;

const GhostButton = styled.button`
  height: 36px;
  padding: 0 10px;
  background: #f4f6f9;
  color: #5f6b7a;
  border: 0;
  border-radius: 10px;
  cursor: pointer;
`;

const DateRangeBar = ({ value, onChange }) => {
  const today = useMemo(() => new Date().toISOString().slice(0, 10), []);
  const [start, setStart] = useState(value?.startDate || today);
  const [end, setEnd] = useState(value?.endDate || today);

  const apply = (e) => {
    e.preventDefault();
    if (!start || !end) {
      return;
    }
    const s = start <= end ? start : end;
    const e2 = start <= end ? end : start;
    onChange?.({ startDate: s, endDate: e2 });
  };

  const quickSearch = (days) => {
    const d = new Date();
    const endStr = d.toISOString().slice(0, 10);
    d.setDate(d.getDate() - (days - 1));
    const startStr = d.toISOString().slice(0, 10);
    setStart(startStr);
    setEnd(endStr);
    onChange?.({ startDate: startStr, endDate: endStr });
  };

  return (
    <BarContainer onSubmit={apply}>
      <DateInput type="date" value={start} onChange={(e) => setStart(e.target.value)} />
      <span>~</span>
      <DateInput type="date" value={end} onChange={(e) => setEnd(e.target.value)} />
      <InquiryButton type="submit">조회</InquiryButton>
      <GhostButton type="button" onClick={() => quickSearch(1)}>
        오늘
      </GhostButton>
      <GhostButton type="button" onClick={() => quickSearch(7)}>
        최근 7일
      </GhostButton>
    </BarContainer>
  );
};

export default DateRangeBar;
