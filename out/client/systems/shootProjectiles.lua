-- Compiled with roblox-ts v1.3.3-dev-d657049
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local useEvent = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "matter", "lib").useEvent
local _services = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "services")
local Players = _services.Players
local UserInputService = _services.UserInputService
local Workspace = _services.Workspace
local _components = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "components")
local Collision = _components.Collision
local ImpactEffect = _components.ImpactEffect
local Projectile = _components.Projectile
local Renderable = _components.Renderable
local Transform = _components.Transform
local Velocity = _components.Velocity
local player = Players.LocalPlayer
local mouse = player:GetMouse()
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
				speed = 15,
			}), Collision({
				size = model.PrimaryPart.Size,
			}), ImpactEffect({
				effects = {},
			}))
		end
	end
end
return shootProjectiles
