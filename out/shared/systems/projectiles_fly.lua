-- Compiled with roblox-ts v1.3.3
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local useDeltaTime = TS.import(script, TS.getModule(script, "@rbxts", "matter").src.lib).useDeltaTime
local _components = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "components")
local Projectile = _components.Projectile
local Transform = _components.Transform
local Velocity = _components.Velocity
local function projectiles_fly(world)
	for id, projectile, transform, _binding in world:query(Projectile, Transform, Velocity) do
		local speed = _binding.speed
		local vel_offset = speed * useDeltaTime()
		local _fn = transform
		local _object = {}
		local _left = "cf"
		local _cf = transform.cf
		local _goal = projectile.goal
		local _position = transform.cf.Position
		local _arg0 = (_goal - _position).Unit * vel_offset
		_object[_left] = _cf + _arg0
		transform = _fn:patch(_object)
		local _position_1 = transform.cf.Position
		local _goal_1 = projectile.goal
		if (_position_1 - _goal_1).Magnitude <= vel_offset then
			world:despawn(id)
		else
			world:insert(id, transform)
		end
	end
end
return {
	projectiles_fly = projectiles_fly,
}
