import { World } from "@rbxts/matter";
import { CharacterRigR15 } from "@rbxts/promise-character";
import { Option, Vec } from "@rbxts/rust-classes";
import { Workspace } from "@rbxts/services";
import { CombatStats, Punch, Renderable, WantsMelee } from "shared/components";

const overlap_params = new OverlapParams();
overlap_params.FilterType = Enum.RaycastFilterType.Blacklist;


const HANDS = ["LeftHand", "RightHand"] as const;

export function punches_hurt(world: World): void {
    for (const [, renderable, combat_stats] of world.query(Renderable, CombatStats, Punch)) {
        const character = renderable.model as CharacterRigR15

			overlap_params.FilterDescendantsInstances = [character];

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

};
