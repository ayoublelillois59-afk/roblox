-- CLIENT ULTRA SIMPLE - Version de test
-- Mettez ce script dans StarterPlayer > StarterPlayerScripts
-- Nom: TestClient (DOIT être un LocalScript!)

print("========================================")
print("CLIENT DE TEST - DÉMARRAGE")
print("========================================")

local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local player = Players.LocalPlayer
local mouse = player:GetMouse()

print("👤 Joueur:", player.Name)

-- Attendre les remotes
print("⏳ Attente des remotes...")
task.wait(2)

local remotes = ReplicatedStorage:WaitForChild("Remotes", 10)
if not remotes then
	warn("❌ Dossier Remotes introuvable!")
	return
end

local mineEvent = remotes:WaitForChild("Mine", 5)
if not mineEvent then
	warn("❌ Mine event introuvable!")
	return
end

print("✅ Remote events connectés!")

-- Créer interface simple
local screenGui = Instance.new("ScreenGui")
screenGui.Name = "TestGUI"
screenGui.ResetOnSpawn = false
screenGui.Parent = player:WaitForChild("PlayerGui")

-- HUD Argent
local moneyLabel = Instance.new("TextLabel")
moneyLabel.Size = UDim2.new(0, 200, 0, 50)
moneyLabel.Position = UDim2.new(0, 20, 0, 20)
moneyLabel.BackgroundColor3 = Color3.fromRGB(0, 0, 0)
moneyLabel.BackgroundTransparency = 0.5
moneyLabel.Text = "💰 0 $"
moneyLabel.TextColor3 = Color3.fromRGB(255, 255, 0)
moneyLabel.Font = Enum.Font.SourceSansBold
moneyLabel.TextSize = 28
moneyLabel.Parent = screenGui

-- Instructions
local instructions = Instance.new("TextLabel")
instructions.Size = UDim2.new(0, 400, 0, 80)
instructions.Position = UDim2.new(0.5, -200, 0, 20)
instructions.BackgroundColor3 = Color3.fromRGB(0, 0, 0)
instructions.BackgroundTransparency = 0.5
instructions.Text = "⛏️ CLIQUEZ SUR LES BLOCS VERTS\nPOUR LES MINER!"
instructions.TextColor3 = Color3.fromRGB(255, 255, 255)
instructions.Font = Enum.Font.SourceSansBold
instructions.TextSize = 20
instructions.Parent = screenGui

-- Indicateur de clic
local clickIndicator = Instance.new("TextLabel")
clickIndicator.Size = UDim2.new(0, 300, 0, 60)
clickIndicator.Position = UDim2.new(0.5, -150, 1, -80)
clickIndicator.BackgroundColor3 = Color3.fromRGB(0, 0, 0)
clickIndicator.BackgroundTransparency = 0.5
clickIndicator.Text = "En attente de clic..."
clickIndicator.TextColor3 = Color3.fromRGB(200, 200, 200)
clickIndicator.Font = Enum.Font.SourceSansBold
clickIndicator.TextSize = 18
clickIndicator.Parent = screenGui

print("✅ Interface créée!")

-- Mettre à jour l'argent
local function updateMoney()
	local stats = player:FindFirstChild("leaderstats")
	if stats then
		local money = stats:FindFirstChild("Money")
		if money then
			moneyLabel.Text = "💰 " .. tostring(money.Value) .. " $"
		end
	end
end

player:WaitForChild("leaderstats"):WaitForChild("Money").Changed:Connect(updateMoney)
updateMoney()

-- Système de minage
mouse.Button1Down:Connect(function()
	local target = mouse.Target

	print("🖱️ CLIC DÉTECTÉ!")
	print("  Target:", target)

	clickIndicator.Text = "🖱️ Clic détecté!"
	clickIndicator.TextColor3 = Color3.fromRGB(255, 255, 0)

	if not target then
		print("❌ Pas de target!")
		clickIndicator.Text = "❌ Aucun bloc visé"
		clickIndicator.TextColor3 = Color3.fromRGB(255, 0, 0)
		return
	end

	print("  Parent:", target.Parent)
	print("  Name:", target.Name)

	if target.Parent and target.Parent.Name == "TestMine" then
		print("✅ Bloc de test détecté!")
		clickIndicator.Text = "✅ Bloc détecté - Envoi au serveur..."
		clickIndicator.TextColor3 = Color3.fromRGB(0, 255, 0)

		if target:FindFirstChild("IsMineable") then
			print("🚀 Envoi au serveur...")
			mineEvent:FireServer(target)
			clickIndicator.Text = "🔨 Minage en cours..."
		else
			print("❌ Pas de tag IsMineable!")
			clickIndicator.Text = "❌ Bloc pas mineable"
		end
	else
		print("❌ Pas un bloc de TestMine!")
		clickIndicator.Text = "❌ Ce n'est pas un bloc de test"
		clickIndicator.TextColor3 = Color3.fromRGB(255, 100, 0)
	end

	-- Reset après 2 secondes
	task.wait(2)
	clickIndicator.Text = "En attente de clic..."
	clickIndicator.TextColor3 = Color3.fromRGB(200, 200, 200)
end)

print("========================================")
print("✅ CLIENT DE TEST PRÊT")
print("Cliquez sur les blocs verts!")
print("========================================")
