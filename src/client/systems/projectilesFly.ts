import { useDeltaTime, World } from "@rbxts/matter";
import { Projectile, Transform, Velocity } from "shared/components";

function projectilesFly(world: World): void {
	for (let [id, transform, vel, projectile] of world.query(Transform, Velocity, Projectile)) {
		const velOffset = vel.speed * useDeltaTime();

		const unitDirection = projectile.direction;
		const velocity = unitDirection.mul(velOffset);

		const cf = transform.cf.add(velocity);

		transform = transform.patch({ cf });

		world.insert(id, transform);
	}
}

export = {
	event: "fixed",
	system: projectilesFly,
};
