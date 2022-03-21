import { useDeltaTime, World } from "@rbxts/matter";
import { Effect, Lifetime, Renderable } from "shared/components";

export function effects_have_lifetimes(world: World): void {
	for (let [id, lifetime] of world.query(Lifetime, Effect, Renderable)) {
		lifetime = lifetime.patch({ remaining_time: lifetime.remaining_time - useDeltaTime() });

		if (lifetime.remaining_time <= 0) {
			world.despawn(id);
		}
	}
}
