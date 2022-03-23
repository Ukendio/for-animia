import { useDeltaTime, World } from "@rbxts/matter";
import { Projectile, Transform, Velocity } from "shared/components";

export function projectiles_fly(world: World): void {
	for (let [id, projectile, transform, { speed }] of world.query(Projectile, Transform, Velocity)) {
		const vel_offset = speed * useDeltaTime();
		transform = transform.patch({
			cf: transform.cf.add(projectile.goal.sub(transform.cf.Position).Unit.mul(vel_offset)),
		});

		if (transform.cf.Position.sub(projectile.goal).Magnitude <= vel_offset) {
			world.despawn(id);
		} else world.insert(id, transform);
	}
}
