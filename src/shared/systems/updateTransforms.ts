import { World } from "@rbxts/matter";
import { RunService } from "@rbxts/services";
import { getModules } from "@rbxts/testez/src/TestBootstrap";
import { Renderable, Transform } from "shared/components";

function updateTransforms(world: World): void {
	for (const [id, transformRecord] of world.queryChanged(Transform)) {
		if (!world.contains(id)) continue;

		const renderable = world.get(id, Renderable);

		if (!renderable) continue;

		if (transformRecord.new && !transformRecord.new.doNotReconcile) {
			renderable.model.PivotTo(transformRecord.new.cf);
		}
	}

	for (const [id, renderableRecord] of world.queryChanged(Renderable)) {
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

	for (const [id, { model }, { cf }] of world.query(Renderable, Transform)) {
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

export = {
	event: RunService.IsClient() ? "fixed" : "default",
	system: updateTransforms,
};
