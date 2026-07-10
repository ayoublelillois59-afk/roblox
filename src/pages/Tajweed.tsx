import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AlertCircle, BookOpen, CheckCircle2, ChevronRight, Languages,
  Lightbulb, Loader2, Mic, Sparkles, Square,
} from 'lucide-react';
import { Screen, PageHeader, PCard, ProgressRing, itemVariants, EASE } from '@/components/premium';
import { cn } from '@/lib/utils';
import { transcribeAndAnalyze } from '@/services/cloudflare-ai';
import { useSpeechRecognition } from '@/hooks/useSpeechRecognition';
import {
  getSurah, detectVerse, splitTranscriptionIntoVerses, getMatchIndex, FullVerse,
} from '@/services/quran-full';
import { recordTajweedSession, addVersesRecited } from '@/services/stats';

const TAJWEED_RULES = [
  { id: 'ghunna', title: 'La Ghunna', description: 'Nasalisation de 2 temps sur les lettres ن et م', example: 'مِنْ كُلِّ' },
  { id: 'madd', title: 'Le Madd', description: 'Prolongation de 2, 4 ou 6 temps selon le type', example: 'قَالَ - يَا أَيُّهَا' },
  { id: 'qalqala', title: 'La Qalqala', description: 'Rebondissement sur les lettres ق ط ب ج د', example: 'قَدْ - لَمْ يَلِدْ' },
  { id: 'idgham', title: "L'Idgham", description: 'Fusion de deux lettres identiques ou similaires', example: 'مِنْ رَّبِّهِمْ' },
  { id: 'ikhfa', title: "L'Ikhfa", description: 'Dissimulation du Noon ou du Tanwin', example: 'مَنْ صَدَقَ' },
];

interface TajweedResult {
  arabic_text?: string;
  overall_quality: string;
  correct_rules?: Array<{ rule: string; description: string; location?: string }>;
  errors?: Array<{
    type: string;
    location?: string;
    correction: string;
    rule?: string;
    severity?: 'critical' | 'important' | 'minor';
  }>;
  advice?: string[];
  sources?: string[];
  verses?: FullVerse[];
  score?: number;
}

function computeScore(a: { overall_quality: string; errors?: Array<{ severity?: string }> }): number {
  const base =
    a.overall_quality === 'excellent' ? 95 : a.overall_quality === 'good' ? 84 : 68;
  const penalty = (a.errors || []).reduce(
    (acc, e) => acc + (e.severity === 'critical' ? 4 : e.severity === 'important' ? 2 : 1),
    0
  );
  return Math.max(40, Math.min(98, base - penalty));
}

const N_BARS = 22;

export default function TajweedPage() {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<TajweedResult | null>(null);
  const [showRules, setShowRules] = useState(false);
  const [liveVerses, setLiveVerses] = useState<FullVerse[]>([]);
  const [levels, setLevels] = useState<number[]>(Array(N_BARS).fill(0));

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const lastVerseRef = useRef<string>('');
  const liveScrollRef = useRef<HTMLDivElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    // Préchargement du Coran (détection en direct)
    getMatchIndex().catch(() => { /* retenté au besoin */ });
    return () => {
      cancelAnimationFrame(rafRef.current);
      audioCtxRef.current?.close().catch(() => { /* déjà fermé */ });
    };
  }, []);

  /* ── Visualisation réelle de la voix (Web Audio) ────────────── */
  const startMeter = (stream: MediaStream) => {
    try {
      const Ctx = window.AudioContext || (window as any).webkitAudioContext;
      const ctx: AudioContext = new Ctx();
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 64;
      analyser.smoothingTimeConstant = 0.75;
      ctx.createMediaStreamSource(stream).connect(analyser);
      audioCtxRef.current = ctx;
      const data = new Uint8Array(analyser.frequencyBinCount);
      const tick = () => {
        analyser.getByteFrequencyData(data);
        const step = data.length / N_BARS;
        setLevels(
          Array.from({ length: N_BARS }, (_, i) => data[Math.floor(i * step)] / 255)
        );
        rafRef.current = requestAnimationFrame(tick);
      };
      tick();
    } catch (_) {
      /* visualisation best-effort */
    }
  };

  const stopMeter = () => {
    cancelAnimationFrame(rafRef.current);
    audioCtxRef.current?.close().catch(() => { /* ignore */ });
    audioCtxRef.current = null;
    setLevels(Array(N_BARS).fill(0));
  };

  /* ── Traduction en direct ───────────────────────────────────── */
  const handleSpeech = useCallback(async (text: string, isFinal: boolean) => {
    if (!isFinal) return;
    try {
      const ref = await detectVerse(text);
      if (!ref) return;
      const key = `${ref.surah}:${ref.ayah}`;
      if (key === lastVerseRef.current) return;
      lastVerseRef.current = key;
      const surah = await getSurah(ref.surah);
      const verse = surah.find((v) => v.ayah === ref.ayah);
      if (!verse) return;
      setLiveVerses((prev) =>
        prev.some((v) => v.surah === verse.surah && v.ayah === verse.ayah)
          ? prev
          : [...prev, verse]
      );
    } catch (_) {
      /* best-effort */
    }
  }, []);

  const { supported: speechSupported, start: startSpeech, stop: stopSpeech } =
    useSpeechRecognition(handleSpeech);

  useEffect(() => {
    if (liveScrollRef.current) {
      liveScrollRef.current.scrollTop = liveScrollRef.current.scrollHeight;
    }
  }, [liveVerses]);

  /* ── Enregistrement ─────────────────────────────────────────── */
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      chunksRef.current = [];
      mediaRecorderRef.current.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };
      mediaRecorderRef.current.onstop = () => {
        setAudioBlob(new Blob(chunksRef.current, { type: 'audio/webm' }));
        stream.getTracks().forEach((t) => t.stop());
        stopMeter();
      };
      mediaRecorderRef.current.start();
      setIsRecording(true);
      setResult(null);
      setLiveVerses([]);
      lastVerseRef.current = '';
      startMeter(stream);
      if (speechSupported) startSpeech();
    } catch (_) {
      alert("Erreur : impossible d'accéder au microphone. Veuillez autoriser l'accès.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      stopSpeech();
    }
  };

  /* ── Analyse ────────────────────────────────────────────────── */
  const analyzeRecording = async () => {
    if (!audioBlob) return;
    setProcessing(true);
    try {
      const { transcription, analysis } = await transcribeAndAnalyze(audioBlob);

      let verses: FullVerse[] = [];
      try {
        verses = await splitTranscriptionIntoVerses(transcription.text);
      } catch (_) { /* best-effort */ }

      const score = computeScore(analysis);
      recordTajweedSession(score);
      if (verses.length) addVersesRecited(verses.length);

      setResult({
        arabic_text: transcription.text,
        overall_quality: analysis.overall_quality,
        correct_rules: analysis.correct_rules,
        errors: analysis.errors,
        advice: analysis.advice,
        sources: analysis.sources || ['Al-Muqaddima al-Jazariyya', 'Tuhfat al-Atfal'],
        verses,
        score,
      });
    } catch (error: any) {
      setResult({
        overall_quality: 'cannot_analyze',
        errors: [],
        advice: [
          "Une erreur s'est produite lors de l'analyse.",
          'Détails : ' + (error?.message || 'Erreur inconnue'),
          'Réessaie avec un enregistrement clair de quelques secondes.',
        ],
      });
    } finally {
      setProcessing(false);
    }
  };

  return (
    <Screen>
      <PageHeader
        title="Coach Tajwid"
        arabic="تحسين التجويد"
        subtitle="Récite, l'IA t'écoute et te corrige"
      />

      {/* ── Studio d'enregistrement ────────────────────── */}
      <motion.div variants={itemVariants}>
        <PCard variant="dark" className="relative overflow-hidden px-6 pb-6 pt-8 text-center">
          {/* Visualisation de la voix */}
          <div className="mx-auto flex h-12 items-end justify-center gap-[3px]">
            {levels.map((v, i) => (
              <div
                key={i}
                className="w-[3px] rounded-full bg-gold transition-[height] duration-75"
                style={{
                  height: `${Math.max(6, v * 100)}%`,
                  opacity: isRecording ? 0.4 + v * 0.6 : 0.18,
                }}
              />
            ))}
          </div>

          {/* Bouton micro */}
          <div className="relative mx-auto mt-7 h-24 w-24">
            {isRecording && (
              <>
                <div className="absolute inset-0 animate-breathe rounded-full border border-gold/50" />
                <div
                  className="absolute -inset-3 animate-breathe rounded-full border border-gold/25"
                  style={{ animationDelay: '0.6s' }}
                />
              </>
            )}
            <motion.button
              whileTap={{ scale: 0.94 }}
              onClick={isRecording ? stopRecording : startRecording}
              disabled={processing}
              className={cn(
                'relative flex h-24 w-24 items-center justify-center rounded-full shadow-glow-gold transition-colors duration-300',
                isRecording ? 'bg-gold' : 'bg-forest'
              )}
              aria-label={isRecording ? "Arrêter l'enregistrement" : "Commencer l'enregistrement"}
            >
              {isRecording ? (
                <Square className="h-8 w-8 fill-ink text-ink" strokeWidth={1.75} />
              ) : (
                <Mic className="h-9 w-9 text-ivory-50" strokeWidth={1.5} />
              )}
            </motion.button>
          </div>

          <p className="mt-6 text-headline text-ivory-50">
            {isRecording ? 'Je t\'écoute…' : 'Appuie pour commencer ta récitation'}
          </p>
          <p className="mt-1 text-footnote text-ivory-50/50">
            {isRecording
              ? 'Appuie sur le carré quand tu as terminé'
              : 'Récite un verset ou une sourate entière, clairement'}
          </p>

          {/* Analyse */}
          <AnimatePresence>
            {audioBlob && !isRecording && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease: EASE }}
                className="mt-6"
              >
                <button
                  onClick={analyzeRecording}
                  disabled={processing}
                  className="inline-flex items-center gap-2 rounded-full bg-ivory-50 px-6 py-3 text-callout font-semibold text-ink disabled:opacity-70"
                >
                  {processing ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Analyse en cours…
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4 text-gold-600" strokeWidth={1.75} />
                      Analyser ma récitation
                    </>
                  )}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </PCard>
      </motion.div>

      {/* ── Traduction en direct ───────────────────────── */}
      <AnimatePresence>
        {(isRecording || liveVerses.length > 0) && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="mt-4"
          >
            <PCard className="p-4">
              <div className="flex items-center gap-2 px-1">
                <Languages className="h-4 w-4 text-gold-600" strokeWidth={1.75} />
                <p className="text-caption uppercase text-gold-600">Traduction en direct</p>
                {isRecording && speechSupported && (
                  <span className="ml-auto flex items-center gap-1.5 text-[11px] text-muted-warm">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-forest" />
                    en écoute
                  </span>
                )}
              </div>

              {isRecording && !speechSupported && (
                <p className="mt-3 rounded-tile bg-sand px-3 py-2.5 text-footnote text-muted-warm">
                  Traduction en direct non disponible sur ce navigateur — elle
                  s'affichera après l'analyse. (Astuce : utilise Chrome)
                </p>
              )}
              {liveVerses.length === 0 && isRecording && speechSupported && (
                <p className="mt-3 px-1 py-3 text-center text-footnote italic text-faint">
                  Récite… chaque verset traduit apparaîtra ici.
                </p>
              )}

              <div ref={liveScrollRef} className="mt-2 max-h-72 space-y-2 overflow-y-auto scroll-smooth">
                {liveVerses.map((verse, idx) => (
                  <motion.div
                    key={`${verse.surah}:${verse.ayah}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: EASE }}
                    className={cn(
                      'rounded-tile border p-4',
                      idx === liveVerses.length - 1
                        ? 'border-gold/40 bg-gold-200/30'
                        : 'border-hairline bg-ivory opacity-75'
                    )}
                  >
                    <p className="text-caption uppercase text-gold-600">
                      Sourate {verse.surah} · Verset {verse.ayah}
                    </p>
                    <p className="mt-2 font-quran text-xl leading-[1.9] text-ink" dir="rtl">
                      {verse.arabic}
                    </p>
                    <p className="mt-1.5 text-footnote italic text-muted-warm">
                      « {verse.french} »
                    </p>
                  </motion.div>
                ))}
              </div>
            </PCard>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Résultats ──────────────────────────────────── */}
      {result && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="mt-4 space-y-4"
        >
          {result.overall_quality === 'cannot_analyze' ? (
            <PCard className="border-danger/20">
              <div className="flex items-start gap-3">
                <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-danger" strokeWidth={1.75} />
                <div>
                  <p className="text-headline text-ink">Analyse impossible</p>
                  {result.advice?.map((a, i) => (
                    <p key={i} className="mt-1 text-footnote text-muted-warm">{a}</p>
                  ))}
                </div>
              </div>
            </PCard>
          ) : (
            <>
              {/* Score */}
              <PCard className="flex items-center gap-5">
                <ProgressRing progress={(result.score ?? 0) / 100} size={84} stroke={4}>
                  <p className="tnum text-title2 text-ink">{result.score}%</p>
                </ProgressRing>
                <div>
                  <p className="text-caption uppercase text-gold-600">Score Tajwid</p>
                  <p className="mt-1 text-headline text-ink">
                    {result.overall_quality === 'excellent'
                      ? 'Excellente récitation'
                      : result.overall_quality === 'good'
                        ? 'Belle récitation'
                        : 'En bonne voie'}
                  </p>
                  <p className="mt-0.5 text-footnote text-muted-warm">
                    {(result.errors?.length || 0) === 0
                      ? 'Aucune erreur relevée'
                      : `${result.errors!.length} point${result.errors!.length > 1 ? 's' : ''} à travailler`}
                  </p>
                </div>
              </PCard>

              {/* Transcription */}
              {result.arabic_text && (
                <PCard>
                  <p className="text-caption uppercase text-gold-600">Ta récitation</p>
                  <p className="mt-3 font-quran text-2xl leading-[2] text-ink" dir="rtl">
                    {result.arabic_text}
                  </p>
                </PCard>
              )}

              {/* Traduction verset par verset */}
              {result.verses && result.verses.length > 0 && (
                <PCard className="p-4">
                  <div className="flex items-center gap-2 px-1 pb-1">
                    <Languages className="h-4 w-4 text-gold-600" strokeWidth={1.75} />
                    <p className="text-caption uppercase text-gold-600">
                      Traduction · Muhammad Hamidullah
                    </p>
                  </div>
                  <div className="mt-1 space-y-2">
                    {result.verses.map((verse) => (
                      <div key={`${verse.surah}:${verse.ayah}`} className="rounded-tile bg-ivory p-4">
                        <p className="text-caption uppercase text-faint">
                          Sourate {verse.surah} · Verset {verse.ayah}
                        </p>
                        <p className="mt-2 font-quran text-lg leading-[1.9] text-ink" dir="rtl">
                          {verse.arabic}
                        </p>
                        <p className="mt-1.5 text-footnote italic text-muted-warm">
                          « {verse.french} »
                        </p>
                      </div>
                    ))}
                  </div>
                </PCard>
              )}

              {/* Règles bien appliquées */}
              {result.correct_rules && result.correct_rules.length > 0 && (
                <PCard>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-forest" strokeWidth={1.75} />
                    <p className="text-caption uppercase text-forest">Bien récité</p>
                  </div>
                  <div className="mt-3 space-y-3">
                    {result.correct_rules.map((r, i) => (
                      <div key={i} className="rounded-tile bg-forest-50 p-3.5">
                        <p className="text-callout font-semibold text-forest">{r.rule}</p>
                        <p className="mt-0.5 text-footnote text-ink/70">{r.description}</p>
                        {r.location && (
                          <p className="mt-1 font-quran text-base text-ink" dir="rtl">{r.location}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </PCard>
              )}

              {/* Points à corriger */}
              {result.errors && result.errors.length > 0 && (
                <PCard>
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-warning" strokeWidth={1.75} />
                    <p className="text-caption uppercase text-warning">À travailler</p>
                  </div>
                  <div className="mt-3 space-y-3">
                    {result.errors.map((e, i) => (
                      <div
                        key={i}
                        className={cn(
                          'rounded-tile border-l-2 bg-ivory p-3.5',
                          e.severity === 'critical'
                            ? 'border-l-danger'
                            : e.severity === 'important'
                              ? 'border-l-warning'
                              : 'border-l-gold'
                        )}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-callout font-semibold text-ink">{e.type}</p>
                          {e.severity && (
                            <span
                              className={cn(
                                'rounded-full px-2 py-0.5 text-[10px] font-semibold',
                                e.severity === 'critical'
                                  ? 'bg-danger/10 text-danger'
                                  : e.severity === 'important'
                                    ? 'bg-warning/10 text-warning'
                                    : 'bg-gold-200/60 text-bronze'
                              )}
                            >
                              {e.severity === 'critical'
                                ? 'Critique'
                                : e.severity === 'important'
                                  ? 'Important'
                                  : 'Mineur'}
                            </span>
                          )}
                        </div>
                        {e.location && (
                          <p className="mt-1.5 font-quran text-lg text-ink" dir="rtl">{e.location}</p>
                        )}
                        <p className="mt-1.5 text-footnote text-ink/75">{e.correction}</p>
                        {e.rule && (
                          <p className="mt-1.5 text-[11px] font-medium text-bronze">
                            Règle : {e.rule}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </PCard>
              )}

              {/* Conseils */}
              {result.advice && result.advice.length > 0 && (
                <PCard variant="gold">
                  <div className="flex items-center gap-2">
                    <Lightbulb className="h-4 w-4 text-bronze" strokeWidth={1.75} />
                    <p className="text-caption uppercase text-bronze">Conseils du coach</p>
                  </div>
                  <ul className="mt-3 space-y-2">
                    {result.advice.map((tip, i) => (
                      <li key={i} className="flex items-start gap-2 text-footnote text-ink/80">
                        <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-gold-600" />
                        {tip}
                      </li>
                    ))}
                  </ul>
                  {result.sources && (
                    <p className="mt-4 border-t border-gold/20 pt-3 text-[11px] text-bronze/80">
                      Sources : {result.sources.join(' · ')}
                    </p>
                  )}
                </PCard>
              )}
            </>
          )}
        </motion.div>
      )}

      {/* ── Règles de Tajwid (référence) ───────────────── */}
      <motion.div variants={itemVariants} className="mt-4">
        <PCard className="p-4" onClick={() => setShowRules(!showRules)}>
          <div className="flex cursor-pointer items-center justify-between px-1">
            <div className="flex items-center gap-2.5">
              <BookOpen className="h-[18px] w-[18px] text-bronze" strokeWidth={1.75} />
              <p className="text-headline text-ink">Règles de Tajwid</p>
            </div>
            <ChevronRight
              className={cn(
                'h-4 w-4 text-faint transition-transform duration-300',
                showRules && 'rotate-90'
              )}
              strokeWidth={1.75}
            />
          </div>
          <AnimatePresence>
            {showRules && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: EASE }}
                className="overflow-hidden"
              >
                <div className="mt-3 space-y-2">
                  {TAJWEED_RULES.map((rule) => (
                    <div key={rule.id} className="rounded-tile bg-ivory p-3.5">
                      <div className="flex items-baseline justify-between gap-3">
                        <p className="text-callout font-semibold text-ink">{rule.title}</p>
                        <p className="font-quran text-base text-gold-600" dir="rtl">{rule.example}</p>
                      </div>
                      <p className="mt-0.5 text-footnote text-muted-warm">{rule.description}</p>
                    </div>
                  ))}
                  <p className="px-1 pt-1 text-[11px] leading-relaxed text-faint">
                    D'après Al-Muqaddima al-Jazariyya et Tuhfat al-Atfal.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </PCard>
      </motion.div>
    </Screen>
  );
}
