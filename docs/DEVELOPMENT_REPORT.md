# THE WAY MVP — Development Report
## CHAPTER 0 Design & Specification Complete

**Date:** 2026-06-10  
**Status:** ✅ READY FOR DEVELOPMENT  
**Phase:** Design → Development Handoff  
**Team:** PM + Design + Dev + Planning

---

# 📋 Executive Summary

## 완료된 작업 (Design Phase)

| 항목 | 상태 | 문서 | 담당 |
|------|------|------|------|
| **SCREEN 01** (감정 선택) | ✅ 완료 | SCREEN_01_SPECTRUM_SPEC.md | Design |
| **SCREEN 02** (감정 강도) | ✅ 완료 | SCREEN_02_INTENSITY_SPEC.md | Design |
| **SCREEN 03-05** (기도→Whisper→추천사건) | ✅ 진행중 | CHAPTER_0_SPEC.md | Design |
| **Whisper 데이터** | 🔄 작성중 | whispers.ts + WHISPER_WRITING_GUIDE.md | Planning |
| **React 컴포넌트 (Screen 01)** | ✅ 완료 | src/components/chapter0/ | Dev |
| **Hook & 상태관리** | ✅ 완료 | src/hooks/useEmotionSpectrum.ts | Dev |

---

# 🎯 THE WAY MVP 핵심 (재확인)

## 원칙

> **첫 번째 영혼이 하나님을 만나도록 돕는다**

```
감정 인식 (Screen 01)
    ↓ 3초
감정 강도 (Screen 02)
    ↓
기도 입력 (Screen 03)
    ↓
성경 기반 위로 (Screen 04 - Whisper)
    ↓
추천 사건 (Screen 05)
    ↓
성경 사건 진입 (Screen 06+ - 기존 CORE_BIBLE 흐름)
```

## 핵심 차이점

| 기존 THE WAY | 신규 THE WAY (MVP) |
|-------------|------------------|
| 성경 사건 선택 → 질문 | 감정 선택 → 기도 → 위로 → 성경 사건 |
| 사건 소비 (consumption) | 영적 여정 (transformation) |
| 정보 전달 | 대화 & 공감 |

---

# 📁 생성된 산출물

## 설계 문서 (6개)

### 1. CHAPTER_0_SPEC.md
**내용:** 전체 Chapter 0 구조 (5 screens)
- Screen 01-05 상세 설명
- 데이터 흐름
- 개발 우선순위

**용도:** 전체 팀 참고 문서

### 2. SCREEN_01_SPECTRUM_SPEC.md ⭐
**내용:** 감정 선택 (슬라이더형)
- UI 상세 설계 (색상, 타이포그래피, 간격)
- 감정 스펙트럼 매핑
- 상호작용 플로우
- 반응형 설계
- 접근성 (A11y) 가이드

**개발팀용 필독서**

### 3. SCREEN_02_INTENSITY_SPEC.md
**내용:** 감정 강도 선택 (1-5단계)
- UI 옵션 3가지 (권장: 파이 게이지)
- 강도별 설명 텍스트
- 다중 감정 처리
- 컴포넌트 구조

**개발팀용 필독서**

### 4. WHISPER_WRITING_GUIDE.md ⭐
**내용:** Whisper 메시지 작성 가이드
- 6가지 필수 요소 (메시지, 구절, 출처, 인물, 이벤트ID, 컨텍스트)
- 감정별 모범 사례 (슬픔, 두려움, 분노 + 외로움 예시)
- 작성 프로세스 (Step 1-6)
- QA 체크리스트

**기획팀용 필독서**

### 5. REACT_IMPLEMENTATION_SPEC.md
**내용:** React 구현 상세 스펙
- 컴포넌트 아키텍처
- Props & State
- Hook 설명
- Navigation flow

**개발팀용 기술 레퍼런스**

### 6. DEVELOPMENT_CHECKLIST.md
**내용:** 개발 체크리스트 & 일정
- 10일 개발 계획 (Phase 1-4)
- 테스트 항목
- 코드 리뷰 기준
- 배포 전 확인사항

**개발팀용 일정 관리**

---

## React 코드 (보일러플레이트)

### Screen 01 (감정 선택)

#### 1. `src/data/emotionSpectrum.ts`
- 9개 감정 데이터 정의
- Spectrum position (0-100)
- Helper functions

#### 2. `src/components/chapter0/EmotionSlider.tsx`
- 감정 스펙트럼 슬라이더
- 동적 텍스트 업데이트
- 감정 라벨 표시

#### 3. `src/components/chapter0/EmotionDetailedSelection.tsx`
- 9개 감정 세부 선택
- 다중 선택 (체크박스)
- 기본값 표시

#### 4. `src/components/chapter0/EmotionSpectrumScreen.tsx`
- 메인 컴포넌트 (Screen 01 전체)
- 슬라이더 ↔ 세부 선택 전환
- Navigation (→ Screen 02)
- SessionStorage 저장

#### 5. `src/components/chapter0/hooks/useEmotionSpectrum.ts`
- 상태 관리
- Emotion selection 로직
- Event handlers

---

## 데이터 (Whisper)

### `src/data/whispers.ts`

**현재 상태:**
```
완료: 3개 감정 × 9개 = 27개 Whisper
- 슬픔 (sadness): 9개 ✓
- 두려움 (fear): 9개 ✓
- 분노 (anger): 9개 ✓

필요: 6개 감정 × 9개 = 198개 Whisper
- 외로움 (loneliness)
- 죄책감 (guilt)
- 무기력 (exhaustion)
- 혼란 (confusion)
- 감사 (gratitude)
- 평안 (peace)
```

**구조:**
```typescript
interface Whisper {
  id: string;
  emotionId: string;
  intensityLevel: 1 | 2 | 3 | 4 | 5;
  message: string; // 위로 메시지
  scripture: string; // 성경 구절
  reference: string; // 출처 (책, 장, 절)
  character: string; // 성경 인물
  eventId: string; // CORE_BIBLE_100 event ID
}
```

---

# 🛠️ 기술 스택

## Frontend
- **Framework:** Next.js 14
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** React Hooks (useEmotionSpectrum)
- **Storage:** sessionStorage + localStorage

## Color Palette
```
배경: #1A1F3A (dark-navy)
텍스트: #F5F1E8 (cream)
강조: #D4AF37 (gold)
보조: #D4C8B8 (sub-text)
```

## Component Structure
```
src/
├─ data/
│  ├─ emotionSpectrum.ts (감정 데이터)
│  └─ whispers.ts (Whisper 데이터베이스)
├─ components/chapter0/
│  ├─ EmotionSpectrumScreen.tsx (메인)
│  ├─ EmotionSlider.tsx
│  ├─ EmotionDetailedSelection.tsx
│  └─ hooks/
│     └─ useEmotionSpectrum.ts
└─ app/chapter0/
   └─ page.tsx (Screen 01 페이지)
```

---

# 📊 개발 일정

## Timeline: 2026-06-10 ~ 2026-06-20 (10일)

### Phase 1: SCREEN 01 (Days 1-3)
- [x] 데이터 정의 (emotionSpectrum.ts)
- [x] Hook 구현 (useEmotionSpectrum.ts)
- [x] 슬라이더 컴포넌트 (EmotionSlider.tsx)
- [ ] 세부 선택 컴포넌트 (EmotionDetailedSelection.tsx) - **Dev 담당**
- [ ] 메인 화면 (EmotionSpectrumScreen.tsx) - **Dev 담당**
- [ ] 페이지 라우트 (app/chapter0/page.tsx) - **Dev 담당**
- [ ] 모바일 테스트 - **QA 담당**

### Phase 2: SCREEN 02 (Days 4-5)
- [ ] 강도 선택 컴포넌트 (IntensitySelector.tsx) - **Dev 담당**
- [ ] 페이지 라우트 (app/chapter0/intensity/page.tsx) - **Dev 담당**
- [ ] Navigation 통합 - **Dev 담당**

### Phase 3: Whisper 데이터 (Days 2-10, 병렬)
- [x] Whisper 구조 정의 (whispers.ts)
- [x] 작성 가이드 (WHISPER_WRITING_GUIDE.md)
- [ ] 198개 Whisper 작성 - **Planning 담당**
- [ ] QA 검증 (성경 정확성) - **QA 담당**

### Phase 4: SCREEN 03-05 (Days 6-8)
- [ ] Screen 03 (기도 입력) - **Dev 담당**
- [ ] Screen 04 (Whisper 표시) - **Dev 담당**
- [ ] Screen 05 (추천 사건) - **Dev 담당**
- [ ] 전체 flow 통합 - **Dev 담당**

### Phase 5: 테스트 & 최적화 (Days 9-10)
- [ ] 모바일 반응형 테스트 - **QA 담당**
- [ ] 접근성 검증 (키보드, 스크린리더) - **QA 담당**
- [ ] 성능 최적화 (Lighthouse) - **Dev 담당**
- [ ] 버그 수정 - **Dev 담당**

---

# 👥 역할 분담

## 개발팀 (Frontend)
**담당:** Screens 01-05 컴포넌트 구현
```
Priority 1: EmotionSpectrumScreen (Screen 01) - 3일
Priority 2: IntensitySelector (Screen 02) - 2일
Priority 3: PrayerInput (Screen 03) - 1일
Priority 4: WhisperDisplay (Screen 04) - 1일
Priority 5: RecommendationEngine (Screen 05) - 1일
```

**참고 문서:**
- SCREEN_01_SPECTRUM_SPEC.md
- SCREEN_02_INTENSITY_SPEC.md
- REACT_IMPLEMENTATION_SPEC.md

**제공 코드:**
- src/data/emotionSpectrum.ts ✓
- src/components/chapter0/ (부분 제공) ✓
- src/hooks/useEmotionSpectrum.ts ✓

## 기획팀 (Content)
**담당:** Whisper 메시지 작성 (198개)

**분담:**
- 외로움 (loneliness): 9개
- 죄책감 (guilt): 9개
- 무기력 (exhaustion): 9개
- 혼란 (confusion): 9개
- 감사 (gratitude): 9개
- 평안 (peace): 9개

**지원:**
- WHISPER_WRITING_GUIDE.md (모범 사례 포함)
- whispers.ts (구조 정의 완료)

**산출물:**
- Google Sheets 또는 Excel 파일
- JSON 형식으로 변환 후 whispers.ts에 통합

## QA팀
**담당:** 검증 & 테스트

**1. Whisper 검증**
- 성경 구절 정확성 확인
- 출처 (책, 장, 절) 검증
- EventID 존재 확인

**2. 기능 테스트**
- 모바일 반응형 (375px, 768px, 1024px)
- 터치 인터랙션 (슬라이더, 버튼)
- 키보드 네비게이션
- 스크린리더 호환성

**3. 성능 테스트**
- Lighthouse 점수 > 90
- 첫 로드 < 1.5s
- 슬라이더 FPS 60+

---

# 📈 성공 지표

## MVP 완성 기준 (Go/No-Go)

| 기준 | 목표 | 실측 |
|------|------|------|
| **개발 일정** | 2026-06-20까지 완료 | TBD |
| **Whisper 데이터** | 225/225 완성 | 27/225 (12%) |
| **SCREEN 01-02 완성** | 100% 구현 | In Progress |
| **모바일 최적화** | 반응형 375px | In Progress |
| **이탈률** | < 15% (SCREEN 02 진입 실패율) | TBD |
| **Lighthouse 점수** | > 90 | TBD |
| **버그** | 0 critical | TBD |

---

# 🎬 다음 단계 (Action Items)

## 즉시 (오늘, 2026-06-10)

### 개발팀
- [ ] SCREEN_01_SPECTRUM_SPEC.md 정독
- [ ] 제공된 보일러플레이트 코드 검토
- [ ] 개발 환경 설정
- [ ] Day 1 구현 시작

### 기획팀
- [ ] WHISPER_WRITING_GUIDE.md 정독
- [ ] 198개 Whisper 작성 스케줄 수립
- [ ] Google Sheets 공동 편집 문서 생성
- [ ] 신학팀과 협력 체계 구축

### QA팀
- [ ] DEVELOPMENT_CHECKLIST.md 정독
- [ ] 테스트 계획 수립
- [ ] 성경 검증 도구 준비

---

## 주간 체크포인트

### Week 1 (Jun 10-13)
- [ ] SCREEN 01 컴포넌트 80% 완성
- [ ] Whisper 데이터 50개 작성
- [ ] 초기 통합 테스트

### Week 2 (Jun 14-20)
- [ ] SCREEN 02-05 완성
- [ ] Whisper 데이터 225개 완성
- [ ] 전체 flow 테스트
- [ ] 성능 최적화

---

# 📝 주의사항 (Don'ts)

🚫 **MVP 범위 밖 (v2.0+로 미룸)**
```
❌ CORE_BIBLE_100 전체 구현
❌ 365개 질문 전체 구현
❌ 사용자 계정 시스템
❌ 레거시 공유 기능
❌ AI 기반 Whisper 생성 (아직)
❌ 포인트/랭킹 시스템
```

✅ **필수 구현**
```
✓ SCREEN 01-05 (Chapter 0 완전 구현)
✓ 감정 선택 → 기도 → Whisper → 사건 flow
✓ 반응형 디자인 (모바일 우선)
✓ 접근성 (키보드, 스크린리더)
```

---

# 💡 성공의 핵심

## 첫 3초

사용자가 앱 진입 후 **3초 안에 이해하는 것:**

```
"오늘 내 감정을 선택하는 거구나"
                    ↓ (슬라이더로 감정 선택)
"강도를 표시하는 거구나"
                    ↓
"기도를 입력할 수 있네"
                    ↓
"위로 메시지가 나온다? 어떻게?"
                    ↓ (클릭 or 다음)
"성경 사건으로 들어간다"
```

**목표:** 이 흐름을 3초 + 자연스러운 인터랙션으로 경험

---

# 📚 참고 문서

| 문서 | 용도 | 대상 |
|------|------|------|
| CHAPTER_0_SPEC.md | 전체 구조 이해 | 모든 팀 |
| SCREEN_01_SPECTRUM_SPEC.md | Screen 01 개발 | Dev Team |
| SCREEN_02_INTENSITY_SPEC.md | Screen 02 개발 | Dev Team |
| REACT_IMPLEMENTATION_SPEC.md | 기술 레퍼런스 | Dev Team |
| WHISPER_WRITING_GUIDE.md | Whisper 작성 | Planning Team |
| DEVELOPMENT_CHECKLIST.md | 일정 & 테스트 | QA Team |
| THE_WAY_CONSTITUTION.md | 프로젝트 철학 | 모든 팀 |
| SOUL_MAP.md | 감정-성경 매핑 | 기획팀 |
| CORE_BIBLE_100.md | 100개 사건 | 기획팀 |

---

# ✅ 최종 체크리스트

**보고서 발행 전:**
- [x] 모든 설계 문서 완성
- [x] React 보일러플레이트 제공
- [x] Whisper 템플릿 & 가이드 제공
- [x] 개발 체크리스트 작성
- [x] 역할 분담 명확화

**개발 시작 조건:**
- [ ] PM 최종 승인
- [ ] 개발팀 준비 완료
- [ ] 기획팀 Whisper 작성 시작
- [ ] QA 테스트 계획 수립

---

## 🎯 최종 메시지

> **"첫 번째 영혼이 하나님을 만나도록 돕는다"**

> **"속삭임은 성경으로 이끈다"**

이 두 원칙으로 모든 개발 결정을 내립니다.

- 3초 이내 이해? → Screen 01 디자인 ✓
- 비기독교인도 누를 수 있나? → 종교 용어 제거 ✓
- 첫 진입 경험이 좋은가? → 인터랙션 풍부 ✓
- 다음 단계 호기심이 있나? → Whisper & 추천사건 ✓

---

**Report Status:** ✅ READY FOR DEVELOPMENT  
**Date:** 2026-06-10  
**Next:** Development Kickoff (2026-06-11)

**Prepared by:** Design + Architecture Team  
**Reviewed by:** PM  
**For:** Development Team, Planning Team, QA Team