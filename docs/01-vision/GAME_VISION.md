# THE WAY — Game Vision Document

**Version:** PRE-PRODUCTION v1  
**Project Owner:** 성재  
**Priority:** HIGH  
**Last Updated:** 2026-06-08

---

## 1. Executive Summary

**THE WAY** is an AAA-quality mobile 3D RPG that places players inside biblical narrative, not as prophets or kings, but as ordinary people making moral choices in extraordinary circumstances.

This is **not** a Bible app, quiz game, or visual novel. It is a **real game** where faith, consequence, and character growth matter.

---

## 2. Core Design Pillars

### 2.1 Game-First Approach
- **Gameplay comes before theology**
- Mechanics must be engaging regardless of biblical setting
- Fun is the primary metric, not religious education
- Comparison: *Original Sin* (video game), not *The Chosen* (TV show)

### 2.2 Immersion Through Presence
- Player is an **unnamed soldier in biblical times**, not a prophet
- You witness, you choose, you live with consequences
- The game asks: *"What would you do?"* — not *"What should you believe?"*

### 2.3 Meaningful Agency
- **Every choice matters**
  - Alters NPC relationships (trust/fear/respect)
  - Changes Faith score trajectory
  - Unlocks different dialogue paths
  - Opens/closes future mission options
- No "correct" answer — only *your* answer

### 2.4 Spiritual Growth as Mechanics
- Faith isn't abstract — it's a measurable, evolving system
- Emotions drive decisions, not exposition
- Moral dilemmas are interactive puzzles, not cutscenes

---

## 3. Target Audience

| Segment | Age | Device | Session |
|---------|-----|--------|---------|
| **Primary** | 18-35 | iOS/Android flagship | 30-90 min |
| **Secondary** | 35-50 | iPad | 45-120 min |

- **Mindset:** Wants *meaningful* games, not casual time-killers
- **Comparison Players:** *Life is Strange*, *The Witcher 3*, *Disco Elysium* fans
- **Tolerance:** Slow burn narrative, no hand-holding, faith/morality themes

---

## 4. Core Loop: THE WAY ENGINE

Every quest follows this 4-act structure:

```
SITUATION → CHOICE → RESULT → REVELATION → GROWTH
```

### Act 1: SITUATION
- World state presented
- Moral tension introduced
- Stakes clarified
- NPC relationships established

**Example:** "Saul enters the cave. Your commander whispers: we can kill him now. Do you believe in David?"

### Act 2: CHOICE
- Multiple paths (3-5 options)
- No binary morality (no clear "good/bad")
- Each choice reveals character
- Consequences are hidden initially

### Act 3: RESULT
- Immediate aftermath shown
- NPC reactions to your choice
- Relationship values update
- Story pivots based on decision

### Act 4: REVELATION
- *Why* the choice mattered (spiritual insight)
- Bible verse contextualizes decision
- Character growth reflected
- Next quest hook introduced

---

## 5. MVP Scope: Chapter 1 — Engedi Cave

### 5.1 Setting
- **Location:** En-gedi cave system, 1010 BCE
- **Duration:** ~3 hours of gameplay
- **Weather:** Desert heat, cave humidity, dawn ambiguity
- **Atmosphere:** Tense, contemplative, claustrophobic

### 5.2 Central Narrative
**The Question:** "Should we kill the man pursuing us?"

A refugee group shelters in En-gedi caves. King Saul—your pursuer—enters unexpectedly. Your commander David is defenseless. His most trusted warriors (including you) face a moment of choice:

- **Can you kill your enemy when he's helpless?**
- **Does might make right?**
- **Can you trust God's judgment over your own justice?**

### 5.3 Playable Character
**Role:** Unnamed soldier in David's militia

**Background:**
- Escaped Saul's persecution with David's band
- Witnessed David's mercy & cunning
- Has doubts about David's methods
- Facing first major faith test

**Arc:** From cynicism → cautious faith → decision point

### 5.4 Key NPCs

| NPC | Role | Dynamic |
|-----|------|---------|
| **David** | Military leader, spiritual mentor | Relationship reveals character |
| **Abishai** | Hot-blooded lieutenant, pro-violence | Pushes you toward revenge |
| **Jonadab** | Loyal scout, skeptical mystic | Questions faith alongside you |
| **Saul** (silent) | Enemy, human, vulnerable | Presence without dialogue |
| **Doeg** (cameo) | Spy in Saul's entourage | Hidden threat |

---

## 6. Core Systems (MVP)

### 6.1 Faith Engine
**Stat:** 0-100 (starts at 50 "wavering")

**Increases (Trust/Sacrifice/Honesty):**
- Choose mercy over revenge (+8)
- Sacrifice personal gain for group (+5)
- Speak truth despite cost (+6)
- Trust David's leadership (+4)

**Decreases (Fear/Greed/Deception):**
- Choose self-preservation (-7)
- Betray confidence (-10)
- Prioritize loot over ethics (-5)
- Doubt David's judgment (-3)

**Thresholds:**
- **0-25:** Cynical path (separate ending)
- **26-49:** Doubter path (neutral ending)
- **50-74:** Seeker path (redemptive ending)
- **75-100:** Believer path (transformative ending)

### 6.2 Relationship Matrix

**Tracks with each NPC:**
- Trust (0-100): Do they believe your word?
- Respect (0-100): Do they value your judgment?
- Fear (0-100): Do they see you as threat?

**Impacts:**
- Dialogue options available
- NPC behavior toward you
- Mission success chances
- Ending outcome

### 6.3 Emotion System

Player emotional state (affects decision bias):

| Emotion | Bias | Induced By |
|---------|------|-----------|
| **Fear** | Cautious, hesitant, self-protective | Danger, ambiguity |
| **Greed** | Opportunistic, risk-taking | Treasure, power hints |
| **Pride** | Defiant, competitive, stubborn | Disrespect, challenge |
| **Faith** | Trusting, collaborative, patient | Religious moments, prayer |
| **Hope** | Optimistic, generous, ambitious | Progress, redemption hints |
| **Love** | Protective, sacrificial, loyal | NPC vulnerability, bonds |
| **Anger** | Aggressive, impulsive, vengeful | Injustice, loss |

**Mechanic:** Player emotion affects available dialogue and choice bias (visual UI hints).

### 6.4 Dynamic Dialogue
- **340+ dialogue lines** (branching by: choice history, faith level, emotion state, relationships)
- **5 ending variants** based on:
  - Final Faith score
  - Relationship state with David
  - Critical choice in cave moment
  - Codex unlock path

---

## 7. Content Structure

### Quests (Major Scenes)
1. **Arrival** — Escape to En-gedi, scout cave
2. **Tension** — Saul enters, choice moment arrives
3. **Consequence** — Immediate NPC reactions
4. **Reflection** — Private moments reveal impact
5. **Resolution** — Ending revealed based on choices

### Side Content (Deepening)
- **Codex entries** — Unlock biblical context, character backstory
- **Prayer moments** — Optional Faith check points
- **Combat vignettes** — Small skirmishes that test values

---

## 8. Tech Stack (Definitive)

### Engine
- **Three.js** (WebGL) or **Babylon.js** for 3D rendering
- **Next.js 14+** framework layer
- **TypeScript** type safety

### Art Assets
- **Semi-realistic** character models (stylized realism)
- **Cinematic** lighting & cinematography
- **Dark gold + cream + navy** color palette
- **Photogrammetry** for environment detail

### Audio
- **Voice acting** for major dialogue
- **Adaptive music** (Wwise-style)
- **Environmental ambience**

### Data
- **Supabase** (PostgreSQL) for quest/choice/relationship tracking
- **Local save** option for offline play
- **Cloud sync** for cross-device

---

## 9. Design Values

### What We Are
- ✅ Meaningful moral choices
- ✅ Character-driven narrative
- ✅ Faith as gameplay mechanic
- ✅ Slow-burn, contemplative pacing
- ✅ Player agency paramount

### What We Are NOT
- ❌ Religious education disguised as game
- ❌ Preachy, didactic, evangelical
- ❌ Simple "good/evil" morality
- ❌ Quick-time events, button mashing
- ❌ Anime cuteness, childish UI
- ❌ Gacha, pay-to-win, FOMO mechanics

---

## 10. Success Metrics

### Player Engagement
- **Session length:** Avg 45-90 min
- **Completion rate:** >65% finish Chapter 1
- **Replay rate:** >30% replay for alternate endings
- **Dialogue readthrough:** >85% read most dialogue (no skipping)

### Critical Reception
- **Review score target:** 8.5+ / 10
- **Core audience approval:** "Feels like a real game, not a sermon"
- **Faith/philosophy discussion:** Reddit, Twitter engagement about choices

### Business
- **Download target (6 months):** 100K+
- **Retention (D7):** 35%+
- **IAP model:** Optional cosmetics only (NO pay-to-win)

---

## 11. Competitive Positioning

| Game | Why Study | What NOT to Copy |
|------|-----------|------------------|
| *Life is Strange* | Emotional branching, consequence weight | Teenage angst tone |
| *The Witcher 3* | NPC depth, moral ambiguity | Combat-first design |
| *Disco Elysium* | Skill system affecting choices | Text-heavy, no action |
| *Detroit: Become Human* | Chapter structure, real-time consequence | Cinematic over gameplay |
| *Genshin Impact* | 3D mobile RPG excellence, combat flow | Gacha predation |

---

## 12. Next Steps

1. **WORLD_BIBLE.md** — En-gedi geography, 1010 BCE historical setting, daily life
2. **CHARACTER_BIBLE.md** — David, Abishai, Jonadab, Saul profiles & arcs
3. **QUEST_SYSTEM.md** — 5-quest structure with branching logic
4. **FAITH_ENGINE.md** — Score calculation, emotion interaction, relationship math
5. **UI_GUIDE.md** — Mockups for inventory, quest log, faith dashboard, codex
6. **ART_DIRECTION.md** — Mood boards, color palettes, cinematic composition
7. **ROADMAP.md** — Sprint breakdown, milestone tracking, launch timeline

---

## 13. Design Principles (Golden Rules)

> *"Every system must pass the 'Real Game' test: Would this feature exist if this wasn't a Bible game?"*

1. **Gameplay Justifies Theme** — Not theme justifying gameplay
2. **Choice = Consequence** — No arbitrary morality meters
3. **Show, Don't Tell** — Let players discover meaning through play
4. **Emotion Over Exposition** — Feel the dilemma, don't read about it
5. **Faith is Earned** — Players must choose it, not be told to have it

---

**Status:** Ready for WORLD_BIBLE.md phase
**Confidence:** HIGH
**Risk:** Scope creep on voice acting budget (mitigation: phased implementation)

