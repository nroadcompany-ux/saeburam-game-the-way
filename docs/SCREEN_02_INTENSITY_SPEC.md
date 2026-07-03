# THE WAY — SCREEN 02 Specification
## Emotion Intensity Selection (감정 강도 선택)

**Version:** v1.0  
**Date:** 2026-06-10  
**Parent:** SCREEN 01 (감정 스펙트럼)  
**Child:** SCREEN 03 (기도 입력)

---

## 🎯 목표

사용자가 선택한 **감정의 강도**를 1-5단계로 정량화하여 다음 단계에서 맞춤형 Whisper 메시지를 제공한다.

---

# 레이아웃

## 전체 구성

```
┌─────────────────────────────────┐
│                                 │
│  오늘 당신이 느끼는             │
│  [슬픔]의 강도는?               │
│                                 │
│  ┌─────────────────────────┐   │
│  │  가볍다  ●●○○○  심하다   │   │
│  │                         │   │
│  │  Level: 2 / 5          │   │
│  └─────────────────────────┘   │
│                                 │
│  [다음으로]                     │
│                                 │
└─────────────────────────────────┘
```

## 상세 레이아웃

```
Header (높이: 80px)
├─ 텍스트: "오늘 당신이 느끼는"
├─ 감정명: "[슬픔]의 강도는?" (gold color)
└─ 아이콘: 😢 (24px)

Content Area (높이: 250px)
├─ 강도 설명: "가볍다" ← ... → "심하다"
├─ 강도 게이지 바: ●●○○○ (5단계)
├─ 레벨 표시: "Level: 2 / 5"
└─ 선택된 강도 설명 텍스트

Button Area (높이: 120px)
├─ [다음으로] 버튼
├─ [건너뛰기] 버튼
└─ [뒤로가기] (선택사항)
```

---

# 강도 선택 UI - 3가지 옵션

## 옵션 A: 파이 게이지 (권장, 게임다움)

```
      ●●●○○
      12345

사용자 클릭 또는 탭:
     [1] [2] [3] [4] [5]
      ●        ○  ○  ○

표시: "수준 2 / 5 - 꽤 힘들어요"
```

### 특징
- ✅ 시각적 직관성
- ✅ 터치 친화적 (각 버튼 48×48px)
- ✅ 게임 느낌
- ❌ 숫자 표시 필요

### 구현 코드
```typescript
interface IntensityLevel {
  level: 1 | 2 | 3 | 4 | 5;
  description: string;
  colors: { empty: string; filled: string };
}

const INTENSITY_LEVELS: IntensityLevel[] = [
  { level: 1, description: '가벼워요' },
  { level: 2, description: '꽤 힘들어요' },
  { level: 3, description: '정말 힘들어요' },
  { level: 4, description: '너무 힘들어요' },
  { level: 5, description: '더 이상 버틸 수 없어요' },
];
```

## 옵션 B: 슬라이더 (범용)

```
가볍다 ◄──●────► 심하다

표시: "수준 3 / 5 - 정말 힘들어요"
```

## 옵션 C: 라디오 버튼 (명확성)

```
[ ] 가볍다 (수준 1)
[ ] 꽤 힘들다 (수준 2)
[●] 정말 힘들다 (수준 3)
[ ] 너무 힘들다 (수준 4)
[ ] 더 이상 버틸 수 없다 (수준 5)
```

---

# 권장: 옵션 A (파이 게이지)

**이유:**
- SCREEN 01 슬라이더와 다른 interaction (게임다움)
- 시각적 단순성 (5개 버튼)
- 터치 우선 (48px 버튼)
- 즉시 피드백

---

# 강도별 설명 텍스트

```typescript
const INTENSITY_DESCRIPTIONS: Record<1 | 2 | 3 | 4 | 5, {
  label: string;
  detail: string;
  color: string; // 진할수록 어두운 색
}> = {
  1: {
    label: '가벼워요',
    detail: '조금 그런 기분이 들어요',
    color: '#D4C8B8',
  },
  2: {
    label: '꽤 힘들어요',
    detail: '이 감정이 자주 들어요',
    color: '#C4B8A8',
    // 중간: RGB 변화
  },
  3: {
    label: '정말 힘들어요',
    detail: '이 감정이 자주 들어요',
    color: '#A8845C',
  },
  4: {
    label: '너무 힘들어요',
    detail: '이 감정이 대부분의 시간을 차지해요',
    color: '#8B6F47',
  },
  5: {
    label: '더 이상 버틸 수 없어요',
    detail: '이 감정이 압도적이에요',
    color: '#6B5733',
  },
};
```

---

# 컴포넌트 스펙

## IntensitySelector 컴포넌트

```typescript
interface IntensitySelectorProps {
  emotions: SpectrumEmotion[]; // SCREEN 01에서 선택된 감정들
  onSelect: (selection: IntensitySelection[]) => void;
  onSkip?: () => void;
}

interface IntensitySelection {
  emotionId: string;
  emotionName: string;
  intensityLevel: 1 | 2 | 3 | 4 | 5;
  description: string;
  timestamp: Date;
}

// 예시 반환값:
{
  emotionId: 'sadness',
  emotionName: '슬픔',
  intensityLevel: 3,
  description: '정말 힘들어요',
  timestamp: ISO8601
}
```

## UI 컴포넌트 분해

```
IntensityScreen.tsx (메인)
├─ IntensityHeader.tsx (감정명 표시)
├─ IntensityGauge.tsx (파이 게이지 또는 선택지)
├─ IntensityDescription.tsx (수준 설명)
└─ IntensityActions.tsx (버튼 그룹)
```

---

# 상호작용 플로우

## 단일 감정 선택 경로 (SCREEN 01 Flow 1)

```
SCREEN 01: "오늘 나는 슬픔 기분이야" [이렇게 시작할래]
    ↓
SCREEN 02: "오늘 당신이 느끼는 [슬픔]의 강도는?"
    ├─ Level 1: "가벼워요"
    ├─ Level 2: "꽤 힘들어요"
    ├─ Level 3: "정말 힘들어요" ← 사용자 선택
    ├─ Level 4: "너무 힘들어요"
    └─ Level 5: "더 이상 버틸 수 없어요"
    
    [다음으로] 클릭
    ↓
SCREEN 03: 기도 입력
```

## 다중 감정 선택 경로 (SCREEN 01 Flow 2)

```
SCREEN 01: [더 정확하게 고르기]
    ↓ [●] 슬픔, [●] 외로움, [●] 죄책감 선택
    ↓
SCREEN 02: "당신이 선택한 [슬픔, 외로움, 죄책감]의 강도를 표시해주세요"
    
    슬픔 강도: ●●●○○ (Level 3)
    외로움 강도: ●●●●○ (Level 4)
    죄책감 강도: ●○○○○ (Level 1)
    
    [다음으로] 클릭
    ↓
SCREEN 03: 기도 입력
```

---

# 🎨 색상 & 디자인

## 색상 매핑 (강도별)

```
강도 1: #D4C8B8 (밝은 회색, 가벼움)
강도 2: #C4B8A8 (중간)
강도 3: #A8845C (중간)
강도 4: #8B6F47 (어두움)
강도 5: #6B5733 (가장 어두움)

버튼 스타일:
  선택됨: 배경 gold (#D4AF37), 텍스트 dark-navy
  미선택: 배경 dark-navy/30, 텍스트 cream
  호버: 테두리 gold, scale 1.05
```

## 진행 표시기

```
SCREEN 01 ──○
SCREEN 02 ──●  ← 현재 위치
SCREEN 03 ──○
SCREEN 04 ──○
SCREEN 05 ──○
```

---

# 📊 데이터 저장

```typescript
// sessionStorage에 저장

interface Chapter0State {
  screen01: {
    method: 'slider' | 'detailed';
    emotionIds: string[];
    emotions: SpectrumEmotion[];
  };
  screen02: {
    intensities: IntensitySelection[]; // 각 감정별 강도
  };
}

// 예시:
{
  "screen01": {
    "method": "detailed",
    "emotionIds": ["sadness", "loneliness", "guilt"],
    "emotions": [
      { "id": "sadness", "name": "슬픔", "emoji": "😢" },
      { "id": "loneliness", "name": "외로움", "emoji": "🥀" },
      { "id": "guilt", "name": "죄책감", "emoji": "😔" }
    ]
  },
  "screen02": {
    "intensities": [
      { "emotionId": "sadness", "level": 3, "description": "정말 힘들어요" },
      { "emotionId": "loneliness", "level": 4, "description": "너무 힘들어요" },
      { "emotionId": "guilt", "level": 2, "description": "꽤 힘들어요" }
    ]
  }
}
```

---

# ✅ 개발 체크리스트

## Components
- [ ] `src/components/chapter0/IntensitySelector.tsx`
- [ ] `src/components/chapter0/IntensityHeader.tsx`
- [ ] `src/components/chapter0/IntensityGauge.tsx` (파이 게이지)
- [ ] `src/components/chapter0/IntensityDescription.tsx`
- [ ] `src/hooks/useIntensitySelection.ts`

## Page
- [ ] `src/app/chapter0/intensity/page.tsx`

## Testing
- [ ] 단일 감정 흐름
- [ ] 다중 감정 흐름
- [ ] 강도별 색상 확인
- [ ] 모바일 버튼 크기 (48px)

---

# 🎯 다음 스크린

SCREEN 03: 기도 입력 (Prayer Input)
- 선택사항 (선택하지 않아도 OK)
- 최대 500자 텍스트 입력
- 자동 저장 (localStorage)

---

**Status:** Ready for Development  
**Estimated Dev Time:** 1-2 days  
**Dependency:** SCREEN 01 완료 후