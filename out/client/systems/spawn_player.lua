-- Compiled with roblox-ts v1.3.3
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local promiseR15 = TS.import(script, TS.getModule(script, "@rbxts", "promise-character")).default
local Players = TS.import(script, TS.getModule(script, "@rbxts", "services")).Players
local _components = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "components")
local Target = _components.Target
local Renderable = _components.Renderable
local CombatStats = _components.CombatStats
local Mastery = _components.Mastery
local Soul = _components.Soul
local function character_added(world, char)
	if char:GetAttribute("entity_id") ~= nil then
		return nil
	end
	local _exp = promiseR15(char)
	local _arg0 = function(character)
		character:SetAttribute("entity_id", world:spawn(Soul({
			name = "Fire Person",
		}), Target(), Renderable({
			model = character,
		}), CombatStats({
			hp = 100,
			max_hp = 100,
			damage = 50,
			soul_power = 50,
			defense = 50,
		}), Mastery()))
	end
	_exp:andThen(_arg0)
end
local function spawn_player(world)
	local plr = Players.LocalPlayer
	if plr.Character then
		character_added(world, plr.Character)
	end
end
return {
	system = spawn_player,
	priority = 100,
}
