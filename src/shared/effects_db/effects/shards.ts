import { New } from "@rbxts/fusion";

export function shards(colour: ColorSequence, size: NumberSequence): ParticleEmitter {
	return New("ParticleEmitter")({
		Enabled: false,
		Color: colour,
		Size: size,
		Orientation: Enum.ParticleOrientation.VelocityParallel,
		ZOffset: 2,
		Texture: "rbxassetid://80307348511",
		Lifetime: new NumberRange(0.375, 0.475),
		Rotation: new NumberRange(90),
		Speed: new NumberRange(60, 90),
		SpreadAngle: new Vector2(-360, 360),
		Drag: 15,
	});
}
