import { useDeltaTime, World } from "@rbxts/matter";
import { Item, Spinning, Transform } from "shared/components";

export function items_spin_when_focused(world: World): void {
	for (const [id, , transform] of world.query(Item, Transform, Spinning)) {
		world.insert(id, transform.patch({ cf: transform.cf.mul(CFrame.fromEulerAnglesXYZ(0, useDeltaTime(), 0)) }));
	}
}
