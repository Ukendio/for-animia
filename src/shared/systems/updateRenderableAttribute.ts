import { World } from "@rbxts/matter";
import { RunService } from "@rbxts/services";
import { Renderable } from "shared/components";

const name = RunService.IsServer() ? "serverEntityId" : "clientEntityId";

function updateRenderableAttribute(world: World): void {
	for (const [id, record] of world.queryChanged(Renderable)) {
		if (record.new) {
			record.new.model.SetAttribute(name, id);
		}
	}
}

export = updateRenderableAttribute;
