import { useThrottle, World } from "@rbxts/matter";
import { Mob, Transform } from "shared/components";

export function spawn_mobs(world: World): void {
	if (useThrottle(10)) {
		const origin = Vector3.one.mul(5);
		const spawn_pos = origin.mul(
			new Vector3(math.random(1, 2) === 1 ? 1 : -1, 1, math.random(1, 2) === 1 ? 1 : -1),
		);

		world.spawn(Mob({ id: 1 }), Transform({ cf: new CFrame(spawn_pos) }));
	}
}
