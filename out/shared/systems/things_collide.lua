-- Compiled with roblox-ts v1.3.3
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local Option = TS.import(script, TS.getModule(script, "@rbxts", "rust-classes").out).Option
local Workspace = TS.import(script, TS.getModule(script, "@rbxts", "services")).Workspace
local _components = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "components")
local Collision = _components.Collision
local DamageArea = _components.DamageArea
local ImpactEffect = _components.ImpactEffect
local Projectile = _components.Projectile
local Renderable = _components.Renderable
local Shape = _components.Shape
local Soul = _components.Soul
local Transform = _components.Transform
local overlap_params = OverlapParams.new()
overlap_params.FilterType = Enum.RaycastFilterType.Blacklist
local raycast_params = RaycastParams.new()
raycast_params.FilterType = Enum.RaycastFilterType.Blacklist
local function get_parts_in_shape(shape, size, cf)
	if shape == Shape.Box then
		return Workspace:GetPartBoundsInBox(cf, size, overlap_params)
	elseif shape == Shape.Radius then
		return Workspace:GetPartBoundsInRadius(cf.Position, size.X, overlap_params)
	elseif shape == Shape.Cylinder then
		local cylinder = Instance.new("Part")
		cylinder.Shape = Enum.PartType.Cylinder
		cylinder.Rotation = Vector3.new(cf.Rotation.X, cf.Rotation.Y, cf.Rotation.Z)
		cylinder.Anchored = true
		cylinder.Transparency = 1
		cylinder.Parent = Workspace
		cylinder.Size = size
		local parts = Workspace:GetPartsInPart(cylinder, overlap_params)
		cylinder:Destroy()
		return parts
	elseif shape == Shape.Sphere then
		local sphere = Instance.new("Part")
		sphere.Shape = Enum.PartType.Ball
		sphere.Anchored = true
		sphere.Transparency = 1
		sphere.Parent = Workspace
		sphere.Size = size
		local parts = Workspace:GetPartsInPart(sphere, overlap_params)
		sphere:Destroy()
		return parts
	else
		error("Non-valid shape")
	end
end
local function things_collide(world)
	for id, damage_area, _binding, collision, on_hit in world:query(DamageArea, Transform, Collision, ImpactEffect) do
		local cf = _binding.cf
		local collided = false
		if not collision.collided then
			overlap_params.FilterDescendantsInstances = collision.blacklist
			for _, instance in ipairs(get_parts_in_shape(damage_area.shape, collision.size, cf)) do
				collided = true
				local instance_model = instance.Parent
				if instance_model and instance_model:FindFirstChildOfClass("Humanoid") then
					local id = instance_model:GetAttribute("entity_id")
					if id ~= nil then
						local renderable, soul = world:get(id, Renderable, Soul)
						if not renderable or not soul then
							continue
						end
						local _effects = on_hit.effects
						local _arg0 = function(fx)
							return world:insert(id, fx:patch({
								target = Option:some(id),
							}))
						end
						for _k, _v in ipairs(_effects) do
							_arg0(_v, _k - 1, _effects)
						end
					end
				end
			end
			world:insert(id, collision:patch({
				collided = collided,
			}))
		end
	end
	for id, projectile, _binding, collision, on_hit, _binding_1 in world:query(Projectile, Transform, Collision, ImpactEffect, Renderable) do
		local cf = _binding.cf
		local model = _binding_1.model
		local collided = false
		if not collision.collided then
			overlap_params.FilterDescendantsInstances = collision.blacklist
			local part = model:FindFirstChildOfClass("Part")
			if part then
				do
					local i = -45
					local _shouldIncrement = false
					while true do
						if _shouldIncrement then
							local _ = i + 45
						else
							_shouldIncrement = true
						end
						if not (i < 45) then
							break
						end
						local _fn = Workspace
						local _exp = cf.Position
						local _fn_1 = Vector3.new(0, 1, 0)
						local _unit = projectile.goal.Unit
						local _arg0 = collision.size.Z / 2 + 1
						local raycast_result = _fn:Raycast(_exp, _fn_1:Cross(_unit * _arg0), raycast_params)
					end
				end
				for _, instance in ipairs(Workspace:GetPartsInPart(part, overlap_params)) do
					collided = true
					local instance_model = instance.Parent
					if instance_model and instance_model:FindFirstChildOfClass("Humanoid") then
						local id = instance_model:GetAttribute("entity_id")
						if id ~= nil then
							local renderable, soul = world:get(id, Renderable, Soul)
							if not renderable or not soul then
								continue
							end
							local _effects = on_hit.effects
							local _arg0 = function(fx)
								return world:spawn(fx:patch({
									target = Option:some(id),
								}))
							end
							for _k, _v in ipairs(_effects) do
								_arg0(_v, _k - 1, _effects)
							end
							continue
						end
					else
						local _effects = on_hit.effects
						local _arg0 = function(fx)
							return world:spawn(fx:patch({
								pos = Option:some(cf.Position),
							}))
						end
						for _k, _v in ipairs(_effects) do
							_arg0(_v, _k - 1, _effects)
						end
					end
				end
			end
			world:insert(id, collision:patch({
				collided = collided,
			}))
		else
			world:despawn(id)
		end
	end
end
return {
	things_collide = things_collide,
}
