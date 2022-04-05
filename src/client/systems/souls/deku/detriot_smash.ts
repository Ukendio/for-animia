import { AnyEntity, useEvent, World } from "@rbxts/matter";
import { Option, Vec } from "@rbxts/rust-classes";
import { UserInputService } from "@rbxts/services";
import { Controls } from "client/main.client";
import {
	Collision,
	CombatStats,
	DamageArea,
	Effect,
	ImpactEffect,
	KnockBack,
	Mastery,
	Renderable,
	Shape,
	Soul,
	Target,
	Transform,
} from "shared/components";
import { EffectVariant } from "shared/effects_db";
import { souls_db } from "shared/souls_db";
import { use_anim } from "shared/hooks/use_anim";

// animation id 9006471997

const animation = new Instance("Animation");
animation.AnimationId = "rbxassetid://9006471997";

export function detriot_smash(world: World, controls: Controls): void {
	for (let [id, renderable, combat_stats, mastery, soul] of world.query(
		Renderable,
		CombatStats,
		Mastery,
		Soul,
		Target,
	)) {
		if (soul.name === "Deku") {
			for (const [, { KeyCode }] of useEvent(UserInputService, "InputBegan")) {
				if (KeyCode === controls.use_ability_1) {
					const model = renderable.model;
					const root = model.FindFirstChild("HumanoidRootPart") as Part;
					const animator = model.FindFirstChildOfClass("Humanoid")?.FindFirstChildOfClass("Animator");

					if (!root || !animator) continue;

					if (renderable.in_anim === undefined) renderable = renderable.patch({ in_anim: false });

					use_anim(animator, animation, !renderable.in_anim);

					const direction = root.CFrame.LookVector.Z + 2;
					const deku_detroit_smash_info = souls_db.Deku.abilities["Detroit Smash"];
					const base_damage = deku_detroit_smash_info.base_damage.i(mastery.lvl);

					const cf = model.GetPivot().add(new Vector3(0, 0, direction));

					world.spawn(
						DamageArea({ shape: Shape.Box }),
						Transform({ cf }),
						Collision({ size: new Vector3(5, 5, 0), blacklist: [model] }),
						ImpactEffect({
							effects: [
								Effect({
									creator: Option.some(id),
									variant: EffectVariant.Damage(combat_stats.damage + base_damage),
									target: Option.none(),
									pos: Option.none(),
								}),
								Effect({
									creator: Option.some(id),
									variant: EffectVariant.KnockBack(new Vector3(0, 0, 200)),
									target: Option.none(),
									pos: Option.none(),
								}),
							],
						}),
					);
				}
			}
		}
	}
}
