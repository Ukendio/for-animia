import { Loop, useEvent, World } from "@rbxts/matter";
import { Option } from "@rbxts/rust-classes";
import { RunService, UserInputService } from "@rbxts/services";
import { effects_have_lifetimes } from "shared/systems/effects_have_lifetimes";
import { projectiles_fly } from "shared/systems/projectiles_fly";
import { spawn_effects } from "shared/systems/spawn_effects";
import { things_collide } from "shared/systems/things_collide";
import { Renderable } from "shared/components";
import { remove_missing_models } from "shared/systems/remove_missing_models";
import update_transforms from "shared/systems/update_transforms";
import { fireball } from "./fireball";

export = (target: Instance): Callback => {
	const world = new World();
	const loop = new Loop(world);
	loop.scheduleSystems([
		things_collide,
		projectiles_fly,
		effects_have_lifetimes,
		spawn_effects,
		remove_missing_models,
		update_transforms,
	]);

	const connections = loop.begin({ default: RunService.Heartbeat });

	const id = fireball(world, Option.none(), new CFrame(new Vector3(0, 10, 0)), new Vector3(140, 10, 0));

	return function (): void {
		if (world.contains(id)) world.get(id, Renderable).model.Destroy();
		world.clear();
		connections.default.Disconnect();
	};
};
