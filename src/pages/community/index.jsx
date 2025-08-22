import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import { PencilLine } from 'lucide-react';
import NoticeList from '@widgets/notice-list/ui/NoticeList';
import NoticeModal from '@widgets/notice-modal/ui/NoticeModal';
import NoticeCreateModal from '@widgets/notice-create-modal/ui/NoticeCreateModal';
import CommunityList from '@widgets/community-list/ui/CommunityList';
import CommunityCreateModal from '@widgets/community-create-modal/ui/CommunityCreateModal';
import CommunityPostModal from '@widgets/community-post-modal/ui/CommunityPostModal';

const Title = styled.h1`
  color: #4c4c4c;
  text-align: center;
  font-family: Inter;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 600;
  line-height: 140%;
  letter-spacing: -0.025rem;
`;

const TabsBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-weight: 800;
  margin-bottom: 14px;
`;

const Tab = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== 'active',
})`
  background: transparent;
  border: 0;
  cursor: pointer;
  color: ${({ active }) => (active ? '#336dff' : '#9aa5b1')};
  text-decoration: ${({ active }) => (active ? 'underline' : 'none')};
  text-underline-offset: 4px;
  font-size: 14px;
`;

const EditIconBtn = styled.button`
  margin-left: auto;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  border: 0;
  background: transparent;
  cursor: pointer;
  color: #5f6b7a;
`;

const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: 800;
  margin: 6px 0 10px;
  color: #111827;
`;

const PageWrap = styled.div`
  max-width: 720px;
  margin: 0 auto;
`;

const formatDate = (d) => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}.${m}.${day}`;
};

const CommunityPage = () => {
  // 임시 공지 데이터
  const initial = useMemo(
    () => [
      {
        id: 'n1',
        date: '2025.08.24',
        text: '금일 14:00 ~ 17:00경 102동 304호에서 도배 공사로 인해 소음이 발생할 예정입니다.',
      },
      { id: 'n2', date: '2025.08.22', text: '내일 09:00 ~ 12:00 화단 보수 작업이 진행됩니다.' },
      {
        id: 'n3',
        date: '2025.08.18',
        text: '엘리베이터 점검(10:00~11:00)으로 잠시 이용 제한됩니다.',
      },
      {
        id: 'n4',
        date: '2025.08.15',
        text: '지하 주차장 바닥 도색으로 일부 구역 통제 예정입니다.',
      },
    ],
    []
  );
  const [notices, setNotices] = useState(initial);
  const [activeTab, setActiveTab] = useState('notice');
  const [openId, setOpenId] = useState(null);
  const [createOpen, setCreateOpen] = useState(false);

  const selected = useMemo(() => notices.find((n) => n.id === openId) || null, [openId, notices]);

  const handleOpen = (id) => setOpenId(id);
  const handleClose = () => setOpenId(null);

  const handleUpdate = (id, nextText) => {
    setNotices((prev) => prev.map((n) => (n.id === id ? { ...n, text: nextText } : n)));
    handleClose();
  };

  const handleDelete = (id) => {
    setNotices((prev) => prev.filter((n) => n.id !== id));
    handleClose();
  };

  const handleCreate = (text) => {
    const id = (window.crypto && crypto.randomUUID && crypto.randomUUID()) || String(Date.now());
    const item = { id, date: formatDate(new Date()), text: text.trim() };
    setNotices((prev) => [item, ...prev]);
    setCreateOpen(false);
  };

  const [posts, setPosts] = useState([
    {
      id: 'p1',
      unit: '102동 1204호',
      author: '닉네임1',
      avatar:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaPkRBwF_9pdpWRY4dWLE4EHDJwvMJ1A77NQ&s',
      text: '오늘 조카들이 집에 놀러와 조금 시끄러울 수도 있어요. 양해 부탁드려요 ㅠ',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaPkRBwF_9pdpWRY4dWLE4EHDJwvMJ1A77NQ&s',
      likes: 10,
      comments: 9,
      date: '2025.09.19',
    },
    {
      id: 'p2',
      unit: '103동 304호',
      author: '닉네임2',
      avatar:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaPkRBwF_9pdpWRY4dWLE4EHDJwvMJ1A77NQ&s',
      text: '오늘은 조카들이 집에 놀러와 조금 시끄러울 수도 있습니다.. 양해 부탁드려요 ㅠ',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaPkRBwF_9pdpWRY4dWLE4EHDJwvMJ1A77NQ&s',
      likes: 19,
      comments: 5,
      date: '2025.09.18',
    },
    {
      id: 'p3',
      unit: '103동 304호',
      author: '닉네임3',
      avatar:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaPkRBwF_9pdpWRY4dWLE4EHDJwvMJ1A77NQ&s',
      text: '저랑 햇반 공구하실 분!!',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaPkRBwF_9pdpWRY4dWLE4EHDJwvMJ1A77NQ&s',
      likes: 5,
      comments: 20,
      date: '2025.09.17',
    },
  ]);
  const [postCreateOpen, setPostCreateOpen] = useState(false);
  const [openPostId, setOpenPostId] = useState(null);
  const openedPost = posts.find((p) => p.id === openPostId) || null;

  const handleCreatePost = ({ text, imageFile }) => {
    const id = (window.crypto && crypto.randomUUID && crypto.randomUUID()) || String(Date.now());
    const image = imageFile ? URL.createObjectURL(imageFile) : '';
    const item = {
      id,
      unit: '103동 304호',
      author: '익명',
      avatar:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaPkRBwF_9pdpWRY4dWLE4EHDJwvMJ1A77NQ&s',
      text: text.trim(),
      image,
      likes: 0,
      comments: 0,
      date: formatDate(new Date()),
    };
    setPosts((prev) => [item, ...prev]);
    setPostCreateOpen(false);
  };
  const handleUpdatePost = (id, next) => {
    setPosts((p) => p.map((x) => (x.id === id ? { ...x, ...next } : x)));
    setOpenPostId(null);
  };
  const handleDeletePost = (id) => {
    setPosts((p) => p.filter((x) => x.id !== id));
    setOpenPostId(null);
  };

  return (
    <PageWrap>
      <Title>층간소음</Title>

      <div style={{ display: 'flex', alignItems: 'center' }}>
        <TabsBar>
          <Tab active={activeTab === 'notice'} onClick={() => setActiveTab('notice')}>
            Notice
          </Tab>
          <span style={{ color: '#c4ccd7', fontWeight: 800 }}>|</span>
          <Tab active={activeTab === 'community'} onClick={() => setActiveTab('community')}>
            Community
          </Tab>
        </TabsBar>

        {activeTab === 'notice' ? (
          <EditIconBtn title="공지 추가" onClick={() => setCreateOpen(true)}>
            <PencilLine size={18} />
          </EditIconBtn>
        ) : (
          <EditIconBtn title="글쓰기" onClick={() => setPostCreateOpen(true)}>
            <PencilLine size={18} />
          </EditIconBtn>
        )}
      </div>

      {activeTab === 'notice' ? (
        <>
          <SectionTitle>공지사항</SectionTitle>
          <NoticeList items={notices} onClickItem={(id) => handleOpen(id)} />
        </>
      ) : (
        <>
          <SectionTitle>Community</SectionTitle>
          <CommunityList items={posts} onClickItem={(id) => setOpenPostId(id)} />
        </>
      )}

      {selected && (
        <NoticeModal
          notice={selected}
          onClose={handleClose}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      )}

      {createOpen && (
        <NoticeCreateModal onClose={() => setCreateOpen(false)} onCreate={handleCreate} />
      )}

      {postCreateOpen && (
        <CommunityCreateModal
          onClose={() => setPostCreateOpen(false)}
          onCreate={handleCreatePost}
        />
      )}
      {openedPost && (
        <CommunityPostModal
          post={openedPost}
          onClose={() => setOpenPostId(null)}
          onUpdate={handleUpdatePost}
          onDelete={handleDeletePost}
        />
      )}
    </PageWrap>
  );
};

export default CommunityPage;
