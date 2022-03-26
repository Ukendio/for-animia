import { New } from "@rbxts/fusion";

export function explosion_1(size: NumberSequence): ParticleEmitter {
	return New("ParticleEmitter")({
		Enabled: false,
		Texture: "rbxassetid://9158605657",
		FlipbookLayout: Enum.ParticleFlipbookLayout.EightByEight,
		FlipbookMode: Enum.ParticleFlipbookMode.OneShot,
		Speed: new NumberRange(0),
		Size: size,
		Lifetime: new NumberRange(0.5),
	});
}

export function explosion_2(): ParticleEmitter {
	return New("ParticleEmitter")({
		Enabled: false,
		Texture: "rbxassetid://9158606988",
		FlipbookLayout: Enum.ParticleFlipbookLayout.EightByEight,
		FlipbookMode: Enum.ParticleFlipbookMode.OneShot,
		Speed: new NumberRange(0),
		Size: new NumberSequence(6, 8),
		Lifetime: new NumberRange(2),
	});
}

export function explosion_3(): ParticleEmitter {
	return New("ParticleEmitter")({
		Enabled: false,
		Texture: "rbxassetid://9158608325",
		FlipbookLayout: Enum.ParticleFlipbookLayout.EightByEight,
		FlipbookMode: Enum.ParticleFlipbookMode.OneShot,
		Speed: new NumberRange(0),
		Size: new NumberSequence(1),
		Lifetime: new NumberRange(2),
	});
}

export function explosion_4(): ParticleEmitter {
	return New("ParticleEmitter")({
		Enabled: false,
		Texture: "rbxassetid://9158609215",
		FlipbookLayout: Enum.ParticleFlipbookLayout.EightByEight,
		FlipbookMode: Enum.ParticleFlipbookMode.OneShot,
		Speed: new NumberRange(0),
		Size: new NumberSequence(0.8, 1),
		Lifetime: new NumberRange(0.4),
		LightEmission: 0.5,
		LightInfluence: 1,
	});
}
