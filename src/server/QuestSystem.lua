-- SYSTÈME DE QUÊTES - Script Serveur
-- À placer dans ServerScriptService (NOUVEAU SCRIPT)

local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")

-- Configuration des quêtes quotidiennes
local DailyQuests = {
	-- QUÊTES SIMPLES (1-4)
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

	-- QUÊTE DIFFICILE (5)
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

-- Créer les données de quêtes pour un joueur
local function setupQuestData(player)
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

	print("✅ Données de quêtes créées pour " .. player.Name)
end

-- Mettre à jour la progression d'une quête
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

-- Compléter une quête
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

-- Tracker de minage
local function trackMining(player, mineralType, amount)
	for _, quest in ipairs(DailyQuests) do
		if quest.targetType == mineralType or
		   (quest.targetType == "multiple" and quest.targets) then
			updateQuestProgress(player, quest.id, mineralType, amount)
		end
	end
end

-- Tracker d'argent gagné
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

-- Remote Events
local remoteFolder = ReplicatedStorage:WaitForChild("MineSimulator")

local questCompleteEvent = Instance.new("RemoteEvent")
questCompleteEvent.Name = "QuestComplete"
questCompleteEvent.Parent = remoteFolder

local getQuestsEvent = Instance.new("RemoteFunction")
getQuestsEvent.Name = "GetQuests"
getQuestsEvent.Parent = remoteFolder

getQuestsEvent.OnServerInvoke = function(player)
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

-- Connecter au système de minage
Players.PlayerAdded:Connect(function(player)
	setupQuestData(player)

	player.CharacterAdded:Connect(function()
		wait(1)

		-- Observer l'inventaire
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

		-- Observer l'argent
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
	end)
end)

print("✅ Système de Quêtes chargé!")
