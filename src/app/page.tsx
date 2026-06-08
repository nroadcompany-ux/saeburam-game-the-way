import { chapter1 } from "@/data/chapters/chapter1";
import { FEATURED_VERSES } from "@/data/verses";

const LOCKED_CHAPTERS = [
  {
    number: 2,
    titleKo: "광야의 부르심",
    subtitle: "출 3장",
    hint: "모세와 불타는 떨기나무",
  },
  {
    number: 3,
    titleKo: "폭풍 속의 침묵",
    subtitle: "왕상 19장",
    hint: "엘리야와 호렙 산의 세미한 소리",
  },
];

function GoldDivider() {
  return (
    <div className="flex items-center gap-3 w-full max-w-xs mx-auto">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent to-way-gold/60" />
      <span className="text-way-gold text-xs">✦</span>
      <div className="flex-1 h-px bg-gradient-to-l from-transparent to-way-gold/60" />
    </div>
  );
}

function CrossMark() {
  return (
    <div className="relative w-8 h-8 mx-auto mb-1">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-px h-8 bg-way-gold/70" />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-5 h-px bg-way-gold/70 -translate-y-1.5" />
      </div>
    </div>
  );
}

function EndingBadge({ type }: { type: string }) {
  const map: Record<string, { label: string; color: string }> = {
    best: { label: "최고 결말 가능", color: "text-way-gold border-way-gold/50 bg-way-gold/10" },
    good: { label: "좋은 결말", color: "text-way-olive border-way-olive/50 bg-way-olive/10" },
  };
  const badge = map[type] ?? map["best"];
  return (
    <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded border ${badge.color}`}>
      {badge.label}
    </span>
  );
}

export default function HomePage() {
  const dailyVerse = FEATURED_VERSES[0];

  return (
    <div className="min-h-screen bg-way-gradient text-way-parchment">
      {/* ── NAV ── */}
      <nav className="sticky top-0 z-10 flex items-center justify-between px-6 py-3 border-b border-way-gold/20 bg-way-navy-dark/80 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <CrossMark />
          <span className="font-serif text-way-gold font-bold tracking-widest text-sm">
            THE WAY
          </span>
        </div>
        <div className="flex items-center gap-3 text-xs text-way-parchment/50">
          <span className="border border-way-gold/30 rounded px-2 py-0.5 text-way-gold/70 font-mono">
            β
          </span>
          <span>챕터 1 · 12개 선택지</span>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative overflow-hidden pt-16 pb-12 px-6 text-center">
        {/* Background glow */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 40% at 50% 30%, #C9A84C 0%, transparent 70%)",
          }}
        />

        {/* Cross decoration */}
        <div className="relative mb-6">
          <div className="relative w-12 h-12 mx-auto">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-0.5 h-12 bg-gradient-to-b from-transparent via-way-gold to-transparent" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-0.5 bg-gradient-to-r from-transparent via-way-gold to-transparent -translate-y-2" />
            </div>
          </div>
        </div>

        <h1 className="font-serif font-bold tracking-[0.3em] text-5xl sm:text-7xl text-way-parchment mb-3 drop-shadow-lg">
          THE WAY
        </h1>
        <p className="text-way-gold text-sm sm:text-base font-semibold tracking-widest mb-2">
          하나님의 길을 탐험하는 성경 여정
        </p>
        <p className="text-way-parchment/50 text-xs tracking-wide mb-8">
          선택이 당신의 믿음을 드러냅니다
        </p>

        <GoldDivider />

        {/* Daily verse */}
        <div className="mt-8 max-w-lg mx-auto">
          <p className="text-way-parchment/40 text-[10px] uppercase tracking-widest mb-3">
            오늘의 말씀
          </p>
          <blockquote className="font-serif italic text-way-parchment/90 text-base sm:text-lg leading-relaxed mb-3">
            &ldquo;{dailyVerse.textKo}&rdquo;
          </blockquote>
          <p className="text-way-gold/80 text-xs font-semibold tracking-wide">
            {dailyVerse.bookKo} {dailyVerse.chapter}:{dailyVerse.verse}
          </p>
        </div>
      </section>

      {/* ── CHAPTERS ── */}
      <section className="px-4 sm:px-6 pb-20 max-w-2xl mx-auto">
        {/* Section heading */}
        <div className="flex items-center gap-4 mb-6">
          <div className="h-px flex-1 bg-way-gold/20" />
          <h2 className="text-way-parchment/60 text-xs uppercase tracking-[0.2em] font-semibold">
            챕터 선택
          </h2>
          <div className="h-px flex-1 bg-way-gold/20" />
        </div>

        {/* ── CHAPTER 1 CARD (unlocked) ── */}
        <div className="relative mb-4 group">
          {/* Ambient glow */}
          <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-br from-way-gold/30 via-transparent to-way-gold/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm pointer-events-none" />

          <div className="relative rounded-2xl border border-way-gold/40 bg-way-navy/70 backdrop-blur-sm overflow-hidden shadow-xl">
            {/* Top accent bar */}
            <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-way-gold to-transparent" />

            <div className="p-6 sm:p-8">
              {/* Chapter label */}
              <div className="flex items-start justify-between mb-5">
                <div>
                  <span className="font-mono text-way-gold/50 text-[10px] uppercase tracking-widest">
                    Chapter
                  </span>
                  <div className="font-serif text-way-gold font-bold text-5xl leading-none tracking-tight">
                    {String(chapter1.chapterNumber).padStart(2, "0")}
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-way-parchment/40 text-xs block">{chapter1.subtitle}</span>
                  <EndingBadge type="best" />
                </div>
              </div>

              {/* Title */}
              <h3 className="font-serif text-way-parchment text-2xl font-bold mb-1">
                {chapter1.titleKo}
              </h3>
              <p className="text-way-gold/70 text-sm mb-1 font-medium">
                {chapter1.coverThemeKo}
              </p>
              <p className="text-way-parchment/40 text-xs mb-5">
                다윗과 사울 · 삼상 24장
              </p>

              {/* Synopsis */}
              <p className="text-way-parchment/70 text-sm leading-relaxed mb-5 border-l-2 border-way-gold/30 pl-4">
                {chapter1.synopsisKo}
              </p>

              {/* Key theme */}
              <div className="flex items-center gap-2 mb-6">
                <span className="text-way-gold text-xs">✦</span>
                <span className="text-way-parchment/50 text-xs">핵심 주제</span>
                <span className="text-way-gold/80 text-xs font-semibold">
                  {chapter1.keyThemeKo}
                </span>
              </div>

              {/* Opening verse */}
              <div className="rounded-xl bg-way-navy-dark/60 border border-way-gold/20 p-4 mb-6">
                <p className="font-serif italic text-way-parchment/80 text-sm leading-relaxed mb-2">
                  &ldquo;{chapter1.openingVerse.textKo}&rdquo;
                </p>
                <p className="text-way-gold/60 text-xs text-right">
                  {chapter1.openingVerse.reference}
                </p>
              </div>

              {/* Stats row */}
              <div className="flex items-center gap-4 mb-6 text-xs text-way-parchment/40">
                <span className="flex items-center gap-1">
                  <span className="text-way-gold/60">◈</span>
                  {chapter1.sceneCount}개 장면
                </span>
                <span className="w-px h-3 bg-way-gold/20" />
                <span className="flex items-center gap-1">
                  <span className="text-way-gold/60">◈</span>
                  {chapter1.choiceCount}개 선택지
                </span>
                <span className="w-px h-3 bg-way-gold/20" />
                <span className="flex items-center gap-1">
                  <span className="text-way-gold/60">◈</span>
                  5가지 결말
                </span>
              </div>

              {/* CTA button */}
              <button
                type="button"
                className="w-full py-4 rounded-xl font-bold text-way-navy bg-gradient-to-r from-way-gold via-way-gold-light to-way-gold hover:brightness-110 active:scale-[0.98] transition-all duration-200 tracking-wide shadow-lg shadow-way-gold/20 text-base"
              >
                시작하기 →
              </button>
            </div>
          </div>
        </div>

        {/* ── LOCKED CHAPTER CARDS ── */}
        <div className="grid grid-cols-2 gap-3">
          {LOCKED_CHAPTERS.map((ch) => (
            <div
              key={ch.number}
              className="relative rounded-xl border border-way-gold/10 bg-way-navy/40 overflow-hidden"
            >
              <div className="absolute inset-0 bg-way-navy-dark/60 backdrop-blur-[1px]" />
              <div className="relative p-5 text-center">
                <span className="font-mono text-way-parchment/20 text-[10px] uppercase tracking-widest">
                  Chapter
                </span>
                <div className="font-serif text-way-parchment/20 font-bold text-3xl mb-2">
                  {String(ch.number).padStart(2, "0")}
                </div>
                <div className="text-2xl mb-2 opacity-30">🔒</div>
                <p className="text-way-parchment/30 text-xs font-semibold mb-1">
                  {ch.titleKo}
                </p>
                <p className="text-way-parchment/20 text-[10px]">{ch.subtitle}</p>
                <p className="text-way-parchment/20 text-[10px] mt-1">{ch.hint}</p>
                <div className="mt-4 py-2 rounded-lg border border-way-gold/10 text-way-parchment/20 text-[10px] font-semibold tracking-wide">
                  곧 출시됩니다
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── HOW TO PLAY ── */}
        <div className="mt-8 rounded-2xl border border-way-gold/15 bg-way-navy/30 p-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-way-gold text-xs">✦</span>
            <h3 className="text-way-parchment/60 text-xs uppercase tracking-widest font-semibold">
              플레이 방법
            </h3>
          </div>
          <div className="space-y-3">
            {[
              {
                icon: "①",
                text: "성경 속 인물의 입장이 되어 이야기를 읽습니다",
              },
              {
                icon: "②",
                text: "중요한 순간마다 선택지를 골라 결정을 내립니다",
              },
              {
                icon: "③",
                text: "각 선택마다 하나님의 마음과 성경 구절 근거를 확인합니다",
              },
              {
                icon: "④",
                text: "하나님의 길을 따르면 더 깊은 이야기와 보상을 얻습니다",
              },
            ].map((item) => (
              <div key={item.icon} className="flex items-start gap-3">
                <span className="text-way-gold/50 text-xs font-mono mt-0.5 shrink-0">
                  {item.icon}
                </span>
                <p className="text-way-parchment/50 text-xs leading-relaxed">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-way-gold/15 py-8 px-6 text-center">
        <GoldDivider />
        <div className="mt-6">
          <p className="font-serif italic text-way-parchment/40 text-sm mb-1">
            &ldquo;예수께서 이르시되 내가 곧 길이요 진리요 생명이니&rdquo;
          </p>
          <p className="text-way-gold/40 text-xs">요한복음 14:6</p>
        </div>
        <p className="mt-6 text-way-parchment/20 text-[10px] tracking-wide">
          THE WAY — 하나님의 길을 탐험하는 성경 게임 · 베타
        </p>
      </footer>
    </div>
  );
}
