# THE WAY 5단계 기능 테스트 가이드

**테스트 날짜:** 2026-06-10  
**개발 서버:** http://localhost:3001/chapter0  
**목표:** 첫 번째 Legacy 저장까지 완벽한 흐름 검증

---

## 📋 테스트 체크리스트

### STEP 1️⃣: Chapter 0 진입
```
[ ] URL: http://localhost:3001/chapter0 접속
[ ] "THE WAY" 제목 표시 확인
[ ] "시작하기" 버튼 표시 확인
[ ] "시작하기" 클릭 → /chapter0/emotion으로 이동 확인
```

### STEP 2️⃣: 감정 선택
```
[ ] 9개 감정 아이콘(emoji) 표시 확인
  - 😩 무기력, 😢 슬픔, 😨 두려움, 😠 분노, 🤔 혼란, 😔 죄책감, 🙏 감사, ☮️ 평안, 🥀 외로움
[ ] 감정 클릭 → 하이라이트(금색) 표시 확인
[ ] 감정 선택 후 강도 선택 UI 표시 확인
[ ] 강도 1-5 선택 가능 확인
[ ] "다음" 버튼 활성화 (감정+강도 선택 시)
[ ] sessionStorage 확인
  ```
  감정: { id, name, emoji, level }
  ```
[ ] "다음" 클릭 → /chapter0/prayer로 이동 확인
```

### STEP 3️⃣: 기도 입력
```
[ ] "하나님께 기도하세요" 제목 표시
[ ] 텍스트 입력 영역 표시
[ ] 기도 입력 (선택사항) 입력 가능
[ ] 글자 수 카운터 작동 (예: "42 / 1000")
[ ] 아무 입력 없이 "다음" 클릭 가능 확인
[ ] 입력 후 "다음" 클릭 → /chapter0/whisper로 이동
[ ] sessionStorage 확인
  ```
  chapter0_prayer: "입력한 기도문"
  ```
```

### STEP 4️⃣: Whisper 표시
```
[ ] 감정 emoji 표시 확인
[ ] Whisper 메시지 표시 확인
  - 예: "넌 혼자가 아니다. 내가 너와 함께 있다..."
[ ] 성경 구절 표시 확인
[ ] 성경 참고문헌 표시 확인 (예: "요한복음 11:25")
[ ] 성경 인물 정보 표시 (예: "예수님")
[ ] 사건 ID 표시 (예: "#090")
[ ] "계속" 클릭 → /chapter0/legacy로 이동
[ ] sessionStorage 확인
  ```
  chapter0_whisper: { id, message, scripture, reference, character, eventId }
  ```
```

### STEP 5️⃣: Legacy 저장
```
[ ] "당신의 간증을 기록하세요" 제목 표시
[ ] 여정 요약 표시 (감정, 기도, Whisper)
[ ] 간증 입력 영역 표시
[ ] 간증 입력 가능
[ ] "저장하고 완료" 클릭
[ ] 저장 완료 메시지 표시 ("저장되었습니다!")
[ ] 2초 후 자동으로 /chapter0으로 리다이렉트
[ ] localStorage 확인
  ```
  legacies = [
    {
      id: "legacy_<timestamp>",
      timestamp: "ISO8601",
      emotion: { ... },
      prayer: "...",
      whisper: { ... },
      testimony: "..."
    }
  ]
  ```
```

---

## 🔍 데이터 검증 체크리스트

### sessionStorage 확인
```javascript
// 개발자 도구 콘솔에서:
JSON.parse(sessionStorage.getItem('chapter0_emotion'))
JSON.parse(sessionStorage.getItem('chapter0_prayer'))
JSON.parse(sessionStorage.getItem('chapter0_whisper'))
```

**Expected Output:**
```json
{
  "id": "sadness",
  "name": "슬픔",
  "emoji": "😢",
  "level": 3
}
```

### localStorage 확인
```javascript
// 개발자 도구 콘솔에서:
JSON.parse(localStorage.getItem('legacies'))
```

**Expected Output:**
```json
[
  {
    "id": "legacy_1718059200000",
    "timestamp": "2026-06-10T12:00:00.000Z",
    "emotion": {
      "id": "sadness",
      "name": "슬픔",
      "emoji": "😢",
      "level": 3
    },
    "prayer": "하나님, 너무 외롭습니다",
    "whisper": {
      "id": "sadness_3_1",
      "emotionId": "sadness",
      "intensityLevel": 3,
      "message": "넌 혼자가 아니다...",
      "scripture": "그의 업신 것은...",
      "reference": "이사야 53:4",
      "character": "예수님",
      "eventId": "090"
    },
    "testimony": "하나님이 함께하신다는 것을 느꼈습니다"
  }
]
```

---

## 🎯 성공 기준

### ✅ 모든 조건을 만족하면 PASS:

```
□ Chapter 0 진입 가능
□ 9개 감정 모두 선택 가능
□ 강도 1-5 선택 가능
□ 감정+강도 저장 확인
□ 기도 입력 가능 (선택사항)
□ 기도 저장 확인
□ Whisper 정상 표시
□ Whisper 저장 확인
□ 간증 입력 가능
□ Legacy 저장 완료
□ localStorage에 정확한 구조로 저장됨
□ 저장 완료 후 Chapter 0으로 자동 리다이렉트
```

---

## 🔧 테스트 시나리오 (추천 순서)

### 시나리오 1: Happy Path (기본 흐름)
```
1. /chapter0 진입
2. "시작하기" 클릭
3. 감정: "슬픔" 선택
4. 강도: Level 3 선택
5. "다음" 클릭
6. 기도: 비워두기 (선택사항)
7. "다음" 클릭
8. Whisper 확인
9. "계속" 클릭
10. 간증: "감사합니다" 입력
11. "저장하고 완료" 클릭
12. 완료 메시지 확인
13. 자동 리다이렉트 확인
14. localStorage 확인
```

### 시나리오 2: 기도 포함
```
1-2. 위와 동일
3. 감정: "두려움" 선택
4. 강도: Level 5 선택
5-6. 기도: "주여, 도와주세요" 입력
7. "다음" 클릭
8-12. 위와 동일
```

### 시나리오 3: 다중 Legacy
```
시나리오 1 완료 후
1. /chapter0 다시 접속
2. "시작하기" 클릭
3. 다른 감정 선택
4. 모든 단계 반복
5. localStorage에서 legacies 배열에 2개 항목 확인
```

---

## 📱 반응형 테스트

다음 화면 크기에서 테스트:

```
□ 375px (모바일)
  - 모든 요소 중앙 정렬
  - 버튼 클릭 가능
  - 텍스트 입력 가능

□ 768px (태블릿)
  - 레이아웃 정상
  - 모든 기능 동작

□ 1024px (데스크톱)
  - 최적 표시
  - 모든 기능 동작
```

---

## 🐛 버그 발견 시 체크리스트

발견한 버그를 다음 항목으로 분류:

```
□ 라우팅 오류 (페이지 이동 실패)
□ 데이터 손실 (sessionStorage/localStorage)
□ UI 오류 (렌더링, 레이아웃)
□ 기능 오류 (버튼 미작동, 입력 불가)
□ 성능 오류 (느린 로딩, 렉)
□ 브라우저 호환성 (특정 브라우저에서만 오류)
```

각 버그마다:
- 현상 (What happened?)
- 재현 방법 (How to reproduce?)
- 예상 결과 (Expected)
- 실제 결과 (Actual)
- 브라우저/기기 (Chrome/Edge/Safari + 기기 정보)

---

## ✨ 완성 메시지

**THE WAY 5단계 구현 완료!**

```
첫 번째 사용자가:
✅ 감정을 선택하고
✅ 기도를 남기고
✅ Whisper를 만나고
✅ Legacy를 저장했다.

THE WAY는 살아났다. 🙏
```

---

**다음 단계 (향후):**
- 6개 → 9개 감정 추가 (혼란, 감사, 평안)
- 나머지 감정들의 Whisper 작성 (현재 27/225)
- Legacy 조회/통계 페이지
- 1년 데이터 시각화
- 사용자 계정 (v1.1)
