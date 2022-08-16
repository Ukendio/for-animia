-- Compiled with roblox-ts v1.3.3-dev-230088d
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local _fusion = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "fusion", "src")
local Children = _fusion.Children
local New = _fusion.New
local Ref = _fusion.Ref
local Value = _fusion.Value
local _services = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "services")
local TweenService = _services.TweenService
local Workspace = _services.Workspace
local getAnimationLength = TS.import(script, game:GetService("ReplicatedStorage"), "Shared", "getAnimationLength").getAnimationLength
local DebugMode
local function createAttachment(props, host, debugMode)
	local _fn = New("Attachment")
	local _object = {}
	for _k, _v in props do
		_object[_k] = _v
	end
	_object.Parent = host
	_object.Visible = if debugMode == DebugMode.TrailAdornments then true else false
	return _fn(_object)
end
local function debugAdornments(attachments, debugMode)
	for _, attachment in attachments do
		local adornment = Instance.new("BillboardGui")
		adornment.AlwaysOnTop = true
		adornment.Enabled = if debugMode == DebugMode.TrailAdornments then true else false
		adornment.Size = UDim2.new(1, 0, 1, 0)
		local textLabel = Instance.new("TextLabel")
		textLabel.Text = attachment.Name
		textLabel.Parent = adornment
		textLabel.Size = UDim2.fromScale(1, 1)
		textLabel.BackgroundTransparency = 1
		textLabel.BorderColor3 = Color3.fromRGB(27, 42, 53)
		textLabel.BorderSizePixel = 1
		textLabel.TextStrokeTransparency = 1
		textLabel.TextColor3 = BrickColor.random().Color
		textLabel.TextSize = 15
		textLabel.TextXAlignment = Enum.TextXAlignment.Left
		textLabel.TextYAlignment = Enum.TextYAlignment.Top
		textLabel.Parent = adornment
		adornment.Parent = attachment
	end
end
local SPEED = 0.05
local TWEEN_INFO = TweenInfo.new(SPEED, Enum.EasingStyle.Linear, Enum.EasingDirection.In)
do
	local _inverse = {}
	DebugMode = setmetatable({}, {
		__index = _inverse,
	})
	DebugMode.TrailOnly = 0
	_inverse[0] = "TrailOnly"
	DebugMode.TrailAdornments = 1
	_inverse[1] = "TrailAdornments"
	DebugMode.Nothing = 2
	_inverse[2] = "Nothing"
end
local function splineNode(name, cf, wayPoints, host, debugMode)
	local splinePart = Instance.new("Part")
	splinePart.Anchored = true
	splinePart.CanCollide = false
	splinePart.CanTouch = false
	splinePart.CastShadow = false
	splinePart.CanQuery = false
	splinePart.Name = "Spline@" .. name
	splinePart.Size = Vector3.new(30, 25, 13.375)
	splinePart.CFrame = cf
	splinePart.Transparency = 1
	splinePart.Parent = host
	local start = Vector3.one
	for i, props in pairs(wayPoints) do
		local _object = {
			Name = tostring(i),
		}
		for _k, _v in props do
			_object[_k] = _v
		end
		local attachment = createAttachment(_object, host, debugMode)
		if i == 1 then
			start = attachment.WorldPosition
		end
		attachment.Parent = splinePart
	end
	local trailPart = Instance.new("Part")
	trailPart.Anchored = true
	trailPart.CanCollide = false
	trailPart.CanTouch = false
	trailPart.CanQuery = false
	trailPart.Size = Vector3.one
	trailPart.Position = start
	trailPart.Transparency = 1
	trailPart.Parent = host
	local trail = Instance.new("Trail")
	trail.FaceCamera = true
	trail.Attachment0 = createAttachment({
		Name = "0",
		Position = Vector3.new(trailPart.Size.X / 2, 0, 0),
	}, trailPart, debugMode)
	trail.Attachment1 = createAttachment({
		Name = "1",
		Position = Vector3.new(-(trailPart.Size.X / 2), 0, 0),
	}, trailPart, debugMode)
	trail.Texture = "rbxassetid://10405228862"
	trail.Color = ColorSequence.new(Color3.fromRGB(5, 133, 117))
	trail.LightEmission = 0
	trail.LightInfluence = 1
	trail.Lifetime = 1.5
	trail.Transparency = NumberSequence.new(if debugMode == DebugMode.Nothing then 1 else 0)
	trail.Parent = trailPart
	task.defer(function()
		local _exp = splinePart:GetChildren()
		local _arg0 = function(a, b)
			return tonumber(a.Name) < tonumber(b.Name)
		end
		table.sort(_exp, _arg0)
		local sortedAttachments = _exp
		debugAdornments(sortedAttachments, debugMode)
		for _, attachment in sortedAttachments do
			local tween = TweenService:Create(trailPart, TWEEN_INFO, {
				Position = attachment.WorldPosition,
				Orientation = attachment.WorldOrientation,
			})
			tween:Play()
			tween.Completed:Wait()
		end
	end)
end
local deathAnimation = Instance.new("Animation")
deathAnimation.AnimationId = "rbxassetid://10407034618"
local deathAnimationLen = getAnimationLength(deathAnimation)
local function death(target)
	target.HumanoidRootPart.Anchored = true
	local humanoid = target.Humanoid
	local animator = humanoid.Animator
	if animator then
		for _, anim in animator:GetPlayingAnimationTracks() do
			anim:Stop()
		end
		local animationTrack = animator:LoadAnimation(deathAnimation)
		animationTrack:Play()
		task.delay(deathAnimationLen - 0.05, function()
			animationTrack:AdjustSpeed(0)
		end)
	end
	local temp = Instance.new("Part")
	temp.Anchored = true
	temp.CanCollide = false
	temp.CanTouch = false
	temp.CanQuery = false
	temp.CastShadow = false
	temp.Transparency = 1
	temp.BrickColor = BrickColor.Red()
	temp.Size = Vector3.new(30, 25, 13.375)
	task.delay(0.05, function()
		local _exp = target:GetPivot()
		local _exp_1 = target.HumanoidRootPart.CFrame.LookVector * (-2)
		local _vector3 = Vector3.new(0, -10, 0)
		local cf = _exp - (_exp_1 + _vector3)
		temp.CFrame = cf
		temp.Parent = Workspace.Terrain
		task.delay(0.5, function()
			splineNode("a", cf, {
				[1] = {
					Position = Vector3.new(-10, 10, -5),
				},
				[2] = {
					Position = Vector3.new(-9.75, 8, -4.75),
				},
				[3] = {
					Position = Vector3.new(-9.5, 6, -4.5),
				},
				[4] = {
					Position = Vector3.new(-8, 4, -5),
				},
				[5] = {
					Position = Vector3.new(-7, 1, -5),
				},
				[6] = {
					Position = Vector3.new(-6, -2, -4),
				},
				[7] = {
					Position = Vector3.new(-5, -4, -3),
				},
				[8] = {
					Position = Vector3.new(-4, -6, -2),
				},
				[9] = {
					Position = Vector3.new(-2, -8, -1),
				},
				[10] = {
					Position = Vector3.new(0, -10, 0),
					Rotation = Vector3.new(0, 0, 90),
				},
				[11] = {
					Position = Vector3.new(3.2, -11, 1),
					Rotation = Vector3.new(0, 0, 80),
				},
				[12] = {
					Position = Vector3.new(3.6, -11, 2),
					Rotation = Vector3.new(0, 0, 60),
				},
				[13] = {
					Position = Vector3.new(2, -8, 3.5),
					Rotation = Vector3.new(-15, 30, 0),
				},
				[14] = {
					Position = Vector3.new(-1, -8, 3.5),
				},
			}, temp, DebugMode.TrailOnly)
			splineNode("b", cf, {
				[1] = {
					Position = Vector3.new(10, 10, -3),
				},
				[2] = {
					Position = Vector3.new(9.5, 7.5, -2),
				},
				[3] = {
					Position = Vector3.new(9.1, 5, -1.5),
				},
				[4] = {
					Position = Vector3.new(8.7, 2.5, -1.25),
				},
				[5] = {
					Position = Vector3.new(8.3, 0, -1),
				},
				[6] = {
					Position = Vector3.new(7.9, -2.5, -0.5),
				},
				[7] = {
					Position = Vector3.new(7.5, -5, 0.25),
				},
				[8] = {
					Position = Vector3.new(6.6, -7.5, 1),
				},
				[9] = {
					Position = Vector3.new(5.6, -9, 2.25),
				},
				[10] = {
					Position = Vector3.new(3.5, -11, 2.5),
				},
				[11] = {
					Position = Vector3.new(1, -11.5, 2.5),
				},
				[12] = {
					Position = Vector3.new(-3, -12, 2),
				},
				[13] = {
					Position = Vector3.new(-2.5, -11, 0),
				},
				[14] = {
					Position = Vector3.new(1.5, -9, 0),
				},
				[15] = {
					Position = Vector3.new(2, -8, 2),
				},
				[16] = {
					Position = Vector3.new(1, -8, 3.5),
				},
				[17] = {
					Position = Vector3.new(0, -8.25, 1.5),
				},
			}, temp, DebugMode.TrailOnly)
			task.delay(1.5, function()
				local outline = Value(nil)
				local smoke = Value(nil)
				local orig = New("Attachment")({
					CFrame = target:GetPivot(),
					Parent = Workspace.Terrain,
					[Children] = {
						smoke = New("ParticleEmitter")({
							Enabled = false,
							Color = ColorSequence.new({ ColorSequenceKeypoint.new(0, Color3.fromRGB(10, 74, 54)), ColorSequenceKeypoint.new(1, Color3.fromRGB(18, 97, 71)) }),
							Lifetime = NumberRange.new(0.65, 0.85),
							Rate = 40,
							RotSpeed = NumberRange.new(-180, 180),
							Rotation = NumberRange.new(-360, 360),
							ShapeStyle = Enum.ParticleEmitterShapeStyle.Surface,
							Size = NumberSequence.new({ NumberSequenceKeypoint.new(0, 1.35, 0), NumberSequenceKeypoint.new(1, 0.8, 2.7) }),
							Speed = NumberRange.new(7.5, 15),
							SpreadAngle = Vector2.new(-360, 360),
							Texture = "rbxassetid://8120749500",
							Transparency = NumberSequence.new({ NumberSequenceKeypoint.new(0, 0.8130000000000001, 0), NumberSequenceKeypoint.new(0.5, 0.82, 0), NumberSequenceKeypoint.new(1, 1, 0) }),
							ZOffset = -2,
							[Ref] = smoke,
						}),
						outline = New("ParticleEmitter")({
							Enabled = false,
							Color = ColorSequence.new({ ColorSequenceKeypoint.new(0, Color3.fromRGB(8, 69, 41)), ColorSequenceKeypoint.new(1, Color3.fromRGB(0, 59, 46)) }),
							Lifetime = NumberRange.new(0.35000000000000003, 0.75),
							Rate = 50,
							Rotation = NumberRange.new(-360, 360),
							Size = NumberSequence.new({ NumberSequenceKeypoint.new(0, 2.5, 0), NumberSequenceKeypoint.new(1, 6.406, 8.594) }),
							Speed = NumberRange.new(0, 0),
							Texture = "rbxassetid://8133065785",
							Transparency = NumberSequence.new({ NumberSequenceKeypoint.new(0, 0.34400000000000003, 0), NumberSequenceKeypoint.new(1, 1, 0) }),
							ZOffset = -1,
							[Ref] = outline,
						}),
					},
				})
				smoke:get():Emit()
				outline:get():Emit()
				local highlight = Instance.new("Highlight")
				highlight.FillColor = Color3.fromRGB(0, 95, 68)
				highlight.FillTransparency = 0.15
				highlight.OutlineTransparency = 0
				highlight.OutlineColor = Color3.fromRGB(0, 100, 93)
				highlight.Parent = target
				task.delay(2.5, function()
					orig:Destroy()
				end)
			end)
			task.delay(1.5, function()
				splineNode("c", cf, {
					[1] = {
						Position = Vector3.new(0, -13, 1),
					},
					[2] = {
						Position = Vector3.new(-0.5, -12.5, 0),
					},
					[3] = {
						Position = Vector3.new(-1.5, -12, 0.5),
					},
					[4] = {
						Position = Vector3.new(-1.75, -11, 1.75),
					},
					[5] = {
						Position = Vector3.new(-1, -10.5, 3),
					},
					[6] = {
						Position = Vector3.new(1, -10, 2.7),
					},
					[7] = {
						Position = Vector3.new(1.5, -10, 1.5),
					},
					[8] = {
						Position = Vector3.new(0, -10.5, 0.5),
					},
					[9] = {
						Position = Vector3.new(-2, -10, 1),
					},
					[10] = {
						Position = Vector3.new(-3, -9, 2.5),
					},
					[11] = {
						Position = Vector3.new(-2, -8.5, 4.5),
					},
					[12] = {
						Position = Vector3.new(1, -8.5, 3),
					},
					[13] = {
						Position = Vector3.new(1.5, -10, 1),
					},
					[14] = {
						Position = Vector3.new(0, -10, 1),
					},
					[15] = {
						Position = Vector3.new(0, -9, 1.5),
					},
				}, temp, DebugMode.TrailOnly)
			end)
		end)
	end)
	return temp
end
return {
	death = death,
}
