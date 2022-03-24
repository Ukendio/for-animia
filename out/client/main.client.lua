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
local world = World.new()
local key = function(key)
	return Enum.KeyCode[key]
end
local function input_type(key)
	return Enum.UserInputType[key]
end
local _arg0 = {
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
local state = _arg0
local loop = Loop.new(world, state)
loop:scheduleSystems({ remove_missing_models, update_transforms, spawn_player, ice_arrows, projectiles_follow_trackers })
loop:begin({
	default = RunService.Heartbeat,
})
