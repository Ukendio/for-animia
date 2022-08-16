<<<<<<< HEAD
-- Compiled with roblox-ts v1.3.3-dev-230088d
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local _services = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "services")
local HttpService = _services.HttpService
local Players = _services.Players
=======
-- Compiled with roblox-ts v1.3.3-dev-d657049
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local _services = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "services")
local HttpService = _services.HttpService
>>>>>>> 88d084f2bdeb776ac73f69a0f1481b4cfe8c8b1a
local Workspace = _services.Workspace
local _components = TS.import(script, game:GetService("ReplicatedStorage"), "Shared", "components")
local Collision = _components.Collision
local Effect = _components.Effect
local ImpactEffect = _components.ImpactEffect
local Projectile = _components.Projectile
local SplashDamage = _components.SplashDamage
local Transform = _components.Transform
local Velocity = _components.Velocity
local EffectVariant = TS.import(script, game:GetService("ReplicatedStorage"), "Shared", "effects").EffectVariant
local raycastParams = RaycastParams.new()
raycastParams.FilterType = Enum.RaycastFilterType.Blacklist
local overlapParams = OverlapParams.new()
overlapParams.FilterType = Enum.RaycastFilterType.Blacklist
local function hitScanEffect(world, state, ui)
	for id, _binding, _binding_1, collision, impactEffect, vel in world:query(Projectile, Transform, Collision, ImpactEffect, Velocity) do
		local direction = _binding.direction
		local filter = _binding.filter
		local cf = _binding_1.cf
		raycastParams.FilterDescendantsInstances = filter
		for i = -1, 1 do
			local angle = CFrame.fromEulerAnglesXYZ(0, i * 45, 0)
			local _position = cf.Position
			local _arg0 = collision.size.Z * 2
			local _arg0_1 = direction * _arg0
			local _vector3 = Vector3.new(math.rad(i * 45), 1, math.rad(i * 45))
			local targetPosition = CFrame.new((_position + _arg0_1) * _vector3).Position
			local raycastResult = Workspace:Raycast(cf.Position, targetPosition, raycastParams)
			if state.debugEnabled then
				ui.portal(Workspace, function()
					local _fn = ui
					local _exp = cf.Position
					local _position_1 = cf.Position
					local _arg0_2 = collision.size.Z * 4
					local _arg0_3 = direction * _arg0_2
					local _cFrame = CFrame.new(_position_1 + _arg0_3)
					local _vector3_1 = Vector3.new(math.rad(i * 45), 1, math.rad(i * 45))
					_fn.arrow(_exp, _cFrame * _vector3_1)
				end)
			end
			if raycastResult and raycastResult.Instance then
				local pos = raycastResult.Position
				local target = nil
				local _result = raycastResult.Instance.Parent
				if _result ~= nil then
					_result = _result:FindFirstChild("Humanoid")
				end
				if _result then
					target = raycastResult.Instance.Parent
				end
				local _effects = impactEffect.effects
				local _arg0_2 = function(effect)
					return world:spawn(effect:patch({
						target = target,
						pos = pos,
					}))
				end
				for _k, _v in _effects do
					_arg0_2(_v, _k - 1, _effects)
				end
				local splashEffect = world:get(id, SplashDamage)
				if splashEffect then
					overlapParams.FilterDescendantsInstances = filter
					local spatialQueryResult = Workspace:GetPartBoundsInRadius(pos, splashEffect.radius, overlapParams)
					if (next(spatialQueryResult)) ~= nil then
						local _arg0_3 = function(instance)
							local target = nil
							local _result_1 = instance.Parent
							if _result_1 ~= nil then
								_result_1 = _result_1:FindFirstChild("Humanoid")
							end
							if _result_1 then
								target = instance.Parent
							end
							world:spawn(Effect({
								variant = EffectVariant.Damage(10),
								predictionGUID = HttpService:GenerateGUID(false),
								target = target,
<<<<<<< HEAD
								source = Players.LocalPlayer,
=======
>>>>>>> 88d084f2bdeb776ac73f69a0f1481b4cfe8c8b1a
							}))
						end
						for _k, _v in spatialQueryResult do
							_arg0_3(_v, _k - 1, spatialQueryResult)
						end
					end
				end
				world:despawn(id)
<<<<<<< HEAD
				break
=======
				return nil
>>>>>>> 88d084f2bdeb776ac73f69a0f1481b4cfe8c8b1a
			end
		end
	end
end
return {
	event = "fixed",
	system = hitScanEffect,
}
