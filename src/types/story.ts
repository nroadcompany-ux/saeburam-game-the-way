export interface VerseRef {
  reference: string;
  text: string;
  textKo: string;
}

export type EndingType = "best" | "good" | "neutral" | "poor" | "worst";
export type AlignmentImpact = "positive" | "negative" | "neutral";

export interface ChoiceConsequence {
  outcomeText: string;
  outcomeTextKo: string;
  godsHeartComment: string;
  godsHeartCommentKo: string;
  verseSupport: VerseRef;
  alignmentImpact: AlignmentImpact;
  faithScore: number;
  nextSceneId: string | null;
  endingType?: EndingType;
}

export interface StoryChoice {
  id: string;
  choiceText: string;
  choiceTextKo: string;
  consequence: ChoiceConsequence;
  isGodsWay: boolean;
}

export interface StoryScene {
  id: string;
  title: string;
  titleKo: string;
  narrativeText: string;
  narrativeTextKo: string;
  contextVerse: VerseRef;
  choices: StoryChoice[];
}

export interface ChapterReward {
  title: string;
  titleKo: string;
  verse: VerseRef;
}

export interface StoryChapter {
  id: string;
  chapterNumber: number;
  title: string;
  titleKo: string;
  subtitle: string;
  coverTheme: string;
  coverThemeKo: string;
  synopsis: string;
  synopsisKo: string;
  keyTheme: string;
  keyThemeKo: string;
  openingVerse: VerseRef;
  scenes: StoryScene[];
  bestEndingReward: ChapterReward;
  sceneCount: number;
  choiceCount: number;
  unlocked: boolean;
}
