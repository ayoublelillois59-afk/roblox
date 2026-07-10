import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Flame, Mic, Target } from 'lucide-react';
import { Screen, PageHeader, PCard, Section, StatTile, itemVariants, EASE } from '@/components/premium';
import { getStats, computeStreak, last7Days, bestTajweedScore } from '@/services/stats';
import { cn } from '@/lib/utils';

export default function ProgressionPage() {
  const stats = useMemo(() => getStats(), []);
  const streak = computeStreak(stats);
  const week = last7Days(stats);
  const best = bestTajweedScore(stats);
  const totalWeekMin = week.reduce((a, d) => a + d.minutes, 0);
  const maxMin = Math.max(1, ...week.map((d) => d.minutes));

  // Jour sélectionné du mini-graphique (par défaut : aujourd'hui)
  const [selected, setSelected] = useState(week.length - 1);

  const goals = [
    {
      icon: BookOpen,
      label: 'Lire 15 min par jour',
      progress: Math.min(1, (week[week.length - 1]?.minutes || 0) / 15),
    },
    {
      icon: Mic,
      label: 'Une session Tajwid cette semaine',
      progress: stats.tajweedSessions.some((s) => week.some((d) => d.date === s.date)) ? 1 : 0,
    },
    {
      icon: Target,
      label: 'Découvrir 5 sourates',
      progress: Math.min(1, stats.surahsRead.length / 5),
    },
  ];

  return (
    <Screen>
      <PageHeader title="Progression" arabic="التقدّم" subtitle="Ton cheminement spirituel" />

      {/* ── Série (streak) ─────────────────────────────── */}
      <motion.div variants={itemVariants}>
        <PCard variant="dark" className="relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-caption uppercase text-gold/80">Série actuelle</p>
              <p className="tnum mt-2 text-[44px] font-bold leading-none">
                {streak}
                <span className="ml-2 text-title2 font-semibold text-ivory-50/60">
                  {streak > 1 ? 'jours' : 'jour'}
                </span>
              </p>
              <p className="mt-2 text-footnote text-ivory-50/60">
                {streak > 0 ? 'Continue comme ça, qu\'Allah te facilite.' : 'Ouvre l\'app chaque jour pour bâtir ta série.'}
              </p>
            </div>
            <div className="flex h-14 w-14 items-center justify-center rounded-full border border-gold/30 bg-gold/10">
              <Flame className="h-6 w-6 text-gold" strokeWidth={1.75} />
            </div>
          </div>
        </PCard>
      </motion.div>

      {/* ── Lecture cette semaine (mini graphique) ─────── */}
      <Section caption="Cette semaine" title="Temps de lecture">
        <PCard>
          <div className="flex items-baseline justify-between">
            <p className="tnum text-title text-ink">
              {week[selected]?.minutes ?? 0}
              <span className="ml-1 text-footnote font-normal text-muted-warm">min</span>
            </p>
            <p className="text-footnote text-muted-warm">
              {selected === week.length - 1
                ? "Aujourd'hui"
                : new Date(week[selected].date).toLocaleDateString('fr-FR', {
                    weekday: 'long',
                    day: 'numeric',
                  })}
              {' · '}
              <span className="tnum">{totalWeekMin} min au total</span>
            </p>
          </div>

          {/* Barres : série unique, teinte or foncée (contraste validé 3.17:1),
              sélection plus foncée + étiquette directe. */}
          <div className="mt-5 flex h-28 items-end gap-2">
            {week.map((d, i) => (
              <button
                key={d.date}
                onClick={() => setSelected(i)}
                className="group flex h-full flex-1 flex-col items-center justify-end gap-1.5"
                aria-label={`${d.day} : ${d.minutes} minutes`}
              >
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${Math.max(4, (d.minutes / maxMin) * 100)}%` }}
                  transition={{ duration: 0.7, ease: EASE, delay: i * 0.04 }}
                  className={cn(
                    'w-full max-w-[26px] rounded-t',
                    i === selected ? 'bg-bronze' : 'bg-gold-600',
                    d.minutes === 0 && 'opacity-30'
                  )}
                  style={{ borderRadius: '4px 4px 2px 2px' }}
                />
                <span
                  className={cn(
                    'text-[10px] font-medium',
                    i === selected ? 'text-ink' : 'text-faint'
                  )}
                >
                  {d.day}
                </span>
              </button>
            ))}
          </div>
        </PCard>
      </Section>

      {/* ── Chiffres clés ──────────────────────────────── */}
      <Section caption="Au total" title="Statistiques">
        <div className="grid grid-cols-2 gap-3">
          <StatTile value={stats.surahsRead.length} label="Sourates découvertes" />
          <StatTile value={stats.tajweedSessions.length} label="Sessions Tajwid" />
          <StatTile
            value={best !== null ? `${best}%` : '—'}
            label="Meilleur score Tajwid"
            accent={best !== null}
          />
          <StatTile value={stats.versesRecited} label="Versets récités" />
        </div>
      </Section>

      {/* ── Objectifs ──────────────────────────────────── */}
      <Section caption="Cette semaine" title="Objectifs">
        <PCard className="space-y-4 p-4">
          {goals.map((g) => (
            <div key={g.label} className="flex items-center gap-3">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-control bg-sand">
                <g.icon className="h-[18px] w-[18px] text-bronze" strokeWidth={1.75} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline justify-between gap-2">
                  <p className="truncate text-callout text-ink">{g.label}</p>
                  <p className="tnum text-footnote text-muted-warm">{Math.round(g.progress * 100)}%</p>
                </div>
                <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-sand-200">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${g.progress * 100}%` }}
                    transition={{ duration: 0.9, ease: EASE }}
                    className={cn('h-full rounded-full', g.progress >= 1 ? 'bg-forest' : 'bg-gold-600')}
                  />
                </div>
              </div>
            </div>
          ))}
        </PCard>
      </Section>
    </Screen>
  );
}
