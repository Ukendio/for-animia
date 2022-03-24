import { New } from "@rbxts/fusion";

export function gradient(colour: ColorSequence, size: NumberSequence): ParticleEmitter {
	return New("ParticleEmitter")({
		Enabled: false,
		Brightness: 4,
		Color: colour,
		Size: size,
		Texture: "rbxassetid://8030746658",
		Transparency: new NumberSequence([new NumberSequenceKeypoint(0, 0.837), new NumberSequenceKeypoint(1, 1)]),
		Lifetime: new NumberRange(0.35),
		Speed: new NumberRange(0),
		Drag: 0,
	});
}
