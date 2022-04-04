import { AnyEntity, World } from "@rbxts/matter";
import { Option } from "@rbxts/rust-classes";
import { Workspace } from "@rbxts/services";
import { Collision, DamageArea, ImpactEffect, Projectile, Renderable, Shape, Soul, Transform } from "shared/components";

const overlap_params = new OverlapParams();
overlap_params.FilterType = Enum.RaycastFilterType.Blacklist;

const raycast_params = new RaycastParams();
raycast_params.FilterType = Enum.RaycastFilterType.Blacklist;

function get_parts_in_shape(shape: Shape, size: Vector3, cf: CFrame): Array<Instance> {
	if (shape === Shape.Box) {
		return Workspace.GetPartBoundsInBox(cf, size, overlap_params);
	} else if (shape === Shape.Radius) return Workspace.GetPartBoundsInRadius(cf.Position, size.X, overlap_params);
	else if (shape === Shape.Cylinder) {
		const cylinder = new Instance("Part");
		cylinder.Shape = Enum.PartType.Cylinder;
		cylinder.Rotation = new Vector3(cf.Rotation.X, cf.Rotation.Y, cf.Rotation.Z);
		cylinder.Anchored = true;
		cylinder.Transparency = 1;
		cylinder.Parent = Workspace;
		cylinder.Size = size;

		const parts = Workspace.GetPartsInPart(cylinder, overlap_params);

		cylinder.Destroy();

		return parts;
	} else if (shape === Shape.Sphere) {
		const sphere = new Instance("Part");
		sphere.Shape = Enum.PartType.Ball;
		sphere.Anchored = true;
		sphere.Transparency = 1;
		sphere.Parent = Workspace;
		sphere.Size = size;

		const parts = Workspace.GetPartsInPart(sphere, overlap_params);

		sphere.Destroy();

		return parts;
	} else error("Non-valid shape");
}

export function things_collide(world: World): void {
	for (const [id, damage_area, { cf }, collision, on_hit] of world.query(
		DamageArea,
		Transform,
		Collision,
		ImpactEffect,
	)) {
		let collided = false;

		if (!collision.collided) {
			overlap_params.FilterDescendantsInstances = collision.blacklist;

			for (const instance of get_parts_in_shape(damage_area.shape, collision.size, cf)) {
				collided = true;
				const instance_model = instance.Parent;

				if (instance_model && instance_model.FindFirstChildOfClass("Humanoid")) {
					const id = instance_model.GetAttribute("entity_id") as AnyEntity;

					if (id !== undefined) {
						const [renderable, soul] = world.get(id, Renderable, Soul);

						if (!renderable || !soul) continue;

						on_hit.effects.forEach((fx) => world.insert(id, fx.patch({ target: Option.some(id) })));
					}
				}
			}

			world.insert(id, collision.patch({ collided }));
		}
	}

	for (const [id, projectile, { cf }, collision, on_hit, { model }] of world.query(
		Projectile,
		Transform,
		Collision,
		ImpactEffect,
		Renderable,
	)) {
		let collided = false;
		if (!collision.collided) {
			overlap_params.FilterDescendantsInstances = collision.blacklist;

			const part = model.FindFirstChildOfClass("Part");

			if (part) {
				for (let i = -45; i < 45; i + 45) {
					const raycast_result = Workspace.Raycast(
						cf.Position,
						new Vector3(0, 1, 0).Cross(projectile.goal.Unit.mul(collision.size.Z / 2 + 1)),
						raycast_params,
					);
				}

				for (const instance of Workspace.GetPartsInPart(part, overlap_params)) {
					collided = true;
					const instance_model = instance.Parent;

					if (instance_model && instance_model.FindFirstChildOfClass("Humanoid")) {
						const id = instance_model.GetAttribute("entity_id") as AnyEntity;

						if (id !== undefined) {
							const [renderable, soul] = world.get(id, Renderable, Soul);

							if (!renderable || !soul) continue;

							on_hit.effects.forEach((fx) => world.spawn(fx.patch({ target: Option.some(id) })));

							continue;
						}
					} else on_hit.effects.forEach((fx) => world.spawn(fx.patch({ pos: Option.some(cf.Position) })));
				}
			}

			world.insert(id, collision.patch({ collided }));
		} else world.despawn(id);
	}
}
