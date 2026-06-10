'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { selectHardcodedWhisper, type Whisper } from '@/data/whispers-hardcoded';

export default function WhisperPage() {
  const router = useRouter();
  const [whisper, setWhisper] = useState<Whisper | null>(null);
  const [emotion, setEmotion] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const emotionData = sessionStorage.getItem('chapter0_emotion');
    if (emotionData) {
      const parsed = JSON.parse(emotionData);
      setEmotion(parsed);

      // 하드코딩된 Whisper 선택
      const selected = selectHardcodedWhisper(parsed.id, parsed.intensity);
      setWhisper(selected);
    }
    setIsLoading(false);
  }, []);

  const handleNext = () => {
    if (whisper) {
      sessionStorage.setItem('chapter0_whisper', JSON.stringify(whisper));
    }
    router.push('/chapter0/obedience');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-dark-navy p-6 flex items-center justify-center">
        <div className="text-center">
          <p className="text-cream mb-4 text-xl">하나님의 속삭임...</p>
          <div className="w-12 h-12 border-4 border-gold border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    );
  }

  if (!whisper || !emotion) {
    return (
      <div className="min-h-screen bg-dark-navy p-6 flex items-center justify-center">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-bold text-cream mb-4">
            {emotion?.name} {emotion?.emoji}
          </h1>
          <p className="text-sub-text mb-8">
            죄송합니다. 이 감정에 대한 메시지를 준비하지 못했습니다.
          </p>
          <button
            onClick={() => router.push('/chapter0/legacy')}
            className="bg-gold text-dark-navy px-8 py-3 rounded-lg font-bold hover:bg-yellow-500"
          >
            계속
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-navy p-6 flex flex-col items-center justify-center">
      <div className="max-w-2xl w-full">
        {/* Whisper 메시지 */}
        <div className="bg-gradient-to-b from-emotion-purple to-dark-navy border border-gold rounded-lg p-8 mb-8">
          <div className="text-5xl mb-6 text-center">{emotion.emoji}</div>

          <h2 className="text-2xl font-bold text-gold text-center leading-relaxed whitespace-pre-line">
            {whisper.message}
          </h2>
        </div>

        {/* 성경 구절 */}
        <div className="bg-dark-blue border border-sub-text rounded-lg p-6 mb-8">
          <p className="text-xs text-sub-text mb-3 uppercase tracking-widest">성경 구절</p>
          <p className="text-cream mb-4 leading-relaxed text-sm">
            {whisper.scripture}
          </p>
          <p className="text-xs text-gold font-bold">
            {whisper.reference}
          </p>
        </div>

        {/* 성경 인물 */}
        <div className="bg-emotion-purple rounded-lg p-4 text-center border border-gold mb-8">
          <p className="text-xs text-sub-text mb-2">성경 인물</p>
          <p className="text-cream font-bold text-lg">{whisper.character}</p>
        </div>

        {/* 버튼 */}
        <div className="flex justify-center gap-4">
          <button
            onClick={() => router.back()}
            className="bg-dark-blue text-cream px-8 py-3 rounded-lg font-bold border border-gold hover:border-yellow-500 transition-colors"
          >
            다시 선택
          </button>
          <button
            onClick={handleNext}
            className="bg-gold text-dark-navy px-8 py-3 rounded-lg font-bold hover:bg-yellow-500 transition-colors flex-1"
          >
            이 말씀과 함께 나아가기
          </button>
        </div>
      </div>
    </div>
  );
}
