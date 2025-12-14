-- ████████████████████████████████████████████████████████████████████████████
-- ███                                                                      ███
-- ███         🏆 ULTIMATE MINING SIMULATOR PRO - CORRIGÉ 🏆              ███
-- ███                    Version Fixée 3.0                                 ███
-- ███         ✅ Génération infinie ✅ Temps de minage ✅ Quêtes           ███
-- ███                                                                      ███
-- ████████████████████████████████████████████████████████████████████████████

local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local RunService = game:GetService("RunService")
local TweenService = game:GetService("TweenService")
local Debris = game:GetService("Debris")

print("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
print("🔨 CHARGEMENT MINING SIMULATOR PRO CORRIGÉ")
print("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")

-- ════════════════════════════════════════════════════════════════════════════
-- ███ CONFIGURATION - OPTIMISÉE POUR PERFORMANCES
-- ════════════════════════════════════════════════════════════════════════════

local BLOCK_SIZE = 3.33
local CHUNK_SIZE = 8
local SURFACE_RADIUS = 30
local MAX_CONCURRENT_CHUNKS = 3
local BLOCKS_PER_FRAME = 5

-- File d'attente pour génération progressive
local chunkGenerationQueue = {}
local currentlyGeneratingChunks = 0

-- ════════════════════════════════════════════════════════════════════════════
-- ███ CONFIGURATION DES MINERAIS - COULEURS ULTRA VIVES
-- ════════════════════════════════════════════════════════════════════════════

local MineralConfig = {
	-- SURFACE
	Grass = {
		value = 0,
		color = Color3.fromRGB(0, 255, 50),
		name = "🌿 Herbe",
		minDepth = -1,
		maxDepth = -1,
		mineTime = 0.05,
		rarity = 100,
		tier = 0,
		style = "grass"
	},

	Dirt = {
		value = 1,
		color = Color3.fromRGB(180, 100, 30),
		name = "🟤 Terre",
		minDepth = 0,
		maxDepth = 2,
		mineTime = 0.1,
		rarity = 100,
		tier = 0,
		style = "dirt"
	},

	-- TIER 1 - Communs
	Stone = {
		value = 3,
		color = Color3.fromRGB(150, 150, 160),
		name = "⚪ Pierre",
		minDepth = 2,
		maxDepth = 999,
		mineTime = 0.5,  -- Plus long
		rarity = 80,
		tier = 1,
		style = "stone"
	},

	Coal = {
		value = 10,
		color = Color3.fromRGB(50, 50, 60),
		name = "⚫ Charbon",
		minDepth = 3,
		maxDepth = 999,
		mineTime = 1.5,  -- Augmenté
		rarity = 50,
		tier = 1,
		style = "ore"
	},

	Copper = {
		value = 20,
		color = Color3.fromRGB(255, 140, 60),
		name = "🟠 Cuivre",
		minDepth = 5,
		maxDepth = 999,
		mineTime = 2,  -- Augmenté
		rarity = 35,
		tier = 1,
		style = "ore"
	},

	-- TIER 2 - Peu communs
	Iron = {
		value = 50,
		color = Color3.fromRGB(220, 220, 240),
		name = "⚪ Fer",
		minDepth = 10,
		maxDepth = 999,
		mineTime = 3,  -- Augmenté
		rarity = 30,
		tier = 2,
		style = "ore"
	},

	Silver = {
		value = 100,
		color = Color3.fromRGB(240, 240, 255),
		name = "💿 Argent",
		minDepth = 15,
		maxDepth = 999,
		mineTime = 4,  -- Augmenté
		rarity = 20,
		tier = 2,
		style = "precious"
	},

	Gold = {
		value = 200,
		color = Color3.fromRGB(255, 230, 0),
		name = "🟡 Or",
		minDepth = 20,
		maxDepth = 999,
		mineTime = 5,  -- Augmenté
		rarity = 15,
		tier = 2,
		style = "precious"
	},

	-- TIER 3 - Rares
	Sapphire = {
		value = 500,
		color = Color3.fromRGB(0, 100, 255),
		name = "💙 Saphir",
		minDepth = 30,
		maxDepth = 999,
		mineTime = 7,  -- Augmenté
		rarity = 10,
		tier = 3,
		style = "crystal"
	},

	Emerald = {
		value = 800,
		color = Color3.fromRGB(0, 255, 120),
		name = "💚 Émeraude",
		minDepth = 35,
		maxDepth = 999,
		mineTime = 9,  -- Augmenté
		rarity = 8,
		tier = 3,
		style = "crystal"
	},

	Ruby = {
		value = 1200,
		color = Color3.fromRGB(255, 0, 80),
		name = "❤️ Rubis",
		minDepth = 40,
		maxDepth = 999,
		mineTime = 11,  -- Augmenté
		rarity = 6,
		tier = 3,
		style = "crystal"
	},

	-- TIER 4 - Épiques
	Diamond = {
		value = 2500,
		color = Color3.fromRGB(150, 255, 255),
		name = "💎 Diamant",
		minDepth = 50,
		maxDepth = 999,
		mineTime = 14,  -- Augmenté
		rarity = 4,
		tier = 4,
		style = "crystal"
	},

	Amethyst = {
		value = 5000,
		color = Color3.fromRGB(200, 50, 255),
		name = "💜 Améthyste",
		minDepth = 60,
		maxDepth = 999,
		mineTime = 17,  -- Augmenté
		rarity = 3,
		tier = 4,
		style = "crystal"
	},

	-- TIER 5 - Légendaires
	Obsidian = {
		value = 10000,
		color = Color3.fromRGB(100, 0, 150),
		name = "🖤 Obsidienne",
		minDepth = 75,
		maxDepth = 999,
		mineTime = 20,  -- Augmenté
		rarity = 2,
		tier = 5,
		style = "crystal"
	},

	Mythril = {
		value = 25000,
		color = Color3.fromRGB(0, 255, 255),
		name = "🌟 Mithril",
		minDepth = 100,
		maxDepth = 999,
		mineTime = 25,  -- Augmenté
		rarity = 1,
		tier = 5,
		style = "crystal"
	}
}

-- ════════════════════════════════════════════════════════════════════════════
-- ███ CONFIGURATION DES PIOCHES
-- ════════════════════════════════════════════════════════════════════════════

local PickaxeConfig = {
	WoodenPickaxe = {
		power = 1,
		speed = 1,  -- 1x vitesse de base
		price = 0,
		range = 1,
		name = "🪵 Pioche en Bois",
		description = "Une simple pioche de débutant"
	},

	StonePickaxe = {
		power = 2,
		speed = 2,  -- 2x plus rapide
		price = 150,
		range = 1,
		name = "🪨 Pioche en Pierre",
		description = "2x plus rapide"
	},

	IronPickaxe = {
		power = 5,
		speed = 5,  -- 5x plus rapide
		price = 750,
		range = 1,
		name = "⚪ Pioche en Fer",
		description = "5x plus rapide"
	},

	GoldPickaxe = {
		power = 10,
		speed = 10,  -- 10x plus rapide
		price = 3000,
		range = 2,
		name = "🟡 Pioche en Or",
		description = "10x plus rapide + 2 blocs"
	},

	DiamondPickaxe = {
		power = 20,
		speed = 20,  -- 20x plus rapide
		price = 15000,
		range = 3,
		name = "💎 Pioche en Diamant",
		description = "20x plus rapide + 3 blocs"
	},

	ObsidianPickaxe = {
		power = 50,
		speed = 50,  -- 50x plus rapide
		price = 75000,
		range = 4,
		name = "🖤 Pioche d'Obsidienne",
		description = "50x plus rapide + 4 blocs"
	},

	MythrilPickaxe = {
		power = 100,
		speed = 100,  -- 100x plus rapide
		price = 300000,
		range = 6,
		name = "🌟 Pioche de Mithril",
		description = "100x plus rapide + 6 blocs"
	},

	LegendaryPickaxe = {
		power = 200,
		speed = 999,  -- INSTANTANÉ
		price = 1500000,
		range = 12,
		name = "👑 Pioche Légendaire",
		description = "INSTANTANÉ + 12 blocs"
	}
}

-- ════════════════════════════════════════════════════════════════════════════
-- ███ STYLES VISUELS OPTIMISÉS ET ULTRA VIFS
-- ════════════════════════════════════════════════════════════════════════════

local function createFloatingName(block, mineralName)
	local billboardGui = Instance.new("BillboardGui")
	billboardGui.Size = UDim2.new(5, 0, 1, 0)
	billboardGui.StudsOffset = Vector3.new(0, 3, 0)
	billboardGui.AlwaysOnTop = false
	billboardGui.MaxDistance = 30
	billboardGui.Parent = block

	local nameLabel = Instance.new("TextLabel")
	nameLabel.Size = UDim2.new(1, 0, 1, 0)
	nameLabel.BackgroundTransparency = 1
	nameLabel.Text = mineralName
	nameLabel.TextColor3 = Color3.fromRGB(255, 255, 255)
	nameLabel.Font = Enum.Font.SourceSansBold
	nameLabel.TextSize = 16
	nameLabel.TextStrokeTransparency = 0.3
	nameLabel.TextStrokeColor3 = Color3.fromRGB(0, 0, 0)
	nameLabel.Parent = billboardGui
end

local function styleBlock(block, mineral, config)
	local style = config.style

	-- Nom flottant pour minerais rares et +
	if config.tier >= 2 then
		createFloatingName(block, config.name)
	end

	if style == "grass" then
		block.Material = Enum.Material.Grass
		block.Color = config.color
		block.TopSurface = Enum.SurfaceType.Smooth

	elseif style == "dirt" then
		block.Material = Enum.Material.Ground
		block.Color = config.color

	elseif style == "stone" then
		block.Material = Enum.Material.Slate
		block.Color = config.color

	elseif style == "ore" then
		block.Material = Enum.Material.Slate
		block.Color = Color3.fromRGB(65, 65, 70)

		local veinCount = math.random(3, 5)
		for i = 1, veinCount do
			local vein = Instance.new("Part")
			vein.Size = Vector3.new(0.8, 0.8, 0.8)
			vein.Color = config.color
			vein.Material = Enum.Material.Neon
			vein.Transparency = 0.1
			vein.Anchored = true
			vein.CanCollide = false
			vein.Position = block.Position + Vector3.new(
				math.random(-14, 14)/10,
				math.random(-14, 14)/10,
				math.random(-14, 14)/10
			)
			vein.Parent = block
		end

	elseif style == "precious" then
		block.Material = Enum.Material.Slate
		block.Color = Color3.fromRGB(45, 45, 50)

		local nuggetCount = math.random(6, 8)
		for i = 1, nuggetCount do
			local nugget = Instance.new("Part")
			nugget.Size = Vector3.new(0.8, 0.8, 0.8)
			nugget.Color = config.color
			nugget.Material = Enum.Material.Neon
			nugget.Transparency = 0
			nugget.Anchored = true
			nugget.CanCollide = false
			nugget.Position = block.Position + Vector3.new(
				math.random(-14, 14)/10,
				math.random(-14, 14)/10,
				math.random(-14, 14)/10
			)
			nugget.Parent = block
		end

		local light = Instance.new("PointLight")
		light.Color = config.color
		light.Brightness = 4
		light.Range = 18
		light.Parent = block

		local sparkle = Instance.new("Sparkles")
		sparkle.SparkleColor = config.color
		sparkle.Parent = block

	elseif style == "crystal" then
		block.Material = Enum.Material.Slate
		block.Color = Color3.fromRGB(20, 20, 25)

		local mainCrystal = Instance.new("Part")
		mainCrystal.Size = Vector3.new(2.5, 4, 2.5)
		mainCrystal.Color = config.color
		mainCrystal.Material = Enum.Material.Neon
		mainCrystal.Transparency = 0
		mainCrystal.Anchored = true
		mainCrystal.CanCollide = false
		mainCrystal.Position = block.Position + Vector3.new(0, 1, 0)
		mainCrystal.Parent = block

		local mesh = Instance.new("SpecialMesh")
		mesh.MeshType = Enum.MeshType.FileMesh
		mesh.MeshId = "rbxassetid://9856898"
		mesh.Scale = Vector3.new(2, 3, 2)
		mesh.Parent = mainCrystal

		for i = 1, 4 do
			local small = Instance.new("Part")
			small.Size = Vector3.new(1, 1.5, 1)
			small.Color = config.color
			small.Material = Enum.Material.Neon
			small.Transparency = 0
			small.Anchored = true
			small.CanCollide = false

			local angle = (i / 4) * math.pi * 2
			small.Position = block.Position + Vector3.new(
				math.cos(angle) * 1.5,
				0.5,
				math.sin(angle) * 1.5
			)
			small.Parent = block

			local smallMesh = Instance.new("SpecialMesh")
			smallMesh.MeshType = Enum.MeshType.FileMesh
			smallMesh.MeshId = "rbxassetid://9856898"
			smallMesh.Scale = Vector3.new(0.8, 1.4, 0.8)
			smallMesh.Parent = small
		end

		local light1 = Instance.new("PointLight")
		light1.Color = config.color
		light1.Brightness = 10
		light1.Range = 35
		light1.Parent = mainCrystal

		local sparkle = Instance.new("Sparkles")
		sparkle.SparkleColor = config.color
		sparkle.Parent = mainCrystal

		task.spawn(function()
			while mainCrystal.Parent do
				mainCrystal.Orientation = mainCrystal.Orientation + Vector3.new(0, 1, 0)
				task.wait(0.05)
			end
		end)
	end
end

-- ════════════════════════════════════════════════════════════════════════════
-- ███ SÉLECTION DE MINERAI
-- ════════════════════════════════════════════════════════════════════════════

local function getRandomMineral(depth)
	if depth == -1 then
		return "Grass"
	end

	if depth >= 0 and depth <= 2 then
		if math.random(1, 100) <= 70 then
			return "Dirt"
		end
	end

	local candidates = {}
	local totalWeight = 0

	for mineral, config in pairs(MineralConfig) do
		if mineral ~= "Grass" and mineral ~= "Dirt" then
			if depth >= config.minDepth and depth <= config.maxDepth then
				local weight = config.rarity
				local depthBonus = math.max(0, (depth - config.minDepth) * 0.4)
				weight = weight + depthBonus

				if config.tier <= 1 and depth > 30 then
					weight = weight * 0.2
				end

				if weight > 0 then
					table.insert(candidates, {mineral = mineral, weight = weight})
					totalWeight = totalWeight + weight
				end
			end
		end
	end

	if #candidates > 0 then
		local random = math.random() * totalWeight
		local current = 0

		for _, data in ipairs(candidates) do
			current = current + data.weight
			if random <= current then
				return data.mineral
			end
		end
	end

	return "Stone"
end

-- ════════════════════════════════════════════════════════════════════════════
-- ███ GÉNÉRATION OPTIMISÉE - PROGRESSIVE ET SANS LAG
-- ════════════════════════════════════════════════════════════════════════════

local surfaceGenerated = false
local generatedChunks = {}

-- Générer surface
local function generateCompleteSurface(miningArea)
	if surfaceGenerated then return end
	surfaceGenerated = true

	print("🌍 Génération de la surface complète...")

	local surfaceFolder = Instance.new("Folder")
	surfaceFolder.Name = "Surface"
	surfaceFolder.Parent = miningArea

	local blocksCreated = 0
	local blockList = {}

	for x = -SURFACE_RADIUS, SURFACE_RADIUS do
		for z = -SURFACE_RADIUS, SURFACE_RADIUS do
			local dist = math.sqrt(x*x + z*z)
			if dist <= SURFACE_RADIUS then
				table.insert(blockList, {x = x, z = z, y = -1, mineral = "Grass"})
			end
		end
	end

	for y = 0, 2 do
		for x = -SURFACE_RADIUS, SURFACE_RADIUS do
			for z = -SURFACE_RADIUS, SURFACE_RADIUS do
				local dist = math.sqrt(x*x + z*z)
				if dist <= SURFACE_RADIUS then
					table.insert(blockList, {x = x, z = z, y = y, mineral = "Dirt"})
				end
			end
		end
	end

	for i = 1, #blockList, BLOCKS_PER_FRAME do
		for j = i, math.min(i + BLOCKS_PER_FRAME - 1, #blockList) do
			local data = blockList[j]

			local block = Instance.new("Part")
			block.Size = Vector3.new(BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE)
			block.Position = Vector3.new(
				data.x * BLOCK_SIZE,
				data.y == -1 and BLOCK_SIZE or -(data.y * BLOCK_SIZE),
				data.z * BLOCK_SIZE
			)
			block.Anchored = true
			block.Name = data.mineral
			block.Parent = surfaceFolder

			styleBlock(block, data.mineral, MineralConfig[data.mineral])

			local tag = Instance.new("StringValue")
			tag.Name = "MineralType"
			tag.Value = data.mineral
			tag.Parent = block

			local depthTag = Instance.new("IntValue")
			depthTag.Name = "Depth"
			depthTag.Value = data.y == -1 and -1 or data.y
			depthTag.Parent = block

			blocksCreated = blocksCreated + 1
		end

		task.wait()
	end

	print("✅ Surface générée: " .. blocksCreated .. " blocs")
end

-- Générer chunk souterrain (CORRIGÉ - PAS DE LIMITE DE PROFONDEUR)
local function generateUndergroundChunk(chunkX, chunkZ, chunkY, miningArea)
	-- ✅ ENLEVÉ LA LIMITE: if chunkY < 3 then return end

	local key = chunkX .. "_" .. chunkZ .. "_" .. chunkY
	if generatedChunks[key] then return end

	generatedChunks[key] = "generating"

	local folder = Instance.new("Folder")
	folder.Name = "Chunk_" .. key
	folder.Parent = miningArea

	local blocksCreated = 0
	local blockList = {}

	for x = 0, CHUNK_SIZE - 1 do
		for z = 0, CHUNK_SIZE - 1 do
			for y = 0, CHUNK_SIZE - 1 do
				local worldX = chunkX * CHUNK_SIZE + x
				local worldZ = chunkZ * CHUNK_SIZE + z
				local worldY = chunkY * CHUNK_SIZE + y

				local dist = math.sqrt(worldX*worldX + worldZ*worldZ)
				local radius = SURFACE_RADIUS + (worldY * 0.2)

				if dist <= radius then
					local mineral = getRandomMineral(worldY)
					table.insert(blockList, {
						x = worldX,
						z = worldZ,
						y = worldY,
						mineral = mineral
					})
				end
			end
		end
	end

	for i = 1, #blockList, BLOCKS_PER_FRAME do
		for j = i, math.min(i + BLOCKS_PER_FRAME - 1, #blockList) do
			local data = blockList[j]
			local config = MineralConfig[data.mineral]

			local block = Instance.new("Part")
			block.Size = Vector3.new(BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE)
			block.Position = Vector3.new(
				data.x * BLOCK_SIZE,
				-(data.y * BLOCK_SIZE),
				data.z * BLOCK_SIZE
			)
			block.Anchored = true
			block.Name = data.mineral
			block.Parent = folder

			styleBlock(block, data.mineral, config)

			local tag = Instance.new("StringValue")
			tag.Name = "MineralType"
			tag.Value = data.mineral
			tag.Parent = block

			local depthTag = Instance.new("IntValue")
			depthTag.Name = "Depth"
			depthTag.Value = data.y
			depthTag.Parent = block

			blocksCreated = blocksCreated + 1
		end

		task.wait()
	end

	generatedChunks[key] = folder

	if blocksCreated > 0 then
		print("⛏️ Chunk " .. key .. " (profondeur " .. chunkY * CHUNK_SIZE .. ") : " .. blocksCreated .. " blocs")
	end
end

-- Système de file d'attente pour chunks
local function processChunkQueue()
	while true do
		task.wait(0.1)

		if #chunkGenerationQueue > 0 and currentlyGeneratingChunks < MAX_CONCURRENT_CHUNKS then
			local chunkData = table.remove(chunkGenerationQueue, 1)

			currentlyGeneratingChunks = currentlyGeneratingChunks + 1

			task.spawn(function()
				generateUndergroundChunk(
					chunkData.x,
					chunkData.z,
					chunkData.y,
					chunkData.area
				)
				currentlyGeneratingChunks = currentlyGeneratingChunks - 1
			end)
		end
	end
end

-- Charger chunks (CORRIGÉ - CHARGE EN PROFONDEUR)
local function loadChunksAroundPlayer(position, miningArea)
	local chunkX = math.floor(position.X / (BLOCK_SIZE * CHUNK_SIZE))
	local chunkZ = math.floor(position.Z / (BLOCK_SIZE * CHUNK_SIZE))
	local chunkY = math.floor(-position.Y / (BLOCK_SIZE * CHUNK_SIZE))

	-- ✅ CORRIGÉ: Charger 3x3x3 chunks au lieu de 3x3x1
	for dx = -1, 1 do
		for dz = -1, 1 do
			for dy = 0, 2 do  -- ✅ Charger 3 couches verticales
				local cy = math.max(1, chunkY + dy)  -- ✅ Commence à 1 au lieu de 3
				local key = (chunkX + dx) .. "_" .. (chunkZ + dz) .. "_" .. cy

				if not generatedChunks[key] then
					table.insert(chunkGenerationQueue, {
						x = chunkX + dx,
						z = chunkZ + dz,
						y = cy,
						area = miningArea
					})
				end
			end
		end
	end
end

-- ════════════════════════════════════════════════════════════════════════════
-- ███ DONNÉES JOUEUR
-- ════════════════════════════════════════════════════════════════════════════

local function setupPlayerData(player)
	local stats = Instance.new("Folder")
	stats.Name = "leaderstats"
	stats.Parent = player

	local money = Instance.new("IntValue")
	money.Name = "Money"
	money.Value = 0
	money.Parent = stats

	local inv = Instance.new("Folder")
	inv.Name = "Inventory"
	inv.Parent = player

	for mineral in pairs(MineralConfig) do
		local v = Instance.new("IntValue")
		v.Name = mineral
		v.Value = 0
		v.Parent = inv
	end

	local pick = Instance.new("StringValue")
	pick.Name = "CurrentPickaxe"
	pick.Value = "WoodenPickaxe"
	pick.Parent = player

	local owned = Instance.new("Folder")
	owned.Name = "OwnedPickaxes"
	owned.Parent = player

	local w = Instance.new("BoolValue")
	w.Name = "WoodenPickaxe"
	w.Value = true
	w.Parent = owned

	-- ✅ DONNÉES QUÊTES
	local questData = Instance.new("Folder")
	questData.Name = "QuestData"
	questData.Parent = player

	local questProgress = Instance.new("Folder")
	questProgress.Name = "QuestProgress"
	questProgress.Parent = questData

	local completedQuests = Instance.new("Folder")
	completedQuests.Name = "CompletedQuests"
	completedQuests.Parent = questData

	local totalMoneyEarned = Instance.new("IntValue")
	totalMoneyEarned.Name = "TotalMoneyEarned"
	totalMoneyEarned.Value = 0
	totalMoneyEarned.Parent = questData

	print("✅ Joueur " .. player.Name .. " initialisé")
end

-- ════════════════════════════════════════════════════════════════════════════
-- ███ SYSTÈME DE MINAGE (AVEC TEMPS PROGRESSIFS)
-- ════════════════════════════════════════════════════════════════════════════

local miningBlocks = {}

local function createMiningParticles(position, color)
	for i = 1, 12 do
		local particle = Instance.new("Part")
		particle.Size = Vector3.new(0.4, 0.4, 0.4)
		particle.Position = position
		particle.Color = color
		particle.Material = Enum.Material.Neon
		particle.CanCollide = false
		particle.Parent = workspace

		local bv = Instance.new("BodyVelocity")
		bv.Velocity = Vector3.new(
			math.random(-20, 20),
			math.random(15, 30),
			math.random(-20, 20)
		)
		bv.MaxForce = Vector3.new(6000, 6000, 6000)
		bv.Parent = particle

		Debris:AddItem(particle, 1.5)
	end

	local flash = Instance.new("Part")
	flash.Size = Vector3.new(2, 2, 2)
	flash.Position = position
	flash.Color = color
	flash.Material = Enum.Material.Neon
	flash.Transparency = 0.2
	flash.Anchored = true
	flash.CanCollide = false
	flash.Shape = Enum.PartType.Ball
	flash.Parent = workspace

	TweenService:Create(
		flash,
		TweenInfo.new(0.3),
		{Size = Vector3.new(4, 4, 4), Transparency = 1}
	):Play()

	Debris:AddItem(flash, 0.3)
end

local function completeMining(player, block, data)
	local pick = PickaxeConfig[player.CurrentPickaxe.Value]

	player.Inventory[data.mineral].Value = player.Inventory[data.mineral].Value + pick.power

	createMiningParticles(block.Position, data.color)

	block:Destroy()
	miningBlocks[player.UserId] = nil
end

local function updateMining(player)
	local data = miningBlocks[player.UserId]
	if not data then return end

	if not data.block or not data.block.Parent then
		miningBlocks[player.UserId] = nil
		return
	end

	local progress = math.min((tick() - data.start) / data.duration, 1)

	local gui = data.block:FindFirstChild("MiningProgress")
	if gui then
		local fill = gui.Frame.Fill
		fill.Size = UDim2.new(progress, 0, 1, 0)
	end

	if progress >= 1 then
		completeMining(player, data.block, data)
	end
end

local function startMining(player, block)
	if not block or not block:FindFirstChild("MineralType") then return end
	if miningBlocks[player.UserId] then return end

	local mineral = block.MineralType.Value
	local config = MineralConfig[mineral]
	if not config then return end

	local pick = PickaxeConfig[player.CurrentPickaxe.Value]

	-- Pioche légendaire = instantané
	if pick.speed >= 999 then
		local blocks = {block}

		if pick.range > 1 then
			for _, other in pairs(workspace.MiningArea:GetDescendants()) do
				if other:IsA("BasePart") and other ~= block and other:FindFirstChild("MineralType") then
					if (other.Position - block.Position).Magnitude <= (BLOCK_SIZE * pick.range) then
						table.insert(blocks, other)
					end
				end
			end
		end

		for _, b in ipairs(blocks) do
			local m = b:FindFirstChild("MineralType")
			if m then
				local c = MineralConfig[m.Value]
				player.Inventory[m.Value].Value = player.Inventory[m.Value].Value + pick.power
				createMiningParticles(b.Position, c.color)
				b:Destroy()
			end
		end

		return
	end

	-- ✅ CALCUL DU TEMPS: Plus le minerai est rare, plus c'est long
	-- Divisé par la vitesse de la pioche
	local time = config.mineTime / pick.speed

	miningBlocks[player.UserId] = {
		block = block,
		start = tick(),
		duration = time,
		mineral = mineral,
		color = config.color
	}

	-- GUI de progression
	local gui = Instance.new("BillboardGui")
	gui.Name = "MiningProgress"
	gui.Size = UDim2.new(5, 0, 0.8, 0)
	gui.StudsOffset = Vector3.new(0, 3.5, 0)
	gui.AlwaysOnTop = true
	gui.Parent = block

	local bg = Instance.new("Frame")
	bg.Size = UDim2.new(1, 0, 1, 0)
	bg.BackgroundColor3 = Color3.fromRGB(25, 25, 25)
	bg.BorderSizePixel = 0
	bg.Parent = gui

	local stroke = Instance.new("UIStroke")
	stroke.Color = Color3.fromRGB(150, 150, 150)
	stroke.Thickness = 3
	stroke.Parent = bg

	local fill = Instance.new("Frame")
	fill.Name = "Fill"
	fill.Size = UDim2.new(0, 0, 1, 0)
	fill.BackgroundColor3 = config.color
	fill.BorderSizePixel = 0
	fill.Parent = bg

	local gradient = Instance.new("UIGradient")
	gradient.Color = ColorSequence.new{
		ColorSequenceKeypoint.new(0, config.color),
		ColorSequenceKeypoint.new(1, Color3.fromRGB(
			math.min(config.color.R * 255 + 60, 255),
			math.min(config.color.G * 255 + 60, 255),
			math.min(config.color.B * 255 + 60, 255)
		))
	}
	gradient.Parent = fill

	local corner1 = Instance.new("UICorner")
	corner1.CornerRadius = UDim.new(0.3, 0)
	corner1.Parent = bg

	local corner2 = Instance.new("UICorner")
	corner2.CornerRadius = UDim.new(0.3, 0)
	corner2.Parent = fill

	local nameLabel = Instance.new("TextLabel")
	nameLabel.Size = UDim2.new(1, 0, 1, 0)
	nameLabel.BackgroundTransparency = 1
	nameLabel.Text = config.name .. " (" .. string.format("%.1f", time) .. "s)"
	nameLabel.TextColor3 = Color3.fromRGB(255, 255, 255)
	nameLabel.Font = Enum.Font.SourceSansBold
	nameLabel.TextSize = 22
	nameLabel.TextStrokeTransparency = 0.3
	nameLabel.Parent = bg
end

local function cancelMining(player)
	local data = miningBlocks[player.UserId]
	if data and data.block and data.block.Parent then
		local gui = data.block:FindFirstChild("MiningProgress")
		if gui then gui:Destroy() end
	end
	miningBlocks[player.UserId] = nil
end

-- ════════════════════════════════════════════════════════════════════════════
-- ███ SYSTÈME DE VENTE
-- ════════════════════════════════════════════════════════════════════════════

local function sellAll(player)
	local total = 0
	for mineral, config in pairs(MineralConfig) do
		local amount = player.Inventory[mineral].Value
		if amount > 0 then
			total = total + (amount * config.value)
			player.Inventory[mineral].Value = 0
		end
	end
	player.leaderstats.Money.Value = player.leaderstats.Money.Value + total
	return total
end

-- ════════════════════════════════════════════════════════════════════════════
-- ███ SYSTÈME DE BOUTIQUE
-- ════════════════════════════════════════════════════════════════════════════

local function buyPickaxe(player, name)
	local config = PickaxeConfig[name]
	if not config then return false end

	if player.OwnedPickaxes:FindFirstChild(name) and player.OwnedPickaxes[name].Value then
		return false
	end

	if player.leaderstats.Money.Value >= config.price then
		player.leaderstats.Money.Value = player.leaderstats.Money.Value - config.price

		local v = player.OwnedPickaxes:FindFirstChild(name) or Instance.new("BoolValue")
		v.Name = name
		v.Value = true
		v.Parent = player.OwnedPickaxes

		player.CurrentPickaxe.Value = name
		givePickaxeTool(player, name)
		return true
	end
	return false
end

function givePickaxeTool(player, name)
	local char = player.Character or player.CharacterAdded:Wait()
	local hum = char:WaitForChild("Humanoid")
	local bp = player:WaitForChild("Backpack")

	for _, t in pairs(bp:GetChildren()) do
		if t:IsA("Tool") then t:Destroy() end
	end
	for _, t in pairs(char:GetChildren()) do
		if t:IsA("Tool") then t:Destroy() end
	end

	local models = ReplicatedStorage:FindFirstChild("PickaxeModels")
	if not models then return end

	local model = models:FindFirstChild(name)
	if not model or not model:IsA("Tool") then return end

	local clone = model:Clone()
	for _, s in pairs(clone:GetDescendants()) do
		if s:IsA("BaseScript") then s:Destroy() end
	end

	clone.CanBeDropped = false
	clone.Parent = bp

	task.spawn(function()
		task.wait(0.1)
		hum:EquipTool(clone)
	end)
end

-- ════════════════════════════════════════════════════════════════════════════
-- ███ SYSTÈME DE QUÊTES (INTÉGRÉ)
-- ════════════════════════════════════════════════════════════════════════════

local DailyQuests = {
	{
		id = "mine_stone",
		name = "Mineur Débutant",
		description = "Mine 50 blocs de Pierre",
		icon = "🪨",
		targetType = "Stone",
		targetAmount = 50,
		reward = 500,
		difficulty = "simple",
		color = Color3.fromRGB(150, 150, 150)
	},
	{
		id = "mine_coal",
		name = "Charbonnier",
		description = "Mine 30 blocs de Charbon",
		icon = "⚫",
		targetType = "Coal",
		targetAmount = 30,
		reward = 800,
		difficulty = "simple",
		color = Color3.fromRGB(50, 50, 50)
	},
	{
		id = "earn_money",
		name = "Entrepreneur",
		description = "Gagne 5000$ au total",
		icon = "💰",
		targetType = "money",
		targetAmount = 5000,
		reward = 1500,
		difficulty = "simple",
		color = Color3.fromRGB(255, 215, 0)
	},
	{
		id = "mine_iron",
		name = "Forgeron",
		description = "Mine 20 blocs de Fer",
		icon = "⚪",
		targetType = "Iron",
		targetAmount = 20,
		reward = 1200,
		difficulty = "simple",
		color = Color3.fromRGB(200, 200, 200)
	},
	{
		id = "legendary_miner",
		name = "⭐ MAÎTRE MINEUR ⭐",
		description = "Mine 10 Diamants, 5 Émeraudes et 3 Rubis",
		icon = "💎",
		targetType = "multiple",
		targets = {
			{type = "Diamond", amount = 10},
			{type = "Emerald", amount = 5},
			{type = "Ruby", amount = 3}
		},
		reward = 25000,
		difficulty = "legendary",
		color = Color3.fromRGB(150, 0, 255)
	}
}

local function setupQuestData(player)
	local questData = player:WaitForChild("QuestData")
	local questProgress = questData:WaitForChild("QuestProgress")
	local completedQuests = questData:WaitForChild("CompletedQuests")

	for _, quest in ipairs(DailyQuests) do
		if quest.targetType == "multiple" then
			local questFolder = Instance.new("Folder")
			questFolder.Name = quest.id
			questFolder.Parent = questProgress

			for _, target in ipairs(quest.targets) do
				local progress = Instance.new("IntValue")
				progress.Name = target.type
				progress.Value = 0
				progress.Parent = questFolder
			end
		else
			local progress = Instance.new("IntValue")
			progress.Name = quest.id
			progress.Value = 0
			progress.Parent = questProgress
		end

		local completed = Instance.new("BoolValue")
		completed.Name = quest.id
		completed.Value = false
		completed.Parent = completedQuests
	end
end

local function updateQuestProgress(player, questId, mineralType, amount)
	local questData = player:FindFirstChild("QuestData")
	if not questData then return end

	local questProgress = questData:FindFirstChild("QuestProgress")
	local completedQuests = questData:FindFirstChild("CompletedQuests")
	if not questProgress or not completedQuests then return end

	local quest = nil
	for _, q in ipairs(DailyQuests) do
		if q.id == questId then
			quest = q
			break
		end
	end

	if not quest then return end

	local completed = completedQuests:FindFirstChild(questId)
	if completed and completed.Value then return end

	if quest.targetType == "multiple" then
		local questFolder = questProgress:FindFirstChild(questId)
		if questFolder then
			local progress = questFolder:FindFirstChild(mineralType)
			if progress then
				local targetAmount = 0
				for _, target in ipairs(quest.targets) do
					if target.type == mineralType then
						targetAmount = target.amount
						break
					end
				end

				progress.Value = math.min(progress.Value + amount, targetAmount)

				local allComplete = true
				for _, target in ipairs(quest.targets) do
					local targetProgress = questFolder:FindFirstChild(target.type)
					if not targetProgress or targetProgress.Value < target.amount then
						allComplete = false
						break
					end
				end

				if allComplete and completed then
					completed.Value = true
					completeQuest(player, quest)
				end
			end
		end
	else
		local progress = questProgress:FindFirstChild(questId)
		if progress then
			progress.Value = math.min(progress.Value + amount, quest.targetAmount)

			if progress.Value >= quest.targetAmount and completed then
				completed.Value = true
				completeQuest(player, quest)
			end
		end
	end
end

function completeQuest(player, quest)
	print("✅ " .. player.Name .. " a complété la quête: " .. quest.name)

	if player.leaderstats and player.leaderstats:FindFirstChild("Money") then
		player.leaderstats.Money.Value = player.leaderstats.Money.Value + quest.reward
	end

	local remoteFolder = ReplicatedStorage:FindFirstChild("MineSimulator")
	if remoteFolder then
		local questCompleteEvent = remoteFolder:FindFirstChild("QuestComplete")
		if questCompleteEvent then
			questCompleteEvent:FireClient(player, quest)
		end
	end
end

local function trackMining(player, mineralType, amount)
	for _, quest in ipairs(DailyQuests) do
		if quest.targetType == mineralType or
		   (quest.targetType == "multiple" and quest.targets) then
			updateQuestProgress(player, quest.id, mineralType, amount)
		end
	end
end

local function trackMoneyEarned(player, amount)
	local questData = player:FindFirstChild("QuestData")
	if not questData then return end

	local totalMoneyEarned = questData:FindFirstChild("TotalMoneyEarned")
	if totalMoneyEarned then
		totalMoneyEarned.Value = totalMoneyEarned.Value + amount

		for _, quest in ipairs(DailyQuests) do
			if quest.targetType == "money" then
				local questProgress = questData:FindFirstChild("QuestProgress")
				if questProgress then
					local progress = questProgress:FindFirstChild(quest.id)
					if progress then
						progress.Value = math.min(totalMoneyEarned.Value, quest.targetAmount)

						local completedQuests = questData:FindFirstChild("CompletedQuests")
						if completedQuests then
							local completed = completedQuests:FindFirstChild(quest.id)
							if completed and not completed.Value and progress.Value >= quest.targetAmount then
								completed.Value = true
								completeQuest(player, quest)
							end
						end
					end
				end
			end
		end
	end
end

-- ════════════════════════════════════════════════════════════════════════════
-- ███ REMOTE EVENTS (MINE + QUÊTES FUSIONNÉS)
-- ════════════════════════════════════════════════════════════════════════════

local folder = Instance.new("Folder")
folder.Name = "MineSimulator"
folder.Parent = ReplicatedStorage

local events = {
	Mine = Instance.new("RemoteEvent", folder),
	StopMine = Instance.new("RemoteEvent", folder),
	Sell = Instance.new("RemoteEvent", folder),
	BuyPickaxe = Instance.new("RemoteEvent", folder),
	EquipPickaxe = Instance.new("RemoteEvent", folder),
	GetPickaxes = Instance.new("RemoteFunction", folder),
	QuestComplete = Instance.new("RemoteEvent", folder),
	GetQuests = Instance.new("RemoteFunction", folder)
}

events.Mine.Name = "Mine"
events.StopMine.Name = "StopMine"
events.Sell.Name = "Sell"
events.BuyPickaxe.Name = "BuyPickaxe"
events.EquipPickaxe.Name = "EquipPickaxe"
events.GetPickaxes.Name = "GetPickaxes"
events.QuestComplete.Name = "QuestComplete"
events.GetQuests.Name = "GetQuests"

events.Mine.OnServerEvent:Connect(function(p, b)
	startMining(p, b)
end)

events.StopMine.OnServerEvent:Connect(function(p)
	cancelMining(p)
end)

events.Sell.OnServerEvent:Connect(function(p)
	local earned = sellAll(p)
	events.Sell:FireClient(p, earned)
end)

events.BuyPickaxe.OnServerEvent:Connect(function(p, name)
	local success = buyPickaxe(p, name)
	events.BuyPickaxe:FireClient(p, success, name)
end)

events.EquipPickaxe.OnServerEvent:Connect(function(p, name)
	if p.OwnedPickaxes:FindFirstChild(name) and p.OwnedPickaxes[name].Value then
		p.CurrentPickaxe.Value = name
		givePickaxeTool(p, name)
		events.EquipPickaxe:FireClient(p, true, name)
	end
end)

events.GetPickaxes.OnServerInvoke = function(p)
	local owned = {}
	for name in pairs(PickaxeConfig) do
		if p.OwnedPickaxes:FindFirstChild(name) and p.OwnedPickaxes[name].Value then
			table.insert(owned, name)
		end
	end
	return owned, p.CurrentPickaxe.Value
end

events.GetQuests.OnServerInvoke = function(player)
	local questData = player:FindFirstChild("QuestData")
	if not questData then return {} end

	local questProgress = questData:FindFirstChild("QuestProgress")
	local completedQuests = questData:FindFirstChild("CompletedQuests")

	local questsData = {}

	for _, quest in ipairs(DailyQuests) do
		local questInfo = {
			id = quest.id,
			name = quest.name,
			description = quest.description,
			icon = quest.icon,
			reward = quest.reward,
			difficulty = quest.difficulty,
			color = quest.color,
			completed = false,
			progress = {}
		}

		if quest.targetType == "multiple" then
			local questFolder = questProgress:FindFirstChild(quest.id)
			if questFolder then
				for _, target in ipairs(quest.targets) do
					local progress = questFolder:FindFirstChild(target.type)
					table.insert(questInfo.progress, {
						type = target.type,
						current = progress and progress.Value or 0,
						target = target.amount
					})
				end
			end
		else
			local progress = questProgress:FindFirstChild(quest.id)
			table.insert(questInfo.progress, {
				type = quest.targetType,
				current = progress and progress.Value or 0,
				target = quest.targetAmount
			})
		end

		local completed = completedQuests:FindFirstChild(quest.id)
		if completed then
			questInfo.completed = completed.Value
		end

		table.insert(questsData, questInfo)
	end

	return questsData
end

-- ════════════════════════════════════════════════════════════════════════════
-- ███ INITIALISATION
-- ════════════════════════════════════════════════════════════════════════════

local miningArea = Instance.new("Folder")
miningArea.Name = "MiningArea"
miningArea.Parent = workspace

print("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
print("🌍 Génération de la surface...")
print("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")

generateCompleteSurface(miningArea)

-- Lancer le système de file d'attente
task.spawn(processChunkQueue)

Players.PlayerAdded:Connect(function(player)
	setupPlayerData(player)

	player.CharacterAdded:Connect(function(char)
		local hrp = char:WaitForChild("HumanoidRootPart")

		-- ✅ Setup quest tracking
		task.wait(1)
		setupQuestData(player)

		-- Observer l'inventaire pour les quêtes
		local inventory = player:WaitForChild("Inventory")
		for _, mineralValue in pairs(inventory:GetChildren()) do
			if mineralValue:IsA("IntValue") then
				mineralValue:SetAttribute("PreviousValue", mineralValue.Value)

				mineralValue.Changed:Connect(function(newValue)
					local previousValue = mineralValue:GetAttribute("PreviousValue") or 0
					local difference = newValue - previousValue

					if difference > 0 then
						trackMining(player, mineralValue.Name, difference)
					end

					mineralValue:SetAttribute("PreviousValue", newValue)
				end)
			end
		end

		-- Observer l'argent pour les quêtes
		local money = player.leaderstats:WaitForChild("Money")
		money:SetAttribute("PreviousMoney", money.Value)

		money.Changed:Connect(function(newValue)
			local previousMoney = money:GetAttribute("PreviousMoney") or 0
			local difference = newValue - previousMoney

			if difference > 0 then
				trackMoneyEarned(player, difference)
			end

			money:SetAttribute("PreviousMoney", newValue)
		end)

		task.spawn(function()
			local lastCheck = Vector3.new(0, 0, 0)

			while char.Parent do
				local pos = hrp.Position

				if (pos - lastCheck).Magnitude > 20 then
					loadChunksAroundPlayer(pos, miningArea)
					lastCheck = pos
				end

				task.wait(3)
			end
		end)

		task.wait(1)
		givePickaxeTool(player, player.CurrentPickaxe.Value)
	end)
end)

RunService.Heartbeat:Connect(function()
	for id, data in pairs(miningBlocks) do
		local p = Players:GetPlayerByUserId(id)
		if p then
			updateMining(p)
		else
			miningBlocks[id] = nil
		end
	end
end)

print("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
print("✅ MINING SIMULATOR PRO CORRIGÉ - CHARGÉ!")
print("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
print("📊 15 types de minerais avec couleurs ULTRA VIVES")
print("⛏️ 8 pioches disponibles")
print("⚡ Génération INFINIE en profondeur")
print("⏱️ Temps de minage progressif (plus rare = plus long)")
print("📋 Système de quêtes intégré")
print("🎮 Prêt à jouer!")
print("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
