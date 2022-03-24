-- Compiled with roblox-ts v1.3.3
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local _rust_classes = TS.import(script, TS.getModule(script, "@rbxts", "rust-classes").out)
local HashMap = _rust_classes.HashMap
local Vec = _rust_classes.Vec
local Workspace = TS.import(script, TS.getModule(script, "@rbxts", "services")).Workspace
local MAX_MONSTERS = 4
local function get_spawn_table_from_map(map)
	local _fn = Vec
	local _result = Workspace:FindFirstChild(map):FindFirstChild("Spawns")
	if _result ~= nil then
		_result = _result:GetChildren()
	end
	return _fn:fromPtr(_result)
end
local function spawn_region(map, area, spawn_list)
	local spawn_table = get_spawn_table_from_map(map)
	local spawn_points = HashMap:empty()
	local areas = Vec:fromPtr(area)
	do
		local num_spawns = math.min(areas:len(), math.random(1, MAX_MONSTERS + 3))
		if num_spawns == 0 then
			return nil
		end
		do
			local i = 0
			local _shouldIncrement = false
			while true do
				if _shouldIncrement then
					i += 1
				else
					_shouldIncrement = true
				end
				if not (i < num_spawns) then
					break
				end
				local array_index = if areas:len() == 1 then 0 else math.random(1, areas:len()) - 1
				local map_idx = areas:asPtr()[array_index + 1]
			end
		end
	end
end
return {
	spawn_region = spawn_region,
}
