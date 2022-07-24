import { useEvent, World } from "@rbxts/matter";
import { Renderable } from "shared/components";

function removingMissingModels(world: World): void {
	for (const [id, { model }] of world.query(Renderable)) {
		for (const [_] of useEvent(model, "AncestryChanged")) {
			if (model.IsDescendantOf(game) === false) {
				world.remove(id);
				break;
			}
		}

		if (!model.PrimaryPart) {
			world.remove(id, Renderable);
		}
	}

	for (const [_, modelRecord] of world.queryChanged(Renderable)) {
		if (modelRecord.new === undefined) {
			if (modelRecord.old && modelRecord.old.model) {
				modelRecord.old.model.Destroy();
			}
		}
	}
}

export = removingMissingModels;
