-- Compiled with roblox-ts v1.3.3-dev-d657049
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local Stats = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "services").Stats
local startInstanceCOunt = Stats.InstanceCount
local startMemory = Stats:GetTotalMemoryUsageMb()
local startTime = os.clock()
local function trackMemory(_world, _state, ui)
	local currentInstanceCount = Stats.InstanceCount
	local currentMemory = Stats:GetTotalMemoryUsageMb()
	ui.window("Memory Stats", function()
		ui.label("Instances:  " .. tostring(currentInstanceCount))
		ui.label("Gained Instances: " .. tostring(currentInstanceCount - startInstanceCOunt))
		ui.label("Memory: " .. string.format("%.1f", currentMemory))
		ui.label("Gained Memory: " .. string.format("%.1f", currentMemory - startMemory))
		ui.label("Time: " .. string.format("%.1f", os.clock() - startTime))
	end)
end
return trackMemory
