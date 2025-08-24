import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { qk } from '@shared/lib/queryKeys';
import {
  getPostsByCategory,
  updatePostContent,
  deletePostById,
  createPost,
  updateCommunityPost,
} from '@entities/post/api/postApi';
import { mapCommunityItem, mapNoticeItem } from '@entities/post/lib/mappers';

export const usePostsByCategory = (category) =>
  useQuery({
    queryKey: qk.postsByCategory(category),
    queryFn: async () => {
      const res = await getPostsByCategory(category);
      const list = Array.isArray(res?.data) ? res.data : Array.isArray(res) ? res : [];
      if (category === 'notice') {
        return list.map(mapNoticeItem);
      }
      return list.map(mapCommunityItem);
    },
  });

export const useNoticePosts = () => usePostsByCategory('notice');
export const useCommunityPosts = () => usePostsByCategory('community');

export const useCreateNotice = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ text }) => {
      const res = await createPost({ text, category: 'notice' });
      return mapNoticeItem(res?.data);
    },
    onMutate: async ({ text }) => {
      await qc.cancelQueries({ queryKey: qk.notices() });
      const prev = qc.getQueryData(qk.notices());
      const temp = mapNoticeItem({ id: `tmp-${Date.now()}`, content: text });
      qc.setQueryData(qk.notices(), (old = []) => [temp, ...(old || [])]);
      return { prev };
    },
    onError: (_e, _vars, ctx) => {
      if (ctx?.prev) {
        qc.setQueryData(qk.notices(), ctx.prev);
      }
    },
    onSuccess: (created) => {
      qc.setQueryData(qk.notices(), (old = []) => [
        created,
        ...(old || []).filter((x) => !String(x.id).startsWith('tmp-')),
      ]);
    },
  });
};

export const useUpdateNotice = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, text }) => updatePostContent(id, text),
    onMutate: async ({ id, text }) => {
      await qc.cancelQueries({ queryKey: qk.notices() });
      const prev = qc.getQueryData(qk.notices());
      qc.setQueryData(qk.notices(), (old = []) =>
        old.map((n) => (n.id === String(id) ? { ...n, text } : n))
      );
      return { prev };
    },
    onError: (_e, _vars, ctx) => {
      if (ctx?.prev) {
        qc.setQueryData(qk.notices(), ctx.prev);
      }
    },
    onSuccess: (res) => {
      qc.setQueryData(qk.notices(), (old = []) =>
        old.map((n) =>
          n.id === String(res.id) ? { ...n, text: String(res.content ?? res.title ?? n.text) } : n
        )
      );
    },
  });
};
export const useDeleteNotice = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id) => deletePostById(id),
    onMutate: async (id) => {
      await qc.cancelQueries({ queryKey: qk.notices() });
      const prev = qc.getQueryData(qk.notices());
      qc.setQueryData(qk.notices(), (old = []) => old.filter((n) => n.id !== String(id)));
      return { prev };
    },
    onError: (_e, _id, ctx) => {
      if (ctx?.prev) {
        qc.setQueryData(qk.notices(), ctx.prev);
      }
    },
  });
};

export const useCreateCommunityPost = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ text, imageFile }) => {
      const res = await createPost({
        title: text.trim().slice(0, 30) || '제목 없음',
        text: text.trim(),
        category: 'community',
        imageFile,
      });
      return mapCommunityItem(res?.data);
    },
    onMutate: async ({ text }) => {
      await qc.cancelQueries({ queryKey: qk.community() });
      const prev = qc.getQueryData(qk.community());
      const temp = mapCommunityItem({
        id: `tmp-${Date.now()}`,
        content: text,
        title: text,
        likes: 0,
        comments: 0,
      });
      qc.setQueryData(qk.community(), (old = []) => [temp, ...(old || [])]);
      return { prev };
    },
    onError: (_e, _vars, ctx) => {
      if (ctx?.prev) {
        qc.setQueryData(qk.community(), ctx.prev);
      }
    },
    onSuccess: (created) => {
      qc.setQueryData(qk.community(), (old = []) => [
        created,
        ...(old || []).filter((x) => !String(x.id).startsWith('tmp-')),
      ]);
    },
  });
};

export const useUpdateCommunity = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, text }) => {
      const res = await updateCommunityPost(id, text);
      const updated = res?.data ?? res;
      return mapCommunityItem(updated ?? { id, content: text, title: text });
    },
    onMutate: async ({ id, text }) => {
      await qc.cancelQueries({ queryKey: qk.community() });
      const prev = qc.getQueryData(qk.community());
      qc.setQueryData(qk.community(), (old = []) =>
        old.map((p) => (String(p.id) === String(id) ? { ...p, text } : p))
      );
      return { prev };
    },
    onError: (_e, _vars, ctx) => {
      if (ctx?.prev) {
        qc.setQueryData(qk.community(), ctx.prev);
      }
    },
    onSuccess: (mapped) => {
      qc.setQueryData(qk.community(), (old = []) =>
        old.map((p) => (String(p.id) === String(mapped.id) ? mapped : p))
      );
    },
  });
};

export const useDeleteCommunity = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id) => deletePostById(id),
    onMutate: async (id) => {
      await qc.cancelQueries({ queryKey: qk.community() });
      const prev = qc.getQueryData(qk.community());
      qc.setQueryData(qk.community(), (old = []) => old.filter((p) => String(p.id) !== String(id)));
      return { prev };
    },
    onError: (_e, _id, ctx) => {
      if (ctx?.prev) {
        qc.setQueryData(qk.community(), ctx.prev);
      }
    },
  });
};
