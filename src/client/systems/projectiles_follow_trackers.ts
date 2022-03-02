import { World } from "@rbxts/matter";
import { TweenService, Workspace } from "@rbxts/services";
import { Projectile, Renderable, Tracker, Transform, TweenProps } from "shared/components";
import update_transforms from "shared/systems/update_transforms";

function projectiles_follow_trackers(world: World): void {
	for (const [id, transform, projectile, { model }, tween_props, tracker] of world.query(
		Transform,
		Projectile,
		Renderable,
		TweenProps,
		Tracker,
	)) {
		const ice = model.FindFirstChild("Ice") as Part & { Attachment: Attachment & { Trail: Trail } };

		if (tracker.target.IsDescendantOf(game) && ice) {
			model.Parent = Workspace.Effects;

			task.spawn(() => {
				task.delay(0.055, () => {
					if (ice.FindFirstChild("Attachment")) {
						ice.Attachment.Trail.Enabled = true;
						TweenService.Create(ice, tween_props.data, {
							CFrame: (tracker.target as Part).CFrame,
						}).Play();
					}
				});
			});
		} else {
			world.despawn(id);
		}
	}
}

export = { system: projectiles_follow_trackers, after: [update_transforms] };
