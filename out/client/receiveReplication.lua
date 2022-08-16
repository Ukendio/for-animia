<<<<<<< HEAD
-- Compiled with roblox-ts v1.3.3-dev-230088d
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local Components = TS.import(script, game:GetService("ReplicatedStorage"), "Shared", "components")
local ReplicatedStorage = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "services").ReplicatedStorage
local t = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "t", "lib", "ts").t
local remoteEvent = ReplicatedStorage:WaitForChild("Replication")
local function receiveReplication(world, state)
	local entityIdMap = state.entityIdMap
	remoteEvent.OnClientEvent:Connect(function(entities)
		local _arg0 = t.map(t.string, t.table)(entities)
		assert(_arg0)
=======
-- Compiled with roblox-ts v1.3.3-dev-d657049
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local remotes = TS.import(script, game:GetService("ReplicatedStorage"), "Shared", "remotes")
local Components = TS.import(script, game:GetService("ReplicatedStorage"), "Shared", "components")
local remoteEvent = remotes.Client:Get("Replication")
local function receiveReplication(world)
	local entityIdMap = {}
	remoteEvent:Connect(function(entities)
>>>>>>> 88d084f2bdeb776ac73f69a0f1481b4cfe8c8b1a
		for serverEntityId, componentMap in entities do
			local clientEntityId = entityIdMap[serverEntityId]
			if clientEntityId ~= nil and (next(componentMap)) == nil then
				world:despawn(clientEntityId)
				entityIdMap[serverEntityId] = nil
				continue
			end
			local componentsToInsert = {}
			local componentsToRemove = {}
			local insertNames = {}
			local removeNames = {}
			for name, container in componentMap do
				if container.data then
<<<<<<< HEAD
					local _arg0_1 = Components[name](container.data)
					table.insert(componentsToInsert, _arg0_1)
					table.insert(insertNames, name)
				else
					local _arg0_1 = Components[name]
					table.insert(componentsToRemove, _arg0_1)
=======
					local _arg0 = Components[name](container.data)
					table.insert(componentsToInsert, _arg0)
					table.insert(insertNames, name)
				else
					local _arg0 = Components[name]
					table.insert(componentsToRemove, _arg0)
>>>>>>> 88d084f2bdeb776ac73f69a0f1481b4cfe8c8b1a
					table.insert(removeNames, name)
				end
			end
			if clientEntityId == nil then
				clientEntityId = world:spawn(unpack(componentsToInsert))
				local _clientEntityId = clientEntityId
				entityIdMap[serverEntityId] = _clientEntityId
			else
				if #componentsToInsert > 0 then
					world:insert(clientEntityId, unpack(componentsToInsert))
				end
				if #componentsToRemove > 0 then
					world:remove(clientEntityId, unpack(componentsToRemove))
				end
			end
		end
	end)
end
return {
	receiveReplication = receiveReplication,
}
