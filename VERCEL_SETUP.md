# 🚀 Configuration Vercel - Muslim Pro App

## Votre clé API OpenAI:
Utilisez la clé API que vous avez générée sur OpenAI.

## ÉTAPES POUR CONFIGURER SUR VERCEL:

### 1. Allez sur votre projet Vercel
   - https://vercel.com/dashboard
   - Sélectionnez votre projet "roblox" ou "muslim-pro-app"

### 2. Allez dans Settings (⚙️)
   - Cliquez sur "Settings" dans le menu du projet

### 3. Allez dans "Environment Variables"
   - Dans le menu gauche, cliquez sur "Environment Variables"

### 4. Ajoutez la variable:
   - **Name**: `VITE_OPENAI_API_KEY`
   - **Value**: Collez votre clé API OpenAI (commence par sk-proj-...)
   - **Environments**: Cochez **Production**, **Preview**, et **Development**
   - Cliquez sur "Save"

### 5. Redéployez votre application
   - Allez dans l'onglet "Deployments"
   - Sur le dernier déploiement, cliquez sur les 3 points (•••)
   - Sélectionnez "Redeploy"
   - Attendez que le build se termine (~1-2 minutes)

### 6. Testez votre Preview Vercel
   - Allez sur votre URL Vercel Preview
   - Ouvrez la console (F12)
   - Vous devriez voir:
   ```
   ═══════════════════════════════════════════════════
   🚀 Muslim Pro App - OpenAI Service
   📅 Build: 2025-12-18T14:00
   🔑 API Key: ✅ Configurée (164 chars)
      Début: sk-proj-0T-IxTmnnh...
   ═══════════════════════════════════════════════════
   ```

## C'EST PRÊT!

Une fois la variable configurée et redéployée, l'application fonctionnera sur Vercel avec:
- ✅ Transcription Whisper
- ✅ Traduction authentique Hamidullah
- ✅ Analyse Tajweed GPT-4
- ✅ Conseils authentiques

---

**Important**: Ne partagez JAMAIS votre clé API publiquement. Celle-ci est configurée de manière sécurisée via les variables d'environnement Vercel.
