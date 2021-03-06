import { World } from "@rbxts/matter";
import { Controls } from "client/controls";
import { Steer, Renderable } from "shared/components";

export function objects_rotate(world: World, state: Controls): void {
	for (let [id, steer, { model }] of world.query(Steer, Renderable)) {
		const root = model.FindFirstChild("HumanoidRootPart") as Part;

		if (!steer.cached) {
			const body_gyro = new Instance("BodyGyro");
			body_gyro.CFrame = new CFrame(root.Position, steer.direction);
			body_gyro.MaxTorque = Vector3.one.mul(1e3);
			body_gyro.P = 1e5;
			body_gyro.Parent = root;

			world.insert(id, steer.patch({ cached: true }));
		} else {
			const body_gyro = root.FindFirstChild("BodyGyro") as BodyGyro;
			body_gyro.CFrame = new CFrame(root.Position, steer.direction);
		}
	}

	for (let [id, steer_record] of world.queryChanged(Steer)) {
		const renderable = world.get(id, Renderable);

		if (!renderable) continue;

		if (steer_record.new !== undefined) {
			if (steer_record.new.direction !== steer_record.old?.direction && steer_record.new.cached) {
				const root = renderable.model.FindFirstChild("HumanoidRootPart") as Part;

				if (!root) continue;

				const body_gyro = root.FindFirstChild("BodyGyro") as BodyGyro;
				body_gyro.CFrame = new CFrame(root.Position, steer_record.new.direction);
			}
		} else {
			const root = renderable.model.FindFirstChild("HumanoidRootPart");

			if (!root) continue;

			const body_gyro = root.FindFirstChild("BodyGyro");

			body_gyro?.Destroy();
		}
	}
}
