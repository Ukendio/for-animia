import { World } from "@rbxts/matter";
import { Mass, Renderable, Target } from "shared/components";

export function frictionless_grapplers(world: World): void {
	for (const [id] of world.query(Renderable, Target).without(Mass)) {
		const density = 0.3;
		const friction = 0;
		const elasticity = 0;

		world.insert(id, Mass({ density, friction, elasticity }));
	}
}
