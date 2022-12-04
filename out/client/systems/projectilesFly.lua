-- Compiled with roblox-ts v2.0.4
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local useDeltaTime = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "matter", "lib").useDeltaTime
local _components = TS.import(script, game:GetService("ReplicatedStorage"), "Shared", "components")
local Projectile = _components.Projectile
local Transform = _components.Transform
local Velocity = _components.Velocity
local function projectilesFly(world)
	for id, transform, vel, projectile in world:query(Transform, Velocity, Projectile) do
		local velOffset = vel.speed * useDeltaTime()
		local unitDirection = projectile.direction
		local velocity = unitDirection * velOffset
		local cf = transform.cf + velocity
		transform = transform:patch({
			cf = cf,
		})
		world:insert(id, transform)
	end
end
return {
	event = "fixed",
	system = projectilesFly,
}
