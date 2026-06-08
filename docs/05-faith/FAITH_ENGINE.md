# THE WAY — Faith Engine System

**Core Mechanic:** Faith as measurable, consequence-bearing gameplay stat  
**Scope:** Emotion system, relationship tracking, ending determination

---

## 1. Faith Score System

### 1.1 Overview

**Name:** Faith (영적 신뢰)  
**Range:** 0-100  
**Starting Value:** 50 ("wavering believer")  
**Visible To Player:** Yes (dashboard UI shows current score + trend)  
**Impacts:** NPC dialogue, mission availability, ending path, subtle gameplay hints

### 1.2 Score Brackets & Archetypes

| Score | Archetype | Mindset | Ending Path |
|-------|-----------|---------|------------|
| 0-20 | **Apostate** | "God abandoned me" | Bitter/Cynical ending |
| 21-40 | **Doubter** | "I'm not sure anymore" | Neutral/Uncertain ending |
| 41-60 | **Seeker** | "I'm trying to believe" | Open/Redemptive ending |
| 61-80 | **Believer** | "God is with me" | Hopeful/Transcendent ending |
| 81-100 | **Zealot** | "God's will is absolute" | Sacrificial/Transformative ending |

### 1.3 Score Progression Mechanics

**Increase Triggers:**
- Act with mercy toward enemy: +8
- Sacrifice for group welfare: +5-7
- Speak truth despite cost: +6
- Trust David's leadership: +4
- Pray/meditate successfully: +3
- Protect vulnerable person: +5
- Show forgiveness: +7
- Help without personal gain: +4

**Decrease Triggers:**
- Choose violence/revenge: -8
- Betray someone's confidence: -10
- Steal/loot selfishly: -6
- Lie to group: -8
- Abandon wounded soldier: -7
- Mock faith/prayer: -5
- Prioritize personal survival over group: -6
- Harm innocent: -12

**Neutral (No Change):**
- Standard military tasks
- Routine conversations
- Exploration/discovery
- Movement between locations

### 1.4 Faith Threshold Events

**At 50 (Wavering → Commitment):**
- David notices your internal struggle
- Offers confidential dialogue option: "What do you really believe?"
- Player must articulate stance (reaffirm faith or deepen doubt)

**At 25 (Believer → Doubter):**
- Jonadab approaches: "I see you're questioning..."
- Offers to discuss faith privately
- Can recommit or continue declining

**At 75 (Doubter → Believer):**
- David specifically asks you to help convince Abishai
- Shows trust in your spiritual leadership
- Unlocks "mentor" dialogue options

---

## 2. Emotion System

### 2.1 Seven Emotional States

**Definition:** Player's current emotional bias (affects available dialogue & subtle gameplay hints)

| Emotion | Trigger | Bias | Duration | Impact |
|---------|---------|------|----------|--------|
| **Fear** | Danger, ambiguity, loud noises | Cautious, evasive, defensive | 30-60 sec | Defensive dialogue options |
| **Greed** | Loot, power hints, resource scarcity | Selfish, risk-taking, short-sighted | 45-90 sec | Steal/hoard options appear |
| **Pride** | Disrespect, challenge, competition | Defiant, stubborn, aggressive | 60-120 sec | Reckless options available |
| **Faith** | Prayer, David's words, spiritual moments | Trusting, humble, patient | 45-120 sec | Wisdom options available |
| **Hope** | Progress, rescue hint, redemption clue | Optimistic, generous, ambitious | 60-90 sec | Inspiring dialogue |
| **Love** | NPC vulnerability, bonding moment | Protective, sacrificial, loyal | 90-180 sec | Self-sacrifice options |
| **Anger** | Injustice, betrayal, attack | Aggressive, impulsive, vengeful | 45-120 sec | Violent options available |

### 2.2 Emotion Display

**Visual Feedback:**
- Corner HUD icon (emoji-style, 40px)
- Brief text label ("Angry" / "Hopeful" / etc.)
- Color ring around icon indicating intensity
- Fades over time (not permanent)

**Interaction:**
- Player can see which emotion is active
- Affects which dialogue colors highlight
- Affects choice consequences (emotional choice = different outcome)

**Example Scenario:**
```
Abishai: "Kill Saul. It's the smart choice."
[ANGER emotion active: "Kill him!" option highlighted RED]
[FAITH emotion active: "Trust David's way" option highlighted GOLD]
[FEAR emotion active: "We should escape first" option highlighted BLUE]

Player chooses one. Outcome shifts based on BOTH choice AND active emotion.
```

### 2.3 Emotion Triggers in Chapter 1

**Fear Triggers:**
- First sight of Saul's army
- Hearing footsteps in cave
- Water rationing announcement
- Scout reports enemy nearby

**Greed Triggers:**
- Finding abandoned supplies
- Opportunity to steal from sleeping Saul
- Enemy weapons on ground
- "He has gold on him..."

**Pride Triggers:**
- Abishai questions your courage
- Saul insults David
- Enemy scout mocks your band
- Chance to prove yourself

**Faith Triggers:**
- David's prayer
- Sunrise moment
- Jonadab's faith talk
- Saul's vulnerable moment (test of mercy)

**Hope Triggers:**
- Scout reports escape route discovered
- David's confidence
- Friendly NPC arrives with supplies
- Prayer "answered" (coincidence, but feels divine)

**Love Triggers:**
- Wounded soldier needs care
- Young soldier shows fear
- Jonadab confides his doubts
- David shows vulnerability

**Anger Triggers:**
- Saul's forces attack
- NPC is killed
- Betrayal revealed (spy in camp)
- Memories of Saul's persecution

### 2.4 Mechanics: Emotion Duration

**Starting Duration:** 30-180 seconds (varies by emotion)  
**Fade Mechanism:** Linear decay (emotion intensity decreases over time)  
**Re-trigger:** New trigger restarts timer + adds intensity  
**Stacking:** Multiple simultaneous emotions create "compound state"  
**Compound State Examples:**
- Fear + Anger = Desperate (fight or flight mentality)
- Faith + Hope = Transcendence (spiritual breakthrough moment)
- Greed + Pride = Hubris (overconfidence)
- Love + Fear = Protective instinct

---

## 3. Relationship Matrix

### 3.1 Relationship Metrics

**Per NPC, track 3 values (0-100 each):**

1. **Trust** — Do they believe you'll keep your word?
2. **Respect** — Do they value your judgment?
3. **Fear** — Do they see you as threat/power source?

**Starting Relationships:**

| NPC | Trust | Respect | Fear |
|-----|-------|---------|------|
| David | 70 | 80 | 5 |
| Abishai | 50 | 40 | 20 |
| Jonadab | 60 | 60 | 0 |
| Saul | 10 | 30 | 60 |

### 3.2 Relationship Increase/Decrease

**David Trust:**
- +10: Stand with David against Abishai's arguments
- +8: Complete volunteer mission
- +5: Help wounded soldier
- -8: Argue with David privately
- -10: Betray his confidence

**David Respect:**
- +8: Offer wise counsel in strategy meeting
- +5: Excel in combat
- -5: Show cowardice in danger
- -8: Challenge his leadership publicly

**Abishai Trust:**
- +10: Agree to violent solution
- +5: Fight alongside him
- -10: Refuse violence when he urges it
- -8: Report him to David

**Abishai Respect:**
- +8: Prove combat skill
- +5: Show tactical thinking
- -8: Act "soft" or spiritual
- -5: Defer to David over Abishai's plan

**Jonadab Trust:**
- +8: Confide doubts in him
- +5: Ask his opinion on faith matters
- -5: Dismiss his spiritual concerns
- -8: Mock faith

**Jonadab Respect:**
- +8: Show thoughtfulness, ask good questions
- +5: Help him with scout work
- -5: Act purely pragmatic
- -8: Laugh at his philosophy

### 3.3 Relationship Impact on Dialogue

**At Trust 50+:**
- NPC opens up with personal stories
- Can ask deeper questions
- Unlock "confidential" dialogue path

**At Trust 70+:**
- NPC asks for your advice
- Treats you as peer/friend
- Can influence their decisions

**At Respect 50+:**
- NPC takes your suggestions seriously
- Dialogue shows them listening
- Can unlock alternative solutions

**At Fear 60+:**
- NPC is cautious around you
- Treats you as potential threat
- Fewer dialogue options
- More formal/distant speech

### 3.4 Relationship Threshold Events

**David Trust 80+:**
- David explicitly asks your opinion on killing Saul
- Your voice has real weight
- Can persuade him (hard, but possible)

**Abishai Respect 70+:**
- Abishai respects your warrior spirit
- Will fight harder for you
- Combat bonus (slightly higher damage)

**Jonadab Trust 70+:**
- Jonadab confides: "I'm losing faith too..."
- Deepest dialogue available
- Can comfort him (Faith +5)

**Saul Fear 80+:**
- Saul recognizes you as threat
- Targets you specifically (harder fights)
- Creates dramatic tension

---

## 4. The Cave Choice Consequence System

### 4.1 The Central Mechanic

**Event:** Saul is defenseless in cave  
**Pressure Points:**
- Abishai argues for killing (+Anger, +Greed, -Faith)
- Jonadab questions the morality (+Faith, +Hope, questioning)
- David is silent (your choice, your responsibility)
- Player must decide: Kill / Spare / Escape / Report

### 4.2 Four Path Options & Consequences

#### PATH A: "Kill Saul"
**Mechanical Cost:**
- Faith: -12 (major deduction)
- Abishai Trust: +10 (respects your decisiveness)
- David Trust: -15 (betrays his core value)
- Respect from others: -5 (seen as murderer)
- Emotion state: Anger high, Faith low

**Story Consequence:**
- Saul dies (game over? or continues?)
- David must flee immediately (Saul's army retaliates)
- Ending path: "Tyrant's Ally" (cynical, violent)
- Codex unlocks: "Murder of the King"

**NPC Reactions:**
- David: "You've made a terrible mistake..." (betrayal, disappointed)
- Abishai: "Finally. A real warrior." (respect, but wrong kind)
- Jonadab: Leaves group silently (cannot continue with murderer)

#### PATH B: "Spare Saul"
**Mechanical Gain:**
- Faith: +10 (major increase)
- David Trust: +15 (affirms core values)
- Respect from David: +8
- Abishai Respect: -5 (thinks you're soft)
- Emotion state: Faith high, Fear possible

**Story Consequence:**
- Saul leaves cave (defeated)
- Moment of humility for Saul
- Temporary peace (Saul doesn't pursue immediately)
- Ending path: "Believer's Path" (redemptive, transformative)
- Codex unlocks: "Mercy of the Hunted"

**NPC Reactions:**
- David: "You understand what this means..." (profound respect, bonding)
- Abishai: "That's insane. But maybe... maybe you're right." (grudging respect)
- Jonadab: "That took faith. Real faith." (spiritual peer acknowledgment)

#### PATH C: "We Should Escape"
**Mechanical Result:**
- Faith: +4 (slight increase for self-preservation)
- David Trust: +2 (avoiding choice, not earning respect)
- Respect: 0 (neutral)
- Abishai Respect: -3 (cowardly in his eyes)
- Emotion state: Fear high, mixed others

**Story Consequence:**
- Group escapes before confrontation
- Saul isn't encountered
- Anticlimactic but safe
- Ending path: "Survivor's Path" (neutral, pragmatic)
- Codex unlocks: "Wisdom of Retreat"

**NPC Reactions:**
- David: "I'm... relieved you're safe. But we'll face this eventually." (unsatisfied)
- Abishai: "Smart. Tactical." (respects pragmatism)
- Jonadab: "At least no one died." (acceptance, not joy)

#### PATH D: "Report to Saul's Army"
**Mechanical Consequence:**
- Faith: -15 (major betrayal of group)
- David Trust: -20 (ultimate betrayal)
- All relationships: -10 (seen as traitor)
- Emotion state: Greed high, Fear high
- **Game Over / Alternate Ending**

**Story Consequence:**
- Player sides with Saul
- David's band is ambushed
- Player becomes Saul's soldier
- Ending: "The Betrayer" (separate short ending)
- Codex unlocks: "Judas Moment"

**NPC Reactions:**
- David: "Why? I trusted you..." (final confrontation, heartbreaking)
- Abishai: "You're dead to me." (seeks revenge)
- Jonadab: "God will judge you." (spiritual condemnation)

---

## 5. Ending Determination Matrix

### 5.1 Ending Formula

```
ENDING = Cave_Choice + Faith_Score + Key_Relationship
```

**Weighted Calculation:**
1. **Cave Choice Weight:** 40% (most important)
2. **Final Faith Score Weight:** 35% (David choice reflects faith)
3. **David Trust Weight:** 20% (relationship determines story tone)
4. **NPC Alignment Weight:** 5% (Abishai/Jonadab influence)

### 5.2 Five Ending Variants

#### ENDING 1: "The Believer" (True Ending)
**Conditions:**
- Cave Choice: Spare Saul
- Faith Score: 75+
- David Trust: 80+

**Narrative:**
- Saul leaves humbled
- David recognizes you as true believer
- Spiritual transformation complete
- Sunrise scene, redemptive
- Credits roll with hopeful music

**Codex Unlock:** "The Way Forward"  
**Achievement:** "Man of Faith"

#### ENDING 2: "The Doubter's Mercy" (Good Ending)
**Conditions:**
- Cave Choice: Spare Saul
- Faith Score: 50-74
- David Trust: 70+

**Narrative:**
- Saul leaves, but tension remains
- David thanks you, but questions remain
- You've chosen right but still questioning
- Gray morning, mixed emotions
- Credits roll with contemplative music

**Codex Unlock:** "Questions of the Heart"  
**Achievement:** "Uncertain but True"

#### ENDING 3: "The Pragmatist's Path" (Neutral Ending)
**Conditions:**
- Cave Choice: Escape / Neutral decision
- Faith Score: 40-60
- David Trust: 50-70

**Narrative:**
- Band escapes safely but conflicts unresolved
- You survived but didn't grow much
- David respects your safety instinct
- Dusk scene, survival theme
- Credits roll with neutral music

**Codex Unlock:** "The Long Road"  
**Achievement:** "Survivor"

#### ENDING 4: "The Warrior's Reckoning" (Dark Ending)
**Conditions:**
- Cave Choice: Kill Saul
- Faith Score: 0-40
- David Trust: 0-30

**Narrative:**
- Saul dies, group must flee immediately
- Victory tastes like defeat
- David is heartbroken, wounded
- Dark dawn, consequences loom
- Credits roll with dramatic, tragic music

**Codex Unlock:** "The Curse of Blood"  
**Achievement:** "Pragmatist's Burden"

#### ENDING 5: "The Betrayer" (Secret Ending)
**Conditions:**
- Cave Choice: Report to Saul
- (Path diverges, short ending)

**Narrative:**
- Player becomes enemy of David
- Saul shows mercy, uses player as spy
- David escapes but hunted forever
- Player becomes agent of persecution
- Tragic irony ending
- Credits roll with haunting music

**Codex Unlock:** "The Judas Path"  
**Achievement:** "The Wrong Choice"

---

## 6. Dashboard UI: Faith Tracker

### 6.1 Visual Design

**Location:** Bottom-left corner (persistent, accessible)  
**Size:** Collapsed: 80px × 80px | Expanded: 240px × 400px  
**Colors:** Gold theme (#C9A84C), navy background (#0F1C2E)

**Elements:**
1. **Faith Meter** (circular progress)
   - Current score (big number)
   - 0-100 scale
   - Color-coded (red=cynic, yellow=doubter, green=believer)

2. **Emotion Indicator** (current emotion icon)
   - Large emoji
   - Fades with duration
   - Color matches emotion type

3. **Relationship Summary** (when expanded)
   - David: Trust 70 | Respect 80 | Fear 5
   - Abishai: Trust 50 | Respect 40 | Fear 20
   - Jonadab: Trust 60 | Respect 60 | Fear 0

4. **Trending Indicator** (arrow)
   - Up arrow: Faith increasing
   - Down arrow: Faith decreasing
   - Shows last 5 actions' impact

### 6.2 Feedback Mechanics

**On Completion of Choice:**
```
[Player chooses "Spare Saul"]
→ Faith +10
→ David Trust +15
→ Abishai Respect -5
→ Gold glow on Faith meter (visual celebration)
→ Toast notification: "Your faith is being tested"
```

**Milestone Messages:**
- At Faith 75: "Your belief is crystallizing"
- At Faith 25: "Your doubts are deepening"
- At David Trust 80: "David sees you as kindred spirit"
- At Abishai Respect 70: "Abishai recognizes your warrior spirit"

---

## 7. Design Implementation Notes

### 7.1 Technical Structure

**Data Tracking:**
```
Player_State {
  faith_score: number (0-100)
  current_emotion: Emotion (enum)
  emotion_duration: number (ms)
  relationships: {
    david: { trust, respect, fear },
    abishai: { trust, respect, fear },
    jonadab: { trust, respect, fear },
    saul: { trust, respect, fear }
  }
  choices_made: Choice[]
  ending_path: string
}
```

**Choice Consequence System:**
```
On choice execution:
  1. Apply faith_delta
  2. Apply relationship_delta (per NPC)
  3. Trigger emotion_state
  4. Check threshold events
  5. Update UI
  6. Unlock dialogue options
  7. Log to codex
```

### 7.2 Balancing

**Faith Deficit Problem:** If player makes wrong choices, can't reach high ending  
**Solution:** Side quests allow redemption (small Faith increases)

**Relationship Lock-Out:** Early bad choice locks out dialogue forever  
**Solution:** Relationships can be rebuilt (slow, but possible)

**Emotion Dominance:** Negative emotions might push players toward cynical ending  
**Solution:** Faith events boost positive emotions naturally

---

## 8. Codex: Automatic Unlock System

**Unlocks trigger on:**
- Faith milestone reached
- Choice made
- Relationship threshold crossed
- NPC event completed

**Example Codex Entry (Auto-Unlock on Spare Saul):**
```
TITLE: "Mercy of the Hunted"
TYPE: Moment / Spiritual Insight

"When power strips away and all defenses fall,
mercy is not weakness—it is the highest strength.
To spare your enemy when you have him cornered:
this is the act that separates tyrants from kings."

FAITH BOOST: +3 (reading this entry)
UNLOCK TRIGGERS: "Spare Saul" choice
```

---

## 9. Glossary: Emotion States

| Emotion | Color | Icon | Bias | Duration |
|---------|-------|------|------|----------|
| Fear | Blue | 😰 | Defensive | 30-60s |
| Greed | Orange | 💰 | Selfish | 45-90s |
| Pride | Red | 😤 | Defiant | 60-120s |
| Faith | Gold | ✨ | Trusting | 45-120s |
| Hope | Green | 🌅 | Optimistic | 60-90s |
| Love | Pink | ❤️ | Protective | 90-180s |
| Anger | Red | 🔥 | Aggressive | 45-120s |

---

**Status:** Faith Engine fully specified  
**Risk:** Mechanic complexity might overwhelm players (mitigation: tutorial focus)  
**Next:** QUEST_SYSTEM.md (5-quest structure with branching)

