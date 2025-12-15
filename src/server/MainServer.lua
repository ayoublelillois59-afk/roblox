--[[
	MINE SIMULATOR - SERVEUR PRINCIPAL
	Script à placer dans ServerScriptService
	Nom: MainServer

	Ce script gère:
	- Génération de la mine
	- Données des joueurs
	- Système de minage
	- Boutique de pioches
	- Système de vente
]]

print("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
print("⛏️  MINE SIMULATOR - DÉMARRAGE SERVEUR")
print("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")

local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local RunService = game:GetService("RunService")
local TweenService = game:GetService("TweenService")

-- ═══════════════════════════════════════════════════════════
-- CONFIGURATION DES MINERAIS
-- ═══════════════════════════════════════════════════════════

local MINERALS = {
	-- Surface
	{
		name = "Grass",
		displayName = "Herbe",
		icon = "🌿",
		color = Color3.fromRGB(34, 139, 34),
		value = 0,
		mineTime = 0.1,
		minDepth = -1,
		maxDepth = -1,
		rarity = 100
	},
	{
		name = "Dirt",
		displayName = "Terre",
		icon = "🟤",
		color = Color3.fromRGB(139, 90, 43),
		value = 1,
		mineTime = 0.2,
		minDepth = 0,
		maxDepth = 5,
		rarity = 100
	},
	-- Communs
	{
		name = "Stone",
		displayName = "Pierre",
		icon = "⚪",
		color = Color3.fromRGB(128, 128, 128),
		value = 3,
		mineTime = 0.5,
		minDepth = 5,
		maxDepth = 999,
		rarity = 80
	},
	{
		name = "Coal",
		displayName = "Charbon",
		icon = "⚫",
		color = Color3.fromRGB(45, 45, 45),
		value = 8,
		mineTime = 1,
		minDepth = 8,
		maxDepth = 999,
		rarity = 50
	},
	{
		name = "Copper",
		displayName = "Cuivre",
		icon = "🟠",
		color = Color3.fromRGB(184, 115, 51),
		value = 15,
		mineTime = 1.5,
		minDepth = 12,
		maxDepth = 999,
		rarity = 35
	},
	-- Peu communs
	{
		name = "Iron",
		displayName = "Fer",
		icon = "⚪",
		color = Color3.fromRGB(192, 192, 192),
		value = 25,
		mineTime = 2,
		minDepth = 18,
		maxDepth = 999,
		rarity = 25
	},
	{
		name = "Silver",
		displayName = "Argent",
		icon = "💿",
		color = Color3.fromRGB(211, 211, 211),
		value = 50,
		mineTime = 3,
		minDepth = 25,
		maxDepth = 999,
		rarity = 18
	},
	{
		name = "Gold",
		displayName = "Or",
		icon = "🟡",
		color = Color3.fromRGB(255, 215, 0),
		value = 100,
		mineTime = 4,
		minDepth = 35,
		maxDepth = 999,
		rarity = 12
	},
	-- Rares
	{
		name = "Emerald",
		displayName = "Émeraude",
		icon = "💚",
		color = Color3.fromRGB(0, 201, 87),
		value = 200,
		mineTime = 5,
		minDepth = 45,
		maxDepth = 999,
		rarity = 8
	},
	{
		name = "Ruby",
		displayName = "Rubis",
		icon = "❤️",
		color = Color3.fromRGB(224, 17, 95),
		value = 350,
		mineTime = 6,
		minDepth = 55,
		maxDepth = 999,
		rarity = 5
	},
	{
		name = "Diamond",
		displayName = "Diamant",
		icon = "💎",
		color = Color3.fromRGB(185, 242, 255),
		value = 500,
		mineTime = 8,
		minDepth = 70,
		maxDepth = 999,
		rarity = 3
	},
	-- Légendaires
	{
		name = "Obsidian",
		displayName = "Obsidienne",
		icon = "🖤",
		color = Color3.fromRGB(16, 16, 24),
		value = 1000,
		mineTime = 10,
		minDepth = 90,
		maxDepth = 999,
		rarity = 2
	},
	{
		name = "Mythril",
		displayName = "Mithril",
		icon = "🌟",
		color = Color3.fromRGB(138, 196, 255),
		value = 2500,
		mineTime = 15,
		minDepth = 120,
		maxDepth = 999,
		rarity = 1
	}
}

-- Créer un dictionnaire pour accès rapide
local MineralsByName = {}
for _, mineral in ipairs(MINERALS) do
	MineralsByName[mineral.name] = mineral
end

-- ═══════════════════════════════════════════════════════════
-- CONFIGURATION DES PIOCHES
-- ═══════════════════════════════════════════════════════════

local PICKAXES = {
	{
		id = "Wooden",
		name = "Pioche en Bois",
		icon = "🪵",
		description = "Pioche de débutant",
		price = 0,
		power = 1,
		speed = 1,
		order = 1
	},
	{
		id = "Stone",
		name = "Pioche en Pierre",
		icon = "🪨",
		description = "2x plus rapide",
		price = 150,
		power = 2,
		speed = 2,
		order = 2
	},
	{
		id = "Iron",
		name = "Pioche en Fer",
		icon = "⚪",
		description = "5x plus rapide",
		price = 800,
		power = 5,
		speed = 5,
		order = 3
	},
	{
		id = "Gold",
		name = "Pioche en Or",
		icon = "🟡",
		description = "10x plus rapide",
		price = 3500,
		power = 10,
		speed = 10,
		order = 4
	},
	{
		id = "Diamond",
		name = "Pioche en Diamant",
		icon = "💎",
		description = "20x plus rapide",
		price = 15000,
		power = 20,
		speed = 20,
		order = 5
	},
	{
		id = "Obsidian",
		name = "Pioche d'Obsidienne",
		icon = "🖤",
		description = "50x plus rapide",
		price = 75000,
		power = 50,
		speed = 50,
		order = 6
	},
	{
		id = "Mythril",
		name = "Pioche de Mithril",
		icon = "🌟",
		description = "100x plus rapide",
		price = 300000,
		power = 100,
		speed = 100,
		order = 7
	},
	{
		id = "Legendary",
		name = "Pioche Légendaire",
		icon = "👑",
		description = "INSTANTANÉ !",
		price = 1000000,
		power = 500,
		speed = 999,
		order = 8
	}
}

local PickaxesById = {}
for _, pickaxe in ipairs(PICKAXES) do
	PickaxesById[pickaxe.id] = pickaxe
end

-- ═══════════════════════════════════════════════════════════
-- GÉNÉRATION DE LA MINE
-- ═══════════════════════════════════════════════════════════

local BLOCK_SIZE = 6
local MINE_RADIUS = 30
local MAX_DEPTH = 150

local function getMineralAtDepth(depth)
	if depth == -1 then
		return MineralsByName["Grass"]
	end

	if depth <= 5 then
		if math.random(1, 100) <= 70 then
			return MineralsByName["Dirt"]
		end
	end

	-- Créer liste des minerais possibles
	local possibleMinerals = {}
	local totalWeight = 0

	for _, mineral in ipairs(MINERALS) do
		if depth >= mineral.minDepth and depth <= mineral.maxDepth then
			if mineral.name ~= "Grass" and mineral.name ~= "Dirt" then
				local weight = mineral.rarity

				-- Bonus de profondeur
				if depth >= mineral.minDepth then
					weight = weight + math.floor((depth - mineral.minDepth) / 5)
				end

				table.insert(possibleMinerals, {mineral = mineral, weight = weight})
				totalWeight = totalWeight + weight
			end
		end
	end

	if #possibleMinerals == 0 then
		return MineralsByName["Stone"]
	end

	-- Sélection aléatoire pondérée
	local random = math.random(1, totalWeight)
	local currentWeight = 0

	for _, entry in ipairs(possibleMinerals) do
		currentWeight = currentWeight + entry.weight
		if random <= currentWeight then
			return entry.mineral
		end
	end

	return MineralsByName["Stone"]
end

local function createMineBlock(x, y, z, mineral)
	local block = Instance.new("Part")
	block.Size = Vector3.new(BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE)
	block.Position = Vector3.new(x * BLOCK_SIZE, y * BLOCK_SIZE, z * BLOCK_SIZE)
	block.Anchored = true
	block.Color = mineral.color
	block.Material = Enum.Material.SmoothPlastic
	block.Name = mineral.name

	-- Tags
	local mineralTag = Instance.new("StringValue")
	mineralTag.Name = "MineralType"
	mineralTag.Value = mineral.name
	mineralTag.Parent = block

	local depthTag = Instance.new("IntValue")
	depthTag.Name = "Depth"
	depthTag.Value = math.abs(y)
	depthTag.Parent = block

	return block
end

local function generateMine()
	print("🌍 Génération de la mine...")

	local mineFolder = Instance.new("Folder")
	mineFolder.Name = "Mine"
	mineFolder.Parent = workspace

	local blocksCreated = 0
	local startTime = tick()

	-- Générer par couches
	for depth = -1, MAX_DEPTH do
		local yPos = -depth

		for x = -MINE_RADIUS, MINE_RADIUS do
			for z = -MINE_RADIUS, MINE_RADIUS do
				local distance = math.sqrt(x*x + z*z)

				-- Forme circulaire
				if distance <= MINE_RADIUS then
					local mineral = getMineralAtDepth(depth)
					local block = createMineBlock(x, yPos, z, mineral)
					block.Parent = mineFolder

					blocksCreated = blocksCreated + 1

					-- Yield tous les 100 blocs pour éviter timeout
					if blocksCreated % 100 == 0 then
						task.wait()
					end
				end
			end
		end

		print(string.format("  Couche %d/%d générée", depth + 1, MAX_DEPTH + 1))
	end

	local elapsed = tick() - startTime
	print(string.format("✅ Mine générée: %d blocs en %.2fs", blocksCreated, elapsed))

	return mineFolder
end

-- ═══════════════════════════════════════════════════════════
-- SYSTÈME DE DONNÉES JOUEUR
-- ═══════════════════════════════════════════════════════════

local function setupPlayerData(player)
	print("👤 Configuration des données pour: " .. player.Name)

	-- Leaderstats
	local leaderstats = Instance.new("Folder")
	leaderstats.Name = "leaderstats"
	leaderstats.Parent = player

	local money = Instance.new("IntValue")
	money.Name = "Money"
	money.Value = 0
	money.Parent = leaderstats

	-- Inventaire des minerais
	local inventory = Instance.new("Folder")
	inventory.Name = "Inventory"
	inventory.Parent = player

	for _, mineral in ipairs(MINERALS) do
		local amount = Instance.new("IntValue")
		amount.Name = mineral.name
		amount.Value = 0
		amount.Parent = inventory
	end

	-- Pioche actuelle
	local currentPickaxe = Instance.new("StringValue")
	currentPickaxe.Name = "CurrentPickaxe"
	currentPickaxe.Value = "Wooden"
	currentPickaxe.Parent = player

	-- Pioches possédées
	local ownedPickaxes = Instance.new("Folder")
	ownedPickaxes.Name = "OwnedPickaxes"
	ownedPickaxes.Parent = player

	local woodenOwned = Instance.new("BoolValue")
	woodenOwned.Name = "Wooden"
	woodenOwned.Value = true
	woodenOwned.Parent = ownedPickaxes

	print("✅ Données créées pour: " .. player.Name)
end

-- ═══════════════════════════════════════════════════════════
-- SYSTÈME DE MINAGE
-- ═══════════════════════════════════════════════════════════

local activeMining = {} -- [userId] = {block, startTime, duration, mineral}

local function startMining(player, block)
	-- Vérifications
	if not block then return end
	if not block:FindFirstChild("MineralType") then return end
	if activeMining[player.UserId] then return end

	local mineralName = block.MineralType.Value
	local mineral = MineralsByName[mineralName]
	if not mineral then return end

	local pickaxeId = player.CurrentPickaxe.Value
	local pickaxe = PickaxesById[pickaxeId]
	if not pickaxe then return end

	-- Calculer temps de minage
	local miningTime = mineral.mineTime / pickaxe.speed

	-- Sauvegarder état
	activeMining[player.UserId] = {
		block = block,
		startTime = tick(),
		duration = miningTime,
		mineral = mineral,
		pickaxe = pickaxe
	}

	-- Créer barre de progression
	local billboard = Instance.new("BillboardGui")
	billboard.Name = "MiningProgress"
	billboard.Size = UDim2.new(5, 0, 1, 0)
	billboard.StudsOffset = Vector3.new(0, 4, 0)
	billboard.AlwaysOnTop = true
	billboard.Parent = block

	local background = Instance.new("Frame")
	background.Size = UDim2.new(1, 0, 0.15, 0)
	background.Position = UDim2.new(0, 0, 0.4, 0)
	background.BackgroundColor3 = Color3.fromRGB(40, 40, 40)
	background.BorderSizePixel = 2
	background.BorderColor3 = Color3.fromRGB(80, 80, 80)
	background.Parent = billboard

	local bar = Instance.new("Frame")
	bar.Name = "Bar"
	bar.Size = UDim2.new(0, 0, 1, 0)
	bar.BackgroundColor3 = Color3.fromRGB(0, 255, 100)
	bar.BorderSizePixel = 0
	bar.Parent = background

	local label = Instance.new("TextLabel")
	label.Size = UDim2.new(1, 0, 1, 0)
	label.BackgroundTransparency = 1
	label.Text = mineral.icon .. " " .. mineral.displayName
	label.TextColor3 = Color3.fromRGB(255, 255, 255)
	label.TextScaled = true
	label.Font = Enum.Font.SourceSansBold
	label.TextStrokeTransparency = 0.5
	label.Parent = background
end

local function stopMining(player)
	if activeMining[player.UserId] then
		local data = activeMining[player.UserId]
		if data.block and data.block.Parent then
			local progress = data.block:FindFirstChild("MiningProgress")
			if progress then
				progress:Destroy()
			end
		end
		activeMining[player.UserId] = nil
	end
end

local function updateMining()
	for userId, data in pairs(activeMining) do
		local player = Players:GetPlayerByUserId(userId)

		-- Vérifications
		if not player or not data.block or not data.block.Parent then
			activeMining[userId] = nil
			continue
		end

		-- Calculer progression
		local elapsed = tick() - data.startTime
		local progress = elapsed / data.duration

		if progress >= 1 then
			-- Minage terminé!

			-- Ajouter minerai à l'inventaire
			local inv = player.Inventory:FindFirstChild(data.mineral.name)
			if inv then
				inv.Value = inv.Value + data.pickaxe.power
			end

			-- Effet de particules
			local effect = Instance.new("Part")
			effect.Size = Vector3.new(2, 2, 2)
			effect.Position = data.block.Position
			effect.Color = data.mineral.color
			effect.Material = Enum.Material.Neon
			effect.Anchored = true
			effect.CanCollide = false
			effect.Transparency = 0.3
			effect.Parent = workspace

			TweenService:Create(effect, TweenInfo.new(0.5), {
				Transparency = 1,
				Size = Vector3.new(6, 6, 6)
			}):Play()

			game:GetService("Debris"):AddItem(effect, 0.5)

			-- Détruire le bloc
			data.block:Destroy()
			activeMining[userId] = nil
		else
			-- Mettre à jour barre
			local progress_gui = data.block:FindFirstChild("MiningProgress")
			if progress_gui then
				local bar = progress_gui.Frame.Bar
				bar.Size = UDim2.new(progress, 0, 1, 0)
			end
		end
	end
end

-- ═══════════════════════════════════════════════════════════
-- SYSTÈME DE VENTE
-- ═══════════════════════════════════════════════════════════

local function sellInventory(player)
	local total = 0

	for _, mineral in ipairs(MINERALS) do
		local inv = player.Inventory:FindFirstChild(mineral.name)
		if inv and inv.Value > 0 then
			total = total + (inv.Value * mineral.value)
			inv.Value = 0
		end
	end

	player.leaderstats.Money.Value = player.leaderstats.Money.Value + total

	print(string.format("💰 %s a vendu pour %d$", player.Name, total))
	return total
end

-- ═══════════════════════════════════════════════════════════
-- SYSTÈME DE BOUTIQUE
-- ═══════════════════════════════════════════════════════════

local function buyPickaxe(player, pickaxeId)
	local pickaxe = PickaxesById[pickaxeId]
	if not pickaxe then
		return false, "Pioche introuvable"
	end

	-- Vérifier si déjà possédée
	if player.OwnedPickaxes:FindFirstChild(pickaxeId) then
		return false, "Déjà possédée"
	end

	-- Vérifier l'argent
	if player.leaderstats.Money.Value < pickaxe.price then
		return false, "Pas assez d'argent"
	end

	-- Acheter
	player.leaderstats.Money.Value = player.leaderstats.Money.Value - pickaxe.price

	local owned = Instance.new("BoolValue")
	owned.Name = pickaxeId
	owned.Value = true
	owned.Parent = player.OwnedPickaxes

	-- Équiper automatiquement
	player.CurrentPickaxe.Value = pickaxeId

	print(string.format("🛒 %s a acheté: %s", player.Name, pickaxe.name))
	return true, "Achat réussi"
end

local function equipPickaxe(player, pickaxeId)
	if player.OwnedPickaxes:FindFirstChild(pickaxeId) then
		player.CurrentPickaxe.Value = pickaxeId
		return true
	end
	return false
end

local function getOwnedPickaxes(player)
	local owned = {}
	local current = player.CurrentPickaxe.Value

	for _, pickaxe in ipairs(PICKAXES) do
		if player.OwnedPickaxes:FindFirstChild(pickaxe.id) then
			table.insert(owned, {
				id = pickaxe.id,
				name = pickaxe.name,
				icon = pickaxe.icon,
				description = pickaxe.description,
				power = pickaxe.power,
				speed = pickaxe.speed,
				isCurrent = (pickaxe.id == current)
			})
		end
	end

	return owned
end

local function getShopPickaxes(player)
	local shopItems = {}

	for _, pickaxe in ipairs(PICKAXES) do
		local owned = player.OwnedPickaxes:FindFirstChild(pickaxe.id) ~= nil

		table.insert(shopItems, {
			id = pickaxe.id,
			name = pickaxe.name,
			icon = pickaxe.icon,
			description = pickaxe.description,
			price = pickaxe.price,
			power = pickaxe.power,
			speed = pickaxe.speed,
			owned = owned
		})
	end

	return shopItems
end

-- ═══════════════════════════════════════════════════════════
-- REMOTE EVENTS
-- ═══════════════════════════════════════════════════════════

print("📡 Création des Remote Events...")

local remoteFolder = Instance.new("Folder")
remoteFolder.Name = "RemoteEvents"
remoteFolder.Parent = ReplicatedStorage

-- Remote Events
local startMineEvent = Instance.new("RemoteEvent")
startMineEvent.Name = "StartMine"
startMineEvent.Parent = remoteFolder

local stopMineEvent = Instance.new("RemoteEvent")
stopMineEvent.Name = "StopMine"
stopMineEvent.Parent = remoteFolder

local sellEvent = Instance.new("RemoteEvent")
sellEvent.Name = "Sell"
sellEvent.Parent = remoteFolder

local buyPickaxeEvent = Instance.new("RemoteEvent")
buyPickaxeEvent.Name = "BuyPickaxe"
buyPickaxeEvent.Parent = remoteFolder

local equipPickaxeEvent = Instance.new("RemoteEvent")
equipPickaxeEvent.Name = "EquipPickaxe"
equipPickaxeEvent.Parent = remoteFolder

-- Remote Functions
local getOwnedPickaxesFunc = Instance.new("RemoteFunction")
getOwnedPickaxesFunc.Name = "GetOwnedPickaxes"
getOwnedPickaxesFunc.Parent = remoteFolder

local getShopPickaxesFunc = Instance.new("RemoteFunction")
getShopPickaxesFunc.Name = "GetShopPickaxes"
getShopPickaxesFunc.Parent = remoteFolder

local getMineralsDataFunc = Instance.new("RemoteFunction")
getMineralsDataFunc.Name = "GetMineralsData"
getMineralsDataFunc.Parent = remoteFolder

-- Connexions
startMineEvent.OnServerEvent:Connect(function(player, block)
	startMining(player, block)
end)

stopMineEvent.OnServerEvent:Connect(function(player)
	stopMining(player)
end)

sellEvent.OnServerEvent:Connect(function(player)
	local earned = sellInventory(player)
	sellEvent:FireClient(player, earned)
end)

buyPickaxeEvent.OnServerEvent:Connect(function(player, pickaxeId)
	local success, message = buyPickaxe(player, pickaxeId)
	buyPickaxeEvent:FireClient(player, success, message)
end)

equipPickaxeEvent.OnServerEvent:Connect(function(player, pickaxeId)
	local success = equipPickaxe(player, pickaxeId)
	equipPickaxeEvent:FireClient(player, success)
end)

getOwnedPickaxesFunc.OnServerInvoke = function(player)
	return getOwnedPickaxes(player)
end

getShopPickaxesFunc.OnServerInvoke = function(player)
	return getShopPickaxes(player)
end

getMineralsDataFunc.OnServerInvoke = function(player)
	return MINERALS
end

print("✅ Remote Events créés")

-- ═══════════════════════════════════════════════════════════
-- INITIALISATION
-- ═══════════════════════════════════════════════════════════

-- Générer la mine
generateMine()

-- Setup joueurs
Players.PlayerAdded:Connect(function(player)
	setupPlayerData(player)
end)

-- Boucle de mise à jour
RunService.Heartbeat:Connect(updateMining)

print("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
print("✅ SERVEUR PRÊT - Mine Simulator")
print("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
