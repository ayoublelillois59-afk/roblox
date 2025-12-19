/**
 * Service pour appeler les API Vercel Functions
 * Tout est sur Vercel - SIMPLE!
 */

// Les fonctions API sont sur le même domaine
const API_URL = ''; // Vide = même domaine Vercel

console.log('🔗 API Mode: Vercel Functions (même domaine)');

/**
 * Transcrit un audio en texte arabe en utilisant le backend
 */
export async function transcribeAudio(audioBlob: Blob): Promise<{
  text: string;
  language: string;
  duration: number;
}> {
  // Convertir le Blob en base64
  const arrayBuffer = await audioBlob.arrayBuffer();
  const base64Audio = btoa(
    new Uint8Array(arrayBuffer).reduce(
      (data, byte) => data + String.fromCharCode(byte),
      ''
    )
  );

  const response = await fetch(`${API_URL}/api/transcribe`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ audio: base64Audio }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Erreur lors de la transcription');
  }

  return await response.json();
}

/**
 * Analyse le Tajweed d'une récitation via le backend
 */
export async function analyzeTajweed(
  arabicText: string
): Promise<{
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
}> {
  const response = await fetch(`${API_URL}/api/analyze-tajweed`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ arabicText }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Erreur lors de l\'analyse');
  }

  return await response.json();
}

/**
 * Fonction combinée: Transcription + Analyse
 */
export async function transcribeAndAnalyze(audioBlob: Blob): Promise<{
  transcription: {
    text: string;
    language: string;
    duration: number;
  };
  analysis: {
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
  };
}> {
  // 1. Transcrire l'audio
  const transcription = await transcribeAudio(audioBlob);

  // 2. Analyser le Tajweed
  const analysis = await analyzeTajweed(transcription.text);

  return {
    transcription,
    analysis,
  };
}

/**
 * Vérifie si le backend API est disponible
 */
export async function checkBackendHealth(): Promise<boolean> {
  try {
    const response = await fetch(`${API_URL}/health`);
    return response.ok;
  } catch (error) {
    console.error('Backend non disponible:', error);
    return false;
  }
}

/**
 * Toujours retourner true car le backend gère la configuration
 */
export function isOpenAIConfigured(): boolean {
  return true; // La clé est dans le backend
}
