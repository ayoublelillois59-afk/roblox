--[[
	MINE SIMULATOR - SYSTÈME DE QUÊTES
	Script à placer dans ServerScriptService
	Nom: QuestSystem

	Ce script gère les quêtes quotidiennes
]]

print("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
print("📋 SYSTÈME DE QUÊTES - DÉMARRAGE")
print("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")

local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")

-- Attendre le dossier Remote Events
local remoteFolder = ReplicatedStorage:WaitForChild("RemoteEvents", 10)
if not remoteFolder then
	warn("❌ Dossier RemoteEvents introuvable!")
	return
end

-- ═══════════════════════════════════════════════════════════
-- CONFIGURATION DES QUÊTES
-- ═══════════════════════════════════════════════════════════

local QUESTS = {
	{
		id = "quest_mine_stone",
		name = "Mineur Débutant",
		description = "Mine 100 blocs de Pierre",
		icon = "⚪",
		type = "mine",
		target = "Stone",
		targetAmount = 100,
		reward = 500,
		difficulty = "easy"
	},
	{
		id = "quest_mine_coal",
		name = "Charbonnier",
		description = "Mine 50 blocs de Charbon",
		icon = "⚫",
		type = "mine",
		target = "Coal",
		targetAmount = 50,
		reward = 800,
		difficulty = "easy"
	},
	{
		id = "quest_earn_money",
		name = "Homme d'Affaires",
		description = "Gagne 5000$ au total",
		icon = "💰",
		type = "money",
		target = "money",
		targetAmount = 5000,
		reward = 1500,
		difficulty = "medium"
	},
	{
		id = "quest_mine_gold",
		name = "Chercheur d'Or",
		description = "Mine 25 blocs d'Or",
		icon = "🟡",
		type = "mine",
		target = "Gold",
		targetAmount = 25,
		reward = 2000,
		difficulty = "medium"
	},
	{
		id = "quest_legendary",
		name = "⭐ MAÎTRE MINEUR ⭐",
		description = "Mine 10 Diamants ET 5 Obsidiennes",
		icon = "💎",
		type = "multi",
		targets = {
			{name = "Diamond", amount = 10},
			{name = "Obsidian", amount = 5}
		},
		reward = 25000,
		difficulty = "legendary"
	}
}

-- ═══════════════════════════════════════════════════════════
-- SYSTÈME DE DONNÉES QUÊTES
-- ═══════════════════════════════════════════════════════════

local function setupQuestData(player)
	print("📋 Configuration des quêtes pour: " .. player.Name)

	local questData = Instance.new("Folder")
	questData.Name = "QuestData"
	questData.Parent = player

	local questProgress = Instance.new("Folder")
	questProgress.Name = "QuestProgress"
	questProgress.Parent = questData

	local completed = Instance.new("Folder")
	completed.Name = "Completed"
	completed.Parent = questData

	local totalMoneyEarned = Instance.new("IntValue")
	totalMoneyEarned.Name = "TotalMoneyEarned"
	totalMoneyEarned.Value = 0
	totalMoneyEarned.Parent = questData

	-- Créer tracking pour chaque quête
	for _, quest in ipairs(QUESTS) do
		if quest.type == "multi" then
			-- Quête multi-objectifs
			local multiFolder = Instance.new("Folder")
			multiFolder.Name = quest.id
			multiFolder.Parent = questProgress

			for _, target in ipairs(quest.targets) do
				local progress = Instance.new("IntValue")
				progress.Name = target.name
				progress.Value = 0
				progress.Parent = multiFolder
			end
		else
			-- Quête simple
			local progress = Instance.new("IntValue")
			progress.Name = quest.id
			progress.Value = 0
			progress.Parent = questProgress
		end

		-- État de complétion
		local isCompleted = Instance.new("BoolValue")
		isCompleted.Name = quest.id
		isCompleted.Value = false
		isCompleted.Parent = completed
	end

	print("✅ Quêtes configurées pour: " .. player.Name)
end

-- ═══════════════════════════════════════════════════════════
-- TRACKING DES QUÊTES
-- ═══════════════════════════════════════════════════════════

local function updateQuestProgress(player, questId, mineralName, amount)
	local questData = player:FindFirstChild("QuestData")
	if not questData then return end

	local questProgress = questData:FindFirstChild("QuestProgress")
	local completed = questData:FindFirstChild("Completed")
	if not questProgress or not completed then return end

	-- Trouver la quête
	local quest = nil
	for _, q in ipairs(QUESTS) do
		if q.id == questId then
			quest = q
			break
		end
	end

	if not quest then return end

	-- Vérifier si déjà complétée
	local completedValue = completed:FindFirstChild(questId)
	if completedValue and completedValue.Value then return end

	-- Mettre à jour progression
	if quest.type == "multi" then
		local multiFolder = questProgress:FindFirstChild(questId)
		if multiFolder then
			local targetProgress = multiFolder:FindFirstChild(mineralName)
			if targetProgress then
				-- Trouver amount max pour ce target
				local maxAmount = 0
				for _, target in ipairs(quest.targets) do
					if target.name == mineralName then
						maxAmount = target.amount
						break
					end
				end

				targetProgress.Value = math.min(targetProgress.Value + amount, maxAmount)

				-- Vérifier si tous les objectifs sont atteints
				local allComplete = true
				for _, target in ipairs(quest.targets) do
					local prog = multiFolder:FindFirstChild(target.name)
					if not prog or prog.Value < target.amount then
						allComplete = false
						break
					end
				end

				if allComplete then
					completeQuest(player, quest)
				end
			end
		end
	else
		local progress = questProgress:FindFirstChild(questId)
		if progress then
			progress.Value = math.min(progress.Value + amount, quest.targetAmount)

			if progress.Value >= quest.targetAmount then
				completeQuest(player, quest)
			end
		end
	end
end

function completeQuest(player, quest)
	print(string.format("🎉 %s a complété: %s", player.Name, quest.name))

	-- Marquer comme complétée
	local questData = player:FindFirstChild("QuestData")
	if questData then
		local completed = questData:FindFirstChild("Completed")
		if completed then
			local completedValue = completed:FindFirstChild(quest.id)
			if completedValue then
				completedValue.Value = true
			end
		end
	end

	-- Donner récompense
	player.leaderstats.Money.Value = player.leaderstats.Money.Value + quest.reward

	-- Notifier le client
	local questCompleteEvent = remoteFolder:FindFirstChild("QuestComplete")
	if questCompleteEvent then
		questCompleteEvent:FireClient(player, quest)
	end
end

-- ═══════════════════════════════════════════════════════════
-- TRACKING AUTOMATIQUE
-- ═══════════════════════════════════════════════════════════

local function trackMining(player, mineralName, amount)
	-- Trouver toutes les quêtes concernées
	for _, quest in ipairs(QUESTS) do
		if quest.type == "mine" and quest.target == mineralName then
			updateQuestProgress(player, quest.id, mineralName, amount)
		elseif quest.type == "multi" then
			-- Vérifier si le minerai est dans les targets
			for _, target in ipairs(quest.targets) do
				if target.name == mineralName then
					updateQuestProgress(player, quest.id, mineralName, amount)
					break
				end
			end
		end
	end
end

local function trackMoney(player, amount)
	-- Trouver quêtes d'argent
	for _, quest in ipairs(QUESTS) do
		if quest.type == "money" then
			updateQuestProgress(player, quest.id, "money", amount)
		end
	end
end

-- ═══════════════════════════════════════════════════════════
-- REMOTE EVENTS POUR QUÊTES
-- ═══════════════════════════════════════════════════════════

local questCompleteEvent = Instance.new("RemoteEvent")
questCompleteEvent.Name = "QuestComplete"
questCompleteEvent.Parent = remoteFolder

local getQuestsFunc = Instance.new("RemoteFunction")
getQuestsFunc.Name = "GetQuests"
getQuestsFunc.Parent = remoteFolder

getQuestsFunc.OnServerInvoke = function(player)
	local questData = player:FindFirstChild("QuestData")
	if not questData then return {} end

	local questProgress = questData:FindFirstChild("QuestProgress")
	local completed = questData:FindFirstChild("Completed")

	local result = {}

	for _, quest in ipairs(QUESTS) do
		local questInfo = {
			id = quest.id,
			name = quest.name,
			description = quest.description,
			icon = quest.icon,
			reward = quest.reward,
			difficulty = quest.difficulty,
			completed = false,
			progress = {}
		}

		-- Récupérer progression
		if quest.type == "multi" then
			local multiFolder = questProgress:FindFirstChild(quest.id)
			if multiFolder then
				for _, target in ipairs(quest.targets) do
					local prog = multiFolder:FindFirstChild(target.name)
					table.insert(questInfo.progress, {
						name = target.name,
						current = prog and prog.Value or 0,
						target = target.amount
					})
				end
			end
		else
			local prog = questProgress:FindFirstChild(quest.id)
			table.insert(questInfo.progress, {
				name = quest.target,
				current = prog and prog.Value or 0,
				target = quest.targetAmount
			})
		end

		-- État de complétion
		local completedValue = completed:FindFirstChild(quest.id)
		if completedValue then
			questInfo.completed = completedValue.Value
		end

		table.insert(result, questInfo)
	end

	return result
end

-- ═══════════════════════════════════════════════════════════
-- CONNEXIONS AVEC INVENTAIRE
-- ═══════════════════════════════════════════════════════════

local function setupInventoryTracking(player)
	local inventory = player:WaitForChild("Inventory", 5)
	if not inventory then return end

	-- Observer changements d'inventaire
	for _, mineralValue in pairs(inventory:GetChildren()) do
		if mineralValue:IsA("IntValue") then
			mineralValue:GetPropertyChangedSignal("Value"):Connect(function()
				local previousValue = mineralValue:GetAttribute("PreviousValue") or 0
				local newValue = mineralValue.Value
				local difference = newValue - previousValue

				if difference > 0 then
					trackMining(player, mineralValue.Name, difference)
				end

				mineralValue:SetAttribute("PreviousValue", newValue)
			end)

			-- Initialiser valeur précédente
			mineralValue:SetAttribute("PreviousValue", mineralValue.Value)
		end
	end
end

local function setupMoneyTracking(player)
	local money = player:WaitForChild("leaderstats"):WaitForChild("Money")

	money:GetPropertyChangedSignal("Value"):Connect(function()
		local previousMoney = money:GetAttribute("PreviousMoney") or 0
		local newMoney = money.Value
		local difference = newMoney - previousMoney

		if difference > 0 then
			-- Mettre à jour total gagné
			local questData = player:FindFirstChild("QuestData")
			if questData then
				local totalMoneyEarned = questData:FindFirstChild("TotalMoneyEarned")
				if totalMoneyEarned then
					totalMoneyEarned.Value = totalMoneyEarned.Value + difference
					trackMoney(player, difference)
				end
			end
		end

		money:SetAttribute("PreviousMoney", newMoney)
	end)

	money:SetAttribute("PreviousMoney", money.Value)
end

-- ═══════════════════════════════════════════════════════════
-- INITIALISATION
-- ═══════════════════════════════════════════════════════════

Players.PlayerAdded:Connect(function(player)
	-- Attendre que les données principales soient créées
	player:WaitForChild("leaderstats", 5)
	player:WaitForChild("Inventory", 5)

	-- Setup quêtes
	setupQuestData(player)

	-- Setup tracking
	task.wait(1) -- Petit délai pour s'assurer que tout est prêt
	setupInventoryTracking(player)
	setupMoneyTracking(player)
end)

print("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
print("✅ SYSTÈME DE QUÊTES PRÊT")
print("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
