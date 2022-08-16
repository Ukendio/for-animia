<<<<<<< HEAD
-- Compiled with roblox-ts v1.3.3-dev-230088d
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local variantModule = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "variant", "out").variantModule
local EffectVariant = variantModule({
	Dash = {},
=======
-- Compiled with roblox-ts v1.3.3-dev-d657049
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local variantModule = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "variant", "out").variantModule
local EffectVariant = variantModule({
	Dash = function(direction)
		return {
			direction = direction,
		}
	end,
>>>>>>> 88d084f2bdeb776ac73f69a0f1481b4cfe8c8b1a
	Damage = function(damage)
		return {
			damage = damage,
		}
	end,
	InvincibilityFrame = function(duration)
		return {
			duration = duration,
		}
	end,
})
return {
	EffectVariant = EffectVariant,
}
