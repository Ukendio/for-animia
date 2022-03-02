import { World } from "@rbxts/matter";
import { Mob, Renderable, HasColoured } from "shared/components";

const colour_schemes: { [index: number]: number } = {
	[1]: 155,
};

export function mobs_have_colour(world: World): void {
	for (const [id, mob, { model }] of world.query(Mob, Renderable).without(HasColoured)) {
		if (mob.id !== undefined) {
			model.GetChildren().forEach((a) => {
				if (a.IsA("BasePart")) {
					const colour = colour_schemes[mob.id];
					a.BrickColor = new BrickColor(0, 0, colour_schemes[mob.id]);
					world.insert(id, HasColoured());
				}
			});
		}
	}
}
