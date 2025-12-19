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

    @editable
    ItemGranters: []item_granter_device = array{}

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

    # Donner un stuff aléatoire au joueur
    GiveRandomLoadout(Player: player): void =
        if (ItemGranters.Length > 0):
            RandomGen := GetRandomGenerator()
            # Choisir 1-2 item granters aléatoires
            NumItems := RandomGen.RollDice(2) + 1 # Entre 1 et 2
            for (I := 0..NumItems):
                RandomIndex := RandomGen.RollDice(ItemGranters.Length)
                if (ItemGranter := ItemGranters[RandomIndex]):
                    if (Agent := agent[Player]):
                        ItemGranter.GrantItem(Agent)

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
