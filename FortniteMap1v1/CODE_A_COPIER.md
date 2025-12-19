# 📋 CODE À COPIER-COLLER

## 📄 FICHIER 1 : game_manager.verse

**Copier TOUT ce qui est ci-dessous** (de `using` jusqu'à la fin) :

```verse
using { /Fortnite.com/Devices }
using { /Verse.org/Simulation }
using { /UnrealEngine.com/Temporary/Diagnostics }
using { /Fortnite.com/Characters }
using { /Fortnite.com/Game }
using { /Verse.org/Random }

# Gestionnaire principal du jeu 1v1
game_manager := class(creative_device):

    # Devices à placer dans UEFN
    @editable
    SpawnPads: []player_spawner_device = array{}

    # 5 CATÉGORIES D'ARMES (chaque joueur reçoit 1 item de chaque catégorie)
    @editable
    AssaultRifleGranters: []item_granter_device = array{}  # 3 variantes : Common, Uncommon, Rare

    @editable
    ShotgunGranters: []item_granter_device = array{}  # 3 variantes : Common, Uncommon, Rare

    @editable
    SMGGranters: []item_granter_device = array{}  # 3 variantes : Common, Uncommon, Rare

    @editable
    HealingGranters: []item_granter_device = array{}  # Bandages, Med Kit, Small Shield, etc.

    @editable
    EscapeItemGranters: []item_granter_device = array{}  # Shockwave, Grappler, Launch Pad, etc.

    @editable
    ScoreManager: score_manager_device = score_manager_device{}

    # Variables de jeu
    var PlayerCoins: [player]int = map{}
    var DefaultGold<public>: int = 0

    # Initialisation
    OnBegin<override>()<suspends>: void =
        Print("Map 1v1 Realistic - Initialisation...")

        # Écouter les éliminations
        GetPlayspace().PlayerEliminatedEvent().Subscribe(OnPlayerEliminated)

        # Écouter les nouveaux joueurs
        GetPlayspace().PlayerAddedEvent().Subscribe(OnPlayerAdded)

        Print("Map prête ! Bon jeu !")

    # Quand un joueur rejoint
    OnPlayerAdded(Player: player): void =
        Print("Nouveau joueur: {Player}")
        set PlayerCoins[Player] = DefaultGold
        RespawnPlayer(Player)

    # Quand un joueur élimine un autre
    OnPlayerEliminated(Result: elimination_game_event): void =
        Eliminator := Result.EliminatingCharacter?
        if (EliminatorAgent := Eliminator?.GetAgent[]):
            if (EliminatorPlayer := player[EliminatorAgent]):
                # Donner 1 pièce au joueur qui a tué
                if (CurrentCoins := PlayerCoins[EliminatorPlayer]):
                    set PlayerCoins[EliminatorPlayer] = CurrentCoins + 1
                    Print("{EliminatorPlayer} a maintenant {CurrentCoins + 1} pièces!")

        # Respawn de la victime
        if (EliminatedCharacter := Result.EliminatedCharacter):
            if (VictimAgent := EliminatedCharacter.GetAgent[]):
                if (VictimPlayer := player[VictimAgent]):
                    spawn:
                        Sleep(2.0) # Attendre 2 secondes
                        RespawnPlayer(VictimPlayer)

    # Respawn avec spawn aléatoire et stuff aléatoire
    RespawnPlayer(Player: player)<suspends>: void =
        if (FortCharacter := Player.GetFortCharacter[]):
            FortCharacter.EliminateSelf()

        Sleep(0.5)

        # Spawn aléatoire
        if (SpawnPads.Length > 0):
            RandomGen := GetRandomGenerator()
            RandomIndex := RandomGen.RollDice(SpawnPads.Length)
            if (RandomSpawn := SpawnPads[RandomIndex]):
                RandomSpawn.Enable()
                Sleep(0.1)
                RandomSpawn.Disable()

        # Donner un loadout aléatoire
        Sleep(0.5)
        GiveRandomLoadout(Player)

    # Donner un loadout COMPLET aléatoire au joueur
    # Chaque joueur reçoit : 1 Fusil d'assaut + 1 Pompe + 1 PM + 1 Soin + 1 Objet d'échappement
    GiveRandomLoadout(Player: player): void =
        if (Agent := agent[Player]):
            RandomGen := GetRandomGenerator()

            # 1. FUSIL D'ASSAUT (variante aléatoire)
            if (AssaultRifleGranters.Length > 0):
                RandomIndex := RandomGen.RollDice(AssaultRifleGranters.Length)
                if (ItemGranter := AssaultRifleGranters[RandomIndex]):
                    ItemGranter.GrantItem(Agent)

            # 2. SHOTGUN / POMPE (variante aléatoire)
            if (ShotgunGranters.Length > 0):
                RandomIndex := RandomGen.RollDice(ShotgunGranters.Length)
                if (ItemGranter := ShotgunGranters[RandomIndex]):
                    ItemGranter.GrantItem(Agent)

            # 3. SMG / PM (variante aléatoire)
            if (SMGGranters.Length > 0):
                RandomIndex := RandomGen.RollDice(SMGGranters.Length)
                if (ItemGranter := SMGGranters[RandomIndex]):
                    ItemGranter.GrantItem(Agent)

            # 4. SOIN (variante aléatoire)
            if (HealingGranters.Length > 0):
                RandomIndex := RandomGen.RollDice(HealingGranters.Length)
                if (ItemGranter := HealingGranters[RandomIndex]):
                    ItemGranter.GrantItem(Agent)

            # 5. OBJET D'ÉCHAPPEMENT (variante aléatoire)
            if (EscapeItemGranters.Length > 0):
                RandomIndex := RandomGen.RollDice(EscapeItemGranters.Length)
                if (ItemGranter := EscapeItemGranters[RandomIndex]):
                    ItemGranter.GrantItem(Agent)

            Print("{Player} a reçu un nouveau loadout !")

    # Récupérer les pièces d'un joueur
    GetPlayerCoins(Player: player)<public>: int =
        if (Coins := PlayerCoins[Player]):
            return Coins
        return 0

    # Retirer des pièces à un joueur
    RemoveCoins(Player: player, Amount: int)<public>: logic =
        if (CurrentCoins := PlayerCoins[Player]):
            if (CurrentCoins >= Amount):
                set PlayerCoins[Player] = CurrentCoins - Amount
                return true
        return false
```

---

## 📄 FICHIER 2 : shop_system.verse

**Copier TOUT ce qui est ci-dessous** :

```verse
using { /Fortnite.com/Devices }
using { /Verse.org/Simulation }
using { /UnrealEngine.com/Temporary/Diagnostics }
using { /Fortnite.com/Characters }
using { /Fortnite.com/Game }

# Système de shop pour acheter des armes et pouvoirs
shop_system := class(creative_device):

    # Référence au game manager
    @editable
    GameManager: game_manager = game_manager{}

    # ============ ARMES EPIC/LEGENDARY (meilleures que le spawn) ============
    @editable
    EpicARButton: button_device = button_device{} # Fusil d'assaut Epic - 5 pièces

    @editable
    EpicARGranter: item_granter_device = item_granter_device{} # Epic Assault Rifle

    @editable
    LegendaryShotgunButton: button_device = button_device{} # Pompe Legendary - 7 pièces

    @editable
    LegendaryShotgunGranter: item_granter_device = item_granter_device{} # Legendary Pump

    @editable
    SniperButton: button_device = button_device{} # Sniper Legendary - 10 pièces

    @editable
    SniperGranter: item_granter_device = item_granter_device{} # Legendary Sniper

    # ============ POUVOIRS ============
    @editable
    DoubleJumpButton: button_device = button_device{} # Double Jump - 8 pièces

    @editable
    DoubleJumpMutator: mutator_zone_device = mutator_zone_device{}

    @editable
    SpeedBoostButton: button_device = button_device{} # Speed Boost - 6 pièces

    @editable
    SpeedBoostMutator: mutator_zone_device = mutator_zone_device{}

    # Prix des items (modifiables)
    EpicARPrice: int = 5
    LegendaryShotgunPrice: int = 7
    SniperPrice: int = 10
    DoubleJumpPrice: int = 8
    SpeedBoostPrice: int = 6

    OnBegin<override>()<suspends>: void =
        Print("Shop System - Initialisation...")

        # Connecter les boutons d'armes
        EpicARButton.InteractedWithEvent.Subscribe(OnEpicARPurchased)
        LegendaryShotgunButton.InteractedWithEvent.Subscribe(OnLegendaryShotgunPurchased)
        SniperButton.InteractedWithEvent.Subscribe(OnSniperPurchased)

        # Connecter les boutons de pouvoirs
        DoubleJumpButton.InteractedWithEvent.Subscribe(OnDoubleJumpPurchased)
        SpeedBoostButton.InteractedWithEvent.Subscribe(OnSpeedBoostPurchased)

        Print("Shop prêt ! Armes EPIC/LEGENDARY disponibles !")

    # ============ ACHATS D'ARMES ============

    # Achat Fusil d'Assaut Epic (5 pièces)
    OnEpicARPurchased(Agent: agent): void =
        if (Player := player[Agent]):
            if (GameManager.RemoveCoins(Player, EpicARPrice)):
                EpicARGranter.GrantItem(Agent)
                Print("{Player} a acheté un Fusil d'Assaut EPIC ! (5 pièces)")
            else:
                Print("{Player} - Pas assez de pièces ! (besoin de {EpicARPrice})")

    # Achat Pompe Legendary (7 pièces)
    OnLegendaryShotgunPurchased(Agent: agent): void =
        if (Player := player[Agent]):
            if (GameManager.RemoveCoins(Player, LegendaryShotgunPrice)):
                LegendaryShotgunGranter.GrantItem(Agent)
                Print("{Player} a acheté un Pompe LEGENDARY ! (7 pièces)")
            else:
                Print("{Player} - Pas assez de pièces ! (besoin de {LegendaryShotgunPrice})")

    # Achat Sniper Legendary (10 pièces)
    OnSniperPurchased(Agent: agent): void =
        if (Player := player[Agent]):
            if (GameManager.RemoveCoins(Player, SniperPrice)):
                SniperGranter.GrantItem(Agent)
                Print("{Player} a acheté un SNIPER LEGENDARY ! (10 pièces)")
            else:
                Print("{Player} - Pas assez de pièces ! (besoin de {SniperPrice})")

    # ============ ACHATS DE POUVOIRS ============

    # Achat Double Jump (8 pièces)
    OnDoubleJumpPurchased(Agent: agent): void =
        if (Player := player[Agent]):
            if (GameManager.RemoveCoins(Player, DoubleJumpPrice)):
                DoubleJumpMutator.Enable()
                Print("{Player} a activé le DOUBLE JUMP ! (8 pièces)")
            else:
                Print("{Player} - Pas assez de pièces ! (besoin de {DoubleJumpPrice})")

    # Achat Speed Boost (6 pièces)
    OnSpeedBoostPurchased(Agent: agent): void =
        if (Player := player[Agent]):
            if (GameManager.RemoveCoins(Player, SpeedBoostPrice)):
                SpeedBoostMutator.Enable()
                Print("{Player} a activé le SPEED BOOST ! (6 pièces)")
            else:
                Print("{Player} - Pas assez de pièces ! (besoin de {SpeedBoostPrice})")
```

---

## ✅ COMMENT UTILISER CE FICHIER

1. **Sélectionnez TOUT le code** du premier bloc (game_manager.verse)
2. **Copiez** (Ctrl+C ou Cmd+C)
3. **Collez** dans UEFN dans le fichier game_manager.verse
4. Faites pareil pour shop_system.verse
5. **Compilez** !

---

**C'est tout ! Pas besoin de modifier quoi que ce soit.** 🎮
