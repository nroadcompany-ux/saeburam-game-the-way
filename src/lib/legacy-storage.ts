/**
 * THE WAY - Legacy Storage
 * Dual save: localStorage (offline) + Supabase (cloud)
 */
import { supabase } from './supabase';

export interface LegacyEntry {
  id: string;
  emotion: { id: string; name: string; emoji: string };
  intensity: 1 | 2 | 3;
  companion?: { name: string; emoji: string; color: string } | null;
  prayer: string;
  whisper: { message: string; scripture: string; reference: string; character: string };
  obedience: { action: string; description: string };
  testimony: string;
  created_at: string;
  completed_at?: string;
}

const LS_KEY = 'legacies';
const DEVICE_ID_KEY = 'the_way_device_id';

// ─── Device ID ─────────────────────────────────────────────────────────────────

function getDeviceId(): string {
  if (typeof window === 'undefined') return 'server';
  let id = localStorage.getItem(DEVICE_ID_KEY);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(DEVICE_ID_KEY, id);
  }
  return id;
}

// ─── localStorage helpers ──────────────────────────────────────────────────────

function getLocalLegacies(): LegacyEntry[] {
  if (typeof window === 'undefined') return [];
  return JSON.parse(localStorage.getItem(LS_KEY) || '[]');
}

function saveLocalLegacies(legacies: LegacyEntry[]): void {
  localStorage.setItem(LS_KEY, JSON.stringify(legacies));
}

// ─── Public API ────────────────────────────────────────────────────────────────

/**
 * Load all legacies — tries Supabase first, falls back to localStorage
 */
export async function loadLegacies(): Promise<LegacyEntry[]> {
  const deviceId = getDeviceId();

  try {
    const { data, error } = await supabase
      .from('the_way_legacies')
      .select('*')
      .eq('device_id', deviceId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    if (!data || data.length === 0) {
      // Supabase에 없으면 localStorage fallback
      return getLocalLegacies().sort(
        (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    }

    // Supabase 데이터를 LegacyEntry 형태로 변환
    const entries: LegacyEntry[] = data.map((row) => ({
      id: row.id,
      emotion: row.emotion,
      intensity: row.intensity as 1 | 2 | 3,
      companion: row.companion ?? undefined,
      prayer: row.prayer,
      whisper: row.whisper,
      obedience: row.obedience,
      testimony: row.testimony,
      created_at: row.created_at,
      completed_at: row.completed_at ?? undefined,
    }));

    // localStorage도 동기화
    saveLocalLegacies(entries);
    return entries;
  } catch {
    // Supabase 실패 시 localStorage fallback
    return getLocalLegacies().sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  }
}

/**
 * Save a new legacy entry
 */
export async function saveLegacy(entry: LegacyEntry): Promise<{ ok: boolean; error?: string }> {
  const deviceId = getDeviceId();

  // localStorage 먼저 저장 (오프라인 보장)
  const existing = getLocalLegacies();
  existing.push(entry);
  saveLocalLegacies(existing);

  // Supabase 저장
  try {
    const { error } = await supabase.from('the_way_legacies').insert({
      id: entry.id,
      device_id: deviceId,
      emotion: entry.emotion,
      intensity: entry.intensity,
      companion: entry.companion ?? null,
      prayer: entry.prayer,
      whisper: entry.whisper,
      obedience: entry.obedience,
      testimony: entry.testimony,
      created_at: entry.created_at,
      completed_at: entry.completed_at ?? null,
    });

    if (error) throw error;
    return { ok: true };
  } catch (err) {
    return { ok: false, error: String(err) };
  }
}

/**
 * Toggle obedience completion
 */
export async function toggleCompletion(
  id: string,
  completedAt: string | undefined
): Promise<void> {
  const deviceId = getDeviceId();

  // localStorage 업데이트
  const legacies = getLocalLegacies().map((l) =>
    l.id === id ? { ...l, completed_at: completedAt } : l
  );
  saveLocalLegacies(legacies);

  // Supabase 업데이트
  try {
    await supabase
      .from('the_way_legacies')
      .update({ completed_at: completedAt ?? null })
      .eq('id', id)
      .eq('device_id', deviceId);
  } catch {
    // silent fail — localStorage already updated
  }
}
