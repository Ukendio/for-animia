-- Compiled with roblox-ts v1.3.3
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local _components = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "components")
local Steer = _components.Steer
local Renderable = _components.Renderable
local function objects_rotate(world, state)
	for id, steer, _binding in world:query(Steer, Renderable) do
		local model = _binding.model
		local root = model:FindFirstChild("HumanoidRootPart")
		if not steer.cached then
			local body_gyro = Instance.new("BodyGyro")
			body_gyro.CFrame = CFrame.new(root.Position, steer.direction)
			body_gyro.MaxTorque = Vector3.one * 1e3
			body_gyro.P = 1e5
			body_gyro.Parent = root
			world:insert(id, steer:patch({
				cached = true,
			}))
		else
			local body_gyro = root:FindFirstChild("BodyGyro")
			body_gyro.CFrame = CFrame.new(root.Position, steer.direction)
		end
	end
	for _, steer_record, _binding in world:queryChanged(Steer, Renderable) do
		local model = _binding.model
		if steer_record.new ~= nil then
			local _exp = steer_record.new.direction
			local _result = steer_record.old
			if _result ~= nil then
				_result = _result.direction
			end
			local _condition = _exp ~= _result
			if _condition then
				_condition = steer_record.new.cached
			end
			if _condition then
				local root = model:FindFirstChild("HumanoidRootPart")
				if not root then
					continue
				end
				local body_gyro = root:FindFirstChild("BodyGyro")
				body_gyro.CFrame = CFrame.new(root.Position, steer_record.new.direction)
			end
		else
			local root = model:FindFirstChild("HumanoidRootPart")
			if not root then
				continue
			end
			local body_gyro = root:FindFirstChild("BodyGyro")
			local _result = body_gyro
			if _result ~= nil then
				_result:Destroy()
			end
		end
	end
end
return {
	objects_rotate = objects_rotate,
}
