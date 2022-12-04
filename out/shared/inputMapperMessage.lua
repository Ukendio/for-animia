-- Compiled with roblox-ts v2.0.4
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local variantModule = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "variant", "out").default
local InputKind = variantModule({
	KeyDown = function(key)
		return {
			key = key,
		}
	end,
	KeyUp = function(key)
		return {
			key = key,
		}
	end,
	Hold = function(duration)
		return {
			duration = duration,
		}
	end,
	HoldRelease = {},
	DoubleClick = {},
	PointerMove = {},
	PointerClick = {},
})
return {
	InputKind = InputKind,
}
