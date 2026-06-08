export type GameMode = "quiz" | "journey" | "verse-match" | "story";

export type Difficulty = "beginner" | "intermediate" | "advanced";

export type Testament = "old" | "new";

export interface BibleVerse {
  id: string;
  book: string;
  bookKo: string;
  chapter: number;
  verse: number;
  text: string;
  textKo: string;
  testament: Testament;
}

export interface QuizQuestion {
  id: string;
  question: string;
  questionKo: string;
  options: string[];
  optionsKo: string[];
  correctIndex: number;
  explanation: string;
  explanationKo: string;
  verse: BibleVerse;
  difficulty: Difficulty;
  category: string;
}

export interface PlayerScore {
  playerId: string;
  playerName: string;
  score: number;
  correctAnswers: number;
  totalQuestions: number;
  difficulty: Difficulty;
  completedAt: Date;
}

export interface GameSession {
  id: string;
  mode: GameMode;
  difficulty: Difficulty;
  questions: QuizQuestion[];
  currentIndex: number;
  score: number;
  answers: (number | null)[];
  startedAt: Date;
  completedAt?: Date;
  isCompleted: boolean;
}

export interface GameState {
  session: GameSession | null;
  playerName: string;
  highScores: PlayerScore[];
}
