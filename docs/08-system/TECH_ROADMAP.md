# THE WAY — TECH ROADMAP

**Platform:** iOS/Android (flagship devices) + Web (optional)  
**Engine:** Babylon.js (WebGL) or Three.js (TypeScript)  
**Framework:** Next.js 14+  
**Timeline:** 12-18 months to launch

---

## PHASE 1: PRE-PRODUCTION (2-4 weeks)

### Milestones
- [ ] Art direction & character concepts finalized
- [ ] Audio design spec completed
- [ ] Technical architecture confirmed
- [ ] Asset pipeline established

### Deliverables
- Style guide (visual)
- Audio reference tracks
- Asset list (characters, environments, props)
- Dev environment setup (git, CI/CD)

---

## PHASE 2: PROTOTYPE (4-6 weeks)

### Focus: Gameplay & Story Loop

**Build:**
- Chapter 0 full cinematic playthrough
- Core dialogue system (branching, save-load)
- Faith meter mechanic
- Single cave room (proof of concept)

**Testing:**
- User testing (5-10 people, non-gamers preferred)
- Emotional response feedback
- Mechanic clarity

**Deliverable:** Playable demo (8-10 min)

---

## PHASE 3: FOUNDATION (8-12 weeks)

### Core Systems Development

**Art:**
- All characters finalized & rigged
- All environments built (low-poly, optimize later)
- Lighting passes (Day 1 complete, then iteratively)

**Code:**
- Complete dialogue/branching system
- Save/load fully functional
- Faith/awakening/emotion systems (backend)
- Relationship matrix engine

**Audio:**
- Voice recording (David, Abishai, Jonadab, Saul, NPCs)
- Background music (5-6 tracks)
- SFX library (water, wind, footsteps, metal)

**Content:**
- All quest scripts written
- Codex entries created (50+ entries)
- Ending scenes drafted (all 5 variants)

**Milestone:** Complete playable Chapter 1 build (rough)

---

## PHASE 4: ITERATION (8-12 weeks)

### Refinement & Polish

**Art:**
- Character animation passes
- Environment detail (rocks, vegetation)
- Lighting final pass (no placeholders)
- Particle effects (dust, water, fire)

**Code:**
- Performance optimization
- Bug fixing (from playtest feedback)
- Mobile build optimization
- Save/load stress testing

**Audio:**
- Voice editing & mixing
- Music adaptive layers (intensity increase)
- Spatial audio (3D sound field)
- Dialogue-audio sync

**Content:**
- Dialogue natural language pass
- Codex writing final edit
- Ending cinematics (production)

**Playtesting:** 20+ players, multiple sessions
- Capture emotional arcs
- Identify unclear mechanics
- Test all 5 ending paths

**Milestone:** Feature-complete, 85%+ quality

---

## PHASE 5: OPTIMIZATION & QA (6-8 weeks)

### Performance & Quality Gate

**Mobile Optimization:**
- Build size: <2GB
- Load time: <5 seconds
- FPS: 60 FPS (min 30 on older devices)
- VRAM: <500MB active
- RAM: <1GB max

**Platform Testing:**
- iOS (iPhone 12+, iPad)
- Android (Samsung Galaxy S20+, Google Pixel 5+)
- Tablet support (iPad Pro)

**QA:**
- Full playthrough all paths (50 sessions)
- Bug documentation & fixing
- Save/load integrity (stress test)
- Audio sync verification
- Localization proof (if applicable)

**Accessibility:**
- Colorblind modes verified
- Font sizing tested
- Controller support confirmed
- Screen reader compatibility (if applicable)

**Milestone:** Gold master candidate

---

## PHASE 6: LAUNCH PREP (2-4 weeks)

### Certification & Distribution

**App Store Submission:**
- iOS TestFlight (beta testing, 100+ users)
- Android Play Store beta
- Certification prep
- Store screenshots/descriptions

**Marketing Materials:**
- Trailer (30 sec, 1 min, 3 min)
- Press materials
- Social media assets
- Review copies to outlets

**Support Infrastructure:**
- Discord server setup
- Support email
- Bug reporting system
- Community manager briefing

**Milestone:** Ready for launch

---

## TECHNICAL SPECIFICATIONS

### Game Engine
**Primary:** Babylon.js (WebGL)
**Fallback:** Three.js (if Babylon issues)
**Framework:** Next.js 14+ with TypeScript

### Client Architecture
```
/src
  /app
    /chapter-0     (cinematics, Chapter 0 logic)
    /chapter-1     (main gameplay)
    /ui            (menus, dialogs, dashboard)
  /systems
    /faith-engine  (stat tracking, consequence system)
    /dialogue-engine (branching, save-load)
    /relationship-matrix
    /emotion-system
  /assets
    /models        (characters, environments)
    /textures      (diffuse, normal, specular)
    /audio         (music, sfx, voice)
  /lib
    /utils         (helpers, math)
    /types         (TypeScript interfaces)
    /constants     (game data)
```

### Backend (Minimal)
- **Save sync:** Supabase (optional cloud backup)
- **Analytics:** Player journey tracking (privacy-first)
- **Telemetry:** Crash reporting (Sentry or similar)

### Data Persistence
- **Local:** IndexedDB (browser) + local storage (app)
- **Cloud:** Optional Supabase PostgreSQL
- **Format:** JSON serialization (versioned)

---

## DEVELOPER TEAM

### Minimum Team (for launch)
- 1x Lead Developer (architecture, systems)
- 1x 3D Artist (environment, characters)
- 1x Animator (rigging, animation)
- 1x Audio Designer (music, SFX, voice directing)
- 1x Narrative Designer (dialogue, quests, lore)
- 1x QA Lead (testing, bug tracking)

**Optional (expansion):**
- 1x UI/UX Designer (if art team stretched)
- 1x Localization Manager (languages beyond Korean)
- 1x Producer (budget, timeline, comms)

---

## BUDGET ESTIMATE

### Art Assets
- Characters (main 5 + militia): $50K
- Environments (caves, desert, valley): $40K
- Animation (rigging + cycles): $30K
- Subtotal: $120K

### Audio
- Voice talent (professional): $20K
- Music composition (6 tracks + adaptive): $15K
- SFX library & mixing: $10K
- Subtotal: $45K

### Development
- Lead developer (12 months): $120K
- Tech infrastructure (Supabase, CI/CD, hosting): $5K
- Subtotal: $125K

### Operations
- QA/Testing (contractor): $25K
- Localization (Korean → English minimum): $10K
- Hosting & distribution: $5K
- Subtotal: $40K

### TOTAL: ~$330K USD

**Note:** This is AAA-quality indie budget. Optimizations:
- Revenue share with art studios (instead of flat fee)
- Open-source (Babylon.js) instead of licensed engine
- Lean team (one person may wear multiple hats)

---

## RISK MITIGATION

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Scope creep (Ch 2-5) | High | Critical | Strict MVP lock, written scope document |
| Voice acting delays | Medium | High | Hire early, build buffer time |
| Performance issues (mobile) | Medium | High | Prototype early, optimize throughout |
| Narrative feedback late | Medium | Medium | Playtesting in Phase 3 |
| Audio sync bugs | Low | Medium | Automated sync testing |
| Art asset timeline | Medium | High | Hire experienced 3D team |

---

## SUCCESS METRICS

### Technical
- Launch on iOS & Android (production quality)
- >60 FPS on flagship devices
- <5 second load time
- <2% crash rate

### Player Experience
- >4.5 star rating (app stores)
- >70% complete Chapter 1
- >5 hours average playtime
- Emotional feedback (surveys)

### Business
- 100K+ downloads (first month)
- 35%+ D7 retention
- Community engagement (Discord)

---

## DEPLOYMENT STRATEGY

### Soft Launch
- Limited release (Canada, Australia)
- Gather feedback
- Fix critical bugs
- Adjust difficulty/pacing

### Wide Launch
- iOS (App Store)
- Android (Play Store)
- Day 1 media push
- Community engagement

### Post-Launch Support
- Monthly patches (bug fixes)
- Quarterly updates (quality improvements)
- Future chapters (if commercial success)

---

**THE WAY will be a technical masterpiece in service of spiritual impact.**

**Technology exists to serve story, not the reverse.**

