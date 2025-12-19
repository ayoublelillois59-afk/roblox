import type { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  return res.status(200).json({
    status: 'OK',
    service: 'Muslim Pro API (Vercel Functions)',
    timestamp: new Date().toISOString(),
    apiConfigured: !!process.env.OPENAI_API_KEY
  });
}
