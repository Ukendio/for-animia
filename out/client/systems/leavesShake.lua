-- Compiled with roblox-ts v1.3.3-dev-230088d
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local Option = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "rust-classes", "out").Option
local Lighting = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "services").Lighting
local WindShake = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "wind-shake", "out")
local WindLines = TS.import(script, game:GetService("ReplicatedStorage"), "Client", "windLines")
WindShake:Init()
WindLines:Init({
	Direction = Vector3.new(10, 0, 0.3),
	Speed = 10,
	Lifetime = 3,
	SpawnRate = 11,
})
Lighting.ClockTime = 12
local function leavesShake(world)
end
Option:none()
return leavesShake
