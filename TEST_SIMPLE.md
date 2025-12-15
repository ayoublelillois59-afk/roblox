# 🧪 VERSION DE TEST ULTRA SIMPLE

## ⚠️ LISEZ BIEN - C'EST IMPORTANT

Cette version est un **TEST** pour vérifier que le système de minage fonctionne.

Si cette version marche, on pourra passer à la version complète.
Si elle ne marche pas, on saura exactement où est le problème.

---

## 🗑️ ÉTAPE 1 : TOUT SUPPRIMER

**SUPPRIMEZ TOUS LES SCRIPTS** dans :
- ❌ ServerScriptService (TOUS les scripts)
- ❌ StarterPlayerScripts (TOUS les LocalScripts)
- ❌ Workspace (Si vous avez des dossiers Mine/TestMine)

**Votre projet doit être VIDE !**

---

## 📥 ÉTAPE 2 : INSTALLER 2 SCRIPTS DE TEST

### Script 1 : Serveur

1. Allez sur GitHub : `src/server/TestServer.lua`
2. Cliquez sur **Raw**
3. Copiez TOUT (`Ctrl+A` puis `Ctrl+C`)
4. Dans Roblox Studio :
   - **ServerScriptService** → Insert Object → **Script**
   - Nommez-le **`TestServer`**
   - Collez le code
   - Sauvegardez

### Script 2 : Client

1. Allez sur GitHub : `src/client/TestClient.lua`
2. Cliquez sur **Raw**
3. Copiez TOUT (`Ctrl+A` puis `Ctrl+C`)
4. Dans Roblox Studio :
   - **StarterPlayer** → **StarterPlayerScripts** → Insert Object → **LocalScript**
   - Nommez-le **`TestClient`**
   - Collez le code
   - Sauvegardez

---

## ▶️ ÉTAPE 3 : LANCER

1. Cliquez sur **Play** (▶️)

2. Attendez 3 secondes

3. Appuyez sur **F9** pour ouvrir la Console

4. Vous DEVEZ voir :
```
========================================
SERVEUR DE TEST - DÉMARRAGE
========================================
✅ Remote Events créés
🌍 Création de blocs de test...
✅ 25 blocs de test créés dans workspace.TestMine
========================================
✅ SERVEUR DE TEST PRÊT
========================================

========================================
CLIENT DE TEST - DÉMARRAGE
========================================
👤 Joueur: VotreNom
⏳ Attente des remotes...
✅ Remote events connectés!
✅ Interface créée!
========================================
✅ CLIENT DE TEST PRÊT
Cliquez sur les blocs verts!
========================================
```

✅ **Si vous voyez ça, c'est bon !**
❌ **Si non, faites une capture d'écran de la console !**

---

## 🎮 ÉTAPE 4 : TESTER

### Ce que vous devez voir à l'écran :

1. **En haut à gauche** : `💰 0 $`
2. **En haut au centre** : `⛏️ CLIQUEZ SUR LES BLOCS VERTS POUR LES MINER!`
3. **En bas au centre** : `En attente de clic...`
4. **Dans le monde** : 25 blocs verts (5x5) flottant dans l'air

### Test :

1. **Cliquez sur un bloc vert**

2. Le message en bas doit changer :
   ```
   🖱️ Clic détecté!
   ✅ Bloc détecté - Envoi au serveur...
   🔨 Minage en cours...
   ```

3. Le **bloc doit disparaître** avec un effet vert

4. Votre **argent doit augmenter** : `💰 10 $`

5. Dans la **Console (F9)**, vous devez voir :
   ```
   🖱️ CLIC DÉTECTÉ!
   ✅ Bloc de test détecté!
   🚀 Envoi au serveur...

   🔨 VotreNom essaie de miner: TestBlock
   ✅ Destruction du bloc: TestBlock
   💰 VotreNom a maintenant 10$
   ```

---

## ✅ SI ÇA MARCHE

**FÉLICITATIONS !** Le système de minage fonctionne !

Le problème était avec les scripts complexes.

Envoyez-moi juste "ça marche" et je vous donnerai une version complète simplifiée qui marchera aussi.

---

## ❌ SI ÇA NE MARCHE PAS

### Problème 1 : Je ne vois PAS les blocs verts

**Solution :**
1. Appuyez sur F9
2. Regardez s'il y a "✅ 25 blocs de test créés"
3. Si OUI mais pas de blocs :
   - Déplacez votre caméra
   - Regardez autour de vous
   - Les blocs flottent à Y=3
4. Si NON :
   - Le script serveur ne s'est pas lancé
   - Vérifiez qu'il s'appelle **TestServer**
   - Redémarrez le jeu

### Problème 2 : Je vois les blocs mais RIEN ne se passe quand je clique

**Solution :**
1. Regardez le message en bas de l'écran
2. S'il ne change PAS :
   - Le client ne détecte pas les clics
   - Vérifiez que **TestClient** est un **LocalScript** (icône BLEUE)
   - Redémarrez le jeu

3. S'il dit "❌ Aucun bloc visé" :
   - Cliquez EXACTEMENT sur un bloc vert
   - Pas à côté, DESSUS

4. S'il dit "❌ Ce n'est pas un bloc de test" :
   - Les blocs ne sont pas dans TestMine
   - Appuyez sur F9 et envoyez-moi la console

### Problème 3 : Le bloc ne disparaît PAS mais l'argent augmente

**Solution :**
- C'est un problème de latence
- Attendez 1-2 secondes
- Si vraiment rien, envoyez la console (F9)

---

## 📸 EN CAS DE PROBLÈME

1. Faites une capture d'écran de :
   - L'écran du jeu (on doit voir l'interface)
   - La Console (F9)

2. Envoyez-moi ça avec :
   - "Je vois les blocs : OUI/NON"
   - "Le message en bas change quand je clique : OUI/NON"
   - "L'argent augmente : OUI/NON"

---

## 🎯 OBJECTIF

Cette version de test permet de savoir si :
- ✅ Le serveur se lance
- ✅ Le client se connecte
- ✅ Les clics sont détectés
- ✅ La communication client-serveur marche
- ✅ Les blocs peuvent être détruits

Si tout ça marche, **le problème était avec les scripts complexes**.

**ON VA RÉUSSIR ! 💪**
