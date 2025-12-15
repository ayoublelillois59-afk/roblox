--[[
	MINE SIMULATOR - CLIENT PRINCIPAL
	Script à placer dans StarterPlayer > StarterPlayerScripts
	Nom: ClientMain (DOIT être un LocalScript!)

	Ce script gère toute l'interface utilisateur
]]

print("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
print("🎮 CLIENT - DÉMARRAGE")
print("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")

local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local TweenService = game:GetService("TweenService")
local UserInputService = game:GetService("UserInputService")

local player = Players.LocalPlayer
local mouse = player:GetMouse()

print("👤 Joueur:", player.Name)

-- ═══════════════════════════════════════════════════════════
-- ATTENTE DES REMOTE EVENTS
-- ═══════════════════════════════════════════════════════════

print("⏳ Attente des Remote Events...")
task.wait(3) -- Attendre que le serveur soit prêt

local remoteFolder = ReplicatedStorage:WaitForChild("RemoteEvents", 10)
if not remoteFolder then
	warn("❌ ERREUR: Dossier RemoteEvents introuvable!")
	warn("❌ Vérifiez que MainServer est dans ServerScriptService")
	return
end

print("✅ Remote Events trouvés!")

-- Remote Events
local startMineEvent = remoteFolder:WaitForChild("StartMine", 5)
local stopMineEvent = remoteFolder:WaitForChild("StopMine", 5)
local sellEvent = remoteFolder:WaitForChild("Sell", 5)
local buyPickaxeEvent = remoteFolder:WaitForChild("BuyPickaxe", 5)
local equipPickaxeEvent = remoteFolder:WaitForChild("EquipPickaxe", 5)

-- Remote Functions
local getOwnedPickaxesFunc = remoteFolder:WaitForChild("GetOwnedPickaxes", 5)
local getShopPickaxesFunc = remoteFolder:WaitForChild("GetShopPickaxes", 5)
local getQuestsFunc = remoteFolder:WaitForChild("GetQuests", 5)

-- Quest Events
local questCompleteEvent = remoteFolder:WaitForChild("QuestComplete", 5)

if not startMineEvent or not sellEvent then
	warn("❌ ERREUR: Certains Remote Events sont manquants!")
	return
end

print("✅ Tous les Remote Events connectés!")

-- ═══════════════════════════════════════════════════════════
-- VARIABLES GLOBALES
-- ═══════════════════════════════════════════════════════════

local currentBlock = nil
local isMining = false

-- ═══════════════════════════════════════════════════════════
-- CRÉATION DE L'INTERFACE
-- ═══════════════════════════════════════════════════════════

print("🎨 Création de l'interface...")

local screenGui = Instance.new("ScreenGui")
screenGui.Name = "MineSimulatorGUI"
screenGui.ResetOnSpawn = false
screenGui.ZIndexBehavior = Enum.ZIndexBehavior.Sibling
screenGui.Parent = player:WaitForChild("PlayerGui")

-- ═══════════════════════════════════════════════════════════
-- HUD ARGENT (TOP LEFT)
-- ═══════════════════════════════════════════════════════════

local moneyFrame = Instance.new("Frame")
moneyFrame.Name = "MoneyHUD"
moneyFrame.Size = UDim2.new(0, 250, 0, 80)
moneyFrame.Position = UDim2.new(0, 20, 0, 20)
moneyFrame.BackgroundColor3 = Color3.fromRGB(25, 25, 35)
moneyFrame.BorderSizePixel = 0
moneyFrame.Parent = screenGui

local moneyCorner = Instance.new("UICorner")
moneyCorner.CornerRadius = UDim.new(0, 12)
moneyCorner.Parent = moneyFrame

local moneyStroke = Instance.new("UIStroke")
moneyStroke.Color = Color3.fromRGB(255, 215, 0)
moneyStroke.Thickness = 3
moneyStroke.Parent = moneyFrame

local moneyIcon = Instance.new("TextLabel")
moneyIcon.Size = UDim2.new(0, 60, 0, 60)
moneyIcon.Position = UDim2.new(0, 10, 0.5, -30)
moneyIcon.BackgroundTransparency = 1
moneyIcon.Text = "💰"
moneyIcon.TextSize = 40
moneyIcon.Parent = moneyFrame

local moneyLabel = Instance.new("TextLabel")
moneyLabel.Name = "MoneyLabel"
moneyLabel.Size = UDim2.new(1, -80, 1, 0)
moneyLabel.Position = UDim2.new(0, 75, 0, 0)
moneyFrame.BackgroundTransparency = 1
moneyLabel.Text = "0 $"
moneyLabel.TextColor3 = Color3.fromRGB(255, 215, 0)
moneyLabel.Font = Enum.Font.SourceSansBold
moneyLabel.TextSize = 28
moneyLabel.TextXAlignment = Enum.TextXAlignment.Left
moneyLabel.Parent = moneyFrame

-- ═══════════════════════════════════════════════════════════
-- INVENTAIRE PIOCHES (BOTTOM CENTER)
-- ═══════════════════════════════════════════════════════════

local inventoryFrame = Instance.new("Frame")
inventoryFrame.Name = "InventoryFrame"
inventoryFrame.Size = UDim2.new(0, 450, 0, 100)
inventoryFrame.Position = UDim2.new(0.5, -225, 1, -120)
inventoryFrame.BackgroundColor3 = Color3.fromRGB(25, 25, 35)
inventoryFrame.BorderSizePixel = 0
inventoryFrame.Parent = screenGui

local invCorner = Instance.new("UICorner")
invCorner.CornerRadius = UDim.new(0, 12)
invCorner.Parent = inventoryFrame

local invStroke = Instance.new("UIStroke")
invStroke.Color = Color3.fromRGB(100, 150, 255)
invStroke.Thickness = 3
invStroke.Parent = inventoryFrame

local invLayout = Instance.new("UIListLayout")
invLayout.FillDirection = Enum.FillDirection.Horizontal
invLayout.HorizontalAlignment = Enum.HorizontalAlignment.Center
invLayout.VerticalAlignment = Enum.VerticalAlignment.Center
invLayout.Padding = UDim.new(0, 10)
invLayout.Parent = inventoryFrame

-- Créer 5 slots
local pickaxeSlots = {}

for i = 1, 5 do
	local slot = Instance.new("TextButton")
	slot.Name = "Slot" .. i
	slot.Size = UDim2.new(0, 80, 0, 80)
	slot.BackgroundColor3 = Color3.fromRGB(40, 40, 50)
	slot.Text = ""
	slot.BorderSizePixel = 0
	slot.Parent = inventoryFrame

	local slotCorner = Instance.new("UICorner")
	slotCorner.CornerRadius = UDim.new(0, 10)
	slotCorner.Parent = slot

	local slotStroke = Instance.new("UIStroke")
	slotStroke.Color = Color3.fromRGB(80, 80, 90)
	slotStroke.Thickness = 2
	slotStroke.Parent = slot

	local icon = Instance.new("TextLabel")
	icon.Name = "Icon"
	icon.Size = UDim2.new(1, 0, 0.7, 0)
	icon.BackgroundTransparency = 1
	icon.Text = "?"
	icon.TextSize = 35
	icon.TextColor3 = Color3.fromRGB(150, 150, 150)
	icon.Parent = slot

	local nameLabel = Instance.new("TextLabel")
	nameLabel.Name = "NameLabel"
	nameLabel.Size = UDim2.new(1, 0, 0.3, 0)
	nameLabel.Position = UDim2.new(0, 0, 0.7, 0)
	nameLabel.BackgroundTransparency = 1
	nameLabel.Text = ""
	nameLabel.TextSize = 12
	nameLabel.TextColor3 = Color3.fromRGB(200, 200, 200)
	nameLabel.Font = Enum.Font.SourceSansBold
	nameLabel.Parent = slot

	table.insert(pickaxeSlots, {
		button = slot,
		icon = icon,
		nameLabel = nameLabel,
		pickaxeId = nil,
		stroke = slotStroke
	})
end

-- ═══════════════════════════════════════════════════════════
-- BOUTON VENDRE (BOTTOM RIGHT)
-- ═══════════════════════════════════════════════════════════

local sellButton = Instance.new("TextButton")
sellButton.Name = "SellButton"
sellButton.Size = UDim2.new(0, 180, 0, 60)
sellButton.Position = UDim2.new(1, -200, 1, -80)
sellButton.Text = "💰 VENDRE"
sellButton.BackgroundColor3 = Color3.fromRGB(0, 180, 0)
sellButton.TextColor3 = Color3.fromRGB(255, 255, 255)
sellButton.Font = Enum.Font.SourceSansBold
sellButton.TextSize = 24
sellButton.BorderSizePixel = 0
sellButton.Parent = screenGui

local sellCorner = Instance.new("UICorner")
sellCorner.CornerRadius = UDim.new(0, 12)
sellCorner.Parent = sellButton

local sellStroke = Instance.new("UIStroke")
sellStroke.Color = Color3.fromRGB(0, 255, 100)
sellStroke.Thickness = 3
sellStroke.Parent = sellButton

-- ═══════════════════════════════════════════════════════════
-- BOUTON SHOP (AU-DESSUS DE VENDRE)
-- ═══════════════════════════════════════════════════════════

local shopButton = Instance.new("TextButton")
shopButton.Name = "ShopButton"
shopButton.Size = UDim2.new(0, 180, 0, 60)
shopButton.Position = UDim2.new(1, -200, 1, -150)
shopButton.Text = "🛒 SHOP"
shopButton.BackgroundColor3 = Color3.fromRGB(100, 100, 255)
shopButton.TextColor3 = Color3.fromRGB(255, 255, 255)
shopButton.Font = Enum.Font.SourceSansBold
shopButton.TextSize = 24
shopButton.BorderSizePixel = 0
shopButton.Parent = screenGui

local shopCorner = Instance.new("UICorner")
shopCorner.CornerRadius = UDim.new(0, 12)
shopCorner.Parent = shopButton

local shopStroke = Instance.new("UIStroke")
shopStroke.Color = Color3.fromRGB(150, 150, 255)
shopStroke.Thickness = 3
shopStroke.Parent = shopButton

-- ═══════════════════════════════════════════════════════════
-- BOUTON QUÊTES (TOP RIGHT)
-- ═══════════════════════════════════════════════════════════

local questButton = Instance.new("TextButton")
questButton.Name = "QuestButton"
questButton.Size = UDim2.new(0, 180, 0, 70)
questButton.Position = UDim2.new(1, -200, 0, 20)
questButton.Text = "📋 QUÊTES"
questButton.BackgroundColor3 = Color3.fromRGB(255, 140, 0)
questButton.TextColor3 = Color3.fromRGB(255, 255, 255)
questButton.Font = Enum.Font.SourceSansBold
questButton.TextSize = 24
questButton.BorderSizePixel = 0
questButton.Parent = screenGui

local questCorner = Instance.new("UICorner")
questCorner.CornerRadius = UDim.new(0, 12)
questCorner.Parent = questButton

local questStroke = Instance.new("UIStroke")
questStroke.Color = Color3.fromRGB(255, 200, 100)
questStroke.Thickness = 3
questStroke.Parent = questButton

-- ═══════════════════════════════════════════════════════════
-- FRAME SHOP (CACHÉE PAR DÉFAUT)
-- ═══════════════════════════════════════════════════════════

local shopFrame = Instance.new("Frame")
shopFrame.Name = "ShopFrame"
shopFrame.Size = UDim2.new(0, 600, 0, 500)
shopFrame.Position = UDim2.new(0.5, -300, 0.5, -250)
shopFrame.BackgroundColor3 = Color3.fromRGB(30, 30, 40)
shopFrame.Visible = false
shopFrame.BorderSizePixel = 0
shopFrame.ZIndex = 10
shopFrame.Parent = screenGui

local shopFrameCorner = Instance.new("UICorner")
shopFrameCorner.CornerRadius = UDim.new(0, 15)
shopFrameCorner.Parent = shopFrame

local shopFrameStroke = Instance.new("UIStroke")
shopFrameStroke.Color = Color3.fromRGB(100, 100, 255)
shopFrameStroke.Thickness = 4
shopFrameStroke.Parent = shopFrame

local shopTitle = Instance.new("TextLabel")
shopTitle.Size = UDim2.new(1, 0, 0, 70)
shopTitle.BackgroundColor3 = Color3.fromRGB(20, 20, 30)
shopTitle.Text = "🛒 BOUTIQUE DE PIOCHES"
shopTitle.TextColor3 = Color3.fromRGB(255, 255, 255)
shopTitle.Font = Enum.Font.SourceSansBold
shopTitle.TextSize = 28
shopTitle.BorderSizePixel = 0
shopTitle.ZIndex = 11
shopTitle.Parent = shopFrame

local shopTitleCorner = Instance.new("UICorner")
shopTitleCorner.CornerRadius = UDim.new(0, 15)
shopTitleCorner.Parent = shopTitle

local closeShopButton = Instance.new("TextButton")
closeShopButton.Size = UDim2.new(0, 50, 0, 50)
closeShopButton.Position = UDim2.new(1, -60, 0, 10)
closeShopButton.Text = "✖"
closeShopButton.BackgroundColor3 = Color3.fromRGB(200, 0, 0)
closeShopButton.TextColor3 = Color3.fromRGB(255, 255, 255)
closeShopButton.Font = Enum.Font.SourceSansBold
closeShopButton.TextSize = 28
closeShopButton.BorderSizePixel = 0
closeShopButton.ZIndex = 12
closeShopButton.Parent = shopFrame

local closeShopCorner = Instance.new("UICorner")
closeShopCorner.CornerRadius = UDim.new(0, 10)
closeShopCorner.Parent = closeShopButton

local shopList = Instance.new("ScrollingFrame")
shopList.Name = "ShopList"
shopList.Size = UDim2.new(1, -20, 1, -90)
shopList.Position = UDim2.new(0, 10, 0, 80)
shopList.BackgroundTransparency = 1
shopList.BorderSizePixel = 0
shopList.ScrollBarThickness = 10
shopList.ZIndex = 11
shopList.Parent = shopFrame

local shopListLayout = Instance.new("UIListLayout")
shopListLayout.Padding = UDim.new(0, 10)
shopListLayout.SortOrder = Enum.SortOrder.LayoutOrder
shopListLayout.Parent = shopList

-- ═══════════════════════════════════════════════════════════
-- FRAME QUÊTES (CACHÉE PAR DÉFAUT)
-- ═══════════════════════════════════════════════════════════

local questFrame = Instance.new("Frame")
questFrame.Name = "QuestFrame"
questFrame.Size = UDim2.new(0, 650, 0, 550)
questFrame.Position = UDim2.new(0.5, -325, 0.5, -275)
questFrame.BackgroundColor3 = Color3.fromRGB(30, 30, 40)
questFrame.Visible = false
questFrame.BorderSizePixel = 0
questFrame.ZIndex = 20
questFrame.Parent = screenGui

local questFrameCorner = Instance.new("UICorner")
questFrameCorner.CornerRadius = UDim.new(0, 15)
questFrameCorner.Parent = questFrame

local questFrameStroke = Instance.new("UIStroke")
questFrameStroke.Color = Color3.fromRGB(255, 140, 0)
questFrameStroke.Thickness = 4
questFrameStroke.Parent = questFrame

local questTitle = Instance.new("TextLabel")
questTitle.Size = UDim2.new(1, 0, 0, 70)
questTitle.BackgroundColor3 = Color3.fromRGB(20, 20, 30)
questTitle.Text = "📋 QUÊTES QUOTIDIENNES"
questTitle.TextColor3 = Color3.fromRGB(255, 200, 100)
questTitle.Font = Enum.Font.SourceSansBold
questTitle.TextSize = 28
questTitle.BorderSizePixel = 0
questTitle.ZIndex = 21
questTitle.Parent = questFrame

local questTitleCorner = Instance.new("UICorner")
questTitleCorner.CornerRadius = UDim.new(0, 15)
questTitleCorner.Parent = questTitle

local closeQuestButton = Instance.new("TextButton")
closeQuestButton.Size = UDim2.new(0, 50, 0, 50)
closeQuestButton.Position = UDim2.new(1, -60, 0, 10)
closeQuestButton.Text = "✖"
closeQuestButton.BackgroundColor3 = Color3.fromRGB(200, 0, 0)
closeQuestButton.TextColor3 = Color3.fromRGB(255, 255, 255)
closeQuestButton.Font = Enum.Font.SourceSansBold
closeQuestButton.TextSize = 28
closeQuestButton.BorderSizePixel = 0
closeQuestButton.ZIndex = 22
closeQuestButton.Parent = questFrame

local closeQuestCorner = Instance.new("UICorner")
closeQuestCorner.CornerRadius = UDim.new(0, 10)
closeQuestCorner.Parent = closeQuestButton

local questList = Instance.new("ScrollingFrame")
questList.Name = "QuestList"
questList.Size = UDim2.new(1, -20, 1, -90)
questList.Position = UDim2.new(0, 10, 0, 80)
questList.BackgroundTransparency = 1
questList.BorderSizePixel = 0
questList.ScrollBarThickness = 10
questList.ZIndex = 21
questList.Parent = questFrame

local questListLayout = Instance.new("UIListLayout")
questListLayout.Padding = UDim.new(0, 10)
questListLayout.SortOrder = Enum.SortOrder.LayoutOrder
questListLayout.Parent = questList

print("✅ Interface créée!")

-- ═══════════════════════════════════════════════════════════
-- FONCTIONS D'ANIMATION
-- ═══════════════════════════════════════════════════════════

local function animateButton(button, hoverSize, normalSize)
	button.MouseEnter:Connect(function()
		TweenService:Create(button, TweenInfo.new(0.2, Enum.EasingStyle.Quad), {
			Size = hoverSize
		}):Play()
	end)

	button.MouseLeave:Connect(function()
		TweenService:Create(button, TweenInfo.new(0.2, Enum.EasingStyle.Quad), {
			Size = normalSize
		}):Play()
	end)
end

animateButton(sellButton, UDim2.new(0, 190, 0, 65), UDim2.new(0, 180, 0, 60))
animateButton(shopButton, UDim2.new(0, 190, 0, 65), UDim2.new(0, 180, 0, 60))
animateButton(questButton, UDim2.new(0, 190, 0, 75), UDim2.new(0, 180, 0, 70))

-- ═══════════════════════════════════════════════════════════
-- SYSTÈME DE MISE À JOUR DE L'ARGENT
-- ═══════════════════════════════════════════════════════════

local function updateMoney()
	local leaderstats = player:FindFirstChild("leaderstats")
	if leaderstats then
		local money = leaderstats:FindFirstChild("Money")
		if money then
			moneyLabel.Text = tostring(money.Value) .. " $"

			-- Animation
			TweenService:Create(moneyLabel, TweenInfo.new(0.2, Enum.EasingStyle.Elastic), {
				TextSize = 32
			}):Play()

			task.wait(0.2)

			TweenService:Create(moneyLabel, TweenInfo.new(0.2), {
				TextSize = 28
			}):Play()
		end
	end
end

-- Observer changement d'argent
player:WaitForChild("leaderstats"):WaitForChild("Money").Changed:Connect(updateMoney)
updateMoney()

-- ═══════════════════════════════════════════════════════════
-- SYSTÈME D'INVENTAIRE
-- ═══════════════════════════════════════════════════════════

local function updateInventory()
	if not getOwnedPickaxesFunc then return end

	local success, ownedPickaxes = pcall(function()
		return getOwnedPickaxesFunc:InvokeServer()
	end)

	if not success then
		warn("❌ Erreur lors de la récupération de l'inventaire")
		return
	end

	-- Mettre à jour les slots
	for i, slot in ipairs(pickaxeSlots) do
		if ownedPickaxes[i] then
			local pickaxe = ownedPickaxes[i]
			slot.pickaxeId = pickaxe.id
			slot.icon.Text = pickaxe.icon
			slot.nameLabel.Text = pickaxe.name:gsub("Pioche ", ""):gsub(" en ", " "):gsub("'", "")

			if pickaxe.isCurrent then
				slot.button.BackgroundColor3 = Color3.fromRGB(50, 150, 255)
				slot.stroke.Color = Color3.fromRGB(100, 200, 255)
				slot.stroke.Thickness = 4
			else
				slot.button.BackgroundColor3 = Color3.fromRGB(60, 60, 70)
				slot.stroke.Color = Color3.fromRGB(100, 100, 110)
				slot.stroke.Thickness = 2
			end

			slot.icon.TextColor3 = Color3.fromRGB(255, 255, 255)
		else
			slot.pickaxeId = nil
			slot.icon.Text = "?"
			slot.nameLabel.Text = ""
			slot.button.BackgroundColor3 = Color3.fromRGB(40, 40, 50)
			slot.stroke.Color = Color3.fromRGB(80, 80, 90)
			slot.stroke.Thickness = 2
			slot.icon.TextColor3 = Color3.fromRGB(150, 150, 150)
		end
	end
end

-- Connexion des slots
for _, slot in ipairs(pickaxeSlots) do
	slot.button.MouseButton1Click:Connect(function()
		if slot.pickaxeId and equipPickaxeEvent then
			equipPickaxeEvent:FireServer(slot.pickaxeId)
		end
	end)
end

-- Écouter les événements d'équipement
if equipPickaxeEvent then
	equipPickaxeEvent.OnClientEvent:Connect(function(success)
		if success then
			task.wait(0.2)
			updateInventory()
		end
	end)
end

-- ═══════════════════════════════════════════════════════════
-- SYSTÈME DE BOUTIQUE
-- ═══════════════════════════════════════════════════════════

local function refreshShop()
	-- Nettoyer la liste
	for _, child in ipairs(shopList:GetChildren()) do
		if child:IsA("Frame") or child:IsA("TextButton") then
			child:Destroy()
		end
	end

	if not getShopPickaxesFunc then return end

	local success, pickaxes = pcall(function()
		return getShopPickaxesFunc:InvokeServer()
	end)

	if not success then
		warn("❌ Erreur lors de la récupération de la boutique")
		return
	end

	-- Créer les items
	for index, pickaxe in ipairs(pickaxes) do
		local item = Instance.new("TextButton")
		item.Name = "Item_" .. pickaxe.id
		item.Size = UDim2.new(1, -20, 0, 100)
		item.BackgroundColor3 = pickaxe.owned and Color3.fromRGB(40, 80, 40) or Color3.fromRGB(50, 50, 60)
		item.Text = ""
		item.BorderSizePixel = 0
		item.ZIndex = 12
		item.LayoutOrder = index
		item.Parent = shopList

		local itemCorner = Instance.new("UICorner")
		itemCorner.CornerRadius = UDim.new(0, 10)
		itemCorner.Parent = item

		local itemIcon = Instance.new("TextLabel")
		itemIcon.Size = UDim2.new(0, 70, 0, 70)
		itemIcon.Position = UDim2.new(0, 15, 0.5, -35)
		itemIcon.BackgroundTransparency = 1
		itemIcon.Text = pickaxe.icon
		itemIcon.TextSize = 45
		itemIcon.ZIndex = 13
		itemIcon.Parent = item

		local itemName = Instance.new("TextLabel")
		itemName.Size = UDim2.new(1, -100, 0, 30)
		itemName.Position = UDim2.new(0, 95, 0, 10)
		itemName.BackgroundTransparency = 1
		itemName.Text = pickaxe.name
		itemName.TextColor3 = Color3.fromRGB(255, 255, 255)
		itemName.Font = Enum.Font.SourceSansBold
		itemName.TextSize = 20
		itemName.TextXAlignment = Enum.TextXAlignment.Left
		itemName.ZIndex = 13
		itemName.Parent = item

		local itemDesc = Instance.new("TextLabel")
		itemDesc.Size = UDim2.new(1, -100, 0, 20)
		itemDesc.Position = UDim2.new(0, 95, 0, 42)
		itemDesc.BackgroundTransparency = 1
		itemDesc.Text = pickaxe.description
		itemDesc.TextColor3 = Color3.fromRGB(200, 200, 200)
		itemDesc.Font = Enum.Font.SourceSans
		itemDesc.TextSize = 16
		itemDesc.TextXAlignment = Enum.TextXAlignment.Left
		itemDesc.ZIndex = 13
		itemDesc.Parent = item

		local itemPrice = Instance.new("TextLabel")
		itemPrice.Size = UDim2.new(1, -100, 0, 28)
		itemPrice.Position = UDim2.new(0, 95, 0, 65)
		itemPrice.BackgroundTransparency = 1
		itemPrice.Text = pickaxe.owned and "✅ POSSÉDÉE" or ("💰 " .. tostring(pickaxe.price) .. " $")
		itemPrice.TextColor3 = pickaxe.owned and Color3.fromRGB(100, 255, 100) or Color3.fromRGB(255, 215, 0)
		itemPrice.Font = Enum.Font.SourceSansBold
		itemPrice.TextSize = 22
		itemPrice.TextXAlignment = Enum.TextXAlignment.Left
		itemPrice.ZIndex = 13
		itemPrice.Parent = item

		-- Acheter
		if not pickaxe.owned then
			item.MouseButton1Click:Connect(function()
				if buyPickaxeEvent then
					buyPickaxeEvent:FireServer(pickaxe.id)
				end
			end)
		end
	end

	-- Mettre à jour canvas size
	task.wait()
	shopList.CanvasSize = UDim2.new(0, 0, 0, shopListLayout.AbsoluteContentSize.Y + 10)
end

-- Écouter achat
if buyPickaxeEvent then
	buyPickaxeEvent.OnClientEvent:Connect(function(success, message)
		if success then
			task.wait(0.3)
			refreshShop()
			updateInventory()
		else
			warn("❌ Achat échoué:", message)
		end
	end)
end

-- ═══════════════════════════════════════════════════════════
-- SYSTÈME DE QUÊTES
-- ═══════════════════════════════════════════════════════════

local function createQuestCard(quest, index)
	local isLegendary = quest.difficulty == "legendary"

	local card = Instance.new("Frame")
	card.Name = "Quest_" .. quest.id
	card.Size = UDim2.new(1, -20, 0, isLegendary and 160 or 130)
	card.BackgroundColor3 = isLegendary and Color3.fromRGB(100, 0, 150) or Color3.fromRGB(50, 50, 60)
	card.BorderSizePixel = 0
	card.ZIndex = 22
	card.LayoutOrder = index
	card.Parent = questList

	local cardCorner = Instance.new("UICorner")
	cardCorner.CornerRadius = UDim.new(0, 10)
	cardCorner.Parent = card

	local cardStroke = Instance.new("UIStroke")
	cardStroke.Color = isLegendary and Color3.fromRGB(200, 100, 255) or Color3.fromRGB(100, 150, 255)
	cardStroke.Thickness = 3
	cardStroke.Parent = card

	-- Icon
	local icon = Instance.new("TextLabel")
	icon.Size = UDim2.new(0, 70, 0, 70)
	icon.Position = UDim2.new(0, 15, 0, 15)
	icon.BackgroundTransparency = 1
	icon.Text = quest.icon
	icon.TextSize = 50
	icon.ZIndex = 23
	icon.Parent = card

	-- Nom
	local nameLabel = Instance.new("TextLabel")
	nameLabel.Size = UDim2.new(1, -110, 0, 30)
	nameLabel.Position = UDim2.new(0, 95, 0, 10)
	nameLabel.BackgroundTransparency = 1
	nameLabel.Text = quest.name
	nameLabel.TextColor3 = isLegendary and Color3.fromRGB(255, 200, 255) or Color3.fromRGB(255, 255, 255)
	nameLabel.Font = Enum.Font.SourceSansBold
	nameLabel.TextSize = 20
	nameLabel.TextXAlignment = Enum.TextXAlignment.Left
	nameLabel.ZIndex = 23
	nameLabel.Parent = card

	-- Description
	local descLabel = Instance.new("TextLabel")
	descLabel.Size = UDim2.new(1, -110, 0, 20)
	descLabel.Position = UDim2.new(0, 95, 0, 42)
	descLabel.BackgroundTransparency = 1
	descLabel.Text = quest.description
	descLabel.TextColor3 = Color3.fromRGB(200, 200, 200)
	descLabel.Font = Enum.Font.SourceSans
	descLabel.TextSize = 16
	descLabel.TextXAlignment = Enum.TextXAlignment.Left
	descLabel.ZIndex = 23
	descLabel.Parent = card

	-- Barre(s) de progression
	local currentY = 67

	for i, prog in ipairs(quest.progress) do
		local progressBg = Instance.new("Frame")
		progressBg.Size = UDim2.new(1, -110, 0, 20)
		progressBg.Position = UDim2.new(0, 95, 0, currentY)
		progressBg.BackgroundColor3 = Color3.fromRGB(30, 30, 40)
		progressBg.BorderSizePixel = 0
		progressBg.ZIndex = 23
		progressBg.Parent = card

		local progressCorner = Instance.new("UICorner")
		progressCorner.CornerRadius = UDim.new(0.5, 0)
		progressCorner.Parent = progressBg

		local progressBar = Instance.new("Frame")
		progressBar.Size = UDim2.new(math.min(prog.current / prog.target, 1), 0, 1, 0)
		progressBar.BackgroundColor3 = isLegendary and Color3.fromRGB(255, 100, 255) or Color3.fromRGB(100, 200, 255)
		progressBar.BorderSizePixel = 0
		progressBar.ZIndex = 24
		progressBar.Parent = progressBg

		local progressBarCorner = Instance.new("UICorner")
		progressBarCorner.CornerRadius = UDim.new(0.5, 0)
		progressBarCorner.Parent = progressBar

		local progressText = Instance.new("TextLabel")
		progressText.Size = UDim2.new(1, 0, 1, 0)
		progressText.BackgroundTransparency = 1
		progressText.Text = string.format("%d / %d", prog.current, prog.target)
		progressText.TextColor3 = Color3.fromRGB(255, 255, 255)
		progressText.Font = Enum.Font.SourceSansBold
		progressText.TextSize = 14
		progressText.ZIndex = 25
		progressText.Parent = progressBg

		currentY = currentY + 25
	end

	-- Récompense
	local rewardLabel = Instance.new("TextLabel")
	rewardLabel.Size = UDim2.new(1, -110, 0, 25)
	rewardLabel.Position = UDim2.new(0, 95, 1, -30)
	rewardLabel.BackgroundTransparency = 1
	rewardLabel.Text = "🎁 " .. tostring(quest.reward) .. " $"
	rewardLabel.TextColor3 = Color3.fromRGB(255, 215, 0)
	rewardLabel.Font = Enum.Font.SourceSansBold
	rewardLabel.TextSize = 20
	rewardLabel.TextXAlignment = Enum.TextXAlignment.Left
	rewardLabel.ZIndex = 23
	rewardLabel.Parent = card

	-- Badge complété
	if quest.completed then
		local completeBadge = Instance.new("TextLabel")
		completeBadge.Size = UDim2.new(0, 100, 0, 30)
		completeBadge.Position = UDim2.new(1, -110, 0, 10)
		completeBadge.BackgroundColor3 = Color3.fromRGB(0, 200, 0)
		completeBadge.Text = "✅ COMPLÉTÉ"
		completeBadge.TextColor3 = Color3.fromRGB(255, 255, 255)
		completeBadge.Font = Enum.Font.SourceSansBold
		completeBadge.TextSize = 14
		completeBadge.BorderSizePixel = 0
		completeBadge.ZIndex = 26
		completeBadge.Rotation = 15
		completeBadge.Parent = card

		local badgeCorner = Instance.new("UICorner")
		badgeCorner.CornerRadius = UDim.new(0, 8)
		badgeCorner.Parent = completeBadge
	end

	return card
end

local function refreshQuests()
	-- Nettoyer
	for _, child in ipairs(questList:GetChildren()) do
		if child:IsA("Frame") then
			child:Destroy()
		end
	end

	if not getQuestsFunc then return end

	local success, quests = pcall(function()
		return getQuestsFunc:InvokeServer()
	end)

	if not success then
		warn("❌ Erreur lors de la récupération des quêtes")
		return
	end

	-- Créer cartes
	for index, quest in ipairs(quests) do
		createQuestCard(quest, index)
	end

	-- Canvas size
	task.wait()
	questList.CanvasSize = UDim2.new(0, 0, 0, questListLayout.AbsoluteContentSize.Y + 10)
end

-- Notification quest complétée
if questCompleteEvent then
	questCompleteEvent.OnClientEvent:Connect(function(quest)
		print("🎉 Quête complétée:", quest.name)

		-- Créer notification
		local notif = Instance.new("Frame")
		notif.Size = UDim2.new(0, 400, 0, 120)
		notif.Position = UDim2.new(0.5, -200, 0.3, 0)
		notif.BackgroundColor3 = quest.difficulty == "legendary" and Color3.fromRGB(150, 0, 200) or Color3.fromRGB(0, 200, 100)
		notif.BorderSizePixel = 0
		notif.ZIndex = 100
		notif.Parent = screenGui

		local notifCorner = Instance.new("UICorner")
		notifCorner.CornerRadius = UDim.new(0, 15)
		notifCorner.Parent = notif

		local notifText = Instance.new("TextLabel")
		notifText.Size = UDim2.new(1, -20, 0, 40)
		notifText.Position = UDim2.new(0, 10, 0, 10)
		notifText.BackgroundTransparency = 1
		notifText.Text = "✅ QUÊTE COMPLÉTÉE!"
		notifText.TextColor3 = Color3.fromRGB(255, 255, 255)
		notifText.Font = Enum.Font.SourceSansBold
		notifText.TextSize = 26
		notifText.ZIndex = 101
		notifText.Parent = notif

		local notifName = Instance.new("TextLabel")
		notifName.Size = UDim2.new(1, -20, 0, 30)
		notifName.Position = UDim2.new(0, 10, 0, 50)
		notifName.BackgroundTransparency = 1
		notifName.Text = quest.icon .. " " .. quest.name
		notifName.TextColor3 = Color3.fromRGB(255, 255, 255)
		notifName.Font = Enum.Font.SourceSansBold
		notifName.TextSize = 22
		notifName.ZIndex = 101
		notifName.Parent = notif

		local notifReward = Instance.new("TextLabel")
		notifReward.Size = UDim2.new(1, -20, 0, 30)
		notifReward.Position = UDim2.new(0, 10, 0, 82)
		notifReward.BackgroundTransparency = 1
		notifReward.Text = "💰 +" .. tostring(quest.reward) .. " $"
		notifReward.TextColor3 = Color3.fromRGB(255, 215, 0)
		notifReward.Font = Enum.Font.SourceSansBold
		notifReward.TextSize = 24
		notifReward.ZIndex = 101
		notifReward.Parent = notif

		-- Animation entrée
		notif.Position = UDim2.new(0.5, -200, -0.2, 0)
		TweenService:Create(notif, TweenInfo.new(0.5, Enum.EasingStyle.Back, Enum.EasingDirection.Out), {
			Position = UDim2.new(0.5, -200, 0.3, 0)
		}):Play()

		-- Fermer après 3s
		task.wait(3)
		TweenService:Create(notif, TweenInfo.new(0.3), {
			Position = UDim2.new(0.5, -200, -0.2, 0)
		}):Play()

		task.wait(0.3)
		notif:Destroy()

		-- Rafraîchir quêtes si ouvert
		if questFrame.Visible then
			refreshQuests()
		end
	end)
end

-- ═══════════════════════════════════════════════════════════
-- CONNEXIONS DES BOUTONS
-- ═══════════════════════════════════════════════════════════

shopButton.MouseButton1Click:Connect(function()
	shopFrame.Visible = not shopFrame.Visible
	if shopFrame.Visible then
		refreshShop()
	end
end)

closeShopButton.MouseButton1Click:Connect(function()
	shopFrame.Visible = false
end)

questButton.MouseButton1Click:Connect(function()
	questFrame.Visible = not questFrame.Visible
	if questFrame.Visible then
		refreshQuests()
	end
end)

closeQuestButton.MouseButton1Click:Connect(function()
	questFrame.Visible = false
end)

sellButton.MouseButton1Click:Connect(function()
	if sellEvent then
		sellEvent:FireServer()
	end
end)

-- Notification vente
if sellEvent then
	sellEvent.OnClientEvent:Connect(function(earned)
		print("💰 Vendu pour:", earned)

		if earned > 0 then
			local notif = Instance.new("Frame")
			notif.Size = UDim2.new(0, 300, 0, 70)
			notif.Position = UDim2.new(0.5, -150, 0.4, 0)
			notif.BackgroundColor3 = Color3.fromRGB(0, 200, 0)
			notif.BorderSizePixel = 0
			notif.ZIndex = 100
			notif.Parent = screenGui

			local notifCorner = Instance.new("UICorner")
			notifCorner.CornerRadius = UDim.new(0, 12)
			notifCorner.Parent = notif

			local notifText = Instance.new("TextLabel")
			notifText.Size = UDim2.new(1, 0, 1, 0)
			notifText.BackgroundTransparency = 1
			notifText.Text = "💰 +" .. tostring(earned) .. " $"
			notifText.TextColor3 = Color3.fromRGB(255, 255, 255)
			notifText.Font = Enum.Font.SourceSansBold
			notifText.TextSize = 32
			notifText.ZIndex = 101
			notifText.Parent = notif

			-- Animation
			notif.Position = UDim2.new(0.5, -150, -0.1, 0)
			TweenService:Create(notif, TweenInfo.new(0.4, Enum.EasingStyle.Back, Enum.EasingDirection.Out), {
				Position = UDim2.new(0.5, -150, 0.4, 0)
			}):Play()

			task.wait(2)
			TweenService:Create(notif, TweenInfo.new(0.3), {
				Position = UDim2.new(0.5, -150, -0.1, 0)
			}):Play()

			task.wait(0.3)
			notif:Destroy()
		end
	end)
end

-- ═══════════════════════════════════════════════════════════
-- SYSTÈME DE MINAGE
-- ═══════════════════════════════════════════════════════════

mouse.Button1Down:Connect(function()
	local target = mouse.Target

	if target and target.Parent and target.Parent.Name == "Mine" then
		if target:FindFirstChild("MineralType") then
			currentBlock = target
			isMining = true

			if startMineEvent then
				startMineEvent:FireServer(target)
			end
		end
	end
end)

mouse.Button1Up:Connect(function()
	if isMining then
		isMining = false
		currentBlock = nil

		if stopMineEvent then
			stopMineEvent:FireServer()
		end
	end
end)

mouse.Move:Connect(function()
	if isMining and mouse.Target ~= currentBlock then
		isMining = false
		currentBlock = nil

		if stopMineEvent then
			stopMineEvent:FireServer()
		end
	end
end)

-- ═══════════════════════════════════════════════════════════
-- INITIALISATION FINALE
-- ═══════════════════════════════════════════════════════════

task.wait(1)
updateInventory()

print("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
print("✅ CLIENT PRÊT - Toutes les interfaces chargées!")
print("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
