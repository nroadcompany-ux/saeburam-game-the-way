'use client';

import {
  SpectrumEmotion,
  getEmotionByPosition,
  getEmotionById,
  getEmotionSentence,
} from '@/data/emotionSpectrum';
import { useCallback, useEffect, useState } from 'react';

export interface UseEmotionSpectrumOptions {
  defaultPosition?: number;
  onChange?: (emotion: SpectrumEmotion, position: number) => void;
}

export function useEmotionSpectrum({
  defaultPosition = 50,
  onChange,
}: UseEmotionSpectrumOptions = {}) {
  const [sliderValue, setSliderValue] = useState(defaultPosition);
  const [currentEmotion, setCurrentEmotion] = useState<SpectrumEmotion>(
    getEmotionByPosition(defaultPosition)
  );
  const [selectedEmotionIds, setSelectedEmotionIds] = useState<Set<string>>(
    new Set([currentEmotion.id])
  );
  const [showDetailedSelection, setShowDetailedSelection] = useState(false);

  // Update emotion when slider changes
  useEffect(() => {
    const emotion = getEmotionByPosition(sliderValue);
    setCurrentEmotion(emotion);

    // Auto-select the emotion in detailed view
    setSelectedEmotionIds(new Set([emotion.id]));

    if (onChange) {
      onChange(emotion, sliderValue);
    }
  }, [sliderValue, onChange]);

  const handleSliderChange = useCallback((value: number) => {
    setSliderValue(value);
  }, []);

  const toggleEmotionSelection = useCallback((emotionId: string) => {
    setSelectedEmotionIds((prev) => {
      const next = new Set(prev);
      if (next.has(emotionId)) {
        next.delete(emotionId);
      } else {
        next.add(emotionId);
      }
      return next;
    });
  }, []);

  const handleStartWithCurrent = useCallback(() => {
    return {
      method: 'slider',
      sliderValue,
      emotionIds: [currentEmotion.id],
      emotions: [currentEmotion],
      selectedEmotions: [currentEmotion],
    };
  }, [sliderValue, currentEmotion]);

  const handleCompleteDetailedSelection = useCallback(() => {
    const selectedEmotions = Array.from(selectedEmotionIds)
      .map((id) => getEmotionById(id))
      .filter((e) => e !== undefined) as SpectrumEmotion[];

    return {
      method: 'detailed',
      sliderValue,
      emotionIds: Array.from(selectedEmotionIds),
      emotions: selectedEmotions,
      selectedEmotions,
    };
  }, [sliderValue, selectedEmotionIds]);

  const emotionSentence = getEmotionSentence(currentEmotion);

  return {
    // State
    sliderValue,
    currentEmotion,
    emotionSentence,
    selectedEmotionIds,
    showDetailedSelection,

    // Handlers
    handleSliderChange,
    toggleEmotionSelection,
    handleStartWithCurrent,
    handleCompleteDetailedSelection,
    setShowDetailedSelection,

    // Utilities
    isEmotionSelected: (emotionId: string) => selectedEmotionIds.has(emotionId),
  };
}
