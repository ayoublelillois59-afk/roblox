import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bell, BookOpen, ChevronRight, Compass, GraduationCap, Hash,
  Heart, Mic, Settings, Sparkles, Star, Volume2, X, Square,
} from 'lucide-react';
import {
  Screen, PCard, Section, IconTile, Pressable, GoldHairline,
  itemVariants, EASE,
} from '@/components/premium';
import { usePrayerTimes, formatRemaining } from '@/hooks/usePrayerTimes';
import { ISLAMIC_FIGURES, IslamicFigure } from '@/data/islamic-figures';

/* Versets du jour — sources authentiques */
const DAILY_VERSES = [
  { arabic: 'إِنَّ مَعَ الْعُسْرِ يُسْرًا', french: 'Certes, avec la difficulté vient la facilité.', source: 'Sourate Ash-Sharh — 94:6' },
  { arabic: 'وَلَا تَيْأَسُوا مِن رَّوْحِ اللَّهِ', french: "Ne désespérez pas de la miséricorde d'Allah.", source: 'Sourate Yusuf — 12:87' },
  { arabic: 'فَاذْكُرُونِي أَذْكُرْكُمْ', french: 'Souvenez-vous de Moi, Je Me souviendrai de vous.', source: 'Sourate Al-Baqara — 2:152' },
  { arabic: 'إِنَّ اللَّهَ مَعَ الصَّابِرِينَ', french: 'Allah est avec les patients.', source: 'Sourate Al-Baqara — 2:153' },
];

const SHORTCUTS = [
  { icon: Mic, label: 'Tajwid IA', to: '/tajweed' },
  { icon: Heart, label: 'Invocations', to: '/adhkar' },
  { icon: Hash, label: 'Dhikr', to: '/dhikr' },
  { icon: Star, label: '99 Noms', to: '/names' },
  { icon: Compass, label: 'Qibla', to: '/qibla' },
  { icon: GraduationCap, label: 'Apprendre', to: '/learn' },
  { icon: BookOpen, label: 'Coran', to: '/quran' },
  { icon: Settings, label: 'Réglages', to: '/settings' },
];

function readTime(story: string): number {
  return Math.max(1, Math.round(story.split(/\s+/).length / 200));
}

export default function HomePage() {
  const { nextPrayer } = usePrayerTimes();
  const [figure, setFigure] = useState<IslamicFigure | null>(null);
  const [speaking, setSpeaking] = useState(false);

  const verse = useMemo(() => {
    const dayOfYear = Math.floor(
      (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000
    );
    return DAILY_VERSES[dayOfYear % DAILY_VERSES.length];
  }, []);

  const dateStr = useMemo(
    () =>
      new Date().toLocaleDateString('fr-FR', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
      }),
    []
  );

  // Lecture à voix haute d'une histoire
  const toggleSpeech = () => {
    if (!figure) return;
    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
      return;
    }
    const u = new SpeechSynthesisUtterance(figure.story);
    u.lang = 'fr-FR';
    u.rate = 0.95;
    u.onend = () => setSpeaking(false);
    window.speechSynthesis.speak(u);
    setSpeaking(true);
  };

  useEffect(() => {
    return () => window.speechSynthesis?.cancel();
  }, []);

  return (
    <Screen>
      {/* ── Salutation ─────────────────────────────────── */}
      <motion.header variants={itemVariants} className="flex items-start justify-between pt-6">
        <div>
          <p className="text-footnote text-muted-warm">Assalamu alaykum</p>
          <h1 className="mt-0.5 text-display text-ink">Ya akhi</h1>
          <p className="mt-1 text-footnote text-faint">
            Qu'Allah facilite ta journée · <span className="capitalize">{dateStr}</span>
          </p>
        </div>
        <Link
          to="/settings"
          className="mt-1 flex h-10 w-10 items-center justify-center rounded-full border border-hairline bg-ivory-50"
        >
          <Bell className="h-[18px] w-[18px] text-bronze" strokeWidth={1.75} />
        </Link>
      </motion.header>

      {/* ── Prochaine prière (héro) ────────────────────── */}
      <motion.div variants={itemVariants} className="mt-6">
        <PCard variant="forest" to="/prayer" className="relative overflow-hidden">
          <p
            className="pointer-events-none absolute -right-4 -top-10 select-none font-quran text-[130px] leading-none text-ivory-50/[0.06]"
            dir="rtl"
          >
            ﷽
          </p>
          <p className="text-caption uppercase text-ivory-50/60">Prochaine prière</p>
          {nextPrayer ? (
            <>
              <div className="mt-3 flex items-end justify-between">
                <div>
                  <p className="text-title2 text-ivory-50/90">{nextPrayer.name}</p>
                  <p className="tnum mt-1 text-[44px] font-bold leading-none tracking-tight">
                    {nextPrayer.time}
                  </p>
                </div>
                <p className="font-quran text-2xl text-gold-200/80" dir="rtl">
                  {nextPrayer.nameAr}
                </p>
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-ivory-50/10 pt-3">
                <p className="text-footnote text-ivory-50/70">
                  {formatRemaining(nextPrayer.remainingMin)}
                </p>
                <ChevronRight className="h-4 w-4 text-ivory-50/50" strokeWidth={1.75} />
              </div>
            </>
          ) : (
            <p className="mt-3 text-body text-ivory-50/70">
              Autorise la géolocalisation pour afficher les horaires.
            </p>
          )}
        </PCard>
      </motion.div>

      {/* ── Verset du jour ─────────────────────────────── */}
      <motion.div variants={itemVariants} className="mt-4">
        <PCard variant="dark" className="relative overflow-hidden">
          <p className="text-caption uppercase text-gold/80">Verset du jour</p>
          <p className="mt-4 font-quran text-[26px] leading-[1.9] text-ivory-50" dir="rtl">
            {verse.arabic}
          </p>
          <p className="mt-3 text-body italic text-ivory-50/75">« {verse.french} »</p>
          <p className="mt-2 text-footnote text-gold/70">{verse.source}</p>
        </PCard>
      </motion.div>

      {/* ── Continuer ──────────────────────────────────── */}
      <Section caption="Reprendre" title="Continuer">
        <div className="grid grid-cols-2 gap-3">
          <PCard to="/quran" className="p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-control bg-forest-50">
              <BookOpen className="h-5 w-5 text-forest" strokeWidth={1.75} />
            </div>
            <p className="mt-3 text-headline text-ink">Lecture du Coran</p>
            <p className="mt-0.5 text-footnote text-muted-warm">Reprendre la lecture</p>
          </PCard>
          <PCard to="/tajweed" className="p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-control bg-gold-200/70">
              <Mic className="h-5 w-5 text-bronze" strokeWidth={1.75} />
            </div>
            <p className="mt-3 text-headline text-ink">Coach Tajwid IA</p>
            <p className="mt-0.5 text-footnote text-muted-warm">Corrige ta récitation</p>
          </PCard>
        </div>
      </Section>

      {/* ── Découvrir ──────────────────────────────────── */}
      <Section caption="Explorer" title="Découvrir">
        <div className="grid grid-cols-4 gap-x-2 gap-y-5">
          {SHORTCUTS.map((s) => (
            <IconTile
              key={s.label}
              icon={<s.icon className="h-[22px] w-[22px]" strokeWidth={1.75} />}
              label={s.label}
              to={s.to}
            />
          ))}
        </div>
      </Section>

      {/* ── Histoires ──────────────────────────────────── */}
      <Section caption="S'inspirer" title="Grandes figures de l'Islam">
        <div className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-1">
          {ISLAMIC_FIGURES.map((f) => (
            <Pressable
              key={f.id}
              onClick={() => setFigure(f)}
              className="w-[150px] flex-shrink-0 cursor-pointer snap-start"
            >
              <div className="flex h-[190px] flex-col justify-between overflow-hidden rounded-card bg-ink p-4 shadow-soft">
                <p className="font-quran text-3xl text-gold/90" dir="rtl">
                  {f.arabic.split(' ')[0]}
                </p>
                <div>
                  <p className="text-caption uppercase text-gold/60">{f.category}</p>
                  <p className="mt-1 text-callout font-semibold leading-tight text-ivory-50">
                    {f.name}
                  </p>
                  <p className="mt-1 text-[11px] text-ivory-50/50">
                    {readTime(f.story)} min de lecture
                  </p>
                </div>
              </div>
            </Pressable>
          ))}
        </div>
      </Section>

      {/* ── Sagesse du jour ────────────────────────────── */}
      <motion.div variants={itemVariants} className="mt-10 pb-2 text-center">
        <GoldHairline className="mx-10" />
        <p className="mt-5 font-quran text-lg text-ink/80" dir="rtl">
          الصَّلَاةُ عِمَادُ الدِّينِ
        </p>
        <p className="mt-1 text-footnote italic text-muted-warm">
          « La prière est le pilier de la religion »
        </p>
      </motion.div>

      {/* ── Fiche histoire (feuille modale) ────────────── */}
      <AnimatePresence>
        {figure && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                window.speechSynthesis?.cancel();
                setSpeaking(false);
                setFigure(null);
              }}
              className="fixed inset-0 z-[60] bg-ink/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ duration: 0.45, ease: EASE }}
              className="fixed inset-x-0 bottom-0 z-[70] mx-auto max-h-[86vh] max-w-lg overflow-hidden rounded-t-card bg-ivory-50"
            >
              <div className="flex items-center justify-between border-b border-hairline px-5 py-4">
                <div>
                  <p className="text-caption uppercase text-gold-600">{figure.category}</p>
                  <h3 className="text-title2 text-ink">{figure.name}</h3>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={toggleSpeech}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-hairline bg-ivory text-bronze"
                    aria-label="Écouter l'histoire"
                  >
                    {speaking ? (
                      <Square className="h-4 w-4 fill-current" strokeWidth={1.75} />
                    ) : (
                      <Volume2 className="h-[18px] w-[18px]" strokeWidth={1.75} />
                    )}
                  </button>
                  <button
                    onClick={() => {
                      window.speechSynthesis?.cancel();
                      setSpeaking(false);
                      setFigure(null);
                    }}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-hairline bg-ivory text-muted-warm"
                    aria-label="Fermer"
                  >
                    <X className="h-[18px] w-[18px]" strokeWidth={1.75} />
                  </button>
                </div>
              </div>
              <div className="max-h-[68vh] overflow-y-auto px-5 py-5">
                <p className="font-quran text-3xl text-ink" dir="rtl">{figure.arabic}</p>
                <p className="mt-1 text-footnote text-gold-600">{figure.title}</p>
                <p className="mt-4 whitespace-pre-line text-body leading-relaxed text-ink/85">
                  {figure.story}
                </p>
                <div className="mb-2 mt-6 flex items-center gap-2 rounded-tile bg-sand px-4 py-3">
                  <Sparkles className="h-4 w-4 flex-shrink-0 text-gold-600" strokeWidth={1.75} />
                  <p className="text-footnote text-muted-warm">Sources : {figure.source}</p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </Screen>
  );
}
