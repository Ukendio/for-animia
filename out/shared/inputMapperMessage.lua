-- Compiled with roblox-ts v1.3.3-dev-230088d
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
	HoldRelease = function(duration)
		return {
			duration = duration,
		}
	end,
	DoubleClick = {},
	PointerMove = {},
	PointerClick = {},
})
return {
	InputKind = InputKind,
}
