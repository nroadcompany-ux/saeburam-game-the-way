'use client';

import { SpectrumEmotion, SPECTRUM_EMOTIONS } from '@/data/emotionSpectrum';
import { useCallback } from 'react';

interface EmotionDetailedSelectionProps {
  selectedIds: Set<string>;
  onToggle: (emotionId: string) => void;
  onBack: () => void;
  onComplete: () => void;
  currentEmotion: SpectrumEmotion;
}

export function EmotionDetailedSelection({
  selectedIds,
  onToggle,
  onBack,
  onComplete,
  currentEmotion,
}: EmotionDetailedSelectionProps) {
  const handleToggle = useCallback(
    (emotionId: string) => {
      onToggle(emotionId);
    },
    [onToggle]
  );

  const handleComplete = useCallback(() => {
    if (selectedIds.size > 0) {
      onComplete();
    }
  }, [selectedIds, onComplete]);

  const emotionsSorted = [...SPECTRUM_EMOTIONS]
    .filter((e) => e.id !== 'loneliness') // Exclude loneliness for main list
    .sort((a, b) => a.spectrumPosition - b.spectrumPosition);

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="text-center">
        <p className="text-base text-cream mb-4">오늘 나는</p>
        <p className="text-2xl font-bold text-cream mb-2">
          <span className="text-gold">{currentEmotion.emoji}</span>{' '}
          {currentEmotion.name} 기분이야
        </p>
        <p className="text-sm text-sub-text">더 정확하게 말해주세요</p>
        <p className="text-xs text-sub-text/60">(모두 선택 가능합니다)</p>
      </div>

      {/* Emotion List */}
      <div className="space-y-3 px-6">
        {emotionsSorted.map((emotion) => {
          const isSelected = selectedIds.has(emotion.id);

          return (
            <button
              key={emotion.id}
              onClick={() => handleToggle(emotion.id)}
              className={`
                w-full px-4 py-3 rounded-lg flex items-center gap-3
                transition-all duration-200
                ${
                  isSelected
                    ? 'bg-gold/20 border-2 border-gold'
                    : 'bg-dark-navy/50 border-2 border-sub-text/20'
                }
                hover:border-gold
              `}
            >
              {/* Checkbox */}
              <div
                className={`
                  w-5 h-5 rounded border-2 flex items-center justify-center
                  transition-all duration-200
                  ${
                    isSelected
                      ? 'bg-gold border-gold'
                      : 'border-sub-text/40'
                  }
                `}
              >
                {isSelected && (
                  <span className="text-dark-navy text-sm font-bold">✓</span>
                )}
              </div>

              {/* Emotion */}
              <span className="text-xl">{emotion.emoji}</span>
              <span
                className={`flex-1 text-left font-medium ${
                  isSelected ? 'text-gold' : 'text-cream'
                }`}
              >
                {emotion.name}
              </span>

              {/* Default indicator */}
              {emotion.id === currentEmotion.id && (
                <span className="text-xs text-sub-text bg-sub-text/20 px-2 py-1 rounded">
                  기본
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Buttons */}
      <div className="space-y-3 px-6">
        {/* Complete Button */}
        <button
          onClick={handleComplete}
          disabled={selectedIds.size === 0}
          className={`
            w-full py-3 px-4 rounded-lg font-semibold
            transition-all duration-200
            ${
              selectedIds.size > 0
                ? 'bg-gold text-dark-navy hover:bg-yellow-500'
                : 'bg-gold/30 text-dark-navy/50 cursor-not-allowed'
            }
          `}
        >
          선택 완료
        </button>

        {/* Back Button */}
        <button
          onClick={onBack}
          className="w-full py-3 px-4 rounded-lg font-semibold text-sub-text hover:text-cream transition-colors"
        >
          ◄ 슬라이더로 돌아가기
        </button>
      </div>
    </div>
  );
}
