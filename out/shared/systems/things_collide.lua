-- Compiled with roblox-ts v1.3.3
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local Option = TS.import(script, TS.getModule(script, "@rbxts", "rust-classes").out).Option
local Workspace = TS.import(script, TS.getModule(script, "@rbxts", "services")).Workspace
local _components = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "components")
local Collision = _components.Collision
local ImpactEffect = _components.ImpactEffect
local Projectile = _components.Projectile
local Renderable = _components.Renderable
local Transform = _components.Transform
local overlap_params = OverlapParams.new()
overlap_params.FilterType = Enum.RaycastFilterType.Blacklist
local raycast_params = RaycastParams.new()
raycast_params.FilterType = Enum.RaycastFilterType.Blacklist
local function things_collide(world)
	for id, projectile, _binding, collision, on_hit, _binding_1 in world:query(Projectile, Transform, Collision, ImpactEffect, Renderable) do
		local cf = _binding.cf
		local model = _binding_1.model
		overlap_params.FilterDescendantsInstances = collision.blacklist
		local collided = false
		if not collision.collided then
			local part = model:FindFirstChildOfClass("Part")
			local _arg0 = {
				target = Option:none(),
				pos = Option:none(),
			}
			local payload = _arg0
			if not part then
				continue
			end
			for _, instance in ipairs(Workspace:GetPartsInPart(part, overlap_params)) do
				local instance_model = instance.Parent
				if instance_model and instance_model:FindFirstChildOfClass("Humanoid") then
					local _blacklist = collision.blacklist
					local _arg0_1 = function(a)
						return a == instance_model
					end
					-- ▼ ReadonlyArray.find ▼
					local _result
					for _i, _v in ipairs(_blacklist) do
						if _arg0_1(_v, _i - 1, _blacklist) == true then
							_result = _v
							break
						end
					end
					-- ▲ ReadonlyArray.find ▲
					if _result then
						continue
					end
					payload.target = Option:some(instance_model)
				end
				payload.pos = Option:some(cf.Position)
				collided = true
			end
			if collided then
				local _effects = on_hit.effects
				local _arg0_1 = function(fx)
					world:spawn(fx:patch(payload))
				end
				for _k, _v in ipairs(_effects) do
					_arg0_1(_v, _k - 1, _effects)
				end
				world:insert(id, collision:patch({
					collided = collided,
				}))
			end
		else
			world:despawn(id)
		end
	end
end
return {
	things_collide = things_collide,
}
