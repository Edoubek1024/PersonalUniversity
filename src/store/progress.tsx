import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import type { Module, Subject } from '@/data/types';

/**
 * All learner state lives here and is persisted to localStorage under one key.
 * Every map is keyed by the stable IDs defined in src/data/types.ts, so the
 * curriculum can grow without invalidating existing progress.
 */
export interface ProgressState {
  version: 1;
  /** lessonId -> ISO timestamp of completion */
  completedLessons: Record<string, string>;
  /** exercise / deliverable / mastery item id -> true */
  checks: Record<string, true>;
  /** lessonId -> markdown notes */
  notes: Record<string, string>;
  /** lessonId or subjectId -> ISO timestamp bookmarked */
  bookmarks: Record<string, string>;
  /** lessonId -> ISO timestamp of last visit */
  lastVisited: Record<string, string>;
  /** selfAssessment item id -> whether the learner felt confident */
  selfChecks: Record<string, 'yes' | 'no'>;
}

const STORAGE_KEY = 'teachme:progress:v1';

export const emptyProgress = (): ProgressState => ({
  version: 1,
  completedLessons: {},
  checks: {},
  notes: {},
  bookmarks: {},
  lastVisited: {},
  selfChecks: {},
});

function load(): ProgressState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyProgress();
    const parsed = JSON.parse(raw) as Partial<ProgressState>;
    return { ...emptyProgress(), ...parsed, version: 1 };
  } catch {
    return emptyProgress();
  }
}

function save(state: ProgressState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* storage unavailable (private mode, quota) — keep in-memory state */
  }
}

export function isProgressState(value: unknown): value is ProgressState {
  if (!value || typeof value !== 'object') return false;
  const v = value as Record<string, unknown>;
  return (
    typeof v.completedLessons === 'object' &&
    typeof v.checks === 'object' &&
    typeof v.notes === 'object' &&
    typeof v.bookmarks === 'object'
  );
}

interface ProgressActions {
  toggleLesson: (lessonId: string) => void;
  setLessonComplete: (lessonId: string, complete: boolean) => void;
  toggleCheck: (id: string) => void;
  setNote: (lessonId: string, text: string) => void;
  toggleBookmark: (id: string) => void;
  visit: (lessonId: string) => void;
  setSelfCheck: (id: string, value: 'yes' | 'no' | null) => void;
  resetAll: () => void;
  resetSubject: (subject: Subject) => void;
  exportJson: () => string;
  importJson: (json: string, mode: 'replace' | 'merge') => { ok: boolean; error?: string };
}

const ProgressContext = createContext<(ProgressState & ProgressActions) | null>(null);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ProgressState>(load);
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    save(state);
  }, [state]);

  // keep tabs in sync
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) setState(load());
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const setLessonComplete = useCallback((lessonId: string, complete: boolean) => {
    setState((s) => {
      const completedLessons = { ...s.completedLessons };
      if (complete) completedLessons[lessonId] = new Date().toISOString();
      else delete completedLessons[lessonId];
      return { ...s, completedLessons };
    });
  }, []);

  const toggleLesson = useCallback(
    (lessonId: string) => {
      setState((s) => {
        const completedLessons = { ...s.completedLessons };
        if (completedLessons[lessonId]) delete completedLessons[lessonId];
        else completedLessons[lessonId] = new Date().toISOString();
        return { ...s, completedLessons };
      });
    },
    [],
  );

  const toggleCheck = useCallback((id: string) => {
    setState((s) => {
      const checks = { ...s.checks };
      if (checks[id]) delete checks[id];
      else checks[id] = true;
      return { ...s, checks };
    });
  }, []);

  const setNote = useCallback((lessonId: string, text: string) => {
    setState((s) => {
      const notes = { ...s.notes };
      if (text.trim()) notes[lessonId] = text;
      else delete notes[lessonId];
      return { ...s, notes };
    });
  }, []);

  const toggleBookmark = useCallback((id: string) => {
    setState((s) => {
      const bookmarks = { ...s.bookmarks };
      if (bookmarks[id]) delete bookmarks[id];
      else bookmarks[id] = new Date().toISOString();
      return { ...s, bookmarks };
    });
  }, []);

  const visit = useCallback((lessonId: string) => {
    setState((s) => ({ ...s, lastVisited: { ...s.lastVisited, [lessonId]: new Date().toISOString() } }));
  }, []);

  const setSelfCheck = useCallback((id: string, value: 'yes' | 'no' | null) => {
    setState((s) => {
      const selfChecks = { ...s.selfChecks };
      if (value) selfChecks[id] = value;
      else delete selfChecks[id];
      return { ...s, selfChecks };
    });
  }, []);

  const resetAll = useCallback(() => setState(emptyProgress()), []);

  const resetSubject = useCallback((subject: Subject) => {
    setState((s) => {
      const prefix = subject.id + '/';
      const strip = <T,>(rec: Record<string, T>) =>
        Object.fromEntries(Object.entries(rec).filter(([k]) => !k.startsWith(prefix) && !k.startsWith(subject.id + '#')));
      return {
        ...s,
        completedLessons: strip(s.completedLessons),
        checks: strip(s.checks),
        notes: strip(s.notes),
        lastVisited: strip(s.lastVisited),
        selfChecks: strip(s.selfChecks),
      };
    });
  }, []);

  const exportJson = useCallback(() => JSON.stringify({ ...state, exportedAt: new Date().toISOString() }, null, 2), [state]);

  const importJson = useCallback((json: string, mode: 'replace' | 'merge') => {
    try {
      const parsed = JSON.parse(json) as unknown;
      if (!isProgressState(parsed)) return { ok: false, error: 'File does not look like a Teach Me progress export.' };
      setState((s) =>
        mode === 'replace'
          ? { ...emptyProgress(), ...parsed, version: 1 }
          : {
              version: 1,
              completedLessons: { ...s.completedLessons, ...parsed.completedLessons },
              checks: { ...s.checks, ...parsed.checks },
              notes: { ...s.notes, ...parsed.notes },
              bookmarks: { ...s.bookmarks, ...parsed.bookmarks },
              lastVisited: { ...s.lastVisited, ...(parsed.lastVisited ?? {}) },
              selfChecks: { ...s.selfChecks, ...(parsed.selfChecks ?? {}) },
            },
      );
      return { ok: true };
    } catch (e) {
      return { ok: false, error: (e as Error).message };
    }
  }, []);

  const value = useMemo(
    () => ({
      ...state,
      toggleLesson,
      setLessonComplete,
      toggleCheck,
      setNote,
      toggleBookmark,
      visit,
      setSelfCheck,
      resetAll,
      resetSubject,
      exportJson,
      importJson,
    }),
    [state, toggleLesson, setLessonComplete, toggleCheck, setNote, toggleBookmark, visit, setSelfCheck, resetAll, resetSubject, exportJson, importJson],
  );

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error('useProgress must be used inside ProgressProvider');
  return ctx;
}

/* ---------- derived helpers ---------- */

export interface Completion {
  done: number;
  total: number;
  pct: number;
}

export function moduleCompletion(m: Module, completed: Record<string, string>): Completion {
  const total = m.lessons.length;
  const done = m.lessons.filter((l) => completed[l.id]).length;
  return { done, total, pct: total ? Math.round((done / total) * 100) : 0 };
}

export function subjectCompletion(s: Subject, completed: Record<string, string>): Completion {
  const total = s.lessonCount;
  const done = s.lessons.filter((l) => completed[l.id]).length;
  return { done, total, pct: total ? Math.round((done / total) * 100) : 0 };
}

export type SubjectStatus = 'not-started' | 'active' | 'complete';

export function subjectStatus(s: Subject, completed: Record<string, string>): SubjectStatus {
  const c = subjectCompletion(s, completed);
  if (c.done === 0) return 'not-started';
  if (c.done === c.total) return 'complete';
  return 'active';
}
