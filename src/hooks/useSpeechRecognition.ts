/**
 * Hook de reconnaissance vocale en direct (Web Speech API).
 * Sert à afficher la traduction qui défile pendant la récitation.
 *
 * Fonctionne sur Chrome / Edge / Android. Sur les navigateurs non
 * supportés (certains iOS), `supported` vaut false et on se rabat
 * simplement sur l'analyse après enregistrement.
 */
import { useCallback, useEffect, useRef, useState } from 'react';

export function useSpeechRecognition(onResult: (text: string, isFinal: boolean) => void) {
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const wantListeningRef = useRef(false);
  const [supported, setSupported] = useState(false);
  const [listening, setListening] = useState(false);

  // On garde le dernier callback sans recréer la reconnaissance
  const onResultRef = useRef(onResult);
  useEffect(() => { onResultRef.current = onResult; }, [onResult]);

  useEffect(() => {
    const Ctor = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!Ctor) {
      setSupported(false);
      return;
    }
    setSupported(true);

    const recognition = new Ctor();
    recognition.lang = 'ar-SA';        // arabe
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let interim = '';
      let final = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const res = event.results[i];
        if (res.isFinal) final += res[0].transcript + ' ';
        else interim += res[0].transcript + ' ';
      }
      if (final.trim()) onResultRef.current(final.trim(), true);
      else if (interim.trim()) onResultRef.current(interim.trim(), false);
    };

    // La reconnaissance s'arrête toute seule (silence) : on la relance
    recognition.onend = () => {
      if (wantListeningRef.current) {
        try { recognition.start(); } catch (_) { /* déjà démarrée */ }
      } else {
        setListening(false);
      }
    };

    recognition.onerror = (e: SpeechRecognitionErrorEvent) => {
      // "no-speech" / "aborted" sont normaux, on ignore
      if (e.error !== 'no-speech' && e.error !== 'aborted') {
        console.warn('Reconnaissance vocale:', e.error);
      }
    };

    recognitionRef.current = recognition;

    return () => {
      wantListeningRef.current = false;
      try { recognition.stop(); } catch (_) { /* ignore */ }
    };
  }, []);

  const start = useCallback(() => {
    if (!recognitionRef.current) return;
    wantListeningRef.current = true;
    try {
      recognitionRef.current.start();
      setListening(true);
    } catch (_) {
      /* déjà démarrée */
    }
  }, []);

  const stop = useCallback(() => {
    wantListeningRef.current = false;
    if (recognitionRef.current) {
      try { recognitionRef.current.stop(); } catch (_) { /* ignore */ }
    }
    setListening(false);
  }, []);

  return { supported, listening, start, stop };
}
