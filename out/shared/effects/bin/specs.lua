-- Compiled with roblox-ts v1.3.3
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local New = TS.import(script, TS.getModule(script, "@rbxts", "fusion").src).New
local function specs(colour, size)
	return New("ParticleEmitter")({
		Enabled = false,
		Color = colour,
		Size = size,
		Texture = "rbxassetid://8030760338",
		ZOffset = 2,
		Brightness = 4,
		Lifetime = NumberRange.new(0.55, 0.85),
		Speed = NumberRange.new(10, 20),
		SpreadAngle = Vector2.new(-120, 120),
		Acceleration = Vector3.new(0, -20, 0),
		Drag = 3.5,
	})
end
return {
	specs = specs,
}
