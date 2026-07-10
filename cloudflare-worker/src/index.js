/**
 * Muslim Pro - Worker Cloudflare : Analyse Tajweed par IA (100% gratuit)
 *
 * Ce Worker fait DEUX choses avec l'IA intégrée de Cloudflare (Workers AI) :
 *   1. Transcription de l'audio arabe   -> modèle Whisper
 *   2. Analyse du Tajweed + conseils     -> modèle Llama
 *
 * L'utilisateur de l'app n'a AUCUNE clé à mettre. Tout est ici, dans le backend.
 *
 * Déploiement : voir README.md (npx wrangler deploy)
 */

// ── Modèles utilisés ──────────────────────────────────────────────
// Whisper de base : modèle actif qui gère l'arabe. (Le modèle "turbo" a
// été supprimé par Cloudflare le 2026-05-30.) Il prend l'audio sous forme
// de tableau d'octets, pas de base64 → on convertit plus bas.
const WHISPER_MODEL = '@cf/openai/whisper';
// Meilleur modèle de texte gratuit fiable. Pour plus de qualité tu peux
// tester : '@cf/meta/llama-3.3-70b-instruct-fp8-fast' (change juste cette ligne)
const LLM_MODEL = '@cf/meta/llama-3.1-8b-instruct';

// ── Prompt du professeur de Tajweed ───────────────────────────────
const SYSTEM_PROMPT = `Tu es un professeur de tajwīd du Saint Coran, précis et bienveillant.

Analyse la récitation transcrite selon les règles reconnues du tajwīd :
- Makharij al-hurūf (points d'articulation)
- Madd (ṭabī'ī, wājib, jā'iz)
- Ikhfā, Idghām, Qalqalah, Ghunnah
- Noon et Meem sakina

RÈGLES STRICTES :
- N'invente AUCUNE règle et ne donne AUCUNE fatwa.
- Donne uniquement des remarques techniques.
- Cite toujours la règle concernée.
- Sois encourageant : mentionne d'abord ce qui est bien.
- Réponds UNIQUEMENT avec un objet JSON valide, sans texte autour.`;

function buildUserPrompt(arabicText) {
  return `Voici la transcription d'une récitation coranique :
"${arabicText}"

Analyse-la et réponds EXACTEMENT avec cet objet JSON (rien d'autre) :
{
  "overall_quality": "excellent" | "good" | "needs_improvement",
  "correct_rules": [
    { "rule": "Nom de la règle", "description": "Comment elle est bien appliquée", "location": "mot arabe concerné" }
  ],
  "errors": [
    { "type": "Type d'erreur", "location": "mot arabe", "correction": "explication simple", "rule": "règle classique", "severity": "critical" | "important" | "minor" }
  ],
  "advice": ["conseil pratique 1", "conseil pratique 2", "encouragement positif"],
  "sources": ["Al-Muqaddima al-Jazariyya", "Tuhfat al-Atfal"]
}`;
}

// ── En-têtes CORS ─────────────────────────────────────────────────
function corsHeaders(origin) {
  return {
    'Access-Control-Allow-Origin': origin || '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
  };
}

function json(data, status, origin) {
  return new Response(JSON.stringify(data), {
    status: status || 200,
    headers: { 'Content-Type': 'application/json', ...corsHeaders(origin) },
  });
}

// Extrait le premier bloc JSON valide d'un texte (au cas où le modèle
// ajoute du texte autour malgré la consigne).
function extractJson(text) {
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch (_) {
    const start = text.indexOf('{');
    const end = text.lastIndexOf('}');
    if (start !== -1 && end !== -1 && end > start) {
      try {
        return JSON.parse(text.slice(start, end + 1));
      } catch (_) {
        return null;
      }
    }
    return null;
  }
}

export default {
  async fetch(request, env) {
    const origin = env.ALLOWED_ORIGIN || '*';

    // Pré-vol CORS
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders(origin) });
    }

    // Petit health-check pour vérifier que le Worker est en ligne
    if (request.method === 'GET') {
      return json({ status: 'ok', service: 'Muslim Pro Tajweed AI' }, 200, origin);
    }

    if (request.method !== 'POST') {
      return json({ error: 'Méthode non autorisée' }, 405, origin);
    }

    try {
      const body = await request.json();
      const base64Audio = body.audio;

      if (!base64Audio) {
        return json({ error: 'Audio manquant (champ "audio" en base64 requis)' }, 400, origin);
      }

      // ── 1. Transcription de l'audio arabe (Whisper) ──────────────
      // Le modèle @cf/openai/whisper attend un tableau d'octets.
      // On décode donc le base64 reçu en octets.
      const binary = atob(base64Audio);
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);

      const whisperResult = await env.AI.run(WHISPER_MODEL, {
        audio: Array.from(bytes),
      });

      const arabicText = (whisperResult && (whisperResult.text || whisperResult.transcription) || '').trim();

      if (!arabicText) {
        return json({
          error: 'Transcription vide',
          message: "L'audio n'a pas pu être transcrit. Parle plus près du micro et réessaie.",
        }, 422, origin);
      }

      // ── 2. Analyse du Tajweed (Llama) ────────────────────────────
      const llmResult = await env.AI.run(LLM_MODEL, {
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: buildUserPrompt(arabicText) },
        ],
        temperature: 0.2,
        max_tokens: 1500,
      });

      const rawText = llmResult && (llmResult.response || llmResult.result || '');
      let analysis = extractJson(rawText);

      // Filet de sécurité : si le modèle n'a pas rendu de JSON exploitable,
      // on renvoie quand même la transcription avec un message clair.
      if (!analysis || typeof analysis !== 'object') {
        analysis = {
          overall_quality: 'good',
          correct_rules: [],
          errors: [],
          advice: [
            "L'analyse détaillée n'a pas pu être structurée cette fois-ci.",
            'Voici la transcription de ta récitation pour vérification.',
            'Réessaie avec un enregistrement un peu plus long et clair.',
          ],
          sources: ['Al-Muqaddima al-Jazariyya'],
        };
      }

      // Normalisation : on garantit que tous les champs existent
      const safeAnalysis = {
        overall_quality: analysis.overall_quality || 'good',
        correct_rules: Array.isArray(analysis.correct_rules) ? analysis.correct_rules : [],
        errors: Array.isArray(analysis.errors) ? analysis.errors : [],
        advice: Array.isArray(analysis.advice) ? analysis.advice : [],
        sources: Array.isArray(analysis.sources) ? analysis.sources : ['Al-Muqaddima al-Jazariyya'],
      };

      return json({
        transcription: { text: arabicText, language: 'ar', duration: 0 },
        analysis: safeAnalysis,
      }, 200, origin);

    } catch (err) {
      return json({
        error: "Erreur lors de l'analyse",
        message: (err && err.message) || 'Erreur inconnue',
      }, 500, origin);
    }
  },
};
