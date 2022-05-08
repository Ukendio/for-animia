-- Compiled with roblox-ts v1.3.3
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local _components = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "components")
local CombatStats = _components.CombatStats
local Effect = _components.Effect
local Replicate = _components.Replicate
local replicate_fx_on_client = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "effects", "replicate_fx_on_client").replicate_fx_on_client
local function system(world)
	for id, effect in world:query(Effect):without(Replicate) do
		local player_id = effect.creator:unwrap():GetAttribute("entity_id")
		local combat_stats = world:get(player_id, CombatStats)
		if combat_stats and combat_stats then
			continue
		end
		replicate_fx_on_client(world, effect)
		world:insert(id, Replicate())
	end
end
for e, combat in useSync(CombatStats) do
end
useSync(CombatStats, function(e, c)
	return {}
end)
local predict_effects = {
	priority = 100,
	system = system,
}
return {
	predict_effects = predict_effects,
}
