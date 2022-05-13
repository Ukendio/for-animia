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
	Mob,
	Renderable,
	Shape,
	Soul,
	Target,
	Transform,
	UseAbility,
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
	for (let [_, renderable, combat_stats, mastery, soul, use_ability] of world.query(
		Renderable,
		CombatStats,
		Mastery,
		Soul,
		UseAbility,
	)) {
		if (soul.name !== "Deku" || use_ability.key_code !== controls.use_ability_1) continue;

		const model = renderable.model;
		const root = model.FindFirstChild("HumanoidRootPart") as Part;
		const animator = model.FindFirstChildOfClass("Humanoid")?.FindFirstChildOfClass("Animator");

		const deku_detroit_smash_info = souls_db.Deku.abilities["Detroit Smash"];
		const base_damage = deku_detroit_smash_info.base_damage.i(mastery.lvl);

		let creator = Option.none<Player>();

		const direction = root.CFrame.LookVector.Unit.mul(2);

		const cf = model.GetPivot().add(direction);

		if (!root || !animator) continue;

		use_anim(animator, animation);

		world.spawn(
			Transform({ cf }),
			Collision({ size: new Vector3(5, 5, 0), blacklist: [model], shape: Shape.Box }),
			ImpactEffect({
				effects: [
					Effect({
						creator,
						variant: EffectVariant.Damage(combat_stats.damage + base_damage),
						target: Option.none(),
						pos: Option.none(),
					}),
					Effect({
						creator,
						variant: EffectVariant.KnockBack(new Vector3(0, 0, 200)),
						target: Option.none(),
						pos: Option.none(),
					}),
				],
			}),
		);
	}
}
