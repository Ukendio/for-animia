import { useDeltaTime, World } from "@rbxts/matter";
import { Lifetime } from "shared/components";

function lifetimesDie(world: World): void {
	for (let [id, lifetime] of world.query(Lifetime)) {
		lifetime = lifetime.patch({ elapsed: lifetime.elapsed + useDeltaTime() });

		if (os.clock() > lifetime.spawnedAt + lifetime.length) {
			world.despawn(id);
		} else world.insert(id, lifetime);
	}
}

export = lifetimesDie;
