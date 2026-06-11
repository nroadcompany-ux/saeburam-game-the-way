'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

interface EmotionData { id: string; name: string; emoji: string; intensity: 1 | 2 | 3; }

export default function PrayerPage() {
  const router = useRouter();
  const [prayer, setPrayer] = useState('');
  const [emotion, setEmotion] = useState<EmotionData | null>(null);

  useEffect(() => {
    const saved = sessionStorage.getItem('chapter0_emotion');
    if (saved) {
      setEmotion(JSON.parse(saved));
    }
  }, []);

  const handleNext = () => {
    sessionStorage.setItem('chapter0_prayer', prayer);
    router.push('/chapter0/whisper');
  };

  if (!emotion) {
    return (
      <div className="min-h-screen bg-dark-navy p-6 flex items-center justify-center">
        <p className="text-cream">로딩 중...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-navy p-6 flex flex-col items-center justify-center">
      <div className="max-w-2xl w-full">
        <h1 className="text-3xl font-bold text-cream mb-2 text-center">
          하나님께 하고 싶은 말이 있나요?
        </h1>
        <p className="text-sub-text text-center mb-8">
          당신의 {emotion.name} {emotion.emoji}한 마음을 말씀하세요. (선택사항)
        </p>

        <textarea
          value={prayer}
          onChange={(e) => setPrayer(e.target.value)}
          placeholder="입력하세요..."
          className="w-full h-64 p-4 rounded-lg bg-emotion-purple border border-gold text-cream placeholder-sub-text resize-none focus:outline-none focus:ring-2 focus:ring-gold mb-4"
        />

        <div className="text-right text-sub-text text-xs mb-8">
          {prayer.length} / 1000
        </div>

        <div className="flex justify-center gap-4">
          <button
            onClick={() => router.back()}
            className="bg-dark-blue text-cream px-8 py-3 rounded-lg font-bold border border-gold hover:border-yellow-500 transition-colors"
          >
            돌아가기
          </button>
          <button
            onClick={handleNext}
            className="bg-gold text-dark-navy px-8 py-3 rounded-lg font-bold hover:bg-yellow-500 transition-colors flex-1"
          >
            다음
          </button>
        </div>
      </div>
    </div>
  );
}
