import { World } from "@rbxts/matter";
import { Option, Vec } from "@rbxts/rust-classes";
import { Players } from "@rbxts/services";
import {
	Collision,
	CombatStats,
	Effect,
	ImpactEffect,
	Renderable,
	Shape,
	Target,
	Transform,
	WantsMelee,
} from "shared/components";
import { EffectVariant } from "shared/effects";

export function melee_hits(world: World): void {
	for (const [, { model }, combat_stats] of world.query(Renderable, CombatStats, WantsMelee, Target)) {
		const root = model.FindFirstChild("HumanoidRootPart") as Part;

		if (!root) continue;

		const direction = root.CFrame.LookVector.Z + 2;

		world.spawn(
			Collision({ size: new Vector3(5, 5, 0), blacklist: [model], shape: Shape.Box }),
			Transform({ cf: model.GetPivot().add(new Vector3(0, 0, direction)) }),
			ImpactEffect({
				effects: [
					Effect({
						creator: Option.some(Players.LocalPlayer),
						variant: EffectVariant.Damage(combat_stats.damage),
						target: Option.none(),
						pos: Option.none(),
					}),
				],
			}),
		);
	}
}
