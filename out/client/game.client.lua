-- Compiled with roblox-ts v2.0.4
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local _services = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "services")
local Players = _services.Players
local ReplicatedStorage = _services.ReplicatedStorage
local start = TS.import(script, game:GetService("ReplicatedStorage"), "Shared", "start").start
local receiveReplication = TS.import(script, game:GetService("ReplicatedStorage"), "Client", "receiveReplication").receiveReplication
local player = Players.LocalPlayer
local character = (player.Character or (player.CharacterAdded:Wait()))
local overlapParams = OverlapParams.new()
local raycastParams = RaycastParams.new()
overlapParams.FilterDescendantsInstances = { character }
raycastParams.FilterDescendantsInstances = { character }
local state = {
	debugEnabled = true,
	entityIdMap = {},
	character = character,
	overlapParams = overlapParams,
	raycastParams = raycastParams,
	controller = {
		actions = {},
	},
	isJumping = false,
	isRunning = false,
}
start({ ReplicatedStorage.Client.systems, ReplicatedStorage.Shared.systems }, state)(receiveReplication)
