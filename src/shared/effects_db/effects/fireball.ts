import { Children, New } from "@rbxts/fusion";
import { AnyEntity, World } from "@rbxts/matter";
import { Option } from "@rbxts/rust-classes";
import { Workspace } from "@rbxts/services";
import {
	Projectile,
	Transform,
	Renderable,
	Collision,
	ImpactEffect,
	Lifetime,
	Velocity,
	Effect,
} from "shared/components";
import { EffectType } from "..";

export function fireball(world: World, creator: Option<AnyEntity>, cf: CFrame, goal: Vector3): AnyEntity {
	const part = New("Part")({
		Color: Color3.fromRGB(252, 115, 36),
		Shape: Enum.PartType.Ball,
		Size: Vector3.one.mul(5),
	});

	const model = New("Model")({
		[Children]: [part],
		PrimaryPart: part,
		Parent: Workspace,
	});

	model.PivotTo(cf);

	return world.spawn(
		ImpactEffect({
			effects: [
				Effect({
					creator: creator.asPtr(),
					effect_type: EffectType.Damage,
					effect_payload: { damage: 50 },
				}),
				Effect({
					creator: creator.asPtr(),
					effect_type: EffectType.Explosion,
					effect_payload: { size: new NumberSequence(48, 52) },
				}),
			],
		}),
		Velocity({ speed: 100 }),
		Renderable({ model }),
		Transform({ cf }),
		Projectile({ goal }),
		Lifetime({ remaining_time: 5 }),
		Collision({ blacklist: [model], size: model.GetBoundingBox()[1] }),
	);
}
