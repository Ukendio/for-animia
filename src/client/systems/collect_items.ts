import { World } from "@rbxts/matter";
import { InBackpack, Target, WantsPickUp } from "shared/components";

export function collect_items(world: World): void {
	for (const [id, pickup] of world.query(WantsPickUp, Target)) {
		if (pickup.collected_by === id) {
			world.insert(pickup.item, InBackpack({ owner: pickup.collected_by, slot: Enum.KeyCode.Z }));
		}
	}
}
