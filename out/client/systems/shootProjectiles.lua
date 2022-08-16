<<<<<<< HEAD
-- Compiled with roblox-ts v1.3.3-dev-230088d
=======
-- Compiled with roblox-ts v1.3.3-dev-d657049
>>>>>>> 88d084f2bdeb776ac73f69a0f1481b4cfe8c8b1a
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local _matter = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "matter", "lib")
local useDeltaTime = _matter.useDeltaTime
local useEvent = _matter.useEvent
local _services = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "services")
local Players = _services.Players
local UserInputService = _services.UserInputService
local Workspace = _services.Workspace
local _components = TS.import(script, game:GetService("ReplicatedStorage"), "Shared", "components")
local Collision = _components.Collision
local ImpactEffect = _components.ImpactEffect
local Lifetime = _components.Lifetime
local Projectile = _components.Projectile
local Renderable = _components.Renderable
local Transform = _components.Transform
local Velocity = _components.Velocity
local player = Players.LocalPlayer
local mouse = player:GetMouse()
local raycastParams = RaycastParams.new()
local overlapParams = OverlapParams.new()
local function shootProjectiles(world, state, ui)
	for _, _binding, gameProcessedEvent in useEvent(UserInputService, "InputBegan") do
		local KeyCode = _binding.KeyCode
		if gameProcessedEvent then
			continue
		end
		if KeyCode == Enum.KeyCode.F then
			local part = Instance.new("Part")
			part.Anchored = true
			part.CanCollide = false
			local model = Instance.new("Model")
			model.Parent = Workspace
			model.PrimaryPart = part
			local cf = CFrame.new(state.character:GetPivot().Position, mouse.Hit.Position)
			part.CFrame = cf
			part.Parent = model
			local _fn = world
			local _object = {}
			local _left = "direction"
			local _position = mouse.Hit.Position
			local _position_1 = cf.Position
			_object[_left] = (_position - _position_1).Unit
			_object.filter = { player.Character }
			_fn:spawn(Projectile(_object), Renderable({
				model = model,
			}), Transform({
				cf = cf,
			}), Velocity({
				speed = 50,
			}), Collision({
				size = model.PrimaryPart.Size,
			}), Lifetime({
				spawnedAt = os.clock(),
				length = 5,
<<<<<<< HEAD
				elapsed = 0,
=======
>>>>>>> 88d084f2bdeb776ac73f69a0f1481b4cfe8c8b1a
			}))
		end
	end
	for id, projectile, collision, transform, _binding, _binding_1 in world:query(Projectile, Collision, Transform, Velocity, Renderable) do
		local speed = _binding.speed
		local model = _binding_1.model
		local impactEffect = world:get(id, ImpactEffect)
		local payload = {}
		if collision.size.X >= 4 or (collision.size.Y >= 4 or collision.size.Z >= 4) then
			overlapParams.FilterDescendantsInstances = { state.character, model }
			local result = Workspace:GetPartBoundsInBox(transform.cf, collision.size, overlapParams)
			if (next(result)) ~= nil then
				local seenModels = {}
				for _, part in result do
					local instanceModel = part:FindFirstAncestorOfClass("Model")
					local _result = instanceModel
					if _result ~= nil then
						_result = _result:FindFirstChild("Humanoid")
					end
					local _condition = _result
					if _condition then
						_condition = not (seenModels[instanceModel] ~= nil)
					end
					if _condition then
						payload.target = instanceModel
						seenModels[instanceModel] = true
					end
				end
				payload.pos = transform.cf.Position
			end
		else
			raycastParams.FilterDescendantsInstances = { state.character, model }
			local velOffset = speed * useDeltaTime() + collision.size.Z
			local unitDirection = projectile.direction
			local velocity = unitDirection * velOffset
			local result = Workspace:Raycast(transform.cf.Position, (transform.cf + velocity).Position, raycastParams)
			if result and (result.Position and result.Instance) then
				local payload = {
					pos = result.Position,
				}
				local instanceModel = result.Instance:FindFirstAncestorOfClass("Model")
				local _result = instanceModel
				if _result ~= nil then
					_result = _result:FindFirstChild("Humanoid")
				end
				if _result then
					payload.target = instanceModel
				end
			end
		end
		if impactEffect then
			for _, effect in impactEffect.effects do
				world:spawn(effect:patch(payload))
			end
		end
		if payload.pos then
			world:despawn(id)
		end
	end
end
return {
	event = "fixed",
	system = shootProjectiles,
}
