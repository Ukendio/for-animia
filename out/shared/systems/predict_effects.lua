-- Compiled with roblox-ts v1.3.3
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local Players = TS.import(script, TS.getModule(script, "@rbxts", "services")).Players
local _components = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "components")
local Effect = _components.Effect
local Renderable = _components.Renderable
local Replicate = _components.Replicate
local replicate_fx_on_client = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "effects_db", "replicate_fx_on_client").replicate_fx_on_client
local function system(world)
	for id, effect in world:query(Effect):without(Replicate) do
		local should_predict = effect.creator:match(function(id)
			return Players:GetPlayerFromCharacter(world:get(id, Renderable).model) == Players.LocalPlayer
		end, function()
			return false
		end)
		world:insert(id, Replicate(should_predict))
		if should_predict then
			replicate_fx_on_client(world, effect)
		end
	end
end
local predict_effects = {
	priority = 100,
	system = system,
}
return {
	predict_effects = predict_effects,
}
