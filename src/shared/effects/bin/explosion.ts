import { New } from "@rbxts/fusion";
import { AnyEntity, World } from "@rbxts/matter";
import { Option, Vec } from "@rbxts/rust-classes";
import { Renderable, Lifetime, Collision, Transform, DamageArea, ImpactEffect, Effect } from "shared/components";
import { EffectVariant } from "..";
import { compose_effects } from "../emitter";

export function explosion(
	world: World,
	creator: Option<Player>,
	pos: Option<Vector3>,
	size: NumberSequence,
): AnyEntity {
	const position = pos.unwrapOr(new Vector3(0, -9999, 0));
	const model = compose_effects(Vec.fromPtr([explosion_1(size)]), position).once(1);

	return world.spawn(
		Renderable({ model }),
		Lifetime({ remaining_time: 10 }),
		Collision(),
		Transform({ cf: new CFrame(position) }),
		DamageArea(),
		ImpactEffect({
			effects: [
				Effect({ creator, variant: EffectVariant.Damage(10), target: Option.none(), pos: Option.none() }),
			],
		}),
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
