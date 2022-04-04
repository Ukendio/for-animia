import { New } from "@rbxts/fusion";
import { Entity, InferComponents, World } from "@rbxts/matter";
import { Option, Vec } from "@rbxts/rust-classes";
import { Renderable, Lifetime, Transform } from "shared/components";
import { compose_effects } from "shared/effects_db/emitter";

export function explosion(
	world: World,
	pos: Option<Vector3>,
	size: NumberSequence,
): Entity<InferComponents<[typeof Renderable, typeof Lifetime, typeof Transform]>> {
	const model = compose_effects(Vec.fromPtr([explosion_1(size)])).once(1);

	return world.spawn(
		Renderable({ model }),
		Lifetime({ remaining_time: 2 }),
		Transform({ cf: new CFrame(pos.unwrapOr(new Vector3(0, -9000, 0))) }),
	);
}

function explosion_1(size: NumberSequence): ParticleEmitter {
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

function explosion_2(): ParticleEmitter {
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

function explosion_3(): ParticleEmitter {
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

function explosion_4(): ParticleEmitter {
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
