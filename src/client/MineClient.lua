-- GUI CLIENT COMPLÈTE - FUSIONNÉE
-- À placer dans StarterPlayer > StarterPlayerScripts
-- REMPLACE ton ancien MineClient

local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local TweenService = game:GetService("TweenService")

local player = Players.LocalPlayer
local mouse = player:GetMouse()

wait(1)

local remoteFolder = ReplicatedStorage:WaitForChild("MineSimulator", 10)
if not remoteFolder then
	warn("❌ Dossier MineSimulator introuvable!")
	return
end

-- Remote Events MINE
local mineEvent = remoteFolder:WaitForChild("Mine", 10)
local stopMineEvent = remoteFolder:WaitForChild("StopMine", 10)
local sellEvent = remoteFolder:WaitForChild("Sell", 10)
local buyEvent = remoteFolder:WaitForChild("BuyPickaxe", 10)
local equipEvent = remoteFolder:WaitForChild("EquipPickaxe", 10)
local getPickaxesEvent = remoteFolder:WaitForChild("GetPickaxes", 10)

-- Remote Events QUÊTES
local questCompleteEvent = remoteFolder:WaitForChild("QuestComplete", 10)
local getQuestsEvent = remoteFolder:WaitForChild("GetQuests", 10)

print("✅ Client GUI Complète chargée pour " .. player.Name)

-- Variables de minage
local currentlyMining = false
local currentBlock = nil

-- SYSTÈME DE MINAGE
mouse.Button1Down:Connect(function()
	local target = mouse.Target

	if target and target:FindFirstChild("MineralType") then
		currentlyMining = true
		currentBlock = target
		mineEvent:FireServer(target)
	end
end)

mouse.Button1Up:Connect(function()
	if currentlyMining then
		currentlyMining = false
		currentBlock = nil
		stopMineEvent:FireServer()
	end
end)

mouse.Move:Connect(function()
	if currentlyMining and mouse.Target ~= currentBlock then
		currentlyMining = false
		currentBlock = nil
		stopMineEvent:FireServer()
	end
end)

-- ===================================
-- GUI PRINCIPALE
-- ===================================
local screenGui = Instance.new("ScreenGui")
screenGui.Name = "MineSimulatorGui"
screenGui.ResetOnSpawn = false
screenGui.Parent = player:WaitForChild("PlayerGui")

-- FONCTIONS D'ANIMATION
local function animateBounce(object)
	local originalSize = object.Size
	local tweenInfo = TweenInfo.new(0.3, Enum.EasingStyle.Bounce, Enum.EasingDirection.Out)
	local goal = {Size = originalSize * 1.1}
	local tween = TweenService:Create(object, tweenInfo, goal)

	tween:Play()
	tween.Completed:Connect(function()
		local tweenBack = TweenService:Create(object, TweenInfo.new(0.2), {Size = originalSize})
		tweenBack:Play()
	end)
end

local function animateSlideIn(object, direction)
	local originalPos = object.Position

	if direction == "bottom" then
		object.Position = UDim2.new(originalPos.X.Scale, originalPos.X.Offset, 1.5, 0)
	elseif direction == "right" then
		object.Position = UDim2.new(1.5, 0, originalPos.Y.Scale, originalPos.Y.Offset)
	elseif direction == "top" then
		object.Position = UDim2.new(originalPos.X.Scale, originalPos.X.Offset, -0.5, 0)
	end

	local tweenInfo = TweenInfo.new(0.5, Enum.EasingStyle.Back, Enum.EasingDirection.Out)
	local tween = TweenService:Create(object, tweenInfo, {Position = originalPos})
	tween:Play()
end

-- ===================================
-- HUD MONNAIE (TOP LEFT)
-- ===================================
local moneyFrame = Instance.new("Frame")
moneyFrame.Size = UDim2.new(0, 250, 0, 70)
moneyFrame.Position = UDim2.new(0, 20, 0, 20)
moneyFrame.BackgroundColor3 = Color3.fromRGB(20, 20, 20)
moneyFrame.BorderSizePixel = 0
moneyFrame.Parent = screenGui

local moneyCorner = Instance.new("UICorner")
moneyCorner.CornerRadius = UDim.new(0, 15)
moneyCorner.Parent = moneyFrame

local moneyStroke = Instance.new("UIStroke")
moneyStroke.Color = Color3.fromRGB(255, 215, 0)
moneyStroke.Thickness = 3
moneyStroke.Parent = moneyFrame

local moneyIcon = Instance.new("TextLabel")
moneyIcon.Size = UDim2.new(0, 50, 0, 50)
moneyIcon.Position = UDim2.new(0, 10, 0.5, -25)
moneyIcon.BackgroundTransparency = 1
moneyIcon.Text = "💰"
moneyIcon.TextSize = 35
moneyIcon.Parent = moneyFrame

local moneyLabel = Instance.new("TextLabel")
moneyLabel.Size = UDim2.new(1, -70, 1, 0)
moneyLabel.Position = UDim2.new(0, 65, 0, 0)
moneyLabel.BackgroundTransparency = 1
moneyLabel.Text = "0 $"
moneyLabel.TextColor3 = Color3.fromRGB(255, 215, 0)
moneyLabel.Font = Enum.Font.SourceSansBold
moneyLabel.TextSize = 30
moneyLabel.TextXAlignment = Enum.TextXAlignment.Left
moneyLabel.Parent = moneyFrame

local function updateMoney()
	local money = player.leaderstats:WaitForChild("Money").Value
	moneyLabel.Text = tostring(money) .. " $"

	local tweenInfo = TweenInfo.new(0.2, Enum.EasingStyle.Elastic, Enum.EasingDirection.Out)
	local tween = TweenService:Create(moneyLabel, tweenInfo, {TextSize = 35})
	tween:Play()

	tween.Completed:Connect(function()
		local tweenBack = TweenService:Create(moneyLabel, TweenInfo.new(0.2), {TextSize = 30})
		tweenBack:Play()
	end)
end

player.leaderstats:WaitForChild("Money").Changed:Connect(updateMoney)
updateMoney()

animateSlideIn(moneyFrame, "top")

-- ===================================
-- INVENTAIRE (BOTTOM CENTER)
-- ===================================
local inventoryFrame = Instance.new("Frame")
inventoryFrame.Size = UDim2.new(0, 450, 0, 100)
inventoryFrame.Position = UDim2.new(0.5, -225, 1, -120)
inventoryFrame.BackgroundColor3 = Color3.fromRGB(25, 25, 25)
inventoryFrame.BorderSizePixel = 0
inventoryFrame.Parent = screenGui

local invCorner = Instance.new("UICorner")
invCorner.CornerRadius = UDim.new(0, 15)
invCorner.Parent = inventoryFrame

local invStroke = Instance.new("UIStroke")
invStroke.Color = Color3.fromRGB(80, 80, 255)
invStroke.Thickness = 3
invStroke.Parent = inventoryFrame

local invLayout = Instance.new("UIListLayout")
invLayout.FillDirection = Enum.FillDirection.Horizontal
invLayout.HorizontalAlignment = Enum.HorizontalAlignment.Center
invLayout.VerticalAlignment = Enum.VerticalAlignment.Center
invLayout.Padding = UDim.new(0, 10)
invLayout.Parent = inventoryFrame

local inventorySlots = {}

for i = 1, 5 do
	local slot = Instance.new("TextButton")
	slot.Size = UDim2.new(0, 80, 0, 80)
	slot.BackgroundColor3 = Color3.fromRGB(40, 40, 40)
	slot.BorderSizePixel = 0
	slot.Text = ""
	slot.Parent = inventoryFrame

	local slotCorner = Instance.new("UICorner")
	slotCorner.CornerRadius = UDim.new(0, 12)
	slotCorner.Parent = slot

	local slotStroke = Instance.new("UIStroke")
	slotStroke.Color = Color3.fromRGB(70, 70, 70)
	slotStroke.Thickness = 2
	slotStroke.Parent = slot

	local imageContainer = Instance.new("Frame")
	imageContainer.Size = UDim2.new(1, -15, 1, -25)
	imageContainer.Position = UDim2.new(0, 7.5, 0, 5)
	imageContainer.BackgroundTransparency = 1
	imageContainer.Parent = slot

	local emptyLabel = Instance.new("TextLabel")
	emptyLabel.Size = UDim2.new(1, 0, 1, -20)
	emptyLabel.BackgroundTransparency = 1
	emptyLabel.Text = "?"
	emptyLabel.TextColor3 = Color3.fromRGB(100, 100, 100)
	emptyLabel.Font = Enum.Font.SourceSansBold
	emptyLabel.TextSize = 40
	emptyLabel.Parent = slot

	local label = Instance.new("TextLabel")
	label.Size = UDim2.new(1, 0, 0, 18)
	label.Position = UDim2.new(0, 0, 1, -18)
	label.BackgroundTransparency = 1
	label.Text = ""
	label.TextColor3 = Color3.fromRGB(150, 150, 150)
	label.Font = Enum.Font.SourceSansBold
	label.TextSize = 12
	label.Parent = slot

	slot.MouseEnter:Connect(function()
		TweenService:Create(slot.UIStroke, TweenInfo.new(0.2), {Thickness = 4, Color = Color3.fromRGB(120, 120, 255)}):Play()
		TweenService:Create(slot, TweenInfo.new(0.2), {Size = UDim2.new(0, 85, 0, 85)}):Play()
	end)

	slot.MouseLeave:Connect(function()
		TweenService:Create(slot.UIStroke, TweenInfo.new(0.2), {Thickness = 2}):Play()
		TweenService:Create(slot, TweenInfo.new(0.2), {Size = UDim2.new(0, 80, 0, 80)}):Play()
	end)

	table.insert(inventorySlots, {
		button = slot,
		image = nil,
		label = label,
		pickaxe = nil,
		stroke = slotStroke,
		emptyLabel = emptyLabel,
		container = imageContainer
	})
end

local function updateInventory()
	local ownedPickaxes, currentPickaxe = getPickaxesEvent:InvokeServer()

	for _, slot in ipairs(inventorySlots) do
		slot.pickaxe = nil
		slot.label.Text = ""
		slot.button.BackgroundColor3 = Color3.fromRGB(40, 40, 40)
		slot.stroke.Color = Color3.fromRGB(70, 70, 70)
		slot.emptyLabel.Visible = true

		if slot.image then
			slot.image:Destroy()
			slot.image = nil
		end
	end

	for i, pickaxeName in ipairs(ownedPickaxes) do
		if i <= 5 then
			local slot = inventorySlots[i]
			slot.pickaxe = pickaxeName
			slot.label.Text = pickaxeName:gsub("Pickaxe", "")
			slot.emptyLabel.Visible = false

			local icon = Instance.new("TextLabel")
			icon.Size = UDim2.new(1, 0, 1, 0)
			icon.BackgroundTransparency = 1
			icon.Text = "⛏️"
			icon.TextSize = 40
			icon.Font = Enum.Font.SourceSansBold
			icon.Parent = slot.container
			slot.image = icon

			if pickaxeName == currentPickaxe then
				slot.button.BackgroundColor3 = Color3.fromRGB(30, 120, 255)
				slot.stroke.Color = Color3.fromRGB(100, 180, 255)
				slot.stroke.Thickness = 4
				slot.label.TextColor3 = Color3.fromRGB(255, 255, 255)
			else
				slot.button.BackgroundColor3 = Color3.fromRGB(50, 50, 50)
				slot.stroke.Color = Color3.fromRGB(90, 90, 90)
				slot.stroke.Thickness = 2
				slot.label.TextColor3 = Color3.fromRGB(180, 180, 180)
			end

			slot.button.Size = UDim2.new(0, 0, 0, 0)
			local tweenInfo = TweenInfo.new(0.3 + (i * 0.05), Enum.EasingStyle.Back, Enum.EasingDirection.Out)
			TweenService:Create(slot.button, tweenInfo, {Size = UDim2.new(0, 80, 0, 80)}):Play()
		end
	end
end

for _, slot in ipairs(inventorySlots) do
	slot.button.MouseButton1Click:Connect(function()
		if slot.pickaxe then
			animateBounce(slot.button)
			equipEvent:FireServer(slot.pickaxe)
		end
	end)
end

equipEvent.OnClientEvent:Connect(function(success, pickaxeName)
	if success then
		updateInventory()
	end
end)

animateSlideIn(inventoryFrame, "bottom")

-- ===================================
-- BOUTON VENDRE (BOTTOM RIGHT)
-- ===================================
local sellButton = Instance.new("TextButton")
sellButton.Size = UDim2.new(0, 160, 0, 55)
sellButton.Position = UDim2.new(1, -180, 1, -75)
sellButton.Text = "💰 VENDRE"
sellButton.BackgroundColor3 = Color3.fromRGB(0, 200, 0)
sellButton.TextColor3 = Color3.fromRGB(255, 255, 255)
sellButton.Font = Enum.Font.SourceSansBold
sellButton.TextSize = 22
sellButton.BorderSizePixel = 0
sellButton.Parent = screenGui

local sellCorner = Instance.new("UICorner")
sellCorner.CornerRadius = UDim.new(0, 12)
sellCorner.Parent = sellButton

local sellStroke = Instance.new("UIStroke")
sellStroke.Color = Color3.fromRGB(0, 255, 0)
sellStroke.Thickness = 3
sellStroke.Parent = sellButton

sellButton.MouseEnter:Connect(function()
	TweenService:Create(sellButton, TweenInfo.new(0.2), {Size = UDim2.new(0, 170, 0, 60), BackgroundColor3 = Color3.fromRGB(0, 255, 0)}):Play()
end)

sellButton.MouseLeave:Connect(function()
	TweenService:Create(sellButton, TweenInfo.new(0.2), {Size = UDim2.new(0, 160, 0, 55), BackgroundColor3 = Color3.fromRGB(0, 200, 0)}):Play()
end)

sellButton.MouseButton1Click:Connect(function()
	animateBounce(sellButton)
	sellEvent:FireServer()
end)

sellEvent.OnClientEvent:Connect(function(earned)
	local notification = Instance.new("Frame")
	notification.Size = UDim2.new(0, 350, 0, 80)
	notification.Position = UDim2.new(0.5, -175, 0.3, 0)
	notification.BackgroundColor3 = Color3.fromRGB(0, 255, 0)
	notification.BorderSizePixel = 0
	notification.Parent = screenGui

	local notifCorner = Instance.new("UICorner")
	notifCorner.CornerRadius = UDim.new(0, 15)
	notifCorner.Parent = notification

	local notifLabel = Instance.new("TextLabel")
	notifLabel.Size = UDim2.new(1, 0, 1, 0)
	notifLabel.BackgroundTransparency = 1
	notifLabel.Text = "💰 +" .. earned .. " $"
	notifLabel.TextColor3 = Color3.fromRGB(255, 255, 255)
	notifLabel.Font = Enum.Font.SourceSansBold
	notifLabel.TextSize = 35
	notifLabel.Parent = notification

	notification.Position = UDim2.new(0.5, -175, -0.2, 0)
	TweenService:Create(notification, TweenInfo.new(0.5, Enum.EasingStyle.Back, Enum.EasingDirection.Out), {Position = UDim2.new(0.5, -175, 0.3, 0)}):Play()

	task.wait(2)

	local tweenOut = TweenService:Create(notification, TweenInfo.new(0.3, Enum.EasingStyle.Quad, Enum.EasingDirection.In), {Position = UDim2.new(0.5, -175, -0.2, 0)})
	tweenOut:Play()
	tweenOut.Completed:Connect(function()
		notification:Destroy()
	end)
end)

animateSlideIn(sellButton, "right")

-- ===================================
-- BOUTON SHOP (BOTTOM RIGHT - AU-DESSUS DE VENDRE)
-- ===================================
local shopButton = Instance.new("TextButton")
shopButton.Size = UDim2.new(0, 160, 0, 55)
shopButton.Position = UDim2.new(1, -180, 1, -140)
shopButton.Text = "🛒 SHOP"
shopButton.BackgroundColor3 = Color3.fromRGB(100, 100, 255)
shopButton.TextColor3 = Color3.fromRGB(255, 255, 255)
shopButton.Font = Enum.Font.SourceSansBold
shopButton.TextSize = 22
shopButton.BorderSizePixel = 0
shopButton.Parent = screenGui

local shopCorner = Instance.new("UICorner")
shopCorner.CornerRadius = UDim.new(0, 12)
shopCorner.Parent = shopButton

local shopStroke = Instance.new("UIStroke")
shopStroke.Color = Color3.fromRGB(150, 150, 255)
shopStroke.Thickness = 3
shopStroke.Parent = shopButton

shopButton.MouseEnter:Connect(function()
	TweenService:Create(shopButton, TweenInfo.new(0.2), {Size = UDim2.new(0, 170, 0, 60), BackgroundColor3 = Color3.fromRGB(130, 130, 255)}):Play()
end)

shopButton.MouseLeave:Connect(function()
	TweenService:Create(shopButton, TweenInfo.new(0.2), {Size = UDim2.new(0, 160, 0, 55), BackgroundColor3 = Color3.fromRGB(100, 100, 255)}):Play()
end)

-- SHOP FRAME
local shopFrame = Instance.new("Frame")
shopFrame.Size = UDim2.new(0, 650, 0, 500)
shopFrame.Position = UDim2.new(0.5, -325, 0.5, -250)
shopFrame.BackgroundColor3 = Color3.fromRGB(25, 25, 25)
shopFrame.Visible = false
shopFrame.BorderSizePixel = 0
shopFrame.ZIndex = 100
shopFrame.Parent = screenGui

local shopFrameCorner = Instance.new("UICorner")
shopFrameCorner.CornerRadius = UDim.new(0, 20)
shopFrameCorner.Parent = shopFrame

local shopFrameStroke = Instance.new("UIStroke")
shopFrameStroke.Color = Color3.fromRGB(100, 100, 255)
shopFrameStroke.Thickness = 4
shopFrameStroke.Parent = shopFrame

local shopTitle = Instance.new("TextLabel")
shopTitle.Size = UDim2.new(1, 0, 0, 70)
shopTitle.Text = "⛏️ MAGASIN DE PIOCHES"
shopTitle.BackgroundColor3 = Color3.fromRGB(15, 15, 15)
shopTitle.TextColor3 = Color3.fromRGB(255, 255, 255)
shopTitle.Font = Enum.Font.SourceSansBold
shopTitle.TextSize = 28
shopTitle.BorderSizePixel = 0
shopTitle.ZIndex = 101
shopTitle.Parent = shopFrame

local titleCorner = Instance.new("UICorner")
titleCorner.CornerRadius = UDim.new(0, 20)
titleCorner.Parent = shopTitle

local closeShopBtn = Instance.new("TextButton")
closeShopBtn.Size = UDim2.new(0, 45, 0, 45)
closeShopBtn.Position = UDim2.new(1, -55, 0, 12.5)
closeShopBtn.Text = "✖"
closeShopBtn.BackgroundColor3 = Color3.fromRGB(200, 0, 0)
closeShopBtn.TextColor3 = Color3.fromRGB(255, 255, 255)
closeShopBtn.Font = Enum.Font.SourceSansBold
closeShopBtn.TextSize = 25
closeShopBtn.BorderSizePixel = 0
closeShopBtn.ZIndex = 102
closeShopBtn.Parent = shopFrame

local closeBtnCorner = Instance.new("UICorner")
closeBtnCorner.CornerRadius = UDim.new(0, 10)
closeBtnCorner.Parent = closeShopBtn

closeShopBtn.MouseButton1Click:Connect(function()
	shopFrame.Visible = false
end)

local pickaxesList = Instance.new("ScrollingFrame")
pickaxesList.Size = UDim2.new(1, -30, 1, -90)
pickaxesList.Position = UDim2.new(0, 15, 0, 80)
pickaxesList.BackgroundTransparency = 1
pickaxesList.BorderSizePixel = 0
pickaxesList.ScrollBarThickness = 10
pickaxesList.ZIndex = 101
pickaxesList.Parent = shopFrame

local listLayout = Instance.new("UIListLayout")
listLayout.Padding = UDim.new(0, 12)
listLayout.Parent = pickaxesList

local pickaxes = {
	{name = "StonePickaxe", displayName = "Pierre", price = 100, desc = "2x plus rapide"},
	{name = "IronPickaxe", displayName = "Fer", price = 500, desc = "4x plus rapide"},
	{name = "GoldPickaxe", displayName = "Or", price = 2000, desc = "8x plus rapide"},
	{name = "DiamondPickaxe", displayName = "Diamant", price = 10000, desc = "INSTANTANÉ + 3 blocs"},
	{name = "LegendaryPickaxe", displayName = "Légendaire", price = 50000, desc = "INSTANTANÉ + 10 blocs"}
}

for _, pickaxe in ipairs(pickaxes) do
	local pickaxeButton = Instance.new("TextButton")
	pickaxeButton.Size = UDim2.new(1, -10, 0, 100)
	pickaxeButton.Text = ""
	pickaxeButton.BackgroundColor3 = Color3.fromRGB(40, 40, 40)
	pickaxeButton.BorderSizePixel = 0
	pickaxeButton.ZIndex = 102
	pickaxeButton.Parent = pickaxesList

	local btnCorner = Instance.new("UICorner")
	btnCorner.CornerRadius = UDim.new(0, 12)
	btnCorner.Parent = pickaxeButton

	local icon = Instance.new("TextLabel")
	icon.Size = UDim2.new(0, 70, 0, 70)
	icon.Position = UDim2.new(0, 15, 0, 15)
	icon.BackgroundTransparency = 1
	icon.Text = "⛏️"
	icon.TextSize = 45
	icon.Font = Enum.Font.SourceSansBold
	icon.ZIndex = 103
	icon.Parent = pickaxeButton

	local nameLabel = Instance.new("TextLabel")
	nameLabel.Size = UDim2.new(1, -100, 0, 35)
	nameLabel.Position = UDim2.new(0, 95, 0, 10)
	nameLabel.BackgroundTransparency = 1
	nameLabel.Text = "Pioche " .. pickaxe.displayName
	nameLabel.TextColor3 = Color3.fromRGB(255, 255, 255)
	nameLabel.Font = Enum.Font.SourceSansBold
	nameLabel.TextSize = 24
	nameLabel.TextXAlignment = Enum.TextXAlignment.Left
	nameLabel.ZIndex = 103
	nameLabel.Parent = pickaxeButton

	local descLabel = Instance.new("TextLabel")
	descLabel.Size = UDim2.new(1, -100, 0, 22)
	descLabel.Position = UDim2.new(0, 95, 0, 42)
	descLabel.BackgroundTransparency = 1
	descLabel.Text = pickaxe.desc
	descLabel.TextColor3 = Color3.fromRGB(200, 200, 200)
	descLabel.Font = Enum.Font.SourceSans
	descLabel.TextSize = 18
	descLabel.TextXAlignment = Enum.TextXAlignment.Left
	descLabel.ZIndex = 103
	descLabel.Parent = pickaxeButton

	local priceLabel = Instance.new("TextLabel")
	priceLabel.Size = UDim2.new(1, -100, 0, 28)
	priceLabel.Position = UDim2.new(0, 95, 0, 65)
	priceLabel.BackgroundTransparency = 1
	priceLabel.Text = "💰 " .. pickaxe.price .. " $"
	priceLabel.TextColor3 = Color3.fromRGB(255, 215, 0)
	priceLabel.Font = Enum.Font.SourceSansBold
	priceLabel.TextSize = 22
	priceLabel.TextXAlignment = Enum.TextXAlignment.Left
	priceLabel.ZIndex = 103
	priceLabel.Parent = pickaxeButton

	pickaxeButton.MouseButton1Click:Connect(function()
		animateBounce(pickaxeButton)
		buyEvent:FireServer(pickaxe.name)
	end)
end

buyEvent.OnClientEvent:Connect(function(success, pickaxeName)
	if success then
		task.wait(0.3)
		updateInventory()
	end
end)

shopButton.MouseButton1Click:Connect(function()
	animateBounce(shopButton)
	shopFrame.Visible = not shopFrame.Visible
end)

animateSlideIn(shopButton, "right")

-- ===================================
-- BOUTON QUÊTES (TOP RIGHT)
-- ===================================
local questButton = Instance.new("TextButton")
questButton.Size = UDim2.new(0, 180, 0, 65)
questButton.Position = UDim2.new(1, -200, 0, 100)
questButton.Text = "📋 QUÊTES"
questButton.BackgroundColor3 = Color3.fromRGB(255, 100, 0)
questButton.TextColor3 = Color3.fromRGB(255, 255, 255)
questButton.Font = Enum.Font.SourceSansBold
questButton.TextSize = 26
questButton.BorderSizePixel = 0
questButton.Parent = screenGui

local questBtnCorner = Instance.new("UICorner")
questBtnCorner.CornerRadius = UDim.new(0, 15)
questBtnCorner.Parent = questButton

local questBtnStroke = Instance.new("UIStroke")
questBtnStroke.Color = Color3.fromRGB(255, 200, 0)
questBtnStroke.Thickness = 4
questBtnStroke.Parent = questButton

questButton.MouseEnter:Connect(function()
	TweenService:Create(questButton, TweenInfo.new(0.2), {Size = UDim2.new(0, 190, 0, 70), BackgroundColor3 = Color3.fromRGB(255, 140, 20)}):Play()
end)

questButton.MouseLeave:Connect(function()
	TweenService:Create(questButton, TweenInfo.new(0.2), {Size = UDim2.new(0, 180, 0, 65), BackgroundColor3 = Color3.fromRGB(255, 100, 0)}):Play()
end)

-- FRAME QUÊTES
local questFrame = Instance.new("Frame")
questFrame.Size = UDim2.new(0, 700, 0, 600)
questFrame.Position = UDim2.new(0.5, -350, 0.5, -300)
questFrame.BackgroundColor3 = Color3.fromRGB(20, 20, 25)
questFrame.Visible = false
questFrame.BorderSizePixel = 0
questFrame.ZIndex = 200
questFrame.Parent = screenGui

local questFrameCorner = Instance.new("UICorner")
questFrameCorner.CornerRadius = UDim.new(0, 25)
questFrameCorner.Parent = questFrame

local questFrameStroke = Instance.new("UIStroke")
questFrameStroke.Color = Color3.fromRGB(255, 150, 0)
questFrameStroke.Thickness = 5
questFrameStroke.Parent = questFrame

local questTitle = Instance.new("TextLabel")
questTitle.Size = UDim2.new(1, 0, 0, 80)
questTitle.BackgroundColor3 = Color3.fromRGB(15, 15, 20)
questTitle.Text = "📋 QUÊTES QUOTIDIENNES"
questTitle.TextColor3 = Color3.fromRGB(255, 200, 50)
questTitle.Font = Enum.Font.SourceSansBold
questTitle.TextSize = 32
questTitle.BorderSizePixel = 0
questTitle.ZIndex = 201
questTitle.Parent = questFrame

local titleCorner2 = Instance.new("UICorner")
titleCorner2.CornerRadius = UDim.new(0, 25)
titleCorner2.Parent = questTitle

local closeQuestBtn = Instance.new("TextButton")
closeQuestBtn.Size = UDim2.new(0, 50, 0, 50)
closeQuestBtn.Position = UDim2.new(1, -60, 0, 15)
closeQuestBtn.Text = "✖"
closeQuestBtn.BackgroundColor3 = Color3.fromRGB(255, 50, 50)
closeQuestBtn.TextColor3 = Color3.fromRGB(255, 255, 255)
closeQuestBtn.Font = Enum.Font.SourceSansBold
closeQuestBtn.TextSize = 28
closeQuestBtn.BorderSizePixel = 0
closeQuestBtn.ZIndex = 202
closeQuestBtn.Parent = questFrame

local closeQuestCorner = Instance.new("UICorner")
closeQuestCorner.CornerRadius = UDim.new(0, 12)
closeQuestCorner.Parent = closeQuestBtn

closeQuestBtn.MouseButton1Click:Connect(function()
	questFrame.Visible = false
end)

local questList = Instance.new("ScrollingFrame")
questList.Size = UDim2.new(1, -30, 1, -100)
questList.Position = UDim2.new(0, 15, 0, 90)
questList.BackgroundTransparency = 1
questList.BorderSizePixel = 0
questList.ScrollBarThickness = 12
questList.ZIndex = 201
questList.Parent = questFrame

local questListLayout = Instance.new("UIListLayout")
questListLayout.Padding = UDim.new(0, 15)
questListLayout.Parent = questList

-- Fonction pour créer carte de quête
local function createQuestCard(questData, index)
	local isLegendary = questData.difficulty == "legendary"

	local card = Instance.new("Frame")
	card.Size = UDim2.new(1, -20, 0, isLegendary and 160 or 120)
	card.BackgroundColor3 = isLegendary and Color3.fromRGB(80, 0, 120) or Color3.fromRGB(40, 40, 50)
	card.BorderSizePixel = 0
	card.ZIndex = 202
	card.Parent = questList

	local cardCorner = Instance.new("UICorner")
	cardCorner.CornerRadius = UDim.new(0, 15)
	cardCorner.Parent = card

	local cardStroke = Instance.new("UIStroke")
	cardStroke.Color = isLegendary and Color3.fromRGB(200, 0, 255) or Color3.fromRGB(100, 100, 255)
	cardStroke.Thickness = isLegendary and 4 or 3
	cardStroke.Parent = card

	-- Icône
	local icon = Instance.new("TextLabel")
	icon.Size = UDim2.new(0, isLegendary and 90 or 70, 0, isLegendary and 90 or 70)
	icon.Position = UDim2.new(0, 15, 0, isLegendary and 35 or 25)
	icon.BackgroundTransparency = 1
	icon.Text = questData.icon
	icon.TextSize = isLegendary and 55 or 45
	icon.Font = Enum.Font.SourceSansBold
	icon.ZIndex = 203
	icon.Parent = card

	-- Nom
	local nameLabel = Instance.new("TextLabel")
	nameLabel.Size = UDim2.new(1, -120, 0, isLegendary and 40 or 30)
	nameLabel.Position = UDim2.new(0, isLegendary and 115 or 95, 0, 10)
	nameLabel.BackgroundTransparency = 1
	nameLabel.Text = questData.name
	nameLabel.TextColor3 = isLegendary and Color3.fromRGB(255, 200, 255) or Color3.fromRGB(255, 255, 255)
	nameLabel.Font = Enum.Font.SourceSansBold
	nameLabel.TextSize = isLegendary and 24 or 20
	nameLabel.TextXAlignment = Enum.TextXAlignment.Left
	nameLabel.ZIndex = 18
	nameLabel.Parent = card

	-- Description
	local descLabel = Instance.new("TextLabel")
	descLabel.Size = UDim2.new(1, -120, 0, 22)
	descLabel.Position = UDim2.new(0, isLegendary and 115 or 95, 0, isLegendary and 48 or 38)
	descLabel.BackgroundTransparency = 1
	descLabel.Text = questData.description
	descLabel.TextColor3 = Color3.fromRGB(200, 200, 200)
	descLabel.Font = Enum.Font.SourceSans
	descLabel.TextSize = 16
	descLabel.TextXAlignment = Enum.TextXAlignment.Left
	descLabel.ZIndex = 18
	descLabel.Parent = card

	-- Progression
	local progressY = isLegendary and 75 or 65

	for i, prog in ipairs(questData.progress) do
		local progressFrame = Instance.new("Frame")
		progressFrame.Size = UDim2.new(1, -120, 0, 20)
		progressFrame.Position = UDim2.new(0, isLegendary and 115 or 95, 0, progressY)
		progressFrame.BackgroundColor3 = Color3.fromRGB(30, 30, 35)
		progressFrame.BorderSizePixel = 0
		progressFrame.ZIndex = 18
		progressFrame.Parent = card

		local progressCorner = Instance.new("UICorner")
		progressCorner.CornerRadius = UDim.new(0.5, 0)
		progressCorner.Parent = progressFrame

		local progressFill = Instance.new("Frame")
		progressFill.Size = UDim2.new(math.min(prog.current / prog.target, 1), 0, 1, 0)
		progressFill.BackgroundColor3 = isLegendary and Color3.fromRGB(200, 0, 255) or Color3.fromRGB(0, 255, 150)
		progressFill.BorderSizePixel = 0
		progressFill.ZIndex = 19
		progressFill.Parent = progressFrame

		local fillCorner = Instance.new("UICorner")
		fillCorner.CornerRadius = UDim.new(0.5, 0)
		fillCorner.Parent = progressFill

		local progressText = Instance.new("TextLabel")
		progressText.Size = UDim2.new(1, 0, 1, 0)
		progressText.BackgroundTransparency = 1
		progressText.Text = prog.current .. " / " .. prog.target .. (prog.type ~= "money" and " " .. prog.type or "$")
		progressText.TextColor3 = Color3.fromRGB(255, 255, 255)
		progressText.Font = Enum.Font.SourceSansBold
		progressText.TextSize = 14
		progressText.ZIndex = 20
		progressText.Parent = progressFrame

		progressY = progressY + 25
	end

	-- Récompense
	local rewardLabel = Instance.new("TextLabel")
	rewardLabel.Size = UDim2.new(1, -120, 0, 28)
	rewardLabel.Position = UDim2.new(0, isLegendary and 115 or 95, 1, isLegendary and -38 or -33)
	rewardLabel.BackgroundTransparency = 1
	rewardLabel.Text = "🎁 Récompense: " .. questData.reward .. " $"
	rewardLabel.TextColor3 = Color3.fromRGB(255, 215, 0)
	rewardLabel.Font = Enum.Font.SourceSansBold
	rewardLabel.TextSize = isLegendary and 22 or 18
	rewardLabel.TextXAlignment = Enum.TextXAlignment.Left
	rewardLabel.ZIndex = 18
	rewardLabel.Parent = card

	-- Badge complété
	if questData.completed then
		local completeBadge = Instance.new("Frame")
		completeBadge.Size = UDim2.new(0, 120, 0, 40)
		completeBadge.Position = UDim2.new(1, -130, 0.5, -20)
		completeBadge.BackgroundColor3 = Color3.fromRGB(0, 255, 100)
		completeBadge.BorderSizePixel = 0
		completeBadge.ZIndex = 19
		completeBadge.Rotation = 15
		completeBadge.Parent = card

		local badgeCorner2 = Instance.new("UICorner")
		badgeCorner2.CornerRadius = UDim.new(0, 10)
		badgeCorner2.Parent = completeBadge

		local badgeText = Instance.new("TextLabel")
		badgeText.Size = UDim2.new(1, 0, 1, 0)
		badgeText.BackgroundTransparency = 1
		badgeText.Text = "✅ COMPLÉTÉ"
		badgeText.TextColor3 = Color3.fromRGB(255, 255, 255)
		badgeText.Font = Enum.Font.SourceSansBold
		badgeText.TextSize = 16
		badgeText.ZIndex = 20
		badgeText.Parent = completeBadge
	end

	return card
end

-- Fonction rafraîchir quêtes
local function refreshQuests()
	for _, child in ipairs(questList:GetChildren()) do
		if child:IsA("Frame") then
			child:Destroy()
		end
	end

	local quests = getQuestsEvent:InvokeServer()

	for i, quest in ipairs(quests) do
		createQuestCard(quest, i)
	end

	questListLayout:GetPropertyChangedSignal("AbsoluteContentSize"):Connect(function()
		questList.CanvasSize = UDim2.new(0, 0, 0, questListLayout.AbsoluteContentSize.Y + 10)
	end)
	questList.CanvasSize = UDim2.new(0, 0, 0, questListLayout.AbsoluteContentSize.Y + 10)
end

-- Ouvrir menu quêtes
questButton.MouseButton1Click:Connect(function()
	if not questFrame.Visible then
		questFrame.Visible = true
		refreshQuests()
	else
		questFrame.Visible = false
	end
end)

-- Notification quête complétée
questCompleteEvent.OnClientEvent:Connect(function(quest)
	local notif = Instance.new("Frame")
	notif.Size = UDim2.new(0, 500, 0, 150)
	notif.Position = UDim2.new(0.5, -250, 0.5, -75)
	notif.BackgroundColor3 = quest.difficulty == "legendary" and Color3.fromRGB(150, 0, 255) or Color3.fromRGB(0, 255, 100)
	notif.BorderSizePixel = 0
	notif.ZIndex = 30
	notif.Parent = screenGui

	local notifCorner = Instance.new("UICorner")
	notifCorner.CornerRadius = UDim.new(0, 20)
	notifCorner.Parent = notif

	local notifIcon = Instance.new("TextLabel")
	notifIcon.Size = UDim2.new(0, 80, 0, 80)
	notifIcon.Position = UDim2.new(0, 20, 0.5, -40)
	notifIcon.BackgroundTransparency = 1
	notifIcon.Text = quest.icon
	notifIcon.TextSize = 60
	notifIcon.ZIndex = 31
	notifIcon.Parent = notif

	local notifText = Instance.new("TextLabel")
	notifText.Size = UDim2.new(1, -120, 0, 50)
	notifText.Position = UDim2.new(0, 110, 0, 20)
	notifText.BackgroundTransparency = 1
	notifText.Text = "✅ QUÊTE COMPLÉTÉE!"
	notifText.TextColor3 = Color3.fromRGB(255, 255, 255)
	notifText.Font = Enum.Font.SourceSansBold
	notifText.TextSize = 28
	notifText.TextXAlignment = Enum.TextXAlignment.Left
	notifText.ZIndex = 31
	notifText.Parent = notif

	local notifReward = Instance.new("TextLabel")
	notifReward.Size = UDim2.new(1, -120, 0, 40)
	notifReward.Position = UDim2.new(0, 110, 0, 70)
	notifReward.BackgroundTransparency = 1
	notifReward.Text = "💰 +" .. quest.reward .. " $"
	notifReward.TextColor3 = Color3.fromRGB(255, 215, 0)
	notifReward.Font = Enum.Font.SourceSansBold
	notifReward.TextSize = 32
	notifReward.TextXAlignment = Enum.TextXAlignment.Left
	notifReward.ZIndex = 31
	notifReward.Parent = notif

	notif.Size = UDim2.new(0, 0, 0, 0)
	notif.Rotation = 360

	TweenService:Create(notif, TweenInfo.new(0.6, Enum.EasingStyle.Elastic, Enum.EasingDirection.Out), {
		Size = UDim2.new(0, 500, 0, 150),
		Rotation = 0
	}):Play()

	task.wait(3)

	local tweenOut = TweenService:Create(notif, TweenInfo.new(0.4, Enum.EasingStyle.Back, Enum.EasingDirection.In), {
		Size = UDim2.new(0, 0, 0, 0),
		Position = UDim2.new(0.5, 0, 0.5, 0),
		Rotation = -360
	})
	tweenOut:Play()

	tweenOut.Completed:Connect(function()
		notif:Destroy()
	end)

	-- Rafraîchir les quêtes si le menu est ouvert
	if questFrame.Visible then
		task.wait(0.5)
		refreshQuests()
	end
end)

animateSlideIn(questButton, "right")

task.wait(0.5)
updateInventory()

print("✅ Interface GUI COMPLÈTE chargée!")
