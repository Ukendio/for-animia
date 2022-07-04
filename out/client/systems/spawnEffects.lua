-- Compiled with roblox-ts v1.3.3-dev-5633519
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local useThrottle = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "matter", "lib").useThrottle
local Players = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "services").Players
local Effect = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "components").Effect
local replicate_fx_on_client = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "effects", "replicate_fx_on_client").replicate_fx_on_client
local remotes = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "remotes")
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
		end
	end
	if useThrottle(2) then
		table.clear(predictionGUIDBuffer)
	end
end
return spawnEffects
