-- Compiled with roblox-ts v1.3.3
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local New = TS.import(script, TS.getModule(script, "@rbxts", "fusion").src).New
local function snowflakes(colour, size)
	return New("ParticleEmitter")({
		Enabled = false,
		Color = colour,
		Size = size,
		Brightness = 4,
		Texture = "rbxassetid://8216841057",
		Transparency = NumberSequence.new(0),
		ZOffset = 2,
		Lifetime = NumberRange.new(0.85, 1.2),
		Rotation = NumberRange.new(-360, 360),
		RotSpeed = NumberRange.new(200, 400),
		Speed = NumberRange.new(30, 60),
		SpreadAngle = Vector2.new(-360, 360),
		Drag = 8.5,
	})
end
return {
	snowflakes = snowflakes,
}
