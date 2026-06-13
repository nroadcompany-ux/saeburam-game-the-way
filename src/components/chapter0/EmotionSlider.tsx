'use client';

import { SpectrumEmotion, SPECTRUM_EMOTIONS } from '@/data/emotionSpectrum';
import { useCallback, useState } from 'react';

interface EmotionSliderProps {
  value: number;
  onChange: (value: number) => void;
  currentEmotion: SpectrumEmotion;
}

export function EmotionSlider({
  value,
  onChange,
  currentEmotion,
}: EmotionSliderProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = parseInt(e.target.value, 10);
      onChange(newValue);
    },
    [onChange]
  );

  const handleMouseDown = useCallback(() => {
    setIsDragging(true);
  }, []);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  return (
    <div className="w-full flex flex-col items-center gap-6">
      {/* Emotion Display */}
      <div className="text-center">
        <p className="text-lg font-medium text-cream mb-2">오늘 나는</p>
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="text-4xl">{currentEmotion.emoji}</span>
          <span className="text-3xl font-bold text-gold">
            {currentEmotion.name}
          </span>
        </div>
        <p className="text-lg font-medium text-cream">기분이야</p>
      </div>

      {/* Slider Container */}
      <div className="w-full px-6">
        <div className="relative">
          {/* Slider Input */}
          <input
            type="range"
            min="0"
            max="100"
            value={value}
            onChange={handleChange}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onTouchStart={handleMouseDown}
            onTouchEnd={handleMouseUp}
            className={`
              w-full h-2 rounded-lg appearance-none cursor-pointer
              bg-gradient-to-r from-sub-text to-sub-text
              accent-gold
              transition-opacity duration-200
              ${isDragging ? 'opacity-100' : 'opacity-80'}
            `}
            style={{
              background: `linear-gradient(to right, rgba(212, 200, 184, 0.2) 0%, rgba(212, 200, 184, 0.2) ${value}%, rgba(212, 200, 184, 0.2) ${value}%, rgba(212, 200, 184, 0.2) 100%)`,
            }}
          />

          {/* Labels Below Slider */}
          <div className="flex justify-between mt-3 text-xs text-sub-text">
            <span>부정</span>
            <span>긍정</span>
          </div>

          {/* Emotion Labels */}
          <div className="flex justify-between mt-2 text-xs text-sub-text/60 overflow-hidden">
            {SPECTRUM_EMOTIONS.filter((e) => e.id !== 'loneliness')
              .slice(0, 4)
              .map((e) => (
                <span key={e.id} className="truncate text-center flex-1">
                  {e.name}
                </span>
              ))}
            <span className="text-center flex-1">감정</span>
            {SPECTRUM_EMOTIONS.filter((e) => e.id !== 'loneliness')
              .slice(4)
              .map((e) => (
                <span key={e.id} className="truncate text-center flex-1">
                  {e.name}
                </span>
              ))}
          </div>
        </div>
      </div>

      {/* Current Value Display (Debug) */}
      <div className="text-xs text-sub-text/50">
        Position: {value}/100
      </div>
    </div>
  );
}
