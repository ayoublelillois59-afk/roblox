import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Award, BookOpen, ChevronRight, Crown, Flame, Globe, Mic,
  Pencil, Settings, Target, User,
} from 'lucide-react';
import { Screen, PCard, Section, StatTile, ProgressRing, itemVariants } from '@/components/premium';
import { getStats, computeStreak, last7Days, bestTajweedScore } from '@/services/stats';

export default function ProfilePage() {
  const [name, setName] = useState(() => localStorage.getItem('user_name') || '');
  const stats = useMemo(() => getStats(), []);
  const streak = computeStreak(stats);
  const best = bestTajweedScore(stats);
  const week = last7Days(stats);
  const weekMin = week.reduce((a, d) => a + d.minutes, 0);
  const weekGoal = 7 * 15; // 15 min / jour
  const weekProgress = Math.min(1, weekMin / weekGoal);

  const editName = () => {
    const n = prompt('Ton prénom :', name || '');
    if (n !== null) {
      const clean = n.trim();
      setName(clean);
      if (clean) localStorage.setItem('user_name', clean);
      else localStorage.removeItem('user_name');
    }
  };

  const badges = [
    { icon: Flame, label: 'Assidu', earned: streak >= 3, hint: '3 jours de série' },
    { icon: BookOpen, label: 'Lecteur', earned: stats.surahsRead.length >= 5, hint: '5 sourates' },
    { icon: Mic, label: 'Récitant', earned: stats.tajweedSessions.length >= 1, hint: '1 session Tajwid' },
    { icon: Award, label: 'Excellence', earned: (best ?? 0) >= 90, hint: 'Score 90%' },
  ];

  const menu: Array<{ icon: any; label: string; to: string; detail?: string }> = [
    { icon: Target, label: 'Objectifs', to: '/progression' },
    { icon: Settings, label: 'Réglages', to: '/settings' },
    { icon: Globe, label: 'Langue', to: '/settings', detail: 'Français' },
    { icon: Crown, label: 'Premium', to: '/premium' },
  ];

  return (
    <Screen>
      {/* ── Identité ───────────────────────────────────── */}
      <motion.div variants={itemVariants} className="flex flex-col items-center pt-10 text-center">
        <ProgressRing progress={weekProgress} size={96} stroke={3}>
          <div className="flex h-[78px] w-[78px] items-center justify-center rounded-full bg-sand">
            <User className="h-8 w-8 text-bronze" strokeWidth={1.5} />
          </div>
        </ProgressRing>
        <button onClick={editName} className="mt-4 flex items-center gap-1.5">
          <h1 className="text-title text-ink">{name || "Serviteur d'Allah"}</h1>
          <Pencil className="h-3.5 w-3.5 text-faint" strokeWidth={1.75} />
        </button>
        <p className="mt-1 text-footnote text-muted-warm">
          {Math.round(weekProgress * 100)}% de l'objectif hebdomadaire
        </p>
      </motion.div>

      {/* ── Série ──────────────────────────────────────── */}
      <motion.div variants={itemVariants} className="mt-8">
        <PCard variant="forest" to="/progression" className="flex items-center justify-between">
          <div>
            <p className="text-caption uppercase text-ivory-50/60">Série actuelle</p>
            <p className="tnum mt-1 text-title text-ivory-50">
              {streak} {streak > 1 ? 'jours' : 'jour'}
            </p>
            <p className="mt-0.5 text-footnote text-ivory-50/60">Continue comme ça</p>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-ivory-50/10">
            <Flame className="h-5 w-5 text-gold-200" strokeWidth={1.75} />
          </div>
        </PCard>
      </motion.div>

      {/* ── Statistiques ───────────────────────────────── */}
      <Section caption="Ma progression" title="Statistiques" to="/progression">
        <div className="grid grid-cols-3 gap-3">
          <StatTile value={weekMin} label="min cette semaine" />
          <StatTile value={stats.surahsRead.length} label="sourates" />
          <StatTile value={best !== null ? `${best}%` : '—'} label="score Tajwid" accent={best !== null} />
        </div>
      </Section>

      {/* ── Badges ─────────────────────────────────────── */}
      <Section caption="Récompenses" title="Badges">
        <div className="grid grid-cols-4 gap-3">
          {badges.map((b) => (
            <div
              key={b.label}
              className={`flex flex-col items-center gap-1.5 rounded-tile border p-3 text-center ${
                b.earned
                  ? 'border-gold/30 bg-gold-200/40'
                  : 'border-hairline bg-ivory-50 opacity-45'
              }`}
            >
              <b.icon
                className={`h-5 w-5 ${b.earned ? 'text-gold-600' : 'text-faint'}`}
                strokeWidth={1.75}
              />
              <p className="text-[10px] font-semibold text-ink">{b.label}</p>
              <p className="text-[9px] leading-tight text-faint">{b.hint}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Menu ───────────────────────────────────────── */}
      <Section caption="Compte" title="Paramètres">
        <PCard className="p-2">
          {menu.map((m, i) => (
            <div key={m.label}>
              {i > 0 && <div className="mx-4 h-px bg-hairline" />}
              <Link to={m.to} className="flex items-center justify-between px-4 py-3.5">
                <div className="flex items-center gap-3">
                  <m.icon className="h-[18px] w-[18px] text-bronze" strokeWidth={1.75} />
                  <p className="text-body font-medium text-ink">{m.label}</p>
                </div>
                <div className="flex items-center gap-2">
                  {m.detail && <p className="text-footnote text-muted-warm">{m.detail}</p>}
                  <ChevronRight className="h-4 w-4 text-faint" strokeWidth={1.75} />
                </div>
              </Link>
            </div>
          ))}
        </PCard>
      </Section>
    </Screen>
  );
}
