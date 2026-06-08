import Link from "next/link";
import { chapter1 } from "@/data/chapters/chapter1";

export default function CollectionPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg)" }}>
      <nav
        className="sticky top-0 z-10 flex items-center justify-between px-4 py-3 border-b"
        style={{ borderColor: "var(--border)", background: "rgba(249,250,251,0.92)", backdropFilter: "blur(8px)" }}
      >
        <Link href="/" className="text-sm font-semibold" style={{ color: "var(--text-secondary)", minHeight: "36px", display: "flex", alignItems: "center" }}>
          ← 홈
        </Link>
        <p className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>말씀 카드 컬렉션</p>
        <span className="text-xs font-bold px-2 py-1 rounded" style={{ background: "var(--toss-blue-light)", color: "var(--toss-blue)" }}>
          {chapter1.verseCards.length}장
        </span>
      </nav>

      <div className="max-w-[480px] mx-auto px-4 py-6 space-y-4">
        <div className="text-center mb-6">
          <p className="text-3xl mb-2">🎴</p>
          <h1 className="text-xl font-bold mb-1" style={{ color: "var(--text-primary)" }}>나의 말씀 카드</h1>
          <p className="text-sm" style={{ color: "var(--text-tertiary)" }}>챕터 1 · 동굴 속의 선택</p>
        </div>

        {chapter1.verseCards.map((card) => (
          <div key={card.id} className="rounded-xl p-6" style={{ background: "var(--way-navy)", color: "var(--way-cream)" }}>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold px-2 py-0.5 rounded" style={{ background: "rgba(201,168,76,0.15)", color: "var(--way-gold)" }}>
                {card.book}
              </span>
              <span className="text-xs font-bold" style={{ color: "var(--way-gold)" }}>{card.reference}</span>
            </div>
            <p className="text-lg font-bold leading-relaxed" style={{ fontFamily: "Georgia, serif" }}>
              &ldquo;{card.shortText}&rdquo;
            </p>
          </div>
        ))}

        <div className="pt-4 space-y-3">
          <Link href="/minigame/1" className="btn-blue">암송 미니게임 시작 →</Link>
          <Link href="/" className="btn-outline">홈으로</Link>
        </div>
      </div>
    </div>
  );
}
