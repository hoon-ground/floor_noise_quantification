import styled from 'styled-components';

const NoticeContainer = styled.div`
  display: grid;
  gap: 10px;
`;

const Post = styled.button`
  width: 100%;
  text-align: left;
  background: #e9f2ff;
  color: #0f172a;
  border: 0;
  border-left: 4px solid #9cc3ff;
  border-radius: 10px;
  padding: 12px 12px;
  cursor: pointer;
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.05);
  font-size: 14px;
  font-weight: 700;

  &:active {
    transform: scale(0.995);
  }
`;

const NoticeList = ({ items = [], onClickItem }) => (
  <NoticeContainer>
    {items.map(({ id, text }) => (
      <Post key={id} onClick={() => onClickItem?.(id)}>
        {`[알림] ${text.replace(/\s+/g, ' ').trim().slice(0, 40)}${text.length > 40 ? '...' : ''}`}
      </Post>
    ))}
  </NoticeContainer>
);

export default NoticeList;
