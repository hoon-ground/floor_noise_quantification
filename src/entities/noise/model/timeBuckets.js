//데이터 구간이 길어질수록 큰 단위로 묶어서 차트 보기 좋게 만드는 함수
export const pickBucketMs = (durationMs, { singleDay } = {}) => {
  const m = 60 * 1000;
  const h = 60 * m;

  if (singleDay) {
    // 같은 날짜는 분 단위로 보기 좋게
    if (durationMs <= 6 * h) {
      return 1 * m;
    } // <= 6h : 1분
    if (durationMs <= 12 * h) {
      return 5 * m;
    } // <= 12h : 5분
    return 15 * m; // 그 이상(같은날) : 15분
  }

  // 여러 날
  if (durationMs <= 24 * h) {
    return 30 * m;
  } // <= 1일 : 30분
  if (durationMs <= 3 * 24 * h) {
    return 60 * m;
  } // <= 3일 : 1시간
  if (durationMs <= 10 * 24 * h) {
    return 3 * h;
  } // <= 10일 : 3시간
  return 24 * h; // 그 이상 : 1일
};

//시간대별 평균 데시벨 값을 구하는 함수
export const bucketize = ({ points, start, end, bucketMs }) => {
  const startMs = +start;
  const endMs = +end;
  const buckets = [];
  for (let t = startMs; t <= endMs; t += bucketMs) {
    buckets.push({ t, sum: 0, n: 0 });
  }

  const idx = (ts) =>
    Math.min(buckets.length - 1, Math.max(0, Math.floor((ts - startMs) / bucketMs)));

  points.forEach((p) => {
    const ts = +new Date(p.uploadTime);
    if (ts < startMs || ts > endMs) {
      return;
    }
    const i = idx(ts);
    buckets[i].sum += p.decibelLevel || 0;
    buckets[i].n += 1;
  });

  return buckets.map((b) => ({ t: b.t, v: b.n ? Math.round(b.sum / b.n) : 0 }));
};

//차트 Y축을 보기 좋게 10 단위로 잘라주는 함수
export const yTicks10 = (maxVal) => {
  const ceil10 = Math.ceil(maxVal / 10) * 10;
  const arr = [];
  for (let v = 0; v <= Math.max(ceil10, 10); v += 10) {
    arr.push(v);
  }
  return arr;
};
