-- Compiled with roblox-ts v1.3.3
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local _matter = TS.import(script, TS.getModule(script, "@rbxts", "matter").src.lib)
local Loop = _matter.Loop
local World = _matter.World
local RunService = TS.import(script, TS.getModule(script, "@rbxts", "services")).RunService
local remove_missing_models = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "systems", "remove_missing_models").remove_missing_models
local update_transforms = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "systems", "update_transforms")
local spawn_player = TS.import(script, script.Parent, "systems", "spawn_player")
local ice_arrows = TS.import(script, script.Parent, "systems", "souls", "gray", "ice_arrows").ice_arrows
local projectiles_follow_trackers = TS.import(script, script.Parent, "systems", "projectiles_follow_trackers")
local Plasma = TS.import(script, TS.getModule(script, "@rbxts", "plasma").out)
local players_have_overheads = TS.import(script, script.Parent, "systems", "players_have_overheads").players_have_overheads
local spawn_fireball = TS.import(script, script.Parent, "systems", "souls", "fire_person", "spawn_fireball").spawn_fireball
local projectiles_fly = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "systems", "projectiles_fly").projectiles_fly
local predict_effects = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "systems", "predict_effects").predict_effects
local things_collide = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "systems", "things_collide").things_collide
local spawn_effects = TS.import(script, script.Parent, "systems", "spawn_effects").spawn_effects
local world = World.new()
local key = function(key)
	return Enum.KeyCode[key]
end
local function input_type(key)
	return Enum.UserInputType[key]
end
local controls = {
	equip_soul_1 = key("Z"),
	equip_soul_2 = key("X"),
	equip_soul_3 = key("C"),
	jump = key("Space"),
	strafe_left = key("A"),
	strafe_right = key("D"),
	m1 = input_type("MouseButton1"),
	interact = key("E"),
	toggle_menu = key("G"),
	use_ability_1 = key("One"),
	use_ability_2 = key("Two"),
	use_ability_3 = key("Three"),
	use_ability_4 = key("Four"),
	dash = { key("Q"), key("E") },
}
local root = Plasma.new(game)
local loop = Loop.new(world, controls, root)
loop:scheduleSystems({ remove_missing_models, update_transforms, spawn_player, ice_arrows, projectiles_follow_trackers, players_have_overheads, spawn_fireball, projectiles_fly, predict_effects, spawn_effects, things_collide })
loop:begin({
	default = RunService.Heartbeat,
})
