import { useEvent, World } from "@rbxts/matter";
import { UserInputService } from "@rbxts/services";
import { Controls } from "client/controls";
import { Agency, CombatStats, Mob, Renderable, Soul, Target, UseAbility } from "shared/components";

export function use_abilities(world: World, controls: Controls, agency: Agency): void {
	/*
	for (const [id] of world.query(Soul, Renderable, CombatStats)) {
		if (agency.id === id) {
			for (const [, { KeyCode }] of useEvent(UserInputService, "InputBegan")) {
				if (
					KeyCode === controls.use_ability_1 ||
					KeyCode === controls.use_ability_2 ||
					KeyCode === controls.use_ability_3 ||
					KeyCode === controls.use_ability_4
				) {
					world.insert(id, UseAbility({ key_code: KeyCode }));
				}
			}
		}
	}
	*/
}
