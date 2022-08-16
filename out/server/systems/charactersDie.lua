-- Compiled with roblox-ts v1.3.3-dev-230088d
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local _components = TS.import(script, game:GetService("ReplicatedStorage"), "Shared", "components")
local CombatStats = _components.CombatStats
local Renderable = _components.Renderable
local function charactersDie(world)
	for id, combatStats in world:query(CombatStats, Renderable) do
		if combatStats.hp <= 0 then
			world:despawn(id)
		end
	end
end
return charactersDie
