<<<<<<< HEAD
-- Compiled with roblox-ts v1.3.3-dev-230088d
=======
-- Compiled with roblox-ts v1.3.3-dev-d657049
>>>>>>> 88d084f2bdeb776ac73f69a0f1481b4cfe8c8b1a
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local LightningBolt = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "lightning-beams", "src", "LightningBolt")
local Workspace = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "services").Workspace
local dust = TS.import(script, game:GetService("ReplicatedStorage"), "Shared", "effects", "bin", "dust").dust
local LightningSparks = TS.import(script, game:GetService("ReplicatedStorage"), "Shared", "effects", "bin", "lightningSparks").LightningSparks
<<<<<<< HEAD
local RANGE = 12
local function dash(source)
	local character = source.Character
	if not character then
		return nil
	end
	local root = character:FindFirstChild("HumanoidRootPart")
	local humanoid = character:FindFirstChild("Humanoid")
	if not root or not humanoid then
=======
local DashDirection
do
	local _inverse = {}
	DashDirection = setmetatable({}, {
		__index = _inverse,
	})
	DashDirection.Forward = 0
	_inverse[0] = "Forward"
	DashDirection.Left = 1
	_inverse[1] = "Left"
	DashDirection.Right = 2
	_inverse[2] = "Right"
	DashDirection.Back = 3
	_inverse[3] = "Back"
end
local InverseDirectionMap = {
	[DashDirection.Forward] = function(n)
		return n, -n, CFrame.new(0, 0, n)
	end,
	[DashDirection.Left] = function(n)
		return -n, n, CFrame.new(-n, 0, 0)
	end,
	[DashDirection.Right] = function(n)
		return n, n, CFrame.new(n, 0, 0)
	end,
	[DashDirection.Back] = function(n)
		return -n, -n, CFrame.new(0, 0, -n)
	end,
}
local function dash(direction, source)
	local _result = source
	if _result ~= nil then
		_result = _result.Character
		if _result ~= nil then
			_result = _result:FindFirstChild("HumanoidRootPart")
		end
	end
	local root = _result
	if not root then
>>>>>>> 88d084f2bdeb776ac73f69a0f1481b4cfe8c8b1a
		return nil
	end
	local raycastParams = RaycastParams.new()
	raycastParams.FilterType = Enum.RaycastFilterType.Blacklist
	raycastParams.FilterDescendantsInstances = { root.Parent }
	local attachment0 = Instance.new("Attachment")
	attachment0.Parent = Workspace.Terrain
	local attachment1 = Instance.new("Attachment")
	attachment1.Parent = Workspace.Terrain
<<<<<<< HEAD
	local desiredDirection = (if humanoid.MoveDirection.Magnitude > 0 then humanoid.MoveDirection else root.CFrame.LookVector) * 12
	local raycastResult = Workspace:Raycast(root.Position, root.CFrame.LookVector * 12, raycastParams)
	local cf = root.CFrame + desiredDirection
	if raycastResult then
		local _fn = CFrame
		local _exp = raycastResult.Position
		local _position = raycastResult.Position
		local _lookVector = root.CFrame.LookVector
		cf = _fn.lookAt(_exp, _position + _lookVector)
	end
	attachment0.CFrame = root.CFrame
	attachment1.CFrame = cf
	root:PivotTo(cf)
=======
	local range, tpd = InverseDirectionMap[direction](12)
	local _fn = Workspace
	local _exp = root.Position
	local _lookVector = root.CFrame.LookVector
	local _range = range
	local raycastResult = _fn:Raycast(_exp, _lookVector * _range, raycastParams)
	if raycastResult then
		local _position = root.Position
		local _position_1 = raycastResult.Position
		tpd = -(_position - _position_1).Magnitude
	end
	local _, _1, cf = InverseDirectionMap[direction](tpd)
	attachment0.CFrame = root.CFrame
	local _cFrame = root.CFrame
	local _cf = cf
	attachment1.CFrame = _cFrame * _cf
	local _cFrame_1 = root.CFrame
	local _cf_1 = cf
	root.CFrame = _cFrame_1 * _cf_1
>>>>>>> 88d084f2bdeb776ac73f69a0f1481b4cfe8c8b1a
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
<<<<<<< HEAD
=======
	DashDirection = DashDirection,
>>>>>>> 88d084f2bdeb776ac73f69a0f1481b4cfe8c8b1a
}
