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
import { EffectVariant } from "shared/effects_db";

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
					creator,
					variant: EffectVariant.Damage(10),
					target: Option.none(),
					pos: Option.none(),
				}),
				Effect({
					creator,
					variant: EffectVariant.Explosion(new NumberSequence(48, 52)),
					target: Option.none(),
					pos: Option.none(),
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
