<<<<<<< HEAD
-- Compiled with roblox-ts v1.3.3-dev-230088d
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local useThrottle = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "matter", "lib").useThrottle
local _services = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "services")
local Players = _services.Players
local ReplicatedStorage = _services.ReplicatedStorage
local Effect = TS.import(script, game:GetService("ReplicatedStorage"), "Shared", "components").Effect
local replicate_fx_on_client = TS.import(script, game:GetService("ReplicatedStorage"), "Shared", "effects", "replicate_fx_on_client").replicate_fx_on_client
local remoteEvent = ReplicatedStorage:WaitForChild("CreateFX")
local predictionGUIDBuffer = {}
local function spawnEffects(world, state)
	for id, effect in world:query(Effect) do
		local predictionGUID = effect.predictionGUID
		if predictionGUID == nil then
			world:despawn(id)
			continue
		end
		if predictionGUIDBuffer[predictionGUID] ~= nil then
			world:despawn(id)
			continue
		end
		predictionGUIDBuffer[predictionGUID] = true
		replicate_fx_on_client(world, effect)
		if effect.source == Players.LocalPlayer then
			remoteEvent:FireServer(effect)
=======
-- Compiled with roblox-ts v1.3.3-dev-d657049
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local useThrottle = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "matter", "lib").useThrottle
local Players = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "services").Players
local Effect = TS.import(script, game:GetService("ReplicatedStorage"), "Shared", "components").Effect
local replicate_fx_on_client = TS.import(script, game:GetService("ReplicatedStorage"), "Shared", "effects", "replicate_fx_on_client").replicate_fx_on_client
local remotes = TS.import(script, game:GetService("ReplicatedStorage"), "Shared", "remotes")
local remoteEvent = remotes.Client:Get("CreateFx")
local predictionGUIDBuffer = {}
local function spawnEffects(world)
	for id, effect in world:query(Effect) do
		local _predictionGUID = effect.predictionGUID
		if predictionGUIDBuffer[_predictionGUID] ~= nil then
			world:despawn(id)
			continue
		end
		local _predictionGUID_1 = effect.predictionGUID
		predictionGUIDBuffer[_predictionGUID_1] = true
		replicate_fx_on_client(world, effect)
		if effect.source == Players.LocalPlayer then
			remoteEvent:SendToServer(effect)
>>>>>>> 88d084f2bdeb776ac73f69a0f1481b4cfe8c8b1a
		end
	end
	if useThrottle(2) then
		table.clear(predictionGUIDBuffer)
	end
end
return {
	event = "fixed",
	system = spawnEffects,
}
