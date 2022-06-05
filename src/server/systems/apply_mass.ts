import { World } from "@rbxts/matter";
import { Agency, Mass, Renderable } from "shared/components";

export function apply_mass(world: World): void {
	for (const [id, mass_record] of world.queryChanged(Mass)) {
		const [renderable, mass] = world.get(id, Renderable, Agency); // LuaTuple<[Component<{model: Model} | undefined, Component<Player> | undefined>]>

		if (renderable === undefined || mass === undefined) continue;

		if (mass_record.new) {
			for (const v of renderable.model.GetDescendants() as Array<BasePart>) {
				if (v.IsA("BasePart")) {
					const { density, friction, elasticity } = mass_record.new;
					v.CustomPhysicalProperties = new PhysicalProperties(density, friction, elasticity);
				}
			}
		}
	}
}
