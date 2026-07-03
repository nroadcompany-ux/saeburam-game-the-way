# THE WAY — CHAPTER 0 Specification

**Version:** v2.0 (구조 변경 반영)  
**Date:** 2026-06-10  
**Priority:** 🔴 CRITICAL  
**Core Principle:** "첫 번째 영혼이 하나님을 만나도록 돕는다"

---

## 📖 THE WAY MVP Entry Flow

```
Screen 01: 감정 선택
    ↓
Screen 02: 감정 강도
    ↓
Screen 03: 기도 입력 (선택사항)
    ↓
Screen 04: Whisper Engine (위로 메시지)
    ↓
Screen 05: 추천 사건 (3-5개)
    ↓
Screen 06+: CORE_BIBLE 진행 (질문 → 회개 → 실천 → Legacy)
```

**핵심:** 사용자가 **자신의 상태를 인식** → **하나님과 대화** → **위로 받음** → **성경 사건으로 진입**

---

## 🎯 설계 철학

| 기존 | 신규 |
|------|------|
| 성경 사건 소비 | 영적 여정 경험 |
| 사건 → 질문 | 감정 → 기도 → Whisper → 사건 |
| 게임 플레이 | 자기 인식 + 하나님 만남 |
| 정보 전달 | 대화 & 위로 |

---

# Screen 01: 감정 선택

## 목표
사용자가 **현재의 마음 상태**를 인식하고 표현하도록 한다.

## 레이아웃

```
┌─────────────────────────────────┐
│  오늘 당신은 어떤 상태인가요?  │
│  [꺼지지 않는 질문이 있습니다]  │
├─────────────────────────────────┤
│                                 │
│      [카드형 감정 스택]          │
│                                 │
│      😨 두렵다                   │
│      [이 느낌으로 시작]          │
│                                 │
│    ← 스와이프로 다른 감정 →     │
│                                 │
├─────────────────────────────────┤
│      [건너뛰고 계속하기]         │
└─────────────────────────────────┘
```

## 감정 목록 (9개)

```typescript
interface Emotion {
  id: string;
  name: string;
  emoji: string;
  color: { bg: string; text: string };
}

const emotions: Emotion[] = [
  { id: 'sadness', name: '슬픔', emoji: '😢', color: { bg: '#1F2340', text: '#F5F1E8' } },
  { id: 'fear', name: '두려움', emoji: '😨', color: { bg: '#1A2847', text: '#F5F1E8' } },
  { id: 'anger', name: '분노', emoji: '😠', color: { bg: '#2A1F1F', text: '#F5F1E8' } },
  { id: 'loneliness', name: '외로움', emoji: '🥀', color: { bg: '#2A3A4A', text: '#F5F1E8' } },
  { id: 'guilt', name: '죄책감', emoji: '😔', color: { bg: '#3A2A2A', text: '#F5F1E8' } },
  { id: 'exhaustion', name: '무기력', emoji: '😩', color: { bg: '#3A3A2A', text: '#F5F1E8' } },
  { id: 'confusion', name: '혼란', emoji: '🤔', color: { bg: '#2A2A3A', text: '#F5F1E8' } },
  { id: 'gratitude', name: '감사', emoji: '🙏', color: { bg: '#2A4A3A', text: '#F5F1E8' } },
  { id: 'peace', name: '평안', emoji: '☮️', color: { bg: '#3A4A2A', text: '#F5F1E8' } },
];
```

## 컴포넌트
- **기존 EmotionSelector.tsx** 사용 (Screen 01용으로 변경)
- 카드 클릭 → Screen 02로 진행
- "건너뛰고 계속하기" → 기본 감정('sadness') 선택 후 Screen 02

---

# Screen 02: 감정 강도 선택

## 목표
감정의 **깊이/강도**를 수량화하여 이후 Whisper 추천을 정확하게 한다.

## UI 옵션

### 옵션 A: 슬라이더 (권장)
```
감정 강도: 슬픔

□ ─────────■■─────── □
약함                  강함

현재: 중간 (Level 3/5)
```

### 옵션 B: 라디오 버튼
```
□ 조금 (Level 1)
□ 보통 (Level 3)  ← 현재 선택
□ 많이 (Level 5)
```

### 옵션 C: 5-Point Scale (권장)
```
━━━━━━━━━━━━━━━━━━━━━

[○] [●] [ ] [ ] [ ]

← 약함          강함 →
```

## 기술 스펙

```typescript
interface EmotionIntensity {
  emotionId: string;
  level: 1 | 2 | 3 | 4 | 5;  // 1=약함, 5=매우 강함
  timestamp: Date;
}
```

## 컴포넌트
```
src/components/chapter0/IntensitySelector.tsx

Props:
- emotionId: string
- onSelect: (level: 1 | 2 | 3 | 4 | 5) => void
- currentLevel?: number
```

## 디자인
- 배경: Screen 01과 동일 (dark-navy)
- 슬라이더/버튼: gold (#D4AF37)
- 텍스트: cream (#F5F1E8)
- 다음 버튼: [Screen 03으로]

---

# Screen 03: 기도 입력

## 목표
사용자가 **자유로운 형식**으로 마음을 표현하도록 한다.

## 특징
- **선택사항**: 강제 입력 금지
- **자유 형식**: 1줄 또는 여러 줄
- **시간 제한 없음**: 사용자가 원할 때까지 작성
- **저장**: 기도 내용은 Session/localStorage에 저장

## UI

```
┌─────────────────────────────────┐
│  하나님께 하고 싶은 말           │
│  [선택사항입니다]                │
├─────────────────────────────────┤
│                                 │
│  ┌───────────────────────────┐  │
│  │                           │  │
│  │  [텍스트 입력 영역]       │  │
│  │  최대 500자               │  │
│  │                           │  │
│  │  예시:                    │  │
│  │  "하나님.                 │  │
│  │   오늘 너무 힘듭니다.    │  │
│  │   사업도 어렵고          │  │
│  │   사람도 어렵습니다."    │  │
│  │                           │  │
│  └───────────────────────────┘  │
│                                 │
│  [0/500 자]      [다음으로]      │
│                                 │
├─────────────────────────────────┤
│  [건너뛰기]                      │
└─────────────────────────────────┘
```

## 컴포넌트
```
src/components/chapter0/PrayerInput.tsx

Props:
- emotionId: string
- intensityLevel: 1 | 2 | 3 | 4 | 5
- onSubmit: (prayer: string) => void
- onSkip: () => void

State:
- prayer: string
- characterCount: number
```

## 기술 스펙

```typescript
interface Prayer {
  emotionId: string;
  intensityLevel: 1 | 2 | 3 | 4 | 5;
  content: string;  // 최대 500자
  timestamp: Date;
}
```

## 설계 원칙
- 텍스트 에어리어: 반응형 높이 (최소 100px, 최대 300px)
- 포커스 상태: 테두리 gold color
- 자동 저장: 3초마다 localStorage에 저장 (草稿)
- 건너뛰기 가능: prayer = null 허용

---

# Screen 04: Whisper Engine (핵심)

## 목표
성경 기반의 **개인화된 위로 메시지**를 생성한다.

## 원칙

🚨 **중요:** Whisper는 "계시"가 아니다.
- 반드시 성경에 근거해야 함
- 반드시 성경 출처를 명시해야 함
- 반드시 성경의 의도와 일치해야 함

## 구조

```
Input:
  ├─ emotion: string       (예: 'sadness')
  ├─ intensityLevel: 1-5   (예: 3)
  └─ prayer: string        (예: "하나님 힘들어요")
      
↓ [Whisper Engine]

Output:
  ├─ message: string       (위로 메시지)
  ├─ scripture: string     (성경 구절)
  ├─ reference: string     (출처, 예: "욥기 6:10")
  ├─ character: string     (성경 인물, 예: "욥")
  ├─ eventId?: string      (CORE_BIBLE_100의 event ID)
  └─ confidence: 0-1       (추천 신뢰도)
```

## Whisper 데이터 구조

```typescript
interface Whisper {
  id: string;
  emotionId: string;
  intensityLevel: 1 | 2 | 3 | 4 | 5;
  message: string;          // 위로 메시지 (50-150자)
  scripture: string;        // 성경 구절 원문
  reference: string;        // 출처 (예: "욥기 23:10")
  character: string;        // 성경 인물 (예: "욥")
  eventId: string;          // CORE_BIBLE_100 event ID
  context: string;          // 왜 이 Whisper인지 설명
}
```

## Whisper 예시

```
감정: 슬픔 (Level 3)
기도: "하나님, 너무 외롭습니다. 누군가 나를 이해해 줬으면 좋겠습니다."

→ Whisper:

"너는 혼자가 아니다.
 내가 너를 본다.
 너의 눈물을 안다."

출처: 시편 56:8
     "주께서 나의 유리함을 계산하셨으니
      내 눈물을 담아 두셨다"

성경 인물: 다윗

추천 사건: 다윗이 광야를 도망쳤을 때
          (CORE_BIBLE_100: Event #045)
```

## 구현 전략

### Phase 1: 정적 Whisper 데이터베이스
```
src/data/whispers.ts

감정 × 강도 × 주제별 Whisper 사전

예시:
{
  'sadness': {
    1: [ { message: '...', reference: '...' }, ... ],
    2: [ { message: '...', reference: '...' }, ... ],
    3: [ { message: '...', reference: '...' }, ... ],
    4: [ { message: '...', reference: '...' }, ... ],
    5: [ { message: '...', reference: '...' }, ... ],
  },
  'fear': { ... },
  'anger': { ... },
  // ... 9개 감정
}
```

각 감정별 5단계 × 3-5개 Whisper = **135-225개 Whisper 메시지** 필요

### Phase 2: 스마트 Whisper 선택
```typescript
function selectWhisper(emotion, intensityLevel, prayer): Whisper {
  // 1. 정확한 일치: emotion × intensityLevel
  let whispers = WHISPER_DB[emotion][intensityLevel];
  
  // 2. 기도 내용으로 추가 필터링 (선택사항)
  // 예: 기도에 "혼자", "외로움" 키워드 포함 → 해당 Whisper 우선
  
  // 3. 랜덤 선택 (같은 감정 선택 시 다른 Whisper 표시)
  return whispers[Math.floor(Math.random() * whispers.length)];
}
```

### Phase 3: 추후 AI 기반 생성 (v2.0+)
```
감정 × 강도 × 기도 내용 → Claude API
→ 성경 기반 Whisper 생성
→ 검수 & 승인 워크플로우
```

## UI

```
┌─────────────────────────────────┐
│                                 │
│     [로딩 애니메이션]            │
│     "말씀을 찾고 있습니다..."   │
│                                 │
│     [1-2초 대기]                │
│                                 │
├─────────────────────────────────┤
│                                 │
│  너는 혼자가 아니다.             │
│  내가 너를 본다.                │
│  너의 눈물을 안다.              │
│                                 │
│  ━━━━━━━━━━━━━━━━━━━━━━━━      │
│                                 │
│  출처: 시편 56:8                │
│  성경 인물: 다윗                │
│                                 │
│  [다음으로]                     │
│                                 │
└─────────────────────────────────┘
```

## 컴포넌트
```
src/components/chapter0/WhisperDisplay.tsx

Props:
- whisper: Whisper
- isLoading: boolean

src/data/whispers.ts
- WHISPER_DATABASE: Record<emotionId, Record<level, Whisper[]>>

src/utils/whisperEngine.ts
- selectWhisper(emotion, level, prayer?): Whisper
```

---

# Screen 05: 추천 사건 (Recommendation)

## 목표
감정 × 강도 × 기도 기반으로 **3-5개 성경 사건**을 추천한다.

## 추천 로직

```
Input: emotion, intensityLevel, prayer, whisper

Algorithm:
1. whisper.character 기본 사건 (우선도: HIGH)
   예: Whisper가 "욥" → 욥 사건 3개

2. emotion 관련 사건 (우선도: MEDIUM)
   예: 슬픔 → 나오미, 예레미야, 마리아 magdalene

3. intensityLevel 기반 추가 (우선도: LOW)
   예: Level 5 → 가장 심각한 사건들

4. prayer 키워드 매칭 (우선도: MEDIUM)
   예: "사업", "돈" → 욥 사건
        "혼자" → 엘리야 사건

Result: 3-5개 사건 (confidence score 내림차순)
```

## 데이터 구조

```typescript
interface RecommendedEvent {
  eventId: string;        // CORE_BIBLE_100 event ID
  character: string;      // 성경 인물
  reason: string;         // 추천 이유 (UI에 표시)
  confidence: 0-1;        // 신뢰도 (0.7+ 표시)
  relevance: 'exact' | 'character' | 'emotion' | 'intensity';
}
```

## UI

```
┌─────────────────────────────────┐
│                                 │
│  오늘의 추천 사건               │
│  [당신의 마음과 맞는 3가지]      │
│                                 │
├─────────────────────────────────┤
│                                 │
│  1. 엘리야                      │
│     [쓀려낸 후 하나님의 위로]  │
│     → [이 사건으로 들어가기]   │
│                                 │
│  2. 욥                          │
│     [고난 속 하나님의 침묵]     │
│     → [이 사건으로 들어가기]   │
│                                 │
│  3. 다윗                        │
│     [광야에서의 도피]           │
│     → [이 사건으로 들어가기]   │
│                                 │
├─────────────────────────────────┤
│  [다른 추천 보기]   [건너뛰기] │
└─────────────────────────────────┘
```

## 컴포넌트
```
src/components/chapter0/RecommendationList.tsx

Props:
- recommendations: RecommendedEvent[]
- onSelect: (eventId: string) => void

src/utils/recommendationEngine.ts
- recommendEvents(emotion, level, whisper, prayer?): RecommendedEvent[]
```

---

# Screen 06+: CORE_BIBLE 진행

**구조 유지:**
- 선택된 사건의 "하나님의 질문" 화면으로 진입
- 기존 CORE_BIBLE_100 흐름 적용
  - 질문 선택
  - 회개
  - 실천 (Reality Quest)
  - Legacy 저장

---

## 📊 데이터 흐름

```
Session/LocalStorage:

{
  chapter0: {
    emotion: {
      id: 'sadness',
      name: '슬픔',
      intensity: 3,
      timestamp: ISO8601,
    },
    prayer: {
      content: '하나님, 너무 힘듭니다...',
      timestamp: ISO8601,
    },
    whisper: {
      id: 'whisper_123',
      message: '너는 혼자가 아니다...',
      reference: '시편 56:8',
      character: '다윗',
      eventId: '045',
    },
    recommendation: {
      selectedEventId: '045',  // 사용자 선택
      alternatives: ['016', '050'],
      timestamp: ISO8601,
    }
  }
}
```

---

# 🎯 개발 우선순위

## MVP (v1.0) - 2주

**필수 구현:**
- [ ] Screen 01: EmotionSelector (기존 컴포넌트)
- [ ] Screen 02: IntensitySelector
- [ ] Screen 03: PrayerInput
- [ ] Screen 04: WhisperDisplay (정적 DB)
- [ ] Screen 05: RecommendationEngine
- [ ] 데이터 흐름 통합
- [ ] Session/localStorage 저장
- [ ] 모바일 최적화

**금지 사항:**
- ❌ CORE_BIBLE_100 전체 구현
- ❌ 365 질문 전체
- ❌ 레거시 공유 기능
- ❌ AI 기반 Whisper 생성 (아직)
- ❌ 사용자 계정 시스템 (아직)

---

# 📝 체크리스트

### Data Preparation
- [ ] 9개 감정 정의 (emotions.ts 완성)
- [ ] Whisper 데이터베이스 준비 (135-225개)
  - [ ] 각 감정별 5단계 × 3-5개 메시지
  - [ ] 성경 구절 & 출처 검증
  - [ ] 성경 인물 & eventId 매핑
- [ ] 추천 사건 로직 정의
  - [ ] emotion → character 맵핑
  - [ ] intensity → event difficulty 맵핑

### Components
- [ ] IntensitySelector (slider or buttons)
- [ ] PrayerInput (textarea, optional)
- [ ] WhisperDisplay (fade-in animation)
- [ ] RecommendationList (card stack or list)
- [ ] Chapter 0 Navigation (screen to screen)

### Integration
- [ ] Session state management
- [ ] localStorage 저장/복구
- [ ] Error handling (missing prayer, whisper, etc)
- [ ] Navigation flow (emotion → intensity → prayer → whisper → recommendation → event)

### Testing
- [ ] Mobile responsiveness (375px)
- [ ] Touch interactions
- [ ] Accessibility
- [ ] Whisper relevance check (manual QA)
- [ ] Recommendation accuracy

---

# 🎬 Next Steps

1. **기획팀:** Whisper 데이터 135-225개 준비
   - Template: `whispers.ts`에 입력 가능한 형식 제공
   
2. **개발팀:** Screen 02-05 컴포넌트 개발
   - 기존 EmotionSelector (Screen 01) 재사용
   - 4개 신규 컴포넌트 구현

3. **QA:** Whisper 내용 성경 정확성 검증
   - 각 메시지의 성경 근거 확인
   - 출처 정확성 검증

---

**상태:** Ready for Development  
**Core Principle:** "첫 번째 영혼이 하나님을 만나도록 돕는다"  
**Target:** 2026-06-20 (10일)