/**
 * Statistiques locales de l'utilisateur (localStorage).
 * Données réelles d'usage : visites (série), minutes de lecture,
 * sessions Tajwid, sourates lues.
 */

const KEY = 'SAKINA_STATS_V1';

export interface Stats {
  /** Jours de visite au format YYYY-MM-DD (série) */
  visitDays: string[];
  /** Minutes de lecture par jour { 'YYYY-MM-DD': minutes } */
  readingMinutes: Record<string, number>;
  /** Sessions Tajwid : score 0..100 + date */
  tajweedSessions: Array<{ date: string; score: number }>;
  /** Numéros de sourates ouvertes en lecture */
  surahsRead: number[];
  /** Versets récités analysés (cumul) */
  versesRecited: number;
}

const EMPTY: Stats = {
  visitDays: [],
  readingMinutes: {},
  tajweedSessions: [],
  surahsRead: [],
  versesRecited: 0,
};

function todayKey(d = new Date()): string {
  return d.toISOString().slice(0, 10);
}

export function getStats(): Stats {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return { ...EMPTY, ...JSON.parse(raw) };
  } catch (_) { /* corrompu */ }
  return { ...EMPTY };
}

function save(s: Stats) {
  try {
    localStorage.setItem(KEY, JSON.stringify(s));
  } catch (_) { /* quota */ }
}

export function recordVisit() {
  const s = getStats();
  const today = todayKey();
  if (!s.visitDays.includes(today)) {
    s.visitDays.push(today);
    if (s.visitDays.length > 400) s.visitDays = s.visitDays.slice(-400);
    save(s);
  }
}

export function addReadingMinute() {
  const s = getStats();
  const today = todayKey();
  s.readingMinutes[today] = (s.readingMinutes[today] || 0) + 1;
  save(s);
}

export function recordTajweedSession(score: number) {
  const s = getStats();
  s.tajweedSessions.push({ date: todayKey(), score });
  if (s.tajweedSessions.length > 200) s.tajweedSessions = s.tajweedSessions.slice(-200);
  save(s);
}

export function markSurahRead(n: number) {
  const s = getStats();
  if (!s.surahsRead.includes(n)) {
    s.surahsRead.push(n);
    save(s);
  }
}

export function addVersesRecited(count: number) {
  const s = getStats();
  s.versesRecited += count;
  save(s);
}

/** Série de jours consécutifs terminant aujourd'hui ou hier. */
export function computeStreak(s: Stats): number {
  const days = new Set(s.visitDays);
  let streak = 0;
  const d = new Date();
  // La série tient si la dernière visite est aujourd'hui ou hier
  if (!days.has(todayKey(d))) d.setDate(d.getDate() - 1);
  while (days.has(todayKey(d))) {
    streak++;
    d.setDate(d.getDate() - 1);
  }
  return streak;
}

/** Minutes de lecture des 7 derniers jours (lun → dim glissant). */
export function last7Days(s: Stats): Array<{ day: string; date: string; minutes: number }> {
  const out: Array<{ day: string; date: string; minutes: number }> = [];
  const labels = ['D', 'L', 'M', 'M', 'J', 'V', 'S'];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const key = todayKey(d);
    out.push({ day: labels[d.getDay()], date: key, minutes: s.readingMinutes[key] || 0 });
  }
  return out;
}

export function bestTajweedScore(s: Stats): number | null {
  if (!s.tajweedSessions.length) return null;
  return Math.max(...s.tajweedSessions.map((x) => x.score));
}
