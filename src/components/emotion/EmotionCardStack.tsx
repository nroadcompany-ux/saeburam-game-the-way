'use client';

import { Emotion } from '@/data/emotions';
import { useCallback, useState } from 'react';
import { EmotionCard } from './EmotionCard';
import { useEmotionSwipe } from './hooks/useEmotionSwipe';

interface EmotionCardStackProps {
  emotions: Emotion[];
  currentIndex: number;
  onSwipeNext: () => void;
  onSwipePrev: () => void;
  onSelect: (emotion: Emotion) => void;
}

export function EmotionCardStack({
  emotions,
  currentIndex,
  onSwipeNext,
  onSwipePrev,
  onSelect,
}: EmotionCardStackProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleSwipe = useCallback(
    (direction: 'left' | 'right') => {
      if (isAnimating) return;

      setIsAnimating(true);
      if (direction === 'left') {
        onSwipeNext();
      } else {
        onSwipePrev();
      }

      setTimeout(() => {
        setIsAnimating(false);
      }, 300);
    },
    [isAnimating, onSwipeNext, onSwipePrev]
  );

  const swipeHandlers = useEmotionSwipe(handleSwipe);

  // Get previous, current, next emotions (with wrapping)
  const prevIndex = (currentIndex - 1 + emotions.length) % emotions.length;
  const nextIndex = (currentIndex + 1) % emotions.length;

  const prevEmotion = emotions[prevIndex];
  const currentEmotion = emotions[currentIndex];
  const nextEmotion = emotions[nextIndex];

  return (
    <div
      {...swipeHandlers}
      className="relative w-full h-96 mx-auto flex items-center justify-center"
    >
      {/* Previous card (left) */}
      <div className="absolute">
        <EmotionCard
          emotion={prevEmotion}
          isActive={false}
          position="left"
          onSelect={onSelect}
        />
      </div>

      {/* Current card (center) */}
      <div className="absolute">
        <EmotionCard
          emotion={currentEmotion}
          isActive={true}
          position="center"
          onSelect={onSelect}
        />
      </div>

      {/* Next card (right) */}
      <div className="absolute">
        <EmotionCard
          emotion={nextEmotion}
          isActive={false}
          position="right"
          onSelect={onSelect}
        />
      </div>

      {/* Swipe indicator */}
      <div className="absolute bottom-0 w-full text-center text-xs opacity-50">
        <p className="text-sub-text">← 스와이프로 다음 감정 보기 →</p>
      </div>
    </div>
  );
}
