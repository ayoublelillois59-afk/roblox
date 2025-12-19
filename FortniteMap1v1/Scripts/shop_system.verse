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
