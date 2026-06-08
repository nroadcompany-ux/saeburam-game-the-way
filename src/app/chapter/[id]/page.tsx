"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { chapter1, type ChapterData, type GameChoice } from "@/data/chapters/chapter1";

type Phase = "intro" | "choice" | "result" | "ending" | "cards";

const PROGRESS: Record<Phase, number> = {
  intro: 12,
  choice: 38,
  result: 60,
  ending: 80,
  cards: 100,
};

// ── Typewriter hook ─────────────────────────────────────────
function useTypewriter(text: string, speed = 18) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  const skip = useRef(false);

  useEffect(() => {
    setDisplayed("");
    setDone(false);
    skip.current = false;
    let i = 0;
    const tick = () => {
      if (skip.current) {
        setDisplayed(text);
        setDone(true);
        return;
      }
      i += 1;
      setDisplayed(text.slice(0, i));
      if (i < text.length) {
        setTimeout(tick, speed);
      } else {
        setDone(true);
      }
    };
    const t = setTimeout(tick, speed);
    return () => clearTimeout(t);
  }, [text, speed]);

  const skipAll = useCallback(() => {
    skip.current = true;
    setDisplayed(text);
    setDone(true);
  }, [text]);

  return { displayed, done, skipAll };
}

// ── Cursor ──────────────────────────────────────────────────
function Cursor() {
  return (
    <span
      className="inline-block w-[2px] h-[1em] align-text-bottom ml-[1px]"
      style={{
        background: "var(--way-gold)",
        animation: "twBlink 1s step-end infinite",
      }}
    />
  );
}

// ── TypeLines: renders multi-line typewriter text ────────────
function TypeLines({ text, done }: { text: string; done: boolean }) {
  const lines = text.split("\n");
  return (
    <>
      {lines.map((line, i) =>
        line ? (
          <p key={i} className="leading-relaxed">
            {line}
            {i === lines.length - 1 && !done && <Cursor />}
          </p>
        ) : (
          <div key={i} className="h-3" />
        )
      )}
    </>
  );
}

// ── Plain Lines (no typewriter) ──────────────────────────────
function Lines({ text }: { text: string }) {
  return (
    <>
      {text.split("\n").map((line, i) =>
        line ? (
          <p key={i} className="leading-relaxed">{line}</p>
        ) : (
          <div key={i} className="h-3" />
        )
      )}
    </>
  );
}

// ── VerseBox ─────────────────────────────────────────────────
function VerseBox({ reference, text, dark }: { reference: string; text: string; dark?: boolean }) {
  if (dark) {
    return (
      <div
        className="rounded-xl p-4"
        style={{
          background: "rgba(15,28,46,0.6)",
          border: "1px solid rgba(201,168,76,0.25)",
          animation: "fadeUp 0.5s ease-out both",
        }}
      >
        <p className="text-xs font-bold mb-2" style={{ color: "var(--way-gold)" }}>{reference}</p>
        <p className="text-sm italic leading-relaxed" style={{ color: "var(--way-cream)" }}>&ldquo;{text}&rdquo;</p>
      </div>
    );
  }
  return (
    <div
      className="rounded-xl p-4"
      style={{
        background: "var(--toss-blue-light)",
        border: "1px solid var(--border)",
        animation: "fadeUp 0.4s ease-out both",
      }}
    >
      <p className="text-xs font-bold mb-1" style={{ color: "var(--toss-blue)" }}>{reference}</p>
      <p className="text-sm leading-relaxed" style={{ color: "var(--text-primary)" }}>&ldquo;{text}&rdquo;</p>
    </div>
  );
}

// ── GodsHeart ─────────────────────────────────────────────────
function GodsHeart({
  comment,
  verse,
  extraVerse,
}: {
  comment: string;
  verse: { reference: string; text: string };
  extraVerse?: { reference: string; text: string };
}) {
  return (
    <div
      className="gods-heart-card"
      style={{ animation: "goldGlow 2.5s ease-in-out infinite, cardReveal 0.5s ease-out both" }}
    >
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

// ── MeditationBox ─────────────────────────────────────────────
function MeditationBox({ question }: { question: string }) {
  return (
    <div
      className="rounded-xl p-4"
      style={{
        background: "#F5F3FF",
        borderLeft: "4px solid var(--purple)",
        animation: "fadeUp 0.5s 0.2s ease-out both",
      }}
    >
      <div className="flex items-center gap-2 mb-2">
        <span>🤔</span>
        <p className="font-bold text-sm" style={{ color: "#6D28D9" }}>묵상 질문</p>
      </div>
      <p className="text-sm leading-relaxed" style={{ color: "var(--text-primary)" }}>{question}</p>
    </div>
  );
}

// ── Phase screens ─────────────────────────────────────────────

function IntroScreen({ data, onNext }: { data: ChapterData; onNext: () => void }) {
  const { displayed, done, skipAll } = useTypewriter(data.intro.narrative, 20);

  return (
    <div className="space-y-6" onClick={() => !done && skipAll()}>
      <div style={{ animation: "fadeUp 0.4s ease-out both" }}>
        <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "var(--way-gold)" }}>
          {data.intro.label}
        </p>
        <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--way-cream)" }}>
          {data.intro.title}
        </h2>
      </div>

      <div className="text-base leading-relaxed space-y-1 min-h-[120px]" style={{ color: "rgba(253,246,227,0.85)" }}>
        <TypeLines text={displayed} done={done} />
      </div>

      {!done && (
        <p className="text-xs text-center" style={{ color: "rgba(253,246,227,0.3)", animation: "twBlink 2s ease-in-out infinite" }}>
          화면을 탭하면 건너뜁니다
        </p>
      )}

      {done && (
        <>
          <VerseBox reference={data.intro.verse.reference} text={data.intro.verse.text} dark />
          <button
            onClick={(e) => { e.stopPropagation(); onNext(); }}
            className="btn-blue"
            style={{ background: "linear-gradient(135deg, var(--way-gold), var(--way-gold-light), var(--way-gold))", color: "var(--way-navy)" }}
          >
            다음 장면으로 →
          </button>
        </>
      )}
    </div>
  );
}

function ChoiceScreen({ data, onChoose }: { data: ChapterData; onChoose: (idx: number) => void }) {
  const [showChoices, setShowChoices] = useState(false);
  const { displayed, done, skipAll } = useTypewriter(data.choiceScene.narrative, 22);

  useEffect(() => {
    if (done) {
      const t = setTimeout(() => setShowChoices(true), 300);
      return () => clearTimeout(t);
    }
  }, [done]);

  return (
    <div className="space-y-4">
      <div style={{ animation: "fadeUp 0.35s ease-out both" }}>
        <p className="text-xs font-bold uppercase tracking-wide mb-1" style={{ color: "var(--text-tertiary)" }}>
          {data.choiceScene.label}
        </p>
        <h2 className="text-xl font-bold mb-3" style={{ color: "var(--text-primary)" }}>
          {data.choiceScene.title}
        </h2>
      </div>

      <div
        className="rounded-xl p-4 min-h-[80px] text-sm leading-relaxed space-y-1 cursor-pointer"
        style={{ background: "var(--bg-card)", border: "1px solid var(--border)", color: "var(--text-secondary)" }}
        onClick={() => !done && skipAll()}
      >
        <TypeLines text={displayed} done={done} />
        {!done && (
          <p className="text-[10px] mt-2" style={{ color: "var(--text-tertiary)", animation: "twBlink 2s ease-in-out infinite" }}>
            탭하면 건너뜁니다
          </p>
        )}
      </div>

      {done && <VerseBox reference={data.choiceScene.verse.reference} text={data.choiceScene.verse.text} />}

      {showChoices && (
        <>
          <p className="font-bold text-base pt-1" style={{ color: "var(--text-primary)", animation: "fadeUp 0.3s ease-out both" }}>
            당신의 선택은?
          </p>
          <div className="space-y-3">
            {data.choiceScene.choices.map((choice, idx) => (
              <button
                key={choice.id}
                onClick={() => onChoose(idx)}
                className="choice-btn"
                style={{
                  borderColor: choice.isScriptural ? "var(--way-gold)" : "var(--border)",
                  background: choice.isScriptural ? "rgba(201,168,76,0.05)" : "var(--bg-card)",
                  animation: `choiceIn 0.35s ease-out ${idx * 120}ms both`,
                }}
              >
                {choice.isScriptural && (
                  <p className="text-[10px] font-bold mb-1" style={{ color: "var(--way-gold)" }}>
                    ⭐ 성경의 실제 행동
                  </p>
                )}
                <p className="font-bold text-sm" style={{ color: "var(--text-primary)" }}>{choice.text}</p>
                <p className="text-xs mt-0.5" style={{ color: "var(--text-tertiary)" }}>{choice.subtext}</p>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function ResultScreen({ choice, onNext }: { choice: GameChoice; onNext: () => void }) {
  return (
    <div className="space-y-4">
      <h2
        className="text-xl font-bold"
        style={{ color: "var(--text-primary)", animation: "fadeUp 0.35s ease-out both" }}
      >
        선택 결과
      </h2>

      <div
        className="rounded-xl p-4"
        style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border)",
          boxShadow: "var(--shadow-sm)",
          animation: "cardReveal 0.45s ease-out both",
        }}
      >
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

      <button
        onClick={onNext}
        className="btn-blue"
        style={{ animation: "fadeUp 0.4s 0.3s ease-out both" }}
      >
        다음 →
      </button>
    </div>
  );
}

function EndingScreen({ data, onNext }: { data: ChapterData; onNext: () => void }) {
  const { displayed, done, skipAll } = useTypewriter(data.ending.narrative, 22);

  return (
    <div className="space-y-4" onClick={() => !done && skipAll()}>
      <div className="flex items-center gap-3 mb-2" style={{ animation: "fadeUp 0.35s ease-out both" }}>
        <div className="h-px flex-1" style={{ background: "rgba(201,168,76,0.3)" }} />
        <p className="text-xs font-bold tracking-widest" style={{ color: "var(--way-gold)" }}>공통 엔딩</p>
        <div className="h-px flex-1" style={{ background: "rgba(201,168,76,0.3)" }} />
      </div>

      <div className="text-base leading-relaxed min-h-[48px]" style={{ color: "rgba(253,246,227,0.85)" }}>
        <TypeLines text={displayed} done={done} />
        {!done && (
          <p className="text-xs mt-3" style={{ color: "rgba(253,246,227,0.3)", animation: "twBlink 2s ease-in-out infinite" }}>
            화면을 탭하면 건너뜁니다
          </p>
        )}
      </div>

      {done && (
        <>
          <VerseBox reference={data.ending.verse.reference} text={data.ending.verse.text} dark />
          <GodsHeart comment={data.ending.godsHeart} verse={data.ending.godsHeartVerse} />
          <button
            onClick={(e) => { e.stopPropagation(); onNext(); }}
            className="w-full py-4 rounded-xl font-bold text-base transition-all duration-150 active:scale-[0.98]"
            style={{
              background: "linear-gradient(135deg, var(--way-gold), var(--way-gold-light), var(--way-gold))",
              color: "var(--way-navy)",
              minHeight: "52px",
              animation: "fadeUp 0.4s 0.2s ease-out both",
            }}
          >
            🎴 말씀 카드 수집 →
          </button>
        </>
      )}
    </div>
  );
}

function CardsScreen({ data }: { data: ChapterData }) {
  return (
    <div className="space-y-4">
      <div className="text-center py-4" style={{ animation: "fadeUp 0.4s ease-out both" }}>
        <p className="text-4xl mb-2">🎴</p>
        <h2 className="text-xl font-bold mb-1" style={{ color: "var(--text-primary)" }}>말씀 카드 수집!</h2>
        <p className="text-sm" style={{ color: "var(--text-secondary)" }}>챕터 1을 완료했습니다</p>
      </div>

      <div className="space-y-3">
        {data.verseCards.map((card, i) => (
          <div
            key={card.id}
            className="rounded-xl p-5"
            style={{
              background: "var(--way-navy)",
              color: "var(--way-cream)",
              animation: `cardReveal 0.45s ease-out ${i * 150}ms both`,
            }}
          >
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-bold" style={{ color: "rgba(201,168,76,0.6)" }}>{card.book}</p>
              <p className="text-xs font-bold" style={{ color: "var(--way-gold)" }}>{card.reference}</p>
            </div>
            <p className="text-base font-bold leading-relaxed">&ldquo;{card.shortText}&rdquo;</p>
          </div>
        ))}
      </div>

      <div className="space-y-3 pt-2" style={{ animation: "fadeUp 0.4s 0.5s ease-out both" }}>
        <Link href="/minigame/1" className="btn-blue">암송 미니게임 →</Link>
        <Link href="/" className="btn-outline">홈으로 돌아가기</Link>
      </div>
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────

export default function ChapterPage() {
  const [phase, setPhase] = useState<Phase>("intro");
  const [choiceIdx, setChoiceIdx] = useState<number | null>(null);

  const data = chapter1;
  const selectedChoice = choiceIdx !== null ? data.choiceScene.choices[choiceIdx] ?? null : null;
  const isNavy = phase === "intro" || phase === "ending";
  const progress = PROGRESS[phase];

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
        transition: "background 0.5s ease",
      }}
    >
      {/* NAV */}
      <nav
        className="sticky top-0 z-10 flex flex-col border-b"
        style={{
          borderColor: isNavy ? "rgba(201,168,76,0.2)" : "var(--border)",
          background: isNavy ? "rgba(15,28,46,0.92)" : "rgba(249,250,251,0.92)",
          backdropFilter: "blur(8px)",
        }}
      >
        <div className="flex items-center justify-between px-4 py-3">
          <Link
            href="/"
            className="text-sm font-semibold py-1 px-2 rounded-lg"
            style={{
              color: isNavy ? "var(--way-cream)" : "var(--text-secondary)",
              minHeight: "36px",
              display: "flex",
              alignItems: "center",
            }}
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
              background: isNavy ? "rgba(201,168,76,0.12)" : "var(--toss-blue-light)",
            }}
          >
            {stepLabel[phase]}
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-[3px] w-full" style={{ background: isNavy ? "rgba(201,168,76,0.12)" : "var(--border-light)" }}>
          <div
            className="h-full transition-all duration-700 ease-out"
            style={{
              width: `${progress}%`,
              background: isNavy
                ? "linear-gradient(to right, var(--way-gold), var(--way-gold-light))"
                : "var(--toss-blue)",
            }}
          />
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
