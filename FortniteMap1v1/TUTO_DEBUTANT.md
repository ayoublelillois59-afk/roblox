# 🎓 TUTO DÉBUTANT - METTRE LES SCRIPTS DANS UEFN

## 📍 ÉTAPE 0 : OÙ SONT LES FICHIERS ?

Les scripts sont ici sur votre ordinateur :
```
/home/user/roblox/FortniteMap1v1/Scripts/
├── game_manager.verse
└── shop_system.verse
```

---

## 🚀 ÉTAPE 1 : OUVRIR UEFN ET VOTRE PROJET

1. **Lancez UEFN** (Unreal Editor for Fortnite)
2. **Ouvrez votre projet** (celui où vous avez créé votre île)
3. Attendez que tout se charge

---

## 📂 ÉTAPE 2 : TROUVER LE PANNEAU VERSE

### Option A : Le panneau Verse est déjà visible

Regardez en **BAS À DROITE** de votre écran UEFN. Vous devriez voir un onglet qui dit **"Verse"**.

```
┌─────────────────────────────────────────┐
│                                         │
│         VOTRE VUE 3D                    │
│                                         │
│                                         │
├─────────────────────────────────────────┤
│ Content Browser  │  Outliner  │ Verse  │ ← ICI !
└─────────────────────────────────────────┘
```

### Option B : Le panneau Verse n'est pas visible

Si vous ne voyez pas "Verse" :

1. En haut de l'écran, cliquez sur **"Window"** (Fenêtre)
2. Cherchez **"Verse"** dans le menu
3. Cliquez dessus pour ouvrir le panneau

OU

1. Cliquez sur **"View"** (Affichage) dans la barre de menu
2. Cherchez **"Verse Explorer"** ou **"Verse"**
3. Cochez la case

---

## 📁 ÉTAPE 3 : CRÉER LE DOSSIER "Scripts"

Une fois que vous avez le panneau **Verse** ouvert :

1. Dans le panneau Verse, vous voyez un arbre de dossiers
2. **Faites un CLIC DROIT** dans la zone vide du panneau Verse
3. Sélectionnez **"New Folder"** (Nouveau dossier)
4. Nommez-le : **Scripts**
5. Appuyez sur Entrée

Ça devrait ressembler à ça :
```
Verse
└── 📁 Scripts  ← Vous venez de créer ça
```

---

## 📄 ÉTAPE 4 : CRÉER LES FICHIERS VERSE

### Méthode 1 : Créer directement dans UEFN (RECOMMANDÉ)

#### A) Créer game_manager.verse

1. **Clic droit** sur le dossier **Scripts** que vous venez de créer
2. Sélectionnez **"New Verse File"** (Nouveau fichier Verse)
3. Nommez-le : **game_manager**
4. Appuyez sur Entrée
5. Le fichier s'ouvre automatiquement dans l'éditeur
6. **SUPPRIMEZ TOUT** le contenu par défaut
7. **COPIEZ-COLLEZ** le contenu du fichier `game_manager.verse` que je vous ai donné

**Où trouver le contenu à copier ?**
- Ouvrez le fichier `/home/user/roblox/FortniteMap1v1/Scripts/game_manager.verse` avec un éditeur de texte
- Sélectionnez TOUT (Ctrl+A)
- Copiez (Ctrl+C)
- Revenez dans UEFN
- Collez dans le fichier (Ctrl+V)

#### B) Créer shop_system.verse

1. **Clic droit** sur le dossier **Scripts**
2. Sélectionnez **"New Verse File"**
3. Nommez-le : **shop_system**
4. Appuyez sur Entrée
5. **SUPPRIMEZ TOUT** le contenu par défaut
6. **COPIEZ-COLLEZ** le contenu du fichier `shop_system.verse` que je vous ai donné

### Méthode 2 : Importer les fichiers depuis votre ordinateur

1. Ouvrez l'explorateur de fichiers Windows/Mac/Linux
2. Naviguez vers `/home/user/roblox/FortniteMap1v1/Scripts/`
3. **Glissez-déposez** les 2 fichiers `.verse` directement dans le dossier **Scripts** du panneau Verse dans UEFN

---

## ⚙️ ÉTAPE 5 : COMPILER LES SCRIPTS

**TRÈS IMPORTANT** : Les scripts doivent être compilés !

1. Dans le panneau Verse, en haut, cherchez un bouton **"Build"** ou **"Compile"**
2. Cliquez dessus
3. Attendez quelques secondes
4. En bas, vous verrez des messages :
   - ✅ **"Build Successful"** = PARFAIT !
   - ❌ **Erreurs en rouge** = Il y a un problème (voir section Problèmes ci-dessous)

---

## ✅ ÉTAPE 6 : VÉRIFIER QUE ÇA A MARCHÉ

### Comment savoir si les scripts sont bien importés ?

1. Ouvrez le panneau **"Content Browser"** (en bas à gauche normalement)
2. OU ouvrez le panneau **"Outliner"** (à droite)
3. Dans la barre de recherche, tapez : **game_manager**
4. Vous devriez voir apparaître **"game_manager"** comme un device
5. Faites pareil avec **shop_system**

Si vous les voyez → **C'EST BON !** ✅

---

## 🎮 ÉTAPE 7 : PLACER LES DEVICES SUR LA MAP

Maintenant que les scripts sont importés :

1. Dans l'**Outliner** (panneau de droite), cherchez **"All Devices"** ou tapez **"game_manager"** dans la recherche
2. Vous devriez voir :
   - **game_manager** (avec une icône de device)
   - **shop_system** (avec une icône de device)
3. **Glissez-déposez** le **game_manager** sur votre map (n'importe où, on ne le verra pas)
4. **Glissez-déposez** le **shop_system** sur votre map

---

## 📍 RÉSUMÉ VISUEL

```
ÉTAPE 1 : Ouvrir UEFN
          ↓
ÉTAPE 2 : Trouver le panneau "Verse" (en bas à droite)
          ↓
ÉTAPE 3 : Clic droit → New Folder → "Scripts"
          ↓
ÉTAPE 4 : Clic droit sur Scripts → New Verse File → "game_manager"
          Copier-coller le code
          ↓
          Clic droit sur Scripts → New Verse File → "shop_system"
          Copier-coller le code
          ↓
ÉTAPE 5 : Cliquer sur "Build" ou "Compile"
          ↓
ÉTAPE 6 : Vérifier dans Outliner que game_manager et shop_system apparaissent
          ↓
ÉTAPE 7 : Glisser-déposer game_manager et shop_system sur la map
```

---

## ❌ PROBLÈMES COURANTS

### "Je ne trouve pas le panneau Verse"
➡️ Menu **Window** → **Verse** ou **Verse Explorer**

### "Je ne peux pas créer de dossier"
➡️ Assurez-vous d'être dans le bon panneau (Verse, pas Content Browser)

### "Erreur de compilation"
➡️ Assurez-vous d'avoir copié TOUT le code, du début à la fin
➡️ Vérifiez qu'il n'y a pas de caractères bizarres

### "Je ne vois pas les devices dans l'Outliner"
➡️ La compilation a peut-être échoué
➡️ Regardez les erreurs dans la console Verse Output

### "Le fichier ne s'ouvre pas"
➡️ Double-cliquez sur le fichier .verse dans le panneau Verse pour l'ouvrir

---

## 🆘 VOUS ÊTES BLOQUÉ ?

**Décrivez-moi EXACTEMENT ce que vous voyez** :
- À quelle étape êtes-vous bloqué ?
- Qu'est-ce qui s'affiche à l'écran ?
- Y a-t-il des messages d'erreur ?

Je vous aiderai !

---

## 📺 ALTERNATIVE : TUTORIEL VIDÉO

Si vous préférez une vidéo, cherchez sur YouTube :
**"UEFN how to import Verse script"** ou **"UEFN Verse tutorial"**

Ça vous montrera visuellement comment faire.

---

**Une fois les scripts importés et compilés, revenez me voir pour la suite !** 🚀
