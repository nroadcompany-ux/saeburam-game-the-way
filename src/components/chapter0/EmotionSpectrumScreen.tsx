'use client';

import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { EmotionDetailedSelection } from './EmotionDetailedSelection';
import { EmotionSlider } from './EmotionSlider';
import { useEmotionSpectrum } from './hooks/useEmotionSpectrum';

interface EmotionSpectrumScreenProps {
  onEmotionSelected?: (selection: unknown) => void;
}

export function EmotionSpectrumScreen({
  onEmotionSelected,
}: EmotionSpectrumScreenProps) {
  const router = useRouter();
  const {
    sliderValue,
    currentEmotion,
    selectedEmotionIds,
    showDetailedSelection,
    handleSliderChange,
    toggleEmotionSelection,
    handleStartWithCurrent,
    handleCompleteDetailedSelection,
    setShowDetailedSelection,
  } = useEmotionSpectrum({
    defaultPosition: 50,
  });

  const handleStartWithCurrent_Click = useCallback(() => {
    const selection = handleStartWithCurrent();

    // Save to session/localStorage
    sessionStorage.setItem('chapter0_emotion_selection', JSON.stringify(selection));

    if (onEmotionSelected) {
      onEmotionSelected(selection);
    } else {
      // Navigate to SCREEN 02
      router.push('/chapter0/intensity');
    }
  }, [handleStartWithCurrent, onEmotionSelected, router]);

  const handleCompleteDetailed_Click = useCallback(() => {
    const selection = handleCompleteDetailedSelection();

    // Save to session/localStorage
    sessionStorage.setItem('chapter0_emotion_selection', JSON.stringify(selection));

    if (onEmotionSelected) {
      onEmotionSelected(selection);
    } else {
      // Navigate to SCREEN 02
      router.push('/chapter0/intensity');
    }
  }, [handleCompleteDetailedSelection, onEmotionSelected, router]);

  // Reset detailed selection when back button is clicked
  const handleBack = useCallback(() => {
    setShowDetailedSelection(false);
  }, [setShowDetailedSelection]);

  return (
    <div className="min-h-screen w-full flex flex-col" style={{ backgroundColor: '#1A1F3A' }}>
      {/* Container */}
      <div className="flex-1 flex flex-col justify-center px-6 py-8">
        {/* Detailed Selection View */}
        {showDetailedSelection ? (
          <EmotionDetailedSelection
            selectedIds={selectedEmotionIds}
            onToggle={toggleEmotionSelection}
            onBack={handleBack}
            onComplete={handleCompleteDetailed_Click}
            currentEmotion={currentEmotion}
          />
        ) : (
          // Spectrum Slider View
          <div className="space-y-8">
            {/* Emotion Slider */}
            <EmotionSlider
              value={sliderValue}
              onChange={handleSliderChange}
              currentEmotion={currentEmotion}
            />

            {/* Buttons */}
            <div className="space-y-3">
              {/* Primary Button */}
              <button
                onClick={handleStartWithCurrent_Click}
                className={`
                  w-full py-3 px-4 rounded-lg font-semibold
                  transition-all duration-200
                  bg-gold text-dark-navy
                  hover:bg-yellow-500 active:scale-95
                `}
              >
                이렇게 시작할래
              </button>

              {/* Secondary Button */}
              <button
                onClick={() => setShowDetailedSelection(true)}
                className={`
                  w-full py-3 px-4 rounded-lg font-semibold
                  transition-all duration-200
                  text-sub-text
                  hover:text-cream
                `}
              >
                더 정확하게 고르기
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
