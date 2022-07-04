-- Compiled with roblox-ts v1.3.3-dev-5633519
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local variantModule = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "variant", "out").variantModule
local EffectVariant = variantModule({
	Dash = function(direction)
		return {
			direction = direction,
		}
	end,
	Damage = function(damage)
		return {
			damage = damage,
		}
	end,
})
return {
	EffectVariant = EffectVariant,
}
