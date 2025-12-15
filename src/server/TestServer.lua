-- SERVEUR ULTRA SIMPLE - Version de test
-- Mettez ce script dans ServerScriptService
-- Nom: TestServer

print("========================================")
print("SERVEUR DE TEST - DÉMARRAGE")
print("========================================")

local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")

-- Créer dossier Remote Events
local remotes = Instance.new("Folder")
remotes.Name = "Remotes"
remotes.Parent = ReplicatedStorage

local mineEvent = Instance.new("RemoteEvent")
mineEvent.Name = "Mine"
mineEvent.Parent = remotes

print("✅ Remote Events créés")

-- Créer quelques blocs de test
local function createTestMine()
	print("🌍 Création de blocs de test...")

	-- Supprimer ancienne mine si elle existe
	local oldMine = workspace:FindFirstChild("TestMine")
	if oldMine then
		oldMine:Destroy()
	end

	local mine = Instance.new("Folder")
	mine.Name = "TestMine"
	mine.Parent = workspace

	local blockSize = 6
	local blocksCreated = 0

	-- Créer une grille de 5x5 blocs
	for x = -2, 2 do
		for z = -2, 2 do
			local block = Instance.new("Part")
			block.Size = Vector3.new(blockSize, blockSize, blockSize)
			block.Position = Vector3.new(x * blockSize, 3, z * blockSize)
			block.Anchored = true
			block.Color = Color3.fromRGB(100, 200, 100)
			block.Material = Enum.Material.SmoothPlastic
			block.Name = "TestBlock"
			block.Parent = mine

			-- Tag
			local tag = Instance.new("StringValue")
			tag.Name = "IsMineable"
			tag.Value = "yes"
			tag.Parent = block

			blocksCreated = blocksCreated + 1
		end
	end

	print("✅ " .. blocksCreated .. " blocs de test créés dans workspace.TestMine")
end

-- Setup joueur
local function setupPlayer(player)
	print("👤 Setup joueur:", player.Name)

	local stats = Instance.new("Folder")
	stats.Name = "leaderstats"
	stats.Parent = player

	local money = Instance.new("IntValue")
	money.Name = "Money"
	money.Value = 0
	money.Parent = stats

	print("✅ Données créées pour:", player.Name)
end

-- Gérer le minage
mineEvent.OnServerEvent:Connect(function(player, block)
	print("🔨 " .. player.Name .. " essaie de miner:", block.Name)

	if not block then
		print("❌ Bloc nil!")
		return
	end

	if not block:FindFirstChild("IsMineable") then
		print("❌ Bloc pas mineable!")
		return
	end

	print("✅ Destruction du bloc:", block.Name)

	-- Donner de l'argent
	player.leaderstats.Money.Value = player.leaderstats.Money.Value + 10

	-- Effet visuel
	local effect = Instance.new("Part")
	effect.Size = Vector3.new(2, 2, 2)
	effect.Position = block.Position
	effect.Color = Color3.fromRGB(0, 255, 0)
	effect.Material = Enum.Material.Neon
	effect.Anchored = true
	effect.CanCollide = false
	effect.Transparency = 0.5
	effect.Parent = workspace

	game:GetService("Debris"):AddItem(effect, 0.5)

	-- Détruire le bloc
	block:Destroy()

	print("💰 " .. player.Name .. " a maintenant " .. player.leaderstats.Money.Value .. "$")
end)

-- Initialisation
createTestMine()

Players.PlayerAdded:Connect(function(player)
	setupPlayer(player)
end)

print("========================================")
print("✅ SERVEUR DE TEST PRÊT")
print("========================================")
