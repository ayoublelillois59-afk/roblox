import express from 'express';
import cors from 'cors';
import multer from 'multer';
import FormData from 'form-data';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Charger les variables d'environnement
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Configuration OpenAI
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_API_URL = 'https://api.openai.com/v1';

if (!OPENAI_API_KEY) {
  console.error('❌ ERREUR: OPENAI_API_KEY non configurée dans .env');
  process.exit(1);
}

console.log('✅ Clé API OpenAI chargée:', OPENAI_API_KEY.substring(0, 20) + '...');

// Middleware
app.use(cors());
app.use(express.json());

// Configuration Multer pour les uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 25 * 1024 * 1024 } // 25MB max
});

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    service: 'Muslim Pro API',
    timestamp: new Date().toISOString(),
    apiConfigured: !!OPENAI_API_KEY
  });
});

// Endpoint: Transcription audio avec Whisper
app.post('/api/transcribe', upload.single('audio'), async (req, res) => {
  try {
    console.log('📝 Requête de transcription reçue');

    if (!req.file) {
      return res.status(400).json({ error: 'Aucun fichier audio fourni' });
    }

    // Créer le FormData pour OpenAI
    const formData = new FormData();
    formData.append('file', req.file.buffer, {
      filename: 'recording.webm',
      contentType: req.file.mimetype || 'audio/webm',
      knownLength: req.file.size
    });
    formData.append('model', 'whisper-1');
    formData.append('language', 'ar');
    formData.append('response_format', 'verbose_json');

    // Appeler l'API Whisper
    const response = await fetch(`${OPENAI_API_URL}/audio/transcriptions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        ...formData.getHeaders()
      },
      body: formData
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('❌ Erreur Whisper:', error);
      return res.status(response.status).json({
        error: 'Erreur lors de la transcription',
        details: error
      });
    }

    const result = await response.json();
    console.log('✅ Transcription réussie:', result.text?.substring(0, 50) + '...');

    res.json({
      text: result.text,
      language: result.language || 'ar',
      duration: result.duration || 0
    });

  } catch (error) {
    console.error('❌ Erreur serveur:', error);
    res.status(500).json({
      error: 'Erreur interne du serveur',
      message: error.message
    });
  }
});

// Endpoint: Analyse Tajweed avec GPT-4
app.post('/api/analyze-tajweed', async (req, res) => {
  try {
    console.log('🎯 Requête d\'analyse Tajweed reçue');

    const { arabicText } = req.body;

    if (!arabicText) {
      return res.status(400).json({ error: 'Texte arabe manquant' });
    }

    // Prompt système pour l'analyse Tajweed AUTHENTIQUE
    const systemPrompt = `Tu es un professeur de tajwīd du Coran, spécialiste des règles classiques de récitation.

Analyse la récitation suivante uniquement selon les règles reconnues du tajwīd :
- Makharij al-hurūf (points d'articulation des lettres)
- Madd (ṭabī'ī, wājib, jā'iz)
- Ikhfā, Idghām, Qalqalah, Ghunnah
- Règles du nūn sākin et tanwīn
- Règles du mīm sākin
- Rā' (tafkhīm et tarqīq)

RÈGLES STRICTES :
- N'invente AUCUNE règle
- Ne donne AUCUNE fatwa religieuse
- Donne uniquement des remarques techniques de tajwīd
- Cite toujours la règle classique concernée
- Sois encourageant mais précis
- Concentre-toi sur les erreurs qui affectent le sens ou violent les règles obligatoires`;

    const userPrompt = `Voici le texte arabe récité :
${arabicText}

Analyse cette récitation et fournis :
1. Les règles correctement appliquées
2. Les erreurs de tajwīd avec leur gravité (critical/important/minor)
3. Des conseils pratiques pour améliorer

Réponds UNIQUEMENT en JSON valide selon ce format :
{
  "overall_quality": "excellent|good|needs_improvement|beginner",
  "correct_rules": [
    {
      "rule": "Nom de la règle en français",
      "description": "Description de comment elle est appliquée",
      "location": "Mot concerné en arabe"
    }
  ],
  "errors": [
    {
      "type": "Type d'erreur (ex: Ghunna, Madd, Qalqala...)",
      "location": "Mot en arabe où l'erreur se situe",
      "correction": "Explication de la correction",
      "rule": "Nom de la règle classique",
      "severity": "critical|important|minor"
    }
  ],
  "advice": [
    "Conseil technique pratique 1",
    "Conseil technique pratique 2",
    "Encouragement positif"
  ]
}`;

    // Appeler GPT-4
    const response = await fetch(`${OPENAI_API_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.2,
        max_tokens: 2000,
        response_format: { type: 'json_object' }
      })
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('❌ Erreur GPT-4:', error);
      return res.status(response.status).json({
        error: 'Erreur lors de l\'analyse',
        details: error
      });
    }

    const result = await response.json();
    const analysis = JSON.parse(result.choices[0].message.content);

    console.log('✅ Analyse Tajweed réussie');
    res.json(analysis);

  } catch (error) {
    console.error('❌ Erreur serveur:', error);
    res.status(500).json({
      error: 'Erreur interne du serveur',
      message: error.message
    });
  }
});

// Démarrer le serveur
app.listen(PORT, () => {
  console.log('');
  console.log('════════════════════════════════════════════════════════');
  console.log('🚀 Muslim Pro API Backend démarré!');
  console.log('════════════════════════════════════════════════════════');
  console.log(`📡 URL: http://localhost:${PORT}`);
  console.log(`🔑 OpenAI: ${OPENAI_API_KEY ? '✅ Configurée' : '❌ Manquante'}`);
  console.log('');
  console.log('Endpoints disponibles:');
  console.log(`  POST http://localhost:${PORT}/api/transcribe`);
  console.log(`  POST http://localhost:${PORT}/api/analyze-tajweed`);
  console.log(`  GET  http://localhost:${PORT}/health`);
  console.log('════════════════════════════════════════════════════════');
  console.log('');
});
