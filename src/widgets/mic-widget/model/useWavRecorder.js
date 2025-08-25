import { useCallback, useRef, useState } from 'react';

export const useWavRecorder = (options = {}) => {
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');
  const [elapsed, setElapsed] = useState(0);

  const ctxRef = useRef(null);
  const sourceRef = useRef(null);
  const procRef = useRef(null);
  const streamRef = useRef(null);
  const timerRef = useRef(null);

  const buffersRef = useRef([]);
  const lengthRef = useRef(0);
  const sampleRateRef = useRef(44100);

  const targetRate = Number(options.targetSampleRate || 16000);

  const start = useCallback(async () => {
    setError('');
    if (!navigator.mediaDevices?.getUserMedia) {
      setError('이 브라우저는 녹음을 지원하지 않아요.');
      setStatus('error');
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const Ctx = window.AudioContext || window.webkitAudioContext;
      const ctx = new Ctx();
      ctxRef.current = ctx;
      sampleRateRef.current = ctx.sampleRate;

      const source = ctx.createMediaStreamSource(stream);
      sourceRef.current = source;

      const bufferSize = 4096;
      const proc = ctx.createScriptProcessor(bufferSize, 1, 1);
      procRef.current = proc;

      buffersRef.current = [];
      lengthRef.current = 0;

      proc.onaudioprocess = (e) => {
        const input = e.inputBuffer.getChannelData(0);
        buffersRef.current.push(new Float32Array(input));
        lengthRef.current += input.length;
      };

      source.connect(proc);
      proc.connect(ctx.destination);

      setStatus('recording');
      setElapsed(0);
      timerRef.current = setInterval(() => setElapsed((s) => s + 1), 1000);
    } catch (e) {
      console.error(e);
      setError('마이크 권한이 필요해요.');
      setStatus('error');
    }
  }, []);

  const stop = useCallback(() => {
    if (procRef.current) {
      procRef.current.disconnect();
    }
    if (sourceRef.current) {
      sourceRef.current.disconnect();
    }
    if (ctxRef.current) {
      ctxRef.current.suspend();
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
    }
    clearInterval(timerRef.current);
    setStatus('stopped');
  }, []);

  const cancel = useCallback(() => {
    buffersRef.current = [];
    lengthRef.current = 0;
    if (procRef.current) {
      procRef.current.disconnect();
    }
    if (sourceRef.current) {
      sourceRef.current.disconnect();
    }
    if (ctxRef.current) {
      ctxRef.current.close();
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
    }
    clearInterval(timerRef.current);
    setElapsed(0);
    setStatus('idle');
  }, []);

  const getBlob = useCallback(() => {
    const total = lengthRef.current;
    if (!total) {
      return null;
    }

    const samples = new Float32Array(total);
    let offset = 0;
    buffersRef.current.forEach((buf) => {
      samples.set(buf, offset);
      offset += buf.length;
    });

    const outRate =
      targetRate && targetRate < sampleRateRef.current ? targetRate : sampleRateRef.current;
    const ds = downsampleBuffer(samples, sampleRateRef.current, outRate);
    const wavBlob = encodeWAV(ds, outRate);
    return wavBlob;
  }, [targetRate]);

  return { status, error, elapsed, start, stop, cancel, getBlob, mimeType: 'audio/wav' };
};

const encodeWAV = (samples, sampleRate) => {
  const bytesPerSample = 2;
  const blockAlign = bytesPerSample * 1;

  const buffer = new ArrayBuffer(44 + samples.length * bytesPerSample);
  const view = new DataView(buffer);

  writeString(view, 0, 'RIFF');
  view.setUint32(4, 36 + samples.length * bytesPerSample, true);
  writeString(view, 8, 'WAVE');
  writeString(view, 12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 1, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * blockAlign, true);
  view.setUint16(32, blockAlign, true);
  view.setUint16(34, 16, true);
  writeString(view, 36, 'data');
  view.setUint32(40, samples.length * bytesPerSample, true);
  floatTo16BitPCM(view, 44, samples);

  return new Blob([view], { type: 'audio/wav' });
};

const writeString = (view, offset, str) => {
  for (let i = 0; i < str.length; i++) view.setUint8(offset + i, str.charCodeAt(i));
};

const floatTo16BitPCM = (view, offset, input) => {
  for (let i = 0; i < input.length; i++, offset += 2) {
    let s = Math.max(-1, Math.min(1, input[i]));
    view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7fff, true);
  }
};

const downsampleBuffer = (buffer, inRate, outRate) => {
  if (outRate >= inRate) {
    return buffer;
  }
  const ratio = inRate / outRate;
  const newLen = Math.round(buffer.length / ratio);
  const result = new Float32Array(newLen);

  for (let i = 0; i < newLen; i++) {
    const start = Math.floor(i * ratio);
    const end = Math.min(Math.floor((i + 1) * ratio), buffer.length);
    let sum = 0,
      cnt = 0;
    for (let j = start; j < end; j++) {
      sum += buffer[j];
      cnt++;
    }
    result[i] = cnt ? sum / cnt : 0;
  }
  return result;
};
