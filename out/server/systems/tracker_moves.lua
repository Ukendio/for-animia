-- Compiled with roblox-ts v1.3.3
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local useDeltaTime = TS.import(script, TS.getModule(script, "@rbxts", "matter").src.lib).useDeltaTime
local Workspace = TS.import(script, TS.getModule(script, "@rbxts", "services")).Workspace
local quad_beizer = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "beizer").quad_beizer
local _components = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "components")
local Tracker = _components.Tracker
local Projectile = _components.Projectile
local Rotation = _components.Rotation
local Transform = _components.Transform
local Renderable = _components.Renderable
local Lifetime = _components.Lifetime
local Collision = _components.Collision
local Velocity = _components.Velocity
local remotes = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "remotes")
local update_transforms = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "systems", "update_transforms")
local replicate_fx = remotes.Server:Create("ReplicateFX")
local raycast_params = RaycastParams.new()
raycast_params.FilterType = Enum.RaycastFilterType.Blacklist
local function tracker_moves(world)
	for id, _binding, transform, projectile, lifetime, _binding_1, collision, velocity in world:query(Renderable, Transform, Projectile, Lifetime, Rotation, Collision, Velocity, Tracker) do
		local model = _binding.model
		local angle = _binding_1.angle
		if not model.PrimaryPart then
			continue
		end
		local start = transform.cf
		lifetime = lifetime:patch({
			remaining_time = lifetime.remaining_time - useDeltaTime(),
		})
		local goal = projectile.goal
		local desired_look_vector = (start.Position - goal).Unit
		local _exp = start:Lerp(CFrame.new(goal), 0.5)
		local _angle = angle
		local mid_point = (_exp * _angle).Position
		local elapsed = 1 - lifetime.remaining_time
		local curve = quad_beizer(elapsed, start.Position, mid_point, goal)
		raycast_params.FilterDescendantsInstances = collision.blacklist
		local raycast_result = Workspace:Raycast(start.Position, desired_look_vector * 5, raycast_params)
		if raycast_result then
			replicate_fx:SendToAllPlayers("IceHit", goal)
			world:remove(id, Tracker)
			continue
		end
		if lifetime.remaining_time <= 0 then
			replicate_fx:SendToAllPlayers("IceHit", goal)
			world:insert(id, transform:patch({
				cf = CFrame.new(curve),
			}))
			world:remove(id, Tracker)
		else
			world:insert(id, transform:patch({
				cf = CFrame.new(curve),
			}), lifetime)
		end
	end
end
return {
	system = tracker_moves,
	after = { update_transforms },
}
