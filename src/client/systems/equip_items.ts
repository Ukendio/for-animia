import { New } from "@rbxts/fusion";
import { useEvent, World } from "@rbxts/matter";
import { match } from "@rbxts/rbxts-pattern";
import { UserInputService } from "@rbxts/services";
import { ClientData } from "client/main.client";
import { Equipped, InBackpack, Item, Renderable } from "shared/components";

export function equip_items(world: World, state: ClientData): void {
	for (const [, { KeyCode }] of useEvent(UserInputService, "InputBegan")) {
		match(KeyCode.Value)
			.with(state.equip_weapon_1.Value, state.equip_weapon_2.Value, state.equip_weapon_3.Value, (n) => {
				const key = n + 48; // we have to add 48 because the enum value for numbers start at 48

				for (const [item_id, { model }, backpack] of world
					.query(Renderable, InBackpack, Item)
					.without(Equipped)) {
					if (backpack.slot === key) {
						const character = world.get(backpack.owner, Renderable);
						model.Parent = character.model;

						world.insert(item_id, Equipped());
					}
				}
			})
			.run();
	}
}
