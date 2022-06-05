-- Compiled with roblox-ts v1.3.3
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local _components = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "components")
local Renderable = _components.Renderable
local Tracker = _components.Tracker
local function remove_missing_trackers(world)
	for id, tracker_record in world:queryChanged(Tracker) do
		if world:get(id, Renderable) == nil then
			continue
		end
		if tracker_record.new == nil then
			world:despawn(id)
		end
	end
end
return {
	remove_missing_trackers = remove_missing_trackers,
}
