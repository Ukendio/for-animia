import { World } from "@rbxts/matter";
import { Renderable, Velocity } from "shared/components";

export function objects_move(world: World): void {
	for (let [id, velocity, { model }] of world.query(Velocity, Renderable)) {
		if (!velocity.cached) {
			const body_velocity = new Instance("BodyVelocity");
			body_velocity.MaxForce = Vector3.one.mul(math.huge);
			body_velocity.Velocity = velocity.velocity;
			body_velocity.Name = `BodyVelocity@${id}`;
			body_velocity.Parent = model.FindFirstChild("HumanoidRootPart");

			world.insert(id, velocity.patch({ cached: true }));
		}
	}

	for (let [id, velocity_record, { model }] of world.queryChanged(Velocity, Renderable)) {
		if (velocity_record.new !== undefined) {
			if (velocity_record.new.velocity !== velocity_record.old.velocity && velocity_record.new.cached) {
				const root = model.FindFirstChild("HumanoidRootPart");

				if (!root) continue;

				const body_velocity = root.FindFirstChild(`BodyVelocity@${id}`) as BodyVelocity;
				body_velocity.Velocity = velocity_record.new.velocity;
			}
		} else {
			const root = model.FindFirstChild("HumanoidRootPart");

			if (!root) continue;

			const velocity = root.FindFirstChild(`BodyVelocity@${id}`);

			velocity?.Destroy();
		}
	}
}
