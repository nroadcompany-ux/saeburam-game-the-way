'use client';

import { useRouter } from 'next/navigation';

export default function Chapter0() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-dark-navy flex items-center justify-center p-6">
      <div className="text-center max-w-md">
        <h1 className="text-4xl font-bold text-gold mb-4">THE WAY</h1>
        <p className="text-lg text-cream mb-8 leading-relaxed">
          당신의 영혼의 여정을 시작하세요.
          <br />
          <br />
          하나님의 질문을 경험하고,
          <br />
          당신이 변해가는 것을 목격하세요.
        </p>
        <button
          onClick={() => router.push('/chapter0/emotion')}
          className="bg-gold text-dark-navy px-8 py-3 rounded-lg font-bold hover:bg-yellow-500 transition-colors w-full"
        >
          시작하기
        </button>
      </div>
    </div>
  );
}
