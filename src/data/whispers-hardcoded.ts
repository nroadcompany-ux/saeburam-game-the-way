// THE WAY - Hardcoded Whisper Messages
// 성경 기반 위로 메시지 (하드코딩)

export interface Whisper {
  id: string;
  message: string;
  scripture: string;
  reference: string;
  character: string;
}

export const HARDCODED_WHISPERS: Record<string, Whisper[]> = {
  // 두려움
  fear: [
    {
      id: 'fear_1',
      message:
        '네 두려움을 내게 내려놓아라.\n나는 너를 버리지 않는다.\n내가 함께 있다.',
      scripture: '두려워하지 말라 내가 너와 함께 함이니라',
      reference: '이사야 41:10',
      character: '하나님',
    },
    {
      id: 'fear_2',
      message:
        '베드로처럼 너도 물 위에서 빠질 수 있다.\n하지만 내 손은 항상 너를 잡고 있다.\n믿음으로 한 발을 내디뎌라.',
      scripture: '예수께서 즉시 손을 내밀어 그를 붙잡으시며 이르시되 믿음이 작은 자여 왜 의심하였느냐',
      reference: '마태복음 14:31',
      character: '예수님',
    },
    {
      id: 'fear_3',
      message:
        '두려움은 약함이 아니다.\n내 종들도 두려워했다.\n그 두려움을 나에게 맡겨라.',
      scripture: '여호와께서 모세에게 이르시되 나는 너와 함께 하리라',
      reference: '출애굽기 3:12',
      character: '모세',
    },
  ],

  // 외로움
  loneliness: [
    {
      id: 'loneliness_1',
      message:
        '넌 혼자가 아니다.\n나오미처럼 넌 비어있다고 느낄지 모른다.\n하지만 내가 너를 채우러 온다.',
      scripture: '여호와께서 그의 모든 길을 도우시며 그를 위하여 기도하신다',
      reference: '룻기 3:11',
      character: '나오미',
    },
    {
      id: 'loneliness_2',
      message:
        '내 눈에 넌 홀로가 아니다.\n네 외로움을 나는 안다.\n그것이 약함이 아니라 사랑을 찾는 영혼임을 알아라.',
      scripture: '주께서 나의 유리함을 계산하셨으니 내 눈물을 담아 두셨다',
      reference: '시편 56:8',
      character: '다윗',
    },
    {
      id: 'loneliness_3',
      message:
        '나도 광야에서 혼자였다.\n그곳에서 나는 너를 만났다.\n넌 절대 혼자가 아니다.',
      scripture: '나는 너를 택하였고 너를 버리지 아니했노니',
      reference: '이사야 41:9',
      character: '하나님',
    },
  ],

  // 분노
  anger: [
    {
      id: 'anger_1',
      message:
        '분노도 감정이다.\n나는 너의 모든 감정을 받아준다.\n그 분노를 나에게 말해라.',
      scripture: '노하여도 죄를 짓지 말며 해가 지도록 분을 품지 말고',
      reference: '에베소서 4:26',
      character: '바울',
    },
    {
      id: 'anger_2',
      message:
        '요나처럼 넌 나에게 화낼 수 있다.\n그것도 괜찮다.\n그래도 나는 너를 사랑한다.',
      scripture: '여호와께서 이르시되 너는 이 박넝쿨을 위하여 화내는 것이 합당하냐',
      reference: '요나 4:9',
      character: '요나',
    },
    {
      id: 'anger_3',
      message:
        '그 분노 뒤에 무엇이 있는지 보거라.\n대부분은 환상이거나 거짓된 생각일 것이다.\n진실을 내게 말해라.',
      scripture: '마음의 생각이 변하고 마음의 뜻도 변하니 보라 나는 너를 도우리라',
      reference: '이사야 41:10',
      character: '하나님',
    },
  ],

  // 죄책감
  guilt: [
    {
      id: 'guilt_1',
      message:
        '그 죄책감을 내려놓아라.\n나는 이미 모든 것을 용서했다.\n넌 이제 자유롭다.',
      scripture: '그러므로 이제 그리스도 예수 안에 있는 자에게는 결코 정죄함이 없나니',
      reference: '로마서 8:1',
      character: '예수님',
    },
    {
      id: 'guilt_2',
      message:
        '과거를 돌이킬 수 없다면\n미래를 다르게 만들어라.\n내가 너와 함께 할 것이다.',
      scripture: '마음이 상한 자를 가까이 하시고 영이 통회하는 자를 구원하신다',
      reference: '시편 34:18',
      character: '다윗',
    },
    {
      id: 'guilt_3',
      message:
        '죄책감은 거짓말쟁이다.\n너는 충분하지 않은 것이 아니다.\n너는 이미 사랑받고 있다.',
      scripture: '누가 능히 우리를 우리 주 그리스도의 사랑에서 끊으리요',
      reference: '로마서 8:35',
      character: '바울',
    },
  ],

  // 수치심
  shame: [
    {
      id: 'shame_1',
      message:
        '넌 그것이 아니다.\n그것은 넌 했던 것이지, 넌 누구인지가 아니다.\n넌 여기 있어도 된다.',
      scripture: '이제 주 예수 그리스도로 말미암아 우리는 화목을 누리나니',
      reference: '로마서 5:11',
      character: '예수님',
    },
    {
      id: 'shame_2',
      message:
        '사람들이 보는 것은 겉이지만\n나는 마음을 본다.\n넌 내가 본 그대로다.',
      scripture: '여호와께서 사람을 외모로 보지 아니하시고 마음을 보신다',
      reference: '사무엘상 16:7',
      character: '하나님',
    },
    {
      id: 'shame_3',
      message:
        '막달라 마리아처럼\n넌 과거로 정의되지 않는다.\n넌 미래로 정의된다.',
      scripture: '어느 누도 너를 정죄할 자가 없다 가거 다시는 죄를 범하지 말아라',
      reference: '요한복음 8:11',
      character: '예수님',
    },
  ],

  // 무기력
  exhaustion: [
    {
      id: 'exhaustion_1',
      message:
        '넌 충분히 했다.\n이제 쉬어라.\n모든 것은 내가 책임진다.',
      scripture: '수고하고 무거운 짐 진 자들아 다 내게로 오라 내가 너희를 쉬게 하리라',
      reference: '마태복음 11:28',
      character: '예수님',
    },
    {
      id: 'exhaustion_2',
      message:
        '엘리야처럼 넌 지쳤다.\n그것도 괜찮다.\n나는 너를 새롭게 할 수 있다.',
      scripture: '여호와께서 이르시되 나는 너를 강하게 하리라',
      reference: '이사야 41:10',
      character: '하나님',
    },
    {
      id: 'exhaustion_3',
      message:
        '무기력함은 신호다.\n뭔가 바뀌어야 한다는 신호.\n나와 함께 그 변화를 시작해라.',
      scripture: '만약 누구든지 그리스도 안에 있으면 그는 새로운 피조물이라',
      reference: '고린도후서 5:17',
      character: '바울',
    },
  ],

  // 혼란
  confusion: [
    {
      id: 'confusion_1',
      message:
        '길을 잃었구나.\n나도 어둠 속에서 길을 잃은 자들을 만났다.\n나를 따라와라.',
      scripture: '내 발에 등이요 내 길에 빛이로다',
      reference: '시편 119:105',
      character: '하나님',
    },
    {
      id: 'confusion_2',
      message:
        '지금은 모르지만\n하나님의 계획은 완벽하다.\n한 발 한 발 나를 따라와라.',
      scripture: '내 생각은 너희 생각이 아니며 내 길은 너희 길이 아니니라',
      reference: '이사야 55:8',
      character: '하나님',
    },
    {
      id: 'confusion_3',
      message:
        '혼란은 기회다.\n새로운 것을 배울 시간이다.\n내가 너를 가르칠 것이다.',
      scripture: '지혜를 구하거든 내게 구하여라 모든 것을 주리니',
      reference: '야고보서 1:5',
      character: '야고보',
    },
  ],

  // 감사
  gratitude: [
    {
      id: 'gratitude_1',
      message:
        '감사하는 마음으로 살아가라.\n그것이 가장 강한 기도다.\n계속해서 감사해라.',
      scripture: '범사에 감사하라 이는 그리스도 예수 안에서 너희를 향하신 하나님의 뜻이니라',
      reference: '데살로니가전서 5:18',
      character: '바울',
    },
    {
      id: 'gratitude_2',
      message:
        '넌 충분하다.\n있는 것에 감사하는 순간\n더 많은 것을 받는다.\n계속 감사해라.',
      scripture: '감사함으로 하나님의 문에 들어가며 찬송으로 그 궁정에 들어가라',
      reference: '시편 100:4',
      character: '다윗',
    },
    {
      id: 'gratitude_3',
      message:
        '감사는 변화의 시작이다.\n지금의 감사가\n미래의 축복이 된다.\n감사를 멈추지 말아라.',
      scripture: '항상 모든 것을 우리 주 예수 그리스도의 이름으로 아버지 하나님께 감사하세요',
      reference: '에베소서 5:20',
      character: '바울',
    },
  ],

  // 평안
  peace: [
    {
      id: 'peace_1',
      message:
        '그 평안을 놓지 말아라.\n세상은 빼앗으려 하지만\n내가 준 것은 영원하다.',
      scripture: '내가 너희에게 평안을 남기고 나의 평안을 너희에게 주노니',
      reference: '요한복음 14:27',
      character: '예수님',
    },
    {
      id: 'peace_2',
      message:
        '마리아처럼 그 평안 속에 머물러라.\n행동도 좋지만\n지금은 내가 주는 평안을 누려라.',
      scripture: '마리아는 주의 발치에 앉아 그 말씀을 들었더라',
      reference: '누가복음 10:39',
      character: '마리아',
    },
    {
      id: 'peace_3',
      message:
        '이 평안은 영원하다.\n문제는 지나가지만\n내 평안은 변하지 않는다.\n이 순간을 기억해라.',
      scripture: '평강을 원하는 자는 혀를 지켜 악한 말을 아니하고',
      reference: '베드로전서 3:10',
      character: '베드로',
    },
  ],
};

/**
 * Select a whisper based on emotion and intensity
 */
export function selectHardcodedWhisper(
  emotionId: string,
  intensity: 1 | 2 | 3
): Whisper | null {
  const whispers = HARDCODED_WHISPERS[emotionId];

  if (!whispers || whispers.length === 0) {
    return null;
  }

  // Use intensity to select which whisper (1=first, 2=second, 3=third or random)
  if (intensity <= whispers.length) {
    return whispers[intensity - 1];
  }

  // If intensity exceeds available whispers, pick random
  return whispers[Math.floor(Math.random() * whispers.length)];
}
