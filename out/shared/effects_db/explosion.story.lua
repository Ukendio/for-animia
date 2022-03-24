-- Compiled with roblox-ts v1.3.3
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local Vec = TS.import(script, TS.getModule(script, "@rbxts", "rust-classes").out).Vec
local compose_effects = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "effects_db").compose_effects
local explosion_1 = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "effects_db", "explosions").explosion_1
return function(target)
	local effects_model = compose_effects(Vector3.new(0, 10, 0), Vec:fromPtr({ explosion_1(NumberSequence.new(8, 10)) })).once(1, 1)
	return function()
		effects_model:Destroy()
	end
end
