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

    # Boutons pour acheter des items
    @editable
    WeaponButton1: button_device = button_device{} # Arme niveau 1 - 3 pièces

    @editable
    WeaponButton2: button_device = button_device{} # Arme niveau 2 - 5 pièces

    @editable
    WeaponButton3: button_device = button_device{} # Arme niveau 3 - 10 pièces

    @editable
    DoubleJumpButton: button_device = button_device{} # Double Jump - 7 pièces

    @editable
    SpeedBoostButton: button_device = button_device{} # Speed Boost - 5 pièces

    # Item Granters pour les armes
    @editable
    Weapon1Granter: item_granter_device = item_granter_device{} # Ex: Fusil d'assaut

    @editable
    Weapon2Granter: item_granter_device = item_granter_device{} # Ex: Fusil à pompe légendaire

    @editable
    Weapon3Granter: item_granter_device = item_granter_device{} # Ex: Sniper mythique

    # Mutateurs pour les pouvoirs
    @editable
    DoubleJumpMutator: mutator_zone_device = mutator_zone_device{}

    @editable
    SpeedBoostMutator: mutator_zone_device = mutator_zone_device{}

    # Prix des items
    Weapon1Price: int = 3
    Weapon2Price: int = 5
    Weapon3Price: int = 10
    DoubleJumpPrice: int = 7
    SpeedBoostPrice: int = 5

    OnBegin<override>()<suspends>: void =
        Print("Shop System - Initialisation...")

        # Connecter les boutons
        WeaponButton1.InteractedWithEvent.Subscribe(OnWeapon1Purchased)
        WeaponButton2.InteractedWithEvent.Subscribe(OnWeapon2Purchased)
        WeaponButton3.InteractedWithEvent.Subscribe(OnWeapon3Purchased)
        DoubleJumpButton.InteractedWithEvent.Subscribe(OnDoubleJumpPurchased)
        SpeedBoostButton.InteractedWithEvent.Subscribe(OnSpeedBoostPurchased)

        Print("Shop prêt !")

    # Achat Arme 1
    OnWeapon1Purchased(Agent: agent): void =
        if (Player := player[Agent]):
            if (GameManager.RemoveCoins(Player, Weapon1Price)):
                Weapon1Granter.GrantItem(Agent)
                Print("{Player} a acheté l'arme niveau 1 !")
            else:
                Print("{Player} n'a pas assez de pièces (besoin de {Weapon1Price})")

    # Achat Arme 2
    OnWeapon2Purchased(Agent: agent): void =
        if (Player := player[Agent]):
            if (GameManager.RemoveCoins(Player, Weapon2Price)):
                Weapon2Granter.GrantItem(Agent)
                Print("{Player} a acheté l'arme niveau 2 !")
            else:
                Print("{Player} n'a pas assez de pièces (besoin de {Weapon2Price})")

    # Achat Arme 3
    OnWeapon3Purchased(Agent: agent): void =
        if (Player := player[Agent]):
            if (GameManager.RemoveCoins(Player, Weapon3Price)):
                Weapon3Granter.GrantItem(Agent)
                Print("{Player} a acheté l'arme niveau 3 !")
            else:
                Print("{Player} n'a pas assez de pièces (besoin de {Weapon3Price})")

    # Achat Double Jump
    OnDoubleJumpPurchased(Agent: agent): void =
        if (Player := player[Agent]):
            if (GameManager.RemoveCoins(Player, DoubleJumpPrice)):
                # Activer le double jump pour ce joueur
                if (FortChar := Player.GetFortCharacter[]):
                    DoubleJumpMutator.Enable()
                    Print("{Player} a acheté le Double Jump !")
            else:
                Print("{Player} n'a pas assez de pièces (besoin de {DoubleJumpPrice})")

    # Achat Speed Boost
    OnSpeedBoostPurchased(Agent: agent): void =
        if (Player := player[Agent]):
            if (GameManager.RemoveCoins(Player, SpeedBoostPrice)):
                # Activer le speed boost pour ce joueur
                SpeedBoostMutator.Enable()
                Print("{Player} a acheté le Speed Boost !")
            else:
                Print("{Player} n'a pas assez de pièces (besoin de {SpeedBoostPrice})")
