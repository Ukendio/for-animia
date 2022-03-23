import { useEvent, World } from "@rbxts/matter";
import { Vec } from "@rbxts/rust-classes";
import { Mass, Renderable, Target } from "shared/components";

export function apply_mass(world: World): void {
	for (const [, mass_record, { model }] of world.queryChanged(Mass, Renderable, Target)) {
		if (mass_record.new) {
			for (const v of Vec.fromPtr(model.GetDescendants()).generator()) {
				if (v.IsA("BasePart")) {
					const { density, friction, elasticity } = mass_record.new;
					v.CustomPhysicalProperties = new PhysicalProperties(density, friction, elasticity);
				}
			}
		}
	}
}
