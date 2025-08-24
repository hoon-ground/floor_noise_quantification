import { useEffect, useMemo, useState, useCallback } from 'react';
import {
  getPostsByCategory,
  updatePostContent,
  deletePostById,
  createPost,
  updateCommunityPost,
} from '@entities/post/api/postApi';
import { mapCommunityItem, mapNoticeItem } from '@entities/post/lib/mappers';

export const useCommunityPage = () => {
  const [activeTab, setActiveTab] = useState('notice');

  const [notices, setNotices] = useState([]);
  const [isLoadingNotices, setIsLoadingNotices] = useState(true);
  const [noticeOpenId, setNoticeOpenId] = useState(null);
  const [noticeCreateOpen, setNoticeCreateOpen] = useState(false);

  const [posts, setPosts] = useState([]);
  const [isLoadingPosts, setIsLoadingPosts] = useState(true);
  const [postOpenId, setPostOpenId] = useState(null);
  const [postCreateOpen, setPostCreateOpen] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setIsLoadingNotices(true);
        const res = await getPostsByCategory('notice');
        const list = Array.isArray(res?.data) ? res.data : Array.isArray(res) ? res : [];
        setNotices(list.map(mapNoticeItem));
      } catch (e) {
        console.error('공지 불러오기 실패:', e);
        setNotices([]);
      } finally {
        setIsLoadingNotices(false);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        setIsLoadingPosts(true);
        const res = await getPostsByCategory('community');
        const list = Array.isArray(res?.data) ? res.data : Array.isArray(res) ? res : [];
        setPosts(list.map(mapCommunityItem));
      } catch (e) {
        console.error('커뮤니티 글 불러오기 실패:', e);
        setPosts([]);
      } finally {
        setIsLoadingPosts(false);
      }
    })();
  }, []);

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

  const createNotice = useCallback(async ({ text, category }) => {
    const t = text.trim();
    if (!t) {
      return;
    }
    try {
      const res = await createPost({ text: t, category });
      const created = res?.data;
      if (!created) {
        throw new Error('데이터 없음.');
      }
      setNotices((prev) => [mapNoticeItem(created), ...prev]);
      setNoticeCreateOpen(false);
    } catch (e) {
      console.error('공지 등록 실패:', e);
      alert('공지 등록 실패');
    }
  }, []);

  const updateNotice = useCallback(
    async (id, nextText) => {
      const snapshot = [...notices];
      setNotices((prev) => prev.map((n) => (n.id === id ? { ...n, text: nextText } : n)));
      try {
        const res = await updatePostContent(id, nextText);
        if (res && typeof res === 'object') {
          setNotices((prev) =>
            prev.map((n) =>
              n.id === String(res.id)
                ? { ...n, text: String(res.content ?? res.title ?? nextText) }
                : n
            )
          );
        }
        closeNotice();
      } catch (e) {
        console.error('공지 수정 실패:', e);
        alert('수정 실패');
        setNotices(snapshot);
      }
    },
    [notices, closeNotice]
  );

  const deleteNotice = useCallback(
    async (id) => {
      if (!confirm('정말 삭제하시겠어요?')) {
        return;
      }
      const snapshot = [...notices];
      setNotices((prev) => prev.filter((n) => n.id !== id));
      try {
        await deletePostById(id);
        closeNotice();
      } catch (e) {
        console.error('공지 삭제 실패:', e);
        alert('삭제 실패');
        setNotices(snapshot);
      }
    },
    [notices, closeNotice]
  );

  const openPost = useCallback((id) => setPostOpenId(id), []);
  const closePost = useCallback(() => setPostOpenId(null), []);

  const createCommunityPost = useCallback(async ({ text, imageFile }) => {
    try {
      const res = await createPost({
        customerId: 1,
        title: text.trim().slice(0, 30) || '제목 없음',
        text: text.trim(),
        category: 'community',
        imageFile,
      });
      const created = res?.data;
      if (!created) {
        throw new Error('데이터 없음.');
      }
      setPosts((prev) => [mapCommunityItem(created), ...prev]);
      setPostCreateOpen(false);
    } catch (e) {
      console.error('커뮤니티 글 등록 실패:', e);
      alert('글 등록 실패');
    }
  }, []);

  const updateCommunity = useCallback(
    async (id, next) => {
      const snapshot = [...posts];
      setPosts((prev) => prev.map((x) => (String(x.id) === String(id) ? { ...x, ...next } : x)));
      try {
        const nextText = (next?.text ?? '').trim();
        const res = await updateCommunityPost(id, nextText);
        const updated = res?.data ?? res;
        const mapped = mapCommunityItem(updated ?? { id, content: nextText, title: nextText });
        setPosts((prev) => prev.map((x) => (String(x.id) === String(id) ? mapped : x)));
        closePost();
      } catch (e) {
        console.error('커뮤니티 글 수정 실패:', e);
        alert('수정 실패');
        setPosts(snapshot);
      }
    },
    [posts, closePost]
  );

  const deleteCommunity = useCallback(
    async (id) => {
      if (!confirm('정말 삭제하시겠어요?')) {
        return;
      }
      const snapshot = [...posts];
      setPosts((prev) => prev.filter((p) => p.id !== id));
      try {
        await deletePostById(id);
        closePost();
      } catch (e) {
        console.error('커뮤니티 글 삭제 실패:', e);
        alert('삭제 실패');
        setPosts(snapshot);
      }
    },
    [posts, closePost]
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
