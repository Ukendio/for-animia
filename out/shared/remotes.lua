-- Compiled with roblox-ts v1.3.3
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local Net = TS.import(script, TS.getModule(script, "@rbxts", "net").out)
local remotes = Net.Definitions.Create({
	create_fx = Net.Definitions.ClientToServerEvent(),
	replicate_fx = Net.Definitions.ServerToClientEvent(),
})
return {
	remotes = remotes,
}
