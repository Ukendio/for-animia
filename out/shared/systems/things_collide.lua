-- Compiled with roblox-ts v1.3.3
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local _rbxts_pattern = TS.import(script, TS.getModule(script, "@rbxts", "rbxts-pattern").out)
local match = _rbxts_pattern.match
local __ = _rbxts_pattern.__
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
local function get_parts_in_shape(shape, size, cf)
	return match(shape):with(Shape.Box, function()
		return Workspace:GetPartBoundsInBox(cf, size, overlap_params)
	end):with(Shape.Radius, function()
		return Workspace:GetPartBoundsInRadius(cf.Position, size.X, overlap_params)
	end):with(Shape.Cylinder, function()
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
	end):with(Shape.Sphere, function()
		local sphere = Instance.new("Part")
		sphere.Shape = Enum.PartType.Ball
		sphere.Anchored = true
		sphere.Transparency = 1
		sphere.Parent = Workspace
		sphere.Size = size
		local parts = Workspace:GetPartsInPart(sphere, overlap_params)
		sphere:Destroy()
		return parts
	end):with(Shape.Disc, function()
		return {}
	end):with(__, function()
		return error("not a valid shape")
	end).exhaustive()
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
							--[[
								*
								* predict fx unless it is damage type
								* const player = Players.GetPlayerFromCharacter(renderable.model);
								* if (fx.effect_type === EffectType.Damage && player) {
								*    remote_event.FireServer(serialize(fx), player);
								*    break
								* } else
							]]
							world:insert(id, fx:patch({
								target = Option:some(id),
							}))
						end
						for _k, _v in ipairs(_effects) do
							_arg0(_v, _k - 1, _effects)
						end
					end
				end
			end
			print(collided)
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
