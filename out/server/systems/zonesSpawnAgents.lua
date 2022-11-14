-- Compiled with roblox-ts v1.3.3-dev-230088d
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local useThrottle = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "matter", "lib").useThrottle
local _services = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "services")
local ReplicatedStorage = _services.ReplicatedStorage
local Workspace = _services.Workspace
local _components = TS.import(script, game:GetService("ReplicatedStorage"), "Shared", "components")
local CombatStats = _components.CombatStats
local Agent = _components.Agent
local Transform = _components.Transform
local Zone = _components.Zone
local Collision = _components.Collision
local Body = _components.Body
local setPartCollisionGroup = TS.import(script, game:GetService("ReplicatedStorage"), "Shared", "setCharacterCollisionGroup").setPartCollisionGroup
local removingMissingModels = TS.import(script, game:GetService("ReplicatedStorage"), "Shared", "systems", "removingMissingModels")
local function heightFromGround(root)
	local height = 2.7
	if root then
		height = height - 1.25 * (2 - root.Size.Y)
	end
	return height
end
local function zonesSpawnAgents(world)
	for id, zone, _binding, _binding_1 in world:query(Zone, Transform, Collision) do
		local cf = _binding.cf
		local size = _binding_1.size
		if useThrottle(15) then
			if zone.maxCapacity - zone.population < 1 then
				continue
			end
			local _fn = world
			local _exp = Agent({
				residentOf = id,
			})
			local _exp_1 = CombatStats({
				hp = 100,
				maxHp = 100,
				damage = 5,
			})
			local _object = {}
			local _left = "cf"
			local _vector3 = Vector3.new(math.random(-size.X, size.X), 3, math.random(-size.Z, size.Z))
			_object[_left] = cf + _vector3
			_fn:spawn(_exp, _exp_1, Transform(_object))
			world:insert(id, zone:patch({
				population = zone.population + 1,
			}))
		end
	end
	for id, transform in world:query(Transform, Agent):without(Body) do
		local model = ReplicatedStorage.Assets.Dummy:Clone()
		local cf = CFrame.new(Vector3.new(transform.cf.Position.X, 3, transform.cf.Position.Z))
		model:PivotTo(cf)
		model.Parent = Workspace
		world:insert(id, Body({
			model = model,
		}), transform:patch({
			cf = cf,
		}))
		model:SetAttribute("entityId", id)
		setPartCollisionGroup(model, "Agency")
	end
	for _, mobRecord in world:queryChanged(Agent) do
		local _zoneId = mobRecord.old
		if _zoneId ~= nil then
			_zoneId = _zoneId.residentOf
		end
		local zoneId = _zoneId
		local _value = not mobRecord.new and zoneId
		if _value ~= 0 and (_value == _value and _value) then
			local zone = world:get(zoneId, Zone)
			if zone then
				world:insert(zoneId, zone:patch({
					population = zone.population - 1,
				}))
			end
		end
	end
end
return {
	system = zonesSpawnAgents,
	after = { removingMissingModels },
}
