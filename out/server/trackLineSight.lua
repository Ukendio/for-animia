-- Compiled with roblox-ts v1.3.3-dev-d657049
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local Agency = TS.import(script, game:GetService("ReplicatedStorage"), "Shared", "components").Agency
local remotes = TS.import(script, game:GetService("ReplicatedStorage"), "Shared", "remotes")
local remoteEvent = remotes.Server:Get("TrackLineSight")
return function(world)
	remoteEvent:Connect(function(player, lineSight)
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
