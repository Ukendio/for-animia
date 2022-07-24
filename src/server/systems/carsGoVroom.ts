import { World, DebugWidgets } from "@rbxts/matter";
import { ClientState } from "client/game.client";
import { Charge, Renderable, Target } from "shared/components";

function carsGoVroom(world: World, _: ClientState, ui: DebugWidgets): void {
	return;

	if (ui.checkbox("Disable Physical movers").checked() === true) {
		for (const [, renderable] of world.query(Renderable, Charge)) {
			const model = renderable.model.PrimaryPart! as Part & { VectorForce: VectorForce; Torque: Torque };
			model.VectorForce.Enabled = false;
			model.Torque.Enabled = false;
		}

		return;
	}

	const targets = new Array<Vector3>();
	for (const [, { model }] of world.query(Renderable, Target)) {
		targets.push(model.GetPivot().Position);
	}

	for (let [, { charge }, { model }] of world.query(Charge, Renderable)) {
		if (charge <= 0) continue;

		let [closestPosition, closestDistance] = [undefined! as Vector3, undefined! as number];
		let currentPosition = model.GetPivot().Position;

		for (const target of targets) {
			const distance = currentPosition.sub(target).Magnitude;
			if (!closestPosition || distance < closestDistance) [closestPosition, closestDistance] = [target, distance];
		}

		if (closestPosition) {
			const body = model.PrimaryPart! as Part & { VectorForce: VectorForce; Torque: Torque };
			let force = body.GetMass() * 20;

			if (closestDistance < 4) force = 0;

			const lookVector = body.CFrame.LookVector;
			const desiredLookVector = closestPosition.sub(currentPosition).Unit;

			force = force * lookVector.Dot(desiredLookVector);
			body.VectorForce.Force = new Vector3(force, 0, 0);

			const absoluteAngle = math.atan2(desiredLookVector.Z, desiredLookVector.X);
			const carAngle = math.atan2(lookVector.Z, lookVector.X);

			let angle = math.deg(absoluteAngle - carAngle);

			angle = angle % 360;
			angle = (angle + 360) % 360;

			if (angle > 180) angle -= 360;

			const angularVelocity = body.AssemblyAngularVelocity;

			const sign = math.sign(angle);
			const motor = math.sqrt(math.abs(angle)) * sign * -1 * 20;
			const friction = angularVelocity.Y * -12;
			const torque = body.GetMass() * (motor + friction);

			body.Torque.Torque = new Vector3(0, torque, 0);

			body.VectorForce.Enabled = true;
			body.Torque.Enabled = true;
		}
	}
}

export = carsGoVroom;
