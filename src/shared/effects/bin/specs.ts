import { New } from "@rbxts/fusion";

export function specs(colour: ColorSequence, size: NumberSequence): ParticleEmitter {
	return New("ParticleEmitter")({
		Enabled: false,
		Color: colour,
		Size: size,
		Texture: "rbxassetid://8030760338",
		ZOffset: 2,
		Brightness: 4,
		Lifetime: new NumberRange(0.55, 0.85),
		Speed: new NumberRange(10, 20),
		SpreadAngle: new Vector2(-120, 120),
		Acceleration: new Vector3(0, -20, 0),
		Drag: 3.5,
	});
}
