'use client';

import { useCallback } from 'react';

interface EmotionSkipButtonProps {
  onClick: () => void;
}

export function EmotionSkipButton({ onClick }: EmotionSkipButtonProps) {
  const handleClick = useCallback(() => {
    onClick();
  }, [onClick]);

  return (
    <div className="w-full py-6 px-4 text-center" style={{ backgroundColor: '#1A1F3A' }}>
      <button
        onClick={handleClick}
        className="text-sm font-medium transition-colors duration-200 hover:opacity-100"
        style={{ color: '#D4C8B8' }}
      >
        선택하지 않기
      </button>
    </div>
  );
}
