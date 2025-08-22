import { useMemo, useState } from 'react';
import styled from 'styled-components';

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 80;
  background: rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 80px;
`;

const ModalContent = styled.div`
  width: 100%;
  max-width: 720px;
  margin: 0 12px;
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.18);
  padding: 14px 14px 18px;
  position: relative;
  border: 1.5px solid #bcd1ff;
`;

const DateLine = styled.div`
  font-size: 13px;
  color: #6b7280;
  font-weight: 800;
  margin-bottom: 6px;
`;

const InputSection = styled.div`
  display: grid;
  place-items: center;
  min-height: 130px;
  padding: 6px;
`;

const NoticeTextarea = styled.textarea`
  width: 100%;
  min-height: 120px;
  resize: none;
  border: 0;
  outline: none;
  font-size: 14px;
  line-height: 1.5;
  color: #111827;
  &::placeholder {
    color: #c2c9d2;
  }
`;

const Footer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 8px;
`;

const SaveButton = styled.button`
  border: 1px solid #e5e7eb;
  background: #f3f4f6;
  color: #374151;
  border-radius: 12px;
  padding: 8px 12px;
  font-weight: 800;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
`;

const formatDate = (d) => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}.${m}.${day}`;
};

const NoticeCreateModal = ({ onClose, onCreate }) => {
  const today = useMemo(() => formatDate(new Date()), []);
  const [text, setText] = useState('');

  const handleSave = () => {
    const t = text.trim();
    if (!t) return;
    onCreate?.(t);
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <DateLine>{today}</DateLine>
        <InputSection>
          <NoticeTextarea
            placeholder="내용을 입력하세요..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </InputSection>
        <Footer>
          <SaveButton onClick={handleSave} disabled={!text.trim()}>
            등록
          </SaveButton>
        </Footer>
      </ModalContent>
    </ModalOverlay>
  );
};

export default NoticeCreateModal;
