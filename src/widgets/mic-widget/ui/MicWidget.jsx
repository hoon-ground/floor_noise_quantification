import styled from 'styled-components';
import { Mic } from 'lucide-react';
import { useWavRecorder } from '../model/useWavRecorder';

const MicWrapper = styled.button`
  width: 72px;
  height: 72px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: #fff;
  border: 3px solid #74b0ff;
  cursor: pointer;
`;

const RecordDescription = styled.div`
  position: fixed;
  bottom: 130px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #111827;
  color: #fff;
  padding: 6px 10px;
  border-radius: 10px;
  font-size: 12px;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  white-space: nowrap;
  word-break: max-content;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
`;

const Dot = styled.span`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #ff4d4f;
  display: inline-block;
  flex: 0 0 auto;
  box-shadow: 0 0 0 0 rgba(255, 77, 79, 0.6);
  animation: pulse 1.4s infinite;
  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 rgba(255, 77, 79, 0.6);
    }
    70% {
      box-shadow: 0 0 0 10px rgba(255, 77, 79, 0);
    }
    100% {
      box-shadow: 0 0 0 0 rgba(255, 77, 79, 0);
    }
  }
`;

const MicWidget = () => {
  const rec = useWavRecorder({ targetSampleRate: 24000 });

  const fmt = (s) =>
    `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

  const saveAs = (blob, name) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = name;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1500);
  };

  const onClick = async () => {
    if (rec.status === 'idle' || rec.status === 'error' || rec.status === 'stopped') {
      await rec.start();
      return;
    }
    if (rec.status === 'recording') {
      rec.stop();
      setTimeout(() => {
        const blob = rec.getBlob();
        if (!blob) {
          return;
        }
        const fileName = `noise-${new Date().toISOString().replace(/[:.]/g, '')}.wav`;
        saveAs(blob, fileName);
        rec.cancel();
      }, 0);
    }
  };

  return (
    <>
      {rec.status === 'recording' && (
        <RecordDescription aria-live="polite">
          <Dot />
          녹음중입니다. {fmt(rec.elapsed)}
        </RecordDescription>
      )}

      <MicWrapper onClick={onClick} title={rec.status === 'recording' ? '중지' : '녹음 시작'}>
        {rec.status === 'recording' ? (
          <Mic size={42} color="#ff5c5c" strokeWidth={2.5} />
        ) : (
          <Mic size={42} color="#74B0FFC4" strokeWidth={2.5} />
        )}
      </MicWrapper>
    </>
  );
};

export default MicWidget;
