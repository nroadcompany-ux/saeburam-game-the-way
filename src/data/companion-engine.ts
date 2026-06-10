export interface Companion {
  emotionId: string;
  name: string;
  era: string;       // 시대 배경 (짧게)
  emoji: string;
  line1: string;     // 첫 번째 공감
  line2: string;     // 두 번째 공감
  color: string;
}

export const COMPANIONS: Record<string, Companion> = {
  fear: {
    emotionId: 'fear',
    name: '모세',
    era: '출애굽기',
    emoji: '🔥',
    line1: '나도 두려웠다.',
    line2: '나는 말도 잘 못했다.',
    color: '#E8C97A',
  },
  loneliness: {
    emotionId: 'loneliness',
    name: '다윗',
    era: '시편',
    emoji: '🌙',
    line1: '나도 외로웠다.',
    line2: '사람보다 하나님께 더 많이 울었다.',
    color: '#6B9FD4',
  },
  anger: {
    emotionId: 'anger',
    name: '예레미야',
    era: '예레미야서',
    emoji: '⚡',
    line1: '나도 하나님께 화를 냈다.',
    line2: '"왜 나를 이 길로 부르셨나요?"',
    color: '#E07B54',
  },
  guilt: {
    emotionId: 'guilt',
    name: '베드로',
    era: '복음서',
    emoji: '🌊',
    line1: '나도 넘어졌다.',
    line2: '가장 소중한 순간에, 세 번이나.',
    color: '#7EB8A4',
  },
  shame: {
    emotionId: 'shame',
    name: '막달라 마리아',
    era: '복음서',
    emoji: '🌹',
    line1: '나도 정죄받았다.',
    line2: '그러나 그것이 나의 끝은 아니었다.',
    color: '#C9A0DC',
  },
  exhaustion: {
    emotionId: 'exhaustion',
    name: '엘리야',
    era: '열왕기상',
    emoji: '🌵',
    line1: '나도 지쳐서 쓰러졌다.',
    line2: '"이제 그만하겠다"고 했다.',
    color: '#C9A84C',
  },
  confusion: {
    emotionId: 'confusion',
    name: '도마',
    era: '복음서',
    emoji: '❓',
    line1: '나도 의심했다.',
    line2: '보지 않으면 믿지 않겠다고 했다.',
    color: '#8FA8C8',
  },
  gratitude: {
    emotionId: 'gratitude',
    name: '막달라 마리아',
    era: '부활',
    emoji: '🌅',
    line1: '나도 이 감사를 알았다.',
    line2: '눈물인지 기쁨인지 몰랐다.',
    color: '#F4A261',
  },
  peace: {
    emotionId: 'peace',
    name: '요한',
    era: '복음서',
    emoji: '🕊️',
    line1: '나도 이 평안을 경험했다.',
    line2: '예수님 곁에서, 아무 말 없이.',
    color: '#90C9A0',
  },
};

export function getCompanion(emotionId: string): Companion | null {
  return COMPANIONS[emotionId] || null;
}

