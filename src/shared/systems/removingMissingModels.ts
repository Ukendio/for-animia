import { useEvent, World } from "@rbxts/matter";
<<<<<<< HEAD
import { RunService } from "@rbxts/services";
=======
>>>>>>> 88d084f2bdeb776ac73f69a0f1481b4cfe8c8b1a
import { DebugAdornment, Renderable } from "shared/components";

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

	for (const [, modelRecord] of world.queryChanged(Renderable)) {
		if (modelRecord.new === undefined) {
			if (modelRecord.old && modelRecord.old.model) {
				modelRecord.old.model.Destroy();
			}
		}
	}
}

export = {
<<<<<<< HEAD
	event: RunService.IsClient() ? "fixed" : "default",
=======
	event: "fixed",
>>>>>>> 88d084f2bdeb776ac73f69a0f1481b4cfe8c8b1a
	system: removingMissingModels,
};
