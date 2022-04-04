-- Compiled with roblox-ts v1.3.3
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local New = TS.import(script, TS.getModule(script, "@rbxts", "fusion").src).New
local function shards(colour, size)
	return New("ParticleEmitter")({
		Enabled = false,
		Color = colour,
		Size = size,
		Orientation = Enum.ParticleOrientation.VelocityParallel,
		ZOffset = 2,
		Texture = "rbxassetid://80307348511",
		Lifetime = NumberRange.new(0.375, 0.475),
		Rotation = NumberRange.new(90),
		Speed = NumberRange.new(60, 90),
		SpreadAngle = Vector2.new(-360, 360),
		Drag = 15,
	})
end
return {
	shards = shards,
}
