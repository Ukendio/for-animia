-- Compiled with roblox-ts v1.3.3-dev-230088d
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local _services = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "services")
local Players = _services.Players
local ReplicatedStorage = _services.ReplicatedStorage
local start = TS.import(script, game:GetService("ReplicatedStorage"), "Shared", "start").start
local receiveReplication = TS.import(script, game:GetService("ReplicatedStorage"), "Client", "receiveReplication").receiveReplication
local player = Players.LocalPlayer
local state = {
	debugEnabled = true,
	character = (player.Character or (player.CharacterAdded:Wait())),
	inputBuffer = {},
	entityIdMap = {},
}
start({ ReplicatedStorage.Client.systems, ReplicatedStorage.Shared.systems }, state)(receiveReplication)
