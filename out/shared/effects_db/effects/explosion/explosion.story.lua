-- Compiled with roblox-ts v1.3.3
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local _matter = TS.import(script, TS.getModule(script, "@rbxts", "matter").src.lib)
local Loop = _matter.Loop
local World = _matter.World
local Option = TS.import(script, TS.getModule(script, "@rbxts", "rust-classes").out).Option
local RunService = TS.import(script, TS.getModule(script, "@rbxts", "services")).RunService
local Lifetime = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "components").Lifetime
local effects_have_lifetimes = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "systems", "effects_have_lifetimes").effects_have_lifetimes
local remove_missing_models = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "systems", "remove_missing_models").remove_missing_models
local update_transforms = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "systems", "update_transforms")
local explosion = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "effects_db", "effects", "explosion").explosion
return function(target)
	local world = World.new()
	local loop = Loop.new(world)
	loop:scheduleSystems({ effects_have_lifetimes, remove_missing_models, update_transforms })
	local connections = loop:begin({
		default = RunService.Heartbeat,
	})
	local id = explosion(world, Option:some(Vector3.new(0, 10, 0)), NumberSequence.new(10, 10))
	return function()
		task.delay(world:get(id, Lifetime).remaining_time + 0.5, function()
			return connections.default:Disconnect()
		end)
	end
end
