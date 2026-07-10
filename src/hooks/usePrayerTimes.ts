/**
 * Horaires de prière partagés (Accueil + écran Prière).
 * API AlAdhan avec géolocalisation, cache localStorage pour affichage instantané.
 */
import { useEffect, useState } from 'react';

export interface PrayerTimings {
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
  [key: string]: string;
}

export interface NextPrayer {
  name: string;
  nameAr: string;
  time: string;
  remainingMin: number;
}

export const PRAYER_LABELS: Record<string, { fr: string; ar: string }> = {
  Fajr: { fr: 'Fajr', ar: 'الفجر' },
  Sunrise: { fr: 'Shurûq', ar: 'الشروق' },
  Dhuhr: { fr: 'Dhuhr', ar: 'الظهر' },
  Asr: { fr: 'Asr', ar: 'العصر' },
  Maghrib: { fr: 'Maghrib', ar: 'المغرب' },
  Isha: { fr: 'Isha', ar: 'العشاء' },
};

const CACHE_KEY = 'PRAYER_TIMINGS_V1';

function computeNext(timings: PrayerTimings, now: Date): NextPrayer {
  const order = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
  for (const p of order) {
    const [h, m] = (timings[p] || '00:00').split(':').map(Number);
    const t = new Date(now);
    t.setHours(h, m, 0, 0);
    if (t > now) {
      return {
        name: PRAYER_LABELS[p].fr,
        nameAr: PRAYER_LABELS[p].ar,
        time: timings[p],
        remainingMin: Math.floor((t.getTime() - now.getTime()) / 60000),
      };
    }
  }
  // Toutes passées → Fajr demain
  const [h, m] = (timings.Fajr || '05:30').split(':').map(Number);
  const t = new Date(now);
  t.setDate(t.getDate() + 1);
  t.setHours(h, m, 0, 0);
  return {
    name: PRAYER_LABELS.Fajr.fr,
    nameAr: PRAYER_LABELS.Fajr.ar,
    time: timings.Fajr,
    remainingMin: Math.floor((t.getTime() - now.getTime()) / 60000),
  };
}

export function formatRemaining(min: number): string {
  const h = Math.floor(min / 60);
  const m = min % 60;
  if (h > 0) return `Dans ${h}h ${String(m).padStart(2, '0')}min`;
  return `Dans ${m} min`;
}

export function usePrayerTimes(method = '12') {
  const [timings, setTimings] = useState<PrayerTimings | null>(() => {
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const { date, timings } = JSON.parse(cached);
        if (date === new Date().toDateString()) return timings;
      }
    } catch (_) { /* ignore */ }
    return null;
  });
  const [loading, setLoading] = useState(!timings);
  const [error, setError] = useState<string | null>(null);
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 30000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (!navigator.geolocation) {
      if (!timings) setError('Géolocalisation non supportée');
      setLoading(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        try {
          const d = new Date();
          const dateStr = `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`;
          const res = await fetch(
            `https://api.aladhan.com/v1/timings/${dateStr}?latitude=${coords.latitude}&longitude=${coords.longitude}&method=${method}`
          );
          const data = await res.json();
          if (data.code === 200) {
            setTimings(data.data.timings);
            setError(null);
            try {
              localStorage.setItem(
                CACHE_KEY,
                JSON.stringify({ date: new Date().toDateString(), timings: data.data.timings })
              );
            } catch (_) { /* quota */ }
          }
        } catch (_) {
          if (!timings) setError('Horaires indisponibles');
        } finally {
          setLoading(false);
        }
      },
      () => {
        if (!timings) setError('Autorisez la géolocalisation pour les horaires');
        setLoading(false);
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [method]);

  const nextPrayer = timings ? computeNext(timings, now) : null;

  return { timings, nextPrayer, loading, error, now };
}
