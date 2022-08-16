-- Compiled with roblox-ts v1.3.3-dev-230088d
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local _components = TS.import(script, game:GetService("ReplicatedStorage"), "Shared", "components")
local CombatStats = _components.CombatStats
local Effect = _components.Effect
local EffectVariant = TS.import(script, game:GetService("ReplicatedStorage"), "Shared", "effects").EffectVariant
local function damageHurts(world)
	for id, effect in world:query(Effect) do
		local _binding = effect
		local target = _binding.target
		local source = _binding.source
		local variant = _binding.variant
		if variant.type == EffectVariant.Damage.type and (target and source) then
			-- TODO: Use sourceId to verify whether it is sane that source did X damage
			local targetId = target:GetAttribute("entityId"), source:GetAttribute("entityId")
			if targetId ~= nil then
				local targetCombatStats = world:get(targetId, CombatStats)
				world:insert(targetId, targetCombatStats:patch({
					hp = targetCombatStats.hp - variant.damage,
				}))
			end
		end
		world:despawn(id)
	end
end
return damageHurts
