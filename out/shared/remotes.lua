-- Compiled with roblox-ts v1.3.3-dev-230088d
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local Net = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "net", "out")
return Net.CreateDefinitions({
	MatterRemote = Net.Definitions.ServerToClientEvent(),
	CreateFx = Net.Definitions.ClientToServerEvent(),
})
