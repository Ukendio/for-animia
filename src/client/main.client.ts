import { Loop, World } from "@rbxts/matter";
import { RunService } from "@rbxts/services";

import { remove_missing_models } from "shared/systems/remove_missing_models";
import update_transforms from "shared/systems/update_transforms";

import spawn_player from "./systems/spawn_player";
import { ice_arrows } from "./systems/souls/gray/ice_arrows";
import projectiles_follow_trackers from "./systems/projectiles_follow_trackers";
import { spawn_fireball } from "./systems/souls/fire_person/spawn_fireball";
import { projectiles_fly } from "shared/systems/projectiles_fly";
import { predict_effects } from "shared/systems/predict_effects";
import { things_collide } from "shared/systems/things_collide";
import { spawn_effects } from "./systems/spawn_effects";
import { controls } from "./controls";

const world = new World();

const loop = new Loop(world, controls);

loop.scheduleSystems([
	remove_missing_models,
	update_transforms,
	spawn_player,
	ice_arrows,
	projectiles_follow_trackers,
	spawn_fireball,
	projectiles_fly,
	predict_effects,
	spawn_effects,
	things_collide,
]);

loop.begin({ default: RunService.Heartbeat });
