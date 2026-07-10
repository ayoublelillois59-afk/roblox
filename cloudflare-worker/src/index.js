/**
 * Muslim Pro - Worker Cloudflare : Analyse Tajweed par IA (gratuit via Groq)
 *
 * Cloudflare a supprimé ses modèles Whisper (plus d'arabe). On utilise donc
 * Groq (gratuit, 2000 req/jour) qui fait tout en excellente qualité :
 *   1. Transcription arabe  -> whisper-large-v3
 *   2. Analyse du Tajweed    -> llama-3.3-70b-versatile
 *
 * Le Worker garde la clé Groq SECRÈTE (variable GROQ_API_KEY).
 * L'utilisateur de l'app n'a AUCUNE clé à mettre : tout est ici.
 *
 * ⚙️ À configurer une fois : ajoute la variable secrète GROQ_API_KEY dans
 *    les réglages du Worker (Settings → Variables and Secrets).
 */

const GROQ_BASE = 'https://api.groq.com/openai/v1';
const WHISPER_MODEL = 'whisper-large-v3';        // transcription arabe (gratuit)
const LLM_MODEL = 'llama-3.3-70b-versatile';     // analyse Tajweed (gratuit, puissant)

const SYSTEM_PROMPT = `Tu es un professeur de tajwīd du Saint Coran, précis et bienveillant.

Analyse la récitation transcrite selon les règles reconnues du tajwīd :
- Makharij al-hurūf (points d'articulation)
- Madd (ṭabī'ī, wājib, jā'iz)
- Ikhfā, Idghām, Qalqalah, Ghunnah
- Noon et Meem sakina

RÈGLES STRICTES :
- N'invente AUCUNE règle et ne donne AUCUNE fatwa.
- Donne uniquement des remarques techniques et cite la règle concernée.
- Sois encourageant : mentionne d'abord ce qui est bien.
- Réponds UNIQUEMENT avec un objet JSON valide, sans texte autour.`;

function buildUserPrompt(arabicText) {
  return `Voici la transcription d'une récitation coranique :
"${arabicText}"

Réponds EXACTEMENT avec cet objet JSON (rien d'autre) :
{
  "overall_quality": "excellent" | "good" | "needs_improvement",
  "correct_rules": [ { "rule": "Nom de la règle", "description": "Comment elle est bien appliquée", "location": "mot arabe" } ],
  "errors": [ { "type": "Type d'erreur", "location": "mot arabe", "correction": "explication simple", "rule": "règle classique", "severity": "critical" | "important" | "minor" } ],
  "advice": ["conseil pratique 1", "conseil pratique 2", "encouragement positif"],
  "sources": ["Al-Muqaddima al-Jazariyya", "Tuhfat al-Atfal"]
}`;
}

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

function json(data, status) {
  return new Response(JSON.stringify(data), {
    status: status || 200,
    headers: { 'Content-Type': 'application/json', ...corsHeaders() },
  });
}

function extractJson(text) {
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch (_) {
    const s = text.indexOf('{'), e = text.lastIndexOf('}');
    if (s !== -1 && e > s) {
      try { return JSON.parse(text.slice(s, e + 1)); } catch (_) { return null; }
    }
    return null;
  }
}

export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: corsHeaders() });
    if (request.method === 'GET') {
      return json({ status: 'ok', service: 'Muslim Pro Tajweed AI', version: 'v3-groq' });
    }
    if (request.method !== 'POST') return json({ error: 'Méthode non autorisée' }, 405);

    if (!env.GROQ_API_KEY) {
      return json({ error: 'Configuration manquante', message: 'La variable GROQ_API_KEY n\'est pas configurée dans le Worker.' }, 500);
    }

    try {
      const body = await request.json();
      const base64Audio = body.audio;
      if (!base64Audio) return json({ error: 'Audio manquant' }, 400);

      // Décoder le base64 (WAV) en octets
      const binary = atob(base64Audio);
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);

      // ── 1. Transcription arabe (Groq Whisper) ────────────────────
      const form = new FormData();
      form.append('file', new Blob([bytes], { type: 'audio/wav' }), 'audio.wav');
      form.append('model', WHISPER_MODEL);
      form.append('language', 'ar');
      form.append('response_format', 'json');

      const trRes = await fetch(`${GROQ_BASE}/audio/transcriptions`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${env.GROQ_API_KEY}` },
        body: form,
      });

      if (!trRes.ok) {
        const errText = await trRes.text();
        return json({ error: 'Transcription échouée', message: errText.slice(0, 300) }, 502);
      }

      const trData = await trRes.json();
      const arabicText = (trData.text || '').trim();
      if (!arabicText) {
        return json({ error: 'Transcription vide', message: 'Parle plus près du micro et réessaie.' }, 422);
      }

      // ── 2. Analyse du Tajweed (Groq Llama 70B) ───────────────────
      const anRes = await fetch(`${GROQ_BASE}/chat/completions`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${env.GROQ_API_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: LLM_MODEL,
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            { role: 'user', content: buildUserPrompt(arabicText) },
          ],
          temperature: 0.2,
          max_tokens: 1500,
          response_format: { type: 'json_object' },
        }),
      });

      let analysis = null;
      if (anRes.ok) {
        const anData = await anRes.json();
        analysis = extractJson(anData.choices && anData.choices[0] && anData.choices[0].message.content);
      }

      if (!analysis || typeof analysis !== 'object') {
        analysis = {
          overall_quality: 'good',
          correct_rules: [],
          errors: [],
          advice: ["L'analyse détaillée n'a pas pu être structurée cette fois.", 'Voici la transcription pour vérification.', 'Réessaie avec un enregistrement un peu plus long.'],
          sources: ['Al-Muqaddima al-Jazariyya'],
        };
      }

      return json({
        transcription: { text: arabicText, language: 'ar', duration: 0 },
        analysis: {
          overall_quality: analysis.overall_quality || 'good',
          correct_rules: Array.isArray(analysis.correct_rules) ? analysis.correct_rules : [],
          errors: Array.isArray(analysis.errors) ? analysis.errors : [],
          advice: Array.isArray(analysis.advice) ? analysis.advice : [],
          sources: Array.isArray(analysis.sources) ? analysis.sources : ['Al-Muqaddima al-Jazariyya'],
        },
      });
    } catch (err) {
      return json({ error: "Erreur lors de l'analyse", message: (err && err.message) || 'Erreur inconnue' }, 500);
    }
  },
};
