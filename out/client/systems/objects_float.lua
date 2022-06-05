-- Compiled with roblox-ts v1.3.3
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local _components = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "components")
local Float = _components.Float
local Renderable = _components.Renderable
local function objects_float(world)
	for id, float, _binding in world:query(Float, Renderable) do
		local model = _binding.model
		if not float.cached then
			local body_force = Instance.new("BodyForce")
			body_force.Force = float.force
			body_force.Name = "BodyForce@" .. tostring(id)
			body_force.Parent = model:FindFirstChild("HumanoidRootPart")
			world:insert(id, float:patch({
				cached = true,
			}))
		end
	end
	for id, float_record in world:queryChanged(Float) do
		local renderable = world:get(id, Renderable)
		if not renderable then
			continue
		end
		if float_record.new ~= nil then
			local _exp = float_record.new.force
			local _result = float_record.old
			if _result ~= nil then
				_result = _result.force
			end
			local _condition = _exp ~= _result
			if _condition then
				_condition = float_record.new.cached
			end
			if _condition then
				local root = renderable.model:FindFirstChild("HumanoidRootPart")
				if not root then
					continue
				end
				local body_force = root:FindFirstChild("BodyForce@" .. tostring(id))
				body_force.Force = float_record.new.force
			end
		else
			local root = renderable.model:FindFirstChild("HumanoidRootPart")
			if not root then
				continue
			end
			local body_force = root:FindFirstChild("BodyForce@" .. tostring(id))
			local _result = body_force
			if _result ~= nil then
				_result:Destroy()
			end
		end
	end
end
return {
	objects_float = objects_float,
}
