-- Compiled with roblox-ts v1.3.3-dev-230088d
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local _matter = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "matter", "lib")
local log = _matter.log
local useThrottle = _matter.useThrottle
local _services = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "services")
local ReplicatedStorage = _services.ReplicatedStorage
local Workspace = _services.Workspace
local _components = TS.import(script, game:GetService("ReplicatedStorage"), "Shared", "components")
local CombatStats = _components.CombatStats
local Mob = _components.Mob
local Renderable = _components.Renderable
local Transform = _components.Transform
local Zone = _components.Zone
local removingMissingModels = TS.import(script, game:GetService("ReplicatedStorage"), "Shared", "systems", "removingMissingModels")
local function heightFromGround(root)
	local height = 2.7
	if root then
		height = height - 1.25 * (2 - root.Size.Y)
	end
	return height
end
local function zonesSpawnMobs(world)
	for id, zone in world:query(Zone) do
		if useThrottle(15) then
			if zone.maxCapacity - zone.population <= 1 then
				continue
			end
			log(zone.maxCapacity - zone.population)
			world:spawn(Mob(), CombatStats({
				hp = 100,
				maxHp = 100,
				damage = 5,
			}), Transform({
				cf = CFrame.new(Vector3.new(math.random(-150, 150), 3, math.random(-150, 150))),
			}))
			world:insert(id, zone:patch({
				population = zone.population + 1,
			}))
			log(id, zone.population)
		end
	end
	for id, transform in world:query(Transform, Mob):without(Renderable) do
		local model = ReplicatedStorage.Assets.Dummy:Clone()
		model.Parent = Workspace
		world:insert(id, Renderable({
			model = model,
		}), transform:patch({
			cf = CFrame.new(Vector3.new(transform.cf.Position.X, 3, transform.cf.Position.Z)),
		}))
		model:SetAttribute("entityId", id)
	end
end
return {
	system = zonesSpawnMobs,
	after = { removingMissingModels },
}
