import { New } from "@rbxts/fusion";

export function spark(colour: ColorSequence, size: NumberSequence): ParticleEmitter {
	return New("ParticleEmitter")({
		Enabled: false,
		Brightness: 4,
		Color: colour,
		ZOffset: 2.5,
		Size: size,
		Texture: "rbxassetid://8189326437",
		Lifetime: new NumberRange(0.15),
		Rotation: new NumberRange(-360, 360),
		Drag: 3.5,
	});
}
