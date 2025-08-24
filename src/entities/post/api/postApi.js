import api from '@shared/api/axiosInstance';

export const getPostsByCategory = async (category) => {
  const res = await api.get(`/api/post/category/${encodeURIComponent(category)}`);
  return res.data;
};

export const updatePostContent = async (id, text) => {
  const payload = {
    id: id,
    title: text,
    content: text,
  };
  const res = await api.put(`/api/post`, payload);
  return res.data;
};

export const updateCommunityPost = async (id, text) => {
  const payload = {
    id,
    title: text,
    content: text,
    category: 'community',
    customerId: 1,
  };
  const res = await api.put(`/api/post`, payload);
  return res.data;
};

export const deletePostById = async (id) => {
  const res = await api.delete(`/api/post/${encodeURIComponent(id)}`);
  return res.status === 200 || res.status === 204;
};

export const createPost = async ({ title = '', text, category, imageFile = null }) => {
  const form = new FormData();

  form.append('title', title || '');
  form.append('content', text);
  form.append('category', category);
  form.append('customerId', '1');

  if (imageFile) {
    form.append('image', imageFile);
  }

  const res = await api.post('/api/post', form);
  return res.data;
};
