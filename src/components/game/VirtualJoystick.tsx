"use client";
import { useRef, useCallback, useState } from 'react';

interface Props {
  onMove: (x: number, y: number) => void;
  onInteract?: () => void;
}

export default function VirtualJoystick({ onMove, onInteract }: Props) {
  const activeTouch = useRef<number | null>(null);
  const [base, setBase] = useState<{ x: number; y: number } | null>(null);
  const [knob, setKnob] = useState({ x: 0, y: 0 });
  const MAX = 48;

  const start = useCallback((e: React.TouchEvent) => {
    if (activeTouch.current !== null) return;
    const t = e.changedTouches[0];
    activeTouch.current = t.identifier;
    setBase({ x: t.clientX, y: t.clientY });
    setKnob({ x: 0, y: 0 });
  }, []);

  const move = useCallback((e: React.TouchEvent) => {
    e.preventDefault();
    if (activeTouch.current === null) return;
    for (let i = 0; i < e.changedTouches.length; i++) {
      const t = e.changedTouches[i];
      if (t.identifier !== activeTouch.current) continue;
      setBase(b => {
        if (!b) return b;
        const dx = t.clientX - b.x;
        const dy = t.clientY - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const ratio = Math.min(dist, MAX) / Math.max(dist, 0.001);
        const cx = dx * ratio;
        const cy = dy * ratio;
        setKnob({ x: cx, y: cy });
        onMove(cx / MAX, cy / MAX);
        return b;
      });
    }
  }, [onMove]);

  const end = useCallback((e: React.TouchEvent) => {
    for (let i = 0; i < e.changedTouches.length; i++) {
      if (e.changedTouches[i].identifier === activeTouch.current) {
        activeTouch.current = null;
        setBase(null);
        setKnob({ x: 0, y: 0 });
        onMove(0, 0);
      }
    }
  }, [onMove]);

  return (
    <div
      className="absolute inset-0 z-20"
      style={{ touchAction: 'none', pointerEvents: 'none' }}
    >
      {/* Invisible left-half touch zone for movement */}
      <div
        className="absolute left-0 top-0 bottom-0"
        style={{ width: '55%', pointerEvents: 'auto' }}
        onTouchStart={start}
        onTouchMove={move}
        onTouchEnd={end}
        onTouchCancel={end}
      />

      {/* Floating joystick base — appears at touch origin */}
      {base && (
        <div
          className="absolute pointer-events-none"
          style={{
            left: base.x - 44,
            top: base.y - 44,
            width: 88,
            height: 88,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.04)',
            border: '1.5px solid rgba(255,255,255,0.12)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              background: 'rgba(201,168,76,0.45)',
              border: '1.5px solid rgba(201,168,76,0.7)',
              transform: `translate(${knob.x}px, ${knob.y}px)`,
              transition: 'transform 0.02s linear',
            }}
          />
        </div>
      )}

      {/* Interact button — right side, always visible when onInteract provided */}
      {onInteract && (
        <button
          className="absolute right-6 bottom-20 w-16 h-16 rounded-full flex items-center justify-center font-bold text-xs select-none active:scale-90 transition-transform"
          style={{
            background: 'rgba(201,168,76,0.15)',
            border: '1.5px solid rgba(201,168,76,0.5)',
            color: '#C9A84C',
            touchAction: 'none',
            pointerEvents: 'auto',
            animation: 'fadeUp 0.3s ease-out both',
          }}
          onTouchStart={(e) => { e.preventDefault(); onInteract(); }}
        >
          대화
        </button>
      )}
    </div>
  );
}
