'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SPECTRUM_EMOTIONS } from '@/data/emotionSpectrum';

interface SelectedEmotion {
  id: string;
  name: string;
  emoji: string;
}

const INTENSITY_LABELS: Record<1 | 2 | 3, string> = {
  1: '한 스푼',
  2: '두 스푼',
  3: '세 스푼',
};

export default function EmotionPage() {
  const router = useRouter();
  const [selectedEmotion, setSelectedEmotion] = useState<SelectedEmotion | null>(null);
  const [selectedIntensity, setSelectedIntensity] = useState<1 | 2 | 3 | null>(null);

  const handleNext = () => {
    if (selectedEmotion && selectedIntensity) {
      sessionStorage.setItem(
        'chapter0_emotion',
        JSON.stringify({
          ...selectedEmotion,
          intensity: selectedIntensity,
        })
      );
      router.push('/chapter0/prayer');
    }
  };

  return (
    <div className="min-h-screen bg-dark-navy p-6 flex flex-col items-center justify-center">
      <div className="max-w-2xl w-full">
        <h1 className="text-3xl font-bold text-cream mb-4 text-center">
          오늘 네 마음은 어디에 있느냐?
        </h1>
        <p className="text-sub-text text-center mb-12">
          감정을 선택하세요
        </p>

        {/* 감정 선택 그리드 */}
        <div className="grid grid-cols-3 gap-3 mb-12">
          {SPECTRUM_EMOTIONS.map((emotion) => (
            <button
              key={emotion.id}
              onClick={() => {
                setSelectedEmotion({
                  id: emotion.id,
                  name: emotion.name,
                  emoji: emotion.emoji,
                });
                setSelectedIntensity(null);
              }}
              className={`p-4 rounded-lg text-center transition-all duration-200 ${
                selectedEmotion?.id === emotion.id
                  ? 'bg-gold text-dark-navy ring-2 ring-gold scale-105'
                  : 'bg-dark-navy border border-gold text-cream hover:border-yellow-500'
              }`}
            >
              <div className="text-3xl mb-2">{emotion.emoji}</div>
              <div className="text-sm font-bold">{emotion.name}</div>
            </button>
          ))}
        </div>

        {/* 강도 선택 */}
        {selectedEmotion && (
          <div className="mb-8 p-6 bg-emotion-purple rounded-lg border border-gold">
            <p className="text-cream text-center mb-6 font-bold text-lg">
              {selectedEmotion.name}의 강도는?
            </p>
            <div className="flex justify-center gap-4">
              {([1, 2, 3] as const).map((level) => (
                <button
                  key={level}
                  onClick={() => setSelectedIntensity(level)}
                  className={`px-6 py-3 rounded-lg font-bold transition-all duration-200 ${
                    selectedIntensity === level
                      ? 'bg-gold text-dark-navy ring-2 ring-gold scale-110'
                      : 'bg-dark-blue text-cream border border-gold hover:border-yellow-500'
                  }`}
                >
                  {INTENSITY_LABELS[level]}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 다음 버튼 */}
        <div className="flex justify-center gap-4">
          <button
            onClick={() => router.back()}
            className="bg-dark-blue text-cream px-8 py-3 rounded-lg font-bold border border-gold hover:border-yellow-500 transition-colors"
          >
            돌아가기
          </button>
          <button
            onClick={handleNext}
            disabled={!selectedEmotion || !selectedIntensity}
            className="bg-gold text-dark-navy px-8 py-3 rounded-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-yellow-500 transition-colors flex-1"
          >
            다음
          </button>
        </div>
      </div>
    </div>
  );
}
