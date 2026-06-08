"use client";

import { useState } from "react";
import Link from "next/link";

type MiniPhase = "level1" | "level2" | "complete";

const L1 = {
  verse: "시편 37:7",
  before: "여호와 앞에 잠잠하고",
  answer: "참고",
  after: "기다리라",
  options: ["참고", "빨리", "슬피", "멈추지"],
};

const L2_WORDS = ["원수 갚는 것이", "내게 있으니", "내가", "갚으리라"];
const L2_VERSE = "롬 12:19";
const L2_ANSWER = [0, 1, 2, 3];

export default function MiniGamePage() {
  const [phase, setPhase] = useState<MiniPhase>("level1");
  const [picked1, setPicked1] = useState<string | null>(null);
  const [checked1, setChecked1] = useState(false);
  const [order, setOrder] = useState<number[]>([]);

  const correct1 = picked1 === L1.answer;
  const orderComplete = order.length === L2_WORDS.length;
  const correct2 = orderComplete && order.every((v, i) => v === L2_ANSWER[i]);

  function addWord(idx: number) {
    if (!order.includes(idx)) setOrder([...order, idx]);
  }
  function removeWord(pos: number) {
    setOrder(order.filter((_, i) => i !== pos));
  }
  function resetOrder() {
    setOrder([]);
  }

  return (
    <div className="min-h-screen" style={{ background: "var(--bg)" }}>
      {/* NAV */}
      <nav
        className="sticky top-0 z-10 flex items-center justify-between px-4 py-3 border-b"
        style={{ borderColor: "var(--border)", background: "rgba(249,250,251,0.92)", backdropFilter: "blur(8px)" }}
      >
        <Link href="/chapter/1" className="text-sm font-semibold" style={{ color: "var(--text-secondary)", minHeight: "36px", display: "flex", alignItems: "center" }}>
          ← 챕터 1
        </Link>
        <p className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>암송 미니게임</p>
        <span className="text-xs font-mono font-bold px-2 py-1 rounded" style={{ background: "var(--toss-blue-light)", color: "var(--toss-blue)" }}>
          {phase === "level1" ? "1 / 2" : phase === "level2" ? "2 / 2" : "✓"}
        </span>
      </nav>

      <div className="max-w-[480px] mx-auto px-4 py-6 pb-16">

        {/* ── LEVEL 1 ── */}
        {phase === "level1" && (
          <div className="space-y-5">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "var(--toss-blue)" }}>레벨 1 · 빈칸 채우기</p>
              <h2 className="text-xl font-bold mb-1" style={{ color: "var(--text-primary)" }}>빠진 단어를 찾아요</h2>
              <p className="text-sm" style={{ color: "var(--text-tertiary)" }}>{L1.verse}</p>
            </div>

            {/* Verse with blank */}
            <div className="rounded-xl p-5 text-center" style={{ background: "var(--way-navy)", color: "var(--way-cream)" }}>
              <p className="text-lg font-bold leading-relaxed" style={{ fontFamily: "Georgia, serif" }}>
                &ldquo;{L1.before}{" "}
                <span
                  className="inline-block min-w-[60px] border-b-2 pb-0.5 mx-1"
                  style={{
                    borderColor: picked1 ? (correct1 ? "var(--success)" : "var(--danger)") : "var(--way-gold)",
                    color: picked1 ? (correct1 ? "var(--success)" : "var(--danger)") : "transparent",
                    background: picked1 ? "transparent" : "rgba(201,168,76,0.1)",
                  }}
                >
                  {picked1 ?? "      "}
                </span>
                {" "}{L1.after}&rdquo;
              </p>
            </div>

            {/* Options */}
            <div className="grid grid-cols-2 gap-3">
              {L1.options.map((opt) => (
                <button
                  key={opt}
                  onClick={() => { if (!checked1) setPicked1(opt); }}
                  className="py-4 rounded-xl font-bold text-sm transition-all duration-150 active:scale-[0.97]"
                  style={{
                    background:
                      picked1 === opt
                        ? correct1
                          ? "var(--success)"
                          : "var(--danger)"
                        : "var(--bg-card)",
                    color:
                      picked1 === opt ? "white" : "var(--text-primary)",
                    border: `1.5px solid ${picked1 === opt ? "transparent" : "var(--border)"}`,
                    boxShadow: "var(--shadow-sm)",
                  }}
                >
                  {opt}
                </button>
              ))}
            </div>

            {picked1 && !checked1 && (
              <button
                onClick={() => setChecked1(true)}
                className="btn-blue"
              >
                확인하기
              </button>
            )}

            {checked1 && (
              <div className="space-y-3">
                <div className="rounded-xl p-4" style={{ background: correct1 ? "rgba(0,200,150,0.1)" : "rgba(240,68,82,0.1)", border: `1.5px solid ${correct1 ? "var(--success)" : "var(--danger)"}` }}>
                  <p className="font-bold mb-1" style={{ color: correct1 ? "var(--success)" : "var(--danger)" }}>
                    {correct1 ? "🎉 정답입니다!" : `❌ 정답은 '${L1.answer}'입니다`}
                  </p>
                  <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                    {L1.before} <strong>{L1.answer}</strong> {L1.after}
                  </p>
                </div>
                <button onClick={() => setPhase("level2")} className="btn-blue">
                  다음 레벨 →
                </button>
              </div>
            )}
          </div>
        )}

        {/* ── LEVEL 2 ── */}
        {phase === "level2" && (
          <div className="space-y-5">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "var(--toss-blue)" }}>레벨 2 · 단어 순서 맞추기</p>
              <h2 className="text-xl font-bold mb-1" style={{ color: "var(--text-primary)" }}>올바른 순서로 배열하세요</h2>
              <p className="text-sm" style={{ color: "var(--text-tertiary)" }}>{L2_VERSE}</p>
            </div>

            {/* Answer slots */}
            <div className="rounded-xl p-4 min-h-[72px]" style={{ background: "var(--way-navy)", border: "2px dashed rgba(201,168,76,0.3)" }}>
              {order.length === 0 ? (
                <p className="text-center text-sm" style={{ color: "rgba(253,246,227,0.3)" }}>아래 단어를 순서대로 탭하세요</p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {order.map((wordIdx, pos) => (
                    <button
                      key={pos}
                      onClick={() => removeWord(pos)}
                      className="px-3 py-1.5 rounded-lg text-sm font-bold transition-all active:scale-95"
                      style={{ background: "var(--way-gold)", color: "var(--way-navy)" }}
                    >
                      {L2_WORDS[wordIdx]}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Word bank */}
            <div>
              <p className="text-xs mb-2" style={{ color: "var(--text-tertiary)" }}>단어 목록 (탭하면 추가됩니다)</p>
              <div className="flex flex-wrap gap-2">
                {L2_WORDS.map((word, idx) => (
                  <button
                    key={idx}
                    onClick={() => addWord(idx)}
                    disabled={order.includes(idx)}
                    className="px-3 py-1.5 rounded-lg text-sm font-bold transition-all active:scale-95"
                    style={{
                      background: order.includes(idx) ? "var(--border-light)" : "var(--bg-card)",
                      color: order.includes(idx) ? "var(--text-tertiary)" : "var(--text-primary)",
                      border: `1.5px solid ${order.includes(idx) ? "var(--border-light)" : "var(--border)"}`,
                      cursor: order.includes(idx) ? "default" : "pointer",
                    }}
                  >
                    {word}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={resetOrder}
                className="flex-1 py-3 rounded-xl font-bold text-sm transition-all active:scale-[0.98]"
                style={{ background: "var(--bg-card)", border: "1.5px solid var(--border)", color: "var(--text-secondary)" }}
              >
                초기화
              </button>
              {orderComplete && (
                <button
                  onClick={() => setPhase("complete")}
                  className="flex-[2] py-3 rounded-xl font-bold text-sm text-white transition-all active:scale-[0.98]"
                  style={{ background: correct2 ? "var(--success)" : "var(--toss-blue)" }}
                >
                  {correct2 ? "🎉 완료!" : "제출하기"}
                </button>
              )}
            </div>

            {orderComplete && !correct2 && (
              <div className="rounded-xl p-4" style={{ background: "rgba(240,68,82,0.08)", border: "1.5px solid var(--danger)" }}>
                <p className="font-bold text-sm mb-1" style={{ color: "var(--danger)" }}>순서가 다릅니다. 다시 해보세요!</p>
                <p className="text-xs" style={{ color: "var(--text-secondary)" }}>힌트: {L2_WORDS[0]}으로 시작합니다</p>
              </div>
            )}
          </div>
        )}

        {/* ── COMPLETE ── */}
        {phase === "complete" && (
          <div className="space-y-5 text-center">
            <div className="py-8">
              <p className="text-5xl mb-4">🎉</p>
              <h2 className="text-2xl font-bold mb-2" style={{ color: "var(--text-primary)" }}>암송 완료!</h2>
              <p className="text-sm" style={{ color: "var(--text-secondary)" }}>두 말씀을 모두 암송했습니다</p>
            </div>

            <div className="space-y-3 text-left">
              {[
                { ref: "시편 37:7", text: "여호와 앞에 잠잠하고 참고 기다리라" },
                { ref: "롬 12:19", text: "원수 갚는 것이 내게 있으니 내가 갚으리라" },
              ].map((v) => (
                <div key={v.ref} className="rounded-xl p-4" style={{ background: "var(--way-navy)", color: "var(--way-cream)" }}>
                  <p className="text-xs font-bold mb-1" style={{ color: "var(--way-gold)" }}>{v.ref}</p>
                  <p className="text-sm font-bold italic" style={{ fontFamily: "Georgia, serif" }}>&ldquo;{v.text}&rdquo;</p>
                </div>
              ))}
            </div>

            <div className="space-y-3 pt-2">
              <Link href="/collection" className="btn-blue">🎴 카드 컬렉션 보기</Link>
              <Link href="/" className="btn-outline">홈으로</Link>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
