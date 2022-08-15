-- Compiled with roblox-ts v1.3.3-dev-230088d
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local merge = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "matter", "lib").merge
local _rust_classes = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "rust-classes", "out")
local HashMap = _rust_classes.HashMap
local Vec = _rust_classes.Vec
local Workspace = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "services").Workspace
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
	merge({}, {})
	do
		local num_spawns = math.min(areas:len(), math.random(1, MAX_MONSTERS + 3))
		if num_spawns == 0 then
			return nil
		end
		for i = 1, num_spawns do
			local array_index = if areas:len() == 1 then 0 else math.random(1, areas:len()) - 1
			local vec3 = Vector3.one
			vec3 = vec3 * 2
			local _vec3 = vec3
			local _one = Vector3.one
			local a, b = _vec3 * _one, Vector3.zero
			a, b = b, a
			local map_idx = areas:i(array_index)
		end
	end
end
return {
	spawn_region = spawn_region,
}
