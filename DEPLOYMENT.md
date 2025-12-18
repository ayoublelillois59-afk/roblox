# 🚀 Déploiement Muslim Pro App

## Architecture

```
Frontend (React/Vite)    ←→    Backend API (Node.js/Express)    ←→    OpenAI API
   Vercel/Mobile                   Railway/Heroku                    (clé sécurisée)
```

## 1. Déploiement du Backend (Railway - Gratuit)

### Étapes:

1. **Créez un compte Railway**: https://railway.app/

2. **Nouveau projet**:
   - Cliquez sur "New Project"
   - "Deploy from GitHub repo"
   - Sélectionnez votre repo `roblox`

3. **Configuration**:
   - Root Directory: `/api`
   - Start Command: `npm start`

4. **Variables d'environnement**:
   ```
   OPENAI_API_KEY=votre_clé_api_openai_ici
   PORT=3001
   ```

5. **Deploy**: Railway va automatiquement builder et déployer

6. **Récupérez l'URL**: Exemple: `https://votre-app.railway.app`

## 2. Déploiement du Frontend (Vercel)

### Étapes:

1. **Variables d'environnement Vercel**:
   - Settings → Environment Variables
   - Ajoutez: `VITE_API_URL=https://votre-app.railway.app`

2. **Redéployez**: Vercel va automatiquement redéployer

## 3. Pour Play Store (React Native/Capacitor)

### Configuration:

Dans `src/services/backend-api.ts`, l'URL du backend sera:
```typescript
const API_URL = import.meta.env.VITE_API_URL || 'https://votre-app.railway.app';
```

### Build mobile:

1. **Capacitor** (recommandé):
   ```bash
   npm install @capacitor/core @capacitor/cli
   npx cap init
   npx cap add android
   npx cap add ios
   ```

2. **Configuration**: Mettre l'URL du backend dans `.env`:
   ```
   VITE_API_URL=https://votre-app.railway.app
   ```

3. **Build**:
   ```bash
   npm run build
   npx cap copy
   npx cap open android
   ```

## Alternatives de déploiement backend

### Heroku (Gratuit limité)
```bash
heroku create muslim-pro-api
heroku config:set OPENAI_API_KEY=votre_clé
git subtree push --prefix api heroku main
```

### Render (Gratuit)
1. Connectez votre repo GitHub
2. Root Directory: `/api`
3. Build Command: `npm install`
4. Start Command: `npm start`
5. Ajoutez la variable d'environnement

### Vercel (Serverless Functions)
Créez `/api/vercel.json`:
```json
{
  "version": 2,
  "builds": [{ "src": "index.js", "use": "@vercel/node" }]
}
```

## 💰 Coûts

### Développement/MVP:
- Railway Free Tier: ✅ Gratuit (500h/mois)
- Vercel Free Tier: ✅ Gratuit
- OpenAI: ~0.05$ par analyse

### Production (milliers d'utilisateurs):
- Railway Pro: $5-20/mois
- Ou VPS (DigitalOcean): $6/mois
- OpenAI: Selon usage

## 🔐 Sécurité

✅ Clé API jamais exposée au frontend
✅ Backend gère toutes les requêtes OpenAI
✅ CORS configuré
✅ Validation des données

## ✅ Checklist avant publication

- [ ] Backend déployé et accessible
- [ ] Variable OPENAI_API_KEY configurée
- [ ] Frontend pointe vers le bon backend
- [ ] Test complet sur Vercel Preview
- [ ] Test sur appareil mobile
- [ ] Vérifier les coûts OpenAI
- [ ] Configurer rate limiting (optionnel)
- [ ] Monitoring (Sentry, LogRocket)

---

**L'app est prête pour la publication! 🎉**
