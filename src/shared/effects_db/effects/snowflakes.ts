import { New } from "@rbxts/fusion";

export function snowflakes(colour: ColorSequence, size: NumberSequence): ParticleEmitter {
	return New("ParticleEmitter")({
		Enabled: false,
		Color: colour,
		Size: size,
		Brightness: 4,
		Texture: "rbxassetid://8216841057",
		Transparency: new NumberSequence(0),
		ZOffset: 2,
		Lifetime: new NumberRange(0.85, 1.2),
		Rotation: new NumberRange(-360, 360),
		RotSpeed: new NumberRange(200, 400),
		Speed: new NumberRange(30, 60),
		SpreadAngle: new Vector2(-360, 360),
		Drag: 8.5,
	});
}
