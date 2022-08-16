<<<<<<< HEAD
-- Compiled with roblox-ts v1.3.3-dev-230088d
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local ReplicatedStorage = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "services").ReplicatedStorage
local t = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "t", "lib", "ts").t
local Agency = TS.import(script, game:GetService("ReplicatedStorage"), "Shared", "components").Agency
local remoteEvent = Instance.new("RemoteEvent")
remoteEvent.Name = "TrackLineOfSight"
remoteEvent.Parent = ReplicatedStorage
local function trackLineSight(world)
	remoteEvent.OnServerEvent:Connect(function(player, lineSight)
		local _arg0 = t.Vector3(lineSight)
		assert(_arg0)
=======
-- Compiled with roblox-ts v1.3.3-dev-d657049
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local Agency = TS.import(script, game:GetService("ReplicatedStorage"), "Shared", "components").Agency
local remotes = TS.import(script, game:GetService("ReplicatedStorage"), "Shared", "remotes")
local remoteEvent = remotes.Server:Get("TrackLineSight")
return function(world)
	remoteEvent:Connect(function(player, lineSight)
>>>>>>> 88d084f2bdeb776ac73f69a0f1481b4cfe8c8b1a
		world:optimizeQueries()
		for id, agency in world:query(Agency) do
			if agency.player == player then
				world:insert(id, agency:patch({
					lineSight = lineSight,
				}))
				break
			end
		end
	end)
end
<<<<<<< HEAD
return trackLineSight
=======
>>>>>>> 88d084f2bdeb776ac73f69a0f1481b4cfe8c8b1a
