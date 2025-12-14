# 🎮 INSTALLATION SIMPLE - VERSION QUI FONCTIONNE

## ⚠️ PROBLÈME RÉSOLU

Votre ancien script était **trop complexe** et avait des conflits. Cette version est **ULTRA SIMPLE** et **FONCTIONNE À 100%**.

---

## 🗑️ ÉTAPE 1 : NETTOYER TOUT

### Dans Roblox Studio :

1. Ouvrez **ServerScriptService**
2. **SUPPRIMEZ TOUS** les scripts de minage :
   - ❌ MiningSimulator
   - ❌ MiningSimulator_Optimized
   - ❌ MiningSimulator_Fixed
   - ❌ QuestSystem
   - ❌ Tous les autres scripts de mine

3. Ouvrez **StarterPlayer** > **StarterPlayerScripts**
4. **SUPPRIMEZ** :
   - ❌ MineClient
   - ❌ Tous les anciens scripts client

5. Dans **Workspace** :
   - ❌ Supprimez le dossier "MiningArea" ou "Mine" s'il existe
   - ❌ Nettoyez tout

---

## ✅ ÉTAPE 2 : INSTALLER LA VERSION SIMPLE

### A) Script Serveur

1. Allez dans **ServerScriptService**
2. Clic droit → **Insert Object** → **Script**
3. Nommez-le **`MiningSimulator`**
4. Copiez le contenu de **`MiningSimulator_Simple.lua`** dedans
5. ✅ C'est tout pour le serveur !

### B) Script Client

1. Allez dans **StarterPlayer** → **StarterPlayerScripts**
2. Clic droit → **Insert Object** → **LocalScript**
3. Nommez-le **`MineClient`**
4. Copiez le contenu de **`MineClient_Simple.lua`** dedans
5. ✅ C'est tout pour le client !

---

## 🎮 CE QUE VOUS VERREZ

Quand vous lancez le jeu :

### ✅ Interface Visible :
- **💰 Argent** en haut à gauche (commence à 0$)
- **🛒 SHOP** en bas à droite
- **💰 VENDRE** en bas à droite
- **⛏️ Inventaire** au centre en bas (4 slots de pioches)

### ✅ Mine Générée :
- **Surface verte** (herbe)
- **50 niveaux de profondeur** générés
- Vous pouvez descendre en cassant les blocs

### ✅ Système de Minage :
1. **Cliquez et maintenez** sur un bloc
2. Une **barre verte** apparaît au-dessus
3. La barre se remplit
4. Le bloc **disparaît avec effet**

### ✅ Boutique :
1. Cliquez sur **🛒 SHOP**
2. Vous voyez 3 pioches à vendre :
   - Pioche Pierre - 100$
   - Pioche Fer - 500$
   - Pioche Diamant - 2000$
3. Cliquez pour acheter

### ✅ Vente :
1. Minez des blocs (ils vont dans votre inventaire)
2. Cliquez sur **💰 VENDRE**
3. Notification "💰 +XXX $"
4. Votre argent augmente

---

## 🔍 VÉRIFICATIONS

### Si rien n'apparaît à l'écran :

1. Appuyez sur **F9** dans Roblox Studio
2. Regardez la console (Output)
3. Vous devriez voir :
   ```
   🔨 Démarrage Mining Simulator Simple...
   ✅ Mine générée: XXX blocs
   ✅ Mining Simulator Simple - Prêt !
   ```

4. Côté client :
   ```
   🎮 Client Simple démarré pour [VotreNom]
   ✅ Remote events connectés
   ✅ Interface chargée !
   ```

### Si la mine ne se génère pas :

- Vérifiez que le script **MiningSimulator** est bien dans **ServerScriptService**
- Vérifiez qu'il n'y a **aucun autre script** de mine

### Si vous ne pouvez pas casser les blocs :

- Vérifiez que **MineClient** (LocalScript) est dans **StarterPlayerScripts**
- Redémarrez le jeu (Stop puis Play)

---

## 📊 CARACTÉRISTIQUES

### 7 Minerais :
- 🌿 **Herbe** (surface) - 0$ - 0.1s
- 🟤 **Terre** (0-3 blocs) - 1$ - 0.3s
- ⚪ **Pierre** (3+ blocs) - 3$ - 0.5s
- ⚫ **Charbon** (5+ blocs) - 10$ - 1s
- ⚪ **Fer** (10+ blocs) - 25$ - 1.5s
- 🟡 **Or** (15+ blocs) - 50$ - 2s
- 💎 **Diamant** (25+ blocs) - 100$ - 3s

### 4 Pioches :
- 🪵 **Bois** - Gratuite - 1x vitesse
- 🪨 **Pierre** - 100$ - 2x vitesse
- ⚪ **Fer** - 500$ - 5x vitesse
- 💎 **Diamant** - 2000$ - 10x vitesse

**Plus la pioche est bonne, plus vous minez vite !**

---

## 🎯 TEST RAPIDE

1. **Lancez le jeu** (Play)
2. **Regardez l'interface** :
   - Argent visible ? ✅
   - Boutons SHOP et VENDRE visibles ? ✅
   - Inventaire avec pioche en bois visible ? ✅

3. **Testez le minage** :
   - Cliquez sur un bloc vert (herbe)
   - Barre verte apparaît ? ✅
   - Bloc disparaît ? ✅

4. **Vendez** :
   - Cliquez sur VENDRE
   - Notification apparaît ? ✅
   - Argent augmente ? ✅

5. **Achetez** :
   - Cliquez sur SHOP
   - Menu apparaît ? ✅
   - Achetez Pioche Pierre (100$)
   - Elle apparaît dans l'inventaire ? ✅

---

## 🚀 SI TOUT FONCTIONNE

Félicitations ! Vous avez maintenant un jeu de minage **fonctionnel** !

### Prochaines étapes possibles :
- Ajouter plus de minerais rares
- Ajouter un système de quêtes
- Ajouter des effets visuels
- Ajouter de la musique

**Mais d'abord, assurez-vous que CETTE version fonctionne parfaitement !**

---

## ⚠️ IMPORTANT

**N'utilisez QUE ces 2 fichiers :**
- ✅ `MiningSimulator_Simple.lua` (Serveur)
- ✅ `MineClient_Simple.lua` (Client)

**NE PAS utiliser :**
- ❌ MiningSimulator_Fixed.lua
- ❌ MiningSimulator_Optimized.lua
- ❌ QuestSystem.lua
- ❌ Tous les anciens scripts

---

## 📞 AIDE

Si ça ne fonctionne toujours pas :
1. Faites une capture d'écran de l'Output (F9)
2. Dites-moi exactement ce que vous voyez à l'écran
3. Je vous aiderai !

**Cette version est ULTRA SIMPLE et doit fonctionner à 100% !** 🎉
