import { useState } from 'react';
import styled from 'styled-components';
import { MoreHorizontal, Heart, MessageCircle, Bookmark, Edit3, Trash2, X } from 'lucide-react';

const PostingOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 90;
  background-color: rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 60px;
`;

const PostContent = styled.div`
  width: 100%;
  max-width: 720px;
  margin: 0 12px;
  background-color: #ffffff;
  border-radius: 16px;
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.18);
  overflow: hidden;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
`;

const User = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 900;
`;

const Profile = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  object-fit: cover;
`;

const KebabIcon = styled.button`
  border: 0;
  background: transparent;
  cursor: pointer;
  padding: 6px;
  color: #6b7280;
`;

const Thumbnail = styled.div`
  background-color: #e5e7eb;
  aspect-ratio: 4/3;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px 0;
  svg {
    width: 22px;
    height: 22px;
  }
`;

const Counts = styled.div`
  padding: 8px 12px;
  font-weight: 800;
`;

const Caption = styled.div`
  padding: 0 12px 12px;
  color: #111827;
`;

const DateLine = styled.div`
  padding: 0 12px 12px;
  color: #9aa5b1;
  font-size: 12px;
`;

const Footer = styled.div`
  border-top: 1px solid #eef2f7;
  padding: 8px;
  display: flex;
  justify-content: center;
`;

const CloseButton = styled.button`
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

const Menu = styled.div`
  position: absolute;
  right: 8px;
  top: 40px;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
  display: grid;
  z-index: 95;
`;

const MenuItem = styled.button`
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

const Textarea = styled.textarea`
  width: 100%;
  min-height: 80px;
  border: 0;
  outline: none;
  padding: 8px 12px;
  font-size: 14px;
  resize: none;
`;

const CommunityPostModal = ({ post, onClose, onUpdate, onDelete }) => {
  const [menu, setMenu] = useState(false);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(post.text);

  const save = () => {
    onUpdate?.(post.id, { text: draft.trim() });
  };

  return (
    <PostingOverlay onClick={onClose}>
      <PostContent onClick={(e) => e.stopPropagation()}>
        <Header>
          <User>
            <Profile src={post.avatar} alt="" />
            <div>{post.unit}</div>
          </User>
          <div style={{ position: 'relative' }}>
            <KebabIcon onClick={() => setMenu((v) => !v)}>
              <MoreHorizontal />
            </KebabIcon>
            {menu && (
              <Menu onClick={(e) => e.stopPropagation()}>
                <MenuItem
                  onClick={() => {
                    setEditing(true);
                    setMenu(false);
                  }}
                >
                  <Edit3 size={16} />
                  수정하기
                </MenuItem>
                <MenuItem onClick={() => onDelete?.(post.id)}>
                  <Trash2 size={16} />
                  삭제하기
                </MenuItem>
              </Menu>
            )}
          </div>
        </Header>

        <Thumbnail>{post.image ? <Img src={post.image} alt="" /> : null}</Thumbnail>

        <ButtonContainer>
          <div style={{ display: 'flex', gap: 12 }}>
            <Heart />
            <MessageCircle />
          </div>
          <Bookmark />
        </ButtonContainer>

        <Counts>♡ {post.likes}명이 이 글을 좋아합니다.</Counts>

        {editing ? (
          <Textarea value={draft} onChange={(e) => setDraft(e.target.value)} />
        ) : (
          <Caption>
            <strong>{post.author}</strong> {post.text}
          </Caption>
        )}

        <DateLine>{post.date}</DateLine>

        <Footer>
          {editing ? (
            <CloseButton onClick={save}>저장</CloseButton>
          ) : (
            <CloseButton onClick={onClose}>
              <X size={16} /> 닫기
            </CloseButton>
          )}
        </Footer>
      </PostContent>
    </PostingOverlay>
  );
};

export default CommunityPostModal;
