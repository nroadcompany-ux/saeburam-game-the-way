"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";

type Phase =
  | "prologue"
  | "darkness"
  | "cliff"
  | "rope"
  | "choice"
  | "ascent"
  | "light"
  | "desert"
  | "begin";

type ChoicePath = "hold" | "release" | null;

// ── Line-reveal hook ─────────────────────────────────────────
function useLineReveal(lines: string[], delay = 750) {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);
  const skipRef = useRef(false);

  useEffect(() => {
    setCount(0);
    setDone(false);
    skipRef.current = false;
    if (!lines.length) { setDone(true); return; }
    let i = 0;
    const tick = () => {
      if (skipRef.current) { setCount(lines.length); setDone(true); return; }
      i++;
      setCount(i);
      if (i < lines.length) setTimeout(tick, delay);
      else setTimeout(() => setDone(true), 600);
    };
    const t = setTimeout(tick, 500);
    return () => clearTimeout(t);
  }, [lines, delay]);

  const skip = useCallback(() => {
    skipRef.current = true;
    setCount(lines.length);
    setDone(true);
  }, [lines.length]);

  return { count, done, skip };
}

// ── Act content ──────────────────────────────────────────────

const DARKNESS_LINES = [
  "아무것도 보이지 않는다.",
  "위도, 아래도, 옆도.",
  "오직 어둠뿐.",
  "",
  "그 어둠 속에서",
  "하나의 질문이 들려온다.",
  "",
  "\"너는 무엇을 원하느냐?\"",
];

const CLIFF_LINES = [
  "발 아래가 느껴졌다.",
  "아슬아슬한 절벽 끝.",
  "",
  "아래를 내려다보았다.",
  "끝이 없는 심연이었다.",
  "",
  "뒤돌아볼 수도 없었다.",
  "앞으로 나아갈 수도 없었다.",
  "",
  "그저 거기 서 있을 뿐이었다.",
  "",
  "이것이 내 인생이었다.",
];

const ROPE_LINES = [
  "그때였다.",
  "",
  "위에서 무언가가 내려왔다.",
  "",
  "줄이었다.",
  "",
  "누가 던진 것인지 알 수 없었다.",
  "내가 요청한 것도 아니었다.",
  "내가 받을 자격이 있어서도 아니었다.",
  "",
  "그냥, 줄이 거기 있었다.",
];

const CHOICE_LINES = [
  "줄이 손에 닿았다.",
  "",
  "손이 떨렸다.",
  "",
  "이 순간,",
  "당신은 어떻게 하겠는가?",
];

const ASCENT_HOLD = [
  "손이 타는 것 같았다.",
  "팔이 떨렸다.",
  "다리가 절벽을 긁었다.",
  "",
  "포기하고 싶었다.",
  "",
  "그런데 줄이 위로 잡아당기고 있었다.",
  "",
  "내 힘이 아니었다.",
];

const ASCENT_RELEASE = [
  "손을 놓는 순간,",
  "",
  "무언가가 나를 잡았다.",
  "",
  "내가 아니었다.",
  "무언가가 나를 붙들고 있었다.",
  "",
  "그리고 위로 올라가고 있었다.",
];

const LIGHT_LINES = [
  "그리고 빛이 있었다.",
  "",
  "눈이 아팠다.",
  "오랫동안 어둠 속에 있었기 때문에.",
  "",
  "바닥에 쓰러졌다.",
  "상처가 있었다.",
  "아팠다.",
  "",
  "하지만 살아있었다.",
];

const DESERT_LINES = [
  "3일 후.",
  "",
  "광야였다.",
  "",
  "뜨거운 태양.",
  "끝없는 모래.",
  "",
  "그런데 앞에",
  "누군가가 걷고 있었다.",
  "",
  "뒤도 보지 않고",
  "걸어가는 그 사람.",
  "",
  "\"따라오라.\"",
  "",
  "한 마디였다.",
  "",
  "그것으로 충분했다.",
];

// ── Background per phase ─────────────────────────────────────
function phaseBg(p: Phase): string {
  const map: Record<Phase, string> = {
    prologue: "#000000",
    darkness: "linear-gradient(180deg,#000000 0%,#05080F 100%)",
    cliff:    "linear-gradient(180deg,#05080F 0%,#080E1E 100%)",
    rope:     "linear-gradient(180deg,#080E1E 0%,#0F1828 100%)",
    choice:   "linear-gradient(180deg,#0F1828 0%,#0C1A2A 100%)",
    ascent:   "linear-gradient(180deg,#0C1A2A 0%,#0F2040 100%)",
    light:    "linear-gradient(180deg,#0F2040 0%,#1A2F4A 100%)",
    desert:   "linear-gradient(180deg,#1A2F4A 0%,#1E3A52 100%)",
    begin:    "linear-gradient(135deg,#1A2F4A 0%,#0F1C2E 100%)",
  };
  return map[p];
}

const PROGRESS: Record<Phase, number> = {
  prologue: 0, darkness: 13, cliff: 26, rope: 40,
  choice: 54, ascent: 67, light: 80, desert: 92, begin: 100,
};

// ── Shared: lines renderer ───────────────────────────────────
function Lines({ lines, count }: { lines: string[]; count: number }) {
  return (
    <>
      {lines.slice(0, count).map((line, i) =>
        line === "" ? (
          <div key={i} className="h-5" />
        ) : (
          <p
            key={i}
            className="leading-relaxed text-base"
            style={{
              color: "rgba(253,246,227,0.88)",
              fontFamily: "Georgia,'Noto Serif KR',serif",
              animation: "fadeUp 0.7s ease-out both",
            }}
          >
            {line}
          </p>
        )
      )}
    </>
  );
}

// ── Generic act screen ───────────────────────────────────────
function ActScreen({
  lines,
  delay = 750,
  onNext,
  btnLabel = "계속하기 →",
  btnStyle,
}: {
  lines: string[];
  delay?: number;
  onNext: () => void;
  btnLabel?: string;
  btnStyle?: React.CSSProperties;
}) {
  const { count, done, skip } = useLineReveal(lines, delay);

  return (
    <div
      className="flex flex-col min-h-screen px-7 cursor-pointer"
      style={{ paddingTop: "env(safe-area-inset-top, 16px)" }}
      onClick={() => !done && skip()}
    >
      <div className="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full space-y-1 py-20">
        <Lines lines={lines} count={count} />
        {!done && (
          <p
            className="text-xs pt-6"
            style={{ color: "rgba(253,246,227,0.18)", animation: "twBlink 2.5s ease-in-out infinite" }}
          >
            탭하면 건너뜁니다
          </p>
        )}
      </div>

      {done && (
        <div
          className="pb-10 max-w-sm mx-auto w-full"
          style={{ paddingBottom: "calc(env(safe-area-inset-bottom,0px) + 32px)", animation: "fadeUp 0.5s 0.2s ease-out both" }}
        >
          <button
            onClick={(e) => { e.stopPropagation(); onNext(); }}
            className="w-full py-4 rounded-2xl font-bold text-base transition-all duration-150 active:scale-[0.97]"
            style={{
              background: "linear-gradient(135deg, #C9A84C, #F0D080, #C9A84C)",
              color: "#0F1C2E",
              minHeight: "56px",
              ...btnStyle,
            }}
          >
            {btnLabel}
          </button>
        </div>
      )}
    </div>
  );
}

// ── Prologue screen ──────────────────────────────────────────
function PrologueScreen({ onNext }: { onNext: () => void }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const ts = [
      setTimeout(() => setStep(1), 800),
      setTimeout(() => setStep(2), 2200),
      setTimeout(() => setStep(3), 3800),
      setTimeout(() => setStep(4), 5200),
    ];
    return () => ts.forEach(clearTimeout);
  }, []);

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen px-7 cursor-pointer select-none"
      onClick={step >= 4 ? onNext : undefined}
    >
      <div className="text-center space-y-6 max-w-xs">
        {step >= 1 && (
          <div style={{ animation: "fadeUp 1.4s ease-out both" }}>
            {/* Cross symbol */}
            <div className="relative w-14 h-14 mx-auto mb-8">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-px h-14" style={{ background: "linear-gradient(to bottom,transparent,#C9A84C,transparent)" }} />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-px w-10 -translate-y-3.5" style={{ background: "linear-gradient(to right,transparent,#C9A84C,transparent)" }} />
              </div>
            </div>
            <h1
              className="font-bold tracking-[0.35em]"
              style={{ fontSize: "clamp(2.2rem,8vw,3.2rem)", color: "#FDF6E3" }}
            >
              THE WAY
            </h1>
          </div>
        )}
        {step >= 2 && (
          <p
            className="text-xs tracking-[0.3em] font-semibold uppercase"
            style={{ color: "rgba(201,168,76,0.65)", animation: "fadeUp 0.9s ease-out both" }}
          >
            Chapter 0 · 심판대
          </p>
        )}
        {step >= 3 && (
          <div style={{ animation: "fadeUp 0.9s ease-out both" }}>
            <div
              className="rounded-xl p-4 mx-2"
              style={{ background: "rgba(201,168,76,0.06)", border: "1px solid rgba(201,168,76,0.2)" }}
            >
              <p className="text-sm italic leading-relaxed" style={{ color: "rgba(253,246,227,0.6)", fontFamily: "Georgia,serif" }}>
                &ldquo;은혜는 자격으로 오지 않는다&rdquo;
              </p>
            </div>
          </div>
        )}
        {step >= 4 && (
          <p
            className="text-xs"
            style={{ color: "rgba(253,246,227,0.2)", animation: "twBlink 2s ease-in-out infinite" }}
          >
            탭하여 시작
          </p>
        )}
      </div>
    </div>
  );
}

// ── Choice screen ─────────────────────────────────────────────
function ChoiceScreen({ onChoose }: { onChoose: (p: ChoicePath) => void }) {
  const { count, done } = useLineReveal(CHOICE_LINES, 750);

  return (
    <div className="flex flex-col min-h-screen px-7" style={{ paddingTop: "env(safe-area-inset-top,16px)" }}>
      <div className="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full space-y-1 py-20">
        <Lines lines={CHOICE_LINES} count={count} />
      </div>

      {done && (
        <div
          className="pb-10 max-w-sm mx-auto w-full space-y-3"
          style={{ paddingBottom: "calc(env(safe-area-inset-bottom,0px) + 32px)", animation: "fadeUp 0.5s 0.3s ease-out both" }}
        >
          {/* Rope icon */}
          <div className="text-center mb-6">
            <div className="inline-block w-px h-16" style={{ background: "linear-gradient(to bottom,transparent,#C9A84C,rgba(201,168,76,0.3))" }} />
          </div>

          <button
            onClick={() => onChoose("hold")}
            className="w-full py-5 rounded-2xl font-bold text-left px-6 transition-all duration-150 active:scale-[0.97]"
            style={{
              background: "rgba(201,168,76,0.1)",
              border: "1.5px solid rgba(201,168,76,0.5)",
              animation: "choiceIn 0.45s 0.5s ease-out both",
            }}
          >
            <span className="text-base font-bold" style={{ color: "#C9A84C" }}>버티겠다</span>
            <p className="text-xs font-normal mt-1" style={{ color: "rgba(253,246,227,0.4)" }}>줄을 잡고 힘껏 올라가겠다</p>
          </button>

          <button
            onClick={() => onChoose("release")}
            className="w-full py-5 rounded-2xl font-bold text-left px-6 transition-all duration-150 active:scale-[0.97]"
            style={{
              background: "rgba(253,246,227,0.04)",
              border: "1.5px solid rgba(253,246,227,0.18)",
              animation: "choiceIn 0.45s 0.7s ease-out both",
            }}
          >
            <span className="text-base font-bold" style={{ color: "rgba(253,246,227,0.75)" }}>내려놓겠다</span>
            <p className="text-xs font-normal mt-1" style={{ color: "rgba(253,246,227,0.35)" }}>내 힘을 포기하고 맡기겠다</p>
          </button>
        </div>
      )}
    </div>
  );
}

// ── Begin (Chapter 1 transition) ──────────────────────────────
function BeginScreen() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 1500);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-7">
      <div className="text-center max-w-sm w-full">
        <div style={{ animation: "fadeUp 1.2s ease-out both" }}>
          <p className="text-[10px] uppercase tracking-[0.3em] mb-4" style={{ color: "rgba(201,168,76,0.45)" }}>
            엔게디 동굴 · 기원전 1010년
          </p>

          <div className="relative w-10 h-10 mx-auto mb-6">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-px h-10" style={{ background: "linear-gradient(to bottom,transparent,#C9A84C,transparent)" }} />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-px w-7 -translate-y-2.5" style={{ background: "linear-gradient(to right,transparent,#C9A84C,transparent)" }} />
            </div>
          </div>

          <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "rgba(201,168,76,0.6)" }}>Chapter 1</p>
          <h2 className="text-2xl font-bold mb-2" style={{ color: "#FDF6E3" }}>동굴 속의 선택</h2>
          <p className="text-sm mb-2" style={{ color: "rgba(201,168,76,0.8)" }}>사무엘상 24장</p>
          <p className="text-sm leading-relaxed mb-10" style={{ color: "rgba(253,246,227,0.45)" }}>
            다윗과 함께 도망자가 된 당신.<br />
            사울이 동굴 안으로 들어왔다.<br />
            하나님의 뜻은 무엇인가?
          </p>
        </div>

        {ready && (
          <>
            <Link
              href="/chapter/1"
              className="block w-full py-4 rounded-2xl font-bold text-base text-center transition-all duration-150 active:scale-[0.97]"
              style={{
                background: "linear-gradient(135deg,#C9A84C,#F0D080,#C9A84C)",
                color: "#0F1C2E",
                minHeight: "56px",
                animation: "fadeUp 0.6s ease-out both",
              }}
            >
              엔게디 동굴로 →
            </Link>
            <Link
              href="/"
              className="block mt-4 text-xs text-center"
              style={{ color: "rgba(253,246,227,0.2)", animation: "fadeUp 0.6s 0.25s ease-out both" }}
            >
              홈으로 돌아가기
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────
export default function Chapter0Page() {
  const [phase, setPhase] = useState<Phase>("prologue");
  const [path, setPath] = useState<ChoicePath>(null);

  const bg = phaseBg(phase);
  const progress = PROGRESS[phase];
  const showProgress = phase !== "prologue" && phase !== "begin";

  const handleChoice = (p: ChoicePath) => {
    setPath(p);
    setPhase("ascent");
  };

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{ background: bg, transition: "background 2s ease", color: "rgba(253,246,227,0.88)" }}
    >
      {/* Progress bar */}
      {showProgress && (
        <div
          className="fixed top-0 left-0 z-50 h-[2px] transition-all duration-1000 ease-out"
          style={{ width: `${progress}%`, background: "linear-gradient(to right,rgba(201,168,76,0.3),rgba(201,168,76,0.7))" }}
        />
      )}

      {/* Chapter label */}
      {showProgress && (
        <div className="fixed top-3 right-4 z-40">
          <span className="text-[10px] font-mono" style={{ color: "rgba(201,168,76,0.3)" }}>CH.0</span>
        </div>
      )}

      {/* Phase screens */}
      {phase === "prologue" && <PrologueScreen onNext={() => setPhase("darkness")} />}

      {phase === "darkness" && (
        <ActScreen
          lines={DARKNESS_LINES}
          delay={750}
          onNext={() => setPhase("cliff")}
          btnLabel="더 깊은 어둠 속으로..."
        />
      )}

      {phase === "cliff" && (
        <ActScreen
          lines={CLIFF_LINES}
          delay={700}
          onNext={() => setPhase("rope")}
          btnLabel="그때였다..."
        />
      )}

      {phase === "rope" && (
        <ActScreen
          lines={ROPE_LINES}
          delay={800}
          onNext={() => setPhase("choice")}
          btnLabel="줄에 손을 뻗었다..."
        />
      )}

      {phase === "choice" && <ChoiceScreen onChoose={handleChoice} />}

      {phase === "ascent" && (
        <ActScreen
          lines={path === "hold" ? ASCENT_HOLD : ASCENT_RELEASE}
          delay={700}
          onNext={() => setPhase("light")}
          btnLabel={path === "hold" ? "올라가다..." : "끌려올라가다..."}
        />
      )}

      {phase === "light" && (
        <ActScreen
          lines={LIGHT_LINES}
          delay={750}
          onNext={() => setPhase("desert")}
          btnLabel="눈을 뜨다..."
        />
      )}

      {phase === "desert" && (
        <ActScreen
          lines={DESERT_LINES}
          delay={800}
          onNext={() => setPhase("begin")}
          btnLabel="그를 따라가다 →"
          btnStyle={{ letterSpacing: "0.05em" }}
        />
      )}

      {phase === "begin" && <BeginScreen />}
    </div>
  );
}
