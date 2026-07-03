# THE WAY — Development Checklist
## Emotion Selection UI (Card Form) — MVP Implementation

**Status:** Ready for Development  
**Target Date:** 2026-06-20 (10 days)  
**Development Team:** Frontend + Backend Integration

---

## ✅ Phase 1: Setup & Data (Days 1-2)

### 1.1 Data Layer
- [x] `src/data/emotions.ts` — 12 emotion definitions (CREATED)
- [ ] `src/data/emotionToBiblicalMap.ts` — Map emotions to CORE_BIBLE_100 events
  - Use SOUL_MAP.md for reference
  - Each emotion: 3-5 biblical figure names + 4-5 event IDs
- [ ] Verify event IDs exist in CORE_BIBLE_100.md
- [ ] Type safety: ensure all IDs are strings

### 1.2 Tailwind Configuration
- [x] Add emotion colors to `tailwind.config.ts` (DONE)
  - dark-navy, cream, gold, dark-red, emotion-purple, sub-text
- [ ] Verify colors render correctly in browser
- [ ] Test WCAG AA contrast ratios

### 1.3 TypeScript Types
- [x] `Emotion` interface defined in emotions.ts
- [ ] Create `src/types/emotion.ts` if interface becomes too large
- [ ] Ensure all components use correct types

---

## ✅ Phase 2: Components (Days 3-6)

### 2.1 EmotionCard
- [x] `src/components/emotion/EmotionCard.tsx` (CREATED)
- [ ] Visual testing:
  - [ ] Check colors match Figma mockup
  - [ ] Verify emoji renders correctly (48px)
  - [ ] Check button hover states
  - [ ] Test on mobile (375px viewport)
- [ ] Interactions:
  - [ ] Button click handler works
  - [ ] Disabled state when not active
  - [ ] Smooth transition between positions

### 2.2 EmotionCardStack
- [x] `src/components/emotion/EmotionCardStack.tsx` (CREATED)
- [ ] Swipe logic testing:
  - [ ] Previous/current/next cards display correctly
  - [ ] Cards wrap around (12 → 1)
  - [ ] Swipe detection threshold (50px) works
- [ ] Animation:
  - [ ] 300ms transition duration
  - [ ] Smooth easing (cubic-bezier)
  - [ ] No jank on 60fps

### 2.3 useEmotionSwipe Hook
- [x] `src/components/emotion/hooks/useEmotionSwipe.ts` (CREATED)
- [ ] Test touch events:
  - [ ] onTouchStart captures X
  - [ ] onTouchEnd calculates distance
  - [ ] direction = 'left' or 'right' correctly
- [ ] Test with mouse drag (optional for desktop)
- [ ] Test on actual mobile device (not just DevTools)

### 2.4 EmotionSelector (Main Component)
- [x] `src/components/emotion/EmotionSelector.tsx` (CREATED)
- [ ] State management:
  - [ ] currentIndex updates correctly
  - [ ] Swipe handlers fire correctly
  - [ ] Selection triggers navigation
- [ ] Integration:
  - [ ] router.push() to /chapters/recommended?emotion={id}
  - [ ] Skip button returns user to home
  - [ ] No console errors

### 2.5 EmotionHeader
- [x] `src/components/emotion/EmotionHeader.tsx` (CREATED)
- [ ] Visual check:
  - [ ] Title text 28px, Semi Bold
  - [ ] Subtitle 13px, Regular
  - [ ] Spacing: 30px top margin
  - [ ] Colors match cream (#F5F1E8)

### 2.6 EmotionSkipButton
- [x] `src/components/emotion/EmotionSkipButton.tsx` (CREATED)
- [ ] Visual check:
  - [ ] Button at bottom of page
  - [ ] Y position: 720px
  - [ ] Text: "선택하지 않기"
  - [ ] Hover state works

---

## ✅ Phase 3: Page & Routes (Days 5-6)

### 3.1 Emotion Selection Page
- [x] `src/app/emotions/page.tsx` (CREATED)
- [ ] Route accessibility:
  - [ ] `/emotions` loads EmotionSelector
  - [ ] No 404 errors
  - [ ] Metadata correct (SEO)

### 3.2 Navigation Integration
- [ ] Create stub page: `/chapters/recommended`
  - [ ] Accept query param `?emotion={id}`
  - [ ] Display selected emotion
  - [ ] Placeholder: "Loading recommended events..."
- [ ] Update home page (`/`) to link to `/emotions`
  - [ ] "Start the journey" button → `/emotions`

### 3.3 Skip Flow
- [ ] Define skip behavior:
  - [ ] Option A: Return to home
  - [ ] Option B: Show modal with message
  - [ ] Option C: Allow user to change mind (history.back())

---

## ✅ Phase 4: Testing & Polish (Days 7-10)

### 4.1 Mobile Testing
- [ ] iPhone 12 (375px):
  - [ ] All text readable
  - [ ] Buttons easily tappable (44px+ target)
  - [ ] No horizontal scroll
  - [ ] Swipe feels natural
- [ ] iPad (768px):
  - [ ] Layout adapts (or use breakpoints from REACT_IMPLEMENTATION_SPEC)
  - [ ] Card size appropriate
- [ ] Android devices:
  - [ ] Touch events work
  - [ ] No lag during swipe

### 4.2 Browser Compatibility
- [ ] Chrome/Chromium: Latest 2 versions
- [ ] Safari: Latest 2 versions
- [ ] Firefox: Latest 2 versions
- [ ] Edge: Latest 2 versions

### 4.3 Accessibility (A11y)
- [ ] Keyboard navigation:
  - [ ] Tab through all buttons
  - [ ] Enter/Space to activate buttons
  - [ ] Arrow keys to swipe (optional enhancement)
- [ ] Color contrast:
  - [ ] Text vs background WCAG AA (4.5:1)
  - [ ] Button text vs background
- [ ] Screen reader:
  - [ ] Text alternatives for emojis
  - [ ] Button purposes clear
  - [ ] No hidden content missed

### 4.4 Performance
- [ ] Lighthouse score: > 90
- [ ] FCP (First Contentful Paint): < 1.5s
- [ ] LCP (Largest Contentful Paint): < 2.5s
- [ ] No layout shifts during swipe
- [ ] Animation frame rate: 60fps (use DevTools)

### 4.5 Visual Polish
- [ ] Button hover/focus states visible
- [ ] Divider line opacity correct (20%)
- [ ] Shadow depth matches mockup
- [ ] Font rendering: no subpixel issues
- [ ] Emoji rendering consistent across devices

### 4.6 Error Handling
- [ ] Missing emotion gracefully handled
- [ ] Network error: graceful fallback
- [ ] Invalid emotion ID in URL: 404 or redirect
- [ ] No console errors or warnings

---

## 📋 Code Review Checklist

### Before PR Submission
- [ ] `npm run lint` passes (no errors)
- [ ] `npm run type-check` passes (no TS errors)
- [ ] `npm run test` passes (if tests exist)
- [ ] Code formatted with Prettier
- [ ] No console.log() or debug statements
- [ ] Comments added for non-obvious code
- [ ] Component props properly typed

### PR Description
- [ ] Closes #[issue number]
- [ ] Description of changes
- [ ] Testing performed (mobile, desktop, etc.)
- [ ] Screenshots of UI changes
- [ ] Links to related docs:
  - [ ] REACT_IMPLEMENTATION_SPEC.md
  - [ ] EMOTION_SELECT_UI_CONCEPTS.md
  - [ ] FIGMA_MOCKUP_GUIDE.md

---

## 🚀 Deployment Checklist

### Pre-Production
- [ ] All tests passing
- [ ] No TypeScript errors
- [ ] Build successful: `npm run build`
- [ ] Vercel preview deployment works
- [ ] Mobile testing on actual device(s)

### Post-Production
- [ ] Monitor error logs (Sentry/etc)
- [ ] Check analytics: emotion selection tracking
- [ ] Verify /chapters/recommended page works
- [ ] User feedback collection ready

---

## 📞 Blockers & Questions

**For Design Team:**
- What about default emotion on page load? First emotion?
- Should we show "1 of 12" indicator?
- Any animation delays or durations to adjust?

**For Product Team:**
- Should emotion selection be tracked/logged?
- Privacy: Should we store emotion history?
- Should users be able to change emotion mid-journey?

**For Backend Team:**
- Do we need to save emotion_id to user session?
- Should recommendations be API-driven or static data?

---

## 📚 References

**Specification Docs:**
1. REACT_IMPLEMENTATION_SPEC.md (Main spec)
2. EMOTION_SELECT_UI_CONCEPTS.md (Design rationale)
3. FIGMA_MOCKUP_GUIDE.md (Pixel measurements)
4. SOUL_MAP.md (Emotion-to-biblical mapping)

**Figma:**
- https://www.figma.com/design/IQaGUWn8x48RgWt2rYQ13w

**Codebase:**
- src/data/emotions.ts (Data)
- src/components/emotion/ (Components)
- src/app/emotions/page.tsx (Page)

---

## 🎯 Success Criteria

✅ **MVP Complete when:**
1. All 12 emotions display correctly
2. Swipe navigation works smoothly (300ms animation)
3. Emotion selection navigates to /chapters/recommended
4. Mobile viewport optimized (375px)
5. No console errors or warnings
6. Lighthouse score > 90
7. WCAG AA accessibility met

---

**Status:** Ready for Dev Handoff  
**Created:** 2026-06-10  
**Last Updated:** 2026-06-10