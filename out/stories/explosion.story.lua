-- Compiled with roblox-ts v1.3.3
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local _matter = TS.import(script, TS.getModule(script, "@rbxts", "matter").lib)
local Loop = _matter.Loop
local World = _matter.World
local Option = TS.import(script, TS.getModule(script, "@rbxts", "rust-classes").out).Option
local RunService = TS.import(script, TS.getModule(script, "@rbxts", "services")).RunService
local effects_have_lifetimes = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "systems", "effects_have_lifetimes").effects_have_lifetimes
local remove_missing_models = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "systems", "remove_missing_models").remove_missing_models
local update_transforms = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "systems", "update_transforms")
local explosion = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "effects", "bin", "explosion").explosion
return function(target)
	local world = World.new()
	local loop = Loop.new(world)
	loop:scheduleSystems({ effects_have_lifetimes, remove_missing_models, update_transforms })
	local connections = loop:begin({
		default = RunService.Heartbeat,
	})
	explosion(world, Option:none(), Option:some(Vector3.new(0, 50, 0)), NumberSequence.new(10, 10))
	return function()
		connections.default:Disconnect()
		world:clear()
	end
end
