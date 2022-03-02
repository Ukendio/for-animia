import { useDeltaTime, World } from "@rbxts/matter";
import { Workspace } from "@rbxts/services";
import { quad_beizer } from "shared/beizer";
import { Tracker, Projectile, Rotation, Transform, Renderable } from "shared/components";
import remotes from "shared/remotes";
import update_transforms from "shared/systems/update_transforms";

const replicate_fx = remotes.Server.Create("ReplicateFX");

const raycast_params = new RaycastParams();
raycast_params.FilterType = Enum.RaycastFilterType.Blacklist;

function tracker_moves(world: World): void {
	for (let [id, { model }, transform, projectile, { angle }] of world.query(
		Renderable,
		Transform,
		Projectile,
		Rotation,
		Tracker,
	)) {
		if (!model.PrimaryPart) continue;

		if (!projectile.caster_model || projectile.remaining_time === undefined) continue;

		if (!projectile.origin) {
			projectile = projectile.patch({ origin: transform.cf });
		}

		projectile = projectile.patch({ remaining_time: projectile.remaining_time! - useDeltaTime() });

		const start = projectile.origin!;
		const goal = projectile.goal;
		const desired_look_vector = start!.Position.sub(goal.Position).Unit;
		const mid_point = start.Lerp(goal, 0.5).mul(angle).Position;

		const elapsed = 1 - projectile.remaining_time!;

		const curve = quad_beizer(elapsed, start.Position, mid_point, goal.Position);

		raycast_params.FilterDescendantsInstances = [model, Workspace.Effects, projectile.caster_model!];

		const raycast_result = Workspace.Raycast(start.Position, desired_look_vector.mul(5), raycast_params);

		if (raycast_result) {
			replicate_fx.SendToAllPlayers("IceHit", goal);

			world.remove(id, Tracker);
			continue;
		}

		if (projectile.remaining_time! <= 0) {
			replicate_fx.SendToAllPlayers("IceHit", goal);

			world.insert(id, transform.patch({ cf: new CFrame(curve) }), projectile);
			world.remove(id, Tracker);
		} else {
			world.insert(id, transform.patch({ cf: new CFrame(curve) }), projectile);
		}
	}
}

export = {
	system: tracker_moves,
	after: [update_transforms],
};
