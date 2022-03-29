import { useEvent, World } from "@rbxts/matter";

import { Target, Renderable, CombatStats, Item, WantsPickUp, Prompt } from "shared/components";

export function items_are_interactable(world: World): void {
	for (const [player_entity] of world.query(Target, Renderable, CombatStats)) {
		for (const [item_entity, { prompt }] of world.query(Prompt, Item, Renderable)) {
			for (const _ of useEvent(prompt, "Triggered")) {
				world.insert(player_entity, WantsPickUp({ collected_by: player_entity, item: item_entity }));
			}
		}
	}
}
