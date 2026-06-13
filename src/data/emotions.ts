// THE WAY - Emotion definitions (12 emotions)
// Reference: SOUL_MAP.md, THE_WAY_CONSTITUTION.md

export interface Emotion {
  id: string;
  name: string;
  emoji: string;
  question: string;
  biblicalFigures: string[];
  coreEventIds: string[]; // Event IDs from CORE_BIBLE_100.md
  color: {
    bg: string; // Hex background color
    text: string; // Hex text color
  };
  description?: string; // Short description of the emotion
}

export const EMOTIONS: Emotion[] = [
  {
    id: 'fear',
    name: '두렵다',
    emoji: '😨',
    question: '당신은 이 순간\n무엇을 두려워하는가?',
    biblicalFigures: ['Moses', 'Joshua', 'Gideon', 'Peter'],
    coreEventIds: ['001', '006', '015', '068'],
    color: {
      bg: '#1A2847',
      text: '#F5F1E8',
    },
    description: 'When you feel afraid, God met with fearful leaders in scripture.',
  },
  {
    id: 'angry',
    name: '화가 난다',
    emoji: '😠',
    question: '당신의 분노는\n어디서 비롯되었는가?',
    biblicalFigures: ['Cain', 'Jonah', 'David'],
    coreEventIds: ['003', '032', '045'],
    color: {
      bg: '#2A1F1F',
      text: '#F5F1E8',
    },
    description: 'Anger often reveals what we love. God understands your anger.',
  },
  {
    id: 'lonely',
    name: '외롭다',
    emoji: '😢',
    question: '당신은 누구를\n그리워하는가?',
    biblicalFigures: ['Jacob', 'Ruth', 'Naomi', 'Job'],
    coreEventIds: ['012', '025', '035', '050'],
    color: {
      bg: '#1F2340',
      text: '#F5F1E8',
    },
    description: 'Loneliness is a condition many saints experienced. You are not alone.',
  },
  {
    id: 'exhausted',
    name: '지쳤다',
    emoji: '😩',
    question: '무엇이 당신을\n지치게 했는가?',
    biblicalFigures: ['Elijah', 'Martha', 'Paul'],
    coreEventIds: ['016', '067', '075'],
    color: {
      bg: '#3A3A2A',
      text: '#F5F1E8',
    },
    description: 'Exhaustion can be a call to rest and trust God.',
  },
  {
    id: 'guilty',
    name: '죄책감 있다',
    emoji: '😔',
    question: '당신을 괴롭히는\n죄책감은 무엇인가?',
    biblicalFigures: ['David', 'Peter', 'Judas'],
    coreEventIds: ['046', '069', '090'],
    color: {
      bg: '#3A2A2A',
      text: '#F5F1E8',
    },
    description: 'God offers forgiveness for what we feel guilty about.',
  },
  {
    id: 'ashamed',
    name: '수치스럽다',
    emoji: '😳',
    question: '당신이 숨기고 싶은\n것은 무엇인가?',
    biblicalFigures: ['Adam', 'Eve', 'Bathsheba', 'Mary Magdalene'],
    coreEventIds: ['002', '044', '070'],
    color: {
      bg: '#1F3A3A',
      text: '#F5F1E8',
    },
    description: 'Shame thrives in hiding. God calls us into the light.',
  },
  {
    id: 'unforgiven',
    name: '용서 못함',
    emoji: '😤',
    question: '당신은 누구를\n용서할 수 없는가?',
    biblicalFigures: ['Jacob', 'Joseph', 'Jesus'],
    coreEventIds: ['010', '041', '085'],
    color: {
      bg: '#3A1F2A',
      text: '#F5F1E8',
    },
    description: 'Unforgiveness chains us. God offers freedom through grace.',
  },
  {
    id: 'lost',
    name: '길을 잃었다',
    emoji: '😕',
    question: '당신은 어디로\n가야 하는가?',
    biblicalFigures: ['Jonah', 'Prodigal Son', 'Israel in wilderness'],
    coreEventIds: ['032', '082', '065'],
    color: {
      bg: '#2A3A4A',
      text: '#F5F1E8',
    },
    description: 'Feeling lost? God is still guiding you.',
  },
  {
    id: 'proud',
    name: '교만해졌다',
    emoji: '😎',
    question: '당신이 자랑하는\n것은 무엇인가?',
    biblicalFigures: ['Pharaoh', 'King Nebuchadnezzar', 'Rich Young Ruler'],
    coreEventIds: ['004', '022', '076'],
    color: {
      bg: '#3A3A1F',
      text: '#F5F1E8',
    },
    description: 'Pride often precedes a lesson. God humbles us to love us.',
  },
  {
    id: 'seeking',
    name: '하나님을 찾고 있다',
    emoji: '🙏',
    question: '당신이 하나님께서\n찾는 것은 무엇인가?',
    biblicalFigures: ['Abraham', 'Moses', 'Simeon & Anna'],
    coreEventIds: ['001', '018', '066'],
    color: {
      bg: '#2A4A3A',
      text: '#F5F1E8',
    },
    description: 'Those who seek God find Him. You are on the right path.',
  },
  {
    id: 'uncertain',
    name: '잘 모르겠다',
    emoji: '🤔',
    question: '당신이 확실하지 않은\n것이 무엇인가?',
    biblicalFigures: ['Thomas', 'Nicodemus', 'John the Baptist'],
    coreEventIds: ['071', '077', '060'],
    color: {
      bg: '#2A2A3A',
      text: '#F5F1E8',
    },
    description: 'Uncertainty is an invitation to deepen your faith.',
  },
  {
    id: 'prefer_not',
    name: '선택하지 않기',
    emoji: '🤐',
    question: '나중에 다시\n시작할 수 있습니다.',
    biblicalFigures: ['..'],
    coreEventIds: [],
    color: {
      bg: '#1A1A2A',
      text: '#D4C8B8',
    },
    description: 'You can return whenever you are ready.',
  },
];

// Helper function to get emotion by ID
export function getEmotionById(id: string): Emotion | undefined {
  return EMOTIONS.find((e) => e.id === id);
}

// Get all emotions except "prefer_not"
export function getSelectableEmotions(): Emotion[] {
  return EMOTIONS.filter((e) => e.id !== 'prefer_not');
}
