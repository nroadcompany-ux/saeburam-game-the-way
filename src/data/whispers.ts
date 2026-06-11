// THE WAY - Whisper Engine Database
// 성경 기반 위로 메시지들
// 각 감정 × 강도별로 3-5개의 Whisper 제공

export interface Whisper {
  id: string;
  emotionId: string;
  intensityLevel: 1 | 2 | 3 | 4 | 5;
  message: string; // 50-150자, 위로 메시지
  scripture: string; // 성경 구절 원문
  reference: string; // 출처 (예: "욥기 23:10")
  character: string; // 성경 인물
  eventId: string; // CORE_BIBLE_100 event ID
  context?: string; // 왜 이 Whisper인지 (UI에 표시 안 함, 참고용)
}

// ============================================
// SADNESS (슬픔) — 9개 Whisper (5 × 1-2개)
// ============================================

const sadnessWhispers: Record<1 | 2 | 3 | 4 | 5, Whisper[]> = {
  1: [
    {
      id: 'sadness_1_1',
      emotionId: 'sadness',
      intensityLevel: 1,
      message: '너의 슬픔도 나는 안다.\n그것이 약함이 아니라\n사랑의 깊이임을 알아라.',
      scripture: '예수께서 우시니라 (요한복음 11:35)',
      reference: '요한복음 11:35',
      character: '예수님',
      eventId: '085', // 나사로의 부활
      context: '예수님도 죽음 앞에서 우셨음',
    },
    {
      id: 'sadness_1_2',
      emotionId: 'sadness',
      intensityLevel: 1,
      message:
        '나는 너의 눈물을 본다.\n그 눈물로 씻겨지는 것들이\n얼마나 많은지 모를 것이다.',
      scripture: '주께서 나의 유리함을 계산하셨으니 내 눈물을 담아 두셨다 (시편 56:8)',
      reference: '시편 56:8',
      character: '다윗',
      eventId: '045', // 다윗의 광야 도피
      context: '다윗도 슬픔과 고통을 경험함',
    },
  ],
  2: [
    {
      id: 'sadness_2_1',
      emotionId: 'sadness',
      intensityLevel: 2,
      message:
        '너의 슬픔 속에서도\n나는 너를 버리지 않는다.\n계속 나를 따라와라.',
      scripture: '여호와께서 이르시되 나는 너를 강하게 하리라 (이사야 41:10)',
      reference: '이사야 41:10',
      character: '이사야',
      eventId: '025', // 이사야의 소명
      context: '하나님은 약한 자를 강하게 하심',
    },
    {
      id: 'sadness_2_2',
      emotionId: 'sadness',
      intensityLevel: 2,
      message:
        '이 슬픔도 지나갈 것이다.\n나는 영원한데\n너의 고통은 임시적이다.',
      scripture: '우리의 잠깐의 환난이 우리를 위해 지극히 크고 영원한 영광을 이루나니 (고후 4:17)',
      reference: '고린도후서 4:17',
      character: '바울',
      eventId: '075', // 바울의 선교 여정
      context: '고난은 임시적이고 영광은 영원함',
    },
  ],
  3: [
    {
      id: 'sadness_3_1',
      emotionId: 'sadness',
      intensityLevel: 3,
      message:
        '넌 혼자가 아니다.\n내가 너와 함께 있다.\n네 슬픔을 내가 지고 간다.',
      scripture: '그의 업신 것은 우리의 질고요 그가 당한 것은 우리의 슬픔이거늘 (이사야 53:4)',
      reference: '이사야 53:4',
      character: '예수님',
      eventId: '090', // 십자가와 부활
      context: '예수님이 우리의 슬픔을 함께 지심',
    },
    {
      id: 'sadness_3_2',
      emotionId: 'sadness',
      intensityLevel: 3,
      message: '나오미처럼 넌 비어 있다고 느낄 수 있다.\n하지만 나는 너를 채우러 온다.',
      scripture:
        '여호와께서 이르시되 내가 모두 없어졌다고 하거니와 여호와께서 나를 진휴하셨도다 (룻기 3:11)',
      reference: '룻기 3:11',
      character: '나오미',
      eventId: '035', // 나오미와 룻의 이야기
      context: '나오미의 슬픔에서 회복',
    },
  ],
  4: [
    {
      id: 'sadness_4_1',
      emotionId: 'sadness',
      intensityLevel: 4,
      message:
        '욥처럼 넌 무너져 보인다.\n하지만 넌 회복될 것이다.\n나는 그것을 약속한다.',
      scripture:
        '욥이 이르되 우리가 하나님께 선을 받았은즉 악도 받지 아니하겠느냐 (욥기 2:10)',
      reference: '욥기 2:10',
      character: '욥',
      eventId: '050', // 욥의 고난과 회복
      context: '욥도 극심한 슬픔을 경험했으나 회복됨',
    },
    {
      id: 'sadness_4_2',
      emotionId: 'sadness',
      intensityLevel: 4,
      message:
        '이 순간은 죽음 같지만\n내 계획은 생명이다.\n믿음으로 앞으로 나아가라.',
      scripture: '내 생각은 너희 생각이 아니며 내 길은 너희 길이 아니니라 (이사야 55:8)',
      reference: '이사야 55:8',
      character: '이사야',
      eventId: '025',
      context: '하나님의 계획은 우리의 이해를 초월함',
    },
  ],
  5: [
    {
      id: 'sadness_5_1',
      emotionId: 'sadness',
      intensityLevel: 5,
      message:
        '넌 죽음의 그림자에 있다.\n나도 거기 있었다.\n그리고 나는 부활했다.',
      scripture: '예수께서 그에게 이르시되 나는 부활이요 생명이니 (요한복음 11:25)',
      reference: '요한복음 11:25',
      character: '예수님',
      eventId: '090', // 십자가와 부활
      context: '예수님의 죽음과 부활이 궁극의 희망',
    },
    {
      id: 'sadness_5_2',
      emotionId: 'sadness',
      intensityLevel: 5,
      message:
        '넌 지금 나의 팔에서 안겨 있다.\n네 눈물은 다 셈을 받는다.\n내가 너를 놓지 않을 것이다.',
      scripture: '여호와는 상한 마음을 가진 자들을 고치시며 그들의 상처를 싸매신다 (시편 147:3)',
      reference: '시편 147:3',
      character: '다윗',
      eventId: '045',
      context: '하나님은 상한 마음을 치유하시는 분',
    },
  ],
};

// ============================================
// FEAR (두려움) — 9개 Whisper
// ============================================

const fearWhispers: Record<1 | 2 | 3 | 4 | 5, Whisper[]> = {
  1: [
    {
      id: 'fear_1_1',
      emotionId: 'fear',
      intensityLevel: 1,
      message: '두려움은 인간적이다.\n나의 위대한 종들도\n두려워했다.',
      scripture: '두려워하지 말라 내가 너와 함께 함이니라 (이사야 41:10)',
      reference: '이사야 41:10',
      character: '하나님',
      eventId: '001', // 아브라함의 소명
      context: '아브라함도 두려워했음',
    },
  ],
  2: [
    {
      id: 'fear_2_1',
      emotionId: 'fear',
      intensityLevel: 2,
      message: '그 두려움 뒤에\n무엇이 있는지 보거라.\n대부분은 환상일 것이다.',
      scripture: '대저 하나님이 우리에게 주신 것은 두려운 마음이 아니요 오직 능력과 사랑과 근신의 마음이니라 (디모데후서 1:7)',
      reference: '디모데후서 1:7',
      character: '바울',
      eventId: '075',
      context: '두려움은 하나님에게서 오지 않음',
    },
  ],
  3: [
    {
      id: 'fear_3_1',
      emotionId: 'fear',
      intensityLevel: 3,
      message:
        '모세처럼 넌 약하다고 느껴진다.\n하지만 나는 너를 부르려 한다.\n나의 능력이 충분하다.',
      scripture: '모세가 하나님께 이르되 주여 나는 입이 둔한 자이거늘 (출애굽기 4:10)',
      reference: '출애굽기 4:10',
      character: '모세',
      eventId: '001', // 모세의 부르심
      context: '모세도 두려워했으나 하나님이 능력을 주심',
    },
  ],
  4: [
    {
      id: 'fear_4_1',
      emotionId: 'fear',
      intensityLevel: 4,
      message:
        '기드온처럼 넌 약한 자라고 느끼지만\n내가 함께하면 세이라.\n두려움을 내려놓아라.',
      scripture: '여호와께서 기드온에게 이르시되 평안하거니와 두려워하지 말라 (사사기 6:23)',
      reference: '사사기 6:23',
      character: '기드온',
      eventId: '015', // 기드온의 전쟁
      context: '기드온이 극도의 두려움에서 회복됨',
    },
  ],
  5: [
    {
      id: 'fear_5_1',
      emotionId: 'fear',
      intensityLevel: 5,
      message:
        '베드로가 물 위에서 공포로 빠져들 때\n나는 그의 손을 잡았다.\n너도 나에게 손을 내밀어라.',
      scripture: '예수께서 즉시 손을 내밀어 그를 붙잡으시며 이르시되 믿음이 작은 자여 왜 의심하였느냐 (마태복음 14:31)',
      reference: '마태복음 14:31',
      character: '베드로',
      eventId: '068', // 베드로의 신앙의 여정
      context: '극도의 두려움 속에서도 예수님이 구하심',
    },
  ],
};

// ============================================
// ANGER (분노) — 9개 Whisper
// ============================================

const angerWhispers: Record<1 | 2 | 3 | 4 | 5, Whisper[]> = {
  1: [
    {
      id: 'anger_1_1',
      emotionId: 'anger',
      intensityLevel: 1,
      message:
        '분노도 감정이다.\n나는 너의 모든 감정을\n받아준다.',
      scripture: '노하기를 더디 하시고 인자하심이 많으신 여호와여 (민수기 14:18)',
      reference: '민수기 14:18',
      character: '모세',
      eventId: '018', // 십계명 수여
      context: '하나님도 분노를 경험하심',
    },
  ],
  2: [
    {
      id: 'anger_2_1',
      emotionId: 'anger',
      intensityLevel: 2,
      message: '요나처럼 넌 나에게 화낼 수도 있다.\n그것도 괜찮다. 그래도 나는 너를 사랑한다.',
      scripture: '여호와께서 이르시되 너는 이 박넝쿨을 위하여 화내는 것이 합당하냐 (요나 4:9)',
      reference: '요나 4:9',
      character: '요나',
      eventId: '032', // 요나와 니느웨
      context: '요나의 분노도 하나님이 아심',
    },
  ],
  3: [
    {
      id: 'anger_3_1',
      emotionId: 'anger',
      intensityLevel: 3,
      message: '다윗처럼 넌 울분을 느낀다.\n그 울분을 나에게 털어놓아라.\n나는 듣고 있다.',
      scripture: '내가 하나님께 대하여 내 목소리로 부르짖으니 그가 들으셨다 (시편 77:1)',
      reference: '시편 77:1',
      character: '다윗',
      eventId: '045',
      context: '다윗의 감정적인 기도들',
    },
  ],
  4: [
    {
      id: 'anger_4_1',
      emotionId: 'anger',
      intensityLevel: 4,
      message: '그 분노는 정당할 수도 있다.\n하지만 그것으로 죄를 짓지 말아라.\n부르짖어라. 행동하지 말고.',
      scripture: '노하여도 죄를 짓지 말며 해가 지도록 분을 품지 말고 (에베소서 4:26)',
      reference: '에베소서 4:26',
      character: '바울',
      eventId: '075',
      context: '분노는 자연스럽지만 조절이 필요함',
    },
  ],
  5: [
    {
      id: 'anger_5_1',
      emotionId: 'anger',
      intensityLevel: 5,
      message:
        '나도 성전을 뒤엎으며 분노했다.\n하지만 그 분노는 사랑에서 비롯되었다.\n너의 분노는 누구를 위한가?',
      scripture: '예수께서 성전으로 들어가사 장사하는 자들을 내어 쫓으시며 (마태복음 21:12)',
      reference: '마태복음 21:12',
      character: '예수님',
      eventId: '085',
      context: '예수님의 의로운 분노',
    },
  ],
};

// ============================================
// TODO: LONELINESS, GUILT, EXHAUSTION, CONFUSION, GRATITUDE, PEACE
// 같은 구조로 각 감정별 9개씩 추가 필요 (총 225개)
// ============================================

// ============================================
// WHISPER DATABASE
// ============================================

export const WHISPER_DATABASE: Record<string, Record<1 | 2 | 3 | 4 | 5, Whisper[]>> = {
  sadness: sadnessWhispers,
  fear: fearWhispers,
  anger: angerWhispers,
  // loneliness: lonelinessWhispers,
  // guilt: guiltWhispers,
  // exhaustion: exhaustionWhispers,
  // confusion: confusionWhispers,
  // gratitude: gratitudeWhispers,
  // peace: peaceWhispers,
};

// ============================================
// HELPER FUNCTIONS
// ============================================

export function selectWhisper(
  emotionId: string,
  intensityLevel: 1 | 2 | 3 | 4 | 5
): Whisper | null {
  const whispers = WHISPER_DATABASE[emotionId]?.[intensityLevel];

  if (!whispers || whispers.length === 0) {
    return null;
  }

  // Random selection (will show different whisper on subsequent calls)
  const randomIndex = Math.floor(Math.random() * whispers.length);
  return whispers[randomIndex];
}

export function getAllWhispers(): Whisper[] {
  return Object.values(WHISPER_DATABASE)
    .flatMap((emotion) => Object.values(emotion))
    .flat();
}

export function getWhispersByEmotion(emotionId: string): Whisper[] {
  return Object.values(WHISPER_DATABASE[emotionId] || {}).flat();
}
