/**
 * Service Tajweed via Cloudflare Worker (IA intégrée et gratuite)
 *
 * L'IA (Whisper + Llama) tourne sur le Worker Cloudflare.
 * L'utilisateur n'a AUCUNE clé à configurer : tout est dans le backend.
 *
 * ➜ Après avoir déployé le Worker (voir cloudflare-worker/README.md),
 *   remplace WORKER_URL ci-dessous par l'URL de ton Worker,
 *   OU définis la variable d'environnement VITE_TAJWEED_API_URL.
 */

// URL du Worker Cloudflare (IA Tajweed intégrée et gratuite)
const DEFAULT_WORKER_URL = 'https://tajweedia.ayoublelillois59.workers.dev';

const WORKER_URL =
  (import.meta.env.VITE_TAJWEED_API_URL as string | undefined) || DEFAULT_WORKER_URL;

console.log('🔗 IA Tajweed : Cloudflare Worker →', WORKER_URL);

export interface TajweedAnalysis {
  overall_quality: 'excellent' | 'good' | 'needs_improvement';
  correct_rules: Array<{ rule: string; description: string; location?: string }>;
  errors: Array<{
    type: string;
    location: string;
    correction: string;
    rule: string;
    severity: 'critical' | 'important' | 'minor';
  }>;
  advice: string[];
  sources?: string[];
}

/** Convertit un Blob audio en chaîne base64 (sans le préfixe data:). */
async function blobToBase64(blob: Blob): Promise<string> {
  const arrayBuffer = await blob.arrayBuffer();
  const bytes = new Uint8Array(arrayBuffer);
  let binary = '';
  const chunkSize = 0x8000; // 32 Ko par morceau pour éviter les dépassements de pile
  for (let i = 0; i < bytes.length; i += chunkSize) {
    const chunk = bytes.subarray(i, i + chunkSize);
    binary += String.fromCharCode.apply(null, Array.from(chunk) as unknown as number[]);
  }
  return btoa(binary);
}

/**
 * Transcrit l'audio ET analyse le Tajweed en un seul appel au Worker.
 */
export async function transcribeAndAnalyze(audioBlob: Blob): Promise<{
  transcription: { text: string; language: string; duration: number };
  analysis: TajweedAnalysis;
}> {
  const base64Audio = await blobToBase64(audioBlob);

  const response = await fetch(WORKER_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ audio: base64Audio }),
  });

  if (!response.ok) {
    let message = 'Erreur lors de l\'analyse';
    try {
      const err = await response.json();
      message = err.message || err.error || message;
    } catch (_) {
      /* réponse non-JSON */
    }
    throw new Error(message);
  }

  return await response.json();
}

/**
 * L'IA est toujours "configurée" côté app : tout est dans le Worker.
 */
export function isOpenAIConfigured(): boolean {
  return true;
}
