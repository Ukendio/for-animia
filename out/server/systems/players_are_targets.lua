-- Compiled with roblox-ts v1.3.3
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local useEvent = TS.import(script, TS.getModule(script, "@rbxts", "matter").src.lib).useEvent
local Players = TS.import(script, TS.getModule(script, "@rbxts", "services")).Players
local _components = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "components")
local Target = _components.Target
local Renderable = _components.Renderable
local Soul = _components.Soul
local function players_are_targets(world)
	local _exp = Players:GetPlayers()
	local _arg0 = function(player)
		for _, character in useEvent(player, "CharacterAdded") do
			local id = world:spawn(Target(), Renderable({
				model = character,
			}), Soul({
				name = "Deku",
			}))
			player:SetAttribute("entity_id", id)
		end
		for id in world:query(Target):without(Renderable) do
			world:despawn(id)
		end
	end
	for _k, _v in ipairs(_exp) do
		_arg0(_v, _k - 1, _exp)
	end
end
return {
	players_are_targets = players_are_targets,
}
