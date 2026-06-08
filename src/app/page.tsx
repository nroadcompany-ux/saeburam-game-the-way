import Link from "next/link";
import { chapter1 } from "@/data/chapters/chapter1";
import { FEATURED_VERSES } from "@/data/verses";

const LOCKED_CHAPTERS = [
  { number: 2, title: "광야의 부르심", subtitle: "출 3장", hint: "모세와 불타는 떨기나무" },
  { number: 3, title: "폭풍 속의 침묵", subtitle: "왕상 19장", hint: "엘리야와 호렙 산의 세미한 소리" },
];

function GoldDivider() {
  return (
    <div className="flex items-center gap-3 w-full max-w-xs mx-auto">
      <div className="flex-1 h-px" style={{ background: "linear-gradient(to right, transparent, var(--way-gold))" }} />
      <span style={{ color: "var(--way-gold)", fontSize: "12px" }}>✦</span>
      <div className="flex-1 h-px" style={{ background: "linear-gradient(to left, transparent, var(--way-gold))" }} />
    </div>
  );
}

export default function HomePage() {
  const dailyVerse = FEATURED_VERSES[0];

  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(135deg, var(--way-navy-card) 0%, var(--way-navy) 100%)", color: "var(--way-cream)" }}>

      {/* NAV */}
      <nav className="sticky top-0 z-10 flex items-center justify-between px-6 py-3 border-b" style={{ borderColor: "rgba(201,168,76,0.2)", background: "rgba(15,28,46,0.85)", backdropFilter: "blur(8px)" }}>
        <div className="flex items-center gap-2">
          <div className="relative w-7 h-7">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-px h-7" style={{ background: "var(--way-gold)", opacity: 0.7 }} />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-px w-5 -translate-y-1.5" style={{ background: "var(--way-gold)", opacity: 0.7 }} />
            </div>
          </div>
          <span className="font-bold tracking-widest text-sm" style={{ color: "var(--way-gold)" }}>THE WAY</span>
        </div>
        <div className="flex items-center gap-3 text-xs" style={{ color: "rgba(253,246,227,0.4)" }}>
          <span className="border rounded px-2 py-0.5 font-mono" style={{ borderColor: "rgba(201,168,76,0.3)", color: "rgba(201,168,76,0.7)" }}>β</span>
          <span>챕터 1 · 3가지 선택</span>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative overflow-hidden pt-14 pb-10 px-6 text-center">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 40% at 50% 30%, rgba(201,168,76,0.08) 0%, transparent 70%)" }} />
        <div className="relative w-10 h-10 mx-auto mb-5">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-px h-10" style={{ background: "linear-gradient(to bottom, transparent, var(--way-gold), transparent)" }} />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-px w-7 -translate-y-2" style={{ background: "linear-gradient(to right, transparent, var(--way-gold), transparent)" }} />
          </div>
        </div>
        <h1 className="font-bold tracking-[0.3em] mb-2" style={{ fontSize: "clamp(2.5rem,8vw,4rem)", color: "var(--way-cream)" }}>THE WAY</h1>
        <p className="font-semibold tracking-widest text-sm mb-1" style={{ color: "var(--way-gold)" }}>하나님의 길을 탐험하는 성경 여정</p>
        <p className="text-xs mb-8" style={{ color: "rgba(253,246,227,0.4)" }}>선택이 당신의 믿음을 드러냅니다</p>
        <GoldDivider />
        <div className="mt-8 max-w-lg mx-auto">
          <p className="text-[10px] uppercase tracking-widest mb-3" style={{ color: "rgba(253,246,227,0.35)" }}>오늘의 말씀</p>
          <blockquote className="italic text-base leading-relaxed mb-2" style={{ color: "rgba(253,246,227,0.85)", fontFamily: "Georgia, serif" }}>
            &ldquo;{dailyVerse.textKo}&rdquo;
          </blockquote>
          <p className="text-xs font-bold" style={{ color: "rgba(201,168,76,0.8)" }}>{dailyVerse.bookKo} {dailyVerse.chapter}:{dailyVerse.verse}</p>
        </div>
      </section>

      {/* CHAPTERS */}
      <section className="px-4 pb-20 max-w-[480px] mx-auto">
        <div className="flex items-center gap-4 mb-5">
          <div className="h-px flex-1" style={{ background: "rgba(201,168,76,0.2)" }} />
          <h2 className="text-[10px] uppercase tracking-[0.2em] font-semibold" style={{ color: "rgba(253,246,227,0.5)" }}>챕터 선택</h2>
          <div className="h-px flex-1" style={{ background: "rgba(201,168,76,0.2)" }} />
        </div>

        {/* Chapter 0 - Prologue card */}
        <Link href="/chapter/0" className="block mb-4 group">
          <div className="relative rounded-2xl border overflow-hidden" style={{ borderColor: "rgba(201,168,76,0.2)", background: "rgba(5,8,20,0.85)" }}>
            <div className="h-px w-full" style={{ background: "linear-gradient(to right,transparent,rgba(201,168,76,0.4),transparent)" }} />
            <div className="p-5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative w-8 h-8 shrink-0">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-px h-8" style={{ background: "linear-gradient(to bottom,transparent,rgba(201,168,76,0.6),transparent)" }} />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-px w-6 -translate-y-2" style={{ background: "linear-gradient(to right,transparent,rgba(201,168,76,0.6),transparent)" }} />
                  </div>
                </div>
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-widest mb-0.5" style={{ color: "rgba(201,168,76,0.45)" }}>Chapter 00 · Prologue</p>
                  <p className="font-bold text-sm" style={{ color: "rgba(253,246,227,0.85)" }}>심판대</p>
                  <p className="text-[11px] mt-0.5" style={{ color: "rgba(253,246,227,0.3)" }}>5~10분 · 시네마틱</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs px-2 py-1 rounded-lg font-semibold" style={{ background: "rgba(201,168,76,0.08)", color: "rgba(201,168,76,0.6)", border: "1px solid rgba(201,168,76,0.2)" }}>
                  프롤로그
                </span>
                <p className="text-[10px] mt-2" style={{ color: "rgba(253,246,227,0.25)" }}>시작하기 →</p>
              </div>
            </div>
          </div>
        </Link>

        {/* Chapter 1 card */}
        <div className="relative mb-4 group">
          <div className="absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm pointer-events-none" style={{ background: "linear-gradient(135deg, rgba(201,168,76,0.3), transparent, rgba(201,168,76,0.1))" }} />
          <div className="relative rounded-2xl border overflow-hidden shadow-xl" style={{ borderColor: "rgba(201,168,76,0.4)", background: "rgba(26,47,74,0.7)", backdropFilter: "blur(4px)" }}>
            <div className="h-0.5 w-full" style={{ background: "linear-gradient(to right, transparent, var(--way-gold), transparent)" }} />
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-widest" style={{ color: "rgba(201,168,76,0.5)" }}>Chapter</span>
                  <div className="font-bold leading-none tracking-tight" style={{ fontSize: "3rem", color: "var(--way-gold)" }}>
                    {String(chapter1.number).padStart(2, "0")}
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs block mb-1" style={{ color: "rgba(253,246,227,0.4)" }}>{chapter1.subtitle}</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded border" style={{ color: "var(--way-gold)", borderColor: "rgba(201,168,76,0.5)", background: "rgba(201,168,76,0.1)" }}>최고 결말 가능</span>
                </div>
              </div>
              <h3 className="font-bold text-xl mb-0.5" style={{ color: "var(--way-cream)" }}>{chapter1.title}</h3>
              <p className="text-sm mb-0.5 font-medium" style={{ color: "rgba(201,168,76,0.8)" }}>{chapter1.coverTheme}</p>
              <p className="text-xs mb-4" style={{ color: "rgba(253,246,227,0.35)" }}>다윗과 사울 · 삼상 24장</p>
              <p className="text-sm leading-relaxed mb-4 pl-3" style={{ color: "rgba(253,246,227,0.7)", borderLeft: "2px solid rgba(201,168,76,0.3)" }}>
                {chapter1.synopsis}
              </p>
              <div className="flex items-center gap-2 mb-5">
                <span style={{ color: "var(--way-gold)", fontSize: "11px" }}>✦</span>
                <span className="text-xs" style={{ color: "rgba(253,246,227,0.4)" }}>핵심 주제</span>
                <span className="text-xs font-semibold" style={{ color: "rgba(201,168,76,0.9)" }}>{chapter1.keyTheme}</span>
              </div>
              <div className="rounded-xl p-4 mb-5" style={{ background: "rgba(15,28,46,0.6)", border: "1px solid rgba(201,168,76,0.2)" }}>
                <p className="italic text-sm leading-relaxed mb-1" style={{ color: "rgba(253,246,227,0.8)", fontFamily: "Georgia, serif" }}>
                  &ldquo;{chapter1.openingVerse.text}&rdquo;
                </p>
                <p className="text-xs text-right" style={{ color: "rgba(201,168,76,0.6)" }}>{chapter1.openingVerse.reference}</p>
              </div>
              <div className="flex items-center gap-4 mb-5 text-xs" style={{ color: "rgba(253,246,227,0.35)" }}>
                <span>◈ {chapter1.sceneCount}개 장면</span>
                <span className="w-px h-3" style={{ background: "rgba(201,168,76,0.2)" }} />
                <span>◈ {chapter1.choiceCount}가지 선택</span>
                <span className="w-px h-3" style={{ background: "rgba(201,168,76,0.2)" }} />
                <span>◈ 5가지 결말</span>
              </div>
              <Link
                href="/chapter/1"
                className="w-full py-4 rounded-xl font-bold text-base block text-center transition-all duration-200 active:scale-[0.98]"
                style={{ background: "linear-gradient(135deg, var(--way-gold), var(--way-gold-light), var(--way-gold))", color: "var(--way-navy)" }}
              >
                시작하기 →
              </Link>
            </div>
          </div>
        </div>

        {/* Locked chapters */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          {LOCKED_CHAPTERS.map((ch) => (
            <div key={ch.number} className="relative rounded-xl border overflow-hidden" style={{ borderColor: "rgba(201,168,76,0.1)", background: "rgba(26,47,74,0.3)" }}>
              <div className="absolute inset-0" style={{ background: "rgba(15,28,46,0.5)", backdropFilter: "blur(1px)" }} />
              <div className="relative p-5 text-center">
                <span className="font-mono text-[10px] uppercase tracking-widest" style={{ color: "rgba(253,246,227,0.15)" }}>Chapter</span>
                <div className="font-bold text-3xl mb-2" style={{ color: "rgba(253,246,227,0.15)" }}>{String(ch.number).padStart(2, "0")}</div>
                <div className="text-2xl mb-2" style={{ opacity: 0.25 }}>🔒</div>
                <p className="text-xs font-semibold mb-1" style={{ color: "rgba(253,246,227,0.25)" }}>{ch.title}</p>
                <p className="text-[10px] mb-1" style={{ color: "rgba(253,246,227,0.15)" }}>{ch.subtitle}</p>
                <p className="text-[10px]" style={{ color: "rgba(253,246,227,0.15)" }}>{ch.hint}</p>
                <div className="mt-4 py-2 rounded-lg text-[10px] font-semibold tracking-wide border" style={{ borderColor: "rgba(201,168,76,0.1)", color: "rgba(253,246,227,0.2)" }}>곧 출시됩니다</div>
              </div>
            </div>
          ))}
        </div>

        {/* How to play */}
        <div className="rounded-2xl border p-6" style={{ borderColor: "rgba(201,168,76,0.15)", background: "rgba(26,47,74,0.3)" }}>
          <div className="flex items-center gap-2 mb-4">
            <span style={{ color: "var(--way-gold)", fontSize: "11px" }}>✦</span>
            <h3 className="text-xs uppercase tracking-widest font-semibold" style={{ color: "rgba(253,246,227,0.5)" }}>플레이 방법</h3>
          </div>
          <div className="space-y-3">
            {[
              { icon: "①", text: "성경 속 인물의 입장이 되어 이야기를 읽습니다" },
              { icon: "②", text: "중요한 순간마다 선택지를 골라 결정을 내립니다" },
              { icon: "③", text: "각 선택마다 하나님의 마음과 성경 구절 근거를 확인합니다" },
              { icon: "④", text: "하나님의 길을 따르면 더 깊은 이야기와 말씀 카드를 얻습니다" },
            ].map((item) => (
              <div key={item.icon} className="flex items-start gap-3">
                <span className="text-xs font-mono mt-0.5 shrink-0" style={{ color: "rgba(201,168,76,0.5)" }}>{item.icon}</span>
                <p className="text-xs leading-relaxed" style={{ color: "rgba(253,246,227,0.45)" }}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t py-8 px-6 text-center" style={{ borderColor: "rgba(201,168,76,0.15)" }}>
        <GoldDivider />
        <div className="mt-6">
          <p className="italic text-sm mb-1" style={{ color: "rgba(253,246,227,0.35)", fontFamily: "Georgia, serif" }}>&ldquo;내가 곧 길이요 진리요 생명이니&rdquo;</p>
          <p className="text-xs" style={{ color: "rgba(201,168,76,0.35)" }}>요한복음 14:6</p>
        </div>
        <p className="mt-5 text-[10px] tracking-wide" style={{ color: "rgba(253,246,227,0.15)" }}>THE WAY — 새부름 미니스트리 × 엔로드컴퍼니 · 베타</p>
      </footer>
    </div>
  );
}
