'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

interface LegacyEntry {
  id: string;
  emotion: { id: string; name: string; emoji: string };
  intensity: 1 | 2 | 3;
  companion?: { name: string; emoji: string; color: string };
  prayer: string;
  whisper: { message: string; scripture: string; reference: string; character: string };
  obedience: { action: string; description: string };
  testimony?: string;
  created_at: string;
  completed_at?: string;
}

const INTENSITY_LABELS: Record<1 | 2 | 3, string> = {
  1: '한 스푼',
  2: '두 스푼',
  3: '세 스푼',
};

function formatDate(iso: string): string {
  const d = new Date(iso);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const h = String(d.getHours()).padStart(2, '0');
  const min = String(d.getMinutes()).padStart(2, '0');
  return `${y}.${m}.${day} ${h}:${min}`;
}

export default function TimelinePage() {
  const router = useRouter();
  const [legacies, setLegacies] = useState<LegacyEntry[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const raw: LegacyEntry[] = JSON.parse(localStorage.getItem('legacies') || '[]');
    const sorted = [...raw].sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
    setLegacies(sorted);
    setIsLoading(false);
  }, []);

  const toggleCompletion = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = legacies.map((l) =>
      l.id === id
        ? { ...l, completed_at: l.completed_at ? undefined : new Date().toISOString() }
        : l
    );
    setLegacies(updated);
    localStorage.setItem('legacies', JSON.stringify(updated));
  };

  const selected = legacies.find((l) => l.id === selectedId) ?? null;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-dark-navy flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-gold border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // ─── Detail view ────────────────────────────────────────────────────────────
  if (selectedId && selected) {
    return (
      <div className="min-h-screen bg-dark-navy p-6 overflow-y-auto">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={() => setSelectedId(null)}
            className="text-sub-text text-sm mb-8 flex items-center gap-2 hover:text-cream transition-colors"
          >
            ← 목록으로
          </button>

          {/* 헤더 */}
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">{selected.emotion.emoji}</div>
            <h1 className="text-2xl font-bold text-cream">{selected.emotion.name}</h1>
            <p className="text-sub-text text-sm mt-2">
              {formatDate(selected.created_at)} · {INTENSITY_LABELS[selected.intensity]}
            </p>
          </div>

          {/* 동행자 */}
          {selected.companion && (
            <div
              className="rounded-lg p-5 mb-4 border"
              style={{
                borderColor: selected.companion.color + '60',
                backgroundColor: selected.companion.color + '18',
              }}
            >
              <p className="text-xs text-sub-text mb-1">동행자</p>
              <p className="font-bold text-lg" style={{ color: selected.companion.color }}>
                {selected.companion.emoji} {selected.companion.name}
              </p>
            </div>
          )}

          {/* Whisper */}
          <div className="bg-emotion-purple border border-gold rounded-lg p-5 mb-4">
            <p className="text-xs text-sub-text mb-3">말씀</p>
            <p className="text-cream leading-relaxed whitespace-pre-line text-sm mb-4">
              {selected.whisper.message}
            </p>
            <div className="border-t border-gold pt-3">
              <p className="text-xs text-sub-text italic mb-1">{'"'}{selected.whisper.scripture}{'"'}</p>
              <p className="text-xs text-gold font-bold">
                {selected.whisper.reference} · {selected.whisper.character}
              </p>
            </div>
          </div>

          {/* 기도 */}
          {selected.prayer && (
            <div className="bg-dark-blue border border-sub-text rounded-lg p-5 mb-4">
              <p className="text-xs text-sub-text mb-2">나의 기도</p>
              <p className="text-cream text-sm leading-relaxed">{selected.prayer}</p>
            </div>
          )}

          {/* 순종 + 완료 체크 */}
          <div className="bg-dark-blue border border-gold rounded-lg p-5 mb-4">
            <p className="text-xs text-sub-text mb-2">순종</p>
            <p className="text-cream font-bold text-sm mb-5">{selected.obedience.action}</p>
            <div className="flex gap-3">
              <button
                onClick={(e) => toggleCompletion(selected.id, e)}
                className={`flex-1 py-3 px-4 rounded-lg font-bold text-sm transition-all ${
                  selected.completed_at
                    ? 'bg-gold text-dark-navy'
                    : 'bg-dark-navy border border-gold text-cream hover:border-yellow-500'
                }`}
              >
                {selected.completed_at ? '✓ 순종 완료' : '오늘 실천했어요'}
              </button>
            </div>
            {selected.completed_at && (
              <p className="text-xs text-sub-text mt-3">
                완료: {formatDate(selected.completed_at)}
              </p>
            )}
          </div>

          {/* 간증 */}
          {selected.testimony && (
            <div className="bg-dark-blue border border-sub-text rounded-lg p-5 mb-8">
              <p className="text-xs text-sub-text mb-2">간증</p>
              <p className="text-cream text-sm leading-relaxed">{selected.testimony}</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ─── List view ───────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-dark-navy p-6">
      <div className="max-w-2xl mx-auto">
        {/* 상단 */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => router.push('/chapter0')}
            className="text-sub-text text-sm hover:text-cream transition-colors"
          >
            ← 돌아가기
          </button>
          <h1 className="text-xl font-bold text-gold">나의 여정</h1>
          <div className="w-20" />
        </div>

        {/* 빈 상태 */}
        {legacies.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <div className="text-6xl mb-6">📜</div>
            <p className="text-cream text-lg font-bold mb-3">아직 남겨진 여정이 없습니다.</p>
            <p className="text-sub-text text-sm mb-10">오늘의 마음을 기록해보세요.</p>
            <button
              onClick={() => router.push('/chapter0/emotion')}
              className="bg-gold text-dark-navy px-8 py-3 rounded-lg font-bold hover:bg-yellow-500 transition-colors"
            >
              지금 시작하기
            </button>
          </div>
        ) : (
          <>
            <p className="text-sub-text text-xs text-right mb-4">{legacies.length}개의 기록</p>
            <div className="space-y-4 pb-8">
              {legacies.map((legacy) => (
                <div
                  key={legacy.id}
                  onClick={() => setSelectedId(legacy.id)}
                  className="bg-dark-blue border border-gold rounded-lg p-5 cursor-pointer hover:border-yellow-500 transition-all active:scale-[0.99]"
                >
                  {/* 상단 행 */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{legacy.emotion.emoji}</span>
                      <div>
                        <p className="text-cream font-bold">{legacy.emotion.name}</p>
                        <p className="text-sub-text text-xs">{INTENSITY_LABELS[legacy.intensity]}</p>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0 ml-2">
                      <p className="text-sub-text text-xs">{formatDate(legacy.created_at)}</p>
                      {legacy.completed_at && (
                        <span className="text-xs bg-gold text-dark-navy px-2 py-0.5 rounded-full font-bold mt-1 inline-block">
                          순종 완료
                        </span>
                      )}
                    </div>
                  </div>

                  {/* 동행자 */}
                  {legacy.companion && (
                    <p
                      className="text-xs mb-2 font-medium"
                      style={{ color: legacy.companion.color }}
                    >
                      {legacy.companion.emoji} {legacy.companion.name}과 함께
                    </p>
                  )}

                  {/* Whisper 미리보기 */}
                  <p className="text-sub-text text-xs line-clamp-2 mb-3 leading-relaxed">
                    {legacy.whisper.message.replace(/\n/g, ' ')}
                  </p>

                  {/* 하단 행 */}
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs text-cream bg-emotion-purple px-3 py-1 rounded-full truncate max-w-[60%]">
                      {legacy.obedience.action}
                    </span>
                    <button
                      onClick={(e) => toggleCompletion(legacy.id, e)}
                      className={`text-xs px-3 py-1.5 rounded-full font-bold transition-all flex-shrink-0 ${
                        legacy.completed_at
                          ? 'bg-gold text-dark-navy'
                          : 'border border-gold text-sub-text hover:text-cream hover:border-yellow-500'
                      }`}
                    >
                      {legacy.completed_at ? '✓ 완료' : '실천'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
