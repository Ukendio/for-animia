import { Loop, World } from "@rbxts/matter";
import { Option } from "@rbxts/rust-classes";
import { RunService } from "@rbxts/services";
import { effects_have_lifetimes } from "shared/systems/effects_have_lifetimes";
import { remove_missing_models } from "shared/systems/remove_missing_models";
import update_transforms from "shared/systems/update_transforms";
import { explosion } from "shared/effects/bin/explosion";

export = (target: Instance): Callback => {
	const world = new World();
	const loop = new Loop(world);
	loop.scheduleSystems([effects_have_lifetimes, remove_missing_models, update_transforms]);

	const connections = loop.begin({ default: RunService.Heartbeat });

	explosion(world, Option.none(), Option.some(new Vector3(0, 50, 0)), new NumberSequence(10, 10));

	return function (): void {
		connections.default.Disconnect();

		world.clear();
	};
};
