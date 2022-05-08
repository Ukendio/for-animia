import { useDeltaTime, World } from "@rbxts/matter";
import { Projectile, Transform, Velocity } from "shared/components";

export function projectiles_fly(world: World): void {
	for (let [id, projectile, transform, { speed }] of world.query(Projectile, Transform, Velocity)) {
		const vel_offset = speed * useDeltaTime();

		const distance = projectile.goal.sub(transform.cf.Position);
		const unit_direction = distance.Unit;
		const velocity = unit_direction.mul(vel_offset);

		const cf = transform.cf.add(velocity);

		transform = transform.patch({ cf });

		if (transform.cf.Position.sub(projectile.goal).Magnitude <= vel_offset) {
			world.despawn(id);
		} else world.insert(id, transform);
	}
}
