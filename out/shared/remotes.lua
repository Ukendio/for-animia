<<<<<<< HEAD
-- Compiled with roblox-ts v1.3.3-dev-230088d
=======
-- Compiled with roblox-ts v1.3.3-dev-d657049
>>>>>>> 88d084f2bdeb776ac73f69a0f1481b4cfe8c8b1a
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local Net = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "net", "out")
return Net.CreateDefinitions({
	Replication = Net.Definitions.ServerToClientEvent(),
	CreateFx = Net.Definitions.ClientToServerEvent(),
	TrackLineSight = Net.Definitions.ClientToServerEvent(),
})
