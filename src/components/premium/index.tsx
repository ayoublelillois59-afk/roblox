/**
 * SAKINA — Primitives premium du Design System.
 * Voir DESIGN_SYSTEM.md pour les règles d'usage.
 */
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { motion, HTMLMotionProps } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

/* ── Courbe & transitions signature ─────────────────────────── */
export const EASE = [0.16, 1, 0.3, 1] as const;

export const pageVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

export const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

/* ── Screen : enveloppe de page ─────────────────────────────── */
export function Screen({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      variants={pageVariants}
      initial="hidden"
      animate="show"
      className={cn('mx-auto min-h-screen max-w-lg bg-ivory px-5 pb-32 pt-4', className)}
    >
      {children}
    </motion.div>
  );
}

/* ── PageHeader : titre d'écran ─────────────────────────────── */
export function PageHeader({
  title,
  arabic,
  subtitle,
  action,
}: {
  title: string;
  arabic?: string;
  subtitle?: string;
  action?: ReactNode;
}) {
  return (
    <motion.header variants={itemVariants} className="mb-6 flex items-end justify-between pt-6">
      <div>
        {arabic && (
          <p className="mb-1 inline-block font-quran text-callout text-gold-600" dir="rtl">
            {arabic}
          </p>
        )}
        <h1 className="text-display text-ink">{title}</h1>
        {subtitle && <p className="mt-1 text-footnote text-muted-warm">{subtitle}</p>}
      </div>
      {action}
    </motion.header>
  );
}

/* ── Pressable : feedback tactile universel ─────────────────── */
export function Pressable({
  children,
  className,
  ...props
}: HTMLMotionProps<'div'> & { children: ReactNode }) {
  return (
    <motion.div
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/* ── PCard : carte premium ──────────────────────────────────── */
type PCardVariant = 'default' | 'tonal' | 'forest' | 'dark' | 'gold';

const cardStyles: Record<PCardVariant, string> = {
  default: 'bg-ivory-50 border border-hairline shadow-soft',
  tonal: 'bg-sand border border-transparent',
  forest: 'bg-forest text-ivory-50 shadow-soft',
  dark: 'bg-ink text-ivory-50 shadow-soft',
  gold: 'bg-gold-200/60 border border-gold/25',
};

export function PCard({
  variant = 'default',
  className,
  children,
  onClick,
  to,
}: {
  variant?: PCardVariant;
  className?: string;
  children: ReactNode;
  onClick?: () => void;
  to?: string;
}) {
  const card = (
    <Pressable className={cn('rounded-card p-5', cardStyles[variant], className)} onClick={onClick}>
      {children}
    </Pressable>
  );
  if (to) return <Link to={to} className="block">{card}</Link>;
  return card;
}

/* ── Section : en-tête de section ───────────────────────────── */
export function Section({
  caption,
  title,
  to,
  children,
  className,
}: {
  caption?: string;
  title: string;
  to?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.section variants={itemVariants} className={cn('mt-8', className)}>
      <div className="mb-3 flex items-end justify-between px-1">
        <div>
          {caption && <p className="text-caption uppercase text-gold-600">{caption}</p>}
          <h2 className="text-title2 text-ink">{title}</h2>
        </div>
        {to && (
          <Link to={to} className="flex items-center gap-0.5 text-footnote font-medium text-muted-warm">
            Tout voir <ChevronRight className="h-3.5 w-3.5" strokeWidth={1.75} />
          </Link>
        )}
      </div>
      {children}
    </motion.section>
  );
}

/* ── StatTile : chiffre clé ─────────────────────────────────── */
export function StatTile({
  value,
  label,
  accent = false,
  className,
}: {
  value: ReactNode;
  label: string;
  accent?: boolean;
  className?: string;
}) {
  return (
    <div className={cn('rounded-tile border border-hairline bg-ivory-50 p-4', className)}>
      <p className={cn('tnum text-title', accent ? 'text-gold-600' : 'text-ink')}>{value}</p>
      <p className="mt-0.5 text-footnote text-muted-warm">{label}</p>
    </div>
  );
}

/* ── ProgressRing : anneau fin or sur sable ─────────────────── */
export function ProgressRing({
  progress,
  size = 52,
  stroke = 3,
  className,
  children,
}: {
  progress: number; // 0..1
  size?: number;
  stroke?: number;
  className?: string;
  children?: ReactNode;
}) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  return (
    <div className={cn('relative inline-flex items-center justify-center', className)} style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#E6E0D4" strokeWidth={stroke} />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="#C2A566"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: c * (1 - Math.min(1, Math.max(0, progress))) }}
          transition={{ duration: 1, ease: EASE }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">{children}</div>
    </div>
  );
}

/* ── GoldHairline : séparateur ornemental sobre ─────────────── */
export function GoldHairline({ className }: { className?: string }) {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      <div className="h-px flex-1 bg-gradient-to-r from-transparent to-gold/40" />
      <div className="h-1.5 w-1.5 rotate-45 border border-gold/50" />
      <div className="h-px flex-1 bg-gradient-to-l from-transparent to-gold/40" />
    </div>
  );
}

/* ── IconTile : raccourci de l'accueil ──────────────────────── */
export function IconTile({
  icon,
  label,
  to,
}: {
  icon: ReactNode;
  label: string;
  to: string;
}) {
  return (
    <Link to={to} className="block">
      <Pressable className="flex flex-col items-center gap-2">
        <div className="flex h-14 w-14 items-center justify-center rounded-tile border border-hairline bg-ivory-50 text-bronze shadow-soft">
          {icon}
        </div>
        <span className="text-footnote font-medium text-ink">{label}</span>
      </Pressable>
    </Link>
  );
}
