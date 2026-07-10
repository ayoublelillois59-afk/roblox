import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Volume2 } from 'lucide-react';
import { Screen, PageHeader, itemVariants } from '@/components/premium';
import { cn } from '@/lib/utils';
import { addReadingMinute, markSurahRead } from '@/services/stats';
import QuranPlayer from '@/components/QuranPlayer';
import QuranReader from '@/components/QuranReader';

export default function QuranPage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialSurah = parseInt(queryParams.get('surah') || '') || 1;
  const verseParam = parseInt(queryParams.get('verse') || '');
  const initialVerse = isNaN(verseParam) ? null : verseParam;
  const initialTab = queryParams.get('tab') === 'read' ? 'read' : 'listen';

  const [favorites, setFavorites] = useState<number[]>([]);
  const [tab, setTab] = useState<'listen' | 'read'>(initialTab as 'listen' | 'read');

  const handleFavorite = (surahNumber: number) => {
    setFavorites((prev) =>
      prev.includes(surahNumber) ? prev.filter((n) => n !== surahNumber) : [...prev, surahNumber]
    );
  };

  // Suivi du temps de lecture (1 min ajoutée par minute passée sur l'écran)
  useEffect(() => {
    const t = setInterval(addReadingMinute, 60000);
    return () => clearInterval(t);
  }, []);

  // Sourate marquée comme découverte à l'ouverture en mode lecture
  useEffect(() => {
    if (tab === 'read') markSurahRead(initialSurah);
  }, [tab, initialSurah]);

  return (
    <Screen>
      <PageHeader title="Le Coran" arabic="القرآن الكريم" subtitle="Lecture et écoute" />

      {/* ── Contrôle segmenté ──────────────────────────── */}
      <motion.div variants={itemVariants} className="mb-6">
        <div className="relative flex rounded-control border border-hairline bg-sand p-1">
          {(
            [
              { id: 'listen', label: 'Écouter', icon: Volume2 },
              { id: 'read', label: 'Lire', icon: BookOpen },
            ] as const
          ).map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className="relative flex flex-1 items-center justify-center gap-2 rounded-[10px] py-2.5"
            >
              {tab === t.id && (
                <motion.div
                  layoutId="quran-segment"
                  className="absolute inset-0 rounded-[10px] bg-ivory-50 shadow-soft"
                  transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                />
              )}
              <t.icon
                className={cn(
                  'relative z-10 h-4 w-4',
                  tab === t.id ? 'text-forest' : 'text-faint'
                )}
                strokeWidth={1.75}
              />
              <span
                className={cn(
                  'relative z-10 text-callout',
                  tab === t.id ? 'text-ink' : 'text-muted-warm'
                )}
              >
                {t.label}
              </span>
            </button>
          ))}
        </div>
      </motion.div>

      <motion.div variants={itemVariants}>
        {tab === 'listen' ? (
          <QuranPlayer favorites={favorites} onFavorite={handleFavorite} />
        ) : (
          <QuranReader initialSurah={initialSurah} initialVerse={initialVerse} />
        )}
      </motion.div>
    </Screen>
  );
}
