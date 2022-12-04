-- Compiled with roblox-ts v2.0.4
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local ReplicatedStorage = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "services").ReplicatedStorage
local t = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "t", "lib", "ts").t
local Client = TS.import(script, game:GetService("ReplicatedStorage"), "Shared", "components").Client
local remoteEvent = Instance.new("RemoteEvent")
remoteEvent.Name = "TrackLineOfSight"
remoteEvent.Parent = ReplicatedStorage
local function trackLineSight(world)
	remoteEvent.OnServerEvent:Connect(function(player, lineSight)
		local _arg0 = t.Vector3(lineSight)
		assert(_arg0)
		world:optimizeQueries()
		for id, client in world:query(Client) do
			if client.player == player then
				world:insert(id, client:patch({
					lineSight = lineSight,
				}))
				break
			end
		end
	end)
end
return trackLineSight
