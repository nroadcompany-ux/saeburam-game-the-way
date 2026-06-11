'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Chapter0() {
  const router = useRouter();
  const [legacyCount, setLegacyCount] = useState(0);

  useEffect(() => {
    const legacies = JSON.parse(localStorage.getItem('legacies') || '[]');
    setLegacyCount(legacies.length);
  }, []);

  return (
    <div className="min-h-screen bg-dark-navy flex items-center justify-center p-6">
      <div className="text-center max-w-md w-full">
        <p className="text-xs tracking-[0.3em] uppercase text-sub-text mb-6 opacity-60">
          THE WAY
        </p>

        <h1 className="text-3xl font-bold text-cream mb-4 leading-relaxed">
          순례자여,
          <br />
          오늘 네 마음은
          <br />
          어디에 있느냐?
        </h1>

        <p className="text-sub-text text-sm mb-12 leading-relaxed">
          감정을 선택하고,
          <br />
          동행자를 만나고,
          <br />
          말씀을 받고,
          <br />
          순종을 결단하라.
        </p>

        <button
          onClick={() => router.push('/chapter0/emotion')}
          className="bg-gold text-dark-navy px-8 py-4 rounded-lg font-bold hover:bg-yellow-500 transition-colors w-full text-lg mb-4"
        >
          오늘의 여정 시작
        </button>

        <button
          onClick={() => router.push('/chapter0/timeline')}
          className="bg-transparent text-cream px-8 py-3 rounded-lg font-bold border border-gold hover:border-yellow-500 transition-colors w-full flex items-center justify-center gap-2"
        >
          <span>📜</span>
          <span>나의 여정 보기</span>
          {legacyCount > 0 && (
            <span className="text-xs bg-gold text-dark-navy px-2 py-0.5 rounded-full ml-1">
              {legacyCount}
            </span>
          )}
        </button>

        {legacyCount === 0 && (
          <p className="text-sub-text text-xs mt-6 opacity-60">
            아직 기록된 여정이 없습니다
          </p>
        )}
      </div>
    </div>
  );
}
