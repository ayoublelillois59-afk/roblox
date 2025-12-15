# 🎮 MINE SIMULATOR - GUIDE D'INSTALLATION COMPLET

## 📋 CE QUE VOUS ALLEZ INSTALLER

Un jeu de minage complet avec :
- ✅ **13 minerais** de différentes raretés (Herbe → Mithril)
- ✅ **8 pioches** à acheter (Bois → Légendaire)
- ✅ **5 quêtes quotidiennes** avec récompenses
- ✅ **Interface complète** (HUD, Shop, Inventaire, Quêtes)
- ✅ **150 niveaux de profondeur** à explorer
- ✅ **Système de progression** complet

---

## 🗑️ ÉTAPE 0 : NETTOYER (TRÈS IMPORTANT!)

Avant TOUT, vous devez **SUPPRIMER** les anciens scripts qui ne fonctionnent pas.

### Dans Roblox Studio :

1. Ouvrez votre jeu dans **Roblox Studio**

2. Dans **ServerScriptService**, SUPPRIMEZ :
   - ❌ Tous les scripts qui s'appellent "MiningSimulator..."
   - ❌ Tous les scripts qui s'appellent "MainServer..."
   - ❌ Tous les scripts de quêtes
   - ❌ **TOUT** sauf les scripts système de Roblox

3. Dans **StarterPlayer** → **StarterPlayerScripts**, SUPPRIMEZ :
   - ❌ Tous les LocalScripts liés au mining
   - ❌ Tous les scripts "Client..." ou "MineClient..."

4. Dans **Workspace**, SUPPRIMEZ :
   - ❌ Le dossier "Mine" ou "MiningArea" s'il existe
   - ❌ Tous les blocs de la mine précédente

5. Dans **ReplicatedStorage**, SUPPRIMEZ :
   - ❌ Le dossier "RemoteEvents" ou "MineSimulator" s'il existe

**⚠️ VOTRE PROJET DOIT ÊTRE PROPRE AVANT DE CONTINUER!**

---

## 📥 ÉTAPE 1 : RÉCUPÉRER LES SCRIPTS SUR GITHUB

### A) Aller sur votre repository

1. Ouvrez votre navigateur
2. Allez sur : `https://github.com/ayoublelillois59-afk/roblox`
3. **IMPORTANT** : Changez de branche !
   - Cliquez sur le bouton **"main"** en haut à gauche
   - Dans le menu déroulant, cherchez et cliquez sur :
     `claude/roblox-mine-simulator-01RXL5ePGUowCPDNkMY7q38n`

### B) Vous devez récupérer 3 scripts

Les scripts sont dans :
- **src/server/MainServer.lua** (Script Serveur Principal)
- **src/server/QuestSystem.lua** (Système de Quêtes)
- **src/client/ClientMain.lua** (Interface Client)

---

## 🔧 ÉTAPE 2 : INSTALLER LE SCRIPT SERVEUR PRINCIPAL

### Installation :

1. Sur GitHub, naviguez vers : **src** → **server** → **MainServer.lua**

2. Cliquez sur le fichier **MainServer.lua**

3. Cliquez sur le bouton **"Raw"** (en haut à droite du code)

4. Sélectionnez TOUT le code (`Ctrl+A` ou `Cmd+A`)

5. Copiez (`Ctrl+C` ou `Cmd+C`)

6. Dans **Roblox Studio** :
   - Allez dans **ServerScriptService**
   - Clic droit → **Insert Object** → **Script**
   - ⚠️ **IMPORTANT** : Renommez-le **EXACTEMENT** en `MainServer`
   - Double-cliquez pour l'ouvrir
   - Supprimez le code par défaut (`print("Hello world!")`)
   - Collez votre code (`Ctrl+V` ou `Cmd+V`)
   - **Sauvegardez** (`Ctrl+S` ou `Cmd+S`)

### Vérification :

Le script doit commencer par :
```lua
--[[
	MINE SIMULATOR - SERVEUR PRINCIPAL
	Script à placer dans ServerScriptService
```

✅ Si oui, c'est bon !
❌ Si non, vous avez copié le mauvais script !

---

## 📋 ÉTAPE 3 : INSTALLER LE SYSTÈME DE QUÊTES

### Installation :

1. Sur GitHub, naviguez vers : **src** → **server** → **QuestSystem.lua**

2. Cliquez sur le fichier **QuestSystem.lua**

3. Cliquez sur **"Raw"**

4. Sélectionnez TOUT (`Ctrl+A`)

5. Copiez (`Ctrl+C`)

6. Dans **Roblox Studio** :
   - Allez dans **ServerScriptService** (le même dossier)
   - Clic droit → **Insert Object** → **Script**
   - ⚠️ Renommez-le **EXACTEMENT** en `QuestSystem`
   - Collez le code
   - Sauvegardez

### Vérification :

Le script doit commencer par :
```lua
--[[
	MINE SIMULATOR - SYSTÈME DE QUÊTES
```

✅ C'est bon !

---

## 🎨 ÉTAPE 4 : INSTALLER LE CLIENT (INTERFACE)

### Installation :

1. Sur GitHub, naviguez vers : **src** → **client** → **ClientMain.lua**

2. Cliquez sur le fichier **ClientMain.lua**

3. Cliquez sur **"Raw"**

4. Sélectionnez TOUT (`Ctrl+A`)

5. Copiez (`Ctrl+C`)

6. Dans **Roblox Studio** :
   - Allez dans **StarterPlayer** → **StarterPlayerScripts**
   - Clic droit → **Insert Object** → **LocalScript** ⚠️ **PAS "Script" mais "LocalScript"!**
   - ⚠️ Renommez-le **EXACTEMENT** en `ClientMain`
   - Collez le code
   - Sauvegardez

### Vérification :

- Le script doit commencer par :
```lua
--[[
	MINE SIMULATOR - CLIENT PRINCIPAL
```

- **IMPORTANT** : L'icône du script doit être **BLEUE** (LocalScript), PAS verte (Script) !

✅ Si l'icône est bleue, c'est bon !

---

## ✅ ÉTAPE 5 : VÉRIFICATION FINALE

Avant de lancer, vérifiez que vous avez :

### Dans ServerScriptService :
```
ServerScriptService/
├── 📜 MainServer (Script - icône verte)
└── 📜 QuestSystem (Script - icône verte)
```

### Dans StarterPlayerScripts :
```
StarterPlayer/
└── StarterPlayerScripts/
    └── 📜 ClientMain (LocalScript - icône BLEUE)
```

**Total : 3 scripts**

---

## 🚀 ÉTAPE 6 : LANCER LE JEU !

1. Cliquez sur le bouton **Play** (▶️) en haut

2. Attendez 5-10 secondes (la mine se génère)

3. Ouvrez la **Console** (appuyez sur `F9`)

4. Vous devriez voir :
```
⛏️  MINE SIMULATOR - DÉMARRAGE SERVEUR
🌍 Génération de la mine...
  Couche 1/151 générée
  Couche 2/151 générée
  ...
✅ Mine générée: XXXXX blocs en X.XXs
📋 SYSTÈME DE QUÊTES - DÉMARRAGE
✅ SYSTÈME DE QUÊTES PRÊT
🎮 CLIENT - DÉMARRAGE
✅ CLIENT PRÊT - Toutes les interfaces chargées!
```

✅ Si vous voyez ça, **TOUT FONCTIONNE** !

---

## 🎮 CE QUE VOUS DEVEZ VOIR À L'ÉCRAN

### Interface visible :

1. **En haut à gauche** : 💰 Votre argent (commence à 0$)

2. **En haut à droite** : 📋 Bouton QUÊTES (orange)

3. **En bas au centre** : ⛏️ Inventaire avec 5 slots (votre pioche en bois est visible)

4. **En bas à droite** :
   - 🛒 Bouton SHOP (bleu)
   - 💰 Bouton VENDRE (vert)

5. **Dans le monde** : Une grande mine circulaire avec des blocs verts (herbe) en surface

---

## 🧪 ÉTAPE 7 : TESTER

### Test 1 : Minage

1. **Cliquez et maintenez** sur un bloc vert (herbe)
2. Une **barre verte** apparaît au-dessus du bloc
3. La barre se remplit
4. Le bloc **disparaît** avec un effet lumineux

✅ **SI ÇA MARCHE** : Le minage fonctionne !
❌ **SI ÇA NE MARCHE PAS** : Voir section "Dépannage" plus bas

### Test 2 : Vendre

1. Minez quelques blocs (5-10 blocs)
2. Cliquez sur le bouton **💰 VENDRE**
3. Une notification verte apparaît : "💰 +XX $"
4. Votre argent en haut à gauche augmente

✅ **SI ÇA MARCHE** : Le système de vente fonctionne !

### Test 3 : Shop

1. Cliquez sur **🛒 SHOP**
2. Une fenêtre s'ouvre avec la liste des pioches
3. Vous voyez :
   - 🪵 Pioche en Bois - ✅ POSSÉDÉE
   - 🪨 Pioche en Pierre - 💰 150 $
   - ⚪ Pioche en Fer - 💰 800 $
   - etc.

✅ **SI ÇA MARCHE** : Le shop fonctionne !

### Test 4 : Quêtes

1. Cliquez sur **📋 QUÊTES**
2. Une fenêtre s'ouvre avec 5 quêtes
3. Vous voyez :
   - ⚪ Mineur Débutant (Mine 100 Pierre)
   - ⚫ Charbonnier (Mine 50 Charbon)
   - 💰 Homme d'Affaires (Gagne 5000$)
   - 🟡 Chercheur d'Or (Mine 25 Or)
   - 💎 ⭐ MAÎTRE MINEUR ⭐ (Mine 10 Diamants + 5 Obsidiennes)

✅ **SI ÇA MARCHE** : Les quêtes fonctionnent !

### Test 5 : Profondeur

1. Minez les blocs verts de la surface
2. Descendez en minant
3. Vous voyez des blocs marrons (terre), puis gris (pierre), puis noirs (charbon)
4. Vous pouvez continuer à descendre

✅ **SI ÇA MARCHE** : La mine infinie fonctionne !

---

## 🐛 DÉPANNAGE

### Problème : Je ne vois RIEN à l'écran (pas d'interface)

**Solution :**
1. Appuyez sur `F9` pour ouvrir la Console
2. Regardez les messages d'erreur (en rouge)
3. Si vous voyez "❌ ERREUR: Dossier RemoteEvents introuvable!" :
   - Le script **MainServer** n'est pas lancé
   - Vérifiez qu'il est bien dans **ServerScriptService**
   - Vérifiez qu'il s'appelle EXACTEMENT `MainServer`
   - Vérifiez que c'est un **Script** (icône verte), pas un LocalScript

4. Si vous voyez "❌ Certains Remote Events sont manquants!" :
   - Attendez 5 secondes de plus
   - Le serveur met du temps à créer les Remote Events

### Problème : Je ne peux PAS miner (rien ne se passe quand je clique)

**Solution :**
1. Vérifiez que **ClientMain** est un **LocalScript** (icône BLEUE)
2. Vérifiez qu'il est dans **StarterPlayerScripts**
3. Appuyez sur `F9` et cherchez des erreurs
4. Essayez de **redémarrer** le jeu (Stop puis Play)

### Problème : La mine ne se génère pas

**Solution :**
1. Attendez 10-15 secondes (la génération prend du temps)
2. Regardez la Console (`F9`)
3. Vous devez voir "🌍 Génération de la mine..." suivi de "✅ Mine générée"
4. Si rien ne se passe :
   - Vérifiez que **MainServer** est bien dans ServerScriptService
   - Redémarrez Roblox Studio

### Problème : Les quêtes ne marchent pas

**Solution :**
1. Vérifiez que **QuestSystem** est dans ServerScriptService
2. Attendez que la mine soit complètement générée
3. Vérifiez dans la Console qu'il y a "✅ SYSTÈME DE QUÊTES PRÊT"
4. Redémarrez le jeu

### Problème : Messages d'erreur dans la Console

**Solution :**
1. Faites une capture d'écran de la Console (F9)
2. Vérifiez que vous avez copié les scripts COMPLETS (pas coupés)
3. Vérifiez les noms des scripts :
   - **MainServer** (exactement)
   - **QuestSystem** (exactement)
   - **ClientMain** (exactement)

---

## 📊 CARACTÉRISTIQUES DU JEU

### 13 Minerais :
| Minerai | Profondeur | Valeur | Temps | Rareté |
|---------|------------|--------|-------|--------|
| 🌿 Herbe | Surface | 0$ | 0.1s | Commun |
| 🟤 Terre | 0-5 | 1$ | 0.2s | Commun |
| ⚪ Pierre | 5+ | 3$ | 0.5s | Commun |
| ⚫ Charbon | 8+ | 8$ | 1s | Commun |
| 🟠 Cuivre | 12+ | 15$ | 1.5s | Peu commun |
| ⚪ Fer | 18+ | 25$ | 2s | Peu commun |
| 💿 Argent | 25+ | 50$ | 3s | Peu commun |
| 🟡 Or | 35+ | 100$ | 4s | Rare |
| 💚 Émeraude | 45+ | 200$ | 5s | Rare |
| ❤️ Rubis | 55+ | 350$ | 6s | Rare |
| 💎 Diamant | 70+ | 500$ | 8s | Épique |
| 🖤 Obsidienne | 90+ | 1000$ | 10s | Légendaire |
| 🌟 Mithril | 120+ | 2500$ | 15s | Légendaire |

### 8 Pioches :
| Pioche | Prix | Vitesse | Puissance |
|--------|------|---------|-----------|
| 🪵 Bois | Gratuit | x1 | x1 |
| 🪨 Pierre | 150$ | x2 | x2 |
| ⚪ Fer | 800$ | x5 | x5 |
| 🟡 Or | 3 500$ | x10 | x10 |
| 💎 Diamant | 15 000$ | x20 | x20 |
| 🖤 Obsidienne | 75 000$ | x50 | x50 |
| 🌟 Mithril | 300 000$ | x100 | x100 |
| 👑 Légendaire | 1 000 000$ | INSTANTANÉ | x500 |

### 5 Quêtes :
1. **Mineur Débutant** - Mine 100 Pierre → 500$
2. **Charbonnier** - Mine 50 Charbon → 800$
3. **Homme d'Affaires** - Gagne 5000$ → 1500$
4. **Chercheur d'Or** - Mine 25 Or → 2000$
5. **⭐ MAÎTRE MINEUR ⭐** - Mine 10 Diamants + 5 Obsidiennes → 25 000$

---

## 🎉 FÉLICITATIONS !

Si tout fonctionne, vous avez maintenant un jeu de minage complet et professionnel !

### Prochaines étapes possibles :
- Ajouter des sons
- Ajouter des pets/compagnons
- Ajouter un système de rebirth
- Ajouter plus de minerais
- Ajouter des zones spéciales

**AMUSEZ-VOUS BIEN ! ⛏️💎**

---

## 📞 BESOIN D'AIDE ?

Si rien ne fonctionne :
1. Appuyez sur `F9` dans Roblox Studio
2. Faites une capture d'écran de la Console
3. Envoyez-la moi avec une description du problème

**JE SUIS LÀ POUR VOUS AIDER ! 🚀**
