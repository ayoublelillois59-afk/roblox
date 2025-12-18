# 🕌 Muslim Pro App - Application Islamique avec IA

Application complète avec analyse de Tajweed par Intelligence Artificielle (OpenAI GPT-4 + Whisper).

## ✅ SOLUTION COMPLÈTE - FONCTIONNE APRÈS EXPORT GITHUB

### Installation (après clone):
```bash
git clone <votre-repo>
cd roblox
npm install
npm run dev
```

### Configuration (première utilisation):
1. Allez sur: http://localhost:5173/api-config
2. Entrez votre clé API OpenAI
3. Cliquez sur "Sauvegarder"
4. C'est prêt! 🎉

### Obtenir une clé API OpenAI:
1. https://platform.openai.com/api-keys
2. Créez un compte (gratuit)
3. "Create new secret key"
4. Copiez la clé

## 🎯 Fonctionnalités

### Analyse Tajweed avec IA
- **Transcription automatique** (OpenAI Whisper)
- **Identification du verset** dans la base de données
- **Traduction authentique** (Muhammad Hamidullah - 28 versets)
- **Analyse Tajweed professionnelle** (GPT-4)
- **Conseils authentiques** basés sur les règles classiques

### Versets disponibles:
- Al-Fatiha (7 versets)
- Al-Ikhlas (4 versets)
- Al-Falaq (5 versets)
- An-Nas (6 versets)
- An-Nasr (3 versets)

### Règles de Tajweed analysées:
- Makharij al-hurūf (points d'articulation)
- Madd (prolongations: ṭabī'ī, wājib, jā'iz)
- Ikhfā (dissimulation)
- Idghām (fusion)
- Qalqalah (rebondissement)
- Ghunnah (nasalisation)

## 💰 Coûts OpenAI (très faibles)
- Whisper (transcription): ~0.006$ par minute
- GPT-4 (analyse): ~0.03-0.05$ par test
- **Total: ~0.05$ par récitation complète**

## 🔒 Sécurité
- Clé API stockée dans **localStorage** (navigateur local)
- Jamais envoyée à nos serveurs
- Jamais committée sur GitHub
- Complètement privée et sécurisée

## 📱 Architecture

```
Navigateur
    ↓
[Page /api-config] → localStorage (clé API)
    ↓
[Page /tajweed] → Enregistrement audio
    ↓
[OpenAI Whisper] → Transcription arabe
    ↓
[Base de données] → Identification verset + Traduction
    ↓
[OpenAI GPT-4] → Analyse Tajweed
    ↓
[Résultats] → Affichage avec conseils
```

## 🚀 Déploiement Vercel

Si vous déployez sur Vercel:
1. Allez dans Settings → Environment Variables
2. Ajoutez: `VITE_OPENAI_API_KEY` = votre clé
3. Cochez: Production, Preview, Development
4. Redéployez

## 📁 Structure du projet

```
src/
├── pages/
│   ├── ApiConfig.tsx       # Configuration de la clé API
│   ├── Tajweed.tsx         # Page d'analyse Tajweed
│   └── ...
├── services/
│   └── openai.ts           # Service OpenAI (Whisper + GPT-4)
├── data/
│   └── quran-translations.ts  # Base de données 28 versets
└── components/
    └── ...
```

## 🔧 Configuration technique

### Service OpenAI (`src/services/openai.ts`)
- Charge depuis localStorage (priorité)
- Fallback vers variables d'environnement
- Logs de vérification dans la console

### Page Configuration (`src/pages/ApiConfig.tsx`)
- Interface utilisateur simple
- Validation de la clé
- Sauvegarde dans localStorage
- Redirection automatique

## ✨ Utilisation

1. **Lancez l'app**: `npm run dev`
2. **Configurez la clé**: http://localhost:5173/api-config
3. **Allez sur Réciter**: http://localhost:5173/tajweed
4. **Enregistrez un verset** (ex: Al-Fatiha)
5. **Regardez la magie opérer**:
   - ✅ Transcription en arabe
   - ✅ Traduction française authentique
   - ✅ Analyse Tajweed complète
   - ✅ Conseils pratiques

## 📝 Notes importantes

- **Authentique**: Analyse basée UNIQUEMENT sur les règles classiques reconnues
- **Pas de fatwas**: Analyse purement technique
- **Pas d'inventions**: GPT-4 configuré pour ne donner que des règles reconnues
- **Traductions officielles**: Muhammad Hamidullah (référence)

## 🎓 Pour les développeurs

### Ajouter des versets:
Modifiez `src/data/quran-translations.ts` et ajoutez:
```typescript
{
  surahNumber: X,
  verseNumber: Y,
  surahName: "...",
  arabic: "...",
  translationFr: "..."
}
```

### Modifier le prompt Tajweed:
Voir `src/services/openai.ts` ligne ~133

## 🌟 Contribuer

Ce projet est une application islamique éducative. Contributions bienvenues pour:
- Ajouter plus de versets (avec traductions authentiques)
- Améliorer l'interface
- Optimiser les prompts GPT-4
- Ajouter d'autres fonctionnalités islamiques

## 📄 Licence

À définir

---

**Fait avec ❤️ pour la communauté musulmane**

**Qu'Allah accepte nos efforts** 🤲
