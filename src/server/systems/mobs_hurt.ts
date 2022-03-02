import { useEvent, useThrottle, World } from "@rbxts/matter";
import { CharacterRigR15 } from "@rbxts/promise-character";
import { Option } from "@rbxts/rust-classes";
import { Players, Workspace } from "@rbxts/services";
import { Mob, Renderable, WantsMelee } from "shared/components";

const punch_anim = new Instance("Animation");
punch_anim.AnimationId = "rbxassetid://8793260223";

const hands = ["RightHand", "LeftHand"] as const;

export function mobs_hurt(world: World): void {
	for (const [id, , { model }, wants_melee] of world.query(Mob, Renderable, WantsMelee)) {
		for (let i = 0; i < 2; i++) {
			for (const [, hit] of useEvent((<CharacterRigR15>model)[hands[i]], "Touched")) {
				if (Players.GetPlayerFromCharacter(hit.Parent)) {
					hit.Parent?.FindFirstChildOfClass("Humanoid")?.TakeDamage(wants_melee.damage);
				}
			}
		}

		const damage = wants_melee.patch({ remaining_time: wants_melee.remaining_time! - 3 });

		if (damage.remaining_time === 0) {
			world.remove(id, WantsMelee);
		}
	}
}
