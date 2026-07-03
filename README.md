# THE WAY — 하나님을 찾아가는 여정

> **게임은 수단이다. 회심은 목적이다.**

한 영혼이 하나님을 찾아가고, 하나님을 만나고, 하나님의 뜻을 깨닫고, 순종하며 살아가는 여정을 게임의 형태로 경험하는 플랫폼.

---

## 프로젝트 개요

THE WAY는 성경 기반 영적 성장 게임이다. 단순한 성경 퀴즈나 교육 앱이 아니라, 플레이어가 성경 역사 속으로 들어가 직접 선택하고, 하나님의 마음을 발견하고, 삶이 변화되는 경험을 설계한다.

**최종 목적:** 성경을 *아는* 것이 아니라 — 하나님을 *만나고* 예수님을 *따르게* 되는 것.

---

## 기술 스택

| 영역 | 기술 |
|------|------|
| Framework | Next.js 14 (App Router) |
| 3D 렌더링 | Pure Three.js (R3F 미사용) |
| 스타일링 | Tailwind CSS |
| 상태 관리 | localStorage (추후 DB 연동) |
| 배포 | Vercel |

---

## 현재 구현 상태

### 완료된 챕터

| 챕터 | 내용 | 상태 |
|------|------|------|
| **Chapter 0** | 심판대 — 3D 시네마틱 프롤로그 | ✅ 완료 |
| **Chapter 1** | 엔게디 동굴 — 텍스트 기반 스토리 | ✅ 완료 |

### Chapter 0 씬 플로우
`awakening` → `cliff` → `encounter` → `question` → `result` → `wilderness` → Chapter 1

### 구현된 AAA 폴리시
- 워킹 애니메이션 (pivot-based 팔/다리/발 스윙)
- 시네마틱 카메라 (씬별 다른 앵글)
- 카메라 쉐이크 (씬 전환 시)
- Web Audio API 앰비언트 사운드
- 씬 페이드 + 비네트 효과
- 플로팅 조이스틱 (모바일)
- Faith 포인트 localStorage 영속
- Chapter 0→1 시네마틱 전환

---

## 라우트 구조

```
/                   홈 (챕터 선택, 오늘의 말씀)
/chapter/0          Chapter 0: 심판대 (3D)
/chapter/[id]       Chapter 1+: 텍스트 스토리
/minigame/[id]      암송 미니게임
/collection         말씀 카드 컬렉션
```

---

## 핵심 엔진 시스템

THE WAY는 15개 엔진 위에서 작동한다.

**최상위:** Encounter Engine (하나님과의 만남)

**핵심 9대:** Divine Question · God's Heart · God's Will · Wisdom · Repentance · Obedience · Legacy · Providence · Silence

**참여·성장:** Biblical Immersion · Player State · Reality Quest · Love · Calling · Spiritual Biography

---

## 문서 구조

```
docs/
├── THE_WAY_MASTER_DESIGN.md        마스터 설계 문서 (플랫폼 전체)
├── CORE_BIBLE_100.md               핵심 성경 사건 100개 콘텐츠 DB
├── CORE_BIBLE_100_CHAT_INSTRUCTION.md  콘텐츠 제작 지시서
├── 00-core/
│   ├── THE_WAY_CORE_BIBLE.md       핵심 신학 원칙
│   ├── THE_WAY_CONSTITUTION.md     헌법 (불변 원칙)
│   ├── DIVINE_QUESTION_ENGINE.md   하나님의 질문 엔진
│   └── AWAKENING_ENGINE.md
├── 01-vision/GAME_VISION.md
├── 02-world/WORLD_BIBLE.md
├── 03-character/CHARACTER_BIBLE.md
├── 04-quest/QUEST_SYSTEM.md
├── 05-faith/FAITH_ENGINE.md
├── 05-chapters/
│   ├── CHAPTER_0_JUDGMENT.md
│   └── CHAPTER_1_ENGEDI_CAVE.md
├── 06-ui/UI_UX_GUIDE.md
├── 07-art/ART_DIRECTION.md
└── 08-system/TECH_ROADMAP.md
```

---

## CORE_BIBLE_100 현황

| 상태 | 수량 |
|------|------|
| ✅ 완성 | 29개 (001~029) |
| 🔄 제작 중 | 71개 (030~100) |

완성된 사건: 아담~요셉 (창세기) · 모세~십계명 (출애굽기) · 사울~엘리야 (사무엘/열왕기) · 시편/잠언 · 예수님 탄생~부활 (복음서) · 바울 회심·선교 · 새 하늘과 새 땅

---

## 개발 시작

```bash
npm install
npm run dev
```

[http://localhost:3000](http://localhost:3000) 에서 확인.

---

## 헌법 (THE WAY CONSTITUTION v1.0 FINAL)

**상태:** ✅ 확정 — 모든 개발의 기준이 되는 문서

**핵심 14개 불변 법칙:**
1. **여정 우선** — THE WAY는 성경 RPG가 아니라 영혼의 여정 플랫폼
2. **수단과 목적** — 게임은 수단이다. 회심과 변화가 목적이다
3. **만남 우선** — 성경 지식 전달보다 하나님과의 만남이 우선
4. **여정 구조** — 질문 → 깨달음 → 회개 → 순종 → 변화 → 기록
5. **Wisdom의 본질** — Wisdom Point는 경험치가 아니라 삶에 적용한 흔적
6. **Legacy의 본질** — Legacy는 영적 자서전이고, 모든 기록은 언젠가 간증이 된다
7. **현실 순종 최고 가치** — 현실 순종이 게임 내 성취보다 높은 가치를 가진다
8. **참여자 정체성** — 플레이어는 관객이 아니라 역사 속에서 질문받는 참여자
9. **수렴의 법칙** — 모든 시스템은 결국 하나님 사랑, 이웃 사랑으로 수렴
10. **최종 목적** — 플레이어가 예수 그리스도를 만나 회심하고 평생 하나님을 알아가도록 돕는 것
11. **성경 우선** — 모든 질문, 체험, 깨달음, 시스템은 성경에 의해 검증된다
12. **성령 동행** — 성령의 역사를 인정하되, 모든 체험은 성경 안에서 분별한다
13. **겸손한 분별** — 체험만 믿는 것도 교만이고, 내 해석만 믿는 것도 교만이다
14. **고난과 방해** — 하나님을 따르는 길에는 고난과 방해가 존재한다

**상세:** [THE_WAY_CONSTITUTION.md](docs/00-core/THE_WAY_CONSTITUTION.md) 참조

---

*Contact: nroadcompany@gmail.com*
