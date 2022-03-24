-- Compiled with roblox-ts v1.3.3
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local New = TS.import(script, TS.getModule(script, "@rbxts", "fusion").src).New
local function explosion_1(size)
	return New("ParticleEmitter")({
		Enabled = false,
		Texture = "rbxassetid://9158605657",
		FlipbookLayout = Enum.ParticleFlipbookLayout.EightByEight,
		FlipbookMode = Enum.ParticleFlipbookMode.OneShot,
		Speed = NumberRange.new(0),
		Size = size,
		Lifetime = NumberRange.new(0.5),
	})
end
local function explosion_2()
	return New("ParticleEmitter")({
		Enabled = false,
		Texture = "rbxassetid://9158606988",
		FlipbookLayout = Enum.ParticleFlipbookLayout.EightByEight,
		FlipbookMode = Enum.ParticleFlipbookMode.OneShot,
		Speed = NumberRange.new(0),
		Size = NumberSequence.new(6, 8),
		Lifetime = NumberRange.new(2),
	})
end
local function explosion_3()
	return New("ParticleEmitter")({
		Enabled = false,
		Texture = "rbxassetid://9158608325",
		FlipbookLayout = Enum.ParticleFlipbookLayout.EightByEight,
		FlipbookMode = Enum.ParticleFlipbookMode.OneShot,
		Speed = NumberRange.new(0),
		Size = NumberSequence.new(1),
		Lifetime = NumberRange.new(2),
	})
end
local function explosion_4()
	return New("ParticleEmitter")({
		Enabled = false,
		Texture = "rbxassetid://9158609215",
		FlipbookLayout = Enum.ParticleFlipbookLayout.EightByEight,
		FlipbookMode = Enum.ParticleFlipbookMode.OneShot,
		Speed = NumberRange.new(0),
		Size = NumberSequence.new(0.8, 1),
		Lifetime = NumberRange.new(0.4),
		LightEmission = 0.5,
		LightInfluence = 1,
	})
end
return {
	explosion_1 = explosion_1,
	explosion_2 = explosion_2,
	explosion_3 = explosion_3,
	explosion_4 = explosion_4,
}
