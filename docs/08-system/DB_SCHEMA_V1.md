# DB_SCHEMA_V1.md
## 데이터베이스 스키마 설계 문서

**버전:** v1.0  
**작성일:** 2026년 6월 9일  
**헌법 기준:** THE_WAY_CONSTITUTION v1.0  
**상태:** 설계 초안 (코드 작성 전)

---

# PART 1. 설계 원칙

## 1.1 데이터 철학

THE WAY의 DB는 **플레이어의 영적 여정을 기록하는 공간**이다.

| 원칙 | 내용 |
|------|------|
| 삭제 없음 | Legacy 데이터는 삭제되지 않는다 (소프트 딜리트만 허용) |
| 플레이어 소유 | 모든 데이터는 플레이어의 것이다 |
| 실패도 기록 | 성공만이 아니라 실패, 의심, 침묵도 저장한다 |
| 간증 지향 | 모든 기록은 언젠가 간증이 된다 |
| 프라이버시 | 기본값은 비공개. 공유는 명시적 선택 |

## 1.2 기술 스택 (설계 기준)

```
DB: PostgreSQL (Supabase)
ORM: Prisma (향후 구현 시)
인증: Supabase Auth
스토리지: Supabase Storage (음성 기도, 이미지 등)
```

## 1.3 공통 필드 규칙

모든 테이블에 포함되는 기본 필드:

```
id          UUID        PRIMARY KEY DEFAULT gen_random_uuid()
created_at  TIMESTAMP   DEFAULT now()
updated_at  TIMESTAMP   DEFAULT now()
deleted_at  TIMESTAMP   NULL        -- 소프트 딜리트 (NULL = 활성)
```

---

# PART 2. 테이블 설계

## TABLE 01 — users (사용자)

**목적:** 플레이어의 기본 정보 및 영적 여정 상태 관리

```sql
TABLE users (
  -- 기본 식별
  id                UUID          PRIMARY KEY
  email             VARCHAR(255)  UNIQUE NOT NULL
  username          VARCHAR(50)   UNIQUE
  display_name      VARCHAR(100)

  -- 프로필
  avatar_url        TEXT
  bio               TEXT
  timezone          VARCHAR(50)   DEFAULT 'Asia/Seoul'
  language          VARCHAR(10)   DEFAULT 'ko'

  -- 영적 여정 상태
  awakening_stage   INTEGER       DEFAULT 1       -- 1~5 (Entry~Witness)
  current_chapter   INTEGER       DEFAULT 1       -- 현재 진행 중인 챕터
  streak_days       INTEGER       DEFAULT 0       -- 연속 접속일
  total_wisdom_pt   INTEGER       DEFAULT 0       -- 누적 Wisdom Point

  -- 설정
  notification_on   BOOLEAN       DEFAULT true
  daily_question_time TIME        DEFAULT '08:00' -- 질문 받는 시각
  is_public_legacy  BOOLEAN       DEFAULT false   -- Legacy 공개 여부

  -- 온보딩
  onboarding_done   BOOLEAN       DEFAULT false
  first_login_at    TIMESTAMP

  -- 공통
  created_at        TIMESTAMP     DEFAULT now()
  updated_at        TIMESTAMP     DEFAULT now()
  deleted_at        TIMESTAMP     NULL
)
```

**인덱스:**
```sql
INDEX idx_users_email ON users(email)
INDEX idx_users_awakening ON users(awakening_stage)
```

---

## TABLE 02 — journals (저널 / 묵상 기록)

**목적:** 플레이어가 질문에 반응하고 묵상한 내용 기록  
**헌법 연결:** LAW 06 (Legacy 본질), ENGINE 07 (Legacy Engine)

```sql
TABLE journals (
  -- 식별
  id                UUID          PRIMARY KEY
  user_id           UUID          REFERENCES users(id)

  -- 연결
  question_id       VARCHAR(50)   -- DQ_001_001 형식
  core_bible_id     VARCHAR(10)   -- CORE_001 형식
  chapter_number    INTEGER       -- 1~100

  -- 내용
  title             VARCHAR(200)
  content           TEXT          NOT NULL    -- 묵상 내용
  raw_feeling       TEXT                      -- 날것의 감정 (선택)
  is_honest         BOOLEAN       DEFAULT true -- 포장 없이 썼는가

  -- 메타
  question_text     TEXT          -- 받은 질문 스냅샷 (질문이 바뀌어도 기록 유지)
  awakening_stage   INTEGER       -- 작성 당시 단계

  -- Wisdom
  wisdom_pt_earned  INTEGER       DEFAULT 0
  wisdom_reason     VARCHAR(100)  -- 포인트 부여 이유

  -- 공개 설정
  is_shared         BOOLEAN       DEFAULT false
  shared_at         TIMESTAMP     NULL

  -- 공통
  created_at        TIMESTAMP     DEFAULT now()
  updated_at        TIMESTAMP     DEFAULT now()
  deleted_at        TIMESTAMP     NULL
)
```

**인덱스:**
```sql
INDEX idx_journals_user ON journals(user_id)
INDEX idx_journals_chapter ON journals(chapter_number)
INDEX idx_journals_question ON journals(question_id)
```

---

## TABLE 03 — prayers (기도 기록)

**목적:** 기도 내용, 응답 여부, 기도 흔적 보존  
**헌법 연결:** ENGINE 05 (Repentance), ENGINE 04 (Relationship)

```sql
TABLE prayers (
  -- 식별
  id                UUID          PRIMARY KEY
  user_id           UUID          REFERENCES users(id)

  -- 연결
  journal_id        UUID          REFERENCES journals(id) NULL  -- 묵상과 연결
  repentance_id     UUID          REFERENCES repentances(id) NULL

  -- 기도 내용
  prayer_type       VARCHAR(30)   -- 'thanksgiving' | 'repentance' | 'intercession' | 'petition' | 'praise'
  content           TEXT          NOT NULL
  is_answered       BOOLEAN       DEFAULT false
  answered_at       TIMESTAMP     NULL
  answer_note       TEXT          NULL        -- 응답 기록

  -- 음성 기도 (향후)
  audio_url         TEXT          NULL
  duration_seconds  INTEGER       NULL

  -- 공통
  created_at        TIMESTAMP     DEFAULT now()
  updated_at        TIMESTAMP     DEFAULT now()
  deleted_at        TIMESTAMP     NULL
)
```

**기도 유형:**
```
thanksgiving  — 감사 기도
repentance    — 회개 기도
intercession  — 중보 기도
petition      — 간구 기도
praise        — 찬양/경배
```

---

## TABLE 04 — repentances (회개 기록)

**목적:** 회개의 전체 흐름 추적 (인식 → 고백 → 전환 → 기록)  
**헌법 연결:** ENGINE 05 (Repentance Engine), LAW 06 (Legacy)

```sql
TABLE repentances (
  -- 식별
  id                UUID          PRIMARY KEY
  user_id           UUID          REFERENCES users(id)

  -- 연결
  journal_id        UUID          REFERENCES journals(id) NULL
  question_id       VARCHAR(50)   NULL

  -- 회개 흐름 단계
  stage             VARCHAR(20)   NOT NULL
  -- 'awareness'   : 인식 — "나는 무언가를 잘못했다"
  -- 'confession'  : 고백 — "하나님 앞에서 말한다"
  -- 'turning'     : 전환 — "방향을 바꾼다"
  -- 'recorded'    : 기록 — "Legacy에 남긴다"
  -- 'restored'    : 회복 — "관계가 회복되었다"

  -- 내용
  sin_area          VARCHAR(100)  -- 회개하는 영역
  confession_text   TEXT          NOT NULL    -- 고백 내용
  turning_plan      TEXT          NULL        -- 전환 계획 (구체적 행동)
  restored_note     TEXT          NULL        -- 회복 기록

  -- 반복 패턴 추적
  is_recurring      BOOLEAN       DEFAULT false
  recurrence_count  INTEGER       DEFAULT 1   -- 같은 영역 회개 횟수
  parent_id         UUID          NULL        -- 같은 영역 이전 회개 연결

  -- Wisdom
  wisdom_pt_earned  INTEGER       DEFAULT 0

  -- 공통
  created_at        TIMESTAMP     DEFAULT now()
  updated_at        TIMESTAMP     DEFAULT now()
  deleted_at        TIMESTAMP     NULL        -- 회개 기록은 삭제하지 않음
)
```

**회개 반복 패턴 활용:**
- `is_recurring = true` 이고 `recurrence_count >= 3` 이면 → 깊은 씨름 질문 제공
- 같은 `sin_area`의 반복은 Discernment Engine에 전달

---

## TABLE 05 — obediences (순종 기록)

**목적:** 현실 퀘스트 실행 여부 및 순종의 흔적 보존  
**헌법 연결:** ENGINE 06 (Obedience Engine), LAW 07 (현실 순종 최고 가치)

```sql
TABLE obediences (
  -- 식별
  id                UUID          PRIMARY KEY
  user_id           UUID          REFERENCES users(id)

  -- 연결
  journal_id        UUID          REFERENCES journals(id) NULL
  question_id       VARCHAR(50)   NULL
  chapter_number    INTEGER       NULL

  -- 퀘스트 내용
  quest_text        TEXT          NOT NULL    -- 현실 퀘스트 내용 (스냅샷)
  custom_quest      TEXT          NULL        -- 플레이어가 직접 만든 퀘스트

  -- 실행 여부
  status            VARCHAR(20)   DEFAULT 'committed'
  -- 'committed'   : 결심 (오늘 하겠다고 결단)
  -- 'in_progress' : 진행 중
  -- 'done'        : 완료
  -- 'failed'      : 실패 (실패도 기록)
  -- 'deferred'    : 연기 (이유 기록)

  committed_at      TIMESTAMP     NULL
  completed_at      TIMESTAMP     NULL
  deferred_reason   TEXT          NULL

  -- 실행 흔적
  execution_note    TEXT          NULL        -- 실행 후 느낌
  difficulty_level  INTEGER       NULL        -- 1~5 (얼마나 불편했는가)

  -- Wisdom
  wisdom_pt_earned  INTEGER       DEFAULT 0
  -- 결심: 0점, 완료: 최대 50점, 실패+기록: 15점

  -- 공통
  created_at        TIMESTAMP     DEFAULT now()
  updated_at        TIMESTAMP     DEFAULT now()
  deleted_at        TIMESTAMP     NULL
)
```

**Wisdom Point 부여 기준:**
```
committed(결심)        :  0점
in_progress(진행)      :  5점
done(완료)             : 35~50점 (difficulty_level에 따라)
failed + note(실패기록) : 15점 (실패도 기록이다)
deferred(연기)         :  0점
```

---

## TABLE 06 — wisdoms (Wisdom 획득 기록)

**목적:** Wisdom Point 획득 이력 및 누적 관리  
**헌법 연결:** ENGINE 02 (Wisdom Engine), LAW 05 (Wisdom 본질)

```sql
TABLE wisdoms (
  -- 식별
  id                UUID          PRIMARY KEY
  user_id           UUID          REFERENCES users(id)

  -- 출처 (어디서 획득했는가)
  source_type       VARCHAR(30)   NOT NULL
  -- 'journal'      : 묵상 기록
  -- 'obedience'    : 현실 퀘스트 완료
  -- 'repentance'   : 회개 기록
  -- 'prayer'       : 기도 기록
  -- 'legacy_write' : Legacy 작성
  -- 'streak_bonus' : 연속 기록 보너스

  source_id         UUID          NULL        -- 출처 레코드 ID

  -- 포인트
  points_earned     INTEGER       NOT NULL
  total_after       INTEGER       NOT NULL    -- 획득 후 누적 포인트
  reason            VARCHAR(200)  NOT NULL    -- 부여 이유 (기록)

  -- 연결
  chapter_number    INTEGER       NULL
  question_id       VARCHAR(50)   NULL

  -- 공통
  created_at        TIMESTAMP     DEFAULT now()
)
```

**누적 Wisdom 레벨 (향후 설계):**
```
0    ~ 500   : 여행자 (Traveler)
501  ~ 1500  : 동행자 (Companion)
1501 ~ 3000  : 씨름꾼 (Wrestler)
3001 ~ 5000  : 동행자 (Walker)
5001+        : 증인 (Witness)
```

---

## TABLE 07 — legacies (Legacy 기록)

**목적:** 플레이어의 영적 자서전. 삭제 없이 평생 보존  
**헌법 연결:** ENGINE 07 (Legacy Engine), LAW 06 (Legacy 본질)

```sql
TABLE legacies (
  -- 식별
  id                UUID          PRIMARY KEY
  user_id           UUID          REFERENCES users(id)

  -- Legacy 유형
  legacy_type       VARCHAR(30)   NOT NULL
  -- 'encounter'    : 만남 — 어떤 말씀에서 하나님을 만났는가
  -- 'question'     : 질문 — 어떤 질문이 나를 흔들었는가
  -- 'obedience'    : 순종 — 무엇을 실행했는가
  -- 'failure'      : 실패 — 무엇을 못했는가
  -- 'transformation': 변화 — 나는 어떻게 달라졌는가
  -- 'testimony'    : 간증 — 완성된 이야기

  -- 내용
  title             VARCHAR(200)
  content           TEXT          NOT NULL
  reflection        TEXT          NULL        -- 돌아보며 쓰는 반성/통찰

  -- 연결
  journal_id        UUID          REFERENCES journals(id) NULL
  repentance_id     UUID          REFERENCES repentances(id) NULL
  obedience_id      UUID          REFERENCES obediences(id) NULL
  chapter_number    INTEGER       NULL
  bible_reference   VARCHAR(100)  NULL        -- 연관 성경 구절

  -- 시간 맥락
  life_season       VARCHAR(50)   NULL        -- "2026년 회사 위기", "결혼 준비 중" 등
  age_at_writing    INTEGER       NULL

  -- 공개 설정
  is_shared         BOOLEAN       DEFAULT false
  shared_at         TIMESTAMP     NULL
  is_testimony      BOOLEAN       DEFAULT false -- 간증으로 지정되었는가

  -- 중요도
  is_milestone      BOOLEAN       DEFAULT false -- 이정표 Legacy
  milestone_tag     VARCHAR(100)  NULL

  -- 공통 (Legacy는 deleted_at 사용 안 함 — 절대 삭제 불가)
  created_at        TIMESTAMP     DEFAULT now()
  updated_at        TIMESTAMP     DEFAULT now()
  -- deleted_at 없음 — Legacy는 영구 보존
)
```

**중요:** Legacy 테이블에는 `deleted_at`이 없다.  
헌법 LAW 06에 따라 모든 Legacy는 영구 보존된다.

---

## TABLE 08 — daily_questions (일일 질문 발송 기록)

**목적:** 플레이어에게 발송된 질문 이력 및 응답 여부 추적

```sql
TABLE daily_questions (
  -- 식별
  id                UUID          PRIMARY KEY
  user_id           UUID          REFERENCES users(id)

  -- 질문
  question_id       VARCHAR(50)   NOT NULL    -- DQ_001_001 형식
  question_text     TEXT          NOT NULL    -- 발송 시점 스냅샷

  -- 발송
  sent_at           TIMESTAMP     NOT NULL
  scheduled_for     DATE          NOT NULL    -- 어느 날짜의 질문인가

  -- 응답
  is_responded      BOOLEAN       DEFAULT false
  responded_at      TIMESTAMP     NULL
  response_type     VARCHAR(30)   NULL
  -- 'journal'      : 묵상으로 응답
  -- 'repentance'   : 회개로 응답
  -- 'obedience'    : 순종으로 응답
  -- 'prayer'       : 기도로 응답
  -- 'skipped'      : 건너뜀

  -- 연결
  journal_id        UUID          NULL
  awakening_stage   INTEGER       NOT NULL    -- 발송 당시 단계

  -- 공통
  created_at        TIMESTAMP     DEFAULT now()
)
```

---

## TABLE 09 — chapters (챕터 진행 상황)

**목적:** 플레이어의 CORE_BIBLE_100 진행 상황 추적

```sql
TABLE chapters (
  -- 식별
  id                UUID          PRIMARY KEY
  user_id           UUID          REFERENCES users(id)
  chapter_number    INTEGER       NOT NULL    -- 1~100

  -- 진행 상태
  status            VARCHAR(20)   DEFAULT 'locked'
  -- 'locked'       : 잠김
  -- 'available'    : 열림
  -- 'in_progress'  : 진행 중
  -- 'completed'    : 완료

  -- 완료 기록
  started_at        TIMESTAMP     NULL
  completed_at      TIMESTAMP     NULL
  completion_count  INTEGER       DEFAULT 0   -- 몇 번 완료했는가 (반복 가능)

  -- Wisdom
  wisdom_pt_earned  INTEGER       DEFAULT 0

  -- 공통
  created_at        TIMESTAMP     DEFAULT now()
  updated_at        TIMESTAMP     DEFAULT now()

  UNIQUE(user_id, chapter_number)
)
```

---

# PART 3. 관계도 (ERD 개요)

```
users
  ├── journals         (1:N)
  ├── prayers          (1:N)
  ├── repentances      (1:N)
  ├── obediences       (1:N)
  ├── wisdoms          (1:N)
  ├── legacies         (1:N)
  ├── daily_questions  (1:N)
  └── chapters         (1:N)

journals
  ├── prayers          (1:N, optional)
  ├── repentances      (1:N, optional)
  ├── obediences       (1:N, optional)
  └── legacies         (1:N, optional)

repentances
  └── repentances      (자기 참조, parent_id로 반복 패턴 연결)
```

---

# PART 4. 주요 쿼리 패턴 (설계 참고)

## 4.1 플레이어 대시보드 데이터

```sql
-- 플레이어 현황 조회
SELECT
  u.display_name,
  u.awakening_stage,
  u.total_wisdom_pt,
  u.streak_days,
  COUNT(DISTINCT j.id) as total_journals,
  COUNT(DISTINCT o.id) FILTER (WHERE o.status = 'done') as quests_done,
  COUNT(DISTINCT r.id) as total_repentances,
  COUNT(DISTINCT l.id) as total_legacies
FROM users u
LEFT JOIN journals j ON j.user_id = u.id AND j.deleted_at IS NULL
LEFT JOIN obediences o ON o.user_id = u.id AND o.deleted_at IS NULL
LEFT JOIN repentances r ON r.user_id = u.id AND r.deleted_at IS NULL
LEFT JOIN legacies l ON l.user_id = u.id
WHERE u.id = $user_id
GROUP BY u.id;
```

## 4.2 오늘의 질문 선택

```sql
-- 오늘 아직 응답 안 한 질문 확인
SELECT dq.*
FROM daily_questions dq
WHERE dq.user_id = $user_id
  AND dq.scheduled_for = CURRENT_DATE
  AND dq.is_responded = false
LIMIT 1;
```

## 4.3 Legacy 타임라인

```sql
-- 플레이어의 Legacy 타임라인
SELECT
  l.*,
  j.content as journal_content,
  r.confession_text,
  o.quest_text
FROM legacies l
LEFT JOIN journals j ON j.id = l.journal_id
LEFT JOIN repentances r ON r.id = l.repentance_id
LEFT JOIN obediences o ON o.id = l.obedience_id
WHERE l.user_id = $user_id
ORDER BY l.created_at DESC;
```

---

# PART 5. MVP 스코프 (DB 관점)

## MVP에서 필요한 테이블 (우선순위)

| 우선순위 | 테이블 | 이유 |
|---------|--------|------|
| P0 | users | 없으면 아무것도 안 됨 |
| P0 | daily_questions | 핵심 엔진 |
| P0 | journals | 응답 저장 |
| P1 | repentances | 회개 흐름 |
| P1 | obediences | 현실 퀘스트 |
| P1 | wisdoms | Wisdom 추적 |
| P1 | legacies | 영구 기록 |
| P2 | prayers | 기도 기록 |
| P2 | chapters | 챕터 진행 |

---

**버전:** v1.0  
**다음 단계:** REPENTANCE_ENGINE.md 설계
