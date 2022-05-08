-- Compiled with roblox-ts v1.3.3
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local SufferDamage = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "components").SufferDamage
local function inflict_damage(world, src, target, damage)
	target:match(function(model)
		local id = model:GetAttribute("entity_id")
		if id ~= nil then
			world:insert(id, SufferDamage({
				damage = damage,
				src = src,
			}))
		end
	end, warn)
end
return {
	inflict_damage = inflict_damage,
}
