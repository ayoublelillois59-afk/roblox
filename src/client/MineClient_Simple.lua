-- CLIENT SIMPLE - À mettre dans StarterPlayer > StarterPlayerScripts
-- Ce script crée l'interface et gère le minage

local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local TweenService = game:GetService("TweenService")

local player = Players.LocalPlayer
local mouse = player:GetMouse()

print("🎮 Client Simple démarré pour " .. player.Name)

-- Attendre les remotes
task.wait(2)

local remotes = ReplicatedStorage:WaitForChild("Mining", 10)
if not remotes then
	warn("❌ Dossier Mining introuvable !")
	return
end

local mineEvent = remotes:WaitForChild("Mine")
local stopEvent = remotes:WaitForChild("Stop")
local sellEvent = remotes:WaitForChild("Sell")
local buyEvent = remotes:WaitForChild("Buy")
local equipEvent = remotes:WaitForChild("Equip")
local getPickaxesFunc = remotes:WaitForChild("GetPickaxes")

print("✅ Remote events connectés")

-- Variables
local currentBlock = nil
local isMining = false

-- GUI
local gui = Instance.new("ScreenGui")
gui.Name = "MiningGUI"
gui.ResetOnSpawn = false
gui.Parent = player:WaitForChild("PlayerGui")

-- HUD Argent (TOP LEFT)
local moneyFrame = Instance.new("Frame")
moneyFrame.Size = UDim2.new(0, 200, 0, 60)
moneyFrame.Position = UDim2.new(0, 10, 0, 10)
moneyFrame.BackgroundColor3 = Color3.fromRGB(30, 30, 30)
moneyFrame.BorderSizePixel = 0
moneyFrame.Parent = gui

local moneyCorner = Instance.new("UICorner")
moneyCorner.CornerRadius = UDim.new(0, 10)
moneyCorner.Parent = moneyFrame

local moneyLabel = Instance.new("TextLabel")
moneyLabel.Size = UDim2.new(1, 0, 1, 0)
moneyLabel.BackgroundTransparency = 1
moneyLabel.Text = "💰 0 $"
moneyLabel.TextColor3 = Color3.fromRGB(255, 215, 0)
moneyLabel.Font = Enum.Font.SourceSansBold
moneyLabel.TextSize = 24
moneyLabel.Parent = moneyFrame

-- Bouton VENDRE (BOTTOM RIGHT)
local sellButton = Instance.new("TextButton")
sellButton.Size = UDim2.new(0, 150, 0, 50)
sellButton.Position = UDim2.new(1, -160, 1, -60)
sellButton.Text = "💰 VENDRE"
sellButton.BackgroundColor3 = Color3.fromRGB(0, 200, 0)
sellButton.TextColor3 = Color3.fromRGB(255, 255, 255)
sellButton.Font = Enum.Font.SourceSansBold
sellButton.TextSize = 20
sellButton.BorderSizePixel = 0
sellButton.Parent = gui

local sellCorner = Instance.new("UICorner")
sellCorner.CornerRadius = UDim.new(0, 10)
sellCorner.Parent = sellButton

-- Bouton SHOP (AU-DESSUS DE VENDRE)
local shopButton = Instance.new("TextButton")
shopButton.Size = UDim2.new(0, 150, 0, 50)
shopButton.Position = UDim2.new(1, -160, 1, -120)
shopButton.Text = "🛒 SHOP"
shopButton.BackgroundColor3 = Color3.fromRGB(100, 100, 255)
shopButton.TextColor3 = Color3.fromRGB(255, 255, 255)
shopButton.Font = Enum.Font.SourceSansBold
shopButton.TextSize = 20
shopButton.BorderSizePixel = 0
shopButton.Parent = gui

local shopCorner = Instance.new("UICorner")
shopCorner.CornerRadius = UDim.new(0, 10)
shopCorner.Parent = shopButton

-- Inventaire (BOTTOM CENTER)
local invFrame = Instance.new("Frame")
invFrame.Size = UDim2.new(0, 350, 0, 80)
invFrame.Position = UDim2.new(0.5, -175, 1, -90)
invFrame.BackgroundColor3 = Color3.fromRGB(30, 30, 30)
invFrame.BorderSizePixel = 0
invFrame.Parent = gui

local invCorner = Instance.new("UICorner")
invCorner.CornerRadius = UDim.new(0, 10)
invCorner.Parent = invFrame

local invLayout = Instance.new("UIListLayout")
invLayout.FillDirection = Enum.FillDirection.Horizontal
invLayout.HorizontalAlignment = Enum.HorizontalAlignment.Center
invLayout.VerticalAlignment = Enum.VerticalAlignment.Center
invLayout.Padding = UDim.new(0, 10)
invLayout.Parent = invFrame

local pickaxeSlots = {}

for i = 1, 4 do
	local slot = Instance.new("TextButton")
	slot.Size = UDim2.new(0, 70, 0, 70)
	slot.BackgroundColor3 = Color3.fromRGB(50, 50, 50)
	slot.Text = ""
	slot.BorderSizePixel = 0
	slot.Parent = invFrame

	local slotCorner = Instance.new("UICorner")
	slotCorner.CornerRadius = UDim.new(0, 8)
	slotCorner.Parent = slot

	local label = Instance.new("TextLabel")
	label.Size = UDim2.new(1, 0, 1, 0)
	label.BackgroundTransparency = 1
	label.Text = "?"
	label.TextColor3 = Color3.fromRGB(150, 150, 150)
	label.Font = Enum.Font.SourceSansBold
	label.TextSize = 16
	label.Parent = slot

	table.insert(pickaxeSlots, {button = slot, label = label, pickaxe = nil})
end

-- Frame Shop
local shopFrame = Instance.new("Frame")
shopFrame.Size = UDim2.new(0, 500, 0, 400)
shopFrame.Position = UDim2.new(0.5, -250, 0.5, -200)
shopFrame.BackgroundColor3 = Color3.fromRGB(30, 30, 30)
shopFrame.Visible = false
shopFrame.BorderSizePixel = 0
shopFrame.ZIndex = 10
shopFrame.Parent = gui

local shopFrameCorner = Instance.new("UICorner")
shopFrameCorner.CornerRadius = UDim.new(0, 15)
shopFrameCorner.Parent = shopFrame

local shopTitle = Instance.new("TextLabel")
shopTitle.Size = UDim2.new(1, 0, 0, 60)
shopTitle.BackgroundColor3 = Color3.fromRGB(20, 20, 20)
shopTitle.Text = "🛒 BOUTIQUE"
shopTitle.TextColor3 = Color3.fromRGB(255, 255, 255)
shopTitle.Font = Enum.Font.SourceSansBold
shopTitle.TextSize = 28
shopTitle.BorderSizePixel = 0
shopTitle.ZIndex = 11
shopTitle.Parent = shopFrame

local titleCorner = Instance.new("UICorner")
titleCorner.CornerRadius = UDim.new(0, 15)
titleCorner.Parent = shopTitle

local closeBtn = Instance.new("TextButton")
closeBtn.Size = UDim2.new(0, 40, 0, 40)
closeBtn.Position = UDim2.new(1, -50, 0, 10)
closeBtn.Text = "✖"
closeBtn.BackgroundColor3 = Color3.fromRGB(200, 0, 0)
closeBtn.TextColor3 = Color3.fromRGB(255, 255, 255)
closeBtn.Font = Enum.Font.SourceSansBold
closeBtn.TextSize = 24
closeBtn.BorderSizePixel = 0
closeBtn.ZIndex = 12
closeBtn.Parent = shopFrame

local closeBtnCorner = Instance.new("UICorner")
closeBtnCorner.CornerRadius = UDim.new(0, 8)
closeBtnCorner.Parent = closeBtn

local shopList = Instance.new("ScrollingFrame")
shopList.Size = UDim2.new(1, -20, 1, -80)
shopList.Position = UDim2.new(0, 10, 0, 70)
shopList.BackgroundTransparency = 1
shopList.BorderSizePixel = 0
shopList.ScrollBarThickness = 8
shopList.ZIndex = 11
shopList.Parent = shopFrame

local shopLayout = Instance.new("UIListLayout")
shopLayout.Padding = UDim.new(0, 10)
shopLayout.Parent = shopList

-- Pioches à vendre
local pickaxesForSale = {
	{name = "Stone", displayName = "Pierre", price = 100},
	{name = "Iron", displayName = "Fer", price = 500},
	{name = "Diamond", displayName = "Diamant", price = 2000}
}

for _, pickaxe in ipairs(pickaxesForSale) do
	local item = Instance.new("TextButton")
	item.Size = UDim2.new(1, -10, 0, 80)
	item.BackgroundColor3 = Color3.fromRGB(50, 50, 50)
	item.Text = ""
	item.BorderSizePixel = 0
	item.ZIndex = 12
	item.Parent = shopList

	local itemCorner = Instance.new("UICorner")
	itemCorner.CornerRadius = UDim.new(0, 10)
	itemCorner.Parent = item

	local nameLabel = Instance.new("TextLabel")
	nameLabel.Size = UDim2.new(1, -20, 0, 30)
	nameLabel.Position = UDim2.new(0, 10, 0, 10)
	nameLabel.BackgroundTransparency = 1
	nameLabel.Text = "⛏️ Pioche " .. pickaxe.displayName
	nameLabel.TextColor3 = Color3.fromRGB(255, 255, 255)
	nameLabel.Font = Enum.Font.SourceSansBold
	nameLabel.TextSize = 22
	nameLabel.TextXAlignment = Enum.TextXAlignment.Left
	nameLabel.ZIndex = 13
	nameLabel.Parent = item

	local priceLabel = Instance.new("TextLabel")
	priceLabel.Size = UDim2.new(1, -20, 0, 30)
	priceLabel.Position = UDim2.new(0, 10, 0, 45)
	priceLabel.BackgroundTransparency = 1
	priceLabel.Text = "💰 " .. pickaxe.price .. " $"
	priceLabel.TextColor3 = Color3.fromRGB(255, 215, 0)
	priceLabel.Font = Enum.Font.SourceSansBold
	priceLabel.TextSize = 20
	priceLabel.TextXAlignment = Enum.TextXAlignment.Left
	priceLabel.ZIndex = 13
	priceLabel.Parent = item

	item.MouseButton1Click:Connect(function()
		buyEvent:FireServer(pickaxe.name)
	end)
end

shopLayout:GetPropertyChangedSignal("AbsoluteContentSize"):Connect(function()
	shopList.CanvasSize = UDim2.new(0, 0, 0, shopLayout.AbsoluteContentSize.Y + 10)
end)
shopList.CanvasSize = UDim2.new(0, 0, 0, shopLayout.AbsoluteContentSize.Y + 10)

-- Mettre à jour argent
local function updateMoney()
	local money = player.leaderstats:WaitForChild("Money").Value
	moneyLabel.Text = "💰 " .. tostring(money) .. " $"
end

player.leaderstats:WaitForChild("Money").Changed:Connect(updateMoney)
updateMoney()

-- Mettre à jour inventaire
local function updateInventory()
	local owned, current = getPickaxesFunc:InvokeServer()

	for i, slot in ipairs(pickaxeSlots) do
		if owned[i] then
			slot.pickaxe = owned[i]
			slot.label.Text = "⛏️\n" .. owned[i]
			slot.label.TextSize = 14

			if owned[i] == current then
				slot.button.BackgroundColor3 = Color3.fromRGB(0, 150, 255)
			else
				slot.button.BackgroundColor3 = Color3.fromRGB(70, 70, 70)
			end
		else
			slot.pickaxe = nil
			slot.label.Text = "?"
			slot.label.TextSize = 16
			slot.button.BackgroundColor3 = Color3.fromRGB(50, 50, 50)
		end
	end
end

for _, slot in ipairs(pickaxeSlots) do
	slot.button.MouseButton1Click:Connect(function()
		if slot.pickaxe then
			equipEvent:FireServer(slot.pickaxe)
		end
	end)
end

equipEvent.OnClientEvent:Connect(function(success)
	if success then
		updateInventory()
	end
end)

buyEvent.OnClientEvent:Connect(function(success)
	if success then
		task.wait(0.2)
		updateInventory()
	end
end)

-- Boutons
shopButton.MouseButton1Click:Connect(function()
	shopFrame.Visible = not shopFrame.Visible
end)

closeBtn.MouseButton1Click:Connect(function()
	shopFrame.Visible = false
end)

sellButton.MouseButton1Click:Connect(function()
	sellEvent:FireServer()
end)

sellEvent.OnClientEvent:Connect(function(earned)
	-- Notification
	local notif = Instance.new("Frame")
	notif.Size = UDim2.new(0, 300, 0, 60)
	notif.Position = UDim2.new(0.5, -150, 0.3, 0)
	notif.BackgroundColor3 = Color3.fromRGB(0, 255, 0)
	notif.BorderSizePixel = 0
	notif.Parent = gui

	local notifCorner = Instance.new("UICorner")
	notifCorner.CornerRadius = UDim.new(0, 10)
	notifCorner.Parent = notif

	local notifLabel = Instance.new("TextLabel")
	notifLabel.Size = UDim2.new(1, 0, 1, 0)
	notifLabel.BackgroundTransparency = 1
	notifLabel.Text = "💰 +" .. earned .. " $"
	notifLabel.TextColor3 = Color3.fromRGB(255, 255, 255)
	notifLabel.Font = Enum.Font.SourceSansBold
	notifLabel.TextSize = 28
	notifLabel.Parent = notif

	task.wait(2)
	notif:Destroy()
end)

-- Système de minage
mouse.Button1Down:Connect(function()
	local target = mouse.Target

	if target and target.Parent and target.Parent.Name == "Mine" then
		if target:FindFirstChild("MineralType") then
			currentBlock = target
			isMining = true
			mineEvent:FireServer(target)
		end
	end
end)

mouse.Button1Up:Connect(function()
	if isMining then
		isMining = false
		currentBlock = nil
		stopEvent:FireServer()
	end
end)

mouse.Move:Connect(function()
	if isMining and mouse.Target ~= currentBlock then
		isMining = false
		currentBlock = nil
		stopEvent:FireServer()
	end
end)

task.wait(1)
updateInventory()

print("✅ Interface chargée !")
