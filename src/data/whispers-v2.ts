// THE WAY - Whisper Engine Database v2
// 8대 카테고리 기반 성경 위로 메시지들
// 참고: DIVINE_WHISPER_ENGINE.md

export type WhisperCategory =
  | 'comfort' // 위로
  | 'encouragement' // 격려
  | 'question' // 질문
  | 'repentance' // 회개
  | 'obedience' // 순종
  | 'gratitude' // 감사
  | 'waiting' // 기다림
  | 'calling'; // 소명

export type WhisperTone = 'gentle' | 'strong' | 'questioning' | 'celebrative';

export interface Whisper {
  id: string;
  emotionId: string;
  intensityLevel: 1 | 2 | 3 | 4 | 5;

  // Core Content (필수)
  message: string; // 1-3 문장, 현대 언어, 1인칭
  scripture: string; // 성경 구절 원문
  reference: string; // 출처 (책, 장, 절)
  character: string; // 성경 인물
  eventId: string; // CORE_BIBLE_100 event ID

  // Classification (카테고리)
  category: WhisperCategory;
  tone?: WhisperTone;

  // Metadata (내부용)
  context?: string; // 작성 배경
  keywords?: string[]; // 검색용 키워드
}

// ============================================
// SADNESS (슬픔) 예시 - 8대 카테고리 섞인 구성
// ============================================

const sadnessWhispers: Record<1 | 2 | 3 | 4 | 5, Whisper[]> = {
  1: [
    // 위로
    {
      id: 'sadness_1_comfort_1',
      emotionId: 'sadness',
      intensityLevel: 1,
      message:
        '너의 슬픔도 나는 안다.\n그것이 약함이 아니라\n사랑의 깊이임을 알아라.',
      scripture: '예수께서 우시니라',
      reference: '요한복음 11:35',
      character: '예수님',
      eventId: 'event_085',
      category: 'comfort',
      tone: 'gentle',
      context: '예수님도 죽음 앞에서 우셨음',
      keywords: ['슬픔', '인정', '공감'],
    },
    // 감사
    {
      id: 'sadness_1_gratitude_1',
      emotionId: 'sadness',
      intensityLevel: 1,
      message:
        '슬픔도 나의 선물이다.\n사랑하기에 슬프고\n마음이 있기에 아픈 것이다.',
      scripture: '항상 기뻐하라... 범사에 감사하라',
      reference: '데살로니가전서 5:16-18',
      character: '바울',
      eventId: 'event_075',
      category: 'gratitude',
      tone: 'gentle',
      context: '감정 전체를 받아들이는 감사',
    },
  ],
  2: [
    // 격려
    {
      id: 'sadness_2_encouragement_1',
      emotionId: 'sadness',
      intensityLevel: 2,
      message:
        '너의 슬픔 속에서도\n나는 너를 버리지 않는다.\n계속 나를 따라와라.',
      scripture:
        '여호와께서 이르시되 나는 너를 강하게 하리라',
      reference: '이사야 41:10',
      character: '이사야',
      eventId: 'event_025',
      category: 'encouragement',
      tone: 'strong',
      context: '하나님은 약한 자를 강하게 하심',
    },
    // 질문
    {
      id: 'sadness_2_question_1',
      emotionId: 'sadness',
      intensityLevel: 2,
      message:
        '이 슬픔이 너를 어디로 이끌고 있는가?\n도망인가, 아니면 성찰인가?',
      scripture: '내가 세우는 일을 말하노라',
      reference: '이사야 43:18-19',
      character: '이사야',
      eventId: 'event_025',
      category: 'question',
      tone: 'questioning',
      context: '슬픔을 마주하도록 도움',
    },
  ],
  3: [
    // 위로 (깊이 있는)
    {
      id: 'sadness_3_comfort_1',
      emotionId: 'sadness',
      intensityLevel: 3,
      message:
        '넌 혼자가 아니다.\n내가 너와 함께 있다.\n네 슬픔을 내가 지고 간다.',
      scripture:
        '그의 업신 것은 우리의 질고요\n그가 당한 것은 우리의 슬픔이거늘',
      reference: '이사야 53:4',
      character: '예수님',
      eventId: 'event_090',
      category: 'comfort',
      tone: 'gentle',
      context: '예수님이 우리의 슬픔을 함께 지심',
    },
    // 기다림
    {
      id: 'sadness_3_waiting_1',
      emotionId: 'sadness',
      intensityLevel: 3,
      message:
        '이 밤도 지나갈 것이다.\n모든 시간은 계절이고\n슬픔도 결국 봄을 만난다.',
      scripture: '이 묵시는... 끝까지 기다리라',
      reference: '하박국 2:3',
      character: '하박국',
      eventId: 'event_032',
      category: 'waiting',
      tone: 'gentle',
      context: '슬픔은 영원하지 않음',
    },
    // 순종
    {
      id: 'sadness_3_obedience_1',
      emotionId: 'sadness',
      intensityLevel: 3,
      message:
        '오늘 너가 할 수 있는 작은 것이 하나 있을 것이다.\n그것을 해보겠는가?',
      scripture: '손에 하는 일을 묵묵히 하라',
      reference: '전도서 9:10',
      character: '전도자',
      eventId: 'event_035',
      category: 'obedience',
      tone: 'strong',
      context: '슬픔 속에서도 행동하기',
    },
  ],
  4: [
    // 회개
    {
      id: 'sadness_4_repentance_1',
      emotionId: 'sadness',
      intensityLevel: 4,
      message:
        '이 슬픔이 누구를 향한 것인가?\n나에게로 돌아오겠는가?\n아니면 계속 돌아다니겠는가?',
      scripture: '자기 길을 떠나고 여호와께로 돌아오라',
      reference: '이사야 55:7',
      character: '이사야',
      eventId: 'event_025',
      category: 'repentance',
      tone: 'questioning',
      context: '슬픔을 통한 돌이킴의 초청',
    },
    // 소명
    {
      id: 'sadness_4_calling_1',
      emotionId: 'sadness',
      intensityLevel: 4,
      message:
        '너의 슬픔이 다른 이들을 위로하는 깊이가 될 것이다.\n너는 상처를 아는 자가 되고 있다.',
      scripture: '우리는 우리가 받은 위로로 남을 위로한다',
      reference: '고린도후서 1:4',
      character: '바울',
      eventId: 'event_075',
      category: 'calling',
      tone: 'celebrative',
      context: '고통을 통한 소명 발견',
    },
  ],
  5: [
    // 위로 (절망 속의)
    {
      id: 'sadness_5_comfort_1',
      emotionId: 'sadness',
      intensityLevel: 5,
      message:
        '넌 죽음의 그림자에 있다.\n나도 거기 있었다.\n그리고 나는 부활했다.',
      scripture:
        '예수께서 그에게 이르시되 나는 부활이요 생명이니',
      reference: '요한복음 11:25',
      character: '예수님',
      eventId: 'event_090',
      category: 'comfort',
      tone: 'strong',
      context: '극도의 절망 속에서도 부활의 희망',
    },
    // 격려 (마지막)
    {
      id: 'sadness_5_encouragement_1',
      emotionId: 'sadness',
      intensityLevel: 5,
      message:
        '넌 이제 그 고통을 알았다.\n다시는 그것을 피할 수 없을 것이다.\n하지만 이제 나는 그것을 너와 함께 질 것이다.',
      scripture:
        '우리가 모든 환난 중에서 그의 위로로 위로를 받나니',
      reference: '고린도후서 1:4',
      character: '바울',
      eventId: 'event_075',
      category: 'encouragement',
      tone: 'strong',
      context: '극한 상황에서의 궁극의 격려',
    },
  ],
};

// ============================================
// WHISPER DATABASE (8대 카테고리 구성)
// ============================================

export const WHISPER_DATABASE_V2: Record<
  string,
  Record<1 | 2 | 3 | 4 | 5, Whisper[]>
> = {
  sadness: sadnessWhispers,
  // fear, anger, loneliness, guilt, exhaustion, confusion, gratitude, peace
  // → 같은 구조로 확장
};

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * 감정 + 강도 + 선택적 카테고리로 Whisper 선택
 */
export function selectWhisper(
  emotionId: string,
  intensityLevel: 1 | 2 | 3 | 4 | 5,
  preferredCategory?: WhisperCategory
): Whisper | null {
  const whispers = WHISPER_DATABASE_V2[emotionId]?.[intensityLevel];

  if (!whispers || whispers.length === 0) {
    return null;
  }

  // 선호 카테고리가 있으면 그것 우선
  let candidates = whispers;
  if (preferredCategory) {
    const preferred = whispers.filter(
      (w) => w.category === preferredCategory
    );
    if (preferred.length > 0) {
      candidates = preferred;
    }
  }

  // 랜덤 선택 (같은 감정 선택 시 다른 Whisper 표시)
  const randomIndex = Math.floor(Math.random() * candidates.length);
  return candidates[randomIndex];
}

/**
 * 모든 Whisper 조회
 */
export function getAllWhispers(): Whisper[] {
  return Object.values(WHISPER_DATABASE_V2)
    .flatMap((emotion) => Object.values(emotion))
    .flat();
}

/**
 * 감정별 모든 Whisper 조회
 */
export function getWhispersByEmotion(emotionId: string): Whisper[] {
  return Object.values(WHISPER_DATABASE_V2[emotionId] || {}).flat();
}

/**
 * 카테고리별 Whisper 조회
 */
export function getWhispersByCategory(
  category: WhisperCategory
): Whisper[] {
  return getAllWhispers().filter((w) => w.category === category);
}

/**
 * 감정 + 강도 + 카테고리별 조회
 */
export function getWhisperByKey(
  emotionId: string,
  intensityLevel: 1 | 2 | 3 | 4 | 5,
  category: WhisperCategory
): Whisper | undefined {
  const whispers = WHISPER_DATABASE_V2[emotionId]?.[intensityLevel];
  return whispers?.find((w) => w.category === category);
}

/**
 * Whisper 통계
 */
export function getWhisperStats() {
  const all = getAllWhispers();
  const byCategory = new Map<WhisperCategory, number>();

  all.forEach((w) => {
    byCategory.set(w.category, (byCategory.get(w.category) || 0) + 1);
  });

  return {
    total: all.length,
    byCategory: Object.fromEntries(byCategory),
    completion: {
      target: 225,
      current: all.length,
      percentage: Math.round((all.length / 225) * 100),
    },
  };
}
