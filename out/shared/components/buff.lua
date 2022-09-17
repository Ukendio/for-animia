-- Compiled with roblox-ts v1.3.3-dev-230088d
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local component = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "matter", "lib").component
local variantModule = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "variant", "out").variantModule
-- We use this to check whether a buff is a Buff or a Debuff
-- Every debuff is negative, so we check whether it is less than 0
local function isBuff(buff)
	return buff < 0
end
local BuffCategory = variantModule({
	Natural = {},
	Physical = {},
})
local BuffEffect = variantModule({
	MovementSpeed = function(speed)
		return {
			speed = speed,
		}
	end,
})
local Buff = component()
local BuffSource = variantModule({
	Character = function(by)
		return {
			by = by,
		}
	end,
	World = {},
	Command = {},
	Item = {},
	Buff = {},
	Unknown = {},
})
return {
	isBuff = isBuff,
	BuffCategory = BuffCategory,
	BuffEffect = BuffEffect,
	Buff = Buff,
	BuffSource = BuffSource,
}
