"use client";
import { useRef, useCallback } from 'react';

interface Props {
  onMove: (x: number, y: number) => void;
  onInteract?: () => void;
}

export default function VirtualJoystick({ onMove, onInteract }: Props) {
  const baseRef = useRef<HTMLDivElement>(null);
  const knobRef = useRef<HTMLDivElement>(null);
  const activeTouch = useRef<number | null>(null);
  const center = useRef({ x: 0, y: 0 });
  const MAX = 44;

  const start = useCallback((e: React.TouchEvent) => {
    if (activeTouch.current !== null) return;
    const t = e.changedTouches[0];
    activeTouch.current = t.identifier;
    const rect = baseRef.current!.getBoundingClientRect();
    center.current = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
  }, []);

  const move = useCallback((e: React.TouchEvent) => {
    e.preventDefault();
    for (let i = 0; i < e.changedTouches.length; i++) {
      const t = e.changedTouches[i];
      if (t.identifier !== activeTouch.current) continue;
      const dx = t.clientX - center.current.x;
      const dy = t.clientY - center.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const ratio = Math.min(dist, MAX) / Math.max(dist, 0.001);
      const cx = dx * ratio;
      const cy = dy * ratio;
      if (knobRef.current) knobRef.current.style.transform = `translate(${cx}px,${cy}px)`;
      onMove(cx / MAX, cy / MAX);
    }
  }, [onMove]);

  const end = useCallback((e: React.TouchEvent) => {
    for (let i = 0; i < e.changedTouches.length; i++) {
      if (e.changedTouches[i].identifier === activeTouch.current) {
        activeTouch.current = null;
        if (knobRef.current) knobRef.current.style.transform = 'translate(0,0)';
        onMove(0, 0);
      }
    }
  }, [onMove]);

  return (
    <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between px-6 pb-8 z-20"
      style={{ touchAction: 'none' }}>
      {/* Left: Movement joystick */}
      <div
        ref={baseRef}
        className="relative w-28 h-28 rounded-full flex items-center justify-center select-none"
        style={{ background: 'rgba(255,255,255,0.05)', border: '1.5px solid rgba(255,255,255,0.12)' }}
        onTouchStart={start}
        onTouchMove={move}
        onTouchEnd={end}
        onTouchCancel={end}
      >
        <div
          ref={knobRef}
          className="w-12 h-12 rounded-full pointer-events-none"
          style={{
            background: 'rgba(201,168,76,0.4)',
            border: '1.5px solid rgba(201,168,76,0.7)',
          }}
        />
      </div>

      {/* Right: Interact button */}
      {onInteract && (
        <button
          onTouchStart={(e) => { e.preventDefault(); onInteract(); }}
          className="w-16 h-16 rounded-full flex items-center justify-center font-bold text-xs select-none active:scale-90 transition-transform"
          style={{
            background: 'rgba(201,168,76,0.15)',
            border: '1.5px solid rgba(201,168,76,0.5)',
            color: '#C9A84C',
            touchAction: 'none',
          }}
        >
          대화
        </button>
      )}
    </div>
  );
}
