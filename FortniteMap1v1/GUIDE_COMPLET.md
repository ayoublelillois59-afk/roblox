# 🎮 MAP FORTNITE 1v1 REALISTIC - GUIDE COMPLET

## 📋 CE QUE FAIT CETTE MAP

✅ **10 joueurs** peuvent jouer en même temps en public
✅ **1 pièce par kill** pour chaque élimination
✅ **Shop avec les pièces** pour acheter :
   - Armes niveau 1 (3 pièces)
   - Armes niveau 2 (5 pièces)
   - Armes niveau 3 (10 pièces)
   - Double Jump (7 pièces)
   - Speed Boost (5 pièces)
✅ **Spawn aléatoire** à chaque mort
✅ **Stuff aléatoire** à chaque spawn

---

## 🚀 ÉTAPE 1 : IMPORTER LES SCRIPTS

1. **Ouvrez votre projet UEFN**
2. **Allez dans le panneau "Verse"** (en bas à droite)
3. **Créez un nouveau dossier** : `Scripts`
4. **Copiez les 2 fichiers Verse** dans ce dossier :
   - `game_manager.verse`
   - `shop_system.verse`

5. **Compilez le code** : Cliquez sur le bouton **"Compile"** dans le panneau Verse

---

## 🏗️ ÉTAPE 2 : CONFIGURER LA MAP (SUPER IMPORTANT)

### A) PLACER LES SPAWN POINTS (10 minimum)

1. Dans l'**Outliner**, cherchez **"Player Spawner"**
2. **Glissez-déposez** 10-15 **Player Spawner** partout sur votre île
3. **Espacez-les bien** pour des spawns variés
4. **Réglez chaque Player Spawner** :
   - Team Index : **Any** ou **1**
   - Enabled During Phase : **Gameplay**

### B) CRÉER LA ZONE DE JEU

1. Cherchez **"Mutator Zone"** dans l'Outliner
2. Placez une **grande zone** qui couvre toute votre map
3. Configurez-la :
   - Health Regen : **Activé**
   - Infinite Ammo : **Non** (ou Oui si vous voulez)

### C) PLACER LE GAME MANAGER DEVICE

1. Dans l'Outliner, cherchez **"All Devices"**
2. Cherchez votre script **"game_manager"**
3. **Glissez-le sur la map** (n'importe où)
4. **CLIQUEZ DESSUS** et dans les propriétés :
   - **SpawnPads** : Sélectionnez **TOUS** vos Player Spawner (les 10-15)
   - **ItemGranters** : On va les créer maintenant ⬇️

---

## 🎁 ÉTAPE 3 : CRÉER LES ITEM GRANTERS POUR LE SPAWN ALÉATOIRE

1. Cherchez **"Item Granter"** dans l'Outliner
2. **Placez 5-6 Item Granters** près de votre Game Manager
3. **Configurez chaque Item Granter** avec des armes différentes :

   **Item Granter 1** :
   - Item to Grant : **Assault Rifle** (ou Fusil d'assaut)
   - Quantity : 1

   **Item Granter 2** :
   - Item to Grant : **Shotgun** (ou Fusil à pompe)
   - Quantity : 1

   **Item Granter 3** :
   - Item to Grant : **SMG** (ou Pistolet mitrailleur)
   - Quantity : 1

   **Item Granter 4** :
   - Item to Grant : **Sniper Rifle**
   - Quantity : 1

   **Item Granter 5** :
   - Item to Grant : **Small Shield Potion**
   - Quantity : 3

4. **Retournez sur le Game Manager** et dans **ItemGranters**, **sélectionnez tous ces Item Granters**

---

## 🛒 ÉTAPE 4 : CRÉER LE SHOP

### A) PLACER LE SHOP SYSTEM

1. Cherchez votre script **"shop_system"** dans les devices
2. **Glissez-le sur la map**
3. **NE LE CONFIGUREZ PAS ENCORE** (on va d'abord créer les boutons)

### B) CRÉER LES BOUTONS DU SHOP

1. Cherchez **"Button"** dans l'Outliner
2. **Placez 5 boutons** dans une zone de shop (un coin de la map)
3. Nommez-les clairement :
   - **Button_Weapon1** (Arme Niveau 1 - 3 pièces)
   - **Button_Weapon2** (Arme Niveau 2 - 5 pièces)
   - **Button_Weapon3** (Arme Niveau 3 - 10 pièces)
   - **Button_DoubleJump** (Double Jump - 7 pièces)
   - **Button_SpeedBoost** (Speed Boost - 5 pièces)

4. Configurez **chaque bouton** :
   - Interaction Text : **"Acheter Arme 1 (3 pièces)"** (adaptez selon le bouton)
   - Visible During Game : **Yes**

### C) CRÉER LES ITEM GRANTERS DU SHOP

1. **Placez 3 nouveaux Item Granters** pour les armes du shop
2. Configurez-les :

   **Weapon1 Granter** (Arme de base) :
   - Item : **Rare Assault Rifle**

   **Weapon2 Granter** (Arme moyenne) :
   - Item : **Epic Pump Shotgun**

   **Weapon3 Granter** (Arme puissante) :
   - Item : **Legendary Heavy Sniper**

### D) CRÉER LES MUTATOR ZONES POUR LES POUVOIRS

1. **Placez 2 Mutator Zones** au-dessus de votre shop
2. Configurez-les :

   **Double Jump Zone** :
   - Air Control : **150%**
   - Gravity : **50%**
   - Enabled au départ : **NON**
   - Affect All Players : **NON**

   **Speed Boost Zone** :
   - Movement Speed : **200%**
   - Enabled au départ : **NON**
   - Affect All Players : **NON**

### E) CONNECTER LE SHOP SYSTEM

1. **Cliquez sur le Shop System Device**
2. Dans les propriétés, configurez :
   - **GameManager** : Sélectionnez votre Game Manager Device
   - **WeaponButton1** : Sélectionnez Button_Weapon1
   - **WeaponButton2** : Sélectionnez Button_Weapon2
   - **WeaponButton3** : Sélectionnez Button_Weapon3
   - **DoubleJumpButton** : Sélectionnez Button_DoubleJump
   - **SpeedBoostButton** : Sélectionnez Button_SpeedBoost
   - **Weapon1Granter** : Sélectionnez le Weapon1 Item Granter
   - **Weapon2Granter** : Sélectionnez le Weapon2 Item Granter
   - **Weapon3Granter** : Sélectionnez le Weapon3 Item Granter
   - **DoubleJumpMutator** : Sélectionnez la Double Jump Zone
   - **SpeedBoostMutator** : Sélectionnez la Speed Boost Zone

---

## ⚙️ ÉTAPE 5 : CONFIGURER LES PARAMÈTRES DE L'ÎLE

1. Cliquez sur **"My Island"** dans l'Outliner
2. Dans les **Island Settings** :
   - **Max Players** : 10-16
   - **Starting Health** : 100
   - **Starting Shield** : 0 ou 50
   - **Game End Condition** : Time Limit ou Score Limit
   - **Respawn** : Immediate ou 2 seconds

---

## 🎨 ÉTAPE 6 : RENDRE LA MAP ATTRACTIVE

### Décoration de la Map

1. **Ajoutez des structures** :
   - Bâtiments pour se cacher
   - Rampes et plateformes
   - Obstacles intéressants

2. **Ajoutez de l'éclairage** :
   - Point Lights
   - Spot Lights
   - Ambiance colorée

3. **Ajoutez des props** :
   - Arbres
   - Rochers
   - Véhicules abandonnés

### Zone de Shop Attractive

1. **Créez une structure** autour des boutons du shop
2. **Ajoutez des panneaux** avec du texte :
   - "🔫 ARMES"
   - "⚡ POUVOIRS"
   - "Prix en pièces"

3. **Éclairez bien le shop** pour qu'on le voie de loin

---

## 🧪 ÉTAPE 7 : TESTER

1. **Sauvegardez** : Ctrl+S
2. **Lancez une session** : Cliquez sur **"Launch Session"**
3. **Testez** :
   - Tuez-vous (avec un autre joueur ou en tombant)
   - Vérifiez que vous gagnez 1 pièce
   - Allez au shop et achetez quelque chose
   - Vérifiez le spawn aléatoire

---

## 📝 PRIX DES ITEMS (MODIFIABLES)

Dans le fichier `shop_system.verse`, vous pouvez modifier les prix :

```verse
Weapon1Price: int = 3      # Arme niveau 1
Weapon2Price: int = 5      # Arme niveau 2
Weapon3Price: int = 10     # Arme niveau 3
DoubleJumpPrice: int = 7   # Double Jump
SpeedBoostPrice: int = 5   # Speed Boost
```

---

## 🎯 CONSEILS POUR DÉBUTANTS

1. **Commencez simple** : Faites d'abord fonctionner le système de base
2. **Testez souvent** : Lancez des sessions de test régulièrement
3. **Ajoutez progressivement** : Ajoutez la déco après que tout fonctionne
4. **Utilisez des prefabs** : Pour gagner du temps sur la déco
5. **Regardez des tutos** : Cherchez "UEFN shop tutorial" sur YouTube

---

## ❓ PROBLÈMES COURANTS

### "Ça ne compile pas"
- Vérifiez que les fichiers .verse sont bien dans le bon dossier
- Regardez les erreurs dans le panneau Verse Output

### "Je spawn toujours au même endroit"
- Vérifiez que vous avez bien ajouté TOUS les Player Spawners dans le Game Manager

### "Le shop ne fonctionne pas"
- Vérifiez que TOUS les boutons et devices sont bien connectés au Shop System

### "Je ne gagne pas de pièces"
- Vérifiez que le Game Manager est bien placé sur la map
- Regardez la console pour voir les messages de debug

---

## 🚀 PUBLIER LA MAP

1. **Testez bien** tout avant de publier
2. Allez dans **"My Island"** > **"Publish"**
3. Configurez :
   - **Title** : "1v1 REALISTIC - SHOP & POUVOIRS"
   - **Description** : Expliquez le système de pièces et le shop
   - **Tags** : FFA, 1v1, Shop, Competitive
4. **Publiez** !

---

## 💡 IDÉES D'AMÉLIORATION

- Ajouter plus d'armes dans le shop
- Créer des zones de combat différentes
- Ajouter un leaderboard
- Créer des "kill streaks" (bonus après X kills)
- Ajouter des coffres aléatoires
- Créer un système de saisons/reset de pièces

---

**Bon courage et bon jeu ! 🎮**
