export interface GameVerse {
  reference: string;
  text: string;
}

export interface GameChoiceResult {
  story: string;
  godsHeart: string;
  verse: GameVerse;
  extraVerse?: GameVerse;
  meditationQuestion: string;
  cardId: string;
}

export interface GameChoice {
  id: string;
  text: string;
  subtext: string;
  isScriptural?: boolean;
  result: GameChoiceResult;
}

export interface GameChoiceScene {
  label: string;
  title: string;
  narrative: string;
  verse: GameVerse;
  choices: GameChoice[];
}

export interface GameEnding {
  narrative: string;
  verse: GameVerse;
  godsHeart: string;
  godsHeartVerse: GameVerse;
}

export interface GameVerseCard {
  id: string;
  reference: string;
  shortText: string;
  book: string;
}

export interface ChapterData {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  coverTheme: string;
  synopsis: string;
  keyTheme: string;
  openingVerse: GameVerse;
  sceneCount: number;
  choiceCount: number;
  intro: { label: string; title: string; narrative: string; verse: GameVerse };
  choiceScene: GameChoiceScene;
  ending: GameEnding;
  verseCards: GameVerseCard[];
  unlocked: boolean;
}

export const chapter1: ChapterData = {
  id: "chapter-1",
  number: 1,
  title: "동굴 속의 선택",
  subtitle: "사무엘상 24장",
  coverTheme: "엔게디 동굴 · 다윗과 사울",
  synopsis:
    "사울에게 쫓기던 다윗에게 예상치 못한 기회가 찾아왔습니다. 당신이라면 어떤 선택을 하겠습니까?",
  keyTheme: "하나님의 기름 부음을 경외함",
  openingVerse: {
    reference: "삼상 24:12",
    text: "여호와께서 나와 왕 사이를 판단하사 나의 손으로는 왕을 해하지 아니하리이다",
  },
  sceneCount: 3,
  choiceCount: 3,
  unlocked: true,

  intro: {
    label: "장면 1",
    title: "도망자 다윗",
    narrative:
      "다윗은 사울 왕에게 쫓기고 있었습니다. 억울하고 지쳤습니다.\n아무 잘못도 없는데 왜 이런 고난을 받아야 하는지 이해할 수 없었습니다.",
    verse: {
      reference: "삼상 23:14",
      text: "다윗이 광야 요새에 있으니라 사울이 매일 찾되 하나님이 그를 그의 손에 넘기지 아니하시니라",
    },
  },

  choiceScene: {
    label: "장면 2",
    title: "동굴 속 기회",
    narrative:
      "사울 왕이 바로 다윗이 숨어있던 동굴 안으로 들어왔습니다.\n부하들이 속삭였습니다.\n\n\"지금이 기회입니다!\"",
    verse: {
      reference: "삼상 24:4",
      text: "여호와께서 당신에게 이르시기를 내가 원수를 네 손에 넘기리니 네 생각에 좋을 대로 그에게 행하라 하시더니 이것이 그 날이니이다",
    },
    choices: [
      {
        id: "c1",
        text: "지금 사울을 해치운다",
        subtext: "나를 이렇게 고생시킨 원수다",
        result: {
          story: "다윗은 칼을 들었습니다.\n그러나 손이 멈췄습니다.",
          godsHeart:
            "하나님은 기다림과 신뢰 속에서 다윗을 빚어가고 계셨습니다.",
          verse: {
            reference: "시편 37:7",
            text: "여호와 앞에 잠잠하고 참고 기다리라",
          },
          meditationQuestion:
            "억울한 상황에서 내 힘으로 해결하려 했던 적이 있나요?",
          cardId: "card-2",
        },
      },
      {
        id: "c2",
        text: "하나님이 세우신 왕이다. 손대지 않겠다",
        subtext: "하나님이 해결하실 것이다",
        result: {
          story:
            "다윗은 부하들을 막았습니다.\n\"여호와의 기름 부음 받은 내 주를 향하여 손을 들어서는 안 된다.\"",
          godsHeart:
            "눈앞의 기회보다 하나님의 방법을 선택한 것, 이것이 하나님의 마음에 합한 자의 모습입니다.",
          verse: {
            reference: "삼상 13:14",
            text: "여호와께서 그의 마음에 맞는 사람을 구하여",
          },
          meditationQuestion:
            "하나님을 신뢰하며 기다리는 것이 지금 내 삶에서 가장 어려운 부분은?",
          cardId: "card-2",
        },
      },
      {
        id: "c3",
        text: "겉옷 자락만 베어 증거로 남긴다",
        subtext: "성경의 실제 행동",
        isScriptural: true,
        result: {
          story:
            "다윗은 겉옷 자락만 베었습니다.\n그런데 그것조차 마음이 찔렸습니다.",
          godsHeart:
            "작은 행동 하나에도 양심이 찔린 다윗.\n하나님은 이런 민감한 마음을 원하십니다.",
          verse: {
            reference: "삼상 24:5",
            text: "사울의 옷자락 벰으로 말미암아 다윗의 마음이 찔려",
          },
          extraVerse: {
            reference: "시편 51:17",
            text: "하나님께서 구하시는 제사는 상한 심령이라",
          },
          meditationQuestion: "마음이 찔릴 때 그것을 무시한 적이 있나요?",
          cardId: "card-1",
        },
      },
    ],
  },

  ending: {
    narrative: "사울이 동굴을 나갔을 때, 다윗이 뒤에서 불렀습니다.",
    verse: {
      reference: "삼상 24:12",
      text: "여호와께서 나와 왕 사이를 판단하사 나의 손으로는 왕을 해하지 아니하리이다",
    },
    godsHeart:
      "우리의 역할은 신뢰하고 순종하는 것, 하나님의 역할은 공의를 이루시는 것입니다.",
    godsHeartVerse: {
      reference: "롬 12:19",
      text: "원수 갚는 것이 내게 있으니 내가 갚으리라",
    },
  },

  verseCards: [
    {
      id: "card-1",
      reference: "삼상 24:12",
      shortText: "나의 손으로는 왕을 해하지 아니하리이다",
      book: "사무엘상",
    },
    {
      id: "card-2",
      reference: "시편 37:7",
      shortText: "여호와 앞에 잠잠하고 참고 기다리라",
      book: "시편",
    },
    {
      id: "card-3",
      reference: "롬 12:19",
      shortText: "원수 갚는 것이 내게 있으니 내가 갚으리라",
      book: "로마서",
    },
  ],
};
