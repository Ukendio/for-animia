import { World } from "@rbxts/matter";
import { Option, Vec } from "@rbxts/rust-classes";
import {
	Collision,
	CombatStats,
	DamageArea,
	Effect,
	ImpactEffect,
	Renderable,
	Shape,
	Target,
	Transform,
	WantsMelee,
} from "shared/components";
import { EffectType } from "client/effects_db";

export function melee_hits(world: World): void {
	for (const [id, { model }, combat_stats] of world.query(Renderable, CombatStats, WantsMelee, Target)) {
		const root = model.FindFirstChild("HumanoidRootPart") as Part;

		if (!root) continue;

		const direction = root.CFrame.LookVector.Z + 2;

		world.spawn(
			DamageArea({
				shape: Shape.Box,
			}),
			Collision({ size: new Vector3(5, 5, 0), blacklist: [model] }),
			Transform({ cf: model.GetPivot().add(new Vector3(0, 0, direction)) }),
			ImpactEffect({
				effects: [
					Effect({
						creator: Option.some(id),
						effect_type: EffectType.Damage,
						effect_payload: { damage: combat_stats.damage },
						target: Option.none(),
						pos: Option.none(),
					}),
				],
			}),
		);
	}
}
