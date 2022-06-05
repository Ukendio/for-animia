-- Compiled with roblox-ts v1.3.3
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local _matter = TS.import(script, TS.getModule(script, "@rbxts", "matter").lib)
local Loop = _matter.Loop
local World = _matter.World
local Option = TS.import(script, TS.getModule(script, "@rbxts", "rust-classes").out).Option
local RunService = TS.import(script, TS.getModule(script, "@rbxts", "services")).RunService
local effects_have_lifetimes = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "systems", "effects_have_lifetimes").effects_have_lifetimes
local projectiles_fly = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "systems", "projectiles_fly").projectiles_fly
local things_collide = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "systems", "things_collide").things_collide
local remove_missing_models = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "systems", "remove_missing_models").remove_missing_models
local update_transforms = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "systems", "update_transforms")
local fireball = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "effects", "bin", "fireball").fireball
local predict_effects = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "systems", "predict_effects").predict_effects
local host_effect = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "host_effect")
return function(target)
	local world = World.new()
	local loop = Loop.new(world)
	loop:scheduleSystems({ things_collide, projectiles_fly, effects_have_lifetimes, predict_effects, remove_missing_models, update_transforms })
	local connections = loop:begin({
		default = RunService.Heartbeat,
	})
	fireball(world, Option:none(), CFrame.new(Vector3.new(0, 10, 0)), Vector3.new(140, 10, 0))
	return function()
		host_effect:ClearAllChildren()
		world:clear()
		connections.default:Disconnect()
	end
end
