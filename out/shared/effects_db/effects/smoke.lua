-- Compiled with roblox-ts v1.3.3
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local New = TS.import(script, TS.getModule(script, "@rbxts", "fusion").src).New
local function smoke(colour, size)
	return New("ParticleEmitter")({
		Enabled = false,
		Brightness = 4,
		Size = size,
		Color = colour,
		ZOffset = 2,
		Texture = "rbxassetid://8120749500",
		Transparency = NumberSequence.new({ NumberSequenceKeypoint.new(0, 0.962), NumberSequenceKeypoint.new(1, 1) }),
		Lifetime = NumberRange.new(0.75, 1),
		Rotation = NumberRange.new(-360, 360),
		RotSpeed = NumberRange.new(-90),
		Speed = NumberRange.new(5, 10),
		SpreadAngle = Vector2.new(-360, 360),
		Drag = 2.5,
	})
end
return {
	smoke = smoke,
}
