-- Compiled with roblox-ts v1.3.3
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local _matter = TS.import(script, TS.getModule(script, "@rbxts", "matter").src.lib)
local useDeltaTime = _matter.useDeltaTime
local useEvent = _matter.useEvent
local _services = TS.import(script, TS.getModule(script, "@rbxts", "services"))
local Players = _services.Players
local TweenService = _services.TweenService
local UserInputService = _services.UserInputService
local Workspace = _services.Workspace
local _components = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "components")
local Float = _components.Float
local HitScan = _components.HitScan
local Lifetime = _components.Lifetime
local Renderable = _components.Renderable
local Soul = _components.Soul
local Steer = _components.Steer
local Target = _components.Target
local get_mass_of_model = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "get_mass_of_model").get_mass_of_model
local raycast_params = RaycastParams.new()
raycast_params.FilterType = Enum.RaycastFilterType.Blacklist
local range = 300
local shoot_speed = 1000
local hook_force = 2000
local hook_boost_force = 3250
local twist_force = 1500
local hook_attach = Instance.new("Attachment")
hook_attach.Name = "Hook"
local line_force = Instance.new("LineForce")
line_force.Name = "LineForce"
line_force.Parent = hook_attach
local function grapplers_hooks(world, state)
	for grappler_entity, _binding, soul in world:query(Renderable, Soul, Target):without(Lifetime, HitScan) do
		local model = _binding.model
		if soul.name ~= "Grappler" then
			continue
		end
		local _result = hook_attach.Parent
		if _result ~= nil then
			_result = _result:IsDescendantOf(game)
		end
		if not _result then
			hook_attach.Parent = model:FindFirstChild("RightHand")
			hook_attach.Position = Vector3.new(0.5, 0, 0)
		end
		for _, _binding_1 in useEvent(UserInputService, "InputBegan") do
			local KeyCode = _binding_1.KeyCode
			if KeyCode == state.use_ability_3 then
				local root = model:FindFirstChild("HumanoidRootPart")
				if not root then
					continue
				end
				raycast_params.FilterDescendantsInstances = { model }
				local _fn = Workspace
				local _exp = root.Position
				local _position = Players:GetPlayerFromCharacter(model):GetMouse().Hit.Position
				local _position_1 = root.Position
				local raycast_result = _fn:Raycast(_exp, (_position - _position_1) * range, raycast_params)
				if raycast_result then
					local _position_2 = raycast_result.Position
					local _position_3 = root.Position
					local remaining_time = (_position_2 - _position_3).Magnitude / shoot_speed
					world:insert(grappler_entity, HitScan({
						raycast_result = raycast_result,
					}), Lifetime({
						remaining_time = remaining_time,
					}))
				end
			end
		end
	end
	for grappler_entity, lifetime, hit_scan, _binding, soul in world:query(Lifetime, HitScan, Renderable, Soul) do
		local model = _binding.model
		if soul.name ~= "Grappler" then
			continue
		end
		lifetime = lifetime:patch({
			remaining_time = lifetime.remaining_time - useDeltaTime(),
		})
		if lifetime.remaining_time <= 0 then
			world:insert(grappler_entity, Float({
				force = Vector3.new(0, get_mass_of_model(model) * Workspace.Gravity, 0),
			}), Steer({
				direction = hit_scan.raycast_result.Position,
			}))
			world:remove(grappler_entity, Lifetime)
			-- spawn hook
		else
			world:insert(grappler_entity, lifetime)
		end
	end
	for grappler_entity, _binding, float, steer, hit_scan, soul in world:query(Renderable, Float, Steer, HitScan, Soul):without(Lifetime) do
		local model = _binding.model
		if soul.name ~= "Grappler" then
			continue
		end
		local root = model:FindFirstChild("HumanoidRootPart")
		if not root then
			continue
		end
		if UserInputService:IsKeyDown(state.strafe_left) then
			local _cFrame = root.CFrame
			local _cFrame_1 = CFrame.new(-1, 0, 0)
			local _position = (_cFrame * _cFrame_1).Position
			local _position_1 = root.Position
			local force = (_position - _position_1).Unit * twist_force
			float = float:patch({
				force = Vector3.new(force.X, float.force.Y, force.Z),
			})
		elseif UserInputService:IsKeyDown(state.strafe_right) then
			local _cFrame = root.CFrame
			local _cFrame_1 = CFrame.new(1, 0, 0)
			local _position = (_cFrame * _cFrame_1).Position
			local _position_1 = root.Position
			local force = (_position - _position_1).Unit * twist_force
			float = float:patch({
				force = Vector3.new(force.X, float.force.Y, force.Z),
			})
		elseif not UserInputService:IsKeyDown(state.strafe_left) and not UserInputService:IsKeyDown(state.strafe_right) then
			float = float:patch({
				force = Vector3.new(0, get_mass_of_model(model) * Workspace.Gravity, 0),
			})
		end
		world:insert(grappler_entity, float, steer:patch({
			direction = hit_scan.raycast_result.Position,
		}))
		local camera = Workspace.CurrentCamera
		if not camera then
			continue
		end
		TweenService:Create(camera, TweenInfo.new(0.5), {
			FieldOfView = 100,
		}):Play()
	end
	for grappler_entity, soul, _binding in world:query(Soul, Renderable, Float, Steer, HitScan) do
		local model = _binding.model
		if soul.name ~= "Grappler" then
			continue
		end
		for _, _binding_1 in useEvent(UserInputService, "InputBegan") do
			local KeyCode = _binding_1.KeyCode
			if KeyCode == state.jump then
				line_force.Magnitude = hook_force
				local humanoid = model:FindFirstChild("Humanoid")
				if not humanoid then
					continue
				end
				TweenService:Create(humanoid, TweenInfo.new(0.4), {
					CameraOffset = Vector3.new(humanoid.CameraOffset.X, humanoid.CameraOffset.Y, 10),
				}):Play()
			end
		end
		for _, _binding_1 in useEvent(UserInputService, "InputEnded") do
			local KeyCode = _binding_1.KeyCode
			local humanoid = model:FindFirstChild("Humanoid")
			if not humanoid then
				continue
			end
			if KeyCode == state.use_ability_3 then
				local camera = Workspace.CurrentCamera
				if not camera then
					continue
				end
				TweenService:Create(camera, TweenInfo.new(1), {
					FieldOfView = 70,
				}):Play()
				TweenService:Create(humanoid, TweenInfo.new(0.4), {
					CameraOffset = Vector3.zero,
				}):Play()
				world:remove(grappler_entity, Float, Steer)
			elseif KeyCode == state.jump then
				print("jump end")
				TweenService:Create(humanoid, TweenInfo.new(0.4), {
					CameraOffset = Vector3.zero,
				}):Play()
			end
		end
	end
end
return {
	grapplers_hooks = grapplers_hooks,
}
