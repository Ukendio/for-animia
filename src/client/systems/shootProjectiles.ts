import { log, useDeltaTime, useEvent, World } from "@rbxts/matter";
import { Widgets } from "@rbxts/plasma";
import { Players, UserInputService, Workspace } from "@rbxts/services";
import { ClientState } from "client/game.client";
import {
	Collision,
	Effect,
	ImpactEffect,
	Lifetime,
	Projectile,
	Renderable,
	Transform,
	Velocity,
} from "shared/components";

const player = Players.LocalPlayer;
const mouse = player.GetMouse();

const raycastParams = new RaycastParams();
const overlapParams = new OverlapParams();

function shootProjectiles(world: World, state: ClientState, ui: Widgets): void {
	for (const [, { KeyCode }, gameProcessedEvent] of useEvent(UserInputService, "InputBegan")) {
		if (gameProcessedEvent) continue;

		if (KeyCode === Enum.KeyCode.F) {
			const part = new Instance("Part");
			part.Anchored = true;
			part.CanCollide = false;

			const model = new Instance("Model");
			model.Parent = Workspace;
			model.PrimaryPart = part;

			const cf = new CFrame(state.character.GetPivot().Position, mouse.Hit.Position);
			part.CFrame = cf;

			part.Parent = model;

			world.spawn(
				Projectile({ direction: mouse.Hit.Position.sub(cf.Position).Unit, filter: [player.Character!] }),
				Renderable({ model }),
				Transform({ cf }),
				Velocity({ speed: 50 }),
				Collision({ size: model.PrimaryPart.Size }),
				Lifetime({ spawnedAt: os.clock(), length: 5 }),
			);
		}
	}

	for (const [id, projectile, collision, transform, { speed }, { model }] of world.query(
		Projectile,
		Collision,
		Transform,
		Velocity,
		Renderable,
	)) {
		const impactEffect = world.get(id, ImpactEffect);

		const payload: { target?: Model; pos?: Vector3 } = {};

		if (collision.size.X >= 4 || collision.size.Y >= 4 || collision.size.Z >= 4) {
			overlapParams.FilterDescendantsInstances = [state.character, model];

			const result = Workspace.GetPartBoundsInBox(transform.cf, collision.size, overlapParams);

			if (next(result)[0] !== undefined) {
				const seenModels = new Set<Model>();

				for (const part of result as Array<Part>) {
					const instanceModel = part.FindFirstAncestorOfClass("Model");

					if (instanceModel?.FindFirstChild("Humanoid") && !seenModels.has(instanceModel)) {
						payload.target = instanceModel;
						seenModels.add(instanceModel);
					}
				}

				payload.pos = transform.cf.Position;
			}
		} else {
			raycastParams.FilterDescendantsInstances = [state.character, model];

			const velOffset = speed * useDeltaTime() + collision.size.Z;

			const unitDirection = projectile.direction;
			const velocity = unitDirection.mul(velOffset);

			const result = Workspace.Raycast(transform.cf.Position, transform.cf.add(velocity).Position, raycastParams);

			if (result && result.Position && result.Instance) {
				const payload: { target?: Model; pos: Vector3 } = { pos: result.Position };
				const instanceModel = result.Instance.FindFirstAncestorOfClass("Model");

				if (instanceModel?.FindFirstChild("Humanoid")) {
					payload.target = instanceModel;
				}
			}
		}

		if (impactEffect) {
			for (const effect of impactEffect.effects) {
				world.spawn(effect.patch(payload));
			}
		}

		if (payload.pos) {
			world.despawn(id);
		}
	}
}

export = {
	event: "fixed",
	system: shootProjectiles,
};
