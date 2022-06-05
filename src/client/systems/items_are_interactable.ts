import { useEvent, World } from "@rbxts/matter";
import { Agency } from "client/agency";
import { Controls } from "client/controls";

import { Target, Renderable, CombatStats, Item, WantsPickUp, Prompt } from "shared/components";

export function items_are_interactable(world: World, _: Controls, agency: Agency): void {
	for (const [item_entity, { prompt }] of world.query(Prompt, Item, Renderable)) {
		for (const [] of useEvent(prompt, "Triggered")) {
		}
	}
}
