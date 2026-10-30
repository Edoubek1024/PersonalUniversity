import { subjects } from '@/data/subjects';
import { learningPaths } from '@/data/paths';
import { courseworkHref, courseworkLabel } from '@/lib/coursework';

export type SearchHit =
  | { kind: 'subject'; id: string; title: string; subtitle: string; href: string; score: number }
  | { kind: 'lesson'; id: string; title: string; subtitle: string; href: string; score: number }
  | { kind: 'project'; id: string; title: string; subtitle: string; href: string; score: number }
  | { kind: 'path'; id: string; title: string; subtitle: string; href: string; score: number };

interface Entry {
  hit: Omit<SearchHit, 'score'>;
  haystack: string;
  titleLower: string;
}

let index: Entry[] | null = null;

function build(): Entry[] {
  const entries: Entry[] = [];
  for (const s of subjects) {
    entries.push({
      hit: { kind: 'subject', id: s.id, title: s.title, subtitle: s.tagline, href: `/subjects/${s.id}` },
      haystack: [s.title, s.tagline, s.tags.join(' '), s.description].join(' ').toLowerCase(),
      titleLower: s.title.toLowerCase(),
    });
    for (const item of s.coursework?.items ?? []) {
      entries.push({
        hit: { kind: 'project', id: item.id, title: item.title, subtitle: `${s.title} · ${courseworkLabel(item)}`, href: courseworkHref(item) },
        haystack: [item.title, item.summary, item.language, courseworkLabel(item)].join(' ').toLowerCase(),
        titleLower: item.title.toLowerCase(),
      });
    }
    for (const m of s.modules) {
      for (const l of m.lessons) {
        entries.push({
          hit: { kind: 'lesson', id: l.id, title: l.title, subtitle: `${s.title} · ${m.title}`, href: `/subjects/${l.id}` },
          haystack: [l.title, l.summary, l.concepts.join(' '), l.objectives.join(' ')].join(' ').toLowerCase(),
          titleLower: l.title.toLowerCase(),
        });
      }
    }
  }
  for (const p of learningPaths) {
    entries.push({
      hit: { kind: 'path', id: p.id, title: p.title, subtitle: 'Learning path', href: `/paths/${p.id}` },
      haystack: [p.title, p.description].join(' ').toLowerCase(),
      titleLower: p.title.toLowerCase(),
    });
  }
  return entries;
}

export function search(query: string, limit = 12): SearchHit[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  if (!index) index = build();
  const terms = q.split(/\s+/).filter(Boolean);
  const hits: SearchHit[] = [];
  for (const e of index) {
    let score = 0;
    for (const t of terms) {
      if (e.titleLower === t) score += 10;
      else if (e.titleLower.startsWith(t)) score += 6;
      else if (e.titleLower.includes(t)) score += 4;
      else if (e.haystack.includes(t)) score += 1;
      else {
        score = 0;
        break;
      }
    }
    if (score > 0) {
      if (e.hit.kind === 'subject') score += 2;
      hits.push({ ...e.hit, score });
    }
  }
  return hits.sort((a, b) => b.score - a.score).slice(0, limit);
}
