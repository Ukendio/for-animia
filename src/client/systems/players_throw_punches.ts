import { useEvent, useThrottle, World } from "@rbxts/matter";
import { UserInputService } from "@rbxts/services";
import { Controls } from "client/main.client";
import { Target, Renderable, CombatStats, KnockBack, Shape, Transform, Collision, WantsMelee } from "shared/components";
import { use_anim } from "shared/hooks/use_anim";

// animation id 9006471997

const animation = new Instance("Animation");
animation.AnimationId = "rbxassetid://9006471997";

export function players_throw_punches(world: World, state: Controls): void {
	if (useThrottle(3)) {
		for (const [id, renderable, combat_stats] of world.query(Renderable, CombatStats, Target)) {
			for (const [_, { UserInputType }] of useEvent(UserInputService, "InputBegan")) {
				if (UserInputType === state.m1) {
					const model = renderable.model;
					const animator = model.FindFirstChildOfClass("Humanoid")?.FindFirstChildOfClass("Animator");

					if (!animator) continue;

					if (renderable.in_anim === undefined) renderable.patch({ in_anim: false });

					use_anim(animator, animation, !renderable.in_anim);

					world.insert(id, WantsMelee());
				}
			}
		}
	}
}
