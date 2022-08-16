<<<<<<< HEAD
-- Compiled with roblox-ts v1.3.3-dev-230088d
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local ReplicatedStorage = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "services").ReplicatedStorage
local Effect = TS.import(script, game:GetService("ReplicatedStorage"), "Shared", "components").Effect
local remoteEvent = Instance.new("RemoteEvent")
remoteEvent.Name = "CreateFX"
remoteEvent.Parent = ReplicatedStorage
local function emitEffects(world)
	remoteEvent.OnServerEvent:Connect(function(_, effect)
=======
-- Compiled with roblox-ts v1.3.3-dev-d657049
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local Effect = TS.import(script, game:GetService("ReplicatedStorage"), "Shared", "components").Effect
local remotes = TS.import(script, game:GetService("ReplicatedStorage"), "Shared", "remotes")
local remoteEvent = remotes.Server:Get("CreateFx")
local function emitEffects(world)
	remoteEvent:Connect(function(_, effect)
>>>>>>> 88d084f2bdeb776ac73f69a0f1481b4cfe8c8b1a
		world:spawn(Effect(effect))
	end)
end
return {
	emitEffects = emitEffects,
}
