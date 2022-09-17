-- Compiled with roblox-ts v1.3.3-dev-230088d
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local ServerStorage = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "services").ServerStorage
local _components = TS.import(script, game:GetService("ReplicatedStorage"), "Shared", "components")
local Body = _components.Body
local CombatStats = _components.CombatStats
local Transform = _components.Transform
local function charactersDie(world, _, ui)
	local clicked = ui.button("Die"):clicked()
	for id, combatStats, renderable in world:query(CombatStats, Body) do
		if clicked then
			combatStats = combatStats:patch({
				hp = 0,
			})
		end
		if combatStats.state and combatStats.state == "Dead" then
			continue
		end
		if combatStats.hp <= 0 then
			world:insert(id, combatStats:patch({
				state = "Dead",
			}), Transform({
				cf = renderable.model:GetPivot(),
			}))
			renderable.model.Parent = ServerStorage
		end
	end
end
return charactersDie
