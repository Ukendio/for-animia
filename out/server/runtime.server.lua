-- Compiled with roblox-ts v1.3.3
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local _matter = TS.import(script, TS.getModule(script, "@rbxts", "matter").src.lib)
local Loop = _matter.Loop
local World = _matter.World
local RunService = TS.import(script, TS.getModule(script, "@rbxts", "services")).RunService
local players_have_agency = TS.import(script, game:GetService("ServerScriptService"), "TS", "systems", "players_have_agency").players_have_agency
local remove_missing_models = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "systems", "remove_missing_models").remove_missing_models
local spawn_mobs = TS.import(script, game:GetService("ServerScriptService"), "TS", "systems", "spawn_mobs").spawn_mobs
local update_transforms = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "systems", "update_transforms")
local frictionless_grapplers = TS.import(script, game:GetService("ServerScriptService"), "TS", "systems", "frictionless_grapplers").frictionless_grapplers
local apply_mass = TS.import(script, game:GetService("ServerScriptService"), "TS", "systems", "apply_mass").apply_mass
local ice_arrows = TS.import(script, game:GetService("ServerScriptService"), "TS", "systems", "souls", "gray", "ice_arrows").ice_arrows
local tracker_moves = TS.import(script, game:GetService("ServerScriptService"), "TS", "systems", "tracker_moves")
local remove_missing_trackers = TS.import(script, game:GetService("ServerScriptService"), "TS", "systems", "remove_missing_trackers").remove_missing_trackers
local world = World.new()
local loop = Loop.new(world)
loop:scheduleSystems({ players_have_agency, remove_missing_models, remove_missing_trackers, update_transforms, spawn_mobs, frictionless_grapplers, apply_mass, ice_arrows, tracker_moves })
loop:begin({
	default = RunService.Heartbeat,
})
