'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getCompanion, type Companion } from '@/data/companion-engine';

type Step = 'enter' | 'line' | 'story' | 'courage';

export default function CompanionPage() {
  const router = useRouter();
  const [companion, setCompanion] = useState<Companion | null>(null);
  const [emotion, setEmotion] = useState<any>(null);
  const [step, setStep] = useState<Step>('enter');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const saved = sessionStorage.getItem('chapter0_emotion');
    if (!saved) { router.push('/chapter0/emotion'); return; }
    const parsed = JSON.parse(saved);
    setEmotion(parsed);
    setCompanion(getCompanion(parsed.id));
    // 진입 애니메이션
    setTimeout(() => setVisible(true), 100);
  }, [router]);

  const next = () => {
    setVisible(false);
    setTimeout(() => {
      if (step === 'enter') setStep('line');
      else if (step === 'line') setStep('story');
      else if (step === 'story') setStep('courage');
      else router.push('/chapter0/prayer');
      setTimeout(() => setVisible(true), 50);
    }, 300);
  };

  if (!companion || !emotion) {
    return (
      <div className="min-h-screen bg-dark-navy flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-gold border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-dark-navy flex flex-col items-center justify-center p-6 cursor-pointer select-none"
      onClick={next}
    >
      <div
        className="max-w-md w-full text-center transition-all duration-300"
        style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(12px)' }}
      >
        {/* 진입 */}
        {step === 'enter' && (
          <>
            <div className="text-7xl mb-6">{companion.emoji}</div>
            <p
              className="text-4xl font-bold mb-4"
              style={{ color: companion.color }}
            >
              {companion.name}
            </p>
            <p className="text-sub-text text-sm mt-8">화면을 터치하세요</p>
          </>
        )}

        {/* 공감 한 마디 */}
        {step === 'line' && (
          <>
            <div className="text-5xl mb-8">{companion.emoji}</div>
            <p
              className="text-3xl font-bold leading-relaxed"
              style={{ color: companion.color }}
            >
              "{companion.line}"
            </p>
            <p
              className="text-sm mt-2 font-semibold"
              style={{ color: companion.color, opacity: 0.7 }}
            >
              — {companion.name}
            </p>
          </>
        )}

        {/* 짧은 이야기 */}
        {step === 'story' && (
          <>
            <p className="text-cream text-lg leading-loose whitespace-pre-line mb-6">
              {companion.story}
            </p>
            <p
              className="text-sm font-bold"
              style={{ color: companion.color }}
            >
              — {companion.name}
            </p>
          </>
        )}

        {/* 용기 */}
        {step === 'courage' && (
          <>
            <p
              className="text-xl leading-relaxed whitespace-pre-line mb-10 font-bold"
              style={{ color: companion.color }}
            >
              {companion.courage}
            </p>
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="bg-gold text-dark-navy px-10 py-3 rounded-lg font-bold hover:bg-yellow-400 transition-colors"
            >
              계속하기
            </button>
          </>
        )}
      </div>

      {/* 하단 진행 표시 */}
      {step !== 'courage' && (
        <div className="fixed bottom-10 flex gap-2">
          {(['enter', 'line', 'story', 'courage'] as Step[]).map((s) => (
            <div
              key={s}
              className="w-2 h-2 rounded-full transition-all duration-300"
              style={{
                backgroundColor: s === step ? '#D4AF37' : '#D4C8B840',
                transform: s === step ? 'scale(1.4)' : 'scale(1)',
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
