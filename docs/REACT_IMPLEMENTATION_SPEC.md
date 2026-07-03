# THE WAY — React Implementation Spec
## Emotion Selection Card Form UI

**Version:** v1.0 SPEC  
**Status:** Ready for Development  
**Target:** Next.js 14 + React 18 + Tailwind CSS

---

## 📋 Overview

Build the **Emotion Selection Screen** (Card Form) as the MVP entry point to THE WAY game.

**Key Features:**
- Swipeable card stack UI showing one emotion at a time
- 12 emotions mapped to biblical narratives via SOUL_MAP
- Smooth animations and mobile-optimized
- Navigate to recommended biblical events after selection

---

## 🏗️ Component Architecture

```
src/components/emotion/
├── EmotionSelector.tsx          (Main component - orchestrator)
├── EmotionCard.tsx              (Individual card with content)
├── EmotionCardStack.tsx          (Swipe handler & card management)
├── EmotionHeader.tsx            (Title section)
├── EmotionSkipButton.tsx        (Skip interaction)
└── hooks/
    ├── useEmotionSwipe.ts       (Swipe gesture detection)
    └── useEmotionRecommendation.ts  (Map emotion → biblical events)

src/data/
├── emotions.ts                  (12 emotions + metadata)
└── emotionToBiblicalMap.ts      (SOUL_MAP integration)

src/pages/
└── emotions/
    └── index.tsx                (Entry page)
```

---

## 🎨 Component Specifications

### 1. EmotionSelector (Parent Component)

**Location:** `src/components/emotion/EmotionSelector.tsx`

**Props:**
```typescript
interface EmotionSelectorProps {
  onEmotionSelect: (emotionId: string) => void;
  onSkip?: () => void;
}
```

**State Management:**
```typescript
- currentEmotionIndex: number           // Current card being shown (0-11)
- emotions: Emotion[]                   // Array of 12 emotions
- isAnimating: boolean                  // Prevent rapid interactions
- selectedEmotion: Emotion | null       // Emotion user selected
```

**Responsibilities:**
- Manage emotion state and navigation
- Handle swipe events
- Orchestrate child components
- Track user selection → navigate to next screen

**Key Methods:**
```typescript
handleSwipeNext()
handleSwipePrev()
handleEmotionSelect(emotion: Emotion)
handleSkip()
```

---

### 2. EmotionCard (Individual Card)

**Location:** `src/components/emotion/EmotionCard.tsx`

**Props:**
```typescript
interface EmotionCardProps {
  emotion: Emotion;
  isActive: boolean;           // Currently visible
  position: 'left' | 'center' | 'right';
  onSelect: (emotion: Emotion) => void;
}

interface Emotion {
  id: string;
  name: string;
  emoji: string;
  question: string;
  biblicalFigures: string[];   // 3-5 names from SOUL_MAP
  color: {
    bg: string;               // Hex color
    text: string;             // Hex color
  };
}
```

**Visual Layout:**
```
┌──────────────────────┐
│ emoji (48px)         │  Y: 20px
│                      │
│ Emotion Name (24px)  │  Y: 80px
├──────────────────────┤  Divider line
│                      │
│ Question Text        │  Y: 145px
│ (16px, multi-line)   │
│                      │
│ [경험하기] Button    │  Y: 270px
│ (260×45, Gold)       │
└──────────────────────┘
```

**Tailwind Classes:**
```typescript
card: "w-80 h-96 rounded-3xl shadow-lg p-5 flex flex-col justify-between"
emotionIcon: "text-6xl mb-4"
emotionName: "text-2xl font-semibold text-cream"
divider: "w-full h-px bg-cream/20 my-4"
question: "text-base text-cream leading-relaxed"
button: "bg-gold text-dark-navy font-semibold py-3 px-6 rounded-lg hover:bg-yellow-500"
```

**Animation:**
```css
/* Card entrance */
@keyframes cardEnter {
  from {
    opacity: 0;
    transform: translateX(100px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
animation: cardEnter 0.3s cubic-bezier(0.4, 0, 0.2, 1);

/* Card exit */
@keyframes cardExit {
  from {
    opacity: 1;
    transform: translateX(0);
  }
  to {
    opacity: 0;
    transform: translateX(-100px);
  }
}
```

---

### 3. EmotionCardStack (Container & Swipe Logic)

**Location:** `src/components/emotion/EmotionCardStack.tsx`

**Props:**
```typescript
interface EmotionCardStackProps {
  emotions: Emotion[];
  currentIndex: number;
  onSwipeNext: () => void;
  onSwipePrev: () => void;
  onSelect: (emotion: Emotion) => void;
}
```

**Swipe Detection Logic:**
```typescript
- Touch start: Record initial X position
- Touch move: Calculate delta X
- Touch end:
  - If delta > 50px → Swipe left (show next)
  - If delta < -50px → Swipe right (show prev)
  - Otherwise → Snap back
```

**Visual Arrangement:**
```
Three cards visible simultaneously:
┌─────────────────────────────────┐
│  [Card N-1]   [Card N]   [Card N+1] │
│  (left edge)  (center)   (right edge) │
└─────────────────────────────────┘

Positioning:
- Card N-1:  X: 27.5 + (-25px) = 2.5,   opacity: 30%
- Card N:    X: 27.5,                   opacity: 100%
- Card N+1:  X: 27.5 + 25px = 52.5,    opacity: 30%

On swipe:
- All cards shift left/right by 375px (viewport width)
- Duration: 300ms easing
```

---

### 4. EmotionHeader

**Location:** `src/components/emotion/EmotionHeader.tsx`

**Props:**
```typescript
interface EmotionHeaderProps {
  subtitle?: string;  // Optional custom subtitle
}
```

**Content:**
```
Title:    "오늘 당신의 마음은\n어떠한가요?"
Subtitle: "꺼지지 않는 질문이 있습니다"
Font:     28px Semi Bold (title), 13px Regular (subtitle)
Color:    #F5F1E8 (cream)
Height:   140px
```

---

### 5. EmotionSkipButton

**Location:** `src/components/emotion/EmotionSkipButton.tsx`

**Props:**
```typescript
interface EmotionSkipButtonProps {
  onClick: () => void;
}
```

**Content:**
```
Text:   "선택하지 않기"
Font:   14px Medium
Color:  #D4C8B8 (sub-text)
Y:      720px
```

---

### 6. useEmotionSwipe Hook

**Location:** `src/components/emotion/hooks/useEmotionSwipe.ts`

**Purpose:** Detect and handle swipe gestures

**Signature:**
```typescript
interface SwipeEvent {
  direction: 'left' | 'right' | null;
  distance: number;
}

export function useEmotionSwipe(
  onSwipe: (event: SwipeEvent) => void,
  minDistance: number = 50
): {
  onTouchStart: (e: TouchEvent) => void;
  onTouchMove: (e: TouchEvent) => void;
  onTouchEnd: (e: TouchEvent) => void;
}
```

**Implementation:**
```typescript
let startX = 0;
let currentX = 0;

const onTouchStart = (e) => {
  startX = e.touches[0].clientX;
};

const onTouchEnd = (e) => {
  const endX = e.changedTouches[0].clientX;
  const distance = startX - endX;
  
  if (Math.abs(distance) > minDistance) {
    onSwipe({
      direction: distance > 0 ? 'left' : 'right',
      distance: Math.abs(distance),
    });
  }
};
```

---

### 7. useEmotionRecommendation Hook

**Location:** `src/components/emotion/hooks/useEmotionRecommendation.ts`

**Purpose:** Map selected emotion to 3-5 recommended biblical events

**Signature:**
```typescript
export function useEmotionRecommendation(emotionId: string) {
  const recommendations = emotionMap[emotionId];
  return {
    biblicalFigures: recommendations.figures,  // 3-5 names
    events: recommendations.events,            // Event IDs from CORE_BIBLE_100
  };
}
```

**Data Structure:**
```typescript
const emotionMap: Record<string, {
  figures: string[];
  events: string[];
}> = {
  'fear': {
    figures: ['Moses', 'Joshua', 'Gideon', 'Peter'],
    events: ['001', '006', '015', '068']
  },
  'anger': {
    figures: ['Cain', 'Jonah', 'David'],
    events: ['003', '032', '045']
  },
  // ... 12 total emotions
};
```

---

## 📊 Data Structures

### emotions.ts

```typescript
export const EMOTIONS: Emotion[] = [
  {
    id: 'fear',
    name: '두렵다',
    emoji: '😨',
    question: '당신은 이 순간\n무엇을 두려워하는가?',
    biblicalFigures: ['Moses', 'Joshua', 'Gideon', 'Peter'],
    color: {
      bg: '#1A2847',
      text: '#F5F1E8'
    }
  },
  {
    id: 'anger',
    name: '화가 난다',
    emoji: '😠',
    question: '당신의 분노는\n어디서 비롯되었는가?',
    biblicalFigures: ['Cain', 'Jonah', 'David'],
    color: {
      bg: '#2A1F1F',
      text: '#F5F1E8'
    }
  },
  {
    id: 'lonely',
    name: '외롭다',
    emoji: '😢',
    question: '당신은 누구를\n그리워하는가?',
    biblicalFigures: ['Jacob', 'Ruth', 'Naomi'],
    color: {
      bg: '#1F2340',
      text: '#F5F1E8'
    }
  },
  // ... 9 more emotions
];
```

### emotionToBiblicalMap.ts

```typescript
export const EMOTION_TO_BIBLICAL_MAP: Record<string, {
  biblicalFigures: string[];
  coreEvents: string[];  // IDs from CORE_BIBLE_100.md
}> = {
  'fear': {
    biblicalFigures: ['Moses', 'Joshua', 'Gideon', 'Peter'],
    coreEvents: ['001', '006', '015', '068']  // Event IDs
  },
  'anger': {
    biblicalFigures: ['Cain', 'Jonah', 'David'],
    coreEvents: ['003', '032', '045']
  },
  // ... mapping for all 12 emotions
};
```

---

## 🎯 User Flow

```
1. User lands on /emotions
   ↓
2. EmotionSelector renders with first emotion card
   ↓
3. User swipes (left/right) to browse emotions
   - Current card animates out
   - Next card animates in
   ↓
4. User clicks [경험하기] button
   ↓
5. Call onEmotionSelect() → Navigate to /chapters/recommended?emotion={id}
   (Shows 3-5 recommended biblical events as card stack)
   ↓
6. Alternative: User clicks [선택하지 않기]
   → Navigate back or show modal
```

---

## 🔄 Navigation

**After emotion selection:**

```typescript
// In EmotionSelector.tsx
const handleEmotionSelect = (emotion: Emotion) => {
  router.push(`/chapters/recommended?emotion=${emotion.id}`);
};
```

**Next page:** `/chapters/recommended`
- Show 3-5 biblical events related to selected emotion
- Each event as a card (similar card stack UI)
- User selects one event
- Enter Chapter flow (question → insight → repentance → obedience → legacy)

---

## 📱 Responsive Design

**Breakpoints:**
```
- Mobile (375px):      Full viewport
- Tablet (768px):      Center card (320px), show all 3 simultaneously
- Desktop (1024px):    Center card (320px), show all 3, more spacing
```

**CSS Strategy:**
```css
/* Base: mobile-first */
.emotion-card-stack {
  width: 375px;  /* Mobile viewport */
  height: 430px;
}

/* Tablet */
@media (min-width: 768px) {
  .emotion-card-stack {
    width: 900px;  /* Show 3 cards visible at once */
    justify-content: center;
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .emotion-card-stack {
    width: 1100px;
  }
}
```

---

## 🎨 Tailwind Color Palette

Add to `tailwind.config.ts`:

```typescript
export default {
  theme: {
    colors: {
      'dark-navy': '#1A1F3A',
      'cream': '#F5F1E8',
      'gold': '#D4AF37',
      'dark-red': '#2A1F1F',
      'dark-blue': '#1A2847',
      'emotion-purple': '#1F2340',
      // ... Add all emotion colors
    }
  }
}
```

---

## ✅ Acceptance Criteria

- [ ] EmotionSelector component renders without errors
- [ ] Card swipe gestures work smoothly (300ms animation)
- [ ] All 12 emotions load from `emotions.ts`
- [ ] Clicking [경험하기] navigates to `/chapters/recommended?emotion={id}`
- [ ] Mobile layout is optimized (375px viewport)
- [ ] All text colors meet WCAG AA contrast standards
- [ ] No console errors or TypeScript warnings
- [ ] Animation is smooth 60fps on mobile devices

---

## 📚 Integration with Existing Codebase

**Existing patterns to follow:**

```typescript
// From src/components/ui/Button.tsx
import Button from '@/components/ui/Button';

// From src/hooks/usePlayerControls.ts
// Use similar pattern for custom hooks

// From src/lib/utils.ts
// Use for shared utility functions

// Tailwind usage from existing components
// Maintain consistent spacing, colors, typography
```

---

## 🚀 Development Timeline

**Phase 1: Setup (1-2 days)**
- Create component folder structure
- Define TypeScript interfaces
- Set up emotions data

**Phase 2: Components (2-3 days)**
- Build EmotionCard component
- Build EmotionCardStack with swipe logic
- Build EmotionHeader & EmotionSkipButton

**Phase 3: Integration (1-2 days)**
- Integrate with router
- Test swipe interactions
- Optimize animations

**Phase 4: Polish (1 day)**
- Mobile responsiveness check
- Animation refinement
- Accessibility audit

---

## 📝 Notes for Developers

1. **Swipe vs Click:** Support both touch swipes AND click arrows (for desktop testing)
2. **Animation Library:** Use Framer Motion OR native CSS animations (no heavy dependencies)
3. **State Management:** Keep emotion state local to EmotionSelector (no Redux needed for MVP)
4. **Testing:** Test swipe on actual mobile devices (not just browser DevTools)
5. **Accessibility:** Include keyboard navigation (arrow keys to swipe)

---

## 🔗 References

- EMOTION_SELECT_UI_CONCEPTS.md — Visual design specification
- FIGMA_MOCKUP_GUIDE.md — Exact pixel measurements
- SOUL_MAP.md — Emotion-to-biblical mapping
- CORE_BIBLE_100.md — All 100 biblical events

---

**Status:** Ready for development  
**Questions:** Contact planning team  
**Last Updated:** 2026-06-10