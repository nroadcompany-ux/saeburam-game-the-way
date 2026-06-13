// THE WAY - Hardcoded Whisper Messages
// 성경 기반 위로 메시지 (하드코딩)
// 구조: 9개 감정 × 5개 = 45개 (강도별 2개 + 여분 1개)

export interface Whisper {
  id: string;
  message: string;
  scripture: string;
  reference: string;
  character: string;
  intensity?: 1 | 2 | 3; // 선호 강도 (없으면 모든 강도에 사용)
}

export const HARDCODED_WHISPERS: Record<string, Whisper[]> = {
  // ─── 두려움 ─────────────────────────────────────────────────────────────────
  fear: [
    {
      id: 'fear_1',
      intensity: 1,
      message: '네 두려움을 내게 내려놓아라.\n나는 너를 버리지 않는다.\n내가 함께 있다.',
      scripture: '두려워하지 말라 내가 너와 함께 함이니라',
      reference: '이사야 41:10',
      character: '하나님',
    },
    {
      id: 'fear_2',
      intensity: 1,
      message: '두려움은 약함이 아니다.\n내 종들도 두려워했다.\n그 두려움을 나에게 맡겨라.',
      scripture: '여호와께서 모세에게 이르시되 나는 너와 함께 하리라',
      reference: '출애굽기 3:12',
      character: '모세',
    },
    {
      id: 'fear_3',
      intensity: 2,
      message: '베드로처럼 너도 물 위에서 빠질 수 있다.\n하지만 내 손은 항상 너를 잡고 있다.\n믿음으로 한 발을 내디뎌라.',
      scripture: '예수께서 즉시 손을 내밀어 그를 붙잡으시며',
      reference: '마태복음 14:31',
      character: '예수님',
    },
    {
      id: 'fear_4',
      intensity: 2,
      message: '강하고 담대하라.\n두려워하지 말며 놀라지 말라.\n네가 어디로 가든지 나는 함께 있다.',
      scripture: '강하고 담대하라 두려워하지 말며 놀라지 말라',
      reference: '여호수아 1:9',
      character: '여호수아',
    },
    {
      id: 'fear_5',
      intensity: 3,
      message: '에스더처럼 이때를 위해 네가 여기 있다.\n죽음이 두려워도 나아가라.\n내가 너와 함께 간다.',
      scripture: '이때를 위하여 왕후의 자리를 얻은 것이 아닌지',
      reference: '에스더 4:14',
      character: '에스더',
    },
  ],

  // ─── 외로움 ─────────────────────────────────────────────────────────────────
  loneliness: [
    {
      id: 'loneliness_1',
      intensity: 1,
      message: '넌 혼자가 아니다.\n나오미처럼 넌 비어있다고 느낄지 모른다.\n하지만 내가 너를 채우러 온다.',
      scripture: '여호와께서 그의 모든 길을 도우시며',
      reference: '룻기 3:11',
      character: '나오미',
    },
    {
      id: 'loneliness_2',
      intensity: 1,
      message: '내 눈에 넌 홀로가 아니다.\n네 외로움을 나는 안다.\n그것이 사랑을 찾는 영혼임을 알아라.',
      scripture: '주께서 나의 유리함을 계산하셨으니 내 눈물을 담아 두셨다',
      reference: '시편 56:8',
      character: '다윗',
    },
    {
      id: 'loneliness_3',
      intensity: 2,
      message: '나도 광야에서 혼자였다.\n그곳에서 나는 너를 만났다.\n넌 절대 혼자가 아니다.',
      scripture: '나는 너를 택하였고 너를 버리지 아니했노니',
      reference: '이사야 41:9',
      character: '하나님',
    },
    {
      id: 'loneliness_4',
      intensity: 2,
      message: '요셉처럼 배신당하고 혼자인 것 같아도,\n나는 그 구덩이 속에 함께 있었다.\n이 고독이 너를 더 깊게 만들 것이다.',
      scripture: '여호와께서 요셉과 함께 하셨으므로',
      reference: '창세기 39:21',
      character: '요셉',
    },
    {
      id: 'loneliness_5',
      intensity: 3,
      message: '룻처럼 낯선 땅에 홀로 선 것 같아도,\n너의 충성이 보이고 있다.\n나는 너의 기업이 되리라.',
      scripture: '당신이 가는 곳에 나도 가겠고',
      reference: '룻기 1:16',
      character: '룻',
    },
  ],

  // ─── 분노 ───────────────────────────────────────────────────────────────────
  anger: [
    {
      id: 'anger_1',
      intensity: 1,
      message: '분노도 감정이다.\n나는 너의 모든 감정을 받아준다.\n그 분노를 나에게 말해라.',
      scripture: '노하여도 죄를 짓지 말며 해가 지도록 분을 품지 말고',
      reference: '에베소서 4:26',
      character: '바울',
    },
    {
      id: 'anger_2',
      intensity: 1,
      message: '요나처럼 넌 나에게 화낼 수 있다.\n그것도 괜찮다.\n그래도 나는 너를 사랑한다.',
      scripture: '여호와께서 이르시되 너는 화내는 것이 합당하냐',
      reference: '요나 4:9',
      character: '요나',
    },
    {
      id: 'anger_3',
      intensity: 2,
      message: '그 분노 뒤에 무엇이 있는지 보거라.\n대부분은 상처이거나 잃어버린 것일 것이다.\n진실을 내게 말해라.',
      scripture: '마음의 생각이 변하고 마음의 뜻도 변하니',
      reference: '이사야 41:10',
      character: '하나님',
    },
    {
      id: 'anger_4',
      intensity: 2,
      message: '예레미야처럼 나에게 울부짖어라.\n나는 네 분노와 눈물을 다 받겠다.\n그것이 진정한 기도다.',
      scripture: '내가 이 말씀을 선포하기 싫어 입을 다물고 싶었다',
      reference: '예레미야 20:9',
      character: '예레미야',
    },
    {
      id: 'anger_5',
      intensity: 3,
      message: '이 분노가 불의에 대한 것이라면,\n그것은 거룩한 분노다.\n하지만 심판은 내게 맡겨라.',
      scripture: '내 사랑하는 자들아 너희가 친히 원수를 갚지 말고',
      reference: '로마서 12:19',
      character: '바울',
    },
  ],

  // ─── 죄책감 ─────────────────────────────────────────────────────────────────
  guilt: [
    {
      id: 'guilt_1',
      intensity: 1,
      message: '그 죄책감을 내려놓아라.\n나는 이미 모든 것을 용서했다.\n넌 이제 자유롭다.',
      scripture: '그러므로 이제 그리스도 예수 안에 있는 자에게는 결코 정죄함이 없나니',
      reference: '로마서 8:1',
      character: '예수님',
    },
    {
      id: 'guilt_2',
      intensity: 1,
      message: '죄책감은 거짓말쟁이다.\n너는 충분하지 않은 것이 아니다.\n너는 이미 사랑받고 있다.',
      scripture: '누가 능히 우리를 우리 주 그리스도의 사랑에서 끊으리요',
      reference: '로마서 8:35',
      character: '바울',
    },
    {
      id: 'guilt_3',
      intensity: 2,
      message: '과거를 돌이킬 수 없다면\n미래를 다르게 만들어라.\n내가 너와 함께 할 것이다.',
      scripture: '마음이 상한 자를 가까이 하시고 영이 통회하는 자를 구원하신다',
      reference: '시편 34:18',
      character: '다윗',
    },
    {
      id: 'guilt_4',
      intensity: 2,
      message: '베드로처럼 세 번 부인해도,\n나는 세 번 다시 물었다.\n네가 나를 사랑하느냐?',
      scripture: '요한의 아들 시몬아 네가 나를 사랑하느냐',
      reference: '요한복음 21:17',
      character: '예수님',
    },
    {
      id: 'guilt_5',
      intensity: 3,
      message: '탕자처럼 돌아오면 된다.\n내가 멀리서 달려올 것이다.\n이미 용서는 끝났다.',
      scripture: '아직도 거리가 멀 때에 아버지가 그를 보고 달려가',
      reference: '누가복음 15:20',
      character: '예수님',
    },
  ],

  // ─── 수치심 ─────────────────────────────────────────────────────────────────
  shame: [
    {
      id: 'shame_1',
      intensity: 1,
      message: '넌 그것이 아니다.\n그것은 네가 했던 것이지, 네가 누구인지가 아니다.\n넌 여기 있어도 된다.',
      scripture: '이제 주 예수 그리스도로 말미암아 우리는 화목을 누리나니',
      reference: '로마서 5:11',
      character: '예수님',
    },
    {
      id: 'shame_2',
      intensity: 1,
      message: '사람들이 보는 것은 겉이지만\n나는 마음을 본다.\n넌 내가 본 그대로다.',
      scripture: '여호와께서 사람을 외모로 보지 아니하시고 마음을 보신다',
      reference: '사무엘상 16:7',
      character: '하나님',
    },
    {
      id: 'shame_3',
      intensity: 2,
      message: '막달라 마리아처럼\n넌 과거로 정의되지 않는다.\n넌 미래로 정의된다.',
      scripture: '어느 누도 너를 정죄할 자가 없다',
      reference: '요한복음 8:11',
      character: '예수님',
    },
    {
      id: 'shame_4',
      intensity: 2,
      message: '삭개오처럼 작게 느껴져도,\n나는 너의 이름을 부를 것이다.\n지금 내려오면 된다.',
      scripture: '삭개오야 속히 내려오라',
      reference: '누가복음 19:5',
      character: '예수님',
    },
    {
      id: 'shame_5',
      intensity: 3,
      message: '어둠 속에 숨지 않아도 된다.\n내가 너를 빛으로 부른다.\n수치는 더 이상 너를 규정하지 못한다.',
      scripture: '그러므로 이제 정죄함이 없나니',
      reference: '로마서 8:1',
      character: '바울',
    },
  ],

  // ─── 무기력 ─────────────────────────────────────────────────────────────────
  exhaustion: [
    {
      id: 'exhaustion_1',
      intensity: 1,
      message: '넌 충분히 했다.\n이제 쉬어라.\n모든 것은 내가 책임진다.',
      scripture: '수고하고 무거운 짐 진 자들아 다 내게로 오라',
      reference: '마태복음 11:28',
      character: '예수님',
    },
    {
      id: 'exhaustion_2',
      intensity: 1,
      message: '엘리야처럼 넌 지쳤다.\n그것도 괜찮다.\n일어나 먹어라. 길이 멀다.',
      scripture: '일어나 먹으라 네 갈 길이 멀다',
      reference: '열왕기상 19:7',
      character: '하나님',
    },
    {
      id: 'exhaustion_3',
      intensity: 2,
      message: '무기력함은 신호다.\n뭔가 바뀌어야 한다는 신호.\n나와 함께 그 변화를 시작해라.',
      scripture: '만약 누구든지 그리스도 안에 있으면 그는 새로운 피조물이라',
      reference: '고린도후서 5:17',
      character: '바울',
    },
    {
      id: 'exhaustion_4',
      intensity: 2,
      message: '독수리처럼 솟아오를 것이다.\n달음박질해도 지치지 않을 것이다.\n나를 기다리면 새 힘을 얻는다.',
      scripture: '오직 여호와를 앙망하는 자는 새 힘을 얻으리니',
      reference: '이사야 40:31',
      character: '하나님',
    },
    {
      id: 'exhaustion_5',
      intensity: 3,
      message: '욥처럼 모든 것을 잃은 것 같아도,\n나는 여전히 말하고 있다.\n어디 있느냐? 나는 여기 있다.',
      scripture: '내가 주를 귀로만 들었사오나 이제는 눈으로 뵈옵나이다',
      reference: '욥기 42:5',
      character: '욥',
    },
  ],

  // ─── 혼란 ───────────────────────────────────────────────────────────────────
  confusion: [
    {
      id: 'confusion_1',
      intensity: 1,
      message: '길을 잃었구나.\n나도 어둠 속에서 길을 잃은 자들을 만났다.\n나를 따라와라.',
      scripture: '내 발에 등이요 내 길에 빛이로다',
      reference: '시편 119:105',
      character: '하나님',
    },
    {
      id: 'confusion_2',
      intensity: 1,
      message: '도마처럼 의심해도 된다.\n나는 네 질문을 받겠다.\n손을 내밀어 직접 확인해라.',
      scripture: '보지 못하고 믿는 자들은 복되도다',
      reference: '요한복음 20:29',
      character: '예수님',
    },
    {
      id: 'confusion_3',
      intensity: 2,
      message: '지금은 모르지만\n하나님의 계획은 완벽하다.\n한 발 한 발 나를 따라와라.',
      scripture: '내 생각은 너희 생각이 아니며 내 길은 너희 길이 아니니라',
      reference: '이사야 55:8',
      character: '하나님',
    },
    {
      id: 'confusion_4',
      intensity: 2,
      message: '아브라함처럼 어디로 가는지 몰라도,\n한 발을 내디딜 수 있다.\n목적지가 아니라 방향만 알면 된다.',
      scripture: '갈 바를 알지 못하고 나아갔으며',
      reference: '히브리서 11:8',
      character: '아브라함',
    },
    {
      id: 'confusion_5',
      intensity: 3,
      message: '혼란 속에서 지혜를 구하면\n나는 모든 것을 주겠다.\n망설임 없이 구하여라.',
      scripture: '지혜를 구하거든 내게 구하여라 모든 것을 주리니',
      reference: '야고보서 1:5',
      character: '야고보',
    },
  ],

  // ─── 감사 ───────────────────────────────────────────────────────────────────
  gratitude: [
    {
      id: 'gratitude_1',
      intensity: 1,
      message: '감사하는 마음으로 살아가라.\n그것이 가장 강한 기도다.\n계속해서 감사해라.',
      scripture: '범사에 감사하라 이는 그리스도 예수 안에서 너희를 향하신 하나님의 뜻이니라',
      reference: '데살로니가전서 5:18',
      character: '바울',
    },
    {
      id: 'gratitude_2',
      intensity: 1,
      message: '넌 충분하다.\n있는 것에 감사하는 순간\n더 많은 것을 받는다.',
      scripture: '감사함으로 하나님의 문에 들어가며 찬송으로 그 궁정에 들어가라',
      reference: '시편 100:4',
      character: '다윗',
    },
    {
      id: 'gratitude_3',
      intensity: 2,
      message: '감사는 변화의 시작이다.\n지금의 감사가\n미래의 축복이 된다.',
      scripture: '항상 모든 것을 우리 주 예수 그리스도의 이름으로 아버지 하나님께 감사하세요',
      reference: '에베소서 5:20',
      character: '바울',
    },
    {
      id: 'gratitude_4',
      intensity: 2,
      message: '막달라 마리아처럼\n부활을 본 기쁨을 나눠라.\n이 감사는 혼자 간직하기엔 너무 크다.',
      scripture: '가서 내 형제들에게 이르라',
      reference: '요한복음 20:17',
      character: '막달라 마리아',
    },
    {
      id: 'gratitude_5',
      intensity: 3,
      message: '이 감사는 단지 좋은 감정이 아니다.\n그것은 내가 살아있다는 증거다.\n이 삶을 내게 바쳐라.',
      scripture: '그러므로 형제들아 내가 하나님의 모든 자비하심으로 너희를 권하노니 너희 몸을 하나님이 기뻐하시는 거룩한 산 제물로 드리라',
      reference: '로마서 12:1',
      character: '바울',
    },
  ],

  // ─── 평안 ───────────────────────────────────────────────────────────────────
  peace: [
    {
      id: 'peace_1',
      intensity: 1,
      message: '그 평안을 놓지 말아라.\n세상은 빼앗으려 하지만\n내가 준 것은 영원하다.',
      scripture: '내가 너희에게 평안을 남기고 나의 평안을 너희에게 주노니',
      reference: '요한복음 14:27',
      character: '예수님',
    },
    {
      id: 'peace_2',
      intensity: 1,
      message: '마리아처럼 그 평안 속에 머물러라.\n행동도 좋지만\n지금은 내가 주는 평안을 누려라.',
      scripture: '마리아는 주의 발치에 앉아 그 말씀을 들었더라',
      reference: '누가복음 10:39',
      character: '마리아',
    },
    {
      id: 'peace_3',
      intensity: 2,
      message: '이 평안은 영원하다.\n문제는 지나가지만\n내 평안은 변하지 않는다.',
      scripture: '평강을 원하는 자는 혀를 지켜 악한 말을 아니하고',
      reference: '베드로전서 3:10',
      character: '베드로',
    },
    {
      id: 'peace_4',
      intensity: 2,
      message: '아무것도 걱정하지 말고\n오직 기도와 감사로 아뢰어라.\n내 평강이 너희를 지킬 것이다.',
      scripture: '아무것도 염려하지 말고 다만 모든 일에 기도와 간구로',
      reference: '빌립보서 4:6',
      character: '바울',
    },
    {
      id: 'peace_5',
      intensity: 3,
      message: '요한처럼 예수님 곁에 조용히 앉아라.\n아무 말 없이.\n이 평안이 흘러넘칠 것이다.',
      scripture: '예수께서 사랑하시는 그 제자',
      reference: '요한복음 20:2',
      character: '요한',
    },
  ],
};

/**
 * Select a whisper based on emotion and intensity
 * Intensity 1 → pool[0-1], Intensity 2 → pool[2-3], Intensity 3 → pool[4]
 * Falls back to random if not enough whispers
 */
export function selectHardcodedWhisper(
  emotionId: string,
  intensity: 1 | 2 | 3
): Whisper | null {
  const all = HARDCODED_WHISPERS[emotionId];
  if (!all || all.length === 0) return null;

  // intensity 일치하는 것들 먼저 시도
  const matching = all.filter(w => !w.intensity || w.intensity === intensity);
  if (matching.length > 0) {
    return matching[Math.floor(Math.random() * matching.length)];
  }

  // fallback: 강도 범위 확장 (±1)
  const nearby = all.filter(w => !w.intensity || Math.abs((w.intensity ?? 2) - intensity) <= 1);
  if (nearby.length > 0) {
    return nearby[Math.floor(Math.random() * nearby.length)];
  }

  // 최후 fallback: 랜덤
  return all[Math.floor(Math.random() * all.length)];
}
