const express = require('express');
const cors = require('cors');
const multer = require('multer');
const FormData = require('form-data');
const fetch = require('node-fetch');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

// Charger les variables d'environnement depuis le fichier .env.local du projet parent
const envPath = path.join(__dirname, '..', '.env.local');
if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath });
  console.log('✅ Fichier .env.local chargé depuis:', envPath);
} else {
  console.error('❌ Fichier .env.local introuvable!');
  process.exit(1);
}

const app = express();
const PORT = 3001;

// Configuration
const OPENAI_API_KEY = process.env.VITE_OPENAI_API_KEY || process.env.OPENAI_API_KEY;
const OPENAI_API_URL = 'https://api.openai.com/v1';

if (!OPENAI_API_KEY) {
  console.error('❌ ERREUR: Clé API OpenAI non trouvée dans .env.local');
  process.exit(1);
}

console.log('🔑 Clé API OpenAI chargée:', OPENAI_API_KEY.substring(0, 20) + '...');
console.log('📝 Longueur de la clé:', OPENAI_API_KEY.length);

// Middleware
app.use(cors());
app.use(express.json());

// Configuration Multer pour les uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 25 * 1024 * 1024 } // 25MB max
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
      contentType: req.file.mimetype
    });
    formData.append('model', 'whisper-1');
    formData.append('language', 'ar');

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
      return res.status(response.status).json({ error: 'Erreur lors de la transcription' });
    }

    const result = await response.json();
    console.log('✅ Transcription réussie:', result.text.substring(0, 50) + '...');

    res.json({
      text: result.text,
      language: 'ar',
      duration: result.duration || 0
    });

  } catch (error) {
    console.error('❌ Erreur serveur:', error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
});

// Endpoint: Analyse Tajweed avec GPT-4
app.post('/api/analyze-tajweed', async (req, res) => {
  try {
    console.log('🎯 Requête d\'analyse Tajweed reçue');

    const { arabicText, verseInfo } = req.body;

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

${verseInfo ? `Verset : ${verseInfo.surahName} (${verseInfo.surahNumber}:${verseInfo.verseNumber})` : ''}

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
      return res.status(response.status).json({ error: 'Erreur lors de l\'analyse' });
    }

    const result = await response.json();
    const analysis = JSON.parse(result.choices[0].message.content);

    console.log('✅ Analyse Tajweed réussie');
    res.json(analysis);

  } catch (error) {
    console.error('❌ Erreur serveur:', error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    apiKeyConfigured: !!OPENAI_API_KEY,
    apiKeyLength: OPENAI_API_KEY?.length || 0
  });
});

// Démarrer le serveur
app.listen(PORT, () => {
  console.log('');
  console.log('═══════════════════════════════════════════════');
  console.log('🚀 Serveur Muslim Pro Backend démarré!');
  console.log('═══════════════════════════════════════════════');
  console.log(`📡 URL: http://localhost:${PORT}`);
  console.log(`🔑 Clé API: ${OPENAI_API_KEY ? '✅ Configurée' : '❌ Manquante'}`);
  console.log('');
  console.log('Endpoints disponibles:');
  console.log(`  POST http://localhost:${PORT}/api/transcribe`);
  console.log(`  POST http://localhost:${PORT}/api/analyze-tajweed`);
  console.log(`  GET  http://localhost:${PORT}/health`);
  console.log('═══════════════════════════════════════════════');
  console.log('');
});
