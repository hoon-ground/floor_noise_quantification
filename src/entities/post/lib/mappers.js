export const toDateStr = (v) => {
  try {
    const d = v instanceof Date ? v : new Date(v);
    if (Number.isNaN(d.getTime())) return '';
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}.${m}.${day}`;
  } catch {
    return '';
  }
};

export const mapCommunityItem = (item) => ({
  id: String(item.id),
  unit: item.unit ?? '103동 304호',
  author: item.author ?? '익명',
  avatar: item.avatar || item.avatarUrl || null,
  text: String(item.content ?? item.title ?? ''),
  image: item.imageUrl || item.image || null,
  likes: Number(item.likes ?? 0),
  comments: Number(item.comments ?? 0),
  date: toDateStr(item.createdAt ?? item.created_at ?? item.created_date),
});

export const mapNoticeItem = (item) => ({
  id: String(item.id),
  date: toDateStr(item.createdAt ?? item.created_at ?? item.created_date),
  text: String(item.content ?? item.title ?? ''),
});
