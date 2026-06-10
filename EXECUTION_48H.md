# THE WAY — 48시간 실행 가이드

**시간:** 2026-06-10 오후 → 2026-06-12 오후  
**목표:** 첫 번째 Legacy 저장  
**원칙:** 예쁘지 않아도, 완벽하지 않아도 됨. 동작만 하면 된다.

---

## 🎯 5단계 동작 체크리스트

### STEP 1️⃣: Chapter 0 진입 (2시간)
```
□ src/app/chapter0/page.tsx 생성
□ "THE WAY 시작하기" 버튼
□ /chapter0/emotion으로 이동
□ 테스트: 페이지 로드 확인
```

### STEP 2️⃣: 감정 선택 (6시간)
```
□ /chapter0/emotion/page.tsx 생성
□ EmotionSpectrum 컴포넌트 (제공됨)
□ 슬라이더 또는 9개 버튼
□ SessionStorage에 저장
□ /chapter0/prayer로 이동 버튼
□ 테스트: 감정 선택 후 저장 확인
```

### STEP 3️⃣: 기도 입력 (4시간)
```
□ /chapter0/prayer/page.tsx 생성
□ 텍스트 입력 영역
□ "다음" 버튼
□ SessionStorage에 저장
□ /chapter0/whisper로 이동
□ 테스트: 기도 입력 & 저장 확인
```

### STEP 4️⃣: Whisper 표시 (4시간)
```
□ /chapter0/whisper/page.tsx 생성
□ 선택된 감정의 Whisper 표시
  (whispers.ts에서 1개만 선택)
□ 말씀 구절 표시
□ 출처 표시
□ "계속" 버튼
□ /chapter0/legacy로 이동
□ 테스트: Whisper 표시 확인
```

### STEP 5️⃣: Legacy 저장 (4시간)
```
□ /chapter0/legacy/page.tsx 생성
□ 간증 입력 영역
□ 저장 버튼
□ localStorage에 저장
  {
    timestamp: ISO8601,
    emotion: string,
    prayer: string,
    whisper: object,
    testimony: string
  }
□ "저장 완료" 메시지
□ 테스트: Legacy 저장 & 불러오기 확인
```

---

## 🔧 필수 구현 (복사 & 붙여넣기)

### 1. Route 구조
```
src/app/chapter0/
├── page.tsx           (진입)
├── emotion/
│   └── page.tsx       (감정 선택)
├── prayer/
│   └── page.tsx       (기도)
├── whisper/
│   └── page.tsx       (Whisper)
└── legacy/
    └── page.tsx       (Legacy 저장)
```

### 2. SessionStorage 구조
```typescript
const session = {
  chapter0: {
    emotion: { id: 'sadness', name: '슬픔', level: 3 },
    prayer: '하나님, 너무 외롭습니다',
    whisper: {
      id: 'sadness_3_1',
      message: '너는 혼자가 아니다...',
      reference: '시편 56:8'
    }
  }
}
```

### 3. localStorage 구조
```typescript
const legacy = {
  id: `legacy_${timestamp}`,
  timestamp: ISO8601,
  emotion: { id: 'sadness', name: '슬픔', level: 3 },
  prayer: '하나님, 너무 외롭습니다',
  whisper: { ... },
  testimony: '하나님이 나를 위로해주셨습니다'
}

// localStorage.setItem('legacy', JSON.stringify(legacy))
```

---

## 📝 각 파일 템플릿

### page.tsx (Chapter 0 진입)
```typescript
'use client';

import { useRouter } from 'next/navigation';

export default function Chapter0() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-dark-navy flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-cream mb-8">THE WAY</h1>
        <p className="text-sub-text mb-8">
          당신의 영혼의 여정을 시작하세요
        </p>
        <button
          onClick={() => router.push('/chapter0/emotion')}
          className="bg-gold text-dark-navy px-8 py-3 rounded-lg font-bold hover:bg-yellow-500"
        >
          시작하기
        </button>
      </div>
    </div>
  );
}
```

### page.tsx (감정 선택)
```typescript
'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SPECTRUM_EMOTIONS } from '@/data/emotionSpectrum';

export default function EmotionPage() {
  const router = useRouter();
  const [selectedEmotion, setSelectedEmotion] = useState(null);

  const handleNext = () => {
    if (selectedEmotion) {
      sessionStorage.setItem(
        'chapter0_emotion',
        JSON.stringify(selectedEmotion)
      );
      router.push('/chapter0/prayer');
    }
  };

  return (
    <div className="min-h-screen bg-dark-navy p-6 flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold text-cream mb-8">
        오늘 당신은 어떤 기분인가요?
      </h1>
      
      <div className="grid grid-cols-3 gap-4 mb-8">
        {SPECTRUM_EMOTIONS.map((emotion) => (
          <button
            key={emotion.id}
            onClick={() => setSelectedEmotion(emotion)}
            className={`p-4 rounded-lg text-center ${
              selectedEmotion?.id === emotion.id
                ? 'bg-gold text-dark-navy'
                : 'bg-dark-navy border border-gold text-cream'
            }`}
          >
            <div className="text-3xl mb-2">{emotion.emoji}</div>
            <div className="text-sm font-bold">{emotion.name}</div>
          </button>
        ))}
      </div>

      <button
        onClick={handleNext}
        disabled={!selectedEmotion}
        className="bg-gold text-dark-navy px-8 py-3 rounded-lg font-bold disabled:opacity-50"
      >
        다음
      </button>
    </div>
  );
}
```

### page.tsx (기도)
```typescript
'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function PrayerPage() {
  const router = useRouter();
  const [prayer, setPrayer] = useState('');

  const handleNext = () => {
    sessionStorage.setItem('chapter0_prayer', prayer);
    router.push('/chapter0/whisper');
  };

  return (
    <div className="min-h-screen bg-dark-navy p-6 flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold text-cream mb-8">
        하나님께 하고 싶은 말씀이 있으신가요?
      </h1>
      
      <textarea
        value={prayer}
        onChange={(e) => setPrayer(e.target.value)}
        placeholder="입력하세요... (선택사항)"
        className="w-full max-w-md h-48 p-4 rounded-lg bg-dark-navy border border-gold text-cream placeholder-sub-text mb-8"
      />

      <button
        onClick={handleNext}
        className="bg-gold text-dark-navy px-8 py-3 rounded-lg font-bold"
      >
        다음
      </button>
    </div>
  );
}
```

### page.tsx (Whisper)
```typescript
'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { selectWhisper } from '@/data/whispers';

export default function WhisperPage() {
  const router = useRouter();
  const [whisper, setWhisper] = useState(null);

  useEffect(() => {
    const emotion = JSON.parse(sessionStorage.getItem('chapter0_emotion') || '{}');
    const selected = selectWhisper(emotion.id, emotion.level);
    setWhisper(selected);
  }, []);

  const handleNext = () => {
    const whisperData = JSON.parse(sessionStorage.getItem('chapter0_whisper') || '{}');
    sessionStorage.setItem('chapter0_whisper', JSON.stringify(whisper));
    router.push('/chapter0/legacy');
  };

  if (!whisper) return <div>로딩중...</div>;

  return (
    <div className="min-h-screen bg-dark-navy p-6 flex flex-col items-center justify-center">
      <div className="max-w-md text-center">
        <h2 className="text-3xl font-bold text-gold mb-8">
          {whisper.message}
        </h2>
        
        <p className="text-sm text-sub-text mb-4">
          {whisper.scripture}
        </p>
        
        <p className="text-xs text-sub-text mb-8">
          {whisper.reference}
        </p>

        <button
          onClick={handleNext}
          className="bg-gold text-dark-navy px-8 py-3 rounded-lg font-bold"
        >
          계속
        </button>
      </div>
    </div>
  );
}
```

### page.tsx (Legacy)
```typescript
'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LegacyPage() {
  const router = useRouter();
  const [testimony, setTestimony] = useState('');

  const handleSave = () => {
    const emotion = JSON.parse(sessionStorage.getItem('chapter0_emotion') || '{}');
    const prayer = sessionStorage.getItem('chapter0_prayer') || '';
    const whisper = JSON.parse(sessionStorage.getItem('chapter0_whisper') || '{}');

    const legacy = {
      id: `legacy_${Date.now()}`,
      timestamp: new Date().toISOString(),
      emotion,
      prayer,
      whisper,
      testimony
    };

    // localStorage에 저장
    const legacies = JSON.parse(localStorage.getItem('legacies') || '[]');
    legacies.push(legacy);
    localStorage.setItem('legacies', JSON.stringify(legacies));

    // SessionStorage 정리
    sessionStorage.removeItem('chapter0_emotion');
    sessionStorage.removeItem('chapter0_prayer');
    sessionStorage.removeItem('chapter0_whisper');

    alert('저장되었습니다!');
    router.push('/chapter0');
  };

  return (
    <div className="min-h-screen bg-dark-navy p-6 flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold text-cream mb-8">
        당신의 간증을 기록하세요
      </h1>
      
      <textarea
        value={testimony}
        onChange={(e) => setTestimony(e.target.value)}
        placeholder="이 경험을 통해 어떻게 변했나요?"
        className="w-full max-w-md h-48 p-4 rounded-lg bg-dark-navy border border-gold text-cream placeholder-sub-text mb-8"
      />

      <button
        onClick={handleSave}
        className="bg-gold text-dark-navy px-8 py-3 rounded-lg font-bold"
      >
        저장하기
      </button>
    </div>
  );
}
```

---

## ⚡ 48시간 타임라인

### Day 1 (2026-06-11)
```
08:00-10:00: Route 구조 설정 (2h)
10:00-12:00: 감정 선택 페이지 (2h)
12:00-13:00: 점심
13:00-15:00: 기도 입력 페이지 (2h)
15:00-17:00: Whisper 표시 페이지 (2h)
17:00-19:00: Legacy 저장 페이지 (2h)
19:00+:    버그 수정 & 테스트
```

### Day 2 (2026-06-12)
```
08:00-12:00: 통합 테스트 (4h)
12:00-13:00: 점심
13:00-17:00: 버그 수정 (4h)
17:00-18:00: 최종 테스트
18:00:      완성! 🎉
```

---

## ✅ 완성 조건

```
□ 첫 번째 사용자가 진입 가능
□ 감정 선택 가능
□ 기도 입력 가능
□ Whisper 표시됨
□ Legacy 저장됨
□ localStorage에 저장 확인
□ 앱 새로고침 후에도 Legacy 조회 가능

이 8가지가 모두 작동하면 
"THE WAY는 살아났다" 🙏
```

---

## 📌 주의사항

```
❌ 예쁜 디자인 신경 쓰지 말 것
   (Tailwind 기본 색상으로 충분)

❌ 완벽한 error handling 신경 쓰지 말 것
   (기본 try-catch면 충분)

❌ 다른 페이지/기능 만들지 말 것
   (이 5단계만 집중)

✅ 동작. 그것이 전부.
✅ 첫 번째 Legacy가 저장되는 순간
   THE WAY는 살아난다.
```

---

## 🚀 시작!

**지금부터 48시간.**

**설계는 끝났다.**  
**이제 구현할 차례다.**

**첫 번째 Legacy가 저장되는 순간,**  
**THE WAY는 살아난다.**

🙏