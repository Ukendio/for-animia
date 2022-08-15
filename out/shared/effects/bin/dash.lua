-- Compiled with roblox-ts v1.3.3-dev-230088d
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local LightningBolt = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "lightning-beams", "src", "LightningBolt")
local Workspace = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "services").Workspace
local dust = TS.import(script, game:GetService("ReplicatedStorage"), "Shared", "effects", "bin", "dust").dust
local LightningSparks = TS.import(script, game:GetService("ReplicatedStorage"), "Shared", "effects", "bin", "lightningSparks").LightningSparks
local RANGE = 12
local function dash(source)
	local character = source.Character
	if not character then
		return nil
	end
	local root = character:FindFirstChild("HumanoidRootPart")
	local humanoid = character:FindFirstChild("Humanoid")
	if not root or not humanoid then
		return nil
	end
	local raycastParams = RaycastParams.new()
	raycastParams.FilterType = Enum.RaycastFilterType.Blacklist
	raycastParams.FilterDescendantsInstances = { root.Parent }
	local attachment0 = Instance.new("Attachment")
	attachment0.Parent = Workspace.Terrain
	local attachment1 = Instance.new("Attachment")
	attachment1.Parent = Workspace.Terrain
	local desiredDirection = (if humanoid.MoveDirection.Magnitude > 0 then humanoid.MoveDirection else root.CFrame.LookVector) * 12
	local raycastResult = Workspace:Raycast(root.Position, root.CFrame.LookVector * 12, raycastParams)
	local cf = root.CFrame + desiredDirection
	if raycastResult then
		local _fn = CFrame
		local _exp = raycastResult.Position
		local _position = raycastResult.Position
		local _arg0 = root.CFrame.LookVector * 12
		cf = _fn.lookAt(_exp, _position + _arg0)
	end
	attachment0.CFrame = root.CFrame
	attachment1.CFrame = cf
	root:PivotTo(cf)
	local bolt = LightningBolt.new(attachment0, attachment1, 22)
	bolt.CurveSize0, bolt.CurveSize1 = 0, 0
	bolt.ContractFrom = 0.1
	bolt.Thickness = 1.2
	bolt.PulseSpeed = 30
	bolt.PulseLength = 0.1
	bolt.FadeLength = 1
	bolt.PulseLength = 5
	local result = Workspace:Raycast(attachment1.WorldPosition, Vector3.new(0, -8, 0))
	if result and result.Instance then
		local raycastParams = RaycastParams.new()
		raycastParams.FilterType = Enum.RaycastFilterType.Blacklist
		raycastParams.FilterDescendantsInstances = { root.Parent }
		local attachment = Instance.new("Attachment")
		attachment.Parent = root
		task.delay(0.5, function()
			return attachment:Destroy()
		end)
		local dashFx = dust()
		dashFx.Parent = attachment
		dashFx:Emit(15)
	end
	task.spawn(function()
		for i = 3, 1, -0.1 do
			task.wait(1 / 30)
			bolt.MaxRadius = i
		end
	end)
	bolt.Color = ColorSequence.new({ ColorSequenceKeypoint.new(0, Color3.new(0.27451, 0.929412, 1)), ColorSequenceKeypoint.new(1, Color3.new(1, 1, 1)) })
	local sparks = LightningSparks.new(bolt, 11)
	sparks.minSpeed = 3
	sparks.maxSpeed = 5
	sparks.minDistance, sparks.maxDistance = 5, 5
end
return {
	dash = dash,
}
