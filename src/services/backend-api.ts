/**
 * Service pour appeler le backend API (au lieu d'OpenAI directement)
 * Architecture: Frontend → Backend → OpenAI
 * La clé API est sécurisée côté backend
 */

// URL du backend (configurable selon l'environnement)
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

console.log('🔗 Backend API URL:', API_URL);

/**
 * Transcrit un audio en texte arabe en utilisant le backend
 */
export async function transcribeAudio(audioBlob: Blob): Promise<{
  text: string;
  language: string;
  duration: number;
}> {
  const formData = new FormData();
  formData.append('audio', audioBlob, 'recording.webm');

  const response = await fetch(`${API_URL}/api/transcribe`, {
    method: 'POST',
    body: formData,
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
