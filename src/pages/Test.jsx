import { useState } from 'react';
import {
  uploadNoiseData,
  getNoiseDataList,
  getNoiseData,
  getNoiseDataByCustomer,
  updateNoiseData,
  deleteNoiseDataWithFile,
} from '@/api/noiseData';

const initialForm = {
  customerId: 1,
  decibelLevel: 60,
  noiseType: '발소리',
  memo: '테스트 메모',
};

export const Test = () => {
  const [file, setFile] = useState(null);
  const [uploadForm, setUploadForm] = useState(initialForm);
  const [detailId, setDetailId] = useState(1);
  const [customerId, setCustomerId] = useState(1);
  const [updateId, setUpdateId] = useState(1);
  const [updateMemo, setUpdateMemo] = useState('메모 수정 테스트');

  const [listResult, setListResult] = useState([]);
  const [detailResult, setDetailResult] = useState(null);
  const [customerResult, setCustomerResult] = useState([]);
  const [uploadResult, setUploadResult] = useState(null);
  const [updateResult, setUpdateResult] = useState(null);
  const [deleteResult, setDeleteResult] = useState(null);

  const [loading, setLoading] = useState(false);

  const withLoading = async (fn) => {
    try {
      setLoading(true);
      await fn();
    } catch (e) {
      console.error(e);
      alert(e?.response?.data?.message || '요청 실패');
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = () =>
    withLoading(async () => {
      if (!file) return alert('오디오 파일을 선택하세요.');
      const data = {
        customerId: Number(uploadForm.customerId),
        decibelLevel: Number(uploadForm.decibelLevel),
        noiseType: uploadForm.noiseType,
        memo: uploadForm.memo,
      };
      const res = await uploadNoiseData(file, data);
      setUploadResult(res);
    });

  const handleFetchList = () =>
    withLoading(async () => {
      const res = await getNoiseDataList();
      setListResult(res);
    });

  const handleFetchDetail = () =>
    withLoading(async () => {
      const res = await getNoiseData(Number(detailId));
      setDetailResult(res);
    });

  const handleFetchByCustomer = () =>
    withLoading(async () => {
      const res = await getNoiseDataByCustomer(Number(customerId));
      setCustomerResult(res);
    });

  const handleUpdateMemo = () =>
    withLoading(async () => {
      const res = await updateNoiseData({ id: Number(updateId), memo: updateMemo });
      setUpdateResult(res);
    });

  const handleDelete = (id) =>
    withLoading(async () => {
      if (!window.confirm(`정말로 NoiseData #${id} 를 삭제할까요? (파일 포함)`)) return;
      const res = await deleteNoiseDataWithFile(Number(id));
      setDeleteResult(res);
    });

  const onUploadFormChange = (e) => {
    const { name, value } = e.target;
    setUploadForm((s) => ({ ...s, [name]: value }));
  };

  return (
    <div style={{ padding: 16, maxWidth: 900, margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h1>Noise API Playground</h1>
      <p>
        Base URL: <code>{import.meta.env.VITE_API_BASE_URL}</code>
      </p>
      <p>{loading ? '요청 중' : '대기'}</p>

      {/* NoiseData 생성(파일 업로드 포함) */}
      <section style={sectionStyle}>
        <h2>2.2 업로드 (파일 + JSON)</h2>
        <div style={row}>
          <label>파일: </label>
          <input
            type="file"
            accept="audio/*"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
        </div>
        <div style={grid2}>
          <label>customerId</label>
          <input name="customerId" value={uploadForm.customerId} onChange={onUploadFormChange} />

          <label>decibelLevel</label>
          <input
            name="decibelLevel"
            value={uploadForm.decibelLevel}
            onChange={onUploadFormChange}
          />

          <label>noiseType</label>
          <input name="noiseType" value={uploadForm.noiseType} onChange={onUploadFormChange} />

          <label>memo</label>
          <input name="memo" value={uploadForm.memo} onChange={onUploadFormChange} />
        </div>
        <button onClick={handleUpload} disabled={loading}>
          업로드
        </button>
        {uploadResult && (
          <Block>
            <h4>응답</h4>
            <pre>{JSON.stringify(uploadResult, null, 2)}</pre>
            {uploadResult?.dataFileUrl && (
              <audio controls src={uploadResult.dataFileUrl} style={{ width: '100%' }} />
            )}
          </Block>
        )}
      </section>

      {/* 전체 NoiseData 목록조회 */}
      <section style={sectionStyle}>
        <h2>2.3 전체 목록</h2>
        <button onClick={handleFetchList} disabled={loading}>
          목록 불러오기
        </button>
        <Block>
          {listResult?.length ? (
            <ul>
              {listResult.map((it) => (
                <li key={it.id} style={{ marginBottom: 12 }}>
                  <strong>
                    #{it.id} {it.noiseType}
                  </strong>{' '}
                  — {it.decibelLevel} dB
                  <div>{it.memo}</div>
                  {it.dataFileUrl && <audio controls src={it.dataFileUrl} style={{ width: 480 }} />}
                  <div style={{ marginTop: 6 }}>
                    <button onClick={() => setDetailId(it.id)}>ID 설정</button>{' '}
                    <button onClick={() => setUpdateId(it.id)}>업데이트 ID 설정</button>{' '}
                    <button onClick={() => handleDelete(it.id)} style={{ color: 'red' }}>
                      삭제
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div>데이터 없음</div>
          )}
        </Block>
      </section>

      {/* 특정 NoiseData 조회 */}
      <section style={sectionStyle}>
        <h2>2.4 특정 ID 조회</h2>
        <div style={row}>
          <label>ID: </label>
          <input type="number" value={detailId} onChange={(e) => setDetailId(e.target.value)} />
          <button onClick={handleFetchDetail} disabled={loading}>
            조회
          </button>
        </div>
        {detailResult && (
          <Block>
            <pre>{JSON.stringify(detailResult, null, 2)}</pre>
            {detailResult?.dataFileUrl && (
              <audio controls src={detailResult.dataFileUrl} style={{ width: '100%' }} />
            )}
          </Block>
        )}
      </section>

      {/* 특정 고객의 NoiseData 조회 */}
      <section style={sectionStyle}>
        <h2>2.5 고객별 조회</h2>
        <div style={row}>
          <label>customerId: </label>
          <input type="number" value={customerId} onChange={(e) => setCustomerId(e.target.value)} />
          <button onClick={handleFetchByCustomer} disabled={loading}>
            조회
          </button>
        </div>
        <Block>
          <pre>{JSON.stringify(customerResult, null, 2)}</pre>
        </Block>
      </section>

      {/* NoiseData 정보 수정 */}
      <section style={sectionStyle}>
        <h2>2.6 메모 수정</h2>
        <div style={grid2}>
          <label>id</label>
          <input type="number" value={updateId} onChange={(e) => setUpdateId(e.target.value)} />
          <label>memo</label>
          <input value={updateMemo} onChange={(e) => setUpdateMemo(e.target.value)} />
        </div>
        <button onClick={handleUpdateMemo} disabled={loading}>
          수정
        </button>
        {updateResult && (
          <Block>
            <pre>{JSON.stringify(updateResult, null, 2)}</pre>
          </Block>
        )}
      </section>

      {/* NoiseData File 포함 삭제 */}
      <section style={sectionStyle}>
        <h2>2.7 삭제(파일 포함)</h2>
        <Block>
          <pre>{JSON.stringify(deleteResult, null, 2)}</pre>
        </Block>
      </section>
    </div>
  );
};

const sectionStyle = { padding: '16px 0', borderTop: '1px solid #eee', marginTop: 16 };
const row = { display: 'flex', gap: 8, alignItems: 'center', margin: '8px 0' };
const grid2 = {
  display: 'grid',
  gridTemplateColumns: '120px 1fr',
  alignItems: 'center',
  gap: 8,
  margin: '8px 0 12px',
};
const Block = ({ children }) => (
  <div style={{ background: '#f6f8fa', padding: 12, borderRadius: 8, marginTop: 8 }}>
    {children}
  </div>
);

export default Test;
