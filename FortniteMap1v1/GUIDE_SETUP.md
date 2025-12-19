# 🎮 GUIDE SETUP - MAP 1v1 REALISTIC

## ✨ SYSTÈME DE LA MAP

### 🎁 CE QU'ON A AU SPAWN (AUTOMATIQUE)
À chaque spawn/respawn, vous recevez **5 ARMES ALÉATOIRES** :

1. **Fusil d'Assaut** (Common/Uncommon/Rare au hasard)
2. **Pompe** (Common/Uncommon/Rare au hasard)
3. **PM** (Common/Uncommon/Rare au hasard)
4. **Soin** (Bandages/Med Kit/Small Shield au hasard)
5. **Objet d'Échappement** (Shockwave/Grappler/Launch Pad au hasard)

### 🛒 CE QU'ON PEUT ACHETER AU SHOP
Avec les pièces gagnées (1 pièce par kill) :

**ARMES MYTHIQUES/EXOTIQUES** (vraiment cheatées !)
- Arme 1 : **5 pièces**
- Arme 2 : **7 pièces**
- Arme 3 : **10 pièces**

**POUVOIRS**
- Double Jump : **8 pièces**
- Speed Boost : **6 pièces**

---

## 🚀 ÉTAPE 1 : IMPORTER LES SCRIPTS (2 min)

1. Ouvrez **UEFN** et votre projet
2. Panneau **Verse** (en bas à droite)
3. Créez un dossier **"Scripts"**
4. Copiez les 2 fichiers dedans :
   - `game_manager.verse`
   - `shop_system.verse`
5. Cliquez sur **"Compile"**

---

## 🏗️ ÉTAPE 2 : CONFIGURER LE GAME MANAGER (10 min)

### A) PLACER LES SPAWN POINTS

1. Dans l'Outliner, cherchez **"Player Spawner"**
2. Placez **10-15 Player Spawner** partout sur votre map
3. Espacez-les bien pour des spawns variés

### B) CRÉER LES ITEM GRANTERS POUR LE SPAWN

Vous devez créer **5 CATÉGORIES** d'Item Granters :

#### 📍 Catégorie 1 : FUSILS D'ASSAUT (3 variantes)
1. Placez **3 Item Granters** côte à côte
2. Configurez-les :
   - **Item Granter 1** : Assault Rifle (Common)
   - **Item Granter 2** : Assault Rifle (Uncommon)
   - **Item Granter 3** : Assault Rifle (Rare)

#### 📍 Catégorie 2 : POMPES (3 variantes)
1. Placez **3 Item Granters** côte à côte
2. Configurez-les :
   - **Item Granter 1** : Pump Shotgun (Common)
   - **Item Granter 2** : Pump Shotgun (Uncommon)
   - **Item Granter 3** : Pump Shotgun (Rare)

#### 📍 Catégorie 3 : PM / SMG (3 variantes)
1. Placez **3 Item Granters** côte à côte
2. Configurez-les :
   - **Item Granter 1** : SMG (Common)
   - **Item Granter 2** : SMG (Uncommon)
   - **Item Granter 3** : SMG (Rare)

#### 📍 Catégorie 4 : SOINS (3-4 variantes)
1. Placez **3-4 Item Granters** côte à côte
2. Configurez-les :
   - **Item Granter 1** : Bandages (x5)
   - **Item Granter 2** : Med Kit (x3)
   - **Item Granter 3** : Small Shield Potion (x3)
   - **Item Granter 4** : Big Pot (x1) [optionnel]

#### 📍 Catégorie 5 : OBJETS D'ÉCHAPPEMENT (3-4 variantes)
1. Placez **3-4 Item Granters** côte à côte
2. Configurez-les :
   - **Item Granter 1** : Shockwave Grenade (x2)
   - **Item Granter 2** : Grappler (x10)
   - **Item Granter 3** : Launch Pad (x1)
   - **Item Granter 4** : Rift-To-Go (x1) [optionnel]

### C) CONNECTER LE GAME MANAGER

1. Dans l'Outliner, cherchez **"game_manager"** dans les devices
2. **Glissez-le sur la map**
3. Cliquez dessus et dans les propriétés :
   - **SpawnPads** : Sélectionnez TOUS les Player Spawner (les 10-15)
   - **AssaultRifleGranters** : Sélectionnez les 3 Item Granters de fusils d'assaut
   - **ShotgunGranters** : Sélectionnez les 3 Item Granters de pompes
   - **SMGGranters** : Sélectionnez les 3 Item Granters de PM
   - **HealingGranters** : Sélectionnez les 3-4 Item Granters de soins
   - **EscapeItemGranters** : Sélectionnez les 3-4 Item Granters d'objets d'échappement

---

## 🛒 ÉTAPE 3 : CRÉER LE SHOP (10 min)

### A) CRÉER LA ZONE DU SHOP

1. Choisissez **un coin de votre map** pour le shop
2. Construisez une **petite structure** attractive
3. Ajoutez de l'**éclairage** pour qu'on le voie de loin

### B) PLACER LES BOUTONS

1. Cherchez **"Button"** dans l'Outliner
2. Placez **5 boutons** dans la zone du shop
3. Configurez-les :

   **Bouton 1 - Arme Mythique 1**
   - Interaction Text : **"💎 ARME MYTHIQUE (5 pièces)"**

   **Bouton 2 - Arme Mythique 2**
   - Interaction Text : **"💎 ARME EXOTIQUE (7 pièces)"**

   **Bouton 3 - Arme Mythique 3**
   - Interaction Text : **"💎 ARME ULTIME (10 pièces)"**

   **Bouton 4 - Double Jump**
   - Interaction Text : **"⚡ DOUBLE JUMP (8 pièces)"**

   **Bouton 5 - Speed Boost**
   - Interaction Text : **"⚡ SPEED BOOST (6 pièces)"**

### C) CRÉER LES ITEM GRANTERS DU SHOP

Placez **3 Item Granters** pour les armes du shop.

**SUGGESTIONS D'ARMES VRAIMENT CHEATÉES :**

#### Option 1 : Armes Mythiques Classiques
- **Arme 1 (5 pièces)** : Mythic Drum Gun
- **Arme 2 (7 pièces)** : Mythic Burst Assault Rifle
- **Arme 3 (10 pièces)** : Mythic Heavy Sniper

#### Option 2 : Armes Exotiques OP
- **Arme 1 (5 pièces)** : Exotic Night Hawk (Revolver qui one-shot)
- **Arme 2 (7 pièces)** : Exotic Boom Sniper Rifle
- **Arme 3 (10 pièces)** : Exotic The Dub (Shotgun qui repousse)

#### Option 3 : Armes de Boss
- **Arme 1 (5 pièces)** : Kit's Shockwave Launcher
- **Arme 2 (7 pièces)** : Jules' Drum Gun
- **Arme 3 (10 pièces)** : Ocean's Burst Assault Rifle

**CONSEIL** : Testez les armes en jeu et choisissez celles qui sont vraiment **OP** !

### D) CRÉER LES MUTATOR ZONES POUR LES POUVOIRS

1. Cherchez **"Mutator Zone"** dans l'Outliner
2. Placez **2 grandes Mutator Zones** qui couvrent toute la map

**Mutator Zone 1 - Double Jump**
- Air Control : **150%**
- Gravity : **50%**
- Enabled au départ : **NON** ⚠️
- Affect All Players : **NON** ⚠️

**Mutator Zone 2 - Speed Boost**
- Movement Speed : **200%**
- Enabled au départ : **NON** ⚠️
- Affect All Players : **NON** ⚠️

### E) CONNECTER LE SHOP SYSTEM

1. Cherchez **"shop_system"** dans les devices
2. **Glissez-le sur la map**
3. Cliquez dessus et connectez TOUT :

   **Game Manager :**
   - Sélectionnez le game_manager device

   **Boutons d'Armes :**
   - **EpicARButton** : Bouton 1 (5 pièces)
   - **LegendaryShotgunButton** : Bouton 2 (7 pièces)
   - **SniperButton** : Bouton 3 (10 pièces)

   **Item Granters d'Armes :**
   - **EpicARGranter** : Item Granter de l'arme 1
   - **LegendaryShotgunGranter** : Item Granter de l'arme 2
   - **SniperGranter** : Item Granter de l'arme 3

   **Boutons de Pouvoirs :**
   - **DoubleJumpButton** : Bouton 4
   - **SpeedBoostButton** : Bouton 5

   **Mutator Zones :**
   - **DoubleJumpMutator** : Mutator Zone du Double Jump
   - **SpeedBoostMutator** : Mutator Zone du Speed Boost

---

## ⚙️ ÉTAPE 4 : CONFIGURER L'ÎLE

1. Cliquez sur **"My Island"** dans l'Outliner
2. **Island Settings** :
   - **Max Players** : 10-16
   - **Starting Health** : 100
   - **Starting Shield** : 0
   - **Respawn** : 2 seconds

---

## 🧪 ÉTAPE 5 : TESTER

1. **Sauvegardez** : Ctrl+S
2. **Launch Session**
3. **Testez** :
   - ✅ Vous spawner avec 5 armes
   - ✅ Tuez quelqu'un → vous gagnez 1 pièce
   - ✅ Allez au shop et achetez une arme
   - ✅ Mourez et vérifiez le spawn aléatoire

---

## 🎨 ÉTAPE 6 : RENDRE LA MAP ATTRACTIVE

### Zone de Combat
- Ajoutez des **bâtiments** pour se cacher
- Mettez des **rampes** et **plateformes**
- Créez des **zones de hauteur** différentes

### Zone de Shop
- **Structure cool** autour des boutons
- **Panneaux avec prix** écrits dessus
- **Éclairage coloré** (vert pour armes, bleu pour pouvoirs)
- **Props décoratifs** (caisses, tables, etc.)

### Ambiance Générale
- **Point Lights** colorés partout
- **Végétation** (arbres, buissons)
- **Props** intéressants
- **Zones thématiques** différentes

---

## 💰 MODIFIER LES PRIX

Dans le fichier `shop_system.verse`, lignes 47-51 :

```verse
EpicARPrice: int = 5              # Arme mythique 1
LegendaryShotgunPrice: int = 7    # Arme mythique 2
SniperPrice: int = 10             # Arme mythique 3
DoubleJumpPrice: int = 8          # Double Jump
SpeedBoostPrice: int = 6          # Speed Boost
```

Changez les valeurs comme vous voulez !

---

## ❓ PROBLÈMES COURANTS

### "Je spawn sans armes"
- Vérifiez que TOUS les Item Granters sont bien connectés au Game Manager
- Vérifiez que vous avez bien 3 Item Granters par catégorie

### "Le shop ne fonctionne pas"
- Vérifiez que tous les boutons sont bien connectés au Shop System
- Vérifiez que le Shop System est bien connecté au Game Manager

### "Les pouvoirs ne marchent pas"
- Vérifiez que les Mutator Zones sont bien **DISABLED** au départ
- Vérifiez que "Affect All Players" est sur **NON**

---

## 🚀 PUBLIER

1. Testez bien tout
2. **My Island** > **Publish**
3. Titre : **"1v1 REALISTIC 🔥 ARMES MYTHIQUES + POUVOIRS"**
4. Tags : **FFA, 1v1, Mythic, Shop, Competitive**

---

**Bon courage ! 🎮**
