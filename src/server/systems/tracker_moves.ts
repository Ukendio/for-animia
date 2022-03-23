import { useDeltaTime, World } from "@rbxts/matter";
import { Option } from "@rbxts/rust-classes";
import { Workspace } from "@rbxts/services";
import { quad_beizer } from "shared/beizer";
import { Tracker, Projectile, Rotation, Transform, Renderable, Lifetime, Collision, Velocity } from "shared/components";
import remotes from "shared/remotes";
import update_transforms from "shared/systems/update_transforms";

const replicate_fx = remotes.Server.Create("ReplicateFX");

const raycast_params = new RaycastParams();
raycast_params.FilterType = Enum.RaycastFilterType.Blacklist;

function tracker_moves(world: World): void {
	for (let [id, { model }, transform, projectile, lifetime, { angle }, collision, velocity] of world.query(
		Renderable,
		Transform,
		Projectile,
		Lifetime,
		Rotation,
		Collision,
		Velocity,
		Tracker,
	)) {
		if (!model.PrimaryPart) continue;

		const start = transform.cf;

		lifetime = lifetime.patch({ remaining_time: lifetime.remaining_time - useDeltaTime() });

		const goal = projectile.goal;
		const desired_look_vector = start.Position.sub(goal).Unit;
		const mid_point = start.Lerp(new CFrame(goal), 0.5).mul(angle).Position;

		const elapsed = 1 - lifetime.remaining_time!;

		const curve = quad_beizer(elapsed, start.Position, mid_point, goal);

		raycast_params.FilterDescendantsInstances = collision.blacklist;

		const raycast_result = Workspace.Raycast(start.Position, desired_look_vector.mul(5), raycast_params);

		if (raycast_result) {
			replicate_fx.SendToAllPlayers("IceHit", goal);

			world.remove(id, Tracker);
			continue;
		}

		if (lifetime.remaining_time <= 0) {
			replicate_fx.SendToAllPlayers("IceHit", goal);

			world.insert(id, transform.patch({ cf: new CFrame(curve) }));
			world.remove(id, Tracker);
		} else {
			world.insert(id, transform.patch({ cf: new CFrame(curve) }), lifetime);
		}
	}
}

export = {
	system: tracker_moves,
	after: [update_transforms],
};
