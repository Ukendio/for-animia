import { Loop, World } from "@rbxts/matter";
import { Option, Vec } from "@rbxts/rust-classes";
import { RunService } from "@rbxts/services";
import { Lifetime } from "shared/components";
import { effects_have_lifetimes } from "shared/systems/effects_have_lifetimes";
import { remove_missing_models } from "shared/systems/remove_missing_models";
import update_transforms from "shared/systems/update_transforms";
import { EffectVariant } from "..";
import { explosion } from "./explosions";

export = (target: Instance): Callback => {
	const world = new World();
	const loop = new Loop(world);
	loop.scheduleSystems([effects_have_lifetimes, remove_missing_models, update_transforms]);

	const connections = loop.begin({ default: RunService.Heartbeat });
	const id = explosion(
		world,
		EffectVariant.Explosion(new NumberSequence(10, 10)),
		Option.some(new Vector3(0, 10, 0)),
	);
	return function (): void {
		task.delay(world.get(id, Lifetime).remaining_time + 0.5, () => connections.default.Disconnect());
	};
};
