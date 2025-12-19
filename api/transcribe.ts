import type { VercelRequest, VercelResponse } from '@vercel/node';
import FormData from 'form-data';
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

    const { audio } = req.body;

    if (!audio) {
      return res.status(400).json({ error: 'No audio provided' });
    }

    // Convertir base64 en Buffer
    const audioBuffer = Buffer.from(audio, 'base64');

    // Créer le FormData pour OpenAI
    const formData = new FormData();
    formData.append('file', audioBuffer, {
      filename: 'recording.webm',
      contentType: 'audio/webm'
    });
    formData.append('model', 'whisper-1');
    formData.append('language', 'ar');
    formData.append('response_format', 'verbose_json');

    // Appeler Whisper
    const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        ...formData.getHeaders()
      },
      body: formData
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Erreur Whisper:', error);
      return res.status(response.status).json({ error: 'Transcription failed' });
    }

    const result = await response.json();

    return res.status(200).json({
      text: result.text,
      language: result.language || 'ar',
      duration: result.duration || 0
    });

  } catch (error: any) {
    console.error('Erreur:', error);
    return res.status(500).json({ error: error.message });
  }
}
