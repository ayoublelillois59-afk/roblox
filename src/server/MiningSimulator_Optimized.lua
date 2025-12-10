-- ████████████████████████████████████████████████████████████████████████████
-- ███                                                                      ███
-- ███         🏆 ULTIMATE MINING SIMULATOR PRO - OPTIMISÉ 🏆             ███
-- ███                    Version Professionnelle 2.2                       ███
-- ███               Performance & Visuels Améliorés                        ███
-- ███                                                                      ███
-- ████████████████████████████████████████████████████████████████████████████

local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local RunService = game:GetService("RunService")
local TweenService = game:GetService("TweenService")
local Debris = game:GetService("Debris")

print("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
print("🔨 CHARGEMENT MINING SIMULATOR PRO OPTIMISÉ")
print("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")

-- ════════════════════════════════════════════════════════════════════════════
-- ███ CONFIGURATION - OPTIMISÉE POUR PERFORMANCES
-- ════════════════════════════════════════════════════════════════════════════

local BLOCK_SIZE = 3.33
local CHUNK_SIZE = 8  -- Réduit de 10 à 8 pour meilleures performances
local SURFACE_RADIUS = 30  -- Réduit de 40 à 30
local MAX_CONCURRENT_CHUNKS = 3  -- Limite de chunks générés simultanément
local BLOCKS_PER_FRAME = 5  -- Nombre de blocs générés par frame

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
		color = Color3.fromRGB(0, 255, 50),  -- Vert ultra vif
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
		color = Color3.fromRGB(180, 100, 30),  -- Marron plus saturé
		name = "🟤 Terre",
		minDepth = 0,
		maxDepth = 2,
		mineTime = 0.1,
		rarity = 100,
		tier = 0,
		style = "dirt"
	},

	-- TIER 1 - Communs (couleurs plus vives)
	Stone = {
		value = 3,
		color = Color3.fromRGB(150, 150, 160),  -- Gris plus clair
		name = "⚪ Pierre",
		minDepth = 2,
		maxDepth = 999,
		mineTime = 0.3,
		rarity = 80,
		tier = 1,
		style = "stone"
	},

	Coal = {
		value = 10,
		color = Color3.fromRGB(50, 50, 60),  -- Noir avec teinte bleue
		name = "⚫ Charbon",
		minDepth = 3,
		maxDepth = 999,
		mineTime = 0.8,
		rarity = 50,
		tier = 1,
		style = "ore"
	},

	Copper = {
		value = 20,
		color = Color3.fromRGB(255, 140, 60),  -- Orange cuivre éclatant
		name = "🟠 Cuivre",
		minDepth = 5,
		maxDepth = 999,
		mineTime = 1,
		rarity = 35,
		tier = 1,
		style = "ore"
	},

	-- TIER 2 - Peu communs (couleurs saturées)
	Iron = {
		value = 50,
		color = Color3.fromRGB(220, 220, 240),  -- Blanc argenté brillant
		name = "⚪ Fer",
		minDepth = 10,
		maxDepth = 999,
		mineTime = 1.5,
		rarity = 30,
		tier = 2,
		style = "ore"
	},

	Silver = {
		value = 100,
		color = Color3.fromRGB(240, 240, 255),  -- Argent ultra brillant
		name = "💿 Argent",
		minDepth = 15,
		maxDepth = 999,
		mineTime = 2,
		rarity = 20,
		tier = 2,
		style = "precious"
	},

	Gold = {
		value = 200,
		color = Color3.fromRGB(255, 230, 0),  -- Or éclatant pur
		name = "🟡 Or",
		minDepth = 20,
		maxDepth = 999,
		mineTime = 3,
		rarity = 15,
		tier = 2,
		style = "precious"
	},

	-- TIER 3 - Rares (couleurs néon)
	Sapphire = {
		value = 500,
		color = Color3.fromRGB(0, 100, 255),  -- Bleu saphir électrique
		name = "💙 Saphir",
		minDepth = 30,
		maxDepth = 999,
		mineTime = 4,
		rarity = 10,
		tier = 3,
		style = "crystal"
	},

	Emerald = {
		value = 800,
		color = Color3.fromRGB(0, 255, 120),  -- Vert émeraude lumineux
		name = "💚 Émeraude",
		minDepth = 35,
		maxDepth = 999,
		mineTime = 5,
		rarity = 8,
		tier = 3,
		style = "crystal"
	},

	Ruby = {
		value = 1200,
		color = Color3.fromRGB(255, 0, 80),  -- Rouge rubis intense
		name = "❤️ Rubis",
		minDepth = 40,
		maxDepth = 999,
		mineTime = 6,
		rarity = 6,
		tier = 3,
		style = "crystal"
	},

	-- TIER 4 - Épiques (couleurs ultra saturées)
	Diamond = {
		value = 2500,
		color = Color3.fromRGB(150, 255, 255),  -- Cyan diamant brillant
		name = "💎 Diamant",
		minDepth = 50,
		maxDepth = 999,
		mineTime = 7,
		rarity = 4,
		tier = 4,
		style = "crystal"
	},

	Amethyst = {
		value = 5000,
		color = Color3.fromRGB(200, 50, 255),  -- Violet améthyste vif
		name = "💜 Améthyste",
		minDepth = 60,
		maxDepth = 999,
		mineTime = 8,
		rarity = 3,
		tier = 4,
		style = "crystal"
	},

	-- TIER 5 - Légendaires (couleurs extrêmes)
	Obsidian = {
		value = 10000,
		color = Color3.fromRGB(100, 0, 150),  -- Violet noir profond
		name = "🖤 Obsidienne",
		minDepth = 75,
		maxDepth = 999,
		mineTime = 10,
		rarity = 2,
		tier = 5,
		style = "crystal"
	},

	Mythril = {
		value = 25000,
		color = Color3.fromRGB(0, 255, 255),  -- Cyan mythril pur
		name = "🌟 Mithril",
		minDepth = 100,
		maxDepth = 999,
		mineTime = 12,
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
		speed = 1,
		price = 0,
		range = 1,
		name = "🪵 Pioche en Bois",
		description = "Une simple pioche de débutant"
	},

	StonePickaxe = {
		power = 2,
		speed = 2,
		price = 150,
		range = 1,
		name = "🪨 Pioche en Pierre",
		description = "2x plus rapide"
	},

	IronPickaxe = {
		power = 5,
		speed = 5,
		price = 750,
		range = 1,
		name = "⚪ Pioche en Fer",
		description = "5x plus rapide"
	},

	GoldPickaxe = {
		power = 10,
		speed = 10,
		price = 3000,
		range = 2,
		name = "🟡 Pioche en Or",
		description = "10x plus rapide + 2 blocs"
	},

	DiamondPickaxe = {
		power = 20,
		speed = 20,
		price = 15000,
		range = 3,
		name = "💎 Pioche en Diamant",
		description = "20x plus rapide + 3 blocs"
	},

	ObsidianPickaxe = {
		power = 50,
		speed = 50,
		price = 75000,
		range = 4,
		name = "🖤 Pioche d'Obsidienne",
		description = "50x plus rapide + 4 blocs"
	},

	MythrilPickaxe = {
		power = 100,
		speed = 100,
		price = 300000,
		range = 6,
		name = "🌟 Pioche de Mithril",
		description = "100x plus rapide + 6 blocs"
	},

	LegendaryPickaxe = {
		power = 200,
		speed = 999,
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
		-- MINERAIS COMMUNS - Optimisé (moins de veines)
		block.Material = Enum.Material.Slate
		block.Color = Color3.fromRGB(65, 65, 70)

		-- Seulement 3-5 veines au lieu de 6-12
		local veinCount = math.random(3, 5)
		for i = 1, veinCount do
			local vein = Instance.new("Part")
			vein.Size = Vector3.new(0.8, 0.8, 0.8)
			vein.Color = config.color
			vein.Material = Enum.Material.Neon  -- NEON pour plus de vivacité
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
		-- MINERAIS PRÉCIEUX - Optimisé (moins de pépites)
		block.Material = Enum.Material.Slate
		block.Color = Color3.fromRGB(45, 45, 50)

		-- 6-8 pépites au lieu de 12-20
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

		-- Une seule lumière
		local light = Instance.new("PointLight")
		light.Color = config.color
		light.Brightness = 4
		light.Range = 18
		light.Parent = block

		-- Un seul sparkle
		local sparkle = Instance.new("Sparkles")
		sparkle.SparkleColor = config.color
		sparkle.Parent = block

	elseif style == "crystal" then
		-- CRISTAUX - Version optimisée
		block.Material = Enum.Material.Slate
		block.Color = Color3.fromRGB(20, 20, 25)

		-- UN SEUL gros cristal central
		local mainCrystal = Instance.new("Part")
		mainCrystal.Size = Vector3.new(2.5, 4, 2.5)
		mainCrystal.Color = config.color
		mainCrystal.Material = Enum.Material.Neon  -- NEON pur
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

		-- Seulement 4 petits cristaux au lieu de 8-14
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

		-- UNE seule lumière puissante
		local light1 = Instance.new("PointLight")
		light1.Color = config.color
		light1.Brightness = 10
		light1.Range = 35
		light1.Parent = mainCrystal

		-- UN seul sparkle
		local sparkle = Instance.new("Sparkles")
		sparkle.SparkleColor = config.color
		sparkle.Parent = mainCrystal

		-- Rotation simple sans pulse (évite les tweens constants)
		task.spawn(function()
			while mainCrystal.Parent do
				mainCrystal.Orientation = mainCrystal.Orientation + Vector3.new(0, 1, 0)
				task.wait(0.05)
			end
		end)
	end
end

-- ════════════════════════════════════════════════════════════════════════════
-- ███ SÉLECTION DE MINERAI (Inchangé)
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

-- Générer surface (optimisée)
local function generateCompleteSurface(miningArea)
	if surfaceGenerated then return end
	surfaceGenerated = true

	print("🌍 Génération de la surface complète...")

	local surfaceFolder = Instance.new("Folder")
	surfaceFolder.Name = "Surface"
	surfaceFolder.Parent = miningArea

	local blocksCreated = 0
	local blockList = {}

	-- Préparer tous les blocs de surface
	for x = -SURFACE_RADIUS, SURFACE_RADIUS do
		for z = -SURFACE_RADIUS, SURFACE_RADIUS do
			local dist = math.sqrt(x*x + z*z)
			if dist <= SURFACE_RADIUS then
				table.insert(blockList, {x = x, z = z, y = -1, mineral = "Grass"})
			end
		end
	end

	-- Terre
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

	-- Générer progressivement (5 blocs par frame)
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

		task.wait()  -- Yield chaque 5 blocs
	end

	print("✅ Surface générée: " .. blocksCreated .. " blocs")
end

-- Générer chunk souterrain (version optimisée et progressive)
local function generateUndergroundChunk(chunkX, chunkZ, chunkY, miningArea)
	if chunkY < 3 then return end

	local key = chunkX .. "_" .. chunkZ .. "_" .. chunkY
	if generatedChunks[key] then return end

	-- Marquer comme en cours
	generatedChunks[key] = "generating"

	local folder = Instance.new("Folder")
	folder.Name = "Chunk_" .. key
	folder.Parent = miningArea

	local blocksCreated = 0
	local blockList = {}

	-- Préparer liste de blocs
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

	-- Générer progressivement
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

		task.wait()  -- Yield chaque 5 blocs
	end

	generatedChunks[key] = folder

	if blocksCreated > 0 then
		print("⛏️ Chunk " .. key .. " : " .. blocksCreated .. " blocs")
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

-- Charger chunks (ajoute à la file d'attente)
local function loadChunksAroundPlayer(position, miningArea)
	local chunkX = math.floor(position.X / (BLOCK_SIZE * CHUNK_SIZE))
	local chunkZ = math.floor(position.Z / (BLOCK_SIZE * CHUNK_SIZE))
	local chunkY = math.floor(-position.Y / (BLOCK_SIZE * CHUNK_SIZE))

	-- Charger seulement 1 couche de chunks (3x3 au lieu de 3x3x3)
	for dx = -1, 1 do
		for dz = -1, 1 do
			local cy = math.max(3, chunkY)
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

-- ════════════════════════════════════════════════════════════════════════════
-- ███ DONNÉES JOUEUR (Inchangé)
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

	print("✅ Joueur " .. player.Name .. " initialisé")
end

-- ════════════════════════════════════════════════════════════════════════════
-- ███ SYSTÈME DE MINAGE (Inchangé)
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

	local time = config.mineTime / pick.speed

	miningBlocks[player.UserId] = {
		block = block,
		start = tick(),
		duration = time,
		mineral = mineral,
		color = config.color
	}

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
	nameLabel.Text = config.name
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
-- ███ REMOTE EVENTS
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
	GetPickaxes = Instance.new("RemoteFunction", folder)
}

events.Mine.Name = "Mine"
events.StopMine.Name = "StopMine"
events.Sell.Name = "Sell"
events.BuyPickaxe.Name = "BuyPickaxe"
events.EquipPickaxe.Name = "EquipPickaxe"
events.GetPickaxes.Name = "GetPickaxes"

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

		task.spawn(function()
			local lastCheck = Vector3.new(0, 0, 0)

			while char.Parent do
				local pos = hrp.Position

				if (pos - lastCheck).Magnitude > 20 then
					loadChunksAroundPlayer(pos, miningArea)
					lastCheck = pos
				end

				task.wait(3)  -- Vérifie toutes les 3 secondes au lieu de 2
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
print("✅ MINING SIMULATOR PRO OPTIMISÉ - CHARGÉ!")
print("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
print("📊 15 types de minerais avec couleurs ULTRA VIVES")
print("⛏️ 8 pioches disponibles")
print("⚡ Génération progressive SANS LAG")
print("🎨 Effets visuels optimisés")
print("🎮 Prêt à jouer!")
print("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
