import { useThrottle, World } from "@rbxts/matter";
import { Renderable } from "shared/components";

export function track_world(world: World): void {
	for (const [id] of world.query(Renderable)) {
		if (useThrottle(5, id)) {
		}
	}
}
