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
