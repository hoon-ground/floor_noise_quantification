import styled from 'styled-components';
import Card from '@shared/ui/Card';
import Spinner from '@shared/ui/Spinner';
import { useState } from 'react';
import { uploadNoiseData } from '@entities/noise/api/noiseApi';

const UploadContainer = styled.div`
  display: grid;
  gap: 10px;
`;

const FileWrapper = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const HiddenInput = styled.input`
  display: none;
`;

const FileChoice = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  border-radius: 12px;
  border: 1px solid #bcd1ff;
  background: #eef3ff;
  color: #3352ff;
  font-weight: 700;
  cursor: pointer;
  transition:
    transform 0.02s ease,
    box-shadow 0.2s ease;
  &:active {
    transform: translateY(1px);
  }
  &:hover {
    box-shadow: 0 4px 14px rgba(51, 82, 255, 0.12);
  }
`;

const FileName = styled.span`
  color: #6b7280;
  font-size: 14px;
  font-weight: 600;
`;

const UploadButton = styled.button`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  border-radius: 12px;
  border: 1px solid #74b0ff;
  background: #74b0ff;
  color: #ffffff;
  font-weight: 800;
  cursor: pointer;
  transition:
    background-color 0.15s ease,
    transform 0.02s ease,
    box-shadow 0.2s ease;

  &:hover {
    background: #5ca4ff;
    box-shadow: 0 6px 16px rgba(92, 164, 255, 0.28);
  }
  &:active {
    transform: translateY(1px);
  }
  &:disabled {
    cursor: not-allowed;
    background: #c7d6ff;
    border-color: #c7d6ff;
    box-shadow: none;
  }
`;

const SmallSpinnerWrap = styled.div`
  display: flex;
  justify-content: center;
  padding: 12px 0;
  height: auto;

  & ${Spinner} {
    height: 40px;
    &::after {
      width: 20px;
      height: 20px;
      border-width: 3px;
    }
  }
`;

const Description = styled.div`
  color: #9aa5b1;
  font-size: 12px;
`;

const UploadFile = () => {
  const [loading, setLoading] = useState(false);
  const [recordedBlob, setRecordedBlob] = useState(null);
  const [fileName, setFileName] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setRecordedBlob(file);
      setFileName(file.name);
      console.log('파일 선택됨:', file);
    }
  };

  const handleUpload = async () => {
    if (!recordedBlob) {
      alert('녹음(파일)을 먼저 선택하세요.');
      return;
    }
    try {
      setLoading(true);
      await uploadNoiseData({
        customerId: 1,
        decibelLevel: 75,
        file: recordedBlob,
      });
      alert('업로드 성공!');
    } catch (err) {
      console.error('업로드 실패:', err);
      alert('업로드 실패 😥');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <UploadContainer>
        <FileWrapper>
          <FileChoice htmlFor="noise-audio">+ 오디오 선택</FileChoice>
          <HiddenInput id="noise-audio" type="file" accept="audio/*" onChange={handleFileChange} />
          <FileName>{fileName || '선택된 파일 없음'}</FileName>
        </FileWrapper>

        <UploadButton onClick={handleUpload} disabled={!recordedBlob || loading}>
          업로드
        </UploadButton>

        {loading && (
          <SmallSpinnerWrap>
            <Spinner />
          </SmallSpinnerWrap>
        )}

        <Description>파일을 업로드하면 AI가 분석해줘요!</Description>
      </UploadContainer>
    </Card>
  );
};

export default UploadFile;
