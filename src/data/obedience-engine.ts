// THE WAY - Obedience Engine
// 깨달음을 삶으로 만드는 순종의 힘

export interface Obedience {
  id: string;
  emotionId: string;
  action: string;        // 5분 안에 가능한 실제 행동
  description: string;   // 왜 이 행동인지 (심리 설명)
  timeframe: string;     // "오늘" 또는 시간 범위
  checkable: boolean;    // 체크 가능한가
}

export const OBEDIENCE_OPTIONS: Record<string, Obedience[]> = {
  // 두려움: 미루던 일 하기
  fear: [
    {
      id: 'fear_act_1',
      emotionId: 'fear',
      action: '오늘 미루던 일 1개 하기',
      description: '두려움은 행동을 멈춘다. 아주 작은 행동 하나로 두려움을 이긴다.',
      timeframe: '오늘',
      checkable: true,
    },
    {
      id: 'fear_act_2',
      emotionId: 'fear',
      action: '무섭던 사람에게 먼저 말 걸기',
      description: '두려움은 거리에서 생긴다. 가까워지면 두려움은 사라진다.',
      timeframe: '오늘',
      checkable: true,
    },
    {
      id: 'fear_act_3',
      emotionId: 'fear',
      action: '오늘 해야 할 것 리스트 만들고 1개 시작하기',
      description: '미지의 것이 무섭다. 명확하게 보면 두려움은 줄어든다.',
      timeframe: '오늘',
      checkable: true,
    },
  ],

  // 외로움: 먼저 연락하기
  loneliness: [
    {
      id: 'loneliness_act_1',
      emotionId: 'loneliness',
      action: '한 사람에게 먼저 연락하기',
      description: '외로움은 거리의 문제다. 먼저 손을 내밀어라.',
      timeframe: '오늘',
      checkable: true,
    },
    {
      id: 'loneliness_act_2',
      emotionId: 'loneliness',
      action: '누군가와 함께 밥 먹기',
      description: '함께함이 외로움을 치유한다.',
      timeframe: '오늘',
      checkable: true,
    },
    {
      id: 'loneliness_act_3',
      emotionId: 'loneliness',
      action: '한 사람의 이야기를 30분 들어주기',
      description: '나만 아는 것이 아니라 누군가를 아는 것이 진정한 연결이다.',
      timeframe: '오늘',
      checkable: true,
    },
  ],

  // 분노: 누군가에게 친절하기
  anger: [
    {
      id: 'anger_act_1',
      emotionId: 'anger',
      action: '화났던 상대에게 먼저 좋은 말 하기',
      description: '분노는 상처에서 온다. 상처를 품으면 더 깊어진다. 내려놓아라.',
      timeframe: '오늘',
      checkable: true,
    },
    {
      id: 'anger_act_2',
      emotionId: 'anger',
      action: '오늘 한 사람에게 진심으로 감사 표현하기',
      description: '분노의 반대는 감사다. 감사가 분노를 녹인다.',
      timeframe: '오늘',
      checkable: true,
    },
    {
      id: 'anger_act_3',
      emotionId: 'anger',
      action: '누군가 말 끝까지 끝말 없이 듣기',
      description: '분노는 내 목소리만 크게 한다. 다른 목소리를 들어라.',
      timeframe: '오늘',
      checkable: true,
    },
  ],

  // 죄책감: 숨기던 것 말하기
  guilt: [
    {
      id: 'guilt_act_1',
      emotionId: 'guilt',
      action: '숨기던 것을 신뢰할 사람 1명에게 말하기',
      description: '죄책감은 숨김에서 커진다. 빛에 내놓으면 힘을 잃는다.',
      timeframe: '오늘',
      checkable: true,
    },
    {
      id: 'guilt_act_2',
      emotionId: 'guilt',
      action: '미안한 사람에게 진정한 사과하기',
      description: '말로만 미안해서는 아무것도 바뀌지 않는다. 행동으로 보여라.',
      timeframe: '오늘',
      checkable: true,
    },
    {
      id: 'guilt_act_3',
      emotionId: 'guilt',
      action: '작은 선행 1개 하기 (누구도 모르게)',
      description: '죄책감을 떨쳐내는 가장 강한 방법은 선행이다.',
      timeframe: '오늘',
      checkable: true,
    },
  ],

  // 수치심: 작은 용기 내기
  shame: [
    {
      id: 'shame_act_1',
      emotionId: 'shame',
      action: '거울 보고 자신에게 "나는 충분하다" 말하기',
      description: '수치심은 자신을 부정하는 거짓말이다. 진실을 말해라.',
      timeframe: '오늘',
      checkable: true,
    },
    {
      id: 'shame_act_2',
      emotionId: 'shame',
      action: '수치스럽다고 생각하는 것 한 가지를 누군가에게 말하기',
      description: '빛에 노출되면 수치심은 사라진다. 용기를 내라.',
      timeframe: '오늘',
      checkable: true,
    },
    {
      id: 'shame_act_3',
      emotionId: 'shame',
      action: '자신이 좋아하는 것 하나 하기',
      description: '수치심이 좋아하는 것까지 빼앗지 못하게 하라.',
      timeframe: '오늘',
      checkable: true,
    },
  ],

  // 무기력: 작은 행동 시작하기
  exhaustion: [
    {
      id: 'exhaustion_act_1',
      emotionId: 'exhaustion',
      action: '눈을 뜨고 5분 햇빛 맞기',
      description: '무기력함은 고립에서 온다. 세상과 연결되어라.',
      timeframe: '오늘',
      checkable: true,
    },
    {
      id: 'exhaustion_act_2',
      emotionId: 'exhaustion',
      action: '하고 싶은 일 리스트에서 가장 쉬운 것 5분 하기',
      description: '거창할 필요 없다. 한 발 한 발이 길을 만든다.',
      timeframe: '오늘',
      checkable: true,
    },
    {
      id: 'exhaustion_act_3',
      emotionId: 'exhaustion',
      action: '누군가에게 도움 청하기',
      description: '무기력함은 혼자서 오지 않는다. 손을 내밀어라.',
      timeframe: '오늘',
      checkable: true,
    },
  ],

  // 혼란: 명확히 하기
  confusion: [
    {
      id: 'confusion_act_1',
      emotionId: 'confusion',
      action: '혼란스러운 것들 3가지 종이에 쓰고 정리하기',
      description: '혼란은 마음에만 있을 때 복잡해진다. 밖으로 꺼내면 명확해진다.',
      timeframe: '오늘',
      checkable: true,
    },
    {
      id: 'confusion_act_2',
      emotionId: 'confusion',
      action: '잠시 걷고 돌아오기',
      description: '혼란 속에서는 새로운 관점이 나오지 않는다. 거리를 두어라.',
      timeframe: '오늘',
      checkable: true,
    },
    {
      id: 'confusion_act_3',
      emotionId: 'confusion',
      action: '신뢰하는 사람에게 조언 구하기',
      description: '혼자 생각하는 것보다 함께 생각하는 것이 더 명확하다.',
      timeframe: '오늘',
      checkable: true,
    },
  ],

  // 감사: 감사 기록하기
  gratitude: [
    {
      id: 'gratitude_act_1',
      emotionId: 'gratitude',
      action: '감사한 것 3가지 기록하고 음미하기',
      description: '감사는 기억되어야 더 깊어진다. 기록하라.',
      timeframe: '오늘',
      checkable: true,
    },
    {
      id: 'gratitude_act_2',
      emotionId: 'gratitude',
      action: '누군가에게 감사 편지 한 문장 쓰기',
      description: '받은 감사를 나누면 더 큰 감사가 된다.',
      timeframe: '오늘',
      checkable: true,
    },
    {
      id: 'gratitude_act_3',
      emotionId: 'gratitude',
      action: '평소 당연하게 지나친 것에 감사 인사하기',
      description: '당연함을 감사함으로 바꾸면 삶이 바뀐다.',
      timeframe: '오늘',
      checkable: true,
    },
  ],

  // 평안: 평안을 나누기
  peace: [
    {
      id: 'peace_act_1',
      emotionId: 'peace',
      action: '누군가와 조용함을 함께 누리기',
      description: '평안은 나눌 때 더 깊어진다.',
      timeframe: '오늘',
      checkable: true,
    },
    {
      id: 'peace_act_2',
      emotionId: 'peace',
      action: '받은 평안을 누군가 걱정하는 사람에게 나누기',
      description: '평안의 기적은 전달될 때 일어난다.',
      timeframe: '오늘',
      checkable: true,
    },
    {
      id: 'peace_act_3',
      emotionId: 'peace',
      action: '평안 속에서 기도하고 감사하기',
      description: '평안은 영혼의 쉼이다. 그 안에서 더 깊이 기도하라.',
      timeframe: '오늘',
      checkable: true,
    },
  ],
};

/**
 * Get obedience options for emotion
 */
export function getObedienceOptions(emotionId: string): Obedience[] {
  return OBEDIENCE_OPTIONS[emotionId] || [];
}

/**
 * Select random obedience action
 */
export function selectObedienceAction(emotionId: string): Obedience | null {
  const options = getObedienceOptions(emotionId);
  if (!options.length) return null;
  return options[Math.floor(Math.random() * options.length)];
}
