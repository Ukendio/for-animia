import { useDeltaTime, useThrottle, World } from "@rbxts/matter";
import { Mob, Renderable, Transform } from "shared/components";

const RNG = new Random();
function mobsMove(world: World): void {
	for (const [id, transform, mob] of world.query(Transform, Mob, Renderable)) {
		if (useThrottle(RNG.NextInteger(4, 5), id)) {
			const targetPosition = transform.cf.add(
				new Vector3(math.random(-16, 16), 0, math.random(-16, 16)),
			).Position;

			world.insert(
				id,
				mob.patch({
					targetPosition,
				}),
			);
		}
	}

	for (const [id, mob, transform] of world.query(Mob, Transform, Renderable)) {
		const targetPosition = mob.targetPosition;

		if (transform && targetPosition) {
			const cf = new CFrame(transform.cf.Position, targetPosition).mul(
				new CFrame(new Vector3(0, 0, -16 * useDeltaTime())),
			);

			if (targetPosition.sub(cf.Position).Magnitude < 0.5) {
				continue;
			}

			world.insert(id, transform.patch({ cf, doNotReconcile: false }));
		}
	}
}

export = mobsMove;
