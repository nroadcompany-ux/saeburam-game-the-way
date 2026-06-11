'use client';

import { Emotion, getSelectableEmotions } from '@/data/emotions';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { EmotionCardStack } from './EmotionCardStack';
import { EmotionHeader } from './EmotionHeader';
import { EmotionSkipButton } from './EmotionSkipButton';

interface EmotionSelectorProps {
  onSkip?: () => void;
}

export function EmotionSelector({ onSkip }: EmotionSelectorProps) {
  const router = useRouter();
  const emotions = getSelectableEmotions();

  const [currentIndex, setCurrentIndex] = useState(0);

  // Navigate to next emotion
  const handleSwipeNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % emotions.length);
  }, [emotions.length]);

  // Navigate to previous emotion
  const handleSwipePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + emotions.length) % emotions.length);
  }, [emotions.length]);

  // Handle emotion selection
  const handleEmotionSelect = useCallback(
    (emotion: Emotion) => {
      router.push(`/chapters/recommended?emotion=${emotion.id}`);
    },
    [router]
  );

  // Handle skip
  const handleSkip = useCallback(() => {
    if (onSkip) {
      onSkip();
    } else {
      // Default: return to home or show a modal
      router.back();
    }
  }, [onSkip, router]);

  return (
    <div className="min-h-screen w-full flex flex-col" style={{ backgroundColor: '#1A1F3A' }}>
      {/* Header */}
      <EmotionHeader />

      {/* Card Stack */}
      <div className="flex-1 flex items-center justify-center px-4">
        <EmotionCardStack
          emotions={emotions}
          currentIndex={currentIndex}
          onSwipeNext={handleSwipeNext}
          onSwipePrev={handleSwipePrev}
          onSelect={handleEmotionSelect}
        />
      </div>

      {/* Skip Button */}
      <EmotionSkipButton onClick={handleSkip} />
    </div>
  );
}
