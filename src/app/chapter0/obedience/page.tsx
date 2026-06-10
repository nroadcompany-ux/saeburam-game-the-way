'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getObedienceOptions, type Obedience } from '@/data/obedience-engine';

export default function ObediencePage() {
  const router = useRouter();
  const [obedience, setObedience] = useState<Obedience | null>(null);
  const [emotion, setEmotion] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    const emotionData = sessionStorage.getItem('chapter0_emotion');
    if (emotionData) {
      const parsed = JSON.parse(emotionData);
      setEmotion(parsed);

      // 순종 옵션 로드
      const options = getObedienceOptions(parsed.id);
      if (options.length > 0) {
        setObedience(options[0]);
      }
    }
    setIsLoading(false);
  }, []);

  const handleSelect = () => {
    if (obedience) {
      sessionStorage.setItem('chapter0_obedience', JSON.stringify(obedience));
      setSelected(true);

      // 2초 후 legacy 페이지로 이동
      setTimeout(() => {
        router.push('/chapter0/legacy');
      }, 1000);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-dark-navy p-6 flex items-center justify-center">
        <div className="text-center">
          <p className="text-cream mb-4 text-xl">순종의 길을 찾고 있습니다...</p>
          <div className="w-12 h-12 border-4 border-gold border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    );
  }

  if (!obedience || !emotion) {
    return (
      <div className="min-h-screen bg-dark-navy p-6 flex items-center justify-center">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-bold text-cream mb-4">
            {emotion?.name} {emotion?.emoji}
          </h1>
          <p className="text-sub-text mb-8">
            순종 옵션을 불러올 수 없습니다.
          </p>
          <button
            onClick={() => router.push('/chapter0/legacy')}
            className="bg-gold text-dark-navy px-8 py-3 rounded-lg font-bold hover:bg-yellow-500"
          >
            계속
          </button>
        </div>
      </div>
    );
  }

  if (selected) {
    return (
      <div className="min-h-screen bg-dark-navy p-6 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="text-4xl mb-4">✅</div>
          <h1 className="text-2xl font-bold text-gold mb-4">순종이 결정되었습니다</h1>
          <p className="text-cream mb-8">
            "{obedience.action}"
            <br />
            <br />
            당신의 삶이 변한다.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-navy p-6 flex flex-col items-center justify-center">
      <div className="max-w-2xl w-full">
        <h1 className="text-2xl font-bold text-cream mb-2 text-center">
          깨달음을 삶으로 만드세요
        </h1>
        <p className="text-sub-text text-center mb-12 text-sm">
          오늘 5분 안에 가능한 한 가지를 선택하세요
        </p>

        {/* 순종 선택 */}
        <div className="bg-gradient-to-b from-emotion-purple to-dark-navy border border-gold rounded-lg p-8 mb-8">
          <div className="text-5xl mb-4 text-center">{emotion.emoji}</div>

          <h2 className="text-xl font-bold text-gold text-center mb-6">
            {obedience.action}
          </h2>

          <p className="text-cream text-sm leading-relaxed mb-6 text-center">
            {obedience.description}
          </p>

          <div className="bg-dark-blue border border-sub-text rounded-lg p-4 text-center">
            <p className="text-xs text-sub-text mb-2">언제?</p>
            <p className="text-cream font-bold">{obedience.timeframe}</p>
          </div>
        </div>

        {/* 규칙 */}
        <div className="bg-dark-blue rounded-lg p-6 mb-8 border border-gold text-sm">
          <p className="text-gold font-bold mb-3">순종의 규칙</p>
          <ul className="text-cream space-y-2 text-xs">
            <li>✓ 5분 안에 가능</li>
            <li>✓ 오늘 바로 가능</li>
            <li>✓ 실제 행동</li>
            <li>✓ 체크 가능</li>
          </ul>
        </div>

        {/* 버튼 */}
        <div className="flex justify-center gap-4">
          <button
            onClick={() => router.push('/chapter0/whisper')}
            className="bg-dark-blue text-cream px-8 py-3 rounded-lg font-bold border border-gold hover:border-yellow-500 transition-colors"
          >
            다시 선택
          </button>
          <button
            onClick={handleSelect}
            className="bg-gold text-dark-navy px-8 py-3 rounded-lg font-bold hover:bg-yellow-500 transition-colors flex-1"
          >
            이 순종을 선택하겠습니다
          </button>
        </div>

        <p className="text-center text-sub-text text-xs mt-8">
          깨달음이 삶이 될 때, THE WAY는 살아난다.
        </p>
      </div>
    </div>
  );
}
