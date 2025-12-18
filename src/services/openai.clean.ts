/**
 * Service OpenAI pour la transcription audio (Whisper) et l'analyse de Tajweed (GPT-4)
 *
 * IMPORTANT: Pour utiliser ce service, vous devez:
 * 1. Créer un compte OpenAI sur https://platform.openai.com/
 * 2. Générer une clé API
 * 3. Ajouter la clé dans les variables d'environnement ou directement ici (non recommandé pour production)
 */

// CONFIGURATION
// Solution: Clé API chargée depuis localStorage (configurée une seule fois)
// Cela permet de garder la clé localement sans la committer
const getAPIKey = (): string => {
  // Option 1: Depuis localStorage (priorité)
  const localKey = localStorage.getItem('OPENAI_API_KEY');
  if (localKey) return localKey;

  // Option 2: Depuis .env (si configuré)
  const envKey = import.meta.env.VITE_OPENAI_API_KEY;
  if (envKey) return envKey;

  // Option 3: Pas de clé par défaut - doit être configurée
  return '';
};

const OPENAI_API_KEY = getAPIKey();

// Debug: vérifier si la clé est chargée
console.log('🔑 Configuration OpenAI:');
console.log('  - Clé chargée:', OPENAI_API_KEY ? `Oui (${OPENAI_API_KEY.substring(0, 20)}...)` : 'Non');
console.log('  - Longueur:', OPENAI_API_KEY.length);
console.log('  - Source:', localStorage.getItem('OPENAI_API_KEY') ? 'localStorage' : (import.meta.env.VITE_OPENAI_API_KEY ? '.env' : 'none'));

// NOTE: Ce fichier est la version PROPRE à committer
// Le fichier openai.ts local peut contenir votre clé API pour les tests
// Git ignore automatiquement les modifications locales de openai.ts
