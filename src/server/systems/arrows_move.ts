import { useDeltaTime, World } from "@rbxts/matter";
import { Arrow, Renderable } from "shared/components";

export function arrows_move(world: World): void {
	for (const [, arrow, { model }] of world.query(Arrow, Renderable)) {
		const current_position = model.GetPrimaryPartCFrame().Position;

		const look_vector = model.GetPrimaryPartCFrame().LookVector;
		const desired_look_vector = arrow.goal.sub(current_position).Unit;

		const cf = new CFrame(desired_look_vector.mul(useDeltaTime() * 80), look_vector);
		model.PivotTo(cf);
	}
}
