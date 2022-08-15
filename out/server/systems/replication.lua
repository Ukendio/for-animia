<<<<<<< HEAD
-- Compiled with roblox-ts v1.3.3-dev-230088d
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local useEvent = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "matter", "lib").useEvent
local _services = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "services")
local Players = _services.Players
local ReplicatedStorage = _services.ReplicatedStorage
=======
-- Compiled with roblox-ts v1.3.3-dev-d657049
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local useEvent = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "matter", "lib").useEvent
local Players = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "services").Players
>>>>>>> 88d084f2bdeb776ac73f69a0f1481b4cfe8c8b1a
local _components = TS.import(script, game:GetService("ReplicatedStorage"), "Shared", "components")
local Effect = _components.Effect
local Renderable = _components.Renderable
local Agency = _components.Agency
<<<<<<< HEAD
local remoteEvent = Instance.new("RemoteEvent")
remoteEvent.Name = "Replication"
remoteEvent.Parent = ReplicatedStorage
=======
local remotes = TS.import(script, game:GetService("ReplicatedStorage"), "Shared", "remotes")
local remoteEvent = remotes.Server:Get("Replication")
>>>>>>> 88d084f2bdeb776ac73f69a0f1481b4cfe8c8b1a
local REPLICATED_COMPONENTS = {
	[Effect] = true,
	[Renderable] = true,
	[Agency] = true,
}
local function replication(world)
	for _, plr in useEvent(Players, "PlayerAdded") do
		local payload = {}
		for id, entityData in world do
			local entityPayload = {}
			local _arg0 = tostring(id)
			payload[_arg0] = entityPayload
			for component, componentInstance in entityData do
				if REPLICATED_COMPONENTS[component] ~= nil then
					local _arg0_1 = tostring(component)
					local _arg1 = {
						data = componentInstance,
					}
					entityPayload[_arg0_1] = _arg1
				end
			end
		end
<<<<<<< HEAD
		remoteEvent:FireClient(plr, payload)
=======
		remoteEvent:SendToPlayer(plr, payload)
>>>>>>> 88d084f2bdeb776ac73f69a0f1481b4cfe8c8b1a
	end
	local changes = {}
	for component in REPLICATED_COMPONENTS do
		for entityId, record in world:queryChanged(component) do
			local key = tostring(entityId)
			local name = tostring(component)
			if not (changes[key] ~= nil) then
				changes[key] = {}
			end
			if world:contains(entityId) then
				local _result = changes[key]
				if _result ~= nil then
					local _arg1 = {
						data = record.new,
					}
					_result[name] = _arg1
				end
			end
		end
	end
	if (next(changes)) ~= nil then
<<<<<<< HEAD
		remoteEvent:FireAllClients(changes)
=======
		remoteEvent:SendToAllPlayers(changes)
>>>>>>> 88d084f2bdeb776ac73f69a0f1481b4cfe8c8b1a
	end
end
return {
	system = replication,
	priority = math.huge,
}
