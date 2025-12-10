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

## 📁 Structure du Projet

```
roblox/
├── src/
│   ├── server/
│   │   └── MiningSimulator.lua    # Script serveur principal
│   ├── client/
│   │   └── (scripts client à venir)
│   └── shared/
│       └── (modules partagés à venir)
└── README.md
```

## 🔧 Installation dans Roblox Studio

1. Créer un nouveau projet dans Roblox Studio
2. Dans **ServerScriptService**, créer un nouveau Script
3. Copier le contenu de `src/server/MiningSimulator.lua`
4. Dans **ReplicatedStorage**, créer un dossier nommé `PickaxeModels`
5. Ajouter les modèles de pioches (Tools) dans ce dossier avec les noms exacts :
   - WoodenPickaxe
   - StonePickaxe
   - IronPickaxe
   - GoldPickaxe
   - DiamondPickaxe
   - ObsidianPickaxe
   - MythrilPickaxe
   - LegendaryPickaxe

## 🎯 Prochaines Étapes

- [ ] Scripts client pour l'interface utilisateur
- [ ] GUI de boutique
- [ ] GUI d'inventaire
- [ ] Système de sauvegarde de données
- [ ] Effets sonores
- [ ] Système de rebirth
- [ ] Zones de minage spéciales
- [ ] Événements et bonus

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

---

**Version** : 2.0
**Créé par** : Claude
**Status** : En développement actif
