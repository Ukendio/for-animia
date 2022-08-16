import { useDeltaTime, World } from "@rbxts/matter";
<<<<<<< HEAD
import { Projectile, Transform, Velocity } from "shared/components";

function projectilesFly(world: World): void {
=======
import { Widgets } from "@rbxts/plasma";
import { ClientState } from "client/game.client";
import { Projectile, Transform, Velocity } from "shared/components";

function projectilesFly(world: World, _: ClientState, ui: Widgets): void {
>>>>>>> 88d084f2bdeb776ac73f69a0f1481b4cfe8c8b1a
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
