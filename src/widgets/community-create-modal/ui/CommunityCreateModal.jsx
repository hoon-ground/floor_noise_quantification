import { useMemo, useState } from 'react';
import styled from 'styled-components';

const PostingOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 90;
  background: rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 80px;
`;

const PostContent = styled.div`
  width: 100%;
  max-width: 540px;
  margin: 0 12px;
  background: #fff;
  border-radius: 18px;
  border: 1px solid #bcd1ff;
  padding: 12px 12px 16px;
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.18);
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 900;
  margin-bottom: 6px;
`;

const Profile = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  object-fit: cover;
`;

const Upload = styled.label`
  display: grid;
  place-items: center;
  width: 100%;
  min-height: 140px;
  max-height: 720px;
  overflow: hidden;
  border-radius: 12px;
  background-color: #f2f5fb;
  color: #9aa5b1;
  cursor: pointer;
  margin: 8px 0;

  img {
    width: 100%;
    height: auto;
    object-fit: cover;
    border-radius: 12px;
  }
`;

const Hidden = styled.input`
  display: none;
`;

const Textarea = styled.textarea`
  width: 100%;
  min-height: 90px;
  border: 0;
  outline: none;
  font-size: 14px;
  color: #111827;
  resize: none;
  &::placeholder {
    color: #c2c9d2;
  }
`;

const Footer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 8px;
`;

const SaveButton = styled.button`
  border: 1px solid #e5e7eb;
  background: #f3f4f6;
  color: #374151;
  border-radius: 12px;
  padding: 8px 12px;
  font-weight: 800;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
`;

const CommunityCreateModal = ({ onClose, onCreate }) => {
  const me = useMemo(() => ({ unit: '103동 304호', avatar: null }), []);
  const [text, setText] = useState('');
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const onPick = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const save = () => {
    if (!text.trim() && !file) return;
    onCreate?.({ text, imageFile: file });
  };

  return (
    <PostingOverlay onClick={onClose}>
      <PostContent onClick={(e) => e.stopPropagation()}>
        <Header>
          <Profile src={me.avatar} alt="프로필" />
          <div style={{ fontWeight: 900 }}>{me.unit}</div>
        </Header>

        <Upload htmlFor="upload">
          {preview ? (
            <img
              src={preview}
              alt=""
              style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 12 }}
            />
          ) : (
            '+ 사진 추가'
          )}
        </Upload>
        <Hidden id="upload" type="file" accept="image/*" onChange={onPick} />

        <Textarea
          placeholder="내용을 입력하세요..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <Footer>
          <SaveButton onClick={save} disabled={!text.trim() && !file}>
            등록
          </SaveButton>
        </Footer>
      </PostContent>
    </PostingOverlay>
  );
};

export default CommunityCreateModal;
