import { None, useEvent, World } from "@rbxts/matter";
import { Option } from "@rbxts/rust-classes";
import { Players, UserInputService } from "@rbxts/services";
import { Agency, Controls } from "client/main.client";
import {
	Collision,
	CombatStats,
	Effect,
	ImpactEffect,
	Mastery,
	Renderable,
	Shape,
	Soul,
	Target,
	Transform,
} from "shared/components";
import { EffectVariant } from "shared/effects";
import { souls_db } from "shared/souls_db";
import { use_anim } from "shared/hooks/use_anim";

// animation id 9006471997

const plr = Players.LocalPlayer;

const animation = new Instance("Animation");
animation.AnimationId = "rbxassetid://9006471997";

// Yeah, the rule would probably be any time you're going to make a "singleton component" where the component is only ever on one entity in the entire world... Putting that state in the state table solves the same problem in a much simpler way.

export function detriot_smash(world: World, controls: Controls, agency: Agency): void {
	for (let [, renderable, combat_stats, mastery, soul] of world.query(
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

					const direction = root.CFrame.LookVector.Unit.mul(2);
					const deku_detroit_smash_info = souls_db.Deku.abilities["Detroit Smash"];
					const base_damage = deku_detroit_smash_info.base_damage.i(mastery.lvl);

					const cf = model.GetPivot().add(direction);

					world.spawn(
						Transform({ cf }),
						Collision({ size: new Vector3(5, 5, 0), blacklist: [model], shape: Shape.Box }),
						ImpactEffect({
							effects: [
								Effect({
									creator: Option.some(plr),
									variant: EffectVariant.Damage(combat_stats.damage + base_damage),
									target: Option.none(),
									pos: Option.none(),
								}),
								Effect({
									creator: Option.some(plr),
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
