export interface Companion {
  emotionId: string;
  name: string;
  emoji: string;
  line: string;       // 공감 한 마디
  story: string;      // 짧은 자기 경험
  courage: string;    // 용기를 주는 말
  color: string;      // 인물 강조 색상
}

export const COMPANIONS: Record<string, Companion> = {
  fear: {
    emotionId: 'fear',
    name: '모세',
    emoji: '🔥',
    line: '나도 두려웠다.',
    story: '홍해 앞에서 내 다리가 떨렸다.\n뒤에는 군대, 앞에는 바다.\n도망칠 곳이 없었다.',
    courage: '그래도 나는 한 발을 내디뎠다.\n너도 할 수 있다.',
    color: '#E8C97A',
  },
  loneliness: {
    emotionId: 'loneliness',
    name: '다윗',
    emoji: '🌙',
    line: '나도 울었다.',
    story: '광야에서 혼자였다.\n아무도 나를 찾지 않았다.\n별만 나를 내려다봤다.',
    courage: '그 밤에 하나님이 나를 찾아오셨다.\n너도 혼자가 아니다.',
    color: '#6B9FD4',
  },
  anger: {
    emotionId: 'anger',
    name: '예레미야',
    emoji: '⚡',
    line: '나도 원망했다.',
    story: '"왜 나를 이 길로 부르셨나요?"\n나는 하나님께 소리쳤다.\n그것이 기도였다.',
    courage: '그 울분이 나를 더 깊게 만들었다.\n너의 분노도 기도가 될 수 있다.',
    color: '#E07B54',
  },
  guilt: {
    emotionId: 'guilt',
    name: '베드로',
    emoji: '🌊',
    line: '나도 넘어졌다.',
    story: '"예수를 모른다."\n세 번이나 말했다.\n닭이 울었고 나는 울었다.',
    courage: '그것이 끝이 아니었다.\n나는 다시 일어났다.\n너도 일어날 수 있다.',
    color: '#7EB8A4',
  },
  shame: {
    emotionId: 'shame',
    name: '막달라 마리아',
    emoji: '🌹',
    line: '나도 정죄받았다.',
    story: '사람들이 나를 손가락질했다.\n그 눈빛들이 나를 찔렀다.\n나는 숨고 싶었다.',
    courage: '하지만 예수님은 나를 보셨다.\n정죄가 아닌 사랑으로.\n넌 지금의 그 모습이 아니다.',
    color: '#C9A0DC',
  },
  exhaustion: {
    emotionId: 'exhaustion',
    name: '엘리야',
    emoji: '🌵',
    line: '나도 지쳤다.',
    story: '광야에 홀로 누워\n"이제 그만하겠다"고 했다.\n더 이상 일어날 힘이 없었다.',
    courage: '천사가 와서 떡을 주었다.\n"일어나 먹어라."\n누군가 너를 일으켜 세울 것이다.',
    color: '#C9A84C',
  },
  confusion: {
    emotionId: 'confusion',
    name: '도마',
    emoji: '❓',
    line: '나도 의심했다.',
    story: '"보지 않으면 믿지 않겠다."\n나는 솔직했다.\n그것이 부끄러웠다.',
    courage: '예수님은 나의 의심을 탓하지 않으셨다.\n"네 손을 내밀어 보아라."\n질문해도 괜찮다.',
    color: '#8FA8C8',
  },
  gratitude: {
    emotionId: 'gratitude',
    name: '막달라 마리아',
    emoji: '🌅',
    line: '나도 이 감사를 느꼈다.',
    story: '부활하신 예수님을 처음 만난 아침.\n그 순간의 감사는 평생 잊지 못한다.\n눈물인지 기쁨인지 몰랐다.',
    courage: '이 감사를 놓지 마.\n이것이 생명이다.',
    color: '#F4A261',
  },
  peace: {
    emotionId: 'peace',
    name: '요한',
    emoji: '🕊️',
    line: '나도 이 평안을 알았다.',
    story: '예수님 가슴에 기대어\n말 한마디 없이 함께 있던 그 시간.\n세상이 다 사라진 것 같았다.',
    courage: '이 평안을 지켜라.\n세상은 빼앗으려 하지만\n이것은 영원하다.',
    color: '#90C9A0',
  },
};

export function getCompanion(emotionId: string): Companion | null {
  return COMPANIONS[emotionId] || null;
}
