-- Compiled with roblox-ts v1.3.3
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local SufferDamage = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "components").SufferDamage
local function inflict_damage(world, target, source, damage)
	target:map(function(id)
		world:insert(id, SufferDamage({
			source = source,
			damage = damage,
		}))
	end)
end
return {
	inflict_damage = inflict_damage,
}
