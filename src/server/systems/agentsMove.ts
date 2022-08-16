import { useDeltaTime, useThrottle, World } from "@rbxts/matter";
import { Agent, Renderable, Transform } from "shared/components";

const RNG = new Random();
function agentsMove(world: World): void {
	for (const [id, transform, agent] of world.query(Transform, Agent, Renderable)) {
		if (useThrottle(RNG.NextInteger(4, 5), id)) {
			const targetPosition = transform.cf.add(
				new Vector3(math.random(-16, 16), 0, math.random(-16, 16)),
			).Position;

			world.insert(
				id,
				agent.patch({
					targetPosition,
				}),
			);
		}
	}

	for (const [id, agent, transform] of world.query(Agent, Transform, Renderable)) {
		const targetPosition = agent.targetPosition;

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

export = agentsMove;
