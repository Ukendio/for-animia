-- Compiled with roblox-ts v1.3.3-dev-230088d
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local useThrottle = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "matter", "lib").useThrottle
local _services = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "services")
local ReplicatedStorage = _services.ReplicatedStorage
local Workspace = _services.Workspace
local _components = TS.import(script, game:GetService("ReplicatedStorage"), "Shared", "components")
local CombatStats = _components.CombatStats
local Agent = _components.Agent
local Renderable = _components.Renderable
local Transform = _components.Transform
local Zone = _components.Zone
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
	for id, zone in world:query(Zone) do
		if useThrottle(15) then
			if zone.maxCapacity - zone.population < 1 then
				continue
			end
			world:spawn(Agent({
				residentOf = id,
			}), CombatStats({
				hp = 100,
				maxHp = 100,
				damage = 5,
			}), Transform({
				cf = CFrame.new(Vector3.new(math.random(-15, 15), 3, math.random(-15, 15))),
			}))
			world:insert(id, zone:patch({
				population = zone.population + 1,
			}))
		end
	end
	for id, transform in world:query(Transform, Agent):without(Renderable) do
		local model = ReplicatedStorage.Assets.Dummy:Clone()
		model.Parent = Workspace
		world:insert(id, Renderable({
			model = model,
		}), transform:patch({
			cf = CFrame.new(Vector3.new(transform.cf.Position.X, 3, transform.cf.Position.Z)),
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
		local _value = mobRecord.new == nil and zoneId
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
