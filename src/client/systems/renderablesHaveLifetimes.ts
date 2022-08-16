import { World } from "@rbxts/matter";
import { Lifetime, Renderable } from "shared/components";

function renderablesHaveLifetimes(world: World): void {
	for (const [id, { spawnedAt, length }] of world.query(Lifetime, Renderable)) {
		if (os.clock() - spawnedAt >= length) {
			world.despawn(id);
		}
	}
}

export = {
	event: "fixed",
	system: renderablesHaveLifetimes,
};
