-- ████████████████████████████████████████████████████████████████████████████
-- ███                                                                      ███
-- ███              🏆 ULTIMATE MINING SIMULATOR PRO 🏆                    ███
-- ███                    Version Professionnelle 2.0                       ███
-- ███                  Créé avec Excellence par Claude                     ███
-- ███                                                                      ███
-- ████████████████████████████████████████████████████████████████████████████

local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local RunService = game:GetService("RunService")
local TweenService = game:GetService("TweenService")
local Debris = game:GetService("Debris")

print("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
print("🔨 CHARGEMENT ULTIMATE MINING SIMULATOR PRO")
print("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")

-- ════════════════════════════════════════════════════════════════════════════
-- ███ CONFIGURATION DES MINERAIS - 15 TYPES
-- ════════════════════════════════════════════════════════════════════════════

local MineralConfig = {
	-- SURFACE
	Grass = {
		value = 0,
		color = Color3.fromRGB(34, 139, 34),
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
		color = Color3.fromRGB(139, 90, 43),
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
		color = Color3.fromRGB(110, 110, 115),
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
		color = Color3.fromRGB(35, 35, 40),
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
		color = Color3.fromRGB(184, 115, 51),
		name = "🟠 Cuivre",
		minDepth = 5,
		maxDepth = 999,
		mineTime = 1,
		rarity = 35,
		tier = 1,
		style = "ore"
	},

	-- TIER 2 - Peu communs
	Iron = {
		value = 50,
		color = Color3.fromRGB(200, 200, 205),
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
		color = Color3.fromRGB(230, 230, 240),
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
		color = Color3.fromRGB(255, 215, 0),
		name = "🟡 Or",
		minDepth = 20,
		maxDepth = 999,
		mineTime = 3,
		rarity = 15,
		tier = 2,
		style = "precious"
	},

	-- TIER 3 - Rares
	Sapphire = {
		value = 500,
		color = Color3.fromRGB(15, 82, 186),
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
		color = Color3.fromRGB(80, 200, 120),
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
		color = Color3.fromRGB(224, 17, 95),
		name = "❤️ Rubis",
		minDepth = 40,
		maxDepth = 999,
		mineTime = 6,
		rarity = 6,
		tier = 3,
		style = "crystal"
	},

	-- TIER 4 - Épiques
	Diamond = {
		value = 2500,
		color = Color3.fromRGB(185, 242, 255),
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
		color = Color3.fromRGB(153, 102, 204),
		name = "💜 Améthyste",
		minDepth = 60,
		maxDepth = 999,
		mineTime = 8,
		rarity = 3,
		tier = 4,
		style = "crystal"
	},

	-- TIER 5 - Légendaires
	Obsidian = {
		value = 10000,
		color = Color3.fromRGB(16, 12, 28),
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
		color = Color3.fromRGB(100, 200, 255),
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
-- ███ CONFIGURATION DES PIOCHES - 8 TYPES
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
-- ███ STYLES VISUELS ULTRA PROFESSIONNELS
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
	nameLabel.TextStrokeTransparency = 0.5
	nameLabel.TextStrokeColor3 = Color3.fromRGB(0, 0, 0)
	nameLabel.Parent = billboardGui
end

local function styleBlock(block, mineral, config)
	local style = config.style

	-- Nom flottant pour tous les minerais (sauf herbe et terre)
	if mineral ~= "Grass" and mineral ~= "Dirt" and mineral ~= "Stone" then
		createFloatingName(block, config.name)
	end

	if style == "grass" then
		-- HERBE ULTRA RÉALISTE
		block.Material = Enum.Material.Grass
		block.Color = config.color
		block.TopSurface = Enum.SurfaceType.Smooth

		-- Brins d'herbe aléatoires
		if math.random(1, 2) == 1 then
			for i = 1, math.random(2, 4) do
				local grass = Instance.new("Part")
				grass.Size = Vector3.new(0.15, 0.6, 0.15)
				grass.Color = Color3.fromRGB(math.random(30, 60), math.random(180, 220), math.random(30, 60))
				grass.Material = Enum.Material.Grass
				grass.Anchored = true
				grass.CanCollide = false
				grass.Position = block.Position + Vector3.new(
					math.random(-15, 15)/20,
					0.6,
					math.random(-15, 15)/20
				)
				grass.Orientation = Vector3.new(0, math.random(0, 360), math.random(-10, 10))
				grass.Parent = block
			end
		end

	elseif style == "dirt" then
		-- TERRE RÉALISTE
		block.Material = Enum.Material.Ground
		local variation = math.random(-15, 15)
		block.Color = Color3.fromRGB(
			math.clamp(139 + variation, 100, 180),
			math.clamp(90 + variation, 60, 120),
			math.clamp(43 + variation, 30, 70)
		)

	elseif style == "stone" then
		-- PIERRE AVEC FISSURES
		block.Material = Enum.Material.Slate
		local variation = math.random(-25, 25)
		block.Color = Color3.fromRGB(
			math.clamp(110 + variation, 80, 140),
			math.clamp(110 + variation, 80, 140),
			math.clamp(115 + variation, 85, 145)
		)

		-- Fissures aléatoires
		if math.random(1, 3) == 1 then
			local crack = Instance.new("Decal")
			crack.Face = Enum.NormalId[{"Front", "Back", "Left", "Right", "Top"}[math.random(1, 5)]]
			crack.Texture = "rbxasset://textures/blackBkg_square.png"
			crack.Color3 = Color3.fromRGB(50, 50, 50)
			crack.Transparency = 0.8
			crack.Parent = block
		end

	elseif style == "ore" then
		-- MINERAIS COMMUNS (Charbon, Cuivre, Fer)
		block.Material = Enum.Material.Slate
		block.Color = Color3.fromRGB(65, 65, 70)

		-- Veines de minerai réalistes
		local veinCount = math.random(6, 12)
		for i = 1, veinCount do
			local vein = Instance.new("Part")
			vein.Size = Vector3.new(
				math.random(4, 12)/10,
				math.random(4, 12)/10,
				math.random(4, 12)/10
			)
			vein.Color = config.color
			vein.Material = Enum.Material.SmoothPlastic
			vein.Anchored = true
			vein.CanCollide = false
			vein.Position = block.Position + Vector3.new(
				math.random(-16, 16)/10,
				math.random(-16, 16)/10,
				math.random(-16, 16)/10
			)
			vein.Orientation = Vector3.new(
				math.random(0, 360),
				math.random(0, 360),
				math.random(0, 360)
			)
			vein.Parent = block

			if mineral == "Iron" then
				vein.Reflectance = 0.4
			end
		end

		-- Particules ambiantes
		if config.tier >= 2 then
			local sparkle = Instance.new("Sparkles")
			sparkle.SparkleColor = config.color
			sparkle.Parent = block
		end

	elseif style == "precious" then
		-- MINERAIS PRÉCIEUX (Argent, Or) - ULTRA BRILLANTS
		block.Material = Enum.Material.Slate
		block.Color = Color3.fromRGB(45, 45, 50)

		-- Beaucoup de pépites brillantes
		local nuggetCount = math.random(12, 20)
		for i = 1, nuggetCount do
			local nugget = Instance.new("Part")
			nugget.Size = Vector3.new(
				math.random(6, 16)/10,
				math.random(6, 16)/10,
				math.random(6, 16)/10
			)
			nugget.Color = config.color
			nugget.Material = Enum.Material.Neon
			nugget.Transparency = 0.1
			nugget.Reflectance = 0.7
			nugget.Anchored = true
			nugget.CanCollide = false
			nugget.Position = block.Position + Vector3.new(
				math.random(-16, 16)/10,
				math.random(-16, 16)/10,
				math.random(-16, 16)/10
			)
			nugget.Orientation = Vector3.new(
				math.random(0, 360),
				math.random(0, 360),
				math.random(0, 360)
			)
			nugget.Parent = block

			-- Mesh irrégulier
			local mesh = Instance.new("SpecialMesh")
			mesh.MeshType = Enum.MeshType.Brick
			mesh.Scale = Vector3.new(
				math.random(8, 14)/10,
				math.random(8, 14)/10,
				math.random(8, 14)/10
			)
			mesh.Parent = nugget
		end

		-- Lumière dorée/argentée intense
		local light = Instance.new("PointLight")
		light.Color = config.color
		light.Brightness = 3
		light.Range = 15
		light.Shadows = true
		light.Parent = block

		-- Particules scintillantes multiples
		local sparkles1 = Instance.new("Sparkles")
		sparkles1.SparkleColor = config.color
		sparkles1.Parent = block

		local sparkles2 = Instance.new("Sparkles")
		sparkles2.SparkleColor = Color3.fromRGB(255, 255, 200)
		sparkles2.Parent = block

		-- Aura brillante
		local aura = Instance.new("Part")
		aura.Size = Vector3.new(4, 4, 4)
		aura.Color = config.color
		aura.Material = Enum.Material.Neon
		aura.Transparency = 0.85
		aura.Anchored = true
		aura.CanCollide = false
		aura.Position = block.Position
		aura.Parent = block

		local auraMesh = Instance.new("SpecialMesh")
		auraMesh.MeshType = Enum.MeshType.Sphere
		auraMesh.Parent = aura

	elseif style == "crystal" then
		-- CRISTAUX LÉGENDAIRES - ULTRA MAGNIFIQUES
		block.Material = Enum.Material.Slate
		block.Color = Color3.fromRGB(20, 20, 25)

		-- GROS CRISTAL CENTRAL ÉPIQUE
		local mainCrystal = Instance.new("Part")
		mainCrystal.Size = Vector3.new(2.5, 4, 2.5)
		mainCrystal.Color = config.color
		mainCrystal.Material = Enum.Material.Neon
		mainCrystal.Transparency = 0.15
		mainCrystal.Reflectance = 0.95
		mainCrystal.Anchored = true
		mainCrystal.CanCollide = false
		mainCrystal.Position = block.Position + Vector3.new(0, 1, 0)
		mainCrystal.Parent = block

		-- Mesh de cristal/diamant
		local mesh = Instance.new("SpecialMesh")
		mesh.MeshType = Enum.MeshType.FileMesh
		mesh.MeshId = "rbxassetid://9856898"
		mesh.Scale = Vector3.new(2, 3, 2)
		mesh.Parent = mainCrystal

		mainCrystal.Orientation = Vector3.new(0, math.random(0, 360), 0)

		-- Multiples petits cristaux satellites
		local smallCount = math.random(8, 14)
		for i = 1, smallCount do
			local small = Instance.new("Part")
			small.Size = Vector3.new(1, 1.5, 1)
			small.Color = config.color
			small.Material = Enum.Material.Neon
			small.Transparency = 0.25
			small.Reflectance = 0.9
			small.Anchored = true
			small.CanCollide = false

			local angle = (i / smallCount) * math.pi * 2
			local distance = math.random(10, 15) / 10
			small.Position = block.Position + Vector3.new(
				math.cos(angle) * distance,
				math.random(-5, 12) / 10,
				math.sin(angle) * distance
			)
			small.Parent = block

			local smallMesh = Instance.new("SpecialMesh")
			smallMesh.MeshType = Enum.MeshType.FileMesh
			smallMesh.MeshId = "rbxassetid://9856898"
			smallMesh.Scale = Vector3.new(0.8, 1.4, 0.8)
			smallMesh.Parent = small

			small.Orientation = Vector3.new(
				math.random(-35, 35),
				math.random(0, 360),
				math.random(-35, 35)
			)
		end

		-- TRIPLE LUMIÈRE ULTRA INTENSE
		local light1 = Instance.new("PointLight")
		light1.Color = config.color
		light1.Brightness = 7
		light1.Range = 30
		light1.Shadows = true
		light1.Parent = mainCrystal

		local light2 = Instance.new("PointLight")
		light2.Color = Color3.fromRGB(255, 255, 255)
		light2.Brightness = 5
		light2.Range = 20
		light2.Parent = mainCrystal

		-- PARTICULES MULTIPLES
		local sparkles1 = Instance.new("Sparkles")
		sparkles1.SparkleColor = config.color
		sparkles1.Parent = mainCrystal

		local sparkles2 = Instance.new("Sparkles")
		sparkles2.SparkleColor = Color3.fromRGB(255, 255, 255)
		sparkles2.Parent = mainCrystal

		-- GROSSE AURA PULSANTE
		local aura = Instance.new("Part")
		aura.Size = Vector3.new(6, 6, 6)
		aura.Color = config.color
		aura.Material = Enum.Material.Neon
		aura.Transparency = 0.75
		aura.Anchored = true
		aura.CanCollide = false
		aura.Position = block.Position
		aura.Parent = block

		local auraMesh = Instance.new("SpecialMesh")
		auraMesh.MeshType = Enum.MeshType.Sphere
		auraMesh.Parent = aura

		-- Animation de pulse et rotation
		task.spawn(function()
			while aura.Parent and mainCrystal.Parent do
				-- Pulse de l'aura
				local pulseTween = TweenService:Create(
					aura,
					TweenInfo.new(2, Enum.EasingStyle.Sine, Enum.EasingDirection.InOut, -1, true),
					{Size = Vector3.new(6.5, 6.5, 6.5), Transparency = 0.65}
				)
				pulseTween:Play()

				-- Rotation du cristal
				local rotateTween = TweenService:Create(
					mainCrystal,
					TweenInfo.new(15, Enum.EasingStyle.Linear, Enum.EasingDirection.InOut, -1),
					{Orientation = mainCrystal.Orientation + Vector3.new(0, 360, 0)}
				)
				rotateTween:Play()

				task.wait(30)
			end
		end)

		-- RAYON DE LUMIÈRE VERTICAL pour minerais tier 4+
		if config.tier >= 4 then
			local beam = Instance.new("Part")
			beam.Size = Vector3.new(0.5, 15, 0.5)
			beam.Color = config.color
			beam.Material = Enum.Material.Neon
			beam.Transparency = 0.6
			beam.Anchored = true
			beam.CanCollide = false
			beam.Position = block.Position + Vector3.new(0, 7.5, 0)
			beam.Parent = block

			local beamMesh = Instance.new("CylinderMesh")
			beamMesh.Parent = beam

			-- Animation du rayon
			task.spawn(function()
				while beam.Parent do
					TweenService:Create(
						beam,
						TweenInfo.new(1.5, Enum.EasingStyle.Sine, Enum.EasingDirection.InOut, -1, true),
						{Transparency = 0.4}
					):Play()
					task.wait(3)
				end
			end)
		end

		-- PARTICULES FLOTTANTES pour minerais tier 5
		if config.tier >= 5 then
			for i = 1, 5 do
				local particle = Instance.new("Part")
				particle.Size = Vector3.new(0.3, 0.3, 0.3)
				particle.Color = config.color
				particle.Material = Enum.Material.Neon
				particle.Transparency = 0.3
				particle.Anchored = true
				particle.CanCollide = false
				particle.Shape = Enum.PartType.Ball

				local angle = (i / 5) * math.pi * 2
				particle.Position = block.Position + Vector3.new(
					math.cos(angle) * 2,
					2,
					math.sin(angle) * 2
				)
				particle.Parent = block

				-- Animation orbitale
				task.spawn(function()
					local orbitAngle = angle
					while particle.Parent do
						orbitAngle = orbitAngle + math.rad(2)
						particle.Position = block.Position + Vector3.new(
							math.cos(orbitAngle) * 2,
							2 + math.sin(orbitAngle * 2),
							math.sin(orbitAngle) * 2
						)
						task.wait(0.03)
					end
				end)
			end
		end
	end
end

-- ════════════════════════════════════════════════════════════════════════════
-- ███ SÉLECTION INTELLIGENTE DE MINERAI
-- ════════════════════════════════════════════════════════════════════════════

local function getRandomMineral(depth)
	-- Herbe uniquement en surface
	if depth == -1 then
		return "Grass"
	end

	-- Terre près de la surface
	if depth >= 0 and depth <= 2 then
		if math.random(1, 100) <= 70 then
			return "Dirt"
		end
	end

	-- Sélection pondérée pour les autres minerais
	local candidates = {}
	local totalWeight = 0

	for mineral, config in pairs(MineralConfig) do
		if mineral ~= "Grass" and mineral ~= "Dirt" then
			if depth >= config.minDepth and depth <= config.maxDepth then
				-- Calcul du poids
				local weight = config.rarity

				-- Bonus si on est loin de la profondeur minimale
				local depthBonus = math.max(0, (depth - config.minDepth) * 0.4)
				weight = weight + depthBonus

				-- Réduire les minerais communs en profondeur
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
-- ███ SYSTÈME DE GÉNÉRATION ULTRA OPTIMISÉ
-- ════════════════════════════════════════════════════════════════════════════

local surfaceGenerated = false
local generatedChunks = {}
local BLOCK_SIZE = 3.33
local CHUNK_SIZE = 10
local SURFACE_RADIUS = 40  -- Rayon de la surface (herbe + terre)

-- Générer la surface complète (herbe + terre)
local function generateCompleteSurface(miningArea)
	if surfaceGenerated then return end
	surfaceGenerated = true

	print("🌍 Génération de la surface complète...")

	local surfaceFolder = Instance.new("Folder")
	surfaceFolder.Name = "Surface"
	surfaceFolder.Parent = miningArea

	local blocksCreated = 0

	-- Couche d'herbe (y = -1)
	for x = -SURFACE_RADIUS, SURFACE_RADIUS do
		for z = -SURFACE_RADIUS, SURFACE_RADIUS do
			local dist = math.sqrt(x*x + z*z)
			if dist <= SURFACE_RADIUS then
				local block = Instance.new("Part")
				block.Size = Vector3.new(BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE)
				block.Position = Vector3.new(x * BLOCK_SIZE, BLOCK_SIZE, z * BLOCK_SIZE)
				block.Anchored = true
				block.Name = "Grass"
				block.Parent = surfaceFolder

				styleBlock(block, "Grass", MineralConfig.Grass)

				local tag = Instance.new("StringValue")
				tag.Name = "MineralType"
				tag.Value = "Grass"
				tag.Parent = block

				local depthTag = Instance.new("IntValue")
				depthTag.Name = "Depth"
				depthTag.Value = -1
				depthTag.Parent = block

				blocksCreated = blocksCreated + 1
			end
		end

		if x % 10 == 0 then
			task.wait()
		end
	end

	-- Couche de terre (y = 0, 1, 2)
	for y = 0, 2 do
		for x = -SURFACE_RADIUS, SURFACE_RADIUS do
			for z = -SURFACE_RADIUS, SURFACE_RADIUS do
				local dist = math.sqrt(x*x + z*z)
				if dist <= SURFACE_RADIUS then
					local block = Instance.new("Part")
					block.Size = Vector3.new(BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE)
					block.Position = Vector3.new(x * BLOCK_SIZE, -(y * BLOCK_SIZE), z * BLOCK_SIZE)
					block.Anchored = true
					block.Name = "Dirt"
					block.Parent = surfaceFolder

					styleBlock(block, "Dirt", MineralConfig.Dirt)

					local tag = Instance.new("StringValue")
					tag.Name = "MineralType"
					tag.Value = "Dirt"
					tag.Parent = block

					local depthTag = Instance.new("IntValue")
					depthTag.Name = "Depth"
					depthTag.Value = y
					depthTag.Parent = block

					blocksCreated = blocksCreated + 1
				end
			end
		end

		task.wait()
	end

	print("✅ Surface générée: " .. blocksCreated .. " blocs")
end

-- Générer un chunk souterrain
local function generateUndergroundChunk(chunkX, chunkZ, chunkY, miningArea)
	-- Ne pas générer au-dessus de la profondeur 3
	if chunkY < 3 then return end

	local key = chunkX .. "_" .. chunkZ .. "_" .. chunkY
	if generatedChunks[key] then return end

	local folder = Instance.new("Folder")
	folder.Name = "Chunk_" .. key
	folder.Parent = miningArea

	local blocksCreated = 0

	for x = 0, CHUNK_SIZE - 1 do
		for z = 0, CHUNK_SIZE - 1 do
			for y = 0, CHUNK_SIZE - 1 do
				local worldX = chunkX * CHUNK_SIZE + x
				local worldZ = chunkZ * CHUNK_SIZE + z
				local worldY = chunkY * CHUNK_SIZE + y

				-- Vérifier le rayon
				local dist = math.sqrt(worldX*worldX + worldZ*worldZ)
				local radius = SURFACE_RADIUS + (worldY * 0.2)

				if dist <= radius then
					local mineral = getRandomMineral(worldY)
					local config = MineralConfig[mineral]

					local block = Instance.new("Part")
					block.Size = Vector3.new(BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE)
					block.Position = Vector3.new(
						worldX * BLOCK_SIZE,
						-(worldY * BLOCK_SIZE),
						worldZ * BLOCK_SIZE
					)
					block.Anchored = true
					block.Name = mineral
					block.Parent = folder

					styleBlock(block, mineral, config)

					local tag = Instance.new("StringValue")
					tag.Name = "MineralType"
					tag.Value = mineral
					tag.Parent = block

					local depthTag = Instance.new("IntValue")
					depthTag.Name = "Depth"
					depthTag.Value = worldY
					depthTag.Parent = block

					blocksCreated = blocksCreated + 1
				end
			end
		end

		if x % 3 == 0 then
			task.wait()
		end
	end

	generatedChunks[key] = folder

	if blocksCreated > 0 then
		print("⛏️ Chunk " .. key .. " : " .. blocksCreated .. " blocs")
	end
end

-- Charger les chunks autour d'un joueur
local function loadChunksAroundPlayer(position, miningArea)
	local chunkX = math.floor(position.X / (BLOCK_SIZE * CHUNK_SIZE))
	local chunkZ = math.floor(position.Z / (BLOCK_SIZE * CHUNK_SIZE))
	local chunkY = math.floor(-position.Y / (BLOCK_SIZE * CHUNK_SIZE))

	-- Charger dans un rayon de 1 chunk (3x3)
	for dx = -1, 1 do
		for dz = -1, 1 do
			for dy = 0, 2 do  -- Charger 3 couches de chunks sous le joueur
				local cy = math.max(3, chunkY + dy)  -- Minimum profondeur 3
				task.spawn(function()
					generateUndergroundChunk(chunkX + dx, chunkZ + dz, cy, miningArea)
				end)
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

	print("✅ Joueur " .. player.Name .. " initialisé")
end

-- ════════════════════════════════════════════════════════════════════════════
-- ███ SYSTÈME DE MINAGE ULTRA PROFESSIONNEL
-- ════════════════════════════════════════════════════════════════════════════

local miningBlocks = {}

local function createMiningParticles(position, color)
	-- Explosion de particules
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

	-- Flash lumineux
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

	-- Minage instantané
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

	-- Minage normal
	local time = config.mineTime / pick.speed

	miningBlocks[player.UserId] = {
		block = block,
		start = tick(),
		duration = time,
		mineral = mineral,
		color = config.color
	}

	-- Barre de progression ULTRA PRO
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

Players.PlayerAdded:Connect(function(player)
	setupPlayerData(player)

	player.CharacterAdded:Connect(function(char)
		local hrp = char:WaitForChild("HumanoidRootPart")

		task.spawn(function()
			local lastCheck = Vector3.new(0, 0, 0)

			while char.Parent do
				local pos = hrp.Position

				-- Charger chunks seulement si le joueur s'est déplacé significativement
				if (pos - lastCheck).Magnitude > 15 then
					loadChunksAroundPlayer(pos, miningArea)
					lastCheck = pos
				end

				task.wait(2)
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
print("✅ ULTIMATE MINING SIMULATOR PRO - CHARGÉ!")
print("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
print("📊 15 types de minerais")
print("⛏️ 8 pioches disponibles")
print("✨ Visuels ultra professionnels")
print("🎮 Prêt à jouer!")
print("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
