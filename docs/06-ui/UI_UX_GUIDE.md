# THE WAY — UI/UX GUIDE

**Standard:** AAA Mobile RPG (Genshin, Witcher 3, Life is Strange reference level)  
**Design Language:** Dark Gold + Navy + Cream, cinematic, minimal  
**Philosophy:** UI should disappear; story should take center stage

---

## CORE UI ELEMENTS

### Main Menu
- Logo (THE WAY, cross-inspired symbol)
- New Game / Continue / Settings
- Single large START button (no overwhelming options)
- Background: En-gedi cinematic (subtle, looping)

### HUD (In-Game)
**Always Visible:**
- Faith Meter (bottom left, circular)
- Awakening Stage (if needed, subtle)
- Current objective (top center, small)

**Fade on Demand:**
- Settings button (pause menu)
- Time display (camp time)
- Health/Status (if needed, minimal)

### Dialogue UI
- Character portrait (left side, expressive)
- Dialogue text (center, large, readable)
- Three visible options (emotional hint via color)
- Unmissable key info (spiritual context)

### Pause Menu
- Settings (audio, brightness, language)
- Save/Load
- Quit to menu
- Codex (if unlocked)

### Codex Menu
- Unlocked entries (Bible verses, world context, spiritual insights)
- Auto-populate on choices/discoveries
- Readable 5-10 min before continuing

### Ending Screens
- Unique visual per ending (5 variants)
- Epilogue text
- Credits roll
- Post-credits option: New Game+

---

## FAITH METER DESIGN

**Visual:** Circular progress (gold outline, dark inside)

**Colors:**
- 0-25: Red (apostate, turning away)
- 26-50: Orange (doubter, wavering)
- 51-75: Gold (believer, growing)
- 76-100: Bright Gold (faithful, transformed)

**Interaction:**
- Click to see current stage
- No clicking required (passive info)
- Shows trend arrow (up/down)

---

## DIALOGUE OPTIONS STYLING

**Option Display:**

```
[FEAR emotion - Blue]     [FAITH emotion - Gold]    [GREED - Orange]
┌─────────────────────────────────────────────────────────────┐
│ A) Kill him now                                              │
│    (Abishai nods)                                           │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ B) Spare him. He's God's anointed                            │
│    (Jonadab pauses, considering)                            │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ C) Get David. He should decide                              │
│    (Neutral option)                                         │
└─────────────────────────────────────────────────────────────┘
```

**Emotional Hint:**
- Color bar on left shows current emotion bias
- Player sees which option aligns with active emotion
- But all options remain available

---

## RELATIONSHIP DASHBOARD (Optional, Expanded)

**If accessed:**
```
DAVID               ABISHAI             JONADAB
Trust: 75 ↑         Trust: 50 →          Trust: 65 ↑
Respect: 85         Respect: 40 ↓        Respect: 65
Fear: 5             Fear: 20             Fear: 0

Recent: "Follow me to the water"
→ Shows last interaction with this NPC
```

---

## CODEX ENTRY FORMAT

```
═════════════════════════════════════
TITLE: The Desires of the Heart
CATEGORY: Divine Questions
═════════════════════════════════════

TEXT:
"What do you want? This simple question
reveals everything about what controls
your choices. Not what you say you want.
What you actually pursue.

In the moment of crisis, your true desire
becomes visible."

SCRIPTURE REFERENCE:
"For as a man thinks in his heart, so is he"
— Proverbs 23:7

═════════════════════════════════════
```

---

## SAVE/LOAD SYSTEM

**Save Points:**
- After major quests (automatic)
- Before central choices (manual save recommended)
- At chapter transitions

**Load Shows:**
- Character name
- Faith score
- Awakening stage
- Time played
- Last location

**No manual saves during cinematics** (no save/load in Chapter 0, middle of cave choice)

---

## SETTINGS MENU

**Audio:**
- Master volume
- Music volume
- SFX volume
- Voice volume (language toggle)

**Visuals:**
- Brightness
- Motion blur (on/off)
- Subtitle size
- UI scale

**Language:**
- Korean (default)
- English
- Future: Chinese, Japanese, Spanish, French, German

**Accessibility:**
- Colorblind modes
- Font scaling
- Controller/keyboard toggle
- Difficulty (if applicable)

---

## LOADING SCREENS

**Design:** Cinematic stills from En-gedi

**Text:**
- Scripture verses (rotate different ones)
- Spiritual questions (reinforce themes)
- No "tips" (immersion over instruction)

**Duration:** 3-5 seconds (optimized load times)

---

## ERROR HANDLING

**If system error:**
- Friendly message (not technical jargon)
- Offer to load last save
- Support contact info (Discord/email)

**If game-breaking bug:**
- Auto-save before major changes
- Ability to revert to last stable state

---

## MOBILE-SPECIFIC CONSIDERATIONS

**Aspect Ratios:**
- 16:9 (standard)
- 19.5:9 (modern tall phones)
- 21:9 (ultra-wide)
All supported without letterboxing

**Touch Controls:**
- Swipe to select dialogue
- Tap to confirm
- Pinch for zoom (if map needed)
- No holding buttons (accessibility)

**Network:**
- Single-player offline first
- No internet required
- Cloud save optional

---

## VISUAL HIERARCHY

**Importance Levels:**
1. **Story/Dialogue** (dominates screen)
2. **Character reactions** (secondary)
3. **Environmental storytelling** (background)
4. **UI** (minimal, fades unless needed)
5. **Stats** (invisible unless clicked)

**Goal:** Player forgets they're playing a "game," forgets UI exists

---

## COLOR CODING SUMMARY

**Dark Navy (#0F1C2E)** — Mystery, depth, divine otherness  
**Deep Gold (#C9A84C)** — Redemption, presence, value  
**Cream (#FDF6E3)** — Warmth, grace, humanity  

**Accent Colors (emotion):**
- Blue (Fear) — Caution, thinking
- Orange (Greed) — Desire, appetite
- Red (Anger) — Action, passion
- Gold (Faith) — Trust, certainty
- Green (Hope) — Forward, possibility
- Pink (Love) — Connection, care
- Purple (Pride) — Defiance, strength

---

**The UI should serve the story, never dominate it.**

