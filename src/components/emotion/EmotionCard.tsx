'use client';

import { Emotion } from '@/data/emotions';
import { useCallback } from 'react';

interface EmotionCardProps {
  emotion: Emotion;
  isActive: boolean;
  position: 'left' | 'center' | 'right';
  onSelect: (emotion: Emotion) => void;
}

export function EmotionCard({
  emotion,
  isActive,
  position,
  onSelect,
}: EmotionCardProps) {
  const handleClick = useCallback(() => {
    onSelect(emotion);
  }, [emotion, onSelect]);

  // Position styles
  const positionStyles: Record<string, string> = {
    left: '-translate-x-12 opacity-30',
    center: 'translate-x-0 opacity-100',
    right: 'translate-x-12 opacity-30',
  };

  return (
    <div
      className={`
        absolute w-80 h-96 rounded-3xl shadow-2xl p-6 flex flex-col justify-between
        transition-all duration-300 ease-out
        ${positionStyles[position]}
      `}
      style={{
        backgroundColor: emotion.color.bg,
        color: emotion.color.text,
      }}
    >
      {/* Icon */}
      <div className="text-6xl mb-2">{emotion.emoji}</div>

      {/* Emotion Name */}
      <h2 className="text-2xl font-semibold">{emotion.name}</h2>

      {/* Divider */}
      <div
        className="w-full h-px opacity-20"
        style={{ backgroundColor: emotion.color.text }}
      />

      {/* Question */}
      <p className="text-base leading-relaxed whitespace-pre-line">
        {emotion.question}
      </p>

      {/* Experience Button */}
      <button
        onClick={handleClick}
        disabled={!isActive}
        className={`
          w-full py-3 px-6 rounded-lg font-semibold
          transition-all duration-200
          ${
            isActive
              ? 'bg-gold text-dark-navy hover:bg-yellow-500 cursor-pointer'
              : 'bg-gold/50 text-dark-navy/50 cursor-not-allowed'
          }
        `}
      >
        경험하기
      </button>
    </div>
  );
}
