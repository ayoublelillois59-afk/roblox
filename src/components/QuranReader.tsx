import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen, ChevronLeft, ChevronRight, Eye, Heart, Loader2, Share2, X,
} from 'lucide-react';
import { PCard, GoldHairline, EASE } from '@/components/premium';
import { cn } from '@/lib/utils';

interface Ayah {
  number: number;
  text: string;
  numberInSurah: number;
}

interface SurahMeta {
  number: number;
  name: string;        // nom arabe
  englishName: string; // nom translittéré
  numberOfAyahs: number;
}

interface SurahData {
  arabic: Ayah[];
  translation: Ayah[];
}

interface TafsirData {
  surah: number;
  verse: number;
  arabic: string | null;
  french: string | null;
  source: string;
}

const FAV_KEY = 'FAVORITE_VERSES_V1';

function getFavorites(): string[] {
  try {
    return JSON.parse(localStorage.getItem(FAV_KEY) || '[]');
  } catch (_) {
    return [];
  }
}

interface QuranReaderProps {
  initialSurah?: number;
  initialVerse?: number | null;
}

export default function QuranReader({ initialSurah = 1, initialVerse = null }: QuranReaderProps) {
  const [surahs, setSurahs] = useState<SurahMeta[]>([]);
  const [selectedSurah, setSelectedSurah] = useState(initialSurah);
  const [surahData, setSurahData] = useState<SurahData | null>(null);
  const [loading, setLoading] = useState(false);
  const [showTranslation, setShowTranslation] = useState(true);
  const [focusMode, setFocusMode] = useState(false);
  const [favorites, setFavorites] = useState<string[]>(getFavorites());
  const [tafsir, setTafsir] = useState<TafsirData | null>(null);
  const [loadingTafsir, setLoadingTafsir] = useState(false);

  /* ── Liste des 114 sourates (API, cache local) ──────────────── */
  useEffect(() => {
    const cached = localStorage.getItem('SURAH_LIST_V1');
    if (cached) {
      try {
        setSurahs(JSON.parse(cached));
        return;
      } catch (_) { /* retélécharge */ }
    }
    fetch('https://api.alquran.cloud/v1/surah')
      .then((r) => r.json())
      .then((d) => {
        const list = d.data.map((s: any) => ({
          number: s.number,
          name: s.name,
          englishName: s.englishName,
          numberOfAyahs: s.numberOfAyahs,
        }));
        setSurahs(list);
        try {
          localStorage.setItem('SURAH_LIST_V1', JSON.stringify(list));
        } catch (_) { /* quota */ }
      })
      .catch(() => { /* la lecture reste possible sans la liste */ });
  }, []);

  const currentMeta = surahs.find((s) => s.number === selectedSurah);

  /* ── Chargement de la sourate ───────────────────────────────── */
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    Promise.all([
      fetch(`https://api.alquran.cloud/v1/surah/${selectedSurah}`).then((r) => r.json()),
      fetch(`https://api.alquran.cloud/v1/surah/${selectedSurah}/fr.hamidullah`).then((r) => r.json()),
    ])
      .then(([ar, fr]) => {
        if (!cancelled) {
          setSurahData({ arabic: ar.data.ayahs, translation: fr.data.ayahs });
        }
      })
      .catch(() => { /* réseau */ })
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [selectedSurah]);

  /* ── Scroll vers le verset demandé ──────────────────────────── */
  useEffect(() => {
    if (initialVerse && surahData) {
      setTimeout(() => {
        document
          .getElementById(`verse-${initialVerse}`)
          ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 400);
    }
  }, [initialVerse, surahData]);

  /* ── Favoris ────────────────────────────────────────────────── */
  const toggleFavorite = (ayah: number) => {
    const key = `${selectedSurah}:${ayah}`;
    const next = favorites.includes(key)
      ? favorites.filter((f) => f !== key)
      : [...favorites, key];
    setFavorites(next);
    try {
      localStorage.setItem(FAV_KEY, JSON.stringify(next));
    } catch (_) { /* quota */ }
  };

  /* ── Partage ────────────────────────────────────────────────── */
  const shareVerse = async (verse: Ayah, translation?: Ayah) => {
    const text = `${verse.text}\n\n« ${translation?.text || ''} »\n— Coran, ${currentMeta?.englishName || 'sourate ' + selectedSurah} ${selectedSurah}:${verse.numberInSurah}`;
    try {
      if (navigator.share) await navigator.share({ text });
      else await navigator.clipboard.writeText(text);
    } catch (_) { /* annulé */ }
  };

  /* ── Tafsir ─────────────────────────────────────────────────── */
  const fetchTafsir = async (verseNumber: number) => {
    setLoadingTafsir(true);
    setTafsir({ surah: selectedSurah, verse: verseNumber, arabic: null, french: null, source: '' });
    try {
      const res = await fetch(
        `https://api.quran.com/api/v4/quran/tafsirs/93?verse_key=${selectedSurah}:${verseNumber}`
      );
      const data = await res.json();
      const arabic = data.tafsirs?.[0]?.text || null;
      setTafsir({
        surah: selectedSurah,
        verse: verseNumber,
        arabic,
        french: null,
        source: 'Tafsir Al-Muyassar — Complexe du Roi Fahd',
      });
    } catch (_) {
      setTafsir(null);
    } finally {
      setLoadingTafsir(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* ── En-tête de sourate (cadre orné) ────────────── */}
      <PCard className="relative overflow-hidden p-0">
        <div className="flex items-center justify-between px-3 pt-3">
          <button
            onClick={() => selectedSurah > 1 && setSelectedSurah(selectedSurah - 1)}
            disabled={selectedSurah === 1}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-hairline text-muted-warm disabled:opacity-30"
            aria-label="Sourate précédente"
          >
            <ChevronLeft className="h-4 w-4" strokeWidth={1.75} />
          </button>
          <select
            value={selectedSurah}
            onChange={(e) => setSelectedSurah(Number(e.target.value))}
            className="max-w-[200px] rounded-control border border-hairline bg-ivory px-3 py-1.5 text-footnote text-ink outline-none"
            aria-label="Choisir une sourate"
          >
            {(surahs.length
              ? surahs
              : [{ number: selectedSurah, englishName: `Sourate ${selectedSurah}`, name: '', numberOfAyahs: 0 }]
            ).map((s) => (
              <option key={s.number} value={s.number}>
                {s.number}. {s.englishName}
              </option>
            ))}
          </select>
          <button
            onClick={() => selectedSurah < 114 && setSelectedSurah(selectedSurah + 1)}
            disabled={selectedSurah === 114}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-hairline text-muted-warm disabled:opacity-30"
            aria-label="Sourate suivante"
          >
            <ChevronRight className="h-4 w-4" strokeWidth={1.75} />
          </button>
        </div>

        <div className="px-6 pb-6 pt-4 text-center">
          <div className="mx-auto max-w-[240px] rounded-tile border border-gold/30 px-6 py-4">
            <p className="font-quran text-3xl text-ink" dir="rtl">
              {currentMeta?.name || '…'}
            </p>
            <p className="mt-1 text-footnote text-bronze">
              {currentMeta ? `${currentMeta.englishName} · ${currentMeta.numberOfAyahs} versets` : ''}
            </p>
          </div>
        </div>

        {/* Contrôles de lecture */}
        <div className="flex items-center justify-center gap-2 border-t border-hairline px-4 py-3">
          <button
            onClick={() => setShowTranslation(!showTranslation)}
            className={cn(
              'rounded-full px-4 py-1.5 text-footnote font-medium transition-colors',
              showTranslation ? 'bg-forest-50 text-forest' : 'bg-sand text-muted-warm'
            )}
          >
            Traduction
          </button>
          <button
            onClick={() => setFocusMode(!focusMode)}
            className={cn(
              'flex items-center gap-1.5 rounded-full px-4 py-1.5 text-footnote font-medium transition-colors',
              focusMode ? 'bg-ink text-ivory-50' : 'bg-sand text-muted-warm'
            )}
          >
            <Eye className="h-3.5 w-3.5" strokeWidth={1.75} />
            Concentration
          </button>
        </div>
      </PCard>

      {/* ── Contenu ────────────────────────────────────── */}
      {loading ? (
        <PCard className="py-14 text-center">
          <Loader2 className="mx-auto h-6 w-6 animate-spin text-gold-600" />
          <p className="mt-3 text-footnote text-muted-warm">Chargement de la sourate…</p>
        </PCard>
      ) : surahData ? (
        focusMode ? (
          /* ── Mode concentration : texte pur ───────────── */
          <PCard className="px-6 py-8">
            {selectedSurah !== 1 && selectedSurah !== 9 && (
              <p className="mb-6 text-center font-quran text-2xl text-ink" dir="rtl">
                بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
              </p>
            )}
            <p className="font-quran text-[26px] leading-[2.4] text-ink" dir="rtl">
              {surahData.arabic.map((v) => (
                <span key={v.number}>
                  {v.text}
                  <span className="mx-1.5 inline-flex h-7 w-7 items-center justify-center rounded-full border border-gold/40 align-middle font-sans text-[11px] text-bronze">
                    {v.numberInSurah}
                  </span>
                </span>
              ))}
            </p>
          </PCard>
        ) : (
          /* ── Mode étude : verset par verset ───────────── */
          <div className="space-y-3">
            {selectedSurah !== 1 && selectedSurah !== 9 && (
              <div className="py-4 text-center">
                <p className="font-quran text-2xl text-ink" dir="rtl">
                  بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                </p>
                <GoldHairline className="mx-16 mt-4" />
              </div>
            )}

            {surahData.arabic.map((verse, index) => {
              const favKey = `${selectedSurah}:${verse.numberInSurah}`;
              const isFav = favorites.includes(favKey);
              return (
                <div
                  key={verse.number}
                  id={`verse-${verse.numberInSurah}`}
                  className="scroll-mt-24 rounded-card border border-hairline bg-ivory-50 p-5 shadow-soft"
                >
                  <p className="font-quran text-[24px] leading-[2.1] text-ink" dir="rtl">
                    {verse.text}
                  </p>

                  {showTranslation && surahData.translation[index] && (
                    <p className="mt-3 border-t border-hairline pt-3 text-body leading-relaxed text-ink/75">
                      {surahData.translation[index].text}
                    </p>
                  )}

                  <div className="mt-3 flex items-center justify-between">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full border border-gold/40 text-[11px] font-medium text-bronze">
                      {verse.numberInSurah}
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => fetchTafsir(verse.numberInSurah)}
                        className="flex h-8 w-8 items-center justify-center rounded-full text-faint transition-colors hover:text-bronze"
                        aria-label="Tafsir"
                      >
                        <BookOpen className="h-4 w-4" strokeWidth={1.75} />
                      </button>
                      <button
                        onClick={() => shareVerse(verse, surahData.translation[index])}
                        className="flex h-8 w-8 items-center justify-center rounded-full text-faint transition-colors hover:text-bronze"
                        aria-label="Partager"
                      >
                        <Share2 className="h-4 w-4" strokeWidth={1.75} />
                      </button>
                      <button
                        onClick={() => toggleFavorite(verse.numberInSurah)}
                        className={cn(
                          'flex h-8 w-8 items-center justify-center rounded-full transition-colors',
                          isFav ? 'text-danger' : 'text-faint hover:text-danger'
                        )}
                        aria-label="Favori"
                      >
                        <Heart className={cn('h-4 w-4', isFav && 'fill-current')} strokeWidth={1.75} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )
      ) : null}

      {/* ── Source ─────────────────────────────────────── */}
      <p className="px-4 pb-2 text-center text-[11px] leading-relaxed text-faint">
        Texte : AlQuran Cloud · Traduction : Muhammad Hamidullah
        <br />
        Tafsir Al-Muyassar, approuvé par le Complexe du Roi Fahd
      </p>

      {/* ── Feuille Tafsir ─────────────────────────────── */}
      <AnimatePresence>
        {tafsir && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setTafsir(null)}
              className="fixed inset-0 z-[60] bg-ink/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ duration: 0.45, ease: EASE }}
              className="fixed inset-x-0 bottom-0 z-[70] mx-auto max-h-[80vh] max-w-lg overflow-hidden rounded-t-card bg-ivory-50"
            >
              <div className="flex items-center justify-between border-b border-hairline px-5 py-4">
                <div>
                  <p className="text-caption uppercase text-gold-600">Tafsir</p>
                  <h3 className="text-title2 text-ink">
                    Verset {tafsir.surah}:{tafsir.verse}
                  </h3>
                </div>
                <button
                  onClick={() => setTafsir(null)}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-hairline bg-ivory text-muted-warm"
                  aria-label="Fermer"
                >
                  <X className="h-[18px] w-[18px]" strokeWidth={1.75} />
                </button>
              </div>
              <div className="max-h-[62vh] overflow-y-auto px-5 py-5">
                {loadingTafsir ? (
                  <div className="py-10 text-center">
                    <Loader2 className="mx-auto h-6 w-6 animate-spin text-gold-600" />
                  </div>
                ) : tafsir.arabic ? (
                  <>
                    <div
                      className="font-quran text-lg leading-[2] text-ink"
                      dir="rtl"
                      dangerouslySetInnerHTML={{ __html: tafsir.arabic }}
                    />
                    <p className="mt-5 border-t border-hairline pt-3 text-footnote text-faint">
                      {tafsir.source}
                    </p>
                  </>
                ) : (
                  <p className="py-8 text-center text-footnote text-muted-warm">
                    Tafsir indisponible pour ce verset.
                  </p>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
