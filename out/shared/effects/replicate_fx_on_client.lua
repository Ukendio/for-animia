-- Compiled with roblox-ts v1.3.3
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local match = TS.import(script, TS.getModule(script, "@rbxts", "variant").out).match
local explosion = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "effects", "bin", "explosion").explosion
local inflict_damage = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "effects", "bin", "inflict_damage").inflict_damage
local function replicate_fx_on_client(world, _param)
	local variant = _param.variant
	local target = _param.target
	local pos = _param.pos
	local creator = _param.creator
	match(variant, {
		Damage = function(_param_1)
			local damage = _param_1.damage
			return inflict_damage(world, creator, target, damage)
		end,
		Explosion = function(_param_1)
			local size = _param_1.size
			return explosion(world, creator, pos, size)
		end,
		KnockBack = function() end,
		Slow = function() end,
		Track = function() end,
		Stun = function() end,
	})
end
return {
	replicate_fx_on_client = replicate_fx_on_client,
}
