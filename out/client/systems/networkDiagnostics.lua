-- Compiled with roblox-ts v1.3.3-dev-5633519
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local Stats = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "services").Stats
local function networkDiagnostics(world, _, ui)
	ui.heading("DataReceiveKbps")
	ui.label(tostring(Stats.DataReceiveKbps))
	ui.space(8)
	ui.heading("DataSendKbps")
	ui.label(tostring(Stats.DataSendKbps))
end
return networkDiagnostics
