# 🏆 ULTIMATE MINING SIMULATOR PRO

Un jeu de type Mine Simulator complet et professionnel pour Roblox avec des visuels ultra-stylisés et un gameplay optimisé.

## ✨ Fonctionnalités

### 📊 Système de Minerais (15 types)

#### Tier 0 - Surface
- 🌿 **Herbe** - Couche de surface
- 🟤 **Terre** - 3 couches sous l'herbe

#### Tier 1 - Communs
- ⚪ **Pierre** - Minerai de base (3💰)
- ⚫ **Charbon** - Profondeur 3+ (10💰)
- 🟠 **Cuivre** - Profondeur 5+ (20💰)

#### Tier 2 - Peu communs
- ⚪ **Fer** - Profondeur 10+ (50💰)
- 💿 **Argent** - Profondeur 15+ (100💰)
- 🟡 **Or** - Profondeur 20+ (200💰)

#### Tier 3 - Rares
- 💙 **Saphir** - Profondeur 30+ (500💰)
- 💚 **Émeraude** - Profondeur 35+ (800💰)
- ❤️ **Rubis** - Profondeur 40+ (1200💰)

#### Tier 4 - Épiques
- 💎 **Diamant** - Profondeur 50+ (2500💰)
- 💜 **Améthyste** - Profondeur 60+ (5000💰)

#### Tier 5 - Légendaires
- 🖤 **Obsidienne** - Profondeur 75+ (10000💰)
- 🌟 **Mithril** - Profondeur 100+ (25000💰)

### ⛏️ Système de Pioches (8 types)

| Pioche | Prix | Puissance | Vitesse | Portée |
|--------|------|-----------|---------|--------|
| 🪵 Bois | Gratuit | x1 | x1 | 1 bloc |
| 🪨 Pierre | 150💰 | x2 | x2 | 1 bloc |
| ⚪ Fer | 750💰 | x5 | x5 | 1 bloc |
| 🟡 Or | 3000💰 | x10 | x10 | 2 blocs |
| 💎 Diamant | 15000💰 | x20 | x20 | 3 blocs |
| 🖤 Obsidienne | 75000💰 | x50 | x50 | 4 blocs |
| 🌟 Mithril | 300000💰 | x100 | x100 | 6 blocs |
| 👑 Légendaire | 1500000💰 | x200 | Instantané | 12 blocs |

### 🎨 Styles Visuels Professionnels

- **Herbe** : Matériau Grass avec brins d'herbe aléatoires
- **Terre** : Matériau Ground avec variations de couleur
- **Pierre** : Matériau Slate avec fissures aléatoires
- **Minerais communs** : Veines réalistes + particules Sparkles
- **Minerais précieux** : Pépites brillantes + lumière intense + double Sparkles + aura
- **Cristaux** : Cristal central géant + cristaux satellites + triple lumière + particules multiples + rayon vertical (tier 4+) + particules orbitales (tier 5)

### 🎮 Système de Jeu

- **Génération procédurale** : Surface complète + chunks souterrains à la demande
- **Optimisation** : Chargement dynamique des chunks autour du joueur
- **Progression** : Système de rarité basé sur la profondeur
- **Interface** : Barres de progression stylisées pour le minage
- **Économie** : Système de vente et boutique de pioches

### 📋 Système de Quêtes

- **5 quêtes quotidiennes** :
  - 🪨 Mineur Débutant (50 Pierre - 500💰)
  - ⚫ Charbonnier (30 Charbon - 800💰)
  - 💰 Entrepreneur (5000$ gagné - 1500💰)
  - ⚪ Forgeron (20 Fer - 1200💰)
  - 💎 **MAÎTRE MINEUR** (10 Diamants + 5 Émeraudes + 3 Rubis - 25000💰)
- **Tracking automatique** : Progression en temps réel
- **Notifications** : Alertes visuelles lors des complétions
- **Interface dédiée** : Menu de quêtes avec barres de progression

### 🎨 Interface Utilisateur Complète

- **HUD Monnaie** : Affichage en temps réel avec animations
- **Inventaire de pioches** : 5 slots avec sélection rapide
- **Boutique intégrée** : Achat direct des pioches
- **Bouton de vente** : Vente rapide avec notification de gains
- **Menu des quêtes** : Liste scrollable avec progression détaillée
- **Animations fluides** : Transitions, bounces, slides
- **Design moderne** : Couleurs vives, bordures néon, effets de survol

## 📁 Structure du Projet

```
roblox/
├── src/
│   ├── server/
│   │   ├── MiningSimulator.lua    # Script serveur principal
│   │   └── QuestSystem.lua         # Système de quêtes
│   ├── client/
│   │   └── MineClient.lua          # Interface GUI complète
│   └── shared/
│       └── (modules partagés à venir)
└── README.md
```

## 🔧 Installation dans Roblox Studio

### Scripts Serveur

1. Dans **ServerScriptService**, créer deux Scripts :
   - **Script 1** : Copier le contenu de `src/server/MiningSimulator.lua`
   - **Script 2** : Copier le contenu de `src/server/QuestSystem.lua`

### Script Client

2. Dans **StarterPlayer** > **StarterPlayerScripts**, créer un LocalScript :
   - Copier le contenu de `src/client/MineClient.lua`

### Assets

3. Dans **ReplicatedStorage**, créer un dossier nommé `PickaxeModels`
4. Ajouter les modèles de pioches (Tools) dans ce dossier avec les noms exacts :
   - WoodenPickaxe
   - StonePickaxe
   - IronPickaxe
   - GoldPickaxe
   - DiamondPickaxe
   - ObsidianPickaxe
   - MythrilPickaxe
   - LegendaryPickaxe

## 🎯 Prochaines Étapes

### Complété ✅
- [x] Scripts client pour l'interface utilisateur
- [x] GUI de boutique
- [x] GUI d'inventaire
- [x] Système de quêtes quotidiennes
- [x] Animations et effets visuels

### En cours 🔄
- [ ] Correction génération de chunks (problème de lag)
- [ ] Optimisation des couleurs (plus vives et distinctives)
- [ ] Amélioration de l'attractivité de la map

### À venir 🚀
- [ ] Système de sauvegarde de données (DataStore)
- [ ] Système de rebirth
- [ ] Pets collecteurs automatiques
- [ ] Effets sonores
- [ ] Zones de minage spéciales
- [ ] Événements et bonus
- [ ] Particules et effets améliorés

## 📝 Notes Techniques

- **BLOCK_SIZE** : 3.33 studs
- **CHUNK_SIZE** : 10 blocs
- **SURFACE_RADIUS** : 40 blocs
- **Génération** : Surface complète au démarrage + chunks dynamiques
- **Remote Events** : Configurés dans ReplicatedStorage/MineSimulator

## 🎮 Commandes Développeur

Le script affiche des logs détaillés :
- 🌍 Génération de la surface
- ⛏️ Génération des chunks
- ✅ Initialisation des joueurs
- 📋 Création des données de quêtes
- ✅ Complétion des quêtes

## ⚠️ Problèmes Connus

### Génération de Chunks
- La génération progressive des chunks peut causer des lags
- Nécessite optimisation du système de chargement
- Solution en développement : streaming amélioré

### Visuels
- Couleurs à rendre plus vives et distinctives
- Amélioration de l'attractivité visuelle de la map en cours

## 💡 Conseils d'Utilisation

- **Performance** : Réduire SURFACE_RADIUS si lag (40 → 30)
- **Chunks** : Ajuster CHUNK_SIZE pour meilleure fluidité (10 → 8)
- **Pioches** : Créer les modèles de tools dans ReplicatedStorage avant de lancer
- **Test** : Tester avec 1-2 joueurs d'abord avant déploiement

---

**Version** : 2.1
**Créé par** : Claude
**Status** : En développement actif
**Dernière mise à jour** : Système de quêtes + GUI complète
