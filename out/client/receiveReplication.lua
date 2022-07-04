-- Compiled with roblox-ts v1.3.3-dev-d657049
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local remotes = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "remotes")
local Components = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "components")
local remoteEvent = remotes.Client:Get("MatterRemote")
local function receiveReplication(world)
	local entityIdMap = {}
	remoteEvent:Connect(function(entities)
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
					local _arg0 = Components[name](container.data)
					table.insert(componentsToInsert, _arg0)
					table.insert(insertNames, name)
				else
					local _arg0 = Components[name]
					table.insert(componentsToRemove, _arg0)
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
