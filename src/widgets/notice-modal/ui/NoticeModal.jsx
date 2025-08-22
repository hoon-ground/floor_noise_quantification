import React, { useState } from 'react';
import styled from 'styled-components';
import { MoreVertical, X, Edit3, Trash2 } from 'lucide-react';

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
  background-color: #ffffff;
  border-radius: 16px;
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.18);
  padding: 14px 14px 12px;
  position: relative;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
  color: #111827;
  font-weight: 800;
`;

const DateLine = styled.div`
  font-size: 13px;
  color: #6b7280;
  font-weight: 800;
`;

const KebabIcon = styled.button`
  border: 0;
  background: transparent;
  cursor: pointer;
  color: #6b7280;
  padding: 6px;
  border-radius: 8px;
  &:hover {
    background-color: #f1f5f9;
  }
  position: relative;
  z-index: 2;
`;

const Menu = styled.div`
  position: absolute;
  align-items: stretch;
  right: 8px;
  top: 38px;
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
  display: grid;
  z-index: 3;
`;

const MenuItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  border: 0;
  background-color: #fff;
  cursor: pointer;
  font-weight: 700;
  color: #4c4c4c;
  writing-mode: horizontal-tb;
  white-space: nowrap;
  &:not(:last-child) {
    border-bottom: 1px solid #e5e7eb;
  }
  &:hover {
    background-color: #f3f4f6;
  }
`;

const Body = styled.div`
  min-height: 96px;
  color: #111827;
  font-size: 14px;
  line-height: 1.5;
  display: grid;
  place-items: center;
  text-align: center;
  padding: 10px 6px 6px;
`;

const NoticeTextarea = styled.textarea`
  width: 100%;
  min-height: 120px;
  resize: none;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 10px;
  outline: none;
  font-size: 14px;
`;

const Footer = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 10px;
  padding-top: 6px;
  border-top: 1px solid #eef2f7;
`;

const CloseButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: #f3f4f6;
  color: #374151;
  font-weight: 500;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 8px 12px;
  cursor: pointer;
`;

const SaveButton = styled(CloseButton)`
  background: #eef3ff;
  background-color: #74b0ff;
  color: #ffffff;
`;

const NoticeModal = ({ notice, onClose, onUpdate, onDelete }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(notice.text);

  const handleSave = () => {
    const t = draft.trim();
    if (!t) return;
    onUpdate?.(notice.id, t);
    setEditing(false);
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <Header>
          <DateLine>{notice.date}</DateLine>
          <KebabIcon onClick={() => setMenuOpen((v) => !v)} aria-label="more">
            <MoreVertical size={18} />
            {menuOpen && (
              <Menu onClick={(e) => e.stopPropagation()}>
                <MenuItem
                  role="button"
                  onClick={() => {
                    setEditing(true);
                    setMenuOpen(false);
                  }}
                >
                  <Edit3 size={16} /> 수정하기
                </MenuItem>
                <MenuItem role="button" onClick={() => onDelete?.(notice.id)}>
                  <Trash2 size={16} /> 삭제하기
                </MenuItem>
              </Menu>
            )}
          </KebabIcon>
        </Header>

        <Body>
          {editing ? (
            <div style={{ width: '100%' }}>
              <NoticeTextarea value={draft} onChange={(e) => setDraft(e.target.value)} />
            </div>
          ) : (
            <div>{notice.text}</div>
          )}
        </Body>

        <Footer>
          {editing ? (
            <>
              <CloseButton
                onClick={() => {
                  setEditing(false);
                  setDraft(notice.text);
                }}
              >
                취소
              </CloseButton>
              <SaveButton onClick={handleSave}>저장</SaveButton>
            </>
          ) : (
            <CloseButton onClick={onClose}>
              <X size={16} /> 닫기
            </CloseButton>
          )}
        </Footer>
      </ModalContent>
    </ModalOverlay>
  );
};

export default NoticeModal;
