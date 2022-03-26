-- Compiled with roblox-ts v1.3.3
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local _components = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "components")
local Effect = _components.Effect
local Replicate = _components.Replicate
local replicate_fx_on_client = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "effects_db", "effects").replicate_fx_on_client
local spawn_effects = {
	priority = 100,
	system = function(world)
		for id, effect in world:query(Effect):without(Replicate) do
			local should_predict = true
			if effect.effect_type == 0 then
				should_predict = false
			end
			world:insert(id, Replicate({
				should_predict = should_predict,
			}))
			if should_predict then
				replicate_fx_on_client(world, effect)
			end
		end
	end,
}
return {
	spawn_effects = spawn_effects,
}
