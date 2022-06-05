-- Compiled with roblox-ts v1.3.3
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local useThrottle = TS.import(script, TS.getModule(script, "@rbxts", "matter").lib).useThrottle
local _components = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "components")
local Mob = _components.Mob
local Transform = _components.Transform
local function spawn_mobs(world)
	if useThrottle(10) then
		local origin = Vector3.one * 5
		local _vector3 = Vector3.new(if math.random(1, 2) == 1 then 1 else -1, 1, if math.random(1, 2) == 1 then 1 else -1)
		local spawn_pos = origin * _vector3
		world:spawn(Mob({
			id = 1,
		}), Transform({
			cf = CFrame.new(spawn_pos),
		}))
	end
end
return {
	spawn_mobs = spawn_mobs,
}
