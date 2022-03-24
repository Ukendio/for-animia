-- Compiled with roblox-ts v1.3.3
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local _matter = TS.import(script, TS.getModule(script, "@rbxts", "matter").src.lib)
local Loop = _matter.Loop
local World = _matter.World
local promiseR15 = TS.import(script, TS.getModule(script, "@rbxts", "promise-character")).default
local HashMap = TS.import(script, TS.getModule(script, "@rbxts", "rust-classes").out).HashMap
local _services = TS.import(script, TS.getModule(script, "@rbxts", "services"))
local Players = _services.Players
local ReplicatedStorage = _services.ReplicatedStorage
local RunService = _services.RunService
local Workspace = _services.Workspace
local _components = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "components")
local Mob = _components.Mob
local Transform = _components.Transform
local mobs_database = TS.import(script, game:GetService("ServerScriptService"), "TS", "mobs_database")
local players_are_targets = TS.import(script, game:GetService("ServerScriptService"), "TS", "systems", "players_are_targets").players_are_targets
local remove_missing_models = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "systems", "remove_missing_models").remove_missing_models
local spawn_mobs = TS.import(script, game:GetService("ServerScriptService"), "TS", "systems", "spawn_mobs").spawn_mobs
local update_transforms = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "systems", "update_transforms")
local frictionless_grapplers = TS.import(script, game:GetService("ServerScriptService"), "TS", "systems", "frictionless_grapplers").frictionless_grapplers
local apply_mass = TS.import(script, game:GetService("ServerScriptService"), "TS", "systems", "apply_mass").apply_mass
local remotes = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "remotes")
local ice_arrows = TS.import(script, game:GetService("ServerScriptService"), "TS", "systems", "souls", "gray", "ice_arrows").ice_arrows
local tracker_moves = TS.import(script, game:GetService("ServerScriptService"), "TS", "systems", "tracker_moves")
local remove_missing_trackers = TS.import(script, game:GetService("ServerScriptService"), "TS", "systems", "remove_missing_trackers").remove_missing_trackers
remotes.Server:Create("ReplicateFX")
local world = World.new()
local loop = Loop.new(world)
loop:scheduleSystems({ players_are_targets, remove_missing_models, remove_missing_trackers, update_transforms, spawn_mobs, frictionless_grapplers, apply_mass, ice_arrows, tracker_moves })
loop:begin({
	default = RunService.Heartbeat,
})
local function spawn_islands()
	local islands = ReplicatedStorage.Assets.Islands:Clone()
	islands.Parent = Workspace
	return islands
end
local islands = spawn_islands()
local function generate_spawns_on_islands(islands)
	local islands_with_mobs = HashMap:empty()
	for name, spawns in pairs(mobs_database) do
		local island = islands[name]
		local mob_spawns = HashMap:empty()
		local spawn_folder = Instance.new("Model")
		spawn_folder.Parent = island
		for _, id in pairs(spawns) do
			local part = Instance.new("Part")
			part.Size = Vector3.new(4, 1, 4)
			part.Parent = spawn_folder
			local origin = island:GetPivot().Position
			local _vector3 = Vector3.new(if part.Size.X / 2 + math.random(1, 2) == 1 then -island:GetExtentsSize().X else island:GetExtentsSize().X, origin.Y + part.Size.Y / 2, if part.Size.Z + math.random(1, 2) == 1 then -island:GetExtentsSize().Z else island:GetExtentsSize().Z)
			part.Position = origin + _vector3
			part.Transparency = 0.7
			part.BrickColor = BrickColor.Red()
			mob_spawns:entry(part.CFrame):insert(id)
		end
		islands_with_mobs:entry(name):insert(mob_spawns)
	end
	return islands_with_mobs
end
local function spawn_mobs_from_island_spawns(islands_mobs)
	for _result in islands_mobs:iter():generator().next do
		if _result.done then
			break
		end
		local _binding = _result.value
		local spawns = _binding[2]
		for _result_1 in spawns:iter():generator().next do
			if _result_1.done then
				break
			end
			local _binding_1 = _result_1.value
			local cf = _binding_1[1]
			local id = _binding_1[2]
			local _fn = world
			local _exp = Mob({
				id = id,
			})
			local _object = {}
			local _left = "cf"
			local _vector3 = Vector3.new(0, 3, 0)
			_object[_left] = cf + _vector3
			_fn:spawn(_exp, Transform(_object))
		end
	end
end
spawn_mobs_from_island_spawns(generate_spawns_on_islands(islands))
local function spawn_players()
	local character_added
	local player_added = function(player)
		if player.Character then
			character_added(player.Character)
		else
			player.CharacterAdded:Connect(character_added)
		end
	end
	character_added = function(character)
		local _exp = promiseR15(character)
		local _arg0 = function()
			local island = islands["[1] Foo"]
			local goal_position = island:GetPivot().Position
			wait(0.2)
			local _fn = character
			local _vector3 = Vector3.new(0, 3, 0)
			_fn:PivotTo(CFrame.new(goal_position + _vector3))
		end
		return _exp:andThen(_arg0)
	end
	local _exp = Players:GetPlayers()
	for _k, _v in ipairs(_exp) do
		player_added(_v, _k - 1, _exp)
	end
	Players.PlayerAdded:Connect(player_added)
end
spawn_players()
