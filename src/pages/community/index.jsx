import React from 'react';
import styled from 'styled-components';
import { PencilLine } from 'lucide-react';
import NoticeList from '@widgets/notice-list/ui/NoticeList';
import NoticeModal from '@widgets/notice-modal/ui/NoticeModal';
import NoticeCreateModal from '@widgets/notice-create-modal/ui/NoticeCreateModal';
import CommunityList from '@widgets/community-list/ui/CommunityList';
import CommunityCreateModal from '@widgets/community-create-modal/ui/CommunityCreateModal';
import CommunityPostModal from '@widgets/community-post-modal/ui/CommunityPostModal';
import Spinner from '@shared/ui/Spinner';
import { useCommunityPage } from './model/useCommunityPage';

const CommunityContainer = styled.div`
  max-width: 720px;
  margin: 0 auto;
`;

const Title = styled.h1`
  color: #4c4c4c;
  text-align: center;
  font-family: Inter;
  font-size: 1.25rem;
  font-weight: 600;
  line-height: 140%;
  letter-spacing: -0.025rem;
`;

const SelectMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-weight: 800;
  margin-bottom: 14px;
`;

const Tab = styled.button.withConfig({ shouldForwardProp: (p) => p !== 'active' })`
  background: transparent;
  border: 0;
  cursor: pointer;
  color: ${({ active }) => (active ? '#336dff' : '#9aa5b1')};
  text-decoration: ${({ active }) => (active ? 'underline' : 'none')};
  text-underline-offset: 4px;
  font-size: 14px;
`;

const EditButton = styled.button`
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

const Center = styled.div`
  display: flex;
  justify-content: center;
  padding: 24px 0;
`;

const EmptyBlock = styled.div`
  padding: 20px 0;
  text-align: center;
  color: #6b7280;
  font-size: 14px;
`;

const CommunityPage = () => {
  const view = useCommunityPage();

  return (
    <CommunityContainer>
      <Title>층간소음</Title>

      <div style={{ display: 'flex', alignItems: 'center' }}>
        <SelectMenu>
          <Tab active={view.activeTab === 'notice'} onClick={() => view.setActiveTab('notice')}>
            Notice
          </Tab>
          <span style={{ color: '#c4ccd7', fontWeight: 800 }}>|</span>
          <Tab
            active={view.activeTab === 'community'}
            onClick={() => view.setActiveTab('community')}
          >
            Community
          </Tab>
        </SelectMenu>

        {view.activeTab === 'notice' ? (
          <EditButton title="공지 추가" onClick={() => view.setNoticeCreateOpen(true)}>
            <PencilLine size={18} />
          </EditButton>
        ) : (
          <EditButton title="글쓰기" onClick={() => view.setPostCreateOpen(true)}>
            <PencilLine size={18} />
          </EditButton>
        )}
      </div>

      {view.activeTab === 'notice' ? (
        <>
          <SectionTitle>공지사항</SectionTitle>
          {view.isLoadingNotices ? (
            <Center>
              <Spinner />
            </Center>
          ) : view.notices.length === 0 ? (
            <EmptyBlock>등록된 공지가 없습니다.</EmptyBlock>
          ) : (
            <NoticeList items={view.notices} onClickItem={view.openNotice} />
          )}
        </>
      ) : (
        <>
          <SectionTitle>Community</SectionTitle>
          {view.isLoadingPosts ? (
            <Center>
              <Spinner />
            </Center>
          ) : view.posts.length === 0 ? (
            <EmptyBlock>첫 게시글을 작성해보세요!</EmptyBlock>
          ) : (
            <CommunityList items={view.posts} onClickItem={view.openPost} />
          )}
        </>
      )}

      {/* Notice 모달 */}
      {view.openedNotice && (
        <NoticeModal
          notice={view.openedNotice}
          onClose={view.closeNotice}
          onUpdate={view.updateNotice}
          onDelete={view.deleteNotice}
        />
      )}
      {view.noticeCreateOpen && (
        <NoticeCreateModal
          onClose={() => view.setNoticeCreateOpen(false)}
          onCreate={view.createNotice}
        />
      )}

      {/* Community 모달 */}
      {view.postCreateOpen && (
        <CommunityCreateModal
          onClose={() => view.setPostCreateOpen(false)}
          onCreate={view.createCommunityPost}
        />
      )}
      {view.activeTab === 'community' && view.openedPost && (
        <CommunityPostModal
          post={view.openedPost}
          onClose={view.closePost}
          onUpdate={view.updateCommunity}
          onDelete={view.deleteCommunity}
        />
      )}
    </CommunityContainer>
  );
};

export default CommunityPage;
