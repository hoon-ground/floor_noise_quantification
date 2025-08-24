import { useMemo, useState, useCallback } from 'react';
import {
  useCommunityPosts,
  useNoticePosts,
  useCreateNotice,
  useUpdateNotice,
  useDeleteNotice,
  useCreateCommunityPost,
  useUpdateCommunity,
  useDeleteCommunity,
} from '@entities/noise/model/postQueries';

export const useCommunityPage = () => {
  const [activeTab, setActiveTab] = useState('notice');

  const noticesQ = useNoticePosts();
  const postsQ = useCommunityPosts();

  const [noticeOpenId, setNoticeOpenId] = useState(null);
  const [noticeCreateOpen, setNoticeCreateOpen] = useState(false);
  const [postOpenId, setPostOpenId] = useState(null);
  const [postCreateOpen, setPostCreateOpen] = useState(false);

  const createNoticeM = useCreateNotice();
  const updateNoticeM = useUpdateNotice();
  const deleteNoticeM = useDeleteNotice();

  const createCommunityM = useCreateCommunityPost();
  const updateCommunityM = useUpdateCommunity();
  const deleteCommunityM = useDeleteCommunity();

  const notices = noticesQ.data || [];
  const posts = postsQ.data || [];
  const isLoadingNotices = noticesQ.isLoading;
  const isLoadingPosts = postsQ.isLoading;

  const openedNotice = useMemo(
    () => notices.find((n) => n.id === noticeOpenId) || null,
    [notices, noticeOpenId]
  );
  const openedPost = useMemo(
    () => posts.find((p) => String(p.id) === String(postOpenId)) || null,
    [posts, postOpenId]
  );

  const openNotice = useCallback((id) => setNoticeOpenId(id), []);
  const closeNotice = useCallback(() => setNoticeOpenId(null), []);
  const openPost = useCallback((id) => setPostOpenId(id), []);
  const closePost = useCallback(() => setPostOpenId(null), []);

  const createNotice = useCallback(
    async ({ text, category }) => {
      const t = text.trim();
      if (!t) {
        return;
      }
      try {
        await createNoticeM.mutateAsync({ text: t });
        setNoticeCreateOpen(false);
      } catch (e) {
        console.error('공지 등록 실패:', e);
        alert('공지 등록 실패');
      }
    },
    [createNoticeM]
  );

  const updateNotice = useCallback(
    async (id, nextText) => {
      try {
        await updateNoticeM.mutateAsync({ id, text: nextText });
        closeNotice();
      } catch (e) {
        console.error('공지 수정 실패:', e);
        alert('수정 실패');
      }
    },
    [updateNoticeM, closeNotice]
  );

  const deleteNotice = useCallback(
    async (id) => {
      if (!confirm('정말 삭제하시겠어요?')) {
        return;
      }
      try {
        await deleteNoticeM.mutateAsync(id);
        closeNotice();
      } catch (e) {
        console.error('공지 삭제 실패:', e);
        alert('삭제 실패');
      }
    },
    [deleteNoticeM, closeNotice]
  );

  const createCommunityPost = useCallback(
    async ({ text, imageFile }) => {
      try {
        await createCommunityM.mutateAsync({ text, imageFile });
        setPostCreateOpen(false);
      } catch (e) {
        console.error('커뮤니티 글 등록 실패:', e);
        alert('글 등록 실패');
      }
    },
    [createCommunityM]
  );

  const updateCommunity = useCallback(
    async (id, next) => {
      try {
        const nextText = (next?.text ?? '').trim();
        await updateCommunityM.mutateAsync({ id, text: nextText });
        closePost();
      } catch (e) {
        console.error('커뮤니티 글 수정 실패:', e);
        alert('수정 실패');
      }
    },
    [updateCommunityM, closePost]
  );

  const deleteCommunity = useCallback(
    async (id) => {
      if (!confirm('정말 삭제하시겠어요?')) {
        return;
      }
      try {
        await deleteCommunityM.mutateAsync(id);
        closePost();
      } catch (e) {
        console.error('커뮤니티 글 삭제 실패:', e);
        alert('삭제 실패');
      }
    },
    [deleteCommunityM, closePost]
  );

  return {
    activeTab,
    setActiveTab,
    notices,
    isLoadingNotices,
    noticeOpenId,
    noticeCreateOpen,
    setNoticeCreateOpen,
    posts,
    isLoadingPosts,
    postOpenId,
    postCreateOpen,
    setPostCreateOpen,

    openedNotice,
    openedPost,

    openNotice,
    closeNotice,
    createNotice,
    updateNotice,
    deleteNotice,
    openPost,
    closePost,
    createCommunityPost,
    updateCommunity,
    deleteCommunity,
  };
};
