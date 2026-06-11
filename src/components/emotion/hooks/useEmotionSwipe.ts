'use client';

import { useCallback, useState } from 'react';

interface SwipeHandlers {
  onTouchStart: (e: React.TouchEvent) => void;
  onTouchMove: (e: React.TouchEvent) => void;
  onTouchEnd: (e: React.TouchEvent) => void;
}

type SwipeDirection = 'left' | 'right';

export function useEmotionSwipe(
  onSwipe: (direction: SwipeDirection) => void,
  minDistance: number = 50
): SwipeHandlers {
  const [startX, setStartX] = useState<number | null>(null);

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    setStartX(e.touches[0].clientX);
  }, []);

  const onTouchMove = useCallback(() => {
    // Optional: Add visual feedback during swipe
  }, []);

  const onTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (startX === null) return;

      const endX = e.changedTouches[0].clientX;
      const distance = startX - endX;

      // Swipe threshold
      if (Math.abs(distance) > minDistance) {
        const direction: SwipeDirection = distance > 0 ? 'left' : 'right';
        onSwipe(direction);
      }

      setStartX(null);
    },
    [startX, minDistance, onSwipe]
  );

  return {
    onTouchStart,
    onTouchMove,
    onTouchEnd,
  };
}
