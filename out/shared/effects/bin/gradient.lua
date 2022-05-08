-- Compiled with roblox-ts v1.3.3
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local New = TS.import(script, TS.getModule(script, "@rbxts", "fusion").src).New
local function gradient(colour, size)
	return New("ParticleEmitter")({
		Enabled = false,
		Brightness = 4,
		Color = colour,
		Size = size,
		Texture = "rbxassetid://8030746658",
		Transparency = NumberSequence.new({ NumberSequenceKeypoint.new(0, 0.837), NumberSequenceKeypoint.new(1, 1) }),
		Lifetime = NumberRange.new(0.35),
		Speed = NumberRange.new(0),
		Drag = 0,
	})
end
return {
	gradient = gradient,
}
