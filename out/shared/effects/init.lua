-- Compiled with roblox-ts v1.3.3
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local variantModule = TS.import(script, TS.getModule(script, "@rbxts", "variant").out).variantModule
local EffectVariant = variantModule({
	Damage = function(damage)
		return {
			damage = damage,
		}
	end,
	Explosion = function(size)
		return {
			size = size,
		}
	end,
	KnockBack = function(force)
		return {
			force = force,
		}
	end,
	Slow = function(slow)
		return {
			slow = slow,
		}
	end,
	Track = function(attach)
		return {
			attach = attach,
		}
	end,
	Stun = function(duration)
		return {
			duration = duration,
		}
	end,
})
return {
	EffectVariant = EffectVariant,
}
