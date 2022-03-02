import { World } from "@rbxts/matter";
import { Renderable, Tracker } from "shared/components";

export function remove_missing_trackers(world: World): void {
	for (const [id, tracker_record] of world.queryChanged(Tracker, Renderable)) {
		if (tracker_record.new === undefined) {
			world.despawn(id);
		}
	}
}
