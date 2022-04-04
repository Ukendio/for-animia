-- Compiled with roblox-ts v1.3.3
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local New = TS.import(script, TS.getModule(script, "@rbxts", "fusion").src).New
local function spark(colour, size, texture)
	return New("ParticleEmitter")({
		Enabled = false,
		Brightness = 4,
		Color = colour,
		ZOffset = 2.5,
		Size = size,
		Texture = texture,
		Lifetime = NumberRange.new(0.15),
		Rotation = NumberRange.new(-360, 360),
		Drag = 3.5,
	})
end
return {
	spark = spark,
}
