<<<<<<< HEAD
-- Compiled with roblox-ts v1.3.3-dev-230088d
=======
-- Compiled with roblox-ts v1.3.3-dev-d657049
>>>>>>> 88d084f2bdeb776ac73f69a0f1481b4cfe8c8b1a
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local New = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "fusion", "src").New
local function dust(texture, colour)
	local _fn = New("ParticleEmitter")
	local _object = {
		Brightness = 1.5,
		Color = colour or ColorSequence.new(Color3.fromRGB(191, 184, 148)),
		LightEmission = 0,
		LightInfluence = 0,
		Orientation = Enum.ParticleOrientation.FacingCamera,
		Size = NumberSequence.new({ NumberSequenceKeypoint.new(0, 2), NumberSequenceKeypoint.new(1, 4, 2) }),
	}
	local _left = "Texture"
	local _condition = texture
	if _condition == nil then
		_condition = "rbxassetid://9232117588"
	end
	_object[_left] = _condition
	_object.Transparency = NumberSequence.new({ NumberSequenceKeypoint.new(0, 1), NumberSequenceKeypoint.new(0.2, 0.95), NumberSequenceKeypoint.new(1, 1) })
	_object.Lifetime = NumberRange.new(0.75, 0.8)
	_object.Rate = 15
	_object.RotSpeed = NumberRange.new(-90, 90)
	_object.SpreadAngle = Vector2.new(5, 15)
	_object.Shape = Enum.ParticleEmitterShape.Box
	_object.ShapeInOut = Enum.ParticleEmitterShapeInOut.Outward
	_object.ShapeStyle = Enum.ParticleEmitterShapeStyle.Volume
	_object.Drag = 3
	_object.TimeScale = 1
	_object.VelocityInheritance = 0
	return _fn(_object)
end
return {
	dust = dust,
}
