import { World } from "@rbxts/matter";
import { Option } from "@rbxts/rust-classes";
import { Workspace } from "@rbxts/services";
import { Collision, ImpactEffect, Projectile, Renderable, Transform } from "shared/components";

const overlap_params = new OverlapParams();
overlap_params.FilterType = Enum.RaycastFilterType.Blacklist;

const raycast_params = new RaycastParams();
raycast_params.FilterType = Enum.RaycastFilterType.Blacklist;

export function things_collide(world: World): void {
	for (const [id, projectile, { cf }, collision, on_hit, { model }] of world.query(
		Projectile,
		Transform,
		Collision,
		ImpactEffect,
		Renderable,
	)) {
		overlap_params.FilterDescendantsInstances = collision.blacklist;

		let collided = false;
		if (!collision.collided) {
			const part = model.FindFirstChildOfClass("Part");

			const payload = identity<{ target: Option<Model>; pos: Option<Vector3> }>({
				target: Option.none(),
				pos: Option.none(),
			});

			if (!part) continue;

			for (const instance of Workspace.GetPartsInPart(part, overlap_params)) {
				const instance_model = instance.Parent as Model;

				if (instance_model && instance_model.FindFirstChildOfClass("Humanoid")) {
					if (collision.blacklist.find((a) => a === instance_model)) continue;

					payload.target = Option.some(instance_model);
				}

				payload.pos = Option.some(cf.Position);

				collided = true;
			}

			if (collided) {
				on_hit.effects.forEach((fx) => {
					world.spawn(fx.patch(payload));
				});
				world.insert(id, collision.patch({ collided }));
			}
		} else world.despawn(id);
	}
}
