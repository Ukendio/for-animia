import { New } from "@rbxts/fusion";

export function smoke(colour: ColorSequence, size: NumberSequence): ParticleEmitter {
	return New("ParticleEmitter")({
		Enabled: false,
		Brightness: 4,
		Size: size,
		Color: colour,
		ZOffset: 2,
		Texture: "rbxassetid://8120749500",
		Transparency: new NumberSequence([new NumberSequenceKeypoint(0, 0.962), new NumberSequenceKeypoint(1, 1)]),
		Lifetime: new NumberRange(0.75, 1),
		Rotation: new NumberRange(-360, 360),
		RotSpeed: new NumberRange(-90),
		Speed: new NumberRange(5, 10),
		SpreadAngle: new Vector2(-360, 360),
		Drag: 2.5,
	});
}
