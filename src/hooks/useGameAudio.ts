"use client";
import { useRef, useEffect, useCallback } from 'react';
import type { GameScene } from '@/components/game/GameCanvas';

// ── Web Audio API ambient synthesizer ─────────────────────────────────────
// Each scene has a distinct mood built from oscillators + filters.
// No audio files needed — pure synthesis.

interface AudioNodes {
  ctx: AudioContext;
  master: GainNode;
  drones: OscillatorNode[];
  filter: BiquadFilterNode;
  reverb: ConvolverNode | null;
}

function createReverb(ctx: AudioContext, duration = 2.5): ConvolverNode {
  const convolver = ctx.createConvolver();
  const sampleRate = ctx.sampleRate;
  const length = sampleRate * duration;
  const impulse = ctx.createBuffer(2, length, sampleRate);
  for (let c = 0; c < 2; c++) {
    const data = impulse.getChannelData(c);
    for (let i = 0; i < length; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, 2.5);
    }
  }
  convolver.buffer = impulse;
  return convolver;
}

// Scene audio profiles
const SCENE_AUDIO: Record<GameScene, {
  freqs: number[];      // drone frequencies
  filterFreq: number;   // low-pass cutoff
  filterQ: number;
  masterGain: number;
  oscType: OscillatorType;
  detune: number;       // subtle pitch variation per drone
}> = {
  awakening: {
    freqs: [55, 82.5, 110],
    filterFreq: 180, filterQ: 2.5,
    masterGain: 0.10,
    oscType: 'sine',
    detune: 4,
  },
  cliff: {
    freqs: [49, 73.5, 98],
    filterFreq: 220, filterQ: 3,
    masterGain: 0.12,
    oscType: 'sine',
    detune: 6,
  },
  encounter: {
    freqs: [55, 110, 165, 220],
    filterFreq: 400, filterQ: 4,
    masterGain: 0.09,
    oscType: 'sine',
    detune: 2,
  },
  question: {
    freqs: [44, 88, 132],
    filterFreq: 260, filterQ: 5,
    masterGain: 0.11,
    oscType: 'sine',
    detune: 8,
  },
  result: {
    freqs: [55, 110, 165, 330],
    filterFreq: 800, filterQ: 2,
    masterGain: 0.13,
    oscType: 'sine',
    detune: 1,
  },
  wilderness: {
    freqs: [65.4, 130.8, 196.0],
    filterFreq: 500, filterQ: 1.5,
    masterGain: 0.10,
    oscType: 'sine',
    detune: 3,
  },
};

export function useGameAudio() {
  const audioRef = useRef<AudioNodes | null>(null);
  const currentScene = useRef<GameScene | null>(null);
  const transitionRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const initAudio = useCallback(() => {
    if (audioRef.current) return;

    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const master = ctx.createGain();
      master.gain.setValueAtTime(0, ctx.currentTime);
      master.connect(ctx.destination);

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 200;
      filter.Q.value = 2;
      filter.connect(master);

      let reverb: ConvolverNode | null = null;
      try {
        reverb = createReverb(ctx, 3);
        reverb.connect(master);
      } catch {
        // Reverb not critical
      }

      audioRef.current = { ctx, master, drones: [], filter, reverb };
    } catch {
      // Audio not supported — silent fallback
    }
  }, []);

  const setScene = useCallback((scene: GameScene) => {
    if (!audioRef.current) return;
    if (currentScene.current === scene) return;
    currentScene.current = scene;

    const { ctx, master, filter } = audioRef.current;
    const profile = SCENE_AUDIO[scene];
    const now = ctx.currentTime;

    // Fade out old drones
    if (audioRef.current.drones.length > 0) {
      master.gain.setTargetAtTime(0, now, 0.4);
      const oldDrones = audioRef.current.drones;
      setTimeout(() => {
        oldDrones.forEach(o => { try { o.stop(); } catch { /* */ } });
      }, 1500);
      audioRef.current.drones = [];
    }

    // Update filter
    filter.frequency.setTargetAtTime(profile.filterFreq, now, 0.8);
    filter.Q.setTargetAtTime(profile.filterQ, now, 0.8);

    // Create new drones with slight detuning for richness
    const newDrones: OscillatorNode[] = [];
    profile.freqs.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      osc.type = profile.oscType;
      osc.frequency.value = freq;
      osc.detune.value = (i % 2 === 0 ? 1 : -1) * profile.detune * (i + 1);

      const oscGain = ctx.createGain();
      oscGain.gain.value = 0.3 / profile.freqs.length;
      osc.connect(oscGain);

      if (audioRef.current?.reverb) {
        oscGain.connect(audioRef.current.reverb);
      }
      oscGain.connect(filter);

      osc.start(now);
      newDrones.push(osc);
    });

    audioRef.current.drones = newDrones;

    // Fade in new drones
    master.gain.setTargetAtTime(profile.masterGain, now + 0.1, 0.6);

  }, []);

  const resume = useCallback(() => {
    if (audioRef.current?.ctx.state === 'suspended') {
      audioRef.current.ctx.resume();
    }
  }, []);

  const destroy = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.drones.forEach(o => { try { o.stop(); } catch { /* */ } });
      audioRef.current.ctx.close();
      audioRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => destroy();
  }, [destroy]);

  return { initAudio, setScene, resume };
}
