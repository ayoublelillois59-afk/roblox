/**
 * Service OpenAI pour la transcription audio (Whisper) et l'analyse de Tajweed (GPT-4)
 *
 * IMPORTANT: Pour utiliser ce service, vous devez:
 * 1. Créer un compte OpenAI sur https://platform.openai.com/
 * 2. Générer une clé API
 * 3. Ajouter la clé dans les variables d'environnement ou directement ici (non recommandé pour production)
 */

// CONFIGURATION
// Chargement depuis .env ou .env.local
const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY || '';

// Debug: vérifier si la clé est chargée
console.log('🔑 Configuration OpenAI:');
console.log('  - Clé chargée depuis .env:', OPENAI_API_KEY ? `Oui (${OPENAI_API_KEY.substring(0, 20)}...)` : 'Non - Variable VITE_OPENAI_API_KEY non trouvée');
console.log('  - Longueur de la clé:', OPENAI_API_KEY.length);
console.log('  - Toutes les variables VITE_*:', Object.keys(import.meta.env).filter(k => k.startsWith('VITE_')));

const OPENAI_API_URL = 'https://api.openai.com/v1';
/**
 * Transcrit un audio en texte arabe en utilisant Whisper d'OpenAI
 */
export async function transcribeAudio(audioBlob: Blob): Promise<{
  text: string;
  language: string;
  duration: number;
}> {
  if (!OPENAI_API_KEY) {
    throw new Error('Clé API OpenAI non configurée. Veuillez ajouter VITE_OPENAI_API_KEY dans vos variables d\'environnement.');
  }

  const formData = new FormData();
  formData.append('file', audioBlob, 'recording.webm');
  formData.append('model', 'whisper-1');
  formData.append('language', 'ar'); // Arabe
  formData.append('response_format', 'verbose_json');

  const response = await fetch(`${OPENAI_API_URL}/audio/transcriptions`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${OPENAI_API_KEY}`,
    },
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Erreur Whisper: ${error.error?.message || 'Erreur inconnue'}`);
  }

  const data = await response.json();

  return {
    text: data.text,
    language: data.language,
    duration: data.duration,
  };
}

/**
 * Analyse le Tajweed d'une récitation en utilisant GPT-4
 * IMPORTANT: Analyse basée sur l'audio transcrit + prompt système strict
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
  sources: string[];
}> {
  if (!OPENAI_API_KEY) {
    throw new Error('Clé API OpenAI non configurée.');
  }

  // Prompt utilisateur avec le texte récité
  const userPrompt = `Analyse la récitation suivante :

TEXTE RÉCITÉ:
"${arabicText}"

Fournis ton analyse au format JSON suivant:
{
  "overall_quality": "excellent|good|needs_improvement",
  "correct_rules": [
    {
      "rule": "Nom de la règle en français",
      "description": "Description de comment elle devrait être appliquée",
      "location": "Mot ou partie concernée en arabe"
    }
  ],
  "errors": [
    {
      "type": "Type d'erreur (ex: Ghunna, Madd, Qalqala...)",
      "location": "Mot en arabe où l'erreur probable se situe",
      "correction": "Explication simple de la correction",
      "rule": "Nom de la règle classique",
      "severity": "critical|important|minor"
    }
  ],
  "advice": [
    "Conseil technique pratique 1",
    "Conseil technique pratique 2",
    "Encouragement positif"
  ],
  "sources": ["Nom de la source référence"]
}`;

  // Prompt système EXACT tel que fourni par l'utilisateur
  const systemPrompt = `Tu es un professeur de tajwīd du Coran.

Analyse la récitation suivante uniquement selon les règles reconnues du tajwīd :

- Makharij al-hurūf
- Madd (ṭabī'ī, wājib, jā'iz)
- Ikhfā
- Idghām
- Qalqalah
- Ghunnah

Règles :
- N'invente aucune règle
- Ne donne aucune fatwa
- Donne uniquement des remarques techniques
- Cite toujours la règle concernée

Résultat attendu :
- Ce qui est bien récité
- Les erreurs éventuelles
- La règle concernée
- Comment corriger (simplement)`;

  const response = await fetch(`${OPENAI_API_URL}/chat/completions`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: systemPrompt
        },
        {
          role: 'user',
          content: userPrompt
        }
      ],
      temperature: 0.2, // Très basse pour analyse technique précise
      response_format: { type: 'json_object' }
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Erreur GPT-4: ${error.error?.message || 'Erreur inconnue'}`);
  }

  const data = await response.json();
  const analysis = JSON.parse(data.choices[0].message.content);

  return analysis;
}

/**
 * Fonction combinée: Transcription + Analyse en un seul appel
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
    sources: string[];
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
 * Vérifie si l'API OpenAI est configurée
 */
export function isOpenAIConfigured(): boolean {
  return OPENAI_API_KEY.length > 0;
}
