-- Compiled with roblox-ts v1.3.3-dev-d657049
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local _components = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "components")
local Charge = _components.Charge
local Renderable = _components.Renderable
local Target = _components.Target
local function carsGoVroom(world, _, ui)
	if ui.checkbox("Disable Physical movers").checked() == true then
		for _1, renderable in world:query(Renderable, Charge) do
			local model = renderable.model.PrimaryPart
			model.VectorForce.Enabled = false
			model.Torque.Enabled = false
		end
		return nil
	end
	local targets = {}
	for _1, _binding in world:query(Renderable, Target) do
		local model = _binding.model
		local _position = model:GetPivot().Position
		table.insert(targets, _position)
	end
	for _1, _binding, _binding_1 in world:query(Charge, Renderable) do
		local charge = _binding.charge
		local model = _binding_1.model
		if charge <= 0 then
			continue
		end
		local closestPosition, closestDistance = nil, nil
		local currentPosition = model:GetPivot().Position
		for _2, target in targets do
			local distance = (currentPosition - target).Magnitude
			if not closestPosition or distance < closestDistance then
				closestPosition, closestDistance = target, distance
			end
		end
		if closestPosition then
			local body = model.PrimaryPart
			local force = body:GetMass() * 20
			if closestDistance < 4 then
				force = 0
			end
			local lookVector = body.CFrame.LookVector
			local _closestPosition = closestPosition
			local _currentPosition = currentPosition
			local desiredLookVector = (_closestPosition - _currentPosition).Unit
			force = force * lookVector:Dot(desiredLookVector)
			body.VectorForce.Force = Vector3.new(force, 0, 0)
			local absoluteAngle = math.atan2(desiredLookVector.Z, desiredLookVector.X)
			local carAngle = math.atan2(lookVector.Z, lookVector.X)
			local angle = math.deg(absoluteAngle - carAngle)
			angle = angle % 360
			angle = (angle + 360) % 360
			if angle > 180 then
				angle -= 360
			end
			local angularVelocity = body.AssemblyAngularVelocity
			local sign = math.sign(angle)
			local motor = math.sqrt(math.abs(angle)) * sign * -1 * 20
			local friction = angularVelocity.Y * -12
			local torque = body:GetMass() * (motor + friction)
			body.Torque.Torque = Vector3.new(0, torque, 0)
			body.VectorForce.Enabled = true
			body.Torque.Enabled = true
		end
	end
end
return carsGoVroom
