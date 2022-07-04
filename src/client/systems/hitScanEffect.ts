import { useDeltaTime, World } from "@rbxts/matter";
import Plasma, { Widgets } from "@rbxts/plasma";
import { HttpService, Workspace } from "@rbxts/services";
import { ClientState } from "client/index.client";
import { Collision, Effect, ImpactEffect, Projectile, SplashDamage, Transform, Velocity } from "shared/components";
import { EffectVariant } from "shared/effects";

const raycastParams = new RaycastParams();
raycastParams.FilterType = Enum.RaycastFilterType.Blacklist;

const overlapParams = new OverlapParams();
overlapParams.FilterType = Enum.RaycastFilterType.Blacklist;

function hitScanEffect(world: World, state: ClientState, ui: Widgets): void {
	for (const [id, { direction, filter }, { cf }, collision, impactEffect, vel] of world.query(
		Projectile,
		Transform,
		Collision,
		ImpactEffect,
		Velocity,
	)) {
		raycastParams.FilterDescendantsInstances = filter;

		for (const i of $range(-1, 1, 1)) {
			let angle = CFrame.fromEulerAnglesXYZ(0, i * 45, 0);

			const targetPosition = new CFrame(
				cf.Position.add(direction.mul(collision.size.Z * 2)).mul(
					new Vector3(math.rad(i * 45), 1, math.rad(i * 45)),
				),
			).Position;

			const raycastResult = Workspace.Raycast(cf.Position, targetPosition, raycastParams);

			if (state.debugEnabled) {
				ui.portal(Workspace, () => {
					ui.arrow(
						cf.Position,
						//inlining it, because idk how to separate it
						new CFrame(cf.Position.add(direction.mul(collision.size.Z * 4))).mul(
							new Vector3(math.rad(i * 45), 1, math.rad(i * 45)),
						),
					);
				});
			}

			if (raycastResult && raycastResult.Instance) {
				const pos = raycastResult.Position;

				let target = undefined as Model | undefined;
				if (raycastResult.Instance.Parent?.FindFirstChild("Humanoid")) {
					target = raycastResult.Instance.Parent as Model;
				}

				impactEffect.effects.forEach((effect) => world.spawn(effect.patch({ target, pos })));

				const splashEffect = world.get(id, SplashDamage);

				if (splashEffect) {
					overlapParams.FilterDescendantsInstances = filter;
					const spatialQueryResult = Workspace.GetPartBoundsInRadius(pos, splashEffect.radius, overlapParams);

					if (next(spatialQueryResult)[0] !== undefined) {
						spatialQueryResult.forEach((instance) => {
							let target = undefined as Model | undefined;

							if (instance.Parent?.FindFirstChild("Humanoid")) {
								target = instance.Parent as Model;
							}

							world.spawn(
								Effect({
									variant: EffectVariant.Damage(10),
									predictionGUID: HttpService.GenerateGUID(false),
									target: target,
								}),
							);
						});
					}
				}

				world.despawn(id);

				return;
			}
		}
	}
}

export = hitScanEffect;
