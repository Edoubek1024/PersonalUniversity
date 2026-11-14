import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { universityById, type University, type UniversityId } from '@/data/universities';

/** Display preferences, kept apart from learner progress so a progress import never changes them. */
interface Settings {
  /** Label subjects by the chosen university's course codes and list those subjects first. */
  courseCodes: boolean;
  university: UniversityId;
}

const KEY = 'teachme:settings';
const defaults: Settings = { courseCodes: false, university: 'uiuc' };

function load(): Settings {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return defaults;
    const parsed = JSON.parse(raw) as Partial<Settings>;
    return {
      courseCodes: typeof parsed.courseCodes === 'boolean' ? parsed.courseCodes : defaults.courseCodes,
      university: parsed.university && parsed.university in universityById ? parsed.university : defaults.university,
    };
  } catch {
    return defaults;
  }
}

interface SettingsContextValue extends Settings {
  setCourseCodes: (on: boolean) => void;
  setUniversity: (id: UniversityId) => void;
}

const SettingsContext = createContext<SettingsContextValue | null>(null);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<Settings>(load);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(settings));
    } catch {
      /* storage unavailable — keep in-memory settings */
    }
  }, [settings]);

  // keep tabs in sync
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === KEY) setSettings(load());
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const setCourseCodes = useCallback((courseCodes: boolean) => setSettings((s) => ({ ...s, courseCodes })), []);
  const setUniversity = useCallback((university: UniversityId) => setSettings((s) => ({ ...s, university })), []);
  const value = useMemo(() => ({ ...settings, setCourseCodes, setUniversity }), [settings, setCourseCodes, setUniversity]);
  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error('useSettings must be used inside SettingsProvider');
  return ctx;
}

export interface CourseCodes {
  /** True when course-code mode is on. */
  enabled: boolean;
  university: University;
  /** The subject's course code when the mode is on and the subject has one. */
  code: (subjectId: string) => string | undefined;
  /** "MATH 241 (Calculus III)" when the mode is on and the subject has a code; otherwise the title. */
  label: (subject: { id: string; title: string }) => string;
}

/** Subject naming under the current course-code setting. */
export function useCourseCodes(): CourseCodes {
  const { courseCodes, university } = useSettings();
  return useMemo(() => {
    const u = universityById[university];
    const code = (id: string) => (courseCodes ? u.codes[id] : undefined);
    return {
      enabled: courseCodes,
      university: u,
      code,
      label: (s) => {
        const c = code(s.id);
        return c ? `${c} (${s.title})` : s.title;
      },
    };
  }, [courseCodes, university]);
}
