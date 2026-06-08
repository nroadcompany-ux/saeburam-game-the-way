import { useRef, useEffect, useCallback } from 'react';

export interface Controls {
  forward: boolean;
  backward: boolean;
  left: boolean;
  right: boolean;
  interact: boolean;
}

export interface JoystickState {
  x: number;
  y: number;
}

export function usePlayerControls() {
  const keys = useRef<Controls>({
    forward: false,
    backward: false,
    left: false,
    right: false,
    interact: false,
  });

  const joystick = useRef<JoystickState>({ x: 0, y: 0 });

  useEffect(() => {
    const onDown = (e: KeyboardEvent) => {
      switch (e.code) {
        case 'KeyW': case 'ArrowUp':    keys.current.forward  = true; break;
        case 'KeyS': case 'ArrowDown':  keys.current.backward = true; break;
        case 'KeyA': case 'ArrowLeft':  keys.current.left     = true; break;
        case 'KeyD': case 'ArrowRight': keys.current.right    = true; break;
        case 'KeyE': case 'Space':      keys.current.interact = true; break;
      }
    };
    const onUp = (e: KeyboardEvent) => {
      switch (e.code) {
        case 'KeyW': case 'ArrowUp':    keys.current.forward  = false; break;
        case 'KeyS': case 'ArrowDown':  keys.current.backward = false; break;
        case 'KeyA': case 'ArrowLeft':  keys.current.left     = false; break;
        case 'KeyD': case 'ArrowRight': keys.current.right    = false; break;
        case 'KeyE': case 'Space':      keys.current.interact = false; break;
      }
    };
    window.addEventListener('keydown', onDown);
    window.addEventListener('keyup', onUp);
    return () => {
      window.removeEventListener('keydown', onDown);
      window.removeEventListener('keyup', onUp);
    };
  }, []);

  const setJoystick = useCallback((x: number, y: number) => {
    joystick.current = { x, y };
  }, []);

  return { keys, joystick, setJoystick };
}
