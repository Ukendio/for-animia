-- Compiled with roblox-ts v2.0.4
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local RunService = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "services").RunService
local TestEz = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "testez", "src")
local function testBootStrapper(tests)
	if RunService:IsStudio() then
		TestEz.TestBootstrap:run(tests)
	end
end
return {
	testBootStrapper = testBootStrapper,
}
