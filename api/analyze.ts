import type { VercelRequest, VercelResponse } from '@vercel/node';
import fetch from 'node-fetch';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

    if (!OPENAI_API_KEY) {
      return res.status(500).json({ error: 'API key not configured' });
    }

    const { arabicText } = req.body;

    if (!arabicText) {
      return res.status(400).json({ error: 'Arabic text required' });
    }

    const systemPrompt = `Tu es un professeur de tajwīd du Coran.

Analyse la récitation selon les règles reconnues du tajwīd :
- Makharij al-hurūf
- Madd (ṭabī'ī, wājib, jā'iz)
- Ikhfā, Idghām, Qalqalah, Ghunnah

RÈGLES STRICTES :
- N'invente AUCUNE règle
- Ne donne AUCUNE fatwa
- Donne uniquement des remarques techniques
- Cite toujours la règle concernée`;

    const userPrompt = `Analyse cette récitation :
${arabicText}

Réponds en JSON :
{
  "overall_quality": "excellent|good|needs_improvement",
  "correct_rules": [{"rule": "...", "description": "...", "location": "..."}],
  "errors": [{"type": "...", "location": "...", "correction": "...", "rule": "...", "severity": "critical|important|minor"}],
  "advice": ["...", "...", "..."]
}`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
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
      console.error('Erreur GPT-4:', error);
      return res.status(response.status).json({ error: 'Analysis failed' });
    }

    const result: any = await response.json();
    const analysis = JSON.parse(result.choices[0].message.content);

    return res.status(200).json(analysis);

  } catch (error: any) {
    console.error('Erreur:', error);
    return res.status(500).json({ error: error.message });
  }
}
