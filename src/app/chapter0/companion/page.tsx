'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getCompanion, type Companion } from '@/data/companion-engine';

type Phase = 'appear' | 'line1' | 'line2' | 'done';

export default function CompanionPage() {
  const router = useRouter();
  const [companion, setCompanion] = useState<Companion | null>(null);
  const [emotion, setEmotion] = useState<any>(null);
  const [phase, setPhase] = useState<Phase>('appear');
  const [show, setShow] = useState(false);

  useEffect(() => {
    const saved = sessionStorage.getItem('chapter0_emotion');
    if (!saved) { router.push('/chapter0/emotion'); return; }
    const parsed = JSON.parse(saved);
    setEmotion(parsed);
    setCompanion(getCompanion(parsed.id));
    setTimeout(() => setShow(true), 80);
  }, [router]);

  const advance = () => {
    if (phase === 'appear') {
      setShow(false);
      setTimeout(() => { setPhase('line1'); setShow(true); }, 250);
    } else if (phase === 'line1') {
      setShow(false);
      setTimeout(() => { setPhase('line2'); setShow(true); }, 250);
    } else if (phase === 'line2') {
      setPhase('done');
    } else {
      router.push('/chapter0/prayer');
    }
  };

  if (!companion || !emotion) {
    return (
      <div className="min-h-screen bg-dark-navy flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-gold border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-8 cursor-pointer"
      style={{ backgroundColor: '#0D1120' }}
      onClick={phase !== 'done' ? advance : undefined}
    >
      {/* 이름 등장 단계 */}
      {phase === 'appear' && (
        <div
          className="text-center transition-all duration-500"
          style={{ opacity: show ? 1 : 0, transform: show ? 'translateY(0)' : 'translateY(20px)' }}
        >
          <div className="text-6xl mb-6">{companion.emoji}</div>
          <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: companion.color, opacity: 0.6 }}>
            {companion.era}
          </p>
          <p className="text-5xl font-bold" style={{ color: companion.color }}>
            {companion.name}
          </p>
          <p className="text-sub-text text-sm mt-12 animate-pulse">터치하여 계속</p>
        </div>
      )}

      {/* 첫 번째 말 */}
      {phase === 'line1' && (
        <div
          className="text-center max-w-sm transition-all duration-500"
          style={{ opacity: show ? 1 : 0, transform: show ? 'translateY(0)' : 'translateY(16px)' }}
        >
          <p className="text-2xl mb-8" style={{ color: companion.color, opacity: 0.5 }}>
            {companion.emoji} {companion.name}
          </p>
          <p className="text-cream text-3xl font-bold leading-snug">
            "{companion.line1}"
          </p>
          <p className="text-sub-text text-sm mt-12 animate-pulse">터치하여 계속</p>
        </div>
      )}

      {/* 두 번째 말 */}
      {(phase === 'line2' || phase === 'done') && (
        <div
          className="text-center max-w-sm transition-all duration-500"
          style={{ opacity: show ? 1 : 0, transform: show ? 'translateY(0)' : 'translateY(16px)' }}
        >
          <p className="text-2xl mb-8" style={{ color: companion.color, opacity: 0.5 }}>
            {companion.emoji} {companion.name}
          </p>
          <p className="text-cream text-2xl font-bold leading-snug mb-3">
            "{companion.line1}"
          </p>
          <p
            className="text-xl leading-snug transition-all duration-700"
            style={{
              color: companion.color,
              opacity: phase === 'done' ? 1 : 0.5,
              fontWeight: phase === 'done' ? 700 : 400,
            }}
          >
            "{companion.line2}"
          </p>

          {phase === 'line2' && (
            <p className="text-sub-text text-sm mt-12 animate-pulse">터치하여 계속</p>
          )}

          {phase === 'done' && (
            <button
              onClick={() => router.push('/chapter0/prayer')}
              className="mt-14 px-12 py-3 rounded-lg font-bold text-dark-navy transition-all duration-200 hover:scale-105 active:scale-95"
              style={{ backgroundColor: companion.color }}
            >
              계속하기
            </button>
          )}
        </div>
      )}

      {/* 단계 점 */}
      {phase !== 'done' && (
        <div className="fixed bottom-8 flex gap-2">
          {(['appear', 'line1', 'line2'] as Phase[]).map((p) => (
            <div
              key={p}
              className="rounded-full transition-all duration-300"
              style={{
                width: p === phase ? '20px' : '6px',
                height: '6px',
                backgroundColor: p === phase ? companion.color : '#D4C8B830',
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
