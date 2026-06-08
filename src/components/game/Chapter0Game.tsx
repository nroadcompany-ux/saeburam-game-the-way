"use client";
import { useState, useRef, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import * as THREE from 'three';
import type { GameScene } from './GameCanvas';
import { usePlayerControls } from '@/hooks/usePlayerControls';
import VirtualJoystick from './VirtualJoystick';

const GameCanvas = dynamic(() => import('./GameCanvas'), { ssr: false });

// ── Dialogue data ───────────────────────────────────────────────
const ENCOUNTER_LINES = [
  { speaker: '???', text: '멈추어라.' },
  { speaker: '???', text: '너는 지금 어디로 가느냐?' },
  { speaker: '???', text: '...' },
  { speaker: '???', text: '이 어둠을 너 혼자 건널 수 있다고 생각하는가?' },
  { speaker: '???', text: '네 앞에 길이 있다. 그러나 그 길은 네 힘으로 열리지 않는다.' },
];

const DIVINE_QUESTION = {
  text: '너의 힘으로 건너겠느냐?\n아니면 내 손을 잡겠느냐?',
  choices: [
    { id: 'self',  label: '내 힘으로 건너겠다',  sub: '나는 포기하지 않는다',    faith: -1 },
    { id: 'trust', label: '손을 잡겠다',          sub: '내 힘으론 부족함을 안다', faith: 3  },
  ],
};

const RESULT_TEXT: Record<string, string[]> = {
  self:  ['결심이 확고하다.', '', '하지만 그 손은 여전히 거기 있다.', '', '언제든 잡을 수 있다.'],
  trust: ['손을 잡는 순간,', '어둠이 물러났다.', '', '이것이 믿음이다.'],
};

// ── HUD Components ──────────────────────────────────────────────
function SceneLabel({ scene }: { scene: GameScene }) {
  const labels: Record<GameScene, string> = {
    awakening: '깨어남', cliff: '절벽 끝', encounter: '조우',
    question: '선택', result: '각성', wilderness: '광야',
  };
  return (
    <div className="absolute right-4 z-20 pointer-events-none"
      style={{ top: 'max(16px, env(safe-area-inset-top))' }}>
      <p className="text-[10px] font-mono tracking-[0.25em]"
        style={{ color: 'rgba(201,168,76,0.4)' }}>
        CH.0 · {labels[scene]}
      </p>
    </div>
  );
}

function FaithMeter({ points }: { points: number }) {
  const pct = Math.min((points / 5) * 100, 100);
  return (
    <div className="absolute z-20 pointer-events-none"
      style={{ top: 'max(16px, env(safe-area-inset-top))', left: 16 }}>
      <p className="text-[9px] uppercase tracking-[0.3em] mb-1.5"
        style={{ color: 'rgba(201,168,76,0.45)' }}>Faith</p>
      <div className="w-20 h-1 rounded-full overflow-hidden"
        style={{ background: 'rgba(255,255,255,0.08)' }}>
        <div className="h-full rounded-full transition-all duration-700"
          style={{ width: `${pct}%`, background: 'linear-gradient(to right,#C9A84C,#F0D080)' }} />
      </div>
    </div>
  );
}

function InteractionPrompt({ show }: { show: boolean }) {
  if (!show) return null;
  return (
    <div className="absolute left-1/2 -translate-x-1/2 z-30 pointer-events-none hidden md:block"
      style={{ bottom: 140, animation: 'fadeUp 0.35s ease-out both' }}>
      <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl"
        style={{ background: 'rgba(10,18,36,0.88)', border: '1px solid rgba(201,168,76,0.4)', backdropFilter: 'blur(6px)' }}>
        <kbd className="w-7 h-7 rounded-lg text-[11px] font-bold flex items-center justify-center"
          style={{ background: 'rgba(201,168,76,0.2)', color: '#C9A84C', border: '1px solid rgba(201,168,76,0.55)' }}>E</kbd>
        <span className="text-xs font-semibold" style={{ color: 'rgba(253,246,227,0.75)' }}>대화하기</span>
      </div>
    </div>
  );
}

function DialogueBox({ speaker, text, onNext, isLast }: {
  speaker: string; text: string; onNext: () => void; isLast: boolean;
}) {
  return (
    <div className="absolute left-0 right-0 z-30 px-4"
      style={{ bottom: 'max(20px, env(safe-area-inset-bottom))', paddingBottom: 64, animation: 'fadeUp 0.3s ease-out both' }}>
      <div className="max-w-lg mx-auto rounded-2xl p-5"
        style={{ background: 'rgba(4,8,20,0.93)', border: '1px solid rgba(201,168,76,0.35)', backdropFilter: 'blur(10px)' }}>
        <p className="text-xs font-bold tracking-widest mb-2" style={{ color: '#C9A84C' }}>{speaker}</p>
        <p className="text-sm leading-relaxed mb-4"
          style={{ color: 'rgba(253,246,227,0.88)', fontFamily: 'Georgia,serif', minHeight: '2.5rem' }}>
          {text}
        </p>
        <button onClick={onNext}
          className="w-full py-3 rounded-xl text-sm font-bold transition-all active:scale-[0.97]"
          style={{
            background: isLast ? 'linear-gradient(135deg,#C9A84C,#F0D080,#C9A84C)' : 'rgba(201,168,76,0.1)',
            color: isLast ? '#0F1C2E' : 'rgba(253,246,227,0.65)',
            border: isLast ? 'none' : '1px solid rgba(201,168,76,0.22)',
          }}>
          {isLast ? '계속하기 →' : '다음 ▶'}
        </button>
      </div>
    </div>
  );
}

function ChoiceOverlay({ onChoose }: { onChoose: (id: string, faith: number) => void }) {
  return (
    <div className="absolute inset-0 z-40 flex flex-col items-center justify-center px-6"
      style={{ background: 'rgba(0,0,4,0.82)', animation: 'fadeIn 0.55s ease-out both' }}>
      <div className="max-w-sm w-full text-center">
        <p className="text-[10px] uppercase tracking-[0.3em] mb-3"
          style={{ color: 'rgba(201,168,76,0.55)', animation: 'fadeUp 0.5s 0.1s ease-out both' }}>
          ✦ Divine Question ✦
        </p>
        <p className="text-base leading-relaxed mb-8"
          style={{ color: 'rgba(253,246,227,0.88)', fontFamily: 'Georgia,serif', whiteSpace: 'pre-line', animation: 'fadeUp 0.5s 0.25s ease-out both' }}>
          {DIVINE_QUESTION.text}
        </p>
        <div className="space-y-3" style={{ animation: 'fadeUp 0.5s 0.45s ease-out both' }}>
          {DIVINE_QUESTION.choices.map((c) => (
            <button key={c.id} onClick={() => onChoose(c.id, c.faith)}
              className="w-full py-5 rounded-2xl text-left px-5 transition-all active:scale-[0.97]"
              style={{
                background: c.id === 'trust' ? 'rgba(201,168,76,0.12)' : 'rgba(253,246,227,0.04)',
                border: c.id === 'trust' ? '1.5px solid rgba(201,168,76,0.55)' : '1.5px solid rgba(253,246,227,0.14)',
              }}>
              <p className="text-sm font-bold mb-1"
                style={{ color: c.id === 'trust' ? '#C9A84C' : 'rgba(253,246,227,0.72)' }}>
                {c.label}
              </p>
              <p className="text-xs" style={{ color: 'rgba(253,246,227,0.35)' }}>{c.sub}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function ResultOverlay({ choiceId, onContinue }: { choiceId: string; onContinue: () => void }) {
  const lines = RESULT_TEXT[choiceId] ?? RESULT_TEXT.trust;
  return (
    <div className="absolute inset-0 z-40 flex flex-col items-center justify-center px-6"
      style={{ background: choiceId === 'trust' ? 'rgba(201,168,76,0.06)' : 'rgba(0,0,0,0.55)' }}>
      <div className="max-w-sm w-full text-center mb-12">
        {lines.map((l, i) => l === '' ? <div key={i} className="h-3" /> : (
          <p key={i} className="text-base"
            style={{ color: 'rgba(253,246,227,0.88)', fontFamily: 'Georgia,serif', animation: `fadeUp 0.7s ${i * 0.35}s ease-out both` }}>
            {l}
          </p>
        ))}
      </div>
      <button onClick={onContinue}
        className="px-10 py-4 rounded-2xl font-bold text-sm transition-all active:scale-[0.97]"
        style={{ background: 'linear-gradient(135deg,#C9A84C,#F0D080,#C9A84C)', color: '#0F1C2E', animation: `fadeUp 0.6s ${lines.length * 0.35 + 0.3}s ease-out both` }}>
        광야로 →
      </button>
    </div>
  );
}

function WildernessHUD({ faithPoints }: { faithPoints: number }) {
  return (
    <div className="absolute inset-0 z-30 flex flex-col items-center justify-end pb-20 pointer-events-none">
      <div className="text-center" style={{ animation: 'fadeUp 1.2s 0.6s ease-out both' }}>
        <p className="text-xs mb-1 tracking-widest" style={{ color: 'rgba(201,168,76,0.5)' }}>그를 따라가라</p>
        <p className="text-[10px] mb-6" style={{ color: 'rgba(253,246,227,0.25)' }}>Faith +{faithPoints} 획득</p>
        <Link href="/chapter/1"
          className="inline-block px-10 py-4 rounded-2xl font-bold text-sm transition-all active:scale-[0.97] pointer-events-auto"
          style={{ background: 'linear-gradient(135deg,#C9A84C,#F0D080,#C9A84C)', color: '#0F1C2E' }}>
          Chapter 1 · 엔게디 동굴로 →
        </Link>
      </div>
    </div>
  );
}

function MovementHint({ show }: { show: boolean }) {
  if (!show) return null;
  return (
    <div className="absolute inset-x-0 bottom-36 flex justify-center z-20 pointer-events-none">
      <p className="text-[11px] tracking-[0.25em] md:hidden"
        style={{ color: 'rgba(253,246,227,0.18)', animation: 'twBlink 2.4s ease-in-out infinite' }}>
        조이스틱으로 이동하라
      </p>
      <p className="text-[11px] tracking-[0.25em] hidden md:block"
        style={{ color: 'rgba(253,246,227,0.18)', animation: 'twBlink 2.4s ease-in-out infinite' }}>
        WASD / 방향키로 이동하라
      </p>
    </div>
  );
}

// ── Main ─────────────────────────────────────────────────────────
export default function Chapter0Game() {
  const [scene, setScene]           = useState<GameScene>('awakening');
  const [dlgIndex, setDlgIndex]     = useState(-1);
  const [choiceId, setChoiceId]     = useState<string | null>(null);
  const [faithPoints, setFaithPoints] = useState(0);
  const [nearNPC, setNearNPC]       = useState(false);
  const [hasMoved, setHasMoved]     = useState(false);

  // Refs for Three.js loop (avoids stale closures)
  const sceneRef   = useRef<GameScene>('awakening');
  const pausedRef  = useRef(false);
  const nearNPCRef = useRef(false);
  const hasMovedRef = useRef(false);

  const { keys, joystick, setJoystick } = usePlayerControls();

  // Keep refs in sync with state
  useEffect(() => { sceneRef.current  = scene;   pausedRef.current = (scene === 'question' || scene === 'result' || scene === 'wilderness'); }, [scene]);
  useEffect(() => { nearNPCRef.current = nearNPC; }, [nearNPC]);

  // Position callback — stable ref so Three.js loop always has latest version
  const onPositionChangeRef = useRef<(pos: THREE.Vector3) => void>(() => {});
  useEffect(() => {
    onPositionChangeRef.current = (pos: THREE.Vector3) => {
      const sc = sceneRef.current;
      const z  = pos.z;
      if (!hasMovedRef.current && (Math.abs(pos.x) > 0.3 || Math.abs(z) > 0.3)) {
        hasMovedRef.current = true;
        setHasMoved(true);
      }
      if (sc === 'awakening' && z < -9)  setScene('cliff');
      if (sc === 'cliff'     && z < -17) setScene('encounter');
      if (sc === 'encounter') {
        const near = Math.sqrt(pos.x ** 2 + (pos.z + 24) ** 2) < 4.5;
        if (near !== nearNPCRef.current) {
          nearNPCRef.current = near;
          setNearNPC(near);
        }
      }
    };
  });

  // E key → start dialogue
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.code === 'KeyE' || e.code === 'Space') && sceneRef.current === 'encounter' && nearNPCRef.current) {
        beginDialogue();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const beginDialogue = useCallback(() => {
    setScene('question');
    setDlgIndex(0);
  }, []);

  const advanceDialogue = useCallback(() => {
    setDlgIndex(i => (i < ENCOUNTER_LINES.length - 1 ? i + 1 : -1));
  }, []);

  const handleChoice = useCallback((id: string, faith: number) => {
    setChoiceId(id);
    setFaithPoints(p => Math.max(0, p + faith));
    setScene('result');
  }, []);

  const handleResultContinue = useCallback(() => setScene('wilderness'), []);

  const showDialogue = scene === 'question' && dlgIndex >= 0;
  const showChoice   = scene === 'question' && dlgIndex < 0;
  const paused       = scene === 'question' || scene === 'result' || scene === 'wilderness';

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* 3D Canvas */}
      <div className="absolute inset-0">
        <GameCanvas
          scene={scene}
          sceneRef={sceneRef}
          pausedRef={pausedRef}
          controls={keys}
          joystick={joystick}
          onPositionChange={onPositionChangeRef}
        />
      </div>

      {/* Static HUD */}
      <SceneLabel scene={scene} />
      <FaithMeter points={faithPoints} />

      {/* Desktop controls hint */}
      <div className="absolute bottom-3 inset-x-0 flex justify-center z-20 pointer-events-none">
        <p className="text-[10px] tracking-widest hidden md:block"
          style={{ color: 'rgba(253,246,227,0.15)' }}>
          WASD 이동 · E 상호작용
        </p>
      </div>

      <MovementHint show={scene === 'awakening' && !hasMoved} />
      <InteractionPrompt show={nearNPC && scene === 'encounter'} />

      {showDialogue && (
        <DialogueBox
          speaker={ENCOUNTER_LINES[dlgIndex].speaker}
          text={ENCOUNTER_LINES[dlgIndex].text}
          onNext={advanceDialogue}
          isLast={dlgIndex === ENCOUNTER_LINES.length - 1}
        />
      )}

      {showChoice && <ChoiceOverlay onChoose={handleChoice} />}

      {scene === 'result' && choiceId && (
        <ResultOverlay choiceId={choiceId} onContinue={handleResultContinue} />
      )}

      {scene === 'wilderness' && <WildernessHUD faithPoints={faithPoints} />}

      {/* Mobile controls */}
      <div className="md:hidden">
        <VirtualJoystick
          onMove={setJoystick}
          onInteract={nearNPC && scene === 'encounter' ? beginDialogue : undefined}
        />
      </div>
    </div>
  );
}
