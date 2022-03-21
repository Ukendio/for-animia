import { World } from "@rbxts/matter";
import { Vec } from "@rbxts/rust-classes";
import { Renderable, Target, Mob, WantsMelee } from "shared/components";

export function mobs_move(world: World): void {
	const targets = Vec.vec<Vector3>();

	for (const [_, { model }] of world.query(Renderable, Target)) {
		targets.push(model.GetPivot().Position);
	}

	for (const [id, , render] of world.query(Mob, Renderable)) {
		let closest_position = undefined! as Vector3;
		let closest_distance = undefined! as number;

		const model = render.model as Dummy;

		const current_position = model.GetPivot().Position;

		targets.iter().forEach((target) => {
			const distance = current_position.sub(target).Magnitude;

			if (!closest_position || distance < closest_distance) {
				closest_position = target;
				closest_distance = distance;
			}
		});

		if (closest_position) {
			model.Humanoid.MoveTo(closest_position);

			if (closest_position.sub(current_position).Magnitude < 4) {
				if (world.get(id, WantsMelee)) {
					continue;
				}

				world.insert(id, WantsMelee());
			}
		}
	}
}
