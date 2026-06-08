"use client";

import { useState } from "react";
import Link from "next/link";
import { chapter1, type ChapterData, type GameChoice } from "@/data/chapters/chapter1";

type Phase = "intro" | "choice" | "result" | "ending" | "cards";

// ── Helpers ────────────────────────────────────────────────

function Lines({ text }: { text: string }) {
  return (
    <>
      {text.split("\n").map((line, i) =>
        line ? (
          <p key={i} className="leading-relaxed">
            {line}
          </p>
        ) : (
          <div key={i} className="h-3" />
        )
      )}
    </>
  );
}

function VerseBox({ reference, text, dark }: { reference: string; text: string; dark?: boolean }) {
  if (dark) {
    return (
      <div className="rounded-xl p-4" style={{ background: "var(--way-navy)", color: "var(--way-cream)" }}>
        <p className="text-xs font-bold mb-2" style={{ color: "var(--way-gold)" }}>{reference}</p>
        <p className="text-sm italic leading-relaxed">&ldquo;{text}&rdquo;</p>
      </div>
    );
  }
  return (
    <div className="rounded-xl p-4" style={{ background: "var(--toss-blue-light)", border: "1px solid var(--border)" }}>
      <p className="text-xs font-bold mb-1" style={{ color: "var(--toss-blue)" }}>{reference}</p>
      <p className="text-sm leading-relaxed" style={{ color: "var(--text-primary)" }}>&ldquo;{text}&rdquo;</p>
    </div>
  );
}

function GodsHeart({ comment, verse, extraVerse }: { comment: string; verse: { reference: string; text: string }; extraVerse?: { reference: string; text: string } }) {
  return (
    <div className="gods-heart-card">
      <div className="flex items-center gap-2 mb-3">
        <span>💛</span>
        <p className="font-bold text-sm" style={{ color: "var(--way-navy)" }}>하나님의 마음</p>
      </div>
      <div className="text-sm leading-relaxed mb-3" style={{ color: "var(--text-primary)" }}>
        <Lines text={comment} />
      </div>
      <div className="pt-3 border-t" style={{ borderColor: "rgba(201,168,76,0.3)" }}>
        <p className="text-xs font-bold mb-1" style={{ color: "var(--way-gold)" }}>{verse.reference}</p>
        <p className="text-xs italic" style={{ color: "var(--text-secondary)" }}>&ldquo;{verse.text}&rdquo;</p>
      </div>
      {extraVerse && (
        <div className="mt-2">
          <p className="text-xs font-bold mb-1" style={{ color: "var(--way-gold)" }}>{extraVerse.reference}</p>
          <p className="text-xs italic" style={{ color: "var(--text-secondary)" }}>&ldquo;{extraVerse.text}&rdquo;</p>
        </div>
      )}
    </div>
  );
}

function MeditationBox({ question }: { question: string }) {
  return (
    <div className="rounded-xl p-4" style={{ background: "#F5F3FF", borderLeft: "4px solid var(--purple)" }}>
      <div className="flex items-center gap-2 mb-2">
        <span>🤔</span>
        <p className="font-bold text-sm" style={{ color: "#6D28D9" }}>묵상 질문</p>
      </div>
      <p className="text-sm leading-relaxed" style={{ color: "var(--text-primary)" }}>{question}</p>
    </div>
  );
}

// ── Phase screens ───────────────────────────────────────────

function IntroScreen({ data, onNext }: { data: ChapterData; onNext: () => void }) {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "var(--way-gold)" }}>
          {data.intro.label}
        </p>
        <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--way-cream)" }}>
          {data.intro.title}
        </h2>
        <div className="text-base leading-relaxed space-y-1 mb-6" style={{ color: "rgba(253,246,227,0.8)" }}>
          <Lines text={data.intro.narrative} />
        </div>
      </div>
      <VerseBox reference={data.intro.verse.reference} text={data.intro.verse.text} dark />
      <button onClick={onNext} className="btn-blue">
        다음 →
      </button>
    </div>
  );
}

function ChoiceScreen({ data, onChoose }: { data: ChapterData; onChoose: (idx: number) => void }) {
  return (
    <div className="space-y-4">
      <div>
        <p className="text-xs font-bold uppercase tracking-wide mb-1" style={{ color: "var(--text-tertiary)" }}>
          {data.choiceScene.label}
        </p>
        <h2 className="text-xl font-bold mb-3" style={{ color: "var(--text-primary)" }}>
          {data.choiceScene.title}
        </h2>
        <div className="text-sm leading-relaxed space-y-1 mb-4" style={{ color: "var(--text-secondary)" }}>
          <Lines text={data.choiceScene.narrative} />
        </div>
        <VerseBox reference={data.choiceScene.verse.reference} text={data.choiceScene.verse.text} />
      </div>
      <p className="font-bold text-base pt-1" style={{ color: "var(--text-primary)" }}>
        당신의 선택은?
      </p>
      <div className="space-y-3">
        {data.choiceScene.choices.map((choice, idx) => (
          <button
            key={choice.id}
            onClick={() => onChoose(idx)}
            className="choice-btn"
            style={choice.isScriptural ? { borderColor: "var(--way-gold)", background: "rgba(201,168,76,0.04)" } : {}}
          >
            {choice.isScriptural && (
              <p className="text-[10px] font-bold mb-1" style={{ color: "var(--way-gold)" }}>
                ⭐ 성경의 실제 행동
              </p>
            )}
            <p className="font-bold text-sm" style={{ color: "var(--text-primary)" }}>
              {choice.text}
            </p>
            <p className="text-xs mt-0.5" style={{ color: "var(--text-tertiary)" }}>
              {choice.subtext}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}

function ResultScreen({ choice, onNext }: { choice: GameChoice; onNext: () => void }) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>선택 결과</h2>
      <div className="rounded-xl p-4" style={{ background: "var(--bg-card)", border: "1px solid var(--border)", boxShadow: "var(--shadow-sm)" }}>
        <div className="text-sm leading-relaxed space-y-1" style={{ color: "var(--text-primary)" }}>
          <Lines text={choice.result.story} />
        </div>
      </div>
      <GodsHeart
        comment={choice.result.godsHeart}
        verse={choice.result.verse}
        extraVerse={choice.result.extraVerse}
      />
      <MeditationBox question={choice.result.meditationQuestion} />
      <button onClick={onNext} className="btn-blue">
        다음 →
      </button>
    </div>
  );
}

function EndingScreen({ data, onNext }: { data: ChapterData; onNext: () => void }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-2">
        <div className="h-px flex-1" style={{ background: "var(--border)" }} />
        <p className="text-xs font-bold tracking-widest" style={{ color: "var(--way-gold)" }}>공통 엔딩</p>
        <div className="h-px flex-1" style={{ background: "var(--border)" }} />
      </div>
      <p className="text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
        {data.ending.narrative}
      </p>
      <VerseBox reference={data.ending.verse.reference} text={data.ending.verse.text} />
      <GodsHeart comment={data.ending.godsHeart} verse={data.ending.godsHeartVerse} />
      <button
        onClick={onNext}
        className="w-full py-4 rounded-xl font-bold text-base transition-all duration-150 active:scale-[0.98]"
        style={{ background: "var(--way-gold)", color: "var(--way-navy)", minHeight: "52px" }}
      >
        🎴 말씀 카드 수집 →
      </button>
    </div>
  );
}

function CardsScreen({ data }: { data: ChapterData }) {
  return (
    <div className="space-y-4">
      <div className="text-center py-4">
        <p className="text-4xl mb-2">🎴</p>
        <h2 className="text-xl font-bold mb-1" style={{ color: "var(--text-primary)" }}>말씀 카드 수집!</h2>
        <p className="text-sm" style={{ color: "var(--text-secondary)" }}>챕터 1을 완료했습니다</p>
      </div>
      <div className="space-y-3">
        {data.verseCards.map((card) => (
          <div key={card.id} className="rounded-xl p-5" style={{ background: "var(--way-navy)", color: "var(--way-cream)" }}>
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-bold" style={{ color: "rgba(201,168,76,0.6)" }}>{card.book}</p>
              <p className="text-xs font-bold" style={{ color: "var(--way-gold)" }}>{card.reference}</p>
            </div>
            <p className="text-base font-bold leading-relaxed">&ldquo;{card.shortText}&rdquo;</p>
          </div>
        ))}
      </div>
      <div className="space-y-3 pt-2">
        <Link href="/minigame/1" className="btn-blue">
          암송 미니게임 →
        </Link>
        <Link href="/" className="btn-outline">
          홈으로 돌아가기
        </Link>
      </div>
    </div>
  );
}

// ── Main page ───────────────────────────────────────────────

export default function ChapterPage() {
  const [phase, setPhase] = useState<Phase>("intro");
  const [choiceIdx, setChoiceIdx] = useState<number | null>(null);

  const data = chapter1;
  const selectedChoice = choiceIdx !== null ? data.choiceScene.choices[choiceIdx] ?? null : null;
  const isNavy = phase === "intro";

  const stepLabel: Record<Phase, string> = {
    intro: "1 / 3",
    choice: "2 / 3",
    result: "2 / 3",
    ending: "3 / 3",
    cards: "✓",
  };

  return (
    <div
      className="min-h-screen"
      style={{
        background: isNavy
          ? "linear-gradient(135deg, var(--way-navy-card) 0%, var(--way-navy) 100%)"
          : "var(--bg)",
        transition: "background 0.4s ease",
      }}
    >
      {/* NAV */}
      <nav
        className="sticky top-0 z-10 flex items-center justify-between px-4 py-3 border-b"
        style={{
          borderColor: isNavy ? "rgba(201,168,76,0.2)" : "var(--border)",
          background: isNavy ? "rgba(15,28,46,0.9)" : "rgba(249,250,251,0.92)",
          backdropFilter: "blur(8px)",
        }}
      >
        <Link
          href="/"
          className="text-sm font-semibold py-1 px-2 rounded-lg"
          style={{ color: isNavy ? "var(--way-cream)" : "var(--text-secondary)", minHeight: "36px", display: "flex", alignItems: "center" }}
        >
          ← 홈
        </Link>
        <div className="text-center">
          <p className="text-xs font-bold" style={{ color: isNavy ? "var(--way-gold)" : "var(--text-primary)" }}>
            챕터 {data.number} · {data.subtitle}
          </p>
        </div>
        <div
          className="text-xs font-mono font-bold px-2 py-1 rounded"
          style={{
            color: isNavy ? "var(--way-gold)" : "var(--toss-blue)",
            background: isNavy ? "rgba(201,168,76,0.1)" : "var(--toss-blue-light)",
          }}
        >
          {stepLabel[phase]}
        </div>
      </nav>

      {/* CONTENT */}
      <div className="max-w-[480px] mx-auto px-4 py-6 pb-16">
        {phase === "intro" && (
          <IntroScreen data={data} onNext={() => setPhase("choice")} />
        )}
        {phase === "choice" && (
          <ChoiceScreen
            data={data}
            onChoose={(idx) => {
              setChoiceIdx(idx);
              setPhase("result");
            }}
          />
        )}
        {phase === "result" && selectedChoice !== null && (
          <ResultScreen choice={selectedChoice} onNext={() => setPhase("ending")} />
        )}
        {phase === "ending" && (
          <EndingScreen data={data} onNext={() => setPhase("cards")} />
        )}
        {phase === "cards" && (
          <CardsScreen data={data} />
        )}
      </div>
    </div>
  );
}
