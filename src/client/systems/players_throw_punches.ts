import { AnyEntity, Entity, useEvent, useThrottle, World } from "@rbxts/matter";
import { CharacterRigR15 } from "@rbxts/promise-character";
import { Option, Vec } from "@rbxts/rust-classes";
import { UserInputService, Workspace } from "@rbxts/services";
import { ClientData } from "client/main.client";
import { Target, Renderable, CombatStats, WantsMelee } from "shared/components";

const overlap_params = new OverlapParams();
overlap_params.FilterType = Enum.RaycastFilterType.Blacklist;

const HANDS = ["LeftHand", "RightHand"] as const;

export function players_throw_punches(world: World, state: ClientData): void {
	if (useThrottle(3)) {
		for (const [, , renderable, combat_stats] of world.query(Target, Renderable, CombatStats)) {
			const character = renderable.model as CharacterRigR15;
			overlap_params.FilterDescendantsInstances = [character];

			for (const [_, { UserInputType }] of useEvent(UserInputService, "InputBegan")) {
				if (UserInputType === state.m1) {
					for (let i = 0; i < 2; i++) {
						const hand_cf = character[HANDS[i]].CFrame;

						const targets = Vec.fromPtr(Workspace.GetPartBoundsInBox(hand_cf, Vector3.one.mul(2)))
							.iter()
							.filterMap((item) => Option.wrap(item.Parent?.FindFirstChild("Humanoid") ?? item.Parent!))
							.collect();

						targets.iter().forEach((model) => {
							for (const [id, renderable] of world.query(Renderable)) {
								if (renderable.model && renderable.model === model) {
									world.insert(id, WantsMelee({ damage: combat_stats.damage }));
								}
							}
						});
					}
				}
			}
		}
	}
}
