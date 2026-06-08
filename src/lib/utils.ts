import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { GameSession } from "@/types/game";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculateScore(correct: number, total: number, timeBonus = 0): number {
  const baseScore = (correct / total) * 1000;
  return Math.round(baseScore + timeBonus);
}

export function getScoreGrade(score: number): { grade: string; message: string; messageKo: string } {
  if (score >= 900) return { grade: "S", message: "Anointed!", messageKo: "기름 부음 받은 자!" };
  if (score >= 800) return { grade: "A", message: "Faithful!", messageKo: "신실한 자!" };
  if (score >= 700) return { grade: "B", message: "Seeker!", messageKo: "구도자!" };
  if (score >= 600) return { grade: "C", message: "Growing!", messageKo: "성장 중!" };
  return { grade: "D", message: "Keep studying!", messageKo: "계속 공부하세요!" };
}

export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function getSessionProgress(session: GameSession): number {
  if (session.questions.length === 0) return 0;
  return Math.round((session.currentIndex / session.questions.length) * 100);
}

export function formatVerseReference(book: string, chapter: number, verse: number): string {
  return `${book} ${chapter}:${verse}`;
}
