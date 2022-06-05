import { World } from "@rbxts/matter";
import { Transform, Renderable } from "shared/components";
import { remove_missing_models } from "./remove_missing_models";

function update_transforms(world: World): void {
	for (const [id, transform_record] of world.queryChanged(Transform)) {
		const renderable = world.get(id, Renderable);

		if (!renderable) continue;

		if (!renderable.model.PrimaryPart) {
			continue;
		}

		if (transform_record.new && !transform_record.new.do_not_reconcile) {
			renderable.model.SetPrimaryPartCFrame(transform_record.new.cf);
		}
	}

	for (const [id, model_record, transform] of world.queryChanged(Renderable)) {
		const transform = world.get(id, Transform);

		if (!transform) continue;

		if (model_record.new) {
			model_record.new.model.SetPrimaryPartCFrame(transform.cf);
		}
	}
}

export = { system: update_transforms, after: [remove_missing_models] };
