export const qk = {
  noiseByDate: (start, end) => ['noise', 'by-date', { start, end }],
  noiseReport: (start, end) => ['noise', 'report', { start, end }],

  postsByCategory: (category) => ['posts', 'category', category],
  notices: () => ['posts', 'category', 'notice'],
  community: () => ['posts', 'category', 'community'],
};
