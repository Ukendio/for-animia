import { World } from "@rbxts/matter";
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
}

export = updateTransforms;
