import { World } from "@rbxts/matter";
import { Agency, Mob, Renderable } from "shared/components";

function mobsMove(world: World): void {
	const targets = new Array<Vector3>();

	for (const [id, { model }] of world.query(Renderable, Agency)) {
		targets.push(model.GetPivot().Position);
	}

	for (const [id, mob] of world.query(Mob, Renderable)) {
		let [closestPosition, closestDistance] = [undefined! as Vector3, undefined! as number];
	}
}

export = mobsMove;
