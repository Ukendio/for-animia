import { useEvent, useThrottle, World } from "@rbxts/matter";
import { Players } from "@rbxts/services";
import { Ability, Counter, Renderable, Target, Tracker, Transform } from "shared/components";
import { create_tracker } from "shared/create_tracker";
import { remotes } from "shared/remotes";

const { create_fx, replicate_fx } = remotes;

export function ice_arrows(world: World): void {
	for (const [, plr, variant] of useEvent(create_fx, "OnServerEvent")) {
		for (const [, { model }] of world.query(Renderable, Target)) {
			if (plr === Players.GetPlayerFromCharacter(model)) {
				for (let i = 0; i < 3; i++) {
					world.spawn(
						Transform({ cf: new CFrame(variant.pos ?? Vector3.zero), do_not_reconcile: false }),
						Tracker({ target: model }),
						Counter({ idx: i }),
					);
				}
			}
		}
	}

	for (const [id, ability, transform, tracker, counter] of world.query(Ability, Transform, Tracker, Counter)) {
		const fn = (): void => {
			const ANGLES = [
				new CFrame(math.random(20, 30), 0, 0),
				new CFrame(math.random(-30, -20), 0, 0),
				new CFrame(0, math.random(20, 30), 0),
			] as const;

			const model = tracker.target as Model;

			const root_part = model.FindFirstChild("HumanoidRootPart") as Part;
			const humanoid = model.FindFirstChild("Humanoid") as Humanoid;

			if (!root_part || !humanoid) return;

			const start = root_part.CFrame.Position;

			create_tracker(world, start, transform.cf, ability.name + "_server", model, ANGLES[counter.idx]);

			world.despawn(id);
		};

		if (counter.idx === 0) fn();
		else if (useThrottle(0.1)) fn();
	}
}
