// THE WAY - Emotion Spectrum Data
// 감정 스펙트럼: 부정(0) ↔ 긍정(100)

export interface SpectrumEmotion {
  id: string;
  name: string;
  emoji: string;
  spectrumPosition: number; // 0-100 (0=부정, 100=긍정)
  description?: string;
}

export const SPECTRUM_EMOTIONS: SpectrumEmotion[] = [
  {
    id: 'fear',
    name: '두려움',
    emoji: '😨',
    spectrumPosition: 0,
    description: '불안하고 두렵다',
  },
  {
    id: 'loneliness',
    name: '외로움',
    emoji: '🥀',
    spectrumPosition: 11,
    description: '혼자라는 느낌',
  },
  {
    id: 'anger',
    name: '분노',
    emoji: '😠',
    spectrumPosition: 22,
    description: '화나고 답답하다',
  },
  {
    id: 'guilt',
    name: '죄책감',
    emoji: '😔',
    spectrumPosition: 33,
    description: '잘못한 것 같은 죄책감',
  },
  {
    id: 'shame',
    name: '수치심',
    emoji: '😳',
    spectrumPosition: 44,
    description: '수치스럽고 부끄럽다',
  },
  {
    id: 'exhaustion',
    name: '무기력',
    emoji: '😩',
    spectrumPosition: 55,
    description: '에너지가 없고 무겁다',
  },
  {
    id: 'confusion',
    name: '혼란',
    emoji: '🤔',
    spectrumPosition: 66,
    description: '무엇을 해야 할지 모르겠다',
  },
  {
    id: 'gratitude',
    name: '감사',
    emoji: '🙏',
    spectrumPosition: 77,
    description: '감사한 마음이 있다',
  },
  {
    id: 'peace',
    name: '평안',
    emoji: '☮️',
    spectrumPosition: 88,
    description: '마음이 고요하고 평온하다',
  },
];

/**
 * Get emotion by position (slider value)
 * Returns the closest emotion to the given position
 */
export function getEmotionByPosition(position: number): SpectrumEmotion {
  // Find closest emotion
  const closest = SPECTRUM_EMOTIONS.reduce((prev, curr) => {
    return Math.abs(curr.spectrumPosition - position) <
      Math.abs(prev.spectrumPosition - position)
      ? curr
      : prev;
  });
  return closest;
}

/**
 * Get all emotions sorted by spectrum position
 */
export function getEmotionsInOrder(): SpectrumEmotion[] {
  return [...SPECTRUM_EMOTIONS].sort(
    (a, b) => a.spectrumPosition - b.spectrumPosition
  );
}

/**
 * Get emotion by ID
 */
export function getEmotionById(id: string): SpectrumEmotion | undefined {
  return SPECTRUM_EMOTIONS.find((e) => e.id === id);
}

/**
 * Convert spectrum position to sentence
 */
export function getEmotionSentence(emotion: SpectrumEmotion): string {
  return `오늘 나는 ${emotion.name}한 기분이야`;
}
