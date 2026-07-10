/**
 * Service Tajweed via Cloudflare Worker (IA intégrée et gratuite)
 *
 * L'IA (Whisper + Llama) tourne sur le Worker Cloudflare.
 * L'utilisateur n'a AUCUNE clé à configurer : tout est dans le backend.
 *
 * IMPORTANT : le navigateur enregistre en webm/opus, un format que Whisper
 * décode mal. On convertit donc l'audio en WAV (PCM 16 bits) côté navigateur
 * avant l'envoi — le WAV est toujours décodable par Whisper.
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

/** Encode un tableau de samples (mono, Float32) en fichier WAV 16 bits PCM. */
function encodeWav(samples: Float32Array, sampleRate: number): ArrayBuffer {
  const buffer = new ArrayBuffer(44 + samples.length * 2);
  const view = new DataView(buffer);

  const writeString = (offset: number, str: string) => {
    for (let i = 0; i < str.length; i++) view.setUint8(offset + i, str.charCodeAt(i));
  };

  writeString(0, 'RIFF');
  view.setUint32(4, 36 + samples.length * 2, true);
  writeString(8, 'WAVE');
  writeString(12, 'fmt ');
  view.setUint32(16, 16, true);          // taille du sous-bloc fmt
  view.setUint16(20, 1, true);           // format PCM
  view.setUint16(22, 1, true);           // mono
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2, true); // byte rate
  view.setUint16(32, 2, true);           // block align
  view.setUint16(34, 16, true);          // bits par sample
  writeString(36, 'data');
  view.setUint32(40, samples.length * 2, true);

  // Écriture des samples en PCM 16 bits
  let offset = 44;
  for (let i = 0; i < samples.length; i++) {
    const s = Math.max(-1, Math.min(1, samples[i]));
    view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7fff, true);
    offset += 2;
  }
  return buffer;
}

/** Convertit un ArrayBuffer en chaîne base64. */
function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  const chunkSize = 0x8000; // 32 Ko par morceau
  for (let i = 0; i < bytes.length; i += chunkSize) {
    const chunk = bytes.subarray(i, i + chunkSize);
    binary += String.fromCharCode.apply(null, Array.from(chunk) as unknown as number[]);
  }
  return btoa(binary);
}

/**
 * Convertit un Blob audio (webm/opus, mp4...) en WAV mono base64.
 * Utilise l'API Web Audio du navigateur pour décoder puis ré-encoder.
 */
async function blobToWavBase64(blob: Blob): Promise<string> {
  const arrayBuffer = await blob.arrayBuffer();
  const AudioCtx: typeof AudioContext =
    window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  const audioCtx = new AudioCtx();

  try {
    const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer.slice(0));

    const length = audioBuffer.length;
    const numChannels = audioBuffer.numberOfChannels;

    // Mixage en mono
    const mono = new Float32Array(length);
    for (let ch = 0; ch < numChannels; ch++) {
      const data = audioBuffer.getChannelData(ch);
      for (let i = 0; i < length; i++) mono[i] += data[i] / numChannels;
    }

    const wav = encodeWav(mono, audioBuffer.sampleRate);
    return arrayBufferToBase64(wav);
  } finally {
    audioCtx.close();
  }
}

/**
 * Transcrit l'audio ET analyse le Tajweed en un seul appel au Worker.
 */
export async function transcribeAndAnalyze(audioBlob: Blob): Promise<{
  transcription: { text: string; language: string; duration: number };
  analysis: TajweedAnalysis;
}> {
  // Conversion en WAV pour garantir la compatibilité avec Whisper
  const base64Audio = await blobToWavBase64(audioBlob);

  const response = await fetch(WORKER_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ audio: base64Audio }),
  });

  if (!response.ok) {
    let message = "Erreur lors de l'analyse";
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
