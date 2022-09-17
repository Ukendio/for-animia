-- Compiled with roblox-ts v1.3.3-dev-230088d
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local variantModule = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "variant", "out").variantModule
local Effect = variantModule({
	Health = function(comp)
		return comp
	end,
	Poise = function(amount)
		return {
			amount = amount,
		}
	end,
	Damage = function(comp)
		return comp
	end,
	Buff = function(comp)
		return comp
	end,
})
return {
	Effect = Effect,
}
