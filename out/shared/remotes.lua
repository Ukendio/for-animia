-- Compiled with roblox-ts v1.3.3
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local Net = TS.import(script, TS.getModule(script, "@rbxts", "net").out)
return Net.Definitions.Create({
	CreateFX = Net.Definitions.ClientToServerEvent(),
	CreateFX2 = Net.Definitions.ClientToServerEvent(),
	ReplicateFX = Net.Definitions.ServerToClientEvent(),
	ReplicateFX2 = Net.Definitions.ServerToClientEvent(),
})
