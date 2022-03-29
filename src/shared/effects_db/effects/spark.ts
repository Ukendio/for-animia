import { New } from "@rbxts/fusion";

export function spark(colour: ColorSequence, size: NumberSequence, texture: string): ParticleEmitter {
	return New("ParticleEmitter")({
		Enabled: false,
		Brightness: 4,
		Color: colour,
		ZOffset: 2.5,
		Size: size,
		Texture: texture,
		Lifetime: new NumberRange(0.15),
		Rotation: new NumberRange(-360, 360),
		Drag: 3.5,
	});
}
