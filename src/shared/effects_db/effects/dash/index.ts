import { AnyEntity, World } from "@rbxts/matter";
import { Renderable, Velocity } from "shared/components";

export function dash(world: World, id: AnyEntity, pos: Vector3): void {
	const renderable = world.get(id, Renderable);

	if (renderable) {
		world.insert(id);
	}
}
