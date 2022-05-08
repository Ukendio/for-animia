import { Children, New } from "@rbxts/fusion";
import { AnyEntity, World } from "@rbxts/matter";
import { Option } from "@rbxts/rust-classes";
import {
	Projectile,
	Transform,
	Renderable,
	Collision,
	ImpactEffect,
	Lifetime,
	Velocity,
	Effect,
	Shape,
} from "shared/components";
import host_effect from "shared/host_effect";
import { EffectVariant } from "..";

export function fireball(world: World, creator: Option<Player>, cf: CFrame, goal: Vector3): AnyEntity {
	const part = New("Part")({
		Color: Color3.fromRGB(252, 115, 36),
		Shape: Enum.PartType.Ball,
		Size: Vector3.one.mul(5),
		CanCollide: false,
		CanTouch: true,
	});

	const model = New("Model")({
		[Children]: [part],
		PrimaryPart: part,
		Parent: host_effect,
	});

	model.PivotTo(cf);

	return world.spawn(
		ImpactEffect({
			effects: [
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
		Collision({
			blacklist: [
				model,
				creator.match(
					(plr) => plr.Character!,
					() => undefined! as Model,
				),
			],
			size: model.GetBoundingBox()[1],
			shape: Shape.Sphere,
		}),
	);
}
