/**
 * Service Coran complet : récupère le texte arabe + la traduction française
 * (Muhammad Hamidullah) pour les 114 sourates via l'API AlQuran Cloud,
 * avec mise en cache locale, et détecte quel verset est récité.
 *
 * Utilisé pour :
 *  - la traduction en temps réel qui défile pendant la récitation
 *  - la traduction verset par verset après l'enregistrement (sourate entière)
 */

const API_BASE = 'https://api.alquran.cloud/v1';

export interface FullVerse {
  surah: number;
  ayah: number;
  arabic: string;   // texte arabe vocalisé (pour l'affichage)
  french: string;   // traduction Hamidullah
  norm: string;     // texte arabe normalisé (pour la détection)
}

interface IndexEntry {
  s: number;  // sourate
  a: number;  // verset
  n: string;  // arabe normalisé
}

/** Normalise le texte arabe pour la comparaison (sans diacritiques ni hamza). */
export function normalizeArabic(text: string): string {
  return (text || '')
    .replace(/[ً-ٰٟـ]/g, '')     // diacritiques + tatweel
    .replace(/[آأإٱ]/g, 'ا') // variantes de alef → alef
    .replace(/ة/g, 'ه')                     // ta marbuta → ha
    .replace(/ى/g, 'ي')                     // alef maksura → ya
    .replace(/ؤ/g, 'و')                     // waw hamza → waw
    .replace(/ئ/g, 'ي')                     // ya hamza → ya
    .replace(/ء/g, '')                           // hamza isolée
    .replace(/[^؀-ۿ]/g, ' ')                // tout le reste → espace
    .replace(/\s+/g, ' ')
    .trim();
}

// ── Cache mémoire ─────────────────────────────────────────────────
let matchIndex: IndexEntry[] | null = null;
const surahCache: Record<number, FullVerse[]> = {};

/**
 * Charge l'index de détection (tous les versets normalisés).
 * Mis en cache dans localStorage pour ne le télécharger qu'une fois.
 */
export async function getMatchIndex(): Promise<IndexEntry[]> {
  if (matchIndex) return matchIndex;

  const CACHE_KEY = 'QURAN_INDEX_V1';
  const cached = localStorage.getItem(CACHE_KEY);
  if (cached) {
    try {
      matchIndex = JSON.parse(cached);
      return matchIndex!;
    } catch (_) {
      /* cache corrompu → on retélécharge */
    }
  }

  const res = await fetch(`${API_BASE}/quran/quran-uthmani`);
  if (!res.ok) throw new Error('Impossible de charger le Coran');
  const data = await res.json();

  const index: IndexEntry[] = [];
  for (const surah of data.data.surahs) {
    for (const ayah of surah.ayahs) {
      index.push({ s: surah.number, a: ayah.numberInSurah, n: normalizeArabic(ayah.text) });
    }
  }

  matchIndex = index;
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(index));
  } catch (_) {
    /* quota dépassé : on garde juste le cache mémoire */
  }
  return index;
}

/**
 * Charge une sourate complète (arabe vocalisé + traduction française).
 */
export async function getSurah(surahNumber: number): Promise<FullVerse[]> {
  if (surahCache[surahNumber]) return surahCache[surahNumber];

  const CACHE_KEY = `QURAN_SURAH_${surahNumber}_V1`;
  const cached = localStorage.getItem(CACHE_KEY);
  if (cached) {
    try {
      const parsed = JSON.parse(cached);
      surahCache[surahNumber] = parsed;
      return parsed;
    } catch (_) {
      /* on retélécharge */
    }
  }

  // arabe + français en parallèle
  const [arRes, frRes] = await Promise.all([
    fetch(`${API_BASE}/surah/${surahNumber}/quran-uthmani`),
    fetch(`${API_BASE}/surah/${surahNumber}/fr.hamidullah`),
  ]);
  if (!arRes.ok || !frRes.ok) throw new Error('Impossible de charger la sourate');

  const arData = await arRes.json();
  const frData = await frRes.json();

  const verses: FullVerse[] = arData.data.ayahs.map((ayah: any, i: number) => ({
    surah: surahNumber,
    ayah: ayah.numberInSurah,
    arabic: ayah.text,
    french: frData.data.ayahs[i]?.text || '',
    norm: normalizeArabic(ayah.text),
  }));

  surahCache[surahNumber] = verses;
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(verses));
  } catch (_) {
    /* quota */
  }
  return verses;
}

/** Fraction des mots du verset présents dans le texte récité (0 à 1). */
function verseCoverage(verseNorm: string, textWords: Set<string>): number {
  const vw = verseNorm.split(' ').filter(Boolean);
  if (vw.length === 0) return 0;
  let common = 0;
  for (const w of vw) if (textWords.has(w)) common++;
  return common / vw.length;
}

/**
 * Détecte le verset le plus probable pour un texte arabe reconnu (temps réel).
 * Renvoie la référence {surah, ayah} ou null si rien de fiable.
 */
export async function detectVerse(recognizedArabic: string): Promise<{ surah: number; ayah: number } | null> {
  const words = normalizeArabic(recognizedArabic).split(' ').filter(Boolean);
  if (words.length < 2) return null;

  // On se concentre sur les derniers mots reconnus (le verset en cours)
  const tail = words.slice(-12);
  const phraseSet = new Set(tail);

  const index = await getMatchIndex();
  let best: { s: number; a: number; score: number } | null = null;

  for (const entry of index) {
    const vw = entry.n.split(' ').filter(Boolean);
    if (vw.length === 0) continue;
    // couverture du verset par la phrase ET de la phrase par le verset
    let common = 0;
    for (const w of vw) if (phraseSet.has(w)) common++;
    const cov = common / vw.length;
    const pcov = common / tail.length;
    const score = Math.min(cov, pcov);
    if (!best || score > best.score) best = { s: entry.s, a: entry.a, score };
  }

  if (best && best.score >= 0.5) return { surah: best.s, ayah: best.a };
  return null;
}

/**
 * Après l'enregistrement : découpe une transcription (sourate entière) en
 * une liste de versets identifiés avec leur traduction française.
 */
export async function splitTranscriptionIntoVerses(transcription: string): Promise<FullVerse[]> {
  const normFull = normalizeArabic(transcription);
  if (!normFull) return [];

  const index = await getMatchIndex();
  const textWords = new Set(normFull.split(' ').filter(Boolean));

  // 1. Sourate la plus probable = celle qui a le PLUS de versets bien couverts
  //    (on compte les versets, pas les mots → les longues sourates ne gagnent
  //     plus par défaut)
  const covered: Record<number, number> = {};
  for (const entry of index) {
    if (verseCoverage(entry.n, textWords) >= 0.6) {
      covered[entry.s] = (covered[entry.s] || 0) + 1;
    }
  }
  let bestSurah = 0;
  let bestCount = 0;
  for (const s of Object.keys(covered)) {
    if (covered[+s] > bestCount) {
      bestCount = covered[+s];
      bestSurah = +s;
    }
  }
  if (!bestSurah) return [];

  // 2. Récupérer la sourate et garder les versets réellement récités
  const surah = await getSurah(bestSurah);
  const recited = surah.filter(v => verseCoverage(v.norm, textWords) >= 0.6);

  return recited.length > 0 ? recited : surah;
}
