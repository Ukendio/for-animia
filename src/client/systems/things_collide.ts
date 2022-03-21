import { World } from "@rbxts/matter";
import { match, __ } from "@rbxts/rbxts-pattern";
import { Option } from "@rbxts/rust-classes";
import { Workspace } from "@rbxts/services";
import { Collision, DamageArea, ImpactEffect, Renderable, Shape, Soul, Transform } from "shared/components";
import { compose_effects } from "shared/effects_db";

const overlap_params = new OverlapParams();
overlap_params.FilterType = Enum.RaycastFilterType.Blacklist;

function get_parts_in_shape(shape: Shape, size: Vector3, cf: CFrame): Array<Instance> {
	return match(shape)
		.with(Shape.Box, () => {
			return Workspace.GetPartBoundsInBox(cf, size, overlap_params);
		})
		.with(Shape.Radius, () => {
			return Workspace.GetPartBoundsInRadius(cf.Position, size.X, overlap_params);
		})
		.with(Shape.Cylinder, () => {
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
		})
		.with(Shape.Sphere, () => {
			const sphere = new Instance("Part");
			sphere.Shape = Enum.PartType.Ball;
			sphere.Anchored = true;
			sphere.Transparency = 1;
			sphere.Parent = Workspace;
			sphere.Size = size;

			const parts = Workspace.GetPartsInPart(sphere, overlap_params);

			sphere.Destroy();

			return parts;
		})
		.with(Shape.Disc, () => [])
		.with(__, () => error("not a valid shape"))
		.exhaustive();
}

export function things_collide(world: World): void {
	for (const [id, damage_area, { cf }, collision, on_hit] of world.query(
		DamageArea,
		Transform,
		Collision,
		ImpactEffect,
	)) {
		if (!collision.collided) {
			overlap_params.FilterDescendantsInstances = collision.blacklist;

			for (const instance of get_parts_in_shape(damage_area.shape, collision.size, cf)) {
				if (instance.Parent?.FindFirstChildOfClass("Humanoid")) {
					for (const [id, renderable] of world.query(Renderable, Soul)) {
						if (renderable.model === instance.Parent) {
							on_hit.effects
								.iter()
								.forEach((e) => world.insert(id, e.patch({ target: Option.some(id) })));
						}
					}
				}
			}

			world.insert(id, collision.patch({ collided: true }));
		}
	}
}
