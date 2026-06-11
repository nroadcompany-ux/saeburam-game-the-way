'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

interface EmotionData {
  id: string;
  name: string;
  emoji: string;
  intensity: 1 | 2 | 3;
}

interface WhisperData {
  message: string;
  scripture: string;
  reference: string;
  character: string;
}

interface ObedienceData {
  action: string;
  description: string;
}

interface CompanionData {
  name: string;
  emoji: string;
  color: string;
}

interface LegacyEntry {
  id: string;
  emotion: { id: string; name: string; emoji: string };
  intensity: 1 | 2 | 3;
  companion?: { name: string; emoji: string; color: string };
  prayer: string;
  whisper: {
    id?: string;
    message: string;
    scripture: string;
    reference: string;
    character: string;
  };
  obedience: { id?: string; action: string; description: string };
  testimony: string;
  created_at: string;
  completed_at?: string;
}

export default function LegacyPage() {
  const router = useRouter();
  const [testimony, setTestimony] = useState('');
  const [saveState, setSaveState] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<{
    emotion: EmotionData;
    intensity: number;
    companion: CompanionData | null;
    prayer: string;
    whisper: WhisperData;
    obedience: ObedienceData;
  } | null>(null);

  useEffect(() => {
    const emotion = JSON.parse(sessionStorage.getItem('chapter0_emotion') || '{}');
    const prayer = sessionStorage.getItem('chapter0_prayer') || '';
    const whisper = JSON.parse(sessionStorage.getItem('chapter0_whisper') || '{}');
    const obedience = JSON.parse(sessionStorage.getItem('chapter0_obedience') || '{}');
    const companion = JSON.parse(sessionStorage.getItem('chapter0_companion') || 'null');

    setData({
      emotion,
      intensity: emotion.intensity || 1,
      companion,
      prayer,
      whisper,
      obedience,
    });
    setIsLoading(false);
  }, []);

  const handleSave = () => {
    if (!data) return;

    setSaveState('saving');

    try {
      const legacy: LegacyEntry = {
        id: `legacy_${Date.now()}`,
        emotion: {
          id: data.emotion.id,
          name: data.emotion.name,
          emoji: data.emotion.emoji,
        },
        intensity: data.intensity as 1 | 2 | 3,
        companion: data.companion || undefined,
        prayer: data.prayer,
        whisper: {
          message: data.whisper.message || '',
          scripture: data.whisper.scripture || '',
          reference: data.whisper.reference || '',
          character: data.whisper.character || '',
        },
        obedience: {
          action: data.obedience.action || '',
          description: data.obedience.description || '',
        },
        testimony,
        created_at: new Date().toISOString(),
      };

      const legacies = JSON.parse(localStorage.getItem('legacies') || '[]');
      legacies.push(legacy);
      localStorage.setItem('legacies', JSON.stringify(legacies));

      // sessionStorage 정리
      sessionStorage.removeItem('chapter0_emotion');
      sessionStorage.removeItem('chapter0_prayer');
      sessionStorage.removeItem('chapter0_whisper');
      sessionStorage.removeItem('chapter0_obedience');
      sessionStorage.removeItem('chapter0_companion');

      setSaveState('saved');
      setTimeout(() => router.push('/chapter0'), 2000);
    } catch {
      setSaveState('error');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-dark-navy p-6 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-gold border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (saveState === 'saving') {
    return (
      <div className="min-h-screen bg-dark-navy flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-cream">저장 중...</p>
        </div>
      </div>
    );
  }

  if (saveState === 'saved') {
    return (
      <div className="min-h-screen bg-dark-navy p-6 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="text-5xl mb-4">🙏</div>
          <h1 className="text-3xl font-bold text-gold mb-4">저장되었습니다</h1>
          <p className="text-cream mb-8 leading-relaxed">
            당신의 여정이 기록되었습니다.
            <br />
            <br />
            THE WAY가 살아났습니다.
          </p>
          <p className="text-sub-text text-sm">잠시 후 돌아갑니다...</p>
        </div>
      </div>
    );
  }

  if (saveState === 'error') {
    return (
      <div className="min-h-screen bg-dark-navy p-6 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="text-5xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-cream mb-4">저장에 실패했습니다</h1>
          <p className="text-sub-text mb-8">브라우저 저장 공간을 확인해주세요.</p>
          <button
            onClick={() => setSaveState('idle')}
            className="bg-gold text-dark-navy px-8 py-3 rounded-lg font-bold hover:bg-yellow-500"
          >
            다시 시도
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-navy p-6 flex flex-col items-center justify-center">
      <div className="max-w-2xl w-full">
        <h1 className="text-2xl font-bold text-cream mb-2 text-center">
          당신의 기도와 깨달음을 남겨주세요
        </h1>
        <p className="text-sub-text text-center mb-8 text-sm">
          이 순간의 간증을 기록하세요.
        </p>

        {/* 여정 요약 */}
        <div className="bg-emotion-purple rounded-lg p-6 mb-8 border border-gold space-y-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-xs text-sub-text mb-1">감정</p>
              <p className="text-cream font-bold">
                {data?.emotion?.name} {data?.emotion?.emoji}
              </p>
            </div>
            <div>
              <p className="text-xs text-sub-text mb-1">강도</p>
              <p className="text-cream font-bold">
                {['한 스푼', '두 스푼', '세 스푼'][data?.intensity ? data.intensity - 1 : 0]}
              </p>
            </div>
          </div>

          {data?.companion && (
            <div>
              <p className="text-xs text-sub-text mb-1">동행자</p>
              <p className="font-bold" style={{ color: data.companion.color }}>
                {data.companion.emoji} {data.companion.name}
              </p>
            </div>
          )}

          {data?.whisper?.reference && (
            <div>
              <p className="text-xs text-sub-text mb-1">말씀</p>
              <p className="text-gold text-xs font-bold">
                {data.whisper.reference} — {data.whisper.character}
              </p>
            </div>
          )}

          {data?.obedience?.action && (
            <div className="pt-4 border-t border-gold">
              <p className="text-xs text-sub-text mb-1">순종</p>
              <p className="text-cream font-bold text-sm">{data.obedience.action}</p>
            </div>
          )}
        </div>

        {/* 간증 입력 */}
        <textarea
          value={testimony}
          onChange={(e) => setTestimony(e.target.value)}
          placeholder="이 경험 속에서 느낀 것, 깨달은 것, 변화를 기록하세요. (선택 사항)"
          className="w-full h-40 p-4 rounded-lg bg-emotion-purple border border-gold text-cream placeholder-sub-text resize-none focus:outline-none focus:ring-2 focus:ring-gold mb-2"
        />
        <div className="text-right text-sub-text text-xs mb-8">
          {testimony.length} / 1000자
        </div>

        {/* 버튼 */}
        <div className="flex justify-center gap-4">
          <button
            onClick={() => router.back()}
            className="bg-dark-blue text-cream px-8 py-3 rounded-lg font-bold border border-gold hover:border-yellow-500 transition-colors"
          >
            다시 보기
          </button>
          <button
            onClick={handleSave}
            className="bg-gold text-dark-navy px-8 py-3 rounded-lg font-bold hover:bg-yellow-500 transition-colors flex-1"
          >
            기록 저장
          </button>
        </div>

        <p className="text-center text-sub-text text-xs mt-6">
          모든 기록은 이 기기에 저장됩니다.
        </p>
      </div>
    </div>
  );
}
