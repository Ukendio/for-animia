import { World } from "@rbxts/matter";
import { Transform, Renderable } from "shared/components";
import { remove_missing_models } from "./remove_missing_models";

function update_transforms(world: World): void {
	for (const [_, transform_record, { model }] of world.queryChanged(Transform, Renderable)) {
		if (!model.PrimaryPart) {
			continue;
		}

		if (transform_record.new && !transform_record.new.do_not_reconcile) {
			model.SetPrimaryPartCFrame(transform_record.new.cf);
		}
	}

	for (const [_, model_record, transform] of world.queryChanged(Renderable, Transform)) {
		if (model_record.new) {
			model_record.new.model.SetPrimaryPartCFrame(transform.cf);
		}
	}
}

export = { system: update_transforms, after: [remove_missing_models] };
