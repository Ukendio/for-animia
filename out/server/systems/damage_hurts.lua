-- Compiled with roblox-ts v1.3.3
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local Effect = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "components").Effect
local function damage_hurts(world)
	for _, _binding in world:query(Effect) do
		local variant = _binding.variant
		if variant.type ~= "Damage" then
			continue
		end
		local damage = variant.damage
		print(damage)
	end
end
return {
	damage_hurts = damage_hurts,
}
