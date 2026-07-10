import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Bell, ChevronRight, Compass, Loader2, Moon, Sun, Sunrise, Sunset } from 'lucide-react';
import { Screen, PageHeader, PCard, itemVariants, GoldHairline } from '@/components/premium';
import { usePrayerTimes, formatRemaining, PRAYER_LABELS } from '@/hooks/usePrayerTimes';
import { cn } from '@/lib/utils';

const PRAYER_ICONS: Record<string, any> = {
  Fajr: Sunrise,
  Sunrise: Sun,
  Dhuhr: Sun,
  Asr: Sun,
  Maghrib: Sunset,
  Isha: Moon,
};

const ORDER = ['Fajr', 'Sunrise', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];

export default function PrayerPage() {
  const { timings, nextPrayer, loading, error } = usePrayerTimes();

  const dateStr = new Date().toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <Screen>
      <PageHeader title="Prière" arabic="الصلاة" subtitle={dateStr} />

      {/* ── Héro prochaine prière ──────────────────────── */}
      <motion.div variants={itemVariants}>
        <PCard variant="forest" className="relative overflow-hidden">
          <p
            className="pointer-events-none absolute -right-2 -top-8 select-none font-quran text-[110px] leading-none text-ivory-50/[0.06]"
            dir="rtl"
          >
            ص
          </p>
          {loading && !timings ? (
            <div className="flex items-center gap-3 py-6">
              <Loader2 className="h-5 w-5 animate-spin text-ivory-50/70" />
              <p className="text-body text-ivory-50/70">Recherche des horaires…</p>
            </div>
          ) : nextPrayer ? (
            <>
              <p className="text-caption uppercase text-ivory-50/60">Prochaine prière</p>
              <div className="mt-3 flex items-end justify-between">
                <div>
                  <p className="text-title2 text-ivory-50/90">{nextPrayer.name}</p>
                  <p className="tnum mt-1 text-[48px] font-bold leading-none tracking-tight">
                    {nextPrayer.time}
                  </p>
                  <p className="mt-2 text-footnote text-ivory-50/70">
                    {formatRemaining(nextPrayer.remainingMin)}
                  </p>
                </div>
                <p className="font-quran text-3xl text-gold-200/80" dir="rtl">
                  {nextPrayer.nameAr}
                </p>
              </div>
            </>
          ) : (
            <p className="py-4 text-body text-ivory-50/80">
              {error || 'Autorise la géolocalisation pour afficher les horaires.'}
            </p>
          )}
        </PCard>
      </motion.div>

      {/* ── Liste des prières ──────────────────────────── */}
      {timings && (
        <motion.div variants={itemVariants} className="mt-4">
          <PCard className="p-2">
            {ORDER.map((p, i) => {
              const Icon = PRAYER_ICONS[p];
              const isNext = nextPrayer?.name === PRAYER_LABELS[p].fr;
              return (
                <div key={p}>
                  {i > 0 && <div className="mx-4 h-px bg-hairline" />}
                  <div
                    className={cn(
                      'flex items-center justify-between rounded-tile px-4 py-3.5 transition-colors',
                      isNext && 'bg-forest-50'
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <Icon
                        className={cn('h-[18px] w-[18px]', isNext ? 'text-forest' : 'text-faint')}
                        strokeWidth={1.75}
                      />
                      <div>
                        <p className={cn('text-body font-medium', isNext ? 'text-forest' : 'text-ink')}>
                          {PRAYER_LABELS[p].fr}
                        </p>
                        <p className="font-quran text-footnote text-faint" dir="rtl">
                          {PRAYER_LABELS[p].ar}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <p className={cn('tnum text-headline', isNext ? 'text-forest' : 'text-ink')}>
                        {timings[p]}
                      </p>
                      {isNext ? (
                        <Bell className="h-4 w-4 text-gold-600" strokeWidth={1.75} />
                      ) : (
                        <span className="w-4" />
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </PCard>
        </motion.div>
      )}

      {/* ── Qibla ──────────────────────────────────────── */}
      <motion.div variants={itemVariants} className="mt-4">
        <Link to="/qibla" className="block">
          <PCard className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-control bg-gold-200/60">
                <Compass className="h-5 w-5 text-bronze" strokeWidth={1.75} />
              </div>
              <div>
                <p className="text-headline text-ink">Direction de la Qibla</p>
                <p className="text-footnote text-muted-warm">Boussole vers la Kaaba</p>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-faint" strokeWidth={1.75} />
          </PCard>
        </Link>
      </motion.div>

      {/* ── Hadith ─────────────────────────────────────── */}
      <motion.div variants={itemVariants} className="mt-10 text-center">
        <GoldHairline className="mx-10" />
        <p className="mt-5 font-quran text-lg text-ink/80" dir="rtl">
          الصَّلَاةُ عِمَادُ الدِّينِ
        </p>
        <p className="mt-1 text-footnote italic text-muted-warm">
          « La prière est le pilier de la religion »
        </p>
      </motion.div>
    </Screen>
  );
}
