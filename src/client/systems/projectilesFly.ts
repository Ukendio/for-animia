import { useDeltaTime, World } from "@rbxts/matter";
import { Widgets } from "@rbxts/plasma";
import { ClientState } from "client/index.client";
import { Projectile, Transform, Velocity } from "shared/components";

function projectilesFly(world: World, _: ClientState, ui: Widgets): void {
	ui.heading("Projectile Velocity");
	ui.space(8);

	let speed = ui.slider(100);

	for (let [id, transform, vel, projectile] of world.query(Transform, Velocity, Projectile)) {
		const velOffset = vel.speed * speed * useDeltaTime();

		const unitDirection = projectile.direction;
		const velocity = unitDirection.mul(velOffset);

		const cf = transform.cf.add(velocity);

		transform = transform.patch({ cf });

		world.insert(id, transform);
	}
}

export = projectilesFly;
