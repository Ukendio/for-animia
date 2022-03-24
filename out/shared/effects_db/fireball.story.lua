-- Compiled with roblox-ts v1.3.3
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local _matter = TS.import(script, TS.getModule(script, "@rbxts", "matter").src.lib)
local Loop = _matter.Loop
local World = _matter.World
local Option = TS.import(script, TS.getModule(script, "@rbxts", "rust-classes").out).Option
local RunService = TS.import(script, TS.getModule(script, "@rbxts", "services")).RunService
local effects_have_lifetimes = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "systems", "effects_have_lifetimes").effects_have_lifetimes
local projectiles_fly = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "systems", "projectiles_fly").projectiles_fly
local spawn_effects = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "systems", "spawn_effects").spawn_effects
local things_collide = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "systems", "things_collide").things_collide
local Renderable = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "components").Renderable
local remove_missing_models = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "systems", "remove_missing_models").remove_missing_models
local update_transforms = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "systems", "update_transforms")
local fireball = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "effects_db", "fireball").fireball
return function(target)
	local world = World.new()
	local loop = Loop.new(world)
	loop:scheduleSystems({ things_collide, projectiles_fly, effects_have_lifetimes, spawn_effects, remove_missing_models, update_transforms })
	local connections = loop:begin({
		default = RunService.Heartbeat,
	})
	local id = fireball(world, Option:none(), CFrame.new(Vector3.new(0, 10, 0)), Vector3.new(140, 10, 0))
	return function()
		if world:contains(id) then
			world:get(id, Renderable).model:Destroy()
		end
		world:clear()
		connections.default:Disconnect()
	end
end
