import styled from 'styled-components';
import { Heart, MessageCircle } from 'lucide-react';

const CommunityContainer = styled.div`
  display: grid;
  gap: 14px;
`;

const Post = styled.button`
  background: transparent;
  border: 0;
  text-align: left;
  cursor: pointer;
  display: grid;
  grid-template-columns: 56px 1fr 84px;
  gap: 10px;
  align-items: center;
`;

const Profile = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`;

const Title = styled.div`
  font-weight: 900;
  color: #111827;
  margin-bottom: 6px;
`;

const Text = styled.div`
  color: #4b5563;
  font-size: 13px;
  line-height: 1.4;
  max-height: 2.8em;
  overflow: hidden;
`;

const Thumbnail = styled.img`
  width: 84px;
  height: 84px;
  border-radius: 12px;
  object-fit: cover;
`;

const IconWrapper = styled.div`
  margin-top: 6px;
  display: flex;
  gap: 10px;
  color: #6b7280;
  font-size: 12px;
  font-weight: 800;
  svg {
    width: 14px;
    height: 14px;
  }
`;

const CommunityList = ({ items = [], onClickItem }) => (
  <CommunityContainer>
    {items.map(({ id, unit, avatar, text, image, likes, comments }) => (
      <Post key={id} onClick={() => onClickItem?.(id)}>
        <Profile src={avatar} alt="" />
        <div>
          <Title>{unit}</Title>
          <Text>{text}</Text>
          <IconWrapper>
            <span>
              <Heart size={14} /> {likes}
            </span>
            <span>
              <MessageCircle size={14} /> {comments}
            </span>
          </IconWrapper>
        </div>
        <Thumbnail src={image} alt="" />
      </Post>
    ))}
  </CommunityContainer>
);

export default CommunityList;
