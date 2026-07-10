# Muslim Pro - Worker IA Tajweed (Cloudflare)

Ce dossier contient le **backend IA** de l'app, hébergé sur Cloudflare Workers.
Il est **100% gratuit** et l'IA est **intégrée** : l'utilisateur de l'app n'a aucune clé à configurer.

- **Whisper** (Cloudflare AI) → transcrit l'audio arabe
- **Llama** (Cloudflare AI) → analyse le Tajweed et donne des conseils

---

## Déploiement (une seule fois) — sans GitHub

Tu fais tout depuis ton ordinateur, exactement comme ton app sportive.

### 1. Se placer dans le dossier
```bash
cd cloudflare-worker
```

### 2. Installer Wrangler (l'outil Cloudflare)
```bash
npm install
```

### 3. Se connecter à Cloudflare
```bash
npx wrangler login
```
(Une page web s'ouvre → tu autorises → c'est fait.)

### 4. Déployer 🚀
```bash
npx wrangler deploy
```

À la fin, Wrangler affiche l'URL de ton Worker, par exemple :
```
https://muslim-pro-tajweed-ai.TON-COMPTE.workers.dev
```
**Copie cette URL.**

---

## Connecter l'app au Worker

Dans l'app (fichier `src/services/cloudflare-ai.ts`), remplace la valeur de
`WORKER_URL` par l'URL que Wrangler t'a donnée.

Ou, mieux, sur Cloudflare Pages / Vercel, ajoute la variable d'environnement :
```
VITE_TAJWEED_API_URL = https://muslim-pro-tajweed-ai.TON-COMPTE.workers.dev
```

---

## Tester le Worker

Ouvre l'URL du Worker dans ton navigateur : tu dois voir
```json
{ "status": "ok", "service": "Muslim Pro Tajweed AI" }
```
Si tu vois ça → le backend IA est en ligne. ✅

---

## Coût

- Cloudflare Workers AI : **gratuit** jusqu'à ~10 000 « neurons »/jour
  (≈ 15-25 analyses/jour). Largement suffisant pour commencer.
- Aucune clé OpenAI, aucun paiement requis.
