import { World } from "@rbxts/matter";
import { Float, Renderable } from "shared/components";

export function objects_float(world: World): void {
	for (let [id, float, { model }] of world.query(Float, Renderable)) {
		if (!float.cached) {
			const body_force = new Instance("BodyForce");
			body_force.Force = float.force;
			body_force.Parent = model.FindFirstChild("HumanoidRootPart");

			world.insert(id, float.patch({ cached: true }));
		}
	}

	for (let [, float_record, { model }] of world.queryChanged(Float, Renderable)) {
		if (float_record.new !== undefined) {
			if (float_record.new.force !== float_record.old.force && float_record.new.cached) {
				const root = model.FindFirstChild("HumanoidRootPart");

				if (!root) continue;

				const body_force = root.FindFirstChild("BodyForce") as BodyForce;
				body_force.Force = float_record.new.force;
			}
		} else {
			const root = model.FindFirstChild("HumanoidRootPart");

			if (!root) continue;

			const body_force = root.FindFirstChild("BodyForce");

			body_force?.Destroy();
		}
	}
}
