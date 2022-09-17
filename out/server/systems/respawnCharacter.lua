-- Compiled with roblox-ts v1.3.3-dev-230088d
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local None = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "matter", "lib").None
local _services = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "services")
local ServerStorage = _services.ServerStorage
local Workspace = _services.Workspace
local _components = TS.import(script, game:GetService("ReplicatedStorage"), "Shared", "components")
local Body = _components.Body
local Client = _components.Client
local CombatStats = _components.CombatStats
local Transform = _components.Transform
local function respawnCharacter(world, _, ui)
	for id, client, combatStats, transform, body in world:query(Client, CombatStats, Transform, Body) do
		if combatStats.state ~= "Dead" then
			continue
		end
		local character = body.model
		if character then
			world:insert(id, combatStats:patch({
				state = None,
				hp = combatStats.maxHp,
			}))
			task.delay(3, function()
				if character.Parent == ServerStorage then
					character.Parent = Workspace
					character.Humanoid.WalkToPoint = transform.cf.Position
				end
			end)
		end
	end
end
return respawnCharacter
