-- MINING SIMULATOR - VERSION SIMPLE QUI FONCTIONNE
-- Script Serveur - À mettre dans ServerScriptService

local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")

print("🔨 Démarrage Mining Simulator Simple...")

-- Configuration simple
local BLOCK_SIZE = 4
local MINE_RADIUS = 20
local MAX_DEPTH = 50

-- Minerais simples
local Minerals = {
	Grass = {value = 0, color = Color3.fromRGB(0, 255, 0), time = 0.1, minDepth = -1, maxDepth = -1},
	Dirt = {value = 1, color = Color3.fromRGB(139, 69, 19), time = 0.3, minDepth = 0, maxDepth = 3},
	Stone = {value = 3, color = Color3.fromRGB(150, 150, 150), time = 0.5, minDepth = 3, maxDepth = 999},
	Coal = {value = 10, color = Color3.fromRGB(50, 50, 50), time = 1, minDepth = 5, maxDepth = 999},
	Iron = {value = 25, color = Color3.fromRGB(200, 200, 200), time = 1.5, minDepth = 10, maxDepth = 999},
	Gold = {value = 50, color = Color3.fromRGB(255, 215, 0), time = 2, minDepth = 15, maxDepth = 999},
	Diamond = {value = 100, color = Color3.fromRGB(0, 255, 255), time = 3, minDepth = 25, maxDepth = 999}
}

-- Pioches simples
local Pickaxes = {
	Wood = {power = 1, speed = 1, price = 0, name = "Bois"},
	Stone = {power = 2, speed = 2, price = 100, name = "Pierre"},
	Iron = {power = 5, speed = 5, price = 500, name = "Fer"},
	Diamond = {power = 10, speed = 10, price = 2000, name = "Diamant"}
}

-- Choisir minerai selon profondeur
local function getMineralForDepth(depth)
	if depth == -1 then return "Grass" end
	if depth <= 3 then return "Dirt" end

	local options = {}
	for name, config in pairs(Minerals) do
		if depth >= config.minDepth and depth <= config.maxDepth then
			table.insert(options, name)
		end
	end

	if #options > 0 then
		return options[math.random(1, #options)]
	end
	return "Stone"
end

-- Créer la mine
local function createMine()
	local mine = Instance.new("Folder")
	mine.Name = "Mine"
	mine.Parent = workspace

	local blockCount = 0

	-- Générer couche par couche
	for depth = -1, MAX_DEPTH do
		local yPos = depth == -1 and BLOCK_SIZE/2 or -(depth * BLOCK_SIZE) + BLOCK_SIZE/2

		for x = -MINE_RADIUS, MINE_RADIUS, BLOCK_SIZE do
			for z = -MINE_RADIUS, MINE_RADIUS, BLOCK_SIZE do
				local dist = math.sqrt(x*x + z*z)

				if dist <= MINE_RADIUS then
					local mineralName = getMineralForDepth(depth)
					local mineral = Minerals[mineralName]

					local block = Instance.new("Part")
					block.Size = Vector3.new(BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE)
					block.Position = Vector3.new(x, yPos, z)
					block.Anchored = true
					block.Color = mineral.color
					block.Name = mineralName
					block.Parent = mine

					-- Tags
					local typeTag = Instance.new("StringValue")
					typeTag.Name = "MineralType"
					typeTag.Value = mineralName
					typeTag.Parent = block

					local depthTag = Instance.new("IntValue")
					depthTag.Name = "Depth"
					depthTag.Value = depth
					depthTag.Parent = block

					blockCount = blockCount + 1
				end
			end
		end

		-- Yield tous les 3 niveaux
		if depth % 3 == 0 then
			task.wait()
		end
	end

	print("✅ Mine générée: " .. blockCount .. " blocs")
end

-- Setup joueur
local function setupPlayer(player)
	-- Stats
	local stats = Instance.new("Folder")
	stats.Name = "leaderstats"
	stats.Parent = player

	local money = Instance.new("IntValue")
	money.Name = "Money"
	money.Value = 0
	money.Parent = stats

	-- Inventaire
	local inv = Instance.new("Folder")
	inv.Name = "Inventory"
	inv.Parent = player

	for name in pairs(Minerals) do
		local val = Instance.new("IntValue")
		val.Name = name
		val.Value = 0
		val.Parent = inv
	end

	-- Pioche actuelle
	local pickaxe = Instance.new("StringValue")
	pickaxe.Name = "CurrentPickaxe"
	pickaxe.Value = "Wood"
	pickaxe.Parent = player

	-- Pioches possédées
	local owned = Instance.new("Folder")
	owned.Name = "OwnedPickaxes"
	owned.Parent = player

	local wood = Instance.new("BoolValue")
	wood.Name = "Wood"
	wood.Value = true
	wood.Parent = owned

	print("✅ " .. player.Name .. " prêt")
end

-- Système de minage
local miningData = {}

local function startMining(player, block)
	local mineralType = block:FindFirstChild("MineralType")
	if not mineralType then return end

	local mineral = Minerals[mineralType.Value]
	if not mineral then return end

	local pickaxe = Pickaxes[player.CurrentPickaxe.Value] or Pickaxes.Wood
	local mineTime = mineral.time / pickaxe.speed

	-- Créer barre de progression
	local gui = Instance.new("BillboardGui")
	gui.Name = "Progress"
	gui.Size = UDim2.new(4, 0, 1, 0)
	gui.StudsOffset = Vector3.new(0, 3, 0)
	gui.AlwaysOnTop = true
	gui.Parent = block

	local bar = Instance.new("Frame")
	bar.Size = UDim2.new(1, 0, 0.2, 0)
	bar.Position = UDim2.new(0, 0, 0.4, 0)
	bar.BackgroundColor3 = Color3.fromRGB(50, 50, 50)
	bar.BorderSizePixel = 2
	bar.Parent = gui

	local fill = Instance.new("Frame")
	fill.Name = "Fill"
	fill.Size = UDim2.new(0, 0, 1, 0)
	fill.BackgroundColor3 = Color3.fromRGB(0, 255, 0)
	fill.BorderSizePixel = 0
	fill.Parent = bar

	-- Sauvegarder données
	miningData[player.UserId] = {
		block = block,
		start = tick(),
		duration = mineTime,
		mineral = mineralType.Value,
		power = pickaxe.power
	}
end

local function updateMining()
	for userId, data in pairs(miningData) do
		local player = Players:GetPlayerByUserId(userId)

		if not player or not data.block or not data.block.Parent then
			miningData[userId] = nil
			if data.block then
				local gui = data.block:FindFirstChild("Progress")
				if gui then gui:Destroy() end
			end
			continue
		end

		local progress = (tick() - data.start) / data.duration

		if progress >= 1 then
			-- Bloc cassé !
			player.Inventory[data.mineral].Value = player.Inventory[data.mineral].Value + data.power

			-- Effet
			local effect = Instance.new("Part")
			effect.Size = Vector3.new(1, 1, 1)
			effect.Position = data.block.Position
			effect.Color = data.block.Color
			effect.Material = Enum.Material.Neon
			effect.Anchored = true
			effect.CanCollide = false
			effect.Parent = workspace

			game:GetService("TweenService"):Create(
				effect,
				TweenInfo.new(0.5),
				{Transparency = 1, Size = Vector3.new(3, 3, 3)}
			):Play()

			game:GetService("Debris"):AddItem(effect, 0.5)

			data.block:Destroy()
			miningData[userId] = nil
		else
			-- Mettre à jour barre
			local gui = data.block:FindFirstChild("Progress")
			if gui then
				local fill = gui.Frame.Fill
				fill.Size = UDim2.new(progress, 0, 1, 0)
			end
		end
	end
end

local function stopMining(player)
	local data = miningData[player.UserId]
	if data and data.block and data.block.Parent then
		local gui = data.block:FindFirstChild("Progress")
		if gui then gui:Destroy() end
	end
	miningData[player.UserId] = nil
end

-- Vendre
local function sellAll(player)
	local total = 0
	for name, mineral in pairs(Minerals) do
		local amount = player.Inventory[name].Value
		if amount > 0 then
			total = total + (amount * mineral.value)
			player.Inventory[name].Value = 0
		end
	end
	player.leaderstats.Money.Value = player.leaderstats.Money.Value + total
	return total
end

-- Acheter pioche
local function buyPickaxe(player, pickaxeName)
	local pickaxe = Pickaxes[pickaxeName]
	if not pickaxe then return false end

	if player.OwnedPickaxes:FindFirstChild(pickaxeName) then
		return false -- Déjà possédée
	end

	if player.leaderstats.Money.Value >= pickaxe.price then
		player.leaderstats.Money.Value = player.leaderstats.Money.Value - pickaxe.price

		local owned = Instance.new("BoolValue")
		owned.Name = pickaxeName
		owned.Value = true
		owned.Parent = player.OwnedPickaxes

		player.CurrentPickaxe.Value = pickaxeName
		return true
	end
	return false
end

-- Remote Events
local remotes = Instance.new("Folder")
remotes.Name = "Mining"
remotes.Parent = ReplicatedStorage

local mineEvent = Instance.new("RemoteEvent")
mineEvent.Name = "Mine"
mineEvent.Parent = remotes

local stopEvent = Instance.new("RemoteEvent")
stopEvent.Name = "Stop"
stopEvent.Parent = remotes

local sellEvent = Instance.new("RemoteEvent")
sellEvent.Name = "Sell"
sellEvent.Parent = remotes

local buyEvent = Instance.new("RemoteEvent")
buyEvent.Name = "Buy"
buyEvent.Parent = remotes

local equipEvent = Instance.new("RemoteEvent")
equipEvent.Name = "Equip"
equipEvent.Parent = remotes

local getPickaxesFunc = Instance.new("RemoteFunction")
getPickaxesFunc.Name = "GetPickaxes"
getPickaxesFunc.Parent = remotes

-- Connexions
mineEvent.OnServerEvent:Connect(function(player, block)
	startMining(player, block)
end)

stopEvent.OnServerEvent:Connect(function(player)
	stopMining(player)
end)

sellEvent.OnServerEvent:Connect(function(player)
	local earned = sellAll(player)
	sellEvent:FireClient(player, earned)
end)

buyEvent.OnServerEvent:Connect(function(player, pickaxeName)
	local success = buyPickaxe(player, pickaxeName)
	buyEvent:FireClient(player, success)
end)

equipEvent.OnServerEvent:Connect(function(player, pickaxeName)
	if player.OwnedPickaxes:FindFirstChild(pickaxeName) then
		player.CurrentPickaxe.Value = pickaxeName
		equipEvent:FireClient(player, true)
	end
end)

getPickaxesFunc.OnServerInvoke = function(player)
	local owned = {}
	for name in pairs(Pickaxes) do
		if player.OwnedPickaxes:FindFirstChild(name) then
			table.insert(owned, name)
		end
	end
	return owned, player.CurrentPickaxe.Value
end

-- Initialisation
createMine()

Players.PlayerAdded:Connect(function(player)
	setupPlayer(player)
end)

-- Boucle de mise à jour
game:GetService("RunService").Heartbeat:Connect(updateMining)

print("✅ Mining Simulator Simple - Prêt !")
