import { World } from "@rbxts/matter";
import { RunService } from "@rbxts/services";
import { Body, Renderable, Transform } from "shared/components";

const MODEL_COMPONENTS = [Renderable, Body] as const;

function updateTransforms(world: World): void {
	for (const [id, transformRecord] of world.queryChanged(Transform)) {
		if (!world.contains(id)) continue;
		if (transformRecord.new && !transformRecord.new.doNotReconcile) {
			const model = world.get(id, Renderable) ?? world.get(id, Body);

			if (model) {
				model.model.PivotTo(transformRecord.new.cf);
			}
		}
	}

	for (const Model of MODEL_COMPONENTS) {
		for (const [id, renderableRecord] of world.queryChanged(Model)) {
			if (!world.contains(id)) {
				continue;
			}

			const transform = world.get(id, Transform);

			if (!transform) {
				continue;
			}

			if (renderableRecord.new) {
				renderableRecord.new.model.PivotTo(transform.cf);
			}
		}

		for (const [id, { model }, { cf }] of world.query(Model, Transform)) {
			if (model.PrimaryPart?.Anchored) {
				continue;
			}

			const existingCF = cf;
			const currentCF = model.GetPivot();

			if (currentCF.Y < -400) {
				world.despawn(id);
				continue;
			}

			if (currentCF !== existingCF) {
				world.insert(id, Transform({ cf: currentCF, doNotReconcile: true }));
			}
		}
	}
}

export = {
	event: RunService.IsClient() ? "fixed" : "default",
	system: updateTransforms,
};
