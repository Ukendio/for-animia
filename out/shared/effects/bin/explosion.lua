-- Compiled with roblox-ts v1.3.3
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local New = TS.import(script, TS.getModule(script, "@rbxts", "fusion").src).New
local _rust_classes = TS.import(script, TS.getModule(script, "@rbxts", "rust-classes").out)
local Option = _rust_classes.Option
local Vec = _rust_classes.Vec
local _components = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "components")
local Renderable = _components.Renderable
local Lifetime = _components.Lifetime
local Collision = _components.Collision
local Transform = _components.Transform
local DamageArea = _components.DamageArea
local ImpactEffect = _components.ImpactEffect
local Effect = _components.Effect
local EffectVariant = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "effects").EffectVariant
local compose_effects = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "effects", "emitter").compose_effects
local explosion_1
local function explosion(world, creator, pos, size)
	local position = pos:unwrapOr(Vector3.new(0, -9999, 0))
	local model = compose_effects(Vec:fromPtr({ explosion_1(size) }), position).once(1)
	return world:spawn(Renderable({
		model = model,
	}), Lifetime({
		remaining_time = 10,
	}), Collision(), Transform({
		cf = CFrame.new(position),
	}), DamageArea(), ImpactEffect({
		effects = { Effect({
			creator = creator,
			variant = EffectVariant.Damage(10),
			target = Option:none(),
			pos = Option:none(),
		}) },
	}))
end
function explosion_1(size)
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
	explosion = explosion,
}
